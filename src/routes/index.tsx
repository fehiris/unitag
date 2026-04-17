import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bell, Search } from "lucide-react";
import { BannerCarousel } from "@/components/BannerCarousel";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/")({
  component: BerandaPage,
});

function BerandaPage() {
  const flashSale = products.filter((p) => p.flashSale);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-gradient-hero px-4 pt-6 pb-12 safe-top">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-white/80">Halo, Selamat datang 👋</p>
            <h1 className="text-lg font-bold text-white">GadgetKu</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md"
            aria-label="Notifikasi"
          >
            <Bell className="h-5 w-5 text-white" />
          </motion.button>
        </div>
        <Link
          to="/kategori"
          className="mt-4 flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 shadow-soft"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Cari kabel, earbuds, casing...
          </span>
        </Link>
      </div>

      {/* Banner */}
      <div className="-mt-8">
        <BannerCarousel />
      </div>

      {/* Categories */}
      <section className="px-4">
        <h2 className="mb-3 text-sm font-semibold">Kategori</h2>
        <div className="grid grid-cols-6 gap-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl shadow-soft"
                style={{ backgroundColor: cat.color }}
              >
                {cat.icon}
              </div>
              <span className="text-[10px] text-foreground">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section>
        <div className="mb-3 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">⚡ Flash Sale</span>
            <CountdownTimer hours={5} />
          </div>
          <Link to="/kategori" className="text-xs font-medium text-primary">
            Lihat Semua
          </Link>
        </div>
        <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-1">
          {flashSale.map((p, i) => (
            <div key={p.id} className="w-36 shrink-0">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-4">
        <h2 className="mb-3 text-base font-bold">Untuk Kamu</h2>
        <div className="grid grid-cols-2 gap-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
