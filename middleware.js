// ============================================================
//  middleware.js — zaštita zaključanog sadržaja (Edge runtime, bez Next.js)
//   -Skripta.html / -Formule.html  -> SAMO pretplatnici (plaćeni materijali)
//   /kviz.html (test smerova)       -> pretplatnici ILI aktivan 15-min probni
//  Ako nije prijavljen -> /prijava.html?next=...  ; ako nema pristup -> /index.html#paketi
// ============================================================
import { verifyToken, COOKIE } from "./lib/auth.js";
import { kvGet, kvSet } from "./lib/kv.js";
import { computeTrial } from "./lib/user.js";

export const config = {
  matcher: ["/:f(.+)-Skripta.html", "/:f(.+)-Formule.html", "/kviz.html"],
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const cookie = req.headers.get("cookie") || "";
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
