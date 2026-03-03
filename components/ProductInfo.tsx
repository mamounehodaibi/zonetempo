"use client";

import React, { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

const product = {
  id: "dsotm",
  title: "The Dark Side of the Moon",
  artist: "Pink Floyd",
  label: "Harvest Records",
  year: "1973",
  genre: "Progressive Rock",
  format: "12\" LP",
  speed: "33⅓ RPM",
  condition: "Near Mint",
  conditionNotes: "Sleeve shows minimal shelf wear. Vinyl plays with zero surface noise.",
  pressing: "2016 Remaster – 180g Vinyl",
  price: 58.99,
  originalPrice: null as number | null,
  copies: 4,
  sku: "ZT-DSOTM-2016",
  rating: 4.9,
  reviewCount: 312,
  tracks: [
    { side: "A", number: 1, title: "Speak to Me / Breathe", duration: "3:57" },
    { side: "A", number: 2, title: "On the Run", duration: "3:30" },
    { side: "A", number: 3, title: "Time", duration: "6:53" },
    { side: "A", number: 4, title: "The Great Gig in the Sky", duration: "4:44" },
    { side: "B", number: 5, title: "Money", duration: "6:22" },
    { side: "B", number: 6, title: "Us and Them", duration: "7:49" },
    { side: "B", number: 7, title: "Any Colour You Like", duration: "3:26" },
    { side: "B", number: 8, title: "Brain Damage", duration: "3:46" },
    { side: "B", number: 9, title: "Eclipse", duration: "2:03" },
  ],
};

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"tracks" | "details" | "shipping">("tracks");

  const handleAddToCart = () => {
    if (!inCart) {
      setInCart(true);
      setTimeout(() => setInCart(false), 3000);
    }
  };

  const stockStatus =
    product.copies === 0 ? "sold-out" : product.copies <= 3 ? "low" : "available";

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted font-mono">
        <Link href="/homepage" className="hover:text-orange transition-colors">Home</Link>
        <Icon name="ChevronRightIcon" size={12} />
        <Link href="/shop" className="hover:text-orange transition-colors">Shop</Link>
        <Icon name="ChevronRightIcon" size={12} />
        <Link href="/shop" className="hover:text-orange transition-colors">{product.genre}</Link>
        <Icon name="ChevronRightIcon" size={12} />
        <span className="text-ink/50 truncate">{product.title}</span>
      </nav>

      {/* Title area */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="section-label">{product.genre}</span>
          <span className="text-muted/40">·</span>
          <span className="text-xs font-mono text-muted">{product.year}</span>
          <span className="text-muted/40">·</span>
          <span className="badge-new">{product.pressing.split(" – ")[0]}</span>
        </div>
        <h1 className="font-display font-medium text-ink text-3xl md:text-4xl leading-tight mb-1">
          {product.title}
        </h1>
        <Link
          href="/shop"
          className="text-lg text-ink/60 hover:text-orange transition-colors font-display italic"
        >
          {product.artist}
        </Link>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon
              key={i}
              name="StarIcon"
              size={16}
              variant={i < Math.floor(product.rating) ? "solid" : "outline"}
              className={i < Math.floor(product.rating) ? "text-amber" : "text-ink/20"}
            />
          ))}
        </div>
        <span className="text-sm font-mono text-ink/60">
          {product.rating} ({product.reviewCount} reviews)
        </span>
        <span className="text-muted/30">·</span>
        <span className="text-xs font-mono text-muted">{product.sku}</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono font-bold text-ink text-3xl">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <span className="font-mono text-lg text-muted line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
        <span className="text-xs font-mono text-muted">USD · incl. tax</span>
      </div>

      {/* Condition */}
      <div className="p-4 bg-cream-dark rounded-2xl border border-ink/5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="CheckBadgeIcon" size={16} className="text-green-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-ink">{product.condition}</span>
              <span className="badge-new text-[10px]">Graded</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">{product.conditionNotes}</p>
          </div>
        </div>
      </div>

      {/* Stock indicator */}
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            stockStatus === "available" ?"bg-green-400"
              : stockStatus === "low" ?"bg-amber animate-pulse" :"bg-ink/20"
          }`}
        />
        <span className="text-sm font-mono text-ink/60">
          {stockStatus === "sold-out" ?"Out of stock"
            : stockStatus === "low"
            ? `Only ${product.copies} copies remaining`
            : "In stock — ships within 2 business days"}
        </span>
      </div>

      {/* Quantity + Add to Cart */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {/* Quantity */}
          <div className="flex items-center gap-0 border border-ink/15 rounded-xl overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-3 hover:bg-cream-dark transition-colors"
              aria-label="Decrease quantity"
            >
              <Icon name="MinusIcon" size={16} className="text-ink/60" />
            </button>
            <span className="w-12 text-center font-mono font-semibold text-ink text-sm">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.copies, q + 1))}
              className="px-3 py-3 hover:bg-cream-dark transition-colors"
              aria-label="Increase quantity"
            >
              <Icon name="PlusIcon" size={16} className="text-ink/60" />
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={stockStatus === "sold-out"}
            className={`flex-1 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              inCart
                ? "bg-green-500 text-white"
                : stockStatus === "sold-out" ?"bg-ink/10 text-ink/30 cursor-not-allowed" :"bg-orange text-white hover:bg-orange-light shadow-warm hover:shadow-warm-lg"
            }`}
          >
            <Icon name={inCart ? "CheckIcon" : "ShoppingBagIcon"} size={18} />
            {inCart ? "Added to Cart!" : stockStatus === "sold-out" ? "Sold Out" : "Add to Cart"}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className={`p-3.5 rounded-xl border transition-all duration-200 ${
              wishlisted
                ? "border-orange bg-orange/5 text-orange" :"border-ink/15 text-ink/50 hover:border-orange hover:text-orange"
            }`}
            aria-label="Add to wishlist"
          >
            <Icon name="HeartIcon" size={20} variant={wishlisted ? "solid" : "outline"} />
          </button>
        </div>

        {/* Payment ready note */}
        <p className="text-xs text-muted text-center font-mono">
          🔒 Secure checkout — Payment activation coming soon
        </p>
      </div>

      {/* Quick specs */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Format", value: product.format },
          { label: "Speed", value: product.speed },
          { label: "Label", value: product.label },
          { label: "Pressing", value: product.pressing.split(" – ")[0] },
        ].map((spec) => (
          <div key={spec.label} className="px-4 py-3 bg-cream-dark rounded-xl">
            <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-0.5">
              {spec.label}
            </p>
            <p className="text-sm font-medium text-ink">{spec.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-0 border-b border-ink/10 mb-5">
          {(["tracks", "details", "shipping"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium capitalize transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-orange text-orange" :"border-transparent text-ink/50 hover:text-ink"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {tab === "tracks" ? "Track Listing" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "tracks" && (
          <div className="space-y-0">
            {["A", "B"].map((side) => (
              <div key={side} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-ink text-cream flex items-center justify-center text-[10px] font-mono font-bold">
                    {side}
                  </div>
                  <span className="text-xs font-mono text-muted uppercase tracking-wider">Side {side}</span>
                </div>
                {product.tracks
                  .filter((t) => t.side === side)
                  .map((track, i) => (
                    <div
                      key={track.number}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-dark transition-colors group"
                    >
                      <span className="w-5 text-[10px] font-mono text-muted/60 text-right flex-shrink-0">
                        {track.number}
                      </span>
                      <Icon name="MusicalNoteIcon" size={14} className="text-muted/40 group-hover:text-orange transition-colors flex-shrink-0" />
                      <span className="flex-1 text-sm text-ink/80 group-hover:text-ink transition-colors">
                        {track.title}
                      </span>
                      <span className="text-xs font-mono text-muted">{track.duration}</span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === "details" && (
          <div className="space-y-3">
            {[
              { label: "Artist", value: product.artist },
              { label: "Album", value: product.title },
              { label: "Label", value: product.label },
              { label: "Year", value: product.year },
              { label: "Genre", value: product.genre },
              { label: "Format", value: product.format },
              { label: "Speed", value: product.speed },
              { label: "Pressing", value: product.pressing },
              { label: "Condition", value: product.condition },
              { label: "SKU", value: product.sku },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2.5 border-b border-ink/5">
                <span className="text-xs font-mono text-muted uppercase tracking-wider">{item.label}</span>
                <span className="text-sm text-ink font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-4">
            {[
              { icon: "TruckIcon", title: "Standard Shipping", desc: "3–5 business days · Free on orders over $75", detail: "$4.99 under $75" },
              { icon: "BoltIcon", title: "Express Shipping", desc: "1–2 business days", detail: "$12.99" },
              { icon: "ShieldCheckIcon", title: "Expert Packaging", desc: "Acid-free mailers, corner protectors, rigid mailers for all vinyl" },
              { icon: "ArrowPathIcon", title: "30-Day Returns", desc: "Hassle-free returns on all orders — condition guaranteed" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 bg-cream-dark rounded-xl">
                <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon as any} size={16} className="text-orange" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink mb-0.5">{item.title}</p>
                  <p className="text-xs text-muted">{item.desc}</p>
                  {item.detail && <p className="text-xs font-mono text-orange mt-0.5">{item.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}