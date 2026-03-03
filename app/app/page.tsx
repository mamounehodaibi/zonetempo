import React from "react";
import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TickerBanner from "@/components/TickerBanner";
import FeaturedSection from "@/components/FeaturedSection";
import GenreSection from "@/components/GenreSection";
import ProductTabs from "@/components/ProductTabs";
import ReviewsNewsletter from "@/components/ReviewsNewsletter";
export const metadata: Metadata = {
  title: "Zonetempo – Feel the Sound. Spin the Moment.",
  description:
    "Discover over 4,200 curated vinyl records — rare pressings, new releases, and timeless classics. Premium vinyl delivered to your door.",
  keywords: "vinyl records, record store, buy vinyl, rare records, album collection",
  openGraph: {
    title: "Zonetempo – Premium Vinyl Records",
    description: "Curated vinyl for those who believe music sounds better on wax.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <HeroSection />
        <TickerBanner />
        <FeaturedSection />
        <GenreSection />
        <ProductTabs />
        <ReviewsNewsletter />
      </main>
      <Footer />
    </div>
  );
}