# Progressive SVG Engineering Rules & Planar Shading Standards
## Dari 2-Pass Dasar Menuju 4-Pass Master Retouch

Generasi ilustrasi vektor komersial mutlak memerlukan tahapan bertahap untuk mencegah deviasi koordinat, artefak secant, dan kekacauan komposisi. File ini merinci standar pencahayaan planar solid heksadesimal murni tanpa transparansi alpha.

---

## 🎨 1. Planar Volumetric Shading (Bukan Belah Tengah 50/50 Mekanis!)

* **Kesalahan Fatal Pemula:** Memotong objek semetris tepat di garis tengah `x = 0` secara kaku sehingga pilar atau gadget terlihat seperti permen belang atau jeruji besi.
* **Standar Profesional:**
  1. **Layered Facets & Overlaps:** Gunakan bidang bertingkat (misal: saku dompet melengkung alami, kartu fanned saling menimpa, pintu gerbang recessed ke dalam).
  2. **Architectural Lighting (3-Tone Fluting):** Pada silinder, pilar, atau bar chart, gunakan 3 nada warna: muka kiri sunlit (`#3B82F6`), highlight fluting pinstripe di tengah (`#60A5FA`), dan muka kanan shaded (`#1D4ED8`).
  3. **Under-Lid & Cast Shadow Bars:** Pasang pita bayangan solid gelap di bawah eave atap, lid kotak, atau bibir kartu (`#0F172A` atau `#1E293B`) untuk memberikan kesan melayang dan kedalaman optik.
  4. **Zero Alpha Opacity:** Karena PostScript DSC 3.0 EPS merender atribut `opacity` menjadi bitmap resolusi rendah (`cairo_image`), **HARAM menggunakan transparansi alpha**. Seluruh ilusi bayangan dan pendaran wajib berupa swatch Hex solid 100% (misal `#CBD5E1` untuk bayangan abu-abu, `#D1FAE5` untuk aura mint).

---

## 💎 2. Specular Highlights & Glints

* Tambahkan aksen pantulan sabit (*crescent highlight*) pada koin emas (`#FEF08A` di atas `#D97706`), tepi atas saku kulit (`#60A5FA`), dan garis pantulan kaca layar gadget (`#FFFFFF`).
* Tambahkan sparkle 4 titik emas (`#F59E0B`) dengan jarak bebas aman (>= 50px) dari tepi objek utama.

---

## 🏛️ 3. Transisi ke Sistem 4-Pass (v4.0)

Untuk proyek produksi komersial siap submit Adobe Stock, gunakan selalu alur 4 tahap penuh sebagaimana diuraikan dalam `references/four-pass-retouch-plan.md`:
1. `*_pass1_skeleton.svg`: Kunci siluet dan massa optik.
2. `*_pass2_shading.svg`: Piringan latar serasi terkalibrasi dan bayangan planar.
3. `*_pass3_details.svg`: Kapitel pilar, chip EMV, gelombang NFC, UI gadget, dan data nodes.
4. `*_pass4_final.svg`: Eliminasi secant overhang via arc-clipping, verifikasi tangent >= 50px, dan audit 10-Gate.
