# Matematika Seamless Tiling & Feather Blending (Zero-OOM, Zero-Seam)

Dokumen ini menjelaskan formulasi matematis dan algoritma rekonstruksi gambar modular untuk mencegah *CUDA Out of Memory (OOM)* pada GPU 6GB VRAM saat memproses kanvas berukuran masif (4K/8K).

---

## 1. Latar Belakang Masalah (Memory Footprint 4K Forward Pass)

Sebuah gambar 4K memiliki dimensi $4096 \times 2304$ piksel.
Jika diproses sekaligus (non-tiled) melalui model Transformer (seperti SCHAT/HAT):
- Tensor input: $(1, 3, 1024, 576)$
- Alokasi memori untuk matriks intermediate self-attention: $O(N^2)$ di mana $N = H \times W$.
- Kebutuhan VRAM melonjak hingga $> 14\text{ GB}$, melampaui kapasitas 6 GB GTX 1660 SUPER dan memicu `CUDA out of memory. Tried to allocate...`.

---

## 2. Strategi Tiling Modular (256x256 Tiles with 24px Overlap)

Kanvas input $H \times W$ dipotong menjadi kisi sub-gambar (tile) berukuran $S \times S$ dengan batas overlap $P$:
- `tile_size` ($S$) = $256$ piksel.
- `tile_pad` ($P$) = $24$ piksel.
- `step` = $S - 2P = 208$ piksel.
- `scale` ($K$) = $4$ (atau $2$).

Untuk setiap titik acuan $(y, x)$:
$$\text{top}_{\text{pad}} = \max(0, y - P)$$
$$\text{left}_{\text{pad}} = \max(0, x - P)$$
$$\text{bottom}_{\text{pad}} = \min(H, y + \text{step} + P)$$
$$\text{right}_{\text{pad}} = \min(W, x + \text{step} + P)$$

---

## 3. Formulasi Masker Raised-Cosine (Hann Window)

Setiap tile yang dihasilkan oleh model memiliki dimensi output $(T_h, T_w, 3)$.
Untuk menghilangkan batas kotak sambungan (*boundary seam lines*) dan mencegah diskontinuitas turunan (kink/slope jump), masker bobot gradien 2D $M(u, v)$ berbasis raised-cosine ($\sin^2 / \cos^2$) diterapkan:

### Masker Sumbu Vertikal ($M_y$):
- Jika tile berada di tengah atau bawah (memiliki overlap di atas, $t_{\text{top}} > 0$):
  $$M_y(u) = \sin^2\left(\frac{\pi u}{2 P_{\text{out}}}\right) \quad \text{untuk } 0 \le u < P_{\text{out}}$$
- Jika tile memiliki overlap di bawah ($t_{\text{bot}} < H$):
  $$M_y(u) = \cos^2\left(\frac{\pi (u - (T_h - P_{\text{out}}))}{2 P_{\text{out}}}\right) \quad \text{untuk } T_h - P_{\text{out}} \le u < T_h$$
- Area interior tengah:
  $$M_y(u) = 1.0$$

### Masker Sumbu Horizontal ($M_x$):
- Jika tile memiliki overlap di kiri ($t_{\text{left}} > 0$):
  $$M_x(v) = \sin^2\left(\frac{\pi v}{2 P_{\text{out}}}\right) \quad \text{untuk } 0 \le v < P_{\text{out}}$$
- Jika tile memiliki overlap di kanan ($t_{\text{right}} < W$):
  $$M_x(v) = \cos^2\left(\frac{\pi (v - (T_w - P_{\text{out}}))}{2 P_{\text{out}}}\right) \quad \text{untuk } T_w - P_{\text{out}} \le v < T_w$$
- Area interior tengah:
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

### Keunggulan Matematis Raised-Cosine:
1. **0% Seams & $C^1$ Continuity:** Karena $\sin^2(t) + \cos^2(t) = 1.0$, dan $\left.\frac{d}{dt}\sin^2(t)\right|_{t=0} = \left.\frac{d}{dt}\sin^2(t)\right|_{t=\pi/2} = 0$, gradien pembobotan bertransisi secara mulus tanpa ada lonjakan turunan/sudut patah pada batas tile.
2. **Kestabilan Warna & Luminance:** Tidak ada distorsi kontras atau warna pada pertemuan batas sambungan.
3. **Efisiensi Memori:** Konsumsi VRAM puncak di GPU GTX 1660 SUPER tetap stabil di angka ~1.2 GB hingga 2.4 GB, memungkinkan pemrosesan gambar ukuran 8K atau 12K sekalipun tanpa OOM.
