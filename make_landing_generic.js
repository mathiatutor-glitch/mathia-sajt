const fs=require('fs');
const TPL=fs.readFileSync('template/predmet-merenja-nev.html','utf8');

function P(fn,x0,x1,st){let d='';for(let x=x0;x<=x1;x+=st){const y=fn(x);d+=(x===x0?'M':'L')+x.toFixed(1)+' '+y.toFixed(2)+' ';}return d.trim();}
const WAVES={
 bell:{card:P(x=>70-52*Math.exp(-Math.pow(x-130,2)/1100),6,254,2), hero:P(x=>100-72*Math.exp(-Math.pow(x-600,2)/24000),10,1190,6)},
 rc:  {card:P(x=>70-52*(1-Math.exp(-x/55)),6,254,2),               hero:P(x=>100-66*(1-Math.exp(-x/260)),10,1190,6)},
 damped:{card:P(x=>45-30*Math.exp(-x/150)*Math.sin(x/13),6,254,2),  hero:P(x=>100-46*Math.exp(-x/700)*Math.sin(x/60),10,1190,6)},
};

function build(cfg){
 let h=TPL;
 const W=WAVES[cfg.wave];
 const ILLU_CSS=`
  .sc-illu{margin:2px auto 16px;width:100%;max-width:300px}
  .sc-illu svg{display:block;width:100%;height:62px;overflow:visible}
  .sc-illu .axis{stroke:rgba(198,160,92,.35);stroke-width:1;stroke-dasharray:2 5}
  .sc-illu .wave{fill:none;stroke:url(#sgGold);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;
    stroke-dasharray:var(--len,1000);stroke-dashoffset:var(--len,1000);
    animation:scDraw 1.7s .2s cubic-bezier(.4,.6,.2,1) forwards, scGlow 3.8s 2.1s ease-in-out infinite}
  .sc-illu .probe{filter:drop-shadow(0 0 5px rgba(255,247,226,.9));opacity:.92}
  @keyframes scDraw{to{stroke-dashoffset:0}}
  @keyframes scGlow{0%,100%{filter:drop-shadow(0 1px 5px rgba(231,210,162,.4))}50%{filter:drop-shadow(0 1px 9px rgba(255,247,226,.85))}}
  .hero-wave{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);width:100%;height:auto;z-index:0;opacity:.15;pointer-events:none}
  .hero-wave path{fill:none;stroke:url(#hgold);stroke-width:2.4;stroke-linecap:round;stroke-dasharray:var(--len,5000);stroke-dashoffset:var(--len,5000);animation:hdraw 2.6s .35s ease forwards}
  @keyframes hdraw{to{stroke-dashoffset:0}}
  @media(prefers-reduced-motion:reduce){.sc-illu .wave,.hero-wave path{animation:none;stroke-dashoffset:0}.sc-illu .probe{display:none}}
`;
 const ILLU_SVG=`<div class="sc-illu" aria-hidden="true"><svg viewBox="0 0 260 90" preserveAspectRatio="none"><defs><linearGradient id="sgGold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9C7838"/><stop offset=".3" stop-color="#E7D2A2"/><stop offset=".5" stop-color="#FFF7E2"/><stop offset=".7" stop-color="#E7D2A2"/><stop offset="1" stop-color="#C6A05C"/></linearGradient></defs><line class="axis" x1="0" y1="45" x2="260" y2="45"/><path id="sgPath" class="wave" d="${W.card}"/><circle class="probe" r="3.2" fill="#FFF7E2" cx="0" cy="0"><animateMotion dur="3.6s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1" keyTimes="0;1"><mpath xlink:href="#sgPath" href="#sgPath"/></animateMotion></circle></svg></div>`;
 const HERO_SVG=`<svg class="hero-wave" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="hgold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9C7838"/><stop offset=".5" stop-color="#FFF7E2"/><stop offset="1" stop-color="#C6A05C"/></linearGradient></defs><path id="hwave" d="${W.hero}"/></svg>`;

 h=h.replace('</style>', ILLU_CSS+'\n</style>');
 h=h.replace('<div class="sc-emblem sym"><span>Aᵥ</span><span>Ω</span><span>Vₒ</span></div>',
   ILLU_SVG+'<div class="sc-emblem sym">'+cfg.glyphs.map(g=>'<span>'+g+'</span>').join('')+'</div>');
 h=h.replace('<div class="frame"></div>','<div class="frame"></div>'+HERO_SVG);
 h=h.replace('<script src="https://project-y23je.vercel.app/widget.js',
   '<script>(function(){document.querySelectorAll(".sc-illu .wave, .hero-wave path").forEach(function(p){try{p.style.setProperty("--len",p.getTotalLength());}catch(e){}});})();</script>\n<script src="https://project-y23je.vercel.app/widget.js');

 // HTML default (sr) zamene
 const R=[
  ['<title>Merenja neelektričnih veličina — Mathia</title>','<title>'+cfg.title+' — Mathia</title>'],
  ['data-i18n="eyb">Fakultet · Elektronika','data-i18n="eyb">'+cfg.eyb.sr],
  ['Merenja neelektričnih veličina — sigurno do <span class="gold-underline">položenog ispita</span>',
   cfg.h1.sr],
  ['<div class="sc-name" data-i18n="gname">Merenja neelektričnih veličina</div>',
   '<div class="sc-name" data-i18n="gname">'+cfg.gname.sr+'</div>'],
  ['data-mode="merenja-nev" data-name="Marina" data-subj="Merenja neelektričnih veličina"',
   'data-mode="'+cfg.mode+'" data-name="Marina" data-subj="'+cfg.gname.sr+'"'],
  ['data-hi="Zdravo! ❤️ Ja sam Marina, profesorica za predmet Merenja neelektričnih veličina. Spremamo ispit — pitaj, slikaj 📷 ili izdiktiraj 🎙️."',
   'data-hi="Zdravo! ❤️ Ja sam Marina, profesorica za predmet '+cfg.gname.sr+'. Spremamo ispit — pitaj, slikaj 📷 ili izdiktiraj 🎙️."'],
  ['<script defer src="gate.js" data-subject="merenja-nev"></script>',
   '<script defer src="gate.js" data-subject="'+cfg.mode+'"></script>'],
  // materijali -> knjige predmeta
  ['href="Merenja-NEV-Formule.html"><span class="ic">📘</span>','href="'+cfg.book.skripta+'"><span class="ic">📑</span>'],
  ['href="Merenja-NEV-Skripta.html"><span class="ic">📑</span>','href="'+cfg.book.formule+'"><span class="ic">📘</span>'],
  ['<h3 data-i18n="m1">E-priručnik</h3>','<h3 data-i18n="m1">Skripta</h3>'],
  ['<h3 data-i18n="m3">Skripta</h3>','<h3 data-i18n="m3">Formule</h3>'],
 ];
 // teme
 for(let i=0;i<8;i++){
  R.push(['data-i18n="tt'+i+'">'+cfg._oldtt[i]+'</h3>','data-i18n="tt'+i+'">'+cfg.tt[i].sr+'</h3>']);
  R.push(['data-i18n="td'+i+'">'+cfg._oldtd[i]+'</p>','data-i18n="td'+i+'">'+cfg.td[i].sr+'</p>']);
 }
 let miss=[];
 for(const [a,b] of R){ if(h.includes(a)) h=h.split(a).join(b); else miss.push(a.slice(0,30)); }

 // I18N (7 jezika)
 const NEW={};
 NEW.eyb=lang7(cfg.eyb); NEW.gname=lang7(cfg.gname); NEW.h1=lang7(cfg.h1);
 NEW.m1=lang7({en:'Lecture notes',de:'Skript',fr:'Notes de cours',es:'Apuntes',it:'Dispensa',ru:'Конспект',pt:'Apontamentos'});
 NEW.m3=lang7({en:'Formulas',de:'Formelsammlung',fr:'Formulaire',es:'Formulario',it:'Formulario',ru:'Сборник формул',pt:'Formulário'});
 for(let i=0;i<8;i++){ NEW['tt'+i]=lang7(cfg.tt[i]); NEW['td'+i]=lang7(cfg.td[i]); }
 let im=[];
 for(const k of Object.keys(NEW)){
  const re=new RegExp('"'+k+'":\\{[^{}]*\\}');
  if(re.test(h)) h=h.replace(re, JSON.stringify(k)+':'+JSON.stringify(NEW[k])); else im.push(k);
 }
 fs.writeFileSync(cfg.out,h);
 console.log(cfg.out, '| HTML miss:', miss.length, miss.join('|')||'-', '| i18n miss:', im.join(',')||'-', '| size:', h.length);
}
function lang7(o){const r={};for(const L of ['en','de','fr','es','it','ru','pt']) r[L]=(o[L]!=null?o[L]:o.sr);return r;}

module.exports={build};
