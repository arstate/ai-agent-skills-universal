# Core Rules: SVG Structure, Coordinate Space & Auto-Fit Preview

## 1. Root Element Standard Declaration
Always declare root `<svg>` without `<?xml ...?>` prolog and with explicit dimensions, viewBox, and auto-fit inline CSS:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4000 4000" width="4000" height="4000" style="max-width:100%;height:auto;display:block;background:#FFFFFF;">
```

### Why this structure?
1. **No `<?xml ...?>`:** The XML declaration is strictly prohibited when inlining into HTML previewers or markdown renderers, and triggers mime-type / syntax parsing halts in some webview previewers.
2. **`width="4000" height="4000"`:** Satisfies Adobe Stock's automated rasterizer and EPS converter requiring $\ge 15.0\text{ Megapixels}$.
3. **`style="max-width:100%;height:auto;display:block;"`:** Forces browsers and IDE preview extensions to scale the 4000px canvas to fit the window viewport instead of overflowing and blowing past the monitor edges.

---

## 2. Grid Origin & Transformed Groups
For icon packs (e.g. 4-icon grid on a 4000×4000 canvas):
- Cell 1: `(1050, 1050)`
- Cell 2: `(2950, 1050)`
- Cell 3: `(1050, 2950)`
- Cell 4: `(2950, 2950)`

Always construct each icon inside a translated `<g transform="translate(cx, cy)">` so shapes are defined relative to their local center `(0, 0)`:
```xml
<g id="icon-01-tree" transform="translate(1050, 1050)">
  <!-- Local coordinates centered at 0, 0 -->
</g>
```

---

## 3. Path Grammar & Strict Rules
- Every `<path>` MUST end with `Z` or `z`.
- 0 live strokes: `stroke="..."` is prohibited. Convert all outlines to filled ribbons.
- Compound paths with cutouts MUST use `fill-rule="evenodd"`.
