// ============================================================
//  api/hit.js — lagani brojač poseta (self-hosted, koristi KV/Redis)
//  Poziva se sa svake stranice (beacon iz i18n-mathia.js).
//  Broji: pregledi po danu (hit:v:<datum>), ukupno (hit:v:total),
//         jedinstveni uređaji po danu (skup hit:s:<datum>).
//  Nema ličnih podataka — samo anoniman deviceId iz localStorage.
// ============================================================
import { kvIncrTtl, kvCmd, kvConfigured } from "../lib/kv.js";

const TTL = 120 * 24 * 3600; // ~120 dana pa se sami brišu

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).end();
  if (!kvConfigured()) return res.status(200).json({ ok: false });

  try {
    let b = {};
    try { b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {}); } catch (e) { b = {}; }
    const dev = String(b.dev || "").replace(/[^\w-]/g, "").slice(0, 64);
    const day = new Date().toISOString().slice(0, 10);

    await kvIncrTtl("hit:v:" + day, TTL);       // pregledi danas
    kvIncrTtl("hit:v:total").catch(() => {});    // ukupno (bez isteka)
    if (dev) {
      try {
        await kvCmd(["SADD", "hit:s:" + day, dev]);
        kvCmd(["EXPIRE", "hit:s:" + day, String(TTL)]).catch(() => {});
      } catch (e) { /* svejedno */ }
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ ok: false });
  }
}
