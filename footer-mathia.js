/* MATHIA — JEDAN zajednički futer (izgled kao naslovni), potpuno samoprevodiv (8 jezika).
   Ubaci sa: <script src="footer-mathia.js" defer></script>
   Ubacuje se NA KRAJ <body> SAMO ako strana već nema svoj <footer>. */
(function () {
  if (document.querySelector("footer")) return; /* strana već ima futer → ne diramo */

  var TR = {
    "Uči":["Learn","Lernen","Apprendre","Aprende","Impara","Учись","Aprende"],
    "Pravno":["Legal","Rechtliches","Mentions légales","Legal","Note legali","Правовая информация","Jurídico"],
    "Sigurno plaćanje":["Secure payment","Sichere Zahlung","Paiement sécurisé","Pago seguro","Pagamento sicuro","Безопасная оплата","Pagamento seguro"],
    "Uči s ljubavlju — i veruj u sebe.":["Learn with love — and believe in yourself.","Lerne mit Liebe — und glaube an dich.","Apprends avec amour — et crois en toi.","Aprende con amor — y cree en ti.","Impara con amore — e credi in te stesso.","Учись с любовью — и верь в себя.","Aprende com amor — e acredita em ti."],

    "Ostavi utisak":["Leave a review","Bewertung abgeben","Laisser un avis","Deja tu opinión","Lascia una recensione","Оставить отзыв","Deixa a tua opinião"],

    "Biblioteka":["Library","Bibliothek","Bibliothèque","Biblioteca","Biblioteca","Библиотека","Biblioteca"],
    "Reklamacije":["Complaints","Reklamationen","Réclamations","Reclamaciones","Reclami","Рекламации","Reclamações"],
    "Povraćaj i odustanak":["Refunds & withdrawal","Rückgabe & Widerruf","Remboursement et rétractation","Devoluciones y desistimiento","Rimborsi e recesso","Возврат и отказ","Reembolsos e desistência"],
"Dodaci":["Add-ons", "Extras", "Suppléments", "Complementos", "Extra", "Дополнения", "Extras"],"Predmeti": ["Subjects", "Fächer", "Matières", "Asignaturas", "Materie", "Предметы", "Disciplinas"], "Prodavnica": ["Shop", "Shop", "Boutique", "Tienda", "Negozio", "Магазин", "Loja"], "Paketi": ["Plans", "Pakete", "Forfaits", "Planes", "Piani", "Тарифы", "Planos"], "O meni": ["About me", "Über mich", "À propos", "Sobre mí", "Chi sono", "Обо мне", "Sobre mim"], "Za roditelje": ["For parents", "Für Eltern", "Pour les parents", "Para padres", "Per i genitori", "Для родителей", "Para pais"], "Uslovi kupovine": ["Terms of purchase", "Kaufbedingungen", "Conditions d'achat", "Condiciones de compra", "Condizioni d'acquisto", "Условия покупки", "Condições de compra"], "Privatnost": ["Privacy", "Datenschutz", "Confidentialité", "Privacidad", "Privacy", "Конфиденциальность", "Privacidade"], "© 2026 Mathia Edu · Uči s ljubavlju 💛": ["© 2026 Mathia Edu · Learn with love 💛", "© 2026 Mathia Edu · Lernen mit Liebe 💛", "© 2026 Mathia Edu · Apprendre avec amour 💛", "© 2026 Mathia Edu · Aprende con amor 💛", "© 2026 Mathia Edu · Impara con amore 💛", "© 2026 Mathia Edu · Учись с любовью 💛", "© 2026 Mathia Edu · Aprenda com amor 💛"], "Mathia je nezavisna obrazovna platforma edukativnog karaktera i nije povezana ni sa jednom školom, fakultetom niti drugom ustanovom.": ["Mathia is an independent educational platform and is not affiliated with any school, university or other institution.", "Mathia ist eine unabhängige Bildungsplattform mit pädagogischem Charakter und steht in keiner Verbindung zu einer Schule, Universität oder sonstigen Einrichtung.", "Mathia est une plateforme éducative indépendante à caractère pédagogique et n'est affiliée à aucune école, université ni autre institution.", "Mathia es una plataforma educativa independiente de carácter formativo y no está afiliada a ninguna escuela, universidad u otra institución.", "Mathia è una piattaforma educativa indipendente di carattere formativo e non è affiliata ad alcuna scuola, università o altra istituzione.", "Mathia — независимая образовательная платформа образовательного характера, не связанная ни с одной школой, университетом или иным учреждением.", "A Mathia é uma plataforma educativa independente, de carácter pedagógico, e não está afiliada a nenhuma escola, universidade ou outra instituição."]};
  var IDX = { en:0, de:1, fr:2, es:3, it:4, ru:5, pt:6 };
  function lng(){ try{ var s=localStorage.getItem("mathia_lang"); if(s) return s.slice(0,2).toLowerCase(); }catch(e){} return (document.documentElement.lang||"sr").slice(0,2).toLowerCase(); }
  function t(sr){ var l=lng(); if(l==="sr"||!(l in IDX)) return sr; var a=TR[sr]; return a? a[IDX[l]] : sr; }

  var GRUPE = [
    ["Uči",   [["predmeti.html","Predmeti"],["biblioteka.html","Biblioteka"],["index.html#paketi","Paketi"],["prodavnica.html","Dodaci"]]],
    ["Mathia",[["o-marini.html","O meni"],["za-roditelje.html","Za roditelje"],["utisci-posalji.html","Ostavi utisak"]]],
    ["Pravno",[["uslovi.html","Uslovi kupovine"],["privatnost.html","Privatnost"],["reklamacije.html","Reklamacije"],["povracaj.html","Povraćaj i odustanak"]]]
  ];
  var DISC = "Mathia je nezavisna obrazovna platforma edukativnog karaktera i nije povezana ni sa jednom školom, fakultetom niti drugom ustanovom.";
  var COPY = "© 2026 Mathia Edu · Uči s ljubavlju 💛";

  function injectCss(){
    if (document.getElementById("mf-css")) return;
    var s=document.createElement("style"); s.id="mf-css";
    s.textContent =
      ".mf-foot{margin-top:56px;padding:44px 20px 0;position:relative;background:linear-gradient(180deg,#FBF6EE,#F5EAD9)!important;border-top:1px solid rgba(198,160,92,.35)}"+
      ".mf-foot::before{content:'';position:absolute;top:-1px;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#F0DCA8,#C6A05C,#FFF6D6,#C6A05C,#F0DCA8,transparent)}"+
      ".mf-in{max-width:1080px;margin:0 auto;padding:0 24px;font-family:'Inter',system-ui,sans-serif}"+
      ".mf-top{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:30px 26px;text-align:left;padding-bottom:26px}"+
      ".mf-logo{font-family:'Spectral',Georgia,serif;font-size:1.34rem;letter-spacing:.34em;color:#A6803C;font-weight:600;margin-bottom:10px}"+
      ".mf-foot .mf-slogan{color:#6E5A60!important;-webkit-text-fill-color:#6E5A60;font-size:.86rem;line-height:1.6;margin:0 0 12px;max-width:250px}"+
      ".mf-foot .mf-mail{color:#7A3346!important;-webkit-text-fill-color:#7A3346;font-size:.86rem;font-weight:700;text-decoration:none;border-bottom:1px solid rgba(176,30,72,.3);padding-bottom:1px}"+
      ".mf-foot .mf-mail:hover{color:#A6803C!important;-webkit-text-fill-color:#A6803C}"+
      ".mf-col h4{font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:#7A5C26;margin:0 0 12px;font-weight:800;font-family:'Inter',system-ui,sans-serif}"+
      ".mf-col a{display:block;color:#5E4A52!important;-webkit-text-fill-color:#5E4A52;font-weight:600;font-size:.88rem;text-decoration:none;margin-bottom:9px;transition:color .18s,transform .18s}"+
      ".mf-col a:hover{color:#B01E48!important;-webkit-text-fill-color:#B01E48;transform:translateX(3px)}"+
      ".mf-pay-row{display:flex;align-items:center;justify-content:center;gap:12px;padding:18px 0;border-top:1px solid rgba(198,160,92,.28)}"+
      ".mf-pay{height:22px;opacity:.95;display:inline-block}"+
      ".mf-foot .mf-pay-lbl{color:#6E5A60!important;-webkit-text-fill-color:#6E5A60;font-size:.76rem;font-weight:600}"+
      ".mf-bar{text-align:center;padding:16px 0 26px;border-top:1px solid rgba(198,160,92,.28)}"+
      ".mf-foot .mf-note{color:#6E5A60!important;-webkit-text-fill-color:#6E5A60;font-size:.76rem;max-width:640px;margin:0 auto 10px;line-height:1.6}"+
      ".mf-foot .mf-copy{color:#5E4A52!important;-webkit-text-fill-color:#5E4A52;font-size:.82rem;font-weight:600}"+
      "@media(max-width:820px){.mf-top{grid-template-columns:1fr 1fr;gap:26px 20px}}"+
      "@media(max-width:520px){.mf-top{grid-template-columns:1fr;text-align:center}.mf-foot .mf-slogan{margin-left:auto;margin-right:auto}.mf-pay-row{flex-direction:column;gap:8px}}";
    document.head.appendChild(s);
  }
  function render(){
    var kol = GRUPE.map(function(g){
      var lin = g[1].map(function(n){ return '<a href="'+n[0]+'">'+t(n[1])+'</a>'; }).join("");
      return '<nav class="mf-col"><h4>'+t(g[0])+'</h4>'+lin+'</nav>';
    }).join("");
    return '<div class="mf-in">'+
        '<div class="mf-top">'+
          '<div class="mf-brand">'+
            '<div class="mf-logo">MATHIA</div>'+
            '<p class="mf-slogan">'+t("Uči s ljubavlju — i veruj u sebe.")+'</p>'+
            '<a class="mf-mail" href="mailto:kontakt@mathia.rs">kontakt@mathia.rs</a>'+
          '</div>'+ kol +
        '</div>'+
        '<div class="mf-pay-row">'+
          '<img class="mf-pay" src="placanje-logos.png" alt="Visa · Mastercard · DinaCard · 3-D Secure" onerror="this.style.display=\'none\'">'+
          '<span class="mf-pay-lbl">'+t("Sigurno plaćanje")+'</span>'+
        '</div>'+
        '<div class="mf-bar">'+
          '<div class="mf-note">'+t(DISC)+'</div>'+
          '<div class="mf-copy">'+t(COPY)+'</div>'+
        '</div>'+
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
