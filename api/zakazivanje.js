// MATHIA EDU — zakazivanje časova (jedna Vercel funkcija za sve akcije)
// Promenljive okruženja (Vercel → Settings → Environment Variables):
//   SUPABASE_URL, SUPABASE_SERVICE_KEY (ili SUPABASE_SERVICE_ROLE_KEY)  — obavezno
//   ADMIN_KLJUC        — lozinka za admin stranicu (obavezno)
//   RESEND_API_KEY     — za slanje mejlova (bez njega zakazivanje radi, ali mejlovi ne idu)
//   MAIL_OD            — npr. "MathIA <casovi@mathia.rs>"
//   MAIL_MARINA        — gde stižu obaveštenja (podrazumevano marina.bulat@gmail.com)
//   ONLINE_LINK        — tvoj stalni Zoom/Meet link (ako ga nema, piše da link stiže pre časa)
//   CRON_SECRET        — za automatske podsetnike (Vercel ga sam postavlja kad dodaš cron)

import crypto from 'node:crypto';

// ───────── PODEŠAVANJA ─────────
const TZ = 'Europe/Belgrade';
// dan u nedelji (1=pon … 6=sub): [prvi početak, kraj radnog vremena]
const RADNO = { 1: [12, 20], 2: [12, 20], 3: [12, 20], 4: [12, 20], 5: [12, 20], 6: [12, 17] };
const CENE = { individualni: 2000, grupni: 1500 };
const MAX_GRUPA = 4;
const OTKAZ_SATI = 24;        // besplatno otkazivanje najkasnije X sati pre časa
const MIN_SATI_UNAPRED = 3;   // najranije zakazivanje: X sati pre početka
const DANA_UNAPRED = 60;      // koliko dana unapred može da se zakaže
const SAJT = process.env.SAJT_URL || 'https://mathia.rs';
const RACUN = '160-5500100050944-18';
const MAIL_MARINA = process.env.MAIL_MARINA || 'marina.bulat@gmail.com';

const ADRESA_HTML = `📍 <b>Đorđa Nikšića Johana 27, lamela 3, ulaz 3, sprat 6, stan 64</b><br>
Zgrada se nalazi u Parku Novi, prekoputa Lidla. Ulaz gleda na Lidl, pored Lily prodavnice.
Pozvoniti na 64 (lamela 3). Nakon prolaska kroz kapiju, skrenuti desno — vrata od zgrade su poslednja, u ćošku.
Vrlo lako ćete se snaći, a uvek možete i pozvati ako Vam zatreba dodatna pomoć.`;

const PORUKE = {
  ZAUZETO: 'Ovaj termin je upravo zauzet. Izaberite drugi.',
  POPUNJENO: 'Grupa u ovom terminu je popunjena. Izaberite drugi termin.',
  DRUGI_NACIN: 'U ovom terminu je već grupa sa drugim načinom održavanja (online/uživo).',
  VEC_ZAKAZANO: 'Već imate zakazan čas u ovom terminu.',
};

// ───────── POMOĆNE ─────────
const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

async function sb(path, { method = 'GET', body, prefer } = {}) {
  const r = await fetch(`${SB_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const txt = await r.text();
  const data = txt ? JSON.parse(txt) : null;
  if (!r.ok) { const e = new Error((data && data.message) || 'Greška baze'); e.kod = data && data.message; throw e; }
  return data;
}

function delovi(date) {
  const p = {};
  for (const x of new Intl.DateTimeFormat('en-US', { timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(date)) p[x.type] = x.value;
  return p;
}
function offsetMin(date) {
  const p = delovi(date);
  return Math.round((Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - date.getTime()) / 60000);
}
// Beogradsko vreme (datum + sat) → milisekunde
function trenutak(datum, sat) {
  const [y, m, d] = datum.split('-').map(Number);
  const g = Date.UTC(y, m - 1, d, sat, 0, 0);
  let t = g - offsetMin(new Date(g)) * 60000;
  const o2 = offsetMin(new Date(t));
  return g - o2 * 60000;
}
function danasBg() { const p = delovi(new Date()); return `${p.year}-${p.month}-${p.day}`; }
function dodajDane(datum, n) {
  const [y, m, d] = datum.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}
function danUNedelji(datum) { const [y, m, d] = datum.split('-').map(Number); const w = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); return w === 0 ? 7 : w; }
const okDatum = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s + 'T00:00:00Z'));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sat2 = (h) => `${String(h).padStart(2, '0')}:00`;
const DANI = ['', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota', 'nedelja'];
function lepDatum(datum) { const [y, m, d] = datum.split('-'); return `${DANI[danUNedelji(datum)]}, ${+d}.\u00A0${+m}.\u00A0${y}.`; }
const dinari = (n) => `${n.toLocaleString('sr-RS').replace(/,/g, '.')}\u00A0din`;

function adminOk(req) {
  const k = req.headers['x-kljuc'] || '';
  const a = process.env.ADMIN_KLJUC || '';
  if (!a || k.length !== a.length) return false;
  return crypto.timingSafeEqual(Buffer.from(k), Buffer.from(a));
}
function kalendarKljuc() { return crypto.createHash('sha256').update('kal:' + (process.env.ADMIN_KLJUC || '')).digest('hex').slice(0, 32); }

// ───────── MEJLOVI ─────────
async function posaljiMejl(to, subject, html) {
  if (!process.env.RESEND_API_KEY || !to) return false;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.MAIL_OD || 'MathIA <onboarding@resend.dev>', to, subject, html, reply_to: MAIL_MARINA }),
    });
    return r.ok;
  } catch { return false; }
}
function okvir(naslov, telo) {
  return `<div style="background:#FBF6EE;padding:28px 12px;font-family:Arial,Helvetica,sans-serif;color:#432C37">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:18px;padding:28px 26px;border:1px solid #E7D2A2">
  <div style="font-family:Georgia,serif;font-size:13px;letter-spacing:3px;color:#9C7838">MATHIA EDU</div>
  <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:26px;margin:10px 0 18px">${naslov}</h1>
  <div style="font-size:15px;line-height:1.6">${telo}</div>
  <p style="margin-top:26px;font-size:15px">Radujemo se susretu i zajedničkom radu!<br><i>MathIA tim</i></p></div></div>`;
}
function detaljiHtml(c) {
  return `<table style="width:100%;border-collapse:collapse;font-size:15px;margin:6px 0 16px">
  <tr><td style="padding:6px 0;color:#9C7838">Termin</td><td style="padding:6px 0;text-align:right"><b>${lepDatum(c.datum)} u\u00A0${sat2(c.vreme)}</b></td></tr>
  <tr><td style="padding:6px 0;color:#9C7838">Čas</td><td style="padding:6px 0;text-align:right">${c.tip === 'individualni' ? 'Individualni' : 'Grupni'}, ${c.nacin === 'online' ? 'online' : 'uživo'}${c.predmet ? ' — ' + esc(c.predmet) : ''}</td></tr>
  <tr><td style="padding:6px 0;color:#9C7838">Cena</td><td style="padding:6px 0;text-align:right">${dinari(c.cena)}${c.tip === 'grupni' ? ' po osobi' : ''}</td></tr></table>`;
}
function nacinHtml(c) {
  if (c.nacin === 'uzivo') return `<p>Srdačno Vas očekujemo na adresi:<br>${ADRESA_HTML}</p><p>Čas se plaća posle održanog časa.</p>`;
  const link = process.env.ONLINE_LINK;
  return `<p>Čas se održava online. ${link ? `Link za čas: <a href="${esc(link)}" style="color:#B01E48">${esc(link)}</a>` : 'Link za čas dobićete pre početka.'}</p>
  <p>Plaćanje posle časa, uplatom na račun <b style="white-space:nowrap">${RACUN}</b> (Marina Bulat).</p>`;
}
function pravilaHtml(c) {
  return `<p style="font-size:13px;color:#7a6470;border-top:1px solid #F7EAC9;padding-top:14px;margin-top:18px">
  Termin možete otkazati bez troškova najkasnije ${OTKAZ_SATI}\u00A0h pre časa: <a href="${SAJT}/otkazivanje.html?t=${c.token}" style="color:#B01E48">otkaži čas</a>.
  Ako otkazivanje stigne kasnije ili izostanete bez najave, čas se smatra održanim i naplaćuje se u punom iznosu. Hvala što poštujete naše i vaše vreme!</p>`;
}

// ───────── SLOBODNI TERMINI ─────────
async function stanje(od, doDatum) {
  const [casovi, blok] = await Promise.all([
    sb(`casovi?select=datum,vreme,nacin,tip&status=eq.zakazan&datum=gte.${od}&datum=lte.${doDatum}`),
    sb(`blokade?select=datum,vreme&datum=gte.${od}&datum=lte.${doDatum}`),
  ]);
  return { casovi, blok };
}
function terminiZaDan(datum, casovi, blok, sada) {
  const dow = danUNedelji(datum);
  const r = RADNO[dow];
  if (!r) return { datum, dow, zatvoreno: true, termini: [] };
  const ceoDanBlok = blok.some((b) => b.datum === datum && (b.vreme === null || b.vreme === undefined));
  const termini = [];
  for (let h = r[0]; h < r[1]; h++) {
    const t = trenutak(datum, h);
    let status = 'slobodno', mesta = MAX_GRUPA, nacin = null;
    if (ceoDanBlok || blok.some((b) => b.datum === datum && b.vreme === h)) status = 'zauzeto';
    else if (t - sada < MIN_SATI_UNAPRED * 3600e3) status = 'proslo';
    else {
      const tu = casovi.filter((c) => c.datum === datum && c.vreme === h);
      if (tu.some((c) => c.tip === 'individualni')) status = 'zauzeto';
      else if (tu.length) {
        nacin = tu[0].nacin; mesta = MAX_GRUPA - tu.length;
        status = mesta > 0 ? 'grupa' : 'zauzeto';
      }
    }
    termini.push({ sat: h, status, mesta: status === 'grupa' || status === 'slobodno' ? mesta : 0, nacin });
  }
  return { datum, dow, zatvoreno: false, termini };
}

// ───────── ICS kalendar ─────────
function icsVreme(ms) { return new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
function icsTekst(s) { return String(s ?? '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); }

// ───────── HANDLER ─────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-kljuc');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const q = req.query || {};
  const b = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) || {};
  const akcija = q.akcija || b.akcija;
  const posalji = (kod, obj) => res.status(kod).json(obj);

  if (!SB_URL || !SB_KEY) return posalji(500, { greska: 'Server nije podešen (Supabase).' });

  try {
    // ── Javno: slobodni termini za period (do 14 dana)
    if (akcija === 'termini') {
      const danas = danasBg();
      let od = okDatum(q.od) ? q.od : danas;
      if (od < danas) od = danas;
      const max = dodajDane(danas, DANA_UNAPRED);
      let doD = dodajDane(od, Math.min(Math.max(+q.dani || 7, 1), 14) - 1);
      if (doD > max) doD = max;
      if (od > max) return posalji(200, { dani: [], max });
      const { casovi, blok } = await stanje(od, doD);
      const sada = Date.now(), dani = [];
      for (let d = od; d <= doD; d = dodajDane(d, 1)) dani.push(terminiZaDan(d, casovi, blok, sada));
      res.setHeader('Cache-Control', 'no-store');
      return posalji(200, { dani, danas, max, cene: CENE, maxGrupa: MAX_GRUPA, otkazSati: OTKAZ_SATI });
    }

    // ── Javno: zakazivanje
    if (akcija === 'zakazi' && req.method === 'POST') {
      const datum = b.datum, sat = +b.sat;
      const nacin = b.nacin === 'uzivo' ? 'uzivo' : b.nacin === 'online' ? 'online' : null;
      const tip = b.tip === 'grupni' ? 'grupni' : b.tip === 'individualni' ? 'individualni' : null;
      const ime = String(b.ime || '').trim().slice(0, 80);
      const email = String(b.email || '').trim().toLowerCase().slice(0, 120);
      const telefon = String(b.telefon || '').trim().slice(0, 30);
      const predmet = String(b.predmet || '').trim().slice(0, 80);
      const napomena = String(b.napomena || '').trim().slice(0, 600);
      if (b.web) return posalji(200, { ok: true }); // zamka za botove
      if (!okDatum(datum) || !Number.isInteger(sat) || !nacin || !tip) return posalji(400, { greska: 'Nepotpun zahtev.' });
      if (ime.length < 3) return posalji(400, { greska: 'Unesite ime i prezime.' });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return posalji(400, { greska: 'Unesite ispravnu mejl adresu.' });
      if (telefon.replace(/\D/g, '').length < 6) return posalji(400, { greska: 'Unesite broj telefona.' });

      const danas = danasBg();
      if (datum < danas || datum > dodajDane(danas, DANA_UNAPRED)) return posalji(400, { greska: 'Taj datum nije dostupan za zakazivanje.' });
      const { casovi, blok } = await stanje(datum, datum);
      const dan = terminiZaDan(datum, casovi, blok, Date.now());
      const t = dan.termini.find((x) => x.sat === sat);
      if (!t || t.status === 'proslo') return posalji(400, { greska: 'Taj termin nije dostupan.' });
      if (t.status === 'zauzeto') return posalji(409, { greska: PORUKE.ZAUZETO });

      let cas;
      try {
        cas = await sb('rpc/zakazi_cas', { method: 'POST', body: {
          p_datum: datum, p_vreme: sat, p_nacin: nacin, p_tip: tip, p_ime: ime, p_email: email,
          p_telefon: telefon, p_predmet: predmet, p_napomena: napomena, p_izvor: 'sajt',
          p_max_grupa: MAX_GRUPA, p_cena_ind: CENE.individualni, p_cena_grp: CENE.grupni } });
      } catch (e) {
        if (PORUKE[e.kod]) return posalji(409, { greska: PORUKE[e.kod] });
        throw e;
      }

      const ucenik = okvir('Potvrda zakazanog časa', `<p>Poštovani/a ${esc(ime.split(' ')[0])}, hvala Vam što ste zakazali čas!</p>${detaljiHtml(cas)}${nacinHtml(cas)}${pravilaHtml(cas)}`);
      const marina = okvir('Novi zakazan čas', `${detaljiHtml(cas)}<p><b>${esc(ime)}</b><br>${esc(email)}<br>${esc(telefon)}</p>${napomena ? `<p style="background:#FBF6EE;padding:10px 12px;border-radius:10px">${esc(napomena)}</p>` : ''}`);
      const [m1] = await Promise.all([
        posaljiMejl(email, `Potvrda časa — ${lepDatum(cas.datum)} u ${sat2(cas.vreme)}`, ucenik),
        posaljiMejl(MAIL_MARINA, `Novi čas: ${ime} — ${lepDatum(cas.datum)} ${sat2(cas.vreme)}`, marina),
      ]);
      return posalji(200, { ok: true, mejlPoslat: m1, token: cas.token,
        cas: { datum: cas.datum, sat: cas.vreme, nacin: cas.nacin, tip: cas.tip, cena: cas.cena, pocetak: new Date(trenutak(cas.datum, cas.vreme)).toISOString() } });
    }

    // ── Javno: podaci o času preko tokena (stranica za otkazivanje)
    if (akcija === 'cas') {
      const t = String(q.t || '');
      if (!/^[0-9a-f-]{36}$/i.test(t)) return posalji(400, { greska: 'Neispravan link.' });
      const [c] = await sb(`casovi?select=datum,vreme,nacin,tip,cena,status,ime&token=eq.${t}`);
      if (!c) return posalji(404, { greska: 'Čas nije pronađen.' });
      const doCasa = (trenutak(c.datum, c.vreme) - Date.now()) / 3600e3;
      return posalji(200, { cas: { ...c, ime: c.ime.split(' ')[0] }, mozeOtkaz: c.status === 'zakazan' && doCasa >= OTKAZ_SATI, proslo: doCasa < 0, otkazSati: OTKAZ_SATI });
    }

    // ── Javno: otkazivanje
    if (akcija === 'otkazi' && req.method === 'POST') {
      const t = String(b.t || '');
      if (!/^[0-9a-f-]{36}$/i.test(t)) return posalji(400, { greska: 'Neispravan link.' });
      const [c] = await sb(`casovi?select=*&token=eq.${t}`);
      if (!c) return posalji(404, { greska: 'Čas nije pronađen.' });
      if (c.status === 'otkazan') return posalji(200, { ok: true, vec: true });
      if ((trenutak(c.datum, c.vreme) - Date.now()) / 3600e3 < OTKAZ_SATI)
        return posalji(400, { greska: `Otkazivanje preko sajta je moguće najkasnije ${OTKAZ_SATI} h pre časa. Javite se direktno.` });
      await sb(`casovi?token=eq.${t}`, { method: 'PATCH', body: { status: 'otkazan', otkazano_at: new Date().toISOString() } });
      await Promise.all([
        posaljiMejl(c.email, 'Čas je otkazan', okvir('Čas je otkazan', `<p>Vaš čas je uspešno otkazan.</p>${detaljiHtml(c)}<p>Novi termin možete izabrati na <a href="${SAJT}/zakazivanje.html" style="color:#B01E48">stranici za zakazivanje</a>.</p>`)),
        posaljiMejl(MAIL_MARINA, `Otkazan čas: ${c.ime} — ${lepDatum(c.datum)} ${sat2(c.vreme)}`, okvir('Učenik je otkazao čas', `${detaljiHtml(c)}<p><b>${esc(c.ime)}</b><br>${esc(c.email || '')}<br>${esc(c.telefon || '')}</p>`)),
      ]);
      return posalji(200, { ok: true });
    }

    // ── Kalendar (pretplata u Google kalendaru)
    if (akcija === 'kalendar') {
      if (!process.env.ADMIN_KLJUC || q.k !== kalendarKljuc()) return res.status(403).send('Zabranjeno');
      const od = dodajDane(danasBg(), -60), doD = dodajDane(danasBg(), 120);
      const lista = await sb(`casovi?select=*&status=eq.zakazan&datum=gte.${od}&datum=lte.${doD}&order=datum,vreme`);
      const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//MATHIA EDU//Casovi//SR', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:MathIA časovi', 'X-WR-TIMEZONE:Europe/Belgrade'];
      const sad = icsVreme(Date.now());
      for (const c of lista) {
        const p = trenutak(c.datum, c.vreme);
        L.push('BEGIN:VEVENT', `UID:${c.id}@mathia.rs`, `DTSTAMP:${sad}`, `DTSTART:${icsVreme(p)}`, `DTEND:${icsVreme(p + 3600e3)}`,
          `SUMMARY:${icsTekst(`${c.ime} — ${c.tip === 'grupni' ? 'grupni' : 'ind.'}, ${c.nacin === 'online' ? 'online' : 'uživo'}`)}`,
          `DESCRIPTION:${icsTekst([c.predmet, c.telefon, c.email, c.napomena, `${c.cena} din${c.placeno ? ' (plaćeno)' : ''}`].filter(Boolean).join('\n'))}`,
          'END:VEVENT');
      }
      L.push('END:VCALENDAR');
      res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
      return res.status(200).send(L.join('\r\n'));
    }

    // ── Automatski podsetnici (Vercel cron, jednom dnevno)
    if (akcija === 'podsetnici') {
      const auth = req.headers.authorization || '';
      if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) return posalji(403, { greska: 'Zabranjeno' });
      const sutra = dodajDane(danasBg(), 1);
      const lista = await sb(`casovi?select=*&status=eq.zakazan&podsetnik_poslat=eq.false&datum=eq.${sutra}`);
      let n = 0;
      for (const c of lista) {
        if (!c.email) continue;
        const ok = await posaljiMejl(c.email, `Podsetnik: čas sutra u ${sat2(c.vreme)}`, okvir('Podsetnik za sutrašnji čas', `<p>Podsećamo Vas na čas koji je zakazan za sutra.</p>${detaljiHtml(c)}${nacinHtml(c)}`));
        if (ok) { n++; await sb(`casovi?id=eq.${c.id}`, { method: 'PATCH', body: { podsetnik_poslat: true } }); }
      }
      return posalji(200, { ok: true, poslato: n });
    }

    // ───────── ADMIN ─────────
    if (String(akcija || '').startsWith('admin')) {
      if (!process.env.ADMIN_KLJUC) return posalji(500, { greska: 'ADMIN_KLJUC nije podešen na Vercelu.' });
      if (!adminOk(req)) return posalji(401, { greska: 'Pogrešna lozinka.' });

      if (akcija === 'admin_lista') {
        const od = okDatum(q.od) ? q.od : danasBg();
        const doD = okDatum(q.do) ? q.do : dodajDane(od, 13);
        const [casovi, blokade] = await Promise.all([
          sb(`casovi?select=*&datum=gte.${od}&datum=lte.${doD}&order=datum,vreme,created_at`),
          sb(`blokade?select=*&datum=gte.${od}&datum=lte.${doD}&order=datum,vreme`),
        ]);
        return posalji(200, { casovi, blokade, kalendar: `https://${req.headers.host}/api/zakazivanje?akcija=kalendar&k=${kalendarKljuc()}` });
      }
      if (akcija === 'admin_dodaj' && req.method === 'POST') {
        if (!okDatum(b.datum) || !Number.isInteger(+b.sat) || !['online', 'uzivo'].includes(b.nacin) || !['individualni', 'grupni'].includes(b.tip) || !String(b.ime || '').trim())
          return posalji(400, { greska: 'Popuni datum, vreme, način, vrstu i ime.' });
        let cas;
        try {
          cas = await sb('rpc/zakazi_cas', { method: 'POST', body: {
            p_datum: b.datum, p_vreme: +b.sat, p_nacin: b.nacin, p_tip: b.tip, p_ime: String(b.ime).trim(),
            p_email: String(b.email || '').trim().toLowerCase(), p_telefon: b.telefon || '', p_predmet: b.predmet || '',
            p_napomena: b.napomena || '', p_izvor: b.izvor || 'rucno', p_max_grupa: MAX_GRUPA,
            p_cena_ind: CENE.individualni, p_cena_grp: CENE.grupni } });
        } catch (e) { if (PORUKE[e.kod]) return posalji(409, { greska: PORUKE[e.kod] }); throw e; }
        if (b.posaljiMejl && cas.email)
          await posaljiMejl(cas.email, `Potvrda časa — ${lepDatum(cas.datum)} u ${sat2(cas.vreme)}`, okvir('Potvrda zakazanog časa', `<p>Poštovani/a ${esc(cas.ime.split(' ')[0])}, Vaš čas je zakazan.</p>${detaljiHtml(cas)}${nacinHtml(cas)}${pravilaHtml(cas)}`));
        return posalji(200, { ok: true, cas });
      }
      if (akcija === 'admin_izmeni' && req.method === 'POST') {
        const id = String(b.id || '');
        if (!/^[0-9a-f-]{36}$/i.test(id)) return posalji(400, { greska: 'Neispravan ID.' });
        const izmena = {};
        if (typeof b.placeno === 'boolean') izmena.placeno = b.placeno;
        if (b.status === 'otkazan') { izmena.status = 'otkazan'; izmena.otkazano_at = new Date().toISOString(); }
        if (b.status === 'zakazan') { izmena.status = 'zakazan'; izmena.otkazano_at = null; }
        if (Number.isInteger(b.cena) && b.cena >= 0) izmena.cena = b.cena;
        await sb(`casovi?id=eq.${id}`, { method: 'PATCH', body: izmena });
        return posalji(200, { ok: true });
      }
      if (akcija === 'admin_blokiraj' && req.method === 'POST') {
        if (!okDatum(b.datum)) return posalji(400, { greska: 'Izaberi datum.' });
        const doD = okDatum(b.doDatum) && b.doDatum >= b.datum ? b.doDatum : b.datum;
        const redovi = [];
        for (let d = b.datum; d <= doD && redovi.length < 62; d = dodajDane(d, 1))
          redovi.push({ datum: d, vreme: b.sat === '' || b.sat === null || b.sat === undefined ? null : +b.sat, razlog: String(b.razlog || '').slice(0, 120) });
        await sb('blokade', { method: 'POST', body: redovi });
        return posalji(200, { ok: true });
      }
      if (akcija === 'admin_odblokiraj' && req.method === 'POST') {
        if (!/^[0-9a-f-]{36}$/i.test(String(b.id || ''))) return posalji(400, { greska: 'Neispravan ID.' });
        await sb(`blokade?id=eq.${b.id}`, { method: 'DELETE' });
        return posalji(200, { ok: true });
      }
      if (akcija === 'admin_zarada') {
        const mes = /^\d{4}-\d{2}$/.test(q.mesec || '') ? q.mesec : danasBg().slice(0, 7);
        const [y, m] = mes.split('-').map(Number);
        const kraj = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
        const lista = await sb(`casovi?select=datum,vreme,cena,placeno,tip,nacin,ime&status=eq.zakazan&datum=gte.${mes}-01&datum=lte.${kraj}&order=datum,vreme`);
        const sada = Date.now();
        const odrzani = lista.filter((c) => trenutak(c.datum, c.vreme) < sada);
        const sum = (a) => a.reduce((s, c) => s + c.cena, 0);
        return posalji(200, {
          mesec: mes, ukupnoCasova: lista.length, odrzano: odrzani.length,
          naplaceno: sum(lista.filter((c) => c.placeno)),
          zaNaplatu: sum(odrzani.filter((c) => !c.placeno)),
          ocekivano: sum(lista),
          nenaplaceni: odrzani.filter((c) => !c.placeno),
        });
      }
      return posalji(400, { greska: 'Nepoznata akcija.' });
    }

    return posalji(400, { greska: 'Nepoznata akcija.' });
  } catch (e) {
    console.error(e);
    return posalji(500, { greska: 'Došlo je do greške. Pokušajte ponovo ili se javite direktno.' });
  }
}
