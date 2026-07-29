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
    s.onerror=function(){loading[l]=false;};
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
      if(dict)D=dict;
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
