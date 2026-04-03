# Multiverse FMA — Desktop App

An Electron desktop wrapper for Multiverse FMA that creates a native .exe / .dmg / .AppImage.

The live app URL is pre-configured to `https://multiverse-fma.replit.app/`.  
Icons are already included in `build/icon.png`, `build/icon.ico`, and `build/icon.icns`.

## Quick Start

### 1. Install Dependencies

```bash
cd electron-app
npm install
```

> Requires Node.js 18+.

### 2. Run in Development

```bash
npm start
```

### 3. Build the Installer

**Windows (.exe installer via NSIS):**
```bash
npm run dist:win
```

**macOS (.dmg):**
```bash
npm run dist:mac
```

**Linux (.AppImage):**
```bash
npm run dist:linux
```

**All platforms at once:**
```bash
npm run dist
```

Installers are output to the `dist/` folder.

## Changing the App URL

The desktop app loads the web app from its deployed URL. To point it at a different deployment:

1. Edit `main.js` and change:
   ```js
   const APP_URL = process.env.APP_URL || "https://multiverse-fma.replit.app/";
   ```
2. Or set the `APP_URL` environment variable before running.

## Icons

Pre-built icons are in `build/`:
- `build/icon.ico` — Windows (multi-size: 16, 32, 48, 64, 128, 256 px)
- `build/icon.icns` — macOS (all standard sizes up to 1024×1024)
- `build/icon.png` — Linux / fallback (512×512)

All icons were generated from `artifacts/multiverse-fma/public/images/logo-mark.png`.

## Features

- **Native menus** — Game, View, and fullscreen controls
- **Zoom controls** — Ctrl/Cmd + / − / 0 to adjust zoom
- **Offline detection** — Shows a retry page if the server is unreachable
- **Cross-platform** — Windows (NSIS), macOS (DMG), Linux (AppImage)

## Notes

- Requires an internet connection (the app loads from the deployed URL).
- Cross-platform builds from Windows to macOS/Linux may require additional tooling (e.g. `wine` for Windows builds on Linux).
