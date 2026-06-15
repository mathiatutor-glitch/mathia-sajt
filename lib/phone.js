// ============================================================
//  lib/phone.js — srpski brojevi u jedinstven +381 oblik
// ============================================================
export function normPhone(input) {
  let d = String(input || "").replace(/[^\d+]/g, "");
  if (d[0] === "+") d = d.slice(1);
  d = d.replace(/^0+/, "");
  if (d.indexOf("381") === 0) d = d.slice(3);
  d = d.replace(/^0+/, "");
  return "+381" + d;
}
export function phoneValid(input) {
  const n = normPhone(input).replace(/^\+381/, "");
  return /^\d{8,10}$/.test(n);
}
// +38160••••123  (za vodeni žig — prepoznatljivo, ali ne ceo broj)
export function maskPhone(p) {
  const s = String(p || "");
  return s.length < 7 ? s : s.slice(0, 6) + "••••" + s.slice(-3);
}
