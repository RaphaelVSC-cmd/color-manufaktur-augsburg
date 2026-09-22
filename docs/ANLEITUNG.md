# Kundenanleitung — COLOR MANUFAKTUR GmbH
Erstellt von: Raphael Neumeier | Webdesign & Digitale Unikate

Sehr geehrter Herr Rogalski,

herzlichen Glückwunsch zu Ihrer neuen, meistergeführten Webpräsenz! Diese Website wurde maßgeschneidert auf das Profil der **COLOR MANUFAKTUR GmbH** abgestimmt und verbindet modernste Ästhetik mit 100% Rechtssicherheit für den deutschen Markt.

---

## 1. Was wurde gebaut?
1. **Der Manufaktur-Oberflächen-Inspektor (Signature Feature):**
   Ein interaktiver Vorher/Nachher-Schieberegler, auf dem Ihre Kunden den direkten Vorher-Nachher-Effekt zwischen unrenoviertem Altbauputz und edlem venezianischem Stucco Veneziano vergleichen können. Inklusive m²-Richtwertschätzer.
2. **Erlebnis-Kontaktpunkt mit 3-stufiger Handwerks-Triage:**
   Bauherren wählen ihr Gewerk (Wandgestaltung, Fassade, Industrieboden), den Umfang und den Startzeitraum. Das senkt Hemmschwellen und liefert Ihnen vorqualifizierte Anfragen.
3. **100% Rechtskonformität nach § 5 DDG & DSGVO:**
   Abmahnsicheres Impressum (HRB 38411, HWK Schwaben, USt-ID), Datenschutzerklärung, Cookie-Banner und datenschutzkonforme Zwei-Klick Google Maps Karte.
4. **Kompaktes WhatsApp-Widget & 1-Klick-Anruf:**
   Für maximale mobile Konvertierung auf Smartphones.

---

## 2. In 4 Schritten zum vollen Funktionsumfang

### Schritt 1: Kontaktformular aktivieren (Formspree)
1. Besuchen Sie [formspree.io](https://formspree.io) und erstellen Sie ein kostenloses Konto mit Ihrer E-Mail `info@colormanufaktur.de`.
2. Klicken Sie auf „+ New Form“, benennen Sie es z. B. `Color Manufaktur Anfragen`.
3. Kopieren Sie die generierte Form-ID (z. B. `xpzvabcd`).
4. Ersetzen Sie in der Datei `index.html` (Zeile 398) den Platzhalter `YOUR_FORM_ID` mit Ihrer ID:
   ```html
   <form id="contactForm" action="https://formspree.io/f/IHR_CODE" method="POST">
   ```
   *Ab sofort landen alle Projektanfragen direkt in Ihrem Postfach!*

### Schritt 2: Besucher-Statistiken aktivieren (Plausible.io)
Für DSGVO-konforme Besucherzahlen ohne lästige Cookie-Banner empfehlen wir [Plausible.io](https://plausible.io):
1. Account anlegen und Domain `colormanufaktur.de` hinterlegen.
2. In `index.html` im `<head>`-Bereich den auskommentierten Plausible-Code aktivieren:
   ```html
   <script defer data-domain="colormanufaktur.de" src="https://plausible.io/js/script.js"></script>
   ```

### Schritt 3: Eigene Domain aufschalten (colormanufaktur.de)
Um die neue Seite unter Ihrer Hauptdomain `www.colormanufaktur.de` laufen zu lassen:
1. Loggen Sie sich bei Ihrem Domain-Provider (z. B. One.com, Strato oder IONOS) in die DNS-Einstellungen ein.
2. Setzen Sie für `www` einen **CNAME-Record** auf:
   `cname.vercel-dns.com`
3. Innerhalb weniger Minuten ist Ihre neue Website weltweit sicher über HTTPS verschlüsselt erreichbar.

---

## 3. Was können Sie selbst anpassen?
Alle Texte, Telefonnummern und Öffnungszeiten sind direkt in der Datei `index.html` lesbar hinterlegt. 

- **Telefonnummer ändern:** Suchen Sie nach `0176 47034559` und ersetzen Sie diese an den gewünschten Stellen.
- **Neue Referenzbilder hinzufügen:** Legen Sie neue Bilder im Ordner `assets/images/` ab und passen Sie den Dateinamen in `index.html` an.

---

## 4. Rundum-Sorglos-Support
Möchten Sie Änderungen nicht selbst vornehmen? Senden Sie neue Fotos, Texte oder Wünsche einfach per WhatsApp an Raphael Neumeier. Im Rahmen der monatlichen Website-Wartung (49 €/Monat) werden Anpassungen innerhalb von 24 Stunden zuverlässig für Sie umgesetzt.

*Telefon:* 0176 / 47034559  
*Webdesign & Technik:* Raphael Neumeier (Ingolstadt)
