# Multiverse FMA — Desktop App

An Electron desktop wrapper for Multiverse FMA that creates a native .exe / .dmg / .AppImage.

## Quick Start

### 1. Configure the App URL

Edit `main.js` and set `APP_URL` to your deployed app URL:

```js
const APP_URL = "https://your-deployed-app.replit.app/";
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run in Development

```bash
npm start
```

### 4. Build the Installer

**Windows (.exe installer):**
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

**All platforms:**
```bash
npm run dist
```

The installer is generated in the `dist/` folder.

## Icons (Optional)

Place icon files in the `build/` folder:
- `build/icon.ico` — Windows (256x256)
- `build/icon.icns` — macOS
- `build/icon.png` — Linux (512x512)

## Notes

- Requires internet connection (the app loads from the deployed URL)
- Windows: Requires Node.js 18+ and wine for cross-platform builds
- The app URL must be updated to your deployed Replit URL after publishing
