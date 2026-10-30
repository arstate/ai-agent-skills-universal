'use client';

import React, { useState } from 'react';
import { SlideImage, ThemeConfig } from '../../types/slide';
import { CURATED_SLIDE_PHOTOS } from '../../presets/curatedPhotos';
import {
  X,
  Upload,
  Link as LinkIcon,
  Crop,
  ZoomIn,
  Move,
  Maximize2,
  Sliders,
  Check,
  RotateCcw,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';

interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: SlideImage;
  theme: ThemeConfig;
  onSave: (updatedImage: SlideImage) => void;
  isStudioLight?: boolean;
}

export const ImageEditorModal: React.FC<ImageEditorModalProps> = ({
  isOpen,
  onClose,
  image,
  theme,
  onSave,
  isStudioLight = false,
}) => {
  const [activeSourceTab, setActiveSourceTab] = useState<'upload' | 'url' | 'presets'>('presets');
  const [urlInput, setUrlInput] = useState(image.url || '');
  const [currentImage, setCurrentImage] = useState<SlideImage>({
    url: image.url || CURATED_SLIDE_PHOTOS[0].url,
    alt: image.alt || 'Slide image',
    caption: image.caption || '',
    objectFit: image.objectFit || 'cover',
    aspectRatio: image.aspectRatio || '16/9',
    scale: image.scale ?? 1.0,
    positionX: image.positionX ?? 50,
    positionY: image.positionY ?? 50,
    borderRadius: image.borderRadius ?? 0,
    border: image.border !== false,
    filter: image.filter || 'none',
  });

  if (!isOpen) return null;

  const updateProp = <K extends keyof SlideImage>(key: K, val: SlideImage[K]) => {
    const next = { ...currentImage, [key]: val };
    setCurrentImage(next);
    onSave(next);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) {
        setUrlInput(dataUrl);
        updateProp('url', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      updateProp('url', urlInput.trim());
    }
  };

  const aspectRatios: { id: SlideImage['aspectRatio']; label: string }[] = [
    { id: '16/9', label: '16:9 Widescreen' },
    { id: '4/3', label: '4:3 Standard' },
    { id: '1/1', label: '1:1 Square' },
    { id: '3/4', label: '3:4 Editorial' },
    { id: '2/3', label: '2:3 Portrait' },
    { id: 'auto', label: 'Auto Frame' },
  ];

  const focalPresets = [
    { label: 'TL', x: 15, y: 15 },
    { label: 'TC', x: 50, y: 15 },
    { label: 'TR', x: 85, y: 15 },
    { label: 'CL', x: 15, y: 50 },
    { label: 'C', x: 50, y: 50 },
    { label: 'CR', x: 85, y: 50 },
    { label: 'BL', x: 15, y: 85 },
    { label: 'BC', x: 50, y: 85 },
    { label: 'BR', x: 85, y: 85 },
  ];

  const filterPresets = [
    { label: 'Normal', value: 'none' },
    { label: 'B&W Film', value: 'grayscale(100%) contrast(110%)' },
    { label: 'High Contrast', value: 'contrast(125%) brightness(95%)' },
    { label: 'Warm Tone', value: 'sepia(25%) contrast(105%)' },
  ];

  const modalBg = isStudioLight ? 'bg-white text-zinc-900 border-zinc-300' : 'bg-[#0f1013] text-white border-zinc-800';
  const panelBg = isStudioLight ? 'bg-zinc-100 border-zinc-200' : 'bg-[#15161a] border-zinc-800';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-4xl border shadow-2xl flex flex-col max-h-[92vh] overflow-hidden ${modalBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b px-6 py-4 border-inherit">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center border border-emerald-400 bg-emerald-500/10 text-emerald-400">
              <Crop className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-mono font-bold tracking-wider uppercase">
                IMAGE FORMAT & OPTICAL CROP WORKSTATION
              </h2>
              <p className="text-[11px] font-mono text-zinc-400">
                Anti-Stretch Guaranteed · Precision Scale & Focal Alignment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center border border-zinc-700 hover:border-white text-zinc-400 hover:text-white transition-all"
            title="Close editor"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body: 2 Columns (Left Preview, Right Controls) */}
        <div className="grid grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Column: Live Focal Preview (5 Cols) */}
          <div className={`col-span-5 p-6 border-r border-inherit flex flex-col justify-between ${panelBg}`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  LIVE OPTICAL PREVIEW
                </span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                  ZERO-STRETCH LOCK
                </span>
              </div>

              {/* Centered Preview Canvas */}
              <div className="relative border border-zinc-700 bg-black/50 p-2 flex items-center justify-center min-h-[260px] overflow-hidden">
                <div
                  className="relative overflow-hidden w-full transition-all border"
                  style={{
                    aspectRatio:
                      currentImage.aspectRatio === '4/3'
                        ? '4 / 3'
                        : currentImage.aspectRatio === '1/1'
                        ? '1 / 1'
                        : currentImage.aspectRatio === '3/4'
                        ? '3 / 4'
                        : currentImage.aspectRatio === '2/3'
                        ? '2 / 3'
                        : '16 / 9',
                    borderRadius: currentImage.borderRadius || 0,
                    borderColor: currentImage.border ? theme.accent : 'transparent',
                  }}
                >
                  <img
                    src={currentImage.url}
                    alt="Preview"
                    className="h-full w-full select-none transition-transform duration-100"
                    style={{
                      objectFit: currentImage.objectFit || 'cover',
                      objectPosition: `${currentImage.positionX ?? 50}% ${currentImage.positionY ?? 50}%`,
                      transform: `scale(${currentImage.scale ?? 1.0})`,
                      transformOrigin: `${currentImage.positionX ?? 50}% ${currentImage.positionY ?? 50}%`,
                      filter: currentImage.filter || 'none',
                    }}
                  />
                  {/* Focal Center Crosshair Marker */}
                  <div
                    className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                    style={{
                      left: `${currentImage.positionX ?? 50}%`,
                      top: `${currentImage.positionY ?? 50}%`,
                    }}
                  >
                    <div className="h-5 w-5 border border-emerald-400 rounded-full flex items-center justify-center bg-black/40">
                      <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Metrics Readout */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="border border-zinc-800 p-2 bg-black/30">
                  <span className="text-zinc-500 block text-[9px] uppercase">RATIO</span>
                  <span className="text-emerald-400 font-bold">{currentImage.aspectRatio?.toUpperCase() || '16:9'}</span>
                </div>
                <div className="border border-zinc-800 p-2 bg-black/30">
                  <span className="text-zinc-500 block text-[9px] uppercase">SCALE</span>
                  <span className="text-white font-bold">{Math.round((currentImage.scale ?? 1.0) * 100)}%</span>
                </div>
                <div className="border border-zinc-800 p-2 bg-black/30">
                  <span className="text-zinc-500 block text-[9px] uppercase">FOCAL X / Y</span>
                  <span className="text-white font-bold">{currentImage.positionX ?? 50}% / {currentImage.positionY ?? 50}%</span>
                </div>
                <div className="border border-zinc-800 p-2 bg-black/30">
                  <span className="text-zinc-500 block text-[9px] uppercase">FIT MODE</span>
                  <span className="text-white font-bold uppercase">{currentImage.objectFit || 'cover'}</span>
                </div>
              </div>
            </div>

            {/* Quick Reset Button */}
            <button
              onClick={() => {
                const reset = {
                  ...currentImage,
                  scale: 1.0,
                  positionX: 50,
                  positionY: 50,
                  objectFit: 'cover' as const,
                  aspectRatio: '16/9' as const,
                  filter: 'none',
                };
                setCurrentImage(reset);
                onSave(reset);
              }}
              className="mt-4 flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-400 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>RESET OPTICAL CROP</span>
            </button>
          </div>

          {/* Right Column: Workstation Controls (7 Cols) */}
          <div className="col-span-7 p-6 flex flex-col gap-6 overflow-y-auto">
            {/* 1. SOURCE SELECTOR */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block mb-2">
                1. IMAGE SOURCE
              </label>
              <div className="flex border border-zinc-700 mb-3 text-xs font-mono">
                <button
                  onClick={() => setActiveSourceTab('presets')}
                  className={`flex-1 py-1.5 text-center transition-colors ${
                    activeSourceTab === 'presets' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  CURATED PRESETS
                </button>
                <button
                  onClick={() => setActiveSourceTab('upload')}
                  className={`flex-1 py-1.5 text-center transition-colors border-x border-zinc-700 ${
                    activeSourceTab === 'upload' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  UPLOAD FILE
                </button>
                <button
                  onClick={() => setActiveSourceTab('url')}
                  className={`flex-1 py-1.5 text-center transition-colors ${
                    activeSourceTab === 'url' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  PASTE URL
                </button>
              </div>

              {activeSourceTab === 'presets' && (
                <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-1">
                  {CURATED_SLIDE_PHOTOS.map((photo) => (
                    <button
                      key={photo.id}
                      onClick={() => updateProp('url', photo.url)}
                      className={`relative border overflow-hidden text-left group transition-all ${
                        currentImage.url === photo.url ? 'ring-2 ring-emerald-400 border-emerald-400' : 'border-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      <img src={photo.url} alt={photo.label} className="h-14 w-full object-cover" />
                      <div className="p-1 bg-black/75 text-[9px] font-mono truncate text-zinc-300">
                        {photo.label}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activeSourceTab === 'upload' && (
                <div className="border-2 border-dashed border-zinc-700 hover:border-emerald-400 p-6 flex flex-col items-center justify-center transition-all bg-black/20">
                  <Upload className="h-8 w-8 text-emerald-400 mb-2" />
                  <p className="text-xs font-mono text-zinc-300 mb-2">Upload any image file from your device</p>
                  <label className="cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs px-4 py-2 uppercase tracking-wider transition-all">
                    Choose Local Image
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500 mt-2">Supports PNG, JPG, WEBP, SVG</span>
                </div>
              )}

              {activeSourceTab === 'url' && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 bg-black/40 border border-zinc-700 px-3 py-2 text-xs font-mono text-white outline-none focus:border-emerald-400"
                  />
                  <button
                    onClick={handleApplyUrl}
                    className="border border-emerald-500 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black px-4 py-2 text-xs font-mono font-bold transition-all"
                  >
                    APPLY
                  </button>
                </div>
              )}
            </div>

            {/* 2. ASPECT RATIO (ANTI-STRETCH LOCK) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  2. ASPECT RATIO (STRICT ANTI-STRETCH)
                </label>
                <span className="text-[10px] font-mono text-zinc-500">Geometry locked</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {aspectRatios.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => updateProp('aspectRatio', r.id)}
                    className={`py-2 px-3 border text-xs font-mono text-left transition-all ${
                      currentImage.aspectRatio === r.id
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold">{r.id?.toUpperCase()}</div>
                    <div className="text-[9px] text-zinc-500">{r.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. ZOOM / SCALE SLIDER */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                  <ZoomIn className="h-3.5 w-3.5 text-emerald-400" />
                  3. OPTICAL ZOOM / SCALE
                </label>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {Math.round((currentImage.scale ?? 1.0) * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="250"
                step="5"
                value={Math.round((currentImage.scale ?? 1.0) * 100)}
                onChange={(e) => updateProp('scale', parseInt(e.target.value, 10) / 100)}
                className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-zinc-800"
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-1">
                <span>100% (Default)</span>
                <span>175% (Medium Zoom)</span>
                <span>250% (Max Close-Up)</span>
              </div>
            </div>

            {/* 4. FOCAL POSITION & ALIGNMENT */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                  <Move className="h-3.5 w-3.5 text-emerald-400" />
                  4. FOCAL POINT & CROP ANCHOR
                </label>
                <span className="text-[10px] font-mono text-zinc-500">9-Point Pan Grid</span>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center">
                {/* 9-Point Grid */}
                <div className="col-span-4 grid grid-cols-3 gap-1.5 p-2 border border-zinc-800 bg-black/40">
                  {focalPresets.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const next = { ...currentImage, positionX: f.x, positionY: f.y };
                        setCurrentImage(next);
                        onSave(next);
                      }}
                      className={`h-8 border text-[10px] font-mono flex items-center justify-center font-bold transition-all ${
                        currentImage.positionX === f.x && currentImage.positionY === f.y
                          ? 'border-emerald-400 bg-emerald-500 text-black'
                          : 'border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white'
                      }`}
                      title={`Focal point: ${f.label}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Fine sliders */}
                <div className="col-span-8 flex flex-col gap-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                      <span>Horizontal Pan (X)</span>
                      <span>{currentImage.positionX ?? 50}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentImage.positionX ?? 50}
                      onChange={(e) => updateProp('positionX', parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-zinc-800"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                      <span>Vertical Pan (Y)</span>
                      <span>{currentImage.positionY ?? 50}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentImage.positionY ?? 50}
                      onChange={(e) => updateProp('positionY', parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-zinc-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. OBJECT FIT & FRAME STYLING */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block mb-2">
                  FIT MODE
                </label>
                <div className="flex border border-zinc-700 text-xs font-mono">
                  <button
                    onClick={() => updateProp('objectFit', 'cover')}
                    className={`flex-1 py-2 text-center transition-colors ${
                      currentImage.objectFit === 'cover' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Cover (Fill)
                  </button>
                  <button
                    onClick={() => updateProp('objectFit', 'contain')}
                    className={`flex-1 py-2 text-center transition-colors border-l border-zinc-700 ${
                      currentImage.objectFit === 'contain' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Contain (Full)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block mb-2">
                  CORNER RADIUS
                </label>
                <div className="flex border border-zinc-700 text-xs font-mono">
                  {[0, 8, 16].map((rad) => (
                    <button
                      key={rad}
                      onClick={() => updateProp('borderRadius', rad)}
                      className={`flex-1 py-2 text-center transition-colors ${
                        (currentImage.borderRadius ?? 0) === rad
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                          : 'text-zinc-400 hover:text-white'
                      } ${rad > 0 ? 'border-l border-zinc-700' : ''}`}
                    >
                      {rad === 0 ? '0px Sharp' : `${rad}px`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. OPTICAL FILTER & CAPTION */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block mb-2">
                FILTER PRESET
              </label>
              <div className="grid grid-cols-4 gap-2">
                {filterPresets.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => updateProp('filter', f.value)}
                    className={`py-1.5 px-2 border text-[11px] font-mono text-center transition-all ${
                      (currentImage.filter || 'none') === f.value
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t px-6 py-4 border-inherit">
          <span className="text-[11px] font-mono text-zinc-500">
            Changes are saved live to the active slide.
          </span>
          <button
            onClick={() => {
              onSave(currentImage);
              onClose();
            }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg"
          >
            <Check className="h-4 w-4" />
            <span>APPLY & CLOSE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
