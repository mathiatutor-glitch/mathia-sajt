// ============================================================
//  lib/user.js — korisnik, probni period, gejmifikacija i cilj
//  Probni period: 1 sat ILI 15 pitanja — šta pre istekne (po telefonu, na serveru).
//  Gejmifikacija: zvezdice (poeni), niz (streak) sa „štitovima", bedževi.
//  Cilj (onboarding): track + predmet + mod + profesorka.
//  Sva nova polja se DODAJU postojećim korisnicima kroz ensureFields (migracija).
// ============================================================
import { kvGet, kvSet } from "./kv.js";

const TRIAL_MIN = parseInt(process.env.TRIAL_MINUTES || "60", 10);    // 1 sat
const TRIAL_Q   = parseInt(process.env.TRIAL_QUESTIONS || "15", 10);  // 15 pitanja
const SHIELDS_PER_MONTH = parseInt(process.env.STREAK_SHIELDS || "2", 10);
export const LIMITS = { TRIAL_MIN, TRIAL_Q, SHIELDS_PER_MONTH };

// Koliko zvezdica nosi koja akcija
export const STARS = { question: 1, solved: 5, yourTurn: 10, daily: 15 };

// Katalog bedževa (id -> naziv SR/EN). Dodela ide automatski (checkAutoBadges) ili ručno.
export const BADGES = {
  first_step:   { sr: "Prvi korak",   en: "First step" },
  curious_mind: { sr: "Radoznali um", en: "Curious mind" },   // 50 pitanja
  marathon:     { sr: "Maraton",      en: "Marathon" },        // niz 7 dana
  comeback:     { sr: "Vratio se",    en: "Comeback" },        // povratak posle pauze
};

export function userKey(phone) { return "user:" + phone; }

// ——— pomoćno: dan i mesec po UTC-u (dovoljno za niz) ———
function dayStr(ts) { return new Date(ts == null ? Date.now() : ts).toISOString().slice(0, 10); }   // YYYY-MM-DD
function monthStr(ts) { return new Date(ts == null ? Date.now() : ts).toISOString().slice(0, 7); }   // YYYY-MM
function daysBetween(a, b) { return Math.round((Date.parse(b + "T00:00:00Z") - Date.parse(a + "T00:00:00Z")) / 86400000); }

// Dopuni korisnika svim novim poljima (migracija starih naloga, bez gubitka podataka)
export function ensureFields(u) {
  if (!u || typeof u !== "object") return u;
  if (typeof u.points !== "number") u.points = 0;
  if (typeof u.questionsTotal !== "number") u.questionsTotal = 0;
  if (typeof u.streak !== "number") u.streak = 0;
  if (typeof u.longestStreak !== "number") u.longestStreak = 0;
  if (!("lastActiveDay" in u)) u.lastActiveDay = null;
  if (typeof u.shields !== "number") u.shields = SHIELDS_PER_MONTH;
  if (!u.shieldsMonth) u.shieldsMonth = monthStr();
  if (!Array.isArray(u.badges)) u.badges = [];
  if (!("goal" in u)) u.goal = null;
  return u;
}

export async function getUser(phone) {
  let u = await kvGet(userKey(phone));
  if (!u) {
    u = { phone, createdAt: Date.now(), trialStartedAt: null, trialQuestions: 0, plan: null, subscribedUntil: null };
  }
  ensureFields(u);
  return u;
}
export async function saveUser(u) { await kvSet(userKey(u.phone), u); return u; }

export function isSubscribed(u) {
  return !!(u && u.subscribedUntil && u.subscribedUntil > Date.now());
}

// ——— gejmifikacija ———
export function addStars(u, n) {
  ensureFields(u);
  u.points += Math.max(0, n | 0);
  return u.points;
}

// Ažurira dnevni niz. Vraća true ako je niz danas „dodirnut" prvi put (za bedž/animaciju).
export function touchStreak(u) {
  ensureFields(u);
  const today = dayStr();
  // obnova mesečnih štitova
  const m = monthStr();
  if (u.shieldsMonth !== m) { u.shieldsMonth = m; u.shields = SHIELDS_PER_MONTH; }

  if (u.lastActiveDay === today) return false;     // već danas aktivan
  if (!u.lastActiveDay) { u.streak = 1; }
  else {
    const gap = daysBetween(u.lastActiveDay, today);
    if (gap === 1) u.streak += 1;                  // nastavak niza
    else if (gap > 1) {
      // preskočeni dani — potroši štit ako ga ima (niz se ne lomi za 1 propušten dan)
      if (gap === 2 && u.shields > 0) { u.shields -= 1; u.streak += 1; }
      else u.streak = 1;                            // niz pukao — blag restart
    }
  }
  u.lastActiveDay = today;
  if (u.streak > u.longestStreak) u.longestStreak = u.streak;
  return true;
}

export function awardBadge(u, id) {
  ensureFields(u);
  if (BADGES[id] && u.badges.indexOf(id) === -1) { u.badges.push(id); return true; }
  return false;
}

// Automatska dodela na osnovu trenutnog stanja; vraća listu NOVIH bedževa
export function checkAutoBadges(u) {
  ensureFields(u);
  const gained = [];
  if (u.questionsTotal >= 1 && awardBadge(u, "first_step")) gained.push("first_step");
  if (u.questionsTotal >= 50 && awardBadge(u, "curious_mind")) gained.push("curious_mind");
  if (u.streak >= 7 && awardBadge(u, "marathon")) gained.push("marathon");
  return gained;
}

export function setGoal(u, goal) {
  ensureFields(u);
  if (!goal || typeof goal !== "object") return u;
  u.goal = {
    track: String(goal.track || "").slice(0, 20),       // "skola" | "prijemni" | "fakultet"
    mode: String(goal.mode || "").slice(0, 40),         // npr. "mala-matura", "fax-verovatnoca"
    teacher: String(goal.teacher || "").slice(0, 20),   // npr. "Mila"
    subject: String(goal.subject || "").slice(0, 80),   // čitljiv naziv predmeta
  };
  return u;
}

// Zabeleži jedno pitanje: +1 pitanje, zvezdice, niz, auto-bedževi. Vraća šta je zarađeno.
export function recordQuestion(u) {
  ensureFields(u);
  const before = u.points;
  u.questionsTotal += 1;
  addStars(u, STARS.question);
  const firstToday = touchStreak(u);
  const newBadges = checkAutoBadges(u);
  return { gainedStars: u.points - before, firstToday, newBadges };
}

// Vrati {subscribed, expired, trial:{active, minutesLeft, questionsLeft}}
export function computeTrial(u) {
  if (isSubscribed(u)) {
    return { subscribed: true, expired: false, trial: { active: false, minutesLeft: 0, questionsLeft: 0 } };
  }
  if (!u || !u.trialStartedAt) {
    return { subscribed: false, expired: false, trial: { active: true, minutesLeft: TRIAL_MIN, questionsLeft: TRIAL_Q } };
  }
  const elapsedMin = (Date.now() - u.trialStartedAt) / 60000;
  const minutesLeft = Math.max(0, Math.ceil(TRIAL_MIN - elapsedMin));
  const questionsLeft = Math.max(0, TRIAL_Q - (u.trialQuestions || 0));
  const expired = minutesLeft <= 0 || questionsLeft <= 0;
  return { subscribed: false, expired, trial: { active: !expired, minutesLeft, questionsLeft } };
}

// Sažetak za frontend (api/me.js)
export function publicProfile(u) {
  ensureFields(u);
  const t = computeTrial(u);
  return {
    subscribed: t.subscribed,
    trial: t.trial,
    expired: t.expired,
    points: u.points,
    questionsTotal: u.questionsTotal,
    streak: u.streak,
    longestStreak: u.longestStreak,
    shields: u.shields,
    badges: u.badges,
    goal: u.goal,
  };
}
