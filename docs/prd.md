# Product Requirements Document (PRD) - COLOR MANUFAKTUR GmbH
Erstellt: 2026-09-13 | Tier: 1 - GOLD | Slug: color-manufaktur-augsburg

## 1.1 Grammatik
- **Gewählte Grammatik:** Grammatik 2: The Master Showcase (Haptik, visuelle Exzellenz & Vorher/Nachher)
- **Begründung:** Als meistergeführte Manufaktur für exklusive Wandveredelung (Stucco Veneziano, Kalkmarmorputz), anspruchsvolle Fassaden und 2K-Industrieböden entscheidet der visuelle und haptische Eindruck. Kunden wollen sehen, fühlen und vergleichen, wie ein unansehnlicher Raum durch handwerkliche Perfektion in ein architektonisches Kunstwerk transformiert wird.

## 1.2 Generatives Farb- & Typografie-System (Bespoke aus DNA-Seed)
- **Ausgangs-DNA:** Reale Werkstoffe Sumpfkalk, mineralischer Marmorputz und warmes Siena-Pigment aus der Augsburger Stuck- und Fassadentradition.
- **CSS-Farbtokens (WCAG AA konform):**
  - `--sc-canvas: #fbf9f6;` (sanfter Sumpfkalk-Alabaster, warm und wohnlich)
  - `--sc-surface: #ffffff;` (strahlendes Reinweiß für Card-Cores)
  - `--sc-ink: #181716;` (tiefes Pigment-Grafit, weich getönt, Kontrast 14.8:1)
  - `--sc-ink-muted: #5c5852;` (getöntes Kalkstein-Schiefergrau, Kontrast 5.3:1)
  - `--sc-accent: #c2593f;` (edles Terracotta-Siena Pigment, Kontrast 4.8:1 auf Canvas)
  - `--sc-accent-hover: #ab4b33;`
  - `--sc-accent-subtle: #f4eee7;` (sanfte Tünchen-Fläche)
  - `--sc-border: rgba(24, 23, 22, 0.09);`
- **Typografie:**
  - *Display-Font:* `'Playfair Display', Georgia, serif` (klassische Meisterschaft, handwerkliche Eleganz)
  - *Body-Font:* `'Plus Jakarta Sans', system-ui, sans-serif` (präzise, moderne Lesbarkeit)
  - *Google Fonts Import:* `family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap`
  - Headlines mit optischem Negativ-Tracking: `-0.025em` bis `-0.035em`
  - Fließtext begrenzt auf `48ch` bis `68ch`

## 1.3 Das Motion- & Interaktions-System (7 eigenständige Primitiven)
1. **Hero Kinetic Typography (Perspective SplitType):**
   - Hero-Headline teilt sich in Zeichen und Worte, federt mit 3D-Versatz (`rotateX(-25deg)`, `stagger: 0.02s`) ein.
2. **Native CSS-3D Perspective Tilt & Parallax (0 KB Zusatz-Payload):**
   - Haptische Cards neigen sich bei Mausbewegung auf Desktop; Meister-Badges schweben mit `translateZ(30px)`. Auf Mobile sanfter Scroll-Tilt.
3. **Interactive Before/After Slider (Vorher-Nachher Inspektor):**
   - Ziehbarer Schieberegler mit interaktiver Trennlinie zeigt den Unterschied zwischen unrenovierter Altbauwand und meisterhafter Stucco-Veneziano-Veredelung.
4. **Dynamic Stat & Score Counters:**
   - Hochzählen von `5.0` Google-Sternen, `100%` Termintreue, `24h` Express-Rückruf und meisterlicher Erfahrung.
5. **Editorial Text-Scrubbing / Dim-to-Reveal (Apple-Style):**
   - Das Leitbild von Malermeister Oleg Rogalski enthüllt sich Wort für Wort synchron zur Scrollposition aus dezenter Dimmung (`opacity: 0.22` auf `1.0`).
6. **Continuous Rotating Stamp / Seal (Kreisstempel-Rotation):**
   - Typografisches Qualitätssiegel („Meisterbetrieb • HWK Schwaben • Augsburg •“) dreht sich kontinuierlich beim Scrollen.
7. **Navbar Micro-Interactions & Dynamic Morph:**
   - Header morpht beim ersten Scrollen in eine geschmeidige Glas-Pille (`backdrop-filter: blur(16px)`).

## 1.4 Signature Feature: Manufaktur-Oberflächen-Inspektor & Schnellkalkulator
- **Konzept:** Interaktives Werkzeug zur Gegenüberstellung von 3 Manufaktur-Veredelungen:
  1. *Stucco Veneziano & Marmorputz* (Innenräume, fugenlos, feuchtigkeitsregulierend)
  2. *Atmungsaktiver Silikat-Fassadenschutz* (Lotuseffekt, Witterungs- & Algenresistenz)
  3. *Hochbelastbare 2K-Epoxidharzbeschichtung* (Industrieböden, Garagen, abriebfest)
- Inklusive Vorher/Nachher-Vergleich, technischer Daten-Kompaktkarte und Sofort-Schätzung für m²-Flächen mit 1-Klick-Übernahme ins Anfrageformular.

## 1.5 Tageszeit-Personalisierung
- *06:00 – 11:59 Uhr:* „Guten Morgen aus Augsburg — COLOR MANUFAKTUR berät Sie gern.“
- *12:00 – 17:59 Uhr:* „Guten Tag — Ihr Meisterbetrieb für exklusive Wand- & Fassadengestaltung.“
- *18:00 – 05:59 Uhr:* „Guten Abend — Bürozeiten beendet. Jetzt Projekt digital anfragen (24h Reaktionszeit).“

## 1.6 Full-Canvas Raumnutzung & Anti-Insel-Architektur
- Maximale Container-Breite: `1440px` (fluid padding `clamp(1.25rem, 4vw, 4rem)`).
- 2-spaltiger Split-Hero (53% Text & Proof, 47% Interaktive 3D-Meisterbühne).
- 4-Spalten-Grids für Ablauf und Qualitätsgarantien auf Desktop (`repeat(4, 1fr)`).
- Kein Zusammenschrumpfen auf 900px oder 1100px.
