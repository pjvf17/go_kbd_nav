const {
  contextBridge,
  ipcRenderer,
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api",
  {
    click: (channel: string, data: { x: number; y: number }) => {
      // whitelist channels
      let validChannels = ["click"];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
  },
);
