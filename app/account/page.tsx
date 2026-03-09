"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-md mx-auto px-4 text-center py-24">
            <h1 className="font-display text-3xl font-medium text-ink mb-4">You are not signed in</h1>
            <p className="text-muted mb-8">Sign in to access your account, orders, and wishlist.</p>
            <Link href="/auth" className="px-8 py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors">
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "orders", label: "Orders" },
    { id: "wishlist", label: "Wishlist" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="section-label block mb-2">My Account</span>
              <h1 className="font-display font-medium text-ink text-4xl">Welcome back</h1>
              <p className="text-muted mt-1 text-sm">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-5 py-2.5 border border-ink/20 rounded-full text-sm font-medium hover:border-orange hover:text-orange transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-cream-dark rounded-2xl mb-8 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h2 className="font-display font-medium text-ink text-xl mb-6">Profile Information</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink/60 text-sm cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Member Since</label>
                  <input
                    type="text"
                    value={new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    disabled
                    className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink/60 text-sm cursor-not-allowed"
                  />
                </div>
                <div className="pt-4">
                  <button className="px-6 py-2.5 bg-orange text-white rounded-full text-sm font-semibold hover:bg-orange-light transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h2 className="font-display font-medium text-ink text-xl mb-6">Order History</h2>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-cream-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <p className="text-muted">No orders yet.</p>
                <Link href="/shop" className="inline-block mt-4 px-6 py-2.5 bg-orange text-white rounded-full text-sm font-semibold hover:bg-orange-light transition-colors">
                  Start Shopping
                </Link>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h2 className="font-display font-medium text-ink text-xl mb-6">My Wishlist</h2>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-cream-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">♡</span>
                </div>
                <p className="text-muted">Your wishlist is empty.</p>
                <Link href="/shop" className="inline-block mt-4 px-6 py-2.5 bg-orange text-white rounded-full text-sm font-semibold hover:bg-orange-light transition-colors">
                  Browse Records
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}