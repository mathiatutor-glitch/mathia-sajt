// api/checkout.js  →  POST /api/checkout
// ──────────────────────────────────────────────────────────────────────────
// Početak kupovine. Pregledač šalje SAMO stavke (id + količina) i email kupca.
// Server izračuna iznos iz kataloga, napravi porudžbinu i vrati URL za plaćanje.
// ──────────────────────────────────────────────────────────────────────────
import { izracunajIznos, nadjiStavku } from '../lib/proizvodi.js';
import * as rai from '../lib/raiaccept.js';
import * as supa from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ greska: 'Samo POST' });
  try {
    const { stavke, email, ime, predmeti } = req.body || {};
    if (!Array.isArray(stavke) || stavke.length === 0) return res.status(400).json({ greska: 'Nema stavki' });
    if (!email) return res.status(400).json({ greska: 'Nedostaje email' });

    // 1) Iznos se RAČUNA NA SERVERU (nikad iz pregledača)
    const { ukupno, detaljno } = izracunajIznos(stavke);

    // 2) Da li je u korpi paket (pretplata) — pamtimo izabrane predmete
    const prva = nadjiStavku(stavke[0].id);
    const tip = prva?.tip === 'paket' ? 'paket' : 'prodavnica';

    // 3) Porudžbina u bazi (status 'na_cekanju')
    if (!supa.konfigurisan()) return res.status(503).json({ greska: 'Baza nije podešena (Supabase ključevi)' });
    const orderId = await supa.napraviPorudzbinu({ email, ime, iznos: ukupno, stavke: { detaljno, predmeti: predmeti || null }, tip });

    // 4) RaiAccept sesija plaćanja
    const base = process.env.APP_URL || `https://${req.headers.host}`;
    const { paymentUrl, ref } = await rai.kreirajPlacanje({
      orderId,
      iznosRsd: ukupno,
      opis: detaljno.map((s) => s.naziv).join(', '),
      email,
      returnUrl: `${base}/hvala.html?porudzbina=${orderId}`,
      callbackUrl: `${base}/api/raiaccept-callback`,
    });
    await supa.oznaciPlaceno; // (no-op ovde; status menja callback)

    return res.status(200).json({ paymentUrl, orderId, ref, iznos: ukupno });
  } catch (e) {
    console.error('checkout', e);
    return res.status(500).json({ greska: e.message });
  }
}
