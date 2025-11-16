# Schnellstart-Anleitung

## Installation

```bash
bun install
# oder
npm install
```

## Entwicklung

Starte Frontend + Backend gleichzeitig:

```bash
npm run dev:all
```

Oder einzeln:

```bash
# Nur Frontend (Terminal 1)
npm run dev

# Nur Backend (Terminal 2)
npm run dev:server
```

## Verwendung

1. Öffne `http://localhost:5173/`
2. Gib eine Instagram-URL ein (z.B. `https://www.instagram.com/p/ABC123/`)
3. Klicke auf "Scrape Usernames"
4. Warte auf die Ergebnisse

## Beispiel URLs

Teste mit öffentlichen Instagram-Posts:
- Posts mit vielen Kommentaren funktionieren am besten
- Profil-URLs: `https://www.instagram.com/username/`
- Post-URLs: `https://www.instagram.com/p/POST_ID/`

## Troubleshooting

### Backend startet nicht
```bash
# Chrome für Puppeteer installieren
npx puppeteer browsers install chrome
```

### CORS Fehler
- Stelle sicher, dass Backend auf Port 3001 läuft
- Frontend muss auf Port 5173 laufen

### Keine Usernames gefunden
- Probiere verschiedene Post-URLs
- Instagram blockiert manchmal Scraping (rate limiting)
- Manche Inhalte erfordern Login (nicht implementiert)

## Production

```bash
# Frontend bauen
npm run build

# Backend bauen
npm run build:server

# Backend starten
npm run start:server
```

## Tech Stack

**Frontend:** Vite + React 19 + TypeScript + Tailwind CSS  
**Backend:** Express + Puppeteer + TypeScript  
**Dev Tools:** TSX, Concurrently, ESLint
