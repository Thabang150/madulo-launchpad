import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function parts(now: number, target: number): Parts {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    done: diff <= 0,
  };
}

/**
 * Live countdown to siteConfig.launchDate (interpreted with its SAST offset).
 * Renders nothing client-dependent on the server — digits appear on mount.
 */
export function CountdownTimer({ dark = true }: { dark?: boolean }) {
  const target = new Date(siteConfig.launchDate).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(id);
  }, []);

  const p = now === null ? null : parts(now, target);

  const cells: { label: string; value: string | null }[] = [
    { label: "Days", value: p ? String(p.days) : null },
    { label: "Hours", value: p ? String(p.hours).padStart(2, "0") : null },
    { label: "Minutes", value: p ? String(p.minutes).padStart(2, "0") : null },
    { label: "Seconds", value: p ? String(p.seconds).padStart(2, "0") : null },
  ];

  if (p?.done) {
    return <p className="eyebrow">We are live</p>;
  }

  return (
    <div role="timer" aria-live="off" aria-label="Countdown to launch" className="w-full">
      <div className="grid grid-cols-4 gap-3 sm:gap-5">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className={`flex flex-col items-center border px-2 py-6 sm:py-8 ${
              dark ? "border-primary-foreground/15" : "border-border bg-card"
            }`}
          >
            <span
              className={`font-display text-4xl tabular-nums sm:text-6xl md:text-7xl ${
                dark ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              {cell.value ?? "\u2013"}
            </span>
            <span
              className={`mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] ${
                dark ? "text-primary-foreground/50" : "text-muted-foreground"
              }`}
            >
              {cell.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
