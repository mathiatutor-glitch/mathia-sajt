/* ============================================================
   MATHIA — zajednički footer (identičan lepom footeru prve strane)
   <script src="footer-mathia.js" defer></script>            → pun footer
   <script src="footer-mathia.js" data-min defer></script>   → samo copyright red
   Ne dodavati na strane sa svojim završetkom (npr. O meni).
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
    "#mfz{position:relative;background:linear-gradient(180deg,#4A2A38,#3A2330 55%,#2C1A25);color:#EAD9DE;font-family:Nunito,system-ui,sans-serif;overflow:hidden}" +
    "#mfz .mfz-wrap{max-width:820px;margin:0 auto;padding:72px 22px 0;text-align:center;position:relative;z-index:2}" +
    ".mfz-mono{width:58px;height:58px;border-radius:50%;margin:0 auto 22px;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;font-size:1.7rem;color:#3a2530;background:radial-gradient(circle at 38% 30%,#FFF6D6,#C6A05C);box-shadow:0 0 36px -4px rgba(231,210,162,.75)}" +
    ".mfz-love{font-family:'Pinyon Script',cursive;font-size:clamp(2.6rem,6vw,3.2rem);line-height:1;background:linear-gradient(100deg,#9C7838,#E7D2A2 30%,#FFF7E2 48%,#E7D2A2 66%,#C6A05C);background-size:220% auto;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:mfzFoil 10s linear infinite}" +
    "@keyframes mfzFoil{to{background-position:220% center}}" +
    ".mfz-tag{font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(231,210,162,.72);margin-top:10px}" +
    ".mfz-nav{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px;margin:24px 0 26px}" +
    ".mfz-nav a{font-family:'Cormorant Garamond',serif;font-size:1.22rem;font-weight:600;color:#EAD9DE;text-decoration:none;transition:color .16s ease}" +
    ".mfz-nav a:hover{color:#FFF6E2}" +
    ".mfz-dot{width:4px;height:4px;border-radius:50%;background:rgba(231,210,162,.5)}" +
    ".mfz-soc{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:center;gap:8px}" +
    ".mfz-soc a{width:92px;display:flex;flex-direction:column;align-items:center;gap:6px;color:#EAD9DE;font-family:'Cormorant Garamond',serif;font-size:.9rem;text-decoration:none}" +
    ".mfz-soc a .i{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(231,210,162,.32);background:rgba(255,252,246,.06);color:#EAD9DE;transition:all .2s ease}" +
    ".mfz-soc a .i svg{width:18px;height:18px}" +
    ".mfz-soc a:hover .i{border-color:transparent;background:linear-gradient(160deg,#E7D2A2,#C6A05C);color:#3a2530;transform:translateY(-3px);box-shadow:0 12px 22px -8px rgba(198,160,92,.7)}" +
    ".mfz-rule{display:flex;align-items:center;justify-content:center;gap:12px;margin:34px auto 24px}" +
    ".mfz-rule .l{height:1px;width:90px;background:linear-gradient(90deg,transparent,rgba(231,210,162,.5))}" +
    ".mfz-rule .l.r{transform:scaleX(-1)}" +
    ".mfz-rule .d{width:6px;height:6px;transform:rotate(45deg);background:#E7D2A2;box-shadow:0 0 12px rgba(231,210,162,.9)}" +
    ".mfz-fine{font-size:.8rem;color:rgba(232,217,222,.6);margin-bottom:16px;white-space:nowrap}" +
    ".mfz-fine a{color:inherit;text-decoration:none;transition:color .16s ease}.mfz-fine a:hover{color:#E7D2A2}" +
    ".mfz-legal{font-size:.72rem;color:rgba(232,217,222,.45);line-height:1.6;white-space:nowrap}" +
    "@media(max-width:760px){.mfz-fine,.mfz-legal{white-space:normal}}" +
    ".mfz-bottom{display:flex;flex-direction:column;align-items:center;gap:12px;padding:20px 0 42px;margin-top:20px;border-top:1px solid rgba(231,210,162,.12)}" +
    ".mfz-copy{font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(231,210,162,.5)}" +
    ".mfz-pay{display:inline-flex;align-items:center;background:rgba(255,255,255,.92);border:1px solid rgba(198,160,92,.3);border-radius:8px;padding:5px 10px;box-shadow:0 10px 22px -16px rgba(0,0,0,.5)}" +
    ".mfz-pay img{height:15px;width:auto;display:block}" +
    "@media(prefers-reduced-motion:reduce){.mfz-love{animation:none}}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  function svg(i){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+i+'</svg>';}
  var icMail=svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>');
  var icIg=svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>');
  var icYt=svg('<rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="m10.5 9.5 4.5 2.5-4.5 2.5z"/>');
  var icFb=svg('<path d="M14 8.5h2.2V5.4H14c-2 0-3.3 1.2-3.3 3.2v1.9H8.6v3.1h2.1V21h3.2v-7.4h2.2l.5-3.1h-2.7V8.9c0-.3.2-.4.5-.4z"/>');
  var lock='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2.2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

  var minMode = !!document.querySelector('script[src*="footer-mathia"][data-min]');

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
    var rule = '<div class="mfz-rule" aria-hidden="true"><span class="l"></span><span class="d"></span><span class="l r"></span></div>';

    if (minMode) {
      ft.className = "mfzmin";
      ft.innerHTML = '<div class="mfz-bottom" style="border:none">' + rule + '<span class="mfz-copy">\u00A9 2026 Mathia Edu \u00B7 Sva prava zadr\u017eana</span></div>';
      document.body.appendChild(ft);
      return;
    }

    ft.innerHTML =
      '<div class="mfz-wrap">' +
      '<div class="mfz-mono" aria-hidden="true">M</div>' +
      '<div class="mfz-love">U\u010di s ljubavlju</div>' +
      '<div class="mfz-tag">Mathia \u00B7 tvoja profesorica</div>' +
      '<nav class="mfz-nav"><a href="predmeti.html">Predmeti</a><span class="mfz-dot"></span><a href="prodavnica.html">Prodavnica</a><span class="mfz-dot"></span><a href="index.html#paketi">Paketi</a><span class="mfz-dot"></span><a href="o-marini.html">O meni</a></nav>' +
      '<div class="mfz-soc">' +
      '<a href="mailto:kontakt@mathia.rs"><span class="i">' + icMail + '</span>Email</a>' +
      '<a href="https://instagram.com" target="_blank" rel="noopener"><span class="i">' + icIg + '</span>Instagram</a>' +
      '<a href="https://youtube.com" target="_blank" rel="noopener"><span class="i">' + icYt + '</span>YouTube</a>' +
      '<a href="https://facebook.com" target="_blank" rel="noopener"><span class="i">' + icFb + '</span>Facebook</a>' +
      '</div>' + rule +
      '<div class="mfz-fine"><a href="uslovi.html">Uslovi kupovine</a> \u00B7 <a href="reklamacije.html">Reklamacije i povra\u0107aj</a> \u00B7 <a href="povracaj.html">Povra\u0107aj sredstava</a> \u00B7 <a href="privatnost.html">Politika privatnosti</a></div>' +
      '<p class="mfz-legal">Obrazovna platforma za u\u010denje i pripremu \u00B7 sav sadr\u017eaj za\u0161ti\u0107en autorskim pravom \u00B7 priprema ne garantuje upis ni rezultat.</p>' +
      '<div class="mfz-bottom">' +
      '<span class="mfz-copy">\u00A9 2026 Mathia Edu \u00B7 Sva prava zadr\u017eana</span>' +
      '<span class="mfz-pay"><img src="placanje-logos.png" alt="Visa, Mastercard, DinaCard, 3-D Secure"></span>' +
      '</div>' +
      '</div>';
    document.body.appendChild(ft);
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
