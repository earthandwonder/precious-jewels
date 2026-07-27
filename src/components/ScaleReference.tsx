"use client";

/**
 * Shows a familiar reference-object silhouette next to a particle pile.
 * All acts use real cone-pile physics for proportional sizing.
 * Reference object stays a fixed pixel size; pile scales relative to it.
 *
 * Ladder (large → small):
 *   Heliosphere → Solar System → Sun → Earth → Everest → Statue → Human
 */

import type { Act } from "@/data/materials";

interface ScaleReferenceProps {
  logVolume: number;
  act: Act;
  pileHeight: number;
}

export type RefType = "heliosphere" | "solar-system" | "sun" | "earth" | "everest" | "statue" | "human";

export interface ReferenceInfo {
  type: RefType;
  label: string;
  color: string;
  realSize: number; // metres
  render: (size: number) => React.ReactNode;
}

// Real-world sizes in metres
const HELIOSPHERE_DIAMETER = 3.59e13;    // ~240 AU
const SOLAR_SYSTEM_DIAMETER = 8.97e12;   // ~60 AU (Neptune orbit diameter)
const SUN_DIAMETER = 1.39e9;
const EARTH_DIAMETER = 1.2742e7;
const EVEREST_HEIGHT = 8_850;
const STATUE_HEIGHT = 93;
const HUMAN_HEIGHT = 1.8;

export const REFERENCES: Record<RefType, ReferenceInfo> = {
  heliosphere:    { type: "heliosphere",    label: "Voyager-scale",        color: "#7a6fbf", realSize: HELIOSPHERE_DIAMETER, render: (s) => renderHeliosphere(s) },
  "solar-system": { type: "solar-system",   label: "Solar system-scale",       color: "#b8a040", realSize: SOLAR_SYSTEM_DIAMETER, render: (s) => renderSolarSystem(s) },
  sun:            { type: "sun",            label: "Sun-scale",                color: "#e8a840", realSize: SUN_DIAMETER, render: (s) => renderSun(s) },
  earth:          { type: "earth",          label: "Earth-scale",              color: "#5b8cbf", realSize: EARTH_DIAMETER, render: (s) => renderEarth(s) },
  everest:        { type: "everest",        label: "Everest-scale",            color: "#b0b8c0", realSize: EVEREST_HEIGHT, render: (s) => renderMountain(s) },
  statue:         { type: "statue",         label: "Statue of Liberty-scale",  color: "#7ab8a0", realSize: STATUE_HEIGHT, render: (s) => renderStatue(s) },
  human:          { type: "human",          label: "Human-scale",              color: "#c4a882", realSize: HUMAN_HEIGHT, render: (s) => renderHuman(s) },
};

/**
 * Compute the real-world height of a cone pile (angle of repose ~33deg).
 * V = volume in m³; cone V = 0.68 * r³; h = 0.65 * r
 * Uses log arithmetic to avoid overflow.
 */
function conePileHeight(logVolume: number): number {
  const logR = (logVolume - Math.log10(0.68)) / 3;
  const logH = logR + Math.log10(0.65);
  return Math.pow(10, logH);
}

/**
 * Pick the reference object that gives the most readable pile-to-ref ratio.
 * Thresholds chosen so every material lands in ~0.27x-8.5x range.
 */
export function getRefType(logVolume: number, _act: Act): RefType {
  const h = conePileHeight(logVolume);

  // Walk down from largest reference; pick the first where ratio >= 0.25
  if (h >= HELIOSPHERE_DIAMETER * 0.25) return "heliosphere";
  // Opal (logVol ~35.7, h ~3.9 AU) is too small for the 0.25x threshold on
  // solar system but too large for Sun (422x). Force it onto solar system;
  // getPileHeight clamps it to 0.3x for readability.
  if (h >= SOLAR_SYSTEM_DIAMETER * 0.05) return "solar-system";
  if (h >= SUN_DIAMETER * 0.25) return "sun";
  if (h >= EARTH_DIAMETER * 0.25) return "earth";
  if (h >= EVEREST_HEIGHT * 0.25) return "everest";
  if (h >= STATUE_HEIGHT * 0.25) return "statue";
  return "human";
}

/** Fixed display sizes for each reference type (px). The yardstick stays constant. */
const REF_DISPLAY_SIZES: Record<RefType, number> = {
  heliosphere: 100,
  "solar-system": 100,
  sun: 100,
  earth: 100,
  everest: 100,
  statue: 80,
  human: 70,
};

function getRefSize(logVolume: number, act: Act): number {
  const refType = getRefType(logVolume, act);
  return REF_DISPLAY_SIZES[refType];
}

// ─── SVG silhouettes ─────────────────────────────────────────
// Style: ghostly, low-opacity outlines on near-black (#030308).

function renderHeliosphere(size: number) {
  const c = "#7a6fbf";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* Outer boundary — the heliopause */}
      <circle cx="20" cy="20" r="18" stroke={c} strokeWidth="0.5" strokeOpacity="0.6" strokeDasharray="2 1.5" />
      {/* Inner shock wave */}
      <circle cx="20" cy="20" r="12" stroke={c} strokeWidth="0.4" strokeOpacity="0.4" strokeDasharray="1.5 1" />
      {/* Solar wind region */}
      <circle cx="20" cy="20" r="6" stroke={c} strokeWidth="0.3" strokeOpacity="0.3" />
      {/* Sun at centre */}
      <circle cx="20" cy="20" r="1.5" fill="#e8a840" opacity="0.7" />
      <circle cx="20" cy="20" r="0.6" fill="#ffd080" opacity="0.9" />
      {/* Voyager trajectory hint */}
      <line x1="20" y1="20" x2="35" y2="10" stroke={c} strokeWidth="0.3" strokeOpacity="0.35" strokeDasharray="0.8 0.8" />
      <circle cx="34" cy="11" r="0.6" fill={c} opacity="0.5" />
    </svg>
  );
}

function renderSolarSystem(size: number) {
  const c = "#b8a040";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* Orbits */}
      <circle cx="20" cy="20" r="4" stroke={c} strokeWidth="0.25" strokeOpacity="0.3" />
      <circle cx="20" cy="20" r="7" stroke={c} strokeWidth="0.25" strokeOpacity="0.3" />
      <circle cx="20" cy="20" r="10" stroke={c} strokeWidth="0.25" strokeOpacity="0.3" />
      <circle cx="20" cy="20" r="14" stroke={c} strokeWidth="0.3" strokeOpacity="0.35" />
      <circle cx="20" cy="20" r="17.5" stroke={c} strokeWidth="0.3" strokeOpacity="0.4" />
      {/* Sun */}
      <circle cx="20" cy="20" r="1.8" fill="#e8a840" opacity="0.65" />
      <circle cx="20" cy="20" r="0.7" fill="#ffd080" opacity="0.85" />
      {/* Planets as dots */}
      <circle cx="24" cy="20" r="0.4" fill={c} opacity="0.5" />
      <circle cx="20" cy="13" r="0.5" fill={c} opacity="0.5" />
      <circle cx="10" cy="18" r="0.6" fill="#c4a060" opacity="0.55" />
      <circle cx="14" cy="6" r="1.0" fill="#c49848" opacity="0.5" />
      <circle cx="37" cy="16" r="0.7" fill="#90a0b0" opacity="0.45" />
    </svg>
  );
}

function renderSun(size: number) {
  const c = "#e8a840";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* Corona */}
      <circle cx="20" cy="20" r="17" fill={c} opacity="0.08" />
      <circle cx="20" cy="20" r="14" fill={c} opacity="0.12" />
      {/* Photosphere */}
      <circle cx="20" cy="20" r="11" fill={c} opacity="0.35" stroke={c} strokeWidth="0.4" strokeOpacity="0.6" />
      {/* Surface detail */}
      <circle cx="16" cy="17" r="2" fill={c} opacity="0.15" />
      <circle cx="23" cy="22" r="1.5" fill={c} opacity="0.12" />
      {/* Bright core */}
      <circle cx="20" cy="20" r="5" fill="#ffd080" opacity="0.25" />
      {/* Specular */}
      <circle cx="16" cy="15" r="2.5" fill="white" opacity="0.1" />
    </svg>
  );
}

function renderEarth(size: number) {
  const o = "#5b8cbf"; // ocean
  const l = "#5a9a5a"; // land
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* Atmosphere haze */}
      <circle cx="20" cy="20" r="18.5" fill={o} opacity="0.15" />
      {/* Globe outline */}
      <circle cx="20" cy="20" r="16" stroke={o} strokeWidth="0.6" strokeOpacity="0.8" fill={o} fillOpacity="0.25" />
      {/* Longitude / latitude grid */}
      <ellipse cx="20" cy="20" rx="10" ry="16" stroke={o} strokeWidth="0.3" strokeOpacity="0.5" />
      <ellipse cx="20" cy="20" rx="4" ry="16" stroke={o} strokeWidth="0.3" strokeOpacity="0.4" />
      <line x1="4" y1="20" x2="36" y2="20" stroke={o} strokeWidth="0.3" strokeOpacity="0.4" />
      <line x1="6" y1="13" x2="34" y2="13" stroke={o} strokeWidth="0.3" strokeOpacity="0.3" />
      <line x1="6" y1="27" x2="34" y2="27" stroke={o} strokeWidth="0.3" strokeOpacity="0.3" />
      {/* Continental masses — Europe/Africa centred view */}
      {/* Europe: single unified mass — Iberia through Scandinavia */}
      <path d="M14 10 C15 8.5, 17 8, 19 8.5 C21 9, 23 9, 24 10 C24.5 10.5, 24 11.5, 23 12 C22 12.5, 20 13, 18 13 C16 13, 14.5 12, 14 11 Z" fill={l} opacity="0.5" />
      {/* Africa: broad north, West African bulge, rounder south */}
      <path d="M15 14.5 C17 14, 21 13.5, 25 14.5 C26.5 15.5, 27 17, 26.5 19 C26 20.5, 25.5 22, 25 23.5 C24.5 25, 24 26.5, 23 28 C22.5 29, 21.5 29.5, 20.5 29 C19.5 28.5, 19 27, 18.5 25.5 C18 24, 17 22, 16 20 C15 18, 14.5 16, 15 14.5 Z" fill={l} opacity="0.5" />
      {/* Middle East + Arabia */}
      <path d="M26 12.5 C27.5 12, 29 13, 29 14.5 C29 16, 28 17, 27 16.5 C26 16, 25.5 14, 26 12.5 Z" fill={l} opacity="0.4" />
      {/* Madagascar */}
      <path d="M27 26 C27.5 25.5, 28 26.5, 27.5 28 C27 29, 26.5 28.5, 27 26 Z" fill={l} opacity="0.3" />
      {/* India hint at right edge */}
      <path d="M30.5 13 C32 12.5, 33 14, 32 16 C31 17, 30 16, 30.5 13 Z" fill={l} opacity="0.3" />
      {/* Specular glint */}
      <circle cx="13" cy="12" r="2.5" fill="white" opacity="0.15" />
    </svg>
  );
}

function renderMountain(size: number) {
  const w = size * 1.4;
  const h = size;
  const r = "#8090a0";
  return (
    <svg width={w} height={h} viewBox="0 0 56 40" fill="none">
      {/* Far ridge */}
      <path d="M6 38 L22 16 L30 24 L42 12 L52 38 Z" fill={r} opacity="0.2" />
      {/* Main silhouette */}
      <path d="M2 38 L20 6 L28 18 L36 4 L54 38 Z" fill={r} opacity="0.4" stroke={r} strokeWidth="0.5" strokeOpacity="0.7" />
      {/* Ridge lines */}
      <path d="M20 6 L24 12 L28 18" stroke={r} strokeWidth="0.4" strokeOpacity="0.55" fill="none" />
      <path d="M36 4 L40 12" stroke={r} strokeWidth="0.4" strokeOpacity="0.5" fill="none" />
      {/* Snow caps */}
      <path d="M34 8 L36 4 L38 8 Q36 10 34 8 Z" fill="white" opacity="0.55" />
      <path d="M18 10 L20 6 L22 10 Q20 12 18 10 Z" fill="white" opacity="0.5" />
    </svg>
  );
}

function renderStatue(size: number) {
  const c = "#7ab8a0";
  return (
    <svg width={size * 0.5} height={size} viewBox="0 0 20 40" fill="none">
      {/* Pedestal — tapered block */}
      <path d="M5 33 L15 33 L16.5 40 L3.5 40 Z" fill="#707070" opacity="0.35" stroke="#808080" strokeWidth="0.4" strokeOpacity="0.5" />
      {/* Robe — single flowing silhouette */}
      <path d="M6.5 33 Q6.5 26 7.5 20 L8 14.5 Q10 13.5 12 14.5 L12.5 20 Q13.5 26 13.5 33 Z" fill={c} opacity="0.45" stroke={c} strokeWidth="0.5" strokeOpacity="0.65" />
      {/* Head */}
      <ellipse cx="10" cy="11.5" rx="2" ry="2.5" fill={c} opacity="0.5" stroke={c} strokeWidth="0.4" strokeOpacity="0.65" />
      {/* Raised arm + torch */}
      <path d="M12 14.5 Q13.5 11.5 14.5 7.5 L14.8 5" stroke={c} strokeWidth="0.9" strokeOpacity="0.6" strokeLinecap="round" fill="none" />
      {/* Torch flame */}
      <ellipse cx="14.8" cy="3.8" rx="1.5" ry="2" fill="#e8a840" opacity="0.5" />
      <ellipse cx="14.8" cy="3.8" rx="0.6" ry="1" fill="#ffd080" opacity="0.7" />
      {/* Tablet arm */}
      <path d="M8 14.5 Q6.5 17 6 19" stroke={c} strokeWidth="0.8" strokeOpacity="0.5" strokeLinecap="round" fill="none" />
      <rect x="5" y="18.5" width="2" height="4" rx="0.3" fill={c} opacity="0.35" transform="rotate(-10 6 20.5)" />
    </svg>
  );
}

function renderHuman(size: number) {
  const c = "#c4a882";
  return (
    <svg width={size * 0.4} height={size} viewBox="0 0 16 40" fill="none">
      {/* Head */}
      <circle cx="8" cy="5.5" r="2.5" fill={c} opacity="0.5" stroke={c} strokeWidth="0.4" strokeOpacity="0.65" />
      {/* Neck */}
      <line x1="8" y1="8" x2="8" y2="10.5" stroke={c} strokeWidth="1.2" strokeOpacity="0.55" />
      {/* Shoulders + torso — single path */}
      <path d="M4 12 Q4.5 10.5 8 10.5 Q11.5 10.5 12 12 L11.5 16 L10.5 24 Q8 25.5 5.5 24 L4.5 16 Z" fill={c} opacity="0.4" stroke={c} strokeWidth="0.4" strokeOpacity="0.6" />
      {/* Arms — relaxed at sides */}
      <path d="M4 12 Q2.5 16 2.5 21" stroke={c} strokeWidth="0.9" strokeOpacity="0.55" strokeLinecap="round" fill="none" />
      <path d="M12 12 Q13.5 16 13.5 21" stroke={c} strokeWidth="0.9" strokeOpacity="0.55" strokeLinecap="round" fill="none" />
      {/* Legs */}
      <path d="M6.5 24 Q6 30 5.5 38" stroke={c} strokeWidth="1.1" strokeOpacity="0.55" strokeLinecap="round" />
      <path d="M9.5 24 Q10 30 10.5 38" stroke={c} strokeWidth="1.1" strokeOpacity="0.55" strokeLinecap="round" />
      {/* Feet — small horizontal ticks */}
      <path d="M5.5 38 L4 38.5" stroke={c} strokeWidth="0.8" strokeOpacity="0.45" strokeLinecap="round" />
      <path d="M10.5 38 L12 38.5" stroke={c} strokeWidth="0.8" strokeOpacity="0.45" strokeLinecap="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────

export default function ScaleReference({ logVolume, act, pileHeight }: ScaleReferenceProps) {
  const refType = getRefType(logVolume, act);
  const ref = REFERENCES[refType];
  const size = getRefSize(logVolume, act);

  return (
    <div className="flex flex-col items-center justify-end gap-1" style={{ minWidth: size * 0.4 }}>
      {ref.render(size)}
      <span
        className="text-xs tracking-wider uppercase whitespace-nowrap"
        style={{ color: ref.color, opacity: 0.9 }}
      >
        {ref.label}
      </span>
    </div>
  );
}
