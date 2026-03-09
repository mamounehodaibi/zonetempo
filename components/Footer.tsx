import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

const footerLinks = {
  Shop: [
    { label: "All Vinyl", href: "/shop" },
    { label: "New Arrivals", href: "/shop" },
    { label: "Best Sellers", href: "/shop" },
    { label: "Genres", href: "/shop" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Press", href: "/about" },
  ],
  Account: [
    { label: "Sign In", href: "/account" },
    { label: "Register", href: "/account" },
    { label: "Wishlist", href: "/account" },
    { label: "Order History", href: "/account" },
  ],
};

const socials = [
  { icon: "GlobeAltIcon", label: "Instagram", href: "#" },
  { icon: "ChatBubbleLeftRightIcon", label: "Twitter", href: "#" },
  { icon: "PlayIcon", label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="bg-ink text-cream/80 border-t border-cream/5"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Top section */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-5">
  <img
    src="/assets/images/zonetempo-logo.svg"
    alt="Zonetempo"
    className="h-12 w-auto brightness-0 invert"
  />
</Link>
            <p className="text-sm text-cream/50 leading-relaxed max-w-xs mb-6">
              Curated vinyl for those who believe music sounds better on wax.
              Discover rare pressings, new releases, and timeless classics.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-cream/10 flex items-center justify-center hover:border-orange hover:bg-orange/10 hover:text-orange transition-all duration-200"
                >
                  <Icon name={s.icon as any} size={16} className="text-cream/50 group-hover:text-orange" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="col-span-1">
              <h4
                className="text-xs font-mono font-semibold uppercase tracking-widest text-cream/40 mb-4"
              >
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 hover:text-cream transition-colors link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter mini */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-cream/40 mb-4">
              Stay in the groove
            </h4>
            <p className="text-sm text-cream/50 mb-3">
              New drops, exclusive deals, vinyl stories.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-3 py-2 text-sm bg-cream/5 border border-cream/10 rounded-lg text-cream placeholder-cream/30 outline-none focus:border-orange transition-colors"
              />
              <button className="px-3 py-2 bg-orange rounded-lg hover:bg-orange-light transition-colors flex-shrink-0">
                <Icon name="ArrowRightIcon" size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/5">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/35 font-mono">
            © 2026 Zonetempo Records. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-cream/35 hover:text-cream/60 transition-colors font-mono">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-cream/35 hover:text-cream/60 transition-colors font-mono">
              Terms
            </Link>
            <Link href="/shipping" className="text-xs text-cream/35 hover:text-cream/60 transition-colors font-mono">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}