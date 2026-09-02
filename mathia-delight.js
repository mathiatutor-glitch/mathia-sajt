/* MATHIA — "delight" sloj: reveal na skrol, konfete na klik, plutajuća maskota,
   sjaj na dugmadima, blagi parallax. Samostalan, defanzivan, poštuje reduced-motion.
   Ubaci sa: <script src="mathia-delight.js" defer></script> */
(function () {
  if (window.__mathiaDelight) return; window.__mathiaDelight = 1;
  var RM = false; try { RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* Vercel Web Analytics — prave posete (uključi u Vercel: project → Analytics → Enable).
     Ubacuje se jednom, na svakoj strani koja učita ovaj fajl. */
  try {
    if (!document.getElementById('vercel-insights')) {
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
      var vi = document.createElement('script');
      vi.id = 'vercel-insights'; vi.defer = true; vi.src = '/_vercel/insights/script.js';
      document.head.appendChild(vi);
    }
  } catch (e) {}

  var CSS =
    ".md-hidden{opacity:0;transform:translateY(20px)}" +
    ".md-show{opacity:1!important;transform:none!important;transition:opacity .6s ease,transform .65s cubic-bezier(.2,.85,.2,1)}" +
    /* sjaj na dugmadima */
    "a.cta,button.cta,.acc,.mh-acc,.pick,.cta2{position:relative;overflow:visible}" +
    ".md-spark{position:absolute;pointer-events:none;font-size:14px;animation:mdSpark .7s ease forwards;z-index:5}" +
    "@keyframes mdSpark{0%{opacity:0;transform:translate(0,0) scale(.4)}30%{opacity:1}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(1.1)}}" +
    /* konfete */
    "#md-conf{position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden}" +
    "#md-conf i{position:absolute;width:9px;height:13px;border-radius:2px;animation:mdCf linear forwards}" +
    "@keyframes mdCf{to{transform:translateY(var(--fall)) rotate(560deg);opacity:0}}" +
    /* maskota */
    "#md-mascot{position:fixed;left:16px;bottom:16px;z-index:9997;display:flex;align-items:flex-end;gap:8px;cursor:pointer;user-select:none;font-family:'Nunito',system-ui,sans-serif}" +
    "#md-mascot .face{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;font-size:1.8rem;background:radial-gradient(circle at 40% 34%,#FFF3F7,#F6E1EC);border:2px solid #F0DCA8;box-shadow:0 12px 24px -10px rgba(176,30,72,.5);animation:mdBob 3s ease-in-out infinite}" +
    "#md-mascot .bub{max-width:180px;background:#fff;border:1px solid #F0DCA8;border-radius:16px 16px 16px 4px;padding:8px 12px;font-size:.82rem;font-weight:700;color:#5A1024;box-shadow:0 12px 26px -14px rgba(90,16,36,.5);opacity:0;transform:translateY(6px) scale(.96);transition:opacity .35s,transform .35s;margin-bottom:8px}" +
    "#md-mascot.show .bub{opacity:1;transform:none}" +
    "@keyframes mdBob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-8px) rotate(2deg)}}" +
    "#md-mascot:hover .face{animation-duration:1.1s}" +
    "@media(max-width:560px){#md-mascot .face{width:46px;height:46px;font-size:1.5rem}#md-mascot .bub{max-width:140px;font-size:.76rem}}" +
    "@media(prefers-reduced-motion:reduce){#md-mascot .face{animation:none}.md-show{transition:none}}";

  function css() { var s = document.createElement('style'); s.id = 'md-css'; s.textContent = CSS; document.head.appendChild(s); }

  // — reveal na skrol —
  function reveal() {
    if (RM || !('IntersectionObserver' in window)) return;
    var sel = 'main > section, .card, .tier, .mat, .mcard, .tst, .step, .grid3 > *, .sec, .pw-cats, .prijemni-banner, .hero-trust, .band, .subj-sec, .finale, .sh-why, .sh-store, .sh-badges, .store-prev, [data-reveal], .reveal';
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.remove('md-hidden'); en.target.classList.add('md-show'); io.unobserve(en.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    var i = 0;
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.__mdr) return; el.__mdr = 1;
      // preskoči ako je već fiksno animiran hero ili header
      if (el.closest('header') || el.id === 'mhead') return;
      el.classList.add('md-hidden');
      el.style.transitionDelay = ((i % 4) * 0.05) + 's'; i++;
      io.observe(el);
    });
    // sigurnosna mreža: ako nešto ostane skriveno (van ekrana a IO ne okine), pokaži posle 2.5s
    setTimeout(function(){ document.querySelectorAll('.md-hidden').forEach(function(el){ var r=el.getBoundingClientRect(); if(r.top < window.innerHeight+300){ el.classList.remove('md-hidden'); el.classList.add('md-show'); } }); }, 2500);
  }

  // — konfete —
  function confBox() { var b = document.getElementById('md-conf'); if (!b) { b = document.createElement('div'); b.id = 'md-conf'; document.body.appendChild(b); } return b; }
  var COLS = ['#C6A05C', '#B01E48', '#CC5E7E', '#F0DCA8', '#3FB98C', '#E7D2A2'];
  function burst(x, y, n) {
    if (RM) return; var b = confBox();
    for (var k = 0; k < n; k++) {
      var s = document.createElement('i');
      s.style.left = x + 'px'; s.style.top = y + 'px';
      s.style.background = COLS[k % COLS.length];
      if (Math.random() < .3) s.style.borderRadius = '50%';
      var ang = Math.random() * Math.PI - Math.PI / 2, dist = 40 + Math.random() * 70;
      s.style.setProperty('--fall', (60 + Math.random() * 120) + 'px');
      s.style.transform = 'translate(' + (Math.cos(ang) * dist) + 'px,0)';
      s.style.animationDuration = (0.9 + Math.random() * 0.8) + 's';
      b.appendChild(s); (function (el) { setTimeout(function () { el.remove(); }, 1800); })(s);
    }
  }
  function hearts(x, y) {
    if (RM) return; var b = confBox(); var h = ['💛', '🌸', '✨', '⭐'];
    for (var k = 0; k < 8; k++) {
      var s = document.createElement('i'); s.textContent = h[k % 4];
      s.style.cssText = 'position:absolute;width:auto;height:auto;font-size:18px;left:' + x + 'px;top:' + y + 'px;--fall:-90px;animation:mdCf ' + (1 + Math.random()) + 's ease forwards';
      s.style.transform = 'translate(' + ((Math.random() - .5) * 80) + 'px,0)';
      b.appendChild(s); (function (el) { setTimeout(function () { el.remove(); }, 2000); })(s);
    }
  }

  // — sjaj + konfete na klik CTA —
  function wireClicks() {
    document.addEventListener('click', function (e) {
      var t = e.target && e.target.closest && e.target.closest('a.cta,button.cta,.acc,.mh-acc,.pick,.cta2,[data-pop]');
      if (!t) return;
      burst(e.clientX, e.clientY, 16);
    }, true);
    // sjaj na hover
    if (!RM) document.addEventListener('mouseover', function (e) {
      var t = e.target && e.target.closest && e.target.closest('a.cta,button.cta,.mh-acc');
      if (!t || t.__sp) return; t.__sp = 1; setTimeout(function () { t.__sp = 0; }, 900);
      var r = t.getBoundingClientRect();
      for (var k = 0; k < 4; k++) { var s = document.createElement('span'); s.className = 'md-spark'; s.textContent = '✦';
        s.style.left = (10 + Math.random() * (r.width - 20)) + 'px'; s.style.top = (r.height / 2) + 'px';
        s.style.setProperty('--dx', ((Math.random() - .5) * 30) + 'px'); s.style.setProperty('--dy', (-14 - Math.random() * 18) + 'px');
        t.appendChild(s); (function (el) { setTimeout(function () { el.remove(); }, 700); })(s); }
    }, true);
  }

  // — maskota —
  var TIPS_L = {
    sr: ['Ti to možeš! 💛', 'Hajde da učimo! ✨', 'Svaki korak se broji 🌟', 'Diši — tu sam uz tebe 🌸', 'Bravo što si tu! 🎉', 'Pitaj me bilo šta 💬', 'Ponosna sam na tebe 🌟', 'Napravi malu pauzu 🍵', 'Samo napred — ide ti! 🚀'],
    en: ['You can do it! 💛', "Let's learn! ✨", 'Every step counts 🌟', "Breathe — I'm here with you 🌸", "Great that you're here! 🎉", 'Ask me anything 💬', "I'm proud of you 🌟", 'Take a little break 🍵', "Keep going — you've got this! 🚀"],
    de: ['Du schaffst das! 💛', 'Lass uns lernen! ✨', 'Jeder Schritt zählt 🌟', 'Atme — ich bin bei dir 🌸', 'Schön, dass du da bist! 🎉', 'Frag mich alles 💬', 'Ich bin stolz auf dich 🌟', 'Mach eine kleine Pause 🍵', 'Weiter so — du schaffst das! 🚀'],
    fr: ['Tu peux le faire ! 💛', 'Apprenons ! ✨', 'Chaque pas compte 🌟', 'Respire — je suis là 🌸', 'Ravie que tu sois là ! 🎉', "Demande-moi ce que tu veux 💬", 'Je suis fière de toi 🌟', 'Fais une petite pause 🍵', 'Continue — tu vas y arriver ! 🚀'],
    es: ['¡Tú puedes! 💛', '¡Vamos a aprender! ✨', 'Cada paso cuenta 🌟', 'Respira — estoy contigo 🌸', '¡Qué bien que estés aquí! 🎉', 'Pregúntame lo que sea 💬', 'Estoy orgullosa de ti 🌟', 'Haz una pequeña pausa 🍵', '¡Sigue así, tú puedes! 🚀'],
    it: ['Ce la puoi fare! 💛', 'Impariamo! ✨', 'Ogni passo conta 🌟', 'Respira — sono qui con te 🌸', 'Che bello che ci sei! 🎉', 'Chiedimi qualsiasi cosa 💬', 'Sono fiera di te 🌟', 'Fai una piccola pausa 🍵', 'Vai avanti — ce la fai! 🚀'],
    ru: ['У тебя получится! 💛', 'Давай учиться! ✨', 'Каждый шаг важен 🌟', 'Дыши — я рядом 🌸', 'Здорово, что ты здесь! 🎉', 'Спрашивай что угодно 💬', 'Я горжусь тобой 🌟', 'Сделай небольшой перерыв 🍵', 'Продолжай — у тебя получается! 🚀'],
    pt: ['Tu consegues! 💛', 'Vamos aprender! ✨', 'Cada passo conta 🌟', 'Respira — estou aqui contigo 🌸', 'Que bom que estás aqui! 🎉', 'Pergunta-me o que quiseres 💬', 'Estou orgulhosa de ti 🌟', 'Faz uma pequena pausa 🍵', 'Continua — tu consegues! 🚀']
  };
  function mdLang(){ try{ var s=localStorage.getItem('mathia_lang'); if(s) return s.slice(0,2).toLowerCase(); }catch(e){} return (document.documentElement.lang||'sr').slice(0,2).toLowerCase(); }
  function TIPS(){ return TIPS_L[mdLang()] || TIPS_L.sr; }
  function mascot() {
    if (document.getElementById('md-mascot')) return;
    var m = document.createElement('div'); m.id = 'md-mascot'; m.setAttribute('aria-hidden', 'true');
    m.innerHTML = '<div class="face">🦉</div><div class="bub"></div>';
    document.body.appendChild(m);
    var faces = ['🦉', '🦊', '🐨', '🐼', '🦄', '🐧', '🌟'], fi = 0, ti = 0;
    var bub = m.querySelector('.bub'), face = m.querySelector('.face');
    function speak() { var t = TIPS(); bub.textContent = t[ti % t.length]; ti++; m.classList.add('show'); setTimeout(function () { m.classList.remove('show'); }, 4200); }
    setTimeout(speak, 1600); setInterval(speak, 12000);
    window.addEventListener('mathia:lang', function(){ setTimeout(speak, 60); });
    window.addEventListener('storage', function(e){ if(!e || e.key==='mathia_lang'){ setTimeout(speak, 60); } });
    m.addEventListener('click', function () {
      var r = face.getBoundingClientRect(); hearts(r.left + r.width / 2, r.top + r.height / 2);
      fi++; face.textContent = faces[fi % faces.length]; speak();
    });
    izbegniDonjuTraku(m);
  }

  // — maskota se sklanja iznad lepljive trake na dnu —
  // Na telefonu naslovna ima dugme "Probaj besplatno" prikovano za dno.
  // Maskota je stajala PREKO njega (z-index 9997 prema 70), pa klik na
  // sredinu dugmeta nije stizao do dugmeta nego do oblacica maskote.
  function izbegniDonjuTraku(m) {
    function postavi() {
      m.style.bottom = '';
      var vh = window.innerHeight || 0;
      if (!vh) return;
      var mb = m.getBoundingClientRect(), dizanje = 0;
      // oblacic menja sirinu zavisno od duzine poruke, pa racunamo
      // najsiri moguci slucaj (lice + razmak + najsiri oblacic)
      var desnaIvica = Math.max(mb.right, mb.left + 250);
      var svi = document.body.getElementsByTagName('*');
      for (var i = 0; i < svi.length; i++) {
        var e = svi[i];
        if (e === m || m.contains(e) || e.contains(m)) continue;
        var s;
        try { s = getComputedStyle(e); } catch (err) { continue; }
        if (s.position !== 'fixed') continue;
        if (s.display === 'none' || s.visibility === 'hidden') continue;
        if (s.pointerEvents === 'none') continue;   // ukrasni slojevi (npr. padajuci simboli)
        var r = e.getBoundingClientRect();
        if (r.width < 40 || r.height < 20) continue;
        if (r.height > vh * 0.4) continue;          // traka je niska; ovo je nesto drugo
        if (vh - r.bottom > 24) continue;           // nije prikovano za dno
        if (r.right < mb.left || r.left > desnaIvica) continue; // ne preklapa se vodoravno
        var d = vh - r.top + 10;
        if (d > dizanje) dizanje = d;
      }
      if (dizanje > 0 && dizanje < vh * 0.5) m.style.bottom = dizanje + 'px';
    }
    postavi();
    setTimeout(postavi, 900);
    var t = null;
    window.addEventListener('resize', function () {
      clearTimeout(t); t = setTimeout(postavi, 150);
    }, { passive: true });
  }

  // — blagi parallax na padajuće simbole —
  function parallax() {
    if (RM) return; var layer = document.getElementById('fall') || document.getElementById('mathfall'); if (!layer) return;
    window.addEventListener('scroll', function () { layer.style.transform = 'translateY(' + (window.scrollY * 0.04) + 'px)'; }, { passive: true });
    window.addEventListener('mousemove', function (e) {
      var dx = (e.clientX / window.innerWidth - .5) * 12, dy = (e.clientY / window.innerHeight - .5) * 8;
      layer.style.transform = 'translate(' + dx + 'px,' + (window.scrollY * 0.04 + dy) + 'px)';
    }, { passive: true });
  }

  function init() { css(); reveal(); wireClicks(); mascot(); parallax(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
