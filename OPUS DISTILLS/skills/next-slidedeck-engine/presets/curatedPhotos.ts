import { SlideImage } from '../types/slide';

export interface CuratedPhoto {
  id: string;
  label: string;
  category: 'architecture' | 'technology' | 'minimal' | 'abstract' | 'nature';
  url: string;
  author: string;
}

export const CURATED_SLIDE_PHOTOS: CuratedPhoto[] = [
  {
    id: 'arch-monolith',
    label: 'Concrete Monolith',
    category: 'architecture',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    author: 'Unsplash Architectural',
  },
  {
    id: 'cyber-semiconductor',
    label: 'Silicon Circuitry',
    category: 'technology',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    author: 'Unsplash Technology',
  },
  {
    id: 'minimal-grid',
    label: 'Modern Facade Grid',
    category: 'minimal',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    author: 'Unsplash Minimal',
  },
  {
    id: 'datacenter-server',
    label: 'Compute Array',
    category: 'technology',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
    author: 'Unsplash Tech',
  },
  {
    id: 'nordic-interior',
    label: 'Studio Gallery',
    category: 'minimal',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    author: 'Unsplash Studio',
  },
  {
    id: 'abstract-glass',
    label: 'Prism Refraction',
    category: 'abstract',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    author: 'Unsplash Abstract',
  },
  {
    id: 'dark-monochrome',
    label: 'Obsidian Geometric',
    category: 'architecture',
    url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1600&q=80',
    author: 'Unsplash Monochrome',
  },
  {
    id: 'organic-slate',
    label: 'Forest Canopy',
    category: 'nature',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    author: 'Unsplash Nature',
  },
];

export const DEFAULT_SLIDE_IMAGE: SlideImage = {
  url: CURATED_SLIDE_PHOTOS[0].url,
  alt: 'Architectural structural concrete geometry',
  caption: 'FIG 01 · STRUCTURAL MONOLITH ARCHITECTURE',
  objectFit: 'cover',
  aspectRatio: '16/9',
  scale: 1.0,
  positionX: 50,
  positionY: 50,
  borderRadius: 0,
  border: true,
  filter: 'none',
};
