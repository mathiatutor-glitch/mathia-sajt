// api/raiaccept-callback.js  →  POST /api/raiaccept-callback   (UPC NOTIFY_URL)
// ──────────────────────────────────────────────────────────────────────────
// UPC ovde javi ishod plaćanja (server-to-server). SRCE sistema:
//   1) provera potpisa (UPC sertifikat)  2) fiskalni račun (ESIR)
//   3) upis u bazu  4) aktivacija paketa/pristupa  5) mejl kupcu
// UPC-u se MORA vratiti tekstualni odgovor sa "Response.action= approve/reverse".
//
// PRIVREMENO (23.09.2026): Raiffeisen/UPC produkcijski potpis nam ne prolazi —
// čekamo sertifikat od banke. Da kupci ne bi bili naplaćeni bez pristupa,
// uveden je REZERVNI put: ako potpis padne, uplata se prihvata SAMO ako se
// poklopi svih šest uslova (vidi _rezervnaProvera). Čim banka pošalje pravi
// sertifikat, dovoljno je postaviti UPC_STROGI_POTPIS=1 i rezervni put nestaje.
// ──────────────────────────────────────────────────────────────────────────
import * as upc from '../lib/upc.js';
import * as esir from '../lib/esir.js';
import * as supa from '../lib/supabase.js';
import * as mail from '../lib/email.js';
import { adminFindUidByEmail } from '../lib/sbauth.js';
import { getUser, saveUser } from '../lib/user.js';

// 32-heks (SD bez crtica) → kanonski UUID sa crticama
function uuidIzSD(s) {
  const h = String(s || '').replace(/[^0-9a-fA-F]/g, '');
  if (h.length !== 32) return s;
  return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
}

// Tekstualni odgovor koji UPC očekuje (kao u notify.php primeru)
function odgovorUPC(f, action, reason) {
  return [
    'MerchantID = ' + (f.MerchantID || ''),
    'TerminalID = ' + (f.TerminalID || ''),
    'OrderID = ' + (f.OrderID || ''),
    'Delay = ' + (f.Delay || ''),
    'Currency = ' + (f.Currency || ''),
    'TotalAmount = ' + (f.TotalAmount || ''),
    'XID = ' + (f.XID || ''),
    'PurchaseTime = ' + (f.PurchaseTime || ''),
    'Response.action= ' + action + ' ',
    'Response.reason= ' + reason + ' ',
    'Response.forwardUrl=  ',
  ].join('\n') + '\n';
}
function posalji(res, f, action, reason) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  return res.status(200).send(odgovorUPC(f, action, reason));
}

// Robusno čitanje tela: UPC šalje application/x-www-form-urlencoded.
// Na Verselu req.body ume da bude objekat, string ili Buffer — pokrivamo sve.
function _readRaw(req) {
  return new Promise(function (resolve) {
    try {
      var d = ''; req.on('data', function (c) { d += c; });
      req.on('end', function () { resolve(d); });
      req.on('error', function () { resolve(''); });
    } catch (e) { resolve(''); }
  });
}
async function _parseBody(req) {
  var b = req.body;
  if (b && typeof b === 'object' && !Buffer.isBuffer(b) && Object.keys(b).length) return b;
  var raw = '';
  if (typeof b === 'string') raw = b;
  else if (Buffer.isBuffer(b)) raw = b.toString('utf8');
  if (!raw) { try { raw = await _readRaw(req); } catch (e) {} }
  if (raw) {
    var t = raw.trim();
    if (t.charAt(0) === '{') { try { return JSON.parse(t); } catch (e) {} }
    try { return Object.fromEntries(new URLSearchParams(raw)); } catch (e) {}
  }
  return (b && typeof b === 'object') ? b : {};
}

// ── REZERVNI PUT ──────────────────────────────────────────────────────────
// Zvanične IP adrese sa kojih UPC šalje NOTIFY (iz njihove dokumentacije),
// plus adrese iz ranije verzije ovog fajla. Dodatne se dodaju preko
// UPC_NOTIFY_IPS (odvojene zarezom) — bez diranja koda.
const _UPC_IP = [
  '217.13.180.171',                                // produkcija (dokumentacija)
  '18.196.61.127', '3.120.143.246', '18.197.170.36', // test (dokumentacija)
  '195.85.198.15', '195.85.198.16',                // iz ranije verzije
];
function _dozvoljeneIP() {
  const dodatne = String(process.env.UPC_NOTIFY_IPS || '')
    .split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  return new Set(_UPC_IP.concat(dodatne));
}
// Na Verselu su oba zaglavlja postavljena od strane platforme, ne od pošiljaoca.
function _ipPoziva(req) {
  const h = req.headers || {};
  const real = String(h['x-real-ip'] || '').trim();
  const fwd = String(h['x-forwarded-for'] || '').split(',')[0].trim();
  return { real, fwd };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const f = await _parseBody(req);
  console.log('upc-callback: primljeno', { keys: Object.keys(f).join(','), OrderID: f.OrderID, SD: f.SD, TranCode: f.TranCode, TotalAmount: f.TotalAmount });

  // 1) Da li poziv zaista dolazi od UPC-a? (RSA potpis, UPC sertifikat)
  let rezervni = false;
  if (!upc.proveriOdgovor(f)) {
    try { console.warn('upc-callback: LOS POTPIS (detalji)', JSON.stringify(upc.proveriOdgovorInfo(f))); } catch (e) {}

    // Kad banka pošalje ispravan sertifikat: UPC_STROGI_POTPIS=1 → ovde se staje.
    if (String(process.env.UPC_STROGI_POTPIS || '') === '1') {
      console.warn('upc-callback: LOS POTPIS — strogi rezim', { OrderID: f.OrderID, SD: f.SD });
      return posalji(res, f, 'reverse', 'bad signature');
    }

    const ip = _ipPoziva(req);
    const dozvoljene = _dozvoljeneIP();
    const ipOk = (!!ip.real && dozvoljene.has(ip.real)) || (!!ip.fwd && dozvoljene.has(ip.fwd));
    const mid = String(process.env.UPC_MERCHANT_ID || '');
    const tid = String(process.env.UPC_TERMINAL_ID || '');
    const midOk = !!mid && String(f.MerchantID || '') === mid;
    const tidOk = !!tid && String(f.TerminalID || '') === tid;

    // Ovaj red je namerno uočljiv — po njemu se u Vercel logu vidi prava IP adresa
    // banke. Ako ipOk bude false, adresu odavde prepiši u UPC_NOTIFY_IPS.
    console.warn('upc-callback: REZERVNA PROVERA', JSON.stringify({
      ipRealna: ip.real, ipProsledjena: ip.fwd, ipOk, midOk, tidOk,
      OrderID: f.OrderID, SD: f.SD, TranCode: f.TranCode,
    }));

    if (!(ipOk && midOk && tidOk)) {
      return posalji(res, f, 'reverse', 'bad signature');
    }
    rezervni = true;
    console.warn('upc-callback: REZERVNI PUT PRIHVACEN (potpis pao, ostalo se poklopilo)', { OrderID: f.OrderID, SD: f.SD });
  }

  try {
    const supaId = uuidIzSD(f.SD);
    let porudzbina;
    try {
      porudzbina = await supa.ucitajPorudzbinu(supaId);
    } catch (e) {
      console.error('upc-callback: porudzbina nije nadjena za SD=', f.SD, e.message);
      // Bez potpisa, nepoznata porudžbina je jedini scenario podmetanja — odbij.
      if (rezervni) return posalji(res, f, 'reverse', 'unknown order');
      return posalji(res, f, 'approve', 'order not found - manual');
    }

    // Transakcija nije uspesna (TranCode != 000) -> potvrdi prijem, nista ne aktiviraj
    if (!upc.uspesno(f)) {
      return posalji(res, f, 'approve', 'declined - nothing activated');
    }

    // Idempotencija - vec obradjeno
    if (porudzbina.status === 'placeno') {
      return posalji(res, f, 'approve', 'already processed');
    }

    // Na rezervnom putu porudžbina mora biti tačno u stanju 'na_cekanju'.
    if (rezervni && porudzbina.status !== 'na_cekanju') {
      console.warn('upc-callback: REZERVNI — neocekivan status porudzbine', { status: porudzbina.status, OrderID: f.OrderID, SD: f.SD });
      return posalji(res, f, 'reverse', 'unexpected order state');
    }

    // TVRDA provera iznosa: TotalAmount (u parama) mora TAČNO da se poklopi sa porudžbinom.
    const ocekivano = Math.round(Number(porudzbina.iznos_rsd) * 100);
    if (String(f.TotalAmount) !== String(ocekivano)) {
      console.warn('upc-callback: IZNOS SE NE POKLAPA — NE aktiviram', { primljeno: f.TotalAmount, ocekivano, OrderID: f.OrderID, SD: f.SD });
      if (rezervni) return posalji(res, f, 'reverse', 'amount mismatch');
      return posalji(res, f, 'approve', 'amount mismatch - manual review');
    }

    const { detaljno, predmeti } = porudzbina.stavke;
    const email = porudzbina.kupac_email;
    const jezik = (porudzbina.stavke && porudzbina.stavke.lang) || 'sr'; // jezik kupca za mejlove

    // 2) Fiskalni racun (ESIR). Ako pukne, NE blokiramo pristup - logujemo za rucno.
    let racun = null;
    try {
      racun = await esir.izdajRacun({ detaljno, ukupno: porudzbina.iznos_rsd, email, ref: supaId });
      await supa.sacuvajFiskalni(supaId, racun);
    } catch (e) {
      console.error('upc-callback: ESIR fiskalni racun NIJE izdat (rucno dovrsiti)', supaId, e.message);
    }

    // 3) Status porudzbine -> placeno
    await supa.oznaciPlaceno(supaId, f.XID || f.ApprovalCode || null);

    // 4) Aktivacija pristupa
    let pristupLink = (process.env.APP_URL || '') + '/nalog.html';
    if (porudzbina.tip === 'paket') {
      const _it0 = detaljno[0] || {};
      // Porodica plana (basic/gold/diamond) — iz planKey, ili iz šifre (skini MATHIA-/PKT- i -GOD).
      const paketSifra = _it0.planKey
        || (_it0.sifra ? _it0.sifra.replace(/^(MATHIA-|PKT-)/i, '').replace(/-god$/i, '').toLowerCase() : null);
      // Trajanje pristupa: 30 (mesečni) ili 365 (godišnji), iz kataloga.
      const dani = _it0.trajanjeDana || null;
      const istice = await supa.aktivirajPretplatu({ email, paket: paketSifra, predmeti, dani });
      pristupLink += '?istice=' + istice.toISOString().slice(0, 10);
      try {
        const uidSb = await adminFindUidByEmail(email);
        if (uidSb) {
          const u = await getUser('sb:' + uidSb);
          u.plan = paketSifra;
          u.subscribedUntil = istice.getTime();
          await saveUser(u);
        } else {
          console.warn('upc-callback: nema Supabase naloga za', email, '- cet se nije automatski otkljucao.');
        }
      } catch (e) {
        console.error('upc-callback: otkljucavanje ceta nije uspelo', e.message);
      }
    }

    // 4b) Dopuna (48h, samo klon) — kratka "klon" pretplata za taj predmet
    if (porudzbina.tip === 'klon') {
      try {
        const sati = (detaljno[0] && detaljno[0].trajanjeSati) || 48;
        const istice = await supa.aktivirajPretplatu({ email, paket: 'klon48', predmeti, sati, tip: 'klon' });
        pristupLink += '?dopuna=' + sati + 'h';
        console.log('upc-callback: dopuna klon aktivirana', { email, predmeti, istice: istice.toISOString() });
      } catch (e) {
        console.error('upc-callback: dopuna (klon) nije aktivirana', e.message);
      }
    }

    // 5) Mejl kupcu (ako pukne, ne rusimo - placanje i aktivacija su prosli)
    try {
      await mail.posaljiRacun({
        to: email,
        racun,
        sta: detaljno.map(function (s) { return s.naziv + ' x' + s.kolicina; }).join(', '),
        pristupLink,
        lang: jezik,
      });
      // Dobrodoslica (kako da pocne) — samo za pakete; ne rusimo tok ako pukne
      if (porudzbina.tip === 'paket') {
        try {
          var _ime = (porudzbina.kupac_ime || '').trim().split(/\s+/)[0] || '';
          var _pk = (detaljno[0] && detaljno[0].planKey)
            || (detaljno[0] && detaljno[0].sifra ? detaljno[0].sifra.replace(/^(MATHIA-|PKT-)/i, '').replace(/-god$/i, '') : '');
          _pk = _pk ? _pk.charAt(0).toUpperCase() + _pk.slice(1).toLowerCase() : '';
          await mail.posaljiDobrodoslicu({ to: email, ime: _ime, paket: _pk, pristupLink, lang: jezik });
        } catch (e2) {
          console.error('upc-callback: dobrodoslica nije poslata', e2.message);
        }
      }
    } catch (e) {
      console.error('upc-callback: slanje mejla nije uspelo', e.message);
    }

    if (rezervni) console.warn('upc-callback: AKTIVIRANO PREKO REZERVNOG PUTA — proveri rucno', { email, OrderID: f.OrderID, SD: f.SD });
    return posalji(res, f, 'approve', rezervni ? 'ok (fallback)' : 'ok');
  } catch (e) {
    console.error('upc-callback', e);
    return posalji(res, f, 'approve', 'processing error - manual');
  }
}
