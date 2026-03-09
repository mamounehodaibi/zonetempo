"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

interface VinylRequest {
  id: string;
  title: string;
  artist: string;
  genre: string;
  requested_by: string;
  votes: number;
  created_at: string;
}

export default function WishlistPage() {
  const [requests, setRequests] = useState<VinylRequest[]>([]);
  const [voted, setVoted] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: "", artist: "", genre: "", name: "" });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data } = await supabase.from("vinyl_requests").select("*").order("votes", { ascending: false });
    if (data) setRequests(data);
    setLoading(false);
  };

  const handleVote = async (id: string) => {
    if (voted.includes(id)) return;
    setVoted((prev) => [...prev, id]);
    const record = requests.find((r) => r.id === id);
    if (!record) return;
    await supabase.from("vinyl_requests").update({ votes: record.votes + 1 }).eq("id", id);
    fetchRequests();
  };

  const handleSubmit = async () => {
    if (!form.title || !form.artist) return;
    await supabase.from("vinyl_requests").insert({
      title: form.title,
      artist: form.artist,
      genre: form.genre || "Other",
      requested_by: form.name || "anonymous",
      votes: 1,
    });
    setForm({ title: "", artist: "", genre: "", name: "" });
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    fetchRequests();
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="section-label block mb-2">Community</span>
              <h1 className="font-display font-medium text-ink text-4xl md:text-5xl">Record Wishlist</h1>
              <p className="text-muted mt-3 max-w-xl">Request a record you want us to stock. Vote for the ones you love. We restock based on demand.</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors text-sm flex-shrink-0">
              + Request a Record
            </button>
          </div>

          {submitted && (
            <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm font-medium">
              Your request has been submitted! Others can now vote for it.
            </div>
          )}

          {showForm && (
            <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
              <h2 className="font-display font-medium text-ink text-xl mb-5">Request a Record</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Album Title</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Kind of Blue" className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink placeholder-muted outline-none focus:border-orange transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Artist</label>
                  <input type="text" value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} placeholder="e.g. Miles Davis" className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink placeholder-muted outline-none focus:border-orange transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Genre</label>
                  <input type="text" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} placeholder="e.g. Jazz" className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink placeholder-muted outline-none focus:border-orange transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Your Name (optional)</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. cratedigger" className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink placeholder-muted outline-none focus:border-orange transition-colors text-sm" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleSubmit} className="px-6 py-2.5 bg-orange text-white rounded-full text-sm font-semibold hover:bg-orange-light transition-colors">Submit Request</button>
                <button onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-ink/20 rounded-full text-sm font-medium hover:border-orange hover:text-orange transition-colors">Cancel</button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-16 text-muted">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted mb-4">No requests yet. Be the first!</p>
              <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors text-sm">Request a Record</button>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((record, i) => (
                <div key={record.id} className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-5">
                  <div className="text-2xl font-display font-medium text-ink/20 w-8 text-center flex-shrink-0">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-medium text-ink text-lg leading-tight">{record.title}</h3>
                    <p className="text-muted text-sm">{record.artist}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-mono text-muted uppercase tracking-wider">{record.genre}</span>
                      <span className="text-ink/20 text-xs">·</span>
                      <span className="text-xs text-muted">by {record.requested_by}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleVote(record.id)}
                    className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border transition-all flex-shrink-0 ${voted.includes(record.id) ? "bg-orange/10 border-orange text-orange" : "border-ink/10 text-muted hover:border-orange hover:text-orange"}`}
                  >
                    <span className="text-lg leading-none">{voted.includes(record.id) ? "▲" : "△"}</span>
                    <span className="text-sm font-bold font-mono">{record.votes}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}