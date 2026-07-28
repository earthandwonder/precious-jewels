"use client";

import { useState } from "react";
import type { Act, Material } from "@/data/materials";

interface MassCounterProps {
  logVolume: number;
  density: number;
  color: string;
  act: Act;
  derivation?: Material["derivation"];
  scaleNote?: string;
}

/** Render 10^n as JSX with a proper <sup> tag instead of Unicode superscripts. */
function TenPow({ n }: { n: number }) {
  return (
    <span>
      10<sup className="relative text-[0.65em]" style={{ verticalAlign: "super", lineHeight: 0 }}>{n}</sup>
    </span>
  );
}

/** Plain-text version for derivation panel (no JSX). */
function tenPowText(n: number): string {
  const map: Record<string, string> = {
    "0": "\u2070", "1": "\u00B9", "2": "\u00B2", "3": "\u00B3",
    "4": "\u2074", "5": "\u2075", "6": "\u2076", "7": "\u2077",
    "8": "\u2078", "9": "\u2079",
  };
  const sup = String(n).split("").map(c => map[c] ?? c).join("");
  return `10${sup}`;
}

/**
 * Consistent units per part:
 * Part 1 (logMass 41-49): Earth-masses
 * Part 2 (logMass 27-38): kg
 * Part 3 (logMass 5-16): tonnes
 */
function formatMass(logMass: number, act: Act): { value: React.ReactNode; unit: string } {
  if (act === 1) {
    const earthExp = Math.round(logMass - 24.8);
    if (earthExp <= 0) {
      return { value: "~1", unit: "Earth-mass" };
    }
    return { value: <span>~<TenPow n={earthExp} /></span>, unit: "Earth-masses" };
  }

  if (act === 2) {
    return { value: <span>~<TenPow n={Math.round(logMass)} /></span>, unit: "kg" };
  }

  // Act 3: tonnes (logMass is in kg, so subtract 3 for tonnes)
  const logTonnes = logMass - 3;
  if (logTonnes >= 9) {
    const billionExp = Math.round(logTonnes - 9);
    if (billionExp === 0) return { value: "~1", unit: "billion tonnes" };
    return { value: <span>~<TenPow n={billionExp} /></span>, unit: "billion tonnes" };
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

export default function MassCounter({ logVolume, density, color, act, derivation, scaleNote }: MassCounterProps) {
  const [expanded, setExpanded] = useState(false);
  const logMass = logVolume + Math.log10(density);
  const { value, unit } = formatMass(logMass, act);

  const isUncountable = logVolume >= 20;

  const fontSize = isUncountable
    ? "text-2xl md:text-3xl"
    : "text-lg md:text-xl";

  const hasDerivation = derivation && derivation.steps.length > 0;

  // Auto-generate bridge line connecting raw mass -> displayed value (plain text for panel)
  const bridgeLine = (() => {
    const roundedLog = Math.round(logMass);
    if (act === 1) {
      const earthExp = Math.round(logMass - 24.8);
      return `Total estimated mass: ~${tenPowText(roundedLog)} kg \u00F7 Earth mass (6 \u00D7 ${tenPowText(24)} kg) \u2248 ${tenPowText(earthExp)} Earth-masses`;
    }
    if (act === 2) {
      return `Total estimated mass: ~${tenPowText(roundedLog)} kg`;
    }
    // Act 3
    const logTonnes = logMass - 3;
    if (logTonnes >= 6) {
      return `Total estimated mass: ~${tenPowText(roundedLog)} kg = ~${tenPowText(Math.round(logTonnes))} tonnes`;
    }
    const tonnes = Math.round(10 ** logTonnes);
    return `Total estimated mass: ~${tenPowText(roundedLog)} kg \u2248 ${tonnes.toLocaleString()} tonnes`;
  })();

  return (
    <div className="my-2 md:my-4">
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
            opacity: 1,
          }}
        >
          {value}
        </span>
        <span className="text-sm" style={{ color: "rgba(230, 235, 242, 1)" }}>
          {unit}<span style={{ opacity: 0.85 }}>*</span>
        </span>
        {hasDerivation && (
          <span
            className="text-xs ml-1 transition-transform duration-200"
            style={{
              color,
              opacity: 0.75,
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
            background: "rgba(255,255,255,0.06)",
            border: `1px solid rgba(255,255,255,0.1)`,
          }}
        >
          {/* Asterisk note */}
          <p
            className="text-xs md:text-sm leading-[1.4] italic mb-2 pb-2"
            style={{
              color: "rgba(225, 230, 240, 0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            * Estimated total mass across the observable universe.
          </p>

          {/* Bridge: connects displayed value to derivation */}
          <p
            className="text-xs md:text-sm font-mono leading-[1.5] mb-2 pb-2"
            style={{
              color,
              opacity: 1,
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {bridgeLine}
          </p>

          <p
            className="text-xs uppercase tracking-[0.15em] mb-1.5"
            style={{ color, opacity: 1 }}
          >
            How we got this number
          </p>
          <ul className="space-y-1">
            {derivation.steps.map((step, i) => (
              <li
                key={i}
                className="text-xs md:text-sm leading-[1.5]"
                style={{ color: "rgba(230, 235, 242, 1)" }}
              >
                {step}
              </li>
            ))}
          </ul>
          {derivation.sources.length > 0 && (
            <>
              <hr className="my-2 border-0" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
              <p
                className="text-xs uppercase tracking-[0.15em] mb-1"
                style={{ color, opacity: 0.95 }}
              >
                Sources
              </p>
              <ul className="space-y-0.5">
                {derivation.sources.map((src, i) => (
                  <li
                    key={i}
                    className="text-xs md:text-sm leading-[1.4] italic"
                    style={{ color: "rgba(225, 230, 240, 0.9)" }}
                  >
                    {src}
                  </li>
                ))}
              </ul>
            </>
          )}
          {scaleNote && (
            <>
              <hr className="my-2 border-0" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
              <p
                className="text-xs md:text-sm leading-[1.4] italic"
                style={{ color: "rgba(215, 220, 230, 0.75)" }}
              >
                {scaleNote}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
