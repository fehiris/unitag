import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type FlyToCartOptions = {
  image: string;
  sourceRect: DOMRect;
};

type Flight = {
  id: number;
  image: string;
  size: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  rotate: number;
};

type FlyToCartContextValue = {
  flyToCart: (options: FlyToCartOptions) => void;
};

const FlyToCartContext = createContext<FlyToCartContextValue>({
  flyToCart: () => undefined,
});

export function FlyToCartProvider({ children }: { children: ReactNode }) {
  const [flights, setFlights] = useState<Flight[]>([]);

  const flyToCart = useCallback(({ image, sourceRect }: FlyToCartOptions) => {
    if (typeof document === "undefined") return;

    const target = document.querySelector<HTMLElement>('[data-cart-target="true"]');
    if (!target) return;

    const targetRect = target.getBoundingClientRect();
    const size = Math.max(48, Math.min(76, sourceRect.width * 0.72));
    const id = Date.now() + Math.random();

    setFlights((current) => [
      ...current,
      {
        id,
        image,
        size,
        startX: sourceRect.left + sourceRect.width / 2 - size / 2,
        startY: sourceRect.top + sourceRect.height / 2 - size / 2,
        endX: targetRect.left + targetRect.width / 2 - size * 0.18,
        endY: targetRect.top + targetRect.height / 2 - size * 0.18,
        rotate: Math.random() > 0.5 ? 10 : -10,
      },
    ]);
  }, []);

  const value = useMemo(() => ({ flyToCart }), [flyToCart]);

  return (
    <FlyToCartContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
        <AnimatePresence>
          {flights.map((flight) => (
            <motion.div
              key={flight.id}
              className="fixed left-0 top-0"
              style={{ width: flight.size, height: flight.size }}
              initial={{
                x: flight.startX,
                y: flight.startY,
                scale: 1,
                opacity: 0.96,
                rotate: 0,
              }}
              animate={{
                x: flight.endX,
                y: flight.endY,
                scale: 0.22,
                opacity: 0.2,
                rotate: flight.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => {
                setFlights((current) => current.filter((item) => item.id !== flight.id));
                window.dispatchEvent(new CustomEvent("cart:bump"));
              }}
            >
              <div className="h-full w-full overflow-hidden rounded-2xl border border-border bg-card shadow-elevated ring-1 ring-primary/10">
                <img
                  src={flight.image}
                  alt="Produk menuju keranjang"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </FlyToCartContext.Provider>
  );
}

export function useFlyToCart() {
  return useContext(FlyToCartContext);
}