"use client";

import { useEffect, useState } from "react";

/**
 * Earth zoom-out — auto-animates when snapped into view.
 * Earth starts large, shrinks to reference size, then label + text fade in.
 */
export default function EarthIntro({ isActive }: { isActive: boolean }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  // Animate progress from 0 to 1 over ~2s when active
  useEffect(() => {
    if (!hasAnimated) return;

    const start = performance.now();
    const duration = 2000;
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasAnimated]);

  const earthSize = Math.round(280 - progress * 220); // 280px -> 60px
  const labelOpacity = Math.max(0, Math.min(1, (progress - 0.5) / 0.2));
  const textOpacity = Math.max(0, Math.min(1, (progress - 0.65) / 0.2));

  const o = "#5b8cbf";
  const l = "#5a9a5a";

  return (
    <div className="flex flex-col items-center justify-center px-6 w-full h-full">
      {/* Earth */}
      <svg
        width={earthSize}
        height={earthSize}
        viewBox="0 0 40 40"
        fill="none"
        style={{ transition: "width 0.05s, height 0.05s" }}
      >
        <circle cx="20" cy="20" r="18.5" fill={o} opacity="0.06" />
        <circle cx="20" cy="20" r="16" stroke={o} strokeWidth="0.6" strokeOpacity="0.5" fill={o} fillOpacity="0.12" />
        <ellipse cx="20" cy="20" rx="10" ry="16" stroke={o} strokeWidth="0.3" strokeOpacity="0.2" />
        <ellipse cx="20" cy="20" rx="4" ry="16" stroke={o} strokeWidth="0.3" strokeOpacity="0.15" />
        <line x1="4" y1="20" x2="36" y2="20" stroke={o} strokeWidth="0.3" strokeOpacity="0.15" />
        <line x1="6" y1="13" x2="34" y2="13" stroke={o} strokeWidth="0.3" strokeOpacity="0.1" />
        <line x1="6" y1="27" x2="34" y2="27" stroke={o} strokeWidth="0.3" strokeOpacity="0.1" />
        <path d="M14 11 Q17 9 21 12 Q19 16 15 14 Z" fill={l} opacity="0.25" />
        <path d="M23 16 Q27 14 30 18 Q28 22 24 20 Z" fill={l} opacity="0.22" />
        <path d="M11 21 Q14 19 16 23 Q13 27 11 24 Z" fill={l} opacity="0.2" />
        <path d="M22 26 Q25 25 26 28 Q24 30 22 28 Z" fill={l} opacity="0.15" />
        <circle cx="13" cy="12" r="2.5" fill="white" opacity="0.06" />
      </svg>

      {/* Label */}
      <p
        className="act-number mt-4 tracking-[0.3em]"
        style={{
          opacity: labelOpacity * 0.6,
          color: "rgba(150, 180, 220, 0.6)",
        }}
      >
        Earth
      </p>

      {/* Context */}
      <p
        className="font-editorial text-lg md:text-xl italic mt-6 max-w-sm text-center leading-relaxed"
        style={{
          opacity: textOpacity,
          color: "rgba(200, 214, 230, 0.6)",
        }}
      >
        If we collected all the precious stones across the whole universe, we&apos;d need to think on planet-sized scales.
      </p>
    </div>
  );
}
