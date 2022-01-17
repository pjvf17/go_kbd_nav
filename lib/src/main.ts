// Modules to control application life and create native browser window
import { app, BrowserWindow } from "electron";
// import path from "path";

const createWindow = () => {
   const win = new BrowserWindow({
     width: 800,
     height: 600
   })
 
   win.loadFile('dist/prod/index.html')
 }

 app.whenReady().then(() => {
   createWindow()
 })