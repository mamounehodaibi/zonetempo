"use client";

import React, { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const images = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_238e124ee-1772513435026.png",
  alt: "The Dark Side of the Moon album cover front – iconic prism and light spectrum design"
},
{
  src: "https://images.unsplash.com/photo-1637231065247-016aed55c648",
  alt: "Vinyl record out of sleeve showing the black grooved disc"
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1944d7e82-1772153460370.png",
  alt: "Album back cover with track listing in warm tones"
},
{
  src: "https://images.unsplash.com/photo-1577553434929-16d79546b875",
  alt: "Close-up of vinyl record label showing pressing details"
}];


export default function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const prev = () => setActiveIndex((i) => (i - 1 + images?.length) % images?.length);
  const next = () => setActiveIndex((i) => (i + 1) % images?.length);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-cream-dark cursor-zoom-in transition-all duration-300 ${
        isZoomed ? "cursor-zoom-out" : ""}`
        }
        style={{ aspectRatio: "1/1" }}
        onClick={() => setIsZoomed(!isZoomed)}>
        
        <AppImage
          src={images?.[activeIndex]?.src}
          alt={images?.[activeIndex]?.alt}
          fill
          className={`object-cover transition-transform duration-500 ${
          isZoomed ? "scale-150" : "scale-100"}`
          }
          priority />
        

        {/* Vinyl spin overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
          onMouseEnter={() => setIsSpinning(true)}
          onMouseLeave={() => setIsSpinning(false)}>
          
          <div
            className={`w-32 h-32 rounded-full border-4 border-cream/40 ${
            isSpinning ? "vinyl-spin" : ""}`
            } />
          
        </div>

        {/* Nav arrows */}
        <button
          onClick={(e) => {e?.stopPropagation();prev();}}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center hover:bg-cream transition-all shadow-sm"
          aria-label="Previous image">
          
          <Icon name="ChevronLeftIcon" size={18} className="text-ink" />
        </button>
        <button
          onClick={(e) => {e?.stopPropagation();next();}}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center hover:bg-cream transition-all shadow-sm"
          aria-label="Next image">
          
          <Icon name="ChevronRightIcon" size={18} className="text-ink" />
        </button>

        {/* Image count */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-ink/60 backdrop-blur-sm rounded-full">
          <span className="text-cream/80 text-xs font-mono">
            {activeIndex + 1} / {images?.length}
          </span>
        </div>

        {/* Zoom hint */}
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center">
            <Icon name="MagnifyingGlassPlusIcon" size={14} className="text-ink/60" />
          </div>
        </div>
      </div>
      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images?.map((img, i) =>
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 ${
          i === activeIndex ?
          "ring-2 ring-orange ring-offset-2 ring-offset-cream" : "opacity-60 hover:opacity-100"}`
          }>
          
            <AppImage
            src={img?.src}
            alt={`Thumbnail ${i + 1}`}
            fill
            className="object-cover" />
          
          </button>
        )}
      </div>
    </div>);

}