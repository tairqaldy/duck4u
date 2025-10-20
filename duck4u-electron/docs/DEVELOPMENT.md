# 🛠️ Development Guide

Complete guide for developing Duck4u.

---

## 📋 Table of Contents
1. [Setup](#setup)
2. [Running the App](#running-the-app)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Build & Package](#build--package)
6. [Troubleshooting](#troubleshooting)

---

## Setup

### Prerequisites
- Node.js 18+
- npm
- Windows (Mac/Linux support coming later)

### First Time Installation

```bash
cd duck4u-electron
npm install
```

### Dependencies Installed
- **Electron 38** - Desktop app framework
- **Vite 7** - Dev server with HMR
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling (ready for control panel)
- **Zustand** - State management (for later)
- **Supabase Client** - Backend (for later)
- **OpenAI SDK** - AI features (for later)

---

## Running the App

### Development Mode

```bash
npm run dev
```

This command:
1. Starts Vite dev server on http://localhost:5173
2. Waits for Vite to be ready
3. Launches Electron with the duck window
4. Opens DevTools automatically

**What you should see:**
- Small duck window at bottom-right of screen
- Duck animating (idle → walking → jumping → back)
- DevTools window (can be closed if not needed)

### Individual Commands

If `npm run dev` fails, run these separately:

```bash
# Terminal 1: Start Vite
npm run dev:vite

# Terminal 2: Start Electron (after Vite is ready)
npm run dev:electron
```

---

## Project Structure

```
duck4u-electron/
├── electron/                      # Main process (Node.js)
│   ├── main.ts                   # App initialization
│   ├── preload.ts                # IPC bridge (secure)
│   └── windows/
│       └── duckWindow.ts         # Duck window configuration
│
├── src/                          # Renderer process (Browser)
│   ├── duck-window/
│   │   ├── duck-main.ts          # Duck window entry point
│   │   ├── duck.css              # Duck styles
│   │   └── DuckAnimationController.ts  # State machine
│   └── types/
│       └── electron.d.ts         # TypeScript definitions
│
├── public/
│   └── animations/               # Duck GIF assets
│       ├── duck_idle.gif
│       ├── duck_jump.gif
│       ├── duck_run_aside.gif
│       └── duck_run_back.gif
│
├── dist-electron/                # Compiled main process
├── dist/                         # Compiled renderer
├── docs/                         # Documentation
├── duck.html                     # Duck window HTML
├── index.html                    # Main window HTML (future)
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # Renderer TS config
└── tsconfig.electron.json       # Main process TS config
```

---

## Development Workflow

### Hot Reload

Vite provides automatic hot reload for:
- `src/duck-window/duck-main.ts`
- `src/duck-window/duck.css`
- `src/duck-window/DuckAnimationController.ts`

Changes appear instantly without restarting!

### Main Process Changes

For changes to Electron code, you need to rebuild:

```bash
# Rebuild Electron code
npm run build:electron

# Restart the app
taskkill /F /IM electron.exe
npm run dev
```

### Testing Animations

To speed up animation state transitions for testing:

Edit `src/duck-window/DuckAnimationController.ts`:

```typescript
// Change from:
this.scheduleNextTransition(2000, 5000);

// To (faster):
this.scheduleNextTransition(500, 1000);
```

### Debugging

**Browser DevTools** (opens automatically):
- Console for renderer process logs
- Network tab for asset loading
- Elements tab for DOM inspection

**Main Process Logs:**
- Appear in the terminal where you ran `npm run dev`
- Use `console.log()` in `electron/` files

---

## Build & Package

### Development Build

```bash
# Build renderer (Vite)
npm run build

# Build main process (TypeScript)
npm run build:electron
```

### Production Package

```bash
# Create installer
npm run package
```

This creates:
- Windows: `.exe` installer in `release/`
- Future: `.dmg` for Mac, `.AppImage` for Linux

---

## Troubleshooting

### Issue: Electron doesn't start

**Symptoms:** `npm run dev` runs but no duck window appears

**Solution:**
```bash
# Check if Vite is running on port 5173
# If not, check for port conflicts
netstat -ano | findstr :5173

# Kill process using port
taskkill /F /PID <PID>

# Restart
npm run dev
```

---

### Issue: Port 5173 already in use

**Symptoms:** `Error: Port 5173 is already in use`

**Solution:**
```bash
# Kill all Node processes
Get-Process -Name node | Stop-Process -Force

# Kill all Electron processes
taskkill /F /IM electron.exe

# Restart
npm run dev
```

---

### Issue: Duck window is black/blank

**Symptoms:** Duck window appears but shows black screen

**Causes & Fixes:**

1. **Animations not loading:**
   ```bash
   # Check if GIFs exist
   ls public/animations/
   
   # Should see:
   # duck_idle.gif, duck_jump.gif, duck_run_aside.gif, duck_run_back.gif
   ```

2. **JavaScript error:**
   - Open DevTools (auto-opens in dev mode)
   - Check Console for red errors
   - Fix the error and save (hot reload will update)

3. **Build issue:**
   ```bash
   # Clean and rebuild
   rm -r dist dist-electron
   npm run build
   npm run build:electron
   npm run dev
   ```

---

### Issue: Can't drag the duck

**Symptoms:** Duck window appears but won't move when dragged

**Solutions:**

1. **Check DevTools console:**
   - Should see no errors when clicking duck
   - If errors appear, check IPC handlers

2. **Verify window size stays 120x120:**
   - Duck window should never expand
   - If it does, rebuild: `npm run build:electron`

3. **Check IPC communication:**
   ```javascript
   // In DevTools console:
   window.electronAPI.startDrag()
   // Should move the window slightly
   ```

---

### Issue: Duck window expands during dragging

**Symptoms:** After dragging, windows behind duck become unclickable

**This was fixed in final implementation:**
- Window size is locked to 120x120px using `setBounds()`
- `setMinimumSize()` and `setMaximumSize()` enforce constraints
- If issue persists, rebuild: `npm run build:electron`

---

### Issue: TypeScript errors

**Symptoms:** Red squiggly lines in editor

**Solutions:**

```bash
# Check Electron code
npm run build:electron

# Check renderer code
npx tsc --noEmit

# Restart TypeScript server in VS Code
# Cmd+Shift+P > "TypeScript: Restart TS Server"
```

---

### Issue: DevTools won't close

**Symptoms:** DevTools window keeps reopening

**Solution:**

Edit `electron/windows/duckWindow.ts`:

```typescript
// Comment out this line:
if (isDev) {
  // duckWindow.webContents.openDevTools({ mode: 'detach' });
}
```

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server + Electron |
| `npm run dev:vite` | Start only Vite server |
| `npm run dev:electron` | Start only Electron |
| `npm run build` | Build renderer (Vite) |
| `npm run build:electron` | Build main process (TS) |
| `npm run package` | Create installer |
| `npx tsc --noEmit` | Check TS errors |

---

## Development Tips

1. **Fast Iteration:** Keep Vite running, restart only Electron when needed
2. **Clean State:** Kill all processes before debugging weird issues
3. **Check Both Consoles:** Main process (terminal) and renderer (DevTools)
4. **Use Hot Reload:** Most changes don't need restart
5. **Duck Position:** Modify `duckWindow.ts` x/y values to change start position

---

## Next Steps

After completing Duck Window (Week 1, Day 3-4), move to:

**Week 1, Day 5-7: Control Panel**
- Create second Electron window
- Set up React UI with tabs
- IPC communication between windows
- Position panel next to duck

See project PRD in `docs/` folder for full roadmap.

---

**Happy Duck Development! 🦆**

