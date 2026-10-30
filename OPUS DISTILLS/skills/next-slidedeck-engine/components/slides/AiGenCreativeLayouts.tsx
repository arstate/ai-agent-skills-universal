'use client';

import React from 'react';
import { Slide, ThemeConfig } from '../../types/slide';
import { SlideImageFrame } from './SlideImageFrame';
import { DEFAULT_SLIDE_IMAGE } from '../../presets/curatedPhotos';

interface AiGenProps {
  slide: Slide;
  theme: ThemeConfig;
  isMorph: boolean;
  isEditMode?: boolean;
  selectedId?: string | null;
  onSelectElement?: (id: string | null) => void;
  onUpdateSlide?: (updater: (prev: Slide) => Slide) => void;
  onOpenImageEditor?: (imageKey: string) => void;
  EditableText: React.FC<any>;
}

/**
 * 1. Klyro Creative Kinetic Hero
 * Inspired by Klyro Agency: bold grotesque title, spinning flower/asterisk icon,
 * dual pill badges, and lime/accent bordered photo card.
 */
export function renderAiKlyroHero({
  slide,
  theme,
  isEditMode,
  selectedId,
  onSelectElement,
  onUpdateSlide,
  onOpenImageEditor,
  EditableText,
}: AiGenProps) {
  const accentLime = theme.accent || '#88EE00';
  const accentOrange = theme.secondaryAccent || '#FF5722';

  return (
    <div className="w-full h-full flex items-center justify-between gap-12 px-6">
      {/* Left Column: Bold Grotesque Headline + Pill Badges */}
      <div className="flex-1 flex flex-col justify-center max-w-3xl">
        {/* Top Tag Pill */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="flex items-center gap-2.5 px-5 py-2 rounded-full border-2 text-sm font-mono font-black tracking-widest uppercase shadow-sm"
            style={{
              backgroundColor: theme.surface,
              borderColor: accentLime,
              color: theme.textPrimary,
            }}
          >
            <span
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: accentLime }}
            />
            <span>{slide.kicker || 'PRESENTATION · 01'}</span>
          </div>
          <div
            className="px-5 py-2 rounded-full text-sm font-mono font-black uppercase tracking-wider shadow-sm"
            style={{ backgroundColor: accentOrange, color: '#ffffff' }}
          >
            KLYRO
          </div>
        </div>

        {/* Giant Headline with Kinetic Asterisk */}
        <div className="flex items-start gap-5 mb-8">
          <div
            className="text-8xl lg:text-9xl font-black tracking-tight leading-[0.88] uppercase"
            style={{ color: slide.elements.titleColor || theme.textPrimary }}
          >
            <EditableText
              value={slide.title || 'CREATIVE AGENCY'}
              isEditMode={isEditMode}
              isSelected={selectedId === 'title'}
              onSelect={() => onSelectElement?.('title')}
              onSave={(val: string) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
              as="h1"
            />
          </div>
          <div
            className="text-6xl select-none font-bold animate-spin mt-2"
            style={{ color: accentLime, animationDuration: '12s' }}
          >
            ✻
          </div>
        </div>

        {/* Subtitle */}
        <div
          className="text-3xl font-medium leading-relaxed max-w-2xl mb-10"
          style={{ color: slide.elements.subtitleColor || theme.textSecondary }}
        >
          <EditableText
            value={slide.subtitle || 'Joy and curiosity are the spark that fuels creative thinking'}
            isEditMode={isEditMode}
            isSelected={selectedId === 'subtitle'}
            onSelect={() => onSelectElement?.('subtitle')}
            onSave={(val: string) => onUpdateSlide?.((prev) => ({ ...prev, subtitle: val }))}
            as="p"
          />
        </div>

        {/* Pill Tags Row */}
        <div className="flex flex-wrap items-center gap-3">
          {['VISUAL BRANDING', 'ILLUSTRATION', 'WEBSITE', 'MOBILE APP'].map((tag, idx) => (
            <div
              key={idx}
              className="px-5 py-2.5 rounded-full border-2 text-sm font-mono font-bold tracking-wider uppercase transition-transform hover:scale-105 shadow-sm"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
                color: theme.textSecondary,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Thick Vibrant Bordered Photo Card */}
      <div className="w-[660px] h-[720px] flex-shrink-0 relative">
        <div
          className="w-full h-full rounded-[40px] overflow-hidden border-[8px] shadow-2xl relative"
          style={{ borderColor: accentLime, backgroundColor: theme.surface }}
        >
          <SlideImageFrame
            image={slide.elements.image || DEFAULT_SLIDE_IMAGE}
            theme={theme}
            isEditMode={isEditMode}
            className="w-full h-full"
            aspectRatioOverride="auto"
            onOpenEditor={() => onOpenImageEditor?.('main')}
          />

          {/* Floating Pill Tag at Bottom */}
          <div className="absolute bottom-6 left-6 bg-black/85 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentOrange }} />
            <span className="text-sm font-mono font-bold tracking-wider uppercase">
              {slide.elements.footnote || 'KLYRO STUDIO · 2026'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Klyro Dual Split Stat Matrix
 * Large split container with massive 346 & 74 client stat blocks,
 * vivid orange / lime color blocking, and rotating floral accents.
 */
export function renderAiKlyroSplitStats({
  slide,
  theme,
  isEditMode,
  selectedId,
  onSelectElement,
  onUpdateSlide,
  EditableText,
}: AiGenProps) {
  const accentLime = theme.accent || '#88EE00';
  const accentOrange = theme.secondaryAccent || '#FF5722';
  const metrics = slide.elements.metrics || [
    { id: 'm1', value: '346', label: 'CLIENT', subtext: '2026 ACTIVE PARTNERS', color: accentOrange },
    { id: 'm2', value: '74', label: 'CLIENT', subtext: '2024 DEPLOYMENTS', color: accentLime },
    { id: 'm3', value: '28', label: 'CLIENT', subtext: '2022 FOUNDING YEAR', color: accentLime },
  ];

  return (
    <div className="w-full h-full flex items-center justify-between gap-12 px-6">
      {/* Left Column: Bold Assertion Headline */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl select-none" style={{ color: accentOrange }}>
            ✻
          </span>
          <span
            className="text-sm font-mono uppercase tracking-widest font-black"
            style={{ color: theme.textMuted }}
          >
            {slide.kicker || 'PORTFOLIO TRACTION & SCALE'}
          </span>
        </div>

        <div
          className="text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.92] mb-8"
          style={{ color: slide.elements.titleColor || theme.textPrimary }}
        >
          <EditableText
            value={slide.title || 'TRUSTED BY BRANDS WHO BELIEVE IN THE POWER OF DESIGN'}
            isEditMode={isEditMode}
            isSelected={selectedId === 'title'}
            onSelect={() => onSelectElement?.('title')}
            onSave={(val: string) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
            as="h2"
          />
        </div>

        <div
          className="text-3xl font-medium leading-relaxed max-w-xl"
          style={{ color: slide.elements.subtitleColor || theme.textSecondary }}
        >
          <EditableText
            value={slide.subtitle || 'Every brand partnership begins with shared ambition and proven impact.'}
            isEditMode={isEditMode}
            isSelected={selectedId === 'subtitle'}
            onSelect={() => onSelectElement?.('subtitle')}
            onSave={(val: string) => onUpdateSlide?.((prev) => ({ ...prev, subtitle: val }))}
            as="p"
          />
        </div>
      </div>

      {/* Right Column: Vivid Split Stat Blocks */}
      <div className="w-[820px] grid grid-cols-2 gap-6">
        {/* Massive Primary Stat (Orange Block) */}
        <div
          className="col-span-2 rounded-[36px] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[300px]"
          style={{ backgroundColor: accentOrange, color: '#ffffff' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-mono font-black tracking-widest uppercase opacity-95">
              {metrics[0]?.label || 'TOTAL CLIENTS'}
            </span>
            <span className="text-4xl select-none opacity-90">✻</span>
          </div>
          <div className="my-3">
            <span className="text-[130px] font-black tracking-tight leading-none">
              {metrics[0]?.value || '346'}
            </span>
          </div>
          <div className="text-base font-mono uppercase tracking-wider font-bold opacity-90">
            {metrics[0]?.subtext || 'GLOBAL ACTIVE PARTNERS'}
          </div>
        </div>

        {/* Secondary Stat (Card 1) */}
        <div
          className="rounded-[32px] p-8 flex flex-col justify-between shadow-xl relative overflow-hidden min-h-[220px]"
          style={{ backgroundColor: '#FFFFFF', color: '#0A3431' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono font-black tracking-widest uppercase">
              {metrics[1]?.label || 'CLIENTS'}
            </span>
            <span className="text-2xl font-bold" style={{ color: accentOrange }}>✻</span>
          </div>
          <div className="my-2">
            <span className="text-8xl font-black tracking-tight leading-none">
              {metrics[1]?.value || '74'}
            </span>
          </div>
          <div className="text-sm font-mono uppercase tracking-wider font-bold opacity-80">
            {metrics[1]?.subtext || '2024 DEPLOYMENTS'}
          </div>
        </div>

        {/* Secondary Stat (Card 2) */}
        <div
          className="rounded-[32px] p-8 flex flex-col justify-between shadow-xl relative overflow-hidden min-h-[220px]"
          style={{ backgroundColor: '#FFFFFF', color: '#0A3431' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono font-black tracking-widest uppercase">
              {metrics[2]?.label || 'CLIENTS'}
            </span>
            <span className="text-2xl font-bold" style={{ color: accentOrange }}>✻</span>
          </div>
          <div className="my-2">
            <span className="text-8xl font-black tracking-tight leading-none">
              {metrics[2]?.value || '28'}
            </span>
          </div>
          <div className="text-sm font-mono uppercase tracking-wider font-bold opacity-80">
            {metrics[2]?.subtext || '2022 FOUNDING YEAR'}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Klyro Ticket-Stub Principles
 * 4 vertical cards shaped like price tags/tickets with punched hole circle at top,
 * colored headers, and numbered labels.
 */
export function renderAiKlyroTicketPrinciples({
  slide,
  theme,
  isEditMode,
  selectedId,
  onSelectElement,
  onUpdateSlide,
  EditableText,
}: AiGenProps) {
  const accentLime = theme.accent || '#88EE00';
  const accentOrange = theme.secondaryAccent || '#FF5722';

  const principles = [
    { title: 'CREATIVITY WITH PURPOSE', color: accentLime, text: 'We craft ideas that are not just visually striking, but strategically aligned with brand goals.' },
    { title: 'HUMAN CENTERED DESIGN', color: accentOrange, text: 'Every concept begins with understanding people, their needs, behaviors, and emotions.' },
    { title: 'CONSISTENCY BUILDS TRUST', color: '#FACC15', text: 'From identity to execution, we ensure a unified voice and visual presence across touchpoints.' },
    { title: 'COLLABORATE NOT DICTATE', color: '#FF6B4A', text: 'We work hand-in-hand with clients, turning shared visions into bold, effective realities.' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div
            className="inline-block px-6 py-2 rounded-full text-sm font-mono font-black tracking-widest uppercase mb-3 shadow-sm"
            style={{ backgroundColor: accentOrange, color: '#ffffff' }}
          >
            OUR PRINCIPLE
          </div>
          <div
            className="text-7xl font-black uppercase tracking-tight leading-tight"
            style={{ color: slide.elements.titleColor || theme.textPrimary }}
          >
            <EditableText
              value={slide.title || 'CORE VALUES THAT GUIDE EVERY PIXEL'}
              isEditMode={isEditMode}
              isSelected={selectedId === 'title'}
              onSelect={() => onSelectElement?.('title')}
              onSave={(val: string) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
              as="h2"
            />
          </div>
        </div>
        <div className="text-5xl select-none font-bold" style={{ color: accentLime }}>
          ✻ ✻
        </div>
      </div>

      {/* 4 Ticket-Stub Cards Grid */}
      <div className="grid grid-cols-4 gap-6">
        {principles.map((item, idx) => (
          <div
            key={idx}
            className="relative rounded-[28px] p-8 pt-14 border-2 shadow-2xl flex flex-col justify-between transition-transform hover:-translate-y-1"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: theme.border,
              minHeight: '560px',
            }}
          >
            {/* Top Punched Hole Circle */}
            <div
              className="w-8 h-8 rounded-full border-4 absolute top-4 left-1/2 -translate-x-1/2 shadow-inner"
              style={{
                backgroundColor: theme.bg,
                borderColor: '#CBD5E1',
              }}
            />

            <div>
              {/* Colored Header Pill */}
              <div
                className="w-full py-3.5 px-4 rounded-xl text-center font-black text-sm uppercase tracking-wider mb-6 shadow-sm"
                style={{
                  backgroundColor: item.color,
                  color: item.color === accentLime ? '#0A3431' : '#FFFFFF',
                }}
              >
                {item.title}
              </div>

              {/* Body Text */}
              <p className="text-xl text-zinc-800 leading-relaxed font-semibold">
                {item.text}
              </p>
            </div>

            {/* Bottom Tag Footer */}
            <div className="border-t-2 border-dashed border-zinc-200 pt-5 flex items-center justify-between text-zinc-500 text-sm font-mono font-bold">
              <span>0{idx + 1} · DIRECTIVE</span>
              <span className="text-lg" style={{ color: item.color }}>✻</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 4. Chuckle 3D Device & Chunky Hero
 * Retro device / desktop setup with chunky rounded white border overlay and pop typography.
 */
export function renderAiChuckleRetroHero({
  slide,
  theme,
  isEditMode,
  selectedId,
  onSelectElement,
  onUpdateSlide,
  onOpenImageEditor,
  EditableText,
}: AiGenProps) {
  const accentViolet = theme.accent || '#6C2BD9';
  const accentOrange = theme.secondaryAccent || '#FF521B';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 relative">
      {/* Outer Rounded Frame Overlay */}
      <div
        className="w-full max-w-7xl rounded-[44px] p-12 border-[6px] shadow-2xl relative overflow-hidden bg-white/95 dark:bg-zinc-900/95"
        style={{
          borderColor: accentOrange,
        }}
      >
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span
              className="px-6 py-2 rounded-full text-sm font-mono font-black uppercase tracking-wider text-white shadow-sm"
              style={{ backgroundColor: accentViolet }}
            >
              PITCH DECK
            </span>
            <span className="text-sm font-mono font-bold text-zinc-400">
              {slide.kicker || 'JUNE 2026 EDITION'}
            </span>
          </div>
          <div
            className="text-3xl font-black tracking-widest uppercase font-mono"
            style={{ color: accentOrange }}
          >
            CHUCKLE
          </div>
        </div>

        {/* Center Visual + Chunky Title Block */}
        <div className="grid grid-cols-2 gap-12 items-center">
          <div className="h-[500px] w-full rounded-[32px] overflow-hidden border-4 border-zinc-300 dark:border-zinc-700 shadow-xl relative">
            <SlideImageFrame
              image={slide.elements.image || DEFAULT_SLIDE_IMAGE}
              theme={theme}
              isEditMode={isEditMode}
              className="w-full h-full"
              aspectRatioOverride="auto"
              onOpenEditor={() => onOpenImageEditor?.('main')}
            />
          </div>

          <div className="flex flex-col justify-center max-w-xl">
            <div
              className="text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-6 text-white"
              style={{ color: slide.elements.titleColor || '#FFFFFF' }}
            >
              <EditableText
                value={slide.title || 'WHY CHUCKLE AGENCY'}
                isEditMode={isEditMode}
                isSelected={selectedId === 'title'}
                onSelect={() => onSelectElement?.('title')}
                onSave={(val: string) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
                as="h1"
              />
            </div>

            <div
              className="text-2xl font-medium leading-relaxed mb-8 text-zinc-200"
              style={{ color: slide.elements.subtitleColor || '#E4E4E7' }}
            >
              <EditableText
                value={slide.subtitle || 'Bold creativity that leaves a lasting impression through fearless brand storytelling and iconic product framing.'}
                isEditMode={isEditMode}
                isSelected={selectedId === 'subtitle'}
                onSelect={() => onSelectElement?.('subtitle')}
                onSave={(val: string) => onUpdateSlide?.((prev) => ({ ...prev, subtitle: val }))}
                as="p"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="px-6 py-3 rounded-2xl text-sm font-black font-mono uppercase bg-emerald-400 text-zinc-950 shadow-md">
                85% CLIENT RETENTION
              </span>
              <span className="px-6 py-3 rounded-2xl text-sm font-black font-mono uppercase border-2 border-zinc-300 dark:border-zinc-700 shadow-sm text-zinc-100">
                470+ CAMPAIGNS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 5. Borcelle Donut Chart & Stat Pillars
 * High-impact donut chart data visualization with 3 colored stat bars.
 */
export function renderAiBorcelleDonutData({
  slide,
  theme,
  isEditMode,
  selectedId,
  onSelectElement,
  onUpdateSlide,
  EditableText,
}: AiGenProps) {
  const accentChartreuse = theme.accent || '#E2FD52';
  const accentOrange = theme.secondaryAccent || '#FF6422';

  return (
    <div className="w-full h-full flex items-center justify-between gap-12 px-6">
      {/* Left Column: Donut Chart Visualization */}
      <div
        className="w-[620px] flex flex-col items-center justify-center p-12 rounded-[40px] border-4 shadow-2xl"
        style={{ backgroundColor: '#1E1E24', borderColor: '#2E2E38' }}
      >
        <div className="relative w-[340px] h-[340px] flex items-center justify-center mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#27272a" strokeWidth="14" />
            {/* Segment 1: Chartreuse 55% */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke={accentChartreuse}
              strokeWidth="14"
              strokeDasharray="251.2"
              strokeDashoffset="113"
            />
            {/* Segment 2: Orange 30% */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke={accentOrange}
              strokeWidth="14"
              strokeDasharray="251.2"
              strokeDashoffset="175"
              strokeDashoffset-direction="reverse"
            />
          </svg>
          {/* Centered Stat */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-8xl font-black tracking-tight leading-none text-white">
              85%
            </span>
            <span className="text-sm font-mono font-bold uppercase tracking-widest mt-2 text-zinc-400">
              RETENTION
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-8 text-sm font-mono font-bold uppercase">
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: accentChartreuse }} />
            <span className="text-zinc-200">DIRECT IMPACT (55%)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: accentOrange }} />
            <span className="text-zinc-200">GROWTH (30%)</span>
          </div>
        </div>
      </div>

      {/* Right Column: Title + 3 Stat Bars */}
      <div className="flex-1 flex flex-col justify-center max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accentChartreuse }} />
          <span className="text-sm font-mono font-black tracking-widest uppercase text-emerald-400">
            {slide.kicker || 'PROVEN IMPACT FOR REAL BRANDS'}
          </span>
        </div>

        <div
          className="text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] mb-6 text-white"
          style={{ color: slide.elements.titleColor || '#FFFFFF' }}
        >
          <EditableText
            value={slide.title || 'DATA-BACKED AGENCY PERFORMANCE'}
            isEditMode={isEditMode}
            isSelected={selectedId === 'title'}
            onSelect={() => onSelectElement?.('title')}
            onSave={(val: string) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
            as="h2"
          />
        </div>

        <div
          className="text-2xl font-normal leading-relaxed mb-10 text-zinc-300 max-w-xl"
          style={{ color: slide.elements.subtitleColor || '#D4D4D8' }}
        >
          <EditableText
            value={slide.subtitle || 'Measured lift across enterprise client portfolios over consecutive rolling quarters.'}
            isEditMode={isEditMode}
            isSelected={selectedId === 'subtitle'}
            onSelect={() => onSelectElement?.('subtitle')}
            onSave={(val: string) => onUpdateSlide?.((prev) => ({ ...prev, subtitle: val }))}
            as="p"
          />
        </div>

        {/* 2 Big KPI Cards */}
        <div className="grid grid-cols-2 gap-6">
          <div className="p-8 rounded-[32px] border-2 shadow-xl" style={{ backgroundColor: '#1E1E24', borderColor: '#2E2E38' }}>
            <span className="text-7xl lg:text-8xl font-black tracking-tight" style={{ color: accentChartreuse }}>
              290K
            </span>
            <p className="text-sm font-mono uppercase tracking-wider font-bold mt-2 text-zinc-400">
              AUDIENCE REACHED MONTHLY
            </p>
          </div>
          <div className="p-8 rounded-[32px] border-2 shadow-xl" style={{ backgroundColor: '#1E1E24', borderColor: '#2E2E38' }}>
            <span className="text-7xl lg:text-8xl font-black tracking-tight" style={{ color: accentOrange }}>
              28+
            </span>
            <p className="text-sm font-mono uppercase tracking-wider font-bold mt-2 text-zinc-400">
              BRANDS SCALED WORLDWIDE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 6. Borcelle 3-Circle Venn Diagram
 * Overlapping translucent circles with central golden convergence badge.
 */
export function renderAiBorcelleVennDiagram({
  slide,
  theme,
  isEditMode,
  selectedId,
  onSelectElement,
  onUpdateSlide,
  EditableText,
}: AiGenProps) {
  const accentChartreuse = theme.accent || '#E2FD52';
  const accentOrange = theme.secondaryAccent || '#FF6422';

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-6">
      {/* Title */}
      <div className="text-center max-w-5xl mb-8">
        <span className="text-sm font-mono font-black tracking-widest uppercase text-emerald-700 px-5 py-2 rounded-full border border-emerald-400/40 bg-emerald-50 shadow-sm">
          {slide.kicker || 'STRATEGIC ALIGNMENT'}
        </span>
        <div
          className="text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] mt-5 mb-4 text-zinc-900"
          style={{ color: slide.elements.titleColor || '#0F172A' }}
        >
          <EditableText
            value={slide.title || 'WHERE STRATEGY MEETS EXECUTION'}
            isEditMode={isEditMode}
            isSelected={selectedId === 'title'}
            onSelect={() => onSelectElement?.('title')}
            onSave={(val: string) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
            as="h2"
          />
        </div>
        <p className="text-xl font-medium text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          {slide.subtitle || 'The tri-factor intersection driving high conversion and long-term brand equity.'}
        </p>
      </div>

      {/* 3 Overlapping Horizontal Circles (Borcelle Reference Style) */}
      <div className="relative w-[1000px] h-[360px] flex items-center justify-center">
        {/* Circle 1: Left (Lime) */}
        <div
          className="w-80 h-80 rounded-full border-[6px] flex flex-col items-center justify-center p-8 text-center shadow-xl transition-transform hover:scale-105 -mr-12 relative z-10"
          style={{
            backgroundColor: `${accentChartreuse}40`,
            borderColor: accentChartreuse,
            color: '#0A3431',
          }}
        >
          <span className="text-xs font-mono font-black uppercase tracking-wider mb-2">PILLAR 01</span>
          <span className="text-xl font-black leading-tight uppercase">STRATEGIC CREATIVE DIRECTION</span>
        </div>

        {/* Circle 2: Center (Orange) */}
        <div
          className="w-80 h-80 rounded-full border-[6px] flex flex-col items-center justify-center p-8 text-center shadow-xl transition-transform hover:scale-105 -mr-12 relative z-20"
          style={{
            backgroundColor: `${accentOrange}40`,
            borderColor: accentOrange,
            color: '#7C2D12',
          }}
        >
          <span className="text-xs font-mono font-black uppercase tracking-wider mb-2">PILLAR 02</span>
          <span className="text-xl font-black leading-tight uppercase">TAILORED DIGITAL SOLUTIONS</span>
        </div>

        {/* Circle 3: Right (Yellow / Medallion) */}
        <div
          className="w-80 h-80 rounded-full border-[6px] flex flex-col items-center justify-center p-8 text-center shadow-xl transition-transform hover:scale-105 relative z-30"
          style={{
            backgroundColor: 'rgba(250, 204, 21, 0.45)',
            borderColor: '#FACC15',
            color: '#713F12',
          }}
        >
          <div className="w-16 h-16 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center text-3xl shadow-lg border-2 border-white mb-2">
            🏆
          </div>
          <span className="text-xs font-mono font-black uppercase tracking-wider mb-1">PILLAR 03</span>
          <span className="text-xl font-black leading-tight uppercase">END-TO-END EXECUTION</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 7. Fintech Fluid Wave Accent
 * Flowing SVG ribbon curve traveling across modern corporate cards with floating stat pills.
 */
export function renderAiFintechRibbonWave({
  slide,
  theme,
  isEditMode,
  selectedId,
  onSelectElement,
  onUpdateSlide,
  EditableText,
}: AiGenProps) {
  const accentCobalt = theme.accent || '#2B4CDE';
  const accentAcidLime = theme.secondaryAccent || '#A3E635';

  return (
    <div className="w-full h-full flex items-center justify-between gap-12 px-6 relative overflow-hidden">
      {/* Background SVG Fluid Wavy Ribbon */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 1920 1080"
        fill="none"
      >
        <path
          d="M -100 450 C 400 200, 800 700, 1300 350 S 1800 650, 2100 400"
          stroke={accentAcidLime}
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path
          d="M -100 520 C 420 280, 820 760, 1320 420 S 1820 720, 2100 480"
          stroke={accentCobalt}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="20 20"
        />
      </svg>

      {/* Left Column: Headline + Metric Pill */}
      <div className="flex-1 flex flex-col justify-center max-w-xl relative z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border-2 text-sm font-mono font-black uppercase tracking-wider mb-6 bg-white/90 text-zinc-900 shadow-sm w-fit">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentCobalt }} />
          <span>FINANCIAL TECHNOLOGY</span>
        </div>

        <div
          className="text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.98] mb-6 text-white"
          style={{ color: slide.elements.titleColor || '#FFFFFF' }}
        >
          <EditableText
            value={slide.title || 'AUTONOMOUS FINANCE ENGINE'}
            isEditMode={isEditMode}
            isSelected={selectedId === 'title'}
            onSelect={() => onSelectElement?.('title')}
            onSave={(val: string) => onUpdateSlide?.((prev) => ({ ...prev, title: val }))}
            as="h2"
          />
        </div>

        <p className="text-2xl leading-relaxed text-white/90 mb-10 max-w-lg font-medium">
          {slide.subtitle || 'Transforming high-frequency transactions with verifiable security and sub-millisecond execution.'}
        </p>

        {/* Big Metric Badge */}
        <div
          className="p-8 rounded-[36px] border-[4px] shadow-2xl flex items-center justify-between max-w-lg bg-white text-zinc-950"
          style={{ borderColor: accentCobalt }}
        >
          <div>
            <span className="text-8xl font-black leading-none" style={{ color: accentCobalt }}>
              320%
            </span>
            <p className="text-sm font-mono uppercase tracking-widest text-zinc-500 font-bold mt-2">
              YEAR-OVER-YEAR VOLUME
            </p>
          </div>
          <div className="px-5 py-2.5 rounded-full text-sm font-mono font-black uppercase bg-emerald-500 text-white shadow-md">
            VERIFIED
          </div>
        </div>
      </div>

      {/* Right Column: Cards Stack & Compliance Badges */}
      <div className="w-[680px] flex flex-col gap-6 relative z-10">
        <div className="p-8 rounded-[36px] border-2 shadow-2xl bg-white/95 text-zinc-950 backdrop-blur-md">
          <span className="text-sm font-mono font-black uppercase tracking-widest text-zinc-500">
            PLATFORM CAPABILITIES
          </span>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="p-6 rounded-2xl border-2 bg-zinc-50 border-zinc-200">
              <span className="text-6xl font-black text-emerald-600">80%+</span>
              <p className="text-sm font-mono text-zinc-600 mt-2 uppercase font-bold">Automation Rate</p>
            </div>
            <div className="p-6 rounded-2xl border-2 bg-zinc-50 border-zinc-200">
              <span className="text-6xl font-black text-indigo-600">2M+</span>
              <p className="text-sm font-mono text-zinc-600 mt-2 uppercase font-bold">Daily Transactions</p>
            </div>
          </div>
        </div>

        {/* Security Compliance Pills */}
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 rounded-2xl border-2 text-sm font-mono font-black uppercase bg-white/90 text-zinc-900 shadow-md flex items-center gap-2.5">
            <span>🔒</span>
            <span>BANK GRADE SECURITY</span>
          </div>
          <div className="px-6 py-3 rounded-2xl border-2 text-sm font-mono font-black uppercase bg-white/90 text-zinc-900 shadow-md">
            PCI DSS
          </div>
          <div className="px-6 py-3 rounded-2xl border-2 text-sm font-mono font-black uppercase bg-white/90 text-zinc-900 shadow-md">
            ISO 27001
          </div>
        </div>
      </div>
    </div>
  );
}
