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
  updatedAt: '2026-10-29T00:00:00.000Z',
  slides: [
    {
      id: 'slide-1',
      kicker: 'EXECUTIVE BRIEFING · STRATEGY & DEPLOYMENT',
      title: 'Autonomous Presentation Engine',
      subtitle: 'Minimalist Monochrome 16:9 Presentation Studio built on Next.js with Vector SVG & Morph Transitions',
      layout: 'cover',
      elements: {
        footnote: 'CONFIDENTIAL · INTERNAL ENGINEERING REPORT · 2026',
      },
    },
    {
      id: 'slide-2',
      kicker: 'CORE BENCHMARKS · SCALED PERFORMANCE',
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
        footnote: 'SOURCE: DISTRIBUTED TELEMETRY LOGS · OCT 2026',
      },
    },
    {
      id: 'slide-3',
      kicker: 'SYSTEM TOPOLOGY · ARCHITECTURAL SPLIT',
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
        footnote: 'SPECIFICATION v4.2 · ARCHITECTURE COHESION',
      },
    },
    {
      id: 'slide-4',
      kicker: 'INFRASTRUCTURE PILLARS · THREE-LAYER STACK',
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
        footnote: 'MODULAR FOUNDATION ARCHITECTURE · ZERO THIRD-PARTY BLOAT',
      },
    },
    {
      id: 'slide-5',
      kicker: 'BENTO MATRIX · COMPONENT ECOSYSTEM',
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
        footnote: 'COMPONENT PRIMITIVES · BENTO SPECIFICATION',
      },
    },
    {
      id: 'slide-6',
      kicker: 'EXECUTIVE SYNTHESIS · GUIDING PRINCIPLE',
      title: 'Purity in Technical Communication',
      subtitle: 'Clarity is not the absence of information, but the deliberate structuring of essential truth',
      layout: 'quote',
      elements: {
        quote: {
          text: 'Great slide presentations remove cognitive drag. When visual clutter and amateurish badges disappear, engineering precision and strategic clarity command the room.',
          author: 'SYSTEMS PRINCIPAL',
          role: 'STRATEGIC ARCHITECTURE GROUP',
        },
        footnote: 'CORE PHILOSOPHY · MINIMALIST MONOCHROME DOCTRINE',
      },
    },
    {
      id: 'slide-7',
      kicker: 'COMPARISON MATRIX · PARADIGM SHIFT',
      title: 'Legacy Generators vs Autonomous Engine',
      subtitle: 'Systematic architectural differences between legacy dashboard approaches and custom Next.js studio',
      layout: 'comparison',
      elements: {
        comparison: {
          leftTitle: 'LEGACY SLIDE TOOLS / STATIC DECKS',
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
        footnote: 'EVALUATION REPORT · ARCHITECTURAL RIGOR',
      },
    },
    {
      id: 'slide-8',
      kicker: 'STRATEGIC ROADMAP · MILESTONE PROGRESSION',
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
              'Integration of Zara Zhang Beautiful HTML Templates, universal vector export, and cross-platform CLI synchronization.',
          },
        ],
        footnote: 'DELIVERY SCHEDULE · AUTONOMOUS AI AGENT ECOSYSTEM',
      },
    },
  ],
};

export const LIGHT_CONSULTING_DECK: SlideDeck = {
  id: 'deck-consulting-strategy-2026',
  title: 'Strategic Growth & Operational Transformation',
  themeId: 'consulting-cream',
  transition: {
    type: 'morph',
    duration: 0.5,
    springBounce: 0.15,
  },
  updatedAt: '2026-10-29T00:00:00.000Z',
  slides: [
    {
      id: 'light-slide-1',
      kicker: 'MANAGEMENT CONSULTING · ADVISORY BRIEF',
      title: 'Global Market Expansion Strategy',
      subtitle: 'Comprehensive market sizing, unit economics, and operational roadmap for next-gen enterprises',
      layout: 'cover',
      elements: {
        footnote: 'CONFIDENTIAL · PREPARED FOR EXECUTIVE BOARD',
      },
    },
    {
      id: 'light-slide-2',
      kicker: 'EXECUTIVE METRICS · KEY PERFORMANCE INDICATORS',
      title: 'Q3 Financial & Operational Milestones',
      subtitle: 'Sustained margin expansion and enterprise client retention benchmarks',
      layout: 'metrics',
      elements: {
        metrics: [
          { id: 'lm1', value: '$48.2M', label: 'ARR RUN-RATE', subtext: 'Annual recurring revenue', change: '+38% YoY' },
          { id: 'lm2', value: '84.6%', label: 'GROSS MARGIN', subtext: 'Pure software margins', change: '+4.2 pts' },
          { id: 'lm3', value: '124%', label: 'NET RETENTION', subtext: 'Expansion within accounts', change: 'Top quartile' },
          { id: 'lm4', value: '9.4 mo', label: 'CAC PAYBACK', subtext: 'Capital efficient sales', change: '-2.1 mo' },
        ],
        footnote: 'AUDITED FINANCIAL DATA · Q3 2026',
      },
    },
    {
      id: 'light-slide-3',
      kicker: 'STRATEGIC PILLARS · THREE HORIZONS',
      title: 'Growth Vector Architecture',
      subtitle: 'Coordinated execution across customer acquisition, platform expansion, and international markets',
      layout: 'pillars',
      elements: {
        pillars: [
          { id: 'lp1', title: 'Horizon 1: Core Acceleration', tag: 'IMMEDIATE', description: 'Scale flagship enterprise motion and improve sales velocity across tier-1 accounts.' },
          { id: 'lp2', title: 'Horizon 2: Product Adjacencies', tag: 'SCALING', description: 'Launch autonomous AI workflows and API developer tier to capture mid-market volume.' },
          { id: 'lp3', title: 'Horizon 3: Global Footprint', tag: 'EXPANSION', description: 'Enter high-growth APAC and EMEA hubs with localized compliance and distribution.' },
        ],
        footnote: 'THREE HORIZONS MODEL · STRATEGY FRAMEWORK',
      },
    },
  ],
};

export const GEMINI_ARGON_DECK: SlideDeck = {
  id: 'deck-gemini-4-argon',
  title: 'Gemini 4 Argon: Frontier Multimodal Intelligence',
  themeId: 'obsidian-pure',
  transition: {
    type: 'morph',
    duration: 0.5,
    springBounce: 0.15,
  },
  updatedAt: '2026-10-29T00:00:00.000Z',
  slides: [
    {
      id: 'argon-slide-1',
      kicker: 'GOOGLE DEEPMIND · FRONTIER RESEARCH',
      title: 'Gemini 4 Argon: Autonomous Multimodal Intelligence',
      subtitle: 'Next-generation neuromorphic transformer architecture featuring infinite sparse context, sub-8ms time-to-first-token, and verifiable deterministic agentic execution.',
      layout: 'cover',
      elements: {
        footnote: 'GOOGLE DEEPMIND TECHNICAL REPORT · CONFIDENTIAL SPECIFICATION 2026',
      },
    },
    {
      id: 'argon-slide-2',
      kicker: 'EMPIRICAL BENCHMARK TELEMETRY',
      title: 'Quantitative Supremacy Across Compute Frontiers',
      subtitle: 'Rigorous benchmark validation against standardized mathematical, coding, and multimodal evaluation suites.',
      layout: 'metrics',
      elements: {
        metrics: [
          {
            id: 'am1',
            value: '10M+',
            label: 'CONTEXT WINDOW',
            subtext: 'Lossless needle-in-haystack retrieval with O(log N) compute overhead',
            change: '+500%',
            iconName: 'database',
            color: '#06B6D4',
          },
          {
            id: 'am2',
            value: '<8ms',
            label: 'TTFT LATENCY',
            subtext: 'Ultra-low latency streaming inference for agentic micro-loops',
            change: '-72%',
            iconName: 'zap',
            color: '#10B981',
          },
          {
            id: 'am3',
            value: '98.4%',
            label: 'MATH-500 SOTA',
            subtext: 'Formal self-verifying chain-of-thought proofs with zero hallucinations',
            change: 'VERIFIED',
            iconName: 'check-circle',
            color: '#8B5CF6',
          },
          {
            id: 'am4',
            value: '4.2x',
            label: 'FLOPS EFFICIENCY',
            subtext: 'Speculative multi-token decoding throughput on TPU v6e clusters',
            change: 'TPU v6e',
            iconName: 'cpu',
            color: '#38BDF8',
          },
        ],
        footnote: 'SOURCE: DEEPMIND BENCHMARK SUITE · OCTOBER 2026 AUDIT',
      },
    },
    {
      id: 'argon-slide-3',
      kicker: 'SYSTEM TOPOLOGY · DEEP ARCHITECTURE',
      title: 'Neuromorphic Core & Hybrid Attention Engine',
      subtitle: 'Dual-engine orchestration fusing dynamic memory compression with deterministic agentic planning primitives.',
      layout: 'split',
      elements: {
        callout: {
          kicker: 'NEUROMORPHIC RUNTIME',
          title: 'Continuous Multimodal Grounding',
          text: 'Fuses dense sensory perception with mathematical verification sandboxes to preserve deterministic coherence without catastrophic cognitive drift.',
          iconName: 'cpu',
          color: '#10B981',
        },
        bullets: [
          'Hybrid Dynamic Attention: Dynamically routes compute between dense local attention heads and sparse global latent memories.',
          'Native Multimodal Sensory Fusion: Zero-adapter raw tokenization across 4K video streams, spatial audio, and LiDAR telemetry.',
          'Sub-Millisecond Speculative Decoding: Multi-token tree speculation achieves 4.2x speedup on TPU v6e accelerators.',
          'Formal Verification Gate: Built-in mathematical sandbox prevents catastrophic drift during multi-turn agentic workflows.',
        ],
        footnote: 'TOPOLOGY SPECIFICATION v4.2 · NEUROMORPHIC RUNTIME',
      },
    },
    {
      id: 'argon-slide-4',
      kicker: 'FOUNDATIONAL PILLARS · THREE-LAYER STACK',
      title: 'The Three Pillars of Argon Intelligence',
      subtitle: 'Architectural foundations driving autonomous problem-solving and multimodal real-world operations.',
      layout: 'pillars',
      elements: {
        pillars: [
          {
            id: 'ap1',
            title: 'I. Spatial & Sensory Grounding',
            tag: 'PERCEPTION',
            iconName: 'target',
            color: '#06B6D4',
            description:
              'Native continuous coordinate grounding across high-resolution video streams and 3D point clouds without auxiliary visual encoders.',
          },
          {
            id: 'ap2',
            title: 'II. Deterministic Agentic Loops',
            tag: 'ORCHESTRATION',
            iconName: 'git-branch',
            color: '#10B981',
            description:
              'Self-correcting multi-step planning framework with sub-second feedback loops and automatic state checkpoint rollbacks.',
          },
          {
            id: 'ap3',
            title: 'III. Verifiable Code Synthesis',
            tag: 'SYNTHESIS',
            iconName: 'terminal',
            color: '#8B5CF6',
            description:
              'Direct compilation of multi-language software systems with automated unit test generation and zero security regressions.',
          },
        ],
        footnote: 'CORE PILLARS · HARMONIC FOUNDATION SPECIFICATION',
      },
    },
    {
      id: 'argon-slide-5',
      kicker: 'ENTERPRISE INFRASTRUCTURE & SPECIFICATION',
      title: 'Argon Enterprise Platform Telemetry',
      subtitle: 'Scalable enterprise deployment parameters, isolation security, and real-time observability telemetry.',
      layout: 'bento',
      elements: {
        bentoCards: [
          {
            id: 'ab1',
            title: 'Argon Isolated Multi-Tenant Sandbox',
            subtitle: 'ENTERPRISE SECURITY',
            description:
              'Hardware-isolated confidential compute enclaves guaranteeing zero training-data leakage and zero prompt leakage across enterprise boundaries.',
            spanCol: 2,
            spanRow: 1,
            badge: 'MIL-SPEC',
            stat: 'ZERO-LEAK',
            iconName: 'lock',
            color: '#10B981',
          },
          {
            id: 'ab2',
            title: 'Edge Quantization Engine',
            subtitle: 'EDGE RUNTIME',
            description:
              'Sub-8B parameter distillation runs natively on mobile devices and edge robots at 45 tokens/sec.',
            spanCol: 1,
            spanRow: 1,
            badge: 'FP4 / INT8',
            stat: '45 tok/s',
            iconName: 'box',
            color: '#38BDF8',
          },
          {
            id: 'ab3',
            title: 'Autonomous Tool Orchestration',
            subtitle: 'AGENT PROTOCOLS',
            description:
              'Native sub-millisecond execution over Model Context Protocol and Chrome DevTools Protocol.',
            spanCol: 1,
            spanRow: 1,
            badge: 'CDP / MCP / REST',
            stat: '0.00% Err',
            iconName: 'server',
            color: '#F59E0B',
          },
          {
            id: 'ab4',
            title: 'Continuous Telemetry & Audit Trail',
            subtitle: 'OBSERVABILITY',
            description:
              'Cryptographically signed execution traces and automated compliance logging for regulated financial and medical domains.',
            spanCol: 2,
            spanRow: 1,
            badge: 'VERIFIED',
            stat: '100% Trace',
            iconName: 'activity',
            color: '#8B5CF6',
          },
        ],
        footnote: 'ARGON TELEMETRY SPECIFICATION · PRODUCTION GRADE PLATFORM',
      },
    },
  ],
};

// ==========================================
// 4. ZARA ZHANG SOFT EDITORIAL DECK (Adapted from beautiful-html-templates/soft-editorial)
// ==========================================
export const ZARA_ZHANG_SOFT_EDITORIAL_DECK: SlideDeck = {
  id: "deck-zara-zhang-soft-editorial-2026",
  title: "Soft Editorial Literary Quarterly & Brand Story",
  themeId: "zara-zhang-soft-editorial",
  transition: {
    type: "crossfade",
    duration: 0.45,
    springBounce: 0.1,
  },
  updatedAt: "2026-10-30T00:00:00.000Z",
  slides: [
    {
      id: "zzse-1",
      kicker: "LITERARY CURATION · ISSUE NO. 14",
      title: "The Architecture of Unhurried Thought",
      subtitle: "A literary examination of tactile media, human typography, and quiet digital craft",
      layout: "cover",
      elements: {
        footnote: "FOLIO EDITIONS · PRINTED ON WARM CREAM VELLUM · CONFIDENTIAL",
      },
    },
    {
      id: "zzse-2",
      kicker: "CORE ESSAYS · EDITORIAL PILLARS",
      title: "Three Investigations into Form",
      subtitle: "Exploring literary calm and risograph color over corporate uniformity",
      layout: "pillars",
      elements: {
        pillars: [
          {
            id: "se-p1",
            title: "I. The Tactile Archive",
            tag: "PHYSICALITY",
            description: "Why physical paper grain and Cormorant serifs evoke deeper emotional recall than sterile sans-serif interfaces.",
            iconName: "file-text",
            color: "#E1A4C2",
          },
          {
            id: "se-p2",
            title: "II. Unhurried Cadence",
            tag: "TEMPO",
            description: "Designing for contemplative reflection rather than frantic engagement metrics and visual stimulation.",
            iconName: "compass",
            color: "#B7C7A8",
          },
          {
            id: "se-p3",
            title: "III. Risograph Pigment",
            tag: "COLOR",
            description: "Using soft candy pastels—dusty pink, chartreuse, blush—as structural grounding for complex thought.",
            iconName: "sparkles",
            color: "#D6DD63",
          },
        ],
        footnote: "EDITORIAL ARCHITECTURE · REPRODUCIBLE 16:9 STAGE",
      },
    },
    {
      id: "zzse-3",
      kicker: "AUDIENCE ENGAGEMENT · READER METRICS",
      title: "Reader Retention & Depth",
      subtitle: "Quantitative depth across longform essays and archival print editions",
      layout: "metrics",
      elements: {
        metrics: [
          {
            id: "se-m1",
            value: "94.2%",
            label: "FINISH RATE",
            subtext: "Full read-through on essays >4,000 words",
            change: "+18.4% YoY",
            iconName: "check-circle",
            color: "#E1A4C2",
          },
          {
            id: "se-m2",
            value: "14.8m",
            label: "AVG DWELL TIME",
            subtext: "Sustained attention per reading session",
            change: "Deep focus",
            iconName: "activity",
            color: "#B7C7A8",
          },
          {
            id: "se-m3",
            value: "72k",
            label: "SUBSCRIBERS",
            subtext: "Paid patron circulation across 42 countries",
            change: "Organic growth",
            iconName: "globe",
            color: "#D6DD63",
          },
          {
            id: "se-m4",
            value: "0%",
            label: "AD CLUTTER",
            subtext: "Pristine editorial environment with zero sponsored noise",
            change: "Pure craft",
            iconName: "shield",
            color: "#2A241B",
          },
        ],
        footnote: "ANNUAL CIRCULATION & ENGAGEMENT AUDIT · VERIFIED AUDIT",
      },
    },
    {
      id: "zzse-4",
      kicker: "DOCTRINE · THE EDITORIAL THESIS",
      title: "Clarity over Clutter",
      subtitle: "A declaration on typography, pacing, and visual proportion",
      layout: "quote",
      elements: {
        quote: {
          text: "True elegance does not announce itself with neon noise. It commands attention by creating an island of calm where thought has room to breathe.",
          author: "Editorial Directorate",
          role: "Soft Editorial Quarterly · Zurich & Tokyo",
        },
        footnote: "MANIFESTO ON TYPOGRAPHIC INTEGRITY · 2026",
      },
    },
  ],
};

// ==========================================
// 5. ZARA ZHANG EDITORIAL FOREST DECK (Adapted from beautiful-html-templates/editorial-forest)
// ==========================================
export const ZARA_ZHANG_EDITORIAL_FOREST_DECK: SlideDeck = {
  id: "deck-zara-zhang-editorial-forest-2026",
  title: "Canopy Ecological Observatory & Telemetry",
  themeId: "zara-zhang-editorial-forest",
  transition: {
    type: "morph",
    duration: 0.5,
    springBounce: 0.15,
  },
  updatedAt: "2026-10-30T00:00:00.000Z",
  slides: [
    {
      id: "zzef-1",
      kicker: "ECOLOGICAL RESEARCH · FIELD REPORT",
      title: "Biosphere Canopy Telemetry",
      subtitle: "Distributed environmental monitoring across old-growth rainforest reserves",
      layout: "cover",
      elements: {
        footnote: "INTERNATIONAL CONSERVATION COUNCIL · TELEMETRY NETWORK · 2026",
      },
    },
    {
      id: "zzef-2",
      kicker: "FIELD CAPABILITY · MODULAR MONITORING",
      title: "Canopy Sensor Infrastructure",
      subtitle: "Autonomous telemetry nodes powered by solar-scavenged micro-energy",
      layout: "bento",
      elements: {
        bentoCards: [
          {
            id: "ef-b1",
            title: "Acoustic Bio-Radar",
            subtitle: "SPECIES IDENTIFICATION",
            description: "Continuous ultrasonic and audible recording with on-device neural avian classification.",
            spanCol: 2,
            spanRow: 1,
            badge: "24/7 ACTIVE",
            stat: "1,240 species",
            iconName: "activity",
            color: "#C9A96E",
          },
          {
            id: "ef-b2",
            title: "Micro-Climate Mesh",
            subtitle: "ATMOSPHERIC FLUX",
            description: "Sub-canopy humidity, CO2 respiration, and sap-flow micro-sensors.",
            spanCol: 1,
            spanRow: 1,
            badge: "99.98% RELIABILITY",
            stat: "500 nodes",
            iconName: "database",
            color: "#284E3D",
          },
          {
            id: "ef-b3",
            title: "LoRaWAN Forest Gateway",
            subtitle: "LONG-RANGE TELEMETRY",
            description: "Satellite-linked mesh uplinks transmitting environmental telemetry directly to global open science repositories.",
            spanCol: 1,
            spanRow: 1,
            badge: "ZERO POWER GRID",
            stat: "45km range",
            iconName: "network",
            color: "#C9A96E",
          },
        ],
        footnote: "DISTRIBUTED FIELD MESH · TELEMETRY SUITE v4",
      },
    },
    {
      id: "zzef-3",
      kicker: "BIODIVERSITY METRICS · RECOVERY TRACKING",
      title: "Old-Growth Forest Restoration",
      subtitle: "Three-year quantitative recovery indicators across protected canopy sectors",
      layout: "metrics",
      elements: {
        metrics: [
          {
            id: "ef-m1",
            value: "+28.4%",
            label: "BIOMASS DENSITY",
            subtext: "Crown volume expansion measured by LiDAR",
            change: "Healthy rebound",
            iconName: "trending-up",
            color: "#C9A96E",
          },
          {
            id: "ef-m2",
            value: "4.8M t",
            label: "CARBON SEQUESTERED",
            subtext: "Annual verified soil & tree carbon absorption",
            change: "Tier-1 permanence",
            iconName: "target",
            color: "#F0EAD6",
          },
          {
            id: "ef-m3",
            value: "<0.01%",
            label: "CANOPY LOSS",
            subtext: "Zero illegal logging encroachment detected in Q1-Q4",
            change: "Full protection",
            iconName: "shield",
            color: "#C9A96E",
          },
          {
            id: "ef-m4",
            value: "100%",
            label: "OPEN ACCESS DATA",
            subtext: "Real-time environmental sensor feeds public for researchers",
            change: "Public good",
            iconName: "globe",
            color: "#F0EAD6",
          },
        ],
        footnote: "CANOPY ECOLOGY TELEMETRY · VERIFIED SATELLITE & SENSOR GROUND TRUTH",
      },
    },
  ],
};

// ==========================================
// 6. ZARA ZHANG BENTO GRID DECK (Adapted from frontend-slides-bento-grid.md)
// ==========================================
export const ZARA_ZHANG_BENTO_DECK: SlideDeck = {
  id: 'deck-zara-bento-2026',
  title: 'High-Density Bento Matrix Architecture',
  themeId: 'obsidian-pure',
  transition: {
    type: 'morph',
    duration: 0.5,
    springBounce: 0.15,
  },
  updatedAt: '2026-10-29T00:00:00.000Z',
  slides: [
    {
      id: 'zzb-1',
      kicker: 'MODULAR DESIGN SYSTEM · BENTO ARCHITECTURE',
      title: 'High-Density Bento Matrix',
      subtitle: 'Structured visual hierarchy combining quantitative metrics, capability cards, and graphic taxonomy',
      layout: 'cover',
      elements: {
        footnote: 'DESIGN BLUEPRINT · ZARA ZHANG ARCHETYPE ADAPTATION',
      },
    },
    {
      id: 'zzb-2',
      kicker: 'SUBSYSTEM CAPABILITY · BENTO GRID',
      title: 'Modular Engine Components',
      subtitle: 'Structured card layout balancing information density with pristine editorial breathing room',
      layout: 'bento',
      elements: {
        bentoCards: [
          {
            id: 'b1',
            title: 'Universal Export Engine',
            subtitle: 'MULTI-TARGET COMPILER',
            description:
              'Mathematical vector SVG, lossless PDF via Chrome CDP, and native Microsoft PowerPoint .pptx generation.',
            spanCol: 2,
            spanRow: 1,
            badge: 'PRODUCTION READY',
            stat: '100% Vector',
            iconName: 'layers',
            color: '#3B82F6',
          },
          {
            id: 'b2',
            title: 'On-Canvas PowerPoint Mode',
            subtitle: 'LIVE WYSIWYG',
            description:
              'Instant in-place editing across all headlines, metrics, and cards with live state synchronization.',
            spanCol: 1,
            spanRow: 1,
            badge: 'KEY [E]',
            stat: '<1ms Latency',
            iconName: 'edit',
            color: '#10B981',
          },
          {
            id: 'b3',
            title: 'Curated Theme Presets',
            subtitle: '38 DESIGN PALETTES',
            description:
              'Complete spectrum spanning Minimalist Monochrome, McKinsey Cream, and High-Energy Vibrant modes.',
            spanCol: 1,
            spanRow: 1,
            badge: '38 THEMES',
            stat: '4 Categories',
            iconName: 'sparkles',
            color: '#8B5CF6',
          },
          {
            id: 'b4',
            title: 'Hardware Morph Motion',
            subtitle: 'SPRING PHYSICS',
            description:
              'Shared layout interpolation delivering fluid element morphing between slide transitions without raster jitter.',
            spanCol: 2,
            spanRow: 1,
            badge: 'ZERO JITTER',
            stat: '60 FPS',
            iconName: 'zap',
            color: '#F59E0B',
          },
        ],
        footnote: 'BENTO ARCHITECTURE BLUEPRINT · FULL HD 1080P GRID',
      },
    },
    {
      id: 'zzb-3',
      kicker: 'DESIGN DOCTRINE · CORE PRINCIPLE',
      title: 'The Discipline of Simplicity',
      subtitle: 'Engineering excellence requires relentless subtraction of non-essential ornamentation',
      layout: 'quote',
      elements: {
        quote: {
          text:
            'Simplicity is prerequisite for reliability. A system that cannot be understood at a glance cannot be trusted in production.',
          author: 'Edsger W. Dijkstra',
          role: 'Foundational Systems Axiom',
        },
        footnote: 'ARCHITECTURAL DOCTRINE · ZERO AI SLOP ENFORCEMENT',
      },
    },
  ],
};

// ==========================================
// 7. ZARA ZHANG BOLD SIGNAL DECK (Adapted from frontend-slides-bold-signal.md)
// ==========================================
export const ZARA_ZHANG_BOLD_SIGNAL_DECK: SlideDeck = {
  id: 'deck-zara-bold-signal-2026',
  title: 'Signal Mode: The Velocity Thesis',
  themeId: 'bold-signal',
  transition: {
    type: 'morph',
    duration: 0.5,
    springBounce: 0.15,
  },
  updatedAt: '2026-10-29T00:00:00.000Z',
  slides: [
    {
      id: 'zbs-1',
      kicker: 'VENTURE BRIEFING · VELOCITY THESIS',
      title: 'Signal Over Noise',
      subtitle: 'High-conviction presentation framework for category-defining strategic pitches',
      layout: 'cover',
      elements: {
        footnote: 'CONFIDENTIAL · HIGH VELOCITY STRATEGY 2026',
      },
    },
    {
      id: 'zbs-2',
      kicker: 'GROWTH VELOCITY · EXPONENTIAL TRACTION',
      title: 'Category Dominance Metrics',
      subtitle: 'Defensive market momentum driven by product superiority and viral customer adoption',
      layout: 'metrics',
      elements: {
        metrics: [
          {
            id: 'm1',
            value: '12.4x',
            label: 'ANNUAL REVENUE MULTIPLIER',
            subtext: 'Accelerating growth trajectory across enterprise tiers',
            change: '+1,140% YoY',
            iconName: 'zap',
            color: '#FF5722',
          },
          {
            id: 'm2',
            value: '94%',
            label: 'ORGANIC ADOPTION RATE',
            subtext: 'Zero paid acquisition spend in customer acquisition',
            change: 'Word of Mouth',
            iconName: 'target',
            color: '#FF7043',
          },
          {
            id: 'm3',
            value: '$42M',
            label: 'COMMITTED ENTERPRISE PIPELINE',
            subtext: 'Fortune 500 pilots converting at 88% win rate',
            change: '88% Win Rate',
            iconName: 'bar-chart',
            color: '#FF8A65',
          },
          {
            id: 'm4',
            value: '2.1M',
            label: 'ACTIVE DEVELOPER WORKSPACES',
            subtext: 'Daily active engine workflows globally',
            change: '+240k / mo',
            iconName: 'cpu',
            color: '#FFA726',
          },
        ],
        footnote: 'MARKET METRICS · AUDITED TRACTION STREAM',
      },
    },
    {
      id: 'zbs-3',
      kicker: 'STRATEGIC SHIFT · MARKET FORCES',
      title: 'The Asymmetric Advantage',
      subtitle: 'Three compounding vectors creating an insurmountable category lead',
      layout: 'split',
      elements: {
        bullets: [
          'Full-stack deterministic execution eliminates brittle third-party cloud dependencies.',
          'Pure vector mathematical rendering ensures pristine reproduction across any resolution or format.',
          'Autonomous multi-agent swarms accelerate development velocity by an order of magnitude.',
          'Uncompromising editorial aesthetics create immediate category differentiation and customer trust.',
        ],
        footnote: 'COMPETITIVE MOAT · VELOCITY ENGINE 2026',
      },
    },
  ],
};

// ==========================================
// 8. SLIDESPEAK AI TRUST PITCH DECK (Adapted from ai-trust-layer-pitch.html)
// ==========================================
export const SLIDESPEAK_AI_TRUST_PITCH_DECK: SlideDeck = {
  id: 'deck-slidespeak-ai-trust',
  title: 'AI Trust & Governance Infrastructure',
  themeId: 'slidespeak-hypergradient',
  transition: {
    type: 'morph',
    duration: 0.5,
    springBounce: 0.15,
  },
  updatedAt: '2026-10-29T00:00:00.000Z',
  slides: [
    {
      id: 'sat-1',
      kicker: 'SLIDESPEAK ADVISORY · VENTURE BRIEF',
      title: 'The AI Trust Layer',
      subtitle: 'Cryptographic attestation and deterministic safety guardrails for autonomous enterprise intelligence',
      layout: 'cover',
      elements: {
        footnote: 'CONFIDENTIAL · ADAPTED FROM SLIDESPEAK AI TRUST PITCH ARCHETYPE',
      },
    },
    {
      id: 'sat-2',
      kicker: 'QUANTITATIVE ASSURANCE · BENCHMARKS',
      title: 'Verifiable Safety Benchmarks',
      subtitle: 'Deterministic audit metrics measured across 100M+ real-time enterprise model inferences',
      layout: 'metrics',
      elements: {
        metrics: [
          {
            id: 'sm1',
            value: '99.99%',
            label: 'POLICY ADHERENCE',
            subtext: 'Zero hallucinated execution escapes',
            change: 'Provable Safe',
            iconName: 'shield',
            color: '#A78BFA',
          },
          {
            id: 'sm2',
            value: '<1.2ms',
            label: 'GATEWAY LATENCY',
            subtext: 'Hardware enclave cryptographic checks',
            change: '-82% overhead',
            iconName: 'zap',
            color: '#818CF8',
          },
          {
            id: 'sm3',
            value: '0',
            label: 'DATA ESCAPES',
            subtext: 'Confidential compute memory boundary',
            change: 'Zero Leak',
            iconName: 'lock',
            color: '#C084FC',
          },
          {
            id: 'sm4',
            value: '100%',
            label: 'AUDIT TRACEABILITY',
            subtext: 'Zero-knowledge deterministic proof log',
            change: 'Cryptographic',
            iconName: 'file-check',
            color: '#E879F9',
          },
        ],
        footnote: 'AUDITED TELEMETRY · SLIDESPEAK HYPERGRADIENT RIGOR',
      },
    },
    {
      id: 'sat-3',
      kicker: 'STRATEGIC TENSION · THE PROBLEM',
      title: 'The Enterprise Black-Box Dilemma',
      subtitle: 'Unmonitored LLM agents operating against mission-critical databases create existential regulatory liability',
      layout: 'split',
      elements: {
        bullets: [
          'Enterprise adoption is blocked not by model capability, but by the absence of cryptographic verifiability.',
          'Post-hoc logging fails: once unauthorized data leaves the perimeter, data sovereignty is irrevocably broken.',
          'Prompt injection and non-deterministic agent workflows demand hardware-enforced policy gates at the kernel level.',
          'Autonomous systems require deterministic rollbacks and multi-party quorum signatures before executing mutations.',
        ],
        footnote: 'SECURITY MEMORANDUM · ENTERPRISE RISK ASSESSMENT',
      },
    },
    {
      id: 'sat-4',
      kicker: 'ARCHITECTURE · THREE TRUST PILLARS',
      title: 'Deterministic Control Plane',
      subtitle: 'Three cryptographic layers isolating generative model output from enterprise state modification',
      layout: 'pillars',
      elements: {
        pillars: [
          {
            id: 'sp1',
            title: 'I. Runtime Attestation',
            tag: 'ENCLAVE SECURITY',
            description:
              'Cryptographically sealed micro-VM execution environment verifying binary integrity before prompt ingestion.',
            iconName: 'shield',
            color: '#A78BFA',
          },
          {
            id: 'sp2',
            title: 'II. Deterministic Interceptor',
            tag: 'POLICY ENGINE',
            description:
              'Sub-millisecond AST parser evaluating all tool calls, database queries, and external API requests against strict ACL schemas.',
            iconName: 'cpu',
            color: '#818CF8',
          },
          {
            id: 'sp3',
            title: 'III. Zero-Knowledge Ledger',
            tag: 'IMMUTABLE AUDIT',
            description:
              'Mathematical proof bundles recorded to distributed append-only ledger for regulatory compliance without leaking prompt data.',
            iconName: 'database',
            color: '#C084FC',
          },
        ],
        footnote: 'SYSTEMS ARCHITECTURE · ZERO-TRUST AI GATEWAY',
      },
    },
    {
      id: 'sat-5',
      kicker: 'CAPABILITIES · ARCHITECTURAL BENTO',
      title: 'Integrated Enterprise Platform',
      subtitle: 'Modular infrastructure components designed for instant drop-in integration across cloud providers',
      layout: 'bento',
      elements: {
        bentoCards: [
          {
            id: 'sb1',
            title: 'Zero-Knowledge Proof Generator',
            subtitle: 'CRYPTOGRAPHIC ATTESTATION',
            description:
              'Generates succinct non-interactive arguments of knowledge (SNARKs) verifying that model inference adhered to governance rules.',
            spanCol: 2,
            spanRow: 1,
            badge: 'PROVABLE AI',
            stat: '0.00% DRIFT',
            iconName: 'lock',
            color: '#A78BFA',
          },
          {
            id: 'sb2',
            title: 'Model Context Protocol Bridge',
            subtitle: 'AGENT RUNTIME',
            description:
              'Native MCP server intercepting tool interactions with strict JSON Schema verification.',
            spanCol: 1,
            spanRow: 1,
            badge: 'MCP PROTOCOL',
            stat: '<1ms Overhead',
            iconName: 'terminal',
            color: '#818CF8',
          },
          {
            id: 'sb3',
            title: 'Continuous Telemetry Ledger',
            subtitle: 'REGULATORY COMPLIANCE',
            description:
              'Automated compliance reporting compatible with EU AI Act, HIPAA, and SOC2 Type II audit standards.',
            spanCol: 1,
            spanRow: 1,
            badge: 'EU AI ACT',
            stat: '100% READY',
            iconName: 'server',
            color: '#C084FC',
          },
          {
            id: 'sb4',
            title: 'Automated Quorum Signatures',
            subtitle: 'MULTI-PARTY CONSENSUS',
            description:
              'Requires threshold cryptographic signatures from human overseers before executing high-value wire transfers or data deletions.',
            spanCol: 2,
            spanRow: 1,
            badge: 'M-OF-N QUORUM',
            stat: 'AIR-GAPPED',
            iconName: 'git-branch',
            color: '#E879F9',
          },
        ],
        footnote: 'PLATFORM SPECIFICATION · DISTRIBUTED ARCHITECTURE',
      },
    },
  ],
};

export const SAMPLE_DECKS: Record<string, SlideDeck> = {
  'gemini-4-argon': GEMINI_ARGON_DECK,
  'strategic-dark': INITIAL_DECK,
  'consulting-light': LIGHT_CONSULTING_DECK,
  'slidespeak-ai-trust': SLIDESPEAK_AI_TRUST_PITCH_DECK,
  'zara-zhang-soft-editorial': ZARA_ZHANG_SOFT_EDITORIAL_DECK,
  'zara-zhang-editorial-forest': ZARA_ZHANG_EDITORIAL_FOREST_DECK,
  'zara-zhang-bento': ZARA_ZHANG_BENTO_DECK,
  'zara-zhang-bold-signal': ZARA_ZHANG_BOLD_SIGNAL_DECK,
};



