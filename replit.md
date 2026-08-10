# BRDM Public School — Project Overview

A school website for **BRDM Public School, Kaithal, Haryana**, built as a pnpm monorepo.

---

## Architecture

| Artifact | Path | Description |
|---|---|---|
| Frontend | `artifacts/brdm-school` | React 19 + Vite + Tailwind CSS v4 school website |
| API Server | `artifacts/api-server` | Express 5 backend (AI chat, contact/admissions forms) |
| Mockup Sandbox | `artifacts/mockup-sandbox` | Design/prototyping canvas (internal) |

---

## Complete Folder & File Audit

> **Last updated:** 2026-08-06
> Auto-update: Run `bash scripts/update-audit.sh` anytime to regenerate this section.

---

### 📁 Root (Project Root)

```
/
├── package.json          — Root workspace scripts: build, typecheck, dev, dev:web, dev:api
├── pnpm-workspace.yaml   — Workspace package globs (artifacts/*, lib/*); catalog versions
├── pnpm-lock.yaml        — Resolved dependency lockfile (do not edit manually)
├── tsconfig.json         — Root TypeScript project references
├── tsconfig.base.json    — Shared TypeScript compiler defaults for all packages
├── project.md            — Project setup notes
├── replit.md             — THIS FILE — Project overview + folder audit
├── replit.nix            — Nix system dependencies (unzip)
└── .gitignore            — Ignores .env files, node_modules, dist, etc.
```

---

### 📁 artifacts/brdm-school — Main Website (Frontend)

**Tech:** React 19, Vite 7, Tailwind CSS v4, Wouter (routing), Framer Motion, Radix UI, Lucide Icons

```
artifacts/brdm-school/
├── package.json          — All frontend dependencies
├── vite.config.ts        — Vite config: PORT/BASE_PATH, /api proxy to localhost:8080
├── tsconfig.json         — Browser TypeScript config
├── components.json       — Shadcn/Radix component config
├── index.html            — HTML shell (Vite entry point)
│
├── public/               — Static assets served as-is
│   ├── favicon.ico / favicon.png / favicon.svg / favicon-192.png — Browser icons
│   ├── logo.png                — School logo
│   ├── school-bg.jpg           — Hero background photo
│   ├── principal.png           — Principal's photo
│   ├── admission-banner.png    — Admissions page banner
│   ├── earth-day-event.png     — Event photo
│   ├── modern-library.png      — Library photo
│   ├── sports-recreation.png   — Sports facility photo
│   └── robots.txt              — SEO crawl rules
│
└── src/
    ├── main.tsx               — React root mount + global CSS import
    ├── index.css              — Global Tailwind theme tokens + layout styles
    ├── App.tsx                — App shell: Navbar, Footer, Routes, global widgets
    ├── lib/
    │   └── utils.ts           — `cn()` className utility (clsx + tailwind-merge)
    │
    ├── hooks/
    │   ├── useCountUp.ts      — Animated number counter (used in StatsCounter)
    │   ├── use-mobile.tsx     — Responsive breakpoint hook (isMobile)
    │   └── use-toast.ts       — Toast notification hook
    │
    ├── pages/                 — One file per route
    │   ├── HomePage.tsx       — / — Hero, Stats, Features, CampusLife, FAQ
    │   ├── AboutPage.tsx      — /about — School history, mission, values
    │   ├── PrincipalPage.tsx  — /principal — Principal's message
    │   ├── FacultyPage.tsx    — /faculty — Faculty listing
    │   ├── AcademicsPage.tsx  — /academics — Curriculum and programs
    │   ├── CalendarPage.tsx   — /calendar — Academic calendar
    │   ├── NewsPage.tsx       — /news — News and events
    │   ├── GalleryPage.tsx    — /gallery — Campus photo gallery
    │   ├── ContactPage.tsx    — /contact — Contact form (needs RESEND_API_KEY)
    │   ├── AdmissionsPage.tsx — /admissions — Admissions form (needs RESEND_API_KEY)
    │   └── not-found.tsx      — 404 fallback page
    │
    └── components/
        ├── layout/
        │   ├── Navbar.tsx     — Responsive top navigation bar with mobile menu
        │   └── Footer.tsx     — Site footer with links and school info
        │
        ├── sections/          — Page content sections (used inside pages)
        │   ├── Hero.tsx           — Homepage hero with background image + CTA
        │   ├── StatsCounter.tsx   — "Numbers That Speak" animated stats section
        │   ├── Features.tsx       — Key school features/highlights
        │   ├── CampusLife.tsx     — Campus life photos and description
        │   ├── Testimonials.tsx   — Parent/student testimonials carousel
        │   ├── FAQ.tsx            — Frequently asked questions (accordion)
        │   ├── ChatBoard.tsx      — (Legacy) inline chat section — now replaced by ChatWidget
        │   ├── About.tsx          — About page content
        │   ├── PrincipalMessage.tsx — Principal's message section
        │   ├── FacultySection.tsx — Faculty cards/listing
        │   ├── AcademicsExtra.tsx — Extra academics content
        │   ├── AcademicCalendar.tsx — Academic calendar table/view
        │   ├── Admissions.tsx     — Admissions form and info
        │   ├── Contact.tsx        — Contact form section
        │   ├── Gallery.tsx        — Photo gallery grid
        │   └── NewsEvents.tsx     — News and events listing
        │
        └── ui/                — Reusable UI primitives and site-specific widgets
            ├── ChatWidget.tsx     — ⭐ Floating AI chat widget (bottom-right corner)
            │                         Opens on click, powered by Groq AI (llama-3.1-8b-instant)
            │                         Only answers BRDM School-related questions
            ├── WhatsAppButton.tsx — Fixed WhatsApp floating button
            ├── ScrollToTop.tsx    — Back-to-top button
            ├── ScrollProgress.tsx — Page scroll progress bar (top of page)
            ├── PageBanner.tsx     — Inner page banner/hero
            ├── TourGuide.tsx      — Site tour guide overlay
            │
            └── [Radix/Shadcn UI Primitives — do not edit directly]
                accordion.tsx, alert.tsx, alert-dialog.tsx, aspect-ratio.tsx,
                avatar.tsx, badge.tsx, breadcrumb.tsx, button.tsx, button-group.tsx,
                calendar.tsx, carousel.tsx, chart.tsx, checkbox.tsx, collapsible.tsx,
                command.tsx, context-menu.tsx, dialog.tsx, drawer.tsx,
                dropdown-menu.tsx, empty.tsx, field.tsx, form.tsx, hover-card.tsx,
                input.tsx, input-group.tsx, input-otp.tsx, item.tsx, kbd.tsx,
                label.tsx, menubar.tsx, navigation-menu.tsx, popover.tsx,
                progress.tsx, radio-group.tsx, resizable.tsx, scroll-area.tsx,
                select.tsx, separator.tsx, sheet.tsx, sidebar.tsx, skeleton.tsx,
                slider.tsx, sonner.tsx, switch.tsx, table.tsx, tabs.tsx,
                textarea.tsx, toast.tsx, toaster.tsx, toggle.tsx, toggle-group.tsx,
                tooltip.tsx
```

---

### 📁 artifacts/api-server — Backend API

**Tech:** Express 5, TypeScript, Pino (logging), OpenAI SDK (Groq), Resend (email), esbuild (bundler)

```
artifacts/api-server/
├── package.json     — Backend dependencies
├── build.mjs        — esbuild bundle script → dist/
├── tsconfig.json    — Backend TypeScript config
├── .env.example     — Example env file for local development
│
└── src/
    ├── index.ts     — Entry: loads dotenv, reads PORT (default 8080), starts server
    ├── app.ts       — Express app: CORS, JSON parsing, logging, mounts /api router
    │
    ├── lib/
    │   └── logger.ts    — Pino logger (pretty in dev, JSON in prod)
    │
    └── routes/
        ├── index.ts         — Combines all sub-routers under /api
        ├── health.ts        — GET /api/health — health check endpoint
        ├── ai.ts            — POST /api/ai/chat — Groq AI chat (streaming SSE)
        │                       Uses GROQ_API_KEY + llama-3.1-8b-instant model
        │                       System prompt: only answers BRDM school questions
        ├── contact.ts       — POST /api/contact — Contact form email via Resend
        │                       Requires RESEND_API_KEY (returns 503 if missing)
        └── admissions.ts    — POST /api/admissions — Admissions form email via Resend
                                Requires RESEND_API_KEY (returns 503 if missing)
```

---

### 📁 artifacts/mockup-sandbox — Design Canvas (Internal)

Used internally for prototyping UI components. Not part of the public website.

---

### 📁 lib/ — Shared Libraries

```
lib/
├── api-spec/              — OpenAPI 3.1 contract (openapi.yaml) + Orval codegen config
│   └── openapi.yaml       — API spec (currently: /healthz only)
│
├── api-client-react/      — Generated React Query hooks for calling the API
│   └── src/
│       ├── index.ts           — Public exports
│       ├── custom-fetch.ts    — Fetch adapter
│       └── generated/         — Auto-generated from api-spec (do not edit)
│           ├── api.ts
│           └── api.schemas.ts
│
├── api-zod/               — Zod validation schemas shared between frontend & backend
│   └── src/
│       ├── index.ts
│       └── generated/         — Auto-generated (do not edit)
│
├── db/                    — Database layer (Drizzle ORM + PostgreSQL)
│   ├── drizzle.config.ts  — Migration config
│   └── src/
│       ├── index.ts           — DB connection export
│       └── schema/
│           ├── index.ts           — Schema barrel export
│           ├── conversations.ts   — Conversations table (id, created_at)
│           └── messages.ts        — Messages table (id, conversation_id FK, role, content)
│
├── integrations-openai-ai-react/  — Browser-side OpenAI/audio hooks
│   └── src/audio/
│       ├── useAudioPlayback.ts    — Audio playback hook
│       ├── useVoiceRecorder.ts    — Microphone recording hook
│       └── useVoiceStream.ts      — Voice streaming hook
│
└── integrations-openai-ai-server/ — Server-side OpenAI client helpers
    └── src/
        ├── client.ts              — OpenAI client factory
        ├── audio/                 — Audio processing server helpers
        ├── batch/                 — Batch request + retry helpers
        └── image/                 — Image generation helpers
```

---

### 📁 scripts/ — Automation Scripts

```
scripts/
├── package.json       — Scripts: hello, typecheck
├── tsconfig.json      — Scripts TS config
├── post-merge.sh      — Runs after task-agent merges (installs deps, etc.)
└── src/
    └── hello.ts       — Sample/test script
```

---

## Website Pages

| URL | Page File | Description |
|---|---|---|
| `/` | `HomePage.tsx` | Hero, stats, features, campus life, FAQ |
| `/about` | `AboutPage.tsx` | School history, mission, values |
| `/principal` | `PrincipalPage.tsx` | Principal's message and profile |
| `/faculty` | `FacultyPage.tsx` | Faculty listing and profiles |
| `/academics` | `AcademicsPage.tsx` | Curriculum and academic programs |
| `/calendar` | `CalendarPage.tsx` | Academic calendar |
| `/news` | `NewsPage.tsx` | News and events |
| `/gallery` | `GalleryPage.tsx` | Campus photo gallery |
| `/contact` | `ContactPage.tsx` | Contact form |
| `/admissions` | `AdmissionsPage.tsx` | Admissions application form |

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/health` | Server health check | No |
| POST | `/api/ai/chat` | AI chat (streaming) | No (needs GROQ_API_KEY) |
| POST | `/api/contact` | Send contact email | No (needs RESEND_API_KEY) |
| POST | `/api/admissions` | Send admissions email | No (needs RESEND_API_KEY) |

---

## Environment Variables / Secrets

| Variable | Required for | Set in |
|---|---|---|
| `GROQ_API_KEY` | AI chat (`/api/ai/chat`) | Replit Secrets ✅ |
| `RESEND_API_KEY` | Contact & admissions emails | Replit Secrets ❌ (not set) |
| `BREVO_API_KEY` | Alternative email (backup) | Replit Secrets ❌ (not set) |
| `BREVO_SENDER_EMAIL` | Email sender address | Replit Env Vars ✅ |
| `BREVO_SENDER_NAME` | Email sender name | Replit Env Vars ✅ |
| `SESSION_SECRET` | Session security | Replit Secrets ✅ |
| `PORT` (API) | API server port | Auto-injected by Replit |
| `PORT` (frontend) | Vite dev server port | Auto-injected by Replit |

---

## How to Run

### On Replit
Workflows start automatically. No setup needed.

### Locally (your own machine)

```bash
# 1. Install dependencies
pnpm install

# 2. Set up environment variables
cp artifacts/api-server/.env.example artifacts/api-server/.env
cp artifacts/brdm-school/.env.example artifacts/brdm-school/.env.local
# Then add GROQ_API_KEY etc. in those .env files

# 3. Start everything
pnpm dev
# or separately:
pnpm dev:api   # API on http://localhost:8080
pnpm dev:web   # Frontend on http://localhost:3000
```

---

## Recent Changes Log

| Date | Change |
|---|---|
| 2026-08-06 | Added floating AI ChatWidget (bottom-right corner) — Groq/Llama powered |
| 2026-08-06 | GROQ_API_KEY configured in Replit Secrets — chat now fully working |
| 2026-08-06 | StatsCounter: "Years of Excellence" number → yellow; all stat numbers → white |
| 2026-08-06 | Vite config updated: async loadEnv, /api proxy, PORT/BASE_PATH defaults |
| 2026-08-06 | API server: dotenv import, PORT default 8080, CORS configured |
| 2026-08-06 | Project imported and all workflows running on Replit |
| 2026-08-08 | ChatWidget: added browser mic input with Hindi speech-to-text and automatic voice playback for voice questions |

---

## User Preferences

- **Language:** Hindi + English (Hinglish) preferred in chat
- **Style:** No big changes to site content/design unless asked
- Keep replit.md updated after every change to the website
