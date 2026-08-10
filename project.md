# BRDM Public School — Project Master Log

> **Yeh file automatically update hoti hai** har change ke baad.
> Naye session mein bhi poora itihas yahan milega.

---

## Project Ki Basic Jaankari

| Field | Details |
|---|---|
| **School Name** | BRDM Public School |
| **Location** | Kaithal, Haryana, India |
| **Tagline** | "Preparing Your Child for a Better Future" |
| **Website Type** | School information + AI chat + Admissions/Contact forms |
| **Tech Stack** | React 19, Vite 7, Tailwind CSS v4, Express 5, Groq AI |
| **Hosting** | Replit |
| **Admissions** | 2026-2027 ke liye khuli hain |

---

## Sabhi Pages (Website ke Routes)

| URL | Page File | Kya dikhta hai |
|---|---|---|
| `/` | HomePage.tsx | Hero, Stats, Features, Campus Life, FAQ |
| `/about` | AboutPage.tsx | School ka itihas, mission, values |
| `/principal` | PrincipalPage.tsx | Principal ka sandesh aur profile |
| `/faculty` | FacultyPage.tsx | Teachers ki list aur profiles |
| `/academics` | AcademicsPage.tsx | Syllabus aur academic programs |
| `/calendar` | CalendarPage.tsx | Academic calendar |
| `/news` | NewsPage.tsx | News aur events |
| `/gallery` | GalleryPage.tsx | Campus photos |
| `/contact` | ContactPage.tsx | Contact form |
| `/admissions` | AdmissionsPage.tsx | Admission form |

---

## API Endpoints

| Method | URL | Kya karta hai | Zaroorat |
|---|---|---|---|
| GET | /api/health | Server check | Kuch nahin |
| POST | /api/ai/chat | AI chat (streaming) | GROQ_API_KEY |
| POST | /api/contact | Contact form email | RESEND_API_KEY |
| POST | /api/admissions | Admissions form email | RESEND_API_KEY |

---

## Secrets aur Environment Variables

| Variable | Kaam | Status |
|---|---|---|
| GROQ_API_KEY | AI chat kaam kare (Groq/Llama) | SET HAI |
| RESEND_API_KEY | Emails bheje (contact/admissions) | SET NAHIN |
| BREVO_API_KEY | Backup email service | SET NAHIN |
| BREVO_SENDER_EMAIL | Email bhejne wale ka address | SET HAI |
| BREVO_SENDER_NAME | Email bhejne wale ka naam | SET HAI |
| SESSION_SECRET | Session security | SET HAI |
| PORT (API) | API server ka port | Auto — Replit inject karta hai |
| PORT (Frontend) | Vite dev server ka port | Auto — Replit inject karta hai |

---

## Sabhi Files aur Folders

```
/ (Root)
├── package.json                — Root scripts: dev, dev:web, dev:api, build, typecheck
├── pnpm-workspace.yaml         — Workspace config
├── pnpm-lock.yaml              — Dependency lockfile (edit mat karo)
├── tsconfig.json               — TypeScript root config
├── tsconfig.base.json          — Shared TypeScript settings
├── project.md                  — YEH FILE — Poora changelog + audit
├── replit.md                   — Technical docs + folder audit
├── replit.nix                  — Nix system packages
└── .gitignore                  — .env, node_modules, dist ignore

artifacts/brdm-school/          — MAIN WEBSITE (Frontend)
├── package.json
├── vite.config.ts              — PORT/BASE_PATH, /api proxy to localhost:8080
├── tsconfig.json
├── components.json
├── index.html
├── .env.example
├── public/
│   ├── logo.png
│   ├── school-bg.jpg
│   ├── principal.png
│   ├── admission-banner.png
│   ├── earth-day-event.png
│   ├── modern-library.png
│   ├── sports-recreation.png
│   ├── favicon.ico / .png / .svg / -192.png
│   └── robots.txt
└── src/
    ├── main.tsx
    ├── index.css
    ├── App.tsx                 — Main shell: Navbar, Footer, Routes, ChatWidget
    ├── lib/utils.ts
    ├── hooks/
    │   ├── useCountUp.ts       — Animated number counter
    │   ├── use-mobile.tsx      — Mobile/desktop detect
    │   └── use-toast.ts        — Toast messages
    ├── pages/
    │   ├── HomePage.tsx        — /
    │   ├── AboutPage.tsx       — /about
    │   ├── PrincipalPage.tsx   — /principal
    │   ├── FacultyPage.tsx     — /faculty
    │   ├── AcademicsPage.tsx   — /academics
    │   ├── CalendarPage.tsx    — /calendar
    │   ├── NewsPage.tsx        — /news
    │   ├── GalleryPage.tsx     — /gallery
    │   ├── ContactPage.tsx     — /contact
    │   ├── AdmissionsPage.tsx  — /admissions
    │   └── not-found.tsx       — 404 page
    └── components/
        ├── layout/
        │   ├── Navbar.tsx      — Top navigation bar
        │   └── Footer.tsx      — Site footer
        ├── sections/
        │   ├── Hero.tsx
        │   ├── StatsCounter.tsx        — [CHANGED] Yellow + White numbers
        │   ├── Features.tsx
        │   ├── CampusLife.tsx
        │   ├── Testimonials.tsx
        │   ├── FAQ.tsx
        │   ├── ChatBoard.tsx           — Purana inline chat (ab use nahin)
        │   ├── About.tsx
        │   ├── PrincipalMessage.tsx
        │   ├── FacultySection.tsx
        │   ├── AcademicsExtra.tsx
        │   ├── AcademicCalendar.tsx
        │   ├── Admissions.tsx
        │   ├── Contact.tsx
        │   ├── Gallery.tsx
        │   └── NewsEvents.tsx
        └── ui/
            ├── ChatWidget.tsx          — [NEW] AI Chat floating widget (bottom-right)
            ├── WhatsAppButton.tsx      — WhatsApp floating button
            ├── ScrollToTop.tsx
            ├── ScrollProgress.tsx
            ├── PageBanner.tsx
            ├── TourGuide.tsx
            └── [40+ Shadcn/Radix UI components]

artifacts/api-server/           — BACKEND
├── package.json
├── build.mjs
├── tsconfig.json
├── .env.example
└── src/
    ├── index.ts                — Entry: dotenv, PORT 8080, server start
    ├── app.ts                  — Express: CORS, JSON, logging, /api router
    ├── lib/logger.ts
    └── routes/
        ├── index.ts
        ├── health.ts           — GET /api/health
        ├── ai.ts               — [CHANGED] Groq AI chat, llama-3.1-8b-instant
        ├── contact.ts          — Contact form email (Resend)
        └── admissions.ts       — Admissions form email (Resend)

artifacts/mockup-sandbox/       — Design Canvas (internal only)

lib/
├── api-spec/                   — OpenAPI contract + Orval codegen
├── api-client-react/           — React Query hooks (auto-generated)
├── api-zod/                    — Zod schemas (frontend + backend)
├── db/                         — Drizzle ORM + PostgreSQL
│   └── src/schema/
│       ├── conversations.ts
│       └── messages.ts
├── integrations-openai-ai-react/   — Browser audio/voice hooks
└── integrations-openai-ai-server/  — Server OpenAI helpers

scripts/
├── post-merge.sh
└── src/hello.ts
```

---

## Poora Change Log (Shuruaat Se Ab Tak)

### Session 1 — Project Setup (2026-08-06)

| # | Kya badla | Kaun si file |
|---|---|---|
| 1 | Project Replit pe import kiya | — |
| 2 | pnpm install — sab dependencies install kiye | pnpm-lock.yaml |
| 3 | Vite config fix: async loadEnv, PORT/BASE_PATH defaults, strictPort false | artifacts/brdm-school/vite.config.ts |
| 4 | Vite config: /api proxy to localhost:8080 add kiya | artifacts/brdm-school/vite.config.ts |
| 5 | API server: import dotenv/config add kiya entry point pe | artifacts/api-server/src/index.ts |
| 6 | API server: PORT default 8080 set kiya | artifacts/api-server/src/index.ts |
| 7 | dotenv dependency add kiya backend mein | artifacts/api-server/package.json |
| 8 | Root mein local dev scripts add kiye: dev, dev:web, dev:api | package.json (root) |
| 9 | .gitignore mein .env files add kiye (security) | .gitignore |
| 10 | .replit se plaintext API keys hataye (BREVO_API_KEY, RESEND_API_KEY) | .replit |
| 11 | BREVO_SENDER_EMAIL Replit Env Vars mein save kiya | Replit Settings |
| 12 | BREVO_SENDER_NAME Replit Env Vars mein save kiya | Replit Settings |
| 13 | SESSION_SECRET Replit Secrets mein save kiya | Replit Settings |
| 14 | Frontend .env.example banaya | artifacts/brdm-school/.env.example |
| 15 | Frontend .env.local.example banaya | artifacts/brdm-school/.env.local.example |
| 16 | Backend .env.example banaya | artifacts/api-server/.env.example |
| 17 | replit.md mein local dev instructions add kiye | replit.md |
| 18 | Sabhi workflows start kiye — website Replit pe live | Replit Workflows |

### Session 2 — UI Changes + AI Chat (2026-08-06)

| # | Kya badla | Kaun si file |
|---|---|---|
| 19 | StatsCounter: "Years of Excellence" ka rang text-yellow-400 kiya | artifacts/brdm-school/src/components/sections/StatsCounter.tsx |
| 20 | StatsCounter: Sabhi stat numbers ka rang text-white kiya | artifacts/brdm-school/src/components/sections/StatsCounter.tsx |
| 21 | ChatBoard.tsx banaya — homepage pe inline AI chat add kiya | artifacts/brdm-school/src/components/sections/ChatBoard.tsx (NEW) |
| 22 | HomePage.tsx mein ChatBoard import aur add kiya | artifacts/brdm-school/src/pages/HomePage.tsx |
| 23 | AI route: OpenAI se Groq mein convert kiya | artifacts/api-server/src/routes/ai.ts |
| 24 | AI route: Model llama-3.1-8b-instant (Groq) set kiya | artifacts/api-server/src/routes/ai.ts |
| 25 | AI system prompt: sirf school ke sawaal answer kare | artifacts/api-server/src/routes/ai.ts |
| 26 | GROQ_API_KEY Replit Secrets mein save kiya | Replit Settings |
| 27 | ChatWidget.tsx banaya — floating AI chat (bottom-right) | artifacts/brdm-school/src/components/ui/ChatWidget.tsx (NEW) |
| 28 | ChatBoard section HomePage se hataya | artifacts/brdm-school/src/pages/HomePage.tsx |
| 29 | ChatWidget App.tsx mein add kiya — har page pe dikhta hai | artifacts/brdm-school/src/App.tsx |
| 30 | replit.md mein poora folder audit add kiya | replit.md |
| 31 | project.md banaya — poora changelog (yeh file) | project.md (NEW) |

---

## Pending Tasks

| Task | Status |
|---|---|
| Mobile app (parents/students ke liye phone pe) | Proposed |
| Contact/Admissions emails working karna (RESEND_API_KEY chahiye) | Proposed |

---

## Naye Session Ke Liye Note

Agar nayi chat/session/ID mein kaam shuru ho:
- Is file (project.md) mein poora itihas milega
- replit.md mein technical docs + folder audit milega
- Koi bhi change karo — Change Log mein number ke saath add karo
- Agla change number: 32
