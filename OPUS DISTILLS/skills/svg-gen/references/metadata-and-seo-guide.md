# Adobe Sensei Metadata & Stock SEO Optimization Guide

Panduan optimasi metadata dan ranking pencarian algoritma **Adobe Sensei** untuk aset grafis vektor komersial.

---

## 🎯 1. Cara Kerja Algoritma Adobe Sensei

Adobe Sensei mengevaluasi dan merangking aset berdasarkan 4 pilar utama:
1. **Title Relevance (Bobot 40%):** Judul file diperlakukan sebagai ringkasan inti konten aset. Kata-kata di judul otomatis memiliki prioritas pencarian tertinggi.
2. **The First 10 Keywords Rule (Bobot 40%):** 10 kata kunci pertama di dalam daftar tags membawa **80% total bobot pencarian**. Urutkan kata kunci paling spesifik di 10 posisi awal!
3. **Buyer Conversion Signal (CTR & Download Rate):** Aset yang memiliki lencana **"Transparent PNG available"** memiliki rasio klik (CTR) lebih tinggi dari desainer UI/UX.
4. **Metadata Cleanliness (Zero Spam Penalty):** Aset yang memasukkan kata kunci tidak relevan (*keyword stuffing*) atau kata terlarang otomatis diturunkan (*downranked*) oleh AI Inspector.

---

## 📏 2. Batasan Teknis Metadata Adobe Stock

| Parameter | Batas Maksimal | Format Wajib | Contoh Benar |
|---|:---:|---|---|
| **Filename** | **<= 30 Karakter** | `snake_case`, huruf kecil, tanpa spasi, termasuk `.svg` | `fintech_card_coin_flat_01.svg` (29 char) |
| **Document Title** | **<= 70 Karakter** | Bahasa Inggris alami, deskriptif, tanpa kata "AI" | `Flat 2D Credit Card and Gold Dollar Coin Digital Payment Vector Icon` (68 char) |
| **Keyword Count** | **25 – 35 Tags** | Koma diikuti spasi (`tag1, tag2`) | 25 kata kunci relevan terkurasi |
| **First 10 Tags** | Posisi 1 s/d 10 | Kata kunci esensial bernilai komersial tinggi | `fintech, credit card, payment, digital banking, gold coin...` |
| **Category ID** | Angka 1 s/d 21 | Sesuai taksonomi resmi Adobe Stock | `3` (Business / Finance), `19` (Technology) |

---

## 🛑 3. Daftar Kata Terlarang (Strict Exclusion Guard)

**DILARANG KERAS** mencantumkan kata-kata berikut di Title maupun Keywords:
- `"ai"`
- `"artificial intelligence"`
- `"generative ai"`
- `"midjourney"`
- `"dall-e"`
- `"stable diffusion"`
- Merek dagang pihak ketiga: `"Visa"`, `"Mastercard"`, `"Apple"`, `"Bitcoin"` (gunakan `"cryptocurrency"`, `"digital coin"`).

---

## 📑 4. Tabel Kategori Resmi Adobe Stock (Category IDs)

| ID | Nama Kategori Resmi | Niche Vektor Terkait |
|:---:|---|---|
| **1** | Animals | Satwa, maskot hewan, satwa liar |
| **2** | Buildings and Architecture | Gedung kantor, blueprint arsitektur, konstruksi |
| **3** | **Business / Finance** | **Fintech, perbankan, dompet digital, investasi, analitik** |
| **4** | Drinks | Minuman, kopi, boba, industri F&B |
| **5** | The Environment | Energi terbarukan, panel surya, daur ulang, ESG |
| **6** | States of Mind | Emosi, ekspresi, psikologi |
| **7** | Food | Makanan, kuliner, restoran, bahan masakan |
| **8** | Graphic Resources | Pola latar belakang, template bingkai, tekstur |
| **9** | Hobbies and Leisure | Olahraga, musik, gaming, travel |
| **10** | Industry | Pabrik, permesinan manufaktur, otomasi industri |
| **11** | Landscape | Pemandangan alam, pegunungan, pantai |
| **12** | Lifestyle | Gaya hidup, keluarga, perbelanjaan |
| **13** | People | Karakter profesi, potret manusia flat |
| **14** | Plants and Flowers | Tumbuhan, botani, bunga, dedaunan |
| **15** | Culture and Religion | Tradisi, hari raya, budaya lokal |
| **16** | Science | Laboratorium, biologi, kimia, kedokteran medis |
| **17** | Social Issues | Isu sosial, komunitas, kesetaraan |
| **18** | Sports | Olahraga, fitness, kebugaran |
| **19** | **Technology** | **Cybersecurity, cloud computing, server, jaringan, IoT** |
| **20** | Transport | Logistik, transportasi kargo, rantai pasok, armada |
| **21** | Travel | Pariwisata, penerbangan, perhotelan |

---

## 📊 5. Format CSV Master 5-Kolom untuk Batch Upload

File CSV diletakkan di root folder produksi (`metadata_batch_active.csv`):

```csv
Filename,Title,Keywords,Category,Releases
fintech_card_coin_flat_01.svg,Flat 2D Credit Card and Gold Dollar Coin Digital Payment Vector Icon,"fintech, credit card, payment, digital banking, gold coin, money, finance, debit card, cashless, transaction, online shopping, ecommerce, smart chip, banking, wealth, currency, business, financial, icon, flat, vector, 2d, minimalist, isolated, illustration",3,
cyber_shield_check_flat_01.svg,Flat 2D Cybersecurity Shield Checkmark and Keyhole Lock Vector Icon,"cybersecurity, security shield, checkmark, keyhole, data protection, antivirus, privacy, encryption, safety, verified, firewall, network security, information security, lock, padlock, trust, compliance, guard, defense, icon, flat, vector, 2d, isolated, illustration",19,
fintech_banking_icons_01.svg,Fintech and Digital Banking Flat 2D Vector Icon Set Wallet Analytics,"fintech, banking, icon set, digital wallet, bank building, mobile payment, analytics chart, credit card, finance, money, investment, growth, cashless, online banking, transaction, wealth, commerce, business, currency, financial, flat, vector, 2d, isolated, illustration",3,
```
