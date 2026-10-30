# Two-Pass Progressive SVG Engineering Rules (Pass 1 ➔ Pass 2)

## Why Two-Pass Generation?
Generating complex vector illustrations in a single pass causes coordinate drift and visual clutter. Splitting generation into **Pass 1 (Structural Skeleton)** and **Pass 2 (Aesthetic Retouch)** guarantees both mathematical symmetry and high commercial download value on Adobe Stock, Shutterstock, and Freepik.

---

## PASS 1: Clean & Simple Base (`*_pass1_base.svg`)
- **Goal:** Establish 100% accurate silhouette, grid alignment, and optical balance.
- **Rules:**
  1. Use at most **3 to 5 `<path>` elements per icon**.
  2. Stick to **2–3 flat primary colors** (e.g., Pine Green `#059669`, Crimson `#DC2626`, Gold `#F59E0B`).
  3. Zero backgrounds, zero shadows, zero highlights, zero tiny ornaments.
  4. Every path MUST be closed (`Z`) and centered on its grid origin `(cx, cy)` via `<g transform="translate(cx, cy)">`.
  5. Include responsive auto-preview style: `style="max-width:100%;height:auto;display:block;background:#FFFFFF;"`.

---

## PASS 2: Aesthetic Retouch & Polish (`*_pass2_final.svg`)
Take the exact `<g transform="translate(cx, cy)">` coordinates from Pass 1 and apply these **5 Retouch Upgrades**:

### Upgrade 1: Soft Contrast Backdrop & Cast Shadow
- Add a soft pastel circular backdrop behind the icon (`r = 680` on a `2000x2000` cell) in a complementary warm/cool tint (`#FEF3C7`, `#DCFCE7`, `#E0F2FE`, `#F1F5F9`).
- Add a flat pill-shaped ground shadow (`height = 60–80px`) beneath standing objects.

### Upgrade 2: Split-Tone Planar Shading (Zero Alpha Opacity!)
- Because PostScript EPS Level 3.0 converts `opacity` / `fill-opacity` into raster bitmaps (`cairo_image`), **NEVER use alpha transparency for shading**.
- Instead, split symmetrical shapes along `x = 0` or `y = 0` into two closed paths with adjacent solid Hex swatches:
  - **Emerald Tree Tier:** Left sunlit half `#10B981` (`M 0,-380 L 0,80 H -440 Z`), Right shaded half `#047857` (`M 0,-380 L 440,80 H 0 Z`).
  - **Crimson Gift Box:** Left sunlit half `#DC2626`, Right shaded half `#991B1B`, Under-lid cast shadow bar `#7F1D1D`.
  - **Gold Coin / Sphere:** Base circle `#FBBF24`, inner well `#D97706`, crescent shadow `#B45309`.

### Upgrade 3: Specular Highlights & Bevels
- Add a curved crescent path (`#FCA5A5` on red, `#FEF08A` on gold, `#BAE6FD` on blue) on the upper-left curve of spheres, baubles, and shields to give instant 2D flat gloss.
- Round sharp corners on lids, cuffs, and buttons using elliptical arcs (`A rx,ry 0 0 1 ...`).

### Upgrade 4: Micro-Ornaments & 4-Point Sparkles
- Add 4-point diamond sparkles around hero elements:
  ```xml
  <path fill="#F59E0B" d="M 0,-90 L 25,-25 L 90,0 L 25,25 L 0,90 L -25,25 L -90,0 L -25,-25 Z" />
  ```
- Add Nordic geometric diamonds, holly berry trios, or satin ribbon highlights.

### Upgrade 5: Blank Customizable Copy-Space (Gate 08)
- For badges, wreaths, ribbons, and frames, ensure the center has a clean `#FFFFFF` or solid contrast `<path>` with **0 text**, framed by a secondary inner bezel ring so buyers can place their own discount or greeting text.
