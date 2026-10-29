'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Slide, ThemeConfig, TransitionConfig } from '../../types/slide';
import { SlideRenderer } from '../slides/SlideRenderer';

interface CenterCanvasProps {
  slide: Slide;
  theme: ThemeConfig;
  transition: TransitionConfig;
  activeSlideIndex: number;
  totalSlides: number;
}

export const CenterCanvas: React.FC<CenterCanvasProps> = ({
  slide,
  theme,
  transition,
  activeSlideIndex,
  totalSlides,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.6);

  // Compute fixed 16:9 scaling based on container dimensions
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      // Fixed padding margin around deck frame
      const padding = 64;
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
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative flex-1 bg-[#060608] flex items-center justify-center overflow-hidden p-8 select-none"
    >
      {/* 
        Center Canvas Frame:
        IMPORTANT USER DIRECTIVE:
        "pastikan dibagian ui deck gaada tombol apapun ui appaun biar fokus ke deck designya"
        Zero buttons or UI overlays inside this frame!
      */}
      <div
        id="deck-stage-canvas"
        className="relative shadow-2xl transition-transform duration-100 ease-out"
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
        />
      </div>
    </main>
  );
};
