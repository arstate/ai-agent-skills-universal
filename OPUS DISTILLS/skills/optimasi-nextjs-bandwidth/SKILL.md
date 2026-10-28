---
name: optimasi-nextjs-bandwidth
description: "SOP dan panduan teknis optimasi Next.js untuk zero-usage Vercel: Cloudflare Full Page Caching (Ignore query string iklan), Service Worker PWA Cache-First, Next.js static export (output: 'export'), unoptimized images, dan vercel.json security headers. Menampung 1.000.000+ pengunjung di Vercel Hobby tier tanpa bayar/jebol."
---

# ⚡ OPTIMASI NEXT.JS ZERO-USAGE VERCEL & CLOUDFLARE EDGE (EXTREME BANDWIDTH BLUEPRINT)

Standar Operasional Prosedur (SOP) arsitektur Next.js untuk mencapai **Zero-Usage Origin Transfer** di Vercel Hobby Tier. Dirancang untuk menampung lonjakan trafik berbayar (Meta Ads, TikTok Ads, Google Search Ads) hingga 1.000.000+ pengunjung per bulan tanpa risiko akun disuspend atau terkena tagihan overage.

---

## 🎯 1. PENDAHULUAN & FILOSOFI ZERO-USAGE ORIGIN

### Mengapa Vercel Hobby Tier Jebol Saat Iklan Berbayar Aktif?
Secara default, aplikasi Next.js (App Router/Pages Router) berjalan di atas arsitektur hybrid SSR (Server-Side Rendering) dan Serverless/Edge Functions. Ketika kampanye iklan Meta Ads atau TikTok Ads dijalankan:
1. Setiap klik iklan menyertakan parameter unik acak (misal `?fbclid=IwAR2...` atau `?gclid=...`).
2. Server Next.js memperlakukan setiap request tersebut sebagai URL dinamis yang unik.
3. Vercel memicu eksekusi **Serverless Function** atau **Edge Middleware** untuk merender ulang HTML.
4. Komponen `<Image />` bawaan Next.js memproses dan meresize gambar secara dinamis di server Vercel (**Image Optimization quota**).
5. Aset HTML dan statis dikirim langsung dari jaringan Vercel (**Fast Data Transfer** & **Fast Origin Transfer**).

Akibatnya: Dalam 24–48 jam setelah kampanye iklan berbayar skala menengah dijalankan, kuota Vercel Hobby Tier habis (*bandwidth exceeded*), menyebabkan website terputus, down, atau dipaksa upgrade ke plan Pro ($20/bulan/seat) plus biaya overage.

### Filosofi Arsitektur Zero-Usage: "Vercel Sebagai Dumb Cold Storage"
Inti dari blueprint ini adalah memastikan **origin Vercel hanya disentuh saat deployment atau ketika cache edge Cloudflare kadaluarsa**.
- **Tingkat 1 (Browser Layer):** Service Worker (PWA Cache-First) mengunci seluruh aset statis, font, CSS, dan HTML di CacheStorage browser pengguna. Kunjungan berulang = **0 byte ke internet**.
- **Tingkat 2 (Cloudflare Global Edge):** Cloudflare melayani 99%+ request dari 300+ data center global dengan aturan **Full Page Cache + Ignore Query Strings**. Parameter unik iklan (`?fbclid=...`) disatukan ke dalam satu cache key tunggal.
- **Tingkat 3 (Cloudflare Tiered Cache):** Data center tingkat atas menyatukan permintaan dari seluruh dunia, mencegah cache-miss ganda.
- **Tingkat 4 (Vercel Origin):** Vercel hanya menyediakan file HTML statis hasil `output: 'export'` tanpa satu pun Serverless Function atau Image Optimizer yang berjalan.

---

## 📊 2. TABEL AUDIT 5 KUOTA KRITIS VERCEL HOBBY TIER

| No | Metrik Kuota Vercel Hobby | Limit Resmi Bulanan | Penyebab Jebol Utama Saat Iklan | Strategi Zero-Usage Blueprint | Estimasi Penghematan |
|:---|:--------------------------|:--------------------|:--------------------------------|:------------------------------|:---------------------|
| **1** | **Fast Data Transfer** | 100 GB / bulan | Traffic mentah langsung menyedot bandwidth Vercel untuk file JS, CSS, Font, dan HTML | Cloudflare Edge Caching menyerap 99.8% transfer data; PWA Service Worker menyerap repeat visits | **99.5% - 99.9%** (Konsumsi Vercel < 200 MB / bulan) |
| **2** | **Serverless Invocations** | 100,000 requests (atau 100 GB-Hrs) | Setiap render SSR atau dynamic page route memicu lambda invocation | Kunci `output: 'export'` di `next.config.ts`. Menghapus 100% Serverless Functions | **100% Eliminasi** (0 Serverless Invocation) |
| **3** | **Edge Middleware Invocations**| 1,000,000 requests | Middleware routing/auth mengevaluasi setiap URL `?fbclid=...` | Hapus file `middleware.ts` jika tidak mutlak diperlukan, atau offload routing logic ke Cloudflare Redirect Rules | **100% Eliminasi** (0 Edge Invocation) |
| **4** | **Image Transformations** | 1,000 source images / bulan | Komponen `<Image src="..." />` meresize gambar via Vercel Image Optimizer | Aktifkan `images: { unoptimized: true }` di Next.js config; kompresi manual WebP/AVIF lokal sebelum build | **100% Eliminasi** (0 Transformation used) |
| **5** | **Fast Origin Transfer** | 10 GB / bulan | Cache-miss dari edge CDN internal Vercel yang menarik data dari blob storage origin | Cloudflare Tiered Cache bertindak sebagai perisai ganda. Origin transfer ditekan hingga mendekati 0 byte | **99.0%** (Konsumsi Vercel < 50 MB / bulan) |

---

## 🏗️ 3. DIAGRAM ALUR ARSITEKTUR MULTI-LAYER

```
                             [ PENGUNJUNG / TRAFFIC IKLAN ]
                               (Meta Ads ?fbclid / TikTok)
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TINGKAT 1: CLIENT BROWSER (PWA SERVICE WORKER)                                         │
│ • Cek CacheStorage Lokal (HTML, CSS, JS, Media)                                        │
│ • Cache-First Strategy: Response instan (0 ms, 0 Byte Data Transfer)                   │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │ (Jika First Visit / Cache Expired)
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TINGKAT 2: CLOUDFLARE EDGE POP (DATA CENTER TERDEKAT PENGUNJUNG)                       │
│ • Cache Rule: Ignore Query String (fbclid, gclid, utm_* disatukan ke single cache key) │
│ • Response: HIT (Edge Latency < 20 ms, Bandwidth ditanggung gratis oleh Cloudflare)    │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │ (Jika Edge Cache Miss)
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TINGKAT 3: CLOUDFLARE TIERED CACHE (UPPER TIER HUB)                                    │
│ • Menyatukan miss dari seluruh POP lokal ke satu data center regional                  │
│ • Mencegah redundant fetch ke origin server                                            │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │ (Hanya < 0.1% Request Menembus)
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TINGKAT 4: VERCEL ORIGIN (COLD STATIC STORAGE)                                         │
│ • Static Export (Pure HTML / Static Assets di Blob Storage)                            │
│ • ZERO Serverless Functions | ZERO Image Optimizers | Bandwidth < 100MB/bulan          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

**Target Rasio Efisiensi:**
- **Local Service Worker:** Menyerap ~90% repeat visit.
- **Cloudflare Edge Cache:** Menyerap ~99.5% first-time visit (karena URL disatukan tanpa peduli parameter iklan).
- **Vercel Origin:** Hanya melayani ~0.05% request global.

---

## 🔍 4. CHECKLIST AUDIT ASET LOKAL (PRE-FLIGHT STORAGE AUDIT)

Sebelum build dan deployment, lakukan audit folder `public/` untuk memastikan tidak ada aset raksasa yang tidak sengaja ter-deploy.

### A. Perintah Deteksi File Raksasa (> 500 KB)
Jalankan perintah ini di root repositori proyek:
```bash
find public/ -type f -size +500k -exec ls -lh {} +
```

### B. Aturan Penanganan Aset:
1. **Video/Media Format Besar (> 1 MB):**
   - **DILARANG** meletakkan video MP4/WebM promosi (ukuran 5 MB - 50 MB) di folder `public/videos/`.
   - **SOLUSI:** Offload video ke storage gratis/murah dengan CDN langsung:
     * **Cloudflare R2** (Egress bandwidth 100% GRATIS).
     * **Supabase Storage** (Free Tier 1 GB).
     * **YouTube Unlisted / Vimeo / BunnyCDN Stream** untuk video player interaktif.
2. **Gambar Raster (PNG/JPG):**
   - Konversi seluruh gambar fotografi ke format modern **WebP** atau **AVIF** dengan kualitas 80–85%.
   - Gunakan CLI lokal sebelum commit:
     ```bash
     # Contoh konversi batch via npx sharp-cli (opsional)
     npx sharp-cli -i "public/images/*.png" -o "public/images/" --format webp --quality 82
     ```
3. **Font Web:**
   - Gunakan format `.woff2` terkompresi. Jangan gunakan `.ttf` atau `.otf` mentah di production.
   - Gunakan font subset (hanya latin characters) untuk memangkas ukuran font dari 300KB menjadi < 30KB.

---

## 🛠️ 5. TEMPLATE KONFIGURASI SIAP PAKAI

Salin atau terapkan file konfigurasi berikut ke dalam repositori Next.js Anda.

### A. `next.config.ts` (atau `next.config.js`)
Konfigurasi ini mematikan seluruh ketergantungan server Vercel, menghasilkan Static HTML Export murni, dan menonaktifkan Image Optimizer Vercel yang boros kuota.

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. Ekspor 100% HTML statis murni (Zero Serverless Functions)
  output: 'export',

  // 2. Matikan Vercel Image Optimization (Mencegah hangusnya kuota 1,000 images)
  images: {
    unoptimized: true,
  },

  // 3. Kompresi output aset
  compress: true,

  // 4. Generate ETag untuk validasi cache Cloudflare dan Browser
  generateEtags: true,

  // 5. Normalisasi trailing slash agar konsisten dengan caching Cloudflare
  trailingSlash: false,

  // 6. Matikan header generator 'X-Powered-By' untuk keamanan & efisiensi byte
  poweredByHeader: false,

  // 7. Optimasi output bundle React production
  reactStrictMode: true,
};

export default nextConfig;
```

### B. `vercel.json`
Konfigurasi header tingkat server web Vercel. Mengatur cache agresif selama 1 tahun (`immutable`) untuk chunk JS/CSS webpack, cache 7 hari di Edge CDN (`s-maxage=604800`) untuk HTML, mematikan cache khusus untuk `sw.js` agar pembaruan kode aplikasi langsung diterima oleh client, serta menegakkan Content-Security-Policy (CSP) dan HTTP Security Headers.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(fonts|images|icons)/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=2592000, stale-while-revalidate=86400"
        }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    },
    {
      "source": "/((?!_next|fonts|images|icons|sw.js).*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://connect.facebook.net https://www.google-analytics.com https://www.googletagmanager.com; frame-src 'self' https://www.facebook.com; object-src 'none'; base-uri 'self';"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

### C. `public/sw.js` (PWA Service Worker Anti-Crash)
Service worker ultra-ringan dengan strategi **Cache-First** untuk aset statis dan **True Stale-While-Revalidate** untuk dokumen HTML navigasi, menjamin aplikasi terbuka instan (0 ms) dan tidak menyentuh bandwidth internet sama sekali pada kunjungan kedua maupun klik iklan berulang.

```javascript
// public/sw.js
const CACHE_NAME = 'universal-bandwidth-v1';

// Daftar core path yang di-precache saat instalasi
const PRECACHE_ASSETS = [
  '/',
  '/favicon.ico',
];

// 1. Install Event: Pre-cache aset esensial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Bersihkan cache versi usang
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Intercept request & serve from cache
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Hanya tangani GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Jangan tangani cross-origin tracking scripts (Meta Pixel, Google Analytics, external CDN)
  if (url.origin !== self.location.origin) return;

  // Jangan pernah cache file Service Worker itu sendiri
  if (url.pathname === '/sw.js') return;

  // Pola 1: Aset Statis Immutable (Next.js Chunks, Fonts, Images) -> CACHE FIRST
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.match(/\.(woff2|woff|ttf|eot|png|jpg|jpeg|webp|avif|svg|ico|css|js)$/)
  ) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch((err) => {
            console.warn('[SW] Offline / Fetch error for static asset:', request.url, err);
            return new Response('', { status: 408, statusText: 'Request Timed Out / Offline' });
          });
      })
    );
    return;
  }

  // Pola 2: Halaman Navigasi / HTML -> TRUE STALE-WHILE-REVALIDATE
  // Catatan Krusial: ignoreSearch: true wajib agar traffic iklan (?fbclid=..., ?gclid=...)
  // langsung disajikan instan dari cache halaman utama tanpa hit origin!
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
        // Background fetch untuk revalidasi cache tanpa memblokir rendering
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Jika network gagal total (offline), gunakan cache yang ada atau fallback root
            return cachedResponse || caches.match('/');
          });

        // Jika cache sudah ada: sajikan LANGSUNG (0 ms, 0 byte transfer).
        // Jika belum ada (first visit): tunggu response jaringan.
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }
});
```

### D. `src/components/ServiceWorkerRegister.tsx`
Komponen React Client-side murni yang mendaftarkan Service Worker secara non-blocking. Mengatasi race condition hidrasi React dengan memeriksa status `document.readyState` sebelum memasang listener `load`.

```tsx
'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    // Pastikan Service Worker didukung browser dan hanya aktif di mode production
    if (
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return;
    }

    const registerSW = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          // Monitor background update
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (
                  installingWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  console.log('[SW] Versi baru tersedia di background.');
                }
              };
            }
          };
        })
        .catch((error) => {
          console.warn('[SW] Pendaftaran Service Worker gagal:', error);
        });
    };

    // CEK KRUSIAL ANTI-RACE CONDITION:
    // Jika React hidrasi selesai setelah browser window.onload ('complete'),
    // event listener 'load' tidak akan pernah terpicu!
    // Daftarkan langsung jika document sudah complete, atau pasang listener jika masih loading.
    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
      return () => window.removeEventListener('load', registerSW);
    }
  }, []);

  return null;
}
```

*Cara Pemasangan di Root Layout:*
Tambahkan `<ServiceWorkerRegister />` di dalam `src/app/layout.tsx`:
```tsx
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
```

---

## 🌐 6. BLUEPRINT KONFIGURASI CLOUDFLARE (EDGE SHIELD)

Cloudflare adalah pilar paling vital dalam strategi ini. Lakukan setup pada dashboard Cloudflare:

### A. Pengaturan Dasar (Domain & SSL)
1. **DNS Records:**
   - Record `@` (root) dan `www` wajib bertanda awan oranye (**Proxied**).
   - Target CNAME: mengarah ke alias domain Vercel (misal `cname.vercel-dns.com`).
2. **SSL/TLS Settings:**
   - Ubah enkripsi ke mode: **Full (Strict)**.
   - Aktifkan toggle: **Always Use HTTPS**.
   - Aktifkan toggle: **Automatic HTTPS Rewrites**.
3. **Caching Configuration:**
   - Navigasi ke **Caching** -> **Configuration**.
   - **Tiered Cache:** Ubah ke **ON** (Gunakan Topology: *Smart Tiered Cache* / *Automatic*).
   - **Always Online:** Aktifkan **ON** (Jika Vercel maintenance/down, Cloudflare tetap menyajikan cached page).
   - **Browser Cache TTL:** Pilih **Respect Existing Headers** (mengikuti aturan `vercel.json`).

---

### B. 3 Cache Rules Berurutan (WAJIB SESUAI URUTAN)
Masuk ke menu **Caching** -> **Cache Rules** -> Klik **Create Rule**.

#### 📌 Rule 1: Bypass Service Worker & API
- **Rule Name:** `1 - Bypass SW & Dynamic Paths`
- **Field Matching Expression:**
  ```text
  (http.request.uri.path eq "/sw.js") or (http.request.uri.path starts_with "/api/")
  ```
- **Cache Eligibility:** **Bypass cache**
- *Tujuan:* Mencegah browser terjebak pada Service Worker versi usang dan membiarkan API request (jika ada external proxy) tetap real-time.

#### 📌 Rule 2: Static Next.js Assets Long-Term Cache
- **Rule Name:** `2 - Next Static Assets 1 Year`
- **Field Matching Expression:**
  ```text
  (http.request.uri.path starts_with "/_next/static/") or (http.request.uri.path.extension in {"woff" "woff2" "ttf" "eot" "js" "css" "png" "jpg" "jpeg" "gif" "ico" "svg" "webp" "avif"})
  ```
- **Cache Eligibility:** **Eligible for cache**
- **Edge TTL:** Override origin -> **1 month** (atau 1 year).
- **Browser TTL:** Override origin -> **1 year**.
- *Tujuan:* Semua file JS chunk, CSS, gambar, dan font langsung disajikan dari RAM server terdekat Cloudflare.

#### 📌 Rule 3: Full HTML Edge Cache + IGNORE QUERY STRING (KUNCI UTAMA ADS)
> ⚠️ **PERHATIAN KHUSUS UNTUK IKLAN META/TIKTOK/GOOGLE:**
> Iklan Meta menyematkan `?fbclid=IwAR...`, TikTok menyematkan `?ttclid=...`, Google menyematkan `?gclid=...`.
> Tanpa penanganan query string, Cloudflare memperlakukan setiap klik iklan unik sebagai **CACHE MISS**, lalu menarik 1.000.000 kali halaman HTML dari Vercel!
> Opsi "Ignore query string" menyatukan 1.000.000 klik tersebut ke **1 SATU CACHE OBJECT** saja!

**Metode A: Via Cache Rules (Jika Opsi Cache Key Tersedia):**
- **Rule Name:** `3 - Full HTML Cache Ignore Ad Query Strings`
- **Field Matching Expression:**
  ```text
  (http.host eq "domainanda.com" or http.host eq "www.domainanda.com")
  ```
- **Cache Eligibility:** **Eligible for cache**
- **Edge TTL:**
  - Status code TTL: Override origin -> `200` to `7 days`.
  - Cache Stale Serving: **Serve stale content while revalidating**.
- **Browser TTL:** Override origin -> **4 hours** (atau Respect Existing Headers).
- **Cache Key Settings:**
  - Centang opsi **Cache key**.
  - Pada bagian **Query string**, pilih: **Ignore query string**.

**Metode B: Solusi 100% Gratis Cloudflare Free Tier (Transform Rules - URL Rewrite):**
*Gunakan metode ini jika akun Cloudflare Free Tier membatasi custom cache key:*
1. Buka menu **Rules** -> **Transform Rules** -> Tab **Rewrite URL** -> Klik **Create rule**.
2. **Rule name:** `Strip Ad Query Strings for Edge Cache`
3. **When incoming requests match:**
   ```text
   (http.request.uri.query contains "fbclid") or (http.request.uri.query contains "gclid") or (http.request.uri.query contains "ttclid") or (http.request.uri.query contains "utm_")
   ```
4. **Rewrite URL:**
   - **Path:** Pilih **Preserve** (pertahankan path URL asli).
   - **Query:** Pilih **Rewrite to...** -> **Static** -> Kosongkan input query.
5. *Mengapa trik ini jenius?* Cloudflare menghapus parameter query sebelum mencari cache key dan sebelum menghubungi origin Vercel, sehingga 1.000.000 klik iklan langsung menghasilkan **HIT** ke halaman cache statis utama. Namun, URL di address bar browser pengunjung **tetap utuh** (`/?fbclid=...`), sehingga script client-side Meta Pixel & GA4 tetap bisa membaca tracking click ID secara 100% akurat!

---

## 🧪 7. PANDUAN PENGUJIAN & VERIFIKASI DETERMINISTIK

Lakukan 3 pengujian bertingkat berikut untuk membuktikan bahwa Vercel origin benar-benar terlindungi 100%:

### 1. Build Verification (Lokal)
Jalankan perintah build di terminal lokal:
```bash
npm run build
```
**Indikator Sukses:**
- Output terminal menampilkan simbol lingkaran bulat kosong `○ (Static)` untuk seluruh route.
- **TIDAK ADA** simbol lambda `λ (Serverless)` sama sekali.
- Folder `out/` tercipta dengan file `.html` mandiri.

### 2. Header Response Inspection via Terminal (`curl`)
Uji apakah Cloudflare mengabaikan parameter iklan `fbclid`:
```bash
# Request 1 (Mengisi Edge Cache):
curl -I "https://domainanda.com/?fbclid=TEST_CLICK_ID_1"

# Request 2 (Memverifikasi Caching dengan query string berbeda):
curl -I "https://domainanda.com/?fbclid=TEST_CLICK_ID_2_RANDOM"
```
**Indikator Sukses pada Request 2:**
```http
HTTP/2 200
cf-cache-status: HIT
age: 15
cache-control: public, max-age=...
```
*Jika `cf-cache-status` bernilai `HIT`, berarti Cloudflare tidak menghubungi Vercel origin sama sekali meskipun ID iklan berbeda!*

### 3. Service Worker Inspection (Browser Chrome DevTools)
1. Buka website di browser Chrome.
2. Buka DevTools (`F12`) -> Tab **Application** -> Menu **Service Workers**.
   - Pastikan `/sw.js` berstatus `Activated and is running`.
3. Pindah ke tab **Network** -> Centang `Disable cache` dimatikan.
4. Lakukan reload halaman kedua kali.
5. Perhatikan kolom **Size**:
   - Seluruh file JS, CSS, Font, dan HTML wajib bertuliskan **`(ServiceWorker)`** atau **`(disk cache)`**.
   - Kolom **Time**: `0 ms` s/d `2 ms`.
   - Data transfer dari jaringan: **0 B**.

---

## ❓ 8. TROUBLESHOOTING & FAQ (UNTUK AGENT BERIKUTNYA)

### Q1: Mengapa build Next.js error: `Page with `export` cannot use `headers()` or `cookies()`?
**Penyebab:** Fungsi SSR dinamis tidak kompatibel dengan `output: 'export'`.
**Solusi:**
- Hapus pemanggilan `headers()` atau `cookies()` di Server Components.
- Jika butuh membaca parameter URL (misal membaca `?utm_source=`), gunakan client-side hook:
  ```tsx
  'use client';
  import { useSearchParams } from 'next/navigation';
  // Bungkus dalam <Suspense>
  ```

### Q2: Mengapa build error pada `<Image />` component?
**Penyebab:** Next.js Image component standar mencoba memanggil server image optimizer yang tidak ada pada static export.
**Solusi:**
Pastikan `next.config.ts` sudah memuat `images: { unoptimized: true }`.

### Q3: Bagaimana cara update konten / redeploy jika Cloudflare menyimpan cache selama 7–30 hari?
**Penyebab:** Edge TTL Cloudflare menahan HTML versi lama.
**Solusi:**
1. Masuk ke Cloudflare Dashboard -> **Caching** -> **Configuration** -> Klik tombol **Purge Everything**.
2. Atau pasang GitHub Action / Vercel Deploy Hook yang menembak Cloudflare Purge Cache API:
   ```bash
   curl -X POST "https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/purge_cache" \
     -H "Authorization: Bearer {CF_API_TOKEN}" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'
   ```

### Q4: Apakah "Ignore query string" di Cloudflare merusak tracking Meta Pixel & Google Analytics?
**Jawaban:** **TIDAK SAMA SEKALI!**
Meta Pixel dan Google Analytics bekerja secara client-side via JavaScript di dalam browser pengguna. Script `fbq('track', ...)` membaca parameter `location.search` (`?fbclid=...`) langsung dari address bar browser pengguna, bukan dari response server header. Halaman HTML disajikan secara instan dari cache Cloudflare, lalu script tracking langsung membaca URL asli dari browser.

### Q5: Bagaimana menangani Form Kontak / Checkout WhatsApp jika tidak ada Serverless API?
**Jawaban:**
1. Gunakan direct WhatsApp link generator:
   ```ts
   const waLink = `https://wa.me/6285196598881?text=${encodeURIComponent(pesan)}`;
   ```
2. Atau tembak webhook eksternal gratis langsung dari client component via `fetch()` (misal ke Formspree, Make.com, Supabase, Google Apps Script, atau Fonnte) tanpa membebani kuota Vercel Function.

---

## 🏁 RINGKASAN EKSEKUTIF UNTUK AGENT (CHEAT SHEET)

Setiap kali diminta mengoptimasi website Next.js klien untuk menahan traffic gila-gilaan:
1. `next.config.ts` -> Pasang `output: 'export'` + `images: { unoptimized: true }`.
2. `vercel.json` -> Pasang immutable cache headers + security headers.
3. `public/sw.js` & `src/components/ServiceWorkerRegister.tsx` -> Pasang PWA Cache-First.
4. Cloudflare -> Pasang Tiered Cache ON + Cache Rule "Ignore query string".
5. Run `npm run build` -> Pastikan hasil export 100% `○ (Static)`.

Done. Akun Vercel kebal terhadap tagihan bengkak dan siap menampung 1.000.000+ klik iklan!
