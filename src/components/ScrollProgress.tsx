"use client";

export default function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div
      className="scroll-progress-vertical"
      style={{
        height: `${progress}%`,
        background: `linear-gradient(180deg, rgba(185, 242, 255, 0.3), #B9F2FF)`,
        boxShadow: `0 0 6px rgba(185, 242, 255, 0.5), 0 0 12px rgba(185, 242, 255, 0.2)`,
      }}
    >
      {/* Diamond particle at leading edge */}
      <div
        style={{
          position: "absolute",
          bottom: -4,
          left: -3,
          width: 8,
          height: 8,
          background: "#E0F7FF",
          transform: "rotate(45deg)",
          boxShadow:
            "0 0 6px rgba(185, 242, 255, 0.8), 0 0 12px rgba(185, 242, 255, 0.4)",
        }}
      />
    </div>
  );
}
