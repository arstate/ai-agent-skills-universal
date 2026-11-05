---
name: figma-design
description: |
  Figma Design & Canvas Automation Engine via Figma Bridge WebSocket Relay & Native Auto Layout.
  Integrates 6 core libraries (figma/mcp-server-guide, warpdotdev/figma-skills, nexu-io/open-design,
  mengto/skills, jakubkrehel/skills, benjitaylor/skills) and 4 design agent applications:
  Design System Enforcement, Heuristic Usability Evaluation, Language Localization & Auto-Reflow,
  and Structural Code Handoff (Design-to-Code).
---

# `/figma-design` (v3.0) — Master Figma Design & Canvas Automation Engine

Engine otomasi, manipulasi kanvas, audit heuristik, dan handoff kode Figma modern menggunakan **Figma Bridge WebSocket Relay** (`ws://127.0.0.1:4395`) dan **Figma Native Auto Layout Architecture**. Mengintegrasikan 6 repositori arsitektur desain terkemuka dunia dan 4 pilar aplikasi agen desain tanpa bergantung pada simulasi klik browser lambat.

> **Triggers & Aliases:** `/figma-design`, `/djadi-figma-control`, `@figma-design`, `figma design`, `desain figma`, `figma auto layout`, `figma bridge`, `audit figma`, `figma to code`, `figma handoff`.

---

## 📚 Mandatory References to Read (Akses via `read_file`)
1. Read `references/core-design-libraries-and-frameworks.md` untuk 6 repositori inti industri (`figma/mcp-server-guide`, `warpdotdev/figma-skills`, `nexu-io/open-design`, `mengto/skills`, `jakubkrehel/skills`, `benjitaylor/skills`).
2. Read `references/four-design-agent-applications.md` untuk 4 aplikasi agen desain: Design System Enforcement, Heuristic Evaluation (NN/g), Language Localization, dan Structural Code Handoff.
3. Read `references/auto-layout-engine-guide.md` untuk 7 Hukum Besi Auto Layout (`layoutMode`, hug vs fill, nested grids, dan Master Artboard Law).
4. Read `references/figma-bridge-and-relay-api.md` untuk topologi relay daemon WebSocket, typography preloading, physical solid shadows, dan Closed-Loop Vision QA.
5. Read `references/design-tokens-and-gsm.md` untuk token warna GSM v2.5, kanvas feed 3:4 (1080x1440), safe-zone 1080x1080, hierarki font, dan strict guardrails (banned kata "brutalist", 0 italic headers).

---

## 🏛️ 1. INTEGRASI 6 CORE GITHUB REPOSITORIES & LIBRARIES

1. **`figma/mcp-server-guide` (Foundational MCP Parameters & High-Fidelity Handoffs):**
   - Menggunakan skema Model Context Protocol (MCP) terstandarisasi untuk inspeksi AST layer, pengambilan computed styling, dan ekstraksi bounding box presisi.
   - Mengambil data geometri kanvas terisolasi (`get_node`, `get_file_nodes`) tanpa membebani context window LLM.
2. **`warpdotdev/figma-skills` (Structural Execution & Incremental Edit Workflows):**
   - Menerapkan workflow 4 fase *Edit Figma Design*: **Dynamic Read** $\rightarrow$ **Plan Incremental Edits** $\rightarrow$ **Batch Execute via Triggers** $\rightarrow$ **Visual Diff QA**.
   - Setiap mutasi bersifat transaksional dan idempoten (tidak memicu UI flicker atau duplikasi layer).
3. **`nexu-io/open-design` (Engineering Transition & Design System Rules):**
   - Standar *Figma Implement Design Skill* (1:1 layout fidelity translation) dan *Create Design System Rules*.
   - Penegakan **skala spasial 4px/8px** (0 spacing acak) dan pengikatan variabel (*Figma Variables Binding*).
4. **`mengto/skills` (Agent Skills for Designers & Builders):**
   - Adaptasi layout responsif lintas ukuran layar: Desktop (1440px / 1080x1440), Tablet (768px), dan Mobile (390px).
   - Arsitektur Component Sets dengan varian standar (`State`, `Size`, `Theme`).
5. **`jakubkrehel/skills` (Interface System & Accessibility Guidelines):**
   - Skala tipografi modular `1.25` / `1.333`, optical line-heights ($1.1\times–1.2\times$ untuk display, $1.4\times–1.6\times$ untuk body).
   - Aksesibilitas WCAG AA/AAA: kontras teks normal $\ge 4.5:1$, touch target minimal $\ge 44 \times 44\text{px}$, cincin fokus kontras.
   - Microcopy antarmuka ringkas, lugas, dan verb-first (tanpa kata basi).
6. **`benjitaylor/skills` (Product UI Craft & Micro-Interactions):**
   - Rekayasa 8 status interaktif komponen (*default, hover, pressed, focused, active, disabled, loading, error*).
   - Detail mikro taktil: hairline 1px borders, inset highlights, dan **Physical Solid Dimensional Drop Shadows** bersudut tegas $45^\circ$ (anti-fuzzy blur).

---

## ⚡ 2. EMPAT (4) APLIKASI UTAMA AGEN DESAIN FIGMA

### Aplikasi 1: Design System Enforcement & Token Auditor
- Memindai frame dan komponen untuk mendeteksi:
  * Warna *fill* / *stroke* lepas tanpa variable binding atau style ID.
  * Jarak (*gap*) dan *padding* Auto Layout yang menyimpang dari skala 4px/8px.
  * Ukuran font di luar skala tipografi modular.
- Menjalankan auto-healing via Plugin API untuk menyelaraskan nilai ke token terdekat (`bun scripts/design_system_auditor.ts`).

### Aplikasi 2: Heuristic Usability Evaluations & Canvas Annotations
- Memeriksa frame desain terhadap **10 Prinsip Heuristik Nielsen Norman Group (NN/g)**.
- Menghasilkan kontainer kartu anotasi pin visual langsung di sebelah frame yang diaudit pada kanvas Figma + laporan evaluasi terstruktur.

### Aplikasi 3: Language Localization & Dynamic Copy Reflow
- Menerjemahkan teks antarmuka lintas bahasa (ID $\leftrightarrow$ EN $\leftrightarrow$ JP) secara otomatis.
- Menguji ketahanan Auto Layout: memastikan frame berstatus "Hug" melar proporsional dan teks berstatus "Fill" melakukan wrapping rapi tanpa clipping atau tumpang tindih.

### Aplikasi 4: Structural Code Handoff (Design-to-Code Engine)
- Mengompilasi hierarki AST frame Figma langsung ke kode komponen **Next.js 15 App Router / Tailwind CSS** produksi.
- Pemetaan 1:1 Auto Layout ke Flexbox/Grid Tailwind (`bun scripts/figma_handoff.ts`).

---

## 🧱 3. TUJUH (7) HUKUM BESI NATIVE FIGMA AUTO LAYOUT

1. **Master Artboard Sizing Law:** Master frame terluar (1080x1440) **WAJIB** `layoutMode = "NONE"`. Dilarang `layoutMode = "VERTICAL"` pada frame induk 1080x1440 agar konten tidak terdorong melebihi 3500px (anti-blank canvas bug). Auto Layout diterapkan pada komponen anak di dalamnya.
2. **Axis Sizing Modes:** Badges/Pills/Buttons wajib `AUTO` (Hug Content). Kolom responsif menggunakan parent `HORIZONTAL` dengan anak `layoutGrow = 1`. Kontainer kartu memakai `layoutMode = "VERTICAL"` dengan lebar tetap dan tinggi `AUTO`.
3. **Mandatory Typography Preload:** Wajib `await figma.loadFontAsync()` sebelum mengubah teks apa pun.
4. **Physical Solid Drop Shadow Law:** Buat balok bayangan fisik (`createRectangle`) di belakang frame dengan offset `+6px s/d +10px` warna Deep Navy `#012969` (anti-schema rejection).
5. **Upright Roman Typography:** Seluruh judul display wajib tegak (*upright roman*), 0 judul miring (*italic*).
6. **Viewport Synchronizer & Toasts:** Selalu panggil `figma.viewport.scrollAndZoomIntoView()` dan `figma.notify()`.
7. **Closed-Loop Vision QA:** Ekspor frame hasil edit ke PNG (`exportAsync`), simpan ke disk, dan verifikasi visualnya via `read_file`.

---

## 🚀 4. CLI COMMANDS & AUTOMATION SCRIPTS

```bash
# 1. Eksekusi skrip TypeScript kustom ke Figma Canvas via Relay:
bun scripts/figma-exec.ts "return figma.currentPage.name;"
bun scripts/figma-exec.ts -f ./task_script.ts

# 2. Audit Design System & Token Canvas Otomatis:
bun scripts/design_system_auditor.ts

# 3. Ekspor Frame Seleksi ke Kode Komponen Next.js 15 Tailwind:
bun scripts/figma_handoff.ts
```
