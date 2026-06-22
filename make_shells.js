const fs=require('fs');
const LANGS=[['en','EN'],['de','DE'],['fr','FR'],['es','ES'],['it','IT'],['ru','RU'],['pt','PT']];
const LAB={
 sub:{en:'Signals & systems',de:'Signale & Systeme',fr:'Signaux & systèmes',es:'Señales y sistemas',it:'Segnali e sistemi',ru:'Сигналы и системы',pt:'Sinais e sistemas'},
 skr:{en:'Lecture notes',de:'Skript',fr:'Notes de cours',es:'Apuntes',it:'Dispensa',ru:'Конспект',pt:'Apontamentos'},
 frm:{en:'Formula sheet',de:'Formelsammlung',fr:'Formulaire',es:'Formulario',it:'Formulario',ru:'Сборник формул',pt:'Formulário'},
};
const ml=m=>'<span class="t">'+LANGS.map(([c])=>'<span class="L L-'+c+'">'+m[c]+'</span>').join('')+'</span>';
// damped-sine putanja za masthead (viewBox 0..1200 x, baseline 30)
function wave(){let d='';for(let x=10;x<=1190;x+=6){const y=30-20*Math.exp(-x/650)*Math.sin(x/52);d+=(x===10?'M':'L')+x.toFixed(0)+' '+y.toFixed(1)+' ';}return d.trim();}
const WAVE=wave();
const corner='<g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M8 84 L8 30 C 8 18 18 8 30 8 L84 8"/><path d="M8 30 C 24 30 30 24 30 8"/></g><circle cx="30" cy="30" r="2" fill="currentColor"/>';

function shell(kind){
 const isF=kind==='Formule';
 const kindMap=isF?LAB.frm:LAB.skr;
 const pills=LANGS.map(([c,n])=>'<button class="lang'+(c==='en'?' on':'')+'" data-l="'+c+'" type="button">'+n+'</button>').join('');
 return `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sistemi i signali — ${isF?'Formule':'Skripta'} · Mathia</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Nunito:wght@400;500;600;700;800&family=Pinyon+Script&family=Tangerine:wght@700&family=Source+Serif+4:wght@500;600;700&display=swap" rel="stylesheet">
<style>
 :root{--paper:#FBF6EE;--paper2:#F5EADB;--blush:#F4E3DD;--rose:#CC8E86;--rose-dk:#B5746C;
  --plum:#432C37;--plum2:#5C3B49;--gold:#C6A05C;--golddk:#9C7838;--goldlt:#E7D2A2;--champ:#F7EAC9;
  --ink:#3E2D34;--muted:#90787E;--bord:#ECDAC5;--card:#fffcf6;--maxw:880px}
 *{box-sizing:border-box}
 body{margin:0;background:var(--paper);color:var(--ink);line-height:1.66;
  font-family:'Nunito',system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-size:18px}
 .disp{font-family:'Cormorant Garamond','Source Serif 4',Georgia,serif}
 h1,h2,h3{margin:0;line-height:1.14;font-weight:600}
 /* visejezicnost */
 .L{display:none}
 body[data-lang="en"] .L-en,body[data-lang="de"] .L-de,body[data-lang="fr"] .L-fr,
 body[data-lang="es"] .L-es,body[data-lang="it"] .L-it,body[data-lang="ru"] .L-ru,
 body[data-lang="pt"] .L-pt{display:inline}
 /* gold foil */
 @keyframes foil{to{background-position:-230% center}}
 @keyframes goldslide{to{background-position:-220% 0}}
 .goldtext{background:linear-gradient(100deg,#9C7838 0%,#E7D2A2 28%,#FFF7E2 47%,#E7D2A2 66%,#C6A05C 100%);
  background-size:230% auto;-webkit-background-clip:text;background-clip:text;color:transparent;
  -webkit-text-fill-color:transparent;animation:foil 7s linear infinite}
 /* traka gore + brand + jezici */
 header{position:relative;background:linear-gradient(180deg,#fff,rgba(255,255,255,0))}
 header:before{content:"";position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--goldlt),var(--gold),#FFF6D6,var(--gold),var(--goldlt),transparent);
  background-size:220% 100%;animation:goldslide 6.5s linear infinite}
 .bar{position:sticky;top:0;z-index:20;display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;
  justify-content:flex-end;padding:.55rem clamp(1rem,4vw,2rem);
  background:rgba(251,246,238,.86);backdrop-filter:blur(8px);border-bottom:1px solid var(--bord)}
 .bar .bmark{margin-right:auto;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:1.2rem;letter-spacing:.12em}
 .lang{background:transparent;border:1px solid var(--gold);color:var(--golddk);border-radius:100px;
  font-family:'Nunito';font-weight:800;font-size:.72rem;padding:5px 10px;cursor:pointer;transition:all .15s}
 .lang:hover{color:var(--plum)}
 .lang.on{background:var(--gold);color:#fff;border-color:var(--gold)}
 .lang:focus-visible{outline:2px solid var(--rose);outline-offset:2px}
 /* masthead */
 .hero{position:relative;overflow:hidden;padding:0}
 .hero .frame{position:absolute;inset:16px;border:1px solid rgba(198,160,92,.4);border-radius:18px;pointer-events:none;z-index:1}
 .hero .corner{position:absolute;width:52px;height:52px;color:var(--gold);opacity:.65;z-index:1}
 .hero .corner.tl{top:7px;left:7px}.hero .corner.tr{top:7px;right:7px;transform:rotate(90deg)}
 .hero .corner.br{bottom:7px;right:7px;transform:rotate(180deg)}.hero .corner.bl{bottom:7px;left:7px;transform:rotate(270deg)}
 .hero-math{position:absolute;inset:0;z-index:0;pointer-events:none;font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--gold);overflow:hidden}
 .hero-math span{position:absolute;font-size:clamp(2rem,5vw,3.2rem);opacity:.07;transform:rotate(-6deg)}
 .mast{position:relative;z-index:2;max-width:var(--maxw);margin:0 auto;padding:clamp(2.4rem,7vw,3.8rem) clamp(1.2rem,4vw,2rem) 1.4rem;text-align:center}
 .mast .slogan{font-family:'Pinyon Script',cursive;font-size:clamp(2.2rem,7vw,3.2rem);line-height:.9;color:var(--rose-dk);margin-bottom:.2rem}
 .mast .eyebrow{font-family:'Nunito';font-weight:800;font-size:.72rem;letter-spacing:.34em;text-transform:uppercase;color:var(--golddk);margin:.5rem 0 .7rem}
 .mast h1{font-family:'Cormorant Garamond','Source Serif 4',Georgia,serif;font-weight:600;color:var(--plum);
  font-size:clamp(2.5rem,8vw,4.1rem);letter-spacing:.005em}
 .mast .kind{margin-top:.55rem;font-family:'Nunito';font-weight:800;font-size:.82rem;letter-spacing:.16em;text-transform:uppercase;color:var(--rose-dk)}
 .mast .src{margin:.5rem auto 0;max-width:60ch;color:var(--muted);font-size:.92rem;font-style:italic;font-family:'Cormorant Garamond',serif}
 /* signal ilustracija u masthead-u */
 .sig{display:block;width:100%;max-width:680px;height:42px;margin:1.3rem auto .2rem;overflow:visible}
 .sig .axis{stroke:rgba(198,160,92,.3);stroke-width:1;stroke-dasharray:2 6}
 .sig .wave{fill:none;stroke:url(#gold);stroke-width:2.2;stroke-linecap:round;
  stroke-dasharray:var(--len,4000);stroke-dashoffset:var(--len,4000);
  animation:draw 1.9s .2s cubic-bezier(.4,.6,.2,1) forwards}
 .sig .probe{filter:drop-shadow(0 0 5px rgba(255,247,226,.9))}
 @keyframes draw{to{stroke-dashoffset:0}}
 /* sadrzaj */
 main{max-width:var(--maxw);margin:0 auto;padding:1.4rem clamp(1.2rem,4vw,2rem) 4rem}
 .topic,.ftopic{padding:2rem 0;border-top:1px solid var(--bord)}
 .topic:first-of-type,.ftopic:first-of-type{border-top:0}
 h2{font-family:'Cormorant Garamond','Source Serif 4',Georgia,serif;color:var(--plum);
  font-size:clamp(1.7rem,4.6vw,2.3rem);display:flex;gap:.55rem;align-items:baseline;margin-bottom:.7rem}
 h2 .num{font-family:'Nunito';font-weight:800;font-size:.82rem;color:#fff;background:linear-gradient(180deg,var(--goldlt),var(--gold));
  border-radius:100px;padding:.18em .6em;flex:none;transform:translateY(-.22em);box-shadow:0 8px 16px -8px rgba(198,160,92,.8)}
 .lead{color:#5a474d;margin:0 0 1.2rem;max-width:64ch}
 h3{font-family:'Nunito';font-weight:800;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--rose-dk);margin:0 0 .7rem}
 .zapamti h3{color:var(--golddk)}
 .zapamti ul,.flist{list-style:none;margin:0;padding:0;display:grid;gap:.6rem}
 .zapamti li,.flist li{background:var(--card);border:1px solid var(--bord);border-left:3px solid var(--gold);
  border-radius:12px;padding:.75rem 1rem;display:flex;flex-direction:column;gap:.35rem;
  box-shadow:0 18px 40px -34px rgba(120,70,80,.5)}
 .flist li{border-left-color:var(--rose)}
 .zl{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.06rem;color:var(--plum2)}
 .zf{overflow-x:auto;overflow-y:hidden}.zf .katex{font-size:1.05em;color:var(--ink)}
 .primer{margin-top:1.1rem;background:linear-gradient(160deg,#FFFDF8,var(--blush));
  border:1px solid rgba(204,142,134,.4);border-radius:16px;padding:1rem 1.2rem}
 .primer h3{color:var(--rose-dk)}
 .primer .zad{margin:0 0 .6rem;color:var(--plum2)}
 .koraci{margin:.2rem 0 0;padding-left:1.4rem;display:grid;gap:.4rem}
 .koraci li::marker{color:var(--rose);font-weight:700}
 .texerr{color:#b00020;font-family:monospace;font-size:.8rem}
 /* footer */
 footer{border-top:1px solid var(--bord);text-align:center;padding:2.2rem 1rem 3rem;background:linear-gradient(180deg,rgba(255,255,255,0),#fff)}
 footer .flove{font-family:'Pinyon Script',cursive;font-size:2rem;margin-bottom:.3rem}
 footer .sig-name{font-family:'Tangerine',cursive;font-weight:700;font-size:2.1rem;color:var(--golddk);transform:rotate(-3deg);display:inline-block}
 footer .meta{color:var(--muted);font-size:.8rem;margin-top:.6rem}
 @media(max-width:560px){body{font-size:17px}.hero .frame{inset:9px}.hero .corner{width:38px;height:38px}.zf .katex{font-size:1em}}
 @media(prefers-reduced-motion:reduce){.sig .wave{animation:none;stroke-dashoffset:0}.sig .probe{display:none}
  .goldtext,header:before{animation:none}}
</style>
</head>
<body data-lang="en">
<header>
 <div class="bar">
  <span class="bmark goldtext">MathIA</span>
  ${pills}
 </div>
 <section class="hero">
  <div class="frame"></div>
  <div class="hero-math" aria-hidden="true"><span style="top:12%;left:6%">δ(t)</span><span style="top:64%;left:10%">∿</span><span style="top:26%;left:34%">ℒ</span><span style="top:78%;left:30%">ω</span><span style="top:16%;left:62%">H(s)</span><span style="top:58%;left:66%">ℱ</span><span style="top:34%;left:86%">∫</span></div>
  <svg class="corner tl" viewBox="0 0 90 90" aria-hidden="true">${corner}</svg>
  <svg class="corner tr" viewBox="0 0 90 90" aria-hidden="true">${corner}</svg>
  <svg class="corner br" viewBox="0 0 90 90" aria-hidden="true">${corner}</svg>
  <svg class="corner bl" viewBox="0 0 90 90" aria-hidden="true">${corner}</svg>
  <div class="mast">
   <div class="slogan">Uz Marinu</div>
   <div class="eyebrow">${ml(LAB.sub)}</div>
   <h1>Sistemi i signali</h1>
   <div class="kind">${ml(kindMap)}</div>
   <svg class="sig" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
     <stop offset="0" stop-color="#9C7838"/><stop offset=".3" stop-color="#E7D2A2"/><stop offset=".5" stop-color="#FFF7E2"/><stop offset=".7" stop-color="#E7D2A2"/><stop offset="1" stop-color="#C6A05C"/>
    </linearGradient></defs>
    <line class="axis" x1="0" y1="30" x2="1200" y2="30"/>
    <path id="sgPath" class="wave" d="${WAVE}"/>
    <circle class="probe" r="3.4" fill="#FFF7E2" cx="0" cy="0"><animateMotion dur="4.2s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1" keyTimes="0;1"><mpath xlink:href="#sgPath" href="#sgPath"/></animateMotion></circle>
   </svg>
   <p class="src">Izvor: „Signali i sistemi" (Z. Trpovski, FTN) · Novak (FTN 2005), Dautović, Poularikas &amp; Seely</p>
  </div>
 </section>
</header>
<main>
<!--TOPICS-->
</main>
<footer>
 <div class="flove goldtext">Uči s ljubavlju</div>
 <div class="sig-name">dr Marina Bulat</div>
 <div class="meta">Sistemi i signali — ${isF?'Formule':'Skripta'} · MathIA · 7 jezika (EN·DE·FR·ES·IT·RU·PT)</div>
</footer>
<script>
(function(){var b=document.body,btns=[].slice.call(document.querySelectorAll('.lang'));
 function set(l){b.setAttribute('data-lang',l);btns.forEach(function(x){x.classList.toggle('on',x.dataset.l===l);x.setAttribute('aria-pressed',x.dataset.l===l);});
  try{if(location.hash.slice(1)!==l)history.replaceState(null,'','#'+l);}catch(e){}}
 btns.forEach(function(x){x.addEventListener('click',function(){set(x.dataset.l);});});
 var h=(location.hash||'').slice(1);set(/^(en|de|fr|es|it|ru|pt)$/.test(h)?h:'en');
 document.querySelectorAll('.sig .wave').forEach(function(p){try{p.style.setProperty('--len',p.getTotalLength());}catch(e){}});
})();
</script>
</body>
</html>`;
}
fs.writeFileSync('shells/Sistemi-Signali-Skripta.html',shell('Skripta'));
fs.writeFileSync('shells/Sistemi-Signali-Formule.html',shell('Formule'));
console.log('Novi (site-stil) shell-ovi:',fs.statSync('shells/Sistemi-Signali-Skripta.html').size,'+',fs.statSync('shells/Sistemi-Signali-Formule.html').size,'B');
