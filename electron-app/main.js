const { app, BrowserWindow, Menu, shell, ipcMain } = require("electron");
const path = require("path");

// ── Configuration ──────────────────────────────────────────────────────────
// Replace this URL with your deployed Replit app URL after publishing.
// Example: "https://multiverse-fma.replit.app/"
const APP_URL = process.env.APP_URL || "https://multiverse-fma.replit.app/";

const WINDOW_CONFIG = {
  width: 1280,
  height: 800,
  minWidth: 900,
  minHeight: 600,
};

// ── Main Window ────────────────────────────────────────────────────────────
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    ...WINDOW_CONFIG,
    title: "Multiverse FMA",
    backgroundColor: "#0a0a12",
    icon: path.join(__dirname, "build", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    show: false,
  });

  // Show window when ready to avoid white flash
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // Load the app
  mainWindow.loadURL(APP_URL).catch(() => {
    // If the URL fails, show an offline page
    mainWindow.loadURL(`data:text/html;charset=utf-8,
      <html style="background:#0a0a12;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
        <div style="text-align:center;color:#e040fb">
          <h1 style="font-size:48px">Multiverse FMA</h1>
          <p style="color:#888;font-size:18px">Could not connect to the game server.</p>
          <p style="color:#888;font-size:14px">Please check your internet connection and try again.</p>
          <button onclick="location.reload()" style="margin-top:20px;padding:12px 32px;background:#e040fb;border:none;color:black;font-size:18px;cursor:pointer;border-radius:8px">
            Retry
          </button>
        </div>
      </html>
    `);
  });

  // Open external links in the system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// ── App Menu ───────────────────────────────────────────────────────────────
function buildMenu() {
  const template = [
    {
      label: "Game",
      submenu: [
        {
          label: "Home",
          click: () => mainWindow?.loadURL(APP_URL),
        },
        {
          label: "Leaderboard",
          click: () => mainWindow?.loadURL(APP_URL + "stats"),
        },
        { type: "separator" },
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click: () => mainWindow?.reload(),
        },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => app.quit(),
        },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          label: "Toggle Fullscreen",
          accelerator: process.platform === "darwin" ? "Ctrl+Cmd+F" : "F11",
          click: () => mainWindow?.setFullScreen(!mainWindow.isFullScreen()),
        },
        {
          label: "Zoom In",
          accelerator: "CmdOrCtrl+Plus",
          click: () => {
            const zoom = mainWindow?.webContents.getZoomFactor() || 1;
            mainWindow?.webContents.setZoomFactor(Math.min(zoom + 0.1, 3));
          },
        },
        {
          label: "Zoom Out",
          accelerator: "CmdOrCtrl+-",
          click: () => {
            const zoom = mainWindow?.webContents.getZoomFactor() || 1;
            mainWindow?.webContents.setZoomFactor(Math.max(zoom - 0.1, 0.5));
          },
        },
        {
          label: "Reset Zoom",
          accelerator: "CmdOrCtrl+0",
          click: () => mainWindow?.webContents.setZoomFactor(1),
        },
      ],
    },
  ];

  if (process.platform === "darwin") {
    template.unshift({ label: app.name, submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }] });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ── Lifecycle ──────────────────────────────────────────────────────────────
app.whenReady().then(() => {
  buildMenu();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
