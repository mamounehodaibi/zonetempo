"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const vinylRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1636387502586-bfa491db7ae6"
          alt="Vintage vinyl record store with warm amber lighting and rows of records"
          fill
          className="object-cover"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </div>
      {/* Grain overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`
      }} />
      
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left: Text */}
          <div className="lg:col-span-7">
            <div
              className={`mb-6 flex items-center gap-3 transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
              }>
              
              <span className="h-px w-10 bg-orange" />
              <span
                className="text-orange text-xs font-mono font-semibold uppercase tracking-widest">
                
                Premium Vinyl Records
              </span>
            </div>

            <h1
              className={`font-display font-medium text-cream leading-[1.05] mb-6 transition-all duration-700 delay-100 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`
              }
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
              
              Feel the Sound.{" "}
              <span className="italic text-amber">Spin</span>
              <br />
              the Moment.
            </h1>

            <p
              className={`text-cream/60 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-10 transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
              }>
              
              Over 4,200 curated vinyl records — from rare first pressings to
              modern classics. Discover your next obsession.
            </p>

            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
              }>
              
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-orange hover:bg-orange-light text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-warm hover:shadow-warm-lg">
                
                Browse Catalog
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-cream/25 hover:border-cream/50 text-cream text-sm font-medium rounded-full transition-all duration-200">
                
                <Icon name="FireIcon" size={16} className="text-amber" />
                New Arrivals
              </Link>
            </div>

            {/* Stats row */}
            <div
              className={`flex flex-wrap gap-6 mt-12 pt-8 border-t border-cream/10 transition-all duration-700 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
              }>
              
              {[
              { value: "4,200+", label: "Records" },
              { value: "320+", label: "Artists" },
              { value: "18", label: "Genres" },
              { value: "9.4★", label: "Avg Rating" }]?.
              map((stat) =>
              <div key={stat?.label}>
                  <div className="text-cream font-display font-medium text-2xl leading-none mb-1">
                    {stat?.value}
                  </div>
                  <div className="text-cream/40 text-xs font-mono uppercase tracking-wider">
                    {stat?.label}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Vinyl + floating card */}
          <div
            className={`lg:col-span-5 flex flex-col items-center gap-5 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`
            }>
            
            {/* Vinyl Record Visual */}
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-orange/20 blur-3xl scale-75 pointer-events-none" />

              {/* Record */}
              <div
                ref={vinylRef}
                className={`relative w-52 h-52 md:w-64 md:h-64 rounded-full cursor-pointer select-none ${
                isSpinning ? "vinyl-spin" : ""}`
                }
                onClick={() => setIsSpinning(!isSpinning)}
                title="Click to pause/play">
                
                {/* Outer vinyl */}
                <div className="absolute inset-0 rounded-full vinyl-grooves shadow-[0_0_60px_rgba(0,0,0,0.6)]" />
                {/* Album art center */}
                <div className="absolute inset-[18%] rounded-full overflow-hidden border-[3px] border-ink/80">
                  <AppImage
                    src="https://images.unsplash.com/photo-1681148773098-1460911e25a4"
                    alt="Featured album cover art with colorful abstract design"
                    fill
                    className="object-cover" />
                  
                </div>
                {/* Center spindle */}
                <div className="absolute inset-[46%] rounded-full bg-cream/80 z-10" />
                {/* Shine */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Play indicator */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-ink/80 backdrop-blur-sm rounded-full border border-cream/10">
                <div className={`w-1.5 h-1.5 rounded-full ${isSpinning ? "bg-green-400 animate-pulse" : "bg-cream/40"}`} />
                <span className="text-cream/60 text-[10px] font-mono uppercase tracking-wider">
                  {isSpinning ? "Playing" : "Paused"}
                </span>
              </div>
            </div>

            {/* Now playing glass card */}
            <div className="glass-dark rounded-2xl p-4 w-full max-w-xs border border-cream/8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_15ccfc69c-1772513433699.png"
                    alt="Dark Side of the Moon album cover"
                    width={48}
                    height={48}
                    className="object-cover" />
                  
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-cream text-sm font-medium truncate">
                    The Dark Side of the Moon
                  </p>
                  <p className="text-cream/50 text-xs truncate">
                    Pink Floyd · 1973 · Classic Rock
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-orange font-mono font-semibold text-sm">$34.99</p>
                  <p className="text-cream/40 text-[10px] font-mono">In stock</p>
                </div>
              </div>
              {/* Waveform */}
              <div className="mt-3 flex items-end gap-0.5 h-5">
                {Array.from({ length: 28 })?.map((_, i) =>
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-all duration-150 ${
                  isSpinning ? "bg-orange/60" : "bg-cream/20"}`
                  }
                  style={{
                    height: `${20 + Math.sin(i * 0.8) * 60}%`,
                    animationDelay: `${i * 0.05}s`
                  }} />

                )}
              </div>
              <Link
                href="/product-details"
                className="mt-3 flex items-center justify-center gap-2 w-full py-2 bg-orange/90 hover:bg-orange text-white text-xs font-semibold rounded-xl transition-colors">
                
                View Record
                <Icon name="ArrowRightIcon" size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-cream/30 text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-cream/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
