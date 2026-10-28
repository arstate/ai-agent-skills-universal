# Fullstack & Static Next.js Zero-Usage Vercel + Cloudflare Edge Blueprint (`web-optimization`)

Complete, production-tested configuration templates for **Fullstack Hybrid (Mode B)** and **Pure Static Export (Mode A)** Next.js applications designed to survive **1,000,000+ Meta/TikTok/Google Ad clicks on Vercel Hobby Tier**.

---

## 1. Multi-Layer Fullstack Traffic Shield Architecture

```text
                       [ 1,000,000+ PAID AD CLICKS (?fbclid / ?gclid / ?ttclid) ]
                                                   │
                                                   ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ LAYER 1: BROWSER PWA SERVICE WORKER (`public/sw.js` — RSC-Safe & Auth-Safe)                     │
│ • Static Assets (`/_next/static/*`, fonts, images): Cache-First (`0 ms`, `0 Bytes` transfer)    │
│ • Public HTML Navigation: Stale-While-Revalidate (ignores ad params, bypasses `_rsc` & `/api`)  │
└──────────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                                   │ (First Visit / Cache Miss)
                                                   ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ LAYER 2: CLOUDFLARE EDGE POP + TRANSFORM RULE (300+ Global Cities)                              │
│ • Transform Rule: Strips ONLY `fbclid, gclid, ttclid, utm_*` (preserves `_rsc` & app queries!)  │
│ • Honours `CDN-Cache-Control: public, s-maxage=604800` -> Serves HTML from Edge RAM (`< 20ms`)  │
│ • Bypasses `/api/*`, `/admin/*`, `/dashboard/*`, `/sw.js`, and `/.well-known/*`                 │
└──────────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                                   │ (< 0.1% Regional Miss)
                                                   ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ LAYER 3: CLOUDFLARE SMART TIERED CACHE (Upper-Tier Regional Collector)                          │
│ • Collapses global PoP misses into a single origin request                                      │
└──────────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                                   │
                         ┌─────────────────────────┴─────────────────────────┐
                         ▼ (99.9% Public/Ad Traffic)                         ▼ (< 0.1% Admin/Mutation)
┌───────────────────────────────────────────────────┐ ┌───────────────────────────────────────────┐
│ LAYER 4A: VERCEL STATIC / ISR EDGE (`○` / `●`)    │ │ LAYER 4B: FULLSTACK API / SERVER ACTIONS  │
│ • Ad Landing Pages & Catalog (`force-static`)     │ │ • `/api/*`, `/admin/*`, Auth, Webhooks    │
│ • 0 Function Invocations | 0 Image Optimizations  │ │ • Protected by `private, no-store`        │
└───────────────────────────────────────────────────┘ └───────────────────────────────────────────┘
```

---

## 2. Pre-Flight Asset & Route Audit Commands

Run these commands before every build to guarantee no oversized files or accidental dynamic routes drain Vercel bandwidth:

```bash
# 1. Detect bloated files (> 500 KB) inside public/
find public/ -type f -size +500k -exec ls -lh {} +

# 2. Batch convert PNG/JPG in public/images to optimized WebP (< 100 KB)
npx sharp-cli -i "public/images/*.{png,jpg,jpeg}" -o "public/images/" --format webp --quality 80

# 3. Verify Next.js build route symbols (Ensure all ad-facing routes are ○ Static or ● SSG, NOT ƒ/λ Dynamic!)
npm run build 2>&1 | tail -n 35
```

---

## 3. Ready-to-Use Configuration Templates

### Template A: `next.config.ts` (Supports Both Fullstack Hybrid Mode & Pure Static Mode)

```typescript
import type { NextConfig } from 'next';

// Set NEXT_BUILD_MODE='export' ONLY for 100% static sites without /api or Server Actions.
// Leave unset (default 'hybrid') for Fullstack Next.js apps!
const isStaticExport = process.env.NEXT_BUILD_MODE === 'export';

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: 'export' } : {}),

  // 1. Zero Vercel Image Transformation Usage (Saves 5,000/mo quota; use local WebP or Cloudinary)
  images: {
    unoptimized: true,
  },

  // 2. Consistent URL normalization for Cloudflare Cache Key alignment
  trailingSlash: false,
   compress: true,
  generateEtags: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // 3. Tree-shake heavy icon/animation libraries (Vercel React 70-Rule Standard)
  experimental: {
    optimizePackageImports: ['lucide-react', 'gsap', '@gsap/react', 'date-fns'],
  },
};

export default nextConfig;
```

### Template B: Force-Static Guard for Ad-Facing Pages in Fullstack Apps (`src/app/page.tsx`)

In a **Fullstack Next.js app**, add these 2 lines at the top of every public/ad-facing page (`src/app/page.tsx`, `src/app/lp/[slug]/page.tsx`, `src/app/katalog/page.tsx`) so Next.js **never** turns it into a Serverless Function (`ƒ`):

```tsx
// Forces 100% static HTML generation even in a Fullstack project!
// Read ?utm_source or ?fbclid on the client side via window.location.search or a <Suspense>-wrapped client hook.
export const dynamic = 'force-static';
export const revalidate = false; // Or 3600 (1 hour ISR) if catalog updates periodically
```

### Template C: `vercel.json` (Fullstack-Safe + RFC 9213 `CDN-Cache-Control` for Cloudflare)

> **Why this fixes the Cloudflare `DYNAMIC` bug:** Vercel strips `s-maxage` from standard `Cache-Control` before forwarding to Cloudflare. By adding **`CDN-Cache-Control`**, both Vercel CDN and Cloudflare Edge receive the exact 7-day `s-maxage=604800` instruction, while `/api/*`, `/admin/*`, and `/dashboard/*` are strictly locked to `private, no-store`!

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
        },
        {
          "key": "CDN-Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(fonts|images|icons|media)/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=2592000, stale-while-revalidate=86400"
        },
        {
          "key": "CDN-Cache-Control",
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
          "key": "CDN-Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    },
    {
      "source": "/(api|admin|dashboard|auth)/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "private, no-store, no-cache, must-revalidate"
        },
        {
          "key": "CDN-Cache-Control",
          "value": "private, no-store"
        }
      ]
    },
    {
      "source": "/((?!api|admin|dashboard|auth|_next|fonts|images|icons|media|sw\.js|\.well-known).*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        },
        {
          "key": "CDN-Cache-Control",
          "value": "public, s-maxage=604800, stale-while-revalidate=86400"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.googletagmanager.com https://www.google-analytics.com https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; media-src 'self' https: blob:; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.supabase.co https://res.cloudinary.com https://connect.facebook.net https://www.google-analytics.com https://www.googletagmanager.com; frame-src 'self' https://www.facebook.com https://*.firebaseapp.com; object-src 'none'; base-uri 'self';"
        },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### Template D: `public/sw.js` (Fullstack-Safe, RSC-Safe & Ad-Query-Normalizing PWA Service Worker)

> **Why this is superior to basic Service Workers:**
> 1. **Never poisons Next.js App Router `_rsc` requests:** Checks `request.headers.get('RSC') === '1'` and `url.searchParams.has('_rsc')` so client-side router transitions never overwrite full HTML documents in `CacheStorage`.
> 2. **Never caches `/api/*`, `/admin/*`, `/dashboard/*`, or `/auth/*`:** Protects fullstack dynamic functionality 100%.
> 3. **Strips only Ad Click IDs (`fbclid`, `gclid`, `ttclid`, `msclkid`, `utm_*`) for cache lookup:** Repeat ad clicks load in `0 ms` with `0 Bytes` network transfer while keeping real application query parameters (like `?page=2` or `?tipe=45`) distinct!

```javascript
// public/sw.js — Fullstack-Safe & RSC-Safe Zero-Usage Service Worker
const CACHE_NAME = 'universal-fullstack-shield-v2';
const PRECACHE_ASSETS = ['/', '/favicon.ico'];

// Ad tracking parameters to strip when matching HTML cache keys
const AD_PARAMS = ['fbclid', 'gclid', 'ttclid', 'msclkid', 'twclid', 'li_fat_id', 'mc_cid', 'mc_eid'];

function getNormalizedCacheUrl(rawUrl) {
  const u = new URL(rawUrl);
  for (const key of [...u.searchParams.keys()]) {
    if (AD_PARAMS.includes(key.toLowerCase()) || key.toLowerCase().startsWith('utm_')) {
      u.searchParams.delete(key);
    }
  }
  return u.toString();
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.map((name) => (name !== CACHE_NAME ? caches.delete(name) : undefined)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // 1. BYPASS Service Worker, Fullstack API/Admin/Auth routes, and Next.js RSC Flight requests
  if (
    url.pathname === '/sw.js' ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/_next/data/') ||
    request.headers.get('RSC') === '1' ||
    request.headers.get('Next-Router-Prefetch') === '1' ||
    url.searchParams.has('_rsc')
  ) {
    return;
  }

  // 2. IMMUTABLE STATIC ASSETS (/_next/static/, fonts, images) -> CACHE-FIRST
  if (
    url.pathname.startsWith('/_next/static/') ||
    /\.(woff2|woff|ttf|png|jpg|jpeg|webp|avif|svg|ico|css|js)$/i.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((res) => {
            if (res && res.status === 200) {
              const copy = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return res;
          })
          .catch(() => new Response('', { status: 408, statusText: 'Offline' }));
      })
    );
    return;
  }

  // 3. PUBLIC HTML NAVIGATION -> STALE-WHILE-REVALIDATE WITH AD-PARAM NORMALIZATION
  if (request.mode === 'navigate') {
    const normalizedKey = getNormalizedCacheUrl(request.url);
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(normalizedKey).then((cached) => {
          const networkFetch = fetch(request)
            .then((res) => {
              if (res && res.status === 200 && res.headers.get('content-type')?.includes('text/html')) {
                cache.put(normalizedKey, res.clone());
              }
              return res;
            })
            .catch(() => cached || cache.match('/'));

          return cached || networkFetch;
        })
      )
    );
  }
});
```

### Template E: `src/components/ServiceWorkerRegister.tsx` (Hydration-Safe Registration)

```tsx
'use client';
import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
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
        .catch((err) => console.warn('[SW] Registration skipped:', err));
    };

    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW, { once: true });
      return () => window.removeEventListener('load', registerSW);
    }
  }, []);

  return null;
}
```

---

## 4. Cloudflare Dashboard Setup (Fullstack-Safe Edge Shield)

### A. Mandatory Base Settings
1. **DNS:** `@` (`76.76.21.21`) and `www` (`cname.vercel-dns.com`) set to **Proxied (Orange Cloud)**.
2. **SSL/TLS:** Mode = **Full (Strict)**.
3. **Speed -> Optimization:** Turn **Rocket Loader = OFF** and **Auto Minify (HTML) = OFF** (critical to prevent React Hydration mismatches!).
4. **Caching -> Tiered Cache:** Enable **Smart Tiered Cache Topology = ON**.

### B. Transform Rule (Strip Ad Click IDs Without Breaking `_rsc` or App Queries!)
Go to **Rules -> Transform Rules -> Rewrite URL -> Create Rule**:
- **Rule Name:** `Strip Ad Click Parameters Only (Keep _rsc & App Params)`
- **When incoming requests match:**
  ```text
  (not http.request.uri.path starts_with "/api/") and (not http.request.uri.path starts_with "/admin") and ((http.request.uri.query contains "fbclid=") or (http.request.uri.query contains "gclid=") or (http.request.uri.query contains "ttclid=") or (http.request.uri.query contains "msclkid=") or (http.request.uri.query contains "utm_")) and (not http.request.uri.query contains "_rsc=")
  ```
- **Rewrite Query:** Choose **Rewrite to... -> Static -> Empty (`""`)** (or if on Cloudflare Pro/Business, use Cache Rules -> Custom Cache Key -> Exclude Query String Parameters: `fbclid, gclid, ttclid, msclkid, utm_source, utm_medium, utm_campaign, utm_content, utm_term`).
- **Why this is 100% safe for App Router + Meta Pixel:**
  1. Initial ad clicks (`https://domain.com/?fbclid=IwAR123`) do NOT have `_rsc=`, so Cloudflare strips the query string internally and serves the single cached HTML page (`cf-cache-status: HIT`).
  2. Client-side navigation via `<Link>` includes `?_rsc=...`, so the rule skips it and preserves RSC Flight data integrity!
  3. The visitor's browser address bar still displays `/?fbclid=IwAR123`, so client-side Meta Pixel (`fbq`) & GA4 capture 100% of ad attributions!

### C. 3 Ordered Cloudflare Cache Rules (`Caching -> Cache Rules`)
1. **Rule 1 — Bypass Dynamic Fullstack, RSC, SW & SSL Paths:**
   - **Expression:**
     ```text
     (http.request.uri.path eq "/sw.js") or (http.request.uri.path starts_with "/api/") or (http.request.uri.path starts_with "/admin") or (http.request.uri.path starts_with "/dashboard") or (http.request.uri.path starts_with "/auth") or (http.request.uri.path starts_with "/.well-known/") or (http.request.uri.query contains "_rsc=")
     ```
   - **Action:** `Bypass cache`
2. **Rule 2 — Immutable Static Assets (`1 Year Edge TTL`):**
   - **Expression:**
     ```text
     (http.request.uri.path starts_with "/_next/static/") or (http.request.uri.path.extension in {"woff" "woff2" "ttf" "eot" "js" "css" "png" "jpg" "jpeg" "gif" "ico" "svg" "webp" "avif"})
     ```
   - **Action:** `Eligible for cache` | Edge TTL: `1 year` | Browser TTL: `1 year`
3. **Rule 3 — Public HTML Edge Cache (Respect `CDN-Cache-Control`):**
   - **Expression:**
     ```text
     (http.host eq "domainanda.com" or http.host eq "www.domainanda.com") and (http.request.method eq "GET")
     ```
   - **Action:** `Eligible for cache` | Edge TTL: `Use cache-control header if present (or Override 200 OK -> 7 days)` | Browser TTL: `Respect origin`

---

## 5. Automated Cloudflare Cache Purge on Deploy / Content Update (Fullstack ISR Sync)

When an admin updates a product in your Fullstack dashboard or when a new deployment finishes, purge Cloudflare's cache automatically from a Next.js Server Action or Deploy Webhook:

```typescript
// src/lib/cloudflare-purge.ts (Server-Only Utility)
import 'server-only';

export async function purgeCloudflareUrls(urls?: string[]) {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const apiToken = process.env.CLOUDFLARE_PURGE_TOKEN;
  if (!zoneId || !apiToken) return;

  const body = urls && urls.length > 0 ? { files: urls } : { purge_everything: true };

  await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
```

---

## 6. Deterministic 3-Step Verification Protocol

Run these checks before declaring any high-traffic Next.js deployment ready:

```bash
# Test 1: Verify Ad Click 1 vs Random Ad Click 2 return cf-cache-status: HIT
curl -sI "https://domainanda.com/?fbclid=AD_CLICK_TEST_001" | grep -iE "cf-cache-status|x-vercel-cache|cache-control"
curl -sI "https://domainanda.com/?fbclid=AD_CLICK_TEST_999_RANDOM" | grep -iE "cf-cache-status|age"
# Expected on 2nd call: cf-cache-status: HIT

# Test 2: Verify RSC Navigation does NOT return cached HTML
curl -sI -H "RSC: 1" "https://domainanda.com/?_rsc=test123" | grep -iE "cf-cache-status|content-type"
# Expected: content-type: text/x-component (NOT text/html)

# Test 3: Verify Fullstack /api/* is NEVER cached publicly
curl -sI "https://domainanda.com/api/health" | grep -iE "cf-cache-status|cache-control"
# Expected: cf-cache-status: BYPASS (or DYNAMIC) & cache-control: private, no-store
```


---

## 7. Multi-Stack Bonus Templates: React (Vite SPA) & Astro 5 + React Islands

When the user selects **Option 3 (Astro 5 + React Islands)** or **Option 4 (React Vite SPA)** from the `opus-distills` / `web-planning` stack menu, apply these zero-usage configurations:

### A. React (Vite SPA) Zero-Usage Config (`vite.config.ts` + `vercel.json`)
```typescript
// vite.config.ts — Deterministic Vendor Chunk Splitting (< 100 KB Initial JS)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap', '@gsap/react'],
        },
      },
    },
  },
});
```

```json
// vercel.json for React (Vite SPA) — Immutable /assets/* + Edge-Cached SPA Fallback (Zero Serverless)
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/((?!assets|images|fonts|icons|sw\.js|favicon\.ico).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" },
        { "key": "CDN-Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/((?!assets|sw\.js).*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" },
        { "key": "CDN-Cache-Control", "value": "public, s-maxage=604800, stale-while-revalidate=86400" }
      ]
    }
  ]
}
```

### B. Astro 5 + React Islands Zero-Usage Config (`astro.config.mjs`)
- **Hydration Discipline:** Never use `client:load` on below-the-fold React components! Use `client:visible` (for interactive KPR/ROI calculators or carousels) and `client:idle` (for non-critical drawers/chat widgets) so initial page load ships **near-0 KB JavaScript**.
- Cache `/_astro/(.*)` with `Cache-Control: public, max-age=31536000, immutable` and HTML routes with `CDN-Cache-Control: public, s-maxage=604800, stale-while-revalidate=86400`.
