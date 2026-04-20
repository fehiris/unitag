import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/AppHeader";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/kategori")({
  component: KategoriPage,
  head: () => ({
    meta: [{ title: "Kategori — uniTAG" }],
  }),
});

function KategoriPage() {
  const [active, setActive] = useState<string>("semua");
  const filtered =
    active === "semua" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <AppHeader title="Kategori" showSearch />
      <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 py-3">
        {[{ id: "semua", name: "Semua", icon: "🔥" }, ...categories].map((c) => {
          const isActive = active === c.id;
          return (
            <motion.button
              key={c.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActive(c.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-gradient-primary text-primary-foreground shadow-elevated"
                  : "bg-card text-foreground shadow-soft"
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pt-2">
        {filtered.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          Belum ada produk di kategori ini.
        </div>
      )}
    </div>
  );
}
