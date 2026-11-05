# Figma MCP & Plugin API Technical Bible (`figma-bridge` + `FigCraft` + Official Figma MCP)

> Part of the `figma-design` skill. Complete reference for avoiding all 28 `use_figma` / Plugin API pitfalls, mastering `figma-bridge` tools, and leveraging `FigCraft`'s Opinion Engine.

---

## 1. `figma-bridge` MCP Tool Reference (`ws://127.0.0.1:4395`)

When `figma-bridge` is connected, you have direct read/write access to the open Figma Desktop document:

| Tool | Purpose & Best Practice |
|---|---|
| `execute` | Runs arbitrary JavaScript inside the Figma Plugin API context (`figma` is in global scope; top-level `await` and `return` are supported). **Always `return` created/mutated node IDs and bounding-box diagnostics.** |
| `get_layout` | Generates a **2D ASCII spatial map** of any frame (`nodeId`) with pixel rulers, column alignment clusters, and automatic detection of **`issues.overlaps`**, **`issues.overflow`**, and **`issues.nearMiss`**. **Call this BEFORE and AFTER every layout build!** |
| `get_screenshot` | Renders the canvas or a specific `nodeId` to a PNG image so you can inspect visual quality via Vision (`view_file`). |
| `get_tree` | Returns the node hierarchy (`id`, `name`, `type`, `layout`, `text`, `size`) up to `max_depth`. |
| `get_node` | Returns full properties of a single node (`fills`, `strokes`, `effects`, `textStyle`, `children`). |
| `create_frame` / `create_text` | Fast declarative helpers for simple frames and text nodes. |
| `set_properties` / `set_fills` / `set_strokes` / `set_effects` | Batch-update node styling without writing full JS scripts. |
| `set_image_fill` | Fills any node with a raster image from a URL or Base64 string. |
| `export_node` | Exports any node as high-resolution `PNG`, `JPG`, `SVG`, or `PDF`. |

---

## 2. The 18 Critical Figma Plugin API Gotchas (`WRONG` vs `CORRECT`)

### Gotcha 1: Setting `FILL` or `HUG` Before `appendChild` Throws an Error
```javascript
// ❌ WRONG — throws "node must be an auto-layout frame or a child of an auto-layout frame"
const child = figma.createFrame();
child.layoutSizingHorizontal = "FILL";
parent.appendChild(child);

// ✅ CORRECT — appendChild FIRST, then set layoutSizingHorizontal / Vertical
const child = figma.createFrame();
parent.appendChild(child);
child.layoutSizingHorizontal = "FILL";
```

### Gotcha 2: Calling `resize()` Resets `layoutSizing` to `FIXED`
```javascript
// ❌ WRONG — resize() overwrites HUG back to FIXED!
frame.layoutMode = "VERTICAL";
frame.layoutSizingVertical = "HUG";
frame.resize(400, 100); // Now vertical sizing is FIXED at 100px!

// ✅ CORRECT — call resize() FIRST, then set layoutSizingVertical = "HUG"
frame.layoutMode = "VERTICAL";
frame.resize(400, 100);
frame.layoutSizingHorizontal = "FIXED";
frame.layoutSizingVertical = "HUG";
```

### Gotcha 3: `HUG` Parent + `FILL` Child = Collapse Trap
- If a parent Auto-Layout frame has `layoutSizingHorizontal = "HUG"` and its child has `layoutSizingHorizontal = "FILL"`, Figma collapses or downgrades one of them.
- **Rule:** Container frames that define column widths (`root`, `card`, `column`) must have `FIXED` width (or `FILL` inside a `FIXED` outer frame) so their children can safely use `FILL`.

### Gotcha 4: `textAutoResize = "HEIGHT"` Must Be Set After `resize(width, ...)`
```javascript
// ✅ CORRECT multi-line wrapping text in fixed width:
const t = figma.createText();
t.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
t.fontSize = 16;
t.lineHeight = { value: 24, unit: "PIXELS" };
t.characters = "Desain elegan, foto produk jernih, navigasi simpel untuk konversi WhatsApp.";
t.resize(480, 40);
t.textAutoResize = "HEIGHT"; // Automatically adjusts height to fit wrapped lines at width=480!
```

### Gotcha 5: `lineHeight` and `letterSpacing` Require `{ value, unit }` Objects
```javascript
// ❌ WRONG — throws type error
t.lineHeight = 24;
t.letterSpacing = -2;

// ✅ CORRECT
t.lineHeight = { value: 24, unit: "PIXELS" }; // or { value: 120, unit: "PERCENT" }
t.letterSpacing = { value: -2, unit: "PERCENT" }; // or { value: -0.5, unit: "PIXELS" }
```

### Gotcha 6: Colors Are `0..1` Floats, Not `0..255` Integers
```javascript
const hex = (h) => {
  const c = h.replace("#", "");
  return {
    r: parseInt(c.slice(0, 2), 16) / 255,
    g: parseInt(c.slice(2, 4), 16) / 255,
    b: parseInt(c.slice(4, 6), 16) / 255,
  };
};
```

### Gotcha 7: `fills`, `strokes`, and `effects` Are Read-Only Arrays
- Never mutate `node.fills[0].color.r = 1`. Always clone or assign a fresh array: `node.fills = [{ type: "SOLID", color: hex("#012969") }]`.

### Gotcha 8: `figma.createNodeFromSvg()` Scaling & Clipping
- `figma.createNodeFromSvg(svgStr)` returns a `FrameNode` whose children are `VectorNode`s or `GroupNode`s.
- Simply calling `svgFrame.resize(w, h)` does **NOT** scale the internal vectors unless constraints are set—always use **`svgFrame.rescale(targetWidth / svgFrame.width)`** to scale all internal vectors and stroke weights proportionally!

### Gotcha 9: Page Switching Must Use `await figma.setCurrentPageAsync(page)`
- Never use `figma.currentPage = page` (throws in modern Plugin API incremental loading).

### Gotcha 10: Top-Level Page Placement (`x, y` Collision Avoidance)
- When creating a new top-level frame on `figma.currentPage`, scan existing children's `x + width` and place the new frame at `maxX + 120` (unless intentionally replacing a named frame by ID/name).
