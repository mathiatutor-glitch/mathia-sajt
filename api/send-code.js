// ============================================================
//  api/auth/send-code.js  — POST {phone} -> {ok:true}
//  Generiše šestocifreni kod, čuva ga 5 min u bazi, šalje SMS-om.
// ============================================================
import { normPhone, phoneValid } from "../../lib/phone.js";
import { kvGet, kvSet, kvIncrTtl, kvConfigured } from "../../lib/kv.js";
import { sendSms } from "../../lib/sms.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    if (!kvConfigured()) return res.status(500).json({ error: "Baza (KV) nije podešena." });
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    if (!phoneValid(body.phone)) return res.status(400).json({ error: "Neispravan broj telefona." });
    const phone = normPhone(body.phone);

    // rate-limit: 1 / 30s i najviše 5 / sat po broju
    if (await kvGet("rl30:" + phone)) return res.status(429).json({ error: "Sačekaj malo pre ponovnog slanja koda." });
    const perHour = await kvIncrTtl("rlh:" + phone, 3600);
    if (perHour > 5) return res.status(429).json({ error: "Previše pokušaja. Pokušaj kasnije." });
    await kvSet("rl30:" + phone, "1", 30);

    const code = String(Math.floor(100000 + Math.random() * 900000));
    await kvSet("otp:" + phone, { code, attempts: 0 }, 300); // važi 5 min

    await sendSms(phone, "MathIA kod: " + code + ". Vazi 5 minuta.");
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
