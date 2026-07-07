/* Mathia PREVIEW — posetilac vidi samo isečak skripte/zbirke/formula; pretplatnik vidi sve */
(function(){
  try{ if(localStorage.getItem('mathia_user')||localStorage.getItem('mathia_access')==='full') return; }catch(e){ return; }
  function T(sr){
    var L='sr'; try{ L=(localStorage.getItem('mathia_lang')||'sr').toLowerCase(); }catch(e){}
    var D={
      ribbon:{sr:'Besplatan pregled — vidiš isečak materijala.',en:'Free preview — you\u2019re seeing a snippet.',de:'Kostenlose Vorschau \u2014 du siehst einen Ausschnitt.',fr:'Aper\u00e7u gratuit \u2014 tu vois un extrait.',es:'Vista previa gratis \u2014 ves un fragmento.',it:'Anteprima gratuita \u2014 vedi un estratto.',ru:'\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0439 \u043f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u2014 \u0442\u044b \u0432\u0438\u0434\u0438\u0448\u044c \u0444\u0440\u0430\u0433\u043c\u0435\u043d\u0442.',pt:'Pr\u00e9-visualiza\u00e7\u00e3o gratuita \u2014 v\u00eas um excerto.'},
      h:{sr:'Ovo je samo ise\u010dak',en:'This is just a snippet',de:'Das ist nur ein Ausschnitt',fr:'Ceci n\u2019est qu\u2019un extrait',es:'Esto es solo un fragmento',it:'Questo \u00e8 solo un estratto',ru:'\u042d\u0442\u043e \u0442\u043e\u043b\u044c\u043a\u043e \u0444\u0440\u0430\u0433\u043c\u0435\u043d\u0442',pt:'Isto \u00e9 apenas um excerto'},
      p:{sr:'Pretplati se da otklju\u010da\u0161 celu skriptu, zbirku i formule \u2014 uz profesoricu 0\u201324h.',en:'Subscribe to unlock the full study notes, exercises and formulas \u2014 with the teacher 24/7.',de:'Abonniere, um das komplette Skript, die Aufgaben und Formeln freizuschalten \u2014 mit der Lehrerin rund um die Uhr.',fr:'Abonne-toi pour d\u00e9bloquer tout le support, les exercices et les formules \u2014 avec la professeure 24h/24.',es:'Suscr\u00edbete para desbloquear los apuntes, ejercicios y f\u00f3rmulas completos \u2014 con la profesora 24/7.',it:'Abbonati per sbloccare appunti, esercizi e formule completi \u2014 con l\u2019insegnante 24/7.',ru:'\u041e\u0444\u043e\u0440\u043c\u0438 \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0443, \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043f\u043e\u043b\u043d\u044b\u0435 \u043a\u043e\u043d\u0441\u043f\u0435\u043a\u0442\u044b, \u0437\u0430\u0434\u0430\u0447\u0438 \u0438 \u0444\u043e\u0440\u043c\u0443\u043b\u044b \u2014 \u0441 \u043f\u0440\u0435\u043f\u043e\u0434\u0430\u0432\u0430\u0442\u0435\u043b\u044c\u043d\u0438\u0446\u0435\u0439 24/7.',pt:'Subscreve para desbloquear os apontamentos, exerc\u00edcios e f\u00f3rmulas completos \u2014 com a professora 24/7.'},
      cta:{sr:'Pogledaj pakete \u2192',en:'See the plans \u2192',de:'Pakete ansehen \u2192',fr:'Voir les forfaits \u2192',es:'Ver los planes \u2192',it:'Vedi i pacchetti \u2192',ru:'\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0442\u0430\u0440\u0438\u0444\u044b \u2192',pt:'Ver os planos \u2192'},
      have:{sr:'Ve\u0107 ima\u0161 nalog?',en:'Already have an account?',de:'Hast du schon ein Konto?',fr:'Tu as d\u00e9j\u00e0 un compte ?',es:'\u00bfYa tienes cuenta?',it:'Hai gi\u00e0 un account?',ru:'\u0423\u0436\u0435 \u0435\u0441\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442?',pt:'J\u00e1 tens conta?'}
    };
    return (D[sr]&&(D[sr][L]||D[sr].sr))||'';
  }
  function run(){
    var main=document.querySelector('main')||document.querySelector('.wrap')||document.body;
    if(!main||document.getElementById('mpv-gate'))return;
    var css=document.createElement('style');
    css.textContent='#mpv-ribbon{position:sticky;top:0;z-index:50;background:linear-gradient(90deg,#4A2A38,#5C3B49);color:#F5E9DC;text-align:center;font-family:Nunito,sans-serif;font-size:.86rem;font-weight:700;padding:9px 16px;letter-spacing:.01em}'
      +'.mpv-cut{max-height:60vh;overflow:hidden;-webkit-mask-image:linear-gradient(#000 62%,transparent);mask-image:linear-gradient(#000 62%,transparent)}'
      +'#mpv-gate{max-width:560px;margin:-10px auto 60px;padding:0 20px}'
      +'.mpv-card{background:linear-gradient(180deg,#FFFFFF,#FCF6EA);border:1px solid rgba(198,160,92,.32);border-radius:24px;padding:38px 30px;text-align:center;box-shadow:0 40px 90px -60px rgba(120,70,80,.5)}'
      +'.mpv-lock{width:60px;height:60px;margin:0 auto 18px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#9C7838;background:radial-gradient(circle at 38% 30%,#FFFDF6,#F1E1BE);box-shadow:0 14px 26px -12px rgba(198,160,92,.75)}'
      +'.mpv-lock svg{width:26px;height:26px}'
      +'.mpv-card h3{font-family:"Cormorant Garamond",serif;font-size:1.7rem;color:#432C37;font-weight:600;margin:0 0 10px}'
      +'.mpv-card p{color:#90787E;font-size:1rem;max-width:420px;margin:0 auto 22px}'
      +'.mpv-btn{background:linear-gradient(180deg,#E7D2A2,#C6A05C);color:#3a2530;font-family:Nunito,sans-serif;font-weight:800;border-radius:100px;padding:13px 30px;text-decoration:none;display:inline-block;box-shadow:0 16px 30px -14px rgba(198,160,92,.9)}'
      +'.mpv-btn:hover{transform:translateY(-2px)}'
      +'.mpv-have{display:block;margin-top:14px;color:#90787E;font-size:.86rem}.mpv-have a{color:#9C7838;font-weight:700}';
    document.head.appendChild(css);
    var rb=document.createElement('div');rb.id='mpv-ribbon';rb.textContent=T('ribbon');
    document.body.insertBefore(rb,document.body.firstChild);
    main.classList.add('mpv-cut');
    var gate=document.createElement('div');gate.id='mpv-gate';
    gate.innerHTML='<div class="mpv-card"><div class="mpv-lock"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div>'
      +'<h3>'+T('h')+'</h3><p>'+T('p')+'</p>'
      +'<a class="mpv-btn" href="index.html#paketi">'+T('cta')+'</a>'
      +'<span class="mpv-have">'+T('have')+' <a href="profil.html">'+({sr:'Prijavi se',en:'Sign in',de:'Anmelden',fr:'Se connecter',es:'Iniciar sesi\u00f3n',it:'Accedi',ru:'\u0412\u043e\u0439\u0442\u0438',pt:'Iniciar sess\u00e3o'}[(localStorage.getItem('mathia_lang')||'sr').toLowerCase()]||'Prijavi se')+'</a></span></div>';
    if(main.parentNode) main.parentNode.insertBefore(gate,main.nextSibling); else document.body.appendChild(gate);
  }
  if(document.readyState==='loading')addEventListener('DOMContentLoaded',run);else run();
})();
