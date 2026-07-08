// api/pay-start.js  →  GET /api/pay-start?order=<porudzbinaId>
// ──────────────────────────────────────────────────────────────────────────
// Pravi POTPISANU formu i automatski je šalje (POST) na UPC platnu stranicu.
// Kupac dalje unosi karticu na UPC-ovoj bezbednoj stranici.
//
// OrderID (za UPC) je kratak (≤20 znakova). Pravi Supabase UUID porudžbine
// prenosimo kroz SD polje (UPC ga vraća POTPISANOG u NOTIFY-ju), pa ga u
// callback-u iščitamo i učitamo porudžbinu.
// ──────────────────────────────────────────────────────────────────────────
import * as upc from '../lib/upc.js';
import * as supa from '../lib/supabase.js';

function kratakOrderId() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return ('M' + t + r).slice(0, 20); // npr. "M2Q9F3K1AB" — alfanumerički, ≤20
}

function escAttr(v) {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

export default async function handler(req, res) {
  try {
    const id = (req.query && req.query.order) || '';
    const lang = String((req.query && req.query.lang) || 'sr').slice(0, 2).toLowerCase();
    if (!id) return res.status(400).send('Nedostaje porudžbina.');
    if (!upc.konfigurisan()) return res.status(503).send('Plaćanje trenutno nije podešeno.');

    const p = await supa.ucitajPorudzbinu(id);
    if (!p) return res.status(404).send('Porudžbina nije pronađena.');

    // Ako je već plaćeno — ne naplaćuj ponovo, vodi na hvala stranicu.
    if (p.status === 'placeno') {
      res.writeHead(302, { Location: '/hvala.html?porudzbina=' + encodeURIComponent(id) });
      return res.end();
    }

    const opis = (p.stavke && Array.isArray(p.stavke.detaljno))
      ? p.stavke.detaljno.map((s) => s.naziv).join(', ').slice(0, 125)
      : 'MATHIA EDU';
    const sd = String(id).replace(/-/g, '');   // UUID bez crtica → SD (an...99)
    const upcOrderId = kratakOrderId();

    const { gatewayUrl, fields } = upc.pripremiPlacanje({
      orderId: upcOrderId,
      iznosRsd: p.iznos_rsd,
      opis,
      sd,
      locale: lang,
    });

    const inputs = Object.entries(fields)
      .map(([k, v]) => `<input type="hidden" name="${escAttr(k)}" value="${escAttr(v)}">`)
      .join('');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(
`<!doctype html><html lang="sr-Latn"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Preusmeravanje na plaćanje…</title>
<style>body{font-family:system-ui,-apple-system,sans-serif;background:#FBF6EE;color:#432C37;display:grid;place-items:center;min-height:100vh;margin:0}
.b{text-align:center;padding:20px}.s{width:36px;height:36px;border:3px solid #ECDAC5;border-top-color:#C6A05C;border-radius:50%;animation:r 1s linear infinite;margin:0 auto 16px}
@keyframes r{to{transform:rotate(360deg)}}p{color:#7E5765}</style></head>
<body><div class="b"><div class="s"></div><p>Preusmeravamo vas na bezbednu stranicu za plaćanje…</p></div>
<form id="f" method="POST" action="${escAttr(gatewayUrl)}">${inputs}</form>
<script>document.getElementById('f').submit();</script></body></html>`
    );
  } catch (e) {
    console.error('pay-start', e);
    return res.status(500).send('Greška pri pokretanju plaćanja.');
  }
}
