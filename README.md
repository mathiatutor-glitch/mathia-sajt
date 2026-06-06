# Zoi · MathIA

AI profesorica za platformu MathIA, sa dva moda: **opšta pitanja o sajtu** i **FTN prijemni (zadaci)**.

Sastoji se iz dva dela:
- `index.html` — sajt (frontend) koji korisnik vidi
- `api/chat.js` — mali server (backend) koji **čuva tajni API ključ** i razgovara sa AI-jem

> ⚠️ **NAJVAŽNIJE:** API ključ NIKAD ne ide u kod ni na GitHub. Ide samo u Vercel kao tajna „environment varijabla". Tako ga niko ne može ukrasti.

---

## Šta ti treba (sve besplatno za početak)

1. **GitHub** nalog — github.com
2. **Vercel** nalog — vercel.com (prijavi se preko GitHub-a)
3. **Anthropic API ključ** — console.anthropic.com → Settings → API Keys → „Create Key". Za korišćenje treba da dodaš sredstva (Billing); plaća se po upotrebi.

---

## Postavljanje korak po korak

### 1) Napravi repozitorijum na GitHub-u
- GitHub → **New repository** → ime npr. `zoi-mathia` → **Create**.
- Klikni **Add file → Upload files** i prevuci:
  - `index.html`
  - `README.md`
  - `package.json`
  - `.gitignore`
  - i ceo folder `api` (sa fajlom `chat.js` unutra)
- **Commit changes**.

### 2) Poveži sa Vercel-om
- Vercel → **Add New… → Project** → izaberi svoj `zoi-mathia` repo → **Import**.
- Framework: ostavi **Other** (nije potreban build). Klikni **Deploy** (ili prvo dodaj ključ — sledeći korak — pa Deploy).

### 3) Dodaj tajni API ključ
- U Vercel projektu: **Settings → Environment Variables**.
- Name: `ANTHROPIC_API_KEY`
- Value: nalepi svoj ključ sa console.anthropic.com
- Sačuvaj, pa **Deployments → Redeploy** (da ključ proradi).

### 4) Gotovo
- Vercel ti daje link tipa `https://zoi-mathia.vercel.app` — to je tvoj živi sajt sa Zoi. ✅

---

## Šta možeš lako da menjaš

- **Tekst o sajtu i ponašanje Zoi** → `api/chat.js`, promenljive `SITE_INFO`, `SITE_SYSTEM`, `FTN_SYSTEM`. (Tu ti je „mozak" — drži ga na backendu da ne bude javan.)
- **Slika (avatar)** → `index.html`, na vrhu `<script>`: `AVATAR_URL`. Nalepi direktan link svoje slike (završava se na `.png`/`.jpg`).
- **Model / cena** → `api/chat.js`, polje `model`. Jeftinije/brže: `claude-haiku-4-5-20251001`. Kvalitetnije: `claude-sonnet-4-6`.

---

## Troškovi i napomene

- **AI se plaća po upotrebi** preko tvog Anthropic naloga (svaka poruka = mali trošak). Postavi limit u Billing-u dok testiraš.
- **Glas i mikrofon** koriste ono što uređaj korisnika ima ugrađeno; kvalitet zavisi od uređaja i pregledača (najbolje u Chrome-u). Za vrhunski ženstven glas kasnije se koristi premium TTS (npr. ElevenLabs) — to je posebna nadogradnja.
- Ovo je solidan **MVP (prva radna verzija)**. Naplata pretplate, nalozi korisnika i baza podataka su sledeći korak kad kreneš sa naplatom.
- **Nikad** ne stavljaj API ključ u `index.html`, u `chat.js` direktno, ni u GitHub. Samo u Vercel env varijable.
