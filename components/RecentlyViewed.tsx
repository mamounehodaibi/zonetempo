"use client";

import React from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const recentItems = [
{
  id: "rv1",
  title: "Kind of Blue",
  artist: "Miles Davis",
  price: 42.99,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10a398b9b-1772403088094.png",
  alt: "Kind of Blue album thumbnail"
},
{
  id: "rv2",
  title: "Rumours",
  artist: "Fleetwood Mac",
  price: 38.50,
  image: "https://images.unsplash.com/photo-1583436173634-dec59d5a3b01",
  alt: "Rumours album thumbnail"
},
{
  id: "rv3",
  title: "Abbey Road",
  artist: "The Beatles",
  price: 49.99,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d23940e0-1770043784754.png",
  alt: "Abbey Road album thumbnail"
},
{
  id: "rv4",
  title: "Purple Rain",
  artist: "Prince",
  price: 44.99,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15d3a41e9-1772513433091.png",
  alt: "Purple Rain album thumbnail"
}];


export default function RecentlyViewed() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="border-t border-ink/8 pt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon name="ClockIcon" size={16} className="text-muted" />
            <span className="text-sm font-medium text-ink/60">Recently Viewed</span>
          </div>
          <button className="text-xs text-muted hover:text-orange transition-colors font-mono">
            Clear history
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto scroll-x-smooth pb-2">
          {recentItems?.map((item) =>
          <Link
            key={item?.id}
            href="/product-details"
            className="group flex-shrink-0 flex items-center gap-3 px-3 py-2.5 bg-cream rounded-xl border border-ink/8 hover:border-orange/30 transition-all duration-200">
            
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <AppImage
                src={item?.image}
                alt={item?.alt}
                width={40}
                height={40}
                className="object-cover" />
              
              </div>
              <div>
                <p className="text-xs font-medium text-ink group-hover:text-orange transition-colors whitespace-nowrap">
                  {item?.title}
                </p>
                <p className="text-[10px] text-muted whitespace-nowrap">${item?.price}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>);

}