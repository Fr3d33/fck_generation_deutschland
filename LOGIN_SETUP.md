# Instagram Login Setup

## Wichtig: Login erforderlich!

Instagram blockiert die meisten Inhalte ohne Login. Um den Scraper zu nutzen, musst du deine Instagram-Zugangsdaten hinterlegen.

## Setup

1. Kopiere `.env.example` zu `.env`:
   ```bash
   copy .env.example .env
   ```

2. Öffne `.env` und trage deine Instagram-Zugangsdaten ein:
   ```
   INSTAGRAM_USERNAME=dein_username
   INSTAGRAM_PASSWORD=dein_passwort
   ```

3. Starte den Server neu:
   ```bash
   bun run dev:all
   ```

## Sicherheit

- Die `.env` Datei ist in `.gitignore` und wird NICHT ins Git-Repository hochgeladen
- Deine Zugangsdaten bleiben lokal auf deinem Computer
- Teile niemals deine `.env` Datei mit anderen

## Hinweise

- Verwende am besten einen Test-Account, nicht deinen Haupt-Account
- Instagram könnte das Login als verdächtig einstufen und Captchas anzeigen
- Bei zu vielen Login-Versuchen kann der Account temporär gesperrt werden
- Der Scraper nutzt Puppeteer (Headless Chrome) für das Login

## Troubleshooting

### Login schlägt fehl
- Überprüfe Username und Passwort in der `.env` Datei
- Probiere es mit headless: false (siehe server/index.ts) um zu sehen, was passiert
- Instagram könnte 2FA (Zwei-Faktor-Authentifizierung) verlangen

### Account gesperrt
- Warte einige Stunden und versuche es erneut
- Verwende einen anderen Account
- Reduziere die Anzahl der Scraping-Requests

## Alternative ohne Login

Ohne Login funktioniert der Scraper nur sehr eingeschränkt, da Instagram die meisten Inhalte blockiert.
