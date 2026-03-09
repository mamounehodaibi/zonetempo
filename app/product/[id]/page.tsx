"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase.from("products").select("*").eq("id", params.id).single();
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart({
      product_id: product.id,
      title: product.title,
      artist: product.artist,
      price: product.price,
      image: product.image_url || "",
      condition: "Mint",
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <p className="text-muted">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center py-24">
            <h1 className="font-display text-3xl font-medium text-ink mb-4">Product not found</h1>
            <Link href="/shop" className="px-8 py-3 bg-orange text-white rounded-full font-medium hover:bg-orange-light transition-colors">Back to Shop</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-orange transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-ink">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-cream-dark">
              {product.image_url ? (
                <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-ink flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-cream/20" />
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <span className="section-label mb-2">{product.genre} · {product.year}</span>
              <h1 className="font-display font-medium text-ink text-4xl md:text-5xl leading-tight mb-2">{product.title}</h1>
              <p className="text-muted text-xl mb-6">{product.artist}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className={`text-lg ${star <= Math.round(product.rating) ? "text-amber" : "text-ink/20"}`}>★</span>
                  ))}
                </div>
                <span className="text-sm text-muted font-mono">{product.rating}</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="font-display text-4xl font-medium text-ink">${Number(product.price).toFixed(2)}</span>
                <span className="text-muted text-sm ml-2">USD · incl. tax</span>
              </div>

              {/* Stock */}
              <div className="mb-8">
                {product.stock > 5 ? (
                  <span className="text-green-600 text-sm font-medium">In stock — ships within 2 business days</span>
                ) : product.stock > 0 ? (
                  <span className="text-amber text-sm font-medium">Only {product.stock} left in stock</span>
                ) : (
                  <span className="text-red-500 text-sm font-medium">Out of stock</span>
                )}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3 border border-ink/15 rounded-full px-4 py-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-ink/60 hover:text-ink transition-colors">−</button>
                  <span className="w-6 text-center font-mono text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="text-ink/60 hover:text-ink transition-colors">+</button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-3 rounded-full font-semibold text-sm transition-all ${added ? "bg-green-500 text-white" : product.stock === 0 ? "bg-ink/10 text-ink/30 cursor-not-allowed" : "bg-orange text-white hover:bg-orange-light"}`}
                >
                  {added ? "Added to Cart!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>

              {/* Description */}
              {product.description && (
                <div className="border-t border-ink/10 pt-6">
                  <h3 className="font-medium text-ink mb-2">About this record</h3>
                  <p className="text-muted text-sm leading-relaxed">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}