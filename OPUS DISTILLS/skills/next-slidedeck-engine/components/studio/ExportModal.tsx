'use client';

import React, { useState } from 'react';
import { X, Download, Check, Loader2, FileCode, Presentation, FileText } from 'lucide-react';
import { SlideDeck } from '../../types/slide';
import { ExportEngine } from '../../export/ExportEngine';

interface ExportModalProps {
  deck: SlideDeck;
  activeSlideIndex: number;
  isOpen: boolean;
  studioMode?: 'dark' | 'light';
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  deck,
  activeSlideIndex,
  isOpen,
  studioMode = 'dark',
  onClose,
}) => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [successAction, setSuccessAction] = useState<string | null>(null);

  if (!isOpen) return null;

  const isLight = studioMode === 'light';

  const handleAction = async (actionKey: string, runner: () => Promise<void>) => {
    try {
      setLoadingAction(actionKey);
      await runner();
      setSuccessAction(actionKey);
      setTimeout(() => setSuccessAction(null), 2500);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div
        className={`w-full max-w-lg border shadow-2xl flex flex-col transition-colors ${
          isLight ? 'border-[#e4e4e7] bg-[#fafafa] text-zinc-900' : 'border-[#27272a] bg-[#0c0c0e] text-white'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between border-b p-4 ${
            isLight ? 'border-[#e4e4e7] bg-white' : 'border-[#27272a] bg-[#09090b]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Download className={`h-4 w-4 ${isLight ? 'text-zinc-900' : 'text-white'}`} />
            <span
              className={`text-xs font-mono font-bold tracking-widest uppercase ${
                isLight ? 'text-zinc-900' : 'text-white'
              }`}
            >
              EXPORT PRESENTATION DECK
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-1 transition-colors ${
              isLight ? 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900' : 'hover:bg-[#18181b] text-[#71717a] hover:text-white'
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Project Target Directory Banner */}
        <div
          className={`px-5 py-2 border-b text-[10.5px] font-mono flex items-center justify-between ${
            isLight ? 'border-[#e4e4e7] bg-emerald-50 text-emerald-900' : 'border-[#222227] bg-emerald-950/20 text-emerald-400'
          }`}
        >
          <span>📁 EXPORT DIRECTORY:</span>
          <span className="font-semibold truncate max-w-[280px]">
            ~/Downloads/deck-gen/projects/{deck.projectSlug || 'deck-presentation'}/export/
          </span>
        </div>

        {/* Content list of export options */}
        <div className="p-5 flex flex-col gap-3">
          {/* 1. PDF Vector */}
          <div
            className={`border p-3.5 flex items-center justify-between transition-colors ${
              isLight ? 'border-[#e4e4e7] bg-white' : 'border-[#222227] bg-[#121215]'
            }`}
          >
            <div className="flex items-start gap-3">
              <FileText className={`h-5 w-5 shrink-0 mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`} />
              <div>
                <div className={`text-xs font-mono font-bold uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  PDF Vector (SVG Print)
                </div>
                <div className={`text-[11px] leading-tight mt-0.5 ${isLight ? 'text-zinc-500' : 'text-[#71717a]'}`}>
                  16:9 fixed scale vector PDF with selectable text and SVG paths
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                handleAction('pdf-vector', async () => {
                  await ExportEngine.exportPdfVector();
                })
              }
              className={`border px-3 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ml-4 ${
                isLight
                  ? 'border-zinc-900 bg-zinc-900 hover:bg-zinc-800 text-white'
                  : 'border-white bg-white hover:bg-[#e4e4e7] text-black'
              }`}
            >
              PRINT PDF
            </button>
          </div>

          {/* 2. Editable PowerPoint */}
          <div
            className={`border p-3.5 flex items-center justify-between transition-colors ${
              isLight ? 'border-[#e4e4e7] bg-white' : 'border-[#222227] bg-[#121215]'
            }`}
          >
            <div className="flex items-start gap-3">
              <Presentation className={`h-5 w-5 shrink-0 mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`} />
              <div>
                <div className={`text-xs font-mono font-bold uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  PowerPoint Presentation (.pptx)
                </div>
                <div className={`text-[11px] leading-tight mt-0.5 ${isLight ? 'text-zinc-500' : 'text-[#71717a]'}`}>
                  Fully editable shapes, text frames, and metrics in native PPTX format
                </div>
              </div>
            </div>
            <button
              disabled={loadingAction === 'pptx'}
              onClick={() =>
                handleAction('pptx', async () => {
                  await ExportEngine.exportPptx(deck);
                })
              }
              className={`border px-3 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ml-4 flex items-center gap-1.5 ${
                isLight
                  ? 'border-[#e4e4e7] bg-[#f4f4f5] hover:border-zinc-400 text-zinc-900'
                  : 'border-[#27272a] bg-[#18181c] hover:border-white text-white'
              }`}
            >
              {loadingAction === 'pptx' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : successAction === 'pptx' ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : null}
              <span>PPTX</span>
            </button>
          </div>

          {/* 3. SVG Single Slide */}
          <div
            className={`border p-3.5 flex items-center justify-between transition-colors ${
              isLight ? 'border-[#e4e4e7] bg-white' : 'border-[#222227] bg-[#121215]'
            }`}
          >
            <div className="flex items-start gap-3">
              <FileCode className={`h-5 w-5 shrink-0 mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`} />
              <div>
                <div className={`text-xs font-mono font-bold uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  SVG Vector (Active Slide #{activeSlideIndex + 1})
                </div>
                <div className={`text-[11px] leading-tight mt-0.5 ${isLight ? 'text-zinc-500' : 'text-[#71717a]'}`}>
                  Pure mathematical 1920x1080 SVG vector file
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                handleAction('svg-single', async () => {
                  await ExportEngine.exportSvg(deck, activeSlideIndex);
                })
              }
              className={`border px-3 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ml-4 ${
                isLight
                  ? 'border-[#e4e4e7] bg-[#f4f4f5] hover:border-zinc-400 text-zinc-900'
                  : 'border-[#27272a] bg-[#18181c] hover:border-white text-white'
              }`}
            >
              SVG SLIDE
            </button>
          </div>

          {/* 4. SVG All Slides in ZIP */}
          <div
            className={`border p-3.5 flex items-center justify-between transition-colors ${
              isLight ? 'border-[#e4e4e7] bg-white' : 'border-[#222227] bg-[#121215]'
            }`}
          >
            <div className="flex items-start gap-3">
              <FileCode className={`h-5 w-5 shrink-0 mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`} />
              <div>
                <div className={`text-xs font-mono font-bold uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  SVG Bundle (All {deck.slides.length} Slides in ZIP)
                </div>
                <div className={`text-[11px] leading-tight mt-0.5 ${isLight ? 'text-zinc-500' : 'text-[#71717a]'}`}>
                  Complete archive of pure standalone SVG vector files
                </div>
              </div>
            </div>
            <button
              disabled={loadingAction === 'svg-all'}
              onClick={() =>
                handleAction('svg-all', async () => {
                  await ExportEngine.exportSvg(deck);
                })
              }
              className={`border px-3 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ml-4 flex items-center gap-1.5 ${
                isLight
                  ? 'border-[#e4e4e7] bg-[#f4f4f5] hover:border-zinc-400 text-zinc-900'
                  : 'border-[#27272a] bg-[#18181c] hover:border-white text-white'
              }`}
            >
              {loadingAction === 'svg-all' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : successAction === 'svg-all' ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : null}
              <span>ZIP BUNDLE</span>
            </button>
          </div>

          {/* 5. PDF Raster 4K */}
          <div
            className={`border p-3.5 flex items-center justify-between transition-colors ${
              isLight ? 'border-[#e4e4e7] bg-white' : 'border-[#222227] bg-[#121215]'
            }`}
          >
            <div className="flex items-start gap-3">
              <FileText className={`h-5 w-5 shrink-0 mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`} />
              <div>
                <div className={`text-xs font-mono font-bold uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  PDF Raster (4K Canvas Snapshot)
                </div>
                <div className={`text-[11px] leading-tight mt-0.5 ${isLight ? 'text-zinc-500' : 'text-[#71717a]'}`}>
                  High-res pixel-perfect PDF image snapshot
                </div>
              </div>
            </div>
            <button
              disabled={loadingAction === 'pdf-raster'}
              onClick={() =>
                handleAction('pdf-raster', async () => {
                  await ExportEngine.exportPdfRaster(deck);
                })
              }
              className={`border px-3 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ml-4 flex items-center gap-1.5 ${
                isLight
                  ? 'border-[#e4e4e7] bg-[#f4f4f5] hover:border-zinc-400 text-zinc-900'
                  : 'border-[#27272a] bg-[#18181c] hover:border-white text-white'
              }`}
            >
              {loadingAction === 'pdf-raster' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : successAction === 'pdf-raster' ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : null}
              <span>4K PDF</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`border-t p-3 flex items-center justify-between text-[11px] font-mono ${
            isLight ? 'border-[#e4e4e7] bg-white text-zinc-500' : 'border-[#27272a] bg-[#09090b] text-[#71717a]'
          }`}
        >
          <span>STANDARD 16:9 • 1920x1080</span>
          <button
            onClick={onClose}
            className={`transition-colors ${isLight ? 'hover:text-zinc-900' : 'hover:text-white'}`}
          >
            CLOSE [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
