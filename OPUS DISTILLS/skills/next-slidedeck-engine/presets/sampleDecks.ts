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
      kicker: 'MANAGEMENT CONSULTING // ADVISORY BRIEF',
      title: 'Global Market Expansion Strategy',
      subtitle: 'Comprehensive market sizing, unit economics, and operational roadmap for next-gen enterprises',
      layout: 'cover',
      elements: {
        footnote: 'CONFIDENTIAL // PREPARED FOR EXECUTIVE BOARD',
      },
    },
    {
      id: 'light-slide-2',
      kicker: 'EXECUTIVE METRICS // KEY PERFORMANCE INDICATORS',
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
        footnote: 'AUDITED FINANCIAL DATA // Q3 2026',
      },
    },
    {
      id: 'light-slide-3',
      kicker: 'STRATEGIC PILLARS // THREE HORIZONS',
      title: 'Growth Vector Architecture',
      subtitle: 'Coordinated execution across customer acquisition, platform expansion, and international markets',
      layout: 'pillars',
      elements: {
        pillars: [
          { id: 'lp1', title: 'Horizon 1: Core Acceleration', tag: 'IMMEDIATE', description: 'Scale flagship enterprise motion and improve sales velocity across tier-1 accounts.' },
          { id: 'lp2', title: 'Horizon 2: Product Adjacencies', tag: 'SCALING', description: 'Launch autonomous AI workflows and API developer tier to capture mid-market volume.' },
          { id: 'lp3', title: 'Horizon 3: Global Footprint', tag: 'EXPANSION', description: 'Enter high-growth APAC and EMEA hubs with localized compliance and distribution.' },
        ],
        footnote: 'THREE HORIZONS MODEL // STRATEGY FRAMEWORK',
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
      kicker: 'GOOGLE DEEPMIND // FRONTIER RESEARCH',
      title: 'Gemini 4 Argon: Autonomous Multimodal Intelligence',
      subtitle: 'Next-generation neuromorphic transformer architecture featuring infinite sparse context, sub-8ms time-to-first-token, and verifiable deterministic agentic execution.',
      layout: 'cover',
      elements: {
        footnote: 'GOOGLE DEEPMIND TECHNICAL REPORT // CONFIDENTIAL SPECIFICATION 2026',
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
        footnote: 'SOURCE: DEEPMIND BENCHMARK SUITE // OCTOBER 2026 AUDIT',
      },
    },
    {
      id: 'argon-slide-3',
      kicker: 'SYSTEM TOPOLOGY // DEEP ARCHITECTURE',
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
        footnote: 'TOPOLOGY SPECIFICATION v4.2 // NEUROMORPHIC RUNTIME',
      },
    },
    {
      id: 'argon-slide-4',
      kicker: 'FOUNDATIONAL PILLARS // THREE-LAYER STACK',
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
        footnote: 'CORE PILLARS // HARMONIC FOUNDATION SPECIFICATION',
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
        footnote: 'ARGON TELEMETRY SPECIFICATION // PRODUCTION GRADE PLATFORM',
      },
    },
  ],
};

export const SAMPLE_DECKS: Record<string, SlideDeck> = {
  'gemini-4-argon': GEMINI_ARGON_DECK,
  'strategic-dark': INITIAL_DECK,
  'consulting-light': LIGHT_CONSULTING_DECK,
};


