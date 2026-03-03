import React from "react";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductGallery from "../../components/ProductGallery";
import ProductInfo from "../../components/ProductInfo";
import ProductReviews from "../../components/ProductReviews";
import RelatedProducts from "../../components/RelatedProducts";

export const metadata: Metadata = {
  title: "The Dark Side of the Moon – Pink Floyd | Zonetempo",
  description:
    "Pink Floyd – The Dark Side of the Moon (1973). 2016 Remaster on 180g vinyl. Near Mint condition. One of the best-sounding pressings available. $58.99.",
  keywords: "Pink Floyd vinyl, Dark Side of the Moon record, buy vinyl online, 180g vinyl, classic rock records",
  openGraph: {
    title: "The Dark Side of the Moon – Pink Floyd | Zonetempo",
    description: "2016 Remaster · 180g Vinyl · Near Mint · $58.99",
    type: "website",
  },
};

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Main product layout */}
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 mb-8">
            {/* Gallery */}
            <div>
              <ProductGallery />
            </div>

            {/* Info */}
            <div>
              <ProductInfo />
            </div>
          </div>

          {/* Reviews */}
          <ProductReviews />

          {/* Related */}
          <RelatedProducts />
        </div>
      </main>
      <Footer />
    </div>
  );
}