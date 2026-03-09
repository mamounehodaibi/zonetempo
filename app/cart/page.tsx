"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, loading } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [codLoading, setCodLoading] = useState(false);
  const [codSuccess, setCodSuccess] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 75 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleStripeCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const sessionId = localStorage.getItem("zonetempo_session") || "";
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, sessionId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Something went wrong. Please try again.");
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
    setCheckoutLoading(false);
  };

  const handleCOD = async () => {
    setCodLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setCodLoading(false);
    setCodSuccess(true);
  };

  if (codSuccess) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-lg mx-auto px-4 text-center py-24">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="font-display text-4xl font-medium text-ink mb-4">Order Placed!</h1>
            <p className="text-muted text-lg mb-2">Your cash on delivery order has been confirmed.</p>
            <p className="text-muted text-sm mb-10">You will pay when your records arrive.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/account" className="px-8 py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors">View My Orders</Link>
              <Link href="/shop" className="px-8 py-3 border border-ink/20 rounded-full font-medium hover:border-orange hover:text-orange transition-colors">Continue Shopping</Link>
            </div>
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
          <h1 className="font-display text-4xl font-medium text-ink mb-8">Your Cart</h1>
          {loading ? (
            <div className="text-center py-24 text-muted">Loading cart...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted text-lg mb-6">Your cart is empty.</p>
              <Link href="/shop" className="px-8 py-3 bg-orange text-white rounded-full font-medium hover:bg-orange-light transition-colors">Browse Records</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white rounded-2xl p-4 shadow-card">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-medium text-ink text-lg leading-tight">{item.title}</h3>
                      <p className="text-muted text-sm">{item.artist}</p>
                      <p className="text-xs font-mono text-muted mt-1">{item.condition}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <p className="font-semibold text-ink">${(item.price * item.quantity).toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:border-orange hover:text-orange transition-colors">-</button>
                        <span className="w-6 text-center text-sm font-mono">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:border-orange hover:text-orange transition-colors">+</button>
                        <button onClick={() => removeFromCart(item.id)} className="ml-2 text-muted hover:text-red-500 transition-colors text-sm">x</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-card h-fit sticky top-24">
                <h2 className="font-display font-medium text-ink text-xl mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-ink/70"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-ink/70"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                  {shipping > 0 && <p className="text-xs text-muted">Add ${(75 - subtotal).toFixed(2)} more for free shipping</p>}
                  <div className="border-t border-ink/10 pt-3 flex justify-between font-semibold text-ink text-base"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>

                <div className="space-y-3">
                  {/* Stripe */}
                  <button
                    onClick={handleStripeCheckout}
                    disabled={checkoutLoading}
                    className="w-full py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {checkoutLoading ? "Redirecting..." : "💳 Pay with Card"}
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-ink/10" />
                    <span className="text-xs text-muted">or</span>
                    <div className="flex-1 h-px bg-ink/10" />
                  </div>

                  {/* Cash on Delivery */}
                  <button
                    onClick={handleCOD}
                    disabled={codLoading}
                    className="w-full py-3 border-2 border-ink/20 text-ink rounded-full font-semibold hover:border-orange hover:text-orange transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {codLoading ? "Placing order..." : "💵 Cash on Delivery"}
                  </button>
                </div>

                <Link href="/shop" className="block text-center mt-4 text-sm text-muted hover:text-orange transition-colors">Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}