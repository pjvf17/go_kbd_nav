// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { exec } from "child_process";

// https://stackoverflow.com/questions/44391448/electron-require-is-not-defined

let win: BrowserWindow;

const createWindow = () => {
  win = new BrowserWindow({
    transparent: true,
    frame: false,
    webPreferences: {
      contextIsolation: true, // protect against prototype pollution
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });
  win.setIgnoreMouseEvents(true, { forward: true });
  ipcMain.handle("getBounds", async () => {
    return win.getBounds();
  });

  win.setContentSize(800, 800);
  win.setAlwaysOnTop(true);
  win.loadFile("dist/prod/index.html");
};

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("click", (_, data: { x: number; y: number }) => {
  const bounds = win.getBounds();
  data.x += bounds.x;
  data.y += bounds.y;
  data.x = Math.round(data.x);
  data.y = Math.round(data.y);
  console.log(data);
  exec(`cliclick c:${data.x},${data.y}`);
  exec(`cliclick c:${data.x},${data.y}`);
  exec("osascript -e 'tell app \"Electron\" to activate'");
});
