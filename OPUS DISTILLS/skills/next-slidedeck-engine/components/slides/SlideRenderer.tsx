'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, ThemeConfig, TransitionConfig } from '../../types/slide';

interface SlideRendererProps {
  slide: Slide;
  theme: ThemeConfig;
  transition: TransitionConfig;
  index: number;
  totalSlides: number;
  isThumbnail?: boolean;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({
  slide,
  theme,
  transition,
  index,
  totalSlides,
  isThumbnail = false,
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
          initial: { opacity: 0, y: 15, filter: 'blur(4px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          exit: { opacity: 0, y: -15, filter: 'blur(4px)' },
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
    duration: isThumbnail ? 0 : transition.duration || 0.5,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  return (
    <div
      id={`slide-canvas-${slide.id}`}
      className="relative select-none overflow-hidden"
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
          <div className="flex items-center justify-between border-b pb-6" style={{ borderColor: theme.border }}>
            <motion.div
              layoutId={transition.type === 'morph' ? 'slide-kicker' : undefined}
              className="flex items-center gap-3"
            >
              <span
                className="inline-block h-2 w-2 rounded-none"
                style={{ backgroundColor: theme.accent }}
              />
              <span
                className="text-xs font-mono font-medium tracking-[0.25em] uppercase"
                style={{ color: theme.textMuted }}
              >
              {slide.kicker || 'EXECUTIVE BRIEFING'}
            </span>
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
          {renderLayoutContent(slide, theme, transition.type === 'morph')}
        </div>

        {/* BOTTOM FOOTER / TELEMETRY */}
        <div
          className="flex items-center justify-between border-t pt-6"
          style={{ borderColor: theme.border }}
        >
          <motion.span
            layoutId={transition.type === 'morph' ? 'slide-footnote' : undefined}
            className="text-xs font-mono tracking-wider uppercase"
            style={{ color: theme.textMuted }}
          >
            {slide.elements.footnote || 'CONFIDENTIAL // REPRODUCIBLE VECTOR SYSTEM'}
          </motion.span>
          <span
            className="text-xs font-mono tracking-wider"
            style={{ color: theme.textMuted }}
          >
            NEXT-SLIDEDECK-ENGINE // v1.0
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
    </div>
  );
};

// Render layout-specific content
function renderLayoutContent(slide: Slide, theme: ThemeConfig, isMorph: boolean) {
  switch (slide.layout) {
    case 'cover':
      return (
        <div className="flex flex-col justify-center max-w-5xl">
          <div
            className="mb-6 inline-flex w-fit items-center gap-2 border px-4 py-1 text-xs font-mono tracking-widest uppercase"
            style={{ borderColor: theme.border, backgroundColor: theme.surface, color: theme.textSecondary }}
          >
            SYSTEM SPECIFICATION & STRATEGY
          </div>
          <motion.h1
            layoutId={isMorph ? 'slide-title' : undefined}
            className="text-7xl font-bold tracking-tight leading-[1.08] mb-8"
            style={{ color: theme.textPrimary }}
          >
            {slide.title}
          </motion.h1>
          <p
            className="text-2xl font-normal leading-relaxed max-w-3xl"
            style={{ color: theme.textSecondary }}
          >
            {slide.subtitle}
          </p>
          <div
            className="mt-14 flex items-center gap-8 border-t pt-8"
            style={{ borderColor: theme.border }}
          >
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: theme.textMuted }}>
                ENGINE ARCHITECTURE
              </span>
              <span className="text-sm font-medium" style={{ color: theme.textPrimary }}>
                Next.js App Router / Vector SVG
              </span>
            </div>
            <div className="h-8 w-[1px]" style={{ backgroundColor: theme.border }} />
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: theme.textMuted }}>
                RATIO SPECIFICATION
              </span>
              <span className="text-sm font-medium" style={{ color: theme.textPrimary }}>
                1920 × 1080 px (16:9 Standard)
              </span>
            </div>
            <div className="h-8 w-[1px]" style={{ backgroundColor: theme.border }} />
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: theme.textMuted }}>
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
          <div className="mb-12 max-w-4xl">
            <motion.h2
              layoutId={isMorph ? 'slide-title' : undefined}
              className="text-5xl font-bold tracking-tight mb-4"
              style={{ color: theme.textPrimary }}
            >
              {slide.title}
            </motion.h2>
            <p className="text-xl" style={{ color: theme.textSecondary }}>
              {slide.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {slide.elements.metrics?.map((metric, i) => (
              <motion.div
                key={metric.id || i}
                layoutId={isMorph ? `metric-card-${i}` : undefined}
                className="flex flex-col justify-between border p-8"
                style={{
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono font-medium tracking-widest uppercase"
                      style={{ color: theme.textMuted }}
                    >
                      {metric.label}
                    </span>
                    {metric.change && (
                      <span
                        className="text-xs font-mono border px-2 py-0.5"
                        style={{
                          borderColor: theme.border,
                          backgroundColor: theme.surfaceRaised,
                          color: theme.textPrimary,
                        }}
                      >
                        {metric.change}
                      </span>
                    )}
                  </div>
                  <div
                    className="text-6xl font-bold tracking-tight mb-4 tabular-nums"
                    style={{ color: theme.textPrimary }}
                  >
                    {metric.value}
                  </div>
                </div>
                {metric.subtext && (
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                    {metric.subtext}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'split':
      return (
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Left Column (5 Cols) */}
            <div className="col-span-5 flex flex-col justify-center">
              <motion.h2
                layoutId={isMorph ? 'slide-title' : undefined}
                className="text-5xl font-bold tracking-tight mb-6 leading-tight"
                style={{ color: theme.textPrimary }}
              >
                {slide.title}
              </motion.h2>
              <p className="text-xl leading-relaxed mb-8" style={{ color: theme.textSecondary }}>
                {slide.subtitle}
              </p>
              <div
                className="border p-6"
                style={{
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                }}
              >
                <span className="text-xs font-mono uppercase tracking-widest block mb-2" style={{ color: theme.textMuted }}>
                  CORE THESIS
                </span>
                <p className="text-sm font-medium leading-relaxed" style={{ color: theme.textPrimary }}>
                  Structured mathematical layout boundaries preserve typographic rhythm and visual equilibrium without responsive slippage.
                </p>
              </div>
            </div>

            {/* Right Column (7 Cols) */}
            <div className="col-span-7 flex flex-col gap-4">
              {slide.elements.bullets?.map((bullet, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 border p-6"
                  style={{
                    backgroundColor: theme.surfaceRaised,
                    borderColor: theme.border,
                  }}
                >
                  <div
                    className="mt-1 h-3 w-3 shrink-0 border"
                    style={{ borderColor: theme.accent, backgroundColor: theme.surface }}
                  />
                  <p className="text-base leading-relaxed" style={{ color: theme.textPrimary }}>
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'pillars':
    case 'timeline':
      return (
        <div className="flex flex-col justify-center">
          <div className="mb-12 max-w-4xl">
            <motion.h2
              layoutId={isMorph ? 'slide-title' : undefined}
              className="text-5xl font-bold tracking-tight mb-4"
              style={{ color: theme.textPrimary }}
            >
              {slide.title}
            </motion.h2>
            <p className="text-xl" style={{ color: theme.textSecondary }}>
              {slide.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {slide.elements.pillars?.map((pillar, i) => (
              <motion.div
                key={pillar.id || i}
                layoutId={isMorph ? `pillar-${i}` : undefined}
                className="flex flex-col justify-between border p-8"
                style={{
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 border-b pb-4" style={{ borderColor: theme.border }}>
                    <span className="text-xs font-mono uppercase tracking-widest" style={{ color: theme.textMuted }}>
                      {pillar.tag || `PILLAR 0${i + 1}`}
                    </span>
                    <span className="text-xs font-mono" style={{ color: theme.textSecondary }}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-4" style={{ color: theme.textPrimary }}>
                    {pillar.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: theme.textSecondary }}>
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t" style={{ borderColor: theme.border }}>
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: theme.textMuted }}>
                    SYSTEM STANDARD APPROVED
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'bento':
      return (
        <div className="flex flex-col justify-center">
          <div className="mb-8 max-w-4xl">
            <motion.h2
              layoutId={isMorph ? 'slide-title' : undefined}
              className="text-5xl font-bold tracking-tight mb-3"
              style={{ color: theme.textPrimary }}
            >
              {slide.title}
            </motion.h2>
            <p className="text-xl" style={{ color: theme.textSecondary }}>
              {slide.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {slide.elements.bentoCards?.map((card, i) => {
              const isWide = card.spanCol === 2;
              return (
                <motion.div
                  key={card.id || i}
                  layoutId={isMorph ? `bento-${i}` : undefined}
                  className={`flex flex-col justify-between border p-8 ${
                    isWide ? 'col-span-2' : 'col-span-1'
                  }`}
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono uppercase tracking-widest" style={{ color: theme.textMuted }}>
                        {card.subtitle || 'MODULE'}
                      </span>
                      {card.badge && (
                        <span
                          className="border px-2 py-0.5 text-xs font-mono uppercase tracking-wider"
                          style={{
                            borderColor: theme.border,
                            backgroundColor: theme.surfaceRaised,
                            color: theme.textPrimary,
                          }}
                        >
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-3" style={{ color: theme.textPrimary }}>
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                      {card.description}
                    </p>
                  </div>
                  {card.stat && (
                    <div className="mt-6 border-t pt-4 flex items-baseline justify-between" style={{ borderColor: theme.border }}>
                      <span className="text-xs font-mono uppercase tracking-wider" style={{ color: theme.textMuted }}>
                        TELEMETRY RATING
                      </span>
                      <span className="text-2xl font-bold font-mono" style={{ color: theme.textPrimary }}>
                        {card.stat}
                      </span>
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
              className="border px-4 py-1 text-xs font-mono tracking-widest uppercase"
              style={{ borderColor: theme.border, backgroundColor: theme.surface, color: theme.textMuted }}
            >
              EXECUTIVE DOCTRINE
            </span>
          </div>
          <blockquote className="relative my-8">
            <div
              className="text-4xl md:text-5xl font-serif font-normal leading-[1.35] tracking-tight mb-10"
              style={{ color: theme.textPrimary }}
            >
              &ldquo;{slide.elements.quote?.text || slide.subtitle}&rdquo;
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-lg font-bold tracking-wider uppercase" style={{ color: theme.textPrimary }}>
                {slide.elements.quote?.author || 'PRINCIPAL ARCHITECT'}
              </span>
              <span className="text-sm font-mono tracking-widest uppercase" style={{ color: theme.textMuted }}>
                {slide.elements.quote?.role || 'SYSTEMS DESIGN & ENGINEERING'}
              </span>
            </div>
          </blockquote>
        </div>
      );

    case 'comparison':
      const comp = slide.elements.comparison;
      return (
        <div className="flex flex-col justify-center">
          <div className="mb-10 max-w-4xl">
            <motion.h2
              layoutId={isMorph ? 'slide-title' : undefined}
              className="text-5xl font-bold tracking-tight mb-4"
              style={{ color: theme.textPrimary }}
            >
              {slide.title}
            </motion.h2>
            <p className="text-xl" style={{ color: theme.textSecondary }}>
              {slide.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {/* Left comparison column */}
            <div
              className="border p-8"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
              }}
            >
              <div className="flex items-center justify-between border-b pb-4 mb-6" style={{ borderColor: theme.border }}>
                <span className="text-sm font-mono font-bold tracking-widest uppercase" style={{ color: theme.textMuted }}>
                  {comp?.leftTitle || 'LEGACY SYSTEMS'}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 border" style={{ borderColor: theme.border, color: theme.textMuted }}>
                  DEPRECATED
                </span>
              </div>
              <ul className="flex flex-col gap-4">
                {comp?.leftItems?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-sm font-mono mt-0.5" style={{ color: theme.textMuted }}>
                      —
                    </span>
                    <span className="text-base" style={{ color: theme.textSecondary }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right comparison column */}
            <div
              className="border p-8"
              style={{
                backgroundColor: theme.surfaceRaised,
                borderColor: theme.border,
              }}
            >
              <div className="flex items-center justify-between border-b pb-4 mb-6" style={{ borderColor: theme.border }}>
                <span className="text-sm font-mono font-bold tracking-widest uppercase" style={{ color: theme.textPrimary }}>
                  {comp?.rightTitle || 'AUTONOMOUS ARCHITECTURE'}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 border" style={{ borderColor: theme.accent, backgroundColor: theme.surface, color: theme.textPrimary }}>
                  RECOMMENDED
                </span>
              </div>
              <ul className="flex flex-col gap-4">
                {comp?.rightItems?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-sm font-mono mt-0.5" style={{ color: theme.accent }}>
                      +
                    </span>
                    <span className="text-base font-medium" style={{ color: theme.textPrimary }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex flex-col justify-center max-w-4xl">
          <motion.h2
            layoutId={isMorph ? 'slide-title' : undefined}
            className="text-5xl font-bold tracking-tight mb-4"
            style={{ color: theme.textPrimary }}
          >
            {slide.title}
          </motion.h2>
          <p className="text-xl leading-relaxed" style={{ color: theme.textSecondary }}>
            {slide.subtitle}
          </p>
        </div>
      );
  }
}
