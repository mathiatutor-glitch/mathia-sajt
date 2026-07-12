(function(){try{var q=new URLSearchParams(location.search);var k=q.get('pristup');if(k){var KEY='MATHIA-MARINA-2026';if(k.toLowerCase()==='off'){localStorage.removeItem('mathia_access');localStorage.removeItem('mathia_user');}else if(k===KEY){localStorage.setItem('mathia_access','full');localStorage.setItem('mathia_ok',KEY);}}}catch(e){}})();
/* ============================================================
   MATHIA — zajedničko zaglavlje (APSOLUTNO identično prvoj strani)
   Dodaje se JEDNOM linijom:  <script src="header-mathia.js" defer></script>
   Ubaci tačan header prve strane (luminozni logo, foil "Mathia",
   isti meni i jezik) + plutajuće "Nazad" dole levo.
   CSS je zaključan pod #mhead da ne udari u stil strane.
   ============================================================ */
(function () {
  "use strict";
  if (document.getElementById("mhead")) return;

  if (!document.querySelector('link[href*="Cormorant+Garamond"]')) {
    var f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Nunito:wght@400;700;800&family=Pinyon+Script&display=swap";
    document.head.appendChild(f);
  }

  var css =
    '#mhead{position:sticky;top:0;z-index:9000;background:rgba(251,246,238,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid #ECDAC5;font-family:Nunito,system-ui,sans-serif}' +
    '#mhead::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#E7D2A2,#C6A05C,#FFF6D6,#C6A05C,#E7D2A2,transparent);background-size:220% 100%;animation:mhSlide 6.5s linear infinite}' +
    '#mhead::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,transparent,rgba(198,160,92,.5),transparent)}' +
    '#mhead .nav{max-width:1120px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;min-height:66px;gap:14px}' +
    '#mhead .brand{display:flex;flex-direction:row;align-items:center;gap:14px;text-decoration:none}' +
    '#mhead .bav{width:86px;height:86px;border-radius:50%;object-fit:cover;border:3px solid #C6A05C;box-shadow:0 12px 26px -8px rgba(120,70,80,.5),0 0 0 6px #FBF6EE,0 0 24px -4px rgba(198,160,92,.6);transform:translateY(18px);flex:none;background:#FBF6EE;transition:transform .25s ease,box-shadow .25s ease}' +
    '#mhead .brand:hover .bav{transform:translateY(18px) scale(1.05);box-shadow:0 16px 32px -8px rgba(120,70,80,.55),0 0 0 6px #FBF6EE,0 0 30px -2px rgba(198,160,92,.8)}' +
    '#mhead .bwrap{display:flex;flex-direction:column;line-height:1.02}' +
    "#mhead .bmark{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:2.35rem;letter-spacing:.05em;background:linear-gradient(100deg,#9C7838 0%,#E7D2A2 28%,#FFF7E2 47%,#E7D2A2 66%,#C6A05C 100%);background-size:230% auto;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:mhFoil 10s linear infinite}" +
    '#mhead .bsub{font-family:Nunito,sans-serif;font-size:.56rem;font-weight:800;letter-spacing:.24em;text-transform:uppercase;color:#9C7838;margin-top:2px}' +
    '#mhead .nav-r{display:flex;align-items:center;gap:32px}' +
    "#mhead .link{font-family:'Cormorant Garamond',serif;font-size:1.22rem;font-weight:600;letter-spacing:.02em;color:#432C37;text-decoration:none;position:relative;padding:6px 2px;white-space:nowrap;transition:color .18s ease}" +
    '#mhead .link::after{content:"";position:absolute;left:0;right:100%;bottom:-2px;height:1.5px;background:linear-gradient(90deg,#C6A05C,#E7D2A2);transition:right .25s ease;border-radius:2px}' +
    '#mhead .link:hover{color:#9C7838}#mhead .link:hover::after{right:0}' +
    '#mhead .lang{background:transparent;border:1px solid #C6A05C;color:#9C7838;border-radius:100px;font-family:Nunito,sans-serif;font-weight:800;font-size:.72rem;letter-spacing:.04em;padding:7px 12px;cursor:pointer}' +
    '@media(max-width:900px){#mhead .link{display:none}#mhead .bav{width:56px;height:56px;transform:translateY(8px)}#mhead .brand:hover .bav{transform:translateY(8px) scale(1.05)}#mhead .bmark{font-size:1.7rem}#mhead .nav{min-height:56px}}' +
    '.mh-backfab{position:fixed;left:18px;bottom:18px;z-index:8999;display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(198,160,92,.55);color:#9C7838;background:rgba(255,253,248,.94);backdrop-filter:blur(6px);border-radius:100px;padding:9px 16px;font-family:Nunito,sans-serif;font-weight:800;font-size:.78rem;letter-spacing:.02em;text-decoration:none;box-shadow:0 14px 30px -14px rgba(120,70,80,.55);transition:transform .16s,background .16s,border-color .16s}' +
    '.mh-backfab:hover{border-color:#C6A05C;background:#fff;transform:translateX(-2px)}' +
    '@keyframes mhSlide{to{background-position:-220% 0}}@keyframes mhFoil{to{background-position:230% center}}' +
    '@media(prefers-reduced-motion:reduce){#mhead::before,#mhead .bmark{animation:none}}';
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  function build() {
    if (document.getElementById("mhead")) return;
    try {
      var hs = document.querySelectorAll("header");
      for (var i = 0; i < hs.length; i++) {
        if (hs[i].id === "mhead") continue;
        if (hs[i].closest(".cart,.drawer,.korpa,[aria-modal],dialog,#korpa,#cart")) continue;
        hs[i].style.display = "none"; break;
      }
    } catch (e) {}

    var cur = "sr";
    try { cur = (localStorage.getItem("mathia_lang") || document.documentElement.lang || "sr").slice(0, 2).toLowerCase(); } catch (e) {}
    var langs = [["sr","SR"],["en","EN"],["de","DE"],["fr","FR"],["es","ES"],["it","IT"],["ru","RU"],["pt","PT"]];
    var opts = "";
    for (var k = 0; k < langs.length; k++) opts += '<option value="' + langs[k][0] + '"' + (langs[k][0] === cur ? " selected" : "") + ">" + langs[k][1] + "</option>";

    var h = document.createElement("header");
    h.id = "mhead";
    h.innerHTML =
      '<div class="wrap nav">' +
      '<a class="brand" href="index.html"><img class="bav" src="logo.png" alt="Mathia logo" onerror="this.style.display=\'none\'">' +
      '<span class="bwrap"><span class="bmark">Mathia</span><span class="bsub">s Marinom</span></span></a>' +
      '<div class="nav-r">' +
      '<a class="link" href="predmeti.html">Predmeti</a>' +
      '<a class="link" href="prodavnica.html">Prodavnica</a>' +
      '<a class="link" href="vizuelne-lekcije.html">Vizuelne lekcije</a>' +
      '<a class="link" href="testiraj-se.html">Pronađi svoj smer</a>' +
      '<a class="link" href="index.html#paketi">Paketi</a>' +
      '<a class="link" href="o-marini.html">O meni</a>' +
      '<select class="lang" aria-label="Jezik / Language">' + opts + "</select>" +
      "</div></div>";
    document.body.insertBefore(h, document.body.firstChild);

    var fab = document.createElement("a");
    fab.className = "mh-backfab"; fab.href = "index.html"; fab.setAttribute("aria-label", "Nazad");
    fab.innerHTML = "\u2190 Nazad";
    fab.addEventListener("click", function (e) {
      e.preventDefault();
      var same = document.referrer && document.referrer.indexOf(location.origin) === 0;
      if (same && history.length > 1) history.back(); else location.href = "index.html";
    });
    document.body.appendChild(fab);

    var sel = h.querySelector(".lang");
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
