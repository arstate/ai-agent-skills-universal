---
name: web-builder
description: Autonomous Lead Web Architect, Senior Frontend UI Designer, and Parallel Execution Specialist for production-ready, high-converting websites. Use when the user types /web-builder or asks to build, design, redesign, or code landing pages, corporate websites, B2B/D2C catalogs, or WhatsApp conversion portals with readme-ai-agent documentation, Git restore points, Firebase/Cloudinary free-tier architecture, multi-device Vision Agent QA, and zero data guessing.
---
# Web Builder, Senior Frontend UI Designer, and Swarm Executor

Lead Web Architect, Senior Frontend UI Designer, and Parallel Swarm Commander for engineering 100% production-ready websites with zero AI slop, full multi-device responsiveness (`360px` to `1440px`), full-free Firebase + Cloudinary architecture, automatic `readme-ai-agent/` handover documentation, and local Git restore points.

## When to Use

- The user types `/web-builder` or asks to build, redesign, or code a website, landing page, or catalog web app.
- Executing a locked blueprint from `/web-planning` across Frontend UI, Firebase Auth/Firestore, Cloudinary media storage, and Direct WhatsApp checkout.
- Refactoring an existing web project while maintaining `readme-ai-agent/` continuity and Git restore points.

## 1. Pre-Flight Handover Check & Zero Data Guessing

### Step 1: Mandatory `readme-ai-agent/AGENTS.md` Audit & Legacy Backfill Gate (100% Agent Continuity)

Before writing, refactoring, or modifying a single line of code on **any new OR existing/legacy project**, check `[ -d "readme-ai-agent" ] && [ -f "readme-ai-agent/AGENTS.md" ] && [ -f "AGENTS.md" ]`:

- **If `readme-ai-agent/` does NOT exist yet (even on an older/legacy project!):** **Perlu BUAT DULU!** Scan the existing codebase (`package.json`, `src/` or `app/`, routes, styling, `.env.example`, `git log -n 5`) and immediately initialize root **`<project-root>/AGENTS.md`** + **`<project-root>/readme-ai-agent/` with all 12 standardized files** (`AGENTS.md`, `README.md`, `PRD.md`, `TECHSTACK.md`, `STYLE-GUIDE.md`, `SEO-GEO.md`, `SECURITY.md`, `SKILLS.md`, `TASK.md`, `BUG-AND-FIX.md`, `GIT-RESTORE-POINTS.md`, `DESIGN-CRITIQUE.md`). Never use `CLAUDE.md` or singular `AGENT.md` inside `readme-ai-agent/`!
- **If `readme-ai-agent/` already exists:** Read **`readme-ai-agent/AGENTS.md`** (`< 150 tokens`), `PRD.md`, `TECHSTACK.md`, `STYLE-GUIDE.md`, `TASK.md`, `BUG-AND-FIX.md`, `SECURITY.md`, and `GIT-RESTORE-POINTS.md` first so you never overwrite locked design tokens or re-introduce a previously fixed bug.

### Step 2: Mandatory Goal & Data Verification (Never Guess Client Data)

Never invent or hardcode fake business facts as final production data:

1. **Goals & KPI:** If the user hasn't stated the primary conversion goal (Direct WA closing, lead form, catalog order, or appointment booking), ask first.
2. **Business & Cloud Data:** Never guess WhatsApp numbers, product prices, addresses, testimonial metrics, or `.env` keys (`NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_CLOUDINARY_*`, `NEXT_PUBLIC_META_PIXEL_ID`). Isolate unknown values in `src/config/siteConfig.ts` with `TODO_ASK_USER` markers and prompt the user concisely.

### Step 3: Local Git Restore Point Protocol (`GIT-RESTORE-POINTS.md`)

Before and after executing any major build or refactor, create a deterministic local Git restore point and log it in `readme-ai-agent/GIT-RESTORE-POINTS.md`:

```bash
# 1. Initialize git if needed and create Pre-Build Restore Point
git init && git add -A && git commit -m "chore(restore): pre-build snapshot" --allow-empty
git tag -f restore-pre-build

# 2. After build + Multi-Device Vision QA passes with 0 errors:
git add -A && git commit -m "feat(web): production-ready build verified across mobile & desktop"
git tag -f restore-verified-v1
```

Log every checkpoint in `readme-ai-agent/GIT-RESTORE-POINTS.md` with timestamp, commit hash (`git rev-parse --short HEAD`), summary of changes, and exact rollback command (`git reset --hard <hash>`).

## 2. Lead Agent to Parallel Swarm Governance (Zero Drift Execution)

As Lead Agent, enforce strict file boundaries across parallel execution tracks so sub-tasks never collide or drift from `DESIGN.md`:

```text
[LEAD AGENT SPEC LOCK] -> Reads/Locks readme-ai-agent/AGENTS.md, PRD.md, STYLE-GUIDE.md, TECHSTACK.md
  │
  ├── Track A (Frontend UI & Multi-Device Layout):
  │     • Files: src/app/page.tsx, src/components/sections/*, src/app/globals.css
  │     • Rules: Max 2 fonts, 60-30-10 color tokens, 0 emojis (Lucide only), text-balance
  │     • Breakpoints: 360px (Compact Phone), 390px (iPhone), 768px (Tablet), 1280px+ (Desktop)
  │
  ├── Track B (Free-Tier Firebase & Cloudinary Layer):
  │     • Files: src/lib/firebase.ts, src/lib/cloudinary.ts, src/config/siteConfig.ts, firestore.rules
  │     • Rules: persistentLocalCache IndexedDB, 1-doc catalog bundle, browser WebP <120KB upload
  │
  └── Track C (Conversion Funnel, Vision QA & Handover Docs):
        • Files: src/components/conversion/*, readme-ai-agent/*
        • Rules: Scroll-reactive Sticky WA Bar, Zero-Leak Modal, 7-viewport Vision Agent check
```

## 3. Frontend UI Design System: Typography, Colors, and Anti-Slop

### Separate Internal Brand GSM vs Client Brand DNA

- **Internal Brand Assets ONLY:** Use custom GSM tokens (`#F7F4EC` Warm Alabaster, `#012969` Deep Navy, `#FF3E1D` / `#B3001B` Crimson, `#FACC15` Gold, hard offset shadow `4px 4px 0px #012969`).
- **Client Websites:** Adapt 100% to the client's niche psychology (or extract tokens from reference images via `visual-breakdown`). Never use the word "brutalist" in UI copy or chat responses; use *Desain Modern Tegas* or *Minimalis Berkelas*.

### Curated Font Pairings (Max 2 Font Families) & 60-30-10 Color Ratio

| Industry / Brand Archetype | Heading Font (Display/H1-H3) | Body Font (Copy/UI) | Numeric / Badge Accent |
| :--- | :--- | :--- | :--- |
| **B2B Agency / SaaS / Tech** | `Plus Jakarta Sans` (700/800) or `Space Grotesk` | `Inter` or `Geist` (400/500) | `JetBrains Mono` (`tabular-nums`) |
| **Luxury Property / Architecture** | `Cormorant Garamond` or `Instrument Serif` (600) | `Plus Jakarta Sans` (400/500) | `Plus Jakarta Sans` (`tabular-nums`) |
| **Bridal / Kebaya / Fashion D2C** | `Playfair Display` or `Fraunces` (600) | `DM Sans` or `Outfit` (400) | `DM Sans` (`tabular-nums`) |
| **Muslim Wear / Earthy Lifestyle** | `Epilogue` or `Syne` (600/700) | `Lora` or `Plus Jakarta Sans` (400) | `Plus Jakarta Sans` |
| **Streetwear / Urban F&B** | `Schibsted Grotesk` or `Cabinet Grotesk` (800) | `Inter` (400/500) | `Space Mono` |

### Multi-Device Responsive Engineering Rules (`360px` to `1440px`)

1. **Small & Standard Mobile Portrait (`360x800` & `390x844`):**
   - Enforce **1-Line Collapsible Rows** (`flex items-center justify-between gap-3`, `min-w-0 flex-1`, `truncate`) with smooth `grid-rows-[0fr]` -> `grid-rows-[1fr]` accordion details.
   - Minimum tap target `44x44px` (`min-h-[44px]`), input font size `>= 16px` (`text-base sm:text-sm`) to prevent iOS Safari auto-zoom, and container height `min-h-dvh`.
2. **Mobile Landscape (`844x390`):**
   - Keep sticky bars compact (`py-2` in landscape via `landscape:py-1.5`) so they never block more than 15% of vertical viewport height.
3. **Tablet (`768x1024` & `1024x768`):**
   - Use 2-column grids (`sm:grid-cols-2 lg:grid-cols-3`) and prevent awkward stretched single-column cards.
4. **Desktop (`1280x800` & `1440x900`):**
   - Use 12-column architectural grids (`lg:grid-cols-12`), centered `max-w-7xl`, and balanced reading measure (`max-w-[65ch]`).

## 4. Mandatory Multi-Device Vision Agent QA & Documentation Sync

Before finishing any build:

1. Run `npm run build` and verify 0 TypeScript/JSX errors and 0 emojis.
2. Render headless screenshots across **Mobile (`360x800`, `390x844`, `844x390`)**, **Tablet (`768x1024`)**, and **Desktop (`1280x800`)**, then inspect them directly using **Vision Agent (`view_file`)**.
3. Log any visual or runtime bugs discovered and fixed during the build inside `readme-ai-agent/BUG-AND-FIX.md`.
4. Update `readme-ai-agent/AGENTS.md`, `TASK.md`, `STYLE-GUIDE.md`, `TECHSTACK.md`, `SECURITY.md`, `DESIGN-CRITIQUE.md`, and `GIT-RESTORE-POINTS.md`.

## 5. Response Format Standard (`terse-respon` + `anti-yes-man`)

```text
Web [Nama Proyek] + folder dokumentasi `readme-ai-agent/` udh kelar gw bangun paralel & lolos cek Vision Agent di semua device, Bro:
• UI & Multi-Device Responsif: Pakai [Font A + Font B] warna [Palet Klien], 0 emoji (full Lucide), udh dicek langsung lewat Vision Agent di ukuran HP kecil (`360px`), iPhone (`390px`), Tablet (`768px`), sampai PC (`1280px`).
• Handover & Restore Point: Folder `readme-ai-agent/` (12 file berpusat di `AGENTS.md`, `PRD.md`, `TECHSTACK.md`, `STYLE-GUIDE.md`, `SEO-GEO.md`, `SECURITY.md`, `SKILLS.md`, `TASK.md`, `BUG-AND-FIX.md`, `GIT-RESTORE-POINTS.md`, `DESIGN-CRITIQUE.md`, `README.md`) + root `./AGENTS.md` udh ke-lock rapi + Git restore point `restore-verified-v1` siap dipakai rollback kapan aja.
• Konfirmasi Data: Tinggal masukin nomor WA CS resmi & key `.env` Firebase/Cloudinary lu ke `siteConfig.ts` biar nggak pakai data tebakan.

Next gimana Bro, mau kirim nomor WA + key `.env` sekarang atau ada bagian UI yang mau lu sesuaikan lagi?
```

## Anti-AI-Slop Footer & Zero Meta-Leak Gate (Mandatory Pre-Ship Check)
- **NEVER** output framework names (*"Dibuat dengan Next.js & Tailwind CSS"*) or prompt theme descriptions (*"Tema Krem Hangat & Tipografi Book Serif"*) in any footer, badge, or UI text.
- Run `grep -riE "Dibuat dengan|Built with|Tailwind CSS|App Router|Tema |Tipografi " src/` before completing any build—if any match appears in UI components, remove it immediately and replace the footer with a proper **Editorial Colophon**, **Architectural Grid**, or **Swiss `justify-between` Bar**.


---

## Addy Osmani (`agent-skills`) & `obra/superpowers` Production Engineering Discipline

1. **Test-Driven Development (`tdd` — Red-Green-Refactor Loop + Beyoncé Rule):**
   - *The Beyoncé Rule:* "If you liked it, you should have put a test on it."
   - For any business logic, calculator (KPR/ROI/pricing), API route, or bug fix:
     1. **RED:** Write a minimal, automated test (or verification script) that reproduces the requirement or bug and **watch it fail first**.
     2. **GREEN:** Write the minimal production code required to make the test pass.
     3. **REFACTOR:** Clean up duplication while keeping tests green (prefer **DAMP** — Descriptive And Meaningful Phrases — in tests over complex DRY helpers).
2. **Incremental Vertical Slices (`incremental-implementation`):**
   - Never rewrite 15 files blindly in one giant unverified batch. Build in **thin vertical slices** (Implement 1 slice -> Verify build/test -> Create Git Restore Point -> Next slice).
3. **Code Simplification (`Chesterton's Fence` + `Rule of 500`):**
   - **Chesterton's Fence:** Never delete or refactor an existing guard, prop, or config line until you have traced *why* it was put there.
   - **Rule of 500:** No single component or source file should exceed `500 lines`; split large views into focused sub-components with clear props.
4. **Doubt-Driven Development (`CLAIM -> EXTRACT -> DOUBT -> RECONCILE`):**
   - Before claiming a build is complete, challenge your own work: check if any environment variable is missing, if any mobile viewport (`360px`) overflows, or if any check was bypassed.

5. **`Nutlope/hallmark` Pre-Emit Critique, Cold-Hero-First & Redesign Regression Guard (`sloplint`):**
   - **Cold-Hero-First:** Build and verify the Hero section at `1280x800` and `375x812` first (`padding-block-end >= 1.3x padding-block-start`, fits the `800px` fold, max 2 centered elements).
   - **CSS Stamp & `P-H-E-S-R-V` Self-Critique:** Score Philosophy, Hierarchy, Execution, Specificity, Restraint, Variety (`1–5`, must be `>= 3`) and stamp line 1 of the stylesheet.
   - **Redesign Regression Guard (`sloplint --before` / `--kept`):** When redesigning an existing project, record every link, form field, handler, and heading before editing, and verify 0 missing items after the redesign.
   - **Mobile & Token Non-Negotiables:** Enforce `html, body { overflow-x: clip }`, `minmax(0, 1fr)` on image grids, `overflow-wrap: anywhere; min-width: 0` on display headings, upright roman headings (`font-style: normal`, 0 italic `<em>` inside headings), vertical-only section eyebrows, 0 fake re-drawn browser/phone chrome, and 8 interactive states (`default, hover, focus-visible, active, disabled, loading, error, success`).


---

## 6. Pre-Build Planning Gate & Zero Design-Jargon Copy Enforcement

1. **Never Build Without Approved Plan (`web-planning` Gate First):**
   - If the user asks to create a website and `USER_FLOW_AND_PAGE_ARCHITECTURE.md` + tech stack confirmation have not been approved by the user in the conversation yet, pause coding, run `web-planning` first, present the architecture & stack options, and ask the user for confirmation.
2. **Zero Meta-Design Jargon in DOM Copy (`No "Bento" in Headings/Nav`):**
   - When implementing a Bento Grid, Editorial Ledger, or Hallmark material theme, apply the concept strictly through **CSS Grid layout, spacing, borders, and surface tokens**—never write the word `"Bento"`, `"Hallmark"`, `"Nordic"`, or `"Blueprint"` inside navbar links (`BENTO SPESIFIKASI` -> forbidden) or section headings (`Bento Spesifikasi Teknis` -> forbidden). Use 100% real-world domain copy (`SPESIFIKASI MESIN`, `Spesifikasi Teknis & Kapasitas Pemesinan`).

