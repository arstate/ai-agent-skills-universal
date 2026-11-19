---
name: web-optimization
description: "Fullstack Next.js zero-overage Vercel shield: Cloudflare tiered cache, RSC-safe PWA, 70-rule CWV (LCP < 1.2s), Firebase Spark & Cloudinary limits."
---

# `web-optimization` — Vercel Zero-Bandwidth Shield, Cloudflare Edge & CWV

Principal Cloud Cost-Shield Architect. Guarantees **Static AND Fullstack Next.js apps** absorb **1,000,000+ paid ad clicks (`?fbclid=`, `?gclid=`, `?utm_*`)** on **Vercel Hobby + Free Cloudflare + Free Firebase/Cloudinary** with **near-zero origin bandwidth** and **0% cache poisoning**.

> **Deep Blueprint (`Tier 3`):** Read `references/fullstack-nextjs-zero-usage-blueprint.md` before writing `next.config.ts`, `vercel.json`, `public/sw.js`, or Cloudflare Cache Rules.

---

## 1. Multi-Stack Zero-Usage Selector
Never force `output: 'export'` on a Fullstack app—adapt to the active stack:
- **Next.js Static Export (`output: 'export'`):** Pure static HTML (`0` Function Invocations, `0` Fluid Compute) + `images: { unoptimized: true }` + Cloudflare `Cache Everything` + PWA offline cache.
- **Next.js Fullstack Hybrid (`force-static` + BaaS):** Ad-facing pages (`/`, `/produk/[slug]`, `/lp/*`) lock `export const dynamic = 'force-static'` + `CDN-Cache-Control: public, s-maxage=604800, stale-while-revalidate=86400`. Dynamic `/api/*` & `/admin/*` emit `Cache-Control: private, no-store`.
- **Astro 5 + React Islands (`client:visible`):** `0 KB` JS baseline; immutable `/_astro/*` (1 yr) + `CDN-Cache-Control` HTML.
- **React 19 Vite SPA:** Vendor chunk splitting, immutable `/assets/*` (1 yr), `/index.html` + PWA SW (`0` serverless).

---

## 2. Vercel Zero-Bandwidth Shield (6 Forensic Laws)
1. **Emit `CDN-Cache-Control`:** Vercel strips `s-maxage` from `Cache-Control`. Always emit `CDN-Cache-Control: public, s-maxage=604800, stale-while-revalidate=86400` so Cloudflare `Cache Everything` hits `HIT` instead of `DYNAMIC`.
2. **Prevent `_rsc` Flight Poisoning:** Never strip `_rsc`! In Cloudflare Transform Rules, strip **only** ad tracking params (`?fbclid=`, `?gclid=`, `?ttclid=`, `?msclkid=`, `?utm_*`). In `public/sw.js`, bypass `request.headers.get('RSC') === '1'` or `url.searchParams.has('_rsc')`.
3. **Protect `/api/*` & `/admin/*`:** Exclude `api`, `admin`, `dashboard`, `auth`, and `_next/data` from public cache regex; enforce `Cache-Control: private, no-store`.
4. **Cloudflare Safety:** Turn **OFF** Rocket Loader & HTML Auto-Minify (prevents React Hydration #418). Exempt `/.well-known/acme-challenge/*` from cache/WAF.
5. **Ad Query String Stripping:** Strip `?fbclid=`, `?gclid=`, `?utm_*` at Cloudflare Edge (Transform Rules) *after* browser URL loads so client-side Meta Pixel & GA4 still read `window.location.search`.
6. **Zero Middleware & `<Image>` Burn:** Delete `middleware.ts` (or lock `matcher` to `/admin/:path*`). Use `images: { unoptimized: true }` + Cloudinary `f_auto,q_auto,w_480` / `w_1080` (0 Vercel Image Transformations).

---

## 3. Vercel Hobby 2026 Quota Shield Matrix
| Resource | Monthly Limit | Shield Target | How We Stay < 1% |
|---|---|---|---|
| **Fast Data Transfer** | `100 GB` | `< 500 MB` | PWA offline cache (`0 B` repeat) + Cloudflare `Cache Everything` + Tiered Cache. |
| **Fast Origin Transfer** | `10 GB` | `< 100 MB` | `CDN-Cache-Control` + Smart Tiered Cache. |
| **CDN Requests** | `1,000,000` | `< 10,000` | Query stripping (`?fbclid=`/`?utm_*`/`?gclid=`) collapses 1M clicks to 1 edge object. |
| **Function Invocations** | `1,000,000` | `< 5,000` | `force-static` / `output: 'export'` + client-direct Firebase/Supabase. |
| **Image Transformations** | `5,000` | `0` | `images: { unoptimized: true }` + Cloudinary `f_auto,q_auto,w_480`/`w_1080`. |

---

## 4. Firebase Spark, Cloudinary & Core Web Vitals (`LCP < 1.2s`)
1. **Firebase Spark (50k Reads/Day):** Enable `persistentLocalCache()`, enforce `limit(20)` on queries, pair `onSnapshot` with `unsubscribe()`, and pack active catalog into 1 bundle doc (`< 800 KB`).
2. **Cloudinary (25 Credits):** Browser `<canvas>` WebP pre-compression (`<= 1200px`, `< 120 KB`); lock delivery URLs to `f_auto,q_auto,w_480` (cards) and `f_auto,q_auto,w_1080` (hero/detail).
3. **CWV (`LCP < 1.2s`, `INP < 200ms`, `CLS = 0`):** Hero `fetchPriority="high" loading="eager"`; below-fold `loading="lazy"`; wrap filters in `startTransition()`; lock `aspect-[4/3]` / `aspect-[16/9]`.
