'use client';

import React from 'react';
import { SlideImage, ThemeConfig } from '../../types/slide';
import { TelemetryCrosshair } from './SvgIcon';
import { Image as ImageIcon, Crop, Sliders } from 'lucide-react';

interface SlideImageFrameProps {
  image: SlideImage;
  theme: ThemeConfig;
  isEditMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  onOpenEditor?: () => void;
  onUpdateCaption?: (newCaption: string) => void;
  className?: string;
  style?: React.CSSProperties;
  aspectRatioOverride?: string;
}

export const SlideImageFrame: React.FC<SlideImageFrameProps> = ({
  image,
  theme,
  isEditMode = false,
  isSelected = false,
  onSelect,
  onContextMenu,
  onOpenEditor,
  onUpdateCaption,
  className = '',
  style = {},
  aspectRatioOverride,
}) => {
  const objectFit = image.objectFit || 'cover';
  const scale = image.scale ?? 1.0;
  const posX = image.positionX ?? 50;
  const posY = image.positionY ?? 50;
  const borderRadius = image.borderRadius ?? 0;
  const showBorder = image.border !== false;
  const filter = image.filter || 'none';

  // Aspect ratio class mapping for strict, un-stretched optical geometry
  const getAspectRatioStyle = (): React.CSSProperties => {
    const ratio = aspectRatioOverride || image.aspectRatio || '16/9';
    switch (ratio) {
      case '16/9':
        return { aspectRatio: '16 / 9' };
      case '4/3':
        return { aspectRatio: '4 / 3' };
      case '1/1':
        return { aspectRatio: '1 / 1' };
      case '3/4':
        return { aspectRatio: '3 / 4' };
      case '2/3':
        return { aspectRatio: '2 / 3' };
      case 'auto':
      default:
        return {};
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (isEditMode) {
      e.preventDefault();
      e.stopPropagation();
      onContextMenu?.(e);
      onOpenEditor?.();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode) {
      e.stopPropagation();
      onSelect?.();
    }
  };

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      className={`group relative flex flex-col transition-all ${className} ${
        isEditMode ? 'cursor-pointer' : ''
      } ${
        isSelected
          ? 'ring-2 ring-emerald-400 shadow-xl'
          : isEditMode
          ? 'hover:ring-1 hover:ring-zinc-400'
          : ''
      }`}
      style={{
        backgroundColor: theme.surface,
        borderColor: isSelected ? '#10B981' : theme.border,
        borderRadius,
        ...style,
      }}
    >
      {/* Visual Selection Handles in Edit Mode */}
      {isEditMode && isSelected && (
        <>
          <span className="absolute -top-1.5 -left-1.5 h-3 w-3 bg-emerald-400 border border-black z-30 pointer-events-none" />
          <span className="absolute -top-1.5 -right-1.5 h-3 w-3 bg-emerald-400 border border-black z-30 pointer-events-none" />
          <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-emerald-400 border border-black z-30 pointer-events-none" />
          <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-emerald-400 border border-black z-30 pointer-events-none" />
        </>
      )}

      {/* CAD Telemetry Crosshairs in Corners */}
      <TelemetryCrosshair color={theme.accent} className="absolute top-2.5 right-2.5 z-20" />

      {/* Floating Hover Badge in Edit Mode */}
      {isEditMode && (
        <div className="absolute top-2.5 left-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenEditor?.();
            }}
            className="flex items-center gap-1.5 bg-black/85 text-emerald-300 border border-emerald-500/50 px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase backdrop-blur-md shadow-lg hover:bg-emerald-950/80 transition-all"
            title="Right-click or click to format, change image, crop, or adjust scale"
          >
            <Crop className="h-3 w-3" />
            <span>FORMAT / CROP</span>
          </button>
          <span className="bg-black/75 text-zinc-300 border border-zinc-700 px-2 py-1 text-[10px] font-mono tracking-widest uppercase">
            {image.aspectRatio || '16:9'} · {Math.round(scale * 100)}%
          </span>
        </div>
      )}

      {/* Anti-Stretch Image Viewport Box */}
      <div
        className={`relative w-full overflow-hidden ${
          showBorder ? 'border' : ''
        }`}
        style={{
          ...getAspectRatioStyle(),
          borderColor: theme.border,
          borderRadius,
        }}
      >
        {/* Optical boundary ring (Taste-Design Law 6) */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 z-10" />

        {/* The Image Element: strictly object-fit cover/contain, no distortion */}
        <img
          src={image.url}
          alt={image.alt || 'Slide presentation graphic'}
          loading="eager"
          className="h-full w-full select-none transition-transform duration-150 ease-out"
          style={{
            objectFit,
            objectPosition: `${posX}% ${posY}%`,
            transform: `scale(${scale})`,
            transformOrigin: `${posX}% ${posY}%`,
            filter,
          }}
          onError={(e) => {
            // High-taste fallback if user url fails
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';
          }}
        />
      </div>

      {/* Caption & Telemetry Metadata Footer */}
      {(image.caption || isEditMode) && (
        <div
          className="flex items-center justify-between border-t px-4 py-2.5 text-xs font-mono select-none"
          style={{ borderColor: theme.border, backgroundColor: theme.surfaceRaised }}
        >
          <div className="flex items-center gap-2 text-zinc-400">
            <ImageIcon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            {isEditMode ? (
              <input
                type="text"
                value={image.caption || ''}
                placeholder="Click to add image caption / telemetry..."
                onChange={(e) => onUpdateCaption?.(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="bg-transparent text-xs font-mono outline-none w-full text-zinc-300 placeholder:text-zinc-600 focus:border-b focus:border-emerald-400"
              />
            ) : (
              <span className="tracking-wider uppercase text-zinc-400">
                {image.caption}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase shrink-0 font-bold ml-2">
            OPTICAL 1080P
          </span>
        </div>
      )}
    </div>
  );
};
