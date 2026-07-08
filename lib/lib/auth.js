// ============================================================
//  lib/auth.js — sesija u potpisanom cookie-ju (HMAC-SHA256)
//  Bez baze za sesije: token sam nosi broj telefona + rok i potpisan je.
//  Radi i u Node funkcijama i u Edge middleware-u (Web Crypto).
//  Treba Environment Variable: SESSION_SECRET (dugačak nasumičan niz).
// ============================================================
const SECRET = process.env.SESSION_SECRET || "";
export const COOKIE = "mathia_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 dana

function b64urlFromBytes(buf) {
  const arr = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function bytesFromB64url(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
const enc = (s) => new TextEncoder().encode(s);
const dec = (b) => new TextDecoder().decode(b);

async function key() {
  return crypto.subtle.importKey("raw", enc(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}
async function sign(data) {
  const k = await key();
  const sig = await crypto.subtle.sign("HMAC", k, enc(data));
  return b64urlFromBytes(sig);
}

export async function createToken(phone) {
  if (!SECRET) throw new Error("Nedostaje SESSION_SECRET.");
  const payload = { p: phone, exp: Math.floor(Date.now() / 1000) + MAX_AGE };
  const body = b64urlFromBytes(enc(JSON.stringify(payload)));
  return body + "." + (await sign(body));
}
export async function verifyToken(token) {
  if (!SECRET || !token || token.indexOf(".") === -1) return null;
  const i = token.indexOf(".");
  const body = token.slice(0, i), sig = token.slice(i + 1);
  const expected = await sign(body);
  if (sig.length !== expected.length) return null;
  let diff = 0;
  for (let j = 0; j < sig.length; j++) diff |= sig.charCodeAt(j) ^ expected.charCodeAt(j);
  if (diff !== 0) return null;
  let payload;
  try { payload = JSON.parse(dec(bytesFromB64url(body))); } catch (e) { return null; }
  if (!payload || !payload.p || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload.p; // broj telefona
}

export function cookieHeader(token) {
  return COOKIE + "=" + token + "; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=" + MAX_AGE;
}
export function clearCookieHeader() {
  return COOKIE + "=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0";
}
function readCookie(cookieStr, name) {
  if (!cookieStr) return "";
  const m = cookieStr.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  return m ? m[1] : "";
}
// Za Node funkcije (req.headers.cookie je string)
export async function getSessionPhone(req) {
  const c = (req && req.headers && req.headers.cookie) || "";
  const tok = readCookie(c, COOKIE);
  return tok ? await verifyToken(tok) : null;
}
