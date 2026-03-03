"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else setMessage("Logged in successfully! Redirecting...");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage("Account created! Check your email to confirm.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-3xl font-medium text-ink">
            Zonetempo
          </Link>
          <p className="text-muted text-sm mt-2">Your vinyl record store</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-card p-8">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-cream-dark rounded-2xl mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === "login" ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === "signup" ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              Create Account
            </button>
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
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink placeholder-muted outline-none focus:border-orange transition-colors text-sm"
              />
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">
                {message}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </div>

          {mode === "login" && (
            <p className="text-center text-sm text-muted mt-6">
              Don't have an account?{" "}
              <button onClick={() => setMode("signup")} className="text-orange hover:underline font-medium">
                Sign up
              </button>
            </p>
          )}
        </div>

        <p className="text-center text-sm text-muted mt-6">
          <Link href="/" className="hover:text-orange transition-colors">
            ← Back to store
          </Link>
        </p>
      </div>
    </div>
  );
}