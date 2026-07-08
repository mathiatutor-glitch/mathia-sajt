// lib/sbauth.js
// Identitet preko Supabase (email) naloga — deljeno između api/chat.js, api/me.js, api/subscribe.js.
const SB_URL = process.env.SUPABASE_URL || "https://ibhirxltgeyecrjwymai.supabase.co";
const SB_ANON = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaGlyeGx0Z2V5ZWNyand5bWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MTYzMzgsImV4cCI6MjA5NzQ5MjMzOH0.nE3xYc5JuUpPETrGP8oEiFWlZnhhuYhxY-XFDBtARXk";

export async function sbUser(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const r = await fetch(SB_URL + "/auth/v1/user", { headers: { apikey: SB_ANON, Authorization: "Bearer " + token } });
    if (!r.ok) return null;
    const u = await r.json();
    return (u && u.id) ? u : null;
  } catch (e) { return null; }
}

// Izvuče Supabase token iz Authorization headera ili tela zahteva ({token}).
export function tokenFromReq(req, body) {
  const h = (req.headers && (req.headers.authorization || req.headers.Authorization)) || "";
  const m = /^Bearer\s+(.+)$/i.exec(h);
  if (m) return m[1];
  return (body && body.token) || null;
}

// Admin pretraga: nađi Supabase user id po emailu (koristi se posle uplate).
// Treba SUPABASE_SERVICE_KEY (tajni, server-only) — NE anon ključ.
const SB_SERVICE = process.env.SUPABASE_SERVICE_KEY || "";
export async function adminFindUidByEmail(email) {
  if (!email || !SB_SERVICE) return null;
  const target = String(email).trim().toLowerCase();
  try {
    for (let page = 1; page <= 5; page++) {
      const r = await fetch(
        SB_URL + "/auth/v1/admin/users?page=" + page + "&per_page=200&email=" + encodeURIComponent(target),
        { headers: { apikey: SB_SERVICE, Authorization: "Bearer " + SB_SERVICE } }
      );
      if (!r.ok) return null;
      const data = await r.json();
      const users = (data && data.users) || [];
      const hit = users.find((u) => u && u.email && String(u.email).toLowerCase() === target);
      if (hit) return hit.id;
      if (users.length < 200) break; // poslednja strana
    }
  } catch (e) { /* tiho — pozivalac odlučuje šta dalje */ }
  return null;
}
export async function resolveUid(req, body, getSessionPhone) {
  const token = tokenFromReq(req, body);
  const sb = await sbUser(token);
  if (sb) return "sb:" + sb.id;
  if (getSessionPhone) { const phone = await getSessionPhone(req); if (phone) return phone; }
  return null;
}
