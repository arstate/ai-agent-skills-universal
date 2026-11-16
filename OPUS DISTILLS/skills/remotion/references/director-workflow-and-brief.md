# Director Workflow, Brief Schema & Self-Review (`director-workflow-and-brief.md`)

Operational manual for the 7-step Mode A Talking-Head pipeline (`aaksa/facecammaxxing`) and Mode B beat planning.

---

## 1. The 7-Step `fcm.py` Director Pipeline

Run every project in order—never skip `check` before the final MP4 render:

| Step | Command / Action | Output Artifact | Purpose & Gate |
|---|---|---|---|
| **1. `setup`** | `bash scripts/bootstrap_facecammaxxing.sh` | `~/.agents/tools/facecammaxxing` | Installs runtime `.venv` (RVM/MediaPipe/YuNet/Whisper) + `node_modules` outside the skills repo. |
| **2. `brief`** | Author `brief.md` | `projects/<slug>/brief.md` | Locks subject, exact user claims, aesthetic mood, 60-30-10 palette, music/audio cue, & 12–14 beats. |
| **3. `track`** | `python scripts/fcm.py track <slug>` | `person.webm`, `track.json`, `room.mp4` | Separates speaker alpha matte (RVM/MediaPipe), tracks head bounding box via YuNet, & creates clean room plate. |
| **4. `words`** | `python scripts/fcm.py words <slug>` | `words.json` | Extracts word-level start/end timestamps via Whisper so visual cuts hit exact spoken syllables. |
| **5. `plan`** | Author `plan.json` (hardest beat first) | `projects/<slug>/plan.json` | Maps each effect to `words.json` word timestamps, layer slot (`behind`/`front`/`screen`), & `faceGuard`. |
| **6. `check`** | `python scripts/fcm.py check <slug>` | `sheet.jpg` | Renders contact sheet grid across key beat frames. **Mandatory Vision inspection via `read_file`!** |
| **7. `render`** | `python scripts/fcm.py render <slug> [--draft]` | `out/<slug>.mp4` | Fast `--draft` verification first -> clean final 1080x1920 30fps H.264 render. |

---

## 2. Standard `brief.md` & `plan.json` Structure

### `brief.md` Checklist
1. **Hook & Core Thesis (0–3s):** Exact opening claim + visual curiosity trigger.
2. **Verified Claims Only:** Every stat, price, or quote must come from user input (`0` invented metrics).
3. **Color & Type Lock:** Background tint, ink color, 1 focal accent hex, max 2 fonts matching brand identity.
4. **Beat Breakdown (12–14 Beats):** Timestamp intent, spoken anchor word, chosen effect from catalog, & layer (`behind`/`front`/`screen`).

### Minimal `plan.json` Beat Pattern
```json
{
  "fps": 30,
  "width": 1080,
  "height": 1920,
  "palette": { "bg": "#111215", "ink": "#F8F7F4", "accent": "#FF4F00" },
  "faceGuard": { "enabled": true, "padX": 36, "padY": 48 },
  "beats": [
    {
      "id": "opener-chat",
      "effect": "ChatRender",
      "layer": "screen",
      "startWord": 0,
      "duration": 2.4,
      "props": { "prompt": "Edit reels otomatis tanpa keyframe manual?" }
    },
    {
      "id": "headline-behind",
      "effect": "text-behind",
      "layer": "behind",
      "anchorWord": "otomatis",
      "duration": 2.2,
      "props": { "text": "OTOMATIS", "scale": 1.0 }
    }
  ]
}
```
> **Hardest-Beat-First Rule:** Prototype and verify the most complex beat (e.g., `kallaway-split`, `glass-graph`, or `prop-3d`) in isolation before sequencing the full 30–60s timeline.

---

## 3. Mandatory 7-Point Contact-Sheet Self-Review (`sheet.jpg`)

Before delivering any rendered video, inspect `sheet.jpg` (Mode A) or key still PNGs (Mode B) with `read_file` and fail the render immediately if ANY point breaks:
1. **Subject Clarity (`faceGuard`):** Does any graphic, caption, or 3D prop overlap the speaker's eyes, nose, or mouth?
2. **Safe-Zone Compliance:** Is all critical text inside the 9:16 safe window (clear of TikTok/IG top chrome, bottom caption stack, and right action rail)?
3. **On-Word Sync Check:** Does each visual beat hit on or `1–2` frames *before* the anchor word starts in `words.json`?
4. **Single Focal Hero:** Does any frame have 2 bright competing elements fighting the speaker's face?
5. **Zero Unrequested Slop Chromes:** Are there zero random corner brackets, fake timecodes (`00:01:23:14`), or unrequested stats?
6. **Edge & Matte Cleanliness:** Any green/halo bleed around `person.webm` cutout edges? (Adjust feather/spill or swap room plate tint).
7. **Readable Contrast:** Is contrast between behind-text/captions and `room.mp4` `>= 4.5:1` (`|L_text - L_bg| >= 50%` OKLCH)?

---

## 4. Never-Ship Rules & Optional Blender `.glb` Pipeline

### Never-Ship Checklist
- Never ship uninspected `render` outputs without reading `sheet.jpg` / key frames.
- Never render with unseeded `Math.random()` inside frame components.
- Never ship Mode A cuts with > 3 consecutive static seconds without a camera push (`lean-in`, `slow-push`), framing beat, or caption emphasis.

### Optional Headless Blender `.glb` Workflow
Only invoke if `command -v blender` succeeds on the host machine:
1. Check availability: `which blender || echo "Blender missing - fallback to built-in Three.js prop-3d meshes"`.
2. Export stylized low-poly / clay / metallic 3D props cleanly centered at world origin `(0,0,0)` with embedded PBR textures via Blender `--background --python scripts/blender/kit.py` into `assets/props/<name>.glb`.
3. Reference `<name>.glb` inside `prop-3d` effect (`props.glbPath`) and fit bounds with `useFitted`.
