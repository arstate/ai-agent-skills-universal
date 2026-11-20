---
name: web-builder
description: "Autonomous web architect (/web-builder): Next.js/Astro/Tailwind production builds, readme-ai-agent docs, Git restore points, 7-viewport Vision QA."
---

# `web-builder` — Senior Frontend Architect & Parallel Swarm Executor

Production Web Architect for **Google Antigravity CLI (`agy`)**. Builds zero-slop, multi-device (`360px`–`1440px`) websites with `shadcn/ui` + Tailwind OKLCH, GSAP + `motion/react` dual-engine, free-tier Firebase + Cloudinary, `readme-ai-agent/` handover, and Git restore points.

---

## 1. Pre-Flight Handover, Context7 & Restore Point Gate
1. **`readme-ai-agent/` Audit:** Check `[ -d "readme-ai-agent" ] && [ -f "readme-ai-agent/AGENTS.md" ] && [ -f "AGENTS.md" ]`. If missing on a legacy repo, scan codebase and initialize `./AGENTS.md` + 12 files in `readme-ai-agent/` first (never `CLAUDE.md`). If present, read `readme-ai-agent/AGENTS.md` (`< 150 tokens`), `TECHSTACK.md`, `STYLE-GUIDE.md`, and `BUG-AND-FIX.md`.
2. **Pre-Build Approval & Zero Data Guessing:** Never code without an approved `USER_FLOW_AND_PAGE_ARCHITECTURE.md` + stack confirmation from `web-planning`. Isolate unknown WA numbers, prices, or `.env` keys in `src/config/siteConfig.ts` with `TODO_ASK_USER`.
3. **Live Docs Gate (Context7):** Run `npx ctx7 setup` / `ctx7` CLI (or `websearch` fallback) before writing version-sensitive code (`Next.js 15`, `React 19`, `Tailwind v4`, `gsap`, `motion/react`, `@supabase/ssr`).
4. **Local Git Restore Points:** Log hashes + `git reset --hard <hash>` in `readme-ai-agent/GIT-RESTORE-POINTS.md`:
   ```bash
   git init && git add -A && git commit -m "chore(restore): pre-build snapshot" --allow-empty && git tag -f restore-pre-build
   # After build + 7-viewport Vision QA passes:
   git add -A && git commit -m "feat(web): verified production build" && git tag -f restore-verified-v1
   ```

---

## 2. Parallel Swarm Governance & Free-Tier Stack
- **Track A (UI & Dual-Engine Motion):** `shadcn/ui` + Tailwind CSS + OKLCH `60-30-10` tokens + `lucide-react` (0 emojis, 1 icon set). Dual-engine motion: **GSAP** (`ScrollTrigger`, `SplitText`, `useGSAP`) for scroll/timeline choreography + **`motion/react`** for UI micro-interactions/springs.
- **Track B (Free-Tier Firebase, Supabase & Cloudinary):**
  - **Firebase Spark:** `persistentLocalCache()`, `limit(20)` on all queries, `onSnapshot` always paired with `unsubscribe()`, strict `firestore.rules`, 1-doc catalog bundle.
  - **Supabase (if Hybrid):** `@supabase/ssr` cookie client, RLS (`auth.uid() = user_id`), `SUPABASE_SERVICE_ROLE_KEY` in `import "server-only"`.
  - **Cloudinary:** `images: { unoptimized: true }` in `next.config.*` (zero `/_next/image`) + `f_auto,q_auto` delivery (`w_480` / `w_1080`) + browser WebP `< 120 KB`.
- **Track C (Conversion & QA):** `src/config/siteConfig.ts` single source of truth, sticky WA bar, 7-viewport Vision QA.

---

## 3. UI Typography, Responsive (`360px`–`1440px`) & Anti-Slop Gates
1. **Brand Separation:** Internal GSM tokens (`#F7F4EC`, `#012969`, `#FF3E1D`, `#FACC15`) for internal assets only; client sites adapt 100% to client niche. Always use *Desain Modern Tegas* or *Minimalis Berkelas* (never raw/harsh jargon) in UI/chat. Max 2 font families.
2. **Cold-Hero-First & CSS Stamp:** Verify Hero at `1280x800` and `375x812` first (`padding-block-end >= 1.3x padding-block-start`). Stamp CSS line 1 with `P-H-E-S-R-V` (`>= 3/5`).
3. **Responsive Non-Negotiables:**
   - `html, body { overflow-x: clip }`, `minmax(0, 1fr)` on grids, `overflow-wrap: anywhere; min-width: 0` on headings, upright roman headings (0 italic `<em>`).
   - Prefer native web platform APIs (`@container`, `subgrid`, `<dialog>`, `Popover API`, `View Transitions`) over heavy JS dependencies.
   - Mobile (`360px`/`390px`): `min-h-[44px]` touch targets, `text-base sm:text-sm` inputs, `min-h-dvh`, compact landscape sticky bars (`landscape:py-1.5`).
4. **Zero Meta-Jargon & Anti-Footer-Slop:** Never write `"Bento"`, `"Hallmark"`, `"Nordic"`, `"Built with Next.js"`, or `"Tailwind CSS"` in DOM copy/footers (`grep -riE "Dibuat dengan|Built with|Tailwind CSS|App Router|Bento " src/` must return 0 matches).

---

## 4. Production Engineering Discipline & Vision QA
1. **TDD & Thin Vertical Slices:** Write failing test/check first (RED -> GREEN -> REFACTOR) for calculators/APIs. Build in thin vertical slices; max `500 lines` per file (*Rule of 500*); never delete guards without tracing (*Chesterton's Fence*).
2. **Pre-Ship Verification:**
   - Run `npm run build` (0 TS/JSX errors, 0 emojis).
   - Capture headless screenshots across `360x800`, `390x844`, `844x390`, `768x1024`, `1280x800`, `1440x900` and inspect via Vision (`read_file`).
   - Update `readme-ai-agent/AGENTS.md`, `TASK.md`, `BUG-AND-FIX.md`, `DESIGN-CRITIQUE.md`, and `GIT-RESTORE-POINTS.md`.
