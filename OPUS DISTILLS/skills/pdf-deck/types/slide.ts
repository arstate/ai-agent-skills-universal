export type ChromeStyle =
  | 'minimal'        // Modern Minimal: no top bar line, clean kicker left, footnote left, page number on bottom-right
  | 'editorial'      // Broadsheet Editorial: thin top & bottom hairline, kicker left, page number on bottom-right
  | 'badge-capsule'   // Modern Agency / Tech: pill badge for kicker top-left, footnote left, page number on bottom-right
  | 'creative-studio'// Vibrant Agency (Klyro / Chuckle style): brand pill tag + clean topic, page number on bottom-right
  | 'classic-rule'   // Executive / Consulting: crisp header rule with subtitle, page number on bottom-right
  | 'clean-bleed';   // Zero header chrome, max negative space, page number on bottom-right

export type LayoutType =
  // Core Legacy Archetypes
  | 'cover'
  | 'split'
  | 'metrics'
  | 'pillars'
  | 'bento'
  | 'quote'
  | 'comparison'
  | 'timeline'
  | 'image'
  | 'code'
  | 'html'
  | 'bespoke'
  | 'ai-gen'
  // Group 1: Covers & Hero Openers (10)
  | 'cover-headline'
  | 'cover-minimal'
  | 'cover-asymmetric'
  | 'cover-manifesto'
  | 'cover-split-brand'
  | 'cover-darkroom'
  | 'cover-editorial'
  | 'cover-technical'
  | 'cover-center-stage'
  | 'cover-stat-hero'
  // Group 2: Executive Narrative & Thesis (10)
  | 'split-narrative'
  | 'split-callout-hero'
  | 'split-dual-column'
  | 'split-problem-solution'
  | 'split-3-column-text'
  | 'split-sidebar-context'
  | 'split-statement-evidence'
  | 'split-quote-takeaway'
  | 'split-glossary-terms'
  | 'split-action-agenda'
  // Group 3: Key Metrics & Data Telemetry (10)
  | 'metrics-quad'
  | 'metrics-hero-trio'
  | 'metrics-trio'
  | 'metrics-duo-compare'
  | 'metrics-solo-monolith'
  | 'metrics-compact-hex'
  | 'metrics-delta-trend'
  | 'metrics-stat-strip'
  | 'metrics-donut-chart'
  | 'metrics-kpi-scorecard'
  // Group 4: Architecture & Systems (10)
  | 'pillars-trio'
  | 'pillars-quad'
  | 'pillars-duo'
  | 'system-pipeline'
  | 'system-layer-stack'
  | 'system-protocol-grid'
  | 'system-hub-spoke'
  | 'system-security-boundary'
  | 'system-api-telemetry'
  | 'system-monolith-micro'
  // Group 5: Modern Bento Grid Matrices (10)
  | 'bento-matrix'
  | 'bento-asymmetric-3'
  | 'bento-hero-left'
  | 'bento-hero-right'
  | 'bento-mosaic-5'
  | 'bento-feature-highlight'
  | 'bento-stat-split'
  | 'bento-horizontal-strip'
  | 'bento-dense-6'
  | 'bento-media-hybrid'
  // Group 6: Processes, Steps & Frameworks (10)
  | 'process-stepped-3'
  | 'process-stepped-4'
  | 'process-stepped-5'
  | 'process-circular-loop'
  | 'process-chevron-flow'
  | 'process-checklist-card'
  | 'process-action-ledger'
  | 'process-rule-of-three'
  | 'process-staircase-cards'
  | 'process-faq-accordion'
  // Group 7: Team, People & Leadership (10)
  | 'team-trio-portraits'
  | 'team-quad-portraits'
  | 'team-duo-founders'
  | 'team-solo-lead'
  | 'team-org-hierarchy'
  | 'team-principles-grid'
  | 'team-board-advisors'
  | 'team-engineering-squad'
  | 'team-global-network'
  | 'team-culture-manifesto'
  // Group 8: Comparisons & Problem-Solution (10)
  | 'comparison-dual'
  | 'comparison-problem-solution'
  | 'comparison-legacy-modern'
  | 'comparison-3-tier'
  | 'comparison-features-table'
  | 'comparison-pros-cons'
  | 'comparison-quadrant'
  | 'comparison-pricing'
  | 'comparison-swot-matrix'
  | 'comparison-buy-vs-build'
  // Group 9: Timelines, Roadmaps & Milestones (10)
  | 'timeline-roadmap'
  | 'timeline-quarterly'
  | 'timeline-vertical'
  | 'timeline-3-horizons'
  | 'timeline-releases'
  | 'timeline-gantt-minimal'
  | 'timeline-awards'
  | 'timeline-sprint-flow'
  | 'timeline-growth-curve'
  | 'timeline-launch-sequence'
  // Group 10: Media, Visuals & Showcase (10)
  | 'image-hero-right'
  | 'image-hero-left'
  | 'image-split-cards'
  | 'image-dual-compare'
  | 'image-trio-gallery'
  | 'image-floating-badges'
  | 'image-device-frame'
  | 'image-full-statement'
  | 'manifesto-color-block'
  | 'html-bespoke'
  | string; // Extensible string compatibility

export type TransitionType =
  | 'morph'
  | 'crossfade'
  | 'slide-x'
  | 'slide-y'
  | 'scale-zoom'
  | 'clip-reveal'
  | 'flip-3d'
  | 'stagger-blur';

export interface SlideImage {
  url: string;
  alt?: string;
  caption?: string;
  objectFit?: 'cover' | 'contain' | 'none'; // Default 'cover' to ensure zero stretching!
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4' | '2/3' | 'auto';
  scale?: number; // 1.0 = 100%, 1.2 = 120%, up to 2.5
  positionX?: number; // 0% - 100%, default 50%
  positionY?: number; // 0% - 100%, default 50%
  borderRadius?: number; // 0 for architectural sharp, 4, 8, etc.
  border?: boolean; // Optical hairline border
  filter?: string; // e.g. 'none', 'grayscale(100%)', 'contrast(110%)'
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  subtext?: string;
  change?: string;
  iconName?: string;
  color?: string;
}

export interface PillarItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  iconName?: string;
  color?: string;
}

export interface BentoCard {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  spanCol?: 1 | 2;
  spanRow?: 1 | 2;
  stat?: string;
  badge?: string;
  iconName?: string;
  color?: string;
  image?: SlideImage;
}

export interface TimelineItem {
  id: string;
  phase: string;
  title: string;
  description: string;
  status?: 'done' | 'active' | 'upcoming';
}

export interface SlideElements {
  image?: SlideImage;
  images?: SlideImage[];
  metrics?: MetricItem[];
  pillars?: PillarItem[];
  bentoCards?: BentoCard[];
  bullets?: string[];
  team?: Array<{
    id: string;
    name: string;
    role: string;
    bio?: string;
    avatarUrl?: string;
    color?: string;
  }>;
  steps?: Array<{
    id: string;
    stepNumber: string;
    title: string;
    description: string;
    color?: string;
  }>;
  problemSolution?: {
    problemTitle?: string;
    problems?: string[];
    solutionTitle?: string;
    solutions?: string[];
  };
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
  comparison?: {
    leftTitle: string;
    leftItems: string[];
    rightTitle: string;
    rightItems: string[];
  };
  codeBlock?: {
    code: string;
    language: string;
    filename?: string;
  };
  callout?: {
    kicker?: string;
    title?: string;
    text: string;
    iconName?: string;
    color?: string;
  };
  aiVariant?: string;
  titleColor?: string;
  subtitleColor?: string;
  footnote?: string;
  bg?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  secondaryAccentColor?: string;
  rawHtml?: string;
  customCss?: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  category?: 'light' | 'dark' | 'vibrant' | 'editorial' | 'ai-gen';
  isLight?: boolean;
  bg: string;
  surface: string;
  surfaceRaised: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  secondaryAccent?: string;
  fontHeading: string;
  fontBody: string;
  fontMono: string;
}

export interface TransitionConfig {
  type: TransitionType;
  duration: number; // in seconds, e.g. 0.5
  springBounce?: number;
}

export interface Slide {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  layout: LayoutType;
  chromeStyle?: ChromeStyle;
  elements: SlideElements;
  rawHtml?: string;
  customCss?: string;
}

export interface SlideDeck {
  id: string;
  title: string;
  projectSlug?: string;
  themeId: string;
  customTheme?: ThemeConfig;
  chromeStyle?: ChromeStyle;
  brandLabel?: string;
  transition: TransitionConfig;
  slides: Slide[];
  updatedAt: string;
}
