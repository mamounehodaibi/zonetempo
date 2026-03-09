"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface CartItem {
  id: string;
  session_id: string;
  product_id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  condition: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  addToCart: (product: Omit<CartItem, "id" | "session_id">) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("zonetempo_session");
  if (!id) {
    id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("zonetempo_session", id);
  }
  return id;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const sessionId = getSessionId();
    const { data } = await supabase.from("cart_items").select("*").eq("session_id", sessionId);
    if (data) setItems(data);
    setLoading(false);
  };

  const addToCart = async (product: Omit<CartItem, "id" | "session_id">) => {
    const sessionId = getSessionId();
    const existing = items.find((i) => i.product_id === product.product_id);
    if (existing) {
      await updateQuantity(existing.id, existing.quantity + 1);
    } else {
      await supabase.from("cart_items").insert({ ...product, session_id: sessionId });
      fetchCart();
    }
  };

  const removeFromCart = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = async (id: string, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    await supabase.from("cart_items").update({ quantity: qty }).eq("id", id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = async () => {
    const sessionId = getSessionId();
    await supabase.from("cart_items").delete().eq("session_id", sessionId);
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, count: items.reduce((s, i) => s + i.quantity, 0), addToCart, removeFromCart, updateQuantity, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}