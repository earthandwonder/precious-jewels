"use client";

import { useRef, useEffect, useState } from "react";

interface InterstitialProps {
  heading: string;
  body: string;
  multiplierLabel: string;
  multiplierValue: string;
}

export default function Interstitial({
  heading,
  body,
  multiplierLabel,
  multiplierValue,
}: InterstitialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-10 py-24 md:py-36 px-6"
    >
      <div
        className="max-w-xl mx-auto text-center transition-all duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <p className="act-number text-muted mb-6 tracking-widest">
          {multiplierLabel}
        </p>
        <p
          className="text-4xl md:text-6xl font-bold font-mono mb-8"
          style={{ color: "#ffecd2" }}
        >
          {multiplierValue}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-accent">
          {heading}
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-muted">
          {body}
        </p>
      </div>
    </div>
  );
}
