# Matematika Seamless Tiling & Feather Blending (Zero-OOM, Zero-Seam)

Dokumen ini menjelaskan formulasi matematis dan algoritma rekonstruksi gambar modular untuk mencegah *CUDA Out of Memory (OOM)* pada GPU 6GB VRAM saat memproses kanvas berukuran masif (4K/8K).

---

## 1. Latar Belakang Masalah (Memory Footprint 4K Forward Pass)

Sebuah gambar 4K memiliki dimensi $4096 \times 2304$ piksel.
Jika diproses sekaligus (non-tiled) melalui model Transformer (seperti SCHAT):
- Tensor input: $(1, 3, 1024, 576)$
- Alokasi memori untuk matriks intermediate self-attention: $O(N^2)$ di mana $N = H \times W$.
- Kebutuhan VRAM melonjak hingga $> 14\text{ GB}$, melampaui kapasitas 6 GB GTX 1660 SUPER dan memicu `CUDA out of memory. Tried to allocate...`.

---

## 2. Strategi Tiling Modular (256x256 Tiles with 24px Overlap)

Kanvas input $H \times W$ dipotong menjadi kisi sub-gambar (tile) berukuran $S \times S$ dengan batas overlap $P$:
- `tile_size` ($S$) = $256$ piksel.
- `tile_pad` ($P$) = $24$ piksel.
- `step` = $S - 2P = 208$ piksel.
- `scale` ($K$) = $4$.

Untuk setiap titik acuan $(y, x)$:
$$\text{top}_{\text{pad}} = \max(0, y - P)$$
$$\text{left}_{\text{pad}} = \max(0, x - P)$$
$$\text{bottom}_{\text{pad}} = \min(H, y + \text{step} + P)$$
$$\text{right}_{\text{pad}} = \min(W, x + \text{step} + P)$$

---

## 3. Formulasi Masker Feather Kosinus / Linear

Setiap tile yang dihasilkan oleh model memiliki dimensi output $(T_h, T_w, 3)$.
Untuk menghilangkan batas kotak sambungan (*boundary seam lines*), masker bobot gradien 2D $M(u, v)$ diterapkan:

### Masker Sumbu Vertikal ($M_y$):
- Jika tile berada di tengah (memiliki overlap di atas):
  $$M_y(u) = \frac{u}{P_{\text{out}}} \quad \text{untuk } 0 \le u < P_{\text{out}}$$
- Jika tile memiliki overlap di bawah:
  $$M_y(u) = 1.0 - \frac{u - (T_h - P_{\text{out}})}{P_{\text{out}}} \quad \text{untuk } T_h - P_{\text{out}} \le u < T_h$$
- Area tengah:
  $$M_y(u) = 1.0$$

### Masker Sumbu Horizontal ($M_x$):
- Jika tile memiliki overlap di kiri:
  $$M_x(v) = \frac{v}{P_{\text{out}}} \quad \text{untuk } 0 \le v < P_{\text{out}}$$
- Jika tile memiliki overlap di kanan:
  $$M_x(v) = 1.0 - \frac{v - (T_w - P_{\text{out}})}{P_{\text{out}}} \quad \text{untuk } T_w - P_{\text{out}} \le v < T_w$$
- Area tengah:
  $$M_x(v) = 1.0$$

### Masker 2D Total:
$$M(u, v) = M_y(u) \times M_x(v)$$

---

## 4. Akumulasi & Normalisasi Bobot

Canvas output akumulator $O$ dan kanvas bobot akumulator $\Omega$ berukuran $(H \times K, W \times K, 3)$ diinisialisasi dengan 0:

Untuk setiap tile hasil upscale $T_i$:
$$O[\text{region}_i] \mathrel{+}= T_i \odot M_i$$
$$\Omega[\text{region}_i] \mathrel{+}= M_i$$

Setelah seluruh tile selesai diproses:
$$O_{\text{final}} = \frac{O}{\max(\Omega, 10^{-6})}$$
$$O_{\text{clipped}} = \text{clip}(O_{\text{final}}, 0.0, 1.0)$$

### Keunggulan Matematis:
1. **0% Seams:** Pergeseran bobot dari 0.0 ke 1.0 secara linier menjamin bahwa pada perbatasan sambungan, jumlah total bobot kedua tile yang tumpang tindih selalu tepat sama dengan 1.0:
   $$M_{\text{tile}_1}(x) + M_{\text{tile}_2}(x) = (1 - \alpha) + \alpha = 1.0$$
2. **Kestabilan Warna:** Tidak ada perubahan luminance atau chrominance pada pertemuan batas tile.
3. **Efisiensi Memori:** Konsumsi VRAM puncak di GPU GTX 1660 SUPER tetap stabil di angka ~1.2 GB hingga 2.4 GB, memungkinkan pemrosesan gambar ukuran 8K atau 12K sekalipun tanpa OOM.
