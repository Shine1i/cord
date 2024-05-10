import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld(
  "topbar",
  {
    min: () => {
      ipcRenderer.send("minimize-window");
    },
    max: () => {
      ipcRenderer.send("maximize-window");
    },
    close: () => {
      ipcRenderer.send("close-window");
    }
  }
);
