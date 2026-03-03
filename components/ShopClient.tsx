"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ShopFilters from "./ShopFilters";
import ProductCard, { Product } from "./ProductCard";
import { supabase } from "@/lib/supabase";
import Icon from "@/components/ui/AppIcon";

const MOCK_PRODUCTS: Product[] = [
{ id: "p1", title: "Kind of Blue", artist: "Miles Davis", year: "1959", genre: "Jazz", price: 42.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff35a7ca-1772478161065.png", alt: "Kind of Blue album cover with cool blue abstract tones", condition: "Near Mint", copies: 3, rating: 4.9, reviewCount: 214, isNew: false },
{ id: "p2", title: "Rumours", artist: "Fleetwood Mac", year: "1977", genre: "Classic Rock", price: 38.50, image: "https://images.unsplash.com/photo-1583436173634-dec59d5a3b01", alt: "Rumours album with warm photography of artists on stage", condition: "Mint", copies: 7, rating: 4.8, reviewCount: 189, isNew: false },
{ id: "p3", title: "Thriller", artist: "Michael Jackson", year: "1982", genre: "Pop", price: 44.99, image: "https://images.unsplash.com/photo-1543584985-a59dcbed30ae", alt: "Thriller album cover with dramatic lighting", condition: "Near Mint", copies: 2, rating: 4.9, reviewCount: 342, isNew: false },
{ id: "p4", title: "Blue", artist: "Joni Mitchell", year: "1971", genre: "Folk", price: 36.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1da4b93f7-1772478160188.png", alt: "Blue album with soft blue tones and folk aesthetic", condition: "Very Good Plus", copies: 1, rating: 4.7, reviewCount: 97, isNew: false },
{ id: "p5", title: "Abbey Road", artist: "The Beatles", year: "1969", genre: "Classic Rock", price: 49.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d23940e0-1770043784754.png", alt: "Abbey Road album cover with the iconic crossing image", condition: "Mint", copies: 12, rating: 5.0, reviewCount: 521, isNew: false },
{ id: "p6", title: "Purple Rain", artist: "Prince", year: "1984", genre: "Funk", price: 44.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0b25177-1772513413763.png", alt: "Purple Rain album with dramatic purple and rain imagery", condition: "Near Mint", copies: 4, rating: 4.8, reviewCount: 178, isNew: false },
{ id: "p7", title: "What's Going On", artist: "Marvin Gaye", year: "1971", genre: "Soul & R&B", price: 41.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e6a22780-1772513415205.png", alt: "What's Going On album with soulful warm portrait tones", condition: "Very Good Plus", copies: 9, rating: 4.9, reviewCount: 263, isNew: false },
{ id: "p8", title: "OK Computer", artist: "Radiohead", year: "1997", genre: "Alternative", price: 38.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a91a967b-1772513424294.png", alt: "OK Computer album with electronic and dystopian aesthetic", condition: "Mint", copies: 6, rating: 4.7, reviewCount: 145, isNew: false },
{ id: "p9", title: "Led Zeppelin IV", artist: "Led Zeppelin", year: "1971", genre: "Hard Rock", price: 47.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1015a4f3f-1772513423252.png", alt: "Led Zeppelin IV album with mystical and dramatic imagery", condition: "Very Good", copies: 2, rating: 4.8, reviewCount: 312, isNew: false },
{ id: "p10", title: "Songs in the Key of Life", artist: "Stevie Wonder", year: "1976", genre: "Soul & R&B", price: 52.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d1ea6120-1772513415200.png", alt: "Songs in the Key of Life album with warm soulful tones", condition: "Near Mint", copies: 7, rating: 4.9, reviewCount: 198, isNew: false },
{ id: "p11", title: "Cowboy Carter", artist: "Beyoncé", year: "2024", genre: "Country", price: 39.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_132008190-1772513421721.png", alt: "Cowboy Carter album with country western aesthetic", condition: "Mint", copies: 15, rating: 4.6, reviewCount: 89, isNew: true },
{ id: "p12", title: "Chromakopia", artist: "Tyler, the Creator", year: "2024", genre: "Hip-Hop", price: 36.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_197ae1537-1772513416647.png", alt: "Chromakopia album with vibrant creative color palette", condition: "Mint", copies: 3, rating: 4.7, reviewCount: 67, isNew: true },
{ id: "p13", title: "Electric Ladyland", artist: "Jimi Hendrix", year: "1968", genre: "Psychedelic", price: 55.99, originalPrice: 65.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_231560f42-1772513417945.png", alt: "Electric Ladyland album with psychedelic visual artwork", condition: "Very Good Plus", copies: 1, rating: 4.8, reviewCount: 156, isSale: true },
{ id: "p14", title: "Nevermind", artist: "Nirvana", year: "1991", genre: "Alternative", price: 34.99, image: "https://images.unsplash.com/photo-1614226931884-101b4b410b28", alt: "Nevermind album with the iconic pool imagery", condition: "Near Mint", copies: 8, rating: 4.7, reviewCount: 234, isNew: false },
{ id: "p15", title: "Midnight Marauders", artist: "A Tribe Called Quest", year: "1993", genre: "Hip-Hop", price: 43.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce8b8031-1772513421675.png", alt: "Midnight Marauders album with grid of faces artwork", condition: "Very Good Plus", copies: 5, rating: 4.9, reviewCount: 176, isNew: false },
{ id: "p16", title: "Blue Train", artist: "John Coltrane", year: "1957", genre: "Jazz", price: 39.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ed81b026-1772224503718.png", alt: "Blue Train album with classic jazz photography in blue tones", condition: "Mint", copies: 4, rating: 4.8, reviewCount: 143, isNew: false }];


const SORT_OPTIONS = [
{ value: "featured", label: "Featured" },
{ value: "price-asc", label: "Price: Low to High" },
{ value: "price-desc", label: "Price: High to Low" },
{ value: "newest", label: "Newest First" },
{ value: "rating", label: "Top Rated" },
{ value: "name", label: "A–Z" }];


interface FiltersState {
  genres: string[];
  conditions: string[];
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  inStockOnly: boolean;
}

const defaultFilters: FiltersState = {
  genres: [],
  conditions: [],
  priceMin: 0,
  priceMax: 150,
  yearMin: 1950,
  yearMax: 2025,
  inStockOnly: false
};

export default function ShopClient() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data } = await supabase.from("products").select("*");
      if (data && data.length > 0) {
        const mapped = data.map((p) => ({
          id: p.id,
          title: p.title,
          artist: p.artist,
          year: String(p.year),
          genre: p.genre,
          price: p.price,
          image: p.image_url || "",
          alt: `${p.title} album cover`,
          condition: "Mint",
          copies: p.stock,
          rating: p.rating,
          reviewCount: 0,
          isNew: false,
        }));
        setProducts(mapped);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val.length > 1) {
     const suggestions = products.
      filter((p) =>
      p.title.toLowerCase().includes(val.toLowerCase()) ||
      p.artist.toLowerCase().includes(val.toLowerCase())
      ).
      slice(0, 5).
      map((p) => `${p.title} – ${p.artist}`);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
        p.title.toLowerCase().includes(q) ||
        p.artist.toLowerCase().includes(q) ||
        p.genre.toLowerCase().includes(q)
      );
    }

    if (filters.genres.length > 0) {
      result = result.filter((p) => filters.genres.includes(p.genre));
    }
    if (filters.conditions.length > 0) {
      result = result.filter((p) => filters.conditions.includes(p.condition));
    }
    result = result.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    );
    result = result.filter(
      (p) => Number(p.year) >= filters.yearMin && Number(p.year) <= filters.yearMax
    );
    if (filters.inStockOnly) {
      result = result.filter((p) => p.copies > 0);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => Number(b.year) - Number(a.year));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [filters, sortBy, searchQuery]);

  const activeFilterCount =
  filters.genres.length +
  filters.conditions.length + (
  filters.priceMin > 0 || filters.priceMax < 150 ? 1 : 0) + (
  filters.yearMin > 1950 || filters.yearMax < 2025 ? 1 : 0) + (
  filters.inStockOnly ? 1 : 0);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Search + Toolbar */}
      <div className="mb-6 space-y-4">
        {/* Live Search */}
        <div className="relative max-w-xl">
          <div className="flex items-center gap-3 bg-cream border border-ink/10 rounded-2xl px-4 py-3 focus-within:border-orange transition-colors">
            <Icon name="MagnifyingGlassIcon" size={18} className="text-muted flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search by title, artist, or genre..."
              className="flex-1 bg-transparent text-sm text-ink placeholder-muted outline-none"
              style={{ fontFamily: "var(--font-body)" }} />
            
            {searchQuery &&
            <button onClick={() => {setSearchQuery("");setShowSuggestions(false);}}>
                <Icon name="XMarkIcon" size={16} className="text-muted hover:text-ink transition-colors" />
              </button>
            }
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && searchSuggestions.length > 0 &&
          <div className="absolute top-full left-0 right-0 mt-1 bg-cream border border-ink/10 rounded-2xl shadow-card-hover overflow-hidden z-20">
              {searchSuggestions.map((s, i) =>
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-ink/70 hover:bg-cream-dark hover:text-ink transition-colors text-left"
              onMouseDown={() => {
                setSearchQuery(s.split(" – ")[0]);
                setShowSuggestions(false);
              }}>
              
                  <Icon name="MusicalNoteIcon" size={14} className="text-muted flex-shrink-0" />
                  {s}
                </button>
            )}
            </div>
          }
        </div>

        {/* Sort + View + Mobile Filter Toggle */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-cream border border-ink/10 rounded-xl text-sm font-medium hover:border-orange transition-colors">
              
              <Icon name="AdjustmentsHorizontalIcon" size={16} className="text-ink/60" />
              Filters
              {activeFilterCount > 0 &&
              <span className="w-5 h-5 bg-orange text-white text-[10px] font-bold font-mono rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              }
            </button>

            <p className="text-sm text-muted font-mono">
              <span className="text-ink font-semibold">{filteredProducts.length}</span> records
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 bg-cream border border-ink/10 rounded-xl text-sm text-ink outline-none focus:border-orange transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-body)" }}>
              
              {SORT_OPTIONS.map((opt) =>
              <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              )}
            </select>

            {/* View mode */}
            <div className="flex items-center gap-0.5 p-1 bg-cream border border-ink/10 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-ink text-cream" : "text-ink/40 hover:text-ink"}`}
                aria-label="Grid view">
                
                <Icon name="Squares2X2Icon" size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-ink text-cream" : "text-ink/40 hover:text-ink"}`}
                aria-label="List view">
                
                <Icon name="ListBulletIcon" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 &&
        <div className="flex flex-wrap gap-2">
            {filters.genres.map((g) =>
          <span key={g} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange/10 text-orange text-xs font-medium rounded-full border border-orange/20">
                {g}
                <button onClick={() => setFilters((f) => ({ ...f, genres: f.genres.filter((x) => x !== g) }))}>
                  <Icon name="XMarkIcon" size={12} />
                </button>
              </span>
          )}
            {filters.conditions.map((c) =>
          <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber/10 text-amber text-xs font-medium rounded-full border border-amber/20">
                {c}
                <button onClick={() => setFilters((f) => ({ ...f, conditions: f.conditions.filter((x) => x !== c) }))}>
                  <Icon name="XMarkIcon" size={12} />
                </button>
              </span>
          )}
            {filters.inStockOnly &&
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                In Stock Only
                <button onClick={() => setFilters((f) => ({ ...f, inStockOnly: false }))}>
                  <Icon name="XMarkIcon" size={12} />
                </button>
              </span>
          }
            <button
            onClick={() => setFilters(defaultFilters)}
            className="text-xs text-muted hover:text-orange transition-colors font-medium">
            
              Clear all
            </button>
          </div>
        }
      </div>

      <div className="flex gap-6 lg:gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-cream-dark rounded-2xl overflow-hidden border border-ink/5">
            <ShopFilters filters={filters} onChange={setFilters} />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ?
          <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-cream-dark flex items-center justify-center mb-4">
                <Icon name="MusicalNoteIcon" size={28} className="text-muted" />
              </div>
              <h3 className="font-display font-medium text-ink text-xl mb-2">No records found</h3>
              <p className="text-muted text-sm mb-6">Try adjusting your filters or search terms.</p>
              <button
              onClick={() => {setFilters(defaultFilters);setSearchQuery("");}}
              className="px-6 py-3 bg-orange text-whitetext-sm font-semibold rounded-full hover:bg-orange-light transition-all">
              
                Clear All Filters
              </button>
            </div> :

          <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-3"}>
              {filteredProducts.map((product, i) =>
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}>
              
                  <ProductCard product={product} viewMode={viewMode} />
                </div>
            )}
            </div>
          }
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen &&
      <div className="fixed inset-0 z-50 lg:hidden">
          <div
          className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          onClick={() => setMobileFiltersOpen(false)} />
        
          <div className="absolute inset-y-0 left-0 w-80 max-w-[90vw] bg-cream shadow-2xl overflow-hidden">
            <ShopFilters
            filters={filters}
            onChange={setFilters}
            onClose={() => setMobileFiltersOpen(false)} />
          
            <div className="p-4 border-t border-ink/8 bg-cream sticky bottom-0">
              <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 bg-ink text-cream text-sm font-semibold rounded-xl hover:bg-orange transition-colors">
              
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

}