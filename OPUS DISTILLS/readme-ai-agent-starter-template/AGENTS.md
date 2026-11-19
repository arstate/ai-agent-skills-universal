# Live Project State Checkpoint (`readme-ai-agent/AGENTS.md` — Max 150 Tokens)

- **Active Milestone:** M1 — Discovery & Ask-First (`ask_question` min 5 options/question)
- **Chosen Tech Stack:** [Option 1: Next.js 15 Static Export | Option 2: Next.js 15 Fullstack Hybrid + Firebase/Supabase | Option 3: Astro 5 + React Islands | Option 4: Vite React SPA | Option 5: Android Kotlin/Compose]
- **Locked Design Tokens:** [Ref #ID from 300-Ref Vault | Palette | Typography | Max 2-3 Accents/VP | Studio Footer Archetype]
- **Latest Git Restore Tag:** `restore-init`
- **Next Action:** Run `M1` (`ask_question` min 5 options + `anti-yes-man`), then `M2` (`npx ctx7 setup`, `DESIGN_SYSTEM.md`, `readme-ai-agent/`, Milestone List `M3.1–M3.N`) & wait for user ACC before `M3` build.


## Mandatory Pre-Build Planning Gate (M1–M5) & Zero Meta-Design Jargon in UI Copy
1. **Always Run M1 Ask-First & M2 Contract Lock Before Coding (`web-planning` + `anti-yes-man`):**
   - In **M1**, always call `ask_question` with **at least 5 options per question** (recommended option #1) and challenge weak briefs.
   - In **M2**, run `npx ctx7 setup` (Context7) for live official docs, then present `DESIGN_SYSTEM.md`, `USER_FLOW_AND_PAGE_ARCHITECTURE.md`, and Milestone List (`M3.1–M3.N`) for user ACC before writing production code in **M3**.
2. **Zero Meta-Design / Layout Jargon in Live Website Copy (`Gate C-Copy`):**
   - Never write CSS layout or theme names like `"Bento"`, `"Bento Spesifikasi"`, `"Hallmark"`, `"Nordic Precision"`, `"Blueprint"`, `"Hero Section"`, or `"CTA Block"` inside website navbars, headings (`<h1>`–`<h4>`), badges, or body text!
   - Implement Bento Grid or Hallmark themes purely via CSS layout and visual tokens while keeping 100% of visible website text in authentic domain/industry terminology (e.g., `SPESIFIKASI MESIN`, `Spesifikasi Teknis & Kapasitas Pemesinan`).

## Visible Chrome GUI Window & Live AI Cursor HUD (`chrome-browser-control`)
- Whenever launching or controlling Chrome (previewing designs, testing `localhost:3000`, auditing UI, or automating web tasks):
  1. **Always Open a Visible GUI Chrome Window (Never Headless on Desktop):** Run `bash ~/.agents/tools/launch-visible-chrome.sh 9223 "<url>"` (or launch Chrome without `--headless` on `DISPLAY=:0`) and call CDP `Page.bringToFront` so the window pops up visibly on the user's monitor.
  2. **Always Show the Live AI Visual Cursor, Click Ripple & Activity HUD:** Inject `~/.agents/tools/ai-cursor-hud.js` via `Page.addScriptToEvaluateOnNewDocument` and `Runtime.evaluate`, and drive interactions via `python3 ~/.agents/tools/cdp_visual_agent.py` (or `window.__aiCursor`) so the user sees every mouse movement, element highlight box, click ripple, typing action, and live status badge on screen!

