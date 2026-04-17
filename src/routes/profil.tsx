import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Heart,
  Star,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/profil")({
  component: ProfilPage,
  head: () => ({ meta: [{ title: "Profil — GadgetKu" }] }),
});

const stats = [
  { icon: ShoppingBag, label: "Pesanan", value: "12" },
  { icon: Heart, label: "Favorit", value: "8" },
  { icon: Star, label: "Ulasan", value: "5" },
];

const menus = [
  { icon: ShoppingBag, label: "Pesanan Saya" },
  { icon: MapPin, label: "Alamat Pengiriman" },
  { icon: CreditCard, label: "Metode Pembayaran" },
  { icon: Bell, label: "Notifikasi" },
  { icon: Settings, label: "Pengaturan" },
  { icon: HelpCircle, label: "Bantuan" },
  { icon: LogOut, label: "Keluar", danger: true },
];

function ProfilPage() {
  return (
    <div>
      <AppHeader title="Profil" />

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 rounded-3xl bg-gradient-hero p-5 text-white shadow-elevated"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold backdrop-blur-md">
            AS
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold">Andi Setiawan</h2>
            <p className="text-xs opacity-90">andi@gadgetku.com</p>
            <span className="mt-1 inline-block rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md">
              ⭐ Member Gold
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center rounded-2xl bg-card p-3 shadow-soft"
          >
            <s.icon className="h-5 w-5 text-primary" />
            <span className="mt-1 text-base font-bold">{s.value}</span>
            <span className="text-[10px] text-muted-foreground">{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Menu list */}
      <div className="mx-4 mt-4 overflow-hidden rounded-2xl bg-card shadow-soft">
        {menus.map((m, i) => (
          <motion.button
            key={m.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.04 }}
            whileTap={{ scale: 0.98, backgroundColor: "var(--muted)" }}
            className={`flex w-full items-center gap-3 border-b border-border px-4 py-3.5 text-left last:border-b-0 ${
              m.danger ? "text-destructive" : "text-foreground"
            }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                m.danger ? "bg-destructive/10" : "bg-primary-soft"
              }`}
            >
              <m.icon
                className={`h-4 w-4 ${m.danger ? "text-destructive" : "text-primary"}`}
              />
            </div>
            <span className="flex-1 text-sm font-medium">{m.label}</span>
            {!m.danger && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </motion.button>
        ))}
      </div>

      <p className="mt-6 mb-4 text-center text-[10px] text-muted-foreground">
        GadgetKu v1.0.0
      </p>
    </div>
  );
}
