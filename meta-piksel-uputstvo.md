# Meta piksel — priprema pre prve reklame

Piksel je nevidljivi kod na sajtu koji Meti (Instagram/Facebook) javlja ko je posetio sajt i ko se registrovao. Bez njega **ne možeš** da radiš retargeting (reklame onima koji su već bili na sajtu) ni da meriš koje reklame donose pretplate. Zato ide **pre** prvog dinara u oglase.

## Korak 1 — Napravi Business nalog (10 min)
1. Idi na **business.facebook.com** → uloguj se svojim FB nalogom.
2. „Create account" → unesi ime firme (MATHIA / dr Marina Bulat), svoj mejl.
3. Poveži svoju **Instagram** i **Facebook** stranicu (Business Settings → Accounts).

## Korak 2 — Napravi piksel i uzmi ID
1. U Business Settings → **Data sources → Datasets/Pixels** → „Add".
2. Nazovi ga „MATHIA sajt".
3. Kad se napravi, prikaže ti se **Pixel ID** — niz od ~15 cifara (npr. `1234567890123456`).
4. **Kopiraj taj broj i pošalji mi ga** — ja ga ubacim u sajt (v. Korak 3).

## Korak 3 — Ubacivanje na sajt (ja radim)
Kad mi pošalješ Pixel ID:
- Ubacim standardni Meta piksel kod tako da se učita na **svim stranicama** sajta odjednom (preko zajedničkog skripta — ne diram svih 400 fajlova ručno).
- Dodam i **event za registraciju** (`CompleteRegistration`) na `registracija.html`, da Meta zna kad se neko stvarno prijavio — to je zlato za optimizaciju reklama.
- Spakujem ti u nov folder sa uputstvom šta da postaviš.

## Korak 4 — Provera
Instaliraj Chrome ekstenziju **Meta Pixel Helper** → otvori mathia.rs → ikonica treba da bude zelena i da piše „1 pixel found". Kad se neko registruje, treba da vidiš i „CompleteRegistration".

---

### Šta mi treba od tebe da nastavim
Samo **Pixel ID** (onaj broj iz Koraka 2). Čim ga imaš, javi — ostalo je na meni.

*Napomena: unos ID-a u Meta i pravljenje naloga radiš ti (to su tvoji nalozi i lozinke). Ja radim samo kod na sajtu.*
