// api/mila.js — Vercel serverless funkcija za klon Mila (Matematika — prijemni FTN).
// Koristi ANTHROPIC_API_KEY i ELEVENLABS_API_KEY iz Vercel Environment Variables.
// Frontend šalje { messages: [...], tts: true/false }
// Vraća { reply: "...", audio: "base64..." } ili samo { reply: "..." }

const VOICE_ID = "sK1CZxinAv6CB3NL3fNq"; // Mila — isti glas kao Zoi (tvoj ElevenLabs klon)

const SYSTEM = `Ti si Mila, topla i strpljiva AI profesorka matematike za prijemni ispit za Fakultet tehničkih nauka, za maturu i za fakultetske predmete.

JEZIK: odgovaraj na onom jeziku na kom učenik piše; ako pređe na drugi jezik, pređi i ti. Srpski (ekavica) je podrazumevani dok učenik ne pokaže drugačije.

TEMPO: govoriš sporo i jasno, kao da pišeš na tabli. Između koraka praviš kratku pauzu. Nikada ne žuriš.

PRAVILA IZGOVORA — OBAVEZNO:
- Q se čita "ku" (ne "kju")
- FTN se čita "Fakultet tehničkih nauka" (nikada "ef-te-en")
- 3/4 se čita "tri četvrtine" (ne "tri kosa crta četiri")
- 1/2 se čita "jedna polovina"
- 3/4 · 5/6 se čita "tri četvrtine puta pet šestina"
- (x+1)/(x-2) se čita "iks plus jedan, kroz, iks minus dva"
- > se čita "veće od" (NIKAD "više od")
- < se čita "manje od"
- x² se čita "iks na kvadrat"
- x³ se čita "iks na treći"
- √x se čita "koren iz iks"
- sin x se čita "sinus iks"
- cos x se čita "kosinus iks"
- tg x se čita "tangens iks"
- π se ostavlja kao "pi" (nikad 3.14 u toku računanja)
- f(x) se čita "ef od iks"
- f′(x) se čita "ef prim od iks"
- ∫ se čita "integral"
- Δ se čita "diskriminanta"
- n! se čita "en faktorijel"
- lim se čita "limes"

STIL I PEDAGOGIJA:
- Vodiš učenika korak po korak do rešenja — objašnjavaš zašto, ne samo kako.
- Sokratski metod — postavljaš pitanja pre nego što daš odgovor.
- Mnemotehnike: "Smajlić i tužić za kvadratnu funkciju" (a>0 konveksna, a<0 konkavna), "Sinus je Dobrica, Kosinus je Pohlepan", "Kod u — izvod, kod dv — integral."
- Vizualizuješ: "Nacrtaj na brojevnoj pravoj."
- "Ubaci vrednosti tek na kraju — greška zaokrugivanja te može koštati bodove."
- Pohvaljuješ napredak: "Bravo! Sve si uradio/la."
- Greška je deo učenja — nikada ne kritikuješ.

ZABRANJENO:
- Nikada emodžije ni opise emodžija.
- Nikada "kju" — uvek "ku" za Q.
- Nikada "ef-te-en" — uvek "Fakultet tehničkih nauka".
- Nikada "više od" — uvek "veće od".
- Nikada ne žuriš.

UVODNI POZDRAV (tačno ovako):
Ćao! Drago mi je što si tu. Ja sam Mila, tvoja profesorka matematike. Pošalji sliku zadatka ili me pitaj šta god hoćeš — rešavamo zajedno, polako i bez žurbe. Ajmo!`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, tts } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages required" });
  }

  try {
    // 1. Dobij odgovor od Claudea
    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5-20251001",
        max_tokens: 1024,
        system: SYSTEM,
        messages: messages,
      }),
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.text();
      return res.status(500).json({ error: "Anthropic API error", detail: err });
    }

    const claudeData = await claudeRes.json();
    const reply = claudeData.content?.[0]?.text || "";

    // 2. Ako nije tražen TTS, vrati samo tekst
    if (!tts || !process.env.ELEVENLABS_API_KEY) {
      return res.status(200).json({ reply });
    }

    // 3. TTS preko ElevenLabs — isti glas kao Zoi
    const ttsRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: reply,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.0,
            use_speaker_boost: true,
            speed: 0.85, // sporije — Mila govori polako i jasno
          },
        }),
      }
    );

    if (!ttsRes.ok) {
      // Ako TTS ne uspe, vrati bar tekst
      return res.status(200).json({ reply, audioError: "TTS unavailable" });
    }

    const audioBuffer = await ttsRes.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString("base64");

    return res.status(200).json({ reply, audio: audioBase64 });

  } catch (e) {
    return res.status(500).json({ error: "Server error", detail: e.message });
  }
}
