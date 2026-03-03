"use client";

import React, { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const reviews = [
{
  id: "rev1",
  name: "Daniel Okonkwo",
  location: "Seattle, WA",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18bc6b08a-1763300638177.png",
  alt: "Daniel Okonkwo profile photo, a man with a warm smile",
  rating: 5,
  date: "Feb 14, 2026",
  title: "Absolutely pristine pressing",
  text: "This 2016 remaster is genuinely the best way to experience Dark Side. The 180g vinyl is dead quiet and the separation across channels is breathtaking on a good system. Zonetempo packed it like a museum artifact.",
  verified: true,
  helpful: 24
},
{
  id: "rev2",
  name: "Aisha Patel",
  location: "Portland, OR",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb5d2cb2-1763294526193.png",
  alt: "Aisha Patel profile photo, a woman with dark hair and a bright smile",
  rating: 5,
  date: "Jan 28, 2026",
  title: "My first vinyl purchase — couldn\'t be happier",
  text: "I was nervous buying my first record online but the condition description was spot-on. Near Mint is exactly right. Arrived in two days, double-boxed with corner protectors. Will definitely buy from Zonetempo again.",
  verified: true,
  helpful: 18
},
{
  id: "rev3",
  name: "Marcus Webb",
  location: "Nashville, TN",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13935b154-1772218515024.png",
  alt: "Marcus Webb profile photo, a man in his 40s with a relaxed expression",
  rating: 4,
  date: "Dec 19, 2025",
  title: "Great record, slight sleeve scuff",
  text: "The vinyl itself is immaculate — absolutely zero surface noise and the remaster sounds incredible. Docking one star only because the outer sleeve had a small corner ding that wasn\'t mentioned. Customer service was responsive and offered a partial refund immediately.",
  verified: true,
  helpful: 11
}];


const ratingBreakdown = [
{ stars: 5, count: 261, percent: 84 },
{ stars: 4, count: 37, percent: 12 },
{ stars: 3, count: 9, percent: 3 },
{ stars: 2, count: 3, percent: 1 },
{ stars: 1, count: 2, percent: 0.5 }];


export default function ProductReviews() {
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});

  const toggleHelpful = (id: string) => {
    setHelpfulClicked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="mt-16 pt-10 border-t border-ink/8">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Summary */}
        <div>
          <h2 className="font-display font-medium text-ink text-2xl mb-6">
            Customer Reviews
          </h2>

          <div className="flex items-end gap-4 mb-6">
            <span className="font-display font-medium text-ink text-5xl">4.9</span>
            <div className="pb-1">
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) =>
                <Icon key={i} name="StarIcon" size={18} variant="solid" className="text-amber" />
                )}
              </div>
              <p className="text-xs font-mono text-muted">Based on 312 reviews</p>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-2.5 mb-8">
            {ratingBreakdown.map((row) =>
            <div key={row.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 flex-shrink-0 w-12">
                  <span className="text-xs font-mono text-ink/60">{row.stars}</span>
                  <Icon name="StarIcon" size={10} variant="solid" className="text-amber" />
                </div>
                <div className="flex-1 h-2 bg-cream-dark rounded-full overflow-hidden">
                  <div
                  className="h-full bg-amber rounded-full transition-all duration-700"
                  style={{ width: `${row.percent}%` }} />
                
                </div>
                <span className="text-xs font-mono text-muted w-8 text-right flex-shrink-0">
                  {row.count}
                </span>
              </div>
            )}
          </div>

          {/* Write review CTA */}
          <div className="p-5 bg-cream-dark rounded-2xl text-center">
            <p className="text-sm text-ink/60 mb-3">Own this record?</p>
            <button className="w-full py-2.5 border border-ink/20 rounded-xl text-sm font-medium text-ink hover:border-orange hover:text-orange transition-all duration-200 flex items-center justify-center gap-2">
              <Icon name="PencilSquareIcon" size={16} />
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews list */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.map((review) =>
          <div key={review.id} className="p-5 bg-cream rounded-2xl border border-ink/5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                  src={review.avatar}
                  alt={review.alt}
                  width={40}
                  height={40}
                  className="object-cover" />
                
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-ink text-sm">{review.name}</p>
                      <p className="text-xs text-muted">{review.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-mono text-muted">{review.date}</p>
                      {review.verified &&
                    <span className="text-[10px] font-mono text-green-600 flex items-center gap-1 justify-end mt-0.5">
                          <Icon name="CheckBadgeIcon" size={10} />
                          Verified
                        </span>
                    }
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) =>
              <Icon
                key={i}
                name="StarIcon"
                size={14}
                variant={i < review.rating ? "solid" : "outline"}
                className={i < review.rating ? "text-amber" : "text-ink/20"} />

              )}
              </div>

              <h4 className="font-medium text-ink text-sm mb-2">{review.title}</h4>
              <p className="text-sm text-ink/65 leading-relaxed mb-4">{review.text}</p>

              <div className="flex items-center gap-4 text-xs text-muted">
                <button
                onClick={() => toggleHelpful(review.id)}
                className={`flex items-center gap-1.5 transition-colors ${
                helpfulClicked[review.id] ? "text-orange" : "hover:text-ink"}`
                }>
                
                  <Icon name="HandThumbUpIcon" size={14} variant={helpfulClicked[review.id] ? "solid" : "outline"} />
                  Helpful ({review.helpful + (helpfulClicked[review.id] ? 1 : 0)})
                </button>
                <button className="hover:text-ink transition-colors">Report</button>
              </div>
            </div>
          )}

          <button className="w-full py-3 border border-ink/15 rounded-xl text-sm font-medium text-ink/60 hover:border-orange hover:text-orange transition-all duration-200">
            Load More Reviews (309 remaining)
          </button>
        </div>
      </div>
    </section>);

}