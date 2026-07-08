// lib/esir.js
// ──────────────────────────────────────────────────────────────────────────
// Omotač oko eFiskalizacija.cloud (akreditovan ESIR, INFOGRAM DOO BEOGRAD,
// ESIR IB 1522) — multitenant API koji potpisuje i registruje fiskalni
// račun kod Poreske uprave (VSDC), automatski, na svaku uplatu.
//
// PRE NEGO ŠTO OVO PRORADI mora da postoji:
//   1) Bezbednosni element (PFX) otpremljen NA eFiskalizacija.cloud nalog.
//   2) API Ključ + API Secret generisani u Podešavanja → Bezbednost.
//
// ŠTA TREBA UBACITI (Environment Variables u Vercel):
//   ESIR_API_URL     — bazni URL, npr. https://staging.efiskalizacija.cloud
//                       (PAŽNJA: ovo je SANDBOX URL — kad pređeš na pravu
//                       naplatu proveri da li provajder ima drugi URL za
//                       produkciju, i promeni ovde.)
//   ESIR_API_KEY     — X-API-Key (format: efisk_{id}_{hash})
//   ESIR_API_SECRET  — tajni ključ za HMAC potpisivanje (NE deli, NE loguj)
//
// AUTENTIFIKACIJA (potvrđeno, uklj. njihov curl primer — slaže se 1:1):
// 3 headera: X-API-Key, X-Timestamp (unix, ±5 min), X-Signature =
// Base64(HMAC-SHA256(secret, string_to_sign)), gde je
// string_to_sign = "{timestamp}{METHOD}{path}{body_hash}",
// body_hash = SHA256(request_body) kao hex (prazan string "" za GET).
//
// VAŽNO — PDV: Marina Bulat PR MATHIA EDU je PAUŠALAC, VAN sistema PDV-a.
// Zato SVAKA stavka MORA ići sa pdv_stopa: 0 i pdv_kategorija: "nije_u_pdv"
// (potvrđeno iz njihovog primera "4. Sa 0% PDV"). NIKADA ne menjati na 19/20
// osim ako se status PDV-a firme zvanično promeni.
// ──────────────────────────────────────────────────────────────────────────
import crypto from 'node:crypto';

const API_URL = process.env.ESIR_API_URL || 'https://staging.efiskalizacija.cloud';
const API_KEY = process.env.ESIR_API_KEY;
const API_SECRET = process.env.ESIR_API_SECRET;
const ENTRY = '/api/multitenant.php';

export function konfigurisan() {
  return Boolean(API_URL && API_KEY && API_SECRET);
}

function potpisi(method, path, bodyStr) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const bodyHash = crypto.createHash('sha256').update(bodyStr, 'utf8').digest('hex');
  const stringToSign = timestamp + method + path + bodyHash;
  const signature = crypto.createHmac('sha256', API_SECRET).update(stringToSign, 'utf8').digest('base64');
  return { timestamp, signature };
}

async function pozovi(method, subpath, bodyObj) {
  if (!konfigurisan()) throw new Error('ESIR nije podešen — nedostaju ESIR_API_URL/ESIR_API_KEY/ESIR_API_SECRET u .env');
  const path = ENTRY + subpath;
  const bodyStr = method === 'GET' ? '' : JSON.stringify(bodyObj || {});
  const { timestamp, signature } = potpisi(method, path, bodyStr);
  const res = await fetch(API_URL + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      'X-Timestamp': timestamp,
      'X-Signature': signature,
    },
    body: method === 'GET' ? undefined : bodyStr,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || (data && data.success === false)) {
    throw new Error(`ESIR greška: ${res.status} ${data ? JSON.stringify(data) : await res.text().catch(() => '')}`);
  }
  return data;
}

// Stavka iz proizvodi.izracunajIznos(): {sifra,naziv,cena,kolicina,oznaka,iznos}
// → tačan oblik koji eFiskalizacija.cloud očekuje. Pošto smo PAUŠALAC van
// PDV-a, pdv_stopa je UVEK 0 i pdv_kategorija UVEK "nije_u_pdv".
function mapStavka(s) {
  return {
    naziv: s.naziv,
    sifra: s.sifra,
    kolicina: s.kolicina,
    jedinicna_cena: s.cena,
    pdv_stopa: 0,
    pdv_kategorija: 'nije_u_pdv',
    jedinica_mere: 'kom',
  };
}

// Izdaje fiskalni račun (Promet-Prodaja) za listu stavki plaćenih karticom
// (RaiAccept). `detaljno` dolazi iz proizvodi.izracunajIznos().
// Kupca namerno NE šaljemo (imamo samo email, ne i adresu/JMBG/PIB —
// "kupac" nije obavezno polje, jedino obavezno je "stavke").
export async function izdajRacun({ detaljno, ukupno, email, ref }) {
  const racun = {
    broj_racuna: ref,
    napomena: 'Hvala na kupovini — MATHIA EDU',
    stavke: detaljno.map(mapStavka),
    nacin_placanja: 'kartica',
  };
  const data = await pozovi('POST', '/fiskalizacija', racun);
  const d = (data && data.data) || data || {};
  return {
    brojRacuna: d.pfr_broj || d.pfr || d.broj_racuna,
    sdcVreme: d.vreme || d.sdcDateTime,
    qr: d.qr || d.qrUrl,
    esirOznaka: d.esir_oznaka,
    sirovi: data,
  };
}

// Pošalje već fiskalizovan račun na email kupca (PDF u prilogu).
export async function posaljiNaEmail({ pfr, email }) {
  return pozovi('POST', '/send-email', { pfr, email });
}

// Status tenanta i statistike (korisno za proveru konekcije pre prve uplate).
export async function status() {
  return pozovi('GET', '/status');
}

// Test fiskalizacija — radi SAMO u sandbox okruženju (za probu pre produkcije).
export async function testFiskalizacija(payload) {
  return pozovi('POST', '/test', payload);
}

// Refundacija (za reklamacije/odustanak).
// TODO(ESIR): nismo videli "Tipovi Računa" tab — proveriti tačan naziv polja
// za tip transakcije refundacije (verovatno tip_transakcije: "refund" ili
// slično) pre nego što ovo zaživi u produkciji.
export async function refundiraj({ brojOriginala, detaljno }) {
  const racun = {
    broj_racuna: brojOriginala,
    stavke: detaljno.map(mapStavka),
    nacin_placanja: 'kartica',
  };
  return pozovi('POST', '/fiskalizacija', racun);
}
