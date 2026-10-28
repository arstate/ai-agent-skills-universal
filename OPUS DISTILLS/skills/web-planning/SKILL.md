---
name: web-planning
description: Strategic Web Information Architecture, Interactive Tech Stack Recommender (Next.js Static vs Next.js Fullstack Hybrid vs Astro 5 + React Islands vs React Vite SPA), Legacy Project readme-ai-agent/ Backfill Auditor, PRD Authoring, Technical SEO/GEO Planning, Free-Tier Cloud Architecture (Firebase + Cloudinary + Cloudflare), and Pre-Flight UI/UX Blueprinting Specialist. Use when the user types /web-planning, opens an existing project missing readme-ai-agent/, or asks to build a website with an underspecified prompt.
---

# `web-planning` — Interactive Tech Stack Recommender, Legacy Repo Auditor, PRD, SEO/GEO & 12-File `AGENTS.md` Architect

Strategic Pre-Flight Planner, Tech Stack Advisor, Conversion Architect, and SEO/GEO Strategist for **Google Antigravity CLI (`agy`)**. Prevents wrong-stack disasters, Vercel quota overages, and undocumented legacy codebases before a single line of code is written.

---

## 0. Mandatory Legacy & New Project `readme-ai-agent/` Audit Gate (Check & Backfill First!)

Whenever invoked on **any web project** (new or existing/legacy):
1. **Run Directory Check (`[ -d "readme-ai-agent" ] && [ -f "readme-ai-agent/AGENTS.md" ] && [ -f "AGENTS.md" ]`):**
   - **If `readme-ai-agent/` is missing on an existing/old project:** Do NOT skip documentation! First inspect `package.json`, `next.config.*` / `astro.config.*` / `vite.config.*`, `src/` routes/components, Tailwind/CSS tokens, and `git log -n 5`, then **immediately create `<project-root>/AGENTS.md` + all 12 files inside `<project-root>/readme-ai-agent/`** populated with the existing project's real architecture!
   - **If `CLAUDE.md` or singular `AGENT.md` exists inside `readme-ai-agent/`:** Migrate it immediately to **`readme-ai-agent/AGENTS.md`** (never use `CLAUDE.md` inside `readme-ai-agent/`).

---

## 1. Interactive Tech Stack Recommender & Goal Gate (`ask-questions-if-underspecified`)

When a user asks to build a website or web app without specifying the exact tech stack or full requirements:
1. **Never assume a single stack blindly.**
2. **Give a sharp Co-Founder Recommendation** (telling them which stack fits their business best and why), followed by the **4-Stack Comparison Table** and **Business Data Check**:

| Stack Option | Best Use Case | SEO / GEO & AI Search | Server Quota & Cost Shield (`web-optimization`) |
|---|---|---|---|
| **Option 1: Next.js App Router (Static Export `output: 'export'`)** | High-traffic Ad Landing Pages (Meta/TikTok Ads), Company Profiles, Property/Service Catalogs with Direct WA Checkout. | **S-Rank** (Pre-rendered HTML + JSON-LD + `llms.txt`). | **Zero Serverless (`0` invocations)**. 1M+ ad clicks absorbed by Cloudflare Edge + PWA SW. |
| **Option 2: Next.js App Router (Fullstack Hybrid `force-static` + BaaS)** | Fullstack Web Apps needing Admin Dashboard CRUD, User Auth, Database (Firebase Spark / Supabase), Meta CAPI Server-Side, or Webhooks. | **S-Rank** on public pages (`dynamic = 'force-static'`) + Dynamic `/api` & `/admin`. | Public pages cached on Cloudflare via `CDN-Cache-Control` (`s-maxage=604800`); `/api` & `/admin` protected by `private, no-store`. |
| **Option 3: Astro 5 + React Islands (`client:visible`)** | Content-heavy SEO hubs, editorial portfolios, or ultra-fast landing pages needing interactive React widgets (KPR/ROI calculators) + GSAP. | **S-Rank+** (`0 KB` JS baseline, fastest possible `LCP < 0.6s`). | Pure static HTML + on-demand hydrated React islands; near-zero bandwidth and CPU footprint. |
| **Option 4: React (Vite SPA) + Tailwind CSS** | Internal tools, private Admin Dashboards, interactive calculators, or pure client-side apps where per-page Google SEO indexing isn't needed. | **Client-Rendered SPA** (Not for multi-page organic SEO). | Instant local builds (`< 1s`), vendor chunk splitting, 100% static CDN hosting (`0` server compute). |

### Mandatory 5-Point Verification Checklist (Ask User Before Coding if Missing)
1. **Tech Stack Lock:** Confirm Option 1, 2, 3, or 4 (default to recommending **Option 1** for pure ad/WA landing pages, or **Option 2** if they need an Admin Dashboard/Database).
2. **Primary Conversion KPI:** Direct WhatsApp Closing (`wa.me`), Interactive Calculator Lead Capture, Catalog Checkout, or Appointment Booking?
3. **Real Business Data (`[stated]` Only — Zero Guessing):** Official WhatsApp number, real prices/packages, physical address (NAP), and verified testimonials/metrics. (Put `TODO_ASK_USER` in `src/config/siteConfig.ts` for any item not yet provided).
4. **Visual Direction (OpenDesign 8 Dimensions):** Preferred mood/palette or reference screenshot/URL (`zanwei/design-dna`).
5. **Cloud/Tracking Keys (If Fullstack/Ads):** Firebase/Supabase config, Cloudinary `cloud_name`, Meta Pixel ID.

---

## 2. Mandatory 12-File Project Brain Initialization (`readme-ai-agent/` + Root `./AGENTS.md`)

> **Antigravity CLI Native Rule:** Always use **`AGENTS.md`** (`./AGENTS.md` at project root + `readme-ai-agent/AGENTS.md` inside `readme-ai-agent/`). **Never** create `CLAUDE.md` or singular `AGENT.md` inside `readme-ai-agent/`.

Once the stack and goals are confirmed (or when backfilling a legacy project), initialize these **12 structured Markdown files** inside `readme-ai-agent/` plus root `./AGENTS.md`:
1. `readme-ai-agent/AGENTS.md` & root `./AGENTS.md` (`< 150-token` live state checkpoint, Antigravity CLI `@[Project Brain](readme-ai-agent/AGENTS.md)` auto-loader, & default `opus-distills` lock)
2. `readme-ai-agent/README.md` & root `./README.md` (Project overview, setup commands, & 12-file index)
3. `readme-ai-agent/PRD.md` (Goals, KPI, VOC, User Stories, Scope, `GLOSSARY`, & Verified Client Data)
4. `readme-ai-agent/TECHSTACK.md` (Chosen Stack Option 1/2/3/4, `ADR` decisions, & Zero-Usage Vercel/Cloudflare/Firebase/Cloudinary contract)
5. `readme-ai-agent/STYLE-GUIDE.md` (OpenDesign 8 Dimensions, 300-Ref Vault ID `#001–#300`, `DESIGN-DNA.json`, `#6366f1` ban, max 2–3 accents/viewport, Studio Footer archetype)
6. `readme-ai-agent/SEO-GEO.md` (Title/Meta/H1 map, Schema.org JSON-LD, `llms.txt`, `sitemap.ts`, `robots.ts`)
7. `readme-ai-agent/SECURITY.md` (7-Layer Anti-Hack Policy & Audit Report, `server-only`, Zod, CSP, `firestore.rules`, `CONSTRAINTS`)
8. `readme-ai-agent/SKILLS.md` (Active Antigravity CLI Skills & MCP Registry)
9. `readme-ai-agent/TASK.md` (Granular `[ ] / [/] / [x]` Parallel Swarm Checklist)
10. `readme-ai-agent/BUG-AND-FIX.md` (Unified 4-Phase Systematic Debugging root-cause & fix ledger)
11. `readme-ai-agent/GIT-RESTORE-POINTS.md` (Local Git commit hashes & rollback tags)
12. `readme-ai-agent/DESIGN-CRITIQUE.md` (14-Pass 7-Viewport Vision QA scorecard)

### Template for Root `./AGENTS.md` (Antigravity CLI Always-On Loader)
```markdown
# Project Agent Rules & Live Brain (`AGENTS.md`)

@[Project Brain State](readme-ai-agent/AGENTS.md)

## Mandatory Operating Rules (Antigravity CLI + `opus-distills`)
- **Default Master Brain:** Always apply `opus-distills` + `terse-respon` (ultra-compact Indonesian chat, 100% uncut code/design output).
- **12-File Brain Continuity:** Read `readme-ai-agent/AGENTS.md` (`< 150 tokens`) before any task, and update `readme-ai-agent/AGENTS.md` + the phase-relevant file in `readme-ai-agent/` after every milestone.
- **Anti-Footer-Slop:** Never output framework names ("Built with Next.js/Tailwind") or theme prompt labels in UI footers.
```

---

## 3. `grill-with-docs` (Matt Pocock) & `interview-me` / `constraint-driven-development` (Addy Osmani) Protocol

Whenever the user types `/grill-with-docs`, `/grill-me`, `/plan`, or asks to plan a feature on an existing or new repo:
1. **Codebase-First Rule (`grill-with-docs` Law):** Never ask the user a question that can be answered by reading the existing repository! Inspect `package.json`, directory structure, and existing docs first.
2. **Branch-by-Branch Relentless Interrogation (`interview-me` up to 95% Confidence):**
   - Ask **1 focused round of high-leverage questions at a time** (with concrete Co-Founder recommendations for each question) to resolve ambiguities in domain logic, edge cases, user roles, and failure states.
3. **Stateful Paper Trail (Fixing the `grill-with-docs` Amnesia Bug):**
   - Persist **all 3 outputs immediately to `readme-ai-agent/`**:
     - **Domain Vocabulary (`GLOSSARY` section inside `readme-ai-agent/PRD.md`):** Every project-specific term agreed with the user is defined in 1 crisp sentence.
     - **Hard Architectural Decisions (`ADR` section inside `readme-ai-agent/TECHSTACK.md`):** Logged with `[Context -> Decision -> Consequences]`.
     - **Quality Bar & Anti-Cheat Constraints (`CONSTRAINTS` section inside `readme-ai-agent/SECURITY.md` & `TECHSTACK.md`):** Define test coverage floors, bundle budgets (`< 100 KB`), and **forbid silencing checks** (never allow `@ts-ignore`, `eslint-disable`, or skipping failing tests!).

---

## 4. HUKUM ANTI-LONCAT FASE (Dilarang Langsung Bikin `index.html` Mentah Saat User Minta Planning / User Flow!)

Ketika user berkata *"next steps alur web page user flow md included visual flow trus anda planning step step bikin web ini biar hasil maksimal anda working step bystep"* (atau memilih salah satu referensi/style desain):
1. **DILARANG KERAS langsung men-generate website ke dalam `index.html` vanilla mentah tanpa menyelesaikan tahap Planning & Konfirmasi Tech Stack!**
2. **Urutan Output Wajib pada Tahap Planning (`web-planning`):**
   - **Deliverable 1 (`readme-ai-agent/` 12 File + `./AGENTS.md`):** Pastikan ke-12 file otak proyek (`AGENTS.md`, `PRD.md`, `TECHSTACK.md`, `STYLE-GUIDE.md`, `SEO-GEO.md`, `SECURITY.md`, `SKILLS.md`, `TASK.md`, `BUG-AND-FIX.md`, `GIT-RESTORE-POINTS.md`, `DESIGN-CRITIQUE.md`, `README.md`) sudah terbuat dan terisi.
   - **Deliverable 2 (`USER-FLOW-AND-ARCHITECTURE.md`):** Susun dokumen alur psikologi pengunjung (*User Flow Mermaid Diagram* dari *Ad Click / Organic Search -> Hero Hook 3 Detik -> Interactive Calculator / Bento Proof -> Objection Handling -> Direct WhatsApp Closing*), lengkap dengan anatomi tiap seksi halaman.
   - **Deliverable 3 (Rekomendasi Tech Stack Co-Founder + Step-by-Step Build Plan):**
     - Rekomendasikan **Opsi 1 (Next.js 15 App Router Static Export `output: 'export'`)** atau **Opsi 2 (Next.js 15 Fullstack Hybrid `force-static`)** sebagai standar utama produksi (bukan HTML mentah!).
     - Jabarkan **Step-by-Step Build Milestones** (Milestone 1: Scaffold Next.js 15 & `tokens.css` -> Milestone 2: Cold-Hero-First Build & Review -> Milestone 3: Interactive Bento & WA Calculator -> Milestone 4: 7-Viewport Vision QA & 58-Gate Hallmark `sloplint`).
   - **Deliverable 4 (Konfirmasi Eksekusi):** Akhiri dengan pertanyaan tajam: *"Alur User Flow & Blueprint Next.js 15 udah siap, Bro. Langsung kita gas Milestone 1 & 2 di Next.js 15 sekarang?"*


---

## 6. Pre-Build Planning Gate & Authentic Domain Copy Architecture

1. **Pre-Build Planning & User Confirmation Before Any Production Code (`Pre-Flight Gate`):**
   - Whenever the user asks to create a website, landing page, or web app—or selects a visual style from `design-style-preview.html` and asks for next steps—do not skip straight to coding the final website without presenting the plan and asking the user first.
   - Present a structured, scannable **Pre-Flight Architecture & User Flow Plan**:
     1. **Visual & Conversion User Flow (`USER_FLOW_AND_PAGE_ARCHITECTURE.md`)** with a Mermaid diagram mapping visitor psychology (Awareness -> Technical Proof -> Interactive Calculator/Tool -> Direct WhatsApp Checkout).
     2. **Section-by-Section Content & Real Domain Copy Plan** (exact real-world headings and navbar labels).
     3. **Tech Stack Recommendation (#1 Co-Founder Pick: Next.js 15 App Router `output: 'export'` or Fullstack Hybrid)** with the 4-stack comparison table.
     4. **Explicit Confirmation Question:** Always close the planning turn by asking the user to confirm the stack, flow, and any missing business details before executing `web-builder`.
2. **Strict Ban on Meta-Design Jargon in Page Copy & Navigation:**
   - Never name a navbar item, section title, or button after its CSS layout pattern or theme slug.
   - Forbidden in customer-facing text: *"Bento"*, *"Bento Spesifikasi"*, *"Bento Grid"*, *"Hallmark"*, *"Nordic Precision"*, *"Hero Section"*, *"Social Proof"*, *"Bento Layanan"*, *"CTA Section"*.
   - Always write 100% authentic domain terminology that a real customer or plant manager in that industry expects to read (e.g., `SPESIFIKASI MESIN`, `KAPABILITAS PRODUKSI`, `KALKULATOR ESTIMASI RFQ`, `STANDAR QC ISO`).

