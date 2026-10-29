'use client';

import React, { useState } from 'react';
import {
  Plus,
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
  Layout,
  Maximize2,
} from 'lucide-react';
import { Slide, LayoutType } from '../../types/slide';

interface LeftSidebarProps {
  slides: Slide[];
  activeSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: (layout: LayoutType) => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onMoveSlide: (index: number, direction: 'up' | 'down') => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  slides,
  activeSlideIndex,
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onMoveSlide,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const availableLayouts: { type: LayoutType; label: string; desc: string }[] = [
    { type: 'cover', label: 'Cover Title', desc: 'Hero headline with metadata' },
    { type: 'metrics', label: 'Key Metrics', desc: '4-column big stat cards' },
    { type: 'split', label: 'Asymmetric Split', desc: '60/40 headline and bullets' },
    { type: 'pillars', label: '3-Pillars', desc: 'Three vertical modular cards' },
    { type: 'bento', label: 'Bento Matrix', desc: 'Modern asymmetric grid' },
    { type: 'quote', label: 'Quote Spotlight', desc: 'Full-bleed doctrine citation' },
    { type: 'comparison', label: 'Comparison Matrix', desc: 'Dual column side-by-side' },
    { type: 'timeline', label: 'Milestone Roadmap', desc: 'Phase progression flow' },
  ];

  return (
    <aside className="w-64 border-r border-[#27272a] bg-[#0c0c0e] flex flex-col justify-between select-none z-20">
      {/* Top Header: Slide Navigation Title + Add Button */}
      <div className="p-3 border-b border-[#27272a] flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#71717a]">
          SLIDE PAGES ({slides.length})
        </span>

        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-1 border border-[#27272a] bg-[#141417] hover:bg-[#1c1c21] hover:border-white px-2 py-1 text-xs font-mono text-white transition-colors"
            title="Add Slide"
          >
            <Plus className="h-3 w-3" />
            <span>NEW</span>
          </button>

          {/* New Slide Layout Picker Popover */}
          {showAddMenu && (
            <div className="absolute left-0 mt-2 w-56 border border-[#27272a] bg-[#121215] shadow-2xl z-50 p-1 flex flex-col gap-0.5">
              <div className="px-3 py-1.5 border-b border-[#27272a] text-[10px] font-mono uppercase tracking-wider text-[#71717a]">
                SELECT LAYOUT TEMPLATE
              </div>
              {availableLayouts.map((layout) => (
                <button
                  key={layout.type}
                  onClick={() => {
                    onAddSlide(layout.type);
                    setShowAddMenu(false);
                  }}
                  className="flex flex-col text-left px-3 py-2 hover:bg-[#1c1c22] transition-colors border-b border-[#1b1b20] last:border-b-0"
                >
                  <span className="text-xs font-mono font-medium text-white uppercase">
                    {layout.label}
                  </span>
                  <span className="text-[10px] text-[#71717a]">{layout.desc}</span>
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
                  ? 'border-white bg-[#141418] shadow-md'
                  : 'border-[#222227] bg-[#0e0e11] hover:border-[#383842] hover:bg-[#121216]'
              }`}
            >
              {/* Top metadata of thumbnail */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-white">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-[9px] font-mono uppercase px-1.5 py-0.5 border ${
                    isActive
                      ? 'border-[#3f3f46] bg-[#1f1f24] text-white'
                      : 'border-[#1f1f24] text-[#71717a]'
                  }`}
                >
                  {slide.layout}
                </span>
              </div>

              {/* Slide Title preview */}
              <div className="text-xs font-medium text-[#d4d4d8] group-hover:text-white line-clamp-2 leading-snug mb-3">
                {slide.title || 'Untitled Slide'}
              </div>

              {/* Action Buttons on Hover */}
              <div className="flex items-center justify-between border-t border-[#1b1b22] pt-2 mt-auto">
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSlide(idx, 'up');
                    }}
                    className="p-1 hover:bg-[#22222a] text-[#71717a] hover:text-white disabled:opacity-20 transition-colors"
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
                    className="p-1 hover:bg-[#22222a] text-[#71717a] hover:text-white disabled:opacity-20 transition-colors"
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
                    className="p-1 hover:bg-[#22222a] text-[#71717a] hover:text-white transition-colors"
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
                    className="p-1 hover:bg-[#22222a] text-[#71717a] hover:text-red-400 disabled:opacity-20 transition-colors"
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

      {/* Footer Info */}
      <div className="p-3 border-t border-[#27272a] text-[10px] font-mono text-[#52525b] flex items-center justify-between">
        <span>ASPECT: 16:9 FIXED</span>
        <span>1920x1080</span>
      </div>
    </aside>
  );
};
