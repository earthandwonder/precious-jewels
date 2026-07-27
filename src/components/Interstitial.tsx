"use client";

import { useEffect, useState } from "react";

interface InterstitialProps {
  heading: string;
  body: string;
  multiplierLabel: string;
  multiplierValue: string;
  partLabel?: string;
  isActive: boolean;
}

export default function Interstitial({
  heading,
  body,
  multiplierLabel,
  multiplierValue,
  partLabel,
  isActive,
}: InterstitialProps) {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  const active = hasAnimated;

  return (
    <div className="interstitial-content">
      <div className="max-w-xl mx-auto text-center px-6">
        {/* Multiplier label */}
        <p
          className={`snap-animate snap-animate-delay-1 act-number mb-8 tracking-[0.3em] ${active ? "is-active" : ""}`}
          style={{ color: "rgba(255, 210, 170, 0.75)" }}
        >
          {multiplierLabel}
        </p>

        {/* The big number */}
        <p
          className={`snap-animate snap-animate-delay-2 font-editorial text-5xl md:text-7xl lg:text-8xl font-medium mb-12 leading-none ${active ? "is-active" : ""}`}
          style={{ color: "#ffecd2" }}
        >
          {multiplierValue}
        </p>

        {/* Heading */}
        <h2
          className={`snap-animate snap-animate-delay-3 font-editorial text-3xl md:text-4xl lg:text-5xl font-medium mb-6 leading-[1.1] italic ${active ? "is-active" : ""}`}
          style={{ color: "#ffecd2" }}
        >
          {heading}
        </h2>

        <hr
          className={`snap-animate snap-animate-delay-4 editorial-rule my-8 ${active ? "is-active" : ""}`}
        />

        {/* Body */}
        <p
          className={`snap-animate snap-animate-delay-5 text-base md:text-lg leading-[1.9] max-w-md mx-auto ${active ? "is-active" : ""}`}
          style={{ color: "rgba(255, 236, 210, 0.88)" }}
        >
          {body}
        </p>

        {/* Part label */}
        {partLabel && (
          <p
            className={`snap-animate snap-animate-delay-7 act-number mt-12 tracking-[0.3em] ${active ? "is-active" : ""}`}
            style={{ color: "rgba(255, 210, 170, 0.75)" }}
          >
            {partLabel}
          </p>
        )}
      </div>
    </div>
  );
}
