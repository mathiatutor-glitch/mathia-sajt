// ============================================================
//  api/me.js — profil prijavljenog korisnika (napredak + cilj)
//  GET  /api/me            -> { ok, profile }   (trial, zvezdice, niz, bedževi, goal)
//  POST /api/me  {goal}    -> sačuva cilj iz onboardinga, vrati { ok, profile }
//  Bez prijave: { ok:false } (frontend tada vodi na /prijava.html).
// ============================================================
import { getSessionPhone } from "../lib/auth.js";
import { getUser, saveUser, setGoal, publicProfile } from "../lib/user.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  const phone = await getSessionPhone(req);
  if (!phone) return res.status(200).json({ ok: false, error: "not_authenticated" });

  try {
    const u = await getUser(phone);

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      if (body && body.goal) { setGoal(u, body.goal); await saveUser(u); }
    } else if (req.method !== "GET") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    return res.status(200).json({ ok: true, profile: publicProfile(u) });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String((e && e.message) || e) });
  }
}
