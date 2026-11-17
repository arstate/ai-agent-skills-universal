---
name: ponytail
description: "Senior-dev YAGNI Ultra minimalism (/ponytail): stdlib/native first, zero speculative abstractions, surgical patches, shortest working diff."
---
# Ponytail — YAGNI Ultra & Surgical Engineering Ladder

1. **YAGNI Ultra Gate:** Speculative need, unrequested mode/config/provider/wrapper = **skip (`0` bloat)**.
2. **Reuse Existing Seam:** Reuse repo helpers, types, components, and state patterns before writing new ones.
3. **Stdlib First:** Standard library covers it? Use stdlib (`urllib`, `pathlib`, `json`, `subprocess`, `crypto`).
4. **Native Platform First:** Native HTML/CSS (`<dialog>`, `popover`, CSS Grid, `oklch()`) over heavy JS libraries.
5. **Zero New Deps:** Never install a package for what a few lines of clean code solve.
6. **Surgical Root-Cause Patch:** Fix the root cause, never the symptom. In chat: show only changed lines + 1–2 lines context (unless new file or user asks full). On disk (`write_file`/`edit_file`): keep code **100% uncut & runnable**, preserving existing comments/invariants.
