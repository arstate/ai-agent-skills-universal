'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { SlideDeck, Slide, LayoutType, TransitionType } from '../../types/slide';
import { INITIAL_DECK } from '../../presets/sampleDecks';
import { THEMES } from '../../presets/themes';
import { TopBar } from './TopBar';
import { LeftSidebar } from './LeftSidebar';
import { CenterCanvas } from './CenterCanvas';
import { RightSidebar } from './RightSidebar';
import { FullscreenPresenter } from './FullscreenPresenter';
import { ExportModal } from './ExportModal';
import { ExportEngine } from '../../export/ExportEngine';

export const SlideStudio: React.FC = () => {
  const [deck, setDeck] = useState<SlideDeck>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('next_slidedeck_data');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return INITIAL_DECK;
  });

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isPresenting, setIsPresenting] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('next_slidedeck_data', JSON.stringify(deck));
    }
  }, [deck]);

  // Keyboard shortcut listener for F5 Present mode and arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is actively typing in an input or textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      if (e.key === 'F5') {
        e.preventDefault();
        setIsPresenting((prev) => !prev);
      } else if (!isInput && !isPresenting) {
        if (e.key === 'ArrowRight' || e.key === 'j') {
          if (activeSlideIndex < deck.slides.length - 1) {
            setActiveSlideIndex((prev) => prev + 1);
          }
        } else if (e.key === 'ArrowLeft' || e.key === 'k') {
          if (activeSlideIndex > 0) {
            setActiveSlideIndex((prev) => prev - 1);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlideIndex, deck.slides.length, isPresenting]);

  const activeSlide = deck.slides[activeSlideIndex] || deck.slides[0];
  const activeTheme = THEMES[deck.themeId] || THEMES['obsidian-pure'];

  // Handlers for deck management
  const handleSelectSlide = (index: number) => {
    setActiveSlideIndex(index);
  };

  const handleAddSlide = (layout: LayoutType) => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      kicker: 'NEW SECTION // STRATEGY',
      title: 'New Slide Title',
      subtitle: 'Add contextual description for this slide layout',
      layout,
      elements: {
        footnote: 'CONFIDENTIAL // REPRODUCIBLE VECTOR SYSTEM',
        bullets: ['First strategic observation', 'Secondary analytical finding'],
        metrics: [
          { id: `m-${Date.now()}-1`, value: '100%', label: 'ACCURACY', subtext: 'Lossless' },
          { id: `m-${Date.now()}-2`, value: '<5ms', label: 'LATENCY', subtext: 'Realtime' },
        ],
        pillars: [
          { id: `p-${Date.now()}-1`, title: 'I. Pillar Alpha', tag: 'FOUNDATION', description: 'Core operational tier' },
          { id: `p-${Date.now()}-2`, title: 'II. Pillar Beta', tag: 'EXECUTION', description: 'Processing pipeline' },
          { id: `p-${Date.now()}-3`, title: 'III. Pillar Gamma', tag: 'DELIVERY', description: 'Terminal presentation' },
        ],
      },
    };

    setDeck((prev) => {
      const updatedSlides = [...prev.slides];
      updatedSlides.splice(activeSlideIndex + 1, 0, newSlide);
      return { ...prev, slides: updatedSlides };
    });
    setActiveSlideIndex((prev) => prev + 1);
  };

  const handleDuplicateSlide = (index: number) => {
    const slideToDup = deck.slides[index];
    const duplicated: Slide = {
      ...JSON.parse(JSON.stringify(slideToDup)),
      id: `slide-${Date.now()}`,
      title: `${slideToDup.title} (Copy)`,
    };

    setDeck((prev) => {
      const updatedSlides = [...prev.slides];
      updatedSlides.splice(index + 1, 0, duplicated);
      return { ...prev, slides: updatedSlides };
    });
    setActiveSlideIndex(index + 1);
  };

  const handleDeleteSlide = (index: number) => {
    if (deck.slides.length <= 1) return;
    setDeck((prev) => ({
      ...prev,
      slides: prev.slides.filter((_, idx) => idx !== index),
    }));
    setActiveSlideIndex((prev) => Math.max(0, Math.min(prev, deck.slides.length - 2)));
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= deck.slides.length) return;

    setDeck((prev) => {
      const updatedSlides = [...prev.slides];
      const temp = updatedSlides[index];
      updatedSlides[index] = updatedSlides[targetIndex];
      updatedSlides[targetIndex] = temp;
      return { ...prev, slides: updatedSlides };
    });
    setActiveSlideIndex(targetIndex);
  };

  const handleUpdateActiveSlide = (updater: (prev: Slide) => Slide) => {
    setDeck((prev) => {
      const updatedSlides = [...prev.slides];
      updatedSlides[activeSlideIndex] = updater(updatedSlides[activeSlideIndex]);
      return { ...prev, slides: updatedSlides };
    });
  };

  const handleUpdateDeckTheme = (themeId: string) => {
    setDeck((prev) => ({ ...prev, themeId }));
  };

  const handleUpdateTransition = (transitionType: TransitionType, duration: number) => {
    setDeck((prev) => ({
      ...prev,
      transition: { ...prev.transition, type: transitionType, duration },
    }));
  };

  const handleExport = async (format: 'pdf-vector' | 'pdf-raster' | 'pptx' | 'svg-single' | 'svg-all') => {
    switch (format) {
      case 'pdf-vector':
        await ExportEngine.exportPdfVector();
        break;
      case 'pdf-raster':
        await ExportEngine.exportPdfRaster(deck);
        break;
      case 'pptx':
        await ExportEngine.exportPptx(deck);
        break;
      case 'svg-single':
        await ExportEngine.exportSvg(deck, activeSlideIndex);
        break;
      case 'svg-all':
        await ExportEngine.exportSvg(deck);
        break;
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#09090b] text-white">
      {/* Studio Topbar */}
      <TopBar
        deck={deck}
        activeSlideIndex={activeSlideIndex}
        onPresent={() => setIsPresenting(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onTitleChange={(title) => setDeck((prev) => ({ ...prev, title }))}
      />

      {/* Main 3-Panel Studio Workstation */}
      <div className="flex flex-1 overflow-hidden">
        {/* Panel 1: Left Slide Filmstrip Sidebar */}
        <LeftSidebar
          slides={deck.slides}
          activeSlideIndex={activeSlideIndex}
          onSelectSlide={handleSelectSlide}
          onAddSlide={handleAddSlide}
          onDuplicateSlide={handleDuplicateSlide}
          onDeleteSlide={handleDeleteSlide}
          onMoveSlide={handleMoveSlide}
        />

        {/* Panel 2: Center Fixed 16:9 Presentation Stage (Strict Zero Buttons inside) */}
        <CenterCanvas
          slide={activeSlide}
          theme={activeTheme}
          transition={deck.transition}
          activeSlideIndex={activeSlideIndex}
          totalSlides={deck.slides.length}
        />

        {/* Panel 3: Right Inspector & Settings Sidebar */}
        <RightSidebar
          deck={deck}
          activeSlide={activeSlide}
          activeSlideIndex={activeSlideIndex}
          onUpdateActiveSlide={handleUpdateActiveSlide}
          onUpdateDeckTheme={handleUpdateDeckTheme}
          onUpdateTransition={handleUpdateTransition}
          onExport={handleExport}
        />
      </div>

      {/* Fullscreen F5 Presenter Modal */}
      {isPresenting && (
        <FullscreenPresenter
          deck={deck}
          activeSlideIndex={activeSlideIndex}
          onNavigate={(idx) => setActiveSlideIndex(idx)}
          onClose={() => setIsPresenting(false)}
        />
      )}

      {/* Export Options Modal */}
      <ExportModal
        deck={deck}
        activeSlideIndex={activeSlideIndex}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};
