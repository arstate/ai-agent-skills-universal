'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Slide, ThemeConfig, TransitionConfig } from '../../types/slide';
import { SlideRenderer } from '../slides/SlideRenderer';
import { SvgIcon } from '../slides/SvgIcon';
import { Sparkles, Palette, Plus, MousePointerClick, Type, Shield, Layers } from 'lucide-react';

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

  // Available SVG icons for quick design insertion
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
  ];

  // Quick preset themes for instant color tuning in Edit Mode
  const quickThemes = [
    { id: 'obsidian-pure', name: 'Obsidian', color: '#000000' },
    { id: 'titanium-precision', name: 'Titanium', color: '#090A0C' },
    { id: 'consulting-cream', name: 'Cream', color: '#F7F5F2' },
    { id: 'munich-bauhaus', name: 'Bauhaus', color: '#FFFFFF' },
    { id: 'venture-pitch-cobalt', name: 'Cobalt', color: '#2563EB' },
    { id: 'creative-voltage-neon-lime', name: 'Neon Lime', color: '#D4FF00' },
  ];

  // Compute fixed 16:9 scaling based on container dimensions
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      // Fixed padding margin around deck frame
      const padding = isEditMode ? 88 : 64;
      const availableWidth = Math.max(clientWidth - padding, 320);
      const availableHeight = Math.max(clientHeight - padding, 180);

      const scaleX = availableWidth / 1920;
      const scaleY = availableHeight / 1080;
      // Strict aspect ratio lock (no fluid distortion)
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

  const handleAddItem = () => {
    if (!onUpdateActiveSlide) return;
    if (slide.layout === 'metrics') {
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          metrics: [
            ...(prev.elements.metrics || []),
            {
              id: `m-${Date.now()}`,
              value: '99.9%',
              label: 'NEW METRIC',
              subtext: 'Empirical benchmark telemetry',
              change: 'SOTA',
              iconName: 'activity',
            },
          ],
        },
      }));
    } else if (slide.layout === 'pillars' || slide.layout === 'timeline') {
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          pillars: [
            ...(prev.elements.pillars || []),
            {
              id: `p-${Date.now()}`,
              title: 'New Strategic Pillar',
              tag: 'EXPANSION',
              iconName: 'layers',
              description: 'Detailed modular capability specification and execution framework.',
            },
          ],
        },
      }));
    } else if (slide.layout === 'bento') {
      onUpdateActiveSlide((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          bentoCards: [
            ...(prev.elements.bentoCards || []),
            {
              id: `b-${Date.now()}`,
              title: 'New Architecture Module',
              subtitle: 'PLATFORM',
              description: 'High-throughput hardware-accelerated processing pipeline.',
              badge: 'v4.0',
              stat: '100%',
              iconName: 'box',
              spanCol: 1,
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

  const handleSelectIcon = (iconName: string) => {
    if (!onUpdateActiveSlide) return;
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
    setShowIconPicker(false);
  };

  return (
    <main
      ref={containerRef}
      className="relative flex-1 bg-[#060608] flex flex-col items-center justify-center overflow-hidden p-6 select-none"
    >
      {/* POWERPOINT EDIT MODE QUICK TOOLBAR (Top Floating) */}
      {isEditMode && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 border border-emerald-500/40 bg-[#0d0f12]/95 backdrop-blur-md px-4 py-1.5 shadow-2xl text-xs font-mono text-white transition-all">
          <div className="flex items-center gap-2 pr-3 border-r border-[#27272a]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider">
              EDIT MODE [ON]
            </span>
            <span className="text-[10px] text-zinc-400 font-sans hidden md:inline">
              (Click any text on slide to edit)
            </span>
          </div>

          {/* Quick Theme Color Swatches */}
          <div className="flex items-center gap-1.5 pr-3 border-r border-[#27272a]">
            <span className="text-[10px] text-zinc-400 uppercase">COLOR:</span>
            {quickThemes.map((t) => (
              <button
                key={t.id}
                onClick={() => onUpdateDeckTheme?.(t.id)}
                className={`h-4 w-4 border transition-transform hover:scale-125 ${
                  theme.id === t.id ? 'ring-1 ring-emerald-400 scale-110' : 'border-zinc-700'
                }`}
                style={{ backgroundColor: t.color }}
                title={`Switch Theme: ${t.name}`}
              />
            ))}
          </div>

          {/* Add Item Action */}
          <button
            onClick={handleAddItem}
            className="flex items-center gap-1.5 border border-[#27272a] hover:border-white bg-[#141418] hover:bg-[#1c1c22] px-2.5 py-1 text-[11px] text-white transition-all"
            title="Add Metric / Pillar / Bento / Bullet Item to this slide"
          >
            <Plus className="h-3 w-3 text-emerald-400" />
            <span>+ ITEM</span>
          </button>

          {/* Insert SVG Design Icon */}
          <div className="relative">
            <button
              onClick={() => setShowIconPicker((prev) => !prev)}
              className="flex items-center gap-1.5 border border-[#27272a] hover:border-white bg-[#141418] hover:bg-[#1c1c22] px-2.5 py-1 text-[11px] text-white transition-all"
              title="Insert Technical SVG Icon"
            >
              <SvgIcon name="cpu" size={12} color="#10B981" />
              <span>SVG ICONS</span>
            </button>

            {/* Icon Picker Popover */}
            {showIconPicker && (
              <div className="absolute top-full left-0 mt-2 p-3 bg-[#0c0d10] border border-zinc-700 shadow-2xl grid grid-cols-6 gap-2 z-50 w-64">
                <div className="col-span-6 text-[10px] uppercase font-mono text-zinc-400 border-b border-zinc-800 pb-1 mb-1">
                  Select SVG Vector Icon:
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
          onUpdateSlide={onUpdateActiveSlide}
        />
      </div>
    </main>
  );
};
