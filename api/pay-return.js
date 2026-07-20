// api/pay-return.js  →  POST/GET  (SUCCESS_URL i FAILURE_URL sa UPC portala)
// ──────────────────────────────────────────────────────────────────────────
// Banka posle plaćanja radi POST na povratnu adresu. Statička greska.html/hvala.html
// primaju samo GET → 405. Ovaj endpoint prima POST, pročita ishod i 302-preusmeri
// kupca (GET) na hvala.html ili greska.html. NE aktivira ništa — aktivaciju radi
// NOTIFY (raiaccept-callback), server-to-server. Ovo je samo UX preusmerenje.
// Na UPC portalu postavi i Success i Failure URL na: https://www.mathia.rs/api/pay-return
// ──────────────────────────────────────────────────────────────────────────
function readBody(req) {
  return new Promise((resolve) => {
    try {
      if (req.body && typeof req.body === 'object' && Object.keys(req.body).length) return resolve(req.body);
      let d = '';
      req.on('data', (c) => { d += c; });
      req.on('end', () => {
        try { resolve(Object.fromEntries(new URLSearchParams(d))); }
        catch (e) { resolve({}); }
      });
      req.on('error', () => resolve({}));
    } catch (e) { resolve({}); }
  });
}

export default async function handler(req, res) {
  const q = req.query || {};
  let f = q;
  if (req.method === 'POST') f = Object.assign({}, q, await readBody(req));

  // UPC vraća TranCode="000" za uspeh; gledamo i eksplicitan status parametar.
  const tran = String(f.TranCode || f.trancode || '').trim();
  const st = String(f.status || f.Status || '').toLowerCase();
  const uspeh = tran === '000' || st === 'success' || st === 'ok' || st === 'approved';

  const base = 'https://www.mathia.rs';
  const dest = uspeh ? '/hvala.html' : '/greska.html';
  // prenesi identifikator porudžbine ako ga banka vrati (SD/OrderID)
  const sd = f.SD || f.OrderID || f.order || '';
  const url = base + dest + (sd ? ('?ref=' + encodeURIComponent(sd)) : '');

  res.statusCode = 302;
  res.setHeader('Location', url);
  res.setHeader('Cache-Control', 'no-store');
  res.end();
}
