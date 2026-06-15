// ============================================================
//  middleware.js — zaštita materijala (e-knjige / priručnici)
//  Presreće sve adrese koje se završavaju na -Skripta.html ili -Formule.html.
//  Ako korisnik NIJE prijavljen -> šalje ga na /prijava.html.
//  Ako jeste, ali nema pristup (probni istekao i nije pretplaćen) -> /index.html#cene.
//  Radi na Vercel-u i bez Next.js-a (Edge runtime).
// ============================================================
import { verifyToken, COOKIE } from "./lib/auth.js";
import { kvGet } from "./lib/kv.js";
import { computeTrial } from "./lib/user.js";

export const config = {
  matcher: ["/:f(.+)-Skripta.html", "/:f(.+)-Formule.html"],
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const cookie = req.headers.get("cookie") || "";
  const m = cookie.match(new RegExp("(?:^|;\\s*)" + COOKIE + "=([^;]+)"));
  const phone = m ? await verifyToken(m[1]) : null;

  // 1) nije prijavljen -> na prijavu (uz povratnu adresu)
  if (!phone) {
    const to = new URL("/prijava.html", req.url);
    to.searchParams.set("next", url.pathname);
    return Response.redirect(to.toString(), 302);
  }

  // 2) prijavljen -> proveri pristup (pretplata ili aktivan/nezapočet probni)
  try {
    const u = await kvGet("user:" + phone);
    const t = computeTrial(u || { trialStartedAt: null });
    // Materijali (skripte/priručnici) su plaćeni sadržaj -> samo pretplatnici.
    // Besplatnih 15 min je za čet sa profesorkom, ne za trajne materijale.
    const hasAccess = t.subscribed;
    if (!hasAccess) {
      const to = new URL("/index.html", req.url);
      to.hash = "cene";
      return Response.redirect(to.toString(), 302);
    }
  } catch (e) {
    // ako baza zakaže, ne zaključavaj prijavljenog korisnika (degradacija na "samo prijava")
  }

  // pusti zahtev dalje ka materijalu (vodeni žig postavlja /zastita.js u samom fajlu)
  return undefined;
}
