"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Order {
  id: string;
  total: number;
  status: string;
  created_at: string;
  order_items: {
    id: string;
    quantity: number;
    price: number;
    product_id: string;
    products: {
      title: string;
      artist: string;
      image_url: string;
    };
  }[];
}

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
      if (data.user) fetchOrders(data.user.id);
    });
  }, []);

  const fetchOrders = async (userId: string) => {
    setOrdersLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*, order_items(*, products(title, artist, image_url))")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (data) setOrders(data);
    setOrdersLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-700";
      case "shipped": return "bg-blue-100 text-blue-700";
      case "processing": return "bg-amber-100 text-amber-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-ink/10 text-ink/60";
    }
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
            <Link href="/auth" className="px-8 py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors">Sign In</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "orders", label: `Orders${orders.length > 0 ? ` (${orders.length})` : ""}` },
    { id: "wishlist", label: "Wishlist" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="section-label block mb-2">My Account</span>
              <h1 className="font-display font-medium text-ink text-4xl">Welcome back</h1>
              <p className="text-muted mt-1 text-sm">{user.email}</p>
            </div>
            <button onClick={handleSignOut} className="px-5 py-2.5 border border-ink/20 rounded-full text-sm font-medium hover:border-orange hover:text-orange transition-colors">
              Sign Out
            </button>
          </div>

          <div className="flex gap-1 p-1 bg-cream-dark rounded-2xl mb-8 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"}`}
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
                  <input type="email" value={user.email} disabled className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink/60 text-sm cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Member Since</label>
                  <input type="text" value={new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} disabled className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink/60 text-sm cursor-not-allowed" />
                </div>
                <div className="pt-4">
                  <button className="px-6 py-2.5 bg-orange text-white rounded-full text-sm font-semibold hover:bg-orange-light transition-colors">Change Password</button>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div>
              {ordersLoading ? (
                <div className="text-center py-12 text-muted">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-card p-8 text-center py-12">
                  <div className="w-16 h-16 bg-cream-dark rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📦</span>
                  </div>
                  <p className="text-muted">No orders yet.</p>
                  <Link href="/shop" className="inline-block mt-4 px-6 py-2.5 bg-orange text-white rounded-full text-sm font-semibold hover:bg-orange-light transition-colors">Start Shopping</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl shadow-card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs font-mono text-muted mb-1">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                          <p className="text-xs text-muted">{new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColor(order.status)}`}>{order.status}</span>
                          <span className="font-mono font-semibold text-ink">${Number(order.total).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {order.order_items?.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            {item.products?.image_url && (
                              <img src={item.products.image_url} alt={item.products?.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-ink truncate">{item.products?.title}</p>
                              <p className="text-xs text-muted">{item.products?.artist}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-mono text-ink">${Number(item.price).toFixed(2)}</p>
                              <p className="text-xs text-muted">x{item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                <Link href="/shop" className="inline-block mt-4 px-6 py-2.5 bg-orange text-white rounded-full text-sm font-semibold hover:bg-orange-light transition-colors">Browse Records</Link>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}