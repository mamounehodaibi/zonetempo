"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";

const genres = [
{
  name: "Jazz",
  count: 312,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_166ea2146-1772493522227.png",
  alt: "Jazz musician playing trumpet in moody blue lighting",
  color: "#1A3A5C"
},
{
  name: "Classic Rock",
  count: 489,
  image: "https://images.unsplash.com/photo-1583274940339-7d2d29dda166",
  alt: "Electric guitar with stage lights and rock concert atmosphere",
  color: "#5C1A1A"
},
{
  name: "Soul & R&B",
  count: 227,
  image: "https://images.unsplash.com/photo-1722777875673-14dd544fc3a2",
  alt: "Soul singer performing on stage with warm amber lighting",
  color: "#3D2200"
},
{
  name: "Electronic",
  count: 185,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc7cfcdb-1772153003790.png",
  alt: "Electronic music setup with synthesizers and neon lights",
  color: "#0A2A1A"
},
{
  name: "Folk",
  count: 143,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e82dfb58-1765209483088.png",
  alt: "Acoustic guitar and folk music atmosphere in warm tones",
  color: "#2A1A00"
},
{
  name: "Hip-Hop",
  count: 201,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1509771aa-1772307133189.png",
  alt: "Hip-hop culture imagery with urban street art background",
  color: "#1A0A2A"
}];


export default function GenreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream-dark overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-2">Explore by Sound</span>
          <h2 className="font-display font-medium text-ink text-4xl md:text-5xl leading-tight">
            Browse Genres
          </h2>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-x-smooth pb-2 md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible">
          
          {genres?.map((genre, i) =>
          <Link
            key={genre?.name}
            href="/shop"
            className={`group flex-shrink-0 w-40 md:w-auto relative overflow-hidden rounded-2xl aspect-[3/4] transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
            }
            style={{ transitionDelay: `${i * 80}ms` }}>
            
              <AppImage
              src={genre?.image}
              alt={genre?.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110" />
            
              {/* Overlay */}
              <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `linear-gradient(to top, ${genre?.color}EE 0%, ${genre?.color}88 50%, transparent 100%)`
              }} />
            
              <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/10 transition-colors duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display font-medium text-cream text-base leading-tight mb-0.5">
                  {genre?.name}
                </h3>
                <p className="text-cream/60 text-xs font-mono">
                  {genre?.count} records
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>);

}