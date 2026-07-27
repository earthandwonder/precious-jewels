"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Scroll-driven Earth zoom-out.
 * Earth starts large and centered (filling the view), then shrinks
 * to its reference-object size as the reader scrolls into Part I.
 * Reverse of the Act 3 zoom-in to human scale.
 */
export default function EarthIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = vh - rect.top;
      const total = rect.height + vh;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Phase 1 (0–0.3): Earth fades in large
  // Phase 2 (0.3–0.8): Earth shrinks from ~300px to ~60px
  // Phase 3 (0.8–1.0): Label + context text fade in
  const earthFadeIn = Math.min(1, progress / 0.2);
  const shrinkProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.5));
  const eased = shrinkProgress * shrinkProgress * (3 - 2 * shrinkProgress);
  const earthSize = Math.round(280 - eased * 220); // 280px → 60px
  const labelOpacity = Math.max(0, Math.min(1, (progress - 0.6) / 0.15));
  const textOpacity = Math.max(0, Math.min(1, (progress - 0.7) / 0.15));
  const overallFade = progress > 0.9 ? Math.max(0, (1 - progress) / 0.1) : 1;

  const o = "#5b8cbf";
  const l = "#5a9a5a";

  return (
    <div
      ref={containerRef}
      className="relative z-10"
      style={{ height: "200vh" }}
    >
      <div className="interstitial-sticky">
        <div
          className="flex flex-col items-center justify-center px-6"
          style={{ opacity: earthFadeIn * overallFade }}
        >
          {/* Earth — shrinks with scroll */}
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
            If we collected all the precious stones across the whole universe, we'd need to think on planet-sized scales.
          </p>
        </div>
      </div>
    </div>
  );
}
