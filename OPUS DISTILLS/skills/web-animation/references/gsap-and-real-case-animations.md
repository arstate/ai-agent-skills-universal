# Official GSAP Patterns & Real-World Web Animation Case Studies (`/web-animation` Reference Vault)

This reference vault contains copy-pasteable, production-grade **GSAP + React (`@gsap/react`) + Next.js** code patterns distilled from **`greensock/gsap-skills`**, **`zanwei/design-dna`**, and **6 Real-World High-Converting Web Animation Case Studies** (including the **Chilbot Hero** from the training reference).

---

## Case Study 1: The "Chilbot" Kinetic Mixed-Typography & Inline Pill Hero (From Training Reference)

### Visual & Motion DNA Breakdown (`zanwei/design-dna` Analysis)
- **Why It Looks So Good:**
  1. **Atmospheric Organic Canvas:** Deep olive/sage radial gradient background (`#3F522B` -> `#688249` -> `#182011`) with soft vignette framing.
  2. **Mixed Typography + Inline Icon Pills:** The H1 mixes crisp geometric sans (`"Create"`, `"and"`, `"effective"`, `"AI writing"`) with high-character serif italic (`"quick"`) and embeds **3 overlapping rounded icon pills** (`[📄][✏️][🎨]`) and a **tilted interactive CTA pill** (`rotate: -6deg`, `"Sign up. It's free!"`) directly inside the headline line flow!
  3. **3-Stage Timeline Choreography (`gsap.timeline` + `SplitText`):**
     - **Stage 1 (`0.0s`):** Top eyebrow (`"Google's favorite extension"`) + masked word-by-word reveal of the H1 (`yPercent: 110 -> 0`, `stagger: 0.04`).
     - **Stage 2 (`<0.25s`):** The 3 inline icon badges pop in with elastic overshoot (`scale: 0 -> 1`, `ease: "back.out(2.2)"`, `stagger: 0.07`) while the tilted `"Sign up. It's free!"` pill rocks into place (`rotation: -18 -> -6`).
     - **Stage 3 (`-=0.3s`):** The glassmorphic rating pill (`"★ 4.3/5 Rating / 3.5M+ Installs"`) fades up via `autoAlpha`, and the bottom dark-mode app preview window rises from `y: 80` and links to a subtle `ScrollTrigger` parallax scrub!

### Production React + GSAP Implementation (`ChilbotKineticHero.tsx`)
```tsx
"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function ChilbotKineticHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMotionOk: "(prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isReduced } = context.conditions as { isReduced: boolean };
          if (isReduced) {
            gsap.set([".hero-eyebrow", ".inline-pill-icon", ".tilted-cta-pill", ".trust-pill", ".app-preview-card"], {
              autoAlpha: 1,
              y: 0,
              scale: 1,
            });
            return;
          }

          // 1. Split headline words with overflow mask
          const split = SplitText.create(".hero-word-segment", {
            type: "words",
            mask: "words",
            aria: "auto",
          });

          // 2. Master Entrance Timeline
          const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.7 },
          });

          tl.from(".hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.5 })
            .from(
              split.words,
              {
                yPercent: 115,
                autoAlpha: 0,
                stagger: 0.045,
                duration: 0.75,
              },
              "<0.1"
            )
            .from(
              ".inline-pill-icon",
              {
                scale: 0,
                rotation: -20,
                autoAlpha: 0,
                stagger: 0.07,
                duration: 0.55,
                ease: "back.out(2.1)",
              },
              "-=0.45"
            )
            .from(
              ".tilted-cta-pill",
              {
                scale: 0.75,
                rotation: -18,
                autoAlpha: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)",
              },
              "-=0.35"
            )
            .from(
              ".trust-pill",
              { autoAlpha: 0, y: 18, duration: 0.5 },
              "-=0.4"
            )
            .from(
              ".app-preview-card",
              { autoAlpha: 0, y: 72, scale: 0.96, duration: 0.85, ease: "power4.out" },
              "-=0.35"
            );

          // 3. ScrollTrigger Parallax Scrub on the bottom app window
          gsap.to(".app-preview-card", {
            yPercent: -14,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });

          return () => split.revert();
        }
      );
    },
    { scope: containerRef }
  );

  // Context-safe magnetic hover on the tilted inline CTA pill
  const handlePillEnter = contextSafe(() => {
    gsap.to(".tilted-cta-pill", { scale: 1.07, rotation: -2, duration: 0.25, ease: "power2.out" });
  });
  const handlePillLeave = contextSafe(() => {
    gsap.to(".tilted-cta-pill", { scale: 1, rotation: -6, duration: 0.3, ease: "power2.out" });
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden px-6 pt-28 pb-16 text-[#F5F7F2]"
      style={{
        background:
          "radial-gradient(circle at 68% 42%, #748E54 0%, #465933 48%, #1C2414 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="hero-eyebrow mb-4 text-sm font-medium tracking-wide text-[#E2E9D8]/80">
          Google&apos;s favorite extension
        </p>

        {/* Mixed-Typography H1 with Inline Kinetic Badges */}
        <h1 className="mx-auto max-w-3xl text-5xl font-normal leading-[1.08] tracking-[-0.03em] sm:text-7xl">
          <span className="hero-word-segment">Create </span>
          <span className="hero-word-segment font-serif italic font-light">quick</span>
          <br />
          <span className="hero-word-segment">and </span>
          <span className="inline-flex items-center -space-x-2 align-middle mx-2">
            <span className="inline-pill-icon inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F1EA] text-lg shadow-md">
              📄
            </span>
            <span className="inline-pill-icon inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7FA655] text-lg shadow-md">
              ✏️
            </span>
            <span className="inline-pill-icon inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E88846] text-lg shadow-md">
              🎨
            </span>
          </span>
          <span className="hero-word-segment"> effective</span>
          <br />
          <span className="hero-word-segment">AI writing </span>
          <button
            onMouseEnter={handlePillEnter}
            onMouseLeave={handlePillLeave}
            style={{ transform: "rotate(-6deg)" }}
            className="tilted-cta-pill ml-2 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#5E7B3E] px-5 py-2.5 align-middle text-base font-medium text-white shadow-lg"
          >
            <span className="h-2 w-2 rounded-full bg-[#B8E986]" />
            Sign up. It&apos;s free!
          </button>
        </h1>

        {/* Glassmorphic Trust Badge */}
        <div className="trust-pill mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs tracking-wide backdrop-blur-md">
          <span>★ 4.3/5 Rating</span>
          <span className="opacity-40">/</span>
          <span>3.5M+ Installs</span>
        </div>

        {/* Bottom Floating Product Preview Window */}
        <div className="app-preview-card mx-auto mt-14 max-w-2xl rounded-t-2xl border border-white/15 bg-[#121311] p-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-white/70">
            <span>New message</span>
            <span>↗ ✕</span>
          </div>
          <div className="mt-3 rounded-xl bg-white p-4 text-left text-xs text-neutral-800">
            <span className="font-semibold text-red-500">M</span>{" "}
            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-neutral-600">
              hello@arnavguider.com
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Case Study 2: Apple / Linear Pinned Scrollytelling Feature Reveal (`gsap-scrolltrigger`)

- **Real-World Use Case:** Instead of dumping 4 long paragraphs of features that users scroll past without reading, **pin the section (`pin: true`)** for `+=240%` of the viewport height while scrubbing through 3 visual product states on the right and highlighting the active step on the left.
- **Critical `greensock/gsap-skills` Rules Applied:**
  1. `scrollTrigger` is placed on the **parent `gsap.timeline()`**, never on child tweens.
  2. We never animate the pinned container itself (`sectionRef.current`); we animate inner panels (`.step-panel`, `.visual-card`).
  3. Wrapped in `gsap.matchMedia()` so mobile viewports (`< 768px`) gracefully stack without forced pinning if screen height is tight.

```tsx
useGSAP(
  () => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
      const visuals = gsap.utils.toArray<HTMLElement>(".story-visual");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scrolly-section",
          start: "top top",
          end: () => `+=${panels.length * 100}%`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0.25, y: -12, duration: 0.5 })
          .fromTo(
            panel,
            { autoAlpha: 0.25, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "<"
          )
          .to(visuals[i - 1], { autoAlpha: 0, scale: 0.94, duration: 0.5 }, "<")
          .fromTo(
            visuals[i],
            { autoAlpha: 0, scale: 1.04, yPercent: 8 },
            { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.5 },
            "<"
          );
      });
    });
  },
  { scope: containerRef }
);
```

---

## Case Study 3: Stripe / Awwwards Fake Horizontal Scroll Showcase (`containerAnimation`)

- **Real-World Use Case:** Showcasing 4–6 portfolio case studies (Creative Agency) or property unit types (Real Estate Developer) horizontally as the user scrolls down vertically, with inner elements animating as each card enters the horizontal center!
- **Critical `greensock/gsap-skills` Rules Applied:**
  1. The main horizontal tween **MUST** use `ease: "none"` (otherwise 1:1 scroll synchronization breaks!).
  2. Child triggers inside the horizontal track reference `containerAnimation: scrollTween` and never set `pin: true` or `snap`.

```tsx
useGSAP(
  () => {
    const track = document.querySelector(".horizontal-track") as HTMLElement;
    if (!track) return;

    const scrollTween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none", // MANDATORY for containerAnimation!
      scrollTrigger: {
        trigger: ".horizontal-pin-wrap",
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    });

    // Animate badges inside each card as it reaches horizontal center
    gsap.utils.toArray<HTMLElement>(".case-card").forEach((card) => {
      const badge = card.querySelector(".roi-badge");
      if (!badge) return;
      gsap.from(badge, {
        y: 24,
        autoAlpha: 0,
        duration: 0.4,
         ease: "back.out(1.7)",
        scrollTrigger: {
          containerAnimation: scrollTween, // Tied to horizontal movement!
          trigger: card,
          start: "left 65%",
          toggleActions: "play none none reverse",
        },
      });
    });
  },
  { scope: containerRef }
);
```

---

## Case Study 4: 60fps Magnetic CTA Button & Cursor Spotlight (`gsap-performance` `quickTo`)

- **Real-World Use Case:** Making primary conversion buttons ("Booking Survei WA" / "Klaim Audit Gratis") feel tactile and magnetic on desktop pointers without dropping a single frame.
- **Why `gsap.quickTo()` is Mandatory:** Standard `gsap.to()` inside `onMouseMove` instantiates a new tween object on every pixel move. `gsap.quickTo()` reuses a single hyper-optimized tween instance on the compositor thread.

```tsx
useGSAP(
  () => {
    const btn = btnRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      xTo(dx * 0.28);
      yTo(dy * 0.28);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  },
  { scope: btnRef }
);
```

---

## Case Study 5: Interactive Bento / Property Filter with `Flip.getState()` (`gsap-plugins`)

- **Real-World Use Case:** When a buyer clicks filter tabs (`"Semua Unit"`, `"Cicilan < 3 Jt"`, `"Ready Stock Sidoarjo"`), cards shouldn't abruptly snap in/out. Using GSAP `Flip`, surviving cards glide smoothly to their new grid coordinates while entering/leaving cards fade seamlessly.

```tsx
const handleFilterChange = contextSafe((newCategory: string) => {
  // 1. Capture First state before DOM changes
  const state = Flip.getState(".property-card");

  // 2. Toggle visibility via data attribute or class
  gsap.utils.toArray<HTMLElement>(".property-card").forEach((card) => {
    const match = newCategory === "all" || card.dataset.category === newCategory;
    card.style.display = match ? "flex" : "none";
  });

  // 3. Invert & Play transition
  Flip.from(state, {
    duration: 0.55,
    scale: true,
    ease: "power3.inOut",
    stagger: 0.03,
    absolute: true,
    onEnter: (elements) =>
      gsap.fromTo(elements, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.4 }),
    onLeave: (elements) =>
      gsap.to(elements, { autoAlpha: 0, scale: 0.9, duration: 0.3 }),
  });

  // 4. Refresh ScrollTrigger positions below the grid
  ScrollTrigger.refresh();
});
```

---

## Case Study 6: High-Speed Batch Reveal & Tabular Number Counter (`ScrollTrigger.batch` + `gsap.utils.snap`)

- **Real-World Use Case:** Animating live agency metrics (`+312% ROAS`, `Rp 3.450 CPR`) and card grids as the user scrolls down rapidly on mobile or desktop.

```tsx
useGSAP(
  () => {
    // 1. Batched Staggered Card Reveal (Zero Observer Bloat)
    gsap.set(".bento-card", { autoAlpha: 0, y: 36 });
    ScrollTrigger.batch(".bento-card", {
      interval: 0.1,
      batchMax: 3,
      start: "top 85%",
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true,
        }),
    });

    // 2. Tabular Metric Counter with gsap.utils.snap
    gsap.utils.toArray<HTMLElement>(".metric-counter").forEach((el) => {
      const targetVal = Number(el.dataset.target || 100);
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: targetVal,
        duration: 1.4,
        ease: "power2.out",
        snap: { val: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = counterObj.val.toLocaleString("id-ID");
        },
      });
    });
  },
  { scope: containerRef }
);
```

---

## 10-Point GSAP Pre-Ship Audit Checklist (`/web-animation` QA Gate)

Before marking any animated web page complete, verify all 10 items:
1. [ ] Are all GSAP plugins (`useGSAP`, `ScrollTrigger`, `SplitText`, `Flip`) imported from the free `gsap` / `@gsap/react` package with **zero** `.npmrc` or Club token instructions?
2. [ ] Is `gsap.registerPlugin(...)` called once at module/app top level?
3. [ ] Are all React animations wrapped in `useGSAP(() => { ... }, { scope: containerRef })` with event handlers wrapped in `contextSafe()`?
4. [ ] Do fade animations use `autoAlpha` instead of raw `opacity` so hidden elements don't trap clicks?
5. [ ] Are `scrollTrigger` configs attached only to top-level tweens or parent `gsap.timeline()` (never nested inside child tweens)?
6. [ ] Does every `ScrollTrigger` use **either** `scrub` **or** `toggleActions` (never both), with `markers: true` removed for production?
7. [ ] If fake horizontal scroll (`containerAnimation`) is used, does the horizontal tween have `ease: "none"`?
8. [ ] Do pinned sections (`pin: true`) animate only inner child elements rather than the pinned container itself?
9. [ ] Are continuous pointer/cursor animations using `gsap.quickTo()` instead of creating new tweens per frame?
10. [ ] Is `gsap.matchMedia()` implemented to respect `prefers-reduced-motion: reduce` and adapt distances for mobile screens (`360x800`–`430x932`)?
