import { useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <div
      key={location.pathname}
      className="w-full animate-fade-in"
    >
      {children}
    </div>
  );
}
