# Instagram Username Scraper

A modern web application built with Vite, React, TypeScript, and Tailwind CSS for scraping Instagram usernames.

![Instagram Scraper Demo](https://github.com/user-attachments/assets/1def5699-b623-489f-ad6f-ce841de04d94)

## 🚀 Features

- **Modern Tech Stack**: Built with Vite + React + TypeScript + Tailwind CSS
- **Instagram Username Scraper**: Simulated scraping functionality with a clean UI
- **Real-time Results**: Display scraped usernames instantly with timestamps
- **Responsive Design**: Beautiful gradient design that works on all devices
- **Fast Development**: Hot Module Replacement (HMR) for instant feedback
- **Type-Safe**: Full TypeScript support for better code quality

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Fr3d33/fck_generation_deutschland.git
cd fck_generation_deutschland
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🎨 Technology Stack

- **Vite**: Next-generation frontend tooling
- **React 18**: UI library with hooks
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS transformations
- **ESLint**: Code linting and quality

## 📁 Project Structure

```
fck_generation_deutschland/
├── src/
│   ├── App.tsx              # Main application component
│   ├── InstagramScraper.tsx # Instagram scraper component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Tailwind CSS imports
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── vite.config.ts         # Vite configuration
```

## 🔧 Development

### Code Quality

Run ESLint to check for code issues:

```bash
npm run lint
```

### Building for Production

The build process compiles TypeScript, bundles assets, and optimizes for production:

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📝 Usage

1. Open the application in your browser
2. Enter an Instagram URL in the input field
3. Click "Scrape Usernames" to start the scraping process
4. View the scraped usernames in the results section
5. Click on the external link icon to visit Instagram profiles
6. Use the "Clear" button to remove all results

## ⚠️ Important Note

This is a **demo application** with simulated scraping functionality. In a production environment, you would need to:

- Implement a backend API for actual Instagram scraping
- Handle Instagram's terms of service and rate limiting
- Use proper authentication and authorization
- Implement error handling and retry logic
- Consider using Instagram's official API when available

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

Built with ❤️ using Vite + React + TypeScript + Tailwind CSS
