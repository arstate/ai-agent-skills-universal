---
name: web-master-agent
description: Supreme Token-Efficient Web Master Agent Orchestrator and Phase-Gated Skill Router combining brainstorming, web-planning, web-design (OpenDesign + zanwei/design-dna), web-animation (Official GSAP Suite), web-builder, web-debugging (7-layer anti-hack audit + 7-viewport Vision QA), and web-optimization with opus-distills. Enforces the mandatory 12-file readme-ai-agent/ brain (centered on AGENTS.md, never CLAUDE.md) across both new and legacy web projects with 70-85% token savings.
---

# `web-master-agent` — Phase-Gated Web Orchestrator & 12-File `readme-ai-agent/AGENTS.md` Continuity Engine

Supreme Lead Web Architect and Token-Efficient Swarm Commander for **Google Antigravity CLI (`agy`)** and workspace agents. Connects all web skills (`brainstorming` -> `web-planning` -> `web-design` -> `web-animation` -> `web-builder` -> `web-optimization` -> `web-debugging`) into a single continuous pipeline backed by `<project-root>/readme-ai-agent/` and `<project-root>/AGENTS.md`.

---

## 0. Mandatory `readme-ai-agent/` & `AGENTS.md` Gate (New AND Legacy Projects!)

Before executing ANY phase on a web repository:
1. **Check `[ -d "readme-ai-agent" ] && [ -f "readme-ai-agent/AGENTS.md" ] && [ -f "AGENTS.md" ]`:**
   - **Case A — New Web Project:** Initialize `./AGENTS.md` and `./readme-ai-agent/` with all 12 standardized files before writing application code.
   - **Case B — Legacy / Existing Web Project Missing `readme-ai-agent/`:** **Perlu BUAT DULU!** Scan the existing project (`package.json`, `src/` or `app/`, routes, components, styling, `.env.example`, `git log -n 5`) and **automatically generate `./AGENTS.md` + all 12 files inside `./readme-ai-agent/`** so the old project immediately gains full state continuity!
   - **Case C — Legacy `CLAUDE.md` / `AGENT.md` Migration:** Never use `CLAUDE.md` or singular `AGENT.md` inside `readme-ai-agent/`. If found, rename/merge into **`readme-ai-agent/AGENTS.md`** and link it from root **`./AGENTS.md`** via `@[Project Brain](readme-ai-agent/AGENTS.md)`.

---

## 1. Phase-Gated Skill Loading (Save 70% Tokens — Load ONLY What the Current Turn Needs)

Never load all 7 web skills in a single turn unless executing a full one-shot build. Route strictly by phase:

| Current Phase | Trigger / Condition | Skills to Call via `lookup_skills` (Max 2–3) | Target Files Updated in `readme-ai-agent/` |
|---|---|---|---|
| **0. Ideation** | User wants layout/campaign/strategy ideas | `user:brainstorming` + `user:web-design` | `PRD.md` (Selected Angle), `AGENTS.md` |
| **1. Audit, Stack Selection & Scope** | New project, legacy project missing `readme-ai-agent/`, or underspecified request | `user:web-planning` + `user:web-design` | `./AGENTS.md`, `readme-ai-agent/AGENTS.md`, `PRD.md`, `TECHSTACK.md` (4-Stack Recommender), `STYLE-GUIDE.md`, `SEO-GEO.md`, `TASK.md` |
| **2. UI & DNA Build** | Building components, cloning reference UI, or styling | `user:web-builder` + `user:web-design` | `STYLE-GUIDE.md` (`DESIGN-DNA.json`), `GIT-RESTORE-POINTS.md`, `TASK.md`, `AGENTS.md` |
| **3. Motion & GSAP** | Adding ScrollTrigger, SplitText, Flip, or hero motion | `user:web-animation` + `user:web-builder` | Animated components + `STYLE-GUIDE.md` motion tokens + `AGENTS.md` |
| **4. QA, Hack Audit & Speed** | Pre-ship verification, bug fixing, or quota shielding | `user:web-debugging` + `user:web-optimization` | `SECURITY.md`, `BUG-AND-FIX.md`, `DESIGN-CRITIQUE.md`, `TECHSTACK.md`, `AGENTS.md` |

---

## 2. Token-Efficient Continuity Protocol (`readme-ai-agent/AGENTS.md` State Relay)

To keep multi-turn token usage ultra-low in **Antigravity CLI (`agy`)** while maintaining 100% Opus 5.5 precision:
1. **Start Every Turn with a `< 150-Token` State Read:** Antigravity CLI automatically reads root `./AGENTS.md` (which inlines `@[Project Brain](readme-ai-agent/AGENTS.md)`). Do NOT re-read all 12 `.md` files on every turn—only read `readme-ai-agent/AGENTS.md` plus the 1–2 specific `.md` files relevant to the current phase!
2. **Chain-of-Draft (CoD) Internal Planning:** Keep internal reasoning steps `<= 8 words` (`[Phase] -> [Target File] -> [Constraint] -> [Patch]`).
3. **Anti-Plenger Smart Read Gate:** Read target code files (`.tsx`, `.ts`, `.css` `< 400 lines`) in full before editing; pipe bash build/test outputs through `tail -n 25` or `grep` so raw logs never bloat context.
4. **End Every Turn by Updating `readme-ai-agent/AGENTS.md`:** Write the exact 5-line state checkpoint (`Active Phase`, `Completed Tasks`, `Locked Design Tokens`, `Latest Git Restore Tag`, `Next Action`) so the project survives `/clear` or session restarts with 0% context loss.

---

## 3. Mandatory 12-File Project Brain (`readme-ai-agent/` + Root `./AGENTS.md`)

> **Strict Naming Rule:** Never create `CLAUDE.md` or singular `AGENT.md` inside `readme-ai-agent/`. File #1 is strictly **`readme-ai-agent/AGENTS.md`** paired with root **`./AGENTS.md`**.

1. `readme-ai-agent/AGENTS.md` (and root `./AGENTS.md` containing `@[Project Brain](readme-ai-agent/AGENTS.md)`) — `< 150-token` live state checkpoint, Antigravity CLI always-on entry point, & pre-flight handover lock.
2. `readme-ai-agent/README.md` (and root `./README.md`) — Project setup, architecture summary, & master index of the 12-file brain.
3. `readme-ai-agent/PRD.md` — `[stated]` Goals, KPI, Audience, VOC, Scope, `GLOSSARY` domain vocabulary, & Verified Client Data (`TODO_ASK_USER` if missing).
4. `readme-ai-agent/TECHSTACK.md` — Chosen Stack Option (1/2/3/4), `ADR` architectural decisions, Vercel 70-rule React contract, Cloudflare Edge cache, & Free-Tier Firebase/Cloudinary locks.
5. `readme-ai-agent/STYLE-GUIDE.md` — OpenDesign 8 Orthogonal Dimensions, 300-Ref Vault ID (`#001–#300`), `zanwei/design-dna` tokens (`#6366f1` banned, max 2–3 accents/viewport, `brief-preview.html`), & Studio Footer archetype.
6. `readme-ai-agent/SEO-GEO.md` — JSON-LD Schema.org, `llms.txt`, dynamic `sitemap.ts`, `robots.ts`, & keyword map.
7. `readme-ai-agent/SECURITY.md` — 7-Layer Anti-Hack Policy & Audit Report (`server-only`, Zod, CSP, `firestore.rules`, `CONSTRAINTS`).
8. `readme-ai-agent/SKILLS.md` — Active Antigravity CLI Skills (`skills/` / `.agents/skills/`) & MCP registry for the project.
9. `readme-ai-agent/TASK.md` — Granular `[ ] / [/] / [x]` parallel swarm checklist.
10. `readme-ai-agent/BUG-AND-FIX.md` — Unified 4-Phase Systematic Debugging root-cause & fix ledger.
11. `readme-ai-agent/GIT-RESTORE-POINTS.md` — Local Git commit hashes & rollback tags before/after every milestone.
12. `readme-ai-agent/DESIGN-CRITIQUE.md` — 14-Pass Vision QA scorecard across 7 viewports (`360x800` to `1440x900`) + `ΔE` color check.


---

## 6. Pre-Build Planning Gate & Zero Design-Jargon Copy Enforcement

1. **Never Build Without Approved Plan (`web-planning` Gate First):**
   - If the user asks to create a website and `USER_FLOW_AND_PAGE_ARCHITECTURE.md` + tech stack confirmation have not been approved by the user in the conversation yet, pause coding, run `web-planning` first, present the architecture & stack options, and ask the user for confirmation.
2. **Zero Meta-Design Jargon in DOM Copy (`No "Bento" in Headings/Nav`):**
   - When implementing a Bento Grid, Editorial Ledger, or Hallmark material theme, apply the concept strictly through **CSS Grid layout, spacing, borders, and surface tokens**—never write the word `"Bento"`, `"Hallmark"`, `"Nordic"`, or `"Blueprint"` inside navbar links (`BENTO SPESIFIKASI` -> forbidden) or section headings (`Bento Spesifikasi Teknis` -> forbidden). Use 100% real-world domain copy (`SPESIFIKASI MESIN`, `Spesifikasi Teknis & Kapasitas Pemesinan`).

