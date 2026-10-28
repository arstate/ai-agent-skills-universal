---
name: web-optimization
description: Fullstack & Static Next.js Zero-Usage Vercel Shield (1,000,000+ Ad Clicks on Hobby Tier without overage), Cloudflare Edge & Tiered Cache Rules (CDN-Cache-Control, Ad Query Stripping without RSC poisoning), RSC-Safe PWA Service Worker, Vercel React 70-Rule CWV Optimizer (LCP < 1.2s, INP < 200ms, CLS < 0.1), Full-Free Firebase Spark 50k Read Shield, and Cloudinary 25-Credit Shield.
---

# `web-optimization` — Fullstack & Static Next.js Zero-Usage Vercel, Cloudflare Edge, Firebase & CWV Shield

Principal Cloud Cost-Shield Architect & Performance Engineer. Guarantees that **both Pure Static AND Fullstack Next.js applications** can absorb **1,000,000+ paid ad clicks (Meta Ads `?fbclid`, Google `?gclid`, TikTok `?ttclid`)** on **Vercel Hobby Tier + Free Cloudflare + Free Firebase/Supabase/Cloudinary** with **near-zero origin usage** and **0% cache poisoning**.

> **Mandatory Deep Blueprint (`Tier 3`):** Before writing `next.config.ts`, `vercel.json`, `public/sw.js`, or Cloudflare Cache Rules, read `references/fullstack-nextjs-zero-usage-blueprint.md` via `get_skill_resources` to get the exact copy-paste production configurations!

---

## 1. Multi-Stack Zero-Usage Selector (Matches the 4 Recommended Stacks in `opus-distills` & `web-planning`)

Adapt your optimization config automatically to whichever of the **4 Tech Stacks** the user selected—never force `output: 'export'` on a Fullstack app!

| Selected Stack | When to Use | Zero-Usage Vercel + Cloudflare Edge Shield Strategy |
|---|---|---|
| **Mode 1: Next.js Static Export (`output: 'export'`)** | Landing pages, company profiles, or catalogs with client-side WA checkout & zero Next.js `/api` routes. | 100% static HTML in Vercel Blob storage (`0` Function Invocations, `0` Fluid Compute CPU) + `images: { unoptimized: true }` + Cloudflare Edge Cache + PWA Service Worker. |
| **Mode 2: Next.js Fullstack Hybrid *(DEFAULT FOR FULLSTACK)*** | Fullstack Web Apps with Admin Dashboard, Auth, Database CRUD, Webhooks, Meta CAPI, or `/api/*` routes. | **1. Ad-Facing Pages (`/`, `/produk/[slug]`, `/lp/*`):** Lock `export const dynamic = 'force-static'` + `CDN-Cache-Control` so Cloudflare serves 99.8% of traffic.<br>**2. Dynamic/Admin Routes (`/api/*`, `/admin/*`, `/dashboard/*`):** Bypass CDN & SW cache (`private, no-store`).<br>**3. Client-Direct BaaS:** Offload high-frequency reads/writes directly to Firebase IndexedDB / Supabase / Cloudflare Workers. |
| **Mode 3: Astro 5 + React Islands (`client:visible`)** | Ultra-fast SEO/content sites & interactive portfolios with selective React calculators/GSAP. | Zero JS baseline; hydrate interactive React islands only on `client:visible` or `client:idle`; cache `/_astro/*` immutable for 1 year and HTML via `CDN-Cache-Control: public, s-maxage=604800`. |
| **Mode 4: React (Vite SPA) + Tailwind** | Private dashboards, client-side tools/calculators, or pure SPAs without per-page SSR needs. | Split vendor chunks (`react`, `gsap`, `firebase`) in `vite.config.ts`, cache `/assets/*` immutable for 1 year, and serve SPA fallback `/index.html` with `CDN-Cache-Control` + PWA Service Worker (`0` Serverless executions). |

---

## 2. The 6 Forensic Anti-Crash & Anti-Overage Laws (2026 Vercel + Cloudflare Standard)

| # | Critical Vulnerability in Naive Setups | Mandatory Fix Enforced by `web-optimization` |
|---|---|---|
| **1** | **Vercel Strips `s-maxage` from `Cache-Control`:** Vercel CDN consumes `s-maxage` and forwards `max-age=0` to Cloudflare, causing `cf-cache-status: DYNAMIC` (100% cache miss on Cloudflare!). | Always emit **`CDN-Cache-Control: public, s-maxage=604800, stale-while-revalidate=86400`** alongside `Cache-Control` in `vercel.json` / `next.config.ts`. Vercel forwards `CDN-Cache-Control` intact to Cloudflare! |
| **2** | **App Router `_rsc` Flight Data Poisoning:** Ignoring all query strings on Cloudflare or in `sw.js` causes raw React Server Component JSON (`?_rsc=...`) to overwrite cached HTML pages! | **Never strip `_rsc`!** In Cloudflare Transform Rules, strip **only** ad tracking params (`fbclid`, `gclid`, `ttclid`, `msclkid`, `utm_*`). In `public/sw.js`, bypass any request where `request.headers.get('RSC') === '1'` or `url.searchParams.has('_rsc')`. |
| **3** | **Fullstack `/api/*` & `/admin/*` Public Cache Leak:** Catch-all regex in `vercel.json` caches private user/admin JSON responses on public CDNs for 7 days. | Explicitly exclude `api`, `admin`, `dashboard`, `auth`, and `_next/data` from public caching regex, and force `Cache-Control: private, no-store` on all dynamic/authenticated paths. |
| **4** | **Cloudflare Breaks React Hydration & SSL Renewal:** Cloudflare *Rocket Loader* and *HTML Auto-Minify* mutate DOM comments and cause React Hydration Error #418; caching `/.well-known/*` breaks Vercel SSL renewal. | Turn **OFF** Cloudflare Rocket Loader & HTML Minify. Exempt `/.well-known/acme-challenge/*` from cache & WAF challenges. |
| **5** | **Ad Click Query String Explosion (`?fbclid=...`):** Every Meta/TikTok ad click has a unique ID, triggering 1,000,000 cache misses & Serverless invocations. | Strip `fbclid`, `gclid`, `ttclid`, `utm_*` at the Cloudflare Edge via **Transform Rules (Rewrite URL Query)** *after* client browser URL stays intact (so client-side Meta Pixel & GA4 still read `window.location.search` 100% accurately!). |
| **6** | **Middleware & `<Image>` Quota Burn:** `middleware.ts` runs on every static asset request; `<Image>` burns the 5,000 monthly transformation quota. | Delete `middleware.ts` (or lock its `matcher` strictly to `/admin/:path*`). Use `images: { unoptimized: true }` with pre-compressed local `.webp` (`sharp-cli`) or Cloudinary 2-variant lock (`w_480`, `w_1080`). |

---

## 3. Vercel Hobby Tier 2026 Quota Shield Matrix

| Vercel Hobby Resource | 2026 Monthly Limit | Fullstack Shield Target | How We Keep It Under 1% Usage |
|---|---|---|---|
| **Fast Data Transfer** | `100 GB` | `< 500 MB / mo` | Layer 1 PWA Service Worker (`0 B` repeat visits) + Layer 2 Cloudflare Edge + Tiered Cache absorbs 99.8% of bandwidth. |
| **Fast Origin Transfer** | `10 GB` | `< 100 MB / mo` | `CDN-Cache-Control` + Cloudflare Smart Tiered Cache prevents edge-to-origin re-fetches. |
| **CDN Requests** | `1,000,000` | `< 10,000 / mo` | Ad query stripping (`fbclid`/`gclid`/`ttclid`) collapses 1,000,000 ad clicks into 1 cached edge object. |
| **Function Invocations & Fluid Compute** | `1,000,000` (`4 CPU-hrs`) | `< 5,000 / mo` | Ad landing pages locked to `force-static` (`○`); catalog reads served from Firebase IndexedDB / bundled JSON; `middleware.ts` excluded from public routes. |
| **Image Transformations** | `5,000` (`300k reads`) | `0` | `images: { unoptimized: true }` + pre-build WebP (`< 120 KB`) or Cloudinary `f_auto,q_auto:eco,w_480`. |

---

## 4. Firebase Spark (50k Reads/Day), Cloudinary (25 Credits) & Core Web Vitals Rules

1. **Firebase Spark Shield:**
   - Enable `persistentLocalCache({ tabManager: persistentMultipleTabManager() })` + cache user profile in `sessionStorage`.
   - Pack active catalog items into 1 bundle document (`meta/catalog_bundle_v1`, `< 800 KB`) or serve via edge-cached `/api/catalog` (`CDN-Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`) so 100,000 visitors = **1 Firestore read/hour**.
2. **Cloudinary & Media Shield:**
   - Pre-compress uploads in browser `<canvas>` to `.webp` (`<= 1200px`, `< 120 KB`).
   - Lock delivery URLs to 2 widths only (`w_480` for cards, `w_1080` for hero/detail). Never put videos `> 1 MB` in `public/`; offload to **Cloudflare R2 (0 egress fee)** or Cloudinary `<video preload="none">`.
3. **Core Web Vitals (`LCP < 1.2s`, `INP < 200ms`, `CLS < 0.1`):**
   - Hero image: `fetchPriority="high" loading="eager" decoding="async"`. All below-the-fold images: `loading="lazy"`.
   - Wrap filter/search state transitions in React `startTransition()`. Reserve explicit aspect-ratio boxes (`aspect-[4/3]`, `aspect-[16/9]`) to guarantee `CLS = 0`.
