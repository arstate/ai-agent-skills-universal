export type LayoutType =
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
  | 'bespoke';

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
  titleColor?: string;
  subtitleColor?: string;
  footnote?: string;
  rawHtml?: string;
  customCss?: string;
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
  rawHtml?: string;
  customCss?: string;
}

export interface SlideDeck {
  id: string;
  title: string;
  themeId: string;
  transition: TransitionConfig;
  slides: Slide[];
  updatedAt: string;
}
