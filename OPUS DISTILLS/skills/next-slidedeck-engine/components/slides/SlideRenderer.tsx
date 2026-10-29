'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, ThemeConfig, TransitionConfig } from '../../types/slide';
import { SvgIcon, TelemetryCrosshair, StatusPill } from './SvgIcon';

interface SlideRendererProps {
  slide: Slide;
  theme: ThemeConfig;
  transition: TransitionConfig;
  index: number;
  totalSlides: number;
  isThumbnail?: boolean;
  isEditMode?: boolean;
  selectedId?: string | null;
  onSelectElement?: (id: string | null) => void;
  onUpdateSlide?: (updater: (prev: Slide) => Slide) => void;
}

interface EditableTextProps {
  value: string;
  onSave?: (newVal: string) => void;
  className?: string;
  style?: React.CSSProperties;
  isEditMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  placeholder?: string;
  layoutId?: string;
}

/**
 * High-performance on-canvas PowerPoint-like editable text block.
 * When isEditMode is true: enables direct inline contentEditable editing with visual selection handles.
 * When isEditMode is false: renders pristine presentation typography without overhead.
 */
const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  className = '',
  style,
  isEditMode = false,
  isSelected = false,
  onSelect,
  as = 'div',
  placeholder = 'Click to edit...',
  layoutId,
}) => {
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditMode || !onSave) return;
    const text = e.currentTarget.innerText || '';
    if (text !== value) {
      onSave(text.trim());
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode) {
      e.stopPropagation();
      onSelect?.();
    }
  };

  const editClasses = isEditMode
    ? `cursor-text transition-all rounded px-1 -mx-1 relative ${
        isSelected
          ? 'outline outline-2 outline-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-400/50'
          : 'hover:outline hover:outline-1 hover:outline-dashed hover:outline-[#52525b] focus:outline focus:outline-2 focus:outline-emerald-400 focus:bg-white/5'
      }`
    : '';

  const Tag = as as any;

  const selectionHandles = isEditMode && isSelected ? (
    <>
      <span className="absolute -top-1 -left-1 h-2 w-2 bg-emerald-400 border border-black pointer-events-none z-20" />
      <span className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-400 border border-black pointer-events-none z-20" />
      <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-emerald-400 border border-black pointer-events-none z-20" />
      <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-emerald-400 border border-black pointer-events-none z-20" />
    </>
  ) : null;

  if (layoutId) {
    return (
      <motion.div
        layoutId={layoutId}
        contentEditable={isEditMode}
        suppressContentEditableWarning
        onBlur={handleBlur}
        onClick={handleClick}
        className={`${className} ${editClasses}`}
        style={style}
        data-placeholder={placeholder}
      >
        {value}
        {selectionHandles}
      </motion.div>
    );
  }

  return (
    <Tag
      contentEditable={isEditMode}
      suppressContentEditableWarning
      onBlur={handleBlur}
      onClick={handleClick}
      className={`${className} ${editClasses}`}
      style={style}
      data-placeholder={placeholder}
    >
      {value}
      {selectionHandles}
    </Tag>
  );
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({
  slide,
  theme,
  transition,
  index,
  totalSlides,
  isThumbnail = false,
  isEditMode = false,
  selectedId = null,
  onSelectElement,
  onUpdateSlide,
}) => {
  // Determine motion transition variants based on configured transition type
  const getVariants = () => {
    if (isThumbnail) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      };
    }

    switch (transition.type) {
      case 'morph':
        return {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -12 },
        };
      case 'crossfade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case 'slide-x':
        return {
          initial: { opacity: 0, x: 80 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -80 },
        };
      case 'slide-y':
        return {
          initial: { opacity: 0, y: 80 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -80 },
        };
      case 'scale-zoom':
        return {
          initial: { opacity: 0, scale: 0.94 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.04 },
        };
      case 'clip-reveal':
        return {
          initial: { opacity: 0, clipPath: 'inset(10% 10% 10% 10%)' },
          animate: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
          exit: { opacity: 0, clipPath: 'inset(5% 5% 5% 5%)' },
        };
      case 'flip-3d':
        return {
          initial: { opacity: 0, rotateY: 30, transformPerspective: 1000 },
          animate: { opacity: 1, rotateY: 0, transformPerspective: 1000 },
          exit: { opacity: 0, rotateY: -30, transformPerspective: 1000 },
        };
      case 'stagger-blur':
        return {
          initial: { opacity: 0, filter: 'blur(12px)', scale: 0.98 },
          animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
          exit: { opacity: 0, filter: 'blur(8px)', scale: 1.02 },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  const variants = getVariants();
  const transitionConfig = {
    duration: isThumbnail ? 0 : isEditMode ? 0.1 : Math.min(transition.duration || 0.3, 0.35),
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  const isMorph = transition.type === 'morph' && !isEditMode;

  const isHtmlSlide = slide.layout === 'html' || slide.layout === 'bespoke' || Boolean(slide.rawHtml || slide.elements?.rawHtml);

  // If the slide is an arbitrary / bespoke HTML slide, render it full-bleed (1920x1080)
  // without forcing engine chrome, borders, paddings, watermarks, or studio theme colors.
  if (isHtmlSlide) {
    const raw = slide.rawHtml || slide.elements?.rawHtml || '';
    const isFullDoc = raw.includes('<html') || raw.includes('<!DOCTYPE') || raw.includes('<body') || raw.includes('<head');

    return (
      <div
        id={`slide-canvas-${slide.id}`}
        onClick={() => {
          if (isEditMode) onSelectElement?.(null);
        }}
        className={`relative select-none overflow-hidden ${isEditMode ? 'ring-1 ring-emerald-500/30' : ''}`}
        style={{
          width: 1920,
          height: 1080,
          backgroundColor: 'transparent',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={transitionConfig}
            className="relative w-[1920px] h-[1080px] overflow-hidden"
            style={{ width: 1920, height: 1080 }}
          >
            {isFullDoc ? (
              <iframe
                srcDoc={raw}
                title={`html-slide-${slide.id}`}
                className="w-[1920px] h-[1080px] border-0 overflow-hidden block"
                style={{ width: '1920px', height: '1080px', border: 0 }}
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            ) : (
              <div
                className="w-[1920px] h-[1080px] relative overflow-hidden"
                style={{ width: 1920, height: 1080 }}
                dangerouslySetInnerHTML={{
                  __html: raw || '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#888;font-family:sans-serif;font-size:24px;">Empty HTML Slide</div>',
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      id={`slide-canvas-${slide.id}`}
      onClick={() => {
        if (isEditMode) onSelectElement?.(null);
      }}
      className={`relative select-none overflow-hidden ${isEditMode ? 'ring-1 ring-emerald-500/30' : ''}`}
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: theme.bg,
        color: theme.textPrimary,
        fontFamily: theme.fontBody,
      }}
    >
      {/* Background subtle micro-grid watermark for engineering rigor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, ${theme.border} 1px, transparent 1px), linear-gradient(to bottom, ${theme.border} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Frame perimeter hairline border */}
      <div
        className="pointer-events-none absolute inset-0 border"
        style={{ borderColor: theme.border }}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={transitionConfig}
          className="relative flex h-full w-full flex-col justify-between p-24"
        >
          {/* TOP METADATA BAR (Inside slide) */}
          <div
            className="flex items-center justify-between border-b pb-6"
            style={{ borderColor: theme.border }}
          >
            <motion.div
              layoutId={transition.type === 'morph' ? 'slide-kicker' : undefined}
              className="flex items-center gap-3"
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-none"
                style={{ backgroundColor: theme.accent }}
              />
              <EditableText
                value={slide.kicker || 'EXECUTIVE BRIEFING'}
                isEditMode={isEditMode}
                isSelected={selectedId === 'kicker'}
                onSelect={() => onSelectElement?.('kicker')}
                onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, kicker: val }))}
                className="text-xs font-mono font-medium tracking-[0.25em] uppercase"
                style={{ color: theme.textMuted }}
                as="span"
              />
            </motion.div>
            <div className="flex items-center gap-6">
              <span
                className="text-xs font-mono tracking-widest uppercase"
                style={{ color: theme.textMuted }}
              >
                16:9 FIXED CANVAS
              </span>
              <span
                className="text-xs font-mono font-semibold"
                style={{ color: theme.textSecondary }}
              >
                {String(index + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* MAIN BODY AREA DEPENDING ON LAYOUT */}
          <div className="my-auto flex flex-1 flex-col justify-center py-8">
            {renderLayoutContent(slide, theme, isMorph, isEditMode, selectedId, onSelectElement, onUpdateSlide)}
          </div>

          {/* BOTTOM FOOTER / TELEMETRY */}
          <div
            className="flex items-center justify-between border-t pt-6"
            style={{ borderColor: theme.border }}
          >
            <motion.div
              layoutId={transition.type === 'morph' ? 'slide-footnote' : undefined}
              className="flex items-center gap-2"
            >
              <EditableText
                value={slide.elements.footnote || 'CONFIDENTIAL // REPRODUCIBLE VECTOR SYSTEM'}
                isEditMode={isEditMode}
                isSelected={selectedId === 'footnote'}
                onSelect={() => onSelectElement?.('footnote')}
                onSave={(val) =>
                  onUpdateSlide?.((prev) => ({
                    ...prev,
                    elements: { ...prev.elements, footnote: val },
                  }))
                }
                className="text-xs font-mono tracking-wider uppercase"
                style={{ color: theme.textMuted }}
                as="span"
              />
            </motion.div>
            <span
              className="text-xs font-mono tracking-wider"
              style={{ color: theme.textMuted }}
            >
              NEXT-SLIDEDECK-ENGINE // v1.2
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Render layout-specific content
function renderLayoutContent(
  slide: Slide,
  theme: ThemeConfig,
  isMorph: boolean,
  isEditMode: boolean = false,
  selectedId?: string | null,
  onSelectElement?: (id: string | null) => void,
  onUpdateSlide?: (updater: (prev: Slide) => Slide) => void
) {
  // Support rendering arbitrary, rich, standalone HTML slides (pure 1-slide = 1 HTML file standard)
  if (slide.rawHtml || slide.elements?.rawHtml) {
    const raw = slide.rawHtml || slide.elements?.rawHtml || '';
    if (raw.includes('<html') || raw.includes('<!DOCTYPE')) {
      return (
        <div className="w-full h-full flex flex-col justify-center">
          <iframe
            srcDoc={raw}
            title={`html-slide-${slide.id}`}
            className="w-full h-full border-0 overflow-hidden"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      );
    }
    return (
      <div
        className="w-full h-full relative overflow-hidden"
        dangerouslySetInnerHTML={{ __html: raw }}
      />
    );
  }

  switch (slide.layout) {
    case 'html':
    case 'bespoke':
      return (
        <div className="w-full h-full flex flex-col justify-center">
          <div
            className="w-full h-full relative overflow-hidden"
            dangerouslySetInnerHTML={{ __html: slide.elements?.rawHtml || '<p>Empty HTML slide</p>' }}
          />
        </div>
      );
    case 'cover':
      return (
        <div className="flex flex-col justify-center max-w-5xl">
          <div
            className="mb-6 inline-flex w-fit items-center gap-2.5 border px-4 py-1.5 text-xs font-mono tracking-widest uppercase"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.surface,
              color: theme.textSecondary,
            }}
          >
            <SvgIcon name="sparkles" size={13} color={theme.accent} />
            <span>SYSTEM SPECIFICATION & ARCHITECTURE</span>
          </div>

          <motion.div
            layoutId={isMorph ? 'slide-title' : undefined}
            className="text-7xl font-bold tracking-tight leading-[1.08] mb-8"
            style={{ color: slide.elements.titleColor || theme.textPrimary }}
          >
            <EditableText
              value={slide.title}
              isEditMode={isEditMode}
              isSelected={selectedId === 'title'}
              onSelect={() => onSelectElement?.('title')}
              onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
              style={{ color: slide.elements.titleColor || theme.textPrimary }}
              as="h1"
            />
          </motion.div>

          <div
            className="text-2xl font-normal leading-relaxed max-w-3xl mb-4"
            style={{ color: slide.elements.subtitleColor || theme.textSecondary }}
          >
            <EditableText
              value={slide.subtitle}
              isEditMode={isEditMode}
              isSelected={selectedId === 'subtitle'}
              onSelect={() => onSelectElement?.('subtitle')}
              onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, subtitle: val }))}
              style={{ color: slide.elements.subtitleColor || theme.textSecondary }}
              as="p"
            />
          </div>

          <div
            className="mt-14 flex items-center gap-8 border-t pt-8"
            style={{ borderColor: theme.border }}
          >
            <div className="flex flex-col gap-1">
              <span
                className="text-[11px] font-mono uppercase tracking-widest flex items-center gap-1.5"
                style={{ color: theme.textMuted }}
              >
                <SvgIcon name="cpu" size={11} color={theme.textMuted} />
                ENGINE ARCHITECTURE
              </span>
              <span className="text-sm font-medium" style={{ color: theme.textPrimary }}>
                Next.js App Router / Vector SVG
              </span>
            </div>
            <div className="h-8 w-[1px]" style={{ backgroundColor: theme.border }} />
            <div className="flex flex-col gap-1">
              <span
                className="text-[11px] font-mono uppercase tracking-widest flex items-center gap-1.5"
                style={{ color: theme.textMuted }}
              >
                <SvgIcon name="target" size={11} color={theme.textMuted} />
                RATIO SPECIFICATION
              </span>
              <span className="text-sm font-medium" style={{ color: theme.textPrimary }}>
                1920 × 1080 px (16:9 Standard)
              </span>
            </div>
            <div className="h-8 w-[1px]" style={{ backgroundColor: theme.border }} />
            <div className="flex flex-col gap-1">
              <span
                className="text-[11px] font-mono uppercase tracking-widest flex items-center gap-1.5"
                style={{ color: theme.textMuted }}
              >
                <SvgIcon name="shield" size={11} color={theme.textMuted} />
                SECURITY CLASSIFICATION
              </span>
              <span className="text-sm font-medium" style={{ color: theme.textPrimary }}>
                Proprietary & Unrestricted
              </span>
            </div>
          </div>
        </div>
      );

    case 'metrics':
      return (
        <div className="flex flex-col justify-center">
          <div className="mb-10 max-w-4xl flex flex-col gap-3">
            <motion.div
              className="text-5xl font-bold tracking-tight leading-tight"
              style={{ color: slide.elements.titleColor || theme.textPrimary }}
            >
              <EditableText
                value={slide.title}
                isEditMode={isEditMode}
                isSelected={selectedId === 'title'}
                onSelect={() => onSelectElement?.('title')}
                onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
                style={{ color: slide.elements.titleColor || theme.textPrimary }}
                as="h2"
              />
            </motion.div>
            <div className="text-xl leading-relaxed" style={{ color: slide.elements.subtitleColor || theme.textSecondary }}>
              <EditableText
                value={slide.subtitle}
                isEditMode={isEditMode}
                isSelected={selectedId === 'subtitle'}
                onSelect={() => onSelectElement?.('subtitle')}
                onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, subtitle: val }))}
                style={{ color: slide.elements.subtitleColor || theme.textSecondary }}
                as="p"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {slide.elements.metrics?.map((metric, i) => {
              const cardId = `metric-${i}`;
              const isCardSelected = selectedId === cardId;
              const accentColor = metric.color || theme.accent;
              return (
                <motion.div
                  key={metric.id || i}
                  layoutId={isMorph ? `metric-card-${i}` : undefined}
                  onClick={(e) => {
                    if (isEditMode) {
                      e.stopPropagation();
                      onSelectElement?.(cardId);
                    }
                  }}
                  className={`relative flex flex-col justify-between border p-8 transition-all ${
                    isCardSelected
                      ? 'ring-2 ring-emerald-400 bg-emerald-500/10 shadow-lg'
                      : isEditMode
                      ? 'hover:border-zinc-500 cursor-pointer'
                      : ''
                  }`}
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: isCardSelected ? '#10B981' : metric.color ? metric.color + '55' : theme.border,
                  }}
                >
                  {metric.color && (
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: metric.color }} />
                  )}
                  <TelemetryCrosshair color={metric.color || theme.textMuted} className="absolute top-2 right-2" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <SvgIcon
                          name={metric.iconName || 'activity'}
                          size={14}
                          color={accentColor}
                        />
                        <EditableText
                          value={metric.label}
                          isEditMode={isEditMode}
                          isSelected={selectedId === `${cardId}-label`}
                          onSelect={() => onSelectElement?.(cardId)}
                          onSave={(val) =>
                            onUpdateSlide?.((prev) => {
                              const updated = [...(prev.elements.metrics || [])];
                              updated[i] = { ...updated[i], label: val };
                              return { ...prev, elements: { ...prev.elements, metrics: updated } };
                            })
                          }
                          className="text-xs font-mono font-medium tracking-widest uppercase"
                          style={{ color: theme.textMuted }}
                          as="span"
                        />
                      </div>
                      {metric.change && (
                        <EditableText
                          value={metric.change}
                          isEditMode={isEditMode}
                          isSelected={selectedId === `${cardId}-change`}
                          onSelect={() => onSelectElement?.(cardId)}
                          onSave={(val) =>
                            onUpdateSlide?.((prev) => {
                              const updated = [...(prev.elements.metrics || [])];
                              updated[i] = { ...updated[i], change: val };
                              return { ...prev, elements: { ...prev.elements, metrics: updated } };
                            })
                          }
                          className="text-xs font-mono border px-2 py-0.5"
                          style={{
                            borderColor: metric.color ? metric.color + '66' : theme.border,
                            backgroundColor: theme.surfaceRaised,
                            color: metric.color || theme.textPrimary,
                          }}
                          as="span"
                        />
                      )}
                    </div>
                    <div
                      className="text-6xl font-bold tracking-tight mb-4 tabular-nums"
                      style={{ color: metric.color || theme.textPrimary }}
                    >
                      <EditableText
                        value={metric.value}
                        isEditMode={isEditMode}
                        isSelected={selectedId === `${cardId}-val`}
                        onSelect={() => onSelectElement?.(cardId)}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => {
                            const updated = [...(prev.elements.metrics || [])];
                            updated[i] = { ...updated[i], value: val };
                            return { ...prev, elements: { ...prev.elements, metrics: updated } };
                          })
                        }
                        style={{ color: metric.color || theme.textPrimary }}
                        as="div"
                      />
                    </div>
                  </div>
                  {metric.subtext && (
                    <div className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                      <EditableText
                        value={metric.subtext}
                        isEditMode={isEditMode}
                        isSelected={selectedId === `${cardId}-sub`}
                        onSelect={() => onSelectElement?.(cardId)}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => {
                            const updated = [...(prev.elements.metrics || [])];
                            updated[i] = { ...updated[i], subtext: val };
                            return { ...prev, elements: { ...prev.elements, metrics: updated } };
                          })
                        }
                        as="p"
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      );

    case 'split':
      return (
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-12 gap-12 items-start">
            {/* Left Column (5 Cols) */}
            <div className="col-span-5 min-w-0 flex flex-col justify-center">
              <motion.div
                className="text-4xl font-bold tracking-tight mb-4 leading-tight"
                style={{ color: slide.elements.titleColor || theme.textPrimary }}
              >
                <EditableText
                  value={slide.title}
                  isEditMode={isEditMode}
                  isSelected={selectedId === 'title'}
                  onSelect={() => onSelectElement?.('title')}
                  onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
                  style={{ color: slide.elements.titleColor || theme.textPrimary }}
                  as="h2"
                />
              </motion.div>
              <div
                className="text-xl leading-relaxed mb-8"
                style={{ color: slide.elements.subtitleColor || theme.textSecondary }}
              >
                <EditableText
                  value={slide.subtitle}
                  isEditMode={isEditMode}
                  isSelected={selectedId === 'subtitle'}
                  onSelect={() => onSelectElement?.('subtitle')}
                  onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, subtitle: val }))}
                  style={{ color: slide.elements.subtitleColor || theme.textSecondary }}
                  as="p"
                />
              </div>

              {/* Dynamic Callout Box */}
              {(() => {
                const callout = slide.elements.callout || {
                  kicker: 'CORE ARCHITECTURE',
                  text: 'Structured mathematical boundaries preserve typographic rhythm and visual equilibrium without responsive slippage.',
                  iconName: 'cpu',
                  color: theme.accent,
                };
                const isCalloutSelected = selectedId === 'callout';
                const calloutColor = callout.color || theme.accent;
                return (
                  <div
                    onClick={(e) => {
                      if (isEditMode) {
                        e.stopPropagation();
                        onSelectElement?.('callout');
                      }
                    }}
                    className={`relative border p-6 transition-all ${
                      isCalloutSelected ? 'ring-2 ring-emerald-400 bg-emerald-500/10 shadow-lg' : isEditMode ? 'hover:border-zinc-500 cursor-pointer' : ''
                    }`}
                    style={{
                      backgroundColor: theme.surface,
                      borderColor: isCalloutSelected ? '#10B981' : callout.color ? callout.color + '66' : theme.border,
                    }}
                  >
                    {callout.color && (
                      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: callout.color }} />
                    )}
                    <TelemetryCrosshair color={callout.color || theme.textMuted} className="absolute top-2 right-2" />
                    <div className="flex items-center gap-2 mb-2">
                      <SvgIcon name={callout.iconName || 'cpu'} size={13} color={calloutColor} />
                      <EditableText
                        value={callout.kicker || 'CORE THESIS'}
                        isEditMode={isEditMode}
                        isSelected={selectedId === 'callout-kicker'}
                        onSelect={() => onSelectElement?.('callout')}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => ({
                            ...prev,
                            elements: {
                              ...prev.elements,
                              callout: { ...(prev.elements.callout || callout), kicker: val },
                            },
                          }))
                        }
                        className="text-xs font-mono uppercase tracking-widest font-semibold"
                        style={{ color: calloutColor }}
                        as="span"
                      />
                    </div>
                    <div className="text-sm font-medium leading-relaxed" style={{ color: theme.textPrimary }}>
                      <EditableText
                        value={callout.text}
                        isEditMode={isEditMode}
                        isSelected={selectedId === 'callout-text'}
                        onSelect={() => onSelectElement?.('callout')}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => ({
                            ...prev,
                            elements: {
                              ...prev.elements,
                              callout: { ...(prev.elements.callout || callout), text: val },
                            },
                          }))
                        }
                        as="p"
                      />
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Right Column (7 Cols) */}
            <div className="col-span-7 min-w-0 flex flex-col gap-4">
              {slide.elements.bullets?.map((bullet, i) => {
                const bulletIcons = ['network', 'layers', 'terminal', 'shield', 'zap'];
                const iconName = bulletIcons[i % bulletIcons.length];
                const bulletId = `bullet-${i}`;
                const isBulletSelected = selectedId === bulletId;
                return (
                  <div
                    key={i}
                    onClick={(e) => {
                      if (isEditMode) {
                        e.stopPropagation();
                        onSelectElement?.(bulletId);
                      }
                    }}
                    className={`relative flex items-start gap-4 border p-6 transition-all ${
                      isBulletSelected ? 'ring-2 ring-emerald-400 bg-emerald-500/10 shadow-md' : isEditMode ? 'hover:border-zinc-500 cursor-pointer' : ''
                    }`}
                    style={{
                      backgroundColor: theme.surfaceRaised,
                      borderColor: isBulletSelected ? '#10B981' : theme.border,
                    }}
                  >
                    <div
                      className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border"
                      style={{ borderColor: theme.border, backgroundColor: theme.surface }}
                    >
                      <SvgIcon name={iconName} size={14} color={theme.accent} />
                    </div>
                    <div
                      className="text-base leading-relaxed flex-1"
                      style={{ color: theme.textPrimary }}
                    >
                      <EditableText
                        value={bullet}
                        isEditMode={isEditMode}
                        isSelected={selectedId === bulletId}
                        onSelect={() => onSelectElement?.(bulletId)}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => {
                            const updated = [...(prev.elements.bullets || [])];
                            updated[i] = val;
                            return { ...prev, elements: { ...prev.elements, bullets: updated } };
                          })
                        }
                        as="p"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    case 'pillars':
    case 'timeline':
      return (
        <div className="flex flex-col justify-center">
          <div className="mb-10 max-w-4xl flex flex-col gap-3">
            <motion.div
              className="text-5xl font-bold tracking-tight leading-tight"
              style={{ color: slide.elements.titleColor || theme.textPrimary }}
            >
              <EditableText
                value={slide.title}
                isEditMode={isEditMode}
                isSelected={selectedId === 'title'}
                onSelect={() => onSelectElement?.('title')}
                onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
                style={{ color: slide.elements.titleColor || theme.textPrimary }}
                as="h2"
              />
            </motion.div>
            <div className="text-xl leading-relaxed" style={{ color: slide.elements.subtitleColor || theme.textSecondary }}>
              <EditableText
                value={slide.subtitle}
                isEditMode={isEditMode}
                isSelected={selectedId === 'subtitle'}
                onSelect={() => onSelectElement?.('subtitle')}
                onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, subtitle: val }))}
                style={{ color: slide.elements.subtitleColor || theme.textSecondary }}
                as="p"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {slide.elements.pillars?.map((pillar, i) => {
              const cardId = `pillar-${i}`;
              const isCardSelected = selectedId === cardId;
              const accentColor = pillar.color || theme.accent;
              return (
                <motion.div
                  key={pillar.id || i}
                  layoutId={isMorph ? `pillar-${i}` : undefined}
                  onClick={(e) => {
                    if (isEditMode) {
                      e.stopPropagation();
                      onSelectElement?.(cardId);
                    }
                  }}
                  className={`relative flex flex-col justify-between border p-8 transition-all ${
                    isCardSelected ? 'ring-2 ring-emerald-400 bg-emerald-500/10 shadow-lg' : isEditMode ? 'hover:border-zinc-500 cursor-pointer' : ''
                  }`}
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: isCardSelected ? '#10B981' : pillar.color ? pillar.color + '55' : theme.border,
                  }}
                >
                  {pillar.color && (
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: pillar.color }} />
                  )}
                  <TelemetryCrosshair color={pillar.color || theme.textMuted} className="absolute top-2 right-2" />
                  <div>
                    <div
                      className="flex items-center justify-between mb-6 border-b pb-4"
                      style={{ borderColor: theme.border }}
                    >
                      <div className="flex items-center gap-2">
                        <SvgIcon
                          name={pillar.iconName || 'layers'}
                          size={14}
                          color={accentColor}
                        />
                        <EditableText
                          value={pillar.tag || `PILLAR 0${i + 1}`}
                          isEditMode={isEditMode}
                          isSelected={selectedId === `${cardId}-tag`}
                          onSelect={() => onSelectElement?.(cardId)}
                          onSave={(val) =>
                            onUpdateSlide?.((prev) => {
                              const updated = [...(prev.elements.pillars || [])];
                              updated[i] = { ...updated[i], tag: val };
                              return { ...prev, elements: { ...prev.elements, pillars: updated } };
                            })
                          }
                          className="text-xs font-mono uppercase tracking-widest font-semibold"
                          style={{ color: pillar.color || theme.textMuted }}
                          as="span"
                        />
                      </div>
                      <span className="text-xs font-mono" style={{ color: pillar.color || theme.textSecondary }}>
                        0{i + 1}
                      </span>
                    </div>
                    <div
                      className="text-2xl font-bold tracking-tight mb-4"
                      style={{ color: theme.textPrimary }}
                    >
                      <EditableText
                        value={pillar.title}
                        isEditMode={isEditMode}
                        isSelected={selectedId === `${cardId}-title`}
                        onSelect={() => onSelectElement?.(cardId)}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => {
                            const updated = [...(prev.elements.pillars || [])];
                            updated[i] = { ...updated[i], title: val };
                            return { ...prev, elements: { ...prev.elements, pillars: updated } };
                          })
                        }
                        as="h3"
                      />
                    </div>
                    <div
                      className="text-base leading-relaxed"
                      style={{ color: theme.textSecondary }}
                    >
                      <EditableText
                        value={pillar.description}
                        isEditMode={isEditMode}
                        isSelected={selectedId === `${cardId}-desc`}
                        onSelect={() => onSelectElement?.(cardId)}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => {
                            const updated = [...(prev.elements.pillars || [])];
                            updated[i] = { ...updated[i], description: val };
                            return { ...prev, elements: { ...prev.elements, pillars: updated } };
                          })
                        }
                        as="p"
                      />
                    </div>
                  </div>
                  <div
                    className="mt-8 pt-4 border-t flex items-center justify-between"
                    style={{ borderColor: theme.border }}
                  >
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider"
                      style={{ color: theme.textMuted }}
                    >
                      SYSTEM STANDARD APPROVED
                    </span>
                    <SvgIcon name="check-circle" size={13} color={pillar.color || theme.textMuted} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      );

    case 'bento':
      return (
        <div className="flex flex-col justify-center">
          <div className="mb-8 max-w-4xl flex flex-col gap-2">
            <motion.div
              className="text-5xl font-bold tracking-tight leading-tight"
              style={{ color: slide.elements.titleColor || theme.textPrimary }}
            >
              <EditableText
                value={slide.title}
                isEditMode={isEditMode}
                isSelected={selectedId === 'title'}
                onSelect={() => onSelectElement?.('title')}
                onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
                style={{ color: slide.elements.titleColor || theme.textPrimary }}
                as="h2"
              />
            </motion.div>
            <div className="text-xl" style={{ color: slide.elements.subtitleColor || theme.textSecondary }}>
              <EditableText
                value={slide.subtitle}
                isEditMode={isEditMode}
                isSelected={selectedId === 'subtitle'}
                onSelect={() => onSelectElement?.('subtitle')}
                onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, subtitle: val }))}
                style={{ color: slide.elements.subtitleColor || theme.textSecondary }}
                as="p"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {slide.elements.bentoCards?.map((card, i) => {
              const cardId = `bento-${i}`;
              const isCardSelected = selectedId === cardId;
              const isWide = card.spanCol === 2;
              const accentColor = card.color || theme.accent;
              return (
                <motion.div
                  key={card.id || i}
                  layoutId={isMorph ? `bento-${i}` : undefined}
                  onClick={(e) => {
                    if (isEditMode) {
                      e.stopPropagation();
                      onSelectElement?.(cardId);
                    }
                  }}
                  className={`relative flex flex-col justify-between border p-8 transition-all ${
                    isWide ? 'col-span-2' : 'col-span-1'
                  } ${
                    isCardSelected ? 'ring-2 ring-emerald-400 bg-emerald-500/10 shadow-lg' : isEditMode ? 'hover:border-zinc-500 cursor-pointer' : ''
                  }`}
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: isCardSelected ? '#10B981' : card.color ? card.color + '55' : theme.border,
                  }}
                >
                  {card.color && (
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: card.color }} />
                  )}
                  <TelemetryCrosshair color={card.color || theme.textMuted} className="absolute top-2 right-2" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <SvgIcon
                          name={card.iconName || 'box'}
                          size={14}
                          color={accentColor}
                        />
                        <EditableText
                          value={card.subtitle || 'MODULE'}
                          isEditMode={isEditMode}
                          isSelected={selectedId === `${cardId}-sub`}
                          onSelect={() => onSelectElement?.(cardId)}
                          onSave={(val) =>
                            onUpdateSlide?.((prev) => {
                              const updated = [...(prev.elements.bentoCards || [])];
                              updated[i] = { ...updated[i], subtitle: val };
                              return {
                                ...prev,
                                elements: { ...prev.elements, bentoCards: updated },
                              };
                            })
                          }
                          className="text-xs font-mono uppercase tracking-widest font-semibold"
                          style={{ color: card.color || theme.textMuted }}
                          as="span"
                        />
                      </div>
                      {card.badge && (
                        <EditableText
                          value={card.badge}
                          isEditMode={isEditMode}
                          isSelected={selectedId === `${cardId}-badge`}
                          onSelect={() => onSelectElement?.(cardId)}
                          onSave={(val) =>
                            onUpdateSlide?.((prev) => {
                              const updated = [...(prev.elements.bentoCards || [])];
                              updated[i] = { ...updated[i], badge: val };
                              return {
                                ...prev,
                                elements: { ...prev.elements, bentoCards: updated },
                              };
                            })
                          }
                          className="border px-2 py-0.5 text-xs font-mono uppercase tracking-wider font-semibold"
                          style={{
                            borderColor: card.color ? card.color + '66' : theme.border,
                            backgroundColor: theme.surfaceRaised,
                            color: card.color || theme.textPrimary,
                          }}
                          as="span"
                        />
                      )}
                    </div>
                    <div
                      className="text-2xl font-bold tracking-tight mb-3"
                      style={{ color: theme.textPrimary }}
                    >
                      <EditableText
                        value={card.title}
                        isEditMode={isEditMode}
                        isSelected={selectedId === `${cardId}-title`}
                        onSelect={() => onSelectElement?.(cardId)}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => {
                            const updated = [...(prev.elements.bentoCards || [])];
                            updated[i] = { ...updated[i], title: val };
                            return {
                              ...prev,
                              elements: { ...prev.elements, bentoCards: updated },
                            };
                          })
                        }
                        as="h3"
                      />
                    </div>
                    <div
                      className="text-sm leading-relaxed"
                      style={{ color: theme.textSecondary }}
                    >
                      <EditableText
                        value={card.description}
                        isEditMode={isEditMode}
                        isSelected={selectedId === `${cardId}-desc`}
                        onSelect={() => onSelectElement?.(cardId)}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => {
                            const updated = [...(prev.elements.bentoCards || [])];
                            updated[i] = { ...updated[i], description: val };
                            return {
                              ...prev,
                              elements: { ...prev.elements, bentoCards: updated },
                            };
                          })
                        }
                        as="p"
                      />
                    </div>
                  </div>
                  {card.stat && (
                    <div
                      className="mt-6 border-t pt-4 flex items-baseline justify-between"
                      style={{ borderColor: theme.border }}
                    >
                      <span
                        className="text-xs font-mono uppercase tracking-wider"
                        style={{ color: theme.textMuted }}
                      >
                        TELEMETRY RATING
                      </span>
                      <EditableText
                        value={card.stat}
                        isEditMode={isEditMode}
                        isSelected={selectedId === `${cardId}-stat`}
                        onSelect={() => onSelectElement?.(cardId)}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => {
                            const updated = [...(prev.elements.bentoCards || [])];
                            updated[i] = { ...updated[i], stat: val };
                            return {
                              ...prev,
                              elements: { ...prev.elements, bentoCards: updated },
                            };
                          })
                        }
                        className="text-2xl font-bold font-mono"
                        style={{ color: card.color || theme.textPrimary }}
                        as="span"
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      );

    case 'quote':
      return (
        <div className="flex flex-col justify-center max-w-5xl mx-auto text-center py-6">
          <div className="mb-8 flex justify-center">
            <span
              className="border px-4 py-1.5 text-xs font-mono tracking-widest uppercase flex items-center gap-2"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.surface,
                color: theme.textMuted,
              }}
            >
              <SvgIcon name="sparkles" size={12} color={theme.accent} />
              EXECUTIVE DOCTRINE
            </span>
          </div>
          <blockquote className="relative my-8">
            <div
              className="text-4xl md:text-5xl font-serif font-normal leading-[1.35] tracking-tight mb-10"
              style={{ color: theme.textPrimary }}
            >
              &ldquo;
              <EditableText
                value={slide.elements.quote?.text || slide.subtitle}
                isEditMode={isEditMode}
                onSave={(val) =>
                  onUpdateSlide?.((prev) => ({
                    ...prev,
                    elements: {
                      ...prev.elements,
                      quote: {
                        ...(prev.elements.quote || { author: 'EXECUTIVE', role: 'LEAD' }),
                        text: val,
                      },
                    },
                  }))
                }
                as="span"
              />
              &rdquo;
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <EditableText
                value={slide.elements.quote?.author || 'PRINCIPAL ARCHITECT'}
                isEditMode={isEditMode}
                onSave={(val) =>
                  onUpdateSlide?.((prev) => ({
                    ...prev,
                    elements: {
                      ...prev.elements,
                      quote: {
                        ...(prev.elements.quote || { text: prev.subtitle, role: 'LEAD' }),
                        author: val,
                      },
                    },
                  }))
                }
                className="text-lg font-bold tracking-wider uppercase"
                style={{ color: theme.textPrimary }}
                as="span"
              />
              <EditableText
                value={slide.elements.quote?.role || 'SYSTEMS DESIGN & ENGINEERING'}
                isEditMode={isEditMode}
                onSave={(val) =>
                  onUpdateSlide?.((prev) => ({
                    ...prev,
                    elements: {
                      ...prev.elements,
                      quote: {
                        ...(prev.elements.quote || { text: prev.subtitle, author: 'EXECUTIVE' }),
                        role: val,
                      },
                    },
                  }))
                }
                className="text-sm font-mono tracking-widest uppercase"
                style={{ color: theme.textMuted }}
                as="span"
              />
            </div>
          </blockquote>
        </div>
      );

    case 'comparison':
      const comp = slide.elements.comparison;
      return (
        <div className="flex flex-col justify-center">
          <div className="mb-10 max-w-4xl flex flex-col gap-3">
            <motion.div
              className="text-5xl font-bold tracking-tight leading-tight"
              style={{ color: slide.elements.titleColor || theme.textPrimary }}
            >
              <EditableText
                value={slide.title}
                isEditMode={isEditMode}
                onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
                as="h2"
              />
            </motion.div>
            <div className="text-xl" style={{ color: theme.textSecondary }}>
              <EditableText
                value={slide.subtitle}
                isEditMode={isEditMode}
                onSave={(val) => onUpdateSlide?.((prev) => ({ ...prev, subtitle: val }))}
                as="p"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {/* Left Box */}
            <div
              className="relative border p-8 flex flex-col justify-between"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
              }}
            >
              <TelemetryCrosshair color={theme.textMuted} className="absolute top-2 right-2" />
              <div>
                <EditableText
                  value={comp?.leftTitle || 'BASELINE SYSTEM'}
                  isEditMode={isEditMode}
                  onSave={(val) =>
                    onUpdateSlide?.((prev) => ({
                      ...prev,
                      elements: {
                        ...prev.elements,
                        comparison: {
                          ...(prev.elements.comparison || {
                            leftItems: [],
                            rightTitle: '',
                            rightItems: [],
                          }),
                          leftTitle: val,
                        },
                      },
                    }))
                  }
                  className="text-xs font-mono uppercase tracking-widest block mb-6 border-b pb-3 font-semibold"
                  style={{ color: theme.textMuted, borderColor: theme.border }}
                  as="h3"
                />
                <ul className="flex flex-col gap-4">
                  {comp?.leftItems?.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: theme.textSecondary }}
                    >
                      <span className="text-xs font-mono text-zinc-500 mt-0.5">✕</span>
                      <EditableText
                        value={item}
                        isEditMode={isEditMode}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => {
                            const updated = [...(prev.elements.comparison?.leftItems || [])];
                            updated[i] = val;
                            return {
                              ...prev,
                              elements: {
                                ...prev.elements,
                                comparison: {
                                  ...(prev.elements.comparison || {
                                    leftTitle: '',
                                    rightTitle: '',
                                    rightItems: [],
                                  }),
                                  leftItems: updated,
                                },
                              },
                            };
                          })
                        }
                        as="span"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Box (Target Architecture) */}
            <div
              className="relative border p-8 flex flex-col justify-between"
              style={{
                backgroundColor: theme.surfaceRaised,
                borderColor: theme.accent,
              }}
            >
              <TelemetryCrosshair color={theme.accent} className="absolute top-2 right-2" />
              <div>
                <div
                  className="flex items-center justify-between mb-6 border-b pb-3"
                  style={{ borderColor: theme.border }}
                >
                  <EditableText
                    value={comp?.rightTitle || 'ARGON PLATFORM'}
                    isEditMode={isEditMode}
                    onSave={(val) =>
                      onUpdateSlide?.((prev) => ({
                        ...prev,
                        elements: {
                          ...prev.elements,
                          comparison: {
                            ...(prev.elements.comparison || {
                              leftTitle: '',
                              leftItems: [],
                              rightItems: [],
                            }),
                            rightTitle: val,
                          },
                        },
                      }))
                    }
                    className="text-xs font-mono uppercase tracking-widest font-bold"
                    style={{ color: theme.textPrimary }}
                    as="h3"
                  />
                  <StatusPill label="SUPERIOR SOTA" color={theme.accent} />
                </div>
                <ul className="flex flex-col gap-4">
                  {comp?.rightItems?.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm leading-relaxed font-medium"
                      style={{ color: theme.textPrimary }}
                    >
                      <SvgIcon name="check-circle" size={14} color={theme.accent} className="mt-0.5" />
                      <EditableText
                        value={item}
                        isEditMode={isEditMode}
                        onSave={(val) =>
                          onUpdateSlide?.((prev) => {
                            const updated = [...(prev.elements.comparison?.rightItems || [])];
                            updated[i] = val;
                            return {
                              ...prev,
                              elements: {
                                ...prev.elements,
                                comparison: {
                                  ...(prev.elements.comparison || {
                                    leftTitle: '',
                                    leftItems: [],
                                    rightTitle: '',
                                  }),
                                  rightItems: updated,
                                },
                              },
                            };
                          })
                        }
                        as="span"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
