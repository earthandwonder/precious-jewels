"use client";

export default function ScrollProgress({ progress }: { progress: number }) {
  // Color transitions from cool (top) to warm (bottom)
  const hue = 210 - progress * 1.8; // 210 (blue) -> 30 (amber/gold)
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
