"use client";

import { useEffect, useState } from "react";

/**
 * The pearl reveal — auto-animated entrance when snapped into view.
 * Slow, dramatic staggered reveal (~2.5s total).
 */
export default function Finale({ isActive }: { isActive: boolean }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const start = performance.now();
    const duration = 2500;
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = t * t * (3 - 2 * t);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasAnimated]);

  const labelOpacity = Math.min(1, Math.max(0, progress / 0.15));
  const glowOpacity = Math.min(1, Math.max(0, (progress - 0.1) / 0.15));
  const glowScale = 0.5 + glowOpacity * 0.5;
  const titleOpacity = Math.min(1, Math.max(0, (progress - 0.2) / 0.15));
  const titleY = (1 - titleOpacity) * 40;
  const ruleOpacity = Math.min(1, Math.max(0, (progress - 0.35) / 0.12));
  const bodyOpacity = Math.min(1, Math.max(0, (progress - 0.45) / 0.15));
  const comparisonOpacity = Math.min(1, Math.max(0, (progress - 0.6) / 0.15));

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="max-w-xl mx-auto text-center">
        <p
          className="act-number tracking-[0.3em] mb-12"
          style={{
            color: "rgba(255, 210, 170, 0.8)",
            opacity: labelOpacity,
          }}
        >
          The rarest wearable material in the known universe
        </p>

        {/* Pearl image with glow backdrop */}
        <div className="flex justify-center mb-12">
          <div
            className="relative"
            style={{
              width: 140,
              height: 140,
              opacity: glowOpacity,
              transform: `scale(${glowScale})`,
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(253, 235, 208, 0.25) 0%, rgba(253, 235, 208, 0.08) 50%, transparent 70%)",
                transform: "scale(1.5)",
              }}
            />
            <img
              src="/p/abundant-gems/pearl.png"
              alt="A natural pearl"
              className="relative w-full h-full object-contain drop-shadow-[0_0_30px_rgba(253,235,208,0.3)]"
              draggable={false}
            />
          </div>
        </div>

        <p
          className="font-editorial text-5xl md:text-7xl lg:text-8xl font-medium mb-8 italic leading-[1]"
          style={{
            color: "#FDEBD0",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          A natural pearl.
        </p>

        <hr
          className="editorial-rule my-10"
          style={{ opacity: ruleOpacity * 0.6 }}
        />

        <p
          className="font-editorial text-lg md:text-xl italic leading-relaxed mb-8 max-w-md mx-auto"
          style={{
            color: "rgba(253, 235, 208, 0.85)",
            opacity: bodyOpacity,
          }}
        >
          Not diamond. Not ruby. A small, quiet sphere built by a living
          creature, on the only planet known to have oceans, wrapped around an
          irritant grain by grain over years.
        </p>

        <p
          className="text-base leading-relaxed max-w-md mx-auto"
          style={{
            color: "rgba(255, 210, 170, 0.8)",
            opacity: comparisonOpacity,
          }}
        >
          Every natural pearl that has ever existed — across all of history
          — would fit inside a single room.
        </p>
      </div>
    </div>
  );
}
