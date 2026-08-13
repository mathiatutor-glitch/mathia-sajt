// ============================================================
//  middleware.js — ZAŠTITA CELOG SAJTA (Edge runtime, bez Next.js)
//  Model:
//   • JAVNE strane (PUBLIC) su UVEK otvorene: početna, „probaj besplatno" tok,
//     prodavnica/cene, nalog/registracija, pravne strane, trigonometrija i
//     test sklonosti („Otkrij svoj put").
//   • SVE OSTALO (predmeti, materijali, klon-strane, kvizovi…) je ZAKLJUČANO —
//     traži AKTIVAN 15-min probni (jednom po telefonu) ILI pretplatu.
//   • Nema sesije  -> /prijava.html?next=...   (jedini ulaz je „probaj besplatno")
//   • Probni istekao, nema pretplate -> /index.html#cene  (mora da izabere pretplatu)
//
//  SIGURNOSNI PREKIDAČ: postavi env  SITE_LOCK=0  na Vercelu da INSTANT otključaš
//  ceo sajt (vraća se na stari „samo kviz" model) ako nešto zapne.
// ============================================================
import { verifyToken, COOKIE } from "./lib/auth.js";
import { SB_COOKIE, cookieVal, emailIzTokena, pretplataZaEmail, jeAdmin } from "./lib/sbcookie.js";
import { kvGet, kvSet } from "./lib/kv.js";
import { computeTrial } from "./lib/user.js";

export const config = {
  // Pokreni za sve rute OSIM: api, _next i statičkih fajlova (asseti se ne diraju).
  matcher: ["/((?!api/|_next/|favicon.ico|.*\\.(?:js|mjs|css|png|jpg|jpeg|svg|gif|webp|avif|ico|woff|woff2|ttf|otf|json|xml|txt|webmanifest|map|pdf|mp4|webm|zip|crt|pem|pub)$).*)"],
};

// —— JAVNE STRANE: uvek otvorene (bez prijave). Sve van ove liste je zaključano. ——
const PUBLIC = new Set([
  "", "index.html",
  "pocni.html", "prijava.html", "dobrodosli.html", "besplatno.html", "besplatno-en.html",
  "trigonometrija.html",
  "test-sklonosti.html", "test-sklonosti-srednja.html", "test-sklonosti-fakultet.html",
  "prodavnica.html", "cenovnik.html",
  "o-marini.html", "predmeti.html",
  "nalog.html", "registracija.html",
  "hvala.html", "greska.html", "dopuna.html",
  "uslovi.html", "reklamacije.html", "povracaj.html", "privatnost.html",
]);

function isAsset(p) {
  return /\.(?:js|mjs|css|png|jpe?g|svg|gif|webp|avif|ico|woff2?|ttf|otf|json|xml|txt|webmanifest|map|pdf|mp4|webm|zip|crt|pem|pub)$/i.test(p);
}

export default async function middleware(req) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/+/, "").toLowerCase();   // "" za root

  // asseti i javne strane -> uvek prolaz
  if (isAsset(path)) return undefined;
  if (PUBLIC.has(path)) return undefined;

  // DEMO planera: dozvoli pregled bez prijave SAMO uz ?demo=1 (ograničen demo — kupovina daje nalog i čuvanje)
  if (/^planer-(osnovna|srednja|fakultet)\.html$/.test(path) && url.searchParams.get("demo") === "1") return undefined;

  // SIGURNOSNI PREKIDAČ: SITE_LOCK=0 -> ne zaključavaj (samo stari kviz-gate)
  const lockOn = (process.env.SITE_LOCK ?? "1") !== "0";
  if (!lockOn) {
    const isKviz = path === "kviz.html" || path.endsWith("/kviz.html");
    if (!isKviz) return undefined;
  }

  const cookie = req.headers.get("cookie") || "";
  try {
    // 1) Supabase (mejl) — admin ili pretplatnik
    const sbTok = cookieVal(cookie, SB_COOKIE);
    if (sbTok) {
      const email = await emailIzTokena(sbTok);
      if (email) {
        if (jeAdmin(email)) return undefined;                 // vlasnik/admin — sve otvoreno
        const pret = await pretplataZaEmail(email);
        if (pret.aktivna) return undefined;                   // pretplatnik — pun pristup
        const to = new URL("/index.html", req.url); to.hash = "paketi";
        return Response.redirect(to.toString(), 302);          // prijavljen bez pretplate -> Paketi
      }
    }

    // 2) Telefonska sesija + 15-min probni
    const m = cookie.match(new RegExp("(?:^|;\\s*)" + COOKIE + "=([^;]+)"));
    const phone = m ? await verifyToken(m[1]) : null;
    if (!phone) {
      const to = new URL("/prijava.html", req.url);
      to.searchParams.set("next", url.pathname);
      return Response.redirect(to.toString(), 302);            // nema sesije -> na prijavu
    }
    const u = await kvGet("user:" + phone);
    const t = computeTrial(u || { trialStartedAt: null });
    if (t.subscribed) return undefined;                       // pretplatnik
    if (t.trial && t.trial.active) return undefined;          // aktivan probni -> pristup
    // probni istekao, nema pretplate -> na Cene
    const to = new URL("/index.html", req.url); to.hash = "cene";
    return Response.redirect(to.toString(), 302);
  } catch (e) {
    // baza/auth zakaže -> NE ruši sajt (fail-open, pusti prolaz)
    return undefined;
  }
}
