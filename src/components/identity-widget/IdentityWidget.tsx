"use client";

import { useState } from "react";
import Image from "next/image";
import { pieces, icons } from "./identity-config";
import { IdentityPanel } from "./IdentityPanel";

const orbitPositions = [
  { angle: 10, r: 28 },
  { angle: 55, r: 28 },
  { angle: 100, r: 28 },
];

/**
 * Identity widget — face and orbiting icons in the top-left.
 * Clicking the face opens the identity panel (sidebar).
 */
export function IdentityWidget({
  currentSlug,
  basePath = "",
  subscribeEndpoint = "/api/subscribe",
}: {
  currentSlug?: string;
  basePath?: string;
  subscribeEndpoint?: string;
}) {
  const [panelOpen, setPanelOpen] = useState(false);

  const orbitPieces = pieces.filter((p) => p.orbit).slice(0, 3);

  const orbitIcons = orbitPieces.map((p) => ({
    bg: p.bg,
    border: p.border,
    icon: (() => {
      if (p.bg === "#2A7AB5") return icons.eye(10);
      if (p.bg === "#B8902E") return icons.pen(10);
      return icons.gem(10, "rgba(255,236,210,0.85)");
    })(),
  }));

  return (
    <>
      <div className="fixed top-4 left-4 z-40">
        {/* Face with orbiting icons */}
        <button
          onClick={() => setPanelOpen(true)}
          className="relative cursor-pointer group"
          aria-label="About Ben McCarthy"
          style={{ width: 56, height: 56 }}
        >
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
                  border: item.border
                    ? `1px solid ${item.border}`
                    : undefined,
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

      <IdentityPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        currentSlug={currentSlug}
        basePath={basePath}
        subscribeEndpoint={subscribeEndpoint}
      />
    </>
  );
}
