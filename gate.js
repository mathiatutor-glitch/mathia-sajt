/* ================================================================
   Mathia — gate.js  (pristup: vlasnik / pretplata / proba)
   Drop-in: <script defer src="gate.js" data-subject="<predmet>"></script>

   Ponašanje:
   • Vlasnik (OWNER_EMAILS)  → pun pristup, bez ograničenja.
   • Pretplaćen na predmet   → pun pristup; na SKRIPTAMA materijal je
                               zaštićen od preuzimanja (bez desnog klika,
                               kopiranja, štampanja).
   • Proba (nije plaćeno):
       – Obične stranice/klon → besplatno FREE_MIN minuta (badge → katanac).
       – SKRIPTE (-Formule)   → vidi se SAMO prva lekcija (pogled),
                                 ostalo zamućeno + "pretplati se".
                                 Materijal se ne može skinuti.
   ================================================================ */
(function () {
/* ——— PREVODI (gate vide i posetioci na drugim jezicima) ——— */
var GT = {
  noprint:{sr:"Štampanje i čuvanje materijala nije dozvoljeno — MathIA",en:"Printing and saving the material is not allowed — MathIA",de:"Drucken und Speichern des Materials ist nicht erlaubt — MathIA",fr:"L'impression et l'enregistrement du support ne sont pas autorisés — MathIA",es:"No se permite imprimir ni guardar el material — MathIA",it:"Non è consentito stampare o salvare il materiale — MathIA",ru:"Печать и сохранение материала запрещены — MathIA",pt:"Não é permitido imprimir nem guardar o material — MathIA"},
  free:{sr:"Besplatno još ",en:"Free for another ",de:"Noch kostenlos ",fr:"Encore gratuit ",es:"Gratis aún ",it:"Ancora gratis ",ru:"Бесплатно ещё ",pt:"Ainda grátis "},
  haveSub:{sr:"Već imaš pretplatu?",en:"Already subscribed?",de:"Schon ein Abo?",fr:"Déjà abonné ?",es:"¿Ya tienes suscripción?",it:"Hai già l'abbonamento?",ru:"Уже есть подписка?",pt:"Já tens subscrição?"},
  unlockT:{sr:"Otključaj ceo materijal",en:"Unlock the full material",de:"Das ganze Material freischalten",fr:"Débloque tout le support",es:"Desbloquea todo el material",it:"Sblocca tutto il materiale",ru:"Открой весь материал",pt:"Desbloqueia todo o material"},
  unlockS:{sr:"Pretplati se da otvoriš celu skriptu, formule i zadatke — uz Profesoricu.",en:"Subscribe to open the whole notes, formulas and problems — with Profesorica.",de:"Abonniere, um das ganze Skript, die Formeln und Aufgaben zu öffnen — mit Profesorica.",fr:"Abonne-toi pour ouvrir tout le cours, les formules et les exercices — avec Profesorica.",es:"Suscríbete para abrir todos los apuntes, fórmulas y ejercicios — con Profesorica.",it:"Abbonati per aprire tutta la dispensa, le formule e gli esercizi — con Profesorica.",ru:"Оформи подписку, чтобы открыть весь конспект, формулы и задачи — с Profesorica.",pt:"Subscreve para abrir todos os apontamentos, fórmulas e exercícios — com a Profesorica."},
  previewT:{sr:"Ovo je pogled na skriptu",en:"This is a preview of the notes",de:"Das ist eine Vorschau des Skripts",fr:"Ceci est un aperçu du cours",es:"Esta es una vista previa de los apuntes",it:"Questa è un'anteprima della dispensa",ru:"Это предварительный просмотр конспекта",pt:"Esta é uma pré-visualização dos apontamentos"},
  previewS:{sr:"Prvu lekciju vidiš besplatno. Pretplati se da otključaš ceo materijal — sve formule, primere i Marinu.",en:"The first lesson is free. Subscribe to unlock the whole material — all formulas, examples and Marina.",de:"Die erste Lektion ist kostenlos. Abonniere, um das ganze Material freizuschalten — alle Formeln, Beispiele und Marina.",fr:"La première leçon est gratuite. Abonne-toi pour débloquer tout le support — toutes les formules, les exemples et Marina.",es:"La primera lección es gratis. Suscríbete para desbloquear todo el material — todas las fórmulas, ejemplos y Marina.",it:"La prima lezione è gratis. Abbonati per sbloccare tutto il materiale — tutte le formule, gli esempi e Marina.",ru:"Первый урок бесплатно. Оформи подписку, чтобы открыть весь материал — все формулы, примеры и Марину.",pt:"A primeira lição é grátis. Subscreve para desbloquear todo o material — todas as fórmulas, exemplos e a Marina."},
  overT:{sr:"Besplatnih 15 minuta je isteklo",en:"Your free 15 minutes are over",de:"Deine kostenlosen 15 Minuten sind vorbei",fr:"Tes 15 minutes gratuites sont écoulées",es:"Tus 15 minutos gratis han terminado",it:"I tuoi 15 minuti gratis sono finiti",ru:"Бесплатные 15 минут закончились",pt:"Os teus 15 minutos grátis terminaram"},
  overS:{sr:"Izaberi paket da nastaviš s ovim predmetom — knjige, skripte, Marina i test sklonosti.",en:"Choose a plan to continue with this subject — books, notes, Marina and the aptitude test.",de:"Wähle ein Paket, um mit diesem Fach weiterzumachen — Bücher, Skripte, Marina und der Eignungstest.",fr:"Choisis une formule pour continuer cette matière — livres, cours, Marina et le test d'orientation.",es:"Elige un plan para continuar con esta asignatura — libros, apuntes, Marina y el test de aptitudes.",it:"Scegli un piano per continuare con questa materia — libri, dispense, Marina e il test attitudinale.",ru:"Выбери тариф, чтобы продолжить этот предмет — книги, конспекты, Марина и тест склонностей.",pt:"Escolhe um plano para continuares com esta disciplina — livros, apontamentos, Marina e o teste de aptidão."}
};
function GLANG(){ try{ var l=(localStorage.getItem("mathia_lang")||"sr").slice(0,2).toLowerCase(); return GT.free[l]?l:"sr"; }catch(e){ return "sr"; } }
function T(k){ var l=GLANG(); return (GT[k] && (GT[k][l]||GT[k].sr)) || ""; }

  "use strict";

  /* ====== CONFIG ====== */
  var SUPABASE_URL  = "https://ibhirxltgeyecrjwymai.supabase.co";
  var SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaGlyeGx0Z2V5ZWNyand5bWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MTYzMzgsImV4cCI6MjA5NzQ5MjMzOH0.nE3xYc5JuUpPETrGP8oEiFWlZnhhuYhxY-XFDBtARXk";
  var OWNER_EMAILS  = ["mathia.tutor@gmail.com","marina.bulat@gmail.com"];  // vlasnik — bez ograničenja
  var FREE_MIN      = 15;                                 // besplatno minuta (obične stranice)
  var PAY_URL       = "registracija.html";   // bira predmete pa vodi na karticu
  var LOGIN_URL     = "nalog.html";
  var PLANS = [
    { id:"basic",   naziv:"Basic",   din:4990, predmeta:1 },
    { id:"gold",    naziv:"Gold",    din:6990, predmeta:2 },
    { id:"diamond", naziv:"Diamond", din:9990, predmeta:3 }
  ];
  /* ==================== */

  /* ALIASES — MORA da odgovara mapi u api/chat.js (jedan izvor istine).
     Bez ovoga strana zakljuca pretplatnika kome je kupovina upisala
     drugi oblik kljuca (npr. kupi "verovatnoca", strana trazi "fax-verovatnoca"). */
  var ALIASES = { matura: "mala-matura", ftn: "prijemni-matematika", "prijemni-ftn": "prijemni-matematika", prijemni: "prijemni-matematika", naslovna: "site", home: "site", analiza1: "fax-analiza1", analiza2: "fax-analiza2", "diskretna-matematika": "fax-diskretna", "kompleksna-analiza": "fax-kompleksna", "linearna-algebra": "fax-linearna", "fax-merenja": "elektricna-merenja", "merenja-nev": "elektricna-merenja", algoritmi: "prog-algoritmi", arduino: "prog-arduino", cpp: "prog-cpp", csharp: "prog-csharp", cadence: "el-cadence", "osn-fiz-6": "os-fiz-6", "osn-fiz-7": "os-fiz-7", "osn-fiz-8": "os-fiz-8", js: "prog-js", java: "prog-java", kicad: "el-kicad", kotlin: "prog-kotlin", ltspice: "el-ltspice", matlab: "prog-matlab", "osn-mat-5": "os-mat-5", "osn-mat-6": "os-mat-6", "osn-mat-7": "os-mat-7", "osn-mat-8": "os-mat-8", mehanika: "fax-mehanika", operaciona: "fax-operaciona", pascal: "prog-pascal", python: "prog-python", r: "prog-r", sql: "fax-bazepodataka", "prog-sql": "fax-bazepodataka", scratch: "prog-scratch", elektrotehnika: "fax-kola", "uvod-u-elektroniku": "fax-elektronika", web: "prog-web", verovatnoca: "fax-verovatnoca", matematika: "trigonometrija", "priprema-fakultet": "prijemni-matematika", "priprema-srednja": "mala-matura", "priprema-visa": "prijemni-visa", "prijemni-visa-ns": "prijemni-visa", "osnovi-elektrotehnike-1": "osnovi-elektrotehnike", "osnovi-elektrotehnike-2": "osnovi-elektrotehnike", "elektricne-masine-1": "elektricne-masine", "elektricne-masine-2": "elektricne-masine", "elektricne-masine-3": "elektricne-masine", "baze-podataka": "fax-bazepodataka", "baze-podataka-1": "fax-bazepodataka", "baze-podataka-2": "fax-bazepodataka", "fax-fizika1": "sr-fiz-1", "fax-fizika2": "sr-fiz-2", "fax-fizika3": "sr-fiz-3", "fax-fizika4": "sr-fiz-4", "fax-fizika6": "os-fiz-6", "fax-fizika7": "os-fiz-7", "fax-fizika8": "os-fiz-8", "fax-matematika1": "sr-mat-1", "fax-matematika2": "sr-mat-2", "fax-matematika3": "sr-mat-3", "fax-matematika4": "sr-mat-4", "fax-matematika5": "os-mat-5", "fax-matematika6": "os-mat-6", "fax-matematika7": "os-mat-7", "fax-matematika8": "os-mat-8", "fax-python": "prog-python", "fax-cpp": "prog-cpp", "fax-csharp": "prog-csharp", "fax-java": "prog-java", "fax-js": "prog-js", "fax-ts": "prog-ts", "fax-kotlin": "prog-kotlin", "fax-swift": "prog-swift", "fax-go": "prog-go", "fax-php": "prog-php", "fax-c": "prog-c", "fax-pascal": "prog-pascal", "fax-r": "prog-r", "fax-sql": "prog-sql", "fax-web": "prog-web", "fax-algoritmi": "prog-algoritmi", "fax-matlab": "prog-matlab", "fax-scratch": "prog-scratch", "fax-arduino": "prog-arduino", "fax-oop": "prog-cpp", "fax-webprogramir": "prog-web", "fax-elektricnema": "elektricne-masine", "fax-osnovielektr": "osnovi-elektrotehnike", "fax-elektroenerg": "elektroenergetski-pretvaraci", "fax-elektromagne": "elektromagnetika", "fax-energetskael": "energetska-elektronika-1", "fax-sistemisigna": "sistemi-signali", "fax-merenjanev": "merenja-nev", "fax-eds": "elektrodistributivni-sistemi", "fax-labview": "labview", "fax-ltspice": "el-ltspice", "fax-pspice": "pspice", "fax-ftn": "prijemni-matematika", "fax-pripremasred": "mala-matura", "fax-pripremavisa": "prijemni-visa", "fax-visans": "prijemni-visa", "arhitektura-racunara": "fax-arhitekturar", "arhitektura": "fax-arhitekturar", "arhitektura-racunara-1": "fax-arhitekturar", "arhitektura-racunara-2": "fax-arhitekturar", "fax-arhitektura": "fax-arhitekturar", "fax-arhitekturara": "fax-arhitekturar", "racunarska-arhitektura": "fax-arhitekturar" };
  function rez(k){ k=String(k||"").trim(); return ALIASES[k] || k; }
  function kljucevi(str){ return String(str||"").split(",").map(function(x){return rez(x);}).filter(Boolean); }

  var me = document.currentScript;
  if (!me) { var ss = document.querySelectorAll('script[data-subject]'); me = ss[ss.length - 1]; }
  var SUBJECT = (me && me.getAttribute("data-subject")) || "";
  var ANYSUB = !!(me && me.getAttribute("data-anysub") === "1"); // bilo koja aktivna pretplata otključava (kvizovi)
  var FREE_MS = FREE_MIN * 60 * 1000;
  var KEY = "mathia_free_" + SUBJECT;

  function isScriptPage() {
    if (me && me.getAttribute("data-skripta") === "1") return true;
    if (/Formule/i.test(location.pathname)) return true;
    return !!document.querySelector(".cover, section.topic");
  }

  function loadSb(cb) {
    if (window.supabase) return cb();
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.onload = cb; s.onerror = function () { cb(); };
    document.head.appendChild(s);
  }
  function fmt(n){ return n.toLocaleString("sr-RS"); }

  function freeMsLeft() {
    var t = null;
    try { t = localStorage.getItem(KEY); } catch (e) {}
    var now = Date.now();
    if (!t) { try { localStorage.setItem(KEY, String(now)); } catch (e) {} t = now; }
    return FREE_MS - (now - Number(t));
  }

  async function status() {
    // Vlasnički/admin pristup se dobija SAMO prijavom vlasničkim mejlom (OWNER_EMAILS, proverava se dole).
    // (Uklonjen je stari „?pristup=" ključ i localStorage 'full' — ključ je bio javan pa nebezbedan.)
    var sb = null;
    try { if (SUPABASE_URL && SUPABASE_ANON && window.supabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON); } catch (e) {}
    if (!sb) return "free";
    var user = null;
    try { var u = await sb.auth.getUser(); user = u && u.data && u.data.user; } catch (e) {}
    /* Osvezi kolacic za middleware. Supabase token traje ~1h; bez ovoga bi ucenik
       koji se prijavio ranije bio vracen na prijavu kad klikne na skriptu.
       Svaka zasticena strana koja se uspesno otvori produzava kolacic. */
    try {
      var _s = await sb.auth.getSession();
      var _ses = _s && _s.data && _s.data.session;
      if (_ses && _ses.access_token) {
        var _ost = _ses.expires_at ? (_ses.expires_at - Math.floor(Date.now()/1000)) : 3600;
        var _sec = (location.protocol === "https:") ? "; Secure" : "";
        document.cookie = "mathia_sb=" + encodeURIComponent(_ses.access_token)
          + "; path=/; max-age=" + Math.max(60, Math.min(_ost, 3600)) + "; SameSite=Lax" + _sec;
      }
    } catch (e) {}
    if (user && user.email && OWNER_EMAILS.indexOf(user.email.toLowerCase()) > -1) return "owner";
    if (user) {
      try {
        // Normalizacija mejla: mala slova, za Gmail/Googlemail ignoriši tačke i "+tag"
        // (Gmail te adrese tretira kao istu). NE spaja različit raspored slova.
        var _norm = function (e) {
          e = String(e || "").trim().toLowerCase();
          var at = e.indexOf("@"); if (at < 0) return e;
          var loc = e.slice(0, at), dom = e.slice(at + 1);
          var pl = loc.indexOf("+"); if (pl > -1) loc = loc.slice(0, pl);
          if (dom === "gmail.com" || dom === "googlemail.com") loc = loc.replace(/\./g, "");
          return loc + "@" + dom;
        };
        var _mine = _norm(user.email);
        var _lower = String(user.email || "").trim().toLowerCase();
        var _cands = [_lower]; if (_mine !== _lower) _cands.push(_mine);
        var _or = _cands.map(function (c) { return "kupac_email.ilike." + c.replace(/[,()]/g, ""); }).join(",");
        var r = await sb.from("pretplate").select("*").or(_or).eq("status", "aktivna");
        // Sigurnosna provera: prihvati samo redove čiji je mejl NORMALIZOVANO identičan.
        var rows = ((r && r.data) || []).filter(function (rw) { return _norm(rw.kupac_email) === _mine; });
        var trazi = kljucevi(SUBJECT);            // strana moze da navede vise kljuceva ("a,b,c")
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          if (row.tip === "klon") continue;   // dopuna (48h) otključava SAMO klon — skripte/formule ostaju za pun paket
          var vazi = !row.istice || new Date(row.istice) > new Date();
          if (ANYSUB && vazi) return "subscribed";   // kviz: bilo koja aktivna pretplata
          var kupljeno = [];
          (Array.isArray(row.predmeti) ? row.predmeti : []).forEach(function(p){
            kljucevi(p).forEach(function(k){ kupljeno.push(k); });
          });
          var pokriva = trazi.some(function(t){ return kupljeno.indexOf(t) > -1; });
          if (vazi && pokriva) return "subscribed";
        }
      } catch (e) {}
    }
    return "free";
  }

  function plansHTML() {
    return PLANS.map(function (p) {
      return '<a href="' + PAY_URL + '?paket=' + p.id + '&predmet=' + encodeURIComponent(kljucevi(SUBJECT)[0] || SUBJECT) +
        '" style="display:flex;justify-content:space-between;align-items:center;gap:12px;border:1px solid #E7D2A2;border-radius:14px;padding:13px 16px;margin:8px 0;text-decoration:none;color:#5A1024;transition:.15s" ' +
        'onmouseover="this.style.borderColor=\'#C6A05C\'" onmouseout="this.style.borderColor=\'#E7D2A2\'">' +
        '<span><b style="font-family:Cormorant Garamond,serif;font-size:19px">' + p.naziv + '</b><br><small style="color:#8a7a74">' + p.predmeta + (p.predmeta === 1 ? ' predmet' : ' predmeta') + '</small></span>' +
        '<b style="color:#9C7838">' + fmt(p.din) + ' din</b></a>';
    }).join("");
  }

  /* zaštita od preuzimanja (skripte) */
  function protect() {
    if (document.getElementById("mathia-protect-css")) return;
    var css = document.createElement("style");
    css.id = "mathia-protect-css";
    css.textContent =
      ".topic,.box,.cover{-webkit-user-select:none;-ms-user-select:none;user-select:none}" +
      ".topic img,.cover img{-webkit-user-drag:none;user-drag:none}" +
      "@media print{body *{visibility:hidden!important}#mathia-noprint{visibility:visible!important;display:flex!important}}" +
      "#mathia-noprint{display:none;position:fixed;inset:0;align-items:center;justify-content:center;text-align:center;padding:30px;font:600 20px Inter,system-ui,Arial,sans-serif;color:#5A1024;background:#FBF6EE;z-index:2147483647}";
    document.head.appendChild(css);

    var np = document.createElement("div");
    np.id = "mathia-noprint";
    np.textContent = T("noprint");
    if (document.body) document.body.appendChild(np);

    var stop = function (e) { e.preventDefault(); e.stopPropagation(); return false; };
    document.addEventListener("contextmenu", stop, true);
    document.addEventListener("dragstart", stop, true);
    document.addEventListener("copy", stop, true);
    document.addEventListener("cut", stop, true);
    document.addEventListener("keydown", function (e) {
      var k = (e.key || "").toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (k === "s" || k === "p" || k === "c" || k === "u" || k === "a")) { return stop(e); }
      if (k === "printscreen") { return stop(e); }
    }, true);
  }


  /* Sladak katanac (krem+zlato, katanac ikonica) — zajednički za sve poruke */
  function gateCard(title, sub){
    return '<div style="width:100%;max-width:460px;background:linear-gradient(180deg,#FFFDF9,#FBEFDA);border:1.5px solid #E7D2A2;border-radius:24px;box-shadow:0 30px 70px -28px rgba(90,16,36,.4);padding:28px 24px;text-align:center;font-family:Inter,system-ui,Arial,sans-serif">' +
      '<div style="width:56px;height:56px;margin:0 auto 12px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;background:radial-gradient(circle at 38% 30%,#FFF6D6,#E7D2A2);border:1px solid #C6A05C;box-shadow:0 12px 26px -12px rgba(198,160,92,.7)">\uD83D\uDD12</div>' +
      '<div style="width:54px;height:54px;margin:0 auto 10px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:25px;background:radial-gradient(circle at 38% 30%,#FFF6D6,#E7D2A2);border:1px solid #C6A05C;box-shadow:0 12px 26px -12px rgba(198,160,92,.7)">\uD83D\uDD12</div><div style="font-size:12px;letter-spacing:.3em;color:#9C7838;font-weight:700">MATHIA</div>' +
      '<h2 style="font-family:\'Cormorant Garamond\',Georgia,serif;font-weight:700;font-size:25px;margin:6px 0 6px;color:#5A1024">' + title + '</h2>' +
      '<p style="color:#7a6b66;margin:0 0 14px;font-size:15px">' + sub + '</p>' +
      plansHTML() +
      '<p style="margin:14px 0 0;font-size:13px;color:#8a7a74">' + T("haveSub") + ' <a href="' + LOGIN_URL + '" style="color:#9C7838;font-weight:600">Prijavi se</a></p>' +
      '</div>';
  }

  /* skripta/reels/flip bez .topic — pun katanac (ne može preview po lekciji) */
  function scriptOverlayLock() {
    if (document.getElementById("mathia-gate")) return;
    var o = document.createElement("div");
    o.id = "mathia-gate";
    o.style.cssText = "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(90,16,36,.34);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);font-family:Inter,system-ui,Arial,sans-serif";
    o.innerHTML = gateCard(T("unlockT"), T("unlockS"));
    document.body.appendChild(o);
    document.documentElement.style.overflow = "hidden";
  }

  /* skripta u probi: pokaži samo prvu lekciju */
  function previewLock() {
    var topics = Array.prototype.slice.call(document.querySelectorAll("section.topic, section.part"));
    if (!topics.length) { scriptOverlayLock(); return; }

    for (var i = 1; i < topics.length; i++) {
      var t = topics[i];
      t.style.filter = "blur(7px)";
      t.style.opacity = ".45";
      t.style.pointerEvents = "none";
      t.style.userSelect = "none";
      t.setAttribute("aria-hidden", "true");
    }

    if (document.getElementById("mathia-skripta-cta")) return;
    var cta = document.createElement("div");
    cta.id = "mathia-skripta-cta";
    cta.style.cssText = "margin:22px auto;max-width:460px;background:linear-gradient(180deg,#FFFDF9,#FBEFDA);border:1.5px solid #E7D2A2;border-radius:24px;box-shadow:0 26px 64px -26px rgba(90,16,36,.35);padding:26px 22px;text-align:center;font-family:Inter,system-ui,Arial,sans-serif";
    cta.innerHTML =
      '<div style="width:54px;height:54px;margin:0 auto 10px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:25px;background:radial-gradient(circle at 38% 30%,#FFF6D6,#E7D2A2);border:1px solid #C6A05C;box-shadow:0 12px 26px -12px rgba(198,160,92,.7)">\uD83D\uDD12</div><div style="font-size:12px;letter-spacing:.3em;color:#9C7838;font-weight:700">MATHIA</div>' +
      '<h2 style="font-family:Cormorant Garamond,serif;font-weight:700;font-size:24px;margin:8px 0 6px;color:#5A1024">' + T("previewT") + '</h2>' +
      '<p style="color:#7a6b66;margin:0 0 14px;font-size:15px">' + T("previewS") + '</p>' +
      plansHTML() +
      '<p style="margin:14px 0 0;font-size:13px;color:#8a7a74">' + T("haveSub") + ' <a href="' + LOGIN_URL + '" style="color:#9C7838;font-weight:600">Prijavi se</a></p>';

    if (topics[1] && topics[1].parentNode) topics[1].parentNode.insertBefore(cta, topics[1]);
    else if (topics[0] && topics[0].parentNode) topics[0].parentNode.appendChild(cta);
  }

  /* badge (obične stranice u probi) */
  function badge(msLeft) {
    var b = document.createElement("div");
    b.id = "mathia-free-badge";
    b.style.cssText = "position:fixed;left:14px;bottom:14px;z-index:99998;background:#fff;border:1px solid #E7D2A2;color:#9C7838;font:600 13px Inter,system-ui,Arial,sans-serif;padding:8px 12px;border-radius:999px;box-shadow:0 8px 22px rgba(90,16,36,.14)";
    document.body.appendChild(b);
    function tick() {
      var left = freeMsLeft();
      if (left <= 0) { b.remove(); lock(); return; }
      var m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
      b.textContent = T("free") + m + ":" + (s < 10 ? "0" : "") + s;
      setTimeout(tick, 1000);
    }
    tick();
  }

  /* pun katanac (obične stranice posle 15 min) */
  function lock() {
    if (document.getElementById("mathia-gate")) return;
    var o = document.createElement("div");
    o.id = "mathia-gate";
    o.style.cssText = "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(90,16,36,.34);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);font-family:Inter,system-ui,Arial,sans-serif";
    o.innerHTML = gateCard(T("overT"), T("overS"));
    document.body.appendChild(o);
    document.documentElement.style.overflow = "hidden";
  }

  /* Sakrij belešku „otključava se pretplatom" (i pokaži [data-gate-sub]) čim je korisnik
     vlasnik ili pretplaćen na OVAJ predmet. Za landing strane koristi se data-note-only="1":
     samo ova provera, BEZ katanca/zaštite (to su marketinške strane, ne zaključavaju se). */
  function applyPaidUI() {
    try { document.querySelectorAll('.note[data-i18n="mNote"], [data-gate-free]').forEach(function (n) { n.style.display = "none"; }); } catch (e) {}
    try { document.querySelectorAll('[data-gate-sub]').forEach(function (n) { n.hidden = false; n.style.display = ""; }); } catch (e) {}
  }
  var NOTE_ONLY = !!(me && me.getAttribute("data-note-only") === "1");

  function start() {
    if (NOTE_ONLY) {
      loadSb(function () { status().then(function (st) { if (st === "owner" || st === "subscribed") applyPaidUI(); }); });
      return;
    }
    var script = isScriptPage();
    if (!SUBJECT && !script) return;

    loadSb(function () {
      status().then(function (st) {
        if (st === "owner") return;               // vlasnik: pun pristup, bez zaštite
        protect();                                // ZAŠTITA na SVIM sadržajnim stranama (skripta, zadaci, priručnik, klon…)
        if (script) {                             // SKRIPTA
          if (st !== "subscribed") previewLock();
          return;
        }
        if (st === "subscribed") return;          // OBIČNA STRANICA
        var left = freeMsLeft();
        if (left > 0) badge(left);
        else lock();
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
