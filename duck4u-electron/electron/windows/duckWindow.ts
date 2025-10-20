import { BrowserWindow, screen, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

// Duck window size - constant for all windows
const DUCK_WIDTH = 120;
const DUCK_HEIGHT = 120;

// Track if IPC handlers are already registered
let handlersRegistered = false;

export function createDuckWindow(): BrowserWindow {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

  // Position duck at bottom-right corner initially
  const x = screenWidth - DUCK_WIDTH - 100;
  const y = screenHeight - DUCK_HEIGHT - 50;

  const duckWindow = new BrowserWindow({
    width: DUCK_WIDTH,
    height: DUCK_HEIGHT,
    x,
    y,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Force size constraints
  duckWindow.setMinimumSize(DUCK_WIDTH, DUCK_HEIGHT);
  duckWindow.setMaximumSize(DUCK_WIDTH, DUCK_HEIGHT);

  // Load the duck window HTML
  if (isDev) {
    duckWindow.loadURL('http://localhost:5173/duck.html');
  } else {
    duckWindow.loadFile(path.join(__dirname, '../../dist/duck.html'));
  }

  // Make window draggable - register handlers only once
  if (!handlersRegistered) {
    handlersRegistered = true;
    
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };
    let currentWindow: BrowserWindow | null = null;

    ipcMain.on('duck-start-drag', (event) => {
      // Get the window that sent the event
      currentWindow = BrowserWindow.fromWebContents(event.sender);
      if (!currentWindow) return;

      const mousePos = screen.getCursorScreenPoint();
      
      // Calculate offset only if not already dragging
      if (!isDragging) {
        const windowPos = currentWindow.getPosition();
        dragOffset = {
          x: mousePos.x - windowPos[0],
          y: mousePos.y - windowPos[1],
        };
      }
      
      isDragging = true;

      // Update position immediately using setBounds to ensure size stays constant
      if (currentWindow && !currentWindow.isDestroyed()) {
        currentWindow.setBounds({
          x: mousePos.x - dragOffset.x,
          y: mousePos.y - dragOffset.y,
          width: DUCK_WIDTH,
          height: DUCK_HEIGHT
        });
      }
    });

    // Listen for mouseup globally to stop dragging
    ipcMain.on('duck-stop-drag', () => {
      isDragging = false;
      currentWindow = null;
    });

    // Open control panel when duck is clicked (implement later)
    ipcMain.on('open-control-panel', () => {
      console.log('Opening control panel (not implemented yet)');
      // TODO: Create and show control panel window
    });
  }

  // Open DevTools in development
  if (isDev) {
    duckWindow.webContents.openDevTools({ mode: 'detach' });
  }

  return duckWindow;
}

