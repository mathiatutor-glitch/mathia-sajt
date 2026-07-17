// ============================================================
//  middleware.js — zaštita zaključanog sadržaja (Edge runtime, bez Next.js)
//   -Skripta.html / -Formule.html  -> SAMO pretplatnici (plaćeni materijali)
//   /kviz.html (test smerova)       -> pretplatnici ILI aktivan 15-min probni
//  Ako nije prijavljen -> /prijava.html?next=...  ; ako nema pristup -> /index.html#paketi
// ============================================================
import { verifyToken, COOKIE } from "./lib/auth.js";
import { SB_COOKIE, cookieVal, emailIzTokena, pretplataZaEmail, jeAdmin } from "./lib/sbcookie.js";
import { kvGet, kvSet } from "./lib/kv.js";
import { computeTrial } from "./lib/user.js";

export const config = {
  matcher: ["/:f(.+)-Skripta.html", "/:f(.+)-Formule.html", "/kviz.html"],
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const cookie = req.headers.get("cookie") || "";

  // 0) VLASNIČKI PRISTUP: kolačić postavljen preko pristup.html -> pun pristup svuda
  const OWNER_KEY = "MATHIA-MARINA-2026";
  const om = cookie.match(/(?:^|;\s*)mathia_owner=([^;]+)/);
  if (om && decodeURIComponent(om[1]) === OWNER_KEY) return undefined;

  // 0b) SUPABASE PRIJAVA (mejl) — glavni put od kad se pretplata kupuje preko registracija.html.
  //     nalog.html upiše token u kolačić mathia_sb; ovde ga proveravamo kod Supabase-a.
  //     Bez ove grane pretplatnik sa mejlom nikad ne otvori skriptu: middleware zna samo
  //     telefonsku sesiju, pa ga vraća na prijava.html gde se traži broj telefona.
  const sbTok = cookieVal(cookie, SB_COOKIE);
  if (sbTok) {
    const email = await emailIzTokena(sbTok);
    if (email) {
      if (jeAdmin(email)) return undefined;                    // vlasnik/admin — sve otvoreno
      const pret = await pretplataZaEmail(email);
      if (pret.aktivna) return undefined;                      // pretplatnik — pun pristup
      // prijavljen ali bez pretplate -> na Cene (ne na prijavu — već je prijavljen)
      const to = new URL("/index.html", req.url); to.hash = "paketi";
      return Response.redirect(to.toString(), 302);
    }
  }

  const m = cookie.match(new RegExp("(?:^|;\\s*)" + COOKIE + "=([^;]+)"));
  const phone = m ? await verifyToken(m[1]) : null;

  // 1) nije prijavljen -> na prijavu (sa povratnom adresom)
  if (!phone) {
    const to = new URL("/prijava.html", req.url);
    to.searchParams.set("next", url.pathname);
    return Response.redirect(to.toString(), 302);
  }

  const isKviz = url.pathname === "/kviz.html" || url.pathname.endsWith("/kviz.html");

  // 2) prijavljen -> proveri pristup
  try {
    const u = await kvGet("user:" + phone);
    const t = computeTrial(u || { trialStartedAt: null });

    if (t.subscribed) return undefined; // pretplatnik: pun pristup

    if (isKviz) {
      // Test smerova: dostupan tokom aktivnog 15-min probnog; po isteku -> Cene.
      if (t.expired) {
        const to = new URL("/index.html", req.url); to.hash = "cene";
        return Response.redirect(to.toString(), 302);
      }
      // ako probni još nije pokrenut, pokreni ga (test troši isti 15-min probni kao i čet)
      if (u && !u.trialStartedAt) { u.trialStartedAt = Date.now(); try { await kvSet("user:" + phone, u); } catch (e) {} }
      else if (!u) { try { await kvSet("user:" + phone, { phone, createdAt: Date.now(), trialStartedAt: Date.now(), trialQuestions: 0 }); } catch (e) {} }
      return undefined;
    }

    // Materijali (skripte/priručnici): samo pretplatnici
    const to = new URL("/index.html", req.url); to.hash = "cene";
    return Response.redirect(to.toString(), 302);
  } catch (e) {
    // baza zakaže -> ne zaključavaj prijavljenog (degradacija na "samo prijava")
  }
  return undefined;
}
