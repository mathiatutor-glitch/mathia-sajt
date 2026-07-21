// api/pass-start.js  →  POST /api/pass-start   { token, mode, lang }
// ──────────────────────────────────────────────────────────────────────────
// Dopuna: 48h razgovora SAMO s Profesoricom (klon) za jedan predmet.
// Naplata ide istim tokom kao sve ostalo (pay-start → UPC), a fiskalno koristi
// ISTI artikal kao Planer (KLON-48 → šifra MATHIA-PLANER, 1.990). Bez izmena u eFiskalizaciji.
//
// Zahteva prijavljenog korisnika (Supabase token) — dopuna se vezuje za njegov email.
// ──────────────────────────────────────────────────────────────────────────
import { izracunajIznos } from '../lib/proizvodi.js';
import * as supa from '../lib/supabase.js';
import { sbUser } from '../lib/sbauth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ greska: 'Samo POST' });

  try {
    let body = {};
    try { body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}); } catch (e) { body = {}; }

    const token = body.token || (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const mode = String(body.mode || '').trim();
    const lang = String(body.lang || 'sr').slice(0, 2).toLowerCase();
    if (!mode || mode === 'site') return res.status(400).json({ greska: 'Nedostaje predmet.' });

    // identitet: mora biti prijavljen (dopuna se vezuje za email)
    const sb = await sbUser(token);
    if (!sb || !sb.email) return res.status(401).json({ greska: 'not_authenticated' });
    const email = sb.email;

    if (!supa.konfigurisan()) return res.status(503).json({ greska: 'Baza nije podešena.' });

    // Iznos se RAČUNA na serveru iz kataloga (nikad iz pregledača)
    const { ukupno, detaljno } = izracunajIznos([{ id: 'KLON-48', kolicina: 1 }]);

    // Porudžbina tipa 'klon' — callback na uspeh pravi 48h "klon" pretplatu za ovaj predmet
    const orderId = await supa.napraviPorudzbinu({
      email,
      ime: (sb.ime || sb.user_metadata && sb.user_metadata.ime || ''),
      iznos: ukupno,
      stavke: { detaljno, predmeti: [mode] },
      tip: 'klon',
    });

    const base = process.env.APP_URL || `https://${req.headers.host}`;
    const paymentUrl = `${base}/api/pay-start?order=${orderId}&lang=${encodeURIComponent(lang)}`;
    return res.status(200).json({ paymentUrl, orderId, iznos: ukupno });
  } catch (e) {
    console.error('pass-start', e);
    return res.status(500).json({ greska: e.message });
  }
}
