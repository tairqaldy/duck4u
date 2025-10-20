# Duck4u - Quick Start Guide

## 🚀 Ready to Build? Start Here

This is your **4-week sprint plan** to ship the MVP.

---

## Week 1: Foundation (Duck Window + Basic UI)

### Day 1-2: Project Setup
```bash
# Initialize Electron + React + TypeScript
npm create vite@latest portflow-electron -- --template react-ts
cd portflow-electron
npm install

# Add Electron dependencies
npm install -D electron electron-builder concurrently cross-env
npm install electron-is-dev

# Add required libraries
npm install zustand lottie-web @supabase/supabase-js
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Checklist:**
- [x] Electron main process running
- [x] React app renders in Electron window
- [x] TypeScript configured
- [ ] Tailwind CSS working

---

### Day 3-4: Duck Window
**Goal:** Get a duck walking on your screen

**Tasks:**
1. Create frameless window with transparency
2. Integrate Lottie animation (I desided to use my own)
3. Implement window dragging
4. Make window always-on-top

**Code Structure:**
```
electron/
  ├── main.ts              # Create duck window
  ├── windows/
  │   └── duckWindow.ts    # Duck window config
src/
  ├── windows/
  │   └── DuckWindow/
  │       ├── Duck.tsx     # Lottie component
  │       └── duck.json    # Animation file (need to get this)
```

**Resources Needed:**
- Lottie duck animation (commission from Fiverr ~$50, or use free placeholder from LottieFiles)

---

### Day 5-7: Control Panel Window
**Goal:** Click duck → panel appears

**Tasks:**
1. Create second Electron window (control panel)
2. Set up IPC communication (main ↔ renderer)
3. Build basic React UI with tabs
4. Position panel next to duck

**UI Components:**
- Tab navigation (Chat, Record, Stats, Settings)
- Empty state for each tab
- Close button

---

## Week 2: Core Recording Feature

### Day 8-10: Audio Capture
**Goal:** Record microphone input

**Tasks:**
1. Request microphone permissions
2. Use Web Audio API to capture audio
3. Display recording indicator
4. Save audio chunks to temp file

**Libraries:**
```bash
npm install @ffmpeg/ffmpeg  # For audio processing
```

---

### Day 11-14: Whisper Integration
**Goal:** Transcribe recorded audio

**Options:**
1. **Easy (Cloud):** Use OpenAI Whisper API
   ```bash
   npm install openai
   ```
   - Cost: $0.006 per minute
   - Requires internet
   - Fast to implement ✅ **Start here**

2. **Hard (Local):** Integrate whisper.cpp
   - Cost: Free
   - Works offline
   - Complex setup → **Phase 2**

**Recommendation:** Use cloud Whisper for MVP, add local option later

**Tasks:**
- [ ] Send audio file to Whisper API
- [ ] Display transcription in UI
- [ ] Save transcript to file (.txt)
- [ ] Save to SQLite database

---

## Week 3: AI Features

### Day 15-17: Backend Setup
**Goal:** Supabase project ready

**Steps:**
1. Create Supabase account (supabase.com)
2. Create new project
3. Set up database tables:
   ```sql
   -- users table (auto-created by Auth)
   
   -- subscriptions table
   CREATE TABLE subscriptions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES auth.users(id),
     tier TEXT NOT NULL, -- 'free', 'pro', 'premium'
     stripe_customer_id TEXT,
     stripe_subscription_id TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   
   -- usage_limits table
   CREATE TABLE usage_limits (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES auth.users(id),
     transcription_minutes_used INT DEFAULT 0,
     ai_enhancements_used INT DEFAULT 0,
     chat_messages_used INT DEFAULT 0,
     screen_vision_used INT DEFAULT 0,
     reset_date DATE,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. Set up Auth (enable email/password)
5. Get API keys

**Add to .env:**
```
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-key
```

---

### Day 18-21: AI Integration
**Goal:** Chat with AI, enhance transcripts

**Tasks:**
1. Install OpenAI SDK
   ```bash
   npm install openai
   ```

2. Build AI chat interface
3. Implement "Enhance Transcript" feature
4. Add usage tracking (count tokens)
5. Enforce free tier limits

**AI Features:**
- [ ] Chat with GPT-4-turbo
- [ ] Enhance transcript (create outline, summary)
- [ ] Chat context from saved transcripts
- [ ] Usage limits enforced

---

## Week 4: Auth, Billing & Launch

### Day 22-24: Authentication
**Goal:** Users can sign up and log in

**Options:**
1. **Clerk** (easier, better UI)
   ```bash
   npm install @clerk/clerk-react
   ```

2. **Supabase Auth** (free tier more generous)
   ```bash
   # Already installed
   ```

**Recommendation:** Use Clerk for faster implementation

**Tasks:**
- [ ] Sign up flow
- [ ] Login flow
- [ ] Persist auth state
- [ ] Gate AI features behind auth

---

### Day 25-26: Stripe Integration
**Goal:** Users can subscribe

**Steps:**
1. Create Stripe account
2. Create products:
   - Pro: $20/month
   - Premium: $35/month
3. Install Stripe SDK
   ```bash
   npm install @stripe/stripe-js stripe
   ```
4. Create checkout flow
5. Handle webhooks (Supabase Edge Function)

**Supabase Edge Function:**
```typescript
// supabase/functions/stripe-webhook/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'

serve(async (req) => {
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2022-11-15',
  })
  
  const signature = req.headers.get('stripe-signature')!
  const body = await req.text()
  
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    Deno.env.get('STRIPE_WEBHOOK_SECRET')!
  )
  
  // Handle subscription.created, subscription.updated, etc.
  // Update Supabase subscriptions table
})
```

---

### Day 27-28: Polish & Launch Prep

**Tasks:**
- [ ] Error handling (try/catch everywhere)
- [ ] Loading states (spinners, progress bars)
- [ ] Settings panel (duck behavior, audio input)
- [ ] Tutorial/onboarding (first-time user experience)
- [ ] Build installer (electron-builder)
- [ ] Create landing page

**electron-builder config:**
```json
// electron-builder.yml
appId: com.portflow.ai
productName: Portflow AI
directories:
  output: dist
  buildResources: build
files:
  - "!**/.vscode/*"
  - "!**/*.map"
win:
  target: nsis
  icon: build/icon.ico
mac:
  target: dmg
  icon: build/icon.icns
```

---

## Launch Day (Day 28)

### Morning: Build & Test
```bash
# Build for Windows
npm run build
npm run dist:win

# Test installer
# Install on fresh Windows VM
# Record demo video (3 minutes max)
```

### Afternoon: Launch
1. **Product Hunt:**
   - Post between 12:01 AM - 9:00 AM PST
   - Have 5 friends ready to upvote/comment
   - Respond to every comment

2. **Reddit:**
   - r/productivity: "I built an AI duck that takes lecture notes for you"
   - r/studying: "Show & Tell: Duck4u - My study companion"
   - r/SideProject: "Launched my Electron app after 4 weeks"

3. **Twitter:**
   - Thread showing development journey
   - Demo video
   - Tag relevant accounts (@ProductHunt, @electron, etc.)

---

## Post-Launch (Week 5+)

### First Week Focus: **Feedback Loop**
- Monitor Product Hunt comments
- Read Reddit feedback
- Talk to every user who signs up
- Fix critical bugs immediately

### Success Metrics:
- 100 signups in first week → good
- 10% activate (record a lecture) → great
- 3 paying customers → validate pricing

---

## Resources & Links

### Design
- **Figma Template:** [Electron App UI Kit](https://www.figma.com/community/file/123456789)
- **Lottie Animations:** [LottieFiles Duck](https://lottiefiles.com/search?q=duck)
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Colors:** [Coolors.co Generator](https://coolors.co/)

### Learning
- **Electron Tutorial:** [Electron Docs](https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites)
- **Whisper API:** [OpenAI Whisper Docs](https://platform.openai.com/docs/guides/speech-to-text)
- **Supabase Tutorial:** [Supabase Quickstart](https://supabase.com/docs/guides/getting-started)
- **Stripe Integration:** [Stripe Electron Guide](https://stripe.com/docs/payments/checkout)

### Communities
- **Electron Discord:** [discord.gg/electron](https://discord.gg/electron)
- **Indie Hackers:** [IndieHackers.com](https://www.indiehackers.com/)
- **r/SideProject:** Get feedback here

---

## Budget Breakdown (First Month)

| Item | Cost | Why |
|------|------|-----|
| **Duck Animation (Lottie)** | $50-200 | Need quality animation |
| **Domain (portflow.ai)** | $12/year | Branding |
| **Supabase Free Tier** | $0 | 50K users, enough for beta |
| **OpenAI API (testing)** | $100-300 | Transcription + chat during testing |
| **Stripe** | $0 (2.9% per transaction) | Only pay when you make money |
| **Landing Page Hosting** | $0 | Use Vercel free tier |
| **Total Upfront:** | **$162-512** | |

**After launch, monthly costs scale with users (~$3 per paid user)**

---

## When Things Go Wrong

### "Electron is too hard"
→ Use Tauri instead (smaller, Rust-based)
→ Or just build a web app first (no offline features)

### "Whisper.cpp won't compile"
→ Use cloud Whisper API only (simpler, costs $$$)

### "No one signs up"
→ Your landing page sucks. Improve copy, add video
→ Or you're targeting wrong audience. Talk to users.

### "People sign up but don't use it"
→ Onboarding is broken. Add tutorial.
→ Or product isn't valuable. Ask why they left.

### "People use it but don't pay"
→ Freemium limits too generous. Tighten them.
→ Or paid features not compelling. Add screen vision.

---

## Final Checklist Before Launch

- [ ] Duck walks smoothly on screen
- [ ] Click duck → control panel opens
- [ ] Record audio → save transcript
- [ ] AI chat works (GPT-4 responses)
- [ ] Sign up / Login works
- [ ] Stripe checkout works (test mode)
- [ ] Free tier limits enforced
- [ ] No critical bugs in happy path
- [ ] Demo video recorded (< 3 min)
- [ ] Landing page live with pricing
- [ ] Product Hunt page draft ready
- [ ] 5 friends ready to support launch

---

## 🦆 You Got This!

**Remember:** Perfect is the enemy of shipped.

Your MVP will be rough. That's okay. Get it in front of users fast and iterate.

**The goal of Week 4 isn't perfection—it's learning whether people want this.**

If they do, you'll have plenty of time to polish.

If they don't, you've only spent 4 weeks, not 6 months.

---

**Ready to start? Let's set up the project structure! 🚀**

