// ============================================================================
//  /api/fiskalizuj.js   ·   Mathia — serversko jezgro naplate
//  Posle POTVRĐENE uplate: (1) fiskalizuje prodaju preko eFiskalizacija API-ja,
//  (2) aktivira pretplatu u Supabase, (3) pošalje PDF fiskalni račun na mejl.
//  Radi na Vercel-u kao serverless funkcija (kao i api/chat.js).
//
//  ENV PROMENLJIVE (Vercel → Project → Settings → Environment Variables):
//    EFISK_BASE       npr. https://staging.efiskalizacija.cloud/api   (tačan URL iz njihovog panela/Swagger-a)
//    EFISK_API_KEY    tvoj eFiskalizacija API ključ
//    SUPABASE_URL     https://xxxx.supabase.co
//    SUPABASE_SERVICE service_role ključ  (TAJNO — nikad u HTML stranici!)
//
//  VAŽNO: tačne nazive endpointa i polja u zahtevu za fiskalizaciju proveri u
//  eFiskalizacija Swagger-u (admin panel → Pomoć). Dole je standardni VSDC oblik;
//  prilagodi imena polja ako se kod njih malo razlikuju.
// ============================================================================

const PAKETI = {
  basic:   { naziv: 'Basic',   cena: 4990, kod: 'MATHIA-BASIC',   predmeti: 1 },
  gold:    { naziv: 'Gold',    cena: 6990, kod: 'MATHIA-GOLD',    predmeti: 2 },
  diamond: { naziv: 'Diamond', cena: 9990, kod: 'MATHIA-DIAMOND', predmeti: 3 }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Samo POST' }); return; }

  // BEZBEDNOST: legacy/ručni (admin) endpoint — zaključan iza ADMIN_SECRET.
  // PRAVA naplata ide kroz /api/checkout → /api/raiaccept-callback (proveren potpis banke),
  // NIKAD ovde. Bez tačnog x-admin-secret hedera vraćamo 403.
  if (!process.env.ADMIN_SECRET || req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: 'Zabranjeno' }); return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { paket, email, nacin } = body;            // nacin: 'kartica' | 'ips' | 'virman'
    const p = PAKETI[paket];
    if (!p)    { res.status(400).json({ error: 'Nepoznat paket' }); return; }
    if (!email){ res.status(400).json({ error: 'Nedostaje mejl' }); return; }

    const tipPlacanja = nacin === 'kartica' ? 'Card' : (nacin === 'ips' ? 'Instant' : 'WireTransfer');

    // ── 1) FISKALIZACIJA ─────────────────────────────────────────────────────
    const racunBody = {
      invoiceType: 'Normal',          // običan promet
      transactionType: 'Sale',        // prodaja
      items: [{
        name: 'Mathia pretplata ' + p.naziv,
        gtin: p.kod,
        quantity: 1,
        unitPrice: p.cena,
        labels: ['A'],                // poreska oznaka (proveri svoj PDV šifarnik; oslobođeno/0%)
        totalAmount: p.cena
      }],
      payment: [{ amount: p.cena, paymentType: tipPlacanja }],
      buyerCostCenterId: email        // referenca da račun vežemo za korisnika
    };

    const fr = await fetch(process.env.EFISK_BASE + '/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.EFISK_API_KEY
      },
      body: JSON.stringify(racunBody)
    });
    if (!fr.ok) {
      const detail = await fr.text();
      res.status(502).json({ error: 'Fiskalizacija nije uspela', detail });
      return;
    }
    const racun = await fr.json();                   // očekujemo PFR/broj računa u odgovoru
    const pfr = racun.invoiceNumber || racun.pfr || racun.number || null;

    // ── 2) AKTIVACIJA PRETPLATE (Supabase REST, service_role) ────────────────
    const sada = new Date();
    const vaziDo = new Date(sada); vaziDo.setMonth(vaziDo.getMonth() + 1);
    const sub = {
      email,
      paket,
      sifra: p.kod,
      max_predmeta: p.predmeti,
      status: 'active',
      pfr,
      started_at: sada.toISOString(),
      expires_at: vaziDo.toISOString()
    };
    const sr = await fetch(process.env.SUPABASE_URL + '/rest/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SERVICE,
        'Authorization': 'Bearer ' + process.env.SUPABASE_SERVICE,
        'Prefer': 'resolution=merge-duplicates'      // upsert po jedinstvenom email-u
      },
      body: JSON.stringify(sub)
    });
    if (!sr.ok) {
      const detail = await sr.text();
      // račun je već fiskalizovan; samo javljamo da upis nije prošao (ručno aktiviraj)
      res.status(207).json({ ok: true, pfr, warning: 'Pretplata nije upisana', detail });
      return;
    }

    // ── 3) PDF RAČUN NA MEJL (po PFR broju) ──────────────────────────────────
    try {
      if (pfr) {
        await fetch(process.env.EFISK_BASE + '/invoices/' + encodeURIComponent(pfr) + '/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.EFISK_API_KEY
          },
          body: JSON.stringify({ to: email })
        });
      }
    } catch (e) { /* mejl nije presudan za aktivaciju */ }

    res.status(200).json({ ok: true, pfr, paket, vazi_do: sub.expires_at });

  } catch (e) {
    res.status(500).json({ error: 'Greška na serveru', detail: String(e) });
  }
}
