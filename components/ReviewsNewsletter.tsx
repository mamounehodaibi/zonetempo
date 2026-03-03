"use client";

import React, { useRef, useEffect, useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const reviews = [
{
  id: "r1",
  name: "Marcus Chen",
  location: "Brooklyn, NY",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_184e5f4b2-1763294080263.png",
  alt: "Marcus Chen profile photo, a man in his 30s smiling",
  rating: 5,
  text: "Zonetempo has completely changed how I discover music. The curation is impeccable — every record I\'ve ordered has been in pristine condition with expert packaging.",
  record: "Kind of Blue – Miles Davis"
},
{
  id: "r2",
  name: "Priya Sharma",
  location: "Chicago, IL",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb5d2cb2-1763294526193.png",
  alt: "Priya Sharma profile photo, a woman with dark hair smiling warmly",
  rating: 5,
  text: "I found a first pressing of Rumours here that I\'d been hunting for 3 years. The search filters are incredible and shipping was faster than expected.",
  record: "Rumours – Fleetwood Mac"
},
{
  id: "r3",
  name: "James Okafor",
  location: "Austin, TX",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18bc6b08a-1763300638177.png",
  alt: "James Okafor profile photo, a man with a warm smile",
  rating: 5,
  text: "The genre categories and artist pages make browsing so enjoyable. It\'s like visiting the best record shop in the world from your couch.",
  record: "Led Zeppelin IV – Led Zeppelin"
}];


export default function ReviewsNewsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Backend connection point for newsletter signup
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream-dark">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Reviews */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <span className="section-label block mb-2">What Collectors Say</span>
            <h2 className="font-display font-medium text-ink text-4xl leading-tight mb-8">
              Trusted by<br />
              <span className="italic text-orange">vinyl lovers</span>
            </h2>

            {/* Active Review */}
            <div className="bg-cream rounded-2xl p-6 md:p-8 mb-4 min-h-[200px] shadow-card">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: reviews[activeReview].rating }).map((_, i) =>
                <Icon key={i} name="StarIcon" size={16} variant="solid" className="text-amber" />
                )}
              </div>
              <p className="text-ink/75 leading-relaxed mb-5 text-sm md:text-base">
                "{reviews[activeReview].text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={reviews[activeReview].avatar}
                    alt={reviews[activeReview].alt}
                    width={40}
                    height={40}
                    className="object-cover" />
                  
                </div>
                <div>
                  <p className="font-medium text-ink text-sm">{reviews[activeReview].name}</p>
                  <p className="text-xs text-muted">{reviews[activeReview].location}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider">Purchased</p>
                  <p className="text-xs text-ink/60">{reviews[activeReview].record}</p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, i) =>
              <button
                key={i}
                onClick={() => setActiveReview(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeReview ? "w-6 bg-orange" : "w-1.5 bg-ink/20"}`
                }
                aria-label={`Review ${i + 1}`} />

              )}
              <span className="ml-auto text-xs font-mono text-muted">
                {activeReview + 1} / {reviews.length}
              </span>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
              { value: "4,800+", label: "Happy Collectors" },
              { value: "9.6/10", label: "Avg. Satisfaction" },
              { value: "98%", label: "On-Time Delivery" }].
              map((badge) =>
              <div key={badge.label} className="text-center p-3 bg-cream rounded-xl">
                  <p className="font-display font-semibold text-ink text-xl">{badge.value}</p>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-0.5">{badge.label}</p>
                </div>
              )}
            </div>
          </div>

          {/* Newsletter */}
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="bg-ink rounded-3xl p-8 md:p-10 h-full flex flex-col justify-center relative overflow-hidden">
              {/* Vinyl decoration */}
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full border-[20px] border-cream/5 opacity-50" />
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-[12px] border-orange/10" />

              <span className="section-label text-orange block mb-3">Stay in the Loop</span>
              <h3 className="font-display font-medium text-cream text-3xl md:text-4xl leading-tight mb-4">
                New drops, rare finds,<br />
                <span className="italic text-amber">vinyl stories.</span>
              </h3>
              <p className="text-cream/50 text-sm leading-relaxed mb-8">
                Join 12,000+ collectors who get early access to new arrivals, exclusive deals, and curated listening guides every Friday.
              </p>

              {submitted ?
              <div className="flex items-center gap-3 p-5 bg-green-500/10 border border-green-500/20 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Icon name="CheckIcon" size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-cream font-medium">You're in the groove!</p>
                    <p className="text-cream/50 text-sm">Check your inbox for a welcome note.</p>
                  </div>
                </div> :

              <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-5 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream placeholder-cream/30 text-sm outline-none focus:border-orange transition-colors"
                  style={{ fontFamily: "var(--font-body)" }} />
                
                  <button
                  type="submit"
                  className="w-full py-3.5 bg-orange hover:bg-orange-light text-white text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                  
                    Subscribe to the Newsletter
                    <Icon name="ArrowRightIcon" size={16} />
                  </button>
                </form>
              }

              <p className="text-cream/25 text-xs mt-4 text-center font-mono">
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>

              {/* Perks */}
              <div className="mt-8 pt-8 border-t border-cream/10 grid grid-cols-2 gap-3">
                {[
                { icon: "BoltIcon", text: "Early access to rare finds" },
                { icon: "TagIcon", text: "Subscriber-only discounts" },
                { icon: "BookOpenIcon", text: "Curated listening guides" },
                { icon: "GiftIcon", text: "Monthly giveaways" }].
                map((perk) =>
                <div key={perk.text} className="flex items-start gap-2">
                    <Icon name={perk.icon as any} size={14} className="text-orange mt-0.5 flex-shrink-0" />
                    <span className="text-cream/50 text-xs">{perk.text}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}