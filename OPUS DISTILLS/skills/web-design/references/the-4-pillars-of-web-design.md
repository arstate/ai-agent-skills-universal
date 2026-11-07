# 🏛️ The 4 Iron Pillars of S-Rank Web UI Engineering

Panduan teknis dan standar operasional implementasi 4 pilar arsitektur frontend modern untuk menghasilkan antarmuka web yang sangat bagus, rapi, cepat, dan berkonversi tinggi tanpa beban dependensi berlebih (*zero bloat*).

---

## ⚡ 1. Pilar 1: Styling Core (Tailwind CSS v3.4/v4 + OKLCH Colors)

### Mengapa Tailwind CSS + OKLCH?
- **Zero Runtime Overhead:** Seluruh class dikompilasi saat build time menjadi file CSS statis yang sangat kecil (< 15 KB gzipped), menjamin **LCP < 1.2s** dan skor PageSpeed 98+.
- **Uniform Perceptual Lightness:** Ruang warna sRGB/HSL memiliki kelemahan matematis (warna kuning terlihat jauh lebih terang daripada biru pada nilai L yang sama). OKLCH memperbaiki ini secara visual:
  ```css
  /* Base Palette OKLCH */
  --color-paper: oklch(0.985 0.008 85);       /* #F8F7F4 Alabaster Warm */
  --color-ink: oklch(0.18 0.015 260);          /* #141413 Deep Obsidian */
  --color-accent: oklch(0.65 0.22 35);         /* Vermillion Sharp Accent */
  --color-accent-ink: oklch(0.99 0 0);         /* Text di atas accent */
  --color-muted: oklch(0.55 0.02 260);        /* Secondary labels */
  --color-line: oklch(0.88 0.01 85);          /* 1px Hairline divider */
  ```
- **Kontras Presisi Otomatis:** Perhitungan kontras memenuhi aturan mutlak `|L_text - L_bg| >= 50%` untuk jaminan lolos WCAG AAA dan APCA Lc >= 60.
- **Haram Framework CSS Lama:** Dilarang menggunakan Bootstrap 5, Bulma, atau Foundation karena menyuntikkan ribuan class utilitas yang saling menimpa (`.container`, `.flex`, `.hidden`), ukuran file bengkak, dan membatasi fleksibilitas layout.

---

## 🧩 2. Pilar 2: Komponen Primitives (`shadcn/ui` & Radix UI)

### Mengapa Unstyled Copy-Paste > Monolithic UI Kits?
Monolithic UI Kits seperti **Ant Design, Material UI (MUI), Mantine, atau Vuetify** memiliki 4 kelemahan fatal untuk web komersial:
1. **Bundle Size Raksasa:** Memaksa instalasi library runtime runtime CSS-in-JS gajah (`@emotion/react`, `@emotion/styled`).
2. **Desain Kaku & Pasaran:** Tampilan web langsung terlihat generic khas sistem admin enterprise jadul.
3. **Konflik Styling:** Sangat sulit di-override menggunakan class Tailwind tanpa `!important` atau konfigurasi CSS layers yang rumit.
4. **Vendor Lock-in:** Ketika library mengubah API mayor, seluruh komponen aplikasi harus ditulis ulang.

### Keunggulan `shadcn/ui`:
- **Komponen Milik Anda 100%:** Kode komponen di-generate langsung ke folder `components/ui/` (Button, Dialog, Dropdown, Sheet, Accordion).
- **Radix UI Primitives:** Menangani logika aksesibilitas kompleks (WAI-ARIA, keyboard navigation Tab/Arrow, focus trapping, portal rendering, touch support).
- **Styling 100% Tailwind:** Menggunakan fungsi `cn()` (`clsx` + `tailwind-merge`) untuk penggabungan class dinamis yang aman dari konflik:
  ```tsx
  import { cn } from "@/lib/utils";

  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
  }

  export function Button({ className, variant = "primary", ...props }: ButtonProps) {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-transform active:scale-[0.98] disabled:opacity-50 h-11 px-6 rounded-full text-base",
          variant === "primary" && "bg-neutral-900 text-white hover:bg-neutral-800",
          variant === "secondary" && "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
          variant === "outline" && "border border-neutral-200 bg-transparent hover:bg-neutral-50",
          className
        )}
        {...props}
      />
    );
  }
  ```

---

## 🎨 3. Pilar 3: Ikon Tunggal (Lucide React)

### Mengapa Standardisasi 1 Library Ikon?
Mencampuradukkan 5 library ikon (Tabler, Phosphor, FontAwesome, Remix, Heroicons) dalam satu proyek adalah penyebab utama tampilan web terlihat berantakan dan amatir:
- Ketebalan garis (*stroke weight*) berbeda-beda (ada yang 1px, 1.5px, 2px, atau fill).
- Bounding box grid tidak selaras (16x16 vs 20x20 vs 24x24).
- Dependensi `package.json` membengkak dan sering memicu error build saat tree-shaking.

### Aturan Lucide React:
1. **Satu-satunya Sumber Ikon:** Gunakan `lucide-react` untuk semua kebutuhan UI di web Next.js/React.
2. **Konsistensi Stroke:**
   - Gunakan `strokeWidth={1.5}` untuk gaya editorial, elegan, atau minimalis berkelas.
   - Gunakan `strokeWidth={2.0}` untuk tombol aksi primer atau kontrol fungsional padat.
3. **Tree-Shaking Bersih:** Selalu import nama ikon secara spesifik:
   ```tsx
   import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
   ```
4. **Pewarnaan & Ukuran:** Selalu kendalikan ukuran dan warna melalui utility class Tailwind:
   ```tsx
   <ArrowRight className="w-5 h-5 text-neutral-900 group-hover:translate-x-1 transition-transform" />
   ```

---

## 👁️ 4. Pilar 4: Taste Engine (`Nutlope/hallmark` 48 Themes + 14-Pass Rubric)

### Standar Kualitas Visual & Anti-AI-Slop
Desain yang indah bukan berasal dari dekorasi berlebih, melainkan dari **pembatasan (*restraint*), hierarki skala tipografi, dan ruang bernapas**:

1. **4.3x Scale Contrast & Upright Roman Headings:**
   - Gunakan rasio ukuran dramatis: Headline Display `clamp(2.5rem, 6vw, 4.5rem)` berbanding Body text `16px–18px`.
   - **Haram Heading Miring:** Seluruh judul H1–H3 wajib tegak lurus (*upright roman*). Dilarang menyisipkan kata `<em>` miring di dalam judul.
   - Maksimal **2 baris per headline** (`<= 32 karakter`) dengan `text-balance`.
2. **40% Negative Space Breathing Room:**
   - Minimal 35%–40% area kanvas dibiarkan terbuka sebagai ruang istirahat visual mata.
   - Margin luar rata kiri-kanan (`padding-inline: clamp(1.5rem, 5vw, 5rem)`).
3. **Single Clear Focal Point per Viewport:**
   - Dalam lipatan layar (`1280x800` desktop atau `390x844` mobile), hanya boleh ada **1 elemen dominan yang menangkap pandangan pertama** (angka metrik besar, headline kontras, atau widget interaktif).
4. **Aturan Bahasa Bisnis Asli (Zero Meta-Jargon Leak):**
   - Dilarang keras membocorkan nama struktur CSS / layout ke teks yang dibaca pengunjung (seperti menulis *"Bento Grid"*, *"Hallmark Layout"*, atau *"Hero Section"* di navbar atau heading). Gunakan bahasa bisnis nyata pelanggan.
5. **Kepatuhan 58 Gate `sloplint`:**
   - `html, body { overflow-x: clip; }`
   - Zero 2-line button text (`whitespace-nowrap`).
   - `minmax(0, 1fr)` pada grid yang memuat gambar.
