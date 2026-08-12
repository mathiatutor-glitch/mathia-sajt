/* MATHIA — JEDINSTVEN header, IDENTIČAN početnoj strani, za SVE strane.
   Ubaci na strani sa: <script src="mathia-header.js" defer></script>
   Sam ubacuje svoj CSS (samostalan — ne zavisi od CSS varijabli strane),
   zamenjuje/uklanja postojeći <header>, ima prekidač jezika koji RADI
   (localStorage 'mathia_lang' + događaj 'mathia:lang' + document.lang) i mobilni meni. */
(function () {
  var NAV = [
    ["index.html", "Početna"],
    ["predmeti.html", "Predmeti"],
    ["index.html#paketi", "Paketi"],
    ["prodavnica.html", "Prodavnica"],
    ["o-marini.html", "O meni"]
  ];
  var LANGS = [["sr","SR"],["en","EN"],["de","DE"],["fr","FR"],["es","ES"],["it","IT"],["ru","RU"],["pt","PT"]];
  function cur(){ return (location.pathname.split("/").pop() || "index.html").toLowerCase(); }

  function injectCss(){
    if (document.getElementById("mh-css")) return;
    var s = document.createElement("style"); s.id = "mh-css";
    s.textContent =
      "#mhead{position:sticky;top:0;z-index:70;background:rgba(251,246,238,.92);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid rgba(198,160,92,.28);box-shadow:0 10px 30px -26px rgba(120,70,80,.5)}" +
      "#mhead *{box-sizing:border-box}" +
      "#mhead .mh-in{max-width:1080px;margin:0 auto;padding:15px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;position:relative}" +
      "#mhead .mh-brand{font-family:'Spectral',Georgia,serif;font-weight:700;font-size:clamp(1.62rem,2.2vw,2.05rem);letter-spacing:.12em;text-decoration:none;white-space:nowrap;background:linear-gradient(100deg,#9C7838,#E7D2A2 34%,#FFF7E2 50%,#E7D2A2 66%,#C6A05C);background-size:220% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:mhFoil 9s linear infinite}@keyframes mhFoil{to{background-position:220% center}}" +
      "#mhead .mh-lite{display:flex;gap:26px;align-items:center}" +
      "#mhead .mh-lite a{color:#5A1024;font-weight:700;font-size:.92rem;text-decoration:none;transition:color .18s}" +
      "#mhead .mh-lite a:hover,#mhead .mh-lite a.on{color:#B01E48}" +
      "#mhead .mh-acc{background:linear-gradient(135deg,#E7D2A2,#C6A05C);color:#4a3410;font-weight:800;padding:9px 18px;border-radius:100px;font-size:.86rem;box-shadow:0 12px 22px -12px rgba(160,120,40,.55);transition:transform .16s,box-shadow .16s}" +
      "#mhead .mh-acc:hover{transform:translateY(-2px);box-shadow:0 16px 28px -12px rgba(160,120,40,.75)}" +
      "#mhead .mh-lang{margin-left:2px;border:1px solid #E7D2A2;border-radius:100px;padding:7px 12px;font-family:inherit;font-weight:800;font-size:.8rem;color:#5A1024;background:#fff;cursor:pointer;-webkit-appearance:none;appearance:none}" +
      "#mhead .mh-lang:focus{outline:none;border-color:#C6A05C}" +
      "#mhead .mh-burger{display:none;width:34px;height:30px;background:none;border:none;cursor:pointer;position:relative;flex:none}" +
      "#mhead .mh-burger span{position:absolute;left:4px;right:4px;height:2.5px;background:#5A1024;border-radius:3px;transition:.28s}" +
      "#mhead .mh-burger span:nth-child(1){top:7px}#mhead .mh-burger span:nth-child(2){top:14px}#mhead .mh-burger span:nth-child(3){top:21px}" +
      "#mhead.open .mh-burger span:nth-child(1){top:14px;transform:rotate(45deg)}#mhead.open .mh-burger span:nth-child(2){opacity:0}#mhead.open .mh-burger span:nth-child(3){top:14px;transform:rotate(-45deg)}" +
      "@media(max-width:760px){" +
        "#mhead .mh-burger{display:block}" +
        "#mhead .mh-lite{position:absolute;left:0;right:0;top:100%;flex-direction:column;align-items:stretch;gap:0;background:#FBF6EE;border-bottom:1px solid rgba(198,160,92,.3);box-shadow:0 22px 44px -22px rgba(120,70,80,.45);display:none;padding:6px 0}" +
        "#mhead.open .mh-lite{display:flex}" +
        "#mhead .mh-lite a{width:100%;text-align:center;padding:13px 0}" +
        "#mhead .mh-acc{margin:8px auto;width:calc(100% - 40px);text-align:center}" +
        "#mhead .mh-lang{margin:6px auto 10px;display:block}" +
      "}";
    document.head.appendChild(s);
  }

  function build(){
    injectCss();
    var page = cur();
    var links = NAV.map(function(n){
      var on = (n[0].split("#")[0].toLowerCase() === page) ? ' class="on"' : "";
      return '<a'+on+' href="'+n[0]+'">'+n[1]+"</a>";
    }).join("");
    var opts = LANGS.map(function(l){ return '<option value="'+l[0]+'">'+l[1]+"</option>"; }).join("");

    var mh = document.createElement("header");
    mh.id = "mhead";
    mh.innerHTML =
      '<div class="mh-in">' +
        '<a class="mh-brand" href="index.html">MATHIA</a>' +
        '<button class="mh-burger" type="button" aria-label="Meni"><span></span><span></span><span></span></button>' +
        '<nav class="mh-lite">' + links +
          '<a class="mh-acc" href="nalog.html">Moj nalog</a>' +
          '<select class="mh-lang lang" aria-label="Jezik">' + opts + '</select>' +
        '</nav>' +
      '</div>';

    // NAV-header prepoznajemo po: direktno dete <body>, ILI nav-klasa (topbar/mainnav/site-header/nav), ILI sadrži jezik-birač.
    // Sadržajne <header> (npr. class="hero" unutar <main>) NE diramo.
    function isNavHeader(h){
      if (h === mh) return false;
      if (h.parentNode === document.body) return true;
      var c = (h.className || "") + "";
      if (/topbar|mathia-topnav|mainnav|site-?header|navbar|(^|\s)nav(\s|$)/i.test(c)) return true;
      if (h.querySelector && h.querySelector("select.lang, select[aria-label='Jezik']")) return true;
      return false;
    }
    var old = null, allh = document.querySelectorAll("header");
    for (var oi = 0; oi < allh.length; oi++){ if (isNavHeader(allh[oi])) { old = allh[oi]; break; } }
    if (old && old.parentNode) old.parentNode.replaceChild(mh, old);
    else document.body.insertBefore(mh, document.body.firstChild);

    // — čišćenje: ukloni druge NAV-header-e i zalutale jezik-biraче (i one koji se dodaju kasnije) —
    function sweep(){
      try {
        var hs = document.querySelectorAll("header");
        for (var i = 0; i < hs.length; i++) { if (hs[i] !== mh && isNavHeader(hs[i]) && hs[i].parentNode) hs[i].parentNode.removeChild(hs[i]); }
        var ss = document.querySelectorAll("select");
        for (var k = 0; k < ss.length; k++) {
          var el = ss[k];
          if (mh.contains(el)) continue;
          if (el.closest && el.closest("#zoi-panel")) continue;   // klon — ne diraj
          var al = (el.getAttribute("aria-label") || "") + " " + (el.getAttribute("title") || "");
          var isLang = el.classList.contains("lang") || /jezik|language|sprache|langue|idioma|lingua|язык/i.test(al);
          if (!isLang && el.options && el.options.length >= 5) {
            var t = ((el.options[0] && el.options[0].text) || "") + ((el.options[1] && el.options[1].text) || "");
            if (/^(SR|EN|DE|FR|ES|IT|RU|PT)/i.test(t.trim())) isLang = true;
          }
          if (isLang) {
            var wrap = (el.closest && el.closest(".mh-langwrap,.langwrap,.lang-wrap,.topbar-lang")) || el;
            if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
          }
        }
      } catch (e) {}
    }
    sweep(); setTimeout(sweep, 250); setTimeout(sweep, 700); setTimeout(sweep, 1600);

    var burger = mh.querySelector(".mh-burger");
    burger.addEventListener("click", function(){ mh.classList.toggle("open"); });

    var sel = mh.querySelector(".mh-lang");
    try { var cl = (localStorage.getItem("mathia_lang") || (document.documentElement.lang || "sr")).slice(0,2).toLowerCase(); sel.value = cl; } catch(e){}
    function emitLang(lang){
      // CustomEvent sa detail — strane predmeta čitaju e.detail; samostalni engine-i čitaju localStorage (već postavljen)
      try { window.dispatchEvent(new CustomEvent("mathia:lang", { detail: lang })); }
      catch(e){ try { window.dispatchEvent(new Event("mathia:lang")); } catch(_){} }
    }
    sel.addEventListener("change", function(){
      var lang = (this.value || "sr");
      try { localStorage.setItem("mathia_lang", lang); } catch(e){}
      try { document.documentElement.lang = lang; } catch(e){}
      emitLang(lang);
    });

    // Prevedi tek ubačen header + stranu ako je jezik već postavljen (samostalni engine / globalni i18n / per-page apply)
    try { var curLang = (localStorage.getItem("mathia_lang") || "sr").slice(0,2).toLowerCase(); emitLang(curLang); } catch(e){ emitLang("sr"); }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
