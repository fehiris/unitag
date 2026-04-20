import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, LayoutGrid, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/store/cart";

type Tab = {
  to: "/" | "/kategori" | "/keranjang" | "/profil";
  label: string;
  icon: typeof Home;
  badge?: boolean;
};

const tabs: Tab[] = [
  { to: "/", label: "Beranda", icon: Home },
  { to: "/kategori", label: "Kategori", icon: LayoutGrid },
  { to: "/keranjang", label: "Keranjang", icon: ShoppingBag, badge: true },
  { to: "/profil", label: "Profil", icon: User },
];

export function BottomNav() {
  const location = useLocation();
  const count = useCart((s) => s.count());
  const [cartPulse, setCartPulse] = useState(0);

  const handleNavPress = (to: Tab["to"]) => {
    if (location.pathname !== to) {
      window.dispatchEvent(new CustomEvent("nav:transition-start"));
    }
  };

  useEffect(() => {
    const handleCartBump = () => setCartPulse((value) => value + 1);

    window.addEventListener("cart:bump", handleCartBump);
    return () => window.removeEventListener("cart:bump", handleCartBump);
  }, []);

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 glass shadow-nav safe-bottom md:absolute md:left-0 md:translate-x-0 md:rounded-b-[2.5rem]">
      <div className="flex items-center justify-around px-2 pt-2 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = location.pathname === tab.to;
          const isCartTab = tab.to === "/keranjang";
          return (
            <Link
              key={tab.to}
              to={tab.to}
              onClick={() => handleNavPress(tab.to)}
              className="relative flex flex-1 flex-col items-center gap-1 py-1.5"
            >
              <div className="relative" data-cart-target={isCartTab || undefined}>
                <motion.div
                  animate={{
                    scale:
                      isCartTab && cartPulse > 0
                        ? [active ? 1.15 : 1, 1.28, active ? 1.15 : 1]
                        : active
                          ? 1.15
                          : 1,
                    y:
                      isCartTab && cartPulse > 0
                        ? [active ? -2 : 0, -6, active ? -2 : 0]
                        : active
                          ? -2
                          : 0,
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
