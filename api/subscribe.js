// ============================================================
//  api/subscribe.js — pretplata
//  ZA SADA: ručna/test aktivacija (da možemo da isprobamo "otključano" stanje).
//  Pošalji header  x-admin-secret: <ADMIN_SECRET>  i {plan} -> nalog se označi
//  kao pretplaćen 30 dana. PRAVA naplata se dodaje kasnije (vidi BACKEND-SETUP.md).
// ============================================================
import { getSessionPhone } from "../lib/auth.js";
import { getUser, saveUser } from "../lib/user.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const phone = await getSessionPhone(req);
    if (!phone) return res.status(401).json({ error: "Prvo se prijavi." });
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const plan = body.plan || "gold";

    const admin = req.headers["x-admin-secret"];
    if (process.env.ADMIN_SECRET && admin === process.env.ADMIN_SECRET) {
      const u = await getUser(phone);
      u.plan = plan;
      u.subscribedUntil = Date.now() + 30 * 24 * 3600 * 1000; // 30 dana (test)
      await saveUser(u);
      return res.status(200).json({ ok: true, plan, subscribedUntil: u.subscribedUntil });
    }

    // PRAVA NAPLATA: ovde ide integracija sa provajderom (Stripe / lokalni PSP).
    return res.status(501).json({ error: "Naplata još nije povezana. Vidi BACKEND-SETUP.md (korak: Naplata)." });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
