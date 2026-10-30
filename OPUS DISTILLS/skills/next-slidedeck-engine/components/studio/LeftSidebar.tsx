'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
} from 'lucide-react';
import { Slide, LayoutType, ThemeConfig, ChromeStyle } from '../../types/slide';
import { THEMES } from '../../presets/themes';
import { SlideRenderer } from '../slides/SlideRenderer';

interface LeftSidebarProps {
  slides: Slide[];
  activeSlideIndex: number;
  theme?: ThemeConfig;
  chromeStyle?: ChromeStyle;
  brandLabel?: string;
  studioMode?: 'dark' | 'light';
  onSelectSlide: (index: number) => void;
  onAddSlide: (layout: LayoutType) => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onMoveSlide: (index: number, direction: 'up' | 'down') => void;
}

const SlideThumbnailPreview: React.FC<{
  slide: Slide;
  theme: ThemeConfig;
  index: number;
  totalSlides: number;
  chromeStyle?: ChromeStyle;
  brandLabel?: string;
}> = ({ slide, theme, index, totalSlides, chromeStyle, brandLabel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.09);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 1920);
        }
      }
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden pointer-events-none select-none bg-zinc-950"
    >
      <div
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <SlideRenderer
          slide={slide}
          theme={theme}
          transition={{ type: 'crossfade', duration: 0 }}
          index={index}
          totalSlides={totalSlides}
          chromeStyle={chromeStyle}
          brandLabel={brandLabel}
          isThumbnail={true}
        />
      </div>
    </div>
  );
};

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  slides,
  activeSlideIndex,
  theme,
  chromeStyle,
  brandLabel,
  studioMode = 'dark',
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onMoveSlide,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const isLight = studioMode === 'light';
  const activeTheme = theme || THEMES['obsidian-pure'];

  const availableLayouts: { type: LayoutType; label: string; desc: string }[] = [
    { type: 'cover', label: 'Cover Title', desc: 'Hero headline with metadata' },
    { type: 'metrics', label: 'Key Metrics', desc: '4-column big stat cards' },
    { type: 'split', label: 'Asymmetric Split', desc: '60/40 headline and bullets' },
    { type: 'pillars', label: '3-Pillars', desc: 'Three vertical modular cards' },
    { type: 'bento', label: 'Bento Matrix', desc: 'Modern asymmetric grid' },
    { type: 'process-stepped-5', label: '01-05 Steps Flow', desc: 'Numbered step sequence' },
    { type: 'team-trio-portraits', label: 'Team Leadership', desc: '3 portrait cards with role pills' },
    { type: 'comparison', label: 'Problem vs Solution', desc: 'Dual column side-by-side' },
    { type: 'timeline', label: 'Milestone Roadmap', desc: 'Phase progression flow' },
    { type: 'quote', label: 'Quote Spotlight', desc: 'Full-bleed doctrine citation' },
    { type: 'image', label: 'Image Hero', desc: 'Hero photo with narrative column' },
    { type: 'ai-gen', label: '✨ AI GEN (Autonomous)', desc: 'Autonomous AI creative layout design' },
    { type: 'html', label: 'Arbitrary Standalone HTML', desc: 'Pure 1-slide = 1 HTML file standard' },
  ];

  return (
    <aside
      className={`w-48 border-r flex flex-col justify-between select-none z-20 transition-colors duration-150 shrink-0 ${
        isLight
          ? 'border-[#e4e4e7] bg-[#f4f4f5] text-zinc-900'
          : 'border-[#222227] bg-[#0c0c0e] text-white'
      }`}
    >
      {/* Top Header: Slide Navigation Title + Add Button */}
      <div
        className={`px-2.5 py-2 border-b flex items-center justify-between shrink-0 ${
          isLight ? 'border-[#e4e4e7] bg-[#fafafa]' : 'border-[#222227] bg-[#0c0c0e]'
        }`}
      >
        <span
          className={`text-[10px] font-mono uppercase tracking-widest font-semibold ${
            isLight ? 'text-zinc-500' : 'text-[#71717a]'
          }`}
        >
          SLIDES ({slides.length})
        </span>

        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className={`flex items-center gap-1 border px-1.5 py-0.5 text-[10px] font-mono font-semibold transition-all ${
              isLight
                ? 'border-zinc-300 bg-white hover:border-zinc-900 text-zinc-900 shadow-xs'
                : 'border-[#27272a] bg-[#141418] hover:border-white text-white'
            }`}
            title="Add Slide"
          >
            <Plus className="h-2.5 w-2.5" />
            <span>NEW</span>
          </button>

          {/* New Slide Layout Picker Popover */}
          {showAddMenu && (
            <div
              className={`absolute left-0 mt-2 w-52 border shadow-2xl z-50 p-1 flex flex-col gap-0.5 max-h-[380px] overflow-y-auto ${
                isLight
                  ? 'border-[#e4e4e7] bg-white text-zinc-900'
                  : 'border-[#27272a] bg-[#121215] text-white'
              }`}
            >
              <div
                className={`px-2.5 py-1.5 border-b text-[9px] font-mono uppercase tracking-wider ${
                  isLight
                    ? 'border-[#e4e4e7] text-zinc-500'
                    : 'border-[#27272a] text-[#71717a]'
                }`}
              >
                SELECT LAYOUT
              </div>
              {availableLayouts.map((layout) => (
                <button
                  key={layout.type}
                  onClick={() => {
                    onAddSlide(layout.type);
                    setShowAddMenu(false);
                  }}
                  className={`text-left px-2.5 py-1.5 flex flex-col transition-colors rounded-sm ${
                    isLight ? 'hover:bg-[#f4f4f5]' : 'hover:bg-[#1a1a20]'
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono font-medium uppercase ${
                      isLight ? 'text-zinc-900' : 'text-white'
                    }`}
                  >
                    {layout.label}
                  </span>
                  <span
                    className={`text-[9px] truncate ${
                      isLight ? 'text-zinc-500' : 'text-[#71717a]'
                    }`}
                  >
                    {layout.desc}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Slide Thumbnails List (Clean Minimalist Filmstrip) */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
        {slides.map((slide, idx) => {
          const isActive = idx === activeSlideIndex;
          const shortLayout = slide.layout.replace(/[-_].*/, '').toUpperCase();
          return (
            <div
              key={slide.id || idx}
              data-slide-index={idx}
              onClick={() => onSelectSlide(idx)}
              className={`group relative flex flex-col p-1.5 rounded-sm cursor-pointer transition-all ${
                isActive
                  ? isLight
                    ? 'bg-zinc-200/60 ring-1 ring-zinc-400/80 shadow-xs'
                    : 'bg-white/[0.06] ring-1 ring-zinc-700 shadow-sm'
                  : isLight
                  ? 'hover:bg-zinc-100/70'
                  : 'hover:bg-white/[0.02]'
              }`}
            >
              {/* Top metadata: index number + minimal layout indicator */}
              <div className="flex items-center justify-between mb-1 px-0.5">
                <span
                  className={`text-[10px] font-mono font-bold tracking-wider ${
                    isActive
                      ? isLight
                        ? 'text-zinc-900'
                        : 'text-white'
                      : isLight
                      ? 'text-zinc-500'
                      : 'text-zinc-400'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-[8.5px] font-mono uppercase tracking-wider truncate max-w-[85px] ${
                    isActive
                      ? isLight
                        ? 'text-zinc-700 font-semibold'
                        : 'text-emerald-400 font-semibold'
                      : isLight
                      ? 'text-zinc-400'
                      : 'text-zinc-500'
                  }`}
                  title={slide.layout}
                >
                  {shortLayout}
                </span>
              </div>

              {/* Real Visual 16:9 Slide Canvas Preview */}
              <div
                className={`relative rounded-sm overflow-hidden border transition-all ${
                  isActive
                    ? isLight
                      ? 'border-zinc-900 ring-1 ring-zinc-900 shadow-xs'
                      : 'border-emerald-500 ring-1 ring-emerald-500 shadow-xs'
                    : isLight
                    ? 'border-zinc-200 group-hover:border-zinc-400'
                    : 'border-zinc-800/80 group-hover:border-zinc-700'
                }`}
              >
                <SlideThumbnailPreview
                  slide={slide}
                  theme={activeTheme}
                  index={idx}
                  totalSlides={slides.length}
                  chromeStyle={chromeStyle}
                  brandLabel={brandLabel}
                />

                {/* Floating Action Buttons ONLY ON HOVER (Zero idle clutter!) */}
                <div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute top-1 right-1 bg-black/90 backdrop-blur-md border border-zinc-700/80 p-0.5 rounded shadow-xl flex items-center gap-0.5 z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    disabled={idx === 0}
                    onClick={() => onMoveSlide(idx, 'up')}
                    className="p-1 text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    <ChevronUp className="h-2.5 w-2.5" />
                  </button>
                  <button
                    disabled={idx === slides.length - 1}
                    onClick={() => onMoveSlide(idx, 'down')}
                    className="p-1 text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    <ChevronDown className="h-2.5 w-2.5" />
                  </button>
                  <button
                    onClick={() => onDuplicateSlide(idx)}
                    className="p-1 text-zinc-400 hover:text-white transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="h-2.5 w-2.5" />
                  </button>
                  <button
                    disabled={slides.length <= 1}
                    onClick={() => onDeleteSlide(idx)}
                    className="p-1 text-zinc-400 hover:text-red-400 disabled:opacity-20 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-2.5 w-2.5" />
                  </button>
                </div>
              </div>

              {/* Slide Title preview */}
              <div
                className={`text-[9.5px] font-mono truncate px-0.5 mt-1 transition-colors ${
                  isActive
                    ? isLight
                      ? 'text-zinc-800 font-medium'
                      : 'text-zinc-200 font-medium'
                    : isLight
                    ? 'text-zinc-500 group-hover:text-zinc-700'
                    : 'text-zinc-500 group-hover:text-zinc-300'
                }`}
                title={slide.title}
              >
                {slide.title || 'Untitled Slide'}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
