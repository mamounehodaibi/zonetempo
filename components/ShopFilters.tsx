"use client";

import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface FiltersState {
  genres: string[];
  conditions: string[];
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  inStockOnly: boolean;
}

interface ShopFiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  onClose?: () => void;
}

const genreOptions = [
  "Jazz", "Classic Rock", "Soul & R&B", "Electronic", "Folk", "Hip-Hop",
  "Pop", "Country", "Blues", "Funk", "Reggae", "Indie Rock", "Punk",
  "Classical", "Ambient", "Alternative", "Hard Rock", "Psychedelic",
];

const conditionOptions = [
  { value: "Mint", label: "Mint (M)", description: "Never played" },
  { value: "Near Mint", label: "Near Mint (NM)", description: "Barely played" },
  { value: "Very Good Plus", label: "Very Good+ (VG+)", description: "Light wear" },
  { value: "Very Good", label: "Very Good (VG)", description: "Some surface noise" },
  { value: "Good", label: "Good (G)", description: "Heavy wear" },
];

export default function ShopFilters({ filters, onChange, onClose }: ShopFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    genre: true,
    condition: true,
    price: true,
    year: true,
    stock: true,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleGenre = (genre: string) => {
    const updated = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    onChange({ ...filters, genres: updated });
  };

  const toggleCondition = (cond: string) => {
    const updated = filters.conditions.includes(cond)
      ? filters.conditions.filter((c) => c !== cond)
      : [...filters.conditions, cond];
    onChange({ ...filters, conditions: updated });
  };

  const clearAll = () => {
    onChange({
      genres: [],
      conditions: [],
      priceMin: 0,
      priceMax: 150,
      yearMin: 1950,
      yearMax: 2025,
      inStockOnly: false,
    });
  };

  const activeCount =
    filters.genres.length +
    filters.conditions.length +
    (filters.priceMin > 0 || filters.priceMax < 150 ? 1 : 0) +
    (filters.yearMin > 1950 || filters.yearMax < 2025 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  const FilterSection = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-ink/8 pb-5 mb-5">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-ink/50">
          {title}
        </span>
        <Icon
          name={expandedSections[id] ? "ChevronUpIcon" : "ChevronDownIcon"}
          size={14}
          className="text-ink/30 group-hover:text-ink/60 transition-colors"
        />
      </button>
      {expandedSections[id] && <div>{children}</div>}
    </div>
  );

  return (
    <div className="bg-cream h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-ink/8 sticky top-0 bg-cream z-10">
        <div className="flex items-center gap-2">
          <Icon name="AdjustmentsHorizontalIcon" size={18} className="text-ink/60" />
          <span className="font-medium text-ink text-sm">Filters</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 bg-orange text-white text-[10px] font-bold font-mono rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-orange hover:text-orange-light font-medium transition-colors"
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-cream-dark rounded-full transition-colors">
              <Icon name="XMarkIcon" size={18} className="text-ink/50" />
            </button>
          )}
        </div>
      </div>

      <div className="p-5">
        {/* In Stock Toggle */}
        <FilterSection id="stock" title="Availability">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 cursor-pointer ${
                filters.inStockOnly ? "bg-orange" : "bg-ink/15"
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  filters.inStockOnly ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
            <span className="text-sm text-ink/70">In stock only</span>
          </label>
        </FilterSection>

        {/* Genre */}
        <FilterSection id="genre" title="Genre">
          <div className="flex flex-wrap gap-2">
            {genreOptions.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                  filters.genres.includes(genre)
                    ? "bg-orange text-white" :"bg-cream-dark text-ink/60 hover:bg-cream-darker hover:text-ink"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Condition */}
        <FilterSection id="condition" title="Condition">
          <div className="space-y-2.5">
            {conditionOptions.map((cond) => (
              <label key={cond.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={filters.conditions.includes(cond.value)}
                  onChange={() => toggleCondition(cond.value)}
                />
                <div>
                  <p className="text-sm text-ink/80 group-hover:text-ink transition-colors">
                    {cond.label}
                  </p>
                  <p className="text-[10px] text-muted">{cond.description}</p>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection id="price" title="Price Range">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-ink/60">
                ${filters.priceMin}
              </span>
              <span className="text-sm font-mono text-ink/60">
                ${filters.priceMax}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={150}
              step={5}
              value={filters.priceMin}
              onChange={(e) =>
                onChange({ ...filters, priceMin: Number(e.target.value) })
              }
              className="w-full accent-orange"
            />
            <input
              type="range"
              min={0}
              max={150}
              step={5}
              value={filters.priceMax}
              onChange={(e) =>
                onChange({ ...filters, priceMax: Number(e.target.value) })
              }
              className="w-full accent-orange"
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-[10px] font-mono text-muted uppercase tracking-wider block mb-1">Min</label>
                <input
                  type="number"
                  value={filters.priceMin}
                  min={0}
                  max={filters.priceMax}
                  onChange={(e) => onChange({ ...filters, priceMin: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-xs border border-ink/10 rounded-lg bg-cream-dark text-ink outline-none focus:border-orange transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-mono text-muted uppercase tracking-wider block mb-1">Max</label>
                <input
                  type="number"
                  value={filters.priceMax}
                  min={filters.priceMin}
                  max={150}
                  onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-xs border border-ink/10 rounded-lg bg-cream-dark text-ink outline-none focus:border-orange transition-colors"
                />
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Year Range */}
        <FilterSection id="year" title="Release Year">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-ink/60">{filters.yearMin}</span>
              <span className="text-sm font-mono text-ink/60">{filters.yearMax}</span>
            </div>
            <input
              type="range"
              min={1950}
              max={2025}
              step={1}
              value={filters.yearMin}
              onChange={(e) => onChange({ ...filters, yearMin: Number(e.target.value) })}
              className="w-full accent-orange"
            />
            <input
              type="range"
              min={1950}
              max={2025}
              step={1}
              value={filters.yearMax}
              onChange={(e) => onChange({ ...filters, yearMax: Number(e.target.value) })}
              className="w-full accent-orange"
            />
            <div className="flex items-center gap-2 text-xs text-muted font-mono">
              <span>1950s</span>
              <div className="flex-1 h-px bg-ink/10" />
              <span>2025</span>
            </div>
          </div>
        </FilterSection>
      </div>
    </div>
  );
}