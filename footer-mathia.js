/* MATHIA — zajednički (identičan) footer za sve glavne strane.
   Ubaci sa: <script src="footer-mathia.js" defer></script>
   Ubacuje svoj CSS + footer NA KRAJ <body> samo ako footer već ne postoji. */
(function () {
  if (document.querySelector("footer.mf-foot")) return;
  // ako strana već ima neki svoj footer, ne diramo je
  if (document.querySelector("footer")) return;

  function injectCss() {
    if (document.getElementById("mf-css")) return;
    var s = document.createElement("style"); s.id = "mf-css";
    s.textContent =
      ".mf-foot{position:relative;margin-top:64px;background:linear-gradient(180deg,#FBF6EE,#F5EAD9);border-top:1px solid rgba(198,160,92,.4);text-align:center;padding:56px 22px 30px;overflow:hidden}" +
      ".mf-foot::before{content:'';position:absolute;top:-1px;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#F0DCA8,#C6A05C,#FFF6D6,#C6A05C,#F0DCA8,transparent)}" +
      ".mf-in{max-width:900px;margin:0 auto;position:relative;z-index:1}" +
      ".mf-orn{color:#C6A05C;letter-spacing:.5em;font-size:1rem;margin-bottom:10px}" +
      ".mf-word{font-family:'Spectral',Georgia,serif;font-weight:700;font-size:2rem;letter-spacing:.24em;background:linear-gradient(100deg,#9C7838,#E7D2A2 32%,#FFF7E2 50%,#E7D2A2 68%,#C6A05C);-webkit-background-clip:text;background-clip:text;color:transparent}" +
      ".mf-line{font-family:'Spectral',Georgia,serif;font-style:italic;color:#7A3346;margin:12px auto 0;max-width:520px;line-height:1.6}" +
      ".mf-links{display:flex;justify-content:center;flex-wrap:wrap;gap:10px 22px;margin:22px 0 6px}" +
      ".mf-links a{font-family:'Inter',system-ui,sans-serif;font-weight:600;font-size:.9rem;color:#5A1024;text-decoration:none;transition:color .2s}" +
      ".mf-links a:hover{color:#A6803C}" +
      ".mf-soc{display:flex;justify-content:center;gap:14px;margin:14px 0 4px}" +
      ".mf-soc a{width:38px;height:38px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(198,160,92,.5);background:linear-gradient(180deg,#FFFDF8,#FBF3E2);transition:transform .2s,border-color .2s}" +
      ".mf-soc a:hover{transform:translateY(-2px);border-color:#C6A05C}" +
      ".mf-soc svg{width:18px;height:18px;fill:#A6803C}" +
      ".mf-rule{height:1px;background:linear-gradient(90deg,transparent,#E7D9C5,transparent);margin:20px auto 12px;max-width:520px}" +
      ".mf-copy{color:#8A7A80;font-size:.78rem;font-family:'Inter',system-ui,sans-serif}"+
      ".mf-note{color:#9A8A90;font-size:.72rem;max-width:600px;margin:10px auto 0;line-height:1.5;font-family:'Inter',system-ui,sans-serif}";
    document.head.appendChild(s);
  }

  var HTML =
    '<div class="mf-in">' +
      '<div class="mf-orn">✦</div>' +
      '<div class="mf-word">MATHIA</div>' +
      '<p class="mf-line">Matematika, fizika, elektrotehnika i programiranje — online, od 5. razreda do fakulteta, uz Profesoricu 0–24h.</p>' +
      '<nav class="mf-links">' +
        '<a href="predmeti.html">Predmeti</a>' +
        '<a href="prodavnica.html">Prodavnica</a>' +
        '<a href="index.html#paketi">Paketi i cene</a>' +
        '<a href="o-marini.html">O meni</a>' +
        '<a href="mailto:kontakt@mathia.rs">Kontakt</a>' +
        '<a href="uslovi.html">Uslovi kupovine</a>' +
        '<a href="privatnost.html">Politika privatnosti</a>' +
      '</nav>' +
      '<div class="mf-soc">' +
        '<a href="mailto:kontakt@mathia.rs" aria-label="Email"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.18L4.3 7h15.4L12 12.18zM4 8.3V17h16V8.3l-7.4 5.05a1 1 0 0 1-1.2 0L4 8.3z"/></svg></a>' +
        '<a href="https://www.instagram.com/mathia.ai" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.97.24 2.43.4.61.24 1.05.52 1.5.98.46.45.74.89.98 1.5.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43-.24.61-.52 1.05-.98 1.5-.45.46-.89.74-1.5.98-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.97-.24-2.43-.4-.61-.24-1.05-.52-1.5-.98-.46-.45-.74-.89-.98-1.5-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.24-1.97.4-2.43.24-.61.52-1.05.98-1.5.45-.46.89-.74 1.5-.98.46-.16 1.26-.35 2.43-.4C8.42 2.21 8.8 2.2 12 2.2zm0 1.98c-3.15 0-3.52.01-4.76.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.76-.07zm0 3.37a4.45 4.45 0 1 1 0 8.9 4.45 4.45 0 0 1 0-8.9zm0 7.34a2.89 2.89 0 1 0 0-5.78 2.89 2.89 0 0 0 0 5.78zm5.66-7.56a1.04 1.04 0 1 1-2.08 0 1.04 1.04 0 0 1 2.08 0z"/></svg></a>' +
      '</div>' +
      '<div class="mf-rule"></div>' +
      '<div class="mf-copy">© 2026 Mathia Edu · Sva prava zadržana.</div>' +
      '<div class="mf-note" id="mf-note"></div>' +
    '</div>';

  var MF_NOTE={"sr": "Mathia je nezavisna obrazovna platforma edukativnog karaktera i nije povezana ni sa jednom školom, fakultetom niti drugom ustanovom.", "en": "Mathia is an independent educational platform and is not affiliated with any school, university or other institution.", "de": "Mathia ist eine unabhängige Bildungsplattform mit pädagogischem Charakter und steht in keiner Verbindung zu einer Schule, Universität oder sonstigen Einrichtung.", "fr": "Mathia est une plateforme éducative indépendante à caractère pédagogique et n'est affiliée à aucune école, université ni autre institution.", "es": "Mathia es una plataforma educativa independiente de carácter formativo y no está afiliada a ninguna escuela, universidad u otra institución.", "it": "Mathia è una piattaforma educativa indipendente di carattere formativo e non è affiliata ad alcuna scuola, università o altra istituzione.", "ru": "Mathia — независимая образовательная платформа образовательного характера, не связанная ни с одной школой, университетом или иным учреждением.", "pt": "A Mathia é uma plataforma educativa independente, de carácter pedagógico, e não está afiliada a nenhuma escola, universidade ou outra instituição."};
  function mfLang(){try{var s=localStorage.getItem('mathia_lang');if(s)return s.slice(0,2).toLowerCase();}catch(e){}return 'sr';}
  function setNote(){var el=document.getElementById('mf-note');if(!el)return;var l=mfLang();el.textContent=MF_NOTE[l]||MF_NOTE.sr;}
  window.addEventListener('mathia:lang',setNote);
  window.addEventListener('storage',function(e){if(e.key==='mathia_lang')setNote();});
  function build() {
    injectCss();
    var f = document.createElement("footer");
    f.className = "mf-foot";
    f.setAttribute("role", "contentinfo");
    f.innerHTML = HTML;
    document.body.appendChild(f);
    setNote();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
