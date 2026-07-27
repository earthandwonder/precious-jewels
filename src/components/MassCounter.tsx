"use client";

import { useState } from "react";
import type { Act, Material } from "@/data/materials";

interface MassCounterProps {
  logVolume: number;
  density: number;
  color: string;
  act: Act;
  derivation?: Material["derivation"];
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

export default function MassCounter({ logVolume, density, color, act, derivation }: MassCounterProps) {
  const [expanded, setExpanded] = useState(false);
  const logMass = logVolume + Math.log10(density);
  const { value, unit } = formatMass(logMass, act);

  const isUncountable = logVolume >= 20;

  const fontSize = isUncountable
    ? "text-xl md:text-2xl"
    : "text-base md:text-lg";

  const hasDerivation = derivation && derivation.steps.length > 0;

  // Auto-generate bridge line connecting raw mass → displayed value
  const bridgeLine = (() => {
    const roundedLog = Math.round(logMass);
    if (act === 1) {
      const earthExp = Math.round(logMass - 24.8);
      return `Total estimated mass: ~10${superscript(roundedLog)} kg ÷ Earth mass (6 × 10${superscript(24)} kg) ≈ 10${superscript(earthExp)} Earth-masses`;
    }
    if (act === 2) {
      return `Total estimated mass: ~10${superscript(roundedLog)} kg`;
    }
    // Act 3 — show tonnes
    const logTonnes = logMass - 3;
    if (logTonnes >= 6) {
      return `Total estimated mass: ~10${superscript(roundedLog)} kg = ~10${superscript(Math.round(logTonnes))} tonnes`;
    }
    const tonnes = Math.round(10 ** logTonnes);
    return `Total estimated mass: ~10${superscript(roundedLog)} kg ≈ ${tonnes.toLocaleString()} tonnes`;
  })();

  return (
    <div className="my-1.5 md:my-3">
      <button
        type="button"
        onClick={hasDerivation ? () => setExpanded(!expanded) : undefined}
        className={`flex items-baseline justify-center gap-2 mx-auto ${hasDerivation ? "cursor-pointer" : "cursor-default"}`}
        style={{ background: "none", border: "none", padding: 0 }}
        aria-expanded={hasDerivation ? expanded : undefined}
      >
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
        {hasDerivation && (
          <span
            className="text-[9px] ml-1 transition-transform duration-200"
            style={{
              color,
              opacity: 0.3,
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              display: "inline-block",
            }}
          >
            ▼
          </span>
        )}
      </button>

      {expanded && derivation && (
        <div
          className="mt-2 mx-auto max-w-sm text-left rounded px-3 py-2"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid rgba(255,255,255,0.06)`,
          }}
        >
          {/* Bridge: connects displayed value to derivation */}
          <p
            className="text-[10px] md:text-[11px] font-mono leading-[1.5] mb-2 pb-2"
            style={{
              color,
              opacity: 0.6,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {bridgeLine}
          </p>

          <p
            className="text-[9px] uppercase tracking-[0.15em] mb-1.5"
            style={{ color, opacity: 0.5 }}
          >
            How we got this number
          </p>
          <ul className="space-y-1">
            {derivation.steps.map((step, i) => (
              <li
                key={i}
                className="text-[10px] md:text-[11px] leading-[1.5]"
                style={{ color: "rgba(200, 210, 220, 0.55)" }}
              >
                {step}
              </li>
            ))}
          </ul>
          {derivation.sources.length > 0 && (
            <>
              <hr className="my-2 border-0" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />
              <p
                className="text-[9px] uppercase tracking-[0.15em] mb-1"
                style={{ color, opacity: 0.4 }}
              >
                Sources
              </p>
              <ul className="space-y-0.5">
                {derivation.sources.map((src, i) => (
                  <li
                    key={i}
                    className="text-[9px] md:text-[10px] leading-[1.4] italic"
                    style={{ color: "rgba(200, 210, 220, 0.4)" }}
                  >
                    {src}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
