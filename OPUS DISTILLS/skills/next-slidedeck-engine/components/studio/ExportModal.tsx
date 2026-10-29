'use client';

import React, { useState } from 'react';
import { X, Download, Check, Loader2, FileCode, Presentation, FileText } from 'lucide-react';
import { SlideDeck } from '../../types/slide';
import { ExportEngine } from '../../export/ExportEngine';

interface ExportModalProps {
  deck: SlideDeck;
  activeSlideIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  deck,
  activeSlideIndex,
  isOpen,
  onClose,
}) => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [successAction, setSuccessAction] = useState<string | null>(null);

  if (!isOpen) return null;

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
      <div className="w-full max-w-lg border border-[#27272a] bg-[#0c0c0e] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#27272a] p-4 bg-[#09090b]">
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-white" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">
              EXPORT PRESENTATION DECK
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#18181b] text-[#71717a] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content list of export options */}
        <div className="p-5 flex flex-col gap-3">
          {/* 1. PDF Vector */}
          <div className="border border-[#222227] bg-[#121215] p-3.5 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-white shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-bold text-white uppercase">
                  PDF Vector (SVG Print)
                </div>
                <div className="text-[11px] text-[#71717a] leading-tight mt-0.5">
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
              className="border border-white bg-white hover:bg-[#e4e4e7] text-black px-3 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ml-4"
            >
              PRINT PDF
            </button>
          </div>

          {/* 2. Editable PowerPoint */}
          <div className="border border-[#222227] bg-[#121215] p-3.5 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Presentation className="h-5 w-5 text-white shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-bold text-white uppercase">
                  PowerPoint Presentation (.pptx)
                </div>
                <div className="text-[11px] text-[#71717a] leading-tight mt-0.5">
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
              className="border border-[#27272a] bg-[#18181c] hover:border-white text-white px-3 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ml-4 flex items-center gap-1.5"
            >
              {loadingAction === 'pptx' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : successAction === 'pptx' ? (
                <Check className="h-3 w-3 text-green-400" />
              ) : null}
              <span>PPTX</span>
            </button>
          </div>

          {/* 3. SVG Single Slide */}
          <div className="border border-[#222227] bg-[#121215] p-3.5 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <FileCode className="h-5 w-5 text-white shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-bold text-white uppercase">
                  SVG Vector (Active Slide #{activeSlideIndex + 1})
                </div>
                <div className="text-[11px] text-[#71717a] leading-tight mt-0.5">
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
              className="border border-[#27272a] bg-[#18181c] hover:border-white text-white px-3 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ml-4"
            >
              SVG SLIDE
            </button>
          </div>

          {/* 4. SVG All Slides in ZIP */}
          <div className="border border-[#222227] bg-[#121215] p-3.5 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <FileCode className="h-5 w-5 text-white shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-bold text-white uppercase">
                  SVG Bundle (All {deck.slides.length} Slides in ZIP)
                </div>
                <div className="text-[11px] text-[#71717a] leading-tight mt-0.5">
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
              className="border border-[#27272a] bg-[#18181c] hover:border-white text-white px-3 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ml-4 flex items-center gap-1.5"
            >
              {loadingAction === 'svg-all' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : successAction === 'svg-all' ? (
                <Check className="h-3 w-3 text-green-400" />
              ) : null}
              <span>ZIP BUNDLE</span>
            </button>
          </div>

          {/* 5. PDF Raster 4K */}
          <div className="border border-[#222227] bg-[#121215] p-3.5 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-white shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-bold text-white uppercase">
                  PDF Raster (4K Canvas Snapshot)
                </div>
                <div className="text-[11px] text-[#71717a] leading-tight mt-0.5">
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
              className="border border-[#27272a] bg-[#18181c] hover:border-white text-white px-3 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ml-4 flex items-center gap-1.5"
            >
              {loadingAction === 'pdf-raster' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : successAction === 'pdf-raster' ? (
                <Check className="h-3 w-3 text-green-400" />
              ) : null}
              <span>4K PDF</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#27272a] p-3 bg-[#09090b] flex items-center justify-between text-[11px] font-mono text-[#71717a]">
          <span>STANDARD 16:9 • 1920x1080</span>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors"
          >
            CLOSE [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
