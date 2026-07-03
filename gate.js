/* ================================================================
   Mathia — gate.js  (pristup: vlasnik / pretplata / proba)
   Drop-in: <script defer src="gate.js" data-subject="<predmet>"></script>

   Ponašanje:
   • Vlasnik (OWNER_EMAILS)  → pun pristup, bez ograničenja.
   • Pretplaćen na predmet   → pun pristup; na SKRIPTAMA materijal je
                               zaštićen od preuzimanja (bez desnog klika,
                               kopiranja, štampanja).
   • Proba (nije plaćeno):
       – Obične stranice/klon → besplatno FREE_MIN minuta (badge → katanac).
       – SKRIPTE (-Formule)   → vidi se SAMO prva lekcija (pogled),
                                 ostalo zamućeno + "pretplati se".
                                 Materijal se ne može skinuti.
   ================================================================ */
(function () {
  "use strict";

  /* ====== CONFIG ====== */
  var SUPABASE_URL  = "https://ibhirxltgeyecrjwymai.supabase.co";
  var SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaGlyeGx0Z2V5ZWNyand5bWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MTYzMzgsImV4cCI6MjA5NzQ5MjMzOH0.nE3xYc5JuUpPETrGP8oEiFWlZnhhuYhxY-XFDBtARXk";
  var OWNER_EMAILS  = ["mathia.tutor@gmail.com"];        // vlasnik — bez ograničenja
  var FREE_MIN      = 15;                                 // besplatno minuta (obične stranice)
  var PAY_URL       = "placanje.html";
  var LOGIN_URL     = "nalog.html";
  var PLANS = [
    { id:"basic",   naziv:"Basic",   din:4990, predmeta:1 },
    { id:"gold",    naziv:"Gold",    din:6990, predmeta:2 },
    { id:"diamond", naziv:"Diamond", din:9990, predmeta:3 }
  ];
  /* ==================== */

  var me = document.currentScript;
  if (!me) { var ss = document.querySelectorAll('script[data-subject]'); me = ss[ss.length - 1]; }
  var SUBJECT = (me && me.getAttribute("data-subject")) || "";
  var FREE_MS = FREE_MIN * 60 * 1000;
  var KEY = "mathia_free_" + SUBJECT;

  function isScriptPage() {
    if (me && me.getAttribute("data-skripta") === "1") return true;
    if (/Formule/i.test(location.pathname)) return true;
    return !!(document.querySelector(".cover") && document.querySelector("section.topic"));
  }

  function loadSb(cb) {
    if (window.supabase) return cb();
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.onload = cb; s.onerror = function () { cb(); };
    document.head.appendChild(s);
  }
  function fmt(n){ return n.toLocaleString("sr-RS"); }

  function freeMsLeft() {
    var t = null;
    try { t = localStorage.getItem(KEY); } catch (e) {}
    var now = Date.now();
    if (!t) { try { localStorage.setItem(KEY, String(now)); } catch (e) {} t = now; }
    return FREE_MS - (now - Number(t));
  }

  async function status() {
    var sb = null;
    try { if (SUPABASE_URL && SUPABASE_ANON && window.supabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON); } catch (e) {}
    if (!sb) return "free";
    var user = null;
    try { var u = await sb.auth.getUser(); user = u && u.data && u.data.user; } catch (e) {}
    if (user && user.email && OWNER_EMAILS.indexOf(user.email.toLowerCase()) > -1) return "owner";
    if (user) {
      try {
        var r = await sb.from("pretplate").select("*")
          .eq("kupac_email", user.email).eq("status", "aktivna");
        var rows = (r && r.data) || [];
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          var vazi = !row.istice || new Date(row.istice) > new Date();
          var pokriva = Array.isArray(row.predmeti) && row.predmeti.indexOf(SUBJECT) > -1;
          if (vazi && pokriva) return "subscribed";
        }
      } catch (e) {}
    }
    return "free";
  }

  function plansHTML() {
    return PLANS.map(function (p) {
      return '<a href="' + PAY_URL + '?plan=' + p.id + '&predmet=' + encodeURIComponent(SUBJECT) +
        '" style="display:flex;justify-content:space-between;align-items:center;gap:12px;border:1px solid #E7D2A2;border-radius:14px;padding:13px 16px;margin:8px 0;text-decoration:none;color:#432C37;transition:.15s" ' +
        'onmouseover="this.style.borderColor=\'#C6A05C\'" onmouseout="this.style.borderColor=\'#E7D2A2\'">' +
        '<span><b style="font-family:Cormorant Garamond,serif;font-size:19px">' + p.naziv + '</b><br><small style="color:#8a7a74">' + p.predmeta + (p.predmeta === 1 ? ' predmet' : ' predmeta') + '</small></span>' +
        '<b style="color:#9C7838">' + fmt(p.din) + ' din</b></a>';
    }).join("");
  }

  /* zaštita od preuzimanja (skripte) */
  function protect() {
    if (document.getElementById("mathia-protect-css")) return;
    var css = document.createElement("style");
    css.id = "mathia-protect-css";
    css.textContent =
      ".topic,.box,.cover{-webkit-user-select:none;-ms-user-select:none;user-select:none}" +
      ".topic img,.cover img{-webkit-user-drag:none;user-drag:none}" +
      "@media print{body *{visibility:hidden!important}#mathia-noprint{visibility:visible!important;display:flex!important}}" +
      "#mathia-noprint{display:none;position:fixed;inset:0;align-items:center;justify-content:center;text-align:center;padding:30px;font:600 20px Inter,system-ui,Arial,sans-serif;color:#432C37;background:#FBF6EE;z-index:2147483647}";
    document.head.appendChild(css);

    var np = document.createElement("div");
    np.id = "mathia-noprint";
    np.textContent = "Štampanje i čuvanje materijala nije dozvoljeno — MathIA";
    if (document.body) document.body.appendChild(np);

    var stop = function (e) { e.preventDefault(); e.stopPropagation(); return false; };
    document.addEventListener("contextmenu", stop, true);
    document.addEventListener("dragstart", stop, true);
    document.addEventListener("copy", stop, true);
    document.addEventListener("cut", stop, true);
    document.addEventListener("keydown", function (e) {
      var k = (e.key || "").toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (k === "s" || k === "p" || k === "c" || k === "u" || k === "a")) { return stop(e); }
      if (k === "printscreen") { return stop(e); }
    }, true);
  }

  /* skripta u probi: pokaži samo prvu lekciju */
  function previewLock() {
    var topics = Array.prototype.slice.call(document.querySelectorAll("section.topic"));
    if (!topics.length) return;

    for (var i = 1; i < topics.length; i++) {
      var t = topics[i];
      t.style.filter = "blur(7px)";
      t.style.opacity = ".45";
      t.style.pointerEvents = "none";
      t.style.userSelect = "none";
      t.setAttribute("aria-hidden", "true");
    }

    if (document.getElementById("mathia-skripta-cta")) return;
    var cta = document.createElement("div");
    cta.id = "mathia-skripta-cta";
    cta.style.cssText = "margin:22px auto;max-width:460px;background:#fff;border:1px solid #E7D2A2;border-radius:20px;box-shadow:0 26px 64px rgba(67,44,55,.2);padding:24px 22px;text-align:center;font-family:Inter,system-ui,Arial,sans-serif";
    cta.innerHTML =
      '<div style="font-size:12px;letter-spacing:.3em;color:#9C7838;font-weight:700">MATHIA</div>' +
      '<h2 style="font-family:Cormorant Garamond,serif;font-weight:700;font-size:24px;margin:8px 0 6px;color:#432C37">Ovo je pogled na skriptu</h2>' +
      '<p style="color:#7a6b66;margin:0 0 14px;font-size:15px">Prvu lekciju vidiš besplatno. Pretplati se da otključaš ceo materijal — sve formule, primere i Marinu.</p>' +
      plansHTML() +
      '<p style="margin:14px 0 0;font-size:13px;color:#8a7a74">Već imaš pretplatu? <a href="' + LOGIN_URL + '" style="color:#9C7838;font-weight:600">Prijavi se</a></p>';

    if (topics[1] && topics[1].parentNode) topics[1].parentNode.insertBefore(cta, topics[1]);
    else if (topics[0] && topics[0].parentNode) topics[0].parentNode.appendChild(cta);
  }

  /* badge (obične stranice u probi) */
  function badge(msLeft) {
    var b = document.createElement("div");
    b.id = "mathia-free-badge";
    b.style.cssText = "position:fixed;left:14px;bottom:14px;z-index:99998;background:#fff;border:1px solid #E7D2A2;color:#9C7838;font:600 13px Inter,system-ui,Arial,sans-serif;padding:8px 12px;border-radius:999px;box-shadow:0 8px 22px rgba(67,44,55,.14)";
    document.body.appendChild(b);
    function tick() {
      var left = freeMsLeft();
      if (left <= 0) { b.remove(); lock(); return; }
      var m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
      b.textContent = "Besplatno još " + m + ":" + (s < 10 ? "0" : "") + s;
      setTimeout(tick, 1000);
    }
    tick();
  }

  /* pun katanac (obične stranice posle 15 min) */
  function lock() {
    if (document.getElementById("mathia-gate")) return;
    var o = document.createElement("div");
    o.id = "mathia-gate";
    o.style.cssText = "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(67,44,55,.34);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);font-family:Inter,system-ui,Arial,sans-serif";
    o.innerHTML =
      '<div style="width:100%;max-width:440px;background:#fff;border:1px solid #E7D2A2;border-radius:22px;box-shadow:0 30px 70px rgba(67,44,55,.3);padding:26px 24px;text-align:center">' +
      '<div style="font-size:12px;letter-spacing:.3em;color:#9C7838;font-weight:700">MATHIA</div>' +
      '<h2 style="font-family:Cormorant Garamond,serif;font-weight:700;font-size:26px;margin:8px 0 6px;color:#432C37">Besplatnih 15 minuta je isteklo</h2>' +
      '<p style="color:#7a6b66;margin:0 0 14px;font-size:15px">Izaberi paket da nastaviš s ovim predmetom — knjige, skripte, Marina i test sklonosti.</p>' +
      plansHTML() +
      '<p style="margin:14px 0 0;font-size:13px;color:#8a7a74">Već imaš pretplatu? <a href="' + LOGIN_URL + '" style="color:#9C7838;font-weight:600">Prijavi se</a></p>' +
      '</div>';
    document.body.appendChild(o);
    document.documentElement.style.overflow = "hidden";
  }

  function start() {
    var script = isScriptPage();
    if (!SUBJECT && !script) return;

    loadSb(function () {
      status().then(function (st) {
        if (st === "owner") return;               // vlasnik: pun pristup
        if (script) {                             // SKRIPTA
          protect();
          if (st !== "subscribed") previewLock();
          return;
        }
        if (st === "subscribed") return;          // OBIČNA STRANICA
        var left = freeMsLeft();
        if (left > 0) badge(left);
        else lock();
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
