// ============================================================
//  api/me.js — profil prijavljenog korisnika (napredak + cilj)
//  GET  /api/me            -> { ok, profile }   (trial, zvezdice, niz, bedževi, goal)
//  POST /api/me  {goal}    -> sačuva cilj iz onboardinga, vrati { ok, profile }
//  Bez prijave: { ok:false } (frontend tada vodi na /prijava.html).
// ============================================================
import { getSessionPhone } from "../lib/auth.js";
import { getUser, saveUser, setGoal, publicProfile } from "../lib/user.js";
import { resolveUid } from "../lib/sbauth.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();

  let body = {};
  if (req.method === "POST") { try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {}); } catch (e) { body = {}; } }

  const uid = await resolveUid(req, body, getSessionPhone);
  if (!uid) return res.status(200).json({ ok: false, error: "not_authenticated" });

  try {
    const u = await getUser(uid);

    if (req.method === "POST") {
      let dirty = false;
      if (body && body.goal) { setGoal(u, body.goal); dirty = true; }
      // Boja korice/planera — čuva se uz profil da ostane ista na svim uređajima
      if (body && typeof body.tema === "string" && /^[a-z0-9_-]{2,20}$/i.test(body.tema)) { u.tema = body.tema.toLowerCase(); dirty = true; }
      if (dirty) await saveUser(u);
    } else if (req.method !== "GET") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    return res.status(200).json({ ok: true, profile: publicProfile(u) });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String((e && e.message) || e) });
  }
}
