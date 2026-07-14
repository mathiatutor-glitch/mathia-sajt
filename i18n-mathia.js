/* MATHIA — i18n motor (lazi rečnik). Rečnik (mathia-dict.js, ~4MB) se učitava
   TEK kada posetilac izabere jezik različit od srpskog. Srpski = bez ekstra težine. */
(function(){
  var D=null, nodes=[], loading=false, collected=false;
  function lng(){try{var s=localStorage.getItem('mathia_lang');if(s)return s.slice(0,2).toLowerCase();}catch(e){}return (document.documentElement.lang||'sr').slice(0,2).toLowerCase();}
  function collect(){
    if(!D)return; nodes=[];
    var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false),n;
    while(n=w.nextNode()){
      var p=n.parentNode; if(!p)continue; var tg=p.nodeName; if(tg==='SCRIPT'||tg==='STYLE'||tg==='TEXTAREA')continue;
      var key=((n.__o!==undefined?n.__o:n.nodeValue)||'').trim(); if(key.length<2)continue;
      if(D[key]){ if(n.__o===undefined)n.__o=n.nodeValue; nodes.push([n,D[key],key]); }
    }
    collected=true;
  }
  function ap(){var l=lng();if(!D){return;}nodes.forEach(function(p){var n=p[0],m=p[1];var v=(l==='sr'||!m[l])?n.__o:n.__o.replace(p[2],m[l]);n.nodeValue=v;});}
  function run(){collect();ap();}
  function loadDict(cb){
    if(D){cb&&cb();return;}
    if(window.__MATHIA_DICT__){D=window.__MATHIA_DICT__;cb&&cb();return;}
    if(loading)return; loading=true;
    var s=document.createElement('script'); s.src='mathia-dict.js'; s.async=true;
    s.onload=function(){D=window.__MATHIA_DICT__||{}; loading=false; cb&&cb();};
    s.onerror=function(){loading=false;};
    (document.head||document.documentElement).appendChild(s);
  }
  function ensure(){ if(lng()!=='sr'){ loadDict(run); } else if(D){ ap(); } }
  if(document.readyState==='loading')addEventListener('DOMContentLoaded',ensure);else ensure();
  addEventListener('storage',function(e){if(e.key==='mathia_lang')ensure();});
  window.addEventListener('mathia:lang',ensure);
  try{
    new MutationObserver(function(){ensure();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    var _dt;new MutationObserver(function(){ if(!D)return; clearTimeout(_dt);_dt=setTimeout(run,120); }).observe(document.body||document.documentElement,{childList:true,subtree:true});
  }catch(e){}
})();
;(function(){/*jezik-select-sync*/function sy(){try{var l=(localStorage.getItem("mathia_lang")||"sr").toLowerCase();var ss=document.querySelectorAll('select[aria-label="Jezik"]');for(var i=0;i<ss.length;i++)ss[i].value=l;}catch(e){}}if(document.readyState!=="loading")sy();else document.addEventListener("DOMContentLoaded",sy);window.addEventListener("mathia:lang",sy);window.addEventListener("storage",function(e){if(!e||e.key==="mathia_lang")sy();});})();
