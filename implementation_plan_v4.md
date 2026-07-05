# Implementation Plan v4 — Aura Capital (auracapitalv1.vercel.app)

> Audyt porównawczy z najlepszymi stronami w niszy doradców finansowych / wealth management
> (benchmarki: Awwwards nominees w kategorii finance, Wealthspire, Financial Synergies, Carson Wealth,
> Facet, Abacus Wealth, Goldman "In the Lead"). Zasada nadrzędna: **zostajemy w estetyce "calm premium"
> navy/cream z pojedynczym złotym akcentem interakcji** — żadnych trendów spoza niszy (brutalizm,
> neon, glassmorphism). Wszystko poniżej ma wzmacniać zaufanie, nie "efekt wow" dla samego efektu.

---

## Diagnoza — czego brakuje względem topowych stron w niszy

| # | Słabość | Dlaczego to problem w TEJ niszy | Priorytet |
|---|---------|--------------------------------|-----------|
| 1 | **Zero ludzkiej obecności** — brak twarzy doradcy, zespołu, podpisu | W finansach klient kupuje człowieka, nie firmę. Praktycznie każdy top benchmark (Carson, Wealthspire, Fiat WM) pokazuje ludzi w hero lub sekcji About. Strona bez twarzy = "anonimowy produkt" | 🔴 P1 |
| 2 | **Hero czysto typograficzny** — prawa połowa viewportu to puste navy | Typografia jest elegancka, ale brak wizualnej kotwicy (portret, abstrakcyjna grafika finansowa, subtelny wykres/linia) sprawia, że hero wygląda jak szkic, nie finalny produkt premium | 🔴 P1 |
| 3 | **Kalkulator nie domyka pętli konwersji** — wynik (np. €610,527) nie prowadzi do żadnej akcji | Najlepsze strony (Carson — quiz gotowości emerytalnej, Abacus — quiz archetypu) używają interaktywu jako lead magnetu: wynik → CTA "omów swoją lukę na rozmowie" lub "wyślij mi raport z tych liczb" | 🔴 P1 |
| 4 | **Testimoniale bez twarzy/inicjałów/kontekstu firmowego** | Sam tekst + imię to najsłabsza forma social proof. Benchmarki dodają: zdjęcie/awatar z inicjałami, rolę ("IT consultant, 41"), czas współpracy ("klient od 2019") | 🟠 P2 |
| 5 | **Brak warstwy compliance/regulacyjnej** | W NL doradca hipoteczny/finansowy MUSI budować zaufanie przez AFM-registratie, Kifid, dyplomy (FFP/Erkend Financieel Adviseur). Topowe strony mają pasek certyfikacji + disclaimer przy projekcjach. Kalkulator pokazuje kwoty bez żadnego zastrzeżenia | 🟠 P2 |
| 6 | **Monotonia rytmu sekcji** — usługi 01–04, proces, FAQ mają identyczną strukturę (label → nagłówek → tekst) | Po 3 ekranach oko przestaje rejestrować różnice. Benchmarki łamią rytm co 2–3 sekcje: pełnoekranowy quote, zdjęcie, asymetryczny layout, zmiana tła navy↔cream | 🟠 P2 |
| 7 | **Brak sekcji "Insights/zasoby"** nawet w formie zalążka | Content = pozycjonowanie eksperckie. EP Wealth, Abacus, ShorePoint wygrywają edukacją. Wystarczą 3 karty artykułów (mogą być placeholdery) — sygnał "ta firma myśli" | 🟡 P3 |
| 8 | **Dostępność (a11y)** — drobny serif na navy, złote elementy o niskim kontraście, brak widocznych focus states | WCAG AA to w finansach standard (starsi klienci!). Kontrast złota #C9A961-ish na navy dla małego tekstu prawdopodobnie < 4.5:1 | 🟡 P3 |
| 9 | **SEO/meta/udostępnianie** — do weryfikacji: OG image, favicon, schema.org FinancialService | Link wysyłany w outreachu bez ładnego OG-preview traci 50% pierwszego wrażenia w LinkedIn/mailu | 🟡 P3 |
| 10 | **Mobile** — wymaga pełnego audytu (typografia hero, kalkulator ze sliderami, marquee) | Większość pierwszych wizyt z outreachu = telefon. Slidery kalkulatora na dotyku to częsty punkt frustracji | 🟠 P2 |

---

## Zadania implementacyjne

### TASK 1 — Sekcja "The Advisor" / humanizacja marki (P1)
**DLACZEGO:** rozwiązuje słabość #1 — brak człowieka = brak zaufania w niszy finansowej.
**JAK:**
1. Nowa sekcja między "Process" a kalkulatorem: layout 40/60 — po lewej portret (na razie wysokiej klasy placeholder: monochromatyczne zdjęcie z subtelnym navy-duotone overlay, `object-fit: cover`, zaokrąglenie zgodne z design systemem), po prawej: krótkie bio (3–4 zdania, ton "quiet confidence"), lista certyfikacji (FFP®, RB, AFM-nr — placeholdery), odręczny podpis SVG w kolorze złotego akcentu.
2. Mikrointerakcja: portret przy hover dostaje delikatne przejście duotone→pełny kolor (respektuj `prefers-reduced-motion`).
3. W testimonialach (patrz Task 4) powiązać spójny styl awatarów.
**CZEGO NIE ROBIĆ:** żadnych stockowych uśmiechniętych ludzi przy laptopach; jeden człowiek, jedna twarz, spokój.
**Acceptance:** sekcja widoczna desktop+mobile, obraz lazy-loaded, LCP bez regresji.

### TASK 2 — Wizualna kotwica w hero (P1)
**DLACZEGO:** słabość #2 — pusta prawa strona hero obniża postrzeganą jakość.
**JAK (wybierz wariant A, B jako fallback):**
- **A (preferowany):** abstrakcyjna, generatywna linia wzrostu — cienka złota ścieżka SVG (`stroke-dasharray` animowana raz przy wejściu, easing `cubic-bezier(0.22,1,0.36,1)`, 1.8s), pod nią delikatna siatka kropek w `--navy-lighter`. Statyczna po animacji. Zero pętli.
- **B:** portret doradcy z Task 1 w hero (układ jak Fiat WM), tekst przesunięty do lewej kolumny 55%.
**CZEGO NIE ROBIĆ:** particle effects, 3D, wideo z banku zdjęć — to wybija z "calm premium".
**Acceptance:** animacja odpala się raz, `prefers-reduced-motion: reduce` → statyczny stan końcowy; CLS = 0.

### TASK 3 — Kalkulator: domknięcie pętli konwersji (P1)
**DLACZEGO:** słabość #3 — najmocniejszy element strony nie generuje leadów.
**JAK:**
1. Pod wynikiem projekcji dodać blok wyniku z dwoma CTA: primary „Discuss your gap — book a free call" (scroll do sekcji kontakt / link Cal.com) i secondary „Email me these numbers" → otwiera istniejący formularz lead magnetu z pre-wypełnionym kontekstem (przekaż wartości sliderów w state).
2. Dodać jednozdaniowy disclaimer pod wynikiem: „Illustrative projection, not financial advice. Assumes X% annual return." — 12–13px, `--cream-muted`, rozwiązuje częściowo #5.
3. Wynik liczbowy: animowany count-up TYLKO przy pierwszym wejściu w viewport i przy zmianie slidera (już częściowo jest — zweryfikować, że nie liczy od zera przy każdym ticku).
**Acceptance:** kliknięcie „Email me these numbers" → formularz z ukrytymi polami `salary`, `age`, `projection`; disclaimer widoczny na mobile.

### TASK 4 — Testimoniale 2.0 (P2)
**DLACZEGO:** słabość #4 — anonimowy social proof nie przekonuje.
**JAK:** każda karta opinii dostaje: (a) awatar-inicjały w kółku (navy tło, cream litery — spójne z tokenami), (b) rolę + wiek lub miasto („Consultant, Eindhoven"), (c) linijkę „Client since 20XX", (d) opcjonalnie 5 gwiazdek w złocie tylko jeśli wszystkie opinie = 5★ (inaczej pomiń — mieszane gwiazdki wyglądają gorzej niż brak).
**CZEGO NIE ROBIĆ:** fałszywych zdjęć z generatorów twarzy — inicjały są uczciwsze i wyglądają premium.
**Acceptance:** auto-scroll zachowany, pauza na hover działa (z v3), nowe metadane widoczne.

### TASK 5 — Pasek zaufania regulacyjnego + stopka compliance (P2)
**DLACZEGO:** słabość #5 — w NL to nie ozdobnik, to warunek wiarygodności.
**JAK:**
1. Cienki pasek nad stopką: 3–4 monochromatyczne "badge" (AFM-registered • Kifid member • FFP® certified • 100% independent) — tekst + minimalistyczna ikona, opacity 0.7, hover → 1.0.
2. Stopka: linki Privacy Policy, Disclaimer, Complaints procedure (mogą prowadzić do `#` w demo, ale MUSZĄ istnieć wizualnie).
**Acceptance:** pasek renderuje się nad stopką na wszystkich szerokościach, nie łamie się brzydko na mobile (grid 2×2).

### TASK 6 — Złamanie rytmu: sekcja "editorial break" (P2)
**DLACZEGO:** słabość #6 — monotonia struktury usypia scroll.
**JAK:** między usługami a procesem wstawić pełnoszerokościową sekcję na tle **cream** (inwersja!): jeden duży cytat-manifest w serif italic (np. „Most people don't have a money problem. They have a clarity problem.") + drobny label. Wysokość ~60vh, dużo światła. To samo odwrócenie tła powtórzyć nie częściej niż raz.
**Acceptance:** kontrast tekstu na cream ≥ 7:1; sekcja ma `scroll-margin` poprawny dla anchor nav.

### TASK 7 — Zalążek sekcji Insights (P3)
**JAK:** 3 karty (tytuł, kategoria, czas czytania, data) w siatce, hover = istniejący złoty accent token; linki do `#`. Nagłówek sekcji: „Thinking, in writing."
**Acceptance:** karty równej wysokości, line-clamp na tytułach.

### TASK 8 — Audyt a11y + focus states (P3)
**JAK:**
1. Przepuść palet przez checker kontrastu; jeśli złoty tekst < 4.5:1 na navy → używaj złota tylko dla elementów ≥ 18px/bold lub dekoracyjnych, tekst funkcyjny w cream.
2. Globalny `:focus-visible` — 2px outline w złocie z offsetem 3px na wszystkich interaktywnych elementach (linki, slidery, akordeony FAQ).
3. Slidery kalkulatora: `aria-label`, `aria-valuetext` („€65,000 gross annual salary").
4. `prefers-reduced-motion` — audit WSZYSTKICH animacji z v3 (marquee, count-up, CTA glow).
**Acceptance:** nawigacja całej strony klawiaturą bez „gubienia" fokusu; axe DevTools 0 błędów critical.

### TASK 9 — Meta / OG / schema (P3)
**JAK:**
1. OG image 1200×630: navy tło, logotyp, tagline „Wealth, with intention.", złota linia — wygenerować jako statyczny plik `/og.png`.
2. Favicon + apple-touch-icon w stylu monogramu.
3. JSON-LD `FinancialService` (name, areaServed: NL, address placeholder, sameAs).
4. Meta description ≤ 155 znaków zorientowana na korzyść.
**Acceptance:** poprawny preview w opengraph.xyz; walidator schema.org bez błędów.

### TASK 10 — Pełny audyt mobile (P2, wykonać PRZED merge Tasków 1–6)
**JAK:** przetestować na 390px: (a) hero — czy serif display nie łamie się sierotami, (b) slidery kalkulatora — powiększyć thumb do min. 28px i hit-area do 44px, (c) marquee — zwolnić o ~30% na mobile, (d) tabele/statystyki — stack pionowy, (e) sticky nav / powrót do góry.
**Acceptance:** brak horizontal scroll na 360–430px; wszystkie touch targety ≥ 44×44px.

---

## Kolejność wykonania
1. TASK 10 (baseline mobile) → 2. TASK 2 → 3. TASK 1 → 4. TASK 3 → 5. TASK 4 → 6. TASK 6 → 7. TASK 5 → 8. TASK 8 → 9. TASK 7 → 10. TASK 9

## Reguły spójności (obowiązują we wszystkich taskach)
- Jeden złoty token akcentu interakcji (zasada z v3) — żaden task nie wprowadza drugiego koloru akcentu.
- Animacje: max 1 animacja wejścia na sekcję, easing spójny, wszystko za `prefers-reduced-motion`.
- Nowe sekcje dziedziczą istniejącą siatkę kontenera i skalę typograficzną — zero nowych font-size poza skalą.
- Każdy nowy element tekstowy po angielsku, ton „quiet confidence" — krótkie zdania, zero wykrzykników.
