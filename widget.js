/* ============================================================
   Marina · mala matura — samostalni widget (ubacuje se JEDNOM linijom)
   Primer:
     <script src="widget.js"
             data-api="/api/chat"
             data-avatar="https://.../zoi.png"
             data-lang="sr"></script>
   ============================================================ */
(function () {
  "use strict";

  var script = document.currentScript;
  var API = (script && script.getAttribute("data-api")) || "/api/chat";
  var AVATAR =
    (script && script.getAttribute("data-avatar")) ||
    "data:image/jpeg;base64,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";
  var LANG = (function () {
    try { var s = localStorage.getItem("mathia_lang"); if (s) return String(s).toLowerCase(); } catch (e) {}
    var hl = (document.documentElement.getAttribute("lang") || "").slice(0, 2).toLowerCase();
    if (hl) return hl;
    return (script && script.getAttribute("data-lang")) || "sr";
  })();
  var MODE = (script && script.getAttribute("data-mode")) || "matura"; // "matura" | "ftn"
  var NAME = (script && script.getAttribute("data-name")) || "Marina"; // ime asistenta (npr. "Marina")
  var HI = (script && script.getAttribute("data-hi")) || ""; // pozdrav po stranici (opciono)
  var SUB = (script && script.getAttribute("data-sub")) || ""; // podnaslov po stranici (opciono)
  var SUBJ = (script && script.getAttribute("data-subj")) || ""; // naziv predmeta (za 8-jezični pozdrav)
  var ALIASES = { matura: "mala-matura", ftn: "prijemni-matematika", prijemni: "prijemni-matematika" };
  function resolveMode(m){ return m ? (ALIASES[m] || m) : m; }
  var RMODE = resolveMode(MODE);
  var ISSITE = (MODE === "site" || RMODE === "site");
  var SITE_CHIPS = {
    sr:["Koji predmeti?","Cene i paketi","Izbor fakulteta","Kako počinjem?"],
    en:["Which subjects?","Plans & prices","Choosing a faculty","How do I start?"],
    de:["Welche Fächer?","Pakete & Preise","Studienwahl","Wie fange ich an?"],
    fr:["Quelles matières ?","Forfaits & prix","Choix de la faculté","Comment commencer ?"],
    es:["¿Qué materias?","Planes y precios","Elegir facultad","¿Cómo empiezo?"],
    it:["Quali materie?","Piani e prezzi","Scelta facoltà","Come inizio?"],
    ru:["Какие предметы?","Пакеты и цены","Выбор факультета","Как начать?"],
    pt:["Que matérias?","Planos e preços","Escolher faculdade","Como começo?"]
  };
  var CTA_TX = {sr:"Pitaj ",en:"Ask ",de:"Frag ",fr:"Demande à ",es:"Pregunta a ",it:"Chiedi a ",ru:"Спроси ",pt:"Pergunta à "};
  var SITE = {
    sr:{sub:"profesorica", ph:"Napiši pitanje…", send:"Pošalji", hi:"Ćao! ❤️ Ja sam Marina. Pomažem oko svega na Mathii — predmeti, paketi i cene, ali i upis na fakultete u Beogradu i Novom Sadu (posebno FTN smerovi), prijemni iz matematike i koliko su teški. Uz svaki paket za fakultet ili srednju možeš i da se testiraš. Pitaj me bilo šta — prvih 15 minuta je besplatno!"},
    en:{sub:"your teacher", ph:"Type your question…", send:"Send", hi:"Hi! ❤️ I'm Marina. I help with everything on Mathia — subjects, plans and prices, plus enrolling at universities in Belgrade and Novi Sad (especially FTN programs), the maths entrance exams and how hard they are. With every faculty or high-school plan you can also take a placement test. Ask me anything — your first 15 minutes are on us!"},
    de:{sub:"deine Lehrerin", ph:"Schreib deine Frage…", send:"Senden", hi:"Hallo! ❤️ Ich bin Marina. Ich helfe bei allem auf Mathia — Fächer, Pakete und Preise sowie die Einschreibung an Universitäten in Belgrad und Novi Sad (besonders FTN-Studiengänge), die Mathe-Aufnahmeprüfungen und ihre Schwierigkeit. Zu jedem Fakultäts- oder Oberschulpaket kannst du einen Einstufungstest machen. Frag mich alles — deine ersten 15 Minuten gehen auf uns!"},
    fr:{sub:"ta professeure", ph:"Écris ta question…", send:"Envoyer", hi:"Salut ! ❤️ Je suis Marina. J'aide pour tout sur Mathia — matières, forfaits et prix, mais aussi l'inscription aux universités de Belgrade et Novi Sad (surtout les filières FTN), les concours de maths et leur difficulté. Avec chaque forfait fac ou lycée, tu peux passer un test de niveau. Demande-moi ce que tu veux — tes 15 premières minutes sont offertes !"},
    es:{sub:"tu profesora", ph:"Escribe tu pregunta…", send:"Enviar", hi:"¡Hola! ❤️ Soy Marina. Ayudo con todo en Mathia — materias, planes y precios, además del acceso a universidades de Belgrado y Novi Sad (especialmente las carreras de FTN), los exámenes de acceso de matemáticas y su dificultad. Con cada plan de facultad o instituto puedes hacer una prueba de nivel. Pregúntame lo que quieras — ¡tus primeros 15 minutos van por nuestra cuenta!"},
    it:{sub:"la tua insegnante", ph:"Scrivi la tua domanda…", send:"Invia", hi:"Ciao! ❤️ Sono Marina. Aiuto con tutto su Mathia — materie, pacchetti e prezzi, oltre all'iscrizione alle università di Belgrado e Novi Sad (in particolare i corsi del FTN), i test d'ingresso di matematica e la loro difficoltà. Con ogni pacchetto per facoltà o liceo puoi fare un test di livello. Chiedimi qualsiasi cosa — i primi 15 minuti sono offerti!"},
    ru:{sub:"твоя преподавательница", ph:"Напишите вопрос…", send:"Отправить", hi:"Привет! ❤️ Я Марина. Помогаю со всем на Mathia — предметы, пакеты и цены, а также поступление в университеты Белграда и Нови-Сада (особенно направления FTN), вступительные по математике и их сложность. С каждым пакетом для факультета или школы можно пройти тест на уровень. Спрашивай что угодно — первые 15 минут за наш счёт!"},
    pt:{sub:"a tua professora", ph:"Escreve a tua pergunta…", send:"Enviar", hi:"Olá! ❤️ Sou a Marina. Ajudo com tudo na Mathia — matérias, planos e preços, além da entrada nas universidades de Belgrado e Novi Sad (sobretudo os cursos do FTN), os exames de acesso de matemática e a sua dificuldade. Com cada plano de faculdade ou secundário podes fazer um teste de nível. Pergunta o que quiseres — os primeiros 15 minutos são por nossa conta!"}
  };
  var SUBJHI = {
    sr:"Ćao! ❤️ Ja sam Marina, profesorica za {subj}. Pitaj, slikaj 📷 ili izdiktiraj 🎙️ zadatak.",
    en:"Hi! ❤️ I'm Marina, your {subj} teacher. Ask me, snap 📷 or dictate 🎙️ the problem.",
    de:"Hallo! ❤️ Ich bin Marina, deine Lehrerin für {subj}. Frag mich, fotografiere 📷 oder diktiere 🎙️ die Aufgabe.",
    fr:"Salut ! ❤️ Je suis Marina, ta professeure de {subj}. Pose ta question, photographie 📷 ou dicte 🎙️ l'exercice.",
    es:"¡Hola! ❤️ Soy Marina, tu profesora de {subj}. Pregúntame, fotografía 📷 o dicta 🎙️ el ejercicio.",
    it:"Ciao! ❤️ Sono Marina, la tua insegnante di {subj}. Chiedimi, fotografa 📷 o detta 🎙️ l'esercizio.",
    ru:"Привет! ❤️ Я Марина, преподавательница по «{subj}». Спрашивай, фотографируй 📷 или диктуй 🎙️ задачу.",
    pt:"Olá! ❤️ Sou a Marina, tua professora de {subj}. Pergunta, fotografa 📷 ou dita 🎙️ o exercício."
  };
  function ctaLabel(){ var nm=NAME; if((LANG==="sr"||LANG==="hr")&&/a$/.test(nm)) nm=nm.slice(0,-1)+"u"; return (CTA_TX[LANG]||CTA_TX.sr)+nm; }
  var SUBJECTS = {
    "prijemni-matematika": { name: "Marina", sub: { sr: "profesorica · prijemni", en: "teacher · entrance exam" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za prijemni iz matematike. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for the math entrance exam. Type a problem or send a photo — we'll go step by step." } },
    "mala-matura": { name: "Marina", sub: { sr: "profesorica · mala matura", en: "teacher · grade-8 final" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za malu maturu iz matematike. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for the grade-8 math final. Type a problem or send a photo — we'll go step by step." } },
    "sr-mat-1": { name: "Marina", sub: { sr: "profesorica · matematika 1. razred", en: "teacher · math · grade 1" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za matematiku 1. razreda. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for grade-1 math. Type a problem or send a photo — we'll go step by step." } },
    "sr-mat-2": { name: "Marina", sub: { sr: "profesorica · matematika 2. razred", en: "teacher · math · grade 2" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za matematiku 2. razreda. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for grade-2 math. Type a problem or send a photo — we'll go step by step." } },
    "sr-mat-3": { name: "Marina", sub: { sr: "profesorica · matematika 3. razred", en: "teacher · math · grade 3" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za matematiku 3. razreda. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for grade-3 math. Type a problem or send a photo — we'll go step by step." } },
    "sr-mat-4": { name: "Marina", sub: { sr: "profesorica · matematika 4. razred", en: "teacher · math · grade 4" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za matematiku 4. razreda. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for grade-4 math. Type a problem or send a photo — we'll go step by step." } },
    "sr-fiz-1": { name: "Marina", sub: { sr: "profesorica · fizika 1. razred", en: "teacher · physics · grade 1" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za fiziku 1. razreda. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for grade-1 physics. Type a problem or send a photo — we'll go step by step." } },
    "sr-fiz-2": { name: "Marina", sub: { sr: "profesorica · fizika 2. razred", en: "teacher · physics · grade 2" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za fiziku 2. razreda. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for grade-2 physics. Type a problem or send a photo — we'll go step by step." } },
    "sr-fiz-3": { name: "Marina", sub: { sr: "profesorica · fizika 3. razred", en: "teacher · physics · grade 3" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za fiziku 3. razreda. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for grade-3 physics. Type a problem or send a photo — we'll go step by step." } },
    "sr-fiz-4": { name: "Marina", sub: { sr: "profesorica · fizika 4. razred", en: "teacher · physics · grade 4" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za fiziku 4. razreda. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for grade-4 physics. Type a problem or send a photo — we'll go step by step." } },
    "fax-analiza1": { name: "Marina", sub: { sr: "profesorica · Analiza 1", en: "teacher · Calculus 1" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za Matematičku analizu 1. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for Calculus 1. Type a problem or send a photo — we'll go step by step." } },
    "fax-analiza2": { name: "Marina", sub: { sr: "profesorica · Analiza 2", en: "teacher · Calculus 2" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za Matematičku analizu 2. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for Calculus 2. Type a problem or send a photo — we'll go step by step." } },
    "fax-kompleksna": { name: "Marina", sub: { sr: "profesorica · Kompleksna analiza", en: "teacher · Complex analysis" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za Kompleksnu analizu. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for complex analysis. Type a problem or send a photo — we'll go step by step." } },
    "fax-linearna": { name: "Marina", sub: { sr: "profesorica · Linearna algebra", en: "teacher · Linear algebra" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za Linearnu algebru. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for linear algebra. Type a problem or send a photo — we'll go step by step." } },
    "fax-verovatnoca": { name: "Marina", sub: { sr: "profesorica · Verovatnoća i statistika", en: "teacher · Probability & stats" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za Verovatnoću i statistiku. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for probability & statistics. Type a problem or send a photo — we'll go step by step." } },
    "fax-operaciona": { name: "Marina", sub: { sr: "profesorica · Operaciona istraživanja", en: "teacher · Operations research" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za Operaciona istraživanja. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for operations research. Type a problem or send a photo — we'll go step by step." } },
    "fax-diskretna": { name: "Marina", sub: { sr: "profesorica · Diskretna matematika", en: "teacher · Discrete math" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za Diskretnu matematiku. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for discrete mathematics. Type a problem or send a photo — we'll go step by step." } },
    "fax-elektronika": { name: "Marina", sub: { sr: "profesorica · Uvod u elektroniku", en: "teacher · Intro electronics" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za Uvod u elektroniku. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for intro to electronics. Type a problem or send a photo — we'll go step by step." } },
    "fax-kola": { name: "Marina", sub: { sr: "profesorica · Teorija el. kola", en: "teacher · Electric circuits" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za Teoriju električnih kola. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for electric circuits. Type a problem or send a photo — we'll go step by step." } },
    "fax-merenja": { name: "Marina", sub: { sr: "profesorica · Električna merenja", en: "teacher · Electrical meas." }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za Električna merenja. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for electrical measurements. Type a problem or send a photo — we'll go step by step." } },
    "fax-mehanika": { name: "Marina", sub: { sr: "profesorica · Mehanika", en: "teacher · Mechanics" }, hi: { sr: "Ćao! Ja sam {name}, tvoja profesorica za Mehaniku. Napiši zadatak ili pošalji sliku — idemo korak po korak.", en: "Hi! I'm {name}, your teacher for mechanics. Type a problem or send a photo — we'll go step by step." } }
  };
  if (!ISSITE && !(script && script.getAttribute("data-name")) && SUBJECTS[RMODE] && SUBJECTS[RMODE].name) NAME = SUBJECTS[RMODE].name;

  var VOICE = (script && script.getAttribute("data-voice")) || ""; // ElevenLabs Voice ID za srpski (prazno = podrazumevano)
  var AVATAR_OK = true;
  var TTS = (script && script.getAttribute("data-tts")) || API.replace(/\/api\/[a-z-]+\/?$/, "/api/tts");
  var RATE = (script && script.getAttribute("data-rate")) || ""; // brzina govora (npr. "0.85" za sporije); prazno = normalno

  // ——— prevodi UI-ja (AI ionako odgovara na izabranom jeziku) ———
  var T = {
    sr: { sub: "profesorica · mala matura", hi: "Ćao! 😊 Ja sam Marina, tvoja profesorica za malu maturu iz matematike. Napiši zadatak ili pošalji 📷 sliku — idemo korak po korak, polako i lepo.", ph: "Napiši zadatak ili pitanje…", send: "Pošalji", chips: ["Napiši zadatak", "Pošalji sliku 📷", "Objasni mi pojam"], voice: "Glas", thinking: "Marina razmišlja…" },
    en: { sub: "teacher · final exam (grade 8)", hi: "Hi! 😊 I'm Marina, your math teacher for the grade-8 final exam. Type a problem or send a 📷 photo — we'll go step by step.", ph: "Type a problem or question…", send: "Send", chips: ["Type a problem", "Send a photo 📷", "Explain a concept"], voice: "Voice", thinking: "Marina is thinking…" },
    hu: { sub: "tanárnő · kisérettségi", hi: "Szia! 😊 Marina vagyok, a matek tanárnőd a kisérettségire. Írj be egy feladatot vagy küldj 📷 képet — lépésről lépésre haladunk.", ph: "Írd be a feladatot vagy kérdést…", send: "Küldés", chips: ["Feladat beírása", "Kép küldése 📷", "Fogalom magyarázat"], voice: "Hang", thinking: "Marina gondolkodik…" },
    hr: { sub: "profesorica · mala matura", hi: "Bok! 😊 Ja sam Marina, tvoja profesorica matematike za malu maturu. Napiši zadatak ili pošalji 📷 sliku — idemo korak po korak.", ph: "Napiši zadatak ili pitanje…", send: "Pošalji", chips: ["Napiši zadatak", "Pošalji sliku 📷", "Objasni pojam"], voice: "Glas", thinking: "Marina razmišlja…" },
    ro: { sub: "profesoară · examen final", hi: "Bună! 😊 Sunt Marina, profesoara ta de matematică. Scrie un exercițiu sau trimite o 📷 poză — mergem pas cu pas.", ph: "Scrie exercițiul sau întrebarea…", send: "Trimite", chips: ["Scrie un exercițiu", "Trimite o poză 📷", "Explică un concept"], voice: "Voce", thinking: "Marina se gândește…" },
    sk: { sub: "učiteľka · malá matura", hi: "Ahoj! 😊 Som Marina, tvoja učiteľka matematiky. Napíš úlohu alebo pošli 📷 fotku — pôjdeme krok za krokom.", ph: "Napíš úlohu alebo otázku…", send: "Poslať", chips: ["Napíš úlohu", "Pošli fotku 📷", "Vysvetli pojem"], voice: "Hlas", thinking: "Marina premýšľa…" },
    de: { sub: "Lehrerin · Abschlussprüfung (Kl. 8)", hi: "Hallo! 😊 Ich bin Marina, deine Mathelehrerin für die Abschlussprüfung der 8. Klasse. Schreib eine Aufgabe oder schick ein 📷 Foto — wir gehen Schritt für Schritt vor.", ph: "Schreib eine Aufgabe oder Frage…", send: "Senden", chips: ["Aufgabe schreiben", "Foto senden 📷", "Begriff erklären"], voice: "Stimme", thinking: "Marina denkt nach…" },
    el: { sub: "καθηγήτρια · τελικές εξετάσεις", hi: "Γεια! 😊 Είμαι η Marina, η καθηγήτριά σου στα μαθηματικά για τις τελικές εξετάσεις. Γράψε μια άσκηση ή στείλε μια 📷 φωτογραφία — θα πάμε βήμα βήμα.", ph: "Γράψε την άσκηση ή την ερώτηση…", send: "Αποστολή", chips: ["Γράψε άσκηση", "Στείλε φωτογραφία 📷", "Εξήγησε μια έννοια"], voice: "Φωνή", thinking: "Η Marina σκέφτεται…" },
    es: { sub: "profesora · examen final (8.º)", hi: "¡Hola! 😊 Soy Marina, tu profesora de matemáticas. Escribe un ejercicio o envía una 📷 foto — vamos paso a paso.", ph: "Escribe el ejercicio o la pregunta…", send: "Enviar", chips: ["Escribe un ejercicio", "Enviar foto 📷", "Explica un concepto"], voice: "Voz", thinking: "Marina está pensando…" },
    fr: { sub: "professeure · examen final", hi: "Salut ! 😊 Je suis Marina, ta prof de maths. Écris un exercice ou envoie une 📷 photo — on avance étape par étape.", ph: "Écris l’exercice ou la question…", send: "Envoyer", chips: ["Écris un exercice", "Envoyer une photo 📷", "Explique une notion"], voice: "Voix", thinking: "Marina réfléchit…" },
  };
  var SPEAK = { sr: "sr-RS", en: "en-US", hu: "hu-HU", hr: "hr-HR", ro: "ro-RO", sk: "sk-SK", de: "de-DE", el: "el-GR", es: "es-ES", fr: "fr-FR" };
  var ORDER = ["sr", "en", "de", "fr", "es", "it", "ru", "pt"];
  function t() { return T[LANG] || T.sr; }

  // dopune: 4. čip (zadatak za vežbu), prefiks za „objasni pojam", poruka za vežbu — po jeziku
  var EXTRA = {
    sr: { c: "Zadatak za vežbu 🎯", cp: "Objasni mi pojam: ", pr: "Daj mi jedan zadatak za vežbu po nivou male mature." },
    en: { c: "Practice problem 🎯", cp: "Explain a concept: ", pr: "Give me one practice problem at grade-8 final-exam level." },
    hu: { c: "Gyakorló feladat 🎯", cp: "Magyarázz el egy fogalmat: ", pr: "Adj egy gyakorló feladatot a kisérettségi szintjén." },
    hr: { c: "Zadatak za vježbu 🎯", cp: "Objasni mi pojam: ", pr: "Daj mi jedan zadatak za vježbu na razini male mature." },
    ro: { c: "Exercițiu de practică 🎯", cp: "Explică-mi un concept: ", pr: "Dă-mi un exercițiu de practică la nivelul examenului final." },
    sk: { c: "Cvičná úloha 🎯", cp: "Vysvetli mi pojem: ", pr: "Daj mi jednu cvičnú úlohu na úrovni malej matury." },
    de: { c: "Übungsaufgabe 🎯", cp: "Erkläre mir einen Begriff: ", pr: "Gib mir eine Übungsaufgabe auf dem Niveau der Abschlussprüfung der 8. Klasse." },
    el: { c: "Άσκηση εξάσκησης 🎯", cp: "Εξήγησέ μου μια έννοια: ", pr: "Δώσε μου μια άσκηση εξάσκησης στο επίπεδο των τελικών εξετάσεων." },
    es: { c: "Ejercicio de práctica 🎯", cp: "Explícame un concepto: ", pr: "Dame un ejercicio de práctica del nivel del examen final." },
    fr: { c: "Exercice d’entraînement 🎯", cp: "Explique-moi une notion : ", pr: "Donne-moi un exercice d’entraînement au niveau de l’examen final." },
  };
  Object.keys(EXTRA).forEach(function (k) {
    if (T[k]) { T[k].chips = T[k].chips.concat([EXTRA[k].c]); T[k].cp = EXTRA[k].cp; T[k].pr = EXTRA[k].pr; }
  });

  // ——— FTN mod: drugačiji pozdrav/podnaslov (UI ostaje isti, „mozak" bira server) ———
  var FTN = {
    sr: { sub: "profesorica · prijemni FTN", hi: "Ćao! 😊 Ja sam Marina, tvoja profesorica za prijemni iz matematike (FTN). Napiši zadatak ili pošalji 📷 sliku — idemo korak po korak." },
    en: { sub: "teacher · FTN entrance exam", hi: "Hi! 😊 I'm Marina, your math teacher for the FTN entrance exam. Type a problem or send a 📷 photo — we'll go step by step." },
    hu: { sub: "tanárnő · FTN felvételi", hi: "Szia! 😊 Marina vagyok, a matek tanárnőd az FTN felvételire. Írj egy feladatot vagy küldj 📷 képet — lépésről lépésre haladunk." },
    hr: { sub: "profesorica · prijemni FTN", hi: "Bok! 😊 Ja sam Marina, tvoja profesorica za prijemni iz matematike (FTN). Napiši zadatak ili pošalji 📷 sliku — idemo korak po korak." },
    ro: { sub: "profesoară · admitere FTN", hi: "Bună! 😊 Sunt Marina, profesoara ta de matematică pentru admiterea la FTN. Scrie un exercițiu sau trimite o 📷 poză — mergem pas cu pas." },
    sk: { sub: "učiteľka · prijímačky FTN", hi: "Ahoj! 😊 Som Marina, tvoja učiteľka matematiky na prijímačky na FTN. Napíš úlohu alebo pošli 📷 fotku — pôjdeme krok za krokom." },
    de: { sub: "Lehrerin · FTN-Aufnahmeprüfung", hi: "Hallo! 😊 Ich bin Marina, deine Mathelehrerin für die FTN-Aufnahmeprüfung. Schreib eine Aufgabe oder schick ein 📷 Foto — wir gehen Schritt für Schritt vor." },
    el: { sub: "καθηγήτρια · εισαγωγικές FTN", hi: "Γεια! 😊 Είμαι η Marina, η καθηγήτριά σου στα μαθηματικά για τις εισαγωγικές εξετάσεις του FTN. Γράψε μια άσκηση ή στείλε μια 📷 φωτογραφία — θα πάμε βήμα βήμα." },
    es: { sub: "profesora · acceso FTN", hi: "¡Hola! 😊 Soy Marina, tu profesora de matemáticas para el examen de acceso a la FTN. Escribe un ejercicio o envía una 📷 foto — vamos paso a paso." },
    fr: { sub: "professeure · concours FTN", hi: "Salut ! 😊 Je suis Marina, ta prof de maths pour le concours d’entrée à la FTN. Écris un exercice ou envoie une 📷 photo — on avance étape par étape." },
  };
  function modeSub(x) { if (ISSITE) { var _ss=SITE[LANG]||SITE.en; return _ss.sub; } if (SUB) return SUB; var _s2=SITE[LANG]||SITE.en; if (SUBJ) return _s2.sub + " · " + SUBJ; var sj=SUBJECTS[RMODE]; if (sj && sj.sub) return sj.sub[LANG] || sj.sub.en || sj.sub.sr; return (MODE === "ftn" && FTN[LANG]) ? FTN[LANG].sub : x.sub; }
  function modeHi(x) { if (ISSITE) { var _sh=SITE[LANG]||SITE.en; return String(_sh.hi).replace(/\{name\}/g, NAME); } var s; if (LANG === "sr" && HI) { s = HI; } else if (SUBJHI[LANG] && SUBJ) { s = SUBJHI[LANG].replace(/\{subj\}/g, SUBJ); } else if (HI) { s = HI; } else { var sj = SUBJECTS[RMODE]; if (sj && sj.hi) { s = sj.hi[LANG] || sj.hi.en || sj.hi.sr; } else { s = (MODE === "ftn" && FTN[LANG]) ? FTN[LANG].hi : x.hi; } } return String(s).replace(/\{name\}/g, NAME).replace(/Marina/g, NAME); }

  // ——— stilovi (sve scope-ovano sa zoi- prefiksom) ———
  var css =
    '@import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap");' +
    "#zoi-btn{position:fixed;right:20px;bottom:20px;width:62px;height:62px;border-radius:50%;border:3px solid #fff;cursor:pointer;z-index:2147483000;box-shadow:0 10px 30px rgba(20,80,70,.35);background-position:center;background-size:cover;transition:transform .15s ease}" +
    "#zoi-btn:hover{transform:scale(1.06)}" +
    "#zoi-panel{position:fixed;right:20px;bottom:94px;width:370px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 130px);background:#FBF5EA;border-radius:22px;overflow:hidden;display:none;flex-direction:column;z-index:2147483000;box-shadow:0 24px 60px rgba(20,60,55,.30);font-family:'Nunito',system-ui,sans-serif;border:1px solid #ECE0CC}" +
    "#zoi-panel.zoi-open{display:flex}" +
    "#zoi-cta{position:fixed;right:92px;bottom:34px;z-index:2147483000;background:#fff;color:#1f6f63;font-family:'Nunito',system-ui,sans-serif;font-weight:800;font-size:14px;padding:9px 14px;border-radius:16px;box-shadow:0 8px 22px rgba(20,80,70,.25);cursor:pointer;white-space:nowrap;animation:zoicta 2.4s ease-in-out infinite}" +
    "#zoi-cta:after{content:'';position:absolute;right:-7px;bottom:13px;border:7px solid transparent;border-left-color:#fff;border-right:0}" +
    "#zoi-cta.zoi-hide{display:none}" +
    "@keyframes zoicta{0%,100%{transform:translateX(0)}50%{transform:translateX(-4px)}}" +
    "#zoi-head{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(135deg,#1F8A78,#2FB7A0);color:#fff}" +
    "#zoi-head img{width:40px;height:40px;border-radius:50%;border:2px solid rgba(255,255,255,.7);object-fit:cover}" +
    "#zoi-head .zoi-name{font-family:'Baloo 2',cursive;font-weight:700;font-size:18px;line-height:1}" +
    "#zoi-head .zoi-sub{font-size:11.5px;opacity:.92;margin-top:2px}" +
    "#zoi-head .zoi-sp{flex:1}" +
    "#zoi-lang{background:rgba(255,255,255,.18);color:#fff;border:1px solid rgba(255,255,255,.4);border-radius:9px;font-family:inherit;font-size:12px;padding:4px 6px;cursor:pointer}" +
    "#zoi-lang option{color:#16302b}" +
    ".zoi-ico{background:rgba(255,255,255,.18);border:none;color:#fff;width:30px;height:30px;border-radius:9px;cursor:pointer;font-size:15px;line-height:1}" +
    "#zoi-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}" +
    ".zoi-row{display:flex;gap:8px;align-items:flex-end}" +
    ".zoi-row.zoi-me{flex-direction:row-reverse}" +
    ".zoi-av{width:26px;height:26px;border-radius:50%;object-fit:cover;flex:none}" +
    ".zoi-bub{max-width:78%;padding:9px 12px;border-radius:15px;font-size:14.5px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}" +
    ".zoi-zoi .zoi-bub{background:#fff;color:#27302d;border-bottom-left-radius:5px;box-shadow:0 2px 6px rgba(0,0,0,.05)}" +
    ".zoi-me .zoi-bub{background:#1F8A78;color:#fff;border-bottom-right-radius:5px}" +
    ".zoi-bub img{max-width:100%;border-radius:10px;margin-top:4px}" +
    "#zoi-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 6px}" +
    ".zoi-chip{background:#FFF;border:1px solid #E2D6BF;color:#3a4a45;border-radius:999px;padding:6px 11px;font-size:12.5px;font-family:inherit;cursor:pointer}" +
    ".zoi-chip:hover{background:#F0FAF7;border-color:#2FB7A0}" +
    "#zoi-foot{padding:10px;border-top:1px solid #ECE0CC;background:#FFFDF8}" +
    "#zoi-prev{display:none;align-items:center;gap:8px;margin-bottom:8px;font-size:12px;color:#5b6863}" +
    "#zoi-prev img{width:38px;height:38px;border-radius:8px;object-fit:cover}" +
    "#zoi-prev button{margin-left:auto;border:none;background:#eee;border-radius:8px;cursor:pointer;padding:3px 8px}" +
    "#zoi-inrow{display:flex;gap:7px;align-items:flex-end}" +
    "#zoi-ta{flex:1;resize:none;border:1px solid #E2D6BF;border-radius:13px;padding:9px 11px;font-family:inherit;font-size:14px;max-height:96px;outline:none}" +
    "#zoi-ta:focus{border-color:#2FB7A0}" +
    ".zoi-send{background:#1F8A78;color:#fff;border:none;border-radius:13px;padding:0 14px;height:40px;font-family:inherit;font-weight:700;font-size:14px;cursor:pointer}" +
    ".zoi-tool{background:#F0FAF7;border:1px solid #CFE9E2;border-radius:13px;width:40px;height:40px;cursor:pointer;font-size:17px}" +
    ".zoi-typing{font-size:13px;color:#6b7873;font-style:italic;padding:2px 4px}" +
    ".zoi-say{align-self:flex-end;flex:none;background:#F0FAF7;border:1px solid #CFE9E2;border-radius:8px;cursor:pointer;font-size:13px;line-height:1;padding:4px 7px;color:#1F8A78}" +
    ".zoi-say:hover{background:#E2F4EF;border-color:#2FB7A0}" +
    ".zoi-avfb{display:grid;place-items:center;background:linear-gradient(135deg,#1F8A78,#2FB7A0);color:#fff}" +
    "#zoi-btn.zoi-avfb{font-size:30px}" +
    "#zoi-head .zoi-headfb{width:40px;height:40px;border-radius:50%;border:2px solid rgba(255,255,255,.7);font-size:20px}" +
    ".zoi-fig{background:#fff;border:1px solid #E2D6BF;border-radius:12px;padding:8px;margin:6px 0;max-width:100%;overflow-x:auto}" +
    ".zoi-fig svg{max-width:100%;height:auto;display:block;margin:0 auto}" +
    ".zoi-bub sup{font-size:.72em;vertical-align:super}.zoi-bub sub{font-size:.72em;vertical-align:sub}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
  (function(){ if (window.__mathiaKx) return; window.__mathiaKx=1;
    var l=document.createElement("link"); l.rel="stylesheet"; l.href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"; document.head.appendChild(l);
    var sc=document.createElement("script"); sc.src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"; sc.onload=function(){ try{ typeset(document); }catch(e){} }; document.head.appendChild(sc);
  })();

  // ——— DOM ———
  var btn = document.createElement("div");
  btn.id = "zoi-btn";
  btn.style.backgroundImage = "url('" + AVATAR + "')";
  btn.setAttribute("title", NAME);
  (function () {
    var probe = new Image();
    probe.onerror = function () {
      AVATAR_OK = false;
      btn.style.backgroundImage = "none";
      btn.classList.add("zoi-avfb");
      btn.textContent = "👩‍🏫";
    };
    probe.src = AVATAR;
  })();

  var langOpts = ORDER.map(function (l) {
    return '<option value="' + l + '"' + (l === LANG ? " selected" : "") + ">" + l.toUpperCase() + "</option>";
  }).join("");

  var panel = document.createElement("div");
  panel.id = "zoi-panel";
  panel.innerHTML =
    '<div id="zoi-head">' +
      '<img src="' + AVATAR + '" alt="' + NAME + '"/>' +
      '<div><div class="zoi-name">' + NAME + '</div><div class="zoi-sub" id="zoi-sub"></div></div>' +
      '<div class="zoi-sp"></div>' +
      '<select id="zoi-lang" title="Jezik">' + langOpts + "</select>" +
      '<button class="zoi-ico" id="zoi-x" title="Zatvori">✕</button>' +
    "</div>" +
    '<div id="zoi-msgs"></div>' +
    '<div id="zoi-chips"></div>' +
    '<div id="zoi-foot">' +
      '<div id="zoi-prev"><img id="zoi-prev-img"/><span id="zoi-prev-name"></span><button id="zoi-prev-x">ukloni</button></div>' +
      '<div id="zoi-inrow">' +
        '<button class="zoi-tool" id="zoi-photo" title="Slika zadatka">📷</button>' +
        '<button class="zoi-tool" id="zoi-mic" title="Izdiktiraj zadatak">🎙️</button>' +
        '<input type="file" id="zoi-file" accept="image/*" style="display:none"/>' +
        '<textarea id="zoi-ta" rows="1"></textarea>' +
        '<button class="zoi-send" id="zoi-go"></button>' +
      "</div>" +
    "</div>";

  document.body.appendChild(btn);
  document.body.appendChild(panel);
  var cta = document.createElement("div");
  cta.id = "zoi-cta";
  cta.textContent = ctaLabel();
  document.body.appendChild(cta);
  cta.onclick = function () { panel.classList.add("zoi-open"); cta.classList.add("zoi-hide"); var ta=panel.querySelector("#zoi-ta"); if(ta) ta.focus(); };
  if (ISSITE) { var _ph = panel.querySelector("#zoi-photo"); if (_ph) _ph.style.display = "none"; }

  // ——— reference ———
  var $ = function (id) { return panel.querySelector(id); };
  var msgsEl = $("#zoi-msgs"), taEl = $("#zoi-ta"), goEl = $("#zoi-go");
  var chipsEl = $("#zoi-chips"), subEl = $("#zoi-sub"), langEl = $("#zoi-lang");
  var fileEl = $("#zoi-file"), prevEl = $("#zoi-prev"), prevImg = $("#zoi-prev-img"), prevName = $("#zoi-prev-name");
  var voiceBtn = $("#zoi-voice");

  // rezerva za sliku u zaglavlju ako se ne učita
  (function () {
    var headAv = panel.querySelector("#zoi-head img");
    if (headAv) headAv.onerror = function () {
      AVATAR_OK = false;
      var s = document.createElement("span");
      s.className = "zoi-avfb zoi-headfb";
      s.textContent = "👩‍🏫";
      headAv.replaceWith(s);
    };
  })();

  var history = [];       // {role, content} za API
  var attachment = null;  // {media_type, data, url}
  var voiceOn = false;
  var lastZoiText = "";

  // ——— jezik / tekstovi ———
  function applyLang() {
    var x = t();
    subEl.textContent = modeSub(x);
    if (ISSITE) { var _su = SITE[LANG] || SITE.en; taEl.placeholder = _su.ph; goEl.textContent = _su.send; }
    else { taEl.placeholder = x.ph; goEl.textContent = x.send; }
    if (typeof cta !== "undefined" && cta) cta.textContent = ctaLabel();
    chipsEl.innerHTML = "";
    if (ISSITE) {
      (SITE_CHIPS[LANG] || SITE_CHIPS.en).forEach(function (c) {
        var b = document.createElement("button");
        b.className = "zoi-chip";
        b.textContent = c;
        b.onclick = function () { taEl.value = c; send(); };
        chipsEl.appendChild(b);
      });
    } else {
      x.chips.forEach(function (c, i) {
        var b = document.createElement("button");
        b.className = "zoi-chip";
        b.textContent = c;
        b.onclick = function () {
          if (i === 1) { fileEl.click(); }
          else if (i === 2) { taEl.value = x.cp || (c + ": "); taEl.focus(); }
          else if (i === 3) { taEl.value = x.pr || ""; send(); }
          else { taEl.value = ""; taEl.focus(); }
        };
        chipsEl.appendChild(b);
      });
    }
  }

  function greet() {
    msgsEl.innerHTML = "";
    addBub("zoi", modeHi(t()));
  }

  // ——— čišćenje Markdown-a (da se ne vide gole zvezdice/taraba) ———
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function fmt(s) {
    var math = [];
    s = String(s);
    s = s.replace(/\$\$([\s\S]+?)\$\$/g, function(_m,x){ math.push([x,1]); return "\u0001K"+(math.length-1)+"\u0001"; });
    s = s.replace(/\\\[([\s\S]+?)\\\]/g, function(_m,x){ math.push([x,1]); return "\u0001K"+(math.length-1)+"\u0001"; });
    s = s.replace(/\$([^\$\n]+?)\$/g, function(_m,x){ math.push([x,0]); return "\u0001K"+(math.length-1)+"\u0001"; });
    s = s.replace(/\\\(([\s\S]+?)\\\)/g, function(_m,x){ math.push([x,0]); return "\u0001K"+(math.length-1)+"\u0001"; });
    s = esc(s);
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/__([^_]+)__/g, "<strong>$1</strong>");
    s = s.replace(/^[ \t]*#{1,6}\s*/gm, "");
    s = s.replace(/^[ \t]*[\*\-\+]\s+/gm, "• ");
    s = s.replace(/\*([^*\n]+)\*/g, "$1");
    s = s.replace(/\*/g, "");
    s = s.replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>").replace(/\^(-?\d+|[A-Za-z])/g, "<sup>$1</sup>");
    s = s.replace(/_\{([^}]+)\}/g, "<sub>$1</sub>").replace(/_(\d+)/g, "<sub>$1</sub>");
    s = s.replace(/\u0001K(\d+)\u0001/g, function(_m,i){ var oo=math[i]; return '<span class="kx" data-d="'+oo[1]+'">'+esc(oo[0])+'</span>'; });
    return s;
  }
  function typeset(root){
    if (!window.katex || !root || !root.querySelectorAll) return;
    var ns = root.querySelectorAll(".kx:not([data-done])");
    for (var i=0;i<ns.length;i++){ var el=ns[i];
      try { window.katex.render(el.textContent, el, {displayMode: el.getAttribute("data-d")==="1", throwOnError:false}); } catch(e){}
      el.setAttribute("data-done","1");
    }
  }

  // ——— bezbedan SVG (crteži/animacije iz odgovora) ———
  function safeSvg(svg){
    svg = String(svg);
    svg = svg.replace(/<script[\s\S]*?<\/script>/gi, "");
    svg = svg.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "");
    svg = svg.replace(/\son\w+\s*=\s*"[^"]*"/gi, "").replace(/\son\w+\s*=\s*'[^']*'/gi, "");
    svg = svg.replace(/(href|xlink:href)\s*=\s*"(?:\s*javascript:)[^"]*"/gi, "");
    return svg;
  }
  function addText(bub, t){ if (t && t.trim()) { var d=document.createElement("div"); d.innerHTML=fmt(t); bub.appendChild(d); typeset(d); } }
  function addSvg(bub, svg){ var fig=document.createElement("div"); fig.className="zoi-fig"; fig.innerHTML=safeSvg(svg); var sv=fig.querySelector("svg"); if (sv){ sv.removeAttribute("width"); sv.removeAttribute("height"); bub.appendChild(fig); return true; } return false; }
  function renderZoi(bub, text){
    var str = String(text);
    var re = /```svg\s*([\s\S]*?)```|(<svg[\s\S]*?<\/svg>)/gi;
    var last = 0, m;
    while ((m = re.exec(str))) { addText(bub, str.slice(last, m.index)); addSvg(bub, m[1] || m[2] || ""); last = re.lastIndex; }
    var rest = str.slice(last);
    var cut = rest.search(/```svg|<svg\b/i);
    if (cut !== -1) {                              // odsečen/nedovršen crtež -> nikad ne pokazuj sirov kod
      addText(bub, rest.slice(0, cut));
      var frag = rest.slice(cut), s0 = frag.search(/<svg\b/i), ok = false;
      if (s0 !== -1) {
        var svg = frag.slice(s0).replace(/```[\s\S]*$/, "").replace(/<[^>]*$/, ""); // skini fence i poslednji odsečen tag
        if (!/<\/svg>/i.test(svg)) svg += "</svg>";
        if (/<(line|circle|rect|path|polygon|polyline|text|ellipse|g)\b/i.test(svg)) ok = addSvg(bub, svg);
      }
      if (!ok) { var note=document.createElement("div"); note.style.cssText="margin-top:6px;color:#8a93a6;font-size:.86em;font-style:italic"; note.textContent=(LANG==="en")?"(the sketch got cut off — ask me to draw a simpler version)":"(crtež je bio predugačak — zamoli me: nacrtaj jednostavniju skicu)"; bub.appendChild(note); }
      return;
    }
    addText(bub, rest);
  }

  // ——— mehurići ———
  function addBub(who, text, imgUrl) {
    var row = document.createElement("div");
    row.className = "zoi-row " + (who === "me" ? "zoi-me" : "zoi-zoi");
    var html = "";
    if (who === "zoi") html += '<img class="zoi-av" src="' + AVATAR + '"/>';
    html += '<div class="zoi-bub"></div>';
    row.innerHTML = html;
    var bub = row.querySelector(".zoi-bub");
    if (who === "zoi") {
      var av = row.querySelector(".zoi-av");
      if (av) av.onerror = function () {
        var s = document.createElement("span");
        s.className = "zoi-av zoi-avfb";
        s.textContent = "👩‍🏫";
        av.replaceWith(s);
      };
    }
    if (text) {
      if (who === "zoi") { renderZoi(bub, text); }
      else { bub.appendChild(document.createTextNode(text)); }
    }
    if (imgUrl) { var im = document.createElement("img"); im.src = imgUrl; bub.appendChild(im); }
    if (who === "zoi" && text) { lastZoiText = text; }
    msgsEl.appendChild(row);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return bub;
  }

  function typing(on) {
    var ex = msgsEl.querySelector(".zoi-typing");
    if (on && !ex) {
      var d = document.createElement("div");
      d.className = "zoi-typing"; d.textContent = String(t().thinking).replace(/Marina/g, NAME);
      msgsEl.appendChild(d); msgsEl.scrollTop = msgsEl.scrollHeight;
    } else if (!on && ex) { ex.remove(); }
  }

  // ——— čišćenje teksta za izgovor ———
  function stripMd(s) {
    return String(s).replace(/\*\*|__|[#`]/g, " ").replace(/[*_]/g, " ");
  }
  // izbaci emojije i sličice iz IZGOVORA (na ekranu ostaju) — da glas ne čita „nasmešeno lice"
  function stripEmoji(s) {
    s = String(s);
    try { s = s.replace(/[\u{1F000}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}]/gu, " "); } catch (e) {}
    s = s.replace(/[\u2190-\u21FF\u2300-\u27BF\u2600-\u26FF\u2B00-\u2BFF\uFE0F\u200D\u20E3]/g, " ");
    return s.replace(/\s{2,}/g, " ");
  }
  // imenovani razlomci: 3/4 -> "3 četvrtine" (TTS pročita "tri četvrtine"), 1/2 -> "jedna polovina"
  function razlomakReci(num, den) {
    var N = { 2: "polovina", 3: "trećina", 4: "četvrtina", 5: "petina", 6: "šestina",
      7: "sedmina", 8: "osmina", 9: "devetina", 10: "desetina", 11: "jedanaestina",
      12: "dvanaestina", 15: "petnaestina", 16: "šesnaestina", 20: "dvadesetina", 100: "stotina" };
    var n = parseInt(num, 10), d = parseInt(den, 10), b = N[d];
    if (!b) return num + " kroz " + den;          // npr. 3/27 -> "tri kroz dvadeset sedam"
    var pl = b.slice(0, -1) + "e";                  // paukal: -a -> -e
    var d2 = n % 100, d1 = n % 10;
    if (n === 1) return "jedna " + b;               // 1/2 -> "jedna polovina"
    if (n === 2) return "dve " + pl;                // 2/3 -> "dve trećine"
    if (d1 >= 2 && d1 <= 4 && !(d2 >= 12 && d2 <= 14)) return num + " " + pl; // 3,4 -> paukal
    return num + " " + b;                            // 5+, 11..14 -> jedninski/gen.mn. oblik
  }
  // izgovor matematike na srpskom (i bs/hr) — simboli -> reči
  // Vraćanje srpskih kvačica za najčešće reči (kad se kuca bez č/ć/š/ž/đ).
  // Potpuno automatsko vraćanje nije moguće (npr. "kuca" = "kuća" ili "kuca"); ovo je rečnik
  // čestih, nedvosmislenih reči — glavni oslonac je da Marina piše sa kvačicama.
  var KVACICE = {
    "cao":"ćao","sta":"šta","nesto":"nešto","nista":"ništa","jos":"još","vec":"već","zasto":"zašto",
    "ucenik":"učenik","ucenica":"učenica","ucenici":"učenici","uci":"uči","ucis":"učiš","ucimo":"učimo",
    "nauci":"nauči","naucis":"naučiš","naucimo":"naučimo",
    "resenje":"rešenje","resenja":"rešenja","resi":"reši","resis":"rešiš","resavamo":"rešavamo","resavanje":"rešavanje","resavaj":"rešavaj",
    "tacno":"tačno","tacan":"tačan","tacna":"tačna","tacne":"tačne","netacno":"netačno",
    "greska":"greška","greske":"greške","gresku":"grešku","pogresno":"pogrešno","pogresan":"pogrešan",
    "racun":"račun","racunamo":"računamo","racunas":"računaš","racunanje":"računanje","izracunaj":"izračunaj","izracunas":"izračunaš","izracunamo":"izračunamo",
    "kolicnik":"količnik","razlicit":"različit","razliciti":"različiti","razlicite":"različite",
    "cetiri":"četiri","cetvrti":"četvrti","cetvrta":"četvrta","cetvrtina":"četvrtina","cetvrtine":"četvrtine",
    "sest":"šest","sesti":"šesti","sestina":"šestina","sestine":"šestine",
    "treci":"treći","treca":"treća","trece":"treće","trecina":"trećina","trecine":"trećine",
    "jednacina":"jednačina","jednacine":"jednačine","jednacinu":"jednačinu","nejednacina":"nejednačina",
    "mnozenje":"množenje","mnozi":"množi","pomnozi":"pomnoži",
    "povrsina":"površina","povrsine":"površine","povrsinu":"površinu",
    "duzina":"dužina","duzine":"dužine","duzi":"duži","sirina":"širina","siri":"širi",
    "pocetak":"početak","pocni":"počni","pocinje":"počinje",
    "zavrsi":"završi","zavrsni":"završni","zavrsava":"završava",
    "vezba":"vežba","vezbaj":"vežbaj","vezbamo":"vežbamo",
    "domaci":"domaći","sledeci":"sledeći","sledeca":"sledeća","sledece":"sledeće",
    "dosao":"došao","dosla":"došla","cesto":"često","obicno":"obično","obican":"običan","znacenje":"značenje",
    "moze":"može","mozes":"možeš","mozemo":"možemo","mozete":"možete",
    "zelim":"želim","zelis":"želiš","zeli":"želi","veci":"veći","veca":"veća",
    "hocu":"hoću","hoces":"hoćeš","hoce":"hoće","necu":"neću","neces":"nećeš","vise":"više","nize":"niže",
    "vazno":"važno","tezi":"teži","tezina":"težina","tezinu":"težinu","pokazi":"pokaži","slicno":"slično","slican":"sličan",
    "naci":"naći","nadji":"nađi","nadjes":"nađeš","nadjemo":"nađemo","precnik":"prečnik","poluprecnik":"poluprečnik","teziste":"težište",
    "kruzni":"kružni","kruznica":"kružnica","izvodjenje":"izvođenje","vezbanje":"vežbanje","ucenje":"učenje","sansa":"šansa","sanse":"šanse",
    "clan":"član","clanovi":"članovi","clanova":"članova","zakljucak":"zaključak","zakljuci":"zaključi","povecaj":"povećaj",
    "resava":"rešava","resen":"rešen","resena":"rešena","reseno":"rešeno","tacka":"tačka","tacke":"tačke","tacku":"tačku","tackama":"tačkama",
    "jedinicni":"jedinični","izlozilac":"izložilac","sredjivanje":"sređivanje","uglovi":"uglovi","jednacinu":"jednačinu"
  };
  function vratiKvacice(s) {
    return String(s).replace(/[A-Za-z]+/g, function (w) {
      var r = KVACICE[w.toLowerCase()];
      if (!r) return w;
      return (w[0] >= "A" && w[0] <= "Z") ? r.charAt(0).toUpperCase() + r.slice(1) : r;
    });
  }
  function mathSr(s) {
    s = vratiKvacice(s);
    s = s.replace(/([Ss])h/g, "$1-h"); // „sh" -> „s-h" da se ne čita kao „š" (ishod, ishrana, shvatiti)
    s = " " + s + " ";
    // skraćenice
    s = s.replace(/\btj\.?/gi, " to jest ").replace(/\bnpr\.?/gi, " na primer ").replace(/\bitd\.?/gi, " i tako dalje ").replace(/\btzv\.?/gi, " takozvani ");
    // decimalni zarez: 3,14 -> "tri zapeta četrnaest" (samo bez razmaka, da ne hvata nabrajanje)
    s = s.replace(/(\d),(\d)/g, "$1 zapeta $2");
    // jedinice (pre stepena i pre "/" da se ne pročita "m kroz s")
    s = s.replace(/°\s*C\b/g, " stepeni Celzijusa ");
    s = s.replace(/\bkm\s*\/\s*h\b/g, " kilometara na čas ");
    s = s.replace(/\bm\s*\/\s*s\s*(?:²|\^\s*2)\b/g, " metara u sekundi na kvadrat ");
    s = s.replace(/\bm\s*\/\s*s\b/g, " metara u sekundi ");
    // grčka slova -> srpski izgovor (npr. „sin α" -> „sinus alfa"); π se rešava niže kao „pi"
    s = s.replace(/[αΑ]/g, " alfa ").replace(/[βΒ]/g, " beta ").replace(/[γΓ]/g, " gama ")
         .replace(/[δΔ]/g, " delta ").replace(/[εΕ]/g, " epsilon ").replace(/[θΘϑ]/g, " teta ")
         .replace(/[λΛ]/g, " lambda ").replace(/[μµ]/g, " mi ").replace(/[ρ]/g, " ro ")
         .replace(/Σ/g, " suma ").replace(/[σς]/g, " sigma ").replace(/[τ]/g, " tau ").replace(/[φΦϕ]/g, " fi ")
         .replace(/[ψΨ]/g, " psi ").replace(/[ωΩ]/g, " omega ");
    // brojevni skupovi (unicode) i logika skupova (oblast „skupovi" na FTN-u)
    s = s.replace(/ℕ/g, " skup prirodnih brojeva ").replace(/ℤ/g, " skup celih brojeva ")
         .replace(/ℚ/g, " skup racionalnih brojeva ").replace(/ℝ/g, " skup realnih brojeva ")
         .replace(/ℂ/g, " skup kompleksnih brojeva ");
    s = s.replace(/∈/g, " pripada ").replace(/∉/g, " ne pripada ")
         .replace(/[⊆⊂]/g, " podskup od ").replace(/[⊇⊃]/g, " nadskup od ")
         .replace(/∪/g, " unija ").replace(/∩/g, " presek ").replace(/∅/g, " prazan skup ")
         .replace(/∀/g, " za svako ").replace(/∃/g, " postoji ");
    // apsolutna vrednost |x| -> „apsolutna vrednost iks"
    s = s.replace(/\|\s*([^|]{1,40}?)\s*\|/g, " apsolutna vrednost $1 ");
    // analiza: integral, suma/proizvod, parcijalni izvod
    s = s.replace(/[∫∮]/g, " integral ").replace(/∏/g, " proizvod ").replace(/∂/g, " parcijalno ");
    // funkcije f(x), f''(x), f'(x) -> „ef od iks", „ef drugi izvod od iks", „ef prim od iks" (i g, h)
    s = s.replace(/\bf\s*(?:['′]{2}|[″‴])\s*\(/g, " ef drugi izvod od ").replace(/\bf\s*['′]\s*\(/g, " ef prim od ").replace(/\bf\s*\(/g, " ef od ");
    s = s.replace(/\bg\s*['′]\s*\(/g, " ge prim od ").replace(/\bg\s*\(/g, " ge od ");
    s = s.replace(/\bh\s*\(/g, " ha od ");
    // funkcije -> reči (sin samo kad ima argument, da ne pokvari reč „sin")
    s = s.replace(/\bcos\b/g, " kosinus ");
    s = s.replace(/\bsin(?=\s*[(²³^]|\s+[A-Za-z0-9])/g, " sinus ");
    s = s.replace(/\btg\b/g, " tangens ");
    s = s.replace(/\b(?:ctg|cot)\b/g, " kotangens ");
    s = s.replace(/\bln\b/g, " prirodni logaritam ");
    s = s.replace(/\blog\b/g, " logaritam ");
    // arkus-funkcije, limes, faktorijel
    s = s.replace(/\barcsin\b/g, " arkus sinus ").replace(/\barccos\b/g, " arkus kosinus ")
         .replace(/\barctg\b/g, " arkus tangens ").replace(/\barctan\b/g, " arkus tangens ");
    s = s.replace(/\blim\b/g, " limes ");
    // koreni
    s = s.replace(/∛\s*/g, " treći koren iz ");
    s = s.replace(/√\s*/g, " koren iz ");
    // stepeni
    s = s.replace(/\^\s*2\b/g, " na kvadrat ");
    s = s.replace(/\^\s*3\b/g, " na treći stepen ");
    s = s.replace(/\^\s*4\b/g, " na četvrti stepen ");
    s = s.replace(/\^\s*\(([^)]*)\)/g, " na stepen $1 ");
    s = s.replace(/\^\s*([0-9]+)/g, " na $1. stepen ");
    s = s.replace(/\^\s*([A-Za-z]+)/g, " na $1 ");
    s = s.replace(/²/g, " na kvadrat ");
    s = s.replace(/³/g, " na treći stepen ");
    // indeks: x_1 -> iks indeks 1
    s = s.replace(/_\s*\{?([0-9A-Za-z]+)\}?/g, " $1 ");
    // poređenja i operacije
    // implikacije (ASCII) pre znakova <,>,=
    s = s.replace(/<=>/g, " ako i samo ako ").replace(/=>/g, " sledi ");
    s = s.replace(/<=/g, " manje ili jednako ");
    s = s.replace(/>=/g, " veće ili jednako ");
    s = s.replace(/!=/g, " nije jednako ");
    s = s.replace(/≈/g, " približno jednako ");
    s = s.replace(/≠/g, " nije jednako ");
    s = s.replace(/≤/g, " manje ili jednako ");
    s = s.replace(/≥/g, " veće ili jednako ");
    s = s.replace(/=/g, " jednako ");
    s = s.replace(/</g, " manje od ");
    s = s.replace(/>/g, " veće od ");
    s = s.replace(/±/g, " plus minus ");
    s = s.replace(/[·×∙•*]/g, " puta ");
    s = s.replace(/÷/g, " podeljeno sa ");
    s = s.replace(/%/g, " posto ");
    s = s.replace(/π/g, " pi ");
    s = s.replace(/∞/g, " beskonačno ");
    s = s.replace(/°/g, " stepeni ");
    s = s.replace(/[()\[\]{}]/g, " ");
    // faktorijel: 5! -> „5 faktorijel", n! -> „en faktorijel" (pre razlomka, da „!" ne smeta kosoj crti)
    s = s.replace(/(\d)\s*!/g, "$1 faktorijel ");
    s = s.replace(/\b([nmk])\s*!/g, "$1 faktorijel ");
    // razlomak: brojni a/b -> imenovan ("3/4" -> "3 četvrtine")
    s = s.replace(/(\d+)\s*\/\s*(\d+)/g, function (_, a, b) { return " " + razlomakReci(a, b) + " "; });
    // ostala kosa crta: razlomak/deljenje -> "kroz" (ima cifru ili je promenljiva); samo reč/reč -> "ili" (npr. „došao/la")
    s = s.replace(/([0-9A-Za-zčćžšđČĆŽŠĐ]+)\s*\/\s*([0-9A-Za-zčćžšđČĆŽŠĐ]+)/g, function (_, a, b) {
      var mat = /\d/.test(a) || /\d/.test(b) || a.length <= 1 || b.length <= 1;
      return mat ? (a + " kroz " + b) : (a + " ili " + b);
    });
    // plus / minus
    s = s.replace(/\+/g, " plus ");
    // crtice: „minus" SAMO kao pravi matematički znak; razmaknuta/duga crta = pauza; složenice ostaju
    s = s.replace(/(^|\n)[ \t]*[-–—][ \t]+/g, "$1 ");               // crtice nabrajanja (liste) -> bez crtice
    s = s.replace(/−/g, " minus ");                                 // pravi znak minus (U+2212)
    s = s.replace(/\s*[—–]\s*/g, ", ");                              // duga crta (em/en) = pauza, nikad minus
    s = s.replace(/([0-9A-Za-zπčćžšđČĆŽŠĐ]+)(\s*)-(\s*)(?=([0-9A-Za-zπčćžšđČĆŽŠĐ]+))/g, function (m, a, sp1, sp2, b) {
      var aMath = /\d/.test(a) || a.length <= 1;                    // levo: broj ili jednoslovna promenljiva?
      var bMath = /\d/.test(b) || b.length <= 1;
      if (aMath && bMath) return a + " minus ";                     // oduzimanje: 5-3, x-1, n-1, 2x-5
      if (!sp2 && /^\d/.test(b) && sp1) return a + " minus ";        // „reč -5" = negativan broj
      if (sp1 || sp2) return a + ", ";                              // razmaknuta crta posle reči = pauza
      return a + "-";                                              // spojena složenica ostaje (crno-belo, is-hod)
    });
    s = s.replace(/(^|[\s(=+*/,])-(?=\d)/g, "$1minus ");             // predznak zalepljen za broj (bez levog operanda)
    s = s.replace(/\s-\s/g, ", ");                                  // preostala razmaknuta crtica = pauza
    // implicitno množenje: 2x -> 2 iks, 4ac -> 4 ac
    s = s.replace(/(\d)(?=[A-Za-zπ])/g, "$1 ");
    // slovo Q -> "ku" (da ne čita "kju"); ako Q kod tebe znači skup racionalnih, vidi napomenu
    s = s.replace(/\bQ\b/g, " ku ");
    // usamljeno slovo „v" (opcija a/b/v/g, ili promenljiva) -> „ve" (da ne čita „volt")
    s = s.replace(/\bv\b/g, " ve ");
    // promenljive bez srpskog ekvivalenta -> uvek matematika
    s = s.replace(/[xX]/g, " iks ");
    s = s.replace(/[yY]/g, " ipsilon ");
    return s.replace(/\s{2,}/g, " ").trim();
  }
  function clean(text) {
    text = String(text == null ? "" : text).normalize("NFC"); // spoji rastavljene kvačice (Ć, Č, Š…)
    text = text.replace(/```svg[\s\S]*?```/gi, " ").replace(/```[\s\S]*?```/gi, " ").replace(/<svg[\s\S]*?<\/svg>/gi, " "); // crteži se ne čitaju
    if (LANG === "sr" || LANG === "bs" || LANG === "hr") {
      // strelice nose značenje (limesi/implikacije) — obradi ih PRE stripEmoji koji bi ih obrisao
      var s = stripMd(text)
        .replace(/([A-Za-z0-9)\]∞])\s*[→⟶]\s*/g, "$1 teži ka ") // x→0, n→∞
        .replace(/[⇒⟹]/g, " sledi ").replace(/⇔/g, " ako i samo ako ");
      s = stripEmoji(s);
      s = s.replace(/\bFTN\b/g, "Fakultet tehničkih nauka"); // da ne čita „ef-ti-en"
      return mathSr(s);
    }
    var e = stripEmoji(stripMd(text));
    return e.replace(/\^2(?![0-9])/g, "²").replace(/\^3(?![0-9])/g, "³")
            .replace(/\^/g, " ").replace(/\s{2,}/g, " ").trim();
  }

  // ——— glas (TTS) ———
  var synth = window.speechSynthesis || null;
  var voices = [];
  var curBtn = null;
  var curAudio = null;          // trenutni izvor zvuka
  // Web Audio — najpouzdaniji način da Safari pusti preuzeti (Azure) zvuk
  var AC = window.AudioContext || window.webkitAudioContext || null;
  var actx = null, curSrc = null;
  function ensureCtx() {
    if (!AC) return null;
    if (!actx) { try { actx = new AC(); } catch (e) { actx = null; } }
    return actx;
  }
  function primeAudio() {        // MORA unutar klika (sinhrono) — otključava zvuk u Safariju
    var c = ensureCtx(); if (!c) return;
    try { if (c.state === "suspended") c.resume(); } catch (e) {}
    try { var bb = c.createBuffer(1, 1, 22050); var ss = c.createBufferSource(); ss.buffer = bb; ss.connect(c.destination); ss.start(0); } catch (e) {}
  }
  function loadVoices() { try { voices = (synth && synth.getVoices()) || []; } catch (e) {} }
  loadVoices();
  if (synth && typeof synth.onvoiceschanged !== "undefined") synth.onvoiceschanged = loadVoices;

  // za srpski/bosanski/hrvatski koristi srodan glas ako tačnog nema
  var VFALL = { sr: ["sr","hr"], hr: ["hr","sr"], sk: ["sk","cs"], de: ["de"], el: ["el"], en: ["en"], hu: ["hu"], ro: ["ro"], es: ["es"], fr: ["fr"] };
  function pickVoice(code) {
    if (!voices.length) loadVoices();
    var chain = VFALL[code] || [code];
    for (var i = 0; i < chain.length; i++) {
      var pre = chain[i];
      for (var j = 0; j < voices.length; j++) {
        var L = (voices[j].lang || "").toLowerCase().replace("_", "-");
        if (L.indexOf(pre) === 0) return voices[j];
      }
    }
    return null;
  }
  function stopSpeak() {
    try { if (synth) synth.cancel(); } catch (e) {}
    if (curSrc) { try { curSrc.onended = null; curSrc.stop(0); } catch (e) {} curSrc = null; }
    curAudio = null;
    if (curBtn) { curBtn.textContent = "🔊"; curBtn = null; }
  }
  function deviceSpeak(text, btn) {            // rezerva: glas uređaja
    if (!synth) { if (btn) btn.textContent = "🔊"; return; }
    loadVoices();
    var u = new SpeechSynthesisUtterance(clean(text));
    var v = pickVoice(LANG);
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = SPEAK[LANG] || "sr-RS"; }
    u.rate = 0.98;
    if (btn) {
      curBtn = btn; btn.textContent = "⏹";
      u.onend = function () { if (curBtn === btn) curBtn = null; if (btn) btn.textContent = "🔊"; };
      u.onerror = function () { if (curBtn === btn) curBtn = null; if (btn) btn.textContent = "🔊"; };
    }
    try { synth.speak(u); } catch (e) {}
  }
  function speakNow(text, btn) {
    stopSpeak();
    primeAudio();                       // otključaj zvuk JOŠ unutar klika (Safari)
    if (btn) { curBtn = btn; btn.textContent = "⏹"; }
    var spoken = clean(text);
    var c = ensureCtx();
    if (!c) { deviceSpeak(text, btn); return; }
    // 1) Azure glas (isti za sve uređaje); 2) ako zakaže -> glas uređaja
    var ttsBody = { text: spoken, lang: LANG, voice: VOICE };
    if (RATE) ttsBody.speed = RATE;
    fetch(TTS, { method: "POST", headers: { "Content-Type": "application/json" },
                 body: JSON.stringify(ttsBody) })
      .then(function (r) { if (!r.ok) throw 0; return r.arrayBuffer(); })
      .then(function (buf) {
        if (!buf || buf.byteLength < 256) throw 0;
        if (curBtn !== btn) throw "stop";
        return new Promise(function (resolve, reject) {
          try { c.decodeAudioData(buf, resolve, function () { reject(0); }); } catch (e) { reject(0); }
        });
      })
      .then(function (audioBuf) {
        if (curBtn !== btn) return;
        try { if (c.state === "suspended") c.resume(); } catch (e) {}
        var src = c.createBufferSource();
        src.buffer = audioBuf; src.connect(c.destination);
        src.onended = function () { if (curSrc === src) curSrc = null; if (curBtn === btn) curBtn = null; if (btn) btn.textContent = "🔊"; };
        curSrc = src; curAudio = src;
        try { src.start(0); } catch (e) { deviceSpeak(text, btn); }
      })
      .catch(function (e) { if (e === "stop") return; deviceSpeak(text, btn); });
  }
  function speak(text) { /* klon nema voice */ }

  // ——— slanje ———
  function send() {
    var txt = (taEl.value || "").trim();
    if (!txt && !attachment) return;

    addBub("me", txt, attachment ? attachment.url : null);

    var content;
    if (attachment) {
      content = [];
      if (txt) content.push({ type: "text", text: txt });
      content.push({ type: "image", source: { type: "base64", media_type: attachment.media_type, data: attachment.data } });
    } else {
      content = txt;
    }
    history.push({ role: "user", content: content });

    taEl.value = ""; clearAttach();
    typing(true); goEl.disabled = true;

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: MODE, lang: LANG, messages: history }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        typing(false); goEl.disabled = false;
        if (data.error) { addBub("zoi", "⚠️ " + data.error); return; }
        var reply = data.text || "…";
        history.push({ role: "assistant", content: reply });
        addBub("zoi", reply);
        speak(reply);
      })
      .catch(function () {
        typing(false); goEl.disabled = false;
        addBub("zoi", "⚠️ Veza je zapela. Pokušaj ponovo.");
      });
  }

  // ——— slika ———
  function clearAttach() { attachment = null; prevEl.style.display = "none"; fileEl.value = ""; }
  fileEl.addEventListener("change", function () {
    var f = fileEl.files && fileEl.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      var url = rd.result;
      attachment = { media_type: f.type || "image/jpeg", data: String(url).split(",")[1], url: url };
      prevImg.src = url; prevName.textContent = f.name || "slika"; prevEl.style.display = "flex";
    };
    rd.readAsDataURL(f);
  });
  $("#zoi-prev-x").onclick = clearAttach;
  $("#zoi-photo").onclick = function () { fileEl.click(); };
  (function(){
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    var micBtn = $("#zoi-mic");
    if (!SR || !micBtn) { if (micBtn) micBtn.style.display = "none"; return; }
    var rec = null, listening = false;
    var LMAP = { sr:"sr-RS", en:"en-US", de:"de-DE", fr:"fr-FR", es:"es-ES", it:"it-IT", ru:"ru-RU", pt:"pt-PT" };
    micBtn.onclick = function(){
      if (listening && rec) { try { rec.stop(); } catch(_){} return; }
      try { rec = new SR(); } catch(_){ return; }
      rec.lang = LMAP[LANG] || "sr-RS"; rec.interimResults = false; rec.maxAlternatives = 1;
      listening = true; micBtn.style.background = "rgba(214,90,90,.30)";
      rec.onresult = function(e){ var t = e.results[0][0].transcript || ""; taEl.value = (taEl.value ? taEl.value + " " : "") + t; taEl.focus(); };
      rec.onend = function(){ listening = false; micBtn.style.background = ""; };
      rec.onerror = function(){ listening = false; micBtn.style.background = ""; };
      try { rec.start(); } catch(_){ listening = false; micBtn.style.background = ""; }
    };
  })();

  // ——— događaji ———
  btn.onclick = function () { panel.classList.toggle("zoi-open"); var op=panel.classList.contains("zoi-open"); cta.classList.toggle("zoi-hide", op); if(op) taEl.focus(); };
  $("#zoi-x").onclick = function () { panel.classList.remove("zoi-open"); cta.classList.remove("zoi-hide"); stopSpeak(); };
  goEl.onclick = send;
  taEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  });
  taEl.addEventListener("input", function () {
    taEl.style.height = "auto"; taEl.style.height = Math.min(taEl.scrollHeight, 96) + "px";
  });
  langEl.onchange = function () { stopSpeak(); LANG = langEl.value; applyLang(); greet(); history = []; };
  window.addEventListener("mathia:lang", function (e) {
    var l = e && e.detail; if (!l) return; l = String(l).toLowerCase();
    if (l === LANG) return;
    LANG = l; stopSpeak();
    try { if (langEl) langEl.value = l.toUpperCase(); } catch (_) {}
    applyLang(); greet(); history = [];
  });
  if (voiceBtn) voiceBtn.onclick = function () { voiceOn = false; };

  // ——— start ———
  applyLang();
  greet();
})();
