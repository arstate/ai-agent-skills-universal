'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Slide, ThemeConfig, TransitionConfig } from '../../types/slide';
import { SlideRenderer } from '../slides/SlideRenderer';
import { SvgIcon } from '../slides/SvgIcon';
import { Sparkles, Palette, Plus, MousePointerClick, Type, Shield, Layers, Trash2, X, Check } from 'lucide-react';

interface CenterCanvasProps {
  slide: Slide;
  theme: ThemeConfig;
  transition: TransitionConfig;
  activeSlideIndex: number;
  totalSlides: number;
  isEditMode?: boolean;
  onUpdateActiveSlide?: (updater: (prev: Slide) => Slide) => void;
  onUpdateDeckTheme?: (themeId: string) => void;
}

export const CenterCanvas: React.FC<CenterCanvasProps> = ({
  slide,
  theme,
  transition,
  activeSlideIndex,
  totalSlides,
  isEditMode = false,
  onUpdateActiveSlide,
  onUpdateDeckTheme,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.6);
  const [showIconPicker, setShowIconPicker] = useState<boolean>(false);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  // Available mathematical SVG icons for vector design elements (0% Emojis)
  const availableIcons = [
    'cpu',
    'sparkles',
    'activity',
    'zap',
    'shield',
    'layers',
    'database',
    'server',
    'terminal',
    'bar-chart',
    'trending-up',
    'target',
    'network',
    'box',
    'git-branch',
    'check-circle',
    'lock',
    'globe',
    'file-text',
    'workflow',
    'compass',
    'code',
  ];

  // PowerPoint-style presentation color swatches for text & card element accents
  const formatColors = [
    { label: 'Emerald', hex: '#10B981' },
    { label: 'Cyan', hex: '#06B6D4' },
    { label: 'Sky', hex: '#38BDF8' },
    { label: 'Violet', hex: '#8B5CF6' },
    { label: 'Rose', hex: '#F43F5E' },
    { label: 'Amber', hex: '#F59E0B' },
    { label: 'White', hex: '#FAFAFA' },
    { label: 'Zinc', hex: '#71717A' },
  ];

  // Quick preset themes for deck background styling
  const quickThemes = [
    { id: 'obsidian-pure', name: 'Obsidian', color: '#000000' },
    { id: 'titanium-precision', name: 'Titanium', color: '#090A0C' },
    { id: 'consulting-cream', name: 'Cream', color: '#F7F5F2' },
    { id: 'munich-bauhaus', name: 'Bauhaus', color: '#FFFFFF' },
    { id: 'venture-pitch-cobalt', name: 'Cobalt', color: '#2563EB' },
    { id: 'creative-voltage-neon-lime', name: 'Neon Lime', color: '#D4FF00' },
  ];

  // Clear selected element when switching slides
  useEffect(() => {
    setSelectedElementId(null);
  }, [slide.id]);

  // Compute fixed 16:9 scaling based on container dimensions
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const padding = isEditMode ? 88 : 64;
      const availableWidth = Math.max(clientWidth - padding, 320);
      const availableHeight = Math.max(clientHeight - padding, 180);

      const scaleX = availableWidth / 1920;
      const scaleY = availableHeight / 1080;
      const computedScale = Math.min(scaleX, scaleY);
      setScale(computedScale);
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [isEditMode]);

  const handleApplyColor = (colorHex: string) => {
    if (!onUpdateActiveSlide) return;
    if (!selectedElementId) {
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: { ...prev.elements, titleColor: colorHex },
      }));
      return;
    }
    if (selectedElementId === 'title') {
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: { ...prev.elements, titleColor: colorHex },
      }));
    } else if (selectedElementId === 'subtitle') {
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: { ...prev.elements, subtitleColor: colorHex },
      }));
    } else if (selectedElementId === 'callout') {
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          callout: { ...(prev.elements.callout || { text: '' }), color: colorHex },
        },
      }));
    } else if (selectedElementId.startsWith('metric-')) {
      const idx = parseInt(selectedElementId.replace('metric-', ''), 10);
      onUpdateActiveSlide((prev) => {
        const updated = [...(prev.elements.metrics || [])];
        if (updated[idx]) updated[idx] = { ...updated[idx], color: colorHex };
        return { ...prev, elements: { ...prev.elements, metrics: updated } };
      });
    } else if (selectedElementId.startsWith('pillar-')) {
      const idx = parseInt(selectedElementId.replace('pillar-', ''), 10);
      onUpdateActiveSlide((prev) => {
        const updated = [...(prev.elements.pillars || [])];
        if (updated[idx]) updated[idx] = { ...updated[idx], color: colorHex };
        return { ...prev, elements: { ...prev.elements, pillars: updated } };
      });
    } else if (selectedElementId.startsWith('bento-')) {
      const idx = parseInt(selectedElementId.replace('bento-', ''), 10);
      onUpdateActiveSlide((prev) => {
        const updated = [...(prev.elements.bentoCards || [])];
        if (updated[idx]) updated[idx] = { ...updated[idx], color: colorHex };
        return { ...prev, elements: { ...prev.elements, bentoCards: updated } };
      });
    }
  };

  const handleAddItem = () => {
    if (!onUpdateActiveSlide) return;
    if (slide.layout === 'metrics') {
      const newId = `m-${Date.now()}`;
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          metrics: [
            ...(prev.elements.metrics || []),
            {
              id: newId,
              value: '99.9%',
              label: 'NEW METRIC',
              subtext: 'Empirical benchmark telemetry',
              change: 'SOTA',
              iconName: 'activity',
              color: '#10B981',
            },
          ],
        },
      }));
    } else if (slide.layout === 'pillars' || slide.layout === 'timeline') {
      const newId = `p-${Date.now()}`;
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          pillars: [
            ...(prev.elements.pillars || []),
            {
              id: newId,
              title: 'New Strategic Pillar',
              tag: 'EXPANSION',
              iconName: 'layers',
              description: 'Detailed modular capability specification and execution framework.',
              color: '#38BDF8',
            },
          ],
        },
      }));
    } else if (slide.layout === 'bento') {
      const newId = `b-${Date.now()}`;
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          bentoCards: [
            ...(prev.elements.bentoCards || []),
            {
              id: newId,
              title: 'New Architecture Module',
              subtitle: 'PLATFORM',
              description: 'High-throughput hardware-accelerated processing pipeline.',
              badge: 'v4.0',
              stat: '100%',
              iconName: 'box',
              spanCol: 1,
              color: '#8B5CF6',
            },
          ],
        },
      }));
    } else if (slide.layout === 'split') {
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          bullets: [
            ...(prev.elements.bullets || []),
            'New architectural thesis point with verified telemetry verification.',
          ],
        },
      }));
    }
  };

  const handleDeleteItem = () => {
    if (!onUpdateActiveSlide || !selectedElementId) return;
    if (selectedElementId.startsWith('metric-')) {
      const idx = parseInt(selectedElementId.replace('metric-', ''), 10);
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          metrics: prev.elements.metrics?.filter((_, i) => i !== idx),
        },
      }));
      setSelectedElementId(null);
    } else if (selectedElementId.startsWith('pillar-')) {
      const idx = parseInt(selectedElementId.replace('pillar-', ''), 10);
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          pillars: prev.elements.pillars?.filter((_, i) => i !== idx),
        },
      }));
      setSelectedElementId(null);
    } else if (selectedElementId.startsWith('bento-')) {
      const idx = parseInt(selectedElementId.replace('bento-', ''), 10);
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          bentoCards: prev.elements.bentoCards?.filter((_, i) => i !== idx),
        },
      }));
      setSelectedElementId(null);
    } else if (selectedElementId.startsWith('bullet-')) {
      const idx = parseInt(selectedElementId.replace('bullet-', ''), 10);
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          bullets: prev.elements.bullets?.filter((_, i) => i !== idx),
        },
      }));
      setSelectedElementId(null);
    }
  };

  const handleSelectIcon = (iconName: string) => {
    if (!onUpdateActiveSlide) return;
    if (selectedElementId?.startsWith('metric-')) {
      const idx = parseInt(selectedElementId.replace('metric-', ''), 10);
      onUpdateActiveSlide((prev) => {
        const updated = [...(prev.elements.metrics || [])];
        if (updated[idx]) updated[idx] = { ...updated[idx], iconName };
        return { ...prev, elements: { ...prev.elements, metrics: updated } };
      });
    } else if (selectedElementId?.startsWith('pillar-')) {
      const idx = parseInt(selectedElementId.replace('pillar-', ''), 10);
      onUpdateActiveSlide((prev) => {
        const updated = [...(prev.elements.pillars || [])];
        if (updated[idx]) updated[idx] = { ...updated[idx], iconName };
        return { ...prev, elements: { ...prev.elements, pillars: updated } };
      });
    } else if (selectedElementId?.startsWith('bento-')) {
      const idx = parseInt(selectedElementId.replace('bento-', ''), 10);
      onUpdateActiveSlide((prev) => {
        const updated = [...(prev.elements.bentoCards || [])];
        if (updated[idx]) updated[idx] = { ...updated[idx], iconName };
        return { ...prev, elements: { ...prev.elements, bentoCards: updated } };
      });
    } else if (selectedElementId === 'callout') {
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          callout: { ...(prev.elements.callout || { text: '' }), iconName },
        },
      }));
    } else {
      if (slide.layout === 'metrics' && slide.elements.metrics?.length) {
        onUpdateActiveSlide((prev) => {
          const updated = [...(prev.elements.metrics || [])];
          updated[0] = { ...updated[0], iconName };
          return { ...prev, elements: { ...prev.elements, metrics: updated } };
        });
      } else if (slide.layout === 'pillars' && slide.elements.pillars?.length) {
        onUpdateActiveSlide((prev) => {
          const updated = [...(prev.elements.pillars || [])];
          updated[0] = { ...updated[0], iconName };
          return { ...prev, elements: { ...prev.elements, pillars: updated } };
        });
      } else if (slide.layout === 'bento' && slide.elements.bentoCards?.length) {
        onUpdateActiveSlide((prev) => {
          const updated = [...(prev.elements.bentoCards || [])];
          updated[0] = { ...updated[0], iconName };
          return { ...prev, elements: { ...prev.elements, bentoCards: updated } };
        });
      }
    }
    setShowIconPicker(false);
  };

  const getSelectionLabel = () => {
    if (!selectedElementId) return 'CANVAS (Click any element to style)';
    if (selectedElementId === 'title') return 'SELECTED: TITLE';
    if (selectedElementId === 'subtitle') return 'SELECTED: SUBTITLE';
    if (selectedElementId === 'kicker') return 'SELECTED: KICKER';
    if (selectedElementId === 'footnote') return 'SELECTED: FOOTNOTE';
    if (selectedElementId === 'callout') return 'SELECTED: CALLOUT BOX';
    if (selectedElementId.startsWith('metric-')) {
      const idx = parseInt(selectedElementId.replace('metric-', ''), 10);
      return `SELECTED: METRIC #${idx + 1}`;
    }
    if (selectedElementId.startsWith('pillar-')) {
      const idx = parseInt(selectedElementId.replace('pillar-', ''), 10);
      return `SELECTED: PILLAR #${idx + 1}`;
    }
    if (selectedElementId.startsWith('bento-')) {
      const idx = parseInt(selectedElementId.replace('bento-', ''), 10);
      return `SELECTED: BENTO #${idx + 1}`;
    }
    if (selectedElementId.startsWith('bullet-')) {
      const idx = parseInt(selectedElementId.replace('bullet-', ''), 10);
      return `SELECTED: BULLET #${idx + 1}`;
    }
    return `SELECTED: ${selectedElementId.toUpperCase()}`;
  };

  const isDeletable = Boolean(
    selectedElementId &&
      (selectedElementId.startsWith('metric-') ||
        selectedElementId.startsWith('pillar-') ||
        selectedElementId.startsWith('bento-') ||
        selectedElementId.startsWith('bullet-'))
  );

  return (
    <main
      ref={containerRef}
      className="relative flex-1 bg-[#060608] flex flex-col items-center justify-center overflow-hidden p-6 select-none"
    >
      {/* POWERPOINT EDIT MODE QUICK TOOLBAR (Top Floating Ribbon) */}
      {isEditMode && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 border border-emerald-500/40 bg-[#0d0f12]/95 backdrop-blur-md px-3.5 py-1.5 shadow-2xl text-xs font-mono text-white transition-all max-w-[95vw] overflow-x-auto">
          {/* Status Badge & Active Target */}
          <div className="flex items-center gap-2 pr-2.5 border-r border-[#27272a] shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider">
              EDIT MODE
            </span>
            <span className="text-[10px] text-zinc-300 bg-zinc-800/80 px-2 py-0.5 rounded font-mono truncate max-w-[180px]">
              {getSelectionLabel()}
            </span>
            {selectedElementId && (
              <button
                onClick={() => setSelectedElementId(null)}
                className="text-zinc-400 hover:text-white p-0.5"
                title="Deselect"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Element Text & Accent Color Swatches */}
          <div className="flex items-center gap-1.5 pr-2.5 border-r border-[#27272a] shrink-0">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">
              {selectedElementId ? 'COLOR:' : 'DECK BG:'}
            </span>
            {selectedElementId
              ? formatColors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => handleApplyColor(c.hex)}
                    className="h-4 w-4 border border-zinc-700 hover:border-white transition-transform hover:scale-125 rounded-none"
                    style={{ backgroundColor: c.hex }}
                    title={`Apply ${c.label} (${c.hex}) to selected element`}
                  />
                ))
              : quickThemes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onUpdateDeckTheme?.(t.id)}
                    className={`h-4 w-4 border transition-transform hover:scale-125 ${
                      theme.id === t.id ? 'ring-1 ring-emerald-400 scale-110' : 'border-zinc-700'
                    }`}
                    style={{ backgroundColor: t.color }}
                    title={`Switch Deck Theme: ${t.name}`}
                  />
                ))}
          </div>

          {/* Insert/Change SVG Vector Design Icon */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowIconPicker((prev) => !prev)}
              className="flex items-center gap-1.5 border border-[#27272a] hover:border-white bg-[#141418] hover:bg-[#1c1c22] px-2.5 py-1 text-[11px] text-white transition-all"
              title="Insert or swap SVG Technical Icon on selected item"
            >
              <SvgIcon name="cpu" size={12} color="#10B981" />
              <span>SVG ICONS</span>
            </button>

            {/* Icon Picker Popover */}
            {showIconPicker && (
              <div className="absolute top-full left-0 mt-2 p-3 bg-[#0c0d10] border border-zinc-700 shadow-2xl grid grid-cols-6 gap-2 z-50 w-72">
                <div className="col-span-6 text-[10px] uppercase font-mono text-zinc-400 border-b border-zinc-800 pb-1 mb-1 flex items-center justify-between">
                  <span>Select SVG Vector Icon:</span>
                  <button onClick={() => setShowIconPicker(false)} className="hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </div>
                {availableIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => handleSelectIcon(icon)}
                    className="p-1.5 border border-zinc-800 hover:border-emerald-400 hover:bg-zinc-800 flex items-center justify-center transition-all"
                    title={icon}
                  >
                    <SvgIcon name={icon} size={16} color="#fafafa" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add Item Action */}
          <button
            onClick={handleAddItem}
            className="flex items-center gap-1.5 border border-[#27272a] hover:border-white bg-[#141418] hover:bg-[#1c1c22] px-2.5 py-1 text-[11px] text-white transition-all shrink-0"
            title="Add Metric / Pillar / Bento / Bullet Item to this slide"
          >
            <Plus className="h-3 w-3 text-emerald-400" />
            <span>+ ITEM</span>
          </button>

          {/* Delete Selected Item */}
          {isDeletable && (
            <button
              onClick={handleDeleteItem}
              className="flex items-center gap-1 border border-rose-500/40 bg-rose-950/30 hover:bg-rose-900/50 hover:border-rose-400 px-2.5 py-1 text-[11px] text-rose-300 transition-all shrink-0"
              title="Delete currently selected item"
            >
              <Trash2 className="h-3 w-3 text-rose-400" />
              <span>DELETE</span>
            </button>
          )}
        </div>
      )}

      {/* 
        Center Canvas Frame:
        Fixed 16:9 1920x1080 stage with mathematical scaling
      */}
      <div
        id="deck-stage-canvas"
        className={`relative shadow-2xl transition-transform duration-100 ease-out ${
          isEditMode ? 'ring-2 ring-emerald-500/50' : ''
        }`}
        style={{
          width: 1920,
          height: 1080,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        <SlideRenderer
          slide={slide}
          theme={theme}
          transition={transition}
          index={activeSlideIndex}
          totalSlides={totalSlides}
          isEditMode={isEditMode}
          selectedId={selectedElementId}
          onSelectElement={setSelectedElementId}
          onUpdateSlide={onUpdateActiveSlide}
        />
      </div>
    </main>
  );
};
