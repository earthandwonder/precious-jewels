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

function renderEarth(size: number) {
  const ocean = "#4a7fb5";
  const land = "#5a9a5a";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="17" fill={ocean} opacity="0.3" stroke={ocean} strokeWidth="0.7" strokeOpacity="0.5" />
      <path d="M14 12 Q18 10 22 13 Q20 16 16 15 Z" fill={land} opacity="0.35" />
      <path d="M24 18 Q28 16 30 20 Q28 24 24 22 Z" fill={land} opacity="0.3" />
      <path d="M12 22 Q16 20 18 24 Q14 28 12 25 Z" fill={land} opacity="0.25" />
    </svg>
  );
}

function renderMountain(size: number) {
  const w = size * 1.4;
  const h = size;
  const rock = "#8090a0";
  return (
    <svg width={w} height={h} viewBox="0 0 56 40" fill="none">
      <path d="M2 38 L20 6 L28 18 L36 4 L54 38 Z" fill={rock} opacity="0.3" stroke={rock} strokeWidth="0.7" strokeOpacity="0.5" />
      <path d="M34 8 L36 4 L38 8 Q36 10 34 8 Z" fill="white" opacity="0.3" />
      <path d="M18 10 L20 6 L22 10 Q20 12 18 10 Z" fill="white" opacity="0.2" />
    </svg>
  );
}

function renderStatue(size: number) {
  const c = "#7ab8a0";
  return (
    <svg width={size * 0.5} height={size} viewBox="0 0 20 40" fill="none">
      <rect x="5" y="32" width="10" height="8" fill="#808080" opacity="0.3" stroke="#808080" strokeWidth="0.5" strokeOpacity="0.4" />
      <rect x="7" y="14" width="6" height="18" fill={c} opacity="0.3" />
      <circle cx="10" cy="11" r="3" fill={c} opacity="0.3" />
      <path d="M7 8 L5 4 M8.5 7.5 L8 3 M10 7 L10 2 M11.5 7.5 L12 3 M13 8 L15 4" stroke={c} strokeWidth="0.6" strokeOpacity="0.4" />
      <path d="M13 14 L17 6" stroke={c} strokeWidth="1.2" strokeOpacity="0.35" />
      <ellipse cx="17.5" cy="4.5" rx="1.5" ry="2" fill="#e8a840" opacity="0.45" />
    </svg>
  );
}

function renderHuman(size: number) {
  const c = "#c4a882";
  return (
    <svg width={size * 0.4} height={size} viewBox="0 0 16 40" fill="none">
      <circle cx="8" cy="6" r="3.5" fill={c} opacity="0.3" stroke={c} strokeWidth="0.5" strokeOpacity="0.45" />
      <line x1="8" y1="10" x2="8" y2="24" stroke={c} strokeWidth="1.4" strokeOpacity="0.35" />
      <line x1="8" y1="14" x2="2" y2="20" stroke={c} strokeWidth="1.2" strokeOpacity="0.3" />
      <line x1="8" y1="14" x2="14" y2="20" stroke={c} strokeWidth="1.2" strokeOpacity="0.3" />
      <line x1="8" y1="24" x2="3" y2="38" stroke={c} strokeWidth="1.4" strokeOpacity="0.35" />
      <line x1="8" y1="24" x2="13" y2="38" stroke={c} strokeWidth="1.4" strokeOpacity="0.35" />
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
