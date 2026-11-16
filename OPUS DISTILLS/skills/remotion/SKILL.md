---
name: remotion
description: "Programmatic video editor (/remotion, @remotion): 9:16 & 16:9 motion, Talking-Head facecammaxxing, GSAP/Three.js, Whisper captions, and /tts-gen sync."
---

# `/remotion` — Programmatic Video Editor & Hybrid Motion Director

Unified programmatic video engineering skill built on local **`@remotion/cli` + `ffmpeg`**, the **`aaksa/facecammaxxing`** 6-layer talking-head architecture, **`yihui-dev/awesome-opus5-5-videos`** visual shaders/SVG/Canvas primitives, and **`/tts-gen`** broadcast audio mastering.

> **Mandatory References (Read on Demand):**
> - `references/director-workflow-and-brief.md` — 7-step `fcm.py` director pipeline, `brief.md` & `plan.json` schema, 7-point self-review, Never-Ship rules, & optional headless Blender `.glb` pipeline.
> - `references/motion-rules-and-safe-zones.md` — 30fps craft timing (4–8 frame entry, 1-spring cap), IG/TikTok 9:16 safe zones (`1080x1920`), `faceGuard`, deterministic clock `c.t` / `useCurrentFrame()`, & EBU R128 audio mix separation.
> - `references/effects-and-chat-render-catalog.md` — All 22 talking-head effects, `ChatRender` opener, keyword `Outro`, and Mode B faceless SaaS/brand motion templates.

---

## 1. Dual-Mode Router (Choose Mode First)

| Mode | Best When | Runtime & Engine Stack | Audio & Assets |
|---|---|---|---|
| **Mode A — Talking-Head Director (`facecammaxxing`)** | User supplies talking-head raw footage (`.mp4`/`.mov`) for Reels/TikTok/Shorts with behind-person text, 3D props, graphs, & word-synced beats. | Runtime cloned once to `~/.agents/tools/facecammaxxing` (via `scripts/bootstrap_facecammaxxing.sh`): Remotion + GSAP `useTimeline` + Three.js (`PixelCanvas`, `useGLB`) + RVM/MediaPipe + YuNet + Whisper. | Speaker audio from footage; words aligned in `words.json`; final mix normalized `-14` to `-16 LUFS`. |
| **Mode B — Faceless / Brand Motion (Pure Remotion + `/tts-gen`)** | User has no talking-head footage (SaaS launch, product promo, ad creatives, data/code visualizers from `awesome-opus5-5-videos`). | Local project with `remotion` (`@remotion/cli` / `npx remotion render` / `npx remotion still`) + React `useCurrentFrame()`, `spring()`, `interpolate()` (zero CSS `@keyframes`). | Voiceover generated via `/tts-gen` (`-16 LUFS`, `TP -1.5 dBTP`, `48 kHz`) + BGM ducked `-12 dB` to `-18 dB`. |

---

## 2. Mode A Architecture: 6-Layer Stage & 7-Step Pipeline

### A. The 6-Layer Depth Stack
Render every talking-head frame through this exact depth order so graphics weave behind and in front of the speaker cleanly:
```text
1. room     -> Background plate / clean environment (derived from footage)
2. behind   -> Text-behind-person, kallaway-split cards, backdrop words, glass graphs
3. sticker  -> World-anchored floating badges / 2D overlays behind foreground framing
4. person   -> Alpha-matted speaker (`person.webm` via RobustVideoMatting / MediaPipe) + `track.json` (YuNet)
5. front    -> Foreground props (`prop-3d`), over-the-shoulder panels, kinetic captions, spotlight/grade
6. screen   -> Edge-to-edge full-screen overlays, `ChatRender` prompt openers, `Outro` CTAs, fades
```

### B. Deterministic Clock Law (`c.t` & `useCurrentFrame()`)
- **Zero wall-clock timers:** Never use `Date.now()`, `requestAnimationFrame()`, `useFrame` delta clocks, CSS transitions, or CSS `@keyframes`.
- **Single Source of Truth:** Drive every GSAP timeline (`useTimeline`), Three.js canvas (`PixelCanvas`), shader uniform, and SVG stroke strictly from Remotion `useCurrentFrame() / fps` (`c.t`).
- **Zero Unseeded Randomness:** Use deterministic `random(seed)` from `remotion` so parallel headless Chromium frame renders stay 100% flicker-free.

### C. Mode A Execution Flow (`fcm.py`)
1. `setup`: Bootstrap runtime (`bash scripts/bootstrap_facecammaxxing.sh`) if `~/.agents/tools/facecammaxxing` is missing.
2. **Write `brief.md`:** Subject, core claims, visual aesthetic, palette tokens, audio mood, and 12–14 concrete beat moments (never invent unverified stats).
3. `track`: Extract alpha speaker cutout (`person.webm`), face/head tracking (`track.json`), and clean plate (`room.mp4`).
4. `words`: Run Whisper word-level timestamps into `words.json`.
5. **Draft `plan.json` (Hardest Beat First, On-Word):** Author the beat sequence locked to exact spoken timestamps (`t` matching key words in `words.json`), respecting `faceGuard` and 9:16 safe zones.
6. `check` + **Mandatory Vision QA (`read_file`):** Render `sheet.jpg` contact sheet (or `npx remotion still` frames in Mode B) and inspect with `read_file` against the 7-point self-review checklist before full MP4 export.
7. `render`: Preview `--draft` first -> fix any layout/timing flaws -> export final 1080x1920 (or 1920x1080) H.264 MP4.

---

## 3. Mode B Architecture: Faceless & Brand Promo Execution

1. **Scaffold or Attach:** If working inside an existing Remotion project, audit `remotion.config.*` and compositions first (`read_file`); otherwise scaffold minimal TS + Remotion 4 (`npx create-video@latest` or `@remotion/cli`). Check `remotion skills` if official template updates are needed.
2. **Audio-First Timing:** Generate voiceover stems via `/tts-gen` (`-16 LUFS`, `TP -1.5 dBTP`, `48000 Hz`) into `public/audio/`. Derive composition `durationInFrames` directly from real audio duration + `0.4s` breathing tail.
3. **Motion & Restraint:** Use `spring()` / `interpolate(..., { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })`, high-contrast editorial typography (`<= 2` font families), and **1 clear visual focal element per beat**—ban fake terminal chrome, corner brackets, and made-up telemetry counters.
4. **Render Verification:** Always render 4–6 representative keyframes (`npx remotion still <CompId> out/frame-X.png --frame=N`) and inspect them via `read_file` before running `npx remotion render`.

---

## 4. Non-Negotiable Quality & Guardrail Gates

- **Audio Loudness Contract:** Keep `/tts-gen` isolated voiceover stems at **`-16 LUFS / TP -1.5 dBTP` (`48 kHz`)**; master full Mode A/B final program mixes at **`-14` to `-16 LUFS`** with `TP <= -1.0 dBTP` and music ducking `-12 dB` to `-18 dB` under speech.
- **No Unrequested AI-Slop Chromes:** Zero fake viewfinder corner brackets, zero fake recording indicators (`REC 00:04:12`), and zero fabricated counters unless explicitly requested.
- **Blender Module is Strictly Optional:** Only generate `.glb` props via Blender `bpy` if `blender` exists in `PATH`; otherwise use built-in procedural `prop-3d` meshes (`trophy`, `clock`, `coin`, `phone`, `check`, `x`) or Three.js primitives.
- **Language & Terminology:** Never use banned design jargon; follow strict project copy and user language.
