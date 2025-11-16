# Instagram Username Scraper

Ein vollwertiger Instagram Username Scraper mit React Frontend und Express/Puppeteer Backend.

![Instagram Scraper Demo](https://github.com/user-attachments/assets/1def5699-b623-489f-ad6f-ce841de04d94)

## 🚀 Features

- **Echtes Instagram Scraping**: Verwendet Puppeteer, um tatsächlich Usernames von Instagram zu scrapen
- **Modern Tech Stack**: Vite + React + TypeScript + Tailwind CSS (Frontend) + Express + Puppeteer (Backend)
- **Real-time Results**: Zeigt gescrapte Usernames sofort mit Zeitstempeln an
- **Responsive Design**: Schönes Gradient-Design für alle Geräte
- **Fast Development**: Hot Module Replacement (HMR) für sofortiges Feedback
- **Type-Safe**: Vollständige TypeScript-Unterstützung

## 📋 Voraussetzungen

- Node.js (v18 oder höher empfohlen)
- npm oder yarn Package Manager
- Bun (optional, für schnellere Installation)

## 🛠️ Installation

1. Repository klonen:
```bash
git clone https://github.com/Fr3d33/fck_generation_deutschland.git
cd fck_generation_deutschland
```

2. Dependencies installieren:
```bash
npm install
# oder mit bun
bun install
```

## 🏃 Anwendung starten

### Development Mode (Frontend + Backend gleichzeitig)

Starte sowohl Frontend als auch Backend mit einem Befehl:

```bash
npm run dev:all
```

Dies startet:
- Frontend auf `http://localhost:5173/`
- Backend API auf `http://localhost:3001/`

### Einzeln starten

**Nur Frontend:**
```bash
npm run dev
```

**Nur Backend:**
```bash
npm run dev:server
```

### Production Build

Frontend für Production bauen:
```bash
npm run build
```

Backend für Production bauen:
```bash
npm run build:server
```

Production Server starten:
```bash
npm run start:server
```

## 🎨 Technology Stack

### Frontend
- **Vite**: Next-Generation Frontend Tooling
- **React 19**: UI Library mit Hooks
- **TypeScript**: Type-sicheres JavaScript
- **Tailwind CSS**: Utility-First CSS Framework

### Backend
- **Express**: Node.js Web Framework
- **Puppeteer**: Headless Chrome für Web Scraping
- **TypeScript**: Type-sicheres Backend
- **CORS**: Cross-Origin Resource Sharing

## 📁 Projektstruktur

```
fck_generation_deutschland/
├── src/                    # Frontend Source
│   ├── App.tsx            # Main Application
│   ├── InstagramScraper.tsx  # Scraper Component
│   ├── main.tsx           # Entry Point
│   └── index.css          # Styles
├── server/                # Backend Source
│   ├── index.ts          # Express Server & Scraping Logic
│   └── tsconfig.json     # TypeScript Config für Backend
├── public/               # Static Assets
├── package.json          # Dependencies & Scripts
└── vite.config.ts        # Vite Configuration
```

## 🔧 Verwendung

1. Starte die Anwendung mit `npm run dev:all`
2. Öffne `http://localhost:5173/` im Browser
3. Gib eine Instagram-URL ein (z.B. Link zu einem Post)
4. Klicke auf "Scrape Usernames"
5. Die gescrapten Usernames werden in der Liste angezeigt
6. Klicke auf das externe Link-Icon, um Instagram-Profile zu besuchen

## 📝 API Endpoints

### POST `/api/scrape`

Scrapt Usernames von einer Instagram-URL.

**Request Body:**
```json
{
  "url": "https://www.instagram.com/p/XXXXXX/"
}
```

**Response:**
```json
{
  "success": true,
  "usernames": [
    {
      "username": "example_user",
      "profileUrl": "https://www.instagram.com/example_user"
    }
  ],
  "count": 1
}
```

### GET `/health`

Health Check Endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Instagram Scraper API is running"
}
```

## ⚠️ Wichtige Hinweise

- **Rate Limiting**: Instagram kann deine IP blockieren, wenn zu viele Requests gemacht werden
- **Terms of Service**: Stelle sicher, dass du Instagrams ToS respektierst
- **Headless Browser**: Puppeteer lädt Chrome herunter (~170-280MB beim ersten Mal)
- **Login erforderlich**: Manche Instagram-Inhalte erfordern Login (aktuell nicht implementiert)

## 🛡️ Troubleshooting

### Puppeteer Installation Probleme

Falls Puppeteer Probleme macht:
```bash
# Chrome manuell herunterladen
npx puppeteer browsers install chrome
```

### CORS Fehler

Stelle sicher, dass das Backend auf Port 3001 läuft und CORS aktiviert ist.

### Keine Usernames gefunden

- Versuche eine andere Instagram-URL (Posts mit Kommentaren funktionieren am besten)
- Manche Posts sind privat oder erfordern Login
- Instagram könnte Anti-Scraping Maßnahmen aktiviert haben

## 🤝 Contributing

Contributions sind willkommen! Bitte erstelle einen Pull Request.

## 📄 Lizenz

MIT License - siehe LICENSE Datei.

## 🔗 Links

- [Vite Dokumentation](https://vitejs.dev/)
- [React Dokumentation](https://react.dev/)
- [Puppeteer Dokumentation](https://pptr.dev/)
- [Express Dokumentation](https://expressjs.com/)

---

Gebaut mit ❤️ von Fr3d33
