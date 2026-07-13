/* MATHIA — univerzalni jezički prekidač.
   Ako strana već ima svoj .lang / select[aria-label="Jezik"], ne dira ništa.
   Inače ubaci diskretan prekidač gore-desno i poveže ga sa i18n-mathia.js
   (localStorage 'mathia_lang' + event 'mathia:lang'). */
(function(){
  var LANGS=[["sr","SR"],["en","EN"],["de","DE"],["fr","FR"],["es","ES"],["it","IT"],["ru","RU"],["pt","PT"]];
  function cur(){try{return (localStorage.getItem('mathia_lang')||'sr').slice(0,2).toLowerCase();}catch(e){return 'sr';}}
  function setLang(l){
    l=(l||'sr').slice(0,2).toLowerCase();
    try{localStorage.setItem('mathia_lang',l);}catch(e){}
    try{document.documentElement.setAttribute('lang',l);}catch(e){}
    try{window.dispatchEvent(new Event('mathia:lang'));}catch(e){}
  }
  function hasSwitcher(){
    return document.querySelector('select.lang, select[aria-label="Jezik"], .lang select, [data-lang-switch]');
  }
  function build(){
    if(hasSwitcher()) { // samo sinhronizuj postojeći
      try{var ex=document.querySelector('select.lang, select[aria-label="Jezik"]'); if(ex) ex.value=cur();}catch(e){}
      return;
    }
    var s=document.createElement('select');
    s.className='lang'; s.setAttribute('aria-label','Jezik');
    s.style.cssText='position:fixed;top:14px;right:14px;z-index:9999;appearance:menulist;'+
      "font:700 14px 'Nunito',system-ui,Arial,sans-serif;padding:7px 12px;border-radius:999px;"+
      'background:#fff;border:2px solid #C6A05C;color:#432C37;cursor:pointer;'+
      'box-shadow:0 8px 22px rgba(67,44,55,.12)';
    for(var i=0;i<LANGS.length;i++){
      var o=document.createElement('option'); o.value=LANGS[i][0]; o.textContent=LANGS[i][1]; s.appendChild(o);
    }
    s.value=cur();
    s.addEventListener('change',function(){setLang(s.value);});
    document.body.appendChild(s);
  }
  if(document.readyState!=='loading') build();
  else document.addEventListener('DOMContentLoaded',build);
  window.addEventListener('mathia:lang',function(){try{var ex=document.querySelector('select.lang, select[aria-label="Jezik"]'); if(ex) ex.value=cur();}catch(e){}});
})();
