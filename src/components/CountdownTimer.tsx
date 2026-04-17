import { useEffect, useState } from "react";

export function CountdownTimer({ hours = 5 }: { hours?: number }) {
  const [time, setTime] = useState(hours * 3600);

  useEffect(() => {
    const t = setInterval(() => setTime((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = String(Math.floor(time / 3600)).padStart(2, "0");
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const s = String(time % 60).padStart(2, "0");

  const Box = ({ v }: { v: string }) => (
    <span className="rounded-md bg-foreground px-1.5 py-0.5 font-mono text-xs font-bold text-background tabular-nums">
      {v}
    </span>
  );

  return (
    <div className="flex items-center gap-1">
      <Box v={h} />
      <span className="text-xs font-bold text-foreground">:</span>
      <Box v={m} />
      <span className="text-xs font-bold text-foreground">:</span>
      <Box v={s} />
    </div>
  );
}
