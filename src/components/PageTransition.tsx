import { useLocation, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isNavigating = useRouterState({ select: (state) => state.status === "pending" });
  const [showMask, setShowMask] = useState(false);

  useEffect(() => {
    const handleNavStart = () => setShowMask(true);

    window.addEventListener("nav:transition-start", handleNavStart);
    return () => window.removeEventListener("nav:transition-start", handleNavStart);
  }, []);

  useEffect(() => {
    let timeout: number | undefined;

    if (isNavigating) {
      setShowMask(true);
    } else {
      timeout = window.setTimeout(() => setShowMask(false), 140);
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [isNavigating]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowMask(false), 180);
    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="relative isolate min-h-full w-full overflow-hidden">
      <div
        className={`min-h-full w-full bg-surface animate-fade-in transition-opacity duration-100 ${showMask ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </div>
      {showMask && (
        <div className="pointer-events-none absolute inset-0 z-20 bg-surface px-4 py-4">
          <div className="space-y-3 animate-fade-in">
            <div className="shimmer h-14 rounded-2xl" />
            <div className="shimmer h-40 rounded-3xl" />
            <div className="grid grid-cols-2 gap-3">
              <div className="shimmer h-32 rounded-2xl" />
              <div className="shimmer h-32 rounded-2xl" />
            </div>
            <div className="shimmer h-24 rounded-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
