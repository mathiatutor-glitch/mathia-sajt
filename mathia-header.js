/* MATHIA — zajednički (identičan) header za sve glavne strane.
   Ubaci na strani sa: <script src="mathia-header.js" defer></script>
   Sam ubacuje svoj CSS, zamenjuje postojeći <header>, ima mobilni meni. */
(function () {
  var NAV = [
    ["index.html", "Početna"],
    ["predmeti.html", "Predmeti"],
    ["prodavnica.html", "Prodavnica"],
    ["index.html#paketi", "Paketi"],
    ["o-marini.html", "O meni"]
  ];
  var LANGS = [["sr","SR"],["en","EN"],["de","DE"],["fr","FR"],["es","ES"],["it","IT"],["ru","RU"],["pt","PT"]];
  function cur(){ return (location.pathname.split("/").pop() || "index.html").toLowerCase(); }

  function injectCss(){
    if (document.getElementById("mh-css")) return;
    var s = document.createElement("style"); s.id = "mh-css";
    s.textContent =
      ".mh{position:sticky;top:0;z-index:60;background:rgba(251,246,238,.9);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid rgba(198,160,92,.32);box-shadow:0 10px 30px -24px rgba(120,70,80,.55);overflow:visible}" +
      ".mh *{box-sizing:border-box}" +
      ".mh .mh-in{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:22px;min-height:92px;padding:0 24px;position:relative}" +
      ".mh .mh-brand{display:flex;align-items:center;gap:18px;text-decoration:none;flex:none}" +
      ".mh .mh-seal{width:96px;height:96px;border-radius:50%;background:url(logo.png) center/cover,#0f1b2e;border:3px solid #C6A05C;transform:translateY(12px);box-shadow:0 22px 42px -12px rgba(60,30,45,.5),0 0 0 6px #FBF6EE,0 0 0 8px rgba(231,210,162,.55);flex:none}" +
      ".mh .mh-wm b{display:block;font-family:'Spectral',Georgia,serif;font-weight:700;font-size:2rem;letter-spacing:.08em;line-height:1;background:linear-gradient(100deg,#9C7838,#E7D2A2 30%,#FFF7E2 48%,#E7D2A2 66%,#C6A05C);background-size:230% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:mhFoil 9s linear infinite}@keyframes mhFoil{to{background-position:230% center}}" +
      ".mh .mh-wm i{display:block;font-family:'Inter',sans-serif;font-style:normal;font-size:.66rem;font-weight:700;letter-spacing:.34em;text-transform:uppercase;color:#9C7838;margin-top:6px}" +
      ".mh .mh-nav{flex:1;display:flex;align-items:center;justify-content:center;gap:30px}" +
      ".mh .mh-nav a{position:relative;font-family:'Inter',sans-serif;font-size:.95rem;font-weight:500;letter-spacing:.02em;color:#4A2F3B;text-decoration:none;padding:6px 0}" +
      ".mh .mh-nav a::after{content:'';position:absolute;left:50%;transform:translateX(-50%);bottom:-6px;width:0;height:1.5px;background:linear-gradient(90deg,#C6A05C,#E7D2A2);border-radius:2px;transition:width .28s ease}" +
      ".mh .mh-nav a:hover,.mh .mh-nav a.on{color:#9C7838}" +
      ".mh .mh-nav a:hover::after,.mh .mh-nav a.on::after{width:100%}" +
      ".mh .mh-acct{display:none}" +
      ".mh .mh-right{display:flex;align-items:center;gap:14px;flex:none}" +
      ".mh .mh-langwrap{display:inline-flex;align-items:center;gap:6px;border:1px solid #E7D2A2;border-radius:100px;padding:8px 14px;background:linear-gradient(180deg,#FFFDF8,#FBF3E2);color:#7A5E2E;cursor:pointer;transition:.2s;box-shadow:0 8px 18px -12px rgba(156,120,56,.5)}" +
      ".mh .mh-langwrap:hover{border-color:#C6A05C;background:linear-gradient(180deg,#FFF8EC,#F3E4C0);transform:translateY(-1px);box-shadow:0 10px 22px -10px rgba(156,120,56,.7)}" +
      ".mh .mh-langwrap svg{width:15px;height:15px;color:#9C7838;flex:none}" +
      ".mh .mh-lang{font-family:'Inter',sans-serif;font-weight:600;font-size:.74rem;letter-spacing:.08em;color:#7A5E2E;background:none;border:none;padding:0 2px 0 0;cursor:pointer;-webkit-appearance:none;appearance:none}" +
      ".mh .mh-lang:focus{outline:none}" +
      ".mh .mh-cta{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:7px;background:linear-gradient(110deg,#EAD196 0%,#C6A05C 44%,#F4E3B4 54%,#C6A05C 74%,#EAD196 100%);background-size:240% auto;animation:mhShim 7s linear infinite;color:#3a2410;font-weight:800;font-size:.86rem;padding:11px 20px;border-radius:100px;text-decoration:none;white-space:nowrap;box-shadow:0 14px 26px -10px rgba(160,120,40,.5);transition:transform .2s ease,box-shadow .2s ease}@keyframes mhShim{to{background-position:-240% center}}" +
      
      ".mh .mh-cta:hover{transform:translateY(-2px);box-shadow:0 18px 34px -10px rgba(160,120,40,.7)}" +
      ".mh .mh-cta::after{content:'';position:absolute;top:0;left:-75%;width:48%;height:100%;background:linear-gradient(120deg,transparent,rgba(255,255,255,.65),transparent);transform:skewX(-18deg);pointer-events:none;opacity:0}" +
      ".mh .mh-cta:hover::after{opacity:1;animation:mhSheen .85s ease}@keyframes mhSheen{to{left:160%}}" +
      ".mh .mh-seal{position:relative}.mh .mh-seal::after{content:'✦';position:absolute;top:-3px;right:-3px;color:#C6A05C;font-size:14px;line-height:1;text-shadow:0 1px 4px rgba(198,160,92,.5);animation:mhTw 3s ease-in-out infinite}@keyframes mhTw{0%,100%{opacity:.5;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}" +
      "@media(prefers-reduced-motion:reduce){.mh .mh-cta{animation:none}.mh .mh-seal::after{animation:none}.mh .mh-wm b{animation:none}}" +
      ".mh .mh-burger{display:none;width:34px;height:30px;background:none;border:none;cursor:pointer;position:relative;flex:none}" +
      ".mh .mh-burger span{position:absolute;left:4px;right:4px;height:2.5px;background:#5A1024;border-radius:3px;transition:.28s}" +
      ".mh .mh-burger span:nth-child(1){top:7px}.mh .mh-burger span:nth-child(2){top:14px}.mh .mh-burger span:nth-child(3){top:21px}" +
      ".mh.open .mh-burger span:nth-child(1){top:14px;transform:rotate(45deg)}.mh.open .mh-burger span:nth-child(2){opacity:0}.mh.open .mh-burger span:nth-child(3){top:14px;transform:rotate(-45deg)}" +
      /* srednje širine (900–1180px): postepeno stišnjavanje da meni NIJE zgusnut pre nego pređe u hamburger */
      "@media(max-width:1180px){" +
        ".mh .mh-in{gap:16px;padding:0 20px}" +
        ".mh .mh-nav{gap:20px}" +
        ".mh .mh-nav a{font-size:.9rem}" +
        ".mh .mh-seal{width:80px;height:80px;transform:translateY(10px)}" +
        ".mh .mh-wm b{font-size:1.5rem}" +
        ".mh .mh-cta{padding:10px 15px;font-size:.82rem}" +
        ".mh .mh-langwrap{padding:6px 10px}" +
      "}" +
      "@media(max-width:1000px){" +
        ".mh .mh-nav{gap:14px}" +
        ".mh .mh-nav a{font-size:.85rem}" +
        ".mh .mh-wm i{letter-spacing:.28em}" +
      "}" +
      "@media(max-width:900px){" +
        ".mh .mh-in{min-height:66px;gap:12px}" +
        ".mh .mh-seal{width:64px;height:64px;transform:translateY(8px);border-width:2.5px}" +
        ".mh .mh-wm b{font-size:1.3rem}.mh .mh-wm i{letter-spacing:.3em}" +
        ".mh .mh-nav{position:absolute;left:0;right:0;top:100%;flex-direction:column;background:#FBF6EE;border-bottom:1px solid rgba(198,160,92,.3);padding:6px 0;gap:0;display:none;box-shadow:0 22px 44px -22px rgba(120,70,80,.45)}" +
        ".mh.open .mh-nav{display:flex}" +
        ".mh .mh-nav a{width:100%;text-align:center;padding:14px 0}" +
        ".mh .mh-nav a::after{display:none}" +
        ".mh .mh-acct{display:block;color:#9C7838;font-weight:600}" +
        ".mh .mh-burger{display:block}" +
        ".mh .mh-cta{display:none}" +
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
    mh.className = "mh";
    mh.id = "mhead";   // VAŽNO: theme-mathia.css sakriva "select.lang" u svakom header-u OSIM #mhead → bez ovoga se globus-birač jezika ne vidi
    mh.innerHTML =
      '<div class="mh-in">' +
        '<a class="mh-brand" href="index.html"><span class="mh-seal" aria-hidden="true"></span>' +
          '<span class="mh-wm"><b>Mathia</b><i>s Marinom</i></span></a>' +
        '<nav class="mh-nav">' + links + '<a class="mh-acct" href="nalog.html">Moj nalog</a></nav>' +
        '<div class="mh-right">' +
          '<label class="mh-langwrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>' +
            '<select class="mh-lang lang" aria-label="Jezik">' + opts + '</select></label>' +
          '<a class="mh-cta" href="nalog.html"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" style="flex:none"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/></svg>Moj nalog</a>' +
          '<button class="mh-burger" type="button" aria-label="Meni"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>';

    var old = document.querySelector("header");
    if (old && old.parentNode) old.parentNode.replaceChild(mh, old);
    else document.body.insertBefore(mh, document.body.firstChild);

    // — čišćenje: ukloni SVE druge <header>-e i zalutale jezik-biraче (i plutajuće koji se dodaju kasnije) —
    function sweep(){
      try {
        // 1) ukloni sve DRUGE <header>-e (zadrži samo moj)
        var hs = document.querySelectorAll("header");
        for (var i = 0; i < hs.length; i++) { if (hs[i] !== mh && hs[i].parentNode) hs[i].parentNode.removeChild(hs[i]); }
        // 2) ukloni SVAKI jezik-birač koji NIJE u mom headeru (i nije klon)
        var ss = document.querySelectorAll("select");
        for (var k = 0; k < ss.length; k++) {
          var el = ss[k];
          if (mh.contains(el)) continue;                          // MOJ globus — zaštićen
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
    sweep(); setTimeout(sweep, 250); setTimeout(sweep, 700); setTimeout(sweep, 1600); setTimeout(sweep, 3000);

    var burger = mh.querySelector(".mh-burger");
    burger.addEventListener("click", function(){ mh.classList.toggle("open"); });

    var sel = mh.querySelector(".mh-lang");
    try { var cl = (localStorage.getItem("mathia_lang") || (document.documentElement.lang || "sr")).slice(0,2).toLowerCase(); sel.value = cl; } catch(e){}
    sel.addEventListener("change", function(){
      try { localStorage.setItem("mathia_lang", this.value); } catch(e){}
      try { window.dispatchEvent(new Event("mathia:lang")); } catch(e){}
      try { document.documentElement.lang = this.value; } catch(e){}
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
