---
name: web-debugging
description: Forensic Multi-Device Frontend/Fullstack Web Debugger and Deep Defensive Security Auditor (Anti-Hack Hardening for Vibe-Coded Apps) with Mandatory Vision Agent QA (Mobile 360px/390px, Landscape, Tablet 768px, Desktop 1280px+) and Automatic SECURITY-AUDIT.md, BUG-AND-FIX.md, and Git Restore Point Logging. Use when the user types /web-debugging or /web-debuging, or asks to find bugs, audit web security vulnerabilities, check responsive mobile/PC layouts with Vision Agent, or harden production readiness.
---
# Web Debugging, Multi-Device Vision QA, and Deep Defensive Security Auditor

Forensic Frontend/Fullstack Debugger and Defensive AppSec Auditor combining **7-Viewport Multi-Device Vision Agent Inspection**, **Deep Vibe-Coding Security Auditing (OWASP Top 10 + Next.js/Firebase/Cloudinary Hardening)**, and automatic logging into `<project-root>/readme-ai-agent/AGENTS.md`, `SECURITY.md`, `BUG-AND-FIX.md`, `DESIGN-CRITIQUE.md`, and `GIT-RESTORE-POINTS.md`.

## When to Use

- The user types `/web-debugging` (or `/web-debuging`) or asks to hunt bugs, audit security weaknesses, check responsive layouts across mobile and PC devices, or harden a vibe-coded website before deployment.
- A project needs a deep defensive security review to find and patch exposed secrets, broken access control, insecure Firestore rules, unvalidated Server Actions, XSS, or missing security headers.
- Executing Phase 4 QA & Security verification for `/web-builder` or `/web-master-agent`.

## 1. Pre-Flight Continuity Check, Latest Advisory Search, & Git Snapshot

1. **Mandatory `readme-ai-agent/AGENTS.md` Audit & Legacy Backfill First:** Check `[ -d "readme-ai-agent" ] && [ -f "readme-ai-agent/AGENTS.md" ]`. If `readme-ai-agent/` is missing on an existing/legacy project, **create `./AGENTS.md` + all 12 files in `readme-ai-agent/` first** by scanning the repo! Never use `CLAUDE.md` or singular `AGENT.md` inside `readme-ai-agent/`. Read `readme-ai-agent/AGENTS.md`, `PRD.md`, `STYLE-GUIDE.md`, `TECHSTACK.md`, `BUG-AND-FIX.md`, and `SECURITY.md` before debugging so you never break existing fixes.
2. **Mandatory Web Search for Latest Security Advisories:** Run targeted web search queries (`google:search`) for the latest Next.js / React / Firebase / NPM CVEs and OWASP vibe-coding security advisories relevant to the project's dependencies.
3. **Create Pre-Audit Git Restore Point:** Snapshot the repo in local Git and log it in `readme-ai-agent/GIT-RESTORE-POINTS.md`:

```bash
git add -A && git commit -m "chore(restore): pre-debug-and-security-audit snapshot" --allow-empty
git tag -f restore-pre-audit-$(date +%Y%m%d-%H%M)
```

4. **Zero Data Guessing:** Never hardcode fake API keys or client contact data when fixing bugs. Add safe fallback guards and prompt the user for missing credentials.

## 2. Deep 7-Layer Defensive Security Audit (Anti-Hack Hardening for Vibe-Coded Webs)

AI-generated ("vibe-coded") apps frequently ship with critical blindspots in authorization, secret handling, and database rules. Audit every layer below, document all findings in `readme-ai-agent/SECURITY.md`, and patch them directly:

| Audit Layer | Common Vibe-Coding Vulnerability | Mandatory Defensive Patch & Hardening Standard |
| :--- | :--- | :--- |
| **1. Secrets & Client Bundle Leak** | Private keys (`CLOUDINARY_API_SECRET`, Firebase Admin keys, internal tokens) prefixed with `NEXT_PUBLIC_` or imported into `'use client'` files | Remove `NEXT_PUBLIC_` from all secret keys; add `import "server-only"` at the top of every Data Access Layer (`src/data/*`, `src/lib/server/*`) module |
| **2. Next.js Server Actions & API Authz (IDOR)** | Relying on page-level redirects while leaving `"use server"` actions or `/api/*` routes open to direct unauthenticated POST requests or IDOR | Re-verify user authentication AND resource ownership (`doc.ownerId === user.uid` or admin token claim) inside every Server Action and Route Handler |
| **3. Input Validation & DTO Sanitization** | Passing raw `FormData`, `searchParams`, or `req.body` directly to database queries, or returning full raw user records to the client | Validate all inputs with strict **Zod** schemas (`z.object(...)` with `.max()` length caps) and return minimal Data Transfer Objects (DTOs) |
| **4. Firebase Firestore Security Rules** | Permissive rules (`allow read, write: if true;` or `allow write: if request.auth != null;` without schema/owner checks) allowing database wiping or quota exhaustion | Lock `firestore.rules` with strict ownership (`request.auth.uid == userId`), admin custom claims, `.keys().hasOnly([...])`, and string `.size() <= 120` limits |
| **5. XSS, Open Redirect & URI Injection** | Unsanitized `dangerouslySetInnerHTML`, dynamic `href={input}` allowing `javascript:` execution, or unencoded WhatsApp checkout text | Strip `dangerouslySetInnerHTML`, validate URLs against an `https:` allowlist, and wrap all WhatsApp parameters in `encodeURIComponent()` |
| **6. Cloudinary Upload & Media Abuse** | Open upload endpoints allowing arbitrary file types (SVG/HTML script injection) or huge 100 MB files that drain free credits | Restrict unsigned preset to `webp,jpg,png,mp4` only, enforce client + preset max file size, and lock delivery transforms to `w_480` / `w_1080` |
| **7. Security Headers, CSP & Rate Limiting** | Missing HTTP security headers (vulnerable to clickjacking/MIME sniffing) and unprotected public lead/order forms | Inject `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS, CSP, and honeypot + rate limiting |

### Defensive Code Pattern: Hardened Server Action + Security Headers

```typescript
// src/actions/submitLeadAction.ts
"use server";
import "server-only";
import { z } from "zod";

// 1. Strict Zod schema with length caps & honeypot field to block automated bot spam
const LeadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  itemName: z.string().trim().min(2).max(120),
  honeypot: z.string().max(0, "Bot detected"), // Must be empty
});

export async function submitLeadSafe(formData: FormData) {
  // 2. Origin check & input validation
  const parsed = LeadSchema.safeParse({
    name: formData.get("name"),
    itemName: formData.get("itemName"),
    honeypot: formData.get("website_hp") ?? "",
  });

  if (!parsed.success) {
    return { ok: false, error: "Input tidak valid" };
  }

  // 3. Return minimal DTO (never leak internal database metadata or stack traces)
  return {
    ok: true,
    waRedirectUrl: `https://wa.me/6285196598881?text=${encodeURIComponent(
      `Halo, saya ${parsed.data.name}, tertarik dengan ${parsed.data.itemName}`
    )}`,
  };
}
```

### Automated Static Security & Anti-Slop Scanner Commands

```bash
# 1. Scan for accidental secret exposure in client code or NEXT_PUBLIC_ misuse
grep -rnE "NEXT_PUBLIC_.*(SECRET|PRIVATE|ADMIN|PASSWORD|KEY)" src/ .env* || echo "Secrets Check Passed"

# 2. Scan for dangerous XSS sinks or eval usage
grep -rnE "(dangerouslySetInnerHTML|eval\(|new Function\()" src/ || echo "0 XSS Sinks Verified"

# 3. Scan for forbidden emojis & forbidden jargon
grep -rnP '[\x{1F300}-\x{1F9FF}\x{2600}-\x{26FF}\x{2700}-\x{27BF}]' src/ || echo "0 Emoji Verified"
grep -rni "brutalist" src/ || echo "0 Forbidden Jargon Verified"

# 4. Dependency vulnerability & TypeScript production build check
npm audit --audit-level=high || true
npm run build
```

## 3. Mandatory 7-Viewport Multi-Device Vision Agent QA Protocol

Render the live app across **all 7 device viewports** using Playwright and call **`view_file` (Vision Agent)** on the captured screenshots to visually verify 0 layout bugs:

1. **Small Mobile Portrait (`360x800`):** Verify `min-w-0 flex-1` + `truncate` prevents horizontal overflow (`scrollWidth <= 360`).
2. **Standard iPhone Portrait (`390x844`):** Verify 1-line collapsible rows, `text-balance` headings, `>= 44px` tap targets, `100dvh`, and `safe-area-inset-bottom`.
3. **Large Mobile Portrait (`412x915`):** Verify `aspect-[3/4]` portrait cards scale cleanly.
4. **Mobile Landscape (`844x390`):** Verify sticky bottom WhatsApp bar does not block >20% of vertical screen height.
5. **Tablet Portrait (`768x1024`) & Landscape (`1024x768`):** Verify 2-column grid transitions and navbar spacing.
6. **Desktop (`1280x800` & `1440x900`):** Verify 12-column architectural grid alignment and `max-w-7xl` centering.

## 4. Mandatory `AGENTS.md`, `SECURITY.md` & `BUG-AND-FIX.md` Documentation inside `readme-ai-agent/`

Always write the complete security assessment and remediation guide into `<project-root>/readme-ai-agent/SECURITY.md`, and log every fixed vulnerability or UI bug inside `<project-root>/readme-ai-agent/BUG-AND-FIX.md`.

## Anti-AI-Slop Footer & Zero Meta-Leak Gate (Mandatory Pre-Ship Check)
- **NEVER** output framework names (*"Dibuat dengan Next.js & Tailwind CSS"*) or prompt theme descriptions (*"Tema Krem Hangat & Tipografi Book Serif"*) in any footer, badge, or UI text.
- Run `grep -riE "Dibuat dengan|Built with|Tailwind CSS|App Router|Tema |Tipografi " src/` before completing any build—if any match appears in UI components, remove it immediately and replace the footer with a proper **Editorial Colophon**, **Architectural Grid**, or **Swiss `justify-between` Bar**.


---

## `obra/superpowers` 4-Phase Systematic Debugging & `diagnosing-bugs` Protocol (THE IRON LAW)

> **THE IRON LAW OF DEBUGGING:** `NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.`
> Symptom fixes and random "guess-and-check" edits are strictly forbidden!

You MUST execute these **4 Sequential Phases** whenever encountering any bug, test failure, build error, hydration mismatch, or layout break:

| Phase | Name | Mandatory Actions |
|---|---|---|
| **Phase 1** | **Root Cause Investigation** | 1. **Read full error & stack trace** (exact file, line number, error code).<br>2. **Reproduce deterministically**.<br>3. **Check `git diff` / recent commits**.<br>4. **Boundary Instrumentation:** In multi-layer flows (`UI -> Server Action -> DB/API`), log inputs/outputs at each boundary to pinpoint the exact failing layer.<br>5. **Backward Call-Stack Tracing (`root-cause-tracing`):** Trace the bad value backward up the call chain to its origin—fix at the source, never slap a fallback wrapper around the symptom! |
| **Phase 2** | **Pattern Analysis** | Locate a working component/route in the same codebase and list every structural difference between the working code and the broken code. |
| **Phase 3** | **Single Hypothesis & Minimal Test** | Write down 1 explicit hypothesis: *"Root cause is X because Y."* Change **only 1 variable at a time** to verify. Never stack 4 random edits together! |
| **Phase 4** | **TDD Fix, Defense-in-Depth & The "3-Strike Architecture Stop"** | 1. Write a failing reproduction test/check first.<br>2. Apply the single root-cause fix + **Defense-in-Depth** validation.<br>3. **THE 3-STRIKE ARCHITECTURE RULE:** If you have tried **3 fixes** and the bug still persists (or each fix spawns a new bug elsewhere), **STOP IMMEDIATELY!** Do NOT attempt Fix #4 blindly. Report to the user that the pattern has a fundamental architectural flaw and propose a clean structural redesign. |

---

## 5. `Nutlope/hallmark` 58-Gate `sloplint` Automated Static & Browser Audit

During every `/web-debugging` or pre-ship QA pass, run these automated `sloplint` checks across the codebase and rendered DOM (`320px`, `375px`, `414px`, `768px`, `1280x800`, `1440x900`) and log results in `readme-ai-agent/DESIGN-CRITIQUE.md`:
1. **Static `sloplint` Code Checks:**
   - **Gate 34:** Verify `overflow-x: clip` on `html, body` (no `overflow-x: hidden`).
   - **Gate 38a & 54:** Scan headings (`h1–h6`) for forbidden `font-style: italic` or inner `<em>`/`<i>` tags, and verify zero 2-column `tag-left, heading-right` section eyebrow wrappers.
   - **Gate 46 & 47:** Scan for fabricated metrics (`+47%`, `10x faster`, `50,000+`) and fake re-drawn browser/phone/IDE chrome (traffic-light dots).
   - **Gate 50 & 51:** Verify image-bearing grids use `minmax(0, 1fr)` and display headings use `overflow-wrap: anywhere; min-width: 0`.
2. **Browser Render `sloplint` Checks:**
   - Verify `document.documentElement.scrollWidth <= window.innerWidth` at `320px`, `375px`, `414px`, `768px`, and `1280px`.
   - Verify zero 2-line clickable text (`button, a[role="button"], nav a`) across all viewports.
   - Verify contrast (`|L_text - L_bg| >= 50%` OKLCH / WCAG 4.5:1), zero button-text-matches-button-fill bugs, and zero dark-section ink-on-ink bugs.


---

## 7. Automated DOM Meta-Jargon Leak Scanner (`No "Bento" / "Hallmark" in Live UI Text`)

During every `/web-debugging` and Vision QA pass:
1. Run an automated DOM text check across all visible elements (`nav`, `h1`, `h2`, `h3`, `h4`, `p`, `span`, `button`, `a`):
   ```javascript
   const leakedJargon = Array.from(document.querySelectorAll("nav a, h1, h2, h3, h4, .badge, button"))
     .map(el => el.innerText.trim())
     .filter(t => /\b(bento|hallmark|macrostructure|hero section|cta section|feature card|trust bar)\b/i.test(t));
   ```
2. If `leakedJargon.length > 0` (for example, `"BENTO SPESIFIKASI"` in the navbar or `"Bento Spesifikasi Teknis Pemesinan"` in an `<h2>`), flag it immediately as a **Critical Copy Leak Bug** in `BUG-AND-FIX.md` and replace it with authentic industry terminology (`"SPESIFIKASI MESIN"`, `"Spesifikasi Teknis Pemesinan"`).


---

## 8. Visible Chrome Window & Live AI Cursor HUD During Debugging (`chrome-browser-control`)

Whenever running live browser checks, UI/UX verification, or interactive testing on the user's machine:
1. **Always Open a Visible Chrome GUI Window (`launch-visible-chrome.sh`):** Do not hide browser checks in headless mode when a desktop display is available. Launch Chrome visibly on port `9223` and bring the tab to the front (`Page.bringToFront`).
2. **Always Enable the Live AI Visual Cursor & Activity HUD (`ai-cursor-hud.js` / `cdp_visual_agent.py`):**
   - Inject `skills/chrome-browser-control/scripts/ai-cursor-hud.js` via `Page.addScriptToEvaluateOnNewDocument` and `Runtime.evaluate`.
   - Use `cdp_visual_agent.py` or `window.__aiCursor.highlightElement(el, label)` / `window.__aiCursor.clickSelector(sel, label)` / `window.__aiCursor.status(text)` during every test step so the user can visually watch the AI cursor glide, highlight elements, click buttons, fill forms, and scroll in real time.

