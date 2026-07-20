/* MATHIA — i18n motor (lazi rečnik + efikasan posmatrač).
   Rečnik (mathia-dict.js, ~4MB) se učitava TEK kad posetilac izabere jezik
   različit od srpskog. Srpski posetioci ne vuku ništa dodatno.
   Posmatrač obrađuje SAMO novo-dodate čvorove (ne re-skenira celu stranu). */
(function(){
  var D=null, nodes=[], loading=false;
  function lng(){try{var s=localStorage.getItem('mathia_lang');if(s)return s.slice(0,2).toLowerCase();}catch(e){}return (document.documentElement.lang||'sr').slice(0,2).toLowerCase();}
  function harvest(root){
    if(!D||!root)return;
    var l=lng(), nl;
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
      var m=D[key]; if(!m)continue;
      if(node.__o===undefined)node.__o=node.nodeValue;
      node.__mi=1; nodes.push([node,m,key]);
      if(l!=='sr'&&m[l])node.nodeValue=node.__o.replace(key,m[l]);
    }
  }
  function ap(){var l=lng();for(var i=0;i<nodes.length;i++){var n=nodes[i][0],m=nodes[i][1],k=nodes[i][2];var v=(l==='sr'||!m[l])?n.__o:n.__o.replace(k,m[l]);if(n.nodeValue!==v)n.nodeValue=v;}}
  function loadDict(cb){
    if(D){cb&&cb();return;}
    if(window.__MATHIA_DICT__){D=window.__MATHIA_DICT__;cb&&cb();return;}
    if(loading)return; loading=true;
    var s=document.createElement('script'); s.src='mathia-dict.js'; s.async=true;
    s.onload=function(){D=window.__MATHIA_DICT__||{}; loading=false; cb&&cb();};
    s.onerror=function(){loading=false;};
    (document.head||document.documentElement).appendChild(s);
  }
  var started=false, pending=[], _dt;
  function flush(){var q=pending;pending=[];for(var i=0;i<q.length;i++)harvest(q[i]);}
  function startObserver(){
    if(started)return; started=true;
    try{
      new MutationObserver(function(muts){
        if(!D)return;
        for(var i=0;i<muts.length;i++){var an=muts[i].addedNodes;for(var j=0;j<an.length;j++)pending.push(an[j]);}
        if(pending.length){clearTimeout(_dt);_dt=setTimeout(flush,150);}
      }).observe(document.body||document.documentElement,{childList:true,subtree:true});
    }catch(e){}
  }
  function activate(){ loadDict(function(){ harvest(document.body); startObserver(); }); }
  function onLang(){ if(lng()!=='sr'){ activate(); } else if(D){ ap(); } }
  if(document.readyState==='loading')addEventListener('DOMContentLoaded',onLang);else onLang();
  addEventListener('storage',function(e){if(e.key==='mathia_lang')onLang();});
  window.addEventListener('mathia:lang',onLang);
  try{ new MutationObserver(function(){onLang();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']}); }catch(e){}
})();
;(function(){/*jezik-select-sync*/function sy(){try{var l=(localStorage.getItem("mathia_lang")||"sr").toLowerCase();var ss=document.querySelectorAll('select[aria-label="Jezik"]');for(var i=0;i<ss.length;i++)ss[i].value=l;}catch(e){}}if(document.readyState!=="loading")sy();else document.addEventListener("DOMContentLoaded",sy);window.addEventListener("mathia:lang",sy);window.addEventListener("storage",function(e){if(!e||e.key==="mathia_lang")sy();});})();
