"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

export interface Product {
  id: string;
  title: string;
  artist: string;
  year: string;
  genre: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  condition: string;
  copies: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inCart) {
      await addToCart({
        product_id: product.id,
        title: product.title,
        artist: product.artist,
        price: product.price,
        image: product.image,
        condition: product.condition,
        quantity: 1,
      });
      setInCart(true);
      setTimeout(() => setInCart(false), 2500);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlisted(!wishlisted);
  };

  const stockStatus =
    product.copies === 0
      ? "sold-out"
      : product.copies <= 3
      ? "low" :"available";

  if (viewMode === "list") {
    return (
      <Link
        href="/product-details"
        className="group flex gap-4 p-4 bg-cream rounded-2xl hover:shadow-card transition-all duration-300 border border-ink/5 hover:border-ink/10"
      >
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
          <AppImage
            src={product.image}
            alt={product.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-medium text-ink text-base leading-tight truncate group-hover:text-orange transition-colors">
                {product.title}
              </h3>
              <p className="text-sm text-ink/55 truncate">{product.artist}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-mono font-semibold text-ink">${product.price.toFixed(2)}</p>
              {product.originalPrice && (
                <p className="text-xs font-mono text-muted line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
              {product.genre}
            </span>
            <span className="text-muted/40">·</span>
            <span className="text-[10px] font-mono text-muted">{product.year}</span>
            <span className="text-muted/40">·</span>
            <span className="text-[10px] font-mono text-muted">{product.condition}</span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <Icon name="StarIcon" size={12} variant="solid" className="text-amber" />
              <span className="text-xs font-mono text-ink/50">{product.rating} ({product.reviewCount})</span>
            </div>
            <div className="flex items-center gap-2">
              {stockStatus === "low" && (
                <span className="badge-low-stock">Only {product.copies} left</span>
              )}
              {stockStatus === "sold-out" && (
                <span className="badge-sold-out">Sold Out</span>
              )}
              <button onClick={handleWishlist} className="p-1.5 rounded-full hover:bg-cream-dark transition-colors">
                <Icon name="HeartIcon" size={14} variant={wishlisted ? "solid" : "outline"} className={wishlisted ? "text-orange" : "text-ink/40"} />
              </button>
              <button
                onClick={handleCart}
                disabled={stockStatus === "sold-out"}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  inCart
                    ? "bg-green-500 text-white"
                    : stockStatus === "sold-out" ?"bg-ink/10 text-ink/30 cursor-not-allowed" :"bg-ink text-cream hover:bg-orange"
                }`}
              >
                {inCart ? "✓ Added" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/product-details"
      className="group block bg-cream rounded-2xl overflow-hidden product-card border border-ink/5 hover:border-ink/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-cream-dark">
        <AppImage
          src={product.image}
          alt={product.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <span className="badge-new">New</span>}
          {product.isSale && <span className="badge-new" style={{ background: "#E8A838" }}>Sale</span>}
          {stockStatus === "low" && !product.isNew && (
            <span className="badge-low-stock">Low Stock</span>
          )}
          {stockStatus === "sold-out" && (
            <span className="badge-sold-out">Sold Out</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 ${
            isHovered || wishlisted ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Add to wishlist"
        >
          <Icon
            name="HeartIcon"
            size={14}
            variant={wishlisted ? "solid" : "outline"}
            className={wishlisted ? "text-orange" : "text-ink/60"}
          />
        </button>

        {/* Add to cart */}
        <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <button
            onClick={handleCart}
            disabled={stockStatus === "sold-out"}
            className={`w-full py-2.5 text-xs font-semibold font-mono uppercase tracking-wider rounded-xl transition-all duration-200 ${
              inCart
                ? "bg-green-500 text-white"
                : stockStatus === "sold-out" ?"bg-cream/50 text-ink/30 cursor-not-allowed" :"bg-cream text-ink hover:bg-orange hover:text-white"
            }`}
          >
            {inCart ? "✓ Added to Cart" : stockStatus === "sold-out" ? "Sold Out" : "+ Add to Cart"}
          </button>
        </div>

        {/* Vinyl spin overlay */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-30" : "opacity-0"}`}>
          <div className="w-24 h-24 rounded-full border-4 border-cream/60 vinyl-spin" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-[10px] font-mono text-muted uppercase tracking-wider">
            {product.genre} · {product.year}
          </p>
          <span className="text-[10px] font-mono text-muted/70 flex-shrink-0">
            {product.condition}
          </span>
        </div>
        <h3 className="font-display font-medium text-ink text-base leading-tight group-hover:text-orange transition-colors mb-0.5">
          {product.title}
        </h3>
        <p className="text-sm text-ink/55 mb-3">{product.artist}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono font-semibold text-ink">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-muted line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Icon name="StarIcon" size={12} variant="solid" className="text-amber" />
            <span className="text-xs font-mono text-ink/50">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}