// ============================================================
//  api/auth/verify.js — POST {phone, code} -> {ok:true} + postavlja sesiju (cookie)
// ============================================================
import { normPhone, phoneValid } from "../../lib/phone.js";
import { kvGet, kvSet, kvDel, kvConfigured } from "../../lib/kv.js";
import { getUser } from "../../lib/user.js";
import { createToken, cookieHeader } from "../../lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    if (!kvConfigured()) return res.status(500).json({ error: "Baza (KV) nije podešena." });
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    if (!phoneValid(body.phone)) return res.status(400).json({ error: "Neispravan broj telefona." });
    const phone = normPhone(body.phone);
    const code = String(body.code || "").replace(/\D/g, "");

    const rec = await kvGet("otp:" + phone);
    if (!rec) return res.status(400).json({ error: "Kod je istekao. Zatraži novi." });
    if ((rec.attempts || 0) >= 5) { await kvDel("otp:" + phone); return res.status(429).json({ error: "Previše pokušaja. Zatraži novi kod." }); }
    if (code !== rec.code) {
      rec.attempts = (rec.attempts || 0) + 1;
      await kvSet("otp:" + phone, rec, 300);
      return res.status(400).json({ error: "Pogrešan kod." });
    }
    await kvDel("otp:" + phone);
    await getUser(phone); // kreiraj nalog ako ne postoji (čuva probni period zauvek)

    const token = await createToken(phone);
    res.setHeader("Set-Cookie", cookieHeader(token));
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
