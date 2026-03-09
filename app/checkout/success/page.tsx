"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-lg mx-auto px-4 text-center py-24">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✓</span>
          </div>
          <h1 className="font-display text-4xl font-medium text-ink mb-4">Order Confirmed!</h1>
          <p className="text-muted text-lg mb-2">Thank you for your purchase.</p>
          <p className="text-muted text-sm mb-10">You will receive a confirmation email shortly.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account" className="px-8 py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors">
              View My Orders
            </Link>
            <Link href="/shop" className="px-8 py-3 border border-ink/20 rounded-full font-medium hover:border-orange hover:text-orange transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}