"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLogo from "@/components/ui/AppLogo";
import Icon from "@/components/ui/AppIcon";

interface CartItem {
  id: string;
  count: number;
}

const navLinks = [
  { href: "/homepage", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useState(2);
  const [wishlistCount] = useState(3);
  const searchRef = useRef<HTMLInputElement>(null);

  const mockSuggestions = [
    "Pink Floyd – The Dark Side of the Moon",
    "Miles Davis – Kind of Blue",
    "Fleetwood Mac – Rumours",
    "David Bowie – Ziggy Stardust",
    "Led Zeppelin – IV",
  ].filter((s) =>
    searchQuery.length > 1
      ? s.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_0_rgba(13,13,13,0.08)]"
            : "bg-transparent"
        }`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/homepage" className="flex items-center gap-2.5 group">
              <AppLogo
                size={36}
                iconName="MusicalNoteIcon"
                text="Zonetempo"
                className="group-hover:opacity-80 transition-opacity"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium link-underline transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-orange" :"text-ink/70 hover:text-ink"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-cream-dark transition-colors"
                aria-label="Search"
              >
                <Icon name="MagnifyingGlassIcon" size={20} className="text-ink/70" />
              </button>

              {/* Wishlist */}
              <Link
                href="/auth"
                className="relative p-2 rounded-full hover:bg-cream-dark transition-colors hidden sm:flex"
                aria-label="Wishlist"
              >
                <Icon name="HeartIcon" size={20} className="text-ink/70" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-orange rounded-full flex items-center justify-center text-white text-[9px] font-bold font-mono">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-cream-dark transition-colors"
                aria-label="Cart"
              >
                <Icon name="ShoppingBagIcon" size={20} className="text-ink/70" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-orange rounded-full flex items-center justify-center text-white text-[9px] font-bold font-mono">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/auth"
                className="hidden sm:flex items-center gap-2 ml-1 px-4 py-2 rounded-full border border-ink/15 hover:border-orange hover:text-orange text-sm font-medium transition-all duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Icon name="UserIcon" size={16} />
                <span>Account</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-cream-dark transition-colors ml-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                <Icon
                  name={mobileOpen ? "XMarkIcon" : "Bars3Icon"}
                  size={22}
                  className="text-ink"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
          onClick={() => {
            setSearchOpen(false);
            setSearchQuery("");
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 bg-cream shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-3xl mx-auto px-4 py-4">
              <div className="flex items-center gap-3 border-b-2 border-orange pb-3">
                <Icon name="MagnifyingGlassIcon" size={22} className="text-orange flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search vinyl, artists, genres..."
                  className="flex-1 bg-transparent text-lg text-ink placeholder-muted outline-none"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-1"
                >
                  <Icon name="XMarkIcon" size={20} className="text-muted" />
                </button>
              </div>

              {mockSuggestions.length > 0 && (
                <ul className="py-2">
                  {mockSuggestions.map((s, i) => (
                    <li key={i}>
                      <Link
                        href="/shop"
                        className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-cream-dark transition-colors text-sm text-ink/80"
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <Icon name="MusicalNoteIcon" size={16} className="text-muted" />
                        {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {searchQuery.length === 0 && (
                <div className="py-3">
                  <p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
                    Trending Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Jazz", "Classic Rock", "Soul", "Electronic", "Hip-Hop"].map((tag) => (
                      <Link
                        key={tag}
                        href="/shop"
                        className="px-3 py-1.5 rounded-full bg-cream-dark text-sm text-ink/70 hover:bg-orange hover:text-white transition-colors"
                        onClick={() => setSearchOpen(false)}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] md:hidden">
          <div
            className="absolute inset-0 bg-ink/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-cream shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 border-b border-ink/10">
              <span
                className="font-display font-medium text-lg text-ink"
              >
                Menu
              </span>
              <button onClick={() => setMobileOpen(false)}>
                <Icon name="XMarkIcon" size={22} className="text-ink/60" />
              </button>
            </div>

            <nav className="flex-1 px-5 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-orange/10 text-orange" :"text-ink/70 hover:bg-cream-dark hover:text-ink"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="px-5 pb-8 space-y-3 border-t border-ink/10 pt-5">
              <Link
                href="/auth"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-ink text-cream text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                <Icon name="UserIcon" size={16} />
                My Account
              </Link>
              <Link
                href="/cart"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full border border-ink/20 text-ink text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                <Icon name="ShoppingBagIcon" size={16} />
                Cart ({cartCount})
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}