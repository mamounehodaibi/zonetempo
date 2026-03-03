import React from "react";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShopClient from "../../components/ShopClient";
import RecentlyViewed from "../../components/RecentlyViewed";

export const metadata: Metadata = {
  title: "Shop Vinyl Records – Zonetempo",
  description:
    "Browse over 4,200 curated vinyl records. Filter by genre, artist, year, condition, and price. Free shipping on orders over $75.",
  keywords: "buy vinyl records, vinyl shop, record store online, jazz vinyl, classic rock vinyl",
  openGraph: {
    title: "Shop Vinyl Records – Zonetempo",
    description: "Browse 4,200+ curated vinyl records with advanced filters.",
    type: "website",
  },
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-cream-dark">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="bg-cream border-b border-ink/8">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="section-label block mb-2">The Full Catalog</span>
                <h1 className="font-display font-medium text-ink text-4xl md:text-5xl leading-tight">
                  Browse Records
                </h1>
                <p className="text-muted text-sm mt-2">
                  4,200+ records in stock — jazz, rock, soul, and everything in between.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  New arrivals weekly
                </span>
                <span className="text-ink/20">·</span>
                <span>Free shipping over $75</span>
              </div>
            </div>
          </div>
        </div>
        <ShopClient />
        <RecentlyViewed />
      </main>
      <Footer />
    </div>
  );
}