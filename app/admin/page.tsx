"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  artist: string;
  genre: string;
  year: number;
  price: number;
  stock: number;
  image_url: string;
  description: string;
  rating: number;
}

const ADMIN_PASSWORD = "zonetempo2024";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [wishlistRequests, setWishlistRequests] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", artist: "", genre: "", year: "", price: "", stock: "", image_url: "", description: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (authed) {
      fetchProducts();
      fetchWishlist();
    }
  }, [authed]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const fetchWishlist = async () => {
    const { data } = await supabase.from("vinyl_requests").select("*").order("votes", { ascending: false });
    if (data) setWishlistRequests(data);
  };

  const handleSave = async () => {
    const payload = {
      title: form.title,
      artist: form.artist,
      genre: form.genre,
      year: Number(form.year),
      price: Number(form.price),
      stock: Number(form.stock),
      image_url: form.image_url,
      description: form.description,
    };

    if (editingProduct) {
      await supabase.from("products").update(payload).eq("id", editingProduct.id);
    } else {
      await supabase.from("products").insert(payload);
    }

    setForm({ title: "", artist: "", genre: "", year: "", price: "", stock: "", image_url: "", description: "" });
    setEditingProduct(null);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      artist: product.artist,
      genre: product.genre,
      year: String(product.year),
      price: String(product.price),
      stock: String(product.stock),
      image_url: product.image_url || "",
      description: product.description || "",
    });
    setShowForm(true);
    setActiveTab("products");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const handleDeleteRequest = async (id: string) => {
    await supabase.from("vinyl_requests").delete().eq("id", id);
    fetchWishlist();
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <h1 className="font-display text-2xl font-medium text-ink mb-2">Admin Panel</h1>
          <p className="text-muted text-sm mb-6">Zonetempo</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && password === ADMIN_PASSWORD && setAuthed(true)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink outline-none focus:border-orange transition-colors text-sm"
              />
            </div>
            <button
              onClick={() => password === ADMIN_PASSWORD ? setAuthed(true) : alert("Wrong password")}
              className="w-full py-3 bg-orange text-white rounded-full font-semibold hover:bg-orange-light transition-colors"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-dark">
      {/* Top bar */}
      <div className="bg-ink px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-cream text-xl font-medium">Zonetempo Admin</h1>
          <span className="px-2 py-0.5 bg-orange rounded text-white text-xs font-mono">ADMIN</span>
        </div>
        <Link href="/" className="text-cream/50 hover:text-cream text-sm transition-colors">Back to site</Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {saved && (
          <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm font-medium">
            Product saved successfully!
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white rounded-2xl mb-8 w-fit shadow-card">
          {["products", "wishlist"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all capitalize ${activeTab === tab ? "bg-ink text-cream" : "text-muted hover:text-ink"}`}
            >
              {tab === "wishlist" ? "Wishlist Requests" : "Products"}
              {tab === "wishlist" && wishlistRequests.length > 0 && (
                <span className="ml-2 w-5 h-5 bg-orange text-white text-xs rounded-full inline-flex items-center justify-center">{wishlistRequests.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-medium text-ink text-2xl">Products <span className="text-muted text-lg font-sans">({products.length})</span></h2>
              <button
                onClick={() => { setEditingProduct(null); setForm({ title: "", artist: "", genre: "", year: "", price: "", stock: "", image_url: "", description: "" }); setShowForm(!showForm); }}
                className="px-5 py-2.5 bg-orange text-white rounded-full text-sm font-semibold hover:bg-orange-light transition-colors"
              >
                + Add Product
              </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
                <h3 className="font-display font-medium text-ink text-lg mb-5">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Title</label>
                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Album title" className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink outline-none focus:border-orange transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Artist</label>
                    <input type="text" value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} placeholder="Artist name" className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink outline-none focus:border-orange transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Genre</label>
                    <input type="text" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} placeholder="e.g. Jazz" className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink outline-none focus:border-orange transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Year</label>
                    <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="e.g. 1973" className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink outline-none focus:border-orange transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Price ($)</label>
                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. 34.99" className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink outline-none focus:border-orange transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Stock</label>
                    <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="e.g. 10" className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink outline-none focus:border-orange transition-colors text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-ink mb-1.5">Image URL</label>
                    <input type="text" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink outline-none focus:border-orange transition-colors text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-ink mb-1.5">Description</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Album description..." rows={3} className="w-full px-4 py-3 bg-cream rounded-xl border border-ink/10 text-ink outline-none focus:border-orange transition-colors text-sm resize-none" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSave} className="px-6 py-2.5 bg-orange text-white rounded-full text-sm font-semibold hover:bg-orange-light transition-colors">Save Product</button>
                  <button onClick={() => { setShowForm(false); setEditingProduct(null); }} className="px-6 py-2.5 border border-ink/20 rounded-full text-sm font-medium hover:border-orange hover:text-orange transition-colors">Cancel</button>
                </div>
              </div>
            )}

            {/* Products Table */}
            {loading ? (
              <div className="text-center py-12 text-muted">Loading products...</div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ink/10">
                      <th className="text-left px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider">Product</th>
                      <th className="text-left px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider">Genre</th>
                      <th className="text-left px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider">Price</th>
                      <th className="text-left px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider">Stock</th>
                      <th className="text-right px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, i) => (
                      <tr key={product.id} className={`border-b border-ink/5 hover:bg-cream/50 transition-colors ${i % 2 === 0 ? "" : "bg-cream/30"}`}>
                        <td className="px-6 py-4">
                          <p className="font-medium text-ink text-sm">{product.title}</p>
                          <p className="text-muted text-xs">{product.artist}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted">{product.genre}</td>
                        <td className="px-6 py-4 text-sm font-mono text-ink">${Number(product.price).toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-mono px-2 py-1 rounded-full ${product.stock > 5 ? "bg-green-100 text-green-700" : product.stock > 0 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                            {product.stock} left
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleEdit(product)} className="text-xs font-medium text-ink hover:text-orange transition-colors mr-4">Edit</button>
                          <button onClick={() => handleDelete(product.id)} className="text-xs font-medium text-muted hover:text-red-500 transition-colors">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div>
            <h2 className="font-display font-medium text-ink text-2xl mb-6">Wishlist Requests</h2>
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink/10">
                    <th className="text-left px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider">Record</th>
                    <th className="text-left px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider">Genre</th>
                    <th className="text-left px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider">Requested By</th>
                    <th className="text-left px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider">Votes</th>
                    <th className="text-right px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistRequests.map((req, i) => (
                    <tr key={req.id} className={`border-b border-ink/5 hover:bg-cream/50 transition-colors ${i % 2 === 0 ? "" : "bg-cream/30"}`}>
                      <td className="px-6 py-4">
                        <p className="font-medium text-ink text-sm">{req.title}</p>
                        <p className="text-muted text-xs">{req.artist}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">{req.genre}</td>
                      <td className="px-6 py-4 text-sm text-muted">{req.requested_by}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono font-bold text-orange">{req.votes} votes</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteRequest(req.id)} className="text-xs font-medium text-muted hover:text-red-500 transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}