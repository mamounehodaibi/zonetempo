"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const allProducts = {
  "New Arrivals": [
  { id: "na1", title: "Cowboy Carter", artist: "Beyoncé", year: "2024", genre: "Country/R&B", price: 39.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_100e0b3c0-1769553761441.png", alt: "Modern country R&B album with warm visual aesthetic", isNew: true, copies: 15 },
  { id: "na2", title: "GNX", artist: "Kendrick Lamar", year: "2024", genre: "Hip-Hop", price: 34.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b94f5aca-1772492453184.png", alt: "Hip hop album cover with bold urban imagery", isNew: true, copies: 8 },
  { id: "na3", title: "Short n\' Sweet", artist: "Sabrina Carpenter", year: "2024", genre: "Pop", price: 29.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_15eaa7d68-1772429829575.png", alt: "Pop album with pastel and vintage aesthetic", isNew: true, copies: 22 },
  { id: "na4", title: "Manning Fireworks", artist: "MJ Lenderman", year: "2024", genre: "Indie Rock", price: 27.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_19c44ee2b-1772513417317.png", alt: "Indie rock album with lo-fi grainy photography", isNew: true, copies: 5 },
  { id: "na5", title: "Imaginal Disk", artist: "Magdalena Bay", year: "2024", genre: "Synth-Pop", price: 31.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b8a4ab0-1766923715547.png", alt: "Synth-pop album with futuristic neon visual", isNew: true, copies: 11 },
  { id: "na6", title: "Chromakopia", artist: "Tyler, the Creator", year: "2024", genre: "Hip-Hop", price: 36.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c501a9a0-1769553761456.png", alt: "Creative hip-hop album with bold color palette", isNew: true, copies: 3 }],

  "Best Sellers": [
  { id: "bs1", title: "Abbey Road", artist: "The Beatles", year: "1969", genre: "Classic Rock", price: 49.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d23940e0-1770043784754.png", alt: "Abbey Road album with iconic crossing imagery", isNew: false, copies: 12 },
  { id: "bs2", title: "Purple Rain", artist: "Prince", year: "1984", genre: "Funk/Rock", price: 44.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_19b7848a5-1772462876600.png", alt: "Purple Rain album with dramatic purple tones", isNew: false, copies: 4 },
  { id: "bs3", title: "What\'s Going On", artist: "Marvin Gaye", year: "1971", genre: "Soul", price: 41.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2e32816-1772478161297.png", alt: "Soul music album with warm soulful imagery", isNew: false, copies: 9 },
  { id: "bs4", title: "OK Computer", artist: "Radiohead", year: "1997", genre: "Alt Rock", price: 38.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1133064d9-1772513414806.png", alt: "OK Computer album with electronic and alternative rock aesthetic", isNew: false, copies: 6 },
  { id: "bs5", title: "Led Zeppelin IV", artist: "Led Zeppelin", year: "1971", genre: "Hard Rock", price: 47.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1646781c2-1772513414828.png", alt: "Led Zeppelin IV album with mystical imagery", isNew: false, copies: 2 },
  { id: "bs6", title: "Songs in the Key of Life", artist: "Stevie Wonder", year: "1976", genre: "R&B/Soul", price: 52.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_141838e1a-1772513415434.png", alt: "Stevie Wonder classic album with soulful warm tones", isNew: false, copies: 7 }]

};

type Tab = keyof typeof allProducts;

function ProductMiniCard({ product }: {product: typeof allProducts["New Arrivals"][0];}) {
  const [inCart, setInCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <Link href="/product-details" className="group flex gap-3 p-3 rounded-xl hover:bg-cream-dark transition-colors">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        <AppImage
          src={product.image}
          alt={product.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110" />
        
        {product.isNew &&
        <div className="absolute top-1 left-1">
            <span className="badge-new text-[8px] px-1 py-0.5">New</span>
          </div>
        }
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-ink text-sm leading-tight truncate group-hover:text-orange transition-colors">
          {product.title}
        </h4>
        <p className="text-xs text-ink/50 truncate">{product.artist} · {product.year}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="font-mono font-semibold text-ink text-xs">${product.price}</span>
          {product.copies <= 3 &&
          <span className="badge-low-stock text-[8px] px-1 py-0.5">
              {product.copies} left
            </span>
          }
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <button
          onClick={(e) => {e.preventDefault();setWishlisted(!wishlisted);}}
          className="w-7 h-7 rounded-full bg-cream flex items-center justify-center hover:bg-orange hover:text-white transition-all"
          aria-label="Wishlist">
          
          <Icon name="HeartIcon" size={12} variant={wishlisted ? "solid" : "outline"} className={wishlisted ? "text-white" : "text-ink/40"} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setInCart(true);
            setTimeout(() => setInCart(false), 1500);
          }}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${inCart ? "bg-green-500" : "bg-cream hover:bg-orange"}`}
          aria-label="Add to cart">
          
          <Icon name={inCart ? "CheckIcon" : "PlusIcon"} size={12} className={inCart ? "text-white" : "text-ink/40 group-hover:text-white"} />
        </button>
      </div>
    </Link>);

}

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("New Arrivals");
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div>
            <span className="section-label block mb-2">Fresh & Beloved</span>
            <h2 className="font-display font-medium text-ink text-4xl md:text-5xl leading-tight">
              The Collection
            </h2>
          </div>
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-cream-dark rounded-full">
            {(Object.keys(allProducts) as Tab[]).map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab ?
              "bg-ink text-cream shadow-sm" :
              "text-ink/60 hover:text-ink"}`
              }
              style={{ fontFamily: "var(--font-body)" }}>
              
                {tab}
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-1 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
          {allProducts[activeTab].map((product, i) =>
          <div
            key={product.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}>
            
              <ProductMiniCard product={product} />
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-cream text-sm font-semibold rounded-full hover:bg-ink-soft transition-all duration-200">
            
            Explore Full Catalog
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>);

}