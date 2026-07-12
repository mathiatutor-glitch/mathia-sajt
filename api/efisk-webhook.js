// ============================================================================
//  /api/efisk-webhook.js   ·   Mathia — prijem potvrde od eFiskalizacije
//  eFiskalizacija posle svake fiskalizacije šalje POST na ovu adresu (uspeh/greška),
//  potpisan HMAC-om. Ovde proveravamo potpis i (po želji) ažuriramo pretplatu.
//
//  PODESI u eFiskalizacija panelu:  Podešavanja → Webhooks
//      URL:    https://mathia.rs/api/efisk-webhook
//      (kopiraj „secret" koji ti daju)
//  ENV (Vercel):  EFISK_WEBHOOK_SECRET = taj secret
//
//  NAPOMENA: tačno ime hedera sa potpisom proveri u njihovoj dokumentaciji
//  (npr. x-signature / x-efisk-signature). Dole pokrivamo oba uobičajena.
// ============================================================================

import crypto from 'node:crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).end(); return; }

  try {
    // 1) sirovo telo (potrebno za tačan HMAC)
    const raw = await readRaw(req);

    // 2) ZAŠTITA: tajna preko query parametra ?key=  (eFiskalizacija DEMO nema potpis),
    //    ili preko HMAC potpisa u hederu (ako ga provajder šalje).
    const secret = process.env.EFISK_WEBHOOK_SECRET || '';
    const qkey = (req.query && (req.query.key || req.query.secret)) || '';
    let ovlascen = false;
    if (secret && String(qkey) === secret) {
      ovlascen = true;                        // query ključ se poklapa (?key=...)
    } else if (secret) {
      const sig = req.headers['x-signature'] || req.headers['x-efisk-signature'] || req.headers['x-webhook-signature'] || '';
      if (sig) {
        const calc = crypto.createHmac('sha256', secret).update(raw).digest('hex');
        if (safeEq(String(sig).replace(/^sha256=/, ''), calc)) ovlascen = true;
      }
    }
    if (!ovlascen) { res.status(401).json({ error: 'Neispravan ključ' }); return; }

    // 4) događaj
    const evt = JSON.parse(raw || '{}');
    const status = evt.status || evt.result || 'unknown';
    const pfr = evt.invoiceNumber || evt.pfr || evt.number || null;
    console.log('eFisk webhook:', status, pfr);

    // (opciono) ovde možeš ažurirati subscriptions.status u Supabase ako fiskalizacija nije uspela
    // npr. ako status === 'failed' -> obeleži pretplatu da treba ručna provera.

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Greška na serveru' });
  }
}

function readRaw(req) {
  return new Promise((resolve) => {
    if (typeof req.body === 'string') return resolve(req.body);
    if (req.body && Object.keys(req.body).length) return resolve(JSON.stringify(req.body));
    let d = ''; req.on('data', c => d += c); req.on('end', () => resolve(d));
  });
}
function safeEq(a, b) {
  try { return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b)); }
  catch (e) { return false; }
}
