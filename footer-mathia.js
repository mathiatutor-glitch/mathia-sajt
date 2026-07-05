/* ============================================================
   MATHIA — zajednički footer (couture, kao prva strana)
   Dodaje se JEDNOM linijom:  <script src="footer-mathia.js" defer></script>
   Sam ubaci footer, sakrije stari <footer> strane, samostalan CSS.
   Klase su prefiksirane "mfz-" da ne udare u stil strane.
   ============================================================ */
(function () {
  "use strict";
  if (document.getElementById("mfz")) return;

  if (!document.querySelector('link[href*="Cormorant+Garamond"]')) {
    var f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Nunito:wght@400;700;800&family=Pinyon+Script&display=swap";
    document.head.appendChild(f);
  }

  var css =
    '#mfz{position:relative;background:linear-gradient(180deg,#4A2A38,#3A2330 55%,#2C1A25);color:#EAD9DE;font-family:\'Nunito\',system-ui,sans-serif;overflow:hidden}' +
    '#mfz .mfz-wrap{max-width:1000px;margin:0 auto;padding:64px 22px 0;text-align:center;position:relative;z-index:2}' +
    '.mfz-mono{width:52px;height:52px;border-radius:50%;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;font-family:\'Cormorant Garamond\',serif;font-weight:700;font-size:1.5rem;color:#3a2530;background:radial-gradient(circle at 38% 30%,#FFF6D6,#C6A05C);box-shadow:0 0 30px -4px rgba(231,210,162,.7)}' +
    '.mfz-love{font-family:\'Pinyon Script\',cursive;font-size:2.6rem;line-height:1;background:linear-gradient(100deg,#9C7838,#E7D2A2 35%,#FFF7E2 50%,#E7D2A2 65%,#C6A05C);background-size:220% auto;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:mfzFoil 10s linear infinite}' +
    '@keyframes mfzFoil{to{background-position:220% center}}' +
    '.mfz-tag{font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(231,210,162,.72);margin-top:12px}' +
    '.mfz-rule{display:flex;align-items:center;justify-content:center;gap:12px;margin:22px 0 40px}' +
    '.mfz-rule .l{height:1px;width:90px;background:linear-gradient(90deg,transparent,rgba(231,210,162,.5))}' +
    '.mfz-rule .l.r{transform:scaleX(-1)}' +
    '.mfz-rule .d{width:6px;height:6px;transform:rotate(45deg);background:#E7D2A2;box-shadow:0 0 12px rgba(231,210,162,.9)}' +
    '.mfz-cols{display:grid;gap:32px 42px;text-align:left;max-width:840px;margin:0 auto}' +
    '@media(min-width:720px){.mfz-cols{grid-template-columns:1fr 1.15fr 1fr}.mfz-col:not(:last-child){position:relative}.mfz-col:not(:last-child)::after{content:"";position:absolute;top:34px;bottom:6px;right:-21px;width:1px;background:linear-gradient(180deg,transparent,rgba(231,210,162,.2) 20%,rgba(231,210,162,.2) 80%,transparent)}}' +
    '.mfz-h{position:relative;font-size:.68rem;font-weight:800;letter-spacing:.24em;text-transform:uppercase;color:rgba(231,210,162,.72);padding-bottom:13px;margin-bottom:16px}' +
    '.mfz-h::after{content:"";position:absolute;left:0;bottom:0;width:46px;height:2px;border-radius:2px;background:linear-gradient(90deg,#9C7838,#FFF6D6,#C6A05C,#9C7838);background-size:220% 100%;animation:mfzLine 5.5s linear infinite}' +
    '@keyframes mfzLine{to{background-position:-220% 0}}' +
    '.mfz-col a{display:block;color:#EAD9DE;font-family:\'Cormorant Garamond\',serif;font-size:1.16rem;font-weight:600;text-decoration:none;padding:5px 0;transition:color .16s,padding-left .16s}' +
    '.mfz-col a:hover{color:#FFF6E2;padding-left:6px}' +
    '.mfz-soc a{display:flex;align-items:center;gap:12px;padding:5px 0;color:#EAD9DE;font-family:\'Cormorant Garamond\',serif;font-size:1.12rem;text-decoration:none}' +
    '.mfz-soc a .i{flex:none;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(231,210,162,.32);background:rgba(255,252,246,.06);color:#EAD9DE;transition:all .2s ease}' +
    '.mfz-soc a .i svg{width:17px;height:17px}' +
    '.mfz-soc a:hover .i{border-color:transparent;background:linear-gradient(160deg,#E7D2A2,#C6A05C);color:#3a2530;transform:translateY(-2px);box-shadow:0 10px 20px -8px rgba(198,160,92,.7)}' +
    '.mfz-info{max-width:760px;margin:42px auto 0;padding-top:32px;border-top:1px solid rgba(231,210,162,.14);text-align:center}' +
    '.mfz-pay-h{display:inline-flex;align-items:center;gap:7px;font-size:.68rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:rgba(231,210,162,.72);margin-bottom:13px}' +
    '.mfz-pay-h svg{width:15px;height:15px;color:#E7D2A2}' +
    '.mfz-legal{font-size:.7rem;color:rgba(232,217,222,.44);line-height:1.64;max-width:680px;margin:20px auto 0}' +
    '.mfz-bar{display:flex;flex-direction:column;align-items:center;gap:12px;max-width:1000px;margin:0 auto;padding:30px 22px 44px;text-align:center;position:relative;z-index:2}' +
    '.mfz-copy{font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(231,210,162,.5)}' +
    '@media(max-width:719px){.mfz-cols,.mfz-info{text-align:center}.mfz-soc a{justify-content:center}}' +
    '@media(prefers-reduced-motion:reduce){.mfz-love,.mfz-h::after{animation:none}}';
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  function svg(inner) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + inner + "</svg>";
  }
  var icMail = svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>');
  var icIg = svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>');
  var icYt = svg('<rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="m10.5 9.5 4.5 2.5-4.5 2.5z"/>');
  var icFb = svg('<path d="M14 8.5h2.2V5.4H14c-2 0-3.3 1.2-3.3 3.2v1.9H8.6v3.1h2.1V21h3.2v-7.4h2.2l.5-3.1h-2.7V8.9c0-.3.2-.4.5-.4z"/>');

  function build() {
    if (document.getElementById("mfz")) return;
    try {
      var fs = document.querySelectorAll("footer");
      for (var i = 0; i < fs.length; i++) {
        if (fs[i].id === "mfz") continue;
        if (fs[i].closest(".cart,.drawer,.korpa,[aria-modal],dialog,#korpa,#cart")) continue;
        fs[i].style.display = "none"; break;
      }
    } catch (e) {}

    var ft = document.createElement("footer");
    ft.id = "mfz";
    ft.innerHTML =
      '<div class="mfz-wrap">' +
      '<div class="mfz-mono" aria-hidden="true">M</div>' +
      '<div class="mfz-love">Uči s ljubavlju</div>' +
      '<div class="mfz-tag">Mathia · tvoja profesorica</div>' +
      '<div class="mfz-rule" aria-hidden="true"><span class="l"></span><span class="d"></span><span class="l r"></span></div>' +
      '<div class="mfz-cols">' +
      '<div class="mfz-col"><div class="mfz-h">Platforma</div>' +
      '<a href="predmeti.html">Predmeti</a><a href="prodavnica.html">Prodavnica</a><a href="index.html#paketi">Paketi</a><a href="o-marini.html">O meni</a></div>' +
      '<div class="mfz-col"><div class="mfz-h">Pravno</div>' +
      '<a href="uslovi.html">Uslovi kupovine</a><a href="reklamacije.html">Reklamacije i povraćaj</a><a href="povracaj.html">Povraćaj sredstava</a><a href="privatnost.html">Politika privatnosti</a></div>' +
      '<div class="mfz-col mfz-soc"><div class="mfz-h">Kontakt i mreže</div>' +
      '<a href="mailto:kontakt@mathia.rs"><span class="i">' + icMail + "</span>kontakt@mathia.rs</a>" +
      '<a href="https://instagram.com" target="_blank" rel="noopener"><span class="i">' + icIg + "</span>Instagram</a>" +
      '<a href="https://youtube.com" target="_blank" rel="noopener"><span class="i">' + icYt + "</span>YouTube</a>" +
      '<a href="https://facebook.com" target="_blank" rel="noopener"><span class="i">' + icFb + "</span>Facebook</a></div>" +
      "</div>" +
      '<div class="mfz-info">' +
      '<div class="mfz-pay-h"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2.2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg> Bezbedno plaćanje</div>' +
      '<div class="mfz-legal"><b style="color:rgba(232,217,222,.7)">© 2026 Mathia Edu.</b> Sav sadržaj — tekstovi, lekcije, skripte, dizajn i metodologija — zaštićen je autorskim pravom. Mathia je obrazovna platforma za učenje i pripremu; priprema ne garantuje upis ni rezultat na ispitu.</div>' +
      "</div>" +
      "</div>" +
      '<div class="mfz-bar"><div class="mfz-rule" aria-hidden="true"><span class="l"></span><span class="d"></span><span class="l r"></span></div>' +
      '<span class="mfz-copy">© 2026 Mathia Edu · Sva prava zadržana</span></div>';
    document.body.appendChild(ft);
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
