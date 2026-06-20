/* Mathia – access gate (provera pristupa u browseru)
   Ubacuje se na zaštićene stranice: <script defer src="gate.js" data-subject="KEY[,KEY2]"></script>
   Proverava: ulogovan + aktivna pretplata + (bar jedan) traženi predmet izabran.
   Napomena: ovo je provera na strani klijenta — odvraća korisnike, ali nije potpuna zaštita. */
(function(){
  var SB_URL="https://ibhirxltgeyecrjwymai.supabase.co";
  var SB_KEY="sb_publishable_CCYCDgnEYW6FgWvsfoFZIA_vE_yD6qb";
  var sc=document.querySelector('script[data-subject]');
  var need=((sc&&sc.getAttribute('data-subject'))||'').split(',').map(function(x){return x.trim();}).filter(Boolean);
  var LANG=(localStorage.getItem('mathia_lang')||'sr').toLowerCase();

  var T={
    sr:{tl:"Zaključano 🔒",ml:"Ova stranica je deo pretplate. Prijavi se ili izaberi paket da dobiješ pristup.",
        ts:"Potrebna je pretplata 🔒",ms:"Tvoj nalog još nema aktivan paket. Izaberi paket da otključaš predmete, priručnike i Marinu.",
        tj:"Predmet nije u tvom izboru 🔒",mj:"Ovaj predmet nije među izabranim u tvom paketu. Izmeni izbor predmeta ili nadogradi paket.",
        login:"Prijava",pkg:"Vidi pakete",acc:"Moj nalog",edit:"Izmeni predmete",load:"Provera pristupa…",home:"Početna"},
    en:{tl:"Locked 🔒",ml:"This page is part of a subscription. Sign in or choose a plan to get access.",
        ts:"Subscription required 🔒",ms:"Your account has no active plan yet. Choose a plan to unlock subjects, guides and Marina.",
        tj:"Subject not in your selection 🔒",mj:"This subject isn’t among the ones in your plan. Change your subject selection or upgrade your plan.",
        login:"Sign in",pkg:"See plans",acc:"My account",edit:"Edit subjects",load:"Checking access…",home:"Home"},
    de:{tl:"Gesperrt 🔒",ml:"Diese Seite gehört zum Abo. Melde dich an oder wähle ein Paket, um Zugang zu erhalten.",
        ts:"Abo erforderlich 🔒",ms:"Dein Konto hat noch kein aktives Paket. Wähle ein Paket, um Fächer, Skripte und Marina freizuschalten.",
        tj:"Fach nicht in deiner Auswahl 🔒",mj:"Dieses Fach gehört nicht zu deinem Paket. Ändere deine Fächerauswahl oder erweitere dein Paket.",
        login:"Anmelden",pkg:"Pakete ansehen",acc:"Mein Konto",edit:"Fächer ändern",load:"Zugang wird geprüft…",home:"Start"},
    fr:{tl:"Verrouillé 🔒",ml:"Cette page fait partie d’un abonnement. Connecte-toi ou choisis une formule pour y accéder.",
        ts:"Abonnement requis 🔒",ms:"Ton compte n’a pas encore de formule active. Choisis une formule pour débloquer les matières, les guides et Marina.",
        tj:"Matière non sélectionnée 🔒",mj:"Cette matière ne fait pas partie de ta formule. Modifie ta sélection ou améliore ta formule.",
        login:"Connexion",pkg:"Voir les formules",acc:"Mon compte",edit:"Modifier les matières",load:"Vérification de l’accès…",home:"Accueil"},
    es:{tl:"Bloqueado 🔒",ml:"Esta página es parte de una suscripción. Inicia sesión o elige un plan para acceder.",
        ts:"Se requiere suscripción 🔒",ms:"Tu cuenta aún no tiene un plan activo. Elige un plan para desbloquear materias, guías y Marina.",
        tj:"Materia no seleccionada 🔒",mj:"Esta materia no está entre las de tu plan. Cambia tu selección o mejora tu plan.",
        login:"Entrar",pkg:"Ver planes",acc:"Mi cuenta",edit:"Editar materias",load:"Comprobando acceso…",home:"Inicio"},
    it:{tl:"Bloccato 🔒",ml:"Questa pagina fa parte di un abbonamento. Accedi o scegli un piano per avere accesso.",
        ts:"Abbonamento necessario 🔒",ms:"Il tuo account non ha ancora un piano attivo. Scegli un piano per sbloccare materie, dispense e Marina.",
        tj:"Materia non selezionata 🔒",mj:"Questa materia non è tra quelle del tuo piano. Modifica la selezione o passa a un piano superiore.",
        login:"Accedi",pkg:"Vedi i piani",acc:"Il mio account",edit:"Modifica materie",load:"Verifica accesso…",home:"Home"},
    ru:{tl:"Заблокировано 🔒",ml:"Эта страница входит в подписку. Войдите или выберите пакет, чтобы получить доступ.",
        ts:"Нужна подписка 🔒",ms:"У вашего аккаунта пока нет активного пакета. Выберите пакет, чтобы открыть предметы, пособия и Марину.",
        tj:"Предмет не выбран 🔒",mj:"Этого предмета нет в вашем пакете. Измените выбор предметов или повысьте пакет.",
        login:"Вход",pkg:"Посмотреть пакеты",acc:"Мой аккаунт",edit:"Изменить предметы",load:"Проверка доступа…",home:"Главная"},
    pt:{tl:"Bloqueado 🔒",ml:"Esta página faz parte de uma subscrição. Inicia sessão ou escolhe um plano para teres acesso.",
        ts:"Subscrição necessária 🔒",ms:"A tua conta ainda não tem um plano ativo. Escolhe um plano para desbloquear matérias, guias e a Marina.",
        tj:"Matéria não selecionada 🔒",mj:"Esta matéria não está entre as do teu plano. Altera a tua seleção ou melhora o plano.",
        login:"Entrar",pkg:"Ver planos",acc:"A minha conta",edit:"Editar matérias",load:"A verificar acesso…",home:"Início"}
  };
  var L=T[LANG]||T.sr;

  // 1) odmah sakrij sadržaj (loading veo) da nema "blica"
  var cover=document.createElement('div');
  cover.id="mathia-gate";
  cover.setAttribute('style',"position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;"
    +"background:linear-gradient(180deg,#FBF6EE,#F5EADB);font-family:Nunito,system-ui,sans-serif;color:#3E2D34;text-align:center;padding:24px");
  cover.innerHTML='<div style="opacity:.7;font-size:.95rem">'+L.load+'</div>';
  (document.body||document.documentElement).appendChild(cover);
  document.documentElement.style.overflow="hidden";

  function pass(){ // pristup dozvoljen
    var g=document.getElementById('mathia-gate'); if(g) g.remove();
    document.documentElement.style.overflow="";
  }
  function block(kind){ // kind: 'login' | 'sub' | 'subj'
    var title = kind==='login'?L.tl : kind==='sub'?L.ts : L.tj;
    var msg   = kind==='login'?L.ml : kind==='sub'?L.ms : L.mj;
    var b1,b2;
    if(kind==='login'){ b1=['nalog.html#reg',L.login]; b2=['index.html#paketi',L.pkg]; }
    else if(kind==='sub'){ b1=['index.html#paketi',L.pkg]; b2=['nalog.html',L.acc]; }
    else { b1=['nalog.html',L.edit]; b2=['index.html#paketi',L.pkg]; }
    cover.innerHTML=''
      +'<div style="max-width:440px;background:#fffcf6;border:1px solid #ECDAC5;border-radius:22px;padding:30px 26px;box-shadow:0 18px 50px rgba(67,44,55,.12)">'
      +'<div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:1.9rem;font-weight:700;color:#432C37;line-height:1.15;margin-bottom:8px">'+title+'</div>'
      +'<p style="color:#6c565d;margin:0 0 20px;line-height:1.55">'+msg+'</p>'
      +'<a href="'+b1[0]+'" style="display:block;text-decoration:none;font-weight:800;color:#3a2630;background:linear-gradient(180deg,#E7D2A2,#C6A05C);border:1.5px solid #9C7838;border-radius:100px;padding:13px 22px;margin-bottom:10px">'+b1[1]+'</a>'
      +'<a href="'+b2[0]+'" style="display:block;text-decoration:none;font-weight:800;color:#432C37;background:#fff;border:1.5px solid #ECDAC5;border-radius:100px;padding:13px 22px">'+b2[1]+'</a>'
      +'<a href="index.html" style="display:inline-block;margin-top:16px;color:#90787E;text-decoration:none;font-size:.85rem">← '+L.home+'</a>'
      +'</div>';
    document.documentElement.style.overflow="hidden";
  }

  function loadSB(cb){
    if(window.supabase){ cb(); return; }
    var s=document.createElement('script');
    s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.onload=cb; s.onerror=function(){ block('login'); };
    document.head.appendChild(s);
  }

  loadSB(function(){
    try{
      var sb=window.supabase.createClient(SB_URL,SB_KEY);
      sb.auth.getSession().then(function(r){
        var session=r&&r.data&&r.data.session;
        if(!session){ block('login'); return; }
        sb.from('subscriptions').select('id').eq('status','active').limit(1).then(function(sr){
          var hasSub=sr&&sr.data&&sr.data.length>0;
          if(!hasSub){ block('sub'); return; }
          if(!need.length){ pass(); return; }
          sb.from('selected_subjects').select('subject_key').then(function(ss){
            var keys=((ss&&ss.data)||[]).map(function(x){return x.subject_key;});
            var ok=need.some(function(k){ return keys.indexOf(k)>-1; });
            if(ok) pass(); else block('subj');
          });
        });
      });
    }catch(e){ block('login'); }
  });
})();
