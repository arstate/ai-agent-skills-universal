# Spesifikasi Adobe Stock & Panduan Metadata IPTC/XMP via Exiv2

Dokumen ini adalah standar kepatuhan teknis untuk penerimaan aset fotografi dan AI upscaled image di platform microstock terkemuka (Adobe Stock, Freepik, Shutterstock).

---

## 1. Syarat Teknis Adobe Stock Contributor

| Parameter | Standar Minimal | Standar Produksi Skill Ini |
|---|---|---|
| **Resolusi Minimal** | 4.0 Megapiksel (MP) | **9.4 MP s/d 16.7 MP** (Sangat Aman) |
| **Dimensi Piksel (Sisi Terpanjang)** | >= 2400 px | **4096 px** |
| **Format File** | JPEG / JPG | JPEG |
| **Kualitas Kompresi** | Kualitas Maksimal (Minimal artifact) | `Quality: 98`, `Subsampling: 0` (4:4:4) |
| **Color Space** | sRGB | sRGB / Adobe RGB (1998) |
| **Ukuran File Maksimal** | 45 MB | ~4.5 MB s/d 14 MB (Optimal) |

---

## 2. Matriks Aspek Rasio Standar 4X Upscale

| Rasio | Dimensi Input (1K) | Dimensi Output (4X) | Total Megapiksel | Target Penggunaan |
|---|---|---|---|---|
| **16:9 Landscape** | `1024 x 576` px | **`4096 x 2304` px** | 9.4 MP | Hero Web, Desktop Wallpaper, Video B-Roll |
| **1:1 Square** | `1024 x 1024` px | **`4096 x 4096` px** | 16.7 MP | Feed Medsos, Album Art, Iconography |
| **3:4 Portrait** | `768 x 1024` px | **`3072 x 4096` px** | 12.5 MP | Poster Komersial, Editorial, Vertical Ad |
| **4:3 Standard** | `1024 x 768` px | **`4096 x 3072` px** | 12.5 MP | Galeri Stock Klasik, Ilustrasi Buku |

---

## 3. Preservasi & Injeksi Metadata IPTC/XMP via `exiv2`

Saat file di-upscale dan disimpan ulang, beberapa pustaka grafis dapat menghilangkan tag EXIF/IPTC. Tool CLI `exiv2` digunakan untuk menginjeksi metadata komersial secara lossless:

```bash
# Menampilkan seluruh metadata yang ada pada gambar
exiv2 -pa /path/to/image.jpg

# Injeksi judul, deskripsi, artis, dan hak cipta
exiv2 -M"set Iptc.Envelope.CharacterSet String \x1b%G" \
      -M"set Iptc.Application2.ObjectName String Luxury Golden Fluid Ribbon Background" \
      -M"set Iptc.Application2.Caption String Elegant abstract 3D flowing liquid gold wave on dark background for luxury product showcase" \
      -M"set Iptc.Application2.Byline String Aryansyah" \
      -M"set Iptc.Application2.Copyright String © Aryansyah. All rights reserved." \
      /path/to/image.jpg
```

### Injeksi Keywords (25–35 Kata Kunci Relevan):
```bash
exiv2 -M"set Iptc.Application2.Keywords String gold" \
      -M"set Iptc.Application2.Keywords String luxury" \
      -M"set Iptc.Application2.Keywords String liquid" \
      -M"set Iptc.Application2.Keywords String elegant" \
      -M"set Iptc.Application2.Keywords String background" \
      /path/to/image.jpg
```

*Catatan Kepatuhan Microstock:*
- Jangan menambahkan tag `ai`, `midjourney`, `gemini`, atau `generative` ke dalam kolom keywords metadata IPTC agar tidak memicu filter penolakan otomatis dari kurator microstock.
