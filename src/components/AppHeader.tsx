import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

type Props = {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  transparent?: boolean;
};

export function AppHeader({ title, showBack, showSearch, transparent }: Props) {
  const router = useRouter();
  return (
    <header
      className={`sticky top-0 z-30 safe-top ${
        transparent ? "bg-transparent" : "glass shadow-soft"
      }`}
    >
      <div className="flex h-14 items-center gap-2 px-4">
        {showBack && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => router.history.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-soft"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
        )}
        {title && (
          <h1 className="flex-1 text-base font-semibold text-foreground">{title}</h1>
        )}
        {!title && <div className="flex-1" />}
        {showSearch && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-soft"
            aria-label="Cari"
          >
            <Search className="h-5 w-5" />
          </motion.button>
        )}
      </div>
    </header>
  );
}
