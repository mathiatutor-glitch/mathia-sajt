// ============================================================
//  lib/user.js — korisnik i probni period
//  Probni period: 1 sat ILI 15 pitanja — šta pre istekne.
//  Računa se po broju telefona, na serveru, i počinje od PRVOG pitanja.
//  Jedan probni period po broju, zauvek (čuva se u bazi).
// ============================================================
import { kvGet, kvSet } from "./kv.js";

const TRIAL_MIN = parseInt(process.env.TRIAL_MINUTES || "60", 10);    // 1 sat
const TRIAL_Q   = parseInt(process.env.TRIAL_QUESTIONS || "15", 10);  // 15 pitanja
export const LIMITS = { TRIAL_MIN, TRIAL_Q };

export function userKey(phone) { return "user:" + phone; }

export async function getUser(phone) {
  let u = await kvGet(userKey(phone));
  if (!u) {
    u = { phone, createdAt: Date.now(), trialStartedAt: null, trialQuestions: 0, plan: null, subscribedUntil: null };
    await kvSet(userKey(phone), u);
  }
  return u;
}
export async function saveUser(u) { await kvSet(userKey(u.phone), u); return u; }

export function isSubscribed(u) {
  return !!(u && u.subscribedUntil && u.subscribedUntil > Date.now());
}

// Vrati {subscribed, expired, trial:{active, minutesLeft, questionsLeft}}
export function computeTrial(u) {
  if (isSubscribed(u)) {
    return { subscribed: true, expired: false, trial: { active: false, minutesLeft: 0, questionsLeft: 0 } };
  }
  if (!u || !u.trialStartedAt) {
    // još nije počeo — pun fond
    return { subscribed: false, expired: false, trial: { active: true, minutesLeft: TRIAL_MIN, questionsLeft: TRIAL_Q } };
  }
  const elapsedMin = (Date.now() - u.trialStartedAt) / 60000;
  const minutesLeft = Math.max(0, Math.ceil(TRIAL_MIN - elapsedMin));
  const questionsLeft = Math.max(0, TRIAL_Q - (u.trialQuestions || 0));
  const expired = minutesLeft <= 0 || questionsLeft <= 0;
  return { subscribed: false, expired, trial: { active: !expired, minutesLeft, questionsLeft } };
}
