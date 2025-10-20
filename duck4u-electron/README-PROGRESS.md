# 🦆 Duck4u - Desktop Companion

> Your AI-powered study companion that makes productivity actually enjoyable

**Status:** Week 1 Complete - Duck Window MVP ✅  
**Stack:** Electron + TypeScript + Vite

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development mode
npm run dev

# Build for production
npm run build
npm run package
```

---

## ✨ What's Implemented

### Duck Window (Week 1, Day 3-4) - Complete ✅
- **Frameless transparent window** (120x120px)
- **Always-on-top** behavior
- **Draggable** anywhere on screen
- **Animated duck** with 4 states (idle, walking, jumping, back)
- **Smart window sizing** - stays 120x120px, never expands

### Interactions
- **Click + Drag** - Move duck around screen
- **Double-click** - Opens control panel (coming in Day 5-7)
- **Right-click** - Context menu (coming in Day 5-7)

---

## 📁 Project Structure

```
duck4u-electron/
├── electron/              # Main process
│   ├── main.ts
│   ├── preload.ts
│   └── windows/
│       └── duckWindow.ts
├── src/
│   ├── duck-window/      # Duck UI & animations
│   └── types/
├── public/
│   └── animations/       # Duck GIF files
├── docs/                 # Documentation
└── duck.html            # Duck window entry
```

---

## 📚 Documentation

- **[docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)** - Setup, troubleshooting, development guide
- **[docs/IMPLEMENTATION.md](./docs/IMPLEMENTATION.md)** - Technical details, architecture, features

---

## 🎯 Roadmap

- ✅ **Week 1, Day 3-4:** Duck Window
- 🔜 **Week 1, Day 5-7:** Control Panel with React UI
- 🔜 **Week 2:** Audio recording + Whisper transcription
- 🔜 **Week 3:** AI chat integration
- 🔜 **Week 4:** Authentication + Stripe billing

---

## 🐛 Troubleshooting

### Duck doesn't appear
```bash
# Kill any running instances
taskkill /F /IM electron.exe
npm run dev
```

### Port 5173 in use
```bash
# Kill Vite process
Get-Process -Name node | Stop-Process -Force
npm run dev
```

See [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) for detailed troubleshooting.

---

## 📄 License

TBD (likely MIT or commercial)

---

**Let's ship this duck! 🦆🚀**

