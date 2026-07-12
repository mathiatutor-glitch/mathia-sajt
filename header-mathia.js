(function(){try{var q=new URLSearchParams(location.search);var k=q.get('pristup');if(k){var KEY='MATHIA-MARINA-2026';if(k.toLowerCase()==='off'){localStorage.removeItem('mathia_access');localStorage.removeItem('mathia_user');}else if(k===KEY){localStorage.setItem('mathia_access','full');localStorage.setItem('mathia_ok',KEY);}}}catch(e){}})();
/* ============================================================
   MATHIA — jedinstveni meni (zaglavlje) za CEO sajt.
   Ubaci JEDNOM:  <script src="header-mathia.js" defer></script>
   • Jedan izvor istine za navigaciju (sakriva stare menije i navham).
   • Responzivan: na užem ekranu hamburger + panel.
   • Jezik: prekidač (SR/EN/DE/FR/ES/IT/RU/PT) — radi sa i18n-mathia.js.
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

  var ITEMS = [
    ["index.html", "Početna"],
    ["predmeti.html", "Predmeti"],
    ["prodavnica.html", "Prodavnica"],
    ["index.html#paketi", "Paketi"],
    ["o-marini.html", "O meni"],
    ["nalog.html", "Moj nalog"]
  ];

  var css =
    '#mhead{position:sticky;top:0;z-index:9000;background:rgba(251,247,239,.9);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid #ECDAC5;font-family:Nunito,system-ui,sans-serif}' +
    '#mhead::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#E7D2A2,#C6A05C,#FFF6D6,#C6A05C,#E7D2A2,transparent);background-size:220% 100%;animation:mhSlide 6.5s linear infinite}' +
    '#mhead::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,transparent,rgba(198,160,92,.5),transparent)}' +
    '#mhead .wrap{max-width:1220px;margin:0 auto;padding:0 22px;display:flex;align-items:center;justify-content:space-between;min-height:64px;gap:12px}' +
    '#mhead .brand{display:flex;align-items:center;gap:12px;text-decoration:none;flex:none}' +
    '#mhead .bav{width:62px;height:62px;border-radius:50%;object-fit:cover;border:2.5px solid #C6A05C;box-shadow:0 10px 22px -8px rgba(120,70,80,.5),0 0 0 5px #FBF6EE;transform:translateY(12px);background:#FBF6EE}' +
    '#mhead .bwrap{display:flex;flex-direction:column;line-height:1.02}' +
    "#mhead .bmark{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:1.7rem;letter-spacing:.04em;background:linear-gradient(100deg,#9C7838 0%,#E7D2A2 28%,#FFF7E2 47%,#E7D2A2 66%,#C6A05C 100%);background-size:230% auto;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:mhFoil 10s linear infinite}" +
    '#mhead .bsub{font-family:Nunito,sans-serif;font-size:.52rem;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#9C7838;margin-top:2px}' +
    '#mhead .nav-r{display:flex;align-items:center;gap:17px;flex-wrap:nowrap}' +
    "#mhead .link{font-family:'Cormorant Garamond',serif;font-size:1.08rem;font-weight:600;letter-spacing:.01em;color:#432C37;text-decoration:none;position:relative;padding:5px 1px;white-space:nowrap;transition:color .18s}" +
    '#mhead .link::after{content:"";position:absolute;left:0;right:100%;bottom:-1px;height:1.5px;background:linear-gradient(90deg,#C6A05C,#E7D2A2);transition:right .25s ease;border-radius:2px}' +
    '#mhead .link:hover{color:#9C7838}#mhead .link:hover::after{right:0}' +
    '#mhead .lang{background:#fff;border:1px solid #C6A05C;color:#9C7838;border-radius:100px;font-family:Nunito,sans-serif;font-weight:800;font-size:.72rem;letter-spacing:.04em;padding:7px 11px;cursor:pointer}' +
    '#mhead .mh-burger{display:none;align-items:center;justify-content:center;width:44px;height:44px;border:1px solid rgba(198,160,92,.5);background:#fff;border-radius:12px;cursor:pointer;color:#9C7838}' +
    '#mhead .mh-burger svg{width:22px;height:22px}' +
    /* panel */
    '.mh-ovl{position:fixed;inset:0;background:rgba(60,40,45,.32);opacity:0;visibility:hidden;transition:.25s;z-index:9400}' +
    '.mh-ovl.open{opacity:1;visibility:visible}' +
    ".mh-panel{position:fixed;top:0;right:0;height:100%;width:min(330px,88%);background:#FBF7EF;box-shadow:-30px 0 60px -30px rgba(90,60,25,.5);transform:translateX(105%);transition:transform .3s cubic-bezier(.2,.7,.2,1);z-index:9500;display:flex;flex-direction:column;padding:22px 22px 30px;overflow-y:auto}" +
    '.mh-panel.open{transform:none}' +
    '.mh-panel .ph{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}' +
    ".mh-panel .pt{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:1.5rem;color:#9C7838}" +
    '.mh-panel .px{width:40px;height:40px;border:1px solid #ECDAC5;background:#fff;border-radius:11px;cursor:pointer;color:#9C7838;font-size:1.1rem}' +
    ".mh-panel a{display:flex;align-items:center;gap:10px;font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:600;color:#432C37;text-decoration:none;padding:12px 6px;border-bottom:1px solid #F0E7D6}" +
    '.mh-panel a:last-of-type{border-bottom:none}' +
    '.mh-langs{display:flex;flex-wrap:wrap;gap:7px;margin-top:18px}' +
    '.mh-langs button{border:1px solid #ECDAC5;background:#fff;color:#432C37;border-radius:100px;font-family:Nunito,sans-serif;font-weight:800;font-size:.76rem;padding:7px 12px;cursor:pointer}' +
    '.mh-langs button.on{background:linear-gradient(160deg,#E7D2A2,#C6A05C);border-color:#C6A05C;color:#4a3410}' +
    '@media(max-width:1080px){#mhead .nav-r .link{display:none}#mhead .nav-r>.lang{display:none}#mhead .mh-burger{display:inline-flex}#mhead .bav{width:50px;height:50px;transform:translateY(6px)}#mhead .bmark{font-size:1.45rem}#mhead .wrap{min-height:58px}}' +
    '.mh-backfab{position:fixed;left:16px;bottom:16px;z-index:8999;display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(198,160,92,.55);color:#9C7838;background:rgba(255,253,248,.94);backdrop-filter:blur(6px);border-radius:100px;padding:9px 15px;font-family:Nunito,sans-serif;font-weight:800;font-size:.76rem;text-decoration:none;box-shadow:0 14px 30px -14px rgba(120,70,80,.55)}' +
    '.mh-backfab:hover{border-color:#C6A05C;background:#fff}' +
    '@keyframes mhSlide{to{background-position:-220% 0}}@keyframes mhFoil{to{background-position:230% center}}' +
    '@media(prefers-reduced-motion:reduce){#mhead::before,#mhead .bmark{animation:none}.mh-panel{transition:none}}';
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  function esc(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

  function build() {
    if (document.getElementById("mhead")) return;
    // sakrij SVE stare menije (header + navham), osim korpe/modala
    try {
      var old = document.querySelectorAll("header, .navham-top, .navham");
      for (var i = 0; i < old.length; i++) {
        var el = old[i];
        if (el.id === "mhead") continue;
        if (el.closest && el.closest(".cart,.drawer,.korpa,[aria-modal],dialog,#korpa,#cart")) continue;
        el.style.display = "none";
      }
    } catch (e) {}

    var cur = "sr";
    try { cur = (localStorage.getItem("mathia_lang") || document.documentElement.lang || "sr").slice(0, 2).toLowerCase(); } catch (e) {}
    var langs = [["sr","SR"],["en","EN"],["de","DE"],["fr","FR"],["es","ES"],["it","IT"],["ru","RU"],["pt","PT"]];
    var opts = "";
    for (var k = 0; k < langs.length; k++) opts += '<option value="' + langs[k][0] + '"' + (langs[k][0] === cur ? " selected" : "") + ">" + langs[k][1] + "</option>";

    var linksRow = "", panelLinks = "";
    for (var j = 0; j < ITEMS.length; j++) {
      linksRow += '<a class="link" href="' + esc(ITEMS[j][0]) + '">' + esc(ITEMS[j][1]) + "</a>";
      panelLinks += '<a href="' + esc(ITEMS[j][0]) + '">' + esc(ITEMS[j][1]) + "</a>";
    }
    var langBtns = "";
    for (var m = 0; m < langs.length; m++) langBtns += '<button type="button" data-l="' + langs[m][0] + '"' + (langs[m][0] === cur ? ' class="on"' : "") + ">" + langs[m][1] + "</button>";

    var h = document.createElement("header");
    h.id = "mhead";
    h.innerHTML =
      '<div class="wrap">' +
      '<a class="brand" href="index.html"><img class="bav" src="logo.png" alt="Mathia logo" onerror="this.style.display=\'none\'">' +
      '<span class="bwrap"><span class="bmark">Mathia</span><span class="bsub">s Marinom</span></span></a>' +
      '<div class="nav-r">' + linksRow +
      '<select class="lang" aria-label="Jezik / Language">' + opts + "</select>" +
      '<button class="mh-burger" type="button" aria-label="Meni"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
      "</div></div>";
    document.body.insertBefore(h, document.body.firstChild);

    // panel (mobilni)
    var ovl = document.createElement("div"); ovl.className = "mh-ovl";
    var panel = document.createElement("div"); panel.className = "mh-panel";
    panel.innerHTML = '<div class="ph"><span class="pt">Meni</span><button class="px" type="button" aria-label="Zatvori">✕</button></div>' +
      panelLinks + '<div class="mh-langs">' + langBtns + "</div>";
    document.body.appendChild(ovl); document.body.appendChild(panel);

    function openP(){ panel.classList.add("open"); ovl.classList.add("open"); }
    function closeP(){ panel.classList.remove("open"); ovl.classList.remove("open"); }
    h.querySelector(".mh-burger").addEventListener("click", openP);
    panel.querySelector(".px").addEventListener("click", closeP);
    ovl.addEventListener("click", closeP);

    function setLang(v){
      v = (v || "sr").toLowerCase();
      try { localStorage.setItem("mathia_lang", v); } catch (e) {}
      document.documentElement.lang = v;
      var sel = h.querySelector(".lang"); if (sel) sel.value = v;
      var bs = panel.querySelectorAll(".mh-langs button");
      for (var b = 0; b < bs.length; b++) bs[b].classList.toggle("on", bs[b].getAttribute("data-l") === v);
      try { window.dispatchEvent(new Event("mathia:lang")); } catch (e) {}
      try { window.dispatchEvent(new CustomEvent("mathia:lang", { detail: v })); } catch (e) {}
      try { window.dispatchEvent(new StorageEvent("storage", { key: "mathia_lang", newValue: v })); } catch (e) {}
    }
    h.querySelector(".lang").addEventListener("change", function(){ setLang(this.value); });
    var lbs = panel.querySelectorAll(".mh-langs button");
    for (var b2 = 0; b2 < lbs.length; b2++) lbs[b2].addEventListener("click", function(){ setLang(this.getAttribute("data-l")); closeP(); });

    var fab = document.createElement("a");
    fab.className = "mh-backfab"; fab.href = "index.html"; fab.setAttribute("aria-label", "Nazad");
    fab.innerHTML = "← Nazad";
    fab.addEventListener("click", function (e) {
      e.preventDefault();
      var same = document.referrer && document.referrer.indexOf(location.origin) === 0;
      if (same && history.length > 1) history.back(); else location.href = "index.html";
    });
    document.body.appendChild(fab);
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
