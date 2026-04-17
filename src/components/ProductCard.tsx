import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/data/products";
import { formatRupiah } from "@/data/products";

const formatSold = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}rb+` : `${n}`;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 200, damping: 22 }}
      whileTap={{ scale: 0.97, y: -2 }}
      className="overflow-hidden rounded-2xl bg-card shadow-soft"
    >
      <Link
        to="/produk/$id"
        params={{ id: product.id }}
        className="block"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
          {product.flashSale && (
            <span className="absolute left-2 top-2 rounded-full bg-gradient-flash px-2 py-0.5 text-[10px] font-bold text-white shadow-soft">
              ⚡ FLASH
            </span>
          )}
          {product.oldPrice && (
            <span className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>
        <div className="space-y-1 p-3">
          <h3 className="line-clamp-2 text-xs font-medium leading-tight text-foreground">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-primary">
              {formatRupiah(product.price)}
            </span>
          </div>
          {product.oldPrice && (
            <span className="text-[10px] text-muted-foreground line-through">
              {formatRupiah(product.oldPrice)}
            </span>
          )}
          <div className="flex items-center gap-1 pt-0.5 text-[10px] text-muted-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="font-medium text-foreground">{product.rating}</span>
            <span>·</span>
            <span>{formatSold(product.sold)} terjual</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
      <div className="aspect-square shimmer" />
      <div className="space-y-2 p-3">
        <div className="h-3 w-full rounded shimmer" />
        <div className="h-3 w-2/3 rounded shimmer" />
        <div className="h-4 w-1/2 rounded shimmer" />
      </div>
    </div>
  );
}
