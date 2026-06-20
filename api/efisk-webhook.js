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

const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).end(); return; }

  try {
    // 1) sirovo telo (potrebno za tačan HMAC)
    const raw = await readRaw(req);

    // 2) potpis iz hedera
    const sig = req.headers['x-signature']
             || req.headers['x-efisk-signature']
             || req.headers['x-webhook-signature'] || '';

    // 3) izračunaj i uporedi (sha256)
    const calc = crypto
      .createHmac('sha256', process.env.EFISK_WEBHOOK_SECRET || '')
      .update(raw)
      .digest('hex');

    if (!sig || !safeEq(String(sig).replace(/^sha256=/, ''), calc)) {
      res.status(401).json({ error: 'Neispravan potpis' });
      return;
    }

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
};

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
