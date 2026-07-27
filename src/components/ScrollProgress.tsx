"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Color transitions from cool (top) to warm (bottom)
  const hue = 210 - progress * 1.8; // 210 (blue) → 30 (amber/gold)
  const color = `hsl(${Math.max(20, hue)}, 60%, 65%)`;

  return (
    <div
      className="scroll-progress"
      style={{
        width: `${progress}%`,
        background: `linear-gradient(90deg, hsl(210, 60%, 65%), ${color})`,
      }}
    />
  );
}
