/* widget.js — Zoi (dvojezično SR/EN) / bilingual embeddable widget
   <script src="https://TVOJ.vercel.app/widget.js"
           data-mode="site"  (ili "ftn")
           data-lang="sr"    (ili "en")
           data-avatar="https://i.postimg.cc/.../slika.png"
           data-api="https://TVOJ.vercel.app/api/chat"></script>
   Shadow DOM — ne kvari stil tvoje stranice. */
(function () {
  var s = document.currentScript;
  var MODE = (s && s.getAttribute("data-mode")) || "site";
  var LANG = (s && s.getAttribute("data-lang")) || "sr";
  var AVATAR = (s && s.getAttribute("data-avatar")) || "https://i.postimg.cc/qBXWmBQf/Chat-GPT-Image-6-jun-2026-11-58-24.png";
  var API = (s && s.getAttribute("data-api")) || "/api/chat";

  var T = {
    sr: {
      sub: "profesorica", send: "Pošalji", ready: "Slika spremna", remove: "Ukloni",
      ph: { site: "Napiši pitanje...", ftn: "Napiši zadatak ili pošalji sliku..." },
      greet: {
        site: "Zdravo! Ja sam Zoi, tvoja profesorica na MathIA platformi. Tu sam da ti pomognem oko priprema, kurseva i izbora smera. Kako mogu da ti pomognem? Slobodno mi piši na bilo kom jeziku.",
        ftn: "Zdravo! Ja sam Zoi, tvoja profesorica za pripremu FTN prijemnog iz matematike. Tu sam da ti objasnim zadatke korak po korak i pomognem oko gradiva. Kako mogu da ti pomognem? Napiši zadatak ili pošalji 📷 sliku. Slobodno mi piši na bilo kom jeziku."
      },
      quick: {
        site: [["Koje predmete pokrivate?", "Koje predmete pokrivate?"], ["Kako funkcioniše?", "Kako funkcioniše platforma?"], ["Priprema za prijemni?", "Šta je priprema za prijemni?"], ["Drugi jezik?", "Na kojim jezicima mogu da pišem sa tobom?"]],
        ftn: [["Napiši zadatak", "__fill:Imam zadatak: "], ["📷 Slika", "__file"], ["Objasni pojam", "Objasni mi jedan pojam za FTN prijemni."], ["Drugi jezik?", "Na kojim jezicima mogu da pišem sa tobom?"]]
      },
      net: "Veza je zapela. Pokušaj ponovo."
    },
    en: {
      sub: "teacher", send: "Send", ready: "Image ready", remove: "Remove",
      ph: { site: "Ask a question...", ftn: "Type a problem or send a photo..." },
      greet: {
        site: "Hi! I'm Zoi, your teacher on the MathIA platform. I'm here to help with prep, courses, and choosing the right track. How can I help you? Feel free to write in any language.",
        ftn: "Hi! I'm Zoi, your teacher for FTN entrance-exam math prep. I'm here to explain problems step by step and help with the material. How can I help? Type a problem or send a 📷 photo. Feel free to write in any language."
      },
      quick: {
        site: [["What subjects?", "What subjects do you cover?"], ["How does it work?", "How does the platform work?"], ["Exam prep?", "What is exam preparation?"], ["Other language?", "What languages can I chat with you in?"]],
        ftn: [["Type a problem", "__fill:I have a problem: "], ["📷 Photo", "__file"], ["Explain a concept", "Explain one concept for the FTN entrance exam."], ["Other language?", "What languages can I chat with you in?"]]
      },
      net: "Connection failed. Please try again."
    }
  };
  function t() { return T[LANG] || T.sr; }

  var state = { open: false, messages: [{ role: "assistant", content: t().greet[MODE] }], attachment: null, voiceOn: true, loading: false, listening: false };

  var host = document.createElement("div"); host.id = "zoi-widget-host"; document.body.appendChild(host);
  var root = host.attachShadow({ mode: "open" });

  var css = "*{box-sizing:border-box}"
    + ".launcher{position:fixed;right:18px;bottom:18px;width:62px;height:62px;border-radius:50%;border:none;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.22);overflow:hidden;padding:0;background:#C75B39;z-index:2147483000}"
    + ".launcher img{width:100%;height:100%;object-fit:cover}"
    + ".panel{position:fixed;right:18px;bottom:90px;width:360px;max-width:calc(100vw - 28px);height:560px;max-height:calc(100vh - 120px);background:#FBF6EE;border:1px solid #E7DDCD;border-radius:18px;box-shadow:0 16px 48px rgba(0,0,0,.25);display:none;flex-direction:column;overflow:hidden;z-index:2147483000;font-family:'Nunito',system-ui,sans-serif;color:#2C2620}"
    + ".panel.open{display:flex}"
    + ".hd{background:#FFFDF9;border-bottom:1px solid #E7DDCD;padding:12px 14px;display:flex;align-items:center;justify-content:space-between}"
    + ".hl{display:flex;align-items:center;gap:10px}.av{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #F0E0D6}.av.sm{width:26px;height:26px;border-width:1px}"
    + ".nm{font-size:17px;font-weight:800;line-height:1.1}.su{font-size:11.5px;color:#6B6256;font-weight:700}"
    + ".hb{border:1px solid #E7DDCD;background:#FBF6EE;border-radius:10px;padding:6px 9px;font-size:13px;font-weight:800;cursor:pointer;color:#2C2620}.hb.on{background:#F0E0D6}"
    + ".body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}"
    + ".m{display:flex;align-items:flex-end;gap:7px}.m.u{justify-content:flex-end}"
    + ".bub{max-width:82%;padding:10px 13px;border-radius:15px;font-size:14.5px;line-height:1.45;white-space:pre-wrap;word-wrap:break-word}"
    + ".bub.bot{background:#FFFDF9;border:1px solid #E7DDCD;border-bottom-left-radius:4px}.bub.me{background:#C75B39;color:#fff;border-bottom-right-radius:4px}"
    + ".bub img{display:block;max-width:100%;border-radius:9px;margin-bottom:7px}"
    + ".dots span{width:6px;height:6px;border-radius:50%;background:#C75B39;display:inline-block;margin-right:4px;animation:bl 1.2s infinite}@keyframes bl{0%,80%,100%{opacity:.25}40%{opacity:1}}"
    + ".chips{display:flex;gap:7px;padding:0 14px 8px;flex-wrap:wrap}.chip{border:1px solid #E7DDCD;background:#FFFDF9;border-radius:999px;padding:6px 11px;font-size:12.5px;font-weight:700;cursor:pointer;color:#2C2620;font-family:inherit}"
    + ".pv{padding:0 14px 6px;display:flex;align-items:center;gap:8px}.pv img{width:40px;height:40px;border-radius:7px;object-fit:cover;border:1px solid #E7DDCD}.pv .rm{border:none;background:none;color:#C75B39;font-weight:800;cursor:pointer;font-size:12.5px}"
    + ".ir{background:#FFFDF9;border-top:1px solid #E7DDCD;padding:10px 12px;display:flex;gap:7px;align-items:flex-end}"
    + ".ib{border:1px solid #E7DDCD;background:#FBF6EE;border-radius:12px;padding:9px 11px;font-size:15px;cursor:pointer;color:#2C2620}.ib.listening{background:#C75B39;color:#fff}"
    + "textarea{flex:1;resize:none;max-height:110px;border:1px solid #E7DDCD;border-radius:12px;padding:10px 12px;font-family:inherit;font-size:14.5px;color:#2C2620;background:#FBF6EE}"
    + ".snd{background:#C75B39;color:#fff;border:none;border-radius:12px;padding:10px 14px;font-size:14.5px;font-weight:800;cursor:pointer;font-family:inherit}.snd:disabled{background:#E7DDCD;cursor:default}"
    + "::placeholder{color:#A99E8E}@media(max-width:420px){.panel{right:8px;left:8px;width:auto;bottom:84px}}";

  root.innerHTML =
    '<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">'
    + "<style>" + css + "</style>"
    + '<button class="launcher" id="lz"><img src="' + AVATAR + '" alt="Zoi"></button>'
    + '<div class="panel" id="pz"><div class="hd"><div class="hl"><img class="av" src="' + AVATAR + '"><div><div class="nm">Zoi</div><div class="su" id="suz"></div></div></div>'
    + '<div style="display:flex;gap:6px"><button class="hb" id="lgz"></button><button class="hb on" id="vz">🔊</button><button class="hb" id="cz">✕</button></div></div>'
    + '<div class="body" id="bz"></div><div class="chips" id="qz"></div><div class="pv" id="pvz" style="display:none"></div>'
    + '<div class="ir"><input type="file" accept="image/*" id="fz" style="display:none"><button class="ib" id="az" style="display:none">📎</button>'
    + '<button class="ib" id="mz" style="display:none">🎤</button><textarea id="tz" rows="1"></textarea><button class="snd" id="sz" disabled></button></div></div>';

  var $ = function (id) { return root.getElementById(id); };
  var body = $("bz"), chips = $("qz"), tz = $("tz"), sz = $("sz"), pvz = $("pvz");

  function esc(x) { return String(x).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function applyText() {
    $("suz").textContent = t().sub; sz.textContent = t().send; tz.placeholder = t().ph[MODE];
    $("lgz").textContent = LANG === "sr" ? "EN" : "SR";
  }
  function render() {
    body.innerHTML = "";
    state.messages.forEach(function (m) {
      var w = document.createElement("div"); w.className = "m " + (m.role === "user" ? "u" : "");
      if (m.role !== "user") { var a = document.createElement("img"); a.className = "av sm"; a.src = AVATAR; w.appendChild(a); }
      var b = document.createElement("div"); b.className = "bub " + (m.role === "user" ? "me" : "bot");
      var h = ""; if (m.image) h += '<img src="' + m.image.dataUrl + '">'; h += esc(m.content || ""); b.innerHTML = h; w.appendChild(b); body.appendChild(w);
    });
    if (state.loading) { var w2 = document.createElement("div"); w2.className = "m"; var a2 = document.createElement("img"); a2.className = "av sm"; a2.src = AVATAR; w2.appendChild(a2);
      var b2 = document.createElement("div"); b2.className = "bub bot"; b2.innerHTML = '<span class="dots"><span></span><span style="animation-delay:.2s"></span><span style="animation-delay:.4s"></span></span>'; w2.appendChild(b2); body.appendChild(w2); }
    body.scrollTop = body.scrollHeight;
  }
  function renderChips() {
    chips.innerHTML = "";
    t().quick[MODE].forEach(function (q) {
      var c = document.createElement("button"); c.className = "chip"; c.textContent = q[0];
      c.onclick = function () { var v = q[1]; if (v === "__file") $("fz").click(); else if (v.indexOf("__fill:") === 0) { tz.value = v.slice(7); tz.focus(); upd(); } else send(v); };
      chips.appendChild(c);
    });
  }
  function speak(x) {
    if (!state.voiceOn || !window.speechSynthesis) return;
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(x); var vs = speechSynthesis.getVoices();
      var v;
      if (LANG === "en") { var fe = /(female|Samantha|Zira|Jenny|Aria|Joanna|Salli|Emma|Sonia)/i; v = vs.find(function (z) { return /^en/i.test(z.lang) && fe.test(z.name); }) || vs.find(function (z) { return /^en/i.test(z.lang); }); }
      else {
        // Prednost: glas "Lana" (hrvatski) — najprirodniji za naš jezik na Mac-u
        v = vs.find(function (z) { return /lana/i.test(z.name); })
          || vs.find(function (z) { return /^hr/i.test(z.lang); })
          || vs.find(function (z) { return /^sr|^bs/i.test(z.lang); })
          || vs.find(function (z) { var fs = /(female|žensk|Milena|Maja|Ana|Lucia|Petra)/i; return fs.test(z.name); });
      }
      if (v) u.voice = v; u.lang = (v && v.lang) || (LANG === "en" ? "en-US" : "hr-HR"); u.rate = 0.95; u.pitch = 1.12; speechSynthesis.speak(u);
    } catch (e) {}
  }
  if ("speechSynthesis" in window) speechSynthesis.getVoices();
  function upd() { sz.disabled = state.loading || (!tz.value.trim() && !state.attachment); }

  async function send(forced) {
    var content = (forced !== undefined ? forced : tz.value).trim();
    if ((!content && !state.attachment) || state.loading) return;
    state.messages.push({ role: "user", content: content || (LANG === "en" ? "Help me with this problem from the photo." : "Pomozi mi sa ovim zadatkom sa slike."), image: state.attachment });
    tz.value = ""; state.attachment = null; pvz.style.display = "none"; state.loading = true; upd(); render();
    try {
      var apiMessages = state.messages.map(function (m) {
        return m.image
          ? { role: m.role, content: [{ type: "text", text: m.content }, { type: "image", source: { type: "base64", media_type: m.image.mediaType, data: m.image.base64 } }] }
          : { role: m.role, content: m.content };
      });
      var res = await fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mode: MODE, lang: LANG, messages: apiMessages }) });
      var data = await res.json();
      var reply = (!res.ok || data.error) ? ("⚠️ " + (data.detail || data.error || ("HTTP " + res.status))) : (data.text || "…");
      state.messages.push({ role: "assistant", content: reply }); if (res.ok && !data.error) speak(reply);
    } catch (e) { state.messages.push({ role: "assistant", content: t().net }); }
    finally { state.loading = false; upd(); render(); }
  }

  $("lz").onclick = function () { state.open = !state.open; $("pz").classList.toggle("open", state.open); };
  $("cz").onclick = function () { state.open = false; $("pz").classList.remove("open"); };
  $("vz").onclick = function () { state.voiceOn = !state.voiceOn; if (!state.voiceOn && window.speechSynthesis) speechSynthesis.cancel(); $("vz").classList.toggle("on", state.voiceOn); $("vz").textContent = state.voiceOn ? "🔊" : "🔇"; };
  $("lgz").onclick = function () { LANG = (LANG === "sr") ? "en" : "sr"; if (window.speechSynthesis) speechSynthesis.cancel(); state.messages = [{ role: "assistant", content: t().greet[MODE] }]; applyText(); renderChips(); render(); };
  $("az").onclick = function () { $("fz").click(); };
  $("fz").onchange = function (e) {
    var f = e.target.files && e.target.files[0]; if (!f) return;
    var r = new FileReader(); r.onload = function () { var d = r.result; state.attachment = { dataUrl: d, base64: String(d).split(",")[1], mediaType: f.type || "image/jpeg" };
      pvz.style.display = "flex"; pvz.innerHTML = '<img src="' + d + '"><span style="font-size:12.5px;color:#6B6256;font-weight:700;flex:1">' + t().ready + '</span><button class="rm">' + t().remove + '</button>';
      pvz.querySelector(".rm").onclick = function () { state.attachment = null; pvz.style.display = "none"; upd(); }; upd(); };
    r.readAsDataURL(f); e.target.value = "";
  };
  tz.addEventListener("input", upd);
  tz.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } });
  sz.onclick = function () { send(); };

  var SR = window.SpeechRecognition || window.webkitSpeechRecognition, recog = null;
  if (SR) { $("mz").style.display = "block"; $("mz").onclick = function () {
      if (state.listening) { recog && recog.stop(); return; }
      recog = new SR(); recog.lang = LANG === "en" ? "en-US" : "sr-RS"; recog.interimResults = false;
      recog.onresult = function (e) { tz.value = (tz.value ? tz.value + " " : "") + e.results[0][0].transcript; upd(); };
      recog.onend = function () { state.listening = false; $("mz").classList.remove("listening"); };
      recog.onerror = function () { state.listening = false; $("mz").classList.remove("listening"); };
      state.listening = true; $("mz").classList.add("listening"); recog.start();
    }; }

  if (MODE === "ftn") $("az").style.display = "block";
  applyText(); renderChips(); render();
})();
