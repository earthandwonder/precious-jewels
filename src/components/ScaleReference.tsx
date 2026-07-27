"use client";

/**
 * Shows a familiar reference-object silhouette next to a particle pile.
 * Act 3 uses real cone-pile physics for proportional sizing.
 * Acts 1-2 use Earth as a narrative reference.
 */

import type { Act } from "@/data/materials";

interface ScaleReferenceProps {
  logMass: number;
  density: number;
  act: Act;
  pileHeight: number;
}

export type RefType = "earth" | "everest" | "statue" | "human";

export interface ReferenceInfo {
  type: RefType;
  label: string;
  color: string;
  realSize: number; // metres
  render: (size: number) => React.ReactNode;
}

// Real-world sizes in metres
const EVEREST_HEIGHT = 8_850;
const STATUE_HEIGHT = 93;
const HUMAN_HEIGHT = 1.8;

export const REFERENCES: Record<RefType, ReferenceInfo> = {
  earth:   { type: "earth",   label: "Earth",             color: "#5b8cbf", realSize: 12_742_000, render: (s) => renderEarth(s) },
  everest: { type: "everest", label: "Everest",           color: "#b0b8c0", realSize: EVEREST_HEIGHT, render: (s) => renderMountain(s) },
  statue:  { type: "statue",  label: "Statue of Liberty", color: "#7ab8a0", realSize: STATUE_HEIGHT, render: (s) => renderStatue(s) },
  human:   { type: "human",   label: "Human",             color: "#c4a882", realSize: HUMAN_HEIGHT, render: (s) => renderHuman(s) },
};

/**
 * Compute the real-world height of a cone pile (angle of repose ~33deg).
 * V = mass / density; cone V = 0.68 * r^3; h = 0.65 * r
 * Uses log arithmetic to avoid overflow.
 */
function conePileHeight(logMass: number, density: number): number {
  const logVolume = logMass - Math.log10(density);
  const logR = (logVolume - Math.log10(0.68)) / 3;
  const logH = logR + Math.log10(0.65);
  return Math.pow(10, logH);
}

/**
 * For Act 3: pick the reference where the pile-to-ref ratio is most useful (0.2x - 30x).
 * For Acts 1-2: always Earth (narrative, not proportional).
 */
export function getRefType(logMass: number, density: number, act: Act): RefType {
  if (act <= 2) return "earth";

  const h = conePileHeight(logMass, density);
  // Pick the reference that keeps the ratio in the most readable range
  if (h > EVEREST_HEIGHT * 0.5) return "everest";
  if (h > HUMAN_HEIGHT * 15) return "statue";
  return "human";
}

/** Fixed display sizes for each reference type (px). The yardstick stays constant. */
const REF_DISPLAY_SIZES: Record<RefType, number> = {
  earth: 60,
  everest: 60,
  statue: 50,
  human: 40,
};

function getRefSize(logMass: number, density: number, act: Act, pileHeightPx: number): number {
  const refType = getRefType(logMass, density, act);
  return REF_DISPLAY_SIZES[refType];
}

// ─── SVG silhouettes ─────────────────────────────────────────
// Style: ghostly, low-opacity outlines on near-black (#030308).
// Must feel like they belong next to the particle piles — ethereal, not illustrative.

function renderEarth(size: number) {
  const o = "#5b8cbf"; // ocean
  const l = "#5a9a5a"; // land
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* Atmosphere haze */}
      <circle cx="20" cy="20" r="18.5" fill={o} opacity="0.04" />
      {/* Globe outline */}
      <circle cx="20" cy="20" r="16" stroke={o} strokeWidth="0.6" strokeOpacity="0.35" fill={o} fillOpacity="0.08" />
      {/* Longitude / latitude grid — gives it that "planet" read */}
      <ellipse cx="20" cy="20" rx="10" ry="16" stroke={o} strokeWidth="0.3" strokeOpacity="0.15" />
      <ellipse cx="20" cy="20" rx="4" ry="16" stroke={o} strokeWidth="0.3" strokeOpacity="0.1" />
      <line x1="4" y1="20" x2="36" y2="20" stroke={o} strokeWidth="0.3" strokeOpacity="0.12" />
      <line x1="6" y1="13" x2="34" y2="13" stroke={o} strokeWidth="0.3" strokeOpacity="0.08" />
      <line x1="6" y1="27" x2="34" y2="27" stroke={o} strokeWidth="0.3" strokeOpacity="0.08" />
      {/* Continental masses — soft filled shapes */}
      <path d="M14 11 Q17 9 21 12 Q19 16 15 14 Z" fill={l} opacity="0.2" />
      <path d="M23 16 Q27 14 30 18 Q28 22 24 20 Z" fill={l} opacity="0.18" />
      <path d="M11 21 Q14 19 16 23 Q13 27 11 24 Z" fill={l} opacity="0.15" />
      <path d="M22 26 Q25 25 26 28 Q24 30 22 28 Z" fill={l} opacity="0.12" />
      {/* Specular glint */}
      <circle cx="13" cy="12" r="2.5" fill="white" opacity="0.04" />
    </svg>
  );
}

function renderMountain(size: number) {
  const w = size * 1.4;
  const h = size;
  const r = "#8090a0";
  return (
    <svg width={w} height={h} viewBox="0 0 56 40" fill="none">
      {/* Far ridge — barely there */}
      <path d="M6 38 L22 16 L30 24 L42 12 L52 38 Z" fill={r} opacity="0.06" />
      {/* Main silhouette */}
      <path d="M2 38 L20 6 L28 18 L36 4 L54 38 Z" fill={r} opacity="0.12" stroke={r} strokeWidth="0.5" strokeOpacity="0.3" />
      {/* Ridge lines for depth */}
      <path d="M20 6 L24 12 L28 18" stroke={r} strokeWidth="0.4" strokeOpacity="0.2" fill="none" />
      <path d="M36 4 L40 12" stroke={r} strokeWidth="0.4" strokeOpacity="0.15" fill="none" />
      {/* Snow caps */}
      <path d="M34 8 L36 4 L38 8 Q36 10 34 8 Z" fill="white" opacity="0.2" />
      <path d="M18 10 L20 6 L22 10 Q20 12 18 10 Z" fill="white" opacity="0.15" />
    </svg>
  );
}

function renderStatue(size: number) {
  const c = "#7ab8a0";
  return (
    <svg width={size * 0.5} height={size} viewBox="0 0 20 40" fill="none">
      {/* Pedestal */}
      <path d="M4 34 L5 32 L15 32 L16 34 L17 40 L3 40 Z" fill="#808080" opacity="0.12" stroke="#808080" strokeWidth="0.4" strokeOpacity="0.2" />
      {/* Robe / body */}
      <path d="M7 32 Q7 24 8 20 L8 15 Q10 14 12 15 L12 20 Q13 24 13 32 Z" fill={c} opacity="0.15" stroke={c} strokeWidth="0.4" strokeOpacity="0.3" />
      {/* Head */}
      <ellipse cx="10" cy="11.5" rx="2" ry="2.3" fill={c} opacity="0.15" stroke={c} strokeWidth="0.3" strokeOpacity="0.3" />
      {/* Crown */}
      <path d="M7.5 9 L6.5 5.5 M8.5 8.5 L8 4.5 M10 8 L10 3.5 M11.5 8.5 L12 4.5 M12.5 9 L13.5 5.5" stroke={c} strokeWidth="0.5" strokeOpacity="0.3" strokeLinecap="round" />
      {/* Raised arm + torch */}
      <path d="M12.5 15 Q14 12 15 8 L15.5 5.5" stroke={c} strokeWidth="0.8" strokeOpacity="0.25" strokeLinecap="round" fill="none" />
      {/* Torch flame — warm accent glow */}
      <circle cx="15.5" cy="4.5" r="1.8" fill="#e8a840" opacity="0.2" />
      <circle cx="15.5" cy="4.5" r="0.7" fill="#ffd080" opacity="0.35" />
      {/* Tablet */}
      <rect x="6" y="18" width="1.8" height="4.5" rx="0.3" fill={c} opacity="0.12" transform="rotate(-8 7 20)" />
    </svg>
  );
}

function renderHuman(size: number) {
  const c = "#c4a882";
  return (
    <svg width={size * 0.4} height={size} viewBox="0 0 16 40" fill="none">
      {/* Head */}
      <ellipse cx="8" cy="6" rx="2.5" ry="3" fill={c} opacity="0.15" stroke={c} strokeWidth="0.4" strokeOpacity="0.3" />
      {/* Torso */}
      <path d="M5.5 11 Q5 13 5 17 L5.5 24 Q6.5 25 8 25 Q9.5 25 10.5 24 L11 17 Q11 13 10.5 11 Z" fill={c} opacity="0.12" stroke={c} strokeWidth="0.4" strokeOpacity="0.25" />
      {/* Neck */}
      <line x1="8" y1="9" x2="8" y2="11" stroke={c} strokeWidth="1" strokeOpacity="0.2" />
      {/* Arms */}
      <path d="M5.5 12 Q3.5 15 3 20" stroke={c} strokeWidth="0.8" strokeOpacity="0.2" strokeLinecap="round" fill="none" />
      <path d="M10.5 12 Q12.5 15 13 20" stroke={c} strokeWidth="0.8" strokeOpacity="0.2" strokeLinecap="round" fill="none" />
      {/* Legs */}
      <path d="M6.5 25 Q6 30 5 38" stroke={c} strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" />
      <path d="M9.5 25 Q10 30 11 38" stroke={c} strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────

export default function ScaleReference({ logMass, density, act, pileHeight }: ScaleReferenceProps) {
  const refType = getRefType(logMass, density, act);
  const ref = REFERENCES[refType];
  const size = getRefSize(logMass, density, act, pileHeight);

  return (
    <div className="flex flex-col items-center justify-end gap-1" style={{ minWidth: size * 0.4 }}>
      {ref.render(size)}
      <span
        className="text-[9px] tracking-wider uppercase whitespace-nowrap"
        style={{ color: ref.color, opacity: 0.5 }}
      >
        {ref.label}
      </span>
    </div>
  );
}
