"use client";

import { useEffect, useState } from "react";

interface InterstitialProps {
  heading: string;
  body: string;
  partLabel?: string;
  isActive: boolean;
}

export default function Interstitial({
  heading,
  body,
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
        {/* Part label */}
        {partLabel && (
          <p
            className={`snap-animate snap-animate-delay-1 act-number mb-10 tracking-[0.3em] ${active ? "is-active" : ""}`}
            style={{ color: "rgba(255, 210, 170, 0.75)" }}
          >
            {partLabel}
          </p>
        )}

        {/* Heading */}
        <h2
          className={`snap-animate snap-animate-delay-2 font-editorial text-3xl md:text-4xl lg:text-5xl font-medium mb-8 leading-[1.1] italic ${active ? "is-active" : ""}`}
          style={{ color: "#ffecd2" }}
        >
          {heading}
        </h2>

        {/* Body */}
        <p
          className={`snap-animate snap-animate-delay-3 text-base md:text-lg leading-[1.9] max-w-md mx-auto ${active ? "is-active" : ""}`}
          style={{ color: "rgba(255, 236, 210, 0.88)" }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}
