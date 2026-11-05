"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X, Image as ImageIcon } from "lucide-react";

interface ImageCarouselProps {
  coverImage: string;
  gallery?: string[];
  title?: string;
}

export default function ImageCarousel({ coverImage, gallery = [], title = "Project Preview" }: ImageCarouselProps) {
  // Combine coverImage with gallery if not already included
  const allImages = React.useMemo(() => {
    const list = [coverImage];
    if (gallery && gallery.length > 0) {
      gallery.forEach((img) => {
        if (img && !list.includes(img)) {
          list.push(img);
        }
      });
    }
    return list.filter(Boolean);
  }, [coverImage, gallery]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  if (allImages.length === 0) return null;

  return (
    <div className="relative my-8 select-none">
      {/* Main Carousel Display Box */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-2xl group">
        <img
          src={allImages[currentIndex]}
          alt={`${title} slide ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 ease-out"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-md">
            <ImageIcon className="w-3.5 h-3.5 text-zinc-300" />
            <span>
              {currentIndex + 1} / {allImages.length} {allImages.length > 1 ? "Screenshots" : "Cover"}
            </span>
          </div>

          <button
            onClick={() => setLightboxOpen(true)}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-md transition-transform hover:scale-110 cursor-pointer"
            title="Perbesar Tampilan"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Arrows (Only shown if more than 1 image) */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-xl backdrop-blur-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 z-20 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 -ml-0.5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-xl backdrop-blur-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 z-20 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 -mr-0.5" />
            </button>

            {/* Bottom Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? "w-6 bg-white shadow-xs" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Ke slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Bar (Only shown if multiple images) */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 mt-3.5 overflow-x-auto pb-2 scrollbar-thin">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? "border-zinc-950 scale-105 shadow-xs ring-2 ring-zinc-900/30"
                  : "border-zinc-200 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center">
            <img
              src={allImages[currentIndex]}
              alt="Fullscreen preview"
              className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </div>

          <div className="mt-4 text-xs font-semibold text-slate-400">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
