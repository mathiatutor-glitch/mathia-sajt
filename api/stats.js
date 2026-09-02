// ============================================================
//  api/stats.js — statistika poseta za kontrolnu tablu (SAMO admin)
//  GET /api/stats  -> { ok, kv, days:[{d,v}], total, uToday, u7 }
//  Čita brojače koje upisuje api/hit.js iz KV/Redis-a.
// ============================================================
import { kvCmd, kvConfigured } from "../lib/kv.js";
import { sbUser, tokenFromReq } from "../lib/sbauth.js";
import { isAdmin } from "../lib/user.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();

  const token = tokenFromReq(req, {});
  const sb = await sbUser(token);
  if (!sb || !sb.email) return res.status(401).json({ ok: false, error: "not_authenticated" });
  if (!isAdmin(sb.email)) return res.status(403).json({ ok: false, error: "not_admin" });

  if (!kvConfigured()) return res.status(200).json({ ok: true, kv: false, days: [], total: 0, uToday: 0, u7: 0 });

  try {
    // Dani se racunaju po UTC-u, isto kao u api/hit.js. Ranije je ovde bilo
    // lokalno vreme (setHours/getDate), pa se posle pretvaranja u ISO ceo niz
    // pomerao za jedan dan unazad — "danas" je pokazivao juce, uvek prazno.
    const t = new Date();
    const days = [], vkeys = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() - i));
      const day = d.toISOString().slice(0, 10);
      days.push(day); vkeys.push("mathia:pv:day:" + day);
    }
    // RANIJE su se ovde citali kljucevi "hit:v:*" i "hit:s:*", a api/hit.js
    // upisuje "mathia:pv:*" — nijedan se nije poklapao, pa je tabla UVEK
    // pokazivala nulu, bez obzira koliko poseta stvarno ima.
    const views = (await kvCmd(["MGET", ...vkeys])) || [];
    const total = await kvCmd(["GET", "mathia:pv:total"]);

    let uToday = 0, u7 = 0;
    try { uToday = (await kvCmd(["SCARD", "mathia:pv:sess:" + days[days.length - 1]])) || 0; } catch (e) {}
    try {
      const last7 = days.slice(-7).map((d) => "mathia:pv:sess:" + d);
      const u = await kvCmd(["SUNION", ...last7]);
      u7 = Array.isArray(u) ? u.length : 0;
    } catch (e) {}

    const series = days.map((d, i) => ({ d, v: Number(views[i]) || 0 }));
    return res.status(200).json({ ok: true, kv: true, days: series, total: Number(total) || 0, uToday: Number(uToday) || 0, u7: Number(u7) || 0 });
  } catch (e) {
    return res.status(200).json({ ok: false, error: String((e && e.message) || e) });
  }
}
