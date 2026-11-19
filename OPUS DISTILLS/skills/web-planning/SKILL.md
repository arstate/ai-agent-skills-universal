---
name: web-planning
description: "Web architecture & pre-flight planner (/web-planning): Mermaid user flows, 5-stack recommender, legacy readme-ai-agent backfill, PRD & SEO/GEO plan."
---

# `web-planning` — Multi-Stack Architect, Legacy Auditor & `AGENTS.md` Planner

Pre-Flight Planner, Tech Stack Advisor, and SEO/GEO Strategist for **Google Antigravity CLI (`agy`)**. Prevents wrong-stack disasters, Vercel quota overages, and undocumented legacy codebases before coding.

---

## 0. Mandatory `readme-ai-agent/` Audit Gate (Check & Backfill First)
On **any** web/app project (new or legacy), check `[ -d "readme-ai-agent" ] && [ -f "readme-ai-agent/AGENTS.md" ] && [ -f "AGENTS.md" ]`:
- **Missing on legacy repo:** Inspect `package.json` / `build.gradle.kts`, config files, `src/` routes, and `git log -n 5`, then initialize `<root>/AGENTS.md` + all 12 files in `readme-ai-agent/` with real architecture.
- **Never use `CLAUDE.md` or singular `AGENT.md`** inside `readme-ai-agent/` — migrate immediately to `readme-ai-agent/AGENTS.md`.

---

## 1. Multi-Stack Recommender & Templates (`ask-questions-if-underspecified`)
Never assume a single stack blindly. Present a sharp Co-Founder recommendation with the **5-Stack Matrix**:

| Stack Option | Best Use Case | Architecture & Free-Tier Shield |
|---|---|---|
| **1. Next.js 15 (`output: 'export'`)** | Ad Landing Pages, Company Profiles, Direct WA Catalogs | `0` Serverless invocations; `images: { unoptimized: true }` (zero `/_next/image`) + Cloudinary `f_auto,q_auto`. |
| **2. Next.js 15 Hybrid (`force-static` + BaaS)** | Fullstack Apps (Admin CRUD, Auth, Meta CAPI, Webhooks) | Public pages `dynamic = 'force-static'` + `CDN-Cache-Control`; `/api` & `/admin` `private, no-store`. |
| **3. React 19 Vite SPA + Tailwind** | Private Dashboards, Calculators, Pure Client SPAs | `< 1s` Vite builds, vendor chunk splitting, `0` server compute, static CDN + PWA SW. |
| **4. Astro 5 + React Islands (`client:visible`)** | Content-heavy SEO Hubs, Portfolios + Interactive Widgets | `0 KB` JS baseline (`LCP < 0.6s`); hydrate React/GSAP islands on visibility only. |
| **5. Hono Cloudflare Workers / Android Kotlin** | Edge APIs/Webhooks (`Hono`) or Native Mobile (`Kotlin/Compose MVVM/MVI`) | Hono: `0ms` cold start on CF Workers. Android: Jetpack Compose + Hilt + Room + StateFlow MVI/MVVM (hand off build & ADB QA to `android-cli` via Tier-2 `find-skills`). |

### Mandatory Pre-Build Verification Checklist (Ask via `ask_question` Before Coding)
1. **Stack & Surface Lock:** Confirm Option 1–5 + target market/language.
2. **Primary Conversion KPI:** Direct WhatsApp (`wa.me`), Calculator Lead Capture, Catalog Checkout, or Booking.
3. **Real Business Data (`[stated]` Only):** Official WA number, real prices, NAP address, verified metrics (`TODO_ASK_USER` in `src/config/siteConfig.ts` if missing).
4. **Live Docs & Visual Register:** Run `npx ctx7 setup` (Upstash Context7) for version-sensitive docs (`Next.js 15`, `React 19`, `Tailwind v4`, `Compose`). Lock `DESIGN_SYSTEM.md` (60/30/10 OKLCH tokens, `R1–R4`).
5. **Cloud & Free-Tier Shield Keys:**
   - **Firebase Spark:** `persistentLocalCache()`, `limit(20)` on queries, `onSnapshot` paired with `unsubscribe()`, strict `firestore.rules`.
   - **Cloudinary:** `f_auto,q_auto` delivery + `images: { unoptimized: true }` (zero `/_next/image`).

---

## 2. Mandatory 12-File Project Brain (`readme-ai-agent/` + `./AGENTS.md`)
Initialize `./AGENTS.md` (`@[Project Brain State](readme-ai-agent/AGENTS.md)`) + 12 files in `readme-ai-agent/`:
1. `AGENTS.md` (`< 150-token` live state) | 2. `README.md` (overview & index) | 3. `PRD.md` (KPI, VOC, `GLOSSARY`, verified data)
4. `TECHSTACK.md` (Stack 1–5, `ADR`, Zero-Usage contract) | 5. `STYLE-GUIDE.md` (OKLCH tokens, `#6366f1` ban, Footer archetype)
6. `SEO-GEO.md` (JSON-LD, `llms.txt`, `sitemap.ts`, `robots.ts`) | 7. `SECURITY.md` (7-Layer audit, `server-only`, Zod, `firestore.rules`, `CONSTRAINTS`)
8. `SKILLS.md` (Active skills/MCP) | 9. `TASK.md` (`[ ]/[/]/[x]` checklist) | 10. `BUG-AND-FIX.md` (root-cause ledger)
11. `GIT-RESTORE-POINTS.md` (commit hashes & rollback) | 12. `DESIGN-CRITIQUE.md` (14-Pass 7-Viewport QA)

---

## 3. `grill-with-docs` & `interview-me` Protocol (`/plan`, `/grill-me`)
1. **Codebase-First:** Inspect `package.json` / `src/` / docs before asking the user.
2. **Branch-by-Branch Interrogation:** Ask 1 focused round at a time with Co-Founder recommendations until 95% confidence.
3. **Stateful Paper Trail:** Persist `GLOSSARY` (`PRD.md`), `ADR` (`TECHSTACK.md`), and `CONSTRAINTS` (`SECURITY.md` — forbid `@ts-ignore`, `eslint-disable`, or skipped tests).

---

## 4. Anti-Jump-Phase Law & Pre-Build Gate
Never jump straight to raw `index.html` or production code when asked to plan or after style selection:
1. Emit `readme-ai-agent/` (12 files) + `./AGENTS.md` + `DESIGN_SYSTEM.md`.
2. Emit `USER_FLOW_AND_PAGE_ARCHITECTURE.md` with a **Mermaid** visitor psychology diagram (`Ad Click -> 3s Hero Hook -> Proof/Calculator -> Objection Handling -> Direct WA Checkout`) + section-by-section real domain copy.
3. **Ban Meta-Design Jargon in Copy/Nav:** Never output *"Bento"*, *"Hallmark"*, *"Nordic"*, *"Hero Section"*, or *"CTA"* in customer-facing text.
4. **Explicit Confirmation:** Close by asking the user to confirm the stack, flow, and missing data before running `web-builder`.

---

## 5. Agency Redesign Sprint & Research Stack
1. **Live Docs First:** `npx ctx7 setup` / `ctx7` CLI (or `websearch` fallback) + 1–2 niche benchmarks (`getlayers.ai`, `21st.dev`, `motionsites.ai`, `before.click`).
2. **Redesign Audit:** Capture `360px` overflow, LCP, contrast, and weak above-the-fold offers -> generate 3–5 divergent concept directions in `design-style-preview.html` -> ship approved direction to staging.
