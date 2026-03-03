"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface CartItem {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  quantity: number;
  condition: string;
}

const MOCK_CART: CartItem[] = [
  {
    id: "p1",
    title: "Kind of Blue",
    artist: "Miles Davis",
    price: 42.99,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff35a7ca-1772478161065.png",
    quantity: 1,
    condition: "Near Mint",
  },
  {
    id: "p5",
    title: "Abbey Road",
    artist: "The Beatles",
    price: 49.99,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d23940e0-1770043784754.png",
    quantity: 1,
    condition: "Mint",
  },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(MOCK_CART);

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return removeItem(id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 75 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-medium text-ink mb-8">Your Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted text-lg mb-6">Your cart is empty.</p>
              <Link href="/shop" className="px-8 py-3 bg-orange text-white rounded-full font-medium hover:bg-orange-light transition-colors">
                Browse Records
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
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
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:border-orange hover:text-orange transition-colors">−</button>
                        <span className="w-6 text-center text-sm font-mono">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:border-orange hover:text-orange transition-colors">+</button>
                        <button onClick={() => removeItem(item.id)} className="ml-2 text-muted hover:text-red-500 transition-colors text-sm">✕</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-card h-fit sticky top-24">
                <h2 className="font-display font-medium text-ink text-xl mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-ink/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-ink/70">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted">Add ${(75 - subtotal).toFixed(2)} more for free shipping</p>
                  )}
                  <div className="border-t border-ink/10 pt-3 flex justify-between font-semibold text-ink text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors">
                  Proceed to Checkout
                </button>
                <Link href="/shop" className="block text-center mt-3 text-sm text-muted hover:text-orange transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}