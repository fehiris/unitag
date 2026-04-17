import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export type CartItem = {
  id: string;
  product: Product;
  qty: number;
  variant: string;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, variant: string, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variant, qty = 1) => {
        const id = `${product.id}-${variant}`;
        const existing = get().items.find((i) => i.id === id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, qty: i.qty + qty } : i,
            ),
          });
        } else {
          set({ items: [...get().items, { id, product, variant, qty }] });
        }
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      updateQty: (id, qty) =>
        set({
          items: get()
            .items.map((i) => (i.id === id ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        }),
      clear: () => set({ items: [] }),
      total: () =>
        get().items.reduce((s, i) => s + i.product.price * i.qty, 0),
      count: () => get().items.reduce((s, i) => s + i.qty, 0),
    }),
    { name: "gadgetku-cart" },
  ),
);
