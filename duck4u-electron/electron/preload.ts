import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  
  // Duck window specific
  startDrag: () => ipcRenderer.send('duck-start-drag'),
  stopDrag: () => ipcRenderer.send('duck-stop-drag'),
  
  // Control panel (for later)
  openControlPanel: () => ipcRenderer.send('open-control-panel'),
  
  // Listeners
  onDuckClick: (callback: () => void) => {
    ipcRenderer.on('duck-clicked', callback);
  }
});

// Type declarations for TypeScript
declare global {
  interface Window {
    electronAPI: {
      minimizeWindow: () => void;
      closeWindow: () => void;
      startDrag: () => void;
      openControlPanel: () => void;
      onDuckClick: (callback: () => void) => void;
    };
  }
}

