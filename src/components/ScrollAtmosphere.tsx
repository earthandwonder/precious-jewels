"use client";

/**
 * Full-viewport fixed overlay that shifts background color temperature
 * from cold blue-black (cosmic minerals) to warm amber-black (biological).
 * Accepts a normalized progress (0-1) from the snap container.
 */
export default function ScrollAtmosphere({ progress }: { progress: number }) {
  const warmth = Math.max(0, Math.min(1, (progress - 0.25) / 0.6));
  const eased = warmth * warmth * (3 - 2 * warmth); // smoothstep

  const blueR = 20 + eased * 15;
  const blueG = 25 + eased * 10;
  const blueB = 50 - eased * 30;

  const warmR = 40;
  const warmG = 25;
  const warmB = 15;

  const r = Math.round(blueR + eased * (warmR - blueR));
  const g = Math.round(blueG + eased * (warmG - blueG));
  const b = Math.round(blueB + eased * (warmB - blueB));
  const opacity = 0.25 + eased * 0.15;

  return (
    <div
      className="scroll-atmosphere"
      style={{
        background: `radial-gradient(ellipse 120% 80% at 50% 60%, rgba(${r}, ${g}, ${b}, ${opacity}) 0%, transparent 70%)`,
      }}
    />
  );
}
