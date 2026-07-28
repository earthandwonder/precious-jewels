"use client";

import { useState } from "react";
import Image from "next/image";
import AuthorPopup from "./AuthorPopup";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const orbitIcons = [
  {
    bg: "#2A7AB5",
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c2-4 6-8 10-8s8 4 10 8c-2 4-6 8-10 8s-8-4-10-8Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    bg: "#B8902E",
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      </svg>
    ),
  },
  {
    bg: "#1a0a2e",
    border: "rgba(255,236,210,0.3)",
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,236,210,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 7-10 12L2 10l4-7z" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
];

// Position 3 icons clustered in the bottom-right of the face
// Layout:  0 .
//            .
const orbitPositions = [
  { angle: 10, r: 28 },   // right (slightly below horizontal)
  { angle: 55, r: 28 },   // bottom-right diagonal
  { angle: 100, r: 28 },  // below
];

export default function SiteHeader() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <div className="fixed top-4 left-4 z-40 flex items-center gap-1">
        {/* Back arrow */}
        <a
          href="https://benmccarthy.com.au"
          className="flex items-center justify-center w-6 h-6 transition-opacity opacity-40 hover:opacity-80"
          aria-label="Back to benmccarthy.com.au"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(155, 155, 170, 0.8)" }}>
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </a>

        {/* Face with orbiting icons */}
        <button
          onClick={() => setPopupOpen(true)}
          className="relative cursor-pointer group"
          aria-label="About Ben McCarthy"
          style={{ width: 56, height: 56 }}
        >
          {/* Orbiting icon spheres */}
          {orbitIcons.map((item, i) => {
            const { angle, r } = orbitPositions[i];
            const rad = (angle * Math.PI) / 180;
            const x = 28 + Math.cos(rad) * r - 9;
            const y = 28 + Math.sin(rad) * r - 9;
            return (
              <div
                key={i}
                className="absolute rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: 18,
                  height: 18,
                  left: x,
                  top: y,
                  background: item.bg,
                  border: item.border ? `1px solid ${item.border}` : undefined,
                  boxShadow: `0 0 8px ${item.bg}40`,
                }}
              >
                {item.icon}
              </div>
            );
          })}

          {/* Face circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full overflow-hidden border border-white/15 group-hover:border-white/30 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(253,235,208,0.08)]">
            <Image
              src={`${basePath}/ben.jpeg`}
              alt="Ben McCarthy"
              width={72}
              height={72}
              className="w-full h-full object-cover object-[center_70%]"
            />
          </div>
        </button>
      </div>

      <AuthorPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
