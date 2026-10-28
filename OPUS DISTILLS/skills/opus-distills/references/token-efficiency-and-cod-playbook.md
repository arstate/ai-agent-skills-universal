# Token-Efficiency, Prompt Caching & Chain-of-Draft (CoD) Playbook (`opus-distills`)

Distilled from **Anthropic Official Prompt Caching & Skill Best Practices**, **Chain-of-Draft (arXiv:2502.18600)**, and **JetBrains / SWE-Agent Observation Masking (arXiv:2508.21433)**.

---

## 1. Forensic Audit of Why Agents Burn Tokens (And What Actually Fixes It)

| Bottleneck | Naive Fix (What Destroys Quality) | Opus 5.5 Distilled Fix (70–85% Savings, 100% Quality) |
|---|---|---|
| **1. System & Skill Prompt Bloat** | Deleting critical design/security rules or running lossy LLMLingua compression on rules (causes agent to forget `#6366f1` bans, `useGSAP` cleanup, or SSR guards). | **3-Tier Progressive Disclosure:**<br>• **Tier 1 (Frontmatter):** `~40 tokens` per skill.<br>• **Tier 2 (`SKILL.md`):** Dense Markdown tables (`~800–1,200 tokens`) containing 100% of hard constraints.<br>• **Tier 3 (`references/`):** Heavy code templates & case studies loaded *only* when executing that exact sub-task. |
| **2. Prompt Cache Invalidations** | Putting dynamic timestamps/state at the top of the system prompt OR dynamically mutating the top-level `tools` JSON array on every turn. | **Strict Prefix Order (`tools -> system -> messages`):**<br>Keep `tools` and `system` 100% static so Anthropic/OpenAI/Gemini Prompt Caching hits a **90% input token discount** on every turn. Load skills as tool responses (`lookup_skills` / `get_skill_resources`) or append dynamic state at the tail of `messages`. |
| **3. Verbose Chain-of-Thought (CoT)** | Writing 600-word essay monologues before every tool call (*"First I should consider how the user might want the button..."*). | **Chain-of-Draft (CoD) (`arXiv:2502.18600`):**<br>Enforce `<= 8 words` per reasoning step:<br>`[State: Hero lacks focal point] -> [Cause: 5 accent buttons] -> [Rule: Max 2 accents/vp] -> [Fix: Demote 4 to ghost]`.<br>Matches 100% Opus 5.5 reasoning accuracy with **76% fewer output tokens**. |
| **4. Observation & Terminal Bloat** | Running `cat` on 1,000-line files or dumping raw `npm run build` / DOM HTML into the chat history (re-sent on every subsequent turn!). | **Source-Level Observation Masking (`arXiv:2508.21433`):**<br>• Read files with `StartLine`/`EndLine` (`<= 120 lines`).<br>• Filter bash outputs: `npm run build 2>&1 \| tail -n 25`, `grep -n "pattern" file`.<br>• Never print raw base64 or minified bundles to stdout. |
| **5. Multi-Turn Chat History Snowball** | Sending 25 turns of back-and-forth debugging history on every new prompt. | **On-Disk State Checkpointing (`readme-ai-agent/AGENTS.md`):**<br>Keep `readme-ai-agent/AGENTS.md` updated as a `< 150-token` state snapshot (`Current Phase`, `Locked Tokens`, `Last Git Tag`, `Next Step`). After `/clear` or compaction, reading `readme-ai-agent/AGENTS.md` + `TASK.md` restores 100% context in `< 300 tokens`! |

---

## 2. Chain-of-Draft (CoD) vs Verbose CoT — Concrete Comparison

### ❌ BAD (Verbose CoT — 145 Tokens, Slow, Zero Extra Accuracy)
> *"Okay, the user wants me to fix the laggy animation on their React landing page and make the hero look better. Let me think about why React animations lag. Usually, when people use GSAP in React, they might be using `useEffect` without cleaning up, or maybe they are animating `width` and `height` or `top` and `left` which triggers browser layout recalculations on every frame. Also for the mouse follower, they might be calling `gsap.to` inside `onMouseMove`. Let me check the component and replace those with `useGSAP`, `x`/`y` transforms, and `gsap.quickTo`..."*

### ✅ GOOD (Opus 5.5 Chain-of-Draft — 28 Tokens, 81% Saved, 100% Precision)
```text
[CoD]
1. Lag cause: `top/left` layout thrash + raw `gsap.to` in `mousemove`.
2. Fix: `useGSAP(scope)` + `x/y/autoAlpha` + `gsap.quickTo()`.
3. Hero fix: Apply OpenDesign 8-Dim (cap `--accent` to 2/vp, H1 `4.2x` scale).
```

---

## 3. Seamless Inter-Skill Continuity Map (How All 11 Skills Connect Without Redundancy)

Every skill reads and writes to a specific slice of `readme-ai-agent/` so no two skills repeat work or re-ask the same questions:

```text
[User Prompt]
     │
     ▼
┌──────────────────────────────────────────────────────────┐
│  /opus-distills  OR  /web-master-agent (Triage Router)│
│  Reads: AGENTS.md + readme-ai-agent/AGENTS.md (<150 tok)  │
└────┬───────────────┬────────────────┬───────────────┬────┘
     │ (Phase 0)     │ (Phase 1)      │ (Phase 2)     │ (Phase 3)
     ▼               ▼                ▼               ▼
┌──────────┐   ┌────────────┐   ┌───────────┐   ┌──────────────┐
│brainstorm│   │web-planning│   │web-design │   │web-debugging │
│3-5 Angles│──▶│PRD.md      │──▶│STYLE-GUIDE│──▶│SECURITY.md   │
│Psych+Case│   │SEO-GEO.md  │   │8-Dim + DNA│   │DESIGN-CRITIQ │
└──────────┘   │TASK.md     │   └─────┬─────┘   │BUG-AND-FIX.md│
               └────────────┘         │         └──────┬───────┘
                                      ▼                │
                                ┌───────────┐          │
                                │web-animat.│          ▼
                                │GSAP/Scroll│   ┌──────────────┐
                                │web-builder│──▶│web-optimizat.│
                                │RestoreTag │   │TECHSTACK.md  │
                                └───────────┘   └──────────────┘
```


---

## 4. `mksglu/context-mode` Deep Integration Playbook (98% Tool Output Reduction + MCP Setup)

Distilled from **`mksglu/context-mode`** (31.9k+ GitHub stars, Hacker News #1 — Context window optimization for AI coding agents across Claude Code, Cursor, Gemini CLI / Antigravity, Codex, and VS Code Copilot).

### A. Paradigm 1: "Think in Code, Not in Context" (1 Script Replaces 47 File Reads)
When you need to audit a codebase (e.g., find all components missing `export const dynamic = 'force-static'`, check image sizes, extract hex colors, or check heading hierarchy), **DO NOT read 30 files into the LLM context window (`700 KB`)**.
Write and run a 5-line script in the sandbox (`execute_bash` or `ctx_execute`) that computes the answer and prints **only the compact summary (`< 3 KB`)**:

```bash
# ❌ BAD: Calling view_file 25 times on every page.tsx (burns 60,000+ tokens)
# ✅ GOOD (Think in Code — 1 call, < 500 tokens returned!):
python3 -c '
import glob, re
for p in sorted(glob.glob("src/app/**/page.tsx", recursive=True)):
    txt = open(p).read()
    has_static = "force-static" in txt
    h1_count = len(re.findall(r"<h1[\s>]", txt))
    print(f"{p}: force-static={has_static}, h1_count={h1_count}")
'
```

### B. Paradigm 2: Why `context-mode` Retired Aggressive Prose Brevity (PR #482 — The Split-Channel Law)
In `mksglu/context-mode` commit `#482` (*"retire prose-style enforcement entirely"*), benchmarks (including Moonshot AI's `kimi-k2.5` evaluations) proved that telling an LLM *"always be ultra-brief in everything you generate"* causes the model to **write lazier code, skip edge-case guards, and output stubbed/truncated components**.
- **Our Solution (`Split-Channel terse-respon`):**
  1. **Keep Raw Tool Data Out of Context (`-98%`):** Filter all terminal/file observations before they hit context.
  2. **Keep Reasoning Symbolic (`Chain-of-Draft` `-76%`):** `<= 8 words` per reasoning step.
  3. **Keep Chat Replies Ultra-Terse (`terse-respon` `-75%`):** Direct Indonesian chat (`gw/lu/Bro`), bulleted summary, 1-line follow-up.
  4. **Keep Code & Design Deliverables 100% UNCUT (`0% Reduction on Artifacts`):** Every file written via `write_to_file` must be 100% complete, rich, and production-ready!

### C. One-Command Installation of `mksglu/context-mode` MCP Server & Hooks on Your Local Agent
Pair `opus-distills` with the native `mksglu/context-mode` MCP plugin on your local machine for automatic `PreToolUse` / `PostToolUse` SQLite FTS5 BM25 indexing:

1. **Claude Code (Automatic Plugin + Hooks + 11 Sandbox Tools):**
   ```bash
   /plugin marketplace add mksglu/context-mode
   /plugin install context-mode@context-mode
   # Verify installation:
   /context-mode:ctx-doctor
   ```
2. **Cursor IDE:**
   ```bash
   git clone https://github.com/mksglu/context-mode.git
   ln -s "$PWD/context-mode" ~/.cursor/plugins/local/context-mode
   ```
3. **Gemini CLI / Google Antigravity (`~/.gemini/settings.json`):**
   ```bash
   npm install -g context-mode
   ```
   Add to `~/.gemini/settings.json`:
   ```json
   {
     "mcpServers": {
       "context-mode": { "command": "context-mode" }
     },
     "hooks": {
       "BeforeTool": [
         {
           "matcher": "run_shell_command|read_file|read_many_files|grep_search|search_file_content|web_fetch|activate_skill",
           "hooks": [{ "type": "command", "command": "context-mode hook gemini-cli beforetool" }]
         }
       ],
       "AfterTool": [
         { "matcher": "", "hooks": [{ "type": "command", "command": "context-mode hook gemini-cli aftertool" }] }
       ],
       "PreCompress": [
         { "matcher": "", "hooks": [{ "type": "command", "command": "context-mode hook gemini-cli precompress" }] }
       ],
       "SessionStart": [
         { "matcher": "", "hooks": [{ "type": "command", "command": "context-mode hook gemini-cli sessionstart" }] }
       ]
     }
   }
   ```


---

## 5. CRITICAL GUARDRAIL: Why Aggressive `context-mode` Hooks Make Agents "Dumb / Blind" (And How We Prevent It)

From real-world engineering post-mortems (Hacker News #47193064 & Adobe/JetBrains benchmarks):
1. **The Blind Extraction Trap:** Installing aggressive `PreToolUse` hooks that block `Read` / `view_file` forces the agent to write an extraction script *before* it knows the file structure. If the script misses a helper function, prop type, or Tailwind class, the agent **hallucinates duplicate code or breaks the component**.
2. **BM25 Failure on Code/JSX/JSON:** FTS5 keyword search fails on structural JSX/CSS hierarchies.
3. **Our Mandatory Anti-Plenger Rule:**
   - **DO NOT install aggressive `PreToolUse` hooks that block native `Read` / `view_file`!**
   - **100% Full Read on Active Code Files:** Whenever editing a `.tsx`, `.ts`, `.css`, or config file (`< 400 lines`), read the file directly so you have 100% structural awareness.
   - **Filter ONLY Noisy Logs & Bulk Scans:** Use script/pipe filtering (`tail -n 25`, `grep`, or summary scripts) strictly for build outputs, test logs, or counting across 50+ files.
