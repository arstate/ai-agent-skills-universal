import { SlideDeck } from '../types/slide';

export const INITIAL_DECK: SlideDeck = {
  id: 'deck-strategic-architecture-2026',
  title: 'Autonomous Systems Architecture & Execution',
  themeId: 'obsidian-pure',
  transition: {
    type: 'morph',
    duration: 0.5,
    springBounce: 0.15,
  },
  updatedAt: new Date().toISOString(),
  slides: [
    {
      id: 'slide-1',
      kicker: 'EXECUTIVE BRIEFING // STRATEGY & DEPLOYMENT',
      title: 'Autonomous Presentation Engine',
      subtitle: 'Minimalist Monochrome 16:9 Presentation Studio built on Next.js with Vector SVG & Morph Transitions',
      layout: 'cover',
      elements: {
        footnote: 'CONFIDENTIAL // INTERNAL ENGINEERING REPORT // 2026',
      },
    },
    {
      id: 'slide-2',
      kicker: 'CORE BENCHMARKS // SCALED PERFORMANCE',
      title: 'Throughput & Efficiency Targets',
      subtitle: 'Deterministic execution benchmarks measured across distributed edge clusters',
      layout: 'metrics',
      elements: {
        metrics: [
          {
            id: 'm1',
            value: '45,000',
            label: 'TPS THROUGHPUT',
            subtext: 'Sustained sub-second finality across 128 nodes',
            change: '+142% YoY',
          },
          {
            id: 'm2',
            value: '<12ms',
            label: 'P99 LATENCY',
            subtext: 'Global mesh BGP multi-homed routing',
            change: '-68% delay',
          },
          {
            id: 'm3',
            value: '99.999%',
            label: 'SYSTEM UPTIME',
            subtext: 'Zero planned service interruption in Q3/Q4',
            change: 'Fault tolerant',
          },
          {
            id: 'm4',
            value: '100%',
            label: 'VECTOR FIDELITY',
            subtext: 'Pure SVG mathematical scaling for PDF output',
            change: 'Lossless',
          },
        ],
        footnote: 'SOURCE: DISTRIBUTED TELEMETRY LOGS // OCT 2026',
      },
    },
    {
      id: 'slide-3',
      kicker: 'SYSTEM TOPOLOGY // ARCHITECTURAL SPLIT',
      title: 'Deterministic Partitioning Model',
      subtitle: 'Decoupling presentation state from raster rendering guarantees zero visual degradation',
      layout: 'split',
      elements: {
        bullets: [
          'Fixed 16:9 aspect ratio container (1920x1080) prevents fluid responsive distortion or line wrapping jumps.',
          'Strict 3-panel studio interface separates slide navigation, canvas design, and property inspectors.',
          'Zero UI clutter overlay inside the presentation stage ensures 100% focus on slide composition.',
          'Morph smooth transitions dynamically interpolate shared elements using motion physics.',
        ],
        footnote: 'SPECIFICATION v4.2 // ARCHITECTURE COHESION',
      },
    },
    {
      id: 'slide-4',
      kicker: 'INFRASTRUCTURE PILLARS // THREE-LAYER STACK',
      title: 'Core Modular Foundations',
      subtitle: 'Three decoupled systems operating synchronously to deliver publication-grade slide decks',
      layout: 'pillars',
      elements: {
        pillars: [
          {
            id: 'p1',
            title: 'I. Next.js Studio Runtime',
            tag: 'CORE ENGINE',
            description:
              'Lightweight Next.js App Router workspace with high-performance state management, instant hot-reload, and keyboard-driven presentation mode.',
          },
          {
            id: 'p2',
            title: 'II. Morph Animation Matrix',
            tag: 'TRANSITION',
            description:
              'Hardware-accelerated layout transitions supporting Morph Smooth, Crossfade, Directional Slides, and Zoom reveals.',
          },
          {
            id: 'p3',
            title: 'III. Universal Exporter',
            tag: 'PRINT & VECTOR',
            description:
              'Multi-target pipeline generating Vector SVG, 16:9 Print-to-PDF, editable PowerPoint (.pptx), and pure SVG archive bundles.',
          },
        ],
        footnote: 'MODULAR FOUNDATION ARCHITECTURE // ZERO THIRD-PARTY BLOAT',
      },
    },
    {
      id: 'slide-5',
      kicker: 'BENTO MATRIX // COMPONENT ECOSYSTEM',
      title: 'Modular Layout Primitives',
      subtitle: 'Structured information blocks designed according to strict typographical hierarchy',
      layout: 'bento',
      elements: {
        bentoCards: [
          {
            id: 'b1',
            title: 'Pure Monochrome Dark Mode',
            subtitle: 'DESIGN SYSTEM',
            description:
              'Eliminated all cartoonish emojis and chaotic gradients. Deep obsidian background with optical white hierarchy and razor-sharp zinc hairlines.',
            spanCol: 2,
            spanRow: 1,
            badge: 'AESTHETIC',
          },
          {
            id: 'b2',
            title: '1920x1080 Fixed Canvas',
            subtitle: 'STAGE ENGINE',
            description:
              'Exact coordinate frame with mathematical aspect-ratio scaling. Eliminates unpredictable responsive squishing.',
            spanCol: 1,
            spanRow: 1,
            stat: '16:9',
          },
          {
            id: 'b3',
            title: 'Multi-Format Exporter',
            subtitle: 'OUTPUT PIPELINE',
            description:
              'Choose between Vector PDF, Raster 4K PDF, Editable PPTX, or pure SVG exports with a single click.',
            spanCol: 1,
            spanRow: 1,
            badge: 'EXPORT',
          },
          {
            id: 'b4',
            title: 'Shared Morph Animations',
            subtitle: 'SPRING PHYSICS',
            description:
              'Seamlessly morph titles, metric numbers, and layout cards between consecutive slides without jarring jumps or flickering.',
            spanCol: 2,
            spanRow: 1,
            stat: '60 FPS',
          },
        ],
        footnote: 'COMPONENT PRIMITIVES // BENTO SPECIFICATION',
      },
    },
    {
      id: 'slide-6',
      kicker: 'EXECUTIVE SYNTHESIS // GUIDING PRINCIPLE',
      title: 'Purity in Technical Communication',
      subtitle: 'Clarity is not the absence of information, but the deliberate structuring of essential truth',
      layout: 'quote',
      elements: {
        quote: {
          text: 'Great slide presentations remove cognitive drag. When visual clutter and amateurish badges disappear, engineering precision and strategic clarity command the room.',
          author: 'SYSTEMS PRINCIPAL',
          role: 'STRATEGIC ARCHITECTURE GROUP',
        },
        footnote: 'CORE PHILOSOPHY // MINIMALIST MONOCHROME DOCTRINE',
      },
    },
    {
      id: 'slide-7',
      kicker: 'COMPARISON MATRIX // PARADIGM SHIFT',
      title: 'Legacy Generators vs Autonomous Engine',
      subtitle: 'Systematic architectural differences between legacy dashboard approaches and custom Next.js studio',
      layout: 'comparison',
      elements: {
        comparison: {
          leftTitle: 'LEGACY TOOLS (DASHI / DASHBOARDS)',
          leftItems: [
            'Rigid dashboard cards resembling server monitors',
            'Uniform rounded corners (12px) and progress bars',
            'Fluid squishy responsive canvas breaking print layout',
            'Chaotic emojis and uncurated theme palettes',
            'Heavy opaque dependencies with limited customization',
          ],
          rightTitle: 'NEXT.JS MONOCHROME ENGINE',
          rightItems: [
            'Bespoke executive layouts (Cover, Bento, Split, Pillars)',
            'Sharp 1px zinc hairlines with generous negative space',
            'Fixed 16:9 canvas with lossless mathematical scaling',
            'Clean monochrome palettes with zero decorative emojis',
            'Lightweight Next.js stack with instant Morph transitions',
          ],
        },
        footnote: 'EVALUATION REPORT // ARCHITECTURAL RIGOR',
      },
    },
    {
      id: 'slide-8',
      kicker: 'STRATEGIC ROADMAP // MILESTONE PROGRESSION',
      title: 'Implementation & Rollout Phases',
      subtitle: 'Chronological progression of features and ecosystem unification',
      layout: 'timeline',
      elements: {
        pillars: [
          {
            id: 't1',
            title: 'Phase 01: Core Studio Engine',
            tag: 'COMPLETED',
            description:
              '3-panel studio layout, fixed 16:9 scaling, Framer Motion morph transitions, and monochrome dark theme system.',
          },
          {
            id: 't2',
            title: 'Phase 02: Multi-Vector Export',
            tag: 'ACTIVE',
            description:
              'Lossless SVG renderer, 1920x1080 vector PDF export via headless browser and client-side PPTX generator.',
          },
          {
            id: 't3',
            title: 'Phase 03: Ecosystem Unification',
            tag: 'UPCOMING',
            description:
              'Full deprecation of legacy Dashi, integration into slidedeck-gen CLI, and laptop-wide auto-installer synchronization.',
          },
        ],
        footnote: 'DELIVERY SCHEDULE // AUTONOMOUS AI AGENT ECOSYSTEM',
      },
    },
  ],
};
