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
  {
    id: 'portrait-creative-dir',
    label: 'Creative Director Portrait',
    category: 'minimal',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    author: 'Unsplash Portraits',
  },
  {
    id: 'portrait-art-dir',
    label: 'Art Director Portrait',
    category: 'minimal',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    author: 'Unsplash Portraits',
  },
  {
    id: 'portrait-strategist',
    label: 'Brand Strategist Portrait',
    category: 'minimal',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    author: 'Unsplash Portraits',
  },
  {
    id: 'portrait-designer',
    label: 'Lead Designer Portrait',
    category: 'minimal',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    author: 'Unsplash Portraits',
  },
];

export const DEFAULT_TEAM_MEMBERS = [
  {
    id: 'team-1',
    name: 'Michael Robert',
    role: 'CREATIVE DIRECTOR',
    bio: 'Directs cross-disciplinary brand strategy and narrative craft with 10+ years experience.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    color: '#3B82F6',
  },
  {
    id: 'team-2',
    name: 'Jack Shaw',
    role: 'ART DIRECTOR',
    bio: 'Oversees visual identity systems, bespoke typography pairing, and motion mechanics.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    color: '#10B981',
  },
  {
    id: 'team-3',
    name: 'Ricko Maulana',
    role: 'BRAND STRATEGIST',
    bio: 'Crafts high-converting value propositions and product positioning frameworks.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    color: '#F59E0B',
  },
  {
    id: 'team-4',
    name: 'Alicia Chen',
    role: 'LEAD ARCHITECT',
    bio: 'Leads systems engineering, interface physics, and multi-platform vector delivery.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    color: '#8B5CF6',
  },
];

export const DEFAULT_PROCESS_STEPS = [
  {
    id: 'step-1',
    stepNumber: '01',
    title: 'Discovery & Audit',
    description: 'Comprehensive digital footprint analysis, competitor reverse-engineering, and strategic positioning audit.',
    color: '#3B82F6',
  },
  {
    id: 'step-2',
    stepNumber: '02',
    title: 'Architecture & Craft',
    description: 'Bespoke design direction, mathematical 16:9 canvas geometry, and visual hierarchy formulation.',
    color: '#10B981',
  },
  {
    id: 'step-3',
    stepNumber: '03',
    title: 'Rapid Prototyping',
    description: 'Interactive component modeling, responsive stress-testing, and dynamic content integration.',
    color: '#F59E0B',
  },
  {
    id: 'step-4',
    stepNumber: '04',
    title: 'Verification & QA',
    description: 'Zero-slop automated linting, multi-viewport layout validation, and optical contrast testing.',
    color: '#EC4899',
  },
  {
    id: 'step-5',
    stepNumber: '05',
    title: 'Production Launch',
    description: 'Lossless vector PDF compilation, editable PPTX packaging, and real-time live presentation handoff.',
    color: '#8B5CF6',
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
