// api/raiaccept-callback.js  →  POST /api/raiaccept-callback   (UPC NOTIFY_URL)
// ──────────────────────────────────────────────────────────────────────────
// UPC ovde javi ishod plaćanja (server-to-server, sa UPC IP adresa:
// test 195.85.198.16, produkcija 195.85.198.15). SRCE sistema:
//   1) provera potpisa (UPC sertifikat)  2) fiskalni račun (ESIR)
//   3) upis u bazu  4) aktivacija paketa/pristupa  5) mejl kupcu
// UPC-u se MORA vratiti tekstualni odgovor sa "Response.action= approve/reverse".
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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const f = await _parseBody(req);
  console.log('upc-callback: primljeno', { keys: Object.keys(f).join(','), OrderID: f.OrderID, SD: f.SD, TranCode: f.TranCode, TotalAmount: f.TotalAmount });

  // 1) Da li poziv zaista dolazi od UPC-a? (RSA-SHA1 potpis, UPC sertifikat)
  if (!upc.proveriOdgovor(f)) {
    try { console.warn('upc-callback: LOS POTPIS (detalji)', JSON.stringify(upc.proveriOdgovorInfo(f))); } catch (e) {}
    console.warn('upc-callback: LOS POTPIS', { OrderID: f.OrderID, SD: f.SD });
    return posalji(res, f, 'reverse', 'bad signature');
  }

  try {
    const supaId = uuidIzSD(f.SD);
    let porudzbina;
    try {
      porudzbina = await supa.ucitajPorudzbinu(supaId);
    } catch (e) {
      console.error('upc-callback: porudzbina nije nadjena za SD=', f.SD, e.message);
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

    // TVRDA provera iznosa: TotalAmount (u parama) mora TAČNO da se poklopi sa porudžbinom.
    // Ako se ne poklapa — NE aktiviramo pretplatu (potvrdimo prijem UPC-u, za ručnu proveru).
    const ocekivano = Math.round(Number(porudzbina.iznos_rsd) * 100);
    if (String(f.TotalAmount) !== String(ocekivano)) {
      console.warn('upc-callback: IZNOS SE NE POKLAPA — NE aktiviram', { primljeno: f.TotalAmount, ocekivano, OrderID: f.OrderID, SD: f.SD });
      return posalji(res, f, 'approve', 'amount mismatch - manual review');
    }

    const { detaljno, predmeti } = porudzbina.stavke;
    const email = porudzbina.kupac_email;

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
      const paketSifra = detaljno[0] && detaljno[0].sifra ? detaljno[0].sifra.replace(/^(MATHIA-|PKT-)/i, '').toLowerCase() : null;
      const istice = await supa.aktivirajPretplatu({ email, paket: paketSifra, predmeti });
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

    // 5) Mejl kupcu (ako pukne, ne rusimo - placanje i aktivacija su prosli)
    try {
      await mail.posaljiRacun({
        to: email,
        racun,
        sta: detaljno.map(function (s) { return s.naziv + ' x' + s.kolicina; }).join(', '),
        pristupLink,
      });
    } catch (e) {
      console.error('upc-callback: slanje mejla nije uspelo', e.message);
    }

    return posalji(res, f, 'approve', 'ok');
  } catch (e) {
    console.error('upc-callback', e);
    return posalji(res, f, 'approve', 'processing error - manual');
  }
}
