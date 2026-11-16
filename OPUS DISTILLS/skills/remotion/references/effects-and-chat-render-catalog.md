# 22 Facecammaxxing Effects, Viral Wrappers & Mode B Templates (`effects-and-chat-render-catalog.md`)

Complete reference catalog of the 22 talking-head effects (`aaksa/facecammaxxing`), `ChatRender` & `Outro` wrappers, and Mode B faceless/brand templates.

---

## 1. The 22 Mode A Effects (Mapped to 6-Layer Slots)

### Group 1 — Proof, Splits & Numbers (`behind` / `front`)
| Effect | Layer | What It Does & Ideal Beat |
|---|---|---|
| `over-the-shoulder` | `front` | Compact proof card / screenshot / metric pinned in safe space beside the speaker's shoulder (`faceGuard` aware). |
| `kallaway-split` | `behind` / `front` | Bold editorial split-screen frame contrasting two scenarios or B-roll above/beside the speaker cutout. |
| `glass-graph` | `front` / `behind` | Animated translucent trend line or bar chart rendered with crisp tabular numerals & single accent curve. |
| `glass-widgets` | `front` | Modular KPI/notification/badge cards snapping in on anchor words inside the `x <= 910 px` safe window. |
| `tier-list` | `behind` / `front` | Ranked horizontal tiers (`S / A / B` or comparison rows) populating sequentially on spoken items. |

### Group 2 — Typography & Captions (`behind` / `front`)
| Effect | Layer | What It Does & Ideal Beat |
|---|---|---|
| `text-behind` | `behind` | Giant uppercase display word (`scale` / `weight` contrast) masked cleanly behind `person.webm` shoulders/head. |
| `backdrop-word` | `behind` | Atmospheric low-contrast watermark word spanning across `room.mp4` behind the speaker for topic shifts. |
| `kinetic-caption` | `front` | On-word highlighted 2–4 word captions locked to `words.json` at `y = 1180 .. 1440 px` (zero overlap with bottom IG UI). |

### Group 3 — Camera, Lighting & Color Grade (`room` / `person` / `screen`)
| Effect | Layer | What It Does & Ideal Beat |
|---|---|---|
| `lean-in` | Camera | Tight punch-in (`1.0x -> 1.12x` / `1.18x`) for 4-frame emphasis on hard claims or punchlines (aka `punch-in`). |
| `slow-push` | Camera | Continuous subtle `1.00x -> 1.05x` creep over a multi-second explanation so static frames stay alive. |
| `spotlight` | `behind` / `person` | Radial contrast falloff isolating speaker & focal props against dimmed room background. |
| `color-grade` | Stage | Cinematic LUT/contrast tone shift across `room` + `person` for distinct visual chapters. |
| `grade` | `screen` | Subtle unified tonal pass & micro-grain unifying composite layers into one camera look. |
| `locked-on` | Camera | Head-stabilized tracking transform anchored to YuNet coordinates in `track.json`. |

### Group 4 — 3D Props & Spatial Depth (`front` / `behind`)
| Effect | Layer | What It Does & Ideal Beat |
|---|---|---|
| `prop-3d` | `front` / `behind` | Three.js `PixelCanvas` + `useGLB` / `useFitted` rendering built-in props (`trophy`, `clock`, `coin`, `phone`, `check`, `x`) or custom Blender `.glb` meshes. |
| `carousel-spin` | `behind` / `front` | 3D orbital carousel rotating multiple proof cards/screenshots past the speaker on-word. |
| `orbit` | `behind` / `front` | Smooth orbital ring/path motion circling small visual badges or props around the vertical Z axis. |

### Group 5 — People, Openers & Framing (`person` / `screen` / `front`)
| Effect | Layer | What It Does & Ideal Beat |
|---|---|---|
| `freeze-frame` | `person` | Snappy 1-spring freeze cutout highlight (the **single permitted spring** in Mode A) to punctuate a comedic/dramatic beat. |
| `name-tag` | `front` | Editorial lower-third / role pill identifying guest or speaker once at introduction (`x = 72..780 px`). |
| `silhouette-intro` | `person` / `behind` | High-contrast dark silhouette reveal resolving into lit `person.webm` over dramatic headline opener. |
| `window-cards` | `behind` / `front` | Clean editorial window cards (NO fake browser traffic-light dots unless explicitly showing a live app capture). |
| `bottom-fade` | `screen` | Soft gradient scrim grounding captions near the lower safe zone (`rgba(0,0,0,0.65)` to transparent). |

---

## 2. Viral Opener & Outro Wrappers (`screen`)

1. **`ChatRender` (~2.4s Opener):**
   - Animated typed AI prompt card (`60–75` frame hook) revealing the exact core question before dropping straight into the speaker + room cut on frame ~72.
   - Keep text `<= 10` words for instant 1-glance comprehension on mobile.
2. **Keyword-Comment `Outro` (~4.4s CTA):**
   - Clean high-contrast closing card framing a single action keyword (`Comment "TEMPLATE"` / `Klik link bio` / `WA: ...`) synced to closing sentence without cramming 4 social icons.

---

## 3. Mode B: Faceless SaaS / Brand Motion Templates (Pure Remotion + `/tts-gen`)

Use these beat patterns when no talking-head footage exists (`@remotion/cli` + `/tts-gen` audio):

| Beat Time | Visual Recipe (Mode B) | Code Primitive (`awesome-opus5-5-videos` / Remotion) |
|---|---|---|
| **0.0s – 2.5s (Hook)** | Giant upright display claim (`2–4` words) + SVG path accent or `ChatRender` prompt bubble; VO Hook (`-16 LUFS`). | `spring({ frame, fps, config: { damping: 16 } })` + crisp `clipPath` reveal. |
| **2.5s – 9.0s (Proof / UI Demo)** | Interactive app screen zoom + highlight pill callouts + Tufte comparison bar chart (`tabular-nums`). | `interpolate(frame, [a, b], [x1, x2])` pan/zoom + SVG stroke draw (`strokeDashoffset`). |
| **9.0s – 15.0s (Stack / Transformation)** | 3 staggered feature cards (`<= 6` words each) or live before/after slider split with Three.js / Canvas particle accents. | Sequence offsets (`<Sequence from={...}>`) locked to `words` / TTS stem cues. |
| **15.0s – 18.0s (Single CTA)** | Clean single-row CTA bar (1 offer + 1 action button/keyword) inside 9:16 safe zone (`y = 700 .. 1350 px`). | Clean hold for `30` frames + `fade` audio tail. |
