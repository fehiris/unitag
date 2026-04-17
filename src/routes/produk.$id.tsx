import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, Share2, ShoppingBag, Check } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { products, formatRupiah } from "@/data/products";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/produk/$id")({
  component: ProdukDetail,
});

function ProdukDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const addItem = useCart((s) => s.addItem);
  const [variant, setVariant] = useState(product?.variants[0] ?? "");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-muted-foreground">Produk tidak ditemukan</p>
        <Link to="/" className="mt-4 inline-block text-primary">
          Kembali ke beranda
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuy = () => {
    addItem(product, variant);
    navigate({ to: "/keranjang" });
  };

  return (
    <div className="pb-28">
      <AppHeader showBack transparent />

      {/* Hero image */}
      <motion.div
        layoutId={`product-${product.id}`}
        className="relative -mt-14 aspect-square overflow-hidden bg-card"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute right-3 top-16 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-soft"
            aria-label="Favoritkan"
          >
            <Heart className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-soft"
            aria-label="Bagikan"
          >
            <Share2 className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="-mt-4 rounded-t-3xl bg-card px-4 pt-5 shadow-card"
      >
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-primary">
            {formatRupiah(product.price)}
          </span>
          {product.oldPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {formatRupiah(product.oldPrice)}
              </span>
              <span className="rounded-md bg-accent-soft px-1.5 py-0.5 text-[10px] font-bold text-accent">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            </>
          )}
        </div>
        <h1 className="mt-2 text-base font-semibold leading-snug text-foreground">
          {product.name}
        </h1>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="font-semibold text-foreground">{product.rating}</span>
          </div>
          <span>·</span>
          <span>{product.sold.toLocaleString("id-ID")} terjual</span>
        </div>

        {/* Varian */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-foreground">Pilih Varian</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const sel = v === variant;
              return (
                <motion.button
                  key={v}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setVariant(v)}
                  className={`relative rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    sel
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-border bg-card text-foreground"
                  }`}
                >
                  {v}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mt-6">
          <h2 className="mb-2 text-xs font-semibold">Deskripsi Produk</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>
      </motion.div>

      {/* Sticky bottom action */}
      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 glass shadow-nav safe-bottom">
        <div className="flex gap-2 p-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAdd}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary bg-card py-3 text-sm font-semibold text-primary"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Ditambah
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" /> + Keranjang
              </>
            )}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleBuy}
            className="flex flex-1 items-center justify-center rounded-full bg-gradient-primary py-3 text-sm font-bold text-primary-foreground shadow-elevated"
          >
            Beli Sekarang
          </motion.button>
        </div>
      </div>
    </div>
  );
}
