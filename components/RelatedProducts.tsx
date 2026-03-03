"use client";

import React, { useRef } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const related = [
{
  id: "r1",
  title: "Wish You Were Here",
  artist: "Pink Floyd",
  year: "1975",
  genre: "Progressive Rock",
  price: 52.99,
  condition: "Near Mint",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_119511f14-1772513438424.png",
  alt: "Wish You Were Here album cover with warm orange tones",
  rating: 4.8
},
{
  id: "r2",
  title: "Animals",
  artist: "Pink Floyd",
  year: "1977",
  genre: "Progressive Rock",
  price: 48.99,
  condition: "Very Good Plus",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b420d3e9-1772513414531.png",
  alt: "Animals album cover with the iconic Battersea Power Station imagery",
  rating: 4.7
},
{
  id: "r3",
  title: "OK Computer",
  artist: "Radiohead",
  year: "1997",
  genre: "Alt Rock",
  price: 38.99,
  condition: "Mint",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1133064d9-1772513414806.png",
  alt: "OK Computer album with electronic and alternative rock aesthetic",
  rating: 4.7
},
{
  id: "r4",
  title: "Led Zeppelin IV",
  artist: "Led Zeppelin",
  year: "1971",
  genre: "Hard Rock",
  price: 47.99,
  condition: "Near Mint",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15e413b2a-1772513416378.png",
  alt: "Led Zeppelin IV album with mystical and dramatic artwork",
  rating: 4.8
},
{
  id: "r5",
  title: "Blue Train",
  artist: "John Coltrane",
  year: "1957",
  genre: "Jazz",
  price: 39.99,
  condition: "Mint",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14ebed19c-1772513422946.png",
  alt: "Blue Train jazz album with cool blue classic photography",
  rating: 4.8
}];


export default function RelatedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-16 pt-10 border-t border-ink/8">
      <div className="flex items-center justify-between mb-7">
        <div>
          <span className="section-label block mb-1">You Might Also Like</span>
          <h2 className="font-display font-medium text-ink text-2xl">
            Related Records
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center hover:border-orange hover:text-orange transition-all"
            aria-label="Scroll left">
            
            <Icon name="ChevronLeftIcon" size={16} className="text-ink/50" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center hover:border-orange hover:text-orange transition-all"
            aria-label="Scroll right">
            
            <Icon name="ChevronRightIcon" size={16} className="text-ink/50" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-x-smooth pb-2">
        
        {related.map((item) =>
        <Link
          key={item.id}
          href="/product-details"
          className="group flex-shrink-0 w-52 bg-cream rounded-2xl overflow-hidden product-card border border-ink/5 hover:border-ink/10">
          
            <div className="relative aspect-square overflow-hidden bg-cream-dark">
              <AppImage
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105" />
            
            </div>
            <div className="p-3.5">
              <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-0.5">
                {item.genre} · {item.year}
              </p>
              <h3 className="font-display font-medium text-ink text-sm leading-tight group-hover:text-orange transition-colors mb-0.5">
                {item.title}
              </h3>
              <p className="text-xs text-ink/50 mb-2.5">{item.artist}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-ink text-sm">
                  ${item.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  <Icon name="StarIcon" size={11} variant="solid" className="text-amber" />
                  <span className="text-[10px] font-mono text-ink/50">{item.rating}</span>
                </div>
              </div>
              <p className="text-[10px] font-mono text-muted mt-1">{item.condition}</p>
            </div>
          </Link>
        )}
      </div>
    </section>);

}