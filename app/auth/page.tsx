"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    if (tab === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else window.location.href = "/account";
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else window.location.href = "/account";
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/account`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <span className="section-label block mb-2">My Account</span>
            <h1 className="font-display text-4xl font-medium text-ink">
              {tab === "signin" ? "Welcome back" : "Join Zonetempo"}
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8">
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-cream rounded-xl mb-6">
              <button
                onClick={() => setTab("signin")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === "signin" ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("signup")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === "signup" ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"}`}
              >
                Create Account
              </button>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogle}
              className="w-full py-3 border border-ink/15 rounded-full font-medium text-sm text-ink hover:border-orange hover:text-orange transition-colors flex items-center justify-center gap-3 mb-5"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.01c-.72.48-1.63.76-2.7.76-2.08 0-3.84-1.4-4.47-3.29H1.85v2.07A8 8 0 0 0 8.98 17z"/>
                <path fill="#FBBC05" d="M4.51 10.52A4.8 4.8 0 0 1 4.26 9c0-.53.09-1.04.25-1.52V5.41H1.85A8 8 0 0 0 .98 9c0 1.29.31 2.51.87 3.59l2.66-2.07z"/>
                <path fill="#EA4335" d="M8.98 3.58c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 8.98 1a8 8 0 0 0-7.13 4.41l2.66 2.07c.63-1.89 2.39-3.9 4.47-3.9z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-ink/10" />
              <span className="text-xs text-muted">or</span>
              <div className="flex-1 h-px bg-ink/10" />
            </div>

            {/* Form */}
            <div className="space-y-4">
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
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink placeholder-muted outline-none focus:border-orange transition-colors text-sm"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {message && <p className="text-green-600 text-sm">{message}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors disabled:opacity-60"
              >
                {loading ? "Please wait..." : tab === "signin" ? "Sign In" : "Create Account"}
              </button>
            </div>

            <p className="text-center text-sm text-muted mt-6">
              <Link href="/" className="hover:text-orange transition-colors">Back to store</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}