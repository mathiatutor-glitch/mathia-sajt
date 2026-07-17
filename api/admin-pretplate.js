// ============================================================
//  api/admin-pretplate.js — administracija pretplata
//  Za kupce koji plate NA RAČUN (IPS QR) — njihova uplata ne stiže do baze,
//  pa se pretplata aktivira ovde ručno.
//
//  Pristup SAMO za admina (email iz ADMIN_EMAILS), preko Supabase tokena.
//  Koristi SUPABASE_SERVICE_KEY (server-only) da zaobiđe RLS.
//
//  GET  /api/admin-pretplate            -> { ok, pretplate:[...], porudzbine:[...], nalozi:[...] }
//  POST /api/admin-pretplate {akcija, ...}
//       akcija="aktiviraj" {email, paket, predmeti:[], dana?}  -> nova/produžena pretplata
//       akcija="produzi"   {id, dana}                          -> pomeri rok
//       akcija="ukini"     {id}                                -> status='istekla'
//       akcija="predmeti"  {id, predmeti:[]}                   -> izmeni predmete
// ============================================================
import { sbUser, tokenFromReq } from "../lib/sbauth.js";
import { isAdmin } from "../lib/user.js";

const SB_URL = process.env.SUPABASE_URL || "https://ibhirxltgeyecrjwymai.supabase.co";
const SB_SERVICE = process.env.SUPABASE_SERVICE_KEY || "";

// Broj predmeta po paketu — mora da odgovara lib/proizvodi.js i gate.js
const LIMIT = { basic: 1, gold: 2, diamond: 3 };

function svcHeaders(extra) {
  return Object.assign({
    apikey: SB_SERVICE,
    Authorization: "Bearer " + SB_SERVICE,
    "Content-Type": "application/json",
  }, extra || {});
}

async function sbFetch(path, opts) {
  const r = await fetch(SB_URL + "/rest/v1/" + path, Object.assign({ headers: svcHeaders(opts && opts.headers) }, opts || {}));
  const t = await r.text();
  let j = null; try { j = t ? JSON.parse(t) : null; } catch (e) { j = null; }
  if (!r.ok) throw new Error((j && (j.message || j.error)) || t || ("HTTP " + r.status));
  return j;
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

  // —— identitet: mora biti ulogovan Supabase korisnik i mora biti admin ——
  const token = tokenFromReq(req, body);
  const sb = await sbUser(token);
  if (!sb || !sb.email) return res.status(401).json({ ok: false, error: "not_authenticated" });
  if (!isAdmin(sb.email)) return res.status(403).json({ ok: false, error: "not_admin" });

  try {
    if (req.method === "GET") {
      const [pretplate, porudzbine] = await Promise.all([
        sbFetch("pretplate?select=*&order=created_at.desc"),
        sbFetch("porudzbine?select=id,kupac_email,kupac_ime,iznos_rsd,tip,status,stavke,created_at&order=created_at.desc&limit=60"),
      ]);
      // nalozi (auth.users nije dostupan preko REST-a → admin endpoint)
      let nalozi = [];
      try {
        const r = await fetch(SB_URL + "/auth/v1/admin/users?per_page=200", { headers: svcHeaders() });
        if (r.ok) {
          const j = await r.json();
          nalozi = (j.users || []).map((u) => ({ email: u.email, kreiran: u.created_at, poslednja: u.last_sign_in_at }));
        }
      } catch (e) { /* nije kriticno */ }
      return res.status(200).json({ ok: true, pretplate, porudzbine, nalozi, limit: LIMIT });
    }

    if (req.method === "POST") {
      const akcija = String(body.akcija || "").trim();

      if (akcija === "aktiviraj") {
        const email = String(body.email || "").trim().toLowerCase();
        const paket = String(body.paket || "").trim().toLowerCase();
        const predmeti = Array.isArray(body.predmeti) ? body.predmeti.map((x) => String(x).trim()).filter(Boolean) : [];
        const dana = Math.max(1, Math.min(400, parseInt(body.dana || 30, 10) || 30));
        if (!email || email.indexOf("@") < 1) return res.status(400).json({ ok: false, error: "Neispravan e-mail." });
        if (!LIMIT[paket]) return res.status(400).json({ ok: false, error: "Paket mora biti basic, gold ili diamond." });
        if (!predmeti.length) return res.status(400).json({ ok: false, error: "Izaberi bar jedan predmet." });
        if (predmeti.length > LIMIT[paket]) {
          return res.status(400).json({ ok: false, error: paket + " paket pokriva " + LIMIT[paket] + " predmet(a), a poslato je " + predmeti.length + "." });
        }

        // Postoji li već aktivna pretplata na isti paket? → produži je (ne pravi duplikat).
        const post = await sbFetch("pretplate?select=*&kupac_email=ilike." + encodeURIComponent(email) + "&paket=eq." + encodeURIComponent(paket));
        const sada = new Date();
        const stara = (post && post[0]) || null;
        const osnova = (stara && stara.istice && new Date(stara.istice) > sada) ? new Date(stara.istice) : sada;
        const istice = new Date(osnova.getTime() + dana * 24 * 3600 * 1000);

        if (stara) {
          await sbFetch("pretplate?id=eq." + stara.id, {
            method: "PATCH",
            headers: { Prefer: "return=minimal" },
            body: JSON.stringify({ predmeti, istice, status: "aktivna", obavesten_o_isteku: false }),
          });
          return res.status(200).json({ ok: true, poruka: "Produžena postojeća pretplata do " + istice.toISOString().slice(0, 10) + ".", istice });
        }
        await sbFetch("pretplate", {
          method: "POST",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify({ kupac_email: email, paket, predmeti, pocinje: sada, istice, status: "aktivna", obavesten_o_isteku: false }),
        });
        return res.status(200).json({ ok: true, poruka: "Aktivirano do " + istice.toISOString().slice(0, 10) + ".", istice });
      }

      if (akcija === "produzi") {
        const id = String(body.id || "").trim();
        const dana = Math.max(1, Math.min(400, parseInt(body.dana || 30, 10) || 30));
        if (!id) return res.status(400).json({ ok: false, error: "nedostaje id" });
        const rows = await sbFetch("pretplate?select=*&id=eq." + encodeURIComponent(id));
        const r0 = rows && rows[0];
        if (!r0) return res.status(404).json({ ok: false, error: "Pretplata nije nađena." });
        const sada = new Date();
        const osnova = (r0.istice && new Date(r0.istice) > sada) ? new Date(r0.istice) : sada;
        const istice = new Date(osnova.getTime() + dana * 24 * 3600 * 1000);
        await sbFetch("pretplate?id=eq." + id, {
          method: "PATCH", headers: { Prefer: "return=minimal" },
          body: JSON.stringify({ istice, status: "aktivna", obavesten_o_isteku: false }),
        });
        return res.status(200).json({ ok: true, poruka: "Produženo do " + istice.toISOString().slice(0, 10) + ".", istice });
      }

      if (akcija === "ukini") {
        const id = String(body.id || "").trim();
        if (!id) return res.status(400).json({ ok: false, error: "nedostaje id" });
        await sbFetch("pretplate?id=eq." + id, {
          method: "PATCH", headers: { Prefer: "return=minimal" },
          body: JSON.stringify({ status: "istekla" }),
        });
        return res.status(200).json({ ok: true, poruka: "Pretplata je ukinuta." });
      }

      if (akcija === "predmeti") {
        const id = String(body.id || "").trim();
        const predmeti = Array.isArray(body.predmeti) ? body.predmeti.map((x) => String(x).trim()).filter(Boolean) : [];
        if (!id) return res.status(400).json({ ok: false, error: "nedostaje id" });
        const rows = await sbFetch("pretplate?select=*&id=eq." + encodeURIComponent(id));
        const r0 = rows && rows[0];
        if (!r0) return res.status(404).json({ ok: false, error: "Pretplata nije nađena." });
        const lim = LIMIT[String(r0.paket || "").toLowerCase()] || 1;
        if (predmeti.length > lim) return res.status(400).json({ ok: false, error: r0.paket + " paket pokriva " + lim + " predmet(a)." });
        await sbFetch("pretplate?id=eq." + id, {
          method: "PATCH", headers: { Prefer: "return=minimal" },
          body: JSON.stringify({ predmeti }),
        });
        return res.status(200).json({ ok: true, poruka: "Predmeti su izmenjeni." });
      }

      return res.status(400).json({ ok: false, error: "Nepoznata akcija." });
    }

    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String((e && e.message) || e) });
  }
}
