import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Home, LayoutGrid, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/store/cart";

const tabs = [
  { to: "/", label: "Beranda", icon: Home },
  { to: "/kategori", label: "Kategori", icon: LayoutGrid },
  { to: "/keranjang", label: "Keranjang", icon: ShoppingBag, badge: true },
  { to: "/profil", label: "Profil", icon: User },
] as const;

export function BottomNav() {
  const location = useLocation();
  const count = useCart((s) => s.count());

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass shadow-nav safe-bottom">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 pt-2 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = location.pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className="relative flex flex-1 flex-col items-center gap-1 py-1.5"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: active ? 1.15 : 1,
                    y: active ? -2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-colors ${
                    active
                      ? "bg-gradient-primary text-primary-foreground shadow-elevated"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                </motion.div>
                {tab.badge && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground"
                  >
                    {count}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
