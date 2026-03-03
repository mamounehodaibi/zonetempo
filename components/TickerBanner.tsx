"use client";

import React from "react";
import Icon from "@/components/ui/AppIcon";

const items = [
  "Free shipping on orders over $75",
  "New arrivals every Friday",
  "Over 4,200 records in stock",
  "Rare pressings & limited editions",
  "Secure packaging guaranteed",
  "30-day return policy",
  "Free shipping on orders over $75",
  "New arrivals every Friday",
  "Over 4,200 records in stock",
  "Rare pressings & limited editions",
  "Secure packaging guaranteed",
  "30-day return policy",
];

export default function TickerBanner() {
  return (
    <div className="bg-orange text-white py-2.5 overflow-hidden">
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {items?.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6 text-xs font-mono font-semibold uppercase tracking-widest whitespace-nowrap">
              <Icon name="MusicalNoteIcon" size={12} className="opacity-70 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}