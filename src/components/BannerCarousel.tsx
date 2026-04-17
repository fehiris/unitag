import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";

const banners = [
  { img: banner1, title: "Aksesoris Premium", subtitle: "Diskon hingga 50%" },
  { img: banner2, title: "Flash Sale", subtitle: "Harga spesial hari ini" },
  { img: banner3, title: "Koleksi Terbaru", subtitle: "Smartwatch & gadget keren" },
];

export function BannerCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mx-4 overflow-hidden rounded-3xl shadow-card">
      <div className="relative aspect-[16/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <img
              src={banners[idx].img}
              alt={banners[idx].title}
              className="h-full w-full object-cover"
              width={1280}
              height={704}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-xl font-bold drop-shadow-lg"
              >
                {banners[idx].title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-sm opacity-90"
              >
                {banners[idx].subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
