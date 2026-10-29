'use client';

import React, { useEffect, useState, useRef } from 'react';
import { SlideDeck } from '../../types/slide';
import { THEMES } from '../../presets/themes';
import { SlideRenderer } from '../slides/SlideRenderer';

interface FullscreenPresenterProps {
  deck: SlideDeck;
  activeSlideIndex: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

export const FullscreenPresenter: React.FC<FullscreenPresenterProps> = ({
  deck,
  activeSlideIndex,
  onNavigate,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeSlide = deck.slides[activeSlideIndex] || deck.slides[0];
  const theme = THEMES[deck.themeId] || THEMES['obsidian-pure'];

  // Calculate fullscreen 16:9 scale
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scaleX = w / 1920;
      const scaleY = h / 1080;
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Request actual browser fullscreen if available
    try {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (e) {}

    return () => {
      window.removeEventListener('resize', handleResize);
      try {
        if (document.exitFullscreen && document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      } catch (e) {}
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'Enter') {
        e.preventDefault();
        if (activeSlideIndex < deck.slides.length - 1) {
          onNavigate(activeSlideIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        if (activeSlideIndex > 0) {
          onNavigate(activeSlideIndex - 1);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        onNavigate(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        onNavigate(deck.slides.length - 1);
      } else if (e.key === 'Escape' || e.key === 'F5') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlideIndex, deck.slides.length, onNavigate, onClose]);

  // Auto-hide discreet HUD on mouse idle
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-[#000000] flex items-center justify-center overflow-hidden cursor-none select-none"
    >
      <div
        className="relative shadow-2xl transition-transform duration-75"
        style={{
          width: 1920,
          height: 1080,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        <SlideRenderer
          slide={activeSlide}
          theme={theme}
          transition={deck.transition}
          index={activeSlideIndex}
          totalSlides={deck.slides.length}
        />
      </div>

      {/* Discreet floating overlay that auto-hides */}
      <div
        className={`pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 border border-[#27272a] bg-[#0c0c0e]/85 backdrop-blur-md px-4 py-1.5 text-xs font-mono text-[#a1a1aa] flex items-center gap-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span>
          SLIDE {String(activeSlideIndex + 1).padStart(2, '0')} / {String(deck.slides.length).padStart(2, '0')}
        </span>
        <span className="text-[#3f3f46]">|</span>
        <span>PRESS [ESC] TO EXIT FULLSCREEN</span>
      </div>
    </div>
  );
};
