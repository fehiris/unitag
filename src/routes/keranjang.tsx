import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { useCart } from "@/store/cart";
import { formatRupiah } from "@/data/products";

export const Route = createFileRoute("/keranjang")({
  component: KeranjangPage,
  head: () => ({ meta: [{ title: "Keranjang — uniTAG" }] }),
});

function KeranjangPage() {
  const items = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);
  const total = useCart((s) => s.total());

  return (
    <div>
      <AppHeader title="Keranjang" />

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center px-4 py-20 text-center"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-soft">
            <ShoppingBag className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-4 text-base font-semibold">Keranjang masih kosong</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Yuk, mulai belanja dan isi keranjang kamu
          </p>
          <Link
            to="/"
            className="mt-6 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated"
          >
            Mulai Belanja
          </Link>
        </motion.div>
      ) : (
        <>
          <div className="space-y-3 px-4 pt-2 pb-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  className="flex gap-3 rounded-2xl bg-card p-3 shadow-soft"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-xs font-medium leading-tight">
                        {item.product.name}
                      </h3>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => removeItem(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      Varian: {item.variant}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="text-sm font-bold text-primary">
                        {formatRupiah(item.product.price * item.qty)}
                      </span>
                      <div className="flex items-center gap-2 rounded-full bg-secondary p-1">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-card text-foreground shadow-soft"
                        >
                          <Minus className="h-3 w-3" />
                        </motion.button>
                        <motion.span
                          key={item.qty}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="min-w-[20px] text-center text-xs font-bold tabular-nums"
                        >
                          {item.qty}
                        </motion.span>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-soft"
                        >
                          <Plus className="h-3 w-3" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout bar — bagian flow halaman supaya ikut exit transition tanpa "menggantung" */}
          <div className="sticky bottom-24 z-20 mx-4 mb-4">
            <div className="glass flex items-center justify-between gap-3 rounded-2xl p-3 shadow-elevated">
              <div>
                <p className="text-[10px] text-muted-foreground">Total Belanja</p>
                <motion.p
                  key={total}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="text-base font-extrabold text-primary"
                >
                  {formatRupiah(total)}
                </motion.p>
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => alert("Checkout berhasil! (mock)")}
                className="rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-elevated"
              >
                Checkout
              </motion.button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
