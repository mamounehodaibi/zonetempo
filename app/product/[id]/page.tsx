"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";

interface Review {
  id: string;
  email: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<any>(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, [params.id]);

  const fetchProduct = async () => {
    const { data } = await supabase.from("products").select("*").eq("id", params.id).single();
    setProduct(data);
    setLoading(false);
  };

  const fetchReviews = async () => {
    const { data } = await supabase.from("reviews").select("*").eq("product_id", params.id).order("created_at", { ascending: false });
    if (data) setReviews(data);
  };

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

  const handleReviewSubmit = async () => {
    if (!reviewForm.comment) return;
    setReviewLoading(true);
    await supabase.from("reviews").insert({
      product_id: params.id,
      user_id: user?.id || null,
      email: user?.email || "Anonymous",
      rating: reviewForm.rating,
      comment: reviewForm.comment,
    });
    setReviewForm({ rating: 5, comment: "" });
    setReviewSubmitted(true);
    fetchReviews();
    setReviewLoading(false);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : product?.rating;

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
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
              <p className="text-muted text-xl mb-4">{product.artist}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className={`text-lg ${star <= Math.round(Number(avgRating)) ? "text-amber" : "text-ink/20"}`}>★</span>
                  ))}
                </div>
                <span className="text-sm text-muted font-mono">{avgRating} ({reviews.length} reviews)</span>
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
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-ink/60 hover:text-ink transition-colors">-</button>
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

          {/* Reviews Section */}
          <div className="border-t border-ink/10 pt-12">
            <h2 className="font-display font-medium text-ink text-3xl mb-8">Reviews {reviews.length > 0 && <span className="text-muted text-xl">({reviews.length})</span>}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Leave a review */}
              <div>
                <h3 className="font-medium text-ink text-lg mb-4">Leave a Review</h3>
                {reviewSubmitted && (
                  <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">Review submitted!</div>
                )}
                <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
                  {/* Star selector */}
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <button key={star} onClick={() => setReviewForm({ ...reviewForm, rating: star })} className={`text-2xl transition-colors ${star <= reviewForm.rating ? "text-amber" : "text-ink/20 hover:text-amber"}`}>★</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Your Review</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="What did you think of this record?"
                      rows={4}
                      className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink placeholder-muted outline-none focus:border-orange transition-colors text-sm resize-none"
                    />
                  </div>
                  <button
                    onClick={handleReviewSubmit}
                    disabled={reviewLoading || !reviewForm.comment}
                    className="w-full py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors disabled:opacity-60 text-sm"
                  >
                    {reviewLoading ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </div>

              {/* Reviews list */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-12 text-muted">
                    <p>No reviews yet. Be the first!</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-2xl shadow-card p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((star) => (
                            <span key={star} className={`text-sm ${star <= review.rating ? "text-amber" : "text-ink/20"}`}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-muted">{new Date(review.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      </div>
                      <p className="text-sm text-ink leading-relaxed">{review.comment}</p>
                      <p className="text-xs text-muted mt-2">{review.email}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}