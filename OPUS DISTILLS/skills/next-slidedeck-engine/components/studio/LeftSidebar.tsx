'use client';

import React, { useState } from 'react';
import {
  Plus,
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
} from 'lucide-react';
import { Slide, LayoutType } from '../../types/slide';

interface LeftSidebarProps {
  slides: Slide[];
  activeSlideIndex: number;
  studioMode?: 'dark' | 'light';
  onSelectSlide: (index: number) => void;
  onAddSlide: (layout: LayoutType) => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onMoveSlide: (index: number, direction: 'up' | 'down') => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  slides,
  activeSlideIndex,
  studioMode = 'dark',
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onMoveSlide,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const isLight = studioMode === 'light';

  const availableLayouts: { type: LayoutType; label: string; desc: string }[] = [
    { type: 'cover', label: 'Cover Title', desc: 'Hero headline with metadata' },
    { type: 'metrics', label: 'Key Metrics', desc: '4-column big stat cards' },
    { type: 'split', label: 'Asymmetric Split', desc: '60/40 headline and bullets' },
    { type: 'pillars', label: '3-Pillars', desc: 'Three vertical modular cards' },
    { type: 'bento', label: 'Bento Matrix', desc: 'Modern asymmetric grid' },
    { type: 'quote', label: 'Quote Spotlight', desc: 'Full-bleed doctrine citation' },
    { type: 'comparison', label: 'Comparison Matrix', desc: 'Dual column side-by-side' },
    { type: 'timeline', label: 'Milestone Roadmap', desc: 'Phase progression flow' },
    { type: 'html', label: 'Arbitrary Standalone HTML', desc: 'Pure 1-slide = 1 HTML file standard' },
  ];

  return (
    <aside
      className={`w-64 border-r flex flex-col justify-between select-none z-20 transition-colors duration-150 ${
        isLight
          ? 'border-[#e4e4e7] bg-[#f4f4f5] text-zinc-900'
          : 'border-[#27272a] bg-[#0c0c0e] text-white'
      }`}
    >
      {/* Top Header: Slide Navigation Title + Add Button */}
      <div
        className={`p-3 border-b flex items-center justify-between ${
          isLight ? 'border-[#e4e4e7]' : 'border-[#27272a]'
        }`}
      >
        <span
          className={`text-[11px] font-mono uppercase tracking-widest ${
            isLight ? 'text-zinc-500' : 'text-[#71717a]'
          }`}
        >
          SLIDE PAGES ({slides.length})
        </span>

        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className={`flex items-center gap-1 border px-2 py-1 text-xs font-mono transition-colors ${
              isLight
                ? 'border-[#e4e4e7] bg-white hover:bg-[#e4e4e7] hover:border-zinc-400 text-zinc-900'
                : 'border-[#27272a] bg-[#141417] hover:bg-[#1c1c21] hover:border-white text-white'
            }`}
            title="Add Slide"
          >
            <Plus className="h-3 w-3" />
            <span>NEW</span>
          </button>

          {/* New Slide Layout Picker Popover */}
          {showAddMenu && (
            <div
              className={`absolute left-0 mt-2 w-56 border shadow-2xl z-50 p-1 flex flex-col gap-0.5 ${
                isLight
                  ? 'border-[#e4e4e7] bg-white text-zinc-900'
                  : 'border-[#27272a] bg-[#121215] text-white'
              }`}
            >
              <div
                className={`px-3 py-1.5 border-b text-[10px] font-mono uppercase tracking-wider ${
                  isLight
                    ? 'border-[#e4e4e7] text-zinc-500'
                    : 'border-[#27272a] text-[#71717a]'
                }`}
              >
                SELECT LAYOUT TEMPLATE
              </div>
              {availableLayouts.map((layout) => (
                <button
                  key={layout.type}
                  onClick={() => {
                    onAddSlide(layout.type);
                    setShowAddMenu(false);
                  }}
                  className={`text-left px-3 py-2 flex flex-col transition-colors ${
                    isLight ? 'hover:bg-[#f4f4f5]' : 'hover:bg-[#1a1a20]'
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-medium uppercase ${
                      isLight ? 'text-zinc-900' : 'text-white'
                    }`}
                  >
                    {layout.label}
                  </span>
                  <span
                    className={`text-[10px] ${
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

      {/* Slide Thumbnails List */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">
        {slides.map((slide, idx) => {
          const isActive = idx === activeSlideIndex;
          return (
            <div
              key={slide.id || idx}
              onClick={() => onSelectSlide(idx)}
              className={`group relative flex flex-col border p-3 cursor-pointer transition-all ${
                isActive
                  ? isLight
                    ? 'border-zinc-900 bg-white shadow-sm ring-1 ring-zinc-900/10'
                    : 'border-white bg-[#141418] shadow-md'
                  : isLight
                  ? 'border-[#e4e4e7] bg-white/70 hover:border-zinc-400 hover:bg-white'
                  : 'border-[#222227] bg-[#0e0e11] hover:border-[#383842] hover:bg-[#121216]'
              }`}
            >
              {/* Top metadata of thumbnail */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-mono font-bold tracking-widest ${
                    isLight ? 'text-zinc-900' : 'text-white'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-[9px] font-mono uppercase px-1.5 py-0.5 border ${
                    isActive
                      ? isLight
                        ? 'border-zinc-300 bg-zinc-100 text-zinc-900 font-semibold'
                        : 'border-[#3f3f46] bg-[#1f1f24] text-white'
                      : isLight
                      ? 'border-zinc-200 text-zinc-500'
                      : 'border-[#1f1f24] text-[#71717a]'
                  }`}
                >
                  {slide.layout}
                </span>
              </div>

              {/* Slide Title preview */}
              <div
                className={`text-xs font-medium line-clamp-2 leading-snug mb-3 ${
                  isLight
                    ? 'text-zinc-700 group-hover:text-zinc-900'
                    : 'text-[#d4d4d8] group-hover:text-white'
                }`}
              >
                {slide.title || 'Untitled Slide'}
              </div>

              {/* Action Buttons on Hover */}
              <div
                className={`flex items-center justify-between border-t pt-2 mt-auto ${
                  isLight ? 'border-zinc-100' : 'border-[#1b1b22]'
                }`}
              >
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSlide(idx, 'up');
                    }}
                    className={`p-1 disabled:opacity-20 transition-colors ${
                      isLight
                        ? 'hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900'
                        : 'hover:bg-[#22222a] text-[#71717a] hover:text-white'
                    }`}
                    title="Move Up"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    disabled={idx === slides.length - 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSlide(idx, 'down');
                    }}
                    className={`p-1 disabled:opacity-20 transition-colors ${
                      isLight
                        ? 'hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900'
                        : 'hover:bg-[#22222a] text-[#71717a] hover:text-white'
                    }`}
                    title="Move Down"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicateSlide(idx);
                    }}
                    className={`p-1 transition-colors ${
                      isLight
                        ? 'hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900'
                        : 'hover:bg-[#22222a] text-[#71717a] hover:text-white'
                    }`}
                    title="Duplicate Slide"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                  <button
                    disabled={slides.length <= 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSlide(idx);
                    }}
                    className={`p-1 disabled:opacity-20 transition-colors ${
                      isLight
                        ? 'hover:bg-zinc-100 text-zinc-400 hover:text-red-600'
                        : 'hover:bg-[#22222a] text-[#71717a] hover:text-red-400'
                    }`}
                    title="Delete Slide"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
