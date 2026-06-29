/* napredak.js — automatsko praćenje napretka (MATHIA EDU)
   Beleži vreme učenja po predmetu za ULOGOVANE korisnike.
   Bezbedno: ako korisnik nije prijavljen ili RLS još nije postavljen, tiho ništa ne radi. */
(function () {
  if (window.__napredakLog) return; window.__napredakLog = true;

  var SB_URL = "https://ibhirxltgeyecrjwymai.supabase.co";
  var SB_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaGlyeGx0Z2V5ZWNyand5bWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MTYzMzgsImV4cCI6MjA5NzQ5MjMzOH0.nE3xYc5JuUpPETrGP8oEiFWlZnhhuYhxY-XFDBtARXk";

  // predmet/temu čitamo sa istog <script> taga koji učitava widget
  var ws = document.querySelector('script[src*="widget.js"]');
  var mode = ws ? (ws.getAttribute("data-mode") || "") : "";
  var subjName = ws ? (ws.getAttribute("data-subj") || "") : "";
  var SKIP = { "": 1, "site": 1, "subject": 1 };
  if (SKIP[mode]) return;                 // pratimo samo prave predmetne/klon strane
  var predmet = mode;

  function pickTema() {
    if (subjName) return subjName;
    var h = document.querySelector("h1");
    var t = h ? h.textContent : document.title;
    return (t || "").replace(/\s+/g, " ").trim().slice(0, 160);
  }
  var tema = pickTema();

  function load(cb) {
    if (window.supabase && window.supabase.createClient) return cb();
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.onload = cb; s.onerror = function () {};
    document.head.appendChild(s);
  }

  function ymd(d) { try { return new Date(d).toISOString().slice(0, 10); } catch (e) { return ""; } }

  load(function () {
    if (!(window.supabase && window.supabase.createClient)) return;
    var sb;
    try { sb = window.supabase.createClient(SB_URL, SB_ANON); } catch (e) { return; }

    sb.auth.getUser().then(function (res) {
      var user = res && res.data && res.data.user;
      if (!user) return;                  // neulogovane ne pratimo
      var uid = user.id;

      var activeMs = 0, lastTick = Date.now(), writtenMin = 0, busy = false;
      function tick() {
        var now = Date.now();
        if (document.visibilityState === "visible") activeMs += (now - lastTick);
        lastTick = now;
      }
      document.addEventListener("visibilitychange", function () { lastTick = Date.now(); });
      setInterval(tick, 15000);

      function flush() {
        tick();
        var mins = Math.floor(activeMs / 60000);
        var delta = mins - writtenMin;
        if (delta < 1 || busy) return;
        busy = true;
        sb.from("mathia_napredak")
          .select("id,minuta_ukupno,serija,azurirano")
          .eq("user_id", uid).eq("predmet", predmet).maybeSingle()
          .then(function (r) {
            var row = r && r.data;
            var now = new Date(), today = ymd(now);
            var base = (row && row.minuta_ukupno) ? row.minuta_ukupno : 0;
            var serija = (row && row.serija) ? row.serija : 0;
            if (row && row.azurirano) {
              var prev = ymd(row.azurirano);
              var yest = ymd(new Date(now.getTime() - 86400000));
              if (prev === today) { /* isti dan — serija ostaje */ }
              else if (prev === yest) { serija = serija + 1; }
              else { serija = 1; }
            } else { serija = 1; }
            var payload = {
              user_id: uid, predmet: predmet, poslednja_tema: tema,
              minuta_ukupno: base + delta, serija: serija, azurirano: now.toISOString()
            };
            var q = (row && row.id)
              ? sb.from("mathia_napredak").update(payload).eq("id", row.id)
              : sb.from("mathia_napredak").insert(payload);
            return q;
          })
          .then(function () { writtenMin = mins; busy = false; })
          .catch(function () { busy = false; });
      }

      setInterval(flush, 60000);
      document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "hidden") flush();
      });
      window.addEventListener("pagehide", flush);
      window.addEventListener("beforeunload", flush);
    }).catch(function () {});
  });
})();
