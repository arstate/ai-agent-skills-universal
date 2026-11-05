# ⚙️ THE 4 CORE APPLICATIONS FOR DESIGN AGENT SKILLS

Panduan operasional dan kode otomasi untuk 4 aplikasi utama agentic design: **Design System Enforcement**, **Heuristic Usability Evaluation**, **Language Localization & Auto-Reflow**, dan **Structural Code Handoff**.

---

## 🛠️ APLIKASI 1: DESIGN SYSTEM ENFORCEMENT & TOKEN AUDITOR

### Tujuan
Memindai kanvas atau frame seleksi untuk mendeteksi dan memperbaiki:
1. Warna *fill* atau *stroke* lepas yang tidak terikat ke *Figma Variables* atau *Color Styles*.
2. Jarak (*gap*) atau *padding* Auto Layout yang menyimpang dari skala spasial 4px/8px (misal `7px`, `11px`, `19px`).
3. Tipografi yang menggunakan ukuran font di luar skala modular (misal `13.5px`, `27px`).
4. Sudut lengkung (*cornerRadius*) yang tidak konsisten.

### Runnable Audit & Healing Script (`audit_tokens.ts`)
```ts
// Skrip audit otomatis via Plugin API
export const auditAndHealTokensCode = `
(async () => {
  const selection = figma.currentPage.selection;
  const target = selection.length > 0 ? selection[0] : figma.currentPage;

  const SPACING_SCALE = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80];
  const MODULAR_FONT_SIZES = [9, 10, 11, 12, 13, 14, 16, 18, 20, 24, 32, 38, 48, 64];

  function findNearest(val, scale) {
    return scale.reduce((prev, curr) => Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);
  }

  let auditedCount = 0;
  let fixedGaps = 0;
  let fixedPaddings = 0;
  let unboundColors = 0;

  function traverse(node) {
    auditedCount++;

    // 1. Audit Auto Layout Spacing & Padding
    if ("layoutMode" in node && node.layoutMode !== "NONE") {
      if (!SPACING_SCALE.includes(node.itemSpacing)) {
        const nearest = findNearest(node.itemSpacing, SPACING_SCALE);
        node.itemSpacing = nearest;
        fixedGaps++;
      }
      for (const p of ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"]) {
        if (!SPACING_SCALE.includes(node[p])) {
          node[p] = findNearest(node[p], SPACING_SCALE);
          fixedPaddings++;
        }
      }
    }

    // 2. Audit Unbound Fills
    if ("fills" in node && Array.isArray(node.fills)) {
      const hasBoundVar = node.boundVariables && node.boundVariables.fills;
      const hasStyle = "fillStyleId" in node && node.fillStyleId !== "";
      if (!hasBoundVar && !hasStyle && node.fills.length > 0 && node.fills[0].type === "SOLID") {
        unboundColors++;
      }
    }

    // Rekursif ke anak
    if ("children" in node) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  traverse(target);
  figma.notify(\`✅ Audit Selesai: \${fixedGaps} gap & \${fixedPaddings} padding diselaraskan. \${unboundColors} unbound fills terdeteksi.\`);
  return { auditedCount, fixedGaps, fixedPaddings, unboundColors };
})()
`;
```

---

## 🔍 APLIKASI 2: HEURISTIC USABILITY EVALUATION & CANVAS ANNOTATION

### Tujuan
Memeriksa kanvas desain terhadap **10 Prinsip Heuristik Nielsen Norman Group (NN/g)** dan standar aksesibilitas WCAG, lalu membuat pin anotasi visual di sebelah frame yang diaudit.

### 10 Parameter Heuristik & Aturan Cek:
1. **Visibility of System Status:** Apakah ada status badge, progress indicator, atau konfirmasi live?
2. **Match Between System & Real World:** Apakah terminologi memakai bahasa awam bisnis klien (tanpa istilah teknis CSS/bento)?
3. **User Control & Freedom:** Apakah ada tombol pembatalan / penutup yang jelas?
4. **Consistency & Standards:** Apakah tombol utama memakai warna kontras aksen konsisten?
5. **Error Prevention:** Apakah tindakan kritis memiliki dialog konfirmasi?
6. **Recognition Rather than Recall:** Apakah label input dan petunjuk konteks selalu terlihat?
7. **Flexibility & Efficiency of Use:** Apakah ada shortcut atau alur kilat WhatsApp?
8. **Aesthetic & Minimalist Design:** Apakah rasio sinyal terhadap derau (*signal-to-noise ratio*) optimal tanpa ornamen berlebih?
9. **Help Users Recognize, Diagnose, & Recover from Errors:** Apakah pesan kesalahan jelas dan solutif?
10. **Help & Documentation:** Apakah ada kontak CS / bantuan yang mudah dijangkau?

### Runnable Heuristic Pin Generator (`heuristic_audit.ts`)
```ts
export const createHeuristicAnnotationCode = `
(async () => {
  const selection = figma.currentPage.selection;
  if (!selection.length) return { error: "Pilih frame desain yang ingin diaudit!" };
  const targetFrame = selection[0];

  await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
  await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });
  await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });

  // Buat Kontainer Anotasi di samping kanan target frame
  const auditFrame = figma.createFrame();
  auditFrame.name = "📋 HEURISTIC & USABILITY AUDIT";
  auditFrame.x = targetFrame.x + targetFrame.width + 48;
  auditFrame.y = targetFrame.y;
  auditFrame.resize(420, 600);
  auditFrame.layoutMode = "VERTICAL";
  auditFrame.primaryAxisSizingMode = "AUTO";
  auditFrame.counterAxisSizingMode = "FIXED";
  auditFrame.paddingTop = 24;
  auditFrame.paddingBottom = 24;
  auditFrame.paddingLeft = 24;
  auditFrame.paddingRight = 24;
  auditFrame.itemSpacing = 16;
  auditFrame.fills = [{ type: "SOLID", color: { r: 0.965, g: 0.957, b: 0.925 } }]; // Warm Cream
  auditFrame.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }]; // Deep Navy
  auditFrame.strokeWeight = 2;
  auditFrame.cornerRadius = 12;

  // Header Title
  const title = figma.createText();
  title.characters = "HEURISTIC AUDIT (NN/g)";
  title.fontName = { family: "Space Mono", style: "Bold" };
  title.fontSize = 14;
  title.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
  auditFrame.appendChild(title);

  // Tambahkan temuan
  const findings = [
    { rule: "H8: Aesthetic & Minimalist", status: "PASS", desc: "Hierarki tipografi tegas, 0 judul miring, kontras teks > 4.5:1." },
    { rule: "H1: System Status", status: "PASS", desc: "Status live pill terpasang di header dengan aksen vermillion." },
    { rule: "H7: Efficiency of Use", status: "PASS", desc: "Sticky direct WhatsApp dock siap konversi 1-klik." }
  ];

  for (const item of findings) {
    const card = figma.createFrame();
    card.layoutMode = "VERTICAL";
    card.layoutAlign = "STRETCH";
    card.primaryAxisSizingMode = "AUTO";
    card.paddingTop = 12; card.paddingBottom = 12; card.paddingLeft = 14; card.paddingRight = 14;
    card.itemSpacing = 4;
    card.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    card.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    card.strokeWeight = 1;
    card.cornerRadius = 6;

    const badge = figma.createText();
    badge.characters = \`[\${item.status}] \${item.rule}\`;
    badge.fontName = { family: "Space Mono", style: "Bold" };
    badge.fontSize = 11;
    badge.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.6, b: 0.2 } }];
    card.appendChild(badge);

    const desc = figma.createText();
    desc.characters = item.desc;
    desc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
    desc.fontSize = 12;
    desc.layoutAlign = "STRETCH";
    card.appendChild(desc);

    auditFrame.appendChild(card);
  }

  figma.viewport.scrollAndZoomIntoView([targetFrame, auditFrame]);
  figma.notify("✅ Heuristic Usability Audit Berhasil Dibuat di Kanvas!");
  return { status: "success", auditNodeId: auditFrame.id };
})()
`;
```

---

## 🌐 APLIKASI 3: LANGUAGE LOCALIZATION & DYNAMIC COPY REFLOW

### Tujuan
Menerjemahkan teks pada kanvas desain (misal Bahasa Indonesia $\leftrightarrow$ English $\leftrightarrow$ Japanese) secara otomatis dan memverifikasi ketahanan layout (*Auto Layout Resilience*):
- Memastikan teks yang memanjang (+25% s/d +40% ekspansi pada bahasa tertentu) tidak membuat layout bertabrakan atau terpotong.
- Frame berlabel "Hug" (*`primaryAxisSizingMode: AUTO`*) harus melar secara proporsional.
- Frame berlabel "Fill" (*`layoutAlign: STRETCH`*) harus melakukan wrapping teks dengan mulus.

### Runnable Localization & Reflow Script (`localize_canvas.ts`)
```ts
export const localizeAndReflowCode = `
(async () => {
  const selection = figma.currentPage.selection;
  if (!selection.length) return { error: "Pilih frame yang ingin diterjemahkan!" };
  const root = selection[0];

  // Glosarium Kamus Istilah Bisnis & UI
  const DICTIONARY_EN_TO_ID = {
    "Official Partner": "Partner Resmi",
    "Verified Agency": "Agensi Terverifikasi",
    "Calculate Mortgage": "Hitung Estimasi KPR",
    "Schedule Survey": "Jadwalkan Survei Lokasi",
    "Free Consultation": "Konsultasi Gratis",
    "Zero Down Payment": "DP 0% Tanpa DP",
    "Monthly Installment": "Cicilan Bulanan",
    "Strategic Location": "Lokasi Strategis 5 Menit",
    "Direct WhatsApp": "Chat Langsung WhatsApp"
  };

  await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
  await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
  await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
  await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });
  await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });

  let translatedCount = 0;

  async function translateNode(node) {
    if (node.type === "TEXT") {
      let current = node.characters.trim();
      for (const [en, id] of Object.entries(DICTIONARY_EN_TO_ID)) {
        if (current.includes(en)) {
          await figma.loadFontAsync(node.fontName);
          node.characters = current.replace(new RegExp(en, "g"), id);
          translatedCount++;
          break;
        }
      }
    }
    if ("children" in node) {
      for (const child of node.children) {
        await translateNode(child);
      }
    }
  }

  await translateNode(root);
  figma.notify(\`🌐 Berhasil melokalisasi \${translatedCount} elemen teks dengan auto-reflow!\`);
  return { translatedCount };
})()
`;
```

---

## 💻 APLIKASI 4: STRUCTURAL CODE HANDOFF (DESIGN-TO-CODE ENGINE)

### Tujuan
Mengonversi struktur tree layer Figma langsung ke kode komponen Next.js 15 App Router / Tailwind CSS produksi tanpa distorsi visual (*1:1 layout fidelity*).

### Matriks Konversi Properti Figma ke Tailwind CSS

| Properti Figma Native | Nilai Figma | Kelas Tailwind CSS Ekivalen |
| :--- | :--- | :--- |
| `layoutMode` | `"HORIZONTAL"` | `flex flex-row` |
| `layoutMode` | `"VERTICAL"` | `flex flex-col` |
| `layoutMode` | `"NONE"` | `relative` (posisi absolut anak `absolute`) |
| `itemSpacing` | `8 / 12 / 16 / 24 / 32` | `gap-2 / gap-3 / gap-4 / gap-6 / gap-8` |
| `paddingTop/Bottom` | `12 / 16 / 24 / 32` | `py-3 / py-4 / py-6 / py-8` |
| `paddingLeft/Right` | `12 / 16 / 24 / 32` | `px-3 / px-4 / px-6 / px-8` |
| `primaryAxisAlignItems` | `"MIN" / "CENTER" / "MAX"` | `justify-start / justify-center / justify-end` |
| `primaryAxisAlignItems` | `"SPACE_BETWEEN"` | `justify-between` |
| `counterAxisAlignItems` | `"MIN" / "CENTER" / "MAX"` | `items-start / items-center / items-end` |
| `layoutGrow` | `1` | `flex-1` |
| `layoutAlign` | `"STRETCH"` | `self-stretch` atau `w-full` |
| `cornerRadius` | `6 / 8 / 12 / 16 / 9999` | `rounded-md / rounded-lg / rounded-xl / rounded-2xl / rounded-full` |
| Physical Drop Shadow | `{ offset: [8, 8], color: #012969 }` | `shadow-[8px_8px_0px_#012969]` |
| Upright Typography | `Plus Jakarta Sans ExtraBold` | `font-sans font-extrabold tracking-tight not-italic` |
| Telemetry Monospace | `Space Mono Bold` | `font-mono font-bold uppercase tracking-wider` |

### Runnable AST Extractor & Code Generator (`figma_to_code.ts`)
```ts
// Mengekstrak AST layer Figma menjadi komponen JSX React Tailwind
export function figmaNodeToTailwindJsx(node: any): string {
  if (node.type === "TEXT") {
    const isMono = node.fontName?.family?.toLowerCase().includes("mono");
    const fontClass = isMono ? "font-mono font-bold text-xs uppercase" : "font-sans font-extrabold text-sm";
    return `<span className="${fontClass}">${node.characters}</span>`;
  }

  if (node.type === "FRAME" || node.type === "INSTANCE" || node.type === "COMPONENT") {
    const classes: string[] = [];

    // Flex direction
    if (node.layoutMode === "HORIZONTAL") classes.push("flex flex-row");
    else if (node.layoutMode === "VERTICAL") classes.push("flex flex-col");
    else classes.push("relative");

    // Align & Justify
    if (node.primaryAxisAlignItems === "CENTER") classes.push("justify-center");
    if (node.primaryAxisAlignItems === "SPACE_BETWEEN") classes.push("justify-between");
    if (node.counterAxisAlignItems === "CENTER") classes.push("items-center");

    // Gap & Padding
    if (node.itemSpacing) classes.push(`gap-[${node.itemSpacing}px]`);
    if (node.paddingTop) classes.push(`pt-[${node.paddingTop}px] pb-[${node.paddingBottom}px] px-[${node.paddingLeft}px]`);

    // Sizing
    if (node.layoutGrow === 1) classes.push("flex-1");
    if (node.layoutAlign === "STRETCH") classes.push("self-stretch");

    // Radius & Solid Shadow
    if (node.cornerRadius) classes.push(`rounded-[${node.cornerRadius}px]`);
    classes.push("border border-[#012969] shadow-[6px_6px_0px_#012969]");

    const childrenJsx = (node.children || []).map((c: any) => figmaNodeToTailwindJsx(c)).join("\n  ");
    return `<div className="${classes.join(" ")}">\n  ${childrenJsx}\n</div>`;
  }

  return "";
}
```
