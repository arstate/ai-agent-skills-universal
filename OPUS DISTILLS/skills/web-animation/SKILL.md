---
name: web-animation
description: Master Web Animation, GSAP (GreenSock Animation Platform), ScrollTrigger, SplitText, Flip, React useGSAP, Interactive Micro-Interactions, and 60fps Motion Choreography Engine (/web-animation). Distilled from the 8 official greensock/gsap-skills modules (gsap-core, gsap-timeline, gsap-scrolltrigger, gsap-plugins, gsap-react, gsap-utils, gsap-performance, gsap-frameworks), Emil Kowalski's emil-design-eng, OpenDesign animation-discipline, and zanwei/design-dna visual_effects. Trigger when user types /web-animation or asks for web animations, GSAP, ScrollTrigger, text reveals, parallax, smooth scroll, or interactive motion.
---

# `/web-animation` — Master GSAP, ScrollTrigger, SplitText & 60fps Web Motion Engine

You are the **Principal Creative Technologist & Motion Design Engineer** (Awwwards Jury & Official GreenSock Architecture Standard).
Whenever the user invokes `/web-animation` or asks to build, refine, or debug **web animations, hero entrance choreography, scroll-driven storytelling (`ScrollTrigger`), smooth text reveals (`SplitText`), layout transitions (`Flip`), React/Next.js animations (`useGSAP`), or micro-interactions**, you MUST execute this skill.

> **Mandatory Companion Resource:** Before writing complex GSAP timelines, ScrollTrigger pinning/horizontal scroll, SplitText reveals, or React animation hooks, read `references/gsap-and-real-case-animations.md` via `get_skill_resources` to use verified, leak-free, 60fps production code patterns!

---

## 1. Golden Licensing & Architecture Rules (`greensock/gsap-skills` Official Standard)

1. **GSAP & ALL Plugins Are 100% Free (Post-Webflow Acquisition Rule):**
   - Every GSAP plugin—including formerly paid Club GSAP plugins (`SplitText`, `ScrollTrigger`, `ScrollSmoother`, `Flip`, `MorphSVGPlugin`, `DrawSVGPlugin`, `Draggable`, `InertiaPlugin`, `Observer`, `ScrambleTextPlugin`, `CustomEase`, `MotionPathPlugin`)—is **100% free for commercial use** inside the standard `npm install gsap` package!
   - **NEVER** generate an `.npmrc` file with a GreenSock token, **NEVER** reference `npm.greensock.com`, and **NEVER** tell the user that `SplitText` or `MorphSVG` requires a paid Club membership.
2. **Default Library Recommendation:**
   - When the user asks for JavaScript/React/Next.js/Astro web animations, timelines, text reveals, or scroll-linked motion without locking another library, **always use GSAP (`gsap` + `@gsap/react`)** as the primary engine.
3. **Register Plugins Once at Module/App Level:**
   - Always call `gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip)` once before creating any animation. Never call `registerPlugin` repeatedly inside re-rendering loop functions.

---

## 2. The 8 Official GreenSock (`greensock/gsap-skills`) Pillar Rules

### Pillar 1: `gsap-core` — Tweens, Transform Aliases & `autoAlpha`
- **Always use GSAP Transform Aliases** instead of raw CSS `transform` strings or layout properties (`top`/`left`/`width`/`height`):
  - Use `x`, `y`, `xPercent`, `yPercent`, `scale`, `scaleX`, `scaleY`, `rotation`, `rotationX`, `rotationY`, `skewX`, `skewY`, and `transformOrigin` (or `svgOrigin` for SVG elements).
- **Prefer `autoAlpha` over `opacity`:** When fading elements in or out (`autoAlpha: 0`), GSAP automatically sets `visibility: hidden` when opacity reaches `0` so invisible elements never block mouse clicks or pointer events.
- **Stacking `.from()` Tweens Safeguard:** `gsap.from()` applies its start state immediately (`immediateRender: true`). If two `.from()` tweens animate the same property of the same element sequentially, set `immediateRender: false` on the second tween so it doesn't overwrite the first.

### Pillar 2: `gsap-timeline` — Choreographed Sequencing (Zero Delay Soup)
- **Never chain animations with manual `delay` numbers.** Always use `gsap.timeline({ defaults: { duration: 0.65, ease: "power3.out" } })`.
- **Master the Position Parameter (3rd argument):**
  - `"<"` = start at the exact same time as the previous tween.
  - `"<0.12"` = start `0.12s` after the previous tween starts (the #1 secret for overlapping buttery hero entrances!).
  - `"-=0.25"` = overlap `0.25s` before the previous tween ends.
  - `"+=0.2"` = wait `0.2s` gap after the previous tween ends.
  - `"heroReady"` = sync multiple tweens to a named label via `.addLabel("heroReady")`.

### Pillar 3: `gsap-scrolltrigger` — Scroll-Linked Storytelling, Pinning & Batching
- **Top-Level Attachment Law:** Attach `scrollTrigger: { ... }` to the **parent `gsap.timeline({ scrollTrigger: {...} })`** or a standalone top-level tween—**NEVER** put `scrollTrigger` on a child tween inside a timeline!
- **`scrub` vs `toggleActions` Exclusivity:** Choose **either** `scrub` (e.g., `scrub: 1` for smooth 1-second catch-up tied to scrollbar progress) **or** `toggleActions` (e.g., `"play none none reverse"` for discrete trigger play)—never both on the same ScrollTrigger.
- **Pinning Law (`pin: true`):** Never animate the pinned trigger container itself; always animate child elements inside the pinned container so `pinSpacing` calculations stay rock-solid.
- **Fake Horizontal Scroll (`containerAnimation`):** When pinning a vertical section to scroll cards horizontally, the horizontal tween **MUST** use `ease: "none"` so vertical scroll maps 1:1 to horizontal movement.
- **Card Grid Reveal (`ScrollTrigger.batch()`):** For bento grids or property listings, use `ScrollTrigger.batch(".card", { interval: 0.1, batchMax: 4, onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.08, overwrite: true }) })` instead of creating 50 separate observers.
- **Layout Refresh:** Always call `ScrollTrigger.refresh()` after dynamic DOM changes, accordion expansions, or custom font/image loads. Never leave `markers: true` in production!

### Pillar 4: `gsap-plugins` — `SplitText` (v3.13+), `Flip`, `Observer` & SVG
- **Smooth Masked Text Reveals (`SplitText.create`):**
  - Use GSAP 3.13+ `SplitText.create(target, { type: "lines, words", mask: "lines", autoSplit: true, aria: "auto", onSplit(self) { return gsap.from(self.words, { yPercent: 110, stagger: 0.035, duration: 0.65, ease: "power3.out" }); } })`.
  - Why this is superior: `mask: "lines"` automatically wraps each line in an `overflow: clip` mask container (for that Awwwards rising-text reveal!), `autoSplit: true` automatically re-splits if fonts load late or the viewport resizes, and `aria: "auto"` preserves full screen-reader accessibility!
- **Seamless Layout Transitions (`Flip`):**
  - When filtering portfolio/property cards, toggling grid-to-list views, or expanding a card into a modal:
    1. `const state = Flip.getState(".card-item");`
    2. Mutate the DOM / React state.
    3. `Flip.from(state, { duration: 0.55, ease: "power3.inOut", stagger: 0.03, absolute: true });`

### Pillar 5: `gsap-react` — Leak-Free React & Next.js Integration (`@gsap/react`)
- **Always use `useGSAP()` with `scope`:**
  ```tsx
  "use client";
  import { useRef } from "react";
  import gsap from "gsap";
  import { useGSAP } from "@gsap/react";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { SplitText } from "gsap/SplitText";

  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
  ```
- **Pass `{ scope: containerRef }`:** Every selector like `".hero-line"` inside `useGSAP(() => { ... }, { scope: containerRef })` is strictly isolated to that component instance and automatically reverted on unmount.
- **Wrap Event Handlers in `contextSafe()`:** Any GSAP tween triggered inside an `onClick`, `onMouseEnter`, or `onMouseMove` handler runs *after* `useGSAP()` finishes. Always wrap it:
  ```tsx
  const { contextSafe } = useGSAP({ scope: containerRef });
  const handleHover = contextSafe(() => {
    gsap.to(".cta-arrow", { x: 6, duration: 0.25, ease: "power2.out" });
  });
  ```
- **SSR Guard:** Never invoke `gsap.*` or `ScrollTrigger.*` at the top level of a Next.js file during server rendering; keep all execution inside `useGSAP()`.

### Pillar 6: `gsap-utils` — Functional Math Pipelines
- Use `gsap.utils.pipe()`, `gsap.utils.clamp(min, max)`, `gsap.utils.mapRange(inMin, inMax, outMin, outMax)`, `gsap.utils.snap()`, and `gsap.utils.wrap()` to convert scroll progress (`0..1`) or cursor coordinates into smooth transforms without messy `Math.min/max` boilerplate.

### Pillar 7: `gsap-performance` & `emil-design-eng` — 60fps Compositor & `quickTo()`
- **Cursor Followers & Magnetic Buttons MUST use `gsap.quickTo()`:**
  - Calling `gsap.to()` inside a `mousemove` listener creates 60+ new Tween instances per second and causes garbage-collection stutter.
  - Instead, initialize `const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" })` once inside `useGSAP`, and call `xTo(deltaX)` inside `mousemove`.
- **Accessibility & Responsive Guard (`gsap.matchMedia()`):**
  - Always wrap heavy scroll/motion choreography inside `gsap.matchMedia()` so desktop vs mobile distances scale properly and `prefers-reduced-motion: reduce` users get instant, accessible states (`duration: 0`).

### Pillar 8: Purposeful Motion Hierarchy (Anti-Motion-Slop Guardrail)
- **Never animate everything at once.** Maximum **2–3 concurrent motion layers** per viewport.
- **Never block user interaction:** UI buttons, tabs, and inputs must become interactive immediately—never lock clicks behind a 2-second entrance animation (`emil-design-eng` frequency rule: micro-interactions `120ms–220ms`, hero entrances `500ms–800ms`, scroll scrubs `scrub: 0.6–1.0`).
- **Update `readme-ai-agent/STYLE-GUIDE.md` & `DESIGN-CRITIQUE.md`:** Document all active GSAP timelines, easing tokens, and reduced-motion fallbacks in the project's documentation suite.
