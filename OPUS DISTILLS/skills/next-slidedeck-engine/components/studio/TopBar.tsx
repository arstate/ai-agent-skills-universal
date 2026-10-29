'use client';

import React, { useState, useEffect } from 'react';
import { Play, Download, Sun, Moon, Edit3, MousePointerClick } from 'lucide-react';
import { SlideDeck } from '../../types/slide';

interface TopBarProps {
  deck: SlideDeck;
  activeSlideIndex: number;
  onPresent: () => void;
  onOpenExportModal: () => void;
  onTitleChange: (newTitle: string) => void;
  onToggleTheme?: () => void;
  isLightMode?: boolean;
  isMounted?: boolean;
  isEditMode?: boolean;
  onToggleEditMode?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  deck,
  activeSlideIndex,
  onPresent,
  onOpenExportModal,
  onTitleChange,
  onToggleTheme,
  isLightMode = false,
  isMounted: propMounted,
  isEditMode = false,
  onToggleEditMode,
}) => {
  const [internalMounted, setInternalMounted] = useState<boolean>(false);

  useEffect(() => {
    setInternalMounted(true);
  }, []);

  const mounted = propMounted !== undefined ? propMounted : internalMounted;

  return (
    <header className="h-14 border-b border-[#27272a] bg-[#09090b] px-6 flex items-center justify-between select-none z-30">
      {/* LEFT: Engine Logo & Deck Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 border border-white flex items-center justify-center">
            <div className="h-2 w-2 bg-white" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">
            SLIDEDECK // NEXT
          </span>
        </div>

        <div className="h-4 w-[1px] bg-[#27272a]" />

        <input
          type="text"
          value={deck.title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="bg-transparent text-sm font-medium text-[#fafafa] hover:border-b hover:border-[#3f3f46] focus:border-b focus:border-white focus:outline-none transition-colors px-1 py-0.5 max-w-md truncate"
          title="Click to rename deck"
        />
      </div>

      {/* CENTER: Slide Count & Active Transition Mode */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#a1a1aa]">
        <div className="flex items-center gap-2 border border-[#27272a] bg-[#121214] px-3 py-1">
          <span className="text-[#71717a]">SLIDE:</span>
          <span className="font-semibold text-white">
            {String(activeSlideIndex + 1).padStart(2, '0')} / {String(deck.slides.length).padStart(2, '0')}
          </span>
        </div>
        <div className="flex items-center gap-2 border border-[#27272a] bg-[#121214] px-3 py-1">
          <span className="text-[#71717a]">TRANSITION:</span>
          <span className="font-semibold text-white uppercase">{deck.transition.type}</span>
        </div>
      </div>

      {/* RIGHT: Actions (Edit Mode, Theme Toggle, Present, Export) */}
      <div className="flex items-center gap-3">
        {/* PowerPoint-like On-Canvas Edit Mode Toggle */}
        {onToggleEditMode && (
          <button
            onClick={onToggleEditMode}
            className={`flex items-center gap-2 border px-3 py-1.5 text-xs font-mono font-semibold transition-all shadow-sm ${
              isEditMode
                ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 ring-1 ring-emerald-400'
                : 'border-[#27272a] bg-[#121214] hover:bg-[#18181b] hover:border-white text-zinc-300'
            }`}
            title="Toggle On-Canvas PowerPoint Edit Mode (Shortcut: E)"
          >
            {isEditMode ? (
              <>
                <MousePointerClick className="h-3.5 w-3.5 text-emerald-400" />
                <span className="uppercase text-[11px] tracking-wider text-emerald-400">
                  EDIT MODE [ON]
                </span>
              </>
            ) : (
              <>
                <Edit3 className="h-3.5 w-3.5 text-zinc-400" />
                <span className="uppercase text-[11px] tracking-wider">
                  EDIT MODE
                </span>
              </>
            )}
          </button>
        )}

        {/* Toggle Light / Dark Mode Palette */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            suppressHydrationWarning
            className="flex items-center gap-2 border border-[#27272a] bg-[#121214] hover:bg-[#18181b] hover:border-white px-3 py-1.5 text-xs font-mono font-medium text-white transition-all shadow-sm"
            title="Toggle Light / Dark Mode Palette"
          >
            {mounted && isLightMode ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span className="uppercase text-[11px] tracking-wider text-amber-400 font-semibold">
                  LIGHT MODE
                </span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-[#a1a1aa]" />
                <span className="uppercase text-[11px] tracking-wider text-[#a1a1aa]">
                  DARK MODE
                </span>
              </>
            )}
          </button>
        )}

        {/* Fullscreen Present Button */}
        <button
          onClick={onPresent}
          className="flex items-center gap-2 border border-[#27272a] bg-[#121214] hover:bg-[#18181b] hover:border-white px-3.5 py-1.5 text-xs font-mono font-medium text-white transition-all shadow-sm"
          title="Present Fullscreen (F5 / Space)"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>PRESENT [F5]</span>
        </button>

        {/* Universal Export Dropdown */}
        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-2 border border-white bg-white hover:bg-[#e4e4e7] px-3.5 py-1.5 text-xs font-mono font-semibold text-black transition-all shadow-sm"
          title="Export as Vector PDF, Raster PDF, Editable PPTX, or SVG"
        >
          <Download className="h-3.5 w-3.5" />
          <span>EXPORT</span>
        </button>
      </div>
    </header>
  );
};
