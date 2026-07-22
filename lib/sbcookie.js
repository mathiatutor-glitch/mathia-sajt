// ============================================================
//  lib/sbcookie.js — most između Supabase prijave (mejl) i middleware-a.
//
//  ZAŠTO POSTOJI: Supabase čuva sesiju u localStorage, a middleware radi na
//  Edge-u i vidi SAMO kolačiće. Bez ovoga pretplatnik koji se prijavi mejlom
//  ne može da otvori -Skripta/-Formule — middleware ga ne prepozna i pošalje
//  na prijava.html (koja traži telefon). Zato prijava upiše token u kolačić,
//  a middleware ga ovde proveri kod Supabase-a i pogleda tabelu `pretplate`.
//
//  Bez npm zavisnosti — običan fetch, radi na Edge runtime-u.
// ============================================================
export const SB_COOKIE = "mathia_sb";

const SB_URL = process.env.SUPABASE_URL || "https://ibhirxltgeyecrjwymai.supabase.co";
const SB_ANON = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaGlyeGx0Z2V5ZWNyand5bWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MTYzMzgsImV4cCI6MjA5NzQ5MjMzOH0.nE3xYc5JuUpPETrGP8oEiFWlZnhhuYhxY-XFDBtARXk";
const SB_SERVICE = process.env.SUPABASE_SERVICE_KEY || "";

export function cookieVal(cookie, ime) {
  const m = String(cookie || "").match(new RegExp("(?:^|;\\s*)" + ime + "=([^;]+)"));
  return m ? decodeURIComponent(m[1]) : null;
}

// Token -> email (Supabase sam proverava potpis i rok; mi ne verujemo kolačiću na reč).
export async function emailIzTokena(token) {
  if (!token) return null;
  try {
    const r = await fetch(SB_URL + "/auth/v1/user", {
      headers: { apikey: SB_ANON, Authorization: "Bearer " + token },
    });
    if (!r.ok) return null;
    const u = await r.json();
    return (u && u.email) ? String(u.email).toLowerCase() : null;
  } catch (e) { return null; }
}

// Ima li aktivnu pretplatu? Vraća {aktivna, predmeti:[]}.
// ilike = poklapanje bez obzira na velika/mala slova (isto kao lib/supabase.js).
export async function pretplataZaEmail(email) {
  if (!email || !SB_SERVICE) return { aktivna: false, predmeti: [] };
  try {
    const url = SB_URL + "/rest/v1/pretplate?select=predmeti,istice,status"
      + "&kupac_email=ilike." + encodeURIComponent(email) + "&status=eq.aktivna";
    const r = await fetch(url, { headers: { apikey: SB_SERVICE, Authorization: "Bearer " + SB_SERVICE } });
    if (!r.ok) return { aktivna: false, predmeti: [] };
    const rows = await r.json();
    const sada = Date.now();
    const vazi = (rows || []).filter((x) => !x.istice || Date.parse(x.istice) > sada);
    const predmeti = [];
    vazi.forEach((x) => (Array.isArray(x.predmeti) ? x.predmeti : []).forEach((p) =>
      String(p).split(",").forEach((k) => { k = k.trim(); if (k) predmeti.push(k); })));
    return { aktivna: vazi.length > 0, predmeti };
  } catch (e) { return { aktivna: false, predmeti: [] }; }
}

const DEFAULT_ADMINS = ["marina.bulat@gmail.com", "mathia.tutor@gmail.com"]; // vlasnik — uvek admin (i bez ADMIN_EMAILS iz env-a)
export function jeAdmin(email) {
  if (!email) return false;
  const lista = DEFAULT_ADMINS
    .concat((process.env.ADMIN_EMAILS || "").split(","))
    .map((e) => e.trim().toLowerCase()).filter(Boolean);
  return lista.includes(String(email).toLowerCase());
}
