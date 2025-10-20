import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { createDuckWindow } from './windows/duckWindow';

let duckWindow: BrowserWindow | null = null;

function createMainWindow() {
  // For now, we'll just create the duck window
  // Later we'll add the control panel window
  duckWindow = createDuckWindow();
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle IPC events here later

