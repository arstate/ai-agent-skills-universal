# Concrete Bad vs. Good Design & Code Examples (Anti-Slop Reference Guide)

Use this guide whenever building or reviewing UI, landing pages, slides, or visual components. Every example contrasts **❌ DESAIN JELEK (Generic AI Slop / Amateur)** against **✅ DESAIN BAGUS (S-Rank Agency Craft)** with the exact technical & psychological reason (`Why`).

---

## 1. Emil Kowalski's Mandatory `| Before | After | Why |` UI Polish Matrix

| Elemen UI / CSS | ❌ Before (Desain Jelek / Kaku / Slop) | ✅ After (Desain Bagus / Berkelas) | Why (Alasan Teknis & Psikologis) |
| :--- | :--- | :--- | :--- |
| **Transisi CSS** | `transition: all 300ms ease-in;` | `transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1), opacity 180ms ease-out;` | `transition: all` memicu *layout thrashing*; `ease-in` terasa lambat di awal klik. Kurva `cubic-bezier(0.23,1,0.32,1)` langsung merespons jempol dalam 16ms pertama. |
| **Tombol Saat Ditekan (`:active`)** | Tidak ada perubahan saat diklik (mati rasa) | `active:scale-[0.97]` (`transform: scale(0.97)`) selama `140ms` | Memberi umpan balik fisik (*tactile feedback*) seolah tombol benar-benar merespons sentuhan jari. |
| **Animasi Muncul (Modal/Popover)** | `transform: scale(0);` (muncul dari titik nol) | `transform: scale(0.95); opacity: 0;` + `transform-origin: var(--transform-origin)` | Tidak ada benda di dunia nyata yang muncul dari volume 0%. Mulai dari `0.95` terasa organik dan tidak mengagetkan mata. |
| **Hover di Layar HP (Touchscreen)** | `.card:hover { transform: translateY(-6px); }` | `@media (hover: hover) and (pointer: fine) { .card:hover { ... } }` | Di layar HP, `:hover` nyangkut setelah disentuh (*sticky hover bug*). Wajib dikunci hanya untuk perangkat ber-mouse/trackpad. |
| **Bentuk Sudut Tombol & Kartu** | Semua memakai `rounded-xl` (`12px-16px`) tanggung | Pilih tegas: `rounded-none` (`0px` Arsitektural) ATAU `rounded-full` (Kapsul) | Studi 247 situs membuktikan 52% situs terbaik memakai sudut tegas `0px-2px` dan 23% kapsul penuh; radius `12px` adalah ciri khas template AI murahan. |
| **Bingkai Foto di Latar Terang** | `<img src="..." className="w-full" />` tanpa batas | Tambahkan `ring-1 ring-inset ring-black/10 dark:ring-white/10` | Mencegah tepi foto yang berwarna terang menyatu/bocor ke warna latar halaman (*optical boundary*). |
| **Angka Harga & Statistik** | Font proporsional biasa (lebar angka berubah-ubah) | Wajib `tabular-nums` (`font-variant-numeric: tabular-nums`) | Agar angka harga `Rp 1.450.000` dan `Rp 890.000` sejajar lurus vertikal saat dibandingkan di tabel atau kalkulator. |

---

## 2. Perbandingan Anatomi Layout: Hero Section (Above the Fold)

### ❌ CONTOH JELEK (Tipikal AI Slop - Skor < 5.5/10)
```tsx
// JANGAN PERNAH BUAT SEPERTI INI:
// 1. Pakai emoji roket/api, 2. Gradien ungu-biru, 3. Judul 4 baris kepanjangan,
// 4. Ada 3 tombol warna-warni yang bikin bingung, 5. Teks rata tengah semua tanpa bobot visual.
export function BadHeroSlop() {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 py-20 text-center text-white">
      <span className="rounded-full bg-white/20 px-4 py-1 text-xs">🚀 SOLUSI TERBAIK MASA KINI ✨</span>
      <h1 className="mx-auto mt-4 max-w-xl text-4xl font-bold">
        Selamat Datang di Platform Digital Terbaik dan Terpercaya untuk Meningkatkan Omzet Bisnis Anda Secara Maksimal
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-gray-200">
        Kami hadir memberikan pelayanan profesional dengan teknologi canggih yang siap membantu kebutuhan Anda.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button className="rounded-xl bg-pink-500 px-6 py-3">Daftar Sekarang</button>
        <button className="rounded-xl bg-yellow-500 px-6 py-3">Pelajari Lebih Lanjut</button>
        <button className="rounded-xl bg-green-500 px-6 py-3">Hubungi Kami</button>
      </div>
    </div>
  );
}
```

### ✅ CONTOH BAGUS (Standar `taste-skill v2` & `Impeccable` - Skor 9.2/10)
```tsx
// KENAPA INI BAGUS:
// 1. Judul <= 2 baris (~32 karakter), rasio ukuran 4.3x terhadap body, text-balance aktif.
// 2. Satu aksi primer tegas (active:scale-[0.97]), 0 emoji (pakai Lucide icon presisi).
// 3. Kiri: Klaim & Bukti Nyata; Kanan: "One Live Thing" (Simulasi Interaktif Nyata) + Foto 3:4 ber-ring-inset.
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export function GoodHeroEditorial() {
  return (
    <section className="bg-[#F8F7F4] text-[#141413] border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          {/* Kolom Kiri (7 Kolom): Judul 2 Baris + Kalimat Penjelas Langsung */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-balance font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-[-0.03em] leading-[0.98]">
              Hunian Tropis Sidoarjo, Cicilan Mulai 3 Jutaan.
            </h1>
            <p className="text-pretty max-w-[54ch] text-base sm:text-lg leading-[1.6] text-stone-600">
              Unit siap huni 10 menit dari Tol Waru dengan garansi pengembalian UTJ 100% jika KPR ditolak bank mitra.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <a
                href="#simulasi-kpr"
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 bg-[#141413] px-7 py-3.5 text-sm font-semibold text-[#F8F7F4] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] hover:bg-stone-800"
              >
                <span>Hitung Cicilan & Cek Unit via WA</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <div className="inline-flex items-center gap-2 text-xs text-stone-600 tabular-nums">
                <ShieldCheck className="h-4 w-4 text-emerald-800 shrink-0" strokeWidth={1.75} />
                <span>Sisa 4 unit tahap 2 (Update Oktober 2026)</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan (5 Kolom): Foto Asli Rasio 3:4 dengan Inner Optical Ring */}
          <div className="lg:col-span-5">
            <figure className="relative aspect-[3/4] w-full overflow-hidden bg-stone-200 ring-1 ring-inset ring-black/10">
              <img
                src="/media/img/f_auto,q_auto:good,w_1080,c_limit/cluster-hero.webp"
                alt="Fasad Cluster Tropis Sidoarjo"
                width={720}
                height={960}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 text-xs text-stone-100 flex justify-between tabular-nums">
                <span>Tipe 45/90 — Sukodono</span>
                <span>SHM & IMB Lengkap</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 3. Perbandingan Seksi Fitur: "3 Kartu Ikon Klise" vs "Editorial Split + Live Widget"

### ❌ CONTOH JELEK (3 Kartu Ikon Bulat Identik - Dipakai 28% Web Skor Rendah vs 1% Web Terbaik)
- **Ciri Khas Buruk:** Tiga kotak putih sejajar dengan lingkaran warna di atasnya, berisi judul generik (*"Cepat"*, *"Aman"*, *"Terjangkau"*) dan teks 2 kalimat yang tidak ada angkanya.
- **Kenapa Ditolak:** Mata pengunjung langsung melewati (*banner blindness*) karena terlihat 100% seperti template gratis.

### ✅ CONTOH BAGUS (Asymmetric Bento / Editorial Proof Table + "One Live Thing")
- **Ciri Khas Bagus:**
  - Sisi Kiri (6 Kolom): **Widget Interaktif Nyata ("One Live Thing")**—misal penggeser (*slider*) DP & Tenor KPR yang langsung menghitung angsuran bulanan secara *real-time* (`tabular-nums`), atau kalkulator estimasi penghematan biaya iklan.
  - Sisi Kanan (6 Kolom): **Tabel Perbandingan Fakta Nyata** (Cara Lama vs Sistem Baru) dengan angka spesifik, tanpa ikon hiasan.

---

## 4. Perbandingan Desain Non-Web (Slide Deck 16:9, Carousel IG 3:4, & Grafik Data)

| Media | ❌ Desain Jelek (Amateur Slop) | ✅ Desain Bagus (`taste-design` Standard) |
| :--- | :--- | :--- |
| **Slide Presentasi 16:9** | Judul topik pasif (*"Latar Belakang"*), 8 bullet points panjang ukuran 14pt yang memenuhi 90% layar, tanpa margin aman. | **Judul Assertion Aktif** (*"Biaya Akuisisi Turun 62% Lewat Video Hook 2 Detik"*), 1 grafik/tabel fokus utama, **40% Negative Space**, rasio judul:body = `3.5 : 1`. |
| **Carousel IG 3:4 (1080x1440)** | Teks menabrak tepi kanan-kiri kanvas, memakai >3 jenis font, stiker/emoji bertumpuk, dan kata terakhir judul menggantung sendirian. | **Safe Margin 8-10%** (`86px` kiri-kanan), teks rata kiri pada 1 poros vertikal tegas, kontras tinggi WCAG AAA, dan setiap baris judul seimbang (`<= 2-3 baris`). |
| **Grafik Data / Chart** | Pie chart 3D warna pelangi dengan legenda terpisah di pojok dan garis grid tebal. | **Horizontal Bar / Clean Line Chart (Tufte Style):** Hanya **1 batang utama** yang diberi warna aksen tajam, batang pembanding diberi warna abu netral (`#CBD5E1`), angka langsung ditempel di ujung batang (*direct label*). |
