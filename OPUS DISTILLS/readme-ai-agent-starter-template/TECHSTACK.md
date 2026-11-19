# Tech Stack & Zero-Usage Quota Architecture (`readme-ai-agent/TECHSTACK.md`)

## 1. Selected Stack Option
- **Chosen Option:** [Option 1: Next.js 15 Static Export | Option 2: Next.js 15 Fullstack Hybrid | Option 3: Astro 5 + React Islands | Option 4: Vite React SPA | Option 5: Android Kotlin/Compose]
- **UI & Motion:** `shadcn/ui` + Tailwind OKLCH + `GSAP + motion/react`
- **Live Docs:** Upstash Context7 (`npx ctx7 setup`)
- **Zero-Usage Shield:**
  - **Vercel/Cloudflare:** Cloudflare Edge `CDN-Cache-Control` + query string stripping + RSC-Safe PWA `sw.js`.
  - **Firebase Spark Rules:** `persistentLocalCache()`, `limit(20)` on list queries, `unsubscribe()` on `onSnapshot` unmount.
  - **Cloudinary Media:** `f_auto,q_auto` CDN URLs (`images: { unoptimized: true }` in `next.config.*`, zero `/_next/image`).

## 2. Architecture Decision Records (`ADR`)
- **[ADR-001]:** `[Context] -> [Decision] -> [Consequences]`
