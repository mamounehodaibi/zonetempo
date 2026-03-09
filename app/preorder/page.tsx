"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const UPCOMING = [
  { id: 1, title: "In Rainbows", artist: "Radiohead", genre: "Alternative", releaseDate: "April 15, 2025", price: 44.99, limited: true, description: "A deluxe reissue of Radiohead's landmark 2007 album on 180g double vinyl with remastered audio." },
  { id: 2, title: "Blonde", artist: "Frank Ocean", genre: "R&B", releaseDate: "May 3, 2025", price: 49.99, limited: true, description: "The long-awaited official vinyl pressing of Frank Ocean's critically acclaimed 2016 masterpiece." },
  { id: 3, title: "To Pimp a Butterfly", artist: "Kendrick Lamar", genre: "Hip-Hop", releaseDate: "May 20, 2025", price: 46.99, limited: false, description: "A stunning repress of Kendrick Lamar's definitive statement on race, identity, and artistry." },
  { id: 4, title: "Vespertine", artist: "Bjork", genre: "Electronic", releaseDate: "June 1, 2025", price: 42.99, limited: true, description: "Bjork's intimate and intricate 2001 album finally gets the vinyl treatment it deserves." },
  { id: 5, title: "Madvillainy", artist: "Madvillain", genre: "Hip-Hop", releaseDate: "June 14, 2025", price: 48.99, limited: true, description: "The cult classic collaboration between MF DOOM and Madlib returns in a limited pressing." },
  { id: 6, title: "Sea Change", artist: "Beck", genre: "Folk", releaseDate: "July 4, 2025", price: 39.99, limited: false, description: "Beck's most personal and melancholic album reissued on audiophile-grade vinyl." },
];

export default function PreorderPage() {
  const [notified, setNotified] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleNotify = (id: number) => {
    if (!email) { alert("Please enter your email first."); return; }
    setNotified((prev) => [...prev, id]);
    setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12">
            <span className="section-label block mb-2">Coming Soon</span>
            <h1 className="font-display font-medium text-ink text-4xl md:text-5xl">Preorder & Upcoming</h1>
            <p className="text-muted mt-3 max-w-xl">Reserve your copy before they sell out. Limited pressings go fast — sign up to be notified the moment they drop.</p>
          </div>

          {/* Email Input */}
          <div className="bg-ink rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <p className="text-cream font-display text-lg font-medium">Get notified on new drops</p>
              <p className="text-cream/50 text-sm mt-1">Enter your email and click notify on any record below.</p>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-cream placeholder-cream/30 outline-none focus:border-orange transition-colors text-sm w-full sm:w-72"
            />
          </div>

          {/* Records Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPCOMING.map((record) => (
              <div key={record.id} className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col">
                <div className="bg-ink/5 h-48 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-ink flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-cream/20" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display font-medium text-ink text-lg leading-tight">{record.title}</h3>
                      <p className="text-muted text-sm">{record.artist}</p>
                    </div>
                    {record.limited && (
                      <span className="badge-new ml-2 flex-shrink-0">Limited</span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">{record.genre}</p>
                  <p className="text-sm text-muted leading-relaxed mb-4 flex-1">{record.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-xs text-muted font-mono">Release Date</p>
                      <p className="text-sm font-medium text-ink">{record.releaseDate}</p>
                    </div>
                    <p className="font-semibold text-ink">${record.price}</p>
                  </div>
                  {notified.includes(record.id) ? (
                    <div className="mt-4 py-2.5 bg-green-50 border border-green-200 rounded-full text-center text-sm text-green-600 font-medium">
                      You will be notified
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNotify(record.id)}
                      className="mt-4 py-2.5 bg-orange text-white rounded-full text-sm font-semibold hover:bg-orange-light transition-colors"
                    >
                      Notify Me
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}