// ============================================================
//  lib/kv.js — mali REST klijent za bazu (Vercel KV ili Upstash Redis)
//  Bez npm zavisnosti: koristi običan fetch ka REST API-ju.
//  Podešava se preko Environment Variables u Vercel-u:
//    KV_REST_API_URL + KV_REST_API_TOKEN        (Vercel KV — najlakše)
//    ili UPSTASH_REDIS_REST_URL + ..._TOKEN     (Upstash)
// ============================================================
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

export function kvConfigured() { return !!(URL_ && TOKEN); }

async function cmd(args) {
  if (!URL_ || !TOKEN) throw new Error("Baza (KV) nije podešena: dodaj KV_REST_API_URL i KV_REST_API_TOKEN.");
  const r = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || (d && d.error)) throw new Error("KV greška: " + ((d && d.error) || ("HTTP " + r.status)));
  return d.result;
}

export async function kvGet(key) {
  const v = await cmd(["GET", key]);
  if (v == null) return null;
  try { return JSON.parse(v); } catch (e) { return v; }
}
export async function kvSet(key, val, ttlSeconds) {
  const s = typeof val === "string" ? val : JSON.stringify(val);
  return ttlSeconds ? cmd(["SET", key, s, "EX", String(ttlSeconds)]) : cmd(["SET", key, s]);
}
export async function kvDel(key) { return cmd(["DEL", key]); }

// INCR + postavi rok samo prvi put (za rate-limit brojače)
export async function kvIncrTtl(key, ttlSeconds) {
  const n = await cmd(["INCR", key]);
  if (n === 1 && ttlSeconds) await cmd(["EXPIRE", key, String(ttlSeconds)]);
  return n;
}
