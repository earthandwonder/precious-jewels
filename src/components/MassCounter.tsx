"use client";

import type { Act } from "@/data/materials";

interface MassCounterProps {
  logMass: number;
  color: string;
  act: Act;
}

function superscript(n: number): string {
  const map: Record<string, string> = {
    "0": "\u2070", "1": "\u00B9", "2": "\u00B2", "3": "\u00B3",
    "4": "\u2074", "5": "\u2075", "6": "\u2076", "7": "\u2077",
    "8": "\u2078", "9": "\u2079",
  };
  return String(n).split("").map(c => map[c] ?? c).join("");
}

/**
 * Consistent units per part:
 * Part 1 (logMass 41-49): Earth-masses
 * Part 2 (logMass 27-38): kg
 * Part 3 (logMass 5-16): tonnes
 */
function formatMass(logMass: number, act: Act): { value: string; unit: string } {
  if (act === 1) {
    // Earth mass ≈ 5.97 × 10^24 kg → logEarth ≈ 24.8
    const earthExp = Math.round(logMass - 24.8);
    if (earthExp <= 0) {
      return { value: "~1", unit: "Earth-mass" };
    }
    return { value: `~10${superscript(earthExp)}`, unit: "Earth-masses" };
  }

  if (act === 2) {
    return { value: `~10${superscript(Math.round(logMass))}`, unit: "kg" };
  }

  // Act 3: tonnes (logMass is in kg, so subtract 3 for tonnes)
  const logTonnes = logMass - 3;
  if (logTonnes >= 9) {
    const billionExp = Math.round(logTonnes - 9);
    if (billionExp === 0) return { value: "~1", unit: "billion tonnes" };
    return { value: `~10${superscript(billionExp)}`, unit: "billion tonnes" };
  }
  if (logTonnes >= 6) {
    const millionExp = Math.round(logTonnes - 6);
    if (millionExp === 0) return { value: "~1", unit: "million tonnes" };
    const val = Math.round(10 ** millionExp);
    return { value: `~${val.toLocaleString()}`, unit: "million tonnes" };
  }
  if (logTonnes >= 3) {
    const val = Math.round(10 ** (logTonnes - 3));
    return { value: `~${val.toLocaleString()}`, unit: "thousand tonnes" };
  }
  if (logTonnes >= 0) {
    const val = Math.round(10 ** logTonnes);
    return { value: `~${val.toLocaleString()}`, unit: "tonnes" };
  }
  const kg = Math.round(10 ** logMass);
  return { value: `~${kg.toLocaleString()}`, unit: "kg" };
}

export default function MassCounter({ logMass, color, act }: MassCounterProps) {
  const { value, unit } = formatMass(logMass, act);

  const isUncountable = logMass >= 25;

  const fontSize = isUncountable
    ? "text-xl md:text-2xl"
    : "text-base md:text-lg";

  return (
    <div className="my-3 flex items-baseline justify-center gap-2">
      <span
        className={`font-mono font-bold tracking-wider ${fontSize} ${isUncountable ? "count-pulse" : ""}`}
        style={{
          color,
          opacity: isUncountable ? 0.8 : 0.6,
        }}
      >
        {value}
      </span>
      <span className="text-xs text-muted">
        {unit}
      </span>
    </div>
  );
}
