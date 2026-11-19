---
name: web-debugging
description: "Forensic web debugger & security auditor (/web-debugging): 4-phase root cause, 7-layer anti-hack audit, 58 sloplint gates, 7-viewport Vision QA."
---
# Web Debugging, M4 Auto-QA & Defensive Security Auditor

Forensic Frontend/Fullstack Debugger and Defensive AppSec Auditor combining **M4 Auto-QA & Self-Debugging Loop**, **7-Viewport Vision QA**, **58-Gate `sloplint`**, and **7-Layer OWASP Security Auditing**, logged into `readme-ai-agent/` (`AGENTS.md`, `SECURITY.md`, `BUG-AND-FIX.md`, `DESIGN-CRITIQUE.md`, `GIT-RESTORE-POINTS.md`).

## 1. Pre-Flight & Git Restore Point
1. **Check `readme-ai-agent/AGENTS.md`:** If missing, create `./AGENTS.md` + 12 files in `readme-ai-agent/` first (never `CLAUDE.md`).
2. **Git Snapshot:** `git add -A && git commit -m "chore(restore): pre-debug snapshot" --allow-empty && git tag -f restore-pre-audit-$(date +%Y%m%d-%H%M)`.
3. **Zero Data Guessing:** Never hardcode fake API keys or client contact data.

## 2. M4 Auto-QA & Mandatory Self-Debugging Loop (`0` Errors)
Run this sequential loop until **0 errors, 0 FAIL, 0 overflow, 0 console errors**:
1. **Type & Build Gate:** `npx tsc --noEmit && npm run build` (must exit `0`).
2. **Sloplint Render Gate:** `node skills/hallmark/scripts/sloplint.mjs <output> --render` (`0 FAIL, 0 REFLEX`).
3. **Contrast Gate (`no-slop-design`):** Run `python3 skills/web-debugging/scripts/contrast.py` (or verify `|L_text - L_bg| >= 50%` OKLCH / WCAG `>= 4.5:1` across all surfaces and dark-section flips).
4. **Adversarial Audit (`sloplint.mjs --render` + `contrast.py` + 7-Viewport Vision QA):**
   - Scan UI/code against 58 `sloplint` gates + `DESIGN_SYSTEM.md` via `node skills/hallmark/scripts/sloplint.mjs <output> --render`.
   - Surgical remediation on the exact broken surface without widening scope, then re-verify with `python3 skills/web-debugging/scripts/contrast.py` + 7-Viewport Vision QA.
5. **7-Viewport Vision QA (`360x800`–`1440x900`):**
   - Inspect live screenshots via Vision Agent (`read_file`) across `360x800`, `390x844`, `412x915`, `844x390`, `768x1024`, `1024x768`, `1280x800`, `1440x900`.
   - Verify `0` console errors, `document.documentElement.scrollWidth <= window.innerWidth`, `>= 44px` tap targets, `0` 2-line clickable buttons, and `0` meta-jargon leaks (`Bento`, `Hallmark`, `Dibuat dengan...`).
   - **Visible Chrome + AI Cursor HUD:** Run visual checks in visible Chrome on port `9223` (`launch-visible-chrome.sh` + `cdp_visual_agent.py` / `ai-cursor-hud.js`); use `playwright-cli` only for fast headless smoke assertions.

## 3. `obra/superpowers` 4-Phase Root Cause Protocol (The Iron Law)
> **NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.** Symptom fixes are forbidden.
1. **Phase 1 — Root Cause:** Read full stack trace, reproduce deterministically, check `git diff`, trace bad values backward to their origin.
2. **Phase 2 — Pattern Analysis:** Compare against working components/routes in the same repo.
3. **Phase 3 — Single Hypothesis:** State *"Root cause is X because Y"* and change **1 variable at a time**.
4. **Phase 4 — TDD Fix & 3-Strike Stop:** Write a failing check first, apply root-cause fix + Defense-in-Depth. If **3 fixes** fail, **STOP** and propose a structural redesign.

## 4. Deep 7-Layer Defensive Security Audit
Audit and patch in `readme-ai-agent/SECURITY.md`:
1. **Secrets:** No `NEXT_PUBLIC_` on private keys; add `import "server-only"` to DAL modules.
2. **Authz (IDOR):** Re-verify auth + `doc.ownerId === user.uid` inside every Server Action & `/api/*` route.
3. **Validation:** Strict **Zod** schemas with `.max()` caps; return minimal DTOs.
4. **Firestore Rules:** Strict ownership, `.keys().hasOnly([...])`, `.size() <= 120` (never `if true`).
5. **XSS / URI:** Strip `dangerouslySetInnerHTML`, allowlist `https:`, wrap WhatsApp text in `encodeURIComponent()`.
6. **Cloudinary:** Restrict unsigned presets to `webp,jpg,png,mp4` + size/transform caps.
7. **Headers & Rate Limit:** `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, HSTS, CSP, honeypot.
