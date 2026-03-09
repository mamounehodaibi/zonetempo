"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !message) return;
    setSent(true);
  };

  const socials = [
    {
      name: "Instagram",
      handle: "@zone.tempo",
      url: "https://instagram.com/zone.tempo",
      color: "hover:text-pink-500",
      icon: "📸",
    },
    {
      name: "TikTok",
      handle: "@zone.tempo",
      url: "https://tiktok.com/@zone.tempo",
      color: "hover:text-black",
      icon: "🎵",
    },
    {
      name: "Facebook",
      handle: "Zonetempo",
      url: "https://www.facebook.com/profile.php?id=100089296194282",
      color: "hover:text-blue-600",
      icon: "📘",
    },
    {
      name: "WhatsApp",
      handle: "+212 696 819 313",
      url: "https://api.whatsapp.com/send?phone=212696819313",
      color: "hover:text-green-500",
      icon: "💬",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12">
            <span className="section-label block mb-2">Get In Touch</span>
            <h1 className="font-display font-medium text-ink text-4xl md:text-5xl">Contact Us</h1>
            <p className="text-muted mt-3 max-w-xl">Have a question about an order, looking for a specific record, or just want to talk vinyl? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-display font-medium text-ink text-lg mb-1">Store Hours</h3>
                <p className="text-muted text-sm">Mon – Fri: 9am – 6pm</p>
                <p className="text-muted text-sm">Sat: 10am – 4pm</p>
                <p className="text-muted text-sm">Sun: Closed</p>
              </div>
              <div>
                <h3 className="font-display font-medium text-ink text-lg mb-1">Email</h3>
                <a href="mailto:hello@zonetempo.com" className="text-muted text-sm hover:text-orange transition-colors">hello@zonetempo.com</a>
              </div>
              <div>
                <h3 className="font-display font-medium text-ink text-lg mb-1">WhatsApp</h3>
                <a href="https://api.whatsapp.com/send?phone=212696819313" target="_blank" rel="noopener noreferrer" className="text-muted text-sm hover:text-orange transition-colors">+212 696 819 313</a>
              </div>

              {/* Socials */}
              <div>
                <h3 className="font-display font-medium text-ink text-lg mb-3">Follow Us</h3>
                <div className="space-y-3">
                  {socials.map((s) => (
                    
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 text-muted transition-colors ${s.color} group`}
                    >
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-ink group-hover:text-inherit transition-colors">{s.name}</p>
                        <p className="text-xs text-muted">{s.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="bg-white rounded-3xl p-8 shadow-card text-center py-16">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="font-display font-medium text-ink text-2xl mb-2">Message Sent!</h3>
                  <p className="text-muted">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSent(false); setName(""); setEmail(""); setSubject(""); setMessage(""); }}
                    className="mt-6 px-6 py-2.5 border border-ink/20 rounded-full text-sm font-medium hover:border-orange hover:text-orange transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 shadow-card space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-1.5">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink placeholder-muted outline-none focus:border-orange transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink placeholder-muted outline-none focus:border-orange transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink placeholder-muted outline-none focus:border-orange transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what's on your mind..."
                      rows={6}
                      className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink placeholder-muted outline-none focus:border-orange transition-colors text-sm resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}