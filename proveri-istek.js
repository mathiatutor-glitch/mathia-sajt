// api/cron/proveri-istek.js  →  GET /api/cron/proveri-istek  (Vercel Cron, dnevno)
// ──────────────────────────────────────────────────────────────────────────
// Jednom dnevno nađe pretplate koje ističu (ili su istekle) i pošalje kupcu
// mejl da obnovi. Pretplata se NE naplaćuje sama — kupac sam odluči.
// Zaštita: Vercel šalje zaglavlje sa CRON_SECRET (podesi u Vercel projektu).
// ──────────────────────────────────────────────────────────────────────────
import * as supa from '../../lib/supabase.js';
import * as mail from '../../lib/email.js';

export default async function handler(req, res) {
  // Dozvoli samo Vercel Cron / poziv sa tajnom
  const auth = req.headers['authorization'];
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end();
  }
  try {
    const zaObavestenje = await supa.pretplateZaObavestenje(2); // ističu u <= 2 dana
    let poslato = 0;
    for (const p of zaObavestenje) {
      await mail.posaljiIstek({ to: p.kupac_email, paket: p.paket, istice: p.istice });
      await supa.oznaciObavesten(p.id);
      poslato++;
    }
    return res.status(200).json({ ok: true, poslato });
  } catch (e) {
    console.error('proveri-istek', e);
    return res.status(500).json({ greska: e.message });
  }
}
