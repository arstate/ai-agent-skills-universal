---
name: svg-gen
description: 4-Pass Progressive 2D Flat Vector & Icon Set Engineering Skill for Adobe Stock Contributor (Pass 1 Clean Skeleton -> Pass 2 Split-Tone Shading -> Pass 3 Micro-Details -> Pass 4 Artifact Purge & Final Retouch, 15+ MP, Auto-Fit Preview, Zero Live Strokes, Zero Cairo Raster EPS).
---

# /svg-gen (v4.0) — 4-Pass Progressive Vector & Artifact-Purge Skill

## Overview
`/svg-gen` v4.0 eliminates AI vector hallucinations and geometry artifacts by enforcing a strict **4-Pass Progressive Vector Pipeline**:
- **Pass 1 (`*_pass1_skeleton.svg`):** Clean & simple base silhouettes, keyline proportions, 2–3 flat colors.
- **Pass 2 (`*_pass2_shading.svg`):** Soft pastel backdrops, ground shadows, and 2D split-tone planar shading (zero alpha opacity).
- **Pass 3 (`*_pass3_details.svg`):** Specular crescent highlights, compound ribbon loops, surface patterns, and 4-point sparkles.
- **Pass 4 (`*_pass4_final.svg`):** Adversarial Artifact Forensics & Final Retouch (arc-clipping overhangs, fixing tangent collisions, adding micro-specular accents, and locking 10/10 Adobe Stock Gates).

---

## 📚 Mandatory References to Read (Akses via `read_file`)
1. Read `references/four-pass-retouch-plan.md` before writing any SVG coordinates.
2. Read `references/adobe-stock-guidelines.md` for the 10 Iron Laws of Adobe Stock compliance.
3. Read `references/core-rules.md` for coordinate grid systems and auto-fit declaration.
4. Read `references/two-pass-retouch-rules.md` for planar split-tone shading math.
5. Inspect the 4 reference files in `assets/examples/xmas_pass1_skeleton.svg` through `xmas_pass4_final.svg`.

---

## 🛑 1. Root `<svg>` Auto-Fit & 15+ MP Declaration
Always start directly with `<svg>` (no `<?xml ...?>` wrapper that blocks markdown/IDE live preview) and include responsive CSS `style` alongside explicit 15+ MP pixel dimensions:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4000 4000" width="4000" height="4000" style="max-width:100%;height:auto;display:block;background:#FFFFFF;">
```

---

## 🔄 2. The 4-Pass Progressive Vector Protocol

```text
[PASS 1: Clean & Simple Skeleton (*_pass1_skeleton.svg)]
  ├─ 3–5 <path> per icon, 2–3 flat base colors
  └─ Lock 100% accurate silhouettes and origin: <g transform="translate(cx, cy)">
         │
         ▼
[PASS 2: Volumetric 2D Split-Tone Shading (*_pass2_shading.svg)]
  ├─ Pastel circular backdrop + ground shadow capsule pill
  └─ Split symmetrical shapes: Left Sunlit Plane (Hex solid) / Right Shaded Plane (Zero Opacity!)
         │
         ▼
[PASS 3: Commercial Micro-Details & Surface Gloss (*_pass3_details.svg)]
  ├─ Specular crescent highlights & compound loops (fill-rule="evenodd")
  └─ Surface motifs, diamonds, baubles, and 4-point diamond sparkles
         │
         ▼
[PASS 4: Adversarial Artifact Purge & Final Retouch (*_pass4_final.svg)]
  ├─ Fix Secant Overhang (Arc-Clipping Math: A r,r with Δx = √(R² - Δy²))
  ├─ Fix Tangent Collisions (ensure ≥ 25–40px clearance from outer bounds)
  ├─ Add Secondary Micro-Highlights & Botanical Framing (holly leaves & ribbon knots)
  └─ 10-Gate Final Lock: 100% closed paths (Z), 0 live strokes, 0 text, 0 opacity
```

---

## ⚡ 3. Automated 4-Pass Verification Command
Always run the 4-Pass Engine after generating the 4 stages to audit compliance and generate the side-by-side inspector:
```bash
python3 scripts/svg_four_pass_engine.py pass1.svg pass2.svg pass3.svg pass4.svg --html preview_4pass_inspector.html
```

---

## 🛠️ 4. Inkscape CLI Outlining Pipeline
```bash
inkscape input.svg \
  --actions="select-all:all;selection-ungroup;select-all:all;selection-ungroup;select-all:all;object-to-path;object-stroke-to-path;export-filename:output.eps;export-do"
```
