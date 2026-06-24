/*! mathia-guard.js — zaštita sadržaja + pristupni gejt (15 min) za MathIA
 * ──────────────────────────────────────────────────────────────────────────
 * UBACIVANJE: jednom linijom na SVAKU stranicu, najbolje u <head>:
 *     <script src="mathia-guard.js?v=1" defer></script>
 *
 * VAŽNO — pošteno o granicama:
 *   Ovo je KLIJENTSKA zaštita. Odvraća slučajno kopiranje i skidanje i postavlja
 *   vremenski gejt, ali NE može potpuno sprečiti pristup (devtools, isključen JS,
 *   "view source", screenshot, mrežni tab). PRAVU zaštitu sadržaja i PRAVU
 *   naplatu/SMS mora da radi server (Vercel API) koji isporučuje sadržaj tek po
 *   proveri pretplate. SMS verifikacija se NE može raditi iz statičkog JS-a.
 *
 * NAPLATA NIJE SPREMNA? Drži CFG.gate = false (difolt). Anti-kopiranje radi i tako.
 *   Kad naplata proradi, stavi CFG.gate = true (ili po stranici — vidi dole).
 * ────────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  /* ───────── PODEŠAVANJA ───────── */
  var CFG = {
    protect: true,                     // anti-kopiranje / anti-skidanje (deterent)
    gate: false,                       // 15-min gejt → stavi true KAD NAPLATA PRORADI
    freeMinutes: 15,                   // besplatnih minuta pre pretplate
    subscribeUrl: "index.html#paketi", // gde vodi dugme „Pogledaj pakete"
    brandName: "Profesorica",
    // stranice koje se NIKAD ne gejtuju (da posetilac uvek stigne do paketa/uslova):
    gateExcludePaths: ["", "index.html", "o-marini.html", "uslovi.html",
                       "privatnost.html", "kontakt.html", "predmeti.html"]
  };

  // Override po stranici PRE ove skripte:  <script>window.MathiaGuard={gate:true}</script>
  try { if (window.MathiaGuard) for (var k in window.MathiaGuard) CFG[k] = window.MathiaGuard[k]; } catch (e) {}

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  // polja gde dozvoljavamo selekciju/lepljenje (da widget i forme rade normalno)
  function inField(t) {
    try { return !!(t && t.closest && t.closest('input,textarea,[contenteditable="true"],#zoi-panel,#zoi-ta')); }
    catch (e) { return false; }
  }

  /* ───────── 1) ZAŠTITA SADRŽAJA ───────── */
  function applyProtect() {
    var css =
      '*{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none}' +
      'input,textarea,[contenteditable="true"],#zoi-panel,#zoi-panel *{-webkit-user-select:text!important;-moz-user-select:text!important;-ms-user-select:text!important;user-select:text!important}' +
      'img,svg,canvas{-webkit-user-drag:none;-khtml-user-drag:none;user-drag:none}' +
      '@media print{html,body{display:none!important}}';
    var st = document.createElement("style");
    st.setAttribute("data-mathia", "guard");
    st.textContent = css;
    (document.head || document.documentElement).appendChild(st);

    document.addEventListener("contextmenu", function (e) { if (!inField(e.target)) e.preventDefault(); });
    document.addEventListener("dragstart", function (e) {
      var n = e.target && e.target.nodeName;
      if (n === "IMG" || n === "A") e.preventDefault();
    });
    ["copy", "cut"].forEach(function (ev) {
      document.addEventListener(ev, function (e) { if (!inField(e.target)) e.preventDefault(); });
    });
    document.addEventListener("keydown", function (e) {
      var key = (e.key || "").toLowerCase();
      if (key === "f12") { e.preventDefault(); return; }                       // devtools
      if ((e.ctrlKey || e.metaKey) && !e.altKey && (key === "s" || key === "u" || key === "p")) {
        e.preventDefault(); return;                                            // sačuvaj / izvor / štampaj
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === "i" || key === "j" || key === "c" || key === "k")) {
        e.preventDefault();                                                    // devtools prečice
      }
    });
  }

  /* ───────── 2) PRISTUPNI GEJT (15 min) ───────── */
  function pageName() { return (location.pathname.split("/").pop() || "").toLowerCase(); }
  function gateExcluded() {
    var p = pageName();
    for (var i = 0; i < CFG.gateExcludePaths.length; i++)
      if (String(CFG.gateExcludePaths[i]).toLowerCase() === p) return true;
    return false;
  }
  function subbed() { try { return localStorage.getItem("mathia_sub") === "1"; } catch (e) { return false; } }
  function firstSeen() {
    try {
      var v = localStorage.getItem("mathia_t0");
      if (!v) { v = String(Date.now()); localStorage.setItem("mathia_t0", v); }
      return parseInt(v, 10);
    } catch (e) { return Date.now(); }
  }

  function lockOverlay() {
    if (document.getElementById("mathia-lock")) return;
    var ov = document.createElement("div");
    ov.id = "mathia-lock";
    ov.style.cssText =
      "position:fixed;inset:0;z-index:2147483600;background:linear-gradient(160deg,#5C3B49,#3A2330);" +
      "color:#FBF6EE;display:flex;align-items:center;justify-content:center;padding:24px;" +
      "font-family:'Nunito',system-ui,sans-serif";
    ov.innerHTML =
      '<div style="max-width:460px;text-align:center">' +
        '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:clamp(1.6rem,5vw,2.2rem);color:#E7D2A2;margin-bottom:12px">Vaših ' + CFG.freeMinutes + ' besplatnih minuta je isteklo</div>' +
        '<p style="font-size:1.02rem;line-height:1.6;color:#e9d9dd;margin:0 0 22px">Hvala što ste probali MathIA uz ' + CFG.brandName + '. Za nastavak učenja potrebna je pretplata.</p>' +
        '<a href="' + CFG.subscribeUrl + '" style="display:inline-block;background:linear-gradient(180deg,#EBD49A,#C6A05C);color:#4a3812;font-weight:800;text-decoration:none;padding:13px 28px;border-radius:100px;box-shadow:0 12px 30px -12px rgba(198,160,92,.85)">Pogledaj pakete →</a>' +
        '<div style="margin-top:16px;font-size:.78rem;color:rgba(251,246,238,.6)">© 2026 Mathia Edu · sadržaj je zaštićen autorskim pravom</div>' +
      '</div>';
    document.body.appendChild(ov);
    try { document.body.style.overflow = "hidden"; } catch (e) {}
  }

  function startGate() {
    // dozvoli i override preko <body data-gate="1"> / "0">
    try {
      var bg = document.body && document.body.getAttribute("data-gate");
      if (bg === "1") CFG.gate = true;
      if (bg === "0") CFG.gate = false;
    } catch (e) {}

    if (!CFG.gate || gateExcluded() || subbed()) return;

    var elapsed = Date.now() - firstSeen();
    var limit = CFG.freeMinutes * 60000;
    if (elapsed >= limit) lockOverlay();
    else setTimeout(lockOverlay, limit - elapsed);
  }

  /* ───────── SMS / NAPLATA (zahteva backend) ─────────
   * SMS-verifikaciju i naplatu NE može statički JS. Kada backend bude spreman:
   *   • posle uspešne SMS/pretplate server postavi:  localStorage.setItem("mathia_sub","1")
   *   • ili izloži endpoint koji se ovde proveri pre dozvole pristupa.
   * Reset besplatnog vremena (za test):  localStorage.removeItem("mathia_t0")
   * Ručno „otključavanje" (za test):      localStorage.setItem("mathia_sub","1")
   * ─────────────────────────────────────────────────── */

  if (CFG.protect) applyProtect();
  ready(startGate);
})();
