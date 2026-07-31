"use client";

import { useEffect, useState } from "react";

/**
 * Heliosphere intro — auto-animates when snapped into view.
 * The heliosphere starts large, shrinks to reference size, then label + text fade in.
 * Sets up the first scale reference for Act 1 materials.
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

  const size = 280;
  const labelOpacity = Math.max(0, Math.min(1, (progress - 0.5) / 0.2));
  const textOpacity = Math.max(0, Math.min(1, (progress - 0.65) / 0.2));

  const c = "#9a8edf";

  return (
    <div className="flex flex-col items-center justify-center px-6 w-full h-full">
      {/* Heliosphere */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        style={{ opacity: Math.max(0.3, Math.min(1, progress / 0.3)) }}
      >
        {/* Outer boundary — the heliopause */}
        <circle cx="20" cy="20" r="18" stroke={c} strokeWidth="0.7" strokeOpacity="1" strokeDasharray="2 1.5" />
        {/* Inner shock wave */}
        <circle cx="20" cy="20" r="12" stroke={c} strokeWidth="0.5" strokeOpacity="0.85" strokeDasharray="1.5 1" />
        {/* Solar wind region */}
        <circle cx="20" cy="20" r="6" stroke={c} strokeWidth="0.4" strokeOpacity="0.7" />
        {/* Sun at centre */}
        <circle cx="20" cy="20" r="1.5" fill="#e8a840" opacity="1" />
        <circle cx="20" cy="20" r="0.6" fill="#ffd080" opacity="1" />
        {/* Voyager trajectory hint */}
        <line x1="20" y1="20" x2="35" y2="10" stroke={c} strokeWidth="0.4" strokeOpacity="0.8" strokeDasharray="0.8 0.8" />
        <circle cx="34" cy="11" r="0.8" fill={c} opacity="0.9" />
      </svg>

      {/* Label */}
      <p
        className="act-number mt-4 tracking-[0.3em]"
        style={{
          opacity: labelOpacity,
          color: "rgba(180, 170, 240, 1)",
        }}
      >
        Voyager 1
      </p>

      {/* Context */}
      <p
        className="font-editorial text-xl md:text-2xl italic mt-6 max-w-md text-center leading-relaxed"
        style={{
          opacity: textOpacity,
          color: "rgba(210, 222, 238, 0.95)",
        }}
      >
        Take a sphere the size of Voyager 1's distance from the Sun. Then pile every piece of each gem in the universe next to it.
      </p>
    </div>
  );
}
