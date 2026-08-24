/* MATHIA — JEDAN zajednički futer (izgled kao naslovni), potpuno samoprevodiv (8 jezika).
   Ubaci sa: <script src="footer-mathia.js" defer></script>
   Ubacuje se NA KRAJ <body> SAMO ako strana već nema svoj <footer>. */
(function () {
  if (document.querySelector("footer")) return; /* strana već ima futer → ne diramo */

  var TR = {
    "Ostavi utisak":["Leave a review","Bewertung abgeben","Laisser un avis","Deja tu opinión","Lascia una recensione","Оставить отзыв","Deixa a tua opinião"],

    "Biblioteka":["Library","Bibliothek","Bibliothèque","Biblioteca","Biblioteca","Библиотека","Biblioteca"],
    "Reklamacije":["Complaints","Reklamationen","Réclamations","Reclamaciones","Reclami","Рекламации","Reclamações"],
    "Povraćaj i odustanak":["Refunds & withdrawal","Rückgabe & Widerruf","Remboursement et rétractation","Devoluciones y desistimiento","Rimborsi e recesso","Возврат и отказ","Reembolsos e desistência"],
"Dodaci":["Add-ons", "Extras", "Suppléments", "Complementos", "Extra", "Дополнения", "Extras"],"Predmeti": ["Subjects", "Fächer", "Matières", "Asignaturas", "Materie", "Предметы", "Disciplinas"], "Prodavnica": ["Shop", "Shop", "Boutique", "Tienda", "Negozio", "Магазин", "Loja"], "Paketi": ["Plans", "Pakete", "Forfaits", "Planes", "Piani", "Тарифы", "Planos"], "O meni": ["About me", "Über mich", "À propos", "Sobre mí", "Chi sono", "Обо мне", "Sobre mim"], "Za roditelje": ["For parents", "Für Eltern", "Pour les parents", "Para padres", "Per i genitori", "Для родителей", "Para pais"], "Uslovi kupovine": ["Terms of purchase", "Kaufbedingungen", "Conditions d'achat", "Condiciones de compra", "Condizioni d'acquisto", "Условия покупки", "Condições de compra"], "Privatnost": ["Privacy", "Datenschutz", "Confidentialité", "Privacidad", "Privacy", "Конфиденциальность", "Privacidade"], "© 2026 Mathia Edu · Uči s ljubavlju 💛": ["© 2026 Mathia Edu · Learn with love 💛", "© 2026 Mathia Edu · Lernen mit Liebe 💛", "© 2026 Mathia Edu · Apprendre avec amour 💛", "© 2026 Mathia Edu · Aprende con amor 💛", "© 2026 Mathia Edu · Impara con amore 💛", "© 2026 Mathia Edu · Учись с любовью 💛", "© 2026 Mathia Edu · Aprenda com amor 💛"], "Mathia je nezavisna obrazovna platforma edukativnog karaktera i nije povezana ni sa jednom školom, fakultetom niti drugom ustanovom.": ["Mathia is an independent educational platform and is not affiliated with any school, university or other institution.", "Mathia ist eine unabhängige Bildungsplattform mit pädagogischem Charakter und steht in keiner Verbindung zu einer Schule, Universität oder sonstigen Einrichtung.", "Mathia est une plateforme éducative indépendante à caractère pédagogique et n'est affiliée à aucune école, université ni autre institution.", "Mathia es una plataforma educativa independiente de carácter formativo y no está afiliada a ninguna escuela, universidad u otra institución.", "Mathia è una piattaforma educativa indipendente di carattere formativo e non è affiliata ad alcuna scuola, università o altra istituzione.", "Mathia — независимая образовательная платформа образовательного характера, не связанная ни с одной школой, университетом или иным учреждением.", "A Mathia é uma plataforma educativa independente, de carácter pedagógico, e não está afiliada a nenhuma escola, universidade ou outra instituição."]};
  var IDX = { en:0, de:1, fr:2, es:3, it:4, ru:5, pt:6 };
  function lng(){ try{ var s=localStorage.getItem("mathia_lang"); if(s) return s.slice(0,2).toLowerCase(); }catch(e){} return (document.documentElement.lang||"sr").slice(0,2).toLowerCase(); }
  function t(sr){ var l=lng(); if(l==="sr"||!(l in IDX)) return sr; var a=TR[sr]; return a? a[IDX[l]] : sr; }

  var NAV = [
    ["predmeti.html","Predmeti"],
    ["prodavnica.html","Dodaci"],
    ["index.html#paketi","Paketi"],
    ["o-marini.html","O meni"],
    ["za-roditelje.html","Za roditelje"],
    ["biblioteka.html","Biblioteka"],
    ["utisci-posalji.html","Ostavi utisak"],
    ["uslovi.html","Uslovi kupovine"],
    ["privatnost.html","Privatnost"],
    ["reklamacije.html","Reklamacije"],
    ["povracaj.html","Povraćaj i odustanak"]
  ];
  var DISC = "Mathia je nezavisna obrazovna platforma edukativnog karaktera i nije povezana ni sa jednom školom, fakultetom niti drugom ustanovom.";
  var COPY = "© 2026 Mathia Edu · Uči s ljubavlju 💛";

  function injectCss(){
    if (document.getElementById("mf-css")) return;
    var s=document.createElement("style"); s.id="mf-css";
    s.textContent =
      ".mf-foot{margin-top:56px;text-align:center;padding:38px 20px 30px;position:relative;background:linear-gradient(180deg,#FBF6EE,#F5EAD9)!important;border-top:1px solid rgba(198,160,92,.35)}"+
      ".mf-foot::before{content:'';position:absolute;top:-1px;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#F0DCA8,#C6A05C,#FFF6D6,#C6A05C,#F0DCA8,transparent)}"+
      ".mf-in{max-width:1080px;margin:0 auto;padding:0 24px}"+
      ".mf-links{display:flex;justify-content:center;flex-wrap:wrap;gap:8px 22px;margin-bottom:14px}"+
      ".mf-foot .mf-links a{color:#7A3346!important;font-weight:700;font-size:.9rem;font-family:'Inter',system-ui,sans-serif;text-decoration:none;transition:color .2s;-webkit-text-fill-color:#7A3346}"+
      ".mf-foot .mf-links a:hover{color:#A6803C!important;-webkit-text-fill-color:#A6803C}"+
      ".mf-pay{height:22px;opacity:.9;margin:6px 0 12px;display:inline-block}"+
      ".mf-foot .mf-note{color:#9A8A90!important;font-size:.72rem;max-width:600px;margin:0 auto 8px;line-height:1.5;font-family:'Inter',system-ui,sans-serif;-webkit-text-fill-color:#9A8A90}"+
      ".mf-foot .mf-copy{color:#8A7A80!important;font-size:.8rem;font-family:'Inter',system-ui,sans-serif;-webkit-text-fill-color:#8A7A80}";
    document.head.appendChild(s);
  }
  function render(){
    var nav = NAV.map(function(n){ return '<a href="'+n[0]+'">'+t(n[1])+'</a>'; }).join("");
    return '<div class="mf-in">'+
        '<nav class="mf-links">'+nav+'</nav>'+
        '<img class="mf-pay" src="placanje-logos.png" alt="Visa · Mastercard · DinaCard · 3-D Secure" onerror="this.style.display=\'none\'">'+
        '<div class="mf-note">'+t(DISC)+'</div>'+
        '<div class="mf-copy">'+t(COPY)+'</div>'+
      '</div>';
  }
  var foot=null;
  function paint(){ if(foot) foot.innerHTML=render(); }
  function build(){
    injectCss();
    foot=document.createElement("footer");
    foot.className="mf-foot";
    foot.setAttribute("role","contentinfo");
    foot.innerHTML=render();
    document.body.appendChild(foot);
  }
  window.addEventListener("mathia:lang", paint);
  window.addEventListener("storage", function(e){ if(e.key==="mathia_lang") paint(); });
  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
