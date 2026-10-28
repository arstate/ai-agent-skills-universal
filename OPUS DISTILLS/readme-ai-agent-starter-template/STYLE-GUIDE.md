# Style Guide, OpenDesign 8 Dimensions & Design DNA (`readme-ai-agent/STYLE-GUIDE.md`)

## 1. Selected Reference from 300-Reference Vault
- **Primary Reference ID:** `#___` (`references/cat-XX-...md`)
- **Secondary Component Reference ID:** `#___`

## 2. OpenDesign 8 Orthogonal Dimensions
- `palette`: ...
- `accent`: ... (Max 2–3 accents per viewport; `#6366f1` strictly banned!)
- `typography`: ...
- `display`: ...
- `layout`: ...
- `mood`: ...
- `density`: ...
- `exclude`: `["#6366f1", "framework-footer-slop", "emojis-in-ui"]`

## 3. Studio Footer Archetype (Anti-Footer-Slop)
- **Chosen Archetype:** [1. Editorial Colophon | 2. Architectural Grid + Cropped Wordmark | 3. Local NAP Trust Footer | 4. Swiss Hairline `justify-between`]


## Mandatory Pre-Build Planning Gate & Zero Meta-Design Jargon in UI Copy
1. **Always Plan & Ask User First Before Coding a Website (`web-planning` Gate):**
   - Never jump straight into coding a full website (`index.html` or Next.js build) without presenting the `USER_FLOW_AND_PAGE_ARCHITECTURE.md` plan, section structure, and Tech Stack recommendation (`Next.js 15 App Router`) and asking the user to confirm first.
2. **Zero Meta-Design / Layout Jargon in Live Website Copy (`Gate C-Copy`):**
   - Never write CSS layout or theme names like `"Bento"`, `"Bento Spesifikasi"`, `"Hallmark"`, `"Nordic Precision"`, `"Blueprint"`, `"Hero Section"`, or `"CTA Block"` inside website navbars, headings (`<h1>`–`<h4>`), badges, or body text!
   - Implement Bento Grid or Hallmark themes purely via CSS layout and visual tokens while keeping 100% of visible website text in authentic domain/industry terminology (e.g., `SPESIFIKASI MESIN`, `Spesifikasi Teknis & Kapasitas Pemesinan`).

