# 40-Rule Figma Quality, WCAG & Zero-Collision Verification Gate

> Part of the `figma-design` skill. Distilled from `FigCraft` (`packages/quality-engine` 40 lint rules), `figma-bridge` (`get_layout` overlap/overflow engine), and `Nutlope/hallmark` (58 anti-slop gates).

---

## 1. Mandatory 3-Step Verification Pipeline Before Delivering Any Figma Task

Never finish a turn after running `execute` or `create_frame` without completing all 3 checks below:

### Step 1: Programmatic Collision & Overflow Audit (`get_layout` / In-Script Bounding-Box Check)
1. Call `get_layout({ nodeId: "<rootFrameId>", cell: 10, tolerance: 2, maxDepth: 4 })` on `figma-bridge` (or run `detectCollisionsInPoster(root)` inside `execute`).
2. Verify:
   - **`issues.overlaps.length === 0`** between any sibling text, logo, badge, or card nodes.
   - **`issues.overflow.length === 0`** (no child extends past `root.width` or `root.height`, and `bottom <= root.height - 32`).
   - **Safe Margin Lock:** Every content node inside a `1080x1440` poster sits within `x: 70..1010` and `y: 48..1408`.

### Step 2: FigCraft 40-Rule Structural & WCAG Compliance Check
When `FigCraft` is active (`verify_design` / `lint_fix_all`), or when auditing via `figma-bridge`, enforce these core quality rules:

| Category | Rule ID | Requirement |
|---|---|---|
| **WCAG Contrast** | `wcag-contrast` | Body text (< 18px) contrast ratio `>= 4.5:1`; Large/Display text (>= 18px Bold or >= 24px) `>= 3.0:1`. Never place dark-blue badges with muted text inside a dark-blue card! |
| **Non-Text Contrast** | `wcag-non-text-contrast` | Card borders, input outlines, and interactive pills must have `>= 3:1` contrast or a crisp `1.5px–2px` border + hard shadow. |
| **Text Size Floor** | `wcag-text-size` | Desktop UI `>= 12px`; Mobile UI `>= 14px`; **`1080x1440` Social/Ad Posters: body/bullet copy `>= 15px`, micro-kicker tags `>= 11.5px` Bold**. |
| **Line Height** | `wcag-line-height` | Display headlines `1.08–1.18x`; body copy `1.38–1.55x`. |
| **Touch / CTA Target** | `wcag-target-size` | Mobile/UI buttons `>= 44x44px`; **`1080x1440` Poster Primary CTA button `height >= 72px`**. |
| **Layout & Overflow** | `text-overflow` / `overflow-parent` | Text nodes must never clip (`textAutoResize = "HEIGHT"` or `"WIDTH_AND_HEIGHT"`). |
| **Auto-Layout Discipline** | `no-autolayout` / `unbounded-hug` | Repeatable rows, grids, pills, and cards use Auto-Layout with explicit `4px/8px` scale spacing (`4, 8, 12, 16, 20, 24, 32, 48, 64`). |
| **Button Structure** | `button-solid-structure` | Horizontal Auto-Layout, `counterAxisAlignItems = "CENTER"`, `primaryAxisAlignItems = "CENTER"`, `paddingLeft/Right >= 24`, single-line label + vector icon. |
| **Elevation Hierarchy** | `elevation-consistency` | Sibling cards in the same row share identical border weight, corner radius, and shadow offset. |
| **Zero Placeholders** | `placeholder-text` / `default-name` | Zero `"Frame 1"`, `"Rectangle 52"`, `"Lorem ipsum"`, or raw Unicode emojis (`🚀`, `🎯`). Every node has a semantic name and authentic copy. |

### Step 3: High-Resolution Screenshot Export & Vision Critique (`view_file`)
1. Call `get_screenshot({ nodeId: "<rootFrameId>" })` or `export_node({ nodeId: "<rootFrameId>", format: "PNG", scale: 1 })`.
2. Inspect the exported image using `view_file`.
3. Check the **5 Visual Instant-Fail Triggers**:
   - Does any logo or badge touch or overlap a headline? -> **Fix `y` / Auto-Layout gap immediately.**
   - Do any showcase/product cards look like empty text boxes without illustrations? -> **Inject multi-layered SVG artwork immediately.**
   - Is any strikethrough line cutting through the top/bottom of text instead of the center? -> **Fix `y` to `0.52 * height` or use `STRIKETHROUGH` immediately.**
   - Are there any muddy/blurry color stains on a light background? -> **Delete blur orbs immediately.**
   - Is there awkward empty dead space or cramped bottom text? -> **Rebalance zone heights and `itemSpacing` immediately.**
