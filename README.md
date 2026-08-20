# Baltica Home — stronka docelowa

Lekka strona docelowa (landing page) dla **Baltica Home**, czyli mokrej karmy dla kotów. Prosta w założeniu: ma pokazać produkt, opowiedzieć o nim przyjemnie i namówić do kliknięcia w link sklepowy (BalticaPets.pl).

Zbudowana od zera z **Vite + Vanilla JS** i **Tailwind CSS** — zero frameworków, zero cukru, czysty, semantyczny HTML. Strona jest w pełni po polsku.

---

## Stack technologiczny

| Warstwa | Co użyto |
| ------- | -------- |
| Build | Vite 6 (`base: './'` — przyda się, gdyby stronę miała kiedyś stać na podstronie) |
| Styl | Tailwind CSS 3 + PostCSS + Autoprefixer |
| JS | Vanilla (ES6+), podział na małe moduły |
| Ikony | Inline SVG (na własne potrzeby, bez zewnętrznych bibliotek) |
| Analytics | Własny, lekki silnik dataLayer pod GTM + porządny logger w konsoli |

## Struktura projektu

```
index.html                    # Cała strona (semantyczny HTML, pełne PL)
src/
  main.js                     # Wejście aplikacji: akordeon, header, cookie banner,
                              # kliknięcia CTA i linki zewnętrzne
  styles/
    main.css                  # Dyrektywy Tailwind + własne komponenty i utility
  scripts/
    accordion.js              # Dostępny (WAI-ARIA) akordeon FAQ
    analytics.js              # Inicjalizacja dataLayer + [Baltica Analytics] logger
    carousel.js               # Karuzela smaków (mobile scroll-snap + dots)
  assets/
    icons/                    # Własne SVG: logo i drobne ikonki
    images/                   # Mockupy puszek (hero + karuzela)
```

## Uruchomienie

```bash
npm install      # instaluje zależności (raz na start)
npm run dev      # lokalny dev server na http://localhost:3000 (otwiera się sam)
npm run build    # produkcyjny build do ./dist
npm run preview  # podgląd builda produkcyjnego lokalnie
```

Wystarczy Node w rozsądnej wersji (projekt korzysta tylko z deps deweloperskich — `dependencies` jest puste).

## Analytics (dataLayer)

Strona ma wbudowany, minimalistyczny silnik analityki — pushuje eventy do `window.dataLayer` (gotowe pod GTM) i przy okazji ładnie loguje je w konsoli z odznaką `[Baltica Home Analytics]`.

Realne eventy, które się wysyłają:

| Event                    | Po co   |
| ------------------------ | ------- |
| `cta_click`              | Kliknięcia w przyciski CTA (hero, karta produktu, stopka...) |
| `cookie_consent_accepted`| Zaakceptowano banner cookies |
| `outbound_link_click`    | Kliknięcie w zewnętrzny link (np. BalticaPets, social media) |
| `faq_toggle`             | Rozwinięcie / zwinięcie pytania w FAQ (razem z tytułem) |

To nie jest pełny system analityczny, tylko lekki fundament pod GTM — łatwo go rozbudować, jak ktoś będzie potrzebował czegoś więcej.

---

## Design

Strona ma ciepły, „domowy” klimat — ma pasować do marki mokrej karmy dla kota, a nie wyglądać jak sterylna apka korporacyjna.

- **Paleta:** sage + cream (zielonkawo-kremowe), z akcentami białego i ciemnego tekstu
- **Typografia:** Plus Jakarta Sans (fallback na systemowe fonty)
- **Wibracja:** przytulnie, naturalnie, prosto — zero „korporacyjnego chłodu”

Całość skrojona pod responsywność: na mobile karuzela ze scroll-snap, na desktop własna, spokojna siatka.

## Dostępność

Strona stara się być przyjazna, bez wodotrysków:
- Semantyczne elementy HTML (`header`, `nav`, `section`, `footer`)
- WAI-ARIA w akordeonie FAQ (przyciski mają `aria-expanded`, `aria-controls`)
- Nawigacja klawiaturą: strzałki między pytaniami FAQ
- Focus rings na interaktywnych elementach
- Obsługa `prefers-reduced-motion` (chowa część animacji dla wrażliwych)

---

*Baltica Home* — zrobiona na spokojnie, bez paniki, ale po kolei. 🌿# baltica-home
