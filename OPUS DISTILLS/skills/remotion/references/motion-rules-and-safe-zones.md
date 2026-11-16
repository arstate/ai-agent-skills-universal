# 30fps Motion Rules, Safe Zones & Broadcast Audio (`motion-rules-and-safe-zones.md`)

Deterministic motion physics, platform safe zones, and broadcast audio specs across Mode A (Talking-Head) and Mode B (Faceless/Brand Motion).

---

## 1. Mode Comparison: Motion Restraint vs Brand Expressiveness

| Rule | Mode A (`facecammaxxing` Talking-Head) | Mode B (Faceless / Brand Promo Motion) |
|---|---|---|
| **Role of Motion** | Support the speaker without stealing focus from eyes/lips. | Visual choreography *is* the speaker; must carry visual momentum alone. |
| **Entry Speed (`30fps`)** | Snap in **4–8 frames** (`133–267ms`) using `expo.out` / `power3.out` from subtle oversize (`scale ~1.45, -6deg`). | Fast hook entry **6–12 frames** (`200–400ms`) with crisp overshoot (`back.out(1.6)`) or Remotion `spring({ damping: 14, stiffness: 180 })`. |
| **Exit Style** | Accelerated exit (`power2.in`, 3–5 frames); avoid lazy slow fades. | Clean slide/wipe/scale exits matched to scene rhythm (`0.2s–0.3s`). |
| **Spring Physics Cap** | **Maximum 1 visible spring per video** (typically reserved for `freeze-frame` pop or `name-tag`) so the video stays editorial, not bouncy toy slop. | Intentional Remotion `spring()` per card/headline transition with `damping >= 14` (no jelly bounce). |
| **Static Hold Limit** | Max 3 static beats; maintain subtle micro-camera drift (`slow-push` / parallax) between beats. | Never hold static > 2.5s without kinetic caption swap, chart update, or subtle parallax. |
| **Focal Restraint** | Maximum **1 bright hero element per frame** alongside the speaker. | 1 dominant focal block per scene + clean `35–40%` negative space. |

---

## 2. Deterministic Remotion & GSAP Integration Rules

1. **Zero Native CSS Motion:** Never use CSS `@keyframes` or CSS `transition` inside Remotion compositions (`npx remotion render` captures isolated headless frames out of real-time order and CSS timers desync).
2. **Clock-Locked GSAP (`useTimeline`):**
   - Build timeline `gsap.timeline({ paused: true })` once inside `useMemo` / ref.
   - Seek exact composition time on every render: `tl.seek(frame / fps, false)`.
3. **Clamped `interpolate()` in Mode B:**
   ```ts
   const opacity = interpolate(frame, [0, 8], [0, 1], {
     extrapolateLeft: "clamp",
     extrapolateRight: "clamp",
   });
   ```
4. **Three.js / Shader Discipline (`PixelCanvas`):** Render synchronously inside the Remotion render loop (`delayRender` -> compile shaders / `useGLB` -> `continueRender`) and pass `c.t = frame / fps` as shader `uTime`.

---

## 3. IG Reels, TikTok & YouTube Shorts Safe Zones (`1080x1920`)

Every vertical 9:16 composition MUST enforce these pixel coordinates so platform UI never covers captions, prices, or faces:

| Zone | Pixel Coordinates (`1080x1920`) | Rule |
|---|---|---|
| **Top Danger Zone (Notch / Search / Tabs)** | `y = 0 .. 250 px` | Keep empty or ambient background only. Zero headlines or badges here. |
| **Bottom Danger Zone (Caption / Audio / CTA)** | `y = 1536 .. 1920 px` | **Zero important text or buttons.** Place kinetic captions safely above `y = 1480 px` (center-lower band `y = 1120 .. 1460 px`). |
| **Right Action Rail (Like / Comment / Share)** | `x = 940 .. 1080 px`, `y = 864 .. 1536 px` | Keep side badges, callouts, and `glass-widgets` strictly inside `x <= 910 px`. |
| **Safe Core Stage** | `x = 72 .. 910 px`, `y = 260 .. 1480 px` | All `kinetic-caption`, `over-the-shoulder`, `glass-graph`, & `Outro` CTAs live here. |

### `faceGuard` Collision Rule
When `track.json` provides the face bounding box `[fx, fy, fw, fh]` per frame:
- Add padding (`padX = 36px`, `padY = 48px`) around the face box.
- Auto-position `over-the-shoulder` and `glass-widgets` to the open left/right margin opposite the face centroid, or anchor `text-behind` strictly in layer `behind` behind `person.webm`.

---

## 4. Broadcast Audio Contract (Sync with `/tts-gen`)

Keep voiceover stem loudness distinct from final program video output to prevent double-compression:

1. **Voiceover Stem (`tts-gen` Input):**
   - Generated at **`I = -16 LUFS`, `TP = -1.5 dBTP`, `LRA = 9 LU`, `48000 Hz`** (`loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000`).
2. **Background Music & SFX Ducking Inside Remotion:**
   - Duck BGM under active speech by **`-12 dB` to `-18 dB`** (e.g., `volume={0.14}` to `0.22` normalized relative to speech `1.0`), ramping smoothly over `6–10` frames at speech boundaries.
3. **Final Video Program Loudness (`ffmpeg` post-mix check):**
   - Social vertical target (`TikTok / IG Reels / Shorts`): **`-14` to `-16 LUFS`** integrated loudness, **`TP <= -1.0 dBTP`**, `48 kHz` AAC `192k`+.
   - Verify with ffmpeg:
     ```bash
     ffmpeg -i out/final.mp4 -af loudnorm=print_format=summary -f null - 2>&1 | tail -n 12
     ```
