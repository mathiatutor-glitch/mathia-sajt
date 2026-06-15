// ============================================================
//  api/me.js — GET -> status korisnika
//  Odgovor: { authenticated, phone, subscribed, trial:{active,minutesLeft,questionsLeft} }
//  Čita ga traka u widgetu i stranica za prijavu.
// ============================================================
import { getSessionPhone } from "../lib/auth.js";
import { getUser, computeTrial } from "../lib/user.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  try {
    const phone = await getSessionPhone(req);
    if (!phone) return res.status(200).json({ authenticated: false, subscribed: false, trial: null });
    const u = await getUser(phone);
    const t = computeTrial(u);
    return res.status(200).json({ authenticated: true, phone, subscribed: t.subscribed, trial: t.trial });
  } catch (e) {
    return res.status(200).json({ authenticated: false, subscribed: false, trial: null, error: String((e && e.message) || e) });
  }
}
