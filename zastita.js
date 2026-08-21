/* ================================================================
   MATHIA — zastita.js
   Zaštita plaćenih materijala (skripte, formule, zadaci, testovi).

   Šta radi:
   • Blokira desni klik, označavanje teksta, kopiranje, sečenje i prevlačenje.
   • Blokira prečice za čuvanje/štampu/izvorni kod (Ctrl+S, Ctrl+P, Ctrl+U,
     Ctrl+Shift+I/J/C, F12) — koliko pregledač dozvoljava.
   • Onemogućava štampanje (i „Sačuvaj kao PDF") preko @media print.
   • Preko sadržaja stavlja BLEDI VODENI ŽIG sa identitetom korisnika
     (mejl ili telefon + datum). Ako neko slika ekran i podeli materijal,
     iz žiga se vidi čiji je nalog.
   • Ne dira klon (Profesoricu) niti polja za unos — tamo kopiranje radi.

   VAŽNO (iskreno): ovo je ODVRAĆANJE, ne apsolutna brava. Ko zna da otvori
   alatke za programere, može da vidi HTML. Prava zaštita je server-side
   (middleware.js pušta materijale samo pretplatnicima) — ovo je drugi sloj
   koji sprečava slučajno i masovno preuzimanje.
   ================================================================ */
(function () {
  "use strict";

  /* —— radi samo na zaštićenim stranama —— */
  var p = (location.pathname || "").toLowerCase();
  var ZASTICENO = /(-skripta|-formule|-zadaci|-zbirka|skripta-|formule-|zadaci-|provera-|kviz)/.test(p);
  if (!ZASTICENO) return;

  /* —— ko gleda (za vodeni žig) —— */
  function ident() {
    var v = "";
    try {
      v = localStorage.getItem("mathia_email") ||
          localStorage.getItem("mathia_user") ||
          localStorage.getItem("mathia_phone") || "";
      if (!v) {
        var raw = localStorage.getItem("mathia_profil") || localStorage.getItem("mathia_nalog") || "";
        if (raw) { try { var o = JSON.parse(raw); v = o.email || o.mejl || o.telefon || o.phone || ""; } catch (e) {} }
      }
    } catch (e) {}
    if (!v) {
      try {
        var k = "mathia_dev", d = localStorage.getItem(k);
        if (!d) { d = Date.now().toString(36) + Math.random().toString(36).slice(2, 8); localStorage.setItem(k, d); }
        v = "ID " + d.slice(-6).toUpperCase();
      } catch (e) { v = "MATHIA"; }
    }
    return String(v).slice(0, 42);
  }

  function datum() {
    var d = new Date();
    function p2(n) { return (n < 10 ? "0" : "") + n; }
    return p2(d.getDate()) + "." + p2(d.getMonth() + 1) + "." + d.getFullYear();
  }

  /* —— 1) vodeni žig preko sadržaja —— */
  function zig() {
    if (document.getElementById("mathia-zig")) return;
    var tekst = "MATHIA · " + ident() + " · " + datum();
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="340" height="200">' +
      '<text x="0" y="120" transform="rotate(-24 0 120)" ' +
      'font-family="Inter,system-ui,sans-serif" font-size="13" fill="rgba(90,16,36,0.055)">' +
      tekst.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</text></svg>";
    var d = document.createElement("div");
    d.id = "mathia-zig";
    d.setAttribute("aria-hidden", "true");
    d.style.cssText =
      "position:fixed;inset:0;z-index:2147483000;pointer-events:none;" +
      "background-image:url('data:image/svg+xml;utf8," + encodeURIComponent(svg) + "');" +
      "background-repeat:repeat";
    (document.body || document.documentElement).appendChild(d);
  }

  /* —— 2) blokada štampe i čuvanja kao PDF —— */
  function stilovi() {
    if (document.getElementById("mathia-zastita-css")) return;
    var st = document.createElement("style");
    st.id = "mathia-zastita-css";
    st.textContent =
      "@media print{body *{display:none!important}" +
      "body::after{content:'Štampanje i čuvanje materijala nije dozvoljeno — MATHIA';" +
      "display:block!important;font:600 16px Inter,system-ui,sans-serif;color:#5A1024;padding:40px;text-align:center}}" +
      /* nema označavanja teksta na sadržaju — ali polja za unos i klon rade */
      "body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;" +
      "-webkit-touch-callout:none}" +
      "input,textarea,[contenteditable],#zoi-panel,#zoi-panel *,.zoi-code,.zoi-code *{" +
      "-webkit-user-select:text!important;user-select:text!important;-webkit-touch-callout:default}" +
      "img,svg{-webkit-user-drag:none;user-drag:none}";
    (document.head || document.documentElement).appendChild(st);
  }

  /* —— 3) blokade događaja —— */
  function unutarKlona(t) {
    return !!(t && t.closest && t.closest("#zoi-panel,#zoi-btn,input,textarea,[contenteditable],.zoi-code"));
  }
  function stop(e) {
    if (unutarKlona(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  ["contextmenu", "copy", "cut", "dragstart", "selectstart"].forEach(function (ev) {
    document.addEventListener(ev, stop, { capture: true });
  });

  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    var ctrl = e.ctrlKey || e.metaKey;
    if (unutarKlona(e.target)) return;
    if (k === "f12") return stop(e);
    if (ctrl && ["s", "p", "u"].indexOf(k) > -1) return stop(e);            // sačuvaj / štampaj / izvorni kod
    if (ctrl && e.shiftKey && ["i", "j", "c"].indexOf(k) > -1) return stop(e); // alatke za programere
    if (ctrl && k === "a") return stop(e);                                   // označi sve
  }, { capture: true });

  /* —— 4) ako korisnik ipak pokrene štampu, zamuti sadržaj —— */
  try {
    window.addEventListener("beforeprint", function () { document.documentElement.style.filter = "blur(9px)"; });
    window.addEventListener("afterprint", function () { document.documentElement.style.filter = ""; });
  } catch (e) {}

  /* —— pokreni —— */
  function start() { stilovi(); zig(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
  /* žig ponovo ako ga neko ukloni iz DOM-a */
  try {
    new MutationObserver(function () {
      if (!document.getElementById("mathia-zig")) zig();
    }).observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {}
})();
