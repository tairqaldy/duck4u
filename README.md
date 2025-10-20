# 🦆 Duck4u

> Your AI-powered study companion that makes productivity actually enjoyable

**Status:** Pre-development (PRD complete)  
**Target:** Ship MVP in 4 weeks  
**Stack:** Electron + React + TypeScript + OpenAI + Supabase

---

## 📁 Project Documentation

- **[PRD.md](./PRD.md)** - Complete Product Requirements Document (50+ pages)
- **[QUICK_START.md](./QUICK_START.md)** - 4-week development sprint plan
- **[TECH_ALTERNATIVES.md](./TECH_ALTERNATIVES.md)** - Technology options & trade-offs
- **[COST_CALCULATOR.md](./COST_CALCULATOR.md)** - Economics & pricing analysis
- **[brainstorm.txt](./brainstorm.txt)** - Original idea notes

---

## 🎯 What is Duck4u?

A desktop app featuring an animated rubber duck that:
- ✅ Transcribes lectures using AI (even in-person lectures!)
- ✅ Takes smart notes with GPT-4
- ✅ Acts as your study buddy (AI chat assistant)
- ✅ Makes studying less lonely (cute companion pet)
- ✅ Helps you focus (productivity tracking)

**Target Users:** University students (Bachelor's/Master's)  
**Monetization:** $20/month subscription (freemium model)

---

## 🏗️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Electron 28+ | Cross-platform desktop app |
| **Frontend** | React 18 + TypeScript | Modern, type-safe UI |
| **Animation** | Custom sprites/CSS | Developer-created animations |
| **Styling** | Tailwind CSS | Rapid development |
| **State** | Zustand | Lightweight state management |
| **Database** | SQLite (better-sqlite3) | Local-first storage |
| **Transcription** | OpenAI Whisper API | Speech-to-text |
| **AI Chat** | OpenAI GPT-4-turbo | Smart assistant |
| **Backend** | Supabase | Auth, user data, subscriptions |
| **Payments** | Stripe | Subscription billing |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Windows (Mac/Linux support in Phase 2)

### Initial Setup (Week 1, Day 1)

```bash
# Clone/navigate to project
cd duck4u

# Initialize Electron + React project
npm create vite@latest duck4u-electron -- --template react-ts
cd duck4u-electron

# Install dependencies
npm install

# Add Electron
npm install -D electron electron-builder concurrently cross-env wait-on
npm install electron-is-dev

# Add core libraries
npm install zustand @supabase/supabase-js openai

# Add styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Initialize git
git init
```

### Project Structure (to be created)

```
duck4u-electron/
├── electron/
│   ├── main.ts                 # Main process
│   ├── preload.ts              # IPC bridge
│   ├── windows/
│   │   ├── duckWindow.ts       # Duck overlay
│   │   └── controlPanel.ts     # Control panel
│   ├── services/
│   │   ├── audioCapture.ts
│   │   ├── whisperService.ts
│   │   └── screenCapture.ts
│   └── database/
│       └── db.ts               # SQLite setup
│
├── src/
│   ├── App.tsx
│   ├── windows/
│   │   ├── DuckWindow/
│   │   │   └── Duck.tsx
│   │   └── ControlPanel/
│   │       ├── ControlPanel.tsx
│   │       ├── ChatTab.tsx
│   │       ├── RecordTab.tsx
│   │       ├── StatsTab.tsx
│   │       └── SettingsTab.tsx
│   ├── components/
│   │   └── ui/
│   ├── hooks/
│   ├── stores/
│   └── utils/
│
├── assets/
│   ├── animations/
│   │   └── duck-sprites.png
│   ├── sounds/
│   └── icons/
│
├── public/
├── package.json
├── tsconfig.json
├── electron-builder.yml
└── README.md
```

---

## 📋 MVP Feature Checklist

### Week 1: Foundation
- [ ] Electron + React boilerplate running
- [ ] Duck window (frameless, transparent, always-on-top)
- [ ] Custom duck animation integrated
- [ ] Window dragging works
- [ ] Control panel window appears on click

### Week 2: Recording
- [ ] Audio capture (Web Audio API)
- [ ] Recording indicator UI
- [ ] Save audio files
- [ ] Whisper API integration
- [ ] Transcription display
- [ ] Save transcripts to files + SQLite

### Week 3: AI Features
- [ ] Supabase project setup
- [ ] Auth (Clerk or Supabase)
- [ ] OpenAI GPT-4 chat integration
- [ ] "Enhance Transcript" feature
- [ ] Usage tracking & limits
- [ ] Free tier enforcement

### Week 4: Launch
- [ ] Stripe integration
- [ ] Subscription checkout flow
- [ ] Settings panel
- [ ] Onboarding tutorial
- [ ] Error handling & polish
- [ ] Build installer (Windows)
- [ ] Landing page
- [ ] Demo video
- [ ] Product Hunt launch

---

## 💰 Pricing Strategy

### Free Tier: "Study Buddy"
- 60 min transcription/month
- 3 AI enhancements/month
- 10 AI chat messages/day
- Basic duck companion

### Pro Tier: $20/month
- Unlimited transcription
- 20 hours AI enhancements/month
- 200 AI chat messages/day
- 10 screen vision queries/day
- Priority support

### Premium Tier: $35/month
- Everything unlimited
- 50 screen vision queries/day
- Early access to features
- Custom duck skins

---

## 📊 Success Metrics

**North Star:** Weekly Active Study Hours

**Goals (Month 12):**
- 10,000 total users
- 5% conversion to paid ($10K MRR)
- 15% Day 7 retention
- NPS > 40

---

## 🗓️ Roadmap

- **Phase 1 (Week 1-4):** MVP - Duck + Transcription + AI Chat
- **Phase 2 (Week 5-8):** Computer Vision (screen capture AI)
- **Phase 3 (Week 9-12):** Emotional features (pet interactions, skins)
- **Phase 4 (Month 4-6):** Study tools (flashcards, Pomodoro, exports)
- **Phase 5 (Month 6-9):** Mac/Linux support

---

## 🤝 Contributing

This is currently a solo project in pre-development.

If you're interested in collaborating, reach out!

---

## 📄 License

TBD (likely MIT or commercial)

---

## 🐛 Issues & Questions

Create an issue in this repo or reach out directly.

---

## 🙏 Acknowledgments

- Inspired by Desktop Goose (but for productivity!)
- Built with love for students struggling with note-taking

---

**Let's ship this duck! 🦆🚀**

