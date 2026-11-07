'use client';

import React, { useState, useEffect } from 'react';
import { Play, Download, Sun, Moon, Edit3, MousePointerClick, FolderDown } from 'lucide-react';
import { SlideDeck } from '../../types/slide';

interface TopBarProps {
  deck: SlideDeck;
  activeSlideIndex: number;
  onPresent: () => void;
  onOpenExportModal: () => void;
  onTitleChange: (newTitle: string) => void;
  onToggleTheme?: () => void;
  onSaveToDisk?: () => void;
  isSavingToDisk?: boolean;
  saveStatus?: string;
  isLightMode?: boolean;
  studioMode?: 'dark' | 'light';
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
  onSaveToDisk,
  isSavingToDisk = false,
  saveStatus,
  isLightMode = false,
  studioMode,
  isMounted: propMounted,
  isEditMode = false,
  onToggleEditMode,
}) => {
  const [internalMounted, setInternalMounted] = useState<boolean>(false);

  useEffect(() => {
    setInternalMounted(true);
  }, []);

  const mounted = propMounted !== undefined ? propMounted : internalMounted;
  const isStudioLight = studioMode !== undefined ? studioMode === 'light' : isLightMode;

  return (
    <header
      className={`h-14 border-b px-6 flex items-center justify-between select-none z-30 transition-colors duration-150 ${
        isStudioLight
          ? 'border-[#e4e4e7] bg-[#fafafa] text-zinc-900'
          : 'border-[#27272a] bg-[#09090b] text-white'
      }`}
    >
      {/* LEFT: Engine Logo & Deck Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className={`h-5 w-5 border flex items-center justify-center ${
              isStudioLight ? 'border-zinc-900' : 'border-white'
            }`}
          >
            <div
              className={`h-2 w-2 ${isStudioLight ? 'bg-zinc-900' : 'bg-white'}`}
            />
          </div>
          <span
            className={`text-xs font-mono font-bold tracking-widest uppercase ${
              isStudioLight ? 'text-zinc-900' : 'text-white'
            }`}
          >
            SLIDEDECK · NEXT
          </span>
        </div>

        <div
          className={`h-4 w-[1px] ${
            isStudioLight ? 'bg-[#e4e4e7]' : 'bg-[#27272a]'
          }`}
        />

        <input
          type="text"
          value={deck.title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={`bg-transparent text-sm font-medium transition-colors px-1 py-0.5 max-w-xs truncate outline-none ${
            isStudioLight
              ? 'text-zinc-900 hover:border-b hover:border-zinc-400 focus:border-b focus:border-zinc-900'
              : 'text-[#fafafa] hover:border-b hover:border-[#3f3f46] focus:border-b focus:border-white'
          }`}
          title="Click to rename deck"
        />

        {/* Project Folder Indicator & Quick Save to Disk Button */}
        {onSaveToDisk && (
          <button
            onClick={onSaveToDisk}
            disabled={isSavingToDisk}
            className={`flex items-center gap-1.5 border px-2.5 py-1 text-[11px] font-mono transition-all rounded-xs shadow-xs ${
              isStudioLight
                ? 'border-emerald-600/40 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-700'
                : 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-400'
            }`}
            title="Save project to ~/Downloads/deck-gen/projects/<slug>/ with deck.json and standalone slide HTML files"
          >
            <FolderDown className="h-3 w-3 text-emerald-500 shrink-0" />
            <span className="truncate max-w-[170px]">
              {isSavingToDisk ? 'SAVING...' : saveStatus || `SAVE (${deck.projectSlug || 'deck-gen'})`}
            </span>
          </button>
        )}
      </div>

      {/* CENTER: Slide Count & Active Transition Mode */}
      <div
        className={`flex items-center gap-4 text-xs font-mono ${
          isStudioLight ? 'text-zinc-500' : 'text-[#a1a1aa]'
        }`}
      >
        <div
          className={`flex items-center gap-2 border px-3 py-1 ${
            isStudioLight
              ? 'border-[#e4e4e7] bg-[#f4f4f5]'
              : 'border-[#27272a] bg-[#121214]'
          }`}
        >
          <span className={isStudioLight ? 'text-zinc-400' : 'text-[#71717a]'}>
            SLIDE:
          </span>
          <span
            className={`font-semibold ${
              isStudioLight ? 'text-zinc-900' : 'text-white'
            }`}
          >
            {String(activeSlideIndex + 1).padStart(2, '0')} / {String(deck.slides.length).padStart(2, '0')}
          </span>
        </div>
        <div
          className={`flex items-center gap-2 border px-3 py-1 ${
            isStudioLight
              ? 'border-[#e4e4e7] bg-[#f4f4f5]'
              : 'border-[#27272a] bg-[#121214]'
          }`}
        >
          <span className={isStudioLight ? 'text-zinc-400' : 'text-[#71717a]'}>
            TRANSITION:
          </span>
          <span
            className={`font-semibold uppercase ${
              isStudioLight ? 'text-zinc-900' : 'text-white'
            }`}
          >
            {deck.transition.type}
          </span>
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
                ? isStudioLight
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-400'
                  : 'border-emerald-400 bg-emerald-950/40 text-emerald-300 ring-1 ring-emerald-400'
                : isStudioLight
                ? 'border-[#e4e4e7] bg-[#f4f4f5] hover:bg-[#e4e4e7] hover:border-zinc-400 text-zinc-700'
                : 'border-[#27272a] bg-[#121214] hover:bg-[#18181b] hover:border-white text-zinc-300'
            }`}
            title="Toggle On-Canvas PowerPoint Edit Mode (Shortcut: E)"
          >
            {isEditMode ? (
              <>
                <MousePointerClick
                  className={`h-3.5 w-3.5 ${isStudioLight ? 'text-emerald-700' : 'text-emerald-400'}`}
                />
                <span
                  className={`uppercase text-[11px] tracking-wider ${
                    isStudioLight ? 'text-emerald-800' : 'text-emerald-400'
                  }`}
                >
                  EDIT MODE [ON]
                </span>
              </>
            ) : (
              <>
                <Edit3
                  className={`h-3.5 w-3.5 ${isStudioLight ? 'text-zinc-500' : 'text-zinc-400'}`}
                />
                <span className="uppercase text-[11px] tracking-wider">
                  EDIT MODE
                </span>
              </>
            )}
          </button>
        )}

        {/* Toggle Light / Dark Studio Mode */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            suppressHydrationWarning
            className={`flex items-center gap-2 border px-3 py-1.5 text-xs font-mono font-medium transition-all shadow-sm ${
              isStudioLight
                ? 'border-[#e4e4e7] bg-[#f4f4f5] hover:bg-[#e4e4e7] hover:border-zinc-400 text-zinc-800'
                : 'border-[#27272a] bg-[#121214] hover:bg-[#18181b] hover:border-white text-white'
            }`}
            title="Toggle Studio Light / Dark Mode (Only affects Studio UI, not the slide canvas)"
          >
            {mounted && isStudioLight ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-500" />
                <span className="uppercase text-[11px] tracking-wider text-amber-600 font-semibold">
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
          className={`flex items-center gap-2 border px-3.5 py-1.5 text-xs font-mono font-medium transition-all shadow-sm ${
            isStudioLight
              ? 'border-[#e4e4e7] bg-[#f4f4f5] hover:bg-[#e4e4e7] hover:border-zinc-400 text-zinc-800'
              : 'border-[#27272a] bg-[#121214] hover:bg-[#18181b] hover:border-white text-white'
          }`}
          title="Present Fullscreen (F5 / Space)"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>PRESENT [F5]</span>
        </button>

        {/* Universal Export Dropdown */}
        <button
          onClick={onOpenExportModal}
          className={`flex items-center gap-2 border px-3.5 py-1.5 text-xs font-mono font-semibold transition-all shadow-sm ${
            isStudioLight
              ? 'border-zinc-900 bg-zinc-900 hover:bg-zinc-800 text-white'
              : 'border-white bg-white hover:bg-[#e4e4e7] text-black'
          }`}
          title="Export as Vector PDF, Raster PDF, Editable PPTX, or SVG"
        >
          <Download className="h-3.5 w-3.5" />
          <span>EXPORT</span>
        </button>
      </div>
    </header>
  );
};
