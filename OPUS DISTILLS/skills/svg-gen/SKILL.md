---
name: svg-gen
description: 4-Pass Progressive 2D Flat Vector & Icon Set Engineering Skill for Adobe Stock Contributor (Pass 1 Clean Skeleton -> Pass 2 Split-Tone Shading -> Pass 3 Micro-Details -> Pass 4 Artifact Purge & Final Retouch, 15+ MP, Auto-Fit Preview, Zero Live Strokes, Zero Cairo Raster EPS).
---

# /svg-gen (v4.2) — 4-Pass Progressive Vector & Artifact-Purge Skill

## Overview
`/svg-gen` v4.2 eliminates AI vector hallucinations, amateur clipart geometry, and tacky embellishments by enforcing a strict **4-Pass Progressive Vector Pipeline** and the **True 7 Iron Laws of Commercial Vector Craft** (anti-clipart engineering for both high-ticket B2B corporate assets and seasonal packs):
- **Pass 1 (`*_pass1_skeleton.svg`):** Clean & simple base silhouettes, keyline proportions, 2–3 flat colors, origin centered.
- **Pass 2 (`*_pass2_shading.svg`):** Grounded bases and volumetric 2D planar split-tone shading (directional lighting from top-left, zero alpha opacity, multi-tone fluting; strictly banned: detached floating pills and tacky pastel circle discs).
- **Pass 3 (`*_pass3_details.svg`):** Authentic craftsmanship: architectural capitals & dentils, realistic fanned cards with EMV chip tracks & NFC wave arcs, live mobile app UI with verified badge, ascending volume bars with milestone data nodes (strictly banned: juvenile 4-point magic fairy sparkles and spammy copy-paste coins).
- **Pass 4 (`*_pass4_final.svg`):** Adversarial Artifact Forensics & Final Retouch (specular crescent highlights, glass light sweeps, metallic bevel glints, tangent clearances >= 50px, arc-clipping math, and locking 10/10 Adobe Stock Quality Gates).

---

## 📚 Mandatory References to Read (Akses via `read_file`)
1. Read `references/four-pass-retouch-plan.md` before writing any SVG coordinates (contains the True 7 Iron Laws of Commercial Vector Craft: Authentic Architecture, Fanned Overlaps, Live Gadget UI Intelligence, Volume Bar Cadence, Grounded Integrity, Professional B2B Aesthetics, Specular Glints & 10-Gate Lock).
2. Read `references/adobe-stock-guidelines.md` for the 10 Iron Laws of Adobe Stock compliance.
3. Read `references/core-rules.md` for coordinate grid systems and auto-fit declaration.
4. Read `references/two-pass-retouch-rules.md` for planar split-tone shading math (anti-mechanical split rule).
5. Inspect the reference files in `assets/examples/`:
   - Seasonal: `xmas_pass1_skeleton.svg` through `xmas_pass4_final.svg`
   - B2B Corporate/Fintech: `fintech_pass1_skeleton.svg` through `fintech_pass4_final.svg`

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
[PASS 2: Volumetric 2D Planar Shading & Grounded Bases (*_pass2_shading.svg)]
  ├─ Directional light from top-left (135° azimuth)
  ├─ Integrated grounding base (strictly NO detached floating pills or circle badges)
  └─ Split planar facets: Sunlit Plane (Hex solid) / Shaded Plane (Zero Opacity!)
         │
         ▼
[PASS 3: Commercial Micro-Details & Craftsmanship (*_pass3_details.svg)]
  ├─ Real architectural capitals, dentils, and entrance portals
  ├─ Dynamic fanned cards with EMV chip tracks, contactless waves, saddle stitches
  ├─ Live device UI with status bar, virtual card, verified badge, transaction pills
  └─ Ascending volume bars, trendline spline ribbon, concentric data node pucks
         │
         ▼
[PASS 4: Adversarial Artifact Purge & Final Retouch (*_pass4_final.svg)]
  ├─ Fix Secant Overhang (Arc-Clipping Math: A r,r with Δx = √(R² - Δy²))
  ├─ Fix Tangent Collisions (ensure ≥ 50px clearance from outer bounds)
  ├─ Specular micro-glints (crescents on snaps/chips, glass reflection sweep, metallic sheen)
  └─ 10-Gate Final Lock: 100% closed paths (Z), 0 live strokes, 0 text, 0 opacity, >= 15 MP
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
