/* ============================================================
   MATHIA — zajedničko zaglavlje + "Nazad" dugme
   Dodaje se JEDNOM linijom na bilo koju stranu:
     <script src="header-mathia.js" defer></script>
   Sam ubacuje elegantno zaglavlje (u stilu prve strane),
   sakriva staro <header> strane (da se ne dupliraju),
   i uklapa se sa postojećim prevodom (localStorage 'mathia_lang').
   Sve klase su prefiksirane sa "mh-" da ne udare u stil strane.
   ============================================================ */
(function () {
  "use strict";
  if (document.getElementById("mhead")) return; // ne ubacuj dvaput

  /* --- fontovi (ako ih strana već ne učitava) --- */
  if (!document.querySelector('link[href*="Cormorant+Garamond"]')) {
    var f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Nunito:wght@400;700;800&family=Pinyon+Script&display=swap";
    document.head.appendChild(f);
  }

  /* --- stil (samostalan, prava boja umesto var) --- */
  var css =
    '#mhead{position:sticky;top:0;z-index:9000;background:rgba(251,246,238,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid #ECDAC5;font-family:\'Nunito\',system-ui,sans-serif}' +
    '#mhead::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#E7D2A2,#C6A05C,#FFF6D6,#C6A05C,#E7D2A2,transparent);background-size:220% 100%;animation:mhSlide 6.5s linear infinite}' +
    '@keyframes mhSlide{to{background-position:-220% 0}}' +
    '.mh-wrap{max-width:1120px;margin:0 auto;padding:0 22px;display:flex;align-items:center;gap:16px;min-height:64px}' +
    '.mh-back{display:inline-flex;align-items:center;gap:6px;flex:none;border:1px solid rgba(198,160,92,.5);color:#9C7838;background:#fff;border-radius:100px;padding:8px 15px;font-weight:800;font-size:.8rem;letter-spacing:.02em;cursor:pointer;text-decoration:none;transition:border-color .16s,background .16s,transform .16s}' +
    '.mh-back:hover{border-color:#C6A05C;background:#FBF3E2;transform:translateX(-2px)}' +
    '.mh-brand{display:flex;align-items:center;gap:11px;text-decoration:none}' +
    '.mh-brand img{width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid #C6A05C;box-shadow:0 6px 16px -6px rgba(120,70,80,.5);flex:none;background:#FBF6EE}' +
    '.mh-bwrap{display:flex;flex-direction:column;line-height:1.05}' +
    '.mh-mark{font-family:\'Cormorant Garamond\',Georgia,serif;font-weight:700;font-size:1.5rem;letter-spacing:.04em;background:linear-gradient(100deg,#9C7838,#E7D2A2 30%,#FFF7E2 48%,#E7D2A2 66%,#C6A05C);background-size:230% auto;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:mhFoil 10s linear infinite}' +
    '@keyframes mhFoil{to{background-position:230% center}}' +
    '.mh-sub{font-family:\'Pinyon Script\',cursive;font-size:1.05rem;color:#B5746C;margin-top:-2px}' +
    '.mh-nav{margin-left:auto;display:flex;align-items:center;gap:24px}' +
    '.mh-nav a{position:relative;color:#432C37;font-family:\'Cormorant Garamond\',serif;font-size:1.16rem;font-weight:600;text-decoration:none;white-space:nowrap}' +
    '.mh-nav a::after{content:"";position:absolute;left:0;right:100%;bottom:-3px;height:1.5px;background:linear-gradient(90deg,#C6A05C,#E7D2A2);transition:right .25s ease;border-radius:2px}' +
    '.mh-nav a:hover{color:#9C7838}' +
    '.mh-nav a:hover::after{right:0}' +
    '.mh-lang{font-family:\'Nunito\',sans-serif;font-size:.8rem;font-weight:800;letter-spacing:.04em;color:#432C37;border:1.5px solid rgba(198,160,92,.5);border-radius:100px;padding:7px 13px;background:#fff;cursor:pointer;transition:border-color .15s}' +
    '.mh-lang:hover{border-color:#C6A05C}' +
    '@media(max-width:820px){.mh-nav a{display:none}.mh-brand img{width:40px;height:40px}.mh-mark{font-size:1.3rem}.mh-sub{font-size:.9rem}.mh-back{padding:7px 12px;font-size:.76rem}}' +
    '@media(prefers-reduced-motion:reduce){#mhead::before,.mh-mark{animation:none}}';
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  function build() {
    if (document.getElementById("mhead")) return;
    /* sakrij staro zaglavlje strane (da se ne dupliraju) */
    try {
      var olds = document.querySelectorAll("header");
      for (var i = 0; i < olds.length; i++) olds[i].style.display = "none";
    } catch (e) {}

    /* trenutni jezik */
    var cur = "sr";
    try {
      cur = (localStorage.getItem("mathia_lang") || document.documentElement.lang || "sr")
        .slice(0, 2).toLowerCase();
    } catch (e) {}
    var langs = [["sr", "SR"], ["en", "EN"], ["de", "DE"], ["fr", "FR"], ["es", "ES"], ["it", "IT"], ["ru", "RU"], ["pt", "PT"]];
    var opts = "";
    for (var k = 0; k < langs.length; k++) {
      opts += '<option value="' + langs[k][0] + '"' + (langs[k][0] === cur ? " selected" : "") + ">" + langs[k][1] + "</option>";
    }

    var h = document.createElement("header");
    h.id = "mhead";
    h.innerHTML =
      '<div class="mh-wrap">' +
      '<a class="mh-back" id="mhBack" href="index.html" aria-label="Nazad">\u2190 Nazad</a>' +
      '<a class="mh-brand" href="index.html">' +
      '<img src="logo.png" alt="Mathia logo" onerror="this.style.display=\'none\'">' +
      '<span class="mh-bwrap"><span class="mh-mark">Mathia</span><span class="mh-sub">s Marinom</span></span>' +
      "</a>" +
      '<nav class="mh-nav">' +
      '<a href="predmeti.html" data-mh="predmeti">Predmeti</a>' +
      '<a href="prodavnica.html" data-mh="prodavnica">Prodavnica</a>' +
      '<a href="index.html#paketi" data-mh="paketi">Paketi</a>' +
      '<a href="o-marini.html" data-mh="omeni">O meni</a>' +
      '<select class="mh-lang" aria-label="Jezik / Language">' + opts + "</select>" +
      "</nav>" +
      "</div>";
    document.body.insertBefore(h, document.body.firstChild);

    /* "Nazad": prethodna strana ako smo sa sajta, inače početna */
    var back = document.getElementById("mhBack");
    back.addEventListener("click", function (e) {
      e.preventDefault();
      var sameSite = document.referrer && document.referrer.indexOf(location.origin) === 0;
      if (sameSite && history.length > 1) history.back();
      else location.href = "index.html";
    });

    /* jezik: pamti izbor + javi strani (i18n sluša 'mathia:lang' i html[lang]) */
    var sel = h.querySelector(".mh-lang");
    sel.addEventListener("change", function () {
      var v = sel.value.toLowerCase();
      try { localStorage.setItem("mathia_lang", v); } catch (e) {}
      document.documentElement.lang = v;
      try { window.dispatchEvent(new Event("mathia:lang")); } catch (e) {}
      try { window.dispatchEvent(new StorageEvent("storage", { key: "mathia_lang", newValue: v })); } catch (e) {}
    });
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
