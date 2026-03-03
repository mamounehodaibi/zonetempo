"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const featuredVinyl = [
{
  id: "1",
  title: "Kind of Blue",
  artist: "Miles Davis",
  year: "1959",
  genre: "Jazz",
  price: 42.99,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff35a7ca-1772478161065.png",
  alt: "Kind of Blue album cover featuring blue tones and jazz imagery",
  tag: "Iconic",
  copies: 3
},
{
  id: "2",
  title: "Rumours",
  artist: "Fleetwood Mac",
  year: "1977",
  genre: "Classic Rock",
  price: 38.50,
  image: "https://images.unsplash.com/photo-1602485476993-a4e924042e95",
  alt: "Rumours album cover with warm photography of the band",
  tag: "Best Seller",
  copies: 7
},
{
  id: "3",
  title: "Thriller",
  artist: "Michael Jackson",
  year: "1982",
  genre: "Pop/R&B",
  price: 44.99,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c22520a3-1772513415212.png",
  alt: "Thriller album with dramatic lighting and bold imagery",
  tag: "Limited",
  copies: 2
},
{
  id: "4",
  title: "Blue",
  artist: "Joni Mitchell",
  year: "1971",
  genre: "Folk",
  price: 36.99,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cb394ad5-1772513417790.png",
  alt: "Blue album cover with soft blue tones and folk aesthetic",
  tag: "Rare Press",
  copies: 1
}];


function FeaturedCard({ vinyl, large = false }: {vinyl: typeof featuredVinyl[0];large?: boolean;}) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Link href="/product-details" className="group block relative overflow-hidden rounded-2xl bg-cream-dark product-card">
      <div className={`relative overflow-hidden ${large ? "aspect-[3/4]" : "aspect-square"}`}>
        <AppImage
          src={vinyl.image}
          alt={vinyl.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span className="badge-new">{vinyl.tag}</span>
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-cream hover:scale-110"
          onClick={(e) => {
            e.preventDefault();
            setWishlisted(!wishlisted);
          }}
          aria-label="Add to wishlist">
          
          <Icon
            name={wishlisted ? "HeartIcon" : "HeartIcon"}
            size={14}
            variant={wishlisted ? "solid" : "outline"}
            className={wishlisted ? "text-orange" : "text-ink/60"} />
          
        </button>

        {/* Add to Cart overlay */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleCart}
            className={`w-full py-2.5 text-xs font-semibold font-mono uppercase tracking-wider rounded-xl transition-all duration-200 ${
            addedToCart ?
            "bg-green-500 text-white" : "bg-cream text-ink hover:bg-orange hover:text-white"}`
            }>
            
            {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
          </button>
        </div>

        {/* Low stock */}
        {vinyl.copies <= 2 &&
        <div className="absolute bottom-3 left-3 group-hover:opacity-0 transition-opacity">
            <span className="badge-low-stock">Only {vinyl.copies} left</span>
          </div>
        }
      </div>

      <div className="p-4">
        <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">
          {vinyl.genre} · {vinyl.year}
        </p>
        <h3 className="font-display font-medium text-ink text-base leading-tight mb-0.5 group-hover:text-orange transition-colors">
          {vinyl.title}
        </h3>
        <p className="text-sm text-ink/60">{vinyl.artist}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-mono font-semibold text-ink text-sm">
            ${vinyl.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1 text-amber">
            <Icon name="StarIcon" size={12} variant="solid" />
            <span className="text-xs font-mono text-ink/50">4.8</span>
          </div>
        </div>
      </div>
    </Link>);

}

export default function FeaturedSection() {
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
        <div className={`flex items-end justify-between mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div>
            <span className="section-label block mb-2">Hand-Picked</span>
            <h2 className="font-display font-medium text-ink text-4xl md:text-5xl leading-tight">
              Featured Vinyl
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-orange hover:text-orange-light transition-colors link-underline">
            
            View All
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {/* Large card */}
          <div className={`col-span-2 lg:col-span-2 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <FeaturedCard vinyl={featuredVinyl[0]} large />
          </div>
          {/* Two stacked */}
          <div className="col-span-2 lg:col-span-1 grid grid-rows-2 gap-4 md:gap-5">
            <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <FeaturedCard vinyl={featuredVinyl[1]} />
            </div>
            <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <FeaturedCard vinyl={featuredVinyl[2]} />
            </div>
          </div>
          {/* Single */}
          <div className={`col-span-2 lg:col-span-1 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <FeaturedCard vinyl={featuredVinyl[3]} large />
          </div>
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 border border-ink/20 rounded-full text-sm font-medium text-ink hover:border-orange hover:text-orange transition-all">
            
            View All Records
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>);

}