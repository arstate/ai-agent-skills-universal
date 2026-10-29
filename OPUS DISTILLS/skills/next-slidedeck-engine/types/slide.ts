export type LayoutType =
  | 'cover'
  | 'split'
  | 'metrics'
  | 'pillars'
  | 'bento'
  | 'quote'
  | 'comparison'
  | 'timeline'
  | 'code';

export type TransitionType =
  | 'morph'
  | 'crossfade'
  | 'slide-x'
  | 'slide-y'
  | 'scale-zoom'
  | 'clip-reveal'
  | 'flip-3d'
  | 'stagger-blur';

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  subtext?: string;
  change?: string;
}

export interface PillarItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  iconName?: string;
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
}

export interface TimelineItem {
  id: string;
  phase: string;
  title: string;
  description: string;
  status?: 'done' | 'active' | 'upcoming';
}

export interface SlideElements {
  metrics?: MetricItem[];
  pillars?: PillarItem[];
  bentoCards?: BentoCard[];
  bullets?: string[];
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
  footnote?: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  category?: 'light' | 'dark' | 'vibrant' | 'editorial';
  isLight?: boolean;
  bg: string;
  surface: string;
  surfaceRaised: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
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
  elements: SlideElements;
}

export interface SlideDeck {
  id: string;
  title: string;
  themeId: string;
  transition: TransitionConfig;
  slides: Slide[];
  updatedAt: string;
}
