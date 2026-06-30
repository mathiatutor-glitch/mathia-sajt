// api/raiaccept-callback.js  →  POST /api/raiaccept-callback
// ──────────────────────────────────────────────────────────────────────────
// RaiAccept ovde javi ishod plaćanja (server-to-server). Ovo je SRCE sistema —
// ovde se sve dešava automatski, bez tebe:
//   1) provera potpisa  2) fiskalni račun (ESIR/VPFR)  3) upis u bazu
//   4) aktivacija paketa/pristupa  5) mejl kupcu sa računom
// ──────────────────────────────────────────────────────────────────────────
import * as rai from '../lib/raiaccept.js';
import * as esir from '../lib/esir.js';
import * as supa from '../lib/supabase.js';
import * as mail from '../lib/email.js';
import { adminFindUidByEmail } from '../lib/sbauth.js';
import { getUser, saveUser } from '../lib/user.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    // 1) Da li poziv zaista dolazi od RaiAccept-a?
    const potpis = req.headers['x-raiaccept-signature'];
    if (!rai.proveriPotpis(req.body, potpis)) return res.status(401).json({ greska: 'Loš potpis' });

    const { orderId, status } = req.body || {};
    if (status !== 'success' && status !== 'paid') {
      return res.status(200).json({ ok: true, info: 'Uplata nije uspešna — ništa se ne aktivira' });
    }

    const porudzbina = await supa.ucitajPorudzbinu(orderId);
    if (porudzbina.status === 'placeno') return res.status(200).json({ ok: true, info: 'Već obrađeno' });

    const { detaljno, predmeti } = porudzbina.stavke;
    const email = porudzbina.kupac_email;

    // 2) Fiskalni račun preko VPFR-a (automatski potpis bezbednosnim elementom)
    const racun = await esir.izdajRacun({ detaljno, ukupno: porudzbina.iznos_rsd, email, ref: orderId });

    // 3) Upis: račun + status porudžbine
    await supa.sacuvajFiskalni(orderId, racun);
    await supa.oznaciPlaceno(orderId, req.body.transactionId || null);

    // 4) Aktivacija
    let pristupLink = (process.env.APP_URL || '') + '/moj-nalog.html';
    if (porudzbina.tip === 'paket') {
      const paketSifra = detaljno[0]?.sifra?.replace('PKT-', '').toLowerCase();
      const istice = await supa.aktivirajPretplatu({ email, paket: paketSifra, predmeti });
      pristupLink += `?istice=${istice.toISOString().slice(0, 10)}`;

      // 4b) VEZA KOJA JE FALILA: otključaj sam čet (KV) za istog kupca.
      // Nađemo Supabase nalog po emailu i upišemo isti datum isteka kao u Supabase pretplati.
      try {
        const uidSb = await adminFindUidByEmail(email);
        if (uidSb) {
          const u = await getUser('sb:' + uidSb);
          u.plan = paketSifra;
          u.subscribedUntil = istice.getTime();
          await saveUser(u);
        } else {
          // Kupac još nema email-nalog na sajtu (platio je bez prijave) — pretplata
          // je upisana u Supabase i čeka; otključaće se čim napravi/poveže nalog
          // sa istim emailom (ili joj ručno aktiviraj preko /api/subscribe).
          console.warn('raiaccept-callback: nije nađen Supabase nalog za', email, '— čet se nije automatski otključao.');
        }
      } catch (e) {
        console.error('raiaccept-callback: otključavanje četa nije uspelo', e);
        // Ne prekidamo tok — račun i Supabase pretplata su već upisani; ovo se može ručno doraditi.
      }
    }
    // (za 'prodavnica' artikle ovde dodeli download/pristup po sifri)

    // 5) Mejl kupcu sa fiskalnim računom
    await mail.posaljiRacun({
      to: email,
      racun,
      sta: detaljno.map((s) => `${s.naziv} ×${s.kolicina}`).join(', '),
      pristupLink,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('raiaccept-callback', e);
    // Vrati 500 da RaiAccept ponovi poziv (retry) ako nešto pukne
    return res.status(500).json({ greska: e.message });
  }
}
