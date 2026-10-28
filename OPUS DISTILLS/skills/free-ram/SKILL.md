---
name: free-ram
description: Otomatis membersihkan buffer/cache RAM kernel (pagecache, dentries, inodes), melakukan defrag dan kompaksi memori fisik & ZRAM swap pool, serta menampilkan diagnosis proses pemboros memori tanpa menutup aplikasi atau sistem yang sedang berjalan. Trigger saat pengguna mengetik /free-ram, /freeram, free up ram, bersihkan ram, atau minta kurangi beban memori.
---

# 🚀 FREE-RAM - Otomasi Pembersihan Memori & Kompaksi ZRAM

Skill ini bertugas membebaskan RAM dan mengompaksi swap ZRAM secara aman di Linux (CachyOS/Arch) **tanpa mematikan atau menutup aplikasi dan proses sistem yang sedang aktif**.

---

## ⚡ SOP EKSEKUSI /free-ram

Setiap kali pengguna mengetik `/free-ram`, `free up ram`, atau meminta membersihkan memori:

### 1. EKSEKUSI SKRIP PEMBERSIH UTAMA
Jalankan skrip otomasi yang telah tersedia:
```bash
/home/arya/.gemini/config/skills/free-ram/scripts/free_ram.sh
```

Atau eksekusi perintah kernel langsung:
```bash
echo "1509" | sudo -S sh -c "sync; echo 3 > /proc/sys/vm/drop_caches; echo 1 > /proc/sys/vm/compact_memory; echo 1 > /sys/block/zram0/compact"
```

### 2. TAMPILKAN METRIK SEBELUM & SESUDAH
Bandingkan status memori sebelum dan sesudah eksekusi:
- **Free RAM & Available RAM**: Peningkatan ruang memori kosong.
- **Buff/Cache**: Jumlah cache kernel yang berhasil dilepas.
- **ZRAM Pool**: Status kompresi data pada `/dev/zram0`.

### 3. DIAGNOSIS PROSES & SOLUSI NON-KILL
Tampilkan top 5 proses pemakan RAM terbesar (`ps -eo pid,cmd,%mem --sort=-%mem | head -n 6`).
Jika Google Chrome atau browser mendominasi:
- Sarankan **Urgent Discard** tab background via `chrome://discards`.
- Sarankan pengaktifan **Memory Saver** di `chrome://settings/performance` agar tab yang sedang tidak aktif dihibernasi tanpa ditutup.

---

## ⛔ ATURAN KESELAMATAN (SAFETY GUARDRAILS)
- **DILARANG** menjalankan `swapoff -a` saat ZRAM terisi besar dan melebihi sisa physical RAM (berisiko kernel freeze / OOM crash).
- **DILARANG** melakukan `kill` / `pkill` sembarangan terhadap proses pengguna tanpa izin eksplisit.
