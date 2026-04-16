"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  pricePerKg: number;
  salePrice?: number;
  image: string;
  unit: string;
  quantity: number;
  pieceLabel?: string;
  pieceKg?: number;
  linePrice: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (index: number) => void;
  updateQty: (index: number, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const idx = get().items.findIndex(i =>
          i.id === item.id && i.pieceLabel === item.pieceLabel
        );
        if (idx >= 0) {
          set(s => ({ items: s.items.map((i, j) => j === idx ? { ...i, quantity: i.quantity + 1 } : i) }));
        } else {
          set(s => ({ items: [...s.items, { ...item, quantity: 1 }] }));
        }
      },
      removeItem: (index) => set(s => ({ items: s.items.filter((_, i) => i !== index) })),
      updateQty: (index, qty) => {
        if (qty <= 0) { get().removeItem(index); return; }
        set(s => ({ items: s.items.map((i, j) => j === index ? { ...i, quantity: qty } : i) }));
      },
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.linePrice * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "meatxpress-cart-v2" }
  )
);
