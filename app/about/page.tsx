"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    { title: "Curated with Care", description: "Every record in our catalog is hand-selected by our team of passionate collectors. We grade, clean, and verify each pressing before it reaches you." },
    { title: "Vinyl First", description: "We believe in the warmth and authenticity of analog sound. Vinyl is not just a format — it is a ritual, a connection between artist and listener that digital cannot replicate." },
    { title: "Community Driven", description: "Zonetempo is built by music lovers, for music lovers. We support independent artists, host listening sessions, and celebrate the culture around the record." },
    { title: "Quality Guaranteed", description: "Every order ships with our condition guarantee. If a record does not match its listed grade, we make it right — no questions asked." },
  ];

  const stats = [
    { number: "4,200+", label: "Records in Stock" },
    { number: "12,000+", label: "Happy Customers" },
    { number: "50+", label: "Genres Covered" },
    { number: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="section-label block mb-4">Our Story</span>
          <h1 className="font-display font-medium text-ink text-5xl md:text-6xl leading-tight max-w-3xl">
            We live and breathe vinyl.
          </h1>
          <p className="text-muted text-lg mt-6 max-w-2xl leading-relaxed">
            Zonetempo was born out of a simple obsession — the belief that music sounds better when it has weight, warmth, and a story. We started as a small collection of crates in a back room, and grew into one of the most trusted online vinyl destinations in the world.
          </p>
          <p className="text-muted text-lg mt-4 max-w-2xl leading-relaxed">
            There is something irreplaceable about dropping a needle onto a record. The soft crackle before the music begins. The way the sound fills a room differently than any speaker or streaming service ever could. We are here to make sure that experience is accessible to everyone — from the first-time listener to the seasoned collector.
          </p>
        </section>
        <section className="bg-ink py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-4xl md:text-5xl font-medium text-orange">{stat.number}</p>
                  <p className="text-cream/60 text-sm font-mono mt-2 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="section-label block mb-4">What We Stand For</span>
          <h2 className="font-display font-medium text-ink text-4xl mb-12">Our values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 shadow-card">
                <h3 className="font-display font-medium text-ink text-xl mb-3">{value.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-cream-dark py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="section-label block mb-4">Why Vinyl?</span>
            <h2 className="font-display font-medium text-ink text-4xl mb-8">The case for analog</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5 text-muted leading-relaxed">
                <p>Vinyl records capture sound as a continuous wave — the same way it exists in nature. Unlike digital formats that sample audio thousands of times per second and reconstruct it, vinyl preserves the full, uninterrupted signal. Audiophiles call this warmth. Scientists call it analog fidelity. We just call it the way music was meant to be heard.</p>
                <p>Beyond the sound, vinyl demands presence. You cannot passively consume a record. You choose a side, you set the needle, you listen. In a world of endless playlists and algorithmic queues, there is something profound about giving an album your full attention.</p>
                <p>Records also age beautifully. A well-maintained pressing from 1965 can still sound extraordinary today. It carries history in its grooves — the hands that recorded it, the pressing plant that made it, the homes it has lived in. That is something no streaming platform can offer.</p>
              </div>
              <div className="bg-ink rounded-2xl p-8 text-cream">
                <h3 className="font-display text-2xl font-medium mb-6 text-orange">Did you know?</h3>
                <ul className="space-y-4 text-sm text-cream/70">
                  <li className="flex gap-3"><span className="text-orange font-bold mt-0.5">01</span><span>Vinyl sales have grown for 17 consecutive years, outselling CDs since 2020.</span></li>
                  <li className="flex gap-3"><span className="text-orange font-bold mt-0.5">02</span><span>A standard 12-inch LP contains approximately 1,500 feet of grooves per side.</span></li>
                  <li className="flex gap-3"><span className="text-orange font-bold mt-0.5">03</span><span>The frequency range of vinyl exceeds what most digital formats can capture.</span></li>
                  <li className="flex gap-3"><span className="text-orange font-bold mt-0.5">04</span><span>First pressings of iconic albums can be worth thousands — some collectors treat vinyl as fine art.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display font-medium text-ink text-4xl mb-4">Ready to start your collection?</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">Browse our curated catalog of over 4,200 records across every genre imaginable.</p>
          <Link href="/shop" className="inline-block px-8 py-4 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors text-sm">
            Shop Now
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}