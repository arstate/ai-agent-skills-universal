# 📐 FIGMA AUTO LAYOUT ENGINE & SPATIAL HIERARCHY GUIDE

Panduan teknis dan standar kode untuk implementasi **Figma Native Auto Layout (`layoutMode`)** menggunakan Figma Plugin API melalui `figma-bridge`. Menjamin layout rapi, presisi matematis, responsif terhadap perubahan teks, dan bebas bug *vertical overflow / stretching*.

---

## ⛔ HUKUM BESI #1: MASTER ARTBOARD SIZING LAW (ANTI-VERTICAL-STRETCHING)

> **DILARANG KERAS MENGESET `layoutMode = "VERTICAL"` PADA MASTER ARTBOARD UTAMA (1080x1440)!**

### Mengapa ini fatal?
1. Jika artboard terluar (1080x1440) diset `layoutMode: "VERTICAL"`, Figma akan menumpuk seluruh elemen anak (background grid, spotlight orb, header, headline, bento box, cards, footer) secara berurutan ke bawah.
2. Akibatnya, elemen-elemen di bawah akan terdorong hingga koordinat `y > 3500px`. Karena artboard memiliki tinggi tetap `1440px` dan `clipsContent = true`, seluruh konten di bawah hero akan lenyap terpotong di luar kanvas (blank canvas bug!).
3. **Aturan Baku:**
   - **Master Artboard Terluar (1080x1440):** Wajib menggunakan `layoutMode = "NONE"`. Elemen-elemen level tertinggi diposisikan menggunakan koordinat absolut yang terkalibrasi (`y: 36` header, `y: 115` headline, `y: 280` pipeline, `y: 665` section divider, `y: 735` cards, `y: 1334` footer).
   - **Komponen Fungsional di Dalamnya:** **WAJIB 100% menggunakan Auto Layout** (`layoutMode = "HORIZONTAL"` atau `"VERTICAL"`).

---

## 🛠️ 1. PROPERTY MATRIX FIGMA AUTO LAYOUT (PLUGIN API)

| Property | Value Options | Fungsi & Penggunaan |
| :--- | :--- | :--- |
| `layoutMode` | `"NONE"`, `"HORIZONTAL"`, `"VERTICAL"` | Mengaktifkan Auto Layout horizontal (baris) atau vertikal (kolom). |
| `primaryAxisSizingMode` | `"FIXED"`, `"AUTO"` | `"AUTO"` = **Hug contents** pada sumbu utama. `"FIXED"` = Lebar/tinggi terkunci manual. |
| `counterAxisSizingMode` | `"FIXED"`, `"AUTO"` | `"AUTO"` = **Hug contents** pada sumbu silang. `"FIXED"` = Lebar/tinggi terkunci manual. |
| `primaryAxisAlignItems` | `"MIN"`, `"CENTER"`, `"MAX"`, `"SPACE_BETWEEN"` | Justify content (rata kiri/atas, tengah, rata kanan/bawah, atau bagi rata). |
| `counterAxisAlignItems` | `"MIN"`, `"CENTER"`, `"MAX"` | Align items (rata atas/kiri, tengah, rata bawah/kanan). |
| `layoutAlign` | `"INHERIT"`, `"STRETCH"` | Di dalam parent Auto Layout, `"STRETCH"` membuat anak merentang penuh selebar parent. |
| `layoutGrow` | `0`, `1` | Di dalam parent Auto Layout, `1` membuat anak membesar mengisi sisa ruang (setara `flex-grow: 1`). |
| `itemSpacing` | `number` (e.g. `8`, `12`, `16`, `24`) | Jarak antar elemen anak (*gap*). |
| `paddingLeft`, `paddingRight` | `number` (e.g. `16`, `24`, `32`) | Bantalan horizontal sisi kiri dan kanan. |
| `paddingTop`, `paddingBottom` | `number` (e.g. `12`, `16`, `20`) | Bantalan vertikal sisi atas dan bawah. |

---

## 🧱 2. TEMPLATE KODE KOMPONEN AUTO LAYOUT

### A. Badge Pill & Button (Hug Contents 100%)
Membuat badge status, pill kategori, atau tombol CTA yang otomatis menyesuaikan panjang teks tanpa padding jebol:
```ts
const pill = figma.createFrame();
pill.layoutMode = "HORIZONTAL";
pill.primaryAxisSizingMode = "AUTO";   // Hug width
pill.counterAxisSizingMode = "AUTO";  // Hug height
pill.primaryAxisAlignItems = "CENTER";
pill.counterAxisAlignItems = "CENTER";
pill.itemSpacing = 8;
pill.paddingLeft = 14;
pill.paddingRight = 14;
pill.paddingTop = 6;
pill.paddingBottom = 6;
pill.cornerRadius = 999;
pill.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
pill.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
pill.strokeWeight = 1.5;

// Status Dot
const dot = figma.createEllipse();
dot.resize(8, 8);
dot.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.75, b: 0.4 } }];
pill.appendChild(dot);

// Text
const txt = figma.createText();
txt.fontName = { family: "Space Mono", style: "Bold" };
txt.characters = "OFFICIAL DJADI CREATIVE";
txt.fontSize = 9.5;
txt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
pill.appendChild(txt);
```

---

### B. Header Bar (Full-Width Space-Between)
Header bar selebar kanvas dengan logo di kiri dan kategori pill di kanan:
```ts
const headerBar = figma.createFrame();
headerBar.resize(920, 50);
headerBar.x = 80;
headerBar.y = 36;
headerBar.layoutMode = "HORIZONTAL";
headerBar.primaryAxisSizingMode = "FIXED"; // Tetap 920px
headerBar.counterAxisSizingMode = "AUTO";  // Hug height
headerBar.primaryAxisAlignItems = "SPACE_BETWEEN";
headerBar.counterAxisAlignItems = "CENTER";
headerBar.fills = []; // Transparan

// Tambahkan Logo & Pill
headerBar.appendChild(logoNode);
headerBar.appendChild(categoryPillNode);
masterArtboard.appendChild(headerBar);
```

---

### C. 2-Column Responsive Feature Row (Auto-Fill Columns)
Membuat baris fitur dengan 2 kolom seimbang (kiri & kanan) di dalam kartu:
```ts
const row = figma.createFrame();
row.layoutMode = "HORIZONTAL";
row.layoutAlign = "STRETCH";               // Rentangkan selebar kartu
row.primaryAxisSizingMode = "FIXED";        // Lebar ikut parent
row.counterAxisSizingMode = "AUTO";         // Tinggi ikut konten tertinggi
row.primaryAxisAlignItems = "SPACE_BETWEEN";
row.counterAxisAlignItems = "START";
row.itemSpacing = 24;
row.fills = [];

// Kolom Kiri
const colLeft = figma.createFrame();
colLeft.layoutMode = "VERTICAL";
colLeft.layoutGrow = 1;                     // Isi 50% lebar
colLeft.primaryAxisSizingMode = "AUTO";
colLeft.counterAxisSizingMode = "AUTO";
colLeft.itemSpacing = 8;
colLeft.fills = [];

// Kolom Kanan
const colRight = figma.createFrame();
colRight.layoutMode = "VERTICAL";
colRight.layoutGrow = 1;                    // Isi 50% lebar
colRight.primaryAxisSizingMode = "AUTO";
colRight.counterAxisSizingMode = "AUTO";
colRight.itemSpacing = 8;
colRight.fills = [];

row.appendChild(colLeft);
row.appendChild(colRight);
```

---

### D. Pricing / Feature Card (Vertical Stack dengan Rapat Terukur)
Kartu dengan judul, harga, tag kuota, dan daftar checklist yang rapi otomatis:
```ts
const card = figma.createFrame();
card.resize(920, 200); // Lebar fixed 920px
card.x = 80;
card.y = 735;
card.layoutMode = "VERTICAL";
card.primaryAxisSizingMode = "AUTO";   // Tinggi otomatis memeluk konten (HUG)
card.counterAxisSizingMode = "FIXED";  // Lebar tetap 920px
card.paddingLeft = 28;
card.paddingRight = 28;
card.paddingTop = 22;
card.paddingBottom = 22;
card.itemSpacing = 16;
card.cornerRadius = 12;
card.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
card.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
card.strokeWeight = 2;

// Tambahkan elemen ke dalam card secara berurutan:
// 1. Header Baris (Tag Kiri + Badge Kanan)
// 2. Baris Judul & Harga (Space Between)
// 3. Divider Garis Tipis
// 4. Baris 2-Kolom Checklist
```

---

## 📐 3. STANDAR TIPOGRAFI & TEXT-AUTO-RESIZE PADA AUTO LAYOUT

1. **Text Node di Dalam Auto Layout:**
   - Untuk baris judul yang fleksibel lebarnya:
     ```ts
     textNode.textAutoResize = "HEIGHT"; // Auto wrap baris ke bawah
     textNode.layoutAlign = "STRETCH";   // Ikuti lebar kontainer
     ```
   - Untuk angka harga atau badge satu baris:
     ```ts
     textNode.textAutoResize = "WIDTH_AND_HEIGHT"; // 1 baris murni, jangan patah
     ```
2. **Font Preload Mutlak:**
   - Sebelum menyentuh properti `characters` atau `fontSize`, **WAJIB** load font terlebih dahulu:
     ```ts
     await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
     await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
     await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
     await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });
     await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });
     ```
