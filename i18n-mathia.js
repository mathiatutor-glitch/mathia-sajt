/* MATHIA — i18n motor (lazi rečnik + efikasan posmatrač).
   Rečnik (mathia-dict.js, ~4MB) se učitava TEK kad posetilac izabere jezik
   različit od srpskog. Srpski posetioci ne vuku ništa dodatno.
   Posmatrač obrađuje SAMO novo-dodate čvorove (ne re-skenira celu stranu). */
(function(){
  /* D = ravan rečnik SAMO za tekući jezik (ključ = srpski tekst -> prevod).
     Učitava se po jeziku (mathia-dict-<jezik>.js, ~0.85MB) umesto celog
     rečnika od 4.2MB. Srpski posetioci ne vuku ništa. Već učitani jezici se
     keširaju (window.__MD__), pa je svako naredno prebacivanje trenutno. */
  var D=null, nodes=[], curLang='sr', started=false, loading={};
  /* ——— DOPUNA rečnika: tekstovi dodati posle poslednjeg builda glavnog rečnika.
     Glavni rečnik ima prednost; ovo samo popunjava rupe. ——— */
  var EXTRA = {"en": {"← Sve oblasti": "← All areas", "Sve oblasti": "All areas", "5–8. razred i mala matura": "Grades 5–8 and the final exam", "matematika i fizika · 1–4. razred": "mathematics and physics · years 1–4", "od škole do fakulteta": "from school to university", "inženjerski predmeti": "engineering subjects", "🎒 Osnovna škola": "🎒 Primary school", "📐 Srednja škola": "📐 Secondary school", "🎯 Priprema za prijemne": "🎯 Entrance exam prep", "🎓 Fakultet": "🎓 University", "Kupiš jednom — tvoj je zauvek.": "Buy once — yours forever.", ", bez mesečnih obaveza.": ", with no monthly commitment.", "· korica: Šampanj": "· cover: Champagne", "Izaberi predmet.": "Choose a subject.", "Matura / final exam": "Final exam", "Profesorica te čeka — pitaj je šta god zapneš.": "Profesorica is waiting — ask her whenever you get stuck.", "Otvori predmet": "Open subject", "Otvori prvi predmet →": "Open your first subject →", "Pitaj Profesoricu": "Ask Profesorica", "Šta je Mathia": "What is Mathia", "Najtraženije:": "Most popular:", "Otvori →": "Open →"}, "de": {"← Sve oblasti": "← Alle Bereiche", "Sve oblasti": "Alle Bereiche", "5–8. razred i mala matura": "5.–8. Klasse und Abschlussprüfung", "matematika i fizika · 1–4. razred": "Mathematik und Physik · 1.–4. Jahr", "od škole do fakulteta": "von der Schule bis zur Universität", "inženjerski predmeti": "Ingenieurfächer", "🎒 Osnovna škola": "🎒 Grundschule", "📐 Srednja škola": "📐 Oberschule", "🎯 Priprema za prijemne": "🎯 Vorbereitung auf Aufnahmeprüfungen", "🎓 Fakultet": "🎓 Universität", "Kupiš jednom — tvoj je zauvek.": "Einmal kaufen — für immer deins.", ", bez mesečnih obaveza.": ", ohne monatliche Verpflichtung.", "· korica: Šampanj": "· Einband: Champagner", "Izaberi predmet.": "Wähle ein Fach.", "Matura / final exam": "Abschlussprüfung", "Profesorica te čeka — pitaj je šta god zapneš.": "Profesorica wartet auf dich — frag sie, wann immer du nicht weiterkommst.", "Otvori predmet": "Fach öffnen", "Otvori prvi predmet →": "Erstes Fach öffnen →", "Pitaj Profesoricu": "Profesorica fragen", "Šta je Mathia": "Was ist Mathia", "Najtraženije:": "Am beliebtesten:", "Otvori →": "Öffnen →"}, "fr": {"← Sve oblasti": "← Tous les domaines", "Sve oblasti": "Tous les domaines", "5–8. razred i mala matura": "5e–8e année et examen final", "matematika i fizika · 1–4. razred": "mathématiques et physique · 1re–4e année", "od škole do fakulteta": "de l'école à l'université", "inženjerski predmeti": "matières d'ingénierie", "🎒 Osnovna škola": "🎒 École élémentaire", "📐 Srednja škola": "📐 Lycée", "🎯 Priprema za prijemne": "🎯 Préparation aux concours", "🎓 Fakultet": "🎓 Université", "Kupiš jednom — tvoj je zauvek.": "Achète une fois — c'est à toi pour toujours.", ", bez mesečnih obaveza.": ", sans engagement mensuel.", "· korica: Šampanj": "· couverture : champagne", "Izaberi predmet.": "Choisis une matière.", "Matura / final exam": "Examen final", "Profesorica te čeka — pitaj je šta god zapneš.": "Profesorica t'attend — demande-lui dès que tu bloques.", "Otvori predmet": "Ouvrir la matière", "Otvori prvi predmet →": "Ouvre ta première matière →", "Pitaj Profesoricu": "Demander à Profesorica", "Šta je Mathia": "Qu'est-ce que Mathia", "Najtraženije:": "Les plus demandés :", "Otvori →": "Ouvrir →"}, "es": {"← Sve oblasti": "← Todas las áreas", "Sve oblasti": "Todas las áreas", "5–8. razred i mala matura": "5.º–8.º curso y examen final", "matematika i fizika · 1–4. razred": "matemáticas y física · 1.º–4.º", "od škole do fakulteta": "de la escuela a la universidad", "inženjerski predmeti": "asignaturas de ingeniería", "🎒 Osnovna škola": "🎒 Primaria", "📐 Srednja škola": "📐 Secundaria", "🎯 Priprema za prijemne": "🎯 Preparación para el acceso", "🎓 Fakultet": "🎓 Universidad", "Kupiš jednom — tvoj je zauvek.": "Cómpralo una vez — es tuyo para siempre.", ", bez mesečnih obaveza.": ", sin compromiso mensual.", "· korica: Šampanj": "· cubierta: champán", "Izaberi predmet.": "Elige una asignatura.", "Matura / final exam": "Examen final", "Profesorica te čeka — pitaj je šta god zapneš.": "Profesorica te espera — pregúntale siempre que te atasques.", "Otvori predmet": "Abrir asignatura", "Otvori prvi predmet →": "Abre tu primera asignatura →", "Pitaj Profesoricu": "Preguntar a Profesorica", "Šta je Mathia": "Qué es Mathia", "Najtraženije:": "Lo más buscado:", "Otvori →": "Abrir →"}, "it": {"← Sve oblasti": "← Tutte le aree", "Sve oblasti": "Tutte le aree", "5–8. razred i mala matura": "Classi 5–8 ed esame finale", "matematika i fizika · 1–4. razred": "matematica e fisica · 1º–4º anno", "od škole do fakulteta": "dalla scuola all'università", "inženjerski predmeti": "materie di ingegneria", "🎒 Osnovna škola": "🎒 Scuola primaria", "📐 Srednja škola": "📐 Scuola superiore", "🎯 Priprema za prijemne": "🎯 Preparazione ai test d'ingresso", "🎓 Fakultet": "🎓 Università", "Kupiš jednom — tvoj je zauvek.": "Lo compri una volta — è tuo per sempre.", ", bez mesečnih obaveza.": ", senza vincoli mensili.", "· korica: Šampanj": "· copertina: champagne", "Izaberi predmet.": "Scegli una materia.", "Matura / final exam": "Esame finale", "Profesorica te čeka — pitaj je šta god zapneš.": "Profesorica ti aspetta — chiedile ogni volta che ti blocchi.", "Otvori predmet": "Apri la materia", "Otvori prvi predmet →": "Apri la tua prima materia →", "Pitaj Profesoricu": "Chiedi a Profesorica", "Šta je Mathia": "Cos'è Mathia", "Najtraženije:": "I più richiesti:", "Otvori →": "Apri →"}, "ru": {"← Sve oblasti": "← Все разделы", "Sve oblasti": "Все разделы", "5–8. razred i mala matura": "5–8 классы и выпускной экзамен", "matematika i fizika · 1–4. razred": "математика и физика · 1–4 классы", "od škole do fakulteta": "от школы до университета", "inženjerski predmeti": "инженерные предметы", "🎒 Osnovna škola": "🎒 Начальная школа", "📐 Srednja škola": "📐 Средняя школа", "🎯 Priprema za prijemne": "🎯 Подготовка к вступительным", "🎓 Fakultet": "🎓 Университет", "Kupiš jednom — tvoj je zauvek.": "Покупаешь один раз — твоё навсегда.", ", bez mesečnih obaveza.": ", без ежемесячных обязательств.", "· korica: Šampanj": "· обложка: шампань", "Izaberi predmet.": "Выбери предмет.", "Matura / final exam": "Выпускной экзамен", "Profesorica te čeka — pitaj je šta god zapneš.": "Profesorica ждёт тебя — спрашивай, как только застрянешь.", "Otvori predmet": "Открыть предмет", "Otvori prvi predmet →": "Открой первый предмет →", "Pitaj Profesoricu": "Спросить Profesorica", "Šta je Mathia": "Что такое Mathia", "Najtraženije:": "Самое популярное:", "Otvori →": "Открыть →"}, "pt": {"← Sve oblasti": "← Todas as áreas", "Sve oblasti": "Todas as áreas", "5–8. razred i mala matura": "5.º–8.º ano e exame final", "matematika i fizika · 1–4. razred": "matemática e física · 1.º–4.º ano", "od škole do fakulteta": "da escola à universidade", "inženjerski predmeti": "disciplinas de engenharia", "🎒 Osnovna škola": "🎒 Ensino básico", "📐 Srednja škola": "📐 Ensino secundário", "🎯 Priprema za prijemne": "🎯 Preparação para exames de acesso", "🎓 Fakultet": "🎓 Universidade", "Kupiš jednom — tvoj je zauvek.": "Compras uma vez — é teu para sempre.", ", bez mesečnih obaveza.": ", sem compromisso mensal.", "· korica: Šampanj": "· capa: champanhe", "Izaberi predmet.": "Escolhe uma disciplina.", "Matura / final exam": "Exame final", "Profesorica te čeka — pitaj je šta god zapneš.": "A Profesorica espera por ti — pergunta sempre que ficares preso.", "Otvori predmet": "Abrir disciplina", "Otvori prvi predmet →": "Abre a tua primeira disciplina →", "Pitaj Profesoricu": "Perguntar à Profesorica", "Šta je Mathia": "O que é a Mathia", "Najtraženije:": "Mais procurados:", "Otvori →": "Abrir →"}};

  function lng(){try{var s=localStorage.getItem('mathia_lang');if(s)return s.slice(0,2).toLowerCase();}catch(e){}return (document.documentElement.lang||'sr').slice(0,2).toLowerCase();}
  function harvest(root){
    if(!root)return;
    var nl;
    if(root.nodeType===3){nl=[root];}
    else if(root.nodeType===1){var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null,false),n,arr=[];while(n=w.nextNode())arr.push(n);nl=arr;}
    else return;
    for(var i=0;i<nl.length;i++){
      var node=nl[i], p=node.parentNode; if(!p)continue;
      var tg=p.nodeName; if(tg==='SCRIPT'||tg==='STYLE'||tg==='TEXTAREA')continue;
      /* Klon (Profesorica) sam piše na ciljnom jeziku — rečnik ga NIKADA ne sme dirati */
      if(p.closest&&p.closest('#zoi-panel,#zoi-btn,.zoi-cta,[data-noi18n]'))continue;
      if(node.__mi)continue;
      var key=((node.__o!==undefined?node.__o:node.nodeValue)||'').trim(); if(key.length<2)continue;
      if(!D||!D[key])continue;               /* prati samo čvorove prevodive u tekućem rečniku */
      if(node.__o===undefined)node.__o=node.nodeValue;
      node.__mi=1; nodes.push([node,key]);
      if(curLang!=='sr')node.nodeValue=node.__o.replace(key,D[key]);
    }
  }
  function ap(){for(var i=0;i<nodes.length;i++){var n=nodes[i][0],k=nodes[i][1];var t=(D&&D[k]);var v=(curLang==='sr'||!t)?n.__o:n.__o.replace(k,t);if(n.nodeValue!==v)n.nodeValue=v;}}
  function loadLang(l,cb){
    if(l==='sr'){cb&&cb(null);return;}
    var cache=window.__MD__;
    if(cache&&cache[l]){cb&&cb(cache[l]);return;}
    if(loading[l])return; loading[l]=true;
    var s=document.createElement('script'); s.src='mathia-dict-'+l+'.js'; s.async=true;
    s.onload=function(){loading[l]=false; cb&&cb((window.__MD__||{})[l]);};
    s.onerror=function(){loading[l]=false; cb&&cb(null);};   /* i bez glavnog rečnika, DOPUNA mora da radi */
    (document.head||document.documentElement).appendChild(s);
  }
  var pending=[], _dt;
  function flush(){var q=pending;pending=[];for(var i=0;i<q.length;i++)harvest(q[i]);}
  function startObserver(){
    if(started)return; started=true;
    try{
      new MutationObserver(function(muts){
        if(!D)return;
        for(var i=0;i<muts.length;i++){var an=muts[i].addedNodes;for(var j=0;j<an.length;j++)pending.push(an[j]);}
        if(pending.length){clearTimeout(_dt);_dt=setTimeout(flush,200);}
      }).observe(document.body||document.documentElement,{childList:true,subtree:true});
    }catch(e){}
  }
  function onLang(){
    var l=lng(); curLang=l;
    if(l==='sr'){ ap(); return; }             /* vrati original (ako je nešto ubrano) */
    loadLang(l,function(dict){
      D = Object.assign({}, EXTRA[l]||{}, dict||{});
      if(!started){ harvest(document.body); startObserver(); }
      else { ap(); }
    });
  }
  if(document.readyState==='loading')addEventListener('DOMContentLoaded',onLang);else onLang();
  addEventListener('storage',function(e){if(e.key==='mathia_lang')onLang();});
  window.addEventListener('mathia:lang',onLang);
  try{ new MutationObserver(function(){onLang();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']}); }catch(e){}
})();
;(function(){/*jezik-select-sync*/function sy(){try{var l=(localStorage.getItem("mathia_lang")||"sr").toLowerCase();var ss=document.querySelectorAll('select[aria-label="Jezik"]');for(var i=0;i<ss.length;i++)ss[i].value=l;}catch(e){}}if(document.readyState!=="loading")sy();else document.addEventListener("DOMContentLoaded",sy);window.addEventListener("mathia:lang",sy);window.addEventListener("storage",function(e){if(!e||e.key==="mathia_lang")sy();});})();
;(function(){/* Meta piksel (PageView na svim stranicama) */
  try{
    if(window.fbq) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','1032012319418923');
    fbq('track','PageView');
  }catch(e){}
})();
;(function(){/* sticky-fix: overflow-x:hidden na html/body lomi position:sticky (header).
   overflow-x:clip sprečava horizontalni skrol ali NE lomi sticky. Ne dira menu-lock. */
  try{
    var s=document.createElement('style');
    s.textContent='html,body{overflow-x:clip!important}html.navham-lock,body.navham-lock{overflow:hidden!important}';
    (document.head||document.documentElement).appendChild(s);
  }catch(e){}
})();
;(function(){/* brojač poseta (self-hosted preko /api/hit) — bez ličnih podataka */
  try{
    var p=location.pathname||"";
    if(/tabla\.html|admin-|prijava|nalog\.html/i.test(p)) return; // ne broji admin/prijave
    var K="mathia_dev", dev=null;
    try{ dev=localStorage.getItem(K); if(!dev){ dev=Date.now().toString(36)+Math.random().toString(36).slice(2,10); localStorage.setItem(K,dev); } }catch(e){}
    fetch("/api/hit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({dev:dev||"",path:p}),keepalive:true}).catch(function(){});
  }catch(e){}
})();
