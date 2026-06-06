# Zoi · MathIA (widget verzija)

Zoi se **ugrađuje u tvoje postojeće stranice** kao malo dugme u uglu (chat). Tvoje stranice ostaju onakve kakve jesu — samo dodaš jednu liniju.

- na **početnoj** strani: opšta pitanja o platformi → `data-mode="site"`
- na strani za **prijemni**: zadaci (uključujući slanje slike) → `data-mode="ftn"`

## Fajlovi
- `widget.js` — sam widget (ubacuje se u tvoje stranice)
- `api/chat.js` — backend koji **čuva tajni API ključ** i Zoine promptove
- `index.html`, `prijemni.html` — PRIMERI kako izgleda ugradnja (slobodno obriši ako koristiš svoje stranice)
- `package.json`, `.gitignore`

> ⚠️ API ključ NIKAD ne ide u kod ni na GitHub — samo u Vercel kao tajna varijabla.

---

## Postavljanje (korak po korak)

### 1) Repo na GitHub-u
github.com → New repository (npr. `zoi-mathia`) → **Add file → Upload files** → ubaci sve fajlove + folder `api` (sa `chat.js`). Commit.

### 2) Vercel
vercel.com (prijava preko GitHub-a) → Add New… → Project → izaberi repo → Import → **Deploy**.

### 3) Tajni ključ
Vercel projekat → Settings → Environment Variables:
- Name: `ANTHROPIC_API_KEY`
- Value: ključ sa console.anthropic.com (treba i Billing — plaća se po upotrebi)
Pa **Redeploy**.

Dobiješ link tipa `https://zoi-mathia.vercel.app`. Otvori `/` i `/prijemni.html` da testiraš.

---

## Kako da ubaciš Zoi u SVOJE postojeće stranice

Na **početnu stranicu**, pred kraj `</body>`, nalepi:
```html
<script src="https://zoi-mathia.vercel.app/widget.js"
        data-mode="site"
        data-avatar="https://i.postimg.cc/qBXWmBQf/Chat-GPT-Image-6-jun-2026-11-58-24.png"
        data-api="https://zoi-mathia.vercel.app/api/chat"></script>
```

Na **stranicu za prijemni**, isto, samo `data-mode="ftn"`:
```html
<script src="https://zoi-mathia.vercel.app/widget.js"
        data-mode="ftn"
        data-avatar="https://i.postimg.cc/qBXWmBQf/Chat-GPT-Image-6-jun-2026-11-58-24.png"
        data-api="https://zoi-mathia.vercel.app/api/chat"></script>
```
(Zameni `zoi-mathia.vercel.app` svojim Vercel linkom.)

Widget koristi Shadow DOM, pa **ne kvari stil** tvoje stranice.

---

## Šta menjaš
- **Tekst o sajtu / ponašanje Zoi** → `api/chat.js` (`SITE_INFO`, `SITE_SYSTEM`, `FTN_SYSTEM`). Drži se na backendu da ne bude javno.
- **Slika (avatar)** → `data-avatar` u liniji za ugradnju (ili default u `widget.js`).
- **Model / cena** → `api/chat.js`, polje `model` (`claude-haiku-4-5-20251001` = jeftinije/brže, `claude-sonnet-4-6` = kvalitetnije).

## Napomene
- AI se **plaća po upotrebi** preko tvog Anthropic naloga — postavi limit u Billing-u dok testiraš.
- Glas i mikrofon zavise od uređaja/pregledača (najbolje Chrome). Za vrhunski ženstven glas kasnije ide premium TTS (ElevenLabs).
- Ovo je MVP. Pretplata, nalozi i baza su sledeći korak kad kreneš sa naplatom.
