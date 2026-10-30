'use client';

import React, { useState } from 'react';
import {
  Palette,
  Type,
  LayoutGrid,
  Sparkles,
  Download,
  Plus,
  Trash2,
  Check,
} from 'lucide-react';
import {
  Slide,
  SlideDeck,
  LayoutType,
  TransitionType,
  ThemeConfig,
  ChromeStyle,
  MetricItem,
  PillarItem,
  BentoCard,
} from '../../types/slide';
import { THEMES } from '../../presets/themes';
import {
  LAYOUT_CATALOG,
  LAYOUT_CATEGORIES,
  LAYOUT_LOOKUP,
  resolveLayoutMeta,
} from '../../presets/layoutCatalog';

interface RightSidebarProps {
  deck: SlideDeck;
  activeSlide: Slide;
  activeSlideIndex: number;
  studioMode?: 'dark' | 'light';
  onUpdateActiveSlide: (updater: (prev: Slide) => Slide) => void;
  onUpdateDeckTheme: (themeId: string) => void;
  onUpdateDeckChrome?: (chromeStyle: ChromeStyle) => void;
  onUpdateDeckBrand?: (brandLabel: string) => void;
  onUpdateTransition: (transitionType: TransitionType, duration: number) => void;
  onExport: (format: 'pdf-vector' | 'pdf-raster' | 'pptx' | 'svg-single' | 'svg-all') => void;
}

type TabKey = 'style' | 'text' | 'elements' | 'animation' | 'export';

export const RightSidebar: React.FC<RightSidebarProps> = ({
  deck,
  activeSlide,
  activeSlideIndex,
  studioMode = 'dark',
  onUpdateActiveSlide,
  onUpdateDeckTheme,
  onUpdateDeckChrome,
  onUpdateDeckBrand,
  onUpdateTransition,
  onExport,
}) => {
  const activeTheme = THEMES[deck.themeId] || THEMES['obsidian-pure'];
  const [activeTab, setActiveTab] = useState<TabKey>('style');
  const [themeCategoryFilter, setThemeCategoryFilter] = useState<'all' | 'light' | 'dark' | 'vibrant' | 'ai-gen'>('all');

  const filteredThemes = Object.values(THEMES).filter((t) => {
    if (themeCategoryFilter === 'all') return true;
    if (themeCategoryFilter === 'light') return t.isLight === true || t.category === 'light' || t.category === 'editorial';
    if (themeCategoryFilter === 'dark') return t.isLight === false && (t.category === 'dark' || !t.category);
    if (themeCategoryFilter === 'vibrant') return t.category === 'vibrant';
    if (themeCategoryFilter === 'ai-gen') return t.category === 'ai-gen';
    return true;
  });

  const transitionOptions: { type: TransitionType; label: string; desc: string }[] = [
    { type: 'morph', label: 'Morph Smooth', desc: 'Seamless shared-layout element morphing' },
    { type: 'crossfade', label: 'Crossfade', desc: 'Subtle high-refresh opacity dissolve' },
    { type: 'slide-x', label: 'Slide Horizontal', desc: 'Crisp linear directional slide' },
    { type: 'slide-y', label: 'Slide Vertical', desc: 'Architectural vertical shift' },
    { type: 'scale-zoom', label: 'Scale Zoom', desc: 'Kinetic depth zoom in/out' },
    { type: 'clip-reveal', label: 'Clip Reveal', desc: 'Mathematical geometric wipe' },
    { type: 'flip-3d', label: '3D Flip Perspective', desc: 'Modern dimensional rotation' },
    { type: 'stagger-blur', label: 'Stagger Blur', desc: 'Cascading optical blur interpolation' },
  ];

  const layoutOptions: { type: LayoutType; label: string }[] = [
    { type: 'cover', label: 'Cover Headline' },
    { type: 'metrics', label: 'Key Metrics' },
    { type: 'split', label: 'Asymmetric Split' },
    { type: 'pillars', label: '3-Pillars' },
    { type: 'bento', label: 'Bento Matrix' },
    { type: 'quote', label: 'Quote Spotlight' },
    { type: 'comparison', label: 'Comparison' },
    { type: 'timeline', label: 'Timeline' },
    { type: 'image', label: 'Image Hero' },
    { type: 'html', label: 'Arbitrary HTML' },
  ];

  const isLight = studioMode === 'light';

  const inputClass = isLight
    ? 'w-full bg-white border border-[#e4e4e7] focus:border-zinc-900 text-xs font-mono text-zinc-900 p-2.5 outline-none transition-colors'
    : 'w-full bg-[#141418] border border-[#27272a] focus:border-white text-xs font-mono text-white p-2.5 outline-none transition-colors';

  const textareaClass = isLight
    ? 'w-full bg-white border border-[#e4e4e7] focus:border-zinc-900 text-xs text-zinc-900 p-2.5 outline-none transition-colors resize-none leading-relaxed'
    : 'w-full bg-[#141418] border border-[#27272a] focus:border-white text-xs text-[#d4d4d8] p-2.5 outline-none transition-colors resize-none leading-relaxed';

  const labelClass = isLight
    ? 'text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1.5'
    : 'text-[10px] font-mono uppercase tracking-widest text-[#71717a] block mb-1.5';

  const cardClass = isLight
    ? 'border border-[#e4e4e7] bg-white p-3 flex flex-col gap-2 shadow-sm'
    : 'border border-[#222227] bg-[#121215] p-3 flex flex-col gap-2';

  return (
    <aside
      className={`w-80 border-l flex flex-col justify-between select-none z-20 transition-colors duration-150 ${
        isLight
          ? 'border-[#e4e4e7] bg-[#f4f4f5] text-zinc-900'
          : 'border-[#27272a] bg-[#0c0c0e] text-white'
      }`}
    >
      {/* Tab Navigation Header */}
      <div
        className={`flex border-b ${
          isLight ? 'border-[#e4e4e7] bg-[#fafafa]' : 'border-[#27272a] bg-[#09090b]'
        }`}
      >
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-3 text-center border-b-2 text-[11px] font-mono tracking-wider transition-colors uppercase ${
            activeTab === 'style'
              ? isLight
                ? 'border-zinc-900 text-zinc-900 bg-white font-semibold'
                : 'border-white text-white bg-[#121215]'
              : isLight
              ? 'border-transparent text-zinc-500 hover:text-zinc-900'
              : 'border-transparent text-[#71717a] hover:text-[#d4d4d8]'
          }`}
          title="Theme & Layout Style"
        >
          STYLE
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-3 text-center border-b-2 text-[11px] font-mono tracking-wider transition-colors uppercase ${
            activeTab === 'text'
              ? isLight
                ? 'border-zinc-900 text-zinc-900 bg-white font-semibold'
                : 'border-white text-white bg-[#121215]'
              : isLight
              ? 'border-transparent text-zinc-500 hover:text-zinc-900'
              : 'border-transparent text-[#71717a] hover:text-[#d4d4d8]'
          }`}
          title="Edit Slide Text"
        >
          TEXT
        </button>
        <button
          onClick={() => setActiveTab('elements')}
          className={`flex-1 py-3 text-center border-b-2 text-[11px] font-mono tracking-wider transition-colors uppercase ${
            activeTab === 'elements'
              ? isLight
                ? 'border-zinc-900 text-zinc-900 bg-white font-semibold'
                : 'border-white text-white bg-[#121215]'
              : isLight
              ? 'border-transparent text-zinc-500 hover:text-zinc-900'
              : 'border-transparent text-[#71717a] hover:text-[#d4d4d8]'
          }`}
          title="Component Elements"
        >
          ELEM
        </button>
        <button
          onClick={() => setActiveTab('animation')}
          className={`flex-1 py-3 text-center border-b-2 text-[11px] font-mono tracking-wider transition-colors uppercase ${
            activeTab === 'animation'
              ? isLight
                ? 'border-zinc-900 text-zinc-900 bg-white font-semibold'
                : 'border-white text-white bg-[#121215]'
              : isLight
              ? 'border-transparent text-zinc-500 hover:text-zinc-900'
              : 'border-transparent text-[#71717a] hover:text-[#d4d4d8]'
          }`}
          title="Animation & Transitions"
        >
          ANIM
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`flex-1 py-3 text-center border-b-2 text-[11px] font-mono tracking-wider transition-colors uppercase ${
            activeTab === 'export'
              ? isLight
                ? 'border-zinc-900 text-zinc-900 bg-white font-semibold'
                : 'border-white text-white bg-[#121215]'
              : isLight
              ? 'border-transparent text-zinc-500 hover:text-zinc-900'
              : 'border-transparent text-[#71717a] hover:text-[#d4d4d8]'
          }`}
          title="Vector PDF & SVG Export"
        >
          EXPORT
        </button>
      </div>

      {/* Tab Content Panel */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
        {/* TAB 1: STYLE */}
        {activeTab === 'style' && (
          <div className="flex flex-col gap-6">
            {/* Theme Palettes Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={labelClass}>
                  DESIGN STYLES & PALETTES
                </span>
                <span className={`text-[10px] font-mono ${isLight ? 'text-zinc-500' : 'text-[#a1a1aa]'}`}>
                  {filteredThemes.length} / {Object.keys(THEMES).length}
                </span>
              </div>

              {/* Category Filter Chips */}
              <div className="grid grid-cols-5 gap-1 mb-3">
                {(['all', 'light', 'dark', 'vibrant', 'ai-gen'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setThemeCategoryFilter(cat)}
                    className={`py-1 text-center text-[9px] font-mono uppercase tracking-wider transition-colors border truncate ${
                      themeCategoryFilter === cat
                        ? isLight
                          ? 'border-zinc-900 bg-zinc-900 text-white font-semibold'
                          : 'border-white bg-[#18181c] text-white font-semibold'
                        : isLight
                        ? 'border-[#e4e4e7] bg-white text-zinc-600 hover:text-zinc-900'
                        : 'border-[#222227] bg-[#101014] text-[#71717a] hover:text-[#d4d4d8]'
                    }`}
                  >
                    {cat === 'ai-gen' ? '✨ AI GEN' : cat}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1">
                {filteredThemes.map((theme) => {
                  const isSelected = deck.themeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => onUpdateDeckTheme(theme.id)}
                      className={`flex flex-col p-2.5 border text-left transition-all ${
                        isSelected
                          ? isLight
                            ? 'border-zinc-900 bg-white ring-1 ring-zinc-900 shadow-sm'
                            : 'border-white bg-[#18181c]'
                          : isLight
                          ? 'border-[#e4e4e7] bg-white hover:border-zinc-400'
                          : 'border-[#222227] bg-[#101014] hover:border-[#383842]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          {/* Color Palette Preview Swatches */}
                          <div className="flex items-center gap-1">
                            <span
                              className="h-3 w-3 border border-[#3f3f46] rounded-none shrink-0"
                              style={{ backgroundColor: theme.bg }}
                              title={`Background: ${theme.bg}`}
                            />
                            <span
                              className="h-3 w-3 border border-[#3f3f46] rounded-none shrink-0"
                              style={{ backgroundColor: theme.surface }}
                              title={`Surface: ${theme.surface}`}
                            />
                            <span
                              className="h-3 w-3 border border-[#3f3f46] rounded-none shrink-0"
                              style={{ backgroundColor: theme.accent }}
                              title={`Accent: ${theme.accent}`}
                            />
                          </div>
                          <span
                            className={`text-xs font-mono font-medium truncate max-w-[160px] ${
                              isLight ? 'text-zinc-900' : 'text-white'
                            }`}
                          >
                            {theme.name}
                          </span>
                        </div>
                        {isSelected && (
                          <Check
                            className={`h-3.5 w-3.5 shrink-0 ${
                              isLight ? 'text-zinc-900' : 'text-white'
                            }`}
                          />
                        )}
                      </div>
                      <span
                        className={`text-[10px] leading-tight line-clamp-2 ${
                          isLight ? 'text-zinc-500' : 'text-[#71717a]'
                        }`}
                      >
                        {theme.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Slide Background Color Tuning (AI GEN Per-Slide Custom Color) */}
              <div className="mt-3 pt-3 border-t flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className={labelClass}>SLIDE BG COLOR (PER-PAGE DYNAMIC)</span>
                  <span className="text-[10px] font-mono font-bold uppercase" style={{ color: activeSlide.elements?.bg || activeTheme.bg }}>
                    {activeSlide.elements?.bg || activeTheme.bg}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={activeSlide.elements?.bg || activeTheme.bg}
                    onChange={(e) =>
                      onUpdateActiveSlide((prev) => ({
                        ...prev,
                        elements: {
                          ...prev.elements,
                          bg: e.target.value,
                          bgColor: e.target.value,
                        },
                      }))
                    }
                    className="h-8 w-10 border cursor-pointer bg-transparent p-0.5 rounded-xs"
                    title="Choose custom background color for this slide"
                  />
                  <input
                    type="text"
                    value={activeSlide.elements?.bg || ''}
                    placeholder={activeTheme.bg}
                    onChange={(e) =>
                      onUpdateActiveSlide((prev) => ({
                        ...prev,
                        elements: {
                          ...prev.elements,
                          bg: e.target.value,
                          bgColor: e.target.value,
                        },
                      }))
                    }
                    className={inputClass}
                  />
                  {activeSlide.elements?.bg && (
                    <button
                      onClick={() =>
                        onUpdateActiveSlide((prev) => ({
                          ...prev,
                          elements: {
                            ...prev.elements,
                            bg: undefined,
                            bgColor: undefined,
                          },
                        }))
                      }
                      className="px-2 py-1 text-[10px] font-mono border hover:bg-zinc-800 text-zinc-400"
                      title="Reset to theme background"
                    >
                      RESET
                    </button>
                  )}
                </div>
                {/* Fast Swatches */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {[
                    { label: 'Off-White', color: '#F7F7F7' },
                    { label: 'Orange', color: '#FF5722' },
                    { label: 'Alabaster', color: '#F4EFEA' },
                    { label: 'Purple', color: '#6C2BD9' },
                    { label: 'Dark', color: '#16161A' },
                    { label: 'Cobalt', color: '#2B4CDE' },
                    { label: 'White', color: '#FFFFFF' },
                  ].map((swatch) => (
                    <button
                      key={swatch.color}
                      onClick={() =>
                        onUpdateActiveSlide((prev) => ({
                          ...prev,
                          elements: {
                            ...prev.elements,
                            bg: swatch.color,
                            bgColor: swatch.color,
                          },
                        }))
                      }
                      className="flex items-center gap-1 px-1.5 py-0.5 border text-[9.5px] font-mono rounded-xs transition-transform hover:scale-105"
                      style={{
                        borderColor: isLight ? '#e4e4e7' : '#27272a',
                        backgroundColor: swatch.color,
                        color: ['#FFFFFF', '#F7F7F7', '#F4EFEA'].includes(swatch.color) ? '#18181B' : '#FFFFFF',
                      }}
                      title={`Set background to ${swatch.label} (${swatch.color})`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full border border-black/20" style={{ backgroundColor: swatch.color }} />
                      <span>{swatch.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Deck Chrome / Folio Style Switcher */}
            <div>
              <span className={labelClass}>DECK CHROME / FOLIO STYLE</span>
              <select
                value={deck.chromeStyle || 'minimal'}
                onChange={(e) => onUpdateDeckChrome?.(e.target.value as ChromeStyle)}
                className={inputClass}
              >
                <option value="minimal">Minimal Clean (Bottom right page number)</option>
                <option value="editorial">Broadsheet Editorial (Hairlines + brand label)</option>
                <option value="badge-capsule">Modern Agency Capsule (Pill badge)</option>
                <option value="creative-studio">Creative Agency Studio (Klyro / Chuckle brand pill)</option>
                <option value="classic-rule">Executive Consulting (Crisp accent rule)</option>
                <option value="clean-bleed">Clean Bleed (Zero header bar, max canvas)</option>
              </select>
            </div>

            {/* Deck Brand / Studio Tag */}
            <div>
              <span className={labelClass}>DECK BRAND / STUDIO TAG</span>
              <input
                type="text"
                value={deck.brandLabel || ''}
                placeholder="e.g. KLYRO AGENCY / CHUCKLE / BORCELLE"
                onChange={(e) => onUpdateDeckBrand?.(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Active Slide Layout Picker with 100 choices & clean dropdown */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className={labelClass}>ACTIVE SLIDE LAYOUT (100 CHOICES)</span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {resolveLayoutMeta(activeSlide.layout).archetype.toUpperCase()}
                </span>
              </div>

              {/* Clean Categorized Dropdown */}
              <select
                value={activeSlide.layout}
                onChange={(e) =>
                  onUpdateActiveSlide((prev) => ({
                    ...prev,
                    layout: e.target.value as LayoutType,
                  }))
                }
                className={inputClass}
              >
                {LAYOUT_CATEGORIES.map((category) => {
                  const catLayouts = LAYOUT_CATALOG.filter((l) => l.category === category);
                  return (
                    <optgroup key={category} label={category}>
                      {catLayouts.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>

              {/* Active Layout Metadata Card */}
              {(() => {
                const currentMeta = resolveLayoutMeta(activeSlide.layout);
                return (
                  <div
                    className={`mt-2 p-2.5 border text-xs font-mono flex flex-col gap-1 ${
                      isLight ? 'border-[#e4e4e7] bg-white' : 'border-[#27272a] bg-[#121215]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 truncate max-w-[190px]">
                        {currentMeta.name}
                      </span>
                      <span className="text-[9px] uppercase text-zinc-400 border px-1.5 py-0.5 shrink-0">
                        {currentMeta.category.split('.')[1]?.trim() || currentMeta.category}
                      </span>
                    </div>
                    <p className="text-[11px] leading-tight text-zinc-400">{currentMeta.desc}</p>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB 2: TEXT */}
        {activeTab === 'text' && (
          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>
                KICKER / CONTEXT TAG
              </label>
              <input
                type="text"
                value={activeSlide.kicker || ''}
                onChange={(e) =>
                  onUpdateActiveSlide((prev) => ({ ...prev, kicker: e.target.value }))
                }
                className={inputClass}
                placeholder="e.g. EXECUTIVE BRIEFING · 2026"
              />
            </div>

            <div>
              <label className={labelClass}>
                HEADLINE TITLE
              </label>
              <textarea
                rows={2}
                value={activeSlide.title || ''}
                onChange={(e) =>
                  onUpdateActiveSlide((prev) => ({ ...prev, title: e.target.value }))
                }
                className={`${textareaClass} font-semibold`}
                placeholder="Declarative slide title"
              />
            </div>

            <div>
              <label className={labelClass}>
                SUBTITLE / SUMMARY
              </label>
              <textarea
                rows={3}
                value={activeSlide.subtitle || ''}
                onChange={(e) =>
                  onUpdateActiveSlide((prev) => ({ ...prev, subtitle: e.target.value }))
                }
                className={textareaClass}
                placeholder="Supporting contextual explanation"
              />
            </div>

            <div>
              <label className={labelClass}>
                FOOTNOTE / TELEMETRY
              </label>
              <input
                type="text"
                value={activeSlide.elements.footnote || ''}
                onChange={(e) =>
                  onUpdateActiveSlide((prev) => ({
                    ...prev,
                    elements: { ...prev.elements, footnote: e.target.value },
                  }))
                }
                className={inputClass}
                placeholder="e.g. CONFIDENTIAL · SOURCE LOGS"
              />
            </div>

            {/* Standalone HTML Editor if slide is HTML layout or has rawHtml */}
            {(activeSlide.layout === 'html' || activeSlide.layout === 'bespoke' || activeSlide.rawHtml || activeSlide.elements?.rawHtml) && (
              <div className="border-t border-[#e4e4e7] dark:border-[#27272a] pt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className={labelClass}>
                    STANDALONE HTML (1-SLIDE = 1 HTML)
                  </label>
                  <span className="text-[9px] font-mono text-emerald-500 font-bold">UNRESTRICTED</span>
                </div>
                <textarea
                  rows={8}
                  value={activeSlide.rawHtml || activeSlide.elements.rawHtml || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateActiveSlide((prev) => ({
                      ...prev,
                      rawHtml: val,
                      elements: { ...prev.elements, rawHtml: val },
                    }));
                  }}
                  className={`${textareaClass} font-mono text-[11px]`}
                  placeholder="Paste standalone HTML document or snippet with unrestricted layout/styling..."
                />
                <span className={`text-[10px] ${isLight ? 'text-zinc-500' : 'text-[#71717a]'}`}>
                  Full creative freedom. Renders full-bleed 1920x1080 inside canvas.
                </span>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ELEMENTS */}
        {activeTab === 'elements' && (
          <div className="flex flex-col gap-5">
            {/* Elements for 'html' / 'bespoke' layout */}
            {(activeSlide.layout === 'html' || activeSlide.layout === 'bespoke' || activeSlide.rawHtml || activeSlide.elements?.rawHtml) && (
              <div className={cardClass}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 font-bold">
                    STANDALONE HTML ARTEFACT
                  </span>
                  <span className={`text-[9px] font-mono ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    1920x1080 FULL BLEED
                  </span>
                </div>
                <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  Arbitrary HTML slide authored with complete creative freedom. Renders full-bleed without forced templates.
                </p>
                <div>
                  <label className={labelClass}>RAW HTML DOCUMENT / SNIPPET</label>
                  <textarea
                    rows={12}
                    value={activeSlide.rawHtml || activeSlide.elements.rawHtml || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateActiveSlide((prev) => ({
                        ...prev,
                        rawHtml: val,
                        elements: { ...prev.elements, rawHtml: val },
                      }));
                    }}
                    className={`${textareaClass} font-mono text-[11px]`}
                    placeholder="<!doctype html><html>...</html>"
                  />
                </div>
                <div>
                  <label className={labelClass}>CUSTOM CSS (OPTIONAL)</label>
                  <textarea
                    rows={4}
                    value={activeSlide.customCss || activeSlide.elements.customCss || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateActiveSlide((prev) => ({
                        ...prev,
                        customCss: val,
                        elements: { ...prev.elements, customCss: val },
                      }));
                    }}
                    className={`${textareaClass} font-mono text-[11px]`}
                    placeholder=":root { ... }"
                  />
                </div>
              </div>
            )}

            {/* Elements for 'metrics' layout */}
            {activeSlide.layout === 'metrics' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a]">
                    METRIC CARDS ({activeSlide.elements.metrics?.length || 0})
                  </span>
                  <button
                    onClick={() => {
                      const newMetric: MetricItem = {
                        id: `m-${Date.now()}`,
                        value: '99.9%',
                        label: 'METRIC LABEL',
                        subtext: 'Operational telemetry summary',
                      };
                      onUpdateActiveSlide((prev) => ({
                        ...prev,
                        elements: {
                          ...prev.elements,
                          metrics: [...(prev.elements.metrics || []), newMetric],
                        },
                      }));
                    }}
                    className="flex items-center gap-1 border border-[#27272a] bg-[#141417] px-2 py-0.5 text-[10px] font-mono text-white hover:border-white"
                  >
                    <Plus className="h-2.5 w-2.5" /> ADD
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {activeSlide.elements.metrics?.map((metric, i) => (
                    <div key={metric.id || i} className="border border-[#222227] bg-[#121215] p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#71717a]">METRIC #{i + 1}</span>
                        <button
                          onClick={() => {
                            onUpdateActiveSlide((prev) => ({
                              ...prev,
                              elements: {
                                ...prev.elements,
                                metrics: prev.elements.metrics?.filter((_, idx) => idx !== i),
                              },
                            }));
                          }}
                          className="text-[#71717a] hover:text-red-400"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={metric.value}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateActiveSlide((prev) => {
                            const updated = [...(prev.elements.metrics || [])];
                            updated[i] = { ...updated[i], value: val };
                            return { ...prev, elements: { ...prev.elements, metrics: updated } };
                          });
                        }}
                        className="bg-[#18181d] border border-[#2a2a30] p-1.5 text-sm font-bold font-mono text-white outline-none"
                        placeholder="Value (e.g. 45,000)"
                      />
                      <input
                        type="text"
                        value={metric.label}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateActiveSlide((prev) => {
                            const updated = [...(prev.elements.metrics || [])];
                            updated[i] = { ...updated[i], label: val };
                            return { ...prev, elements: { ...prev.elements, metrics: updated } };
                          });
                        }}
                        className="bg-[#18181d] border border-[#2a2a30] p-1.5 text-xs font-mono text-white outline-none"
                        placeholder="Label"
                      />
                      <input
                        type="text"
                        value={metric.subtext || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateActiveSlide((prev) => {
                            const updated = [...(prev.elements.metrics || [])];
                            updated[i] = { ...updated[i], subtext: val };
                            return { ...prev, elements: { ...prev.elements, metrics: updated } };
                          });
                        }}
                        className="bg-[#18181d] border border-[#2a2a30] p-1.5 text-xs text-[#a1a1aa] outline-none"
                        placeholder="Subtext"
                      />
                      {/* Icon & Color Row */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#1c1c22]">
                        <div className="flex items-center gap-1.5 flex-1">
                          <span className="text-[9px] font-mono text-[#71717a]">ICON:</span>
                          <select
                            value={metric.iconName || 'activity'}
                            onChange={(e) => {
                              const icon = e.target.value;
                              onUpdateActiveSlide((prev) => {
                                const updated = [...(prev.elements.metrics || [])];
                                updated[i] = { ...updated[i], iconName: icon };
                                return { ...prev, elements: { ...prev.elements, metrics: updated } };
                              });
                            }}
                            className="bg-[#18181d] border border-[#2a2a30] text-[10px] font-mono text-white p-1 outline-none flex-1"
                          >
                            {['cpu', 'sparkles', 'activity', 'zap', 'shield', 'layers', 'database', 'server', 'terminal', 'bar-chart', 'target', 'network', 'box', 'check-circle', 'lock'].map((ic) => (
                              <option key={ic} value={ic}>{ic}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-1">
                          {['#10B981', '#06B6D4', '#38BDF8', '#8B5CF6', '#F59E0B'].map((col) => (
                            <button
                              key={col}
                              onClick={() => {
                                onUpdateActiveSlide((prev) => {
                                  const updated = [...(prev.elements.metrics || [])];
                                  updated[i] = { ...updated[i], color: col };
                                  return { ...prev, elements: { ...prev.elements, metrics: updated } };
                                });
                              }}
                              className={`h-3 w-3 border ${metric.color === col ? 'ring-1 ring-white' : 'border-zinc-700'}`}
                              style={{ backgroundColor: col }}
                              title={`Set color ${col}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Elements for 'pillars' or 'timeline' */}
            {(activeSlide.layout === 'pillars' || activeSlide.layout === 'timeline') && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] block mb-3">
                  PILLAR COLUMNS ({activeSlide.elements.pillars?.length || 0})
                </span>
                <div className="flex flex-col gap-3">
                  {activeSlide.elements.pillars?.map((pillar, i) => (
                    <div key={pillar.id || i} className="border border-[#222227] bg-[#121215] p-3 flex flex-col gap-2">
                      <div className="text-[10px] font-mono text-[#71717a]">COLUMN #{i + 1}</div>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateActiveSlide((prev) => {
                            const updated = [...(prev.elements.pillars || [])];
                            updated[i] = { ...updated[i], title: val };
                            return { ...prev, elements: { ...prev.elements, pillars: updated } };
                          });
                        }}
                        className="bg-[#18181d] border border-[#2a2a30] p-1.5 text-xs font-bold text-white outline-none"
                        placeholder="Column Title"
                      />
                      <textarea
                        rows={2}
                        value={pillar.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateActiveSlide((prev) => {
                            const updated = [...(prev.elements.pillars || [])];
                            updated[i] = { ...updated[i], description: val };
                            return { ...prev, elements: { ...prev.elements, pillars: updated } };
                          });
                        }}
                        className="bg-[#18181d] border border-[#2a2a30] p-1.5 text-xs text-[#a1a1aa] outline-none resize-none"
                        placeholder="Description"
                      />
                      {/* Icon & Color Row */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#1c1c22]">
                        <div className="flex items-center gap-1.5 flex-1">
                          <span className="text-[9px] font-mono text-[#71717a]">ICON:</span>
                          <select
                            value={pillar.iconName || 'layers'}
                            onChange={(e) => {
                              const icon = e.target.value;
                              onUpdateActiveSlide((prev) => {
                                const updated = [...(prev.elements.pillars || [])];
                                updated[i] = { ...updated[i], iconName: icon };
                                return { ...prev, elements: { ...prev.elements, pillars: updated } };
                              });
                            }}
                            className="bg-[#18181d] border border-[#2a2a30] text-[10px] font-mono text-white p-1 outline-none flex-1"
                          >
                            {['layers', 'target', 'git-branch', 'terminal', 'shield', 'activity', 'cpu', 'box'].map((ic) => (
                              <option key={ic} value={ic}>{ic}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-1">
                          {['#10B981', '#06B6D4', '#38BDF8', '#8B5CF6', '#F59E0B'].map((col) => (
                            <button
                              key={col}
                              onClick={() => {
                                onUpdateActiveSlide((prev) => {
                                  const updated = [...(prev.elements.pillars || [])];
                                  updated[i] = { ...updated[i], color: col };
                                  return { ...prev, elements: { ...prev.elements, pillars: updated } };
                                });
                              }}
                              className={`h-3 w-3 border ${pillar.color === col ? 'ring-1 ring-white' : 'border-zinc-700'}`}
                              style={{ backgroundColor: col }}
                              title={`Set color ${col}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Elements for 'bento' layout */}
            {activeSlide.layout === 'bento' && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] block mb-3">
                  BENTO CARDS ({activeSlide.elements.bentoCards?.length || 0})
                </span>
                <div className="flex flex-col gap-3">
                  {activeSlide.elements.bentoCards?.map((card, i) => (
                    <div key={card.id || i} className="border border-[#222227] bg-[#121215] p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#71717a]">BENTO #{i + 1}</span>
                        <span className="text-[9px] font-mono border border-[#27272a] px-1 text-[#71717a]">
                          {card.spanCol === 2 ? 'WIDE 2X' : 'STANDARD 1X'}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateActiveSlide((prev) => {
                            const updated = [...(prev.elements.bentoCards || [])];
                            updated[i] = { ...updated[i], title: val };
                            return { ...prev, elements: { ...prev.elements, bentoCards: updated } };
                          });
                        }}
                        className="bg-[#18181d] border border-[#2a2a30] p-1.5 text-xs font-bold text-white outline-none"
                        placeholder="Card Title"
                      />
                      <textarea
                        rows={2}
                        value={card.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateActiveSlide((prev) => {
                            const updated = [...(prev.elements.bentoCards || [])];
                            updated[i] = { ...updated[i], description: val };
                            return { ...prev, elements: { ...prev.elements, bentoCards: updated } };
                          });
                        }}
                        className="bg-[#18181d] border border-[#2a2a30] p-1.5 text-xs text-[#a1a1aa] outline-none resize-none"
                        placeholder="Description"
                      />
                      {/* Icon & Color Row */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#1c1c22]">
                        <div className="flex items-center gap-1.5 flex-1">
                          <span className="text-[9px] font-mono text-[#71717a]">ICON:</span>
                          <select
                            value={card.iconName || 'box'}
                            onChange={(e) => {
                              const icon = e.target.value;
                              onUpdateActiveSlide((prev) => {
                                const updated = [...(prev.elements.bentoCards || [])];
                                updated[i] = { ...updated[i], iconName: icon };
                                return { ...prev, elements: { ...prev.elements, bentoCards: updated } };
                              });
                            }}
                            className="bg-[#18181d] border border-[#2a2a30] text-[10px] font-mono text-white p-1 outline-none flex-1"
                          >
                            {['box', 'lock', 'server', 'activity', 'cpu', 'shield', 'network', 'zap'].map((ic) => (
                              <option key={ic} value={ic}>{ic}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-1">
                          {['#10B981', '#06B6D4', '#38BDF8', '#8B5CF6', '#F59E0B'].map((col) => (
                            <button
                              key={col}
                              onClick={() => {
                                onUpdateActiveSlide((prev) => {
                                  const updated = [...(prev.elements.bentoCards || [])];
                                  updated[i] = { ...updated[i], color: col };
                                  return { ...prev, elements: { ...prev.elements, bentoCards: updated } };
                                });
                              }}
                              className={`h-3 w-3 border ${card.color === col ? 'ring-1 ring-white' : 'border-zinc-700'}`}
                              style={{ backgroundColor: col }}
                              title={`Set color ${col}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Elements for 'split' layout */}
            {activeSlide.layout === 'split' && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] block mb-3">
                  COMPARATIVE BULLET POINTS
                </span>
                <div className="flex flex-col gap-2.5">
                  {activeSlide.elements.bullets?.map((bullet, i) => (
                    <textarea
                      key={i}
                      rows={2}
                      value={bullet}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateActiveSlide((prev) => {
                          const updated = [...(prev.elements.bullets || [])];
                          updated[i] = val;
                          return { ...prev, elements: { ...prev.elements, bullets: updated } };
                        });
                      }}
                      className="bg-[#141418] border border-[#27272a] p-2 text-xs text-[#d4d4d8] outline-none resize-none"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Elements for 'quote' layout */}
            {activeSlide.layout === 'quote' && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a]">
                  QUOTE DOCTRINE SPECIFICATION
                </span>
                <textarea
                  rows={4}
                  value={activeSlide.elements.quote?.text || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateActiveSlide((prev) => ({
                      ...prev,
                      elements: {
                        ...prev.elements,
                        quote: { ...(prev.elements.quote || { author: 'AUTHOR' }), text: val },
                      },
                    }));
                  }}
                  className="bg-[#141418] border border-[#27272a] p-2.5 text-xs text-white outline-none resize-none leading-relaxed"
                  placeholder="Citation text"
                />
                <input
                  type="text"
                  value={activeSlide.elements.quote?.author || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateActiveSlide((prev) => ({
                      ...prev,
                      elements: {
                        ...prev.elements,
                        quote: { ...(prev.elements.quote || { text: '' }), author: val },
                      },
                    }));
                  }}
                  className="bg-[#141418] border border-[#27272a] p-2 text-xs font-mono text-white outline-none"
                  placeholder="Author"
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ANIMATION */}
        {activeTab === 'animation' && (
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] block mb-2">
                TRANSITION ALGORITHM
              </span>
              <div className="flex flex-col gap-2">
                {transitionOptions.map((opt) => {
                  const isSelected = deck.transition.type === opt.type;
                  return (
                    <button
                      key={opt.type}
                      onClick={() => onUpdateTransition(opt.type, deck.transition.duration)}
                      className={`flex flex-col p-3 border text-left transition-all ${
                        isSelected
                          ? 'border-white bg-[#18181c]'
                          : 'border-[#222227] bg-[#101014] hover:border-[#383842]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-bold text-white uppercase">
                          {opt.label}
                        </span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                      </div>
                      <span className="text-[10px] text-[#71717a] leading-tight">
                        {opt.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a]">
                  DURATION (SECONDS)
                </span>
                <span className="text-xs font-mono text-white font-semibold">
                  {deck.transition.duration.toFixed(2)}s
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.5"
                step="0.05"
                value={deck.transition.duration}
                onChange={(e) =>
                  onUpdateTransition(deck.transition.type, parseFloat(e.target.value))
                }
                className="w-full accent-white bg-[#27272a] cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* TAB 5: EXPORT */}
        {activeTab === 'export' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a]">
              PRODUCTION EXPORT PIPELINE
            </span>

            {/* 1. PDF Vector (SVG based print) */}
            <button
              onClick={() => onExport('pdf-vector')}
              className="flex flex-col p-3.5 border border-white bg-white hover:bg-[#e4e4e7] text-black text-left transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold uppercase">
                  PDF Vector (SVG Print)
                </span>
                <Download className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] text-[#3f3f46]">
                Lossless mathematical vector PDF with selectable typography & razor-sharp paths
              </span>
            </button>

            {/* 2. PDF Image Raster */}
            <button
              onClick={() => onExport('pdf-raster')}
              className="flex flex-col p-3.5 border border-[#27272a] bg-[#121215] hover:border-white text-white text-left transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold uppercase">
                  PDF Image (4K Canvas)
                </span>
                <Download className="h-3.5 w-3.5 text-[#a1a1aa]" />
              </div>
              <span className="text-[10px] text-[#71717a]">
                High-density 3840x2160 rasterized snapshot for maximum viewer compatibility
              </span>
            </button>

            {/* 3. PPTX PowerPoint */}
            <button
              onClick={() => onExport('pptx')}
              className="flex flex-col p-3.5 border border-[#27272a] bg-[#121215] hover:border-white text-white text-left transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold uppercase">
                  Editable PPTX (.pptx)
                </span>
                <Download className="h-3.5 w-3.5 text-[#a1a1aa]" />
              </div>
              <span className="text-[10px] text-[#71717a]">
                Standard Microsoft PowerPoint file with real native editable text frames & shapes
              </span>
            </button>

            {/* 4. SVG Only (Active Slide) */}
            <button
              onClick={() => onExport('svg-single')}
              className="flex flex-col p-3.5 border border-[#27272a] bg-[#121215] hover:border-white text-white text-left transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold uppercase">
                  SVG Vector (Active Slide)
                </span>
                <Download className="h-3.5 w-3.5 text-[#a1a1aa]" />
              </div>
              <span className="text-[10px] text-[#71717a]">
                Pure standalone .svg file of slide #{activeSlideIndex + 1}
              </span>
            </button>

            {/* 5. SVG Only (All Slides ZIP) */}
            <button
              onClick={() => onExport('svg-all')}
              className="flex flex-col p-3.5 border border-[#27272a] bg-[#121215] hover:border-white text-white text-left transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold uppercase">
                  SVG Bundle (All in ZIP)
                </span>
                <Download className="h-3.5 w-3.5 text-[#a1a1aa]" />
              </div>
              <span className="text-[10px] text-[#71717a]">
                ZIP archive containing pure mathematical .svg vectors for all {deck.slides.length} slides
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#27272a] text-[10px] font-mono text-[#52525b] flex items-center justify-between">
        <span>STUDIO INSPECTOR</span>
        <span>AUTO-SAVED</span>
      </div>
    </aside>
  );
};
