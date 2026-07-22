/*! mathia-guard.js — zaštita sadržaja + pristup (trial 15 min / pretplata) za MathIA
 * ─────────────────────────────────────────────────────────────────────────────
 * UBACIVANJE: jednom linijom na SVAKU stranicu, u <head>:
 *     <script src="mathia-guard.js?v=2" defer></script>
 *
 * ⚠️ POŠTENO O GRANICAMA — PROČITATI:
 *   Ovo je KLIJENTSKI (browser) prototip pristupa. Verno prikazuje tok, ALI:
 *   • SMS kod NE može da se šalje/proverava iz browsera — to mora backend + SMS provajder.
 *   • „Jedan trial po telefonu" se u browseru zaobilazi (obriši podatke / incognito / drugi uređaj).
 *   • Pravo zaključavanje i naplata moraju na server: tek po proveri pretplate isporučiti sadržaj.
 *   Dok backend ne postoji, ovo NIJE sigurnosna brava — to je maketa toka spremna za povezivanje.
 *
 *   GLAVNI PREKIDAČ: CFG.ACCESS_ON = false (difolt) → sajt radi normalno (samo anti-kopiranje).
 *   Kad backend (SMS + naplata) proradi → stavi ACCESS_ON = true i poveži hooks (dole označeni).
 * ───────────────────────────────────────────────────────────────────────────── */
(function(){try{var q=new URLSearchParams(location.search);var k=q.get("pristup");if(localStorage.getItem("mathia_access")==="full")return;}catch(e){}
  "use strict";

  /* ───────── PODEŠAVANJA ───────── */
  var CFG = {
    ACCESS_ON: false,          // ⬅ GLAVNI PREKIDAČ pristupnog sistema (uključi kad backend radi)
    protect: true,             // anti-kopiranje / anti-skidanje (deterent)
    freeMinutes: 15,           // trajanje besplatnog pristupa
    packagesUrl: "index.html#paketi",
    // Strane koje se UVEK vide (browse), čak i bez prijave — ali zaključane vode u gejt:
    openPages: ["", "index.html", "o-marini.html", "predmeti.html", "prodavnica.html",
                "uslovi.html", "privatnost.html", "kontakt.html"],
    // Katalog predmeta za izbor u paketu (key = osnova imena fajla). Slobodno dopuni/izmeni:
    catalog: [
      ["elektricna-merenja","Električna merenja"], ["merenja-nev","Merenja neelektričnih veličina"],
      ["labview","LabVIEW"], ["pspice","PSpice"], ["ltspice","LTSpice"],
      ["nacrtna-geometrija-1","Nacrtna geometrija 1"], ["nacrtna-geometrija-2","Nacrtna geometrija 2"],
      ["arhitektura-racunara","Arhitektura računara"], ["algebra","Algebra"], ["analiza1","Analiza 1"],
      ["analiza2","Analiza 2"], ["linearna-algebra","Linearna algebra"], ["verovatnoca","Verovatnoća"],
      ["fizika-mehanika","Mehanika"], ["uvod-u-elektroniku","Uvod u elektroniku"]
    ],
    tiers: { basic:{name:"BASIC",n:1,price:"4.990"}, gold:{name:"GOLD",n:2,price:"6.990"}, diamond:{name:"DIAMOND",n:3,price:"9.990"} }
  };
  try { if (window.MathiaGuard) for (var k in window.MathiaGuard) CFG[k] = window.MathiaGuard[k]; } catch (e) {}

  var GOLD="#C6A05C", GOLDLT="#E7D2A2", PLUM="#3A2330", PLUM2="#5C3B49", CREAM="#FBF6EE";
  function ready(fn){ if(document.readyState!=="loading") fn(); else document.addEventListener("DOMContentLoaded",fn); }
  function inField(t){ try{return !!(t&&t.closest&&t.closest('input,textarea,[contenteditable="true"],#zoi-panel,#zoi-ta'));}catch(e){return false;} }

  /* ───────── ZAŠTITA SADRŽAJA ───────── */
  function applyProtect(){
    var css='*{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-touch-callout:none}'+
      'input,textarea,[contenteditable="true"],#zoi-panel,#zoi-panel *,.mg-ov,.mg-ov *{-webkit-user-select:text!important;user-select:text!important}'+
      'img,svg,canvas{-webkit-user-drag:none;user-drag:none}@media print{html,body{display:none!important}}';
    var st=document.createElement("style"); st.textContent=css; (document.head||document.documentElement).appendChild(st);
    document.addEventListener("contextmenu",function(e){ if(!inField(e.target)) e.preventDefault(); });
    document.addEventListener("dragstart",function(e){ var n=e.target&&e.target.nodeName; if(n==="IMG"||n==="A") e.preventDefault(); });
    ["copy","cut"].forEach(function(ev){ document.addEventListener(ev,function(e){ if(!inField(e.target)) e.preventDefault(); }); });
    document.addEventListener("keydown",function(e){ var k=(e.key||"").toLowerCase();
      if(k==="f12"){e.preventDefault();return;}
      if((e.ctrlKey||e.metaKey)&&!e.altKey&&(k==="s"||k==="u"||k==="p")){e.preventDefault();return;}
      if((e.ctrlKey||e.metaKey)&&e.shiftKey&&(k==="i"||k==="j"||k==="c"||k==="k")) e.preventDefault();
    });
  }

  /* ───────── STANJE PRISTUPA (localStorage) ───────── */
  function load(){ try{return JSON.parse(localStorage.getItem("mathia_acc")||"{}");}catch(e){return {};} }
  function save(s){ try{localStorage.setItem("mathia_acc",JSON.stringify(s));}catch(e){} }
  function page(){ return (location.pathname.split("/").pop()||"").toLowerCase(); }
  function isOpen(){ return CFG.openPages.map(function(x){return x.toLowerCase();}).indexOf(page())!==-1; }
  function subjectOfPage(){
    var p=page().replace(/\.html$/,"");
    if(p.indexOf("merenja-nev")!==-1) return "merenja-nev";
    if(p.indexOf("elektricna-merenja")!==-1) return "elektricna-merenja";
    return p.replace(/^(predmet|skripta|klon)-/,"");
  }
  function trialActive(s){ return s.status==="trial" && (Date.now()-s.trialStart) < CFG.freeMinutes*60000; }
  function trialExpired(s){ return s.status==="trial" && (Date.now()-s.trialStart) >= CFG.freeMinutes*60000; }
  function hasSub(s){ return s.status==="sub" && s.subjects && s.subjects.indexOf(subjectOfPage())!==-1; }

  /* ───────── UI: overlay osnova ───────── */
  function overlay(id){
    var old=document.getElementById(id); if(old) old.remove();
    var o=document.createElement("div"); o.id=id; o.className="mg-ov";
    o.style.cssText="position:fixed;inset:0;z-index:2147483600;background:linear-gradient(160deg,"+PLUM2+","+PLUM+");"+
      "display:flex;align-items:center;justify-content:center;padding:22px;font-family:'Nunito',system-ui,sans-serif;color:"+CREAM+";overflow:auto";
    document.body.appendChild(o); try{document.body.style.overflow="hidden";}catch(e){}
    return o;
  }
  function box(html,w){ return '<div style="max-width:'+(w||440)+'px;width:100%;background:#fffdf8;color:#3E2D34;border:1.5px solid '+GOLD+';border-radius:20px;padding:26px 24px;box-shadow:0 30px 70px -30px rgba(0,0,0,.6)">'+html+'</div>'; }
  function h(t){ return '<div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:1.7rem;color:'+PLUM+';margin:0 0 6px">'+t+'</div>'; }
  function goldBtn(txt){ return 'style="display:block;width:100%;margin-top:14px;border:none;cursor:pointer;font-family:inherit;font-weight:800;font-size:1rem;padding:13px;border-radius:100px;background:linear-gradient(180deg,'+GOLDLT+','+GOLD+');color:#4a3812"'; }
  function ghostBtn(){ return 'style="display:block;width:100%;margin-top:10px;cursor:pointer;font-family:inherit;font-weight:700;font-size:.92rem;padding:11px;border-radius:100px;background:transparent;border:1.5px solid '+GOLD+';color:'+PLUM+'"'; }
  function note(t){ return '<div style="margin-top:12px;font-size:.74rem;color:#9a8088;line-height:1.45">'+t+'</div>'; }
  function field(ph,id,type){ return '<input id="'+id+'" type="'+(type||"text")+'" placeholder="'+ph+'" style="width:100%;margin-top:10px;padding:12px 14px;border:1.5px solid #E7DBC4;border-radius:12px;font-family:inherit;font-size:1rem;background:#fff;color:#3E2D34">'; }

  /* ───────── TRIAL: SMS (SIMULACIJA) ───────── */
  function showTrial(){
    var o=overlay("mg-trial");
    o.innerHTML=box(
      h("Započni besplatno")+
      '<p style="margin:0;color:#6a5a62;font-size:.95rem">Unesi broj telefona — poslaćemo ti kod za prijavu. Prvih '+CFG.freeMinutes+' minuta je sve otključano.</p>'+
      field("Broj telefona (npr. 06x xxx xxxx)","mg-phone","tel")+
      '<button id="mg-send" '+goldBtn("Pošalji kod")+'>Pošalji kod</button>'+
      '<div id="mg-step2" style="display:none">'+
        field("Unesi SMS kod","mg-code","text")+
        '<button id="mg-verify" '+goldBtn("Potvrdi i počni")+'>Potvrdi i počni</button>'+
      '</div>'+
      '<button id="mg-cancel" '+ghostBtn()+'>Otkaži</button>'+
      note("⚠️ SIMULACIJA: pravi SMS i provera kodova rade tek kad se poveže backend (SMS provajder). Za demo, unesi bilo koji kod.")
    );
    document.getElementById("mg-cancel").onclick=close;
    document.getElementById("mg-send").onclick=function(){
      var ph=(document.getElementById("mg-phone").value||"").trim();
      if(ph.length<6){ alert("Unesi ispravan broj telefona."); return; }
      // ▼▼▼ BACKEND HOOK: ovde pozvati server da pošalje pravi SMS na 'ph' ▼▼▼
      document.getElementById("mg-step2").style.display="block";
      this.textContent="Kod poslat (demo) — pošalji ponovo";
    };
    document.getElementById("mg-verify").onclick=function(){
      var code=(document.getElementById("mg-code").value||"").trim();
      if(code.length<3){ alert("Unesi kod iz SMS-a."); return; }
      // ▼▼▼ BACKEND HOOK: server proverava kod i da li je telefon već trošio trial ▼▼▼
      save({status:"trial", trialStart:Date.now()});
      location.href="index.html";
    };
  }

  /* ───────── PRETPLATA: paketi + izbor predmeta (SIMULACIJA) ───────── */
  function tierCard(key){
    var t=CFG.tiers[key];
    return '<button class="mg-tier" data-tier="'+key+'" style="text-align:left;cursor:pointer;background:#fff;border:1.5px solid #E7DBC4;border-radius:14px;padding:12px 14px;font-family:inherit;color:#3E2D34">'+
      '<div style="font-family:\'Cormorant Garamond\',serif;font-weight:700;color:'+PLUM+';font-size:1.2rem">'+t.name+'</div>'+
      '<div style="font-size:.86rem;color:#6a5a62">'+t.n+' '+(t.n===1?"predmet":"predmeta")+' · '+t.price+' RSD/mes</div></button>';
  }
  function showSubscribe(preTier){
    var o=overlay("mg-sub");
    o.innerHTML=box(
      h("Pretplata")+
      '<p style="margin:0 0 12px;color:#6a5a62;font-size:.95rem">Izaberi paket, pa predmete koje želiš da otključaš.</p>'+
      '<div style="display:grid;gap:8px">'+tierCard("basic")+tierCard("gold")+tierCard("diamond")+'</div>'+
      '<div id="mg-pick" style="display:none;margin-top:14px"></div>'+
      '<a href="'+CFG.packagesUrl+'" '+ghostBtn()+'>Vidi pune pakete na naslovnoj →</a>'+
      '<button id="mg-cancel2" '+ghostBtn()+'>Otkaži</button>'+
      note("⚠️ SIMULACIJA: stvarna naplata se vezuje na backend/platni servis. Ovde se izbor pamti samo u ovom pretraživaču.")
      ,520);
    document.getElementById("mg-cancel2").onclick=close;
    Array.prototype.forEach.call(o.querySelectorAll(".mg-tier"),function(b){
      b.onclick=function(){ renderPick(b.getAttribute("data-tier")); };
    });
    if(preTier && CFG.tiers[preTier]) renderPick(preTier);

    function renderPick(tier){
      var n=CFG.tiers[tier].n, pick=document.getElementById("mg-pick");
      var opts=CFG.catalog.map(function(c){
        return '<label style="display:flex;gap:8px;align-items:center;padding:7px 0;font-size:.92rem;color:#3E2D34">'+
          '<input type="checkbox" class="mg-sj" value="'+c[0]+'"> '+c[1]+'</label>';
      }).join("");
      pick.innerHTML='<div style="font-weight:800;color:'+PLUM+';margin-bottom:4px">'+CFG.tiers[tier].name+' — izaberi do '+n+' '+(n===1?"predmet":"predmeta")+':</div>'+
        '<div style="max-height:200px;overflow:auto;border:1px solid #E7DBC4;border-radius:12px;padding:6px 12px">'+opts+'</div>'+
        '<button id="mg-confirm" '+goldBtn("Potvrdi pretplatu")+'>Potvrdi pretplatu</button>';
      pick.style.display="block";
      var boxes=pick.querySelectorAll(".mg-sj");
      Array.prototype.forEach.call(boxes,function(cb){ cb.onchange=function(){
        var checked=pick.querySelectorAll(".mg-sj:checked");
        if(checked.length>n){ cb.checked=false; alert(CFG.tiers[tier].name+" dozvoljava najviše "+n+" predmeta."); }
      };});
      document.getElementById("mg-confirm").onclick=function(){
        var sel=[]; Array.prototype.forEach.call(pick.querySelectorAll(".mg-sj:checked"),function(c){sel.push(c.value);});
        if(!sel.length){ alert("Izaberi bar jedan predmet."); return; }
        // ▼▼▼ BACKEND HOOK: ovde ide stvarna naplata; server posle uspeha čuva entitlements ▼▼▼
        save({status:"sub", tier:tier, subjects:sel});
        location.href="index.html";
      };
    }
  }

  /* ───────── ZAKLJUČANO / ISTEKLO ───────── */
  function showLock(){
    var o=overlay("mg-lock");
    o.innerHTML=box(
      h("Sadržaj je zaključan")+
      '<p style="margin:0;color:#6a5a62;font-size:.95rem">Da bi otvorio predmete, skripte, formule i klonove — probaj besplatno 15 minuta ili se pretplati na predmete koje želiš.</p>'+
      '<button id="mg-t" '+goldBtn("Probaj 15 min besplatno")+'>Probaj 15 min besplatno</button>'+
      '<button id="mg-s" '+ghostBtn()+'>Pretplati se</button>'+
      '<a href="index.html" '+ghostBtn()+'>Nazad na početnu</a>'
    );
    document.getElementById("mg-t").onclick=showTrial;
    document.getElementById("mg-s").onclick=function(){ showSubscribe(); };
  }
  function showExpired(){
    var o=overlay("mg-exp");
    o.innerHTML=box(
      h("Isteklo je "+CFG.freeMinutes+" besplatnih minuta")+
      '<p style="margin:0;color:#6a5a62;font-size:.95rem">Hvala što si probao MathIA uz Profesoricu. Za nastavak izaberi paket i predmete.</p>'+
      '<button id="mg-s2" '+goldBtn("Pretplati se")+'>Pretplati se</button>'+
      note("Besplatni period se računa po uređaju. Pravilo jedan-trial-po-telefonu radi tek uz backend.")
    );
    document.getElementById("mg-s2").onclick=function(){ showSubscribe(); };
  }
  function close(){ var o=document.querySelector(".mg-ov"); if(o)o.remove(); try{document.body.style.overflow="";}catch(e){} }

  function banner(s){
    var b=document.createElement("div");
    b.style.cssText="position:fixed;top:0;left:0;right:0;z-index:2147483500;background:linear-gradient(90deg,"+GOLD+","+GOLDLT+");color:#4a3812;text-align:center;font:700 13px 'Nunito',sans-serif;padding:6px 10px";
    function tick(){ var left=CFG.freeMinutes*60000-(Date.now()-s.trialStart); if(left<=0){ b.remove(); lockAll(); return; }
      var m=Math.floor(left/60000), ss=Math.floor((left%60000)/1000); b.textContent="Besplatni pristup: "+m+":"+(ss<10?"0":"")+ss+" — uživaj 💛"; }
    document.body.appendChild(b); tick(); setInterval(tick,1000);
  }
  function lockAll(){ showExpired(); }

  /* ───────── INTERCEPT klikova (besplatno / paketi / zaključani linkovi) ───────── */
  function wireClicks(){
    document.addEventListener("click",function(e){
      var a=e.target.closest&&e.target.closest("a,button"); if(!a) return;
      var txt=(a.textContent||"").toLowerCase(), href=(a.getAttribute("href")||"");
      if(txt.indexOf("započni besplatno")!==-1 || txt.indexOf("probaj 15 min")!==-1 || txt.indexOf("započni free")!==-1){
        e.preventDefault(); showTrial(); return;
      }
      var m=txt.match(/izaberi\s+(basic|gold|diamond)/);
      if(m){ e.preventDefault(); showSubscribe(m[1]); return; }
      // zaključani linkovi sa otvorene strane (npr. predmeti.html)
      if(href && /\.html(\?|#|$)/.test(href)){
        var f=href.split("/").pop().toLowerCase().replace(/[?#].*$/,"");
        if(f && CFG.openPages.indexOf(f)===-1){
          var s=load();
          var allowed = trialActive(s) || (s.status==="sub" && s.subjects && s.subjects.indexOf(
              f.replace(/\.html$/,"").replace(/^(predmet|skripta|klon)-/,"").replace(/.*merenja-nev.*/,"merenja-nev").replace(/.*elektricna-merenja.*/,"elektricna-merenja")
            )!==-1);
          if(!allowed){ e.preventDefault(); if(trialExpired(s)) showExpired(); else showLock(); }
        }
      }
    },true);
  }

  /* ───────── GLAVNA LOGIKA ───────── */
  function run(){
    var s=load();
    if(trialExpired(s)){ showExpired(); return; }        // isteklo → nigde pristup, samo pretplata
    if(trialActive(s)){ banner(s); return; }              // trial → sve otključano
    if(isOpen()) return;                                  // browse strane su uvek vidljive
    if(hasSub(s)) return;                                 // pretplaćen na ovaj predmet → ok
    showLock();                                           // zaključana strana bez prava
  }

  if (CFG.protect) applyProtect();
  ready(function(){
    if(!CFG.ACCESS_ON) return;   // prekidač isključen → samo zaštita, sajt radi normalno
    wireClicks();
    run();
  });

  /* ───────── BACKEND / TEST ─────────
   *  Reset (test):   localStorage.removeItem("mathia_acc")
   *  Ručno trial:    localStorage.setItem("mathia_acc", JSON.stringify({status:"trial",trialStart:Date.now()}))
   *  Ručno sub:      localStorage.setItem("mathia_acc", JSON.stringify({status:"sub",tier:"gold",subjects:["labview","pspice"]}))
   *  Kad backend proradi: posle prave SMS/naplate server postavlja isto ovo stanje (ili sopstveni token),
   *  a CFG.ACCESS_ON = true. Sve hook tačke su označene sa „BACKEND HOOK".
   * ──────────────────────────────────────────────────────────────────────────── */
})();
