# Live Project State Checkpoint (`readme-ai-agent/AGENTS.md` — Max 150 Tokens)

- **Active Phase:** Phase 1 (Audit, Stack Selection & Planning)
- **Chosen Tech Stack:** [Option 1: Next.js Static Export | Option 2: Next.js Fullstack Hybrid `force-static` | Option 3: Astro 5 + React Islands | Option 4: React Vite SPA]
- **Locked Design Tokens:** [Ref #ID from 300-Ref Vault | Palette | Typography | Max 2-3 Accents/VP | Studio Footer Archetype]
- **Latest Git Restore Tag:** `restore-init`
- **Next Action:** Verify client data (`[stated]` WA number, pricing, address) & execute Phase 2 build.


## Mandatory Pre-Build Planning Gate & Zero Meta-Design Jargon in UI Copy
1. **Always Plan & Ask User First Before Coding a Website (`web-planning` Gate):**
   - Never jump straight into coding a full website (`index.html` or Next.js build) without presenting the `USER_FLOW_AND_PAGE_ARCHITECTURE.md` plan, section structure, and Tech Stack recommendation (`Next.js 15 App Router`) and asking the user to confirm first.
2. **Zero Meta-Design / Layout Jargon in Live Website Copy (`Gate C-Copy`):**
   - Never write CSS layout or theme names like `"Bento"`, `"Bento Spesifikasi"`, `"Hallmark"`, `"Nordic Precision"`, `"Blueprint"`, `"Hero Section"`, or `"CTA Block"` inside website navbars, headings (`<h1>`–`<h4>`), badges, or body text!
   - Implement Bento Grid or Hallmark themes purely via CSS layout and visual tokens while keeping 100% of visible website text in authentic domain/industry terminology (e.g., `SPESIFIKASI MESIN`, `Spesifikasi Teknis & Kapasitas Pemesinan`).

## Visible Chrome GUI Window & Live AI Cursor HUD (`chrome-browser-control`)
- Whenever launching or controlling Chrome (previewing designs, testing `localhost:3000`, auditing UI, or automating web tasks):
  1. **Always Open a Visible GUI Chrome Window (Never Headless on Desktop):** Run `bash ~/.agents/tools/launch-visible-chrome.sh 9223 "<url>"` (or launch Chrome without `--headless` on `DISPLAY=:0`) and call CDP `Page.bringToFront` so the window pops up visibly on the user's monitor.
  2. **Always Show the Live AI Visual Cursor, Click Ripple & Activity HUD:** Inject `~/.agents/tools/ai-cursor-hud.js` via `Page.addScriptToEvaluateOnNewDocument` and `Runtime.evaluate`, and drive interactions via `python3 ~/.agents/tools/cdp_visual_agent.py` (or `window.__aiCursor`) so the user sees every mouse movement, element highlight box, click ripple, typing action, and live status badge on screen!

