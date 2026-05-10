const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

function createWindow() {
  const win = new BrowserWindow({
    show: false,
    backgroundColor: "#0a0a0b",
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 680,
    fullscreen: false,
    autoHideMenuBar: true,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
      zoomFactor: 1,
      devTools: isDev,
      /** exe `file://` — backend ga fetch bloklanmasin */
      webSecurity: isDev
    }
  });

  win.removeMenu();

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }

  win.once("ready-to-show", () => {
    win.maximize();
    win.show();
    win.setMenuBarVisibility(false);
    win.webContents.setZoomFactor(1);
  });

  win.webContents.on("did-finish-load", () => {
    win.webContents.setZoomFactor(1);
  });
}

app.whenReady().then(() => {
  app.commandLine.appendSwitch("disable-pinch");

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
