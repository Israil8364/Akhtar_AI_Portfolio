# Akhtar AI Twin Portfolio - Implementation TODO

**Tech Stack:** Next.js 14 + TypeScript + Tailwind + Framer Motion + Groq/Gemini  
**Timeline:** 4 Days MVP  
**Reference:** toukoum.fr style

---

## 🚀 PHASE 1: PROJECT SETUP (Day 1 - Morning)

### 1.1 Initialize Next.js Project
```bash
npx create-next-app@latest akhtar-portfolio --typescript --tailwind --app
```
- [ ] Choose App Router, TypeScript, Tailwind CSS, ESLint
- [ ] Install dependencies: `framer-motion`, `lucide-react`, `@google/generative-ai` or `groq-sdk`
- [ ] Set up `.env.local` with API keys (GROQ_API_KEY or GEMINI_API_KEY)

### 1.2 Create Folder Structure
```
/app
  /(site)/page.tsx, me/page.tsx, projects/page.tsx, skills/page.tsx, contact/page.tsx
  /api/chat/route.ts
  layout.tsx, globals.css
/components
  /Chat: ChatPanel.tsx, ChatInput.tsx, ChatMessage.tsx, SuggestionPills.tsx
  /Nav: BottomNav.tsx, QuickMenu.tsx
  /UI: GlassCard.tsx, GlassButton.tsx, Chip.tsx
  AppShell.tsx, BackgroundLayer.tsx, SplashCursor.tsx
/config
  profile.ts, projects.ts, skills.ts, faq.ts, ai.ts
/lib
  /ai: index.ts, groq.ts, gemini.ts, prompts.ts
  utils.ts
```

### 1.3 Define TypeScript Types
Create `/lib/types.ts`:
```typescript
export type Profile = {
  name: string;
  headline: string;
  tagline: string;
  location: string;
  avatarUrl: string;
  intro: string;
  tags: string[];
}

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[]; // 4 images
  links?: { demo?: string; caseStudy?: string; github?: string };
}

export type SkillsGroup = {
  group: string;
  skills: string[];
}

export type FAQCategory = {
  title: string;
  questions: string[];
}

export type Contact = {
  email: string;
  phone: string;
  location: string;
  socials: { linkedin?: string; instagram?: string; facebook?: string };
}
```

### 1.4 Populate Config Files

**`/config/profile.ts`:**
```typescript
export const profile = {
  name: "Md Akhtar",
  headline: "Hey, i am Akhtar",
  tagline: "I cooked Automations",
  location: "Kolkata, West Bengal, India",
  avatarUrl: "/avatar.png",
  intro: "I help businesses run themselves...",
  tags: ["AI Automation", "AI", "Storytelling", "Lead Generation", "Python", "Sales"]
}
```

**`/config/projects.ts`:**
```typescript
export const projects = [{
  id: "ai-research-agent",
  title: "AI Research Agent: Chat for Instant Market & Competitor Analysis",
  category: "Automation",
  description: "...",
  images: ["/p1.png", "/p2.png", "/p3.png", "/p4.png"]
}]
```

**`/config/skills.ts`:**
```typescript
export const skills = [{
  group: "AI and Automation",
  skills: ["Sales", "Lead Generation", "AI", "Automations", "AI Automations"]
}]
```

**`/config/faq.ts`:**
```typescript
export const faqCategories = [
  { title: "About Me", questions: ["Who are you?", "What are your passions?"] },
  { title: "Professional", questions: ["Do you have previous work?", "Why should I hire you?"] },
  { title: "Projects", questions: ["What projects are you most proud of?"] },
  { title: "Skills", questions: ["What are your skills?"] },
  { title: "Fun & Personal", questions: ["What's the craziest thing you've ever done?"] },
  { title: "Contact", questions: ["How can I reach you?"] }
]
```

**`/config/contact.ts`:**
```typescript
export const contact = {
  email: "mdakhtarith@gmail.com",
  phone: "9088803358",
  location: "Kolkata",
  socials: {
    linkedin: "https://linkedin.com/in/mdakhtar",
    instagram: "https://instagram.com/mdakhtar",
    facebook: "https://facebook.com/mdakhtar"
  }
}
```

---

## 🎨 PHASE 2: DESIGN SYSTEM (Day 1 - Afternoon)

### 2.1 Global Styles (`app/globals.css`)
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --glass-bg: rgba(255, 255, 255, 0.12);
  --glass-border: rgba(255, 255, 255, 0.25);
  --text-primary: rgba(0, 0, 0, 0.9);
  --text-secondary: rgba(0, 0, 0, 0.75);
}

body { font-family: 'Inter', sans-serif; }

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.gradient-bg {
  background: 
    radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.15), transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.15), transparent 50%),
    radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.15), transparent 50%);
}
```

### 2.2 Core Components

**`components/BackgroundLayer.tsx`:**
- [ ] Fixed position, inset-0, z-index: -1
- [ ] Apply gradient-bg class
- [ ] Add subtle noise overlay (opacity 0.08)

**`components/SplashCursor.tsx`:**
- [ ] Integrate WebGL cursor code
- [ ] Fixed position, pointer-events: none, z-index: 1
- [ ] Disable on mobile: `{!isMobile && <SplashCursor />}`

**`components/UI/GlassCard.tsx`:**
```tsx
export function GlassCard({ children, className }: Props) {
  return (
    <div className={cn("glass rounded-3xl p-8 md:p-10", className)}>
      {children}
    </div>
  )
}
```

**`components/UI/GlassButton.tsx`:**
- [ ] Square: 110px desktop, 90px mobile
- [ ] Glass effect, rounded-2xl
- [ ] Hover: translateY(-2px), scale(1.02), brighter border
- [ ] Active: scale(0.98)
- [ ] Transition: 200ms ease-out

**`components/UI/Chip.tsx`:**
- [ ] Rounded-full, glass bg, 12-14px text
- [ ] Padding: 8px 16px
- [ ] Hover: lighten

---

## 🧩 PHASE 3: NAVIGATION & CHAT UI (Day 1 - Evening)

### 3.1 Bottom Navigation
**`components/Nav/BottomNav.tsx`:**
- [ ] Fixed bottom, centered, pill shape
- [ ] Glass background with blur
- [ ] 5 items: Me, Projects, Skills, Contact, 3-dot menu
- [ ] Active state: brighter text + underline/glow
- [ ] Smooth transition for active indicator
- [ ] Min tap size: 44px

### 3.2 Chat Input
**`components/Chat/ChatInput.tsx`:**
- [ ] Pill shape: height 56px, width 600px desktop
- [ ] Glass bg, rounded-full, 1px border
- [ ] Placeholder: "Ask me anything…."
- [ ] Send arrow icon (right-aligned)
- [ ] Focus: brighter border + glow ring
- [ ] Enter key sends message
- [ ] Responsive: 100% width mobile

### 3.3 Chat Messages
**`components/Chat/ChatMessage.tsx`:**
- [ ] User bubble: right-aligned, darker glass, rounded-2xl
- [ ] Assistant bubble: left-aligned, light glass, rounded-2xl
- [ ] Spacing: 12px between messages
- [ ] Auto-scroll to newest

**`components/Chat/SuggestionPills.tsx`:**
- [ ] Show during typing state
- [ ] Rounded-full pills with glass bg
- [ ] Clickable to send question
- [ ] Examples: "What are your projects?", "What are you working on right now?"

### 3.4 Quick Menu (3-dot)
**`components/Nav/QuickMenu.tsx`:**
- [ ] Dropdown/modal with glass surface
- [ ] Categorized FAQ questions
- [ ] Click question → insert into chat → send
- [ ] Close on outside click

---

## 🤖 PHASE 4: AI INTEGRATION (Day 2)

### 4.1 AI Provider Setup
**`/lib/ai/groq.ts` or `/lib/ai/gemini.ts`:**
- [ ] Install SDK: `npm install groq-sdk` or `@google/generative-ai`
- [ ] Create chat function with streaming support
- [ ] Handle errors gracefully

**`/lib/ai/prompts.ts`:**
```typescript
export function buildSystemPrompt() {
  return `You are Akhtar's AI Twin. You represent Md Akhtar, an AI automation specialist.

PERSONALITY:
- Coffee-chat friendly, business casual
- Confident and concise
- Encourage contact naturally

FACTS:
- What you do: Build smart AI automations that save teams hours
- Skills: Test Automation, Marketing, Sales, AI Automation, Lead Generation, Storytelling
- Location: Kolkata, India
- Personal: Self-taught, night owl, coffee enthusiast, chess + cricket

GUARDRAILS:
- Never invent fake projects or experience
- If unsure: "I don't want to guess — but here's what I can share…"
- Keep responses concise unless asked for depth
- Redirect unrelated personal questions politely

PROJECTS:
${JSON.stringify(projects, null, 2)}

SKILLS:
${JSON.stringify(skills, null, 2)}

CONTACT:
${JSON.stringify(contact, null, 2)}`
}
```

### 4.2 Chat API Route
**`/app/api/chat/route.ts`:**
```typescript
import { buildSystemPrompt } from '@/lib/ai/prompts'
import { streamChat } from '@/lib/ai/groq' // or gemini

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  const systemPrompt = buildSystemPrompt()
  const fullMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ]
  
  const stream = await streamChat(fullMessages)
  return new Response(stream)
}
```

### 4.3 Frontend Chat Logic
**`components/Chat/ChatPanel.tsx`:**
- [ ] useState for messages array
- [ ] Send message → POST to /api/chat
- [ ] Stream response and update UI
- [ ] Show typing indicator during response
- [ ] Handle errors with retry option

---

## 📄 PHASE 5: PAGES (Day 2-3)

### 5.1 Home Page (`app/(site)/page.tsx`)
- [ ] Vertical center layout
- [ ] Avatar (160px desktop, 120px mobile, circular)
- [ ] Headline: "Hey, i am Akhtar"
- [ ] Tagline: "I cooked Automations"
- [ ] Chat input centered below
- [ ] 2x2 grid of glass buttons (Me, Projects, Skills, Contact)
- [ ] Chat interaction functional

### 5.2 Me Page (`app/(site)/me/page.tsx`)
- [ ] GlassCard container
- [ ] Name: Md Akhtar
- [ ] Location: Kolkata, West Bengal, India
- [ ] Introduction paragraph
- [ ] Tag chips: AI Automation, AI, Storytelling, Lead Generation, Python, Sales
- [ ] Personal details section
- [ ] Scrollable, clean reading

### 5.3 Projects Page (`app/(site)/projects/page.tsx`)
- [ ] Project carousel with arrows
- [ ] Each project: title, category, description
- [ ] 2x2 image grid (4 images, rounded-xl, 10px gap)
- [ ] Left/right navigation
- [ ] Snap scrolling
- [ ] Lazy load images

### 5.4 Skills Page (`app/(site)/skills/page.tsx`)
- [ ] Headline: "Skills & Expertise"
- [ ] Category: "AI and Automation"
- [ ] Chip grid: Sales, Lead Generation, AI, Automations, AI Automations
- [ ] Hover effects on chips

### 5.5 Contact Page (`app/(site)/contact/page.tsx`)
- [ ] Email (mailto link): mdakhtarith@gmail.com
- [ ] Phone (tel link): 9088803358
- [ ] Location: Kolkata
- [ ] Social icons: LinkedIn, Instagram, Facebook
- [ ] Username: @mdakhtar
- [ ] Friendly message
- [ ] NO forms in MVP

### 5.6 App Layout (`app/layout.tsx`)
- [ ] Integrate BackgroundLayer
- [ ] Integrate SplashCursor
- [ ] Persistent BottomNav
- [ ] Page transition animations (Framer Motion)

---

## ✨ PHASE 6: POLISH (Day 3-4)

### 6.1 Responsive Design
- [ ] Test: 1920px, 1440px, 1024px, 768px, 375px
- [ ] Fix breakpoints, ensure no horizontal scroll
- [ ] Adjust button sizes for mobile (min 44px)
- [ ] Test touch interactions

### 6.2 Animations
- [ ] Button hover lift (translateY -2px, 200ms)
- [ ] Page transitions (300ms fade/slide)
- [ ] Chat typing animation (dots)
- [ ] Smooth cursor splash effect

### 6.3 Performance
- [ ] Compress images
- [ ] Lazy load project images
- [ ] Optimize SplashCursor (disable on mobile)
- [ ] Target: < 2s load time, Lighthouse > 90

### 6.4 Accessibility
- [ ] Keyboard navigation
- [ ] Focus states (glow rings, not default blue)
- [ ] Readable contrast
- [ ] ARIA labels

### 6.5 Testing
- [ ] All routes work
- [ ] Chat sends/receives
- [ ] FAQ menu functional
- [ ] Contact links work
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge

---

## 🚀 PHASE 7: DEPLOYMENT (Day 4)

### 7.1 Vercel Deployment
```bash
vercel
```
- [ ] Set environment variables: GROQ_API_KEY or GEMINI_API_KEY
- [ ] Test production build
- [ ] Verify API endpoints work
- [ ] Check performance metrics

### 7.2 Final Checks
- [ ] UI matches screenshots (glass tiles, minimal, centered hero, pill input)
- [ ] Chat works with Groq/Gemini
- [ ] FAQ clickable
- [ ] Projects editable via config
- [ ] Cursor animation integrated
- [ ] Responsive on all devices
- [ ] Feels premium, modern, chat-first

---

## ✅ ACCEPTANCE CRITERIA

**Visual:**
- ✅ Liquid glass tiles
- ✅ Clean minimal layout
- ✅ Centered hero
- ✅ Pill chat input
- ✅ Gradient background
- ✅ Smooth cursor

**Functional:**
- ✅ All pages route correctly
- ✅ Chat works (Groq/Gemini)
- ✅ FAQ menu works
- ✅ Projects config-driven
- ✅ Responsive UI

**Experience:**
- ✅ Modern, premium, simple, fast, chat-first
- ✅ NOT a normal portfolio website

---

## 🎯 KEY REMINDERS

**DO:**
- Use Next.js 14 App Router + TypeScript + Tailwind
- Use Groq for speed (or Gemini as fallback)
- Config-driven content (easy to edit)
- Glass effects everywhere
- Smooth animations (200-300ms)
- Deploy to Vercel

**DON'T:**
- ❌ No separate backend
- ❌ No database in MVP
- ❌ No CMS initially
- ❌ No user login
- ❌ No heavy custom CSS
- ❌ No OpenAI

**Total Tasks:** ~150  
**Timeline:** 4 days  
**Success:** Feels like toukoum.fr - premium, interactive, memorable
