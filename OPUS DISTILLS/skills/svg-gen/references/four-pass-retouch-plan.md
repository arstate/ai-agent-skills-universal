# The 4-Pass Progressive Vector Engineering Plan (`four-pass-retouch-plan.md`)

## PASS 1: Clean & Simple Base Skeleton (`*_pass1_skeleton.svg`)
- **Objective:** Lock 100% accurate proportions, center translations `<g transform="translate(cx, cy)">`, and recognizable silhouettes (*Picture Deletion Test*).
- **Constraints:**
  - Maximum **3 to 5 `<path>` elements** per icon.
  - Only **2–3 flat primary colors** (`#059669`, `#DC2626`, `#F59E0B`).
  - Zero backdrops, zero shadows, zero highlights, zero tiny ornaments.
  - Every `<path>` must end with `Z`.

---

## PASS 2: Volumetric 2D Split-Tone Shading (`*_pass2_shading.svg`)
- **Objective:** Add 2D flat depth, elevation, and color harmony without using forbidden `opacity` or `<filter>`.
- **Upgrades Applied to Pass 1:**
  1. **Pastel Contrast Backdrop:** Add a circular backdrop (`r = 680` on a `2000×2000` cell) in a warm/cool pastel tint (`#FEF3C7`, `#DCFCE7`, `#E0F2FE`, `#FCE7F3`).
  2. **Ground Shadow Pill:** Add a flat horizontal capsule beneath standing objects (`height = 60–80px`).
  3. **Split-Tone Planar Shading:** Split symmetrical objects along `x = 0` into a **Left Sunlit Plane** (lighter Hex swatch, e.g., `#10B981`) and a **Right Shaded Plane** (darker Hex swatch, e.g., `#047857`). Add under-lid cast shadow bars (`#7F1D1D`) beneath box lids or roofs.

---

## PASS 3: Commercial Micro-Details & Surface Gloss (`*_pass3_details.svg`)
- **Objective:** Enrich the shaded forms with commercial micro-details that attract B2B/agency buyers.
- **Upgrades Applied to Pass 2:**
  1. **Sculpted Compound Elements:** Add hollowed ribbon bow loops (`fill-rule="evenodd"`), hanger rings, and inner badge bezels.
  2. **Surface Ornaments & Motifs:** Add baubles on trees, Nordic geometric diamonds on bands, holly berry clusters on wreaths, and satin ribbon highlight strips.
  3. **Specular Crescent Highlights & Sparkles:** Add curved shine paths (`#FCA5A5`, `#FEF08A`, `#FFFFFF`) and 4-point diamond sparkles.

---

## PASS 4: Adversarial Artifact Forensics & Final Retouch (`*_pass4_final.svg`)
- **Objective:** Hunt down and eliminate every geometric flaw introduced in Pass 3, then apply final master retouching.
- **The 4 Mandatory Forensic Fixes in Pass 4:**
  1. **Fix Secant Overhang / Corner Bleed (Arc-Clipping Math):**
     - *Problem in Pass 3:* A horizontal band (`y_top = -10` to `y_bot = 150`) placed across a sphere of radius $R = 480$ centered at $(0, 70)$ using straight vertical lines `V 150` either sticks out past the circle or leaves a flat gap at the equator.
     - *Exact Mathematical Fix in Pass 4:* Calculate the chord half-width $\Delta x = \sqrt{R^2 - (y - c_y)^2} = \sqrt{480^2 - 80^2} = 473.29$, and replace straight `V` segments with exact elliptical arcs `A 480.00,480.00 0 0 1 473.29,150.00` so the band hugs the sphere contour with **0.00px overhang**!
  2. **Fix Tangent Collisions & Edge Crowding:**
     - Inspect all ornaments, berries, and sparkles. Ensure at least **25px–40px clearance** from triangle/circle boundaries so no element awkwardly kisses an edge.
  3. **Add Secondary Micro-Highlights & Botanical Framing:**
     - Add crisp micro-dots/crescents (`#FCA5A5` / `#FEF08A`) inside small baubles/berries and add paired emerald holly leaves (`#10B981` / `#059669`) to anchor bows and ornament crowns.
  4. **10-Gate Final Lock:**
     - Verify `open_paths == 0`, `live_strokes == 0`, `text_tags == 0`, `opacity_attrs == 0`, and `resolution >= 15.0 MP`.
