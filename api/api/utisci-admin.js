// ============================================================
//  api/utisci-admin.js — administracija utisaka (recenzija)
//  Pristup SAMO za admina (email iz ADMIN_EMAILS), preko Supabase tokena.
//  Koristi SUPABASE_SERVICE_KEY (tajni, server-only) da zaobiđe RLS.
//
//  GET   /api/utisci-admin            -> { ok, utisci:[...] }  (svi: i neodobreni)
//  POST  /api/utisci-admin  {id, action}
//        action = "approve"  -> odobreno=true
//        action = "unapprove"-> odobreno=false (skloni sa sajta)
//        action = "delete"   -> obriši utisak
// ============================================================
import { sbUser, tokenFromReq } from "../lib/sbauth.js";
import { isAdmin } from "../lib/user.js";

const SB_URL = process.env.SUPABASE_URL || "https://ibhirxltgeyecrjwymai.supabase.co";
const SB_SERVICE = process.env.SUPABASE_SERVICE_KEY || "";
const TABLE = "mathia_utisci";

function svcHeaders(extra) {
  return Object.assign({
    apikey: SB_SERVICE,
    Authorization: "Bearer " + SB_SERVICE,
    "Content-Type": "application/json"
  }, extra || {});
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (!SB_SERVICE) return res.status(500).json({ ok: false, error: "SUPABASE_SERVICE_KEY nije postavljen" });

  let body = {};
  if (req.method === "POST") {
    try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {}); } catch (e) { body = {}; }
  }

  // —— provera identiteta: mora biti ulogovan Supabase korisnik i mora biti admin ——
  const token = tokenFromReq(req, body);
  const sb = await sbUser(token);
  if (!sb || !sb.email) return res.status(401).json({ ok: false, error: "not_authenticated" });
  if (!isAdmin(sb.email)) return res.status(403).json({ ok: false, error: "not_admin" });

  try {
    if (req.method === "GET") {
      const r = await fetch(
        SB_URL + "/rest/v1/" + TABLE + "?select=id,ime,razred,tekst,zvezdice,odobreno,kreirano&order=odobreno.asc,kreirano.desc",
        { headers: svcHeaders() }
      );
      const utisci = r.ok ? await r.json() : [];
      return res.status(200).json({ ok: true, utisci });
    }

    if (req.method === "POST") {
      const id = String(body.id || "").trim();
      const action = String(body.action || "").trim();
      if (!id) return res.status(400).json({ ok: false, error: "nedostaje id" });

      if (action === "approve" || action === "unapprove") {
        const r = await fetch(SB_URL + "/rest/v1/" + TABLE + "?id=eq." + encodeURIComponent(id), {
          method: "PATCH",
          headers: svcHeaders({ Prefer: "return=minimal" }),
          body: JSON.stringify({ odobreno: action === "approve" })
        });
        if (!r.ok) return res.status(500).json({ ok: false, error: await r.text() });
        return res.status(200).json({ ok: true });
      }

      if (action === "delete") {
        const r = await fetch(SB_URL + "/rest/v1/" + TABLE + "?id=eq." + encodeURIComponent(id), {
          method: "DELETE",
          headers: svcHeaders({ Prefer: "return=minimal" })
        });
        if (!r.ok) return res.status(500).json({ ok: false, error: await r.text() });
        return res.status(200).json({ ok: true });
      }

      return res.status(400).json({ ok: false, error: "nepoznata akcija" });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String((e && e.message) || e) });
  }
}
