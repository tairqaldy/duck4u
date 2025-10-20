// Type declarations for Electron API exposed via preload script

export interface ElectronAPI {
  minimizeWindow: () => void;
  closeWindow: () => void;
  startDrag: () => void;
  stopDrag: () => void;
  openControlPanel: () => void;
  onDuckClick: (callback: () => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};

