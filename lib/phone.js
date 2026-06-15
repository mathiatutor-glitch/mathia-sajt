// ============================================================
//  lib/phone.js — telefonski brojevi u jedinstven E.164 oblik
//  Podržava i domaće (Srbija, podrazumevano +381) i međunarodne
//  brojeve (korisnik unese +pozivni, npr. +49, +43, +41 ...).
// ============================================================

// Vraća broj u obliku "+<pozivni><broj>", npr. "+381601234567" ili "+4915112345678"
export function normPhone(input) {
  const raw = String(input || "").trim();

  // da li je korisnik dao pun međunarodni oblik? (vodeći + ili 00)
  const compact = raw.replace(/[^\d+]/g, "");
  let intl = compact.startsWith("+");

  // samo cifre
  let d = raw.replace(/\D/g, "");

  // "00" na početku = međunarodni prefiks -> tretiraj kao "+"
  if (d.startsWith("00")) {
    d = d.slice(2);
    intl = true;
  }

  // pun međunarodni broj sa pozivnim: ostavi kakav jeste
  // (pozivni brojevi nikad ne počinju nulom)
  if (intl) {
    return "+" + d.replace(/^0+/, "");
  }

  // nema + ni 00: domaći unos -> skini vodeću nulu (nacionalni prefiks)
  d = d.replace(/^0+/, "");

  // ako je korisnik ipak ukucao 381... bez +, prihvati to kao Srbiju
  if (d.startsWith("381")) return "+" + d;

  // podrazumevano: Srbija
  return "+381" + d;
}

export function phoneValid(input) {
  const n = normPhone(input).replace(/^\+/, "");
  // E.164: 8–15 cifara ukupno (uključujući pozivni broj zemlje)
  return /^\d{8,15}$/.test(n);
}

// +38160••••123  (za vodeni žig — prepoznatljivo, ali ne ceo broj)
export function maskPhone(p) {
  const s = String(p || "");
  return s.length < 7 ? s : s.slice(0, 6) + "••••" + s.slice(-3);
}
