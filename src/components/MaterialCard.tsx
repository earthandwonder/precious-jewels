"use client";

import { useRef, useEffect, useState } from "react";
import type { Material } from "@/data/materials";
import { inlineProducts } from "@/data/products";
import ParticlePile from "./ParticlePile";
import type { MaterialFeel, ParticleShape } from "./ParticlePile";
import MassCounter from "./MassCounter";
import ScaleReference, { getRefType, REFERENCES } from "./ScaleReference";
import AffiliateRow from "./AffiliateRow";

/** Map logVolume to a 0.08-1.0 normalized abundance for particle count/width.
 *  Power curve (^0.7) spreads the mid-range so rare materials look visibly smaller. */
function abundanceToNormalized(logVolume: number): number {
  const raw = (logVolume - 1.5) / 42;
  const curved = Math.pow(Math.max(0, Math.min(1, raw)), 0.7);
  return Math.max(0.08, curved);
}

interface ParticleStyle {
  particleShape: ParticleShape;
  colorJitter: number;
  sizeRange: [number, number];
  countMultiplier?: number;
}

function getParticleStyle(material: Material): ParticleStyle {
  switch (material.id) {
    case "corundum":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.5, 1.4], countMultiplier: 1.5 };
    case "diamond":
    case "quartz":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.5, 1.4] };
    case "emerald":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.8, 1.8], countMultiplier: 1.5 };
    case "red-beryl":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.5, 1.4], countMultiplier: 0.7 };
    case "alexandrite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.8, 1.8], countMultiplier: 1.5 };
    case "taaffeite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.8, 1.8], countMultiplier: 1.5 };
    case "jadeite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.8, 1.8], countMultiplier: 0.8 };
    case "moldavite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.5, 1.4], countMultiplier: 2.5 };
    case "opal":
      return { particleShape: "chunk", colorJitter: 0.35, sizeRange: [0.8, 1.8], countMultiplier: 0.8 };
    case "wood":
      return { particleShape: "log", colorJitter: 0.25, sizeRange: [0.3, 0.8], countMultiplier: 1.5 };
    case "ammolite":
      return { particleShape: "shard", colorJitter: 0.2, sizeRange: [0.3, 0.8], countMultiplier: 4 };
    case "coral":
      return { particleShape: "log", colorJitter: 0.15, sizeRange: [0.3, 0.8] };
    case "amber":
      return { particleShape: "circle", colorJitter: 0.2, sizeRange: [0.3, 0.8], countMultiplier: 1.5 };
    case "amber-inclusion":
      return { particleShape: "circle", colorJitter: 0.2, sizeRange: [0.3, 0.8], countMultiplier: 5 };
    case "ammonite":
      return { particleShape: "circle", colorJitter: 0.2, sizeRange: [0.7, 1.5], countMultiplier: 1.5 };
    case "pearl":
      return { particleShape: "circle", colorJitter: 0.08, sizeRange: [0.6, 1.0], countMultiplier: 1.5 };
    default:
      return { particleShape: "circle", colorJitter: 0.1, sizeRange: [0.7, 1.3] };
  }
}

function getMaterialFeel(material: Material): MaterialFeel {
  if (material.density >= 3800) return "heavy";
  if (material.category === "biological") return "organic";
  if (material.category === "earth-impact") return "glassy";
  if (
    [
      "diamond",
      "opal",
      "emerald",
      "alexandrite",
      "taaffeite",
      "red-beryl",
    ].includes(material.id)
  )
    return "sparkly";
  return "sparkly";
}

/** Cone pile height in metres (angle of repose ~33deg). */
function conePileHeight(logVolume: number): number {
  const logR = (logVolume - Math.log10(0.68)) / 3;
  const logH = logR + Math.log10(0.65);
  return Math.pow(10, logH);
}

const REF_DISPLAY_SIZES: Record<string, number> = {
  heliosphere: 100, "solar-system": 100, sun: 100,
  earth: 100, everest: 100, statue: 80, human: 70,
};

/**
 * All acts now use real proportional sizing.
 * Pile height in px = reference px size * (real pile height / real reference size).
 * Clamped to 0.25x-9x to stay readable. Opal is special-cased (true ratio 0.065x,
 * clamped to 0.3x for readability).
 */
function getPileHeight(material: Material, isMobile: boolean): number {
  const mobileCap = 400;
  // Cap desktop piles so the card (pile + text) fits the viewport.
  // ~45% of viewport leaves room for title, description, and affiliate row.
  const desktopCap = typeof window !== "undefined" ? Math.round(window.innerHeight * 0.45) : 400;

  const realH = conePileHeight(material.logVolume);
  const refType = getRefType(material.logVolume, material.act);
  const refRealSize = REFERENCES[refType].realSize;
  const realRatio = realH / refRealSize;

  // Opal: true ratio is 0.065x solar system, clamp to 0.3x for readability
  const minRatio = material.id === "opal" ? 0.3 : 0.25;
  const clampedRatio = Math.max(minRatio, Math.min(9, realRatio));
  const refPx = REF_DISPLAY_SIZES[refType];
  const h = Math.round(refPx * clampedRatio);
  return isMobile ? Math.min(h, mobileCap) : Math.min(h, desktopCap);
}

/** Returns a disclaimer string if the pile is visually enlarged beyond its true ratio. */
function getScaleNote(material: Material): string | undefined {
  const realH = conePileHeight(material.logVolume);
  const refType = getRefType(material.logVolume, material.act);
  const ref = REFERENCES[refType];
  const realRatio = realH / ref.realSize;
  const minRatio = material.id === "opal" ? 0.3 : 0.25;
  // Only show note if the ratio was clamped upward (pile shown bigger than reality)
  if (realRatio >= minRatio) return undefined;
  const pct = (realRatio * 100).toFixed(realRatio < 0.1 ? 1 : 0);
  return `Pile enlarged for visibility — true size is ${pct}% of the ${ref.label.toLowerCase()}.`;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

export default function MaterialCard({
  material,
  isActive,
}: {
  material: Material;
  isActive: boolean;
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  const active = hasAnimated;

  const pileHeight = getPileHeight(material, isMobile);
  const minCanvasHeight = 160;
  const canvasHeight = Math.max(minCanvasHeight, pileHeight);
  const pileScale = pileHeight / canvasHeight;
  const abundance = abundanceToNormalized(material.logVolume);

  // Two-colour system: accent + tint
  // Accent = material.color (title + counter value)
  // Tint = warm or cool neutral (tagline, description, share — varied by opacity)
  const isWarm = material.act === 3;
  const tintBase = isWarm ? "245, 238, 225" : "230, 238, 248";

  const hasProducts = !!inlineProducts[material.id];

  return (
    <div className="material-card relative w-full max-w-[100vw] h-full flex flex-col items-center justify-center px-4 md:px-6 pt-10 pb-4 md:py-0 overflow-hidden">
      {/* Zone 1: Visual — pile + reference, scaled to fit on mobile */}
      <div
        className={`snap-animate snap-animate-delay-1 flex items-end justify-center gap-2 md:gap-3 mb-4 md:mb-10 overflow-visible ${active ? "is-active" : ""}`}
        style={isMobile && canvasHeight > 200 ? {
          height: 200,
          transform: `scale(${200 / canvasHeight})`,
          transformOrigin: 'center bottom',
        } : undefined}
      >
        <div className="flex-shrink-0">
          <ScaleReference
            logVolume={material.logVolume}
            act={material.act}
            pileHeight={pileHeight}
          />
        </div>

        <div
          className="flex-1"
          style={{
            maxWidth: Math.max(240, Math.min(720 + abundance * 240, canvasHeight * 2)),
          }}
        >
          <ParticlePile
            color={material.color}
            glowColor={material.glowColor}
            abundance={abundance}
            height={canvasHeight}
            isVisible={active}
            feel={getMaterialFeel(material)}
            density={material.density}
            pileScale={pileScale}
            {...getParticleStyle(material)}
          />
        </div>
      </div>

      {/* Zone 2: Identity — title, counter, tagline */}
      <div className="text-center max-w-lg mx-auto">
        <h3
          className={`snap-animate snap-animate-delay-2 font-editorial text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] ${active ? "is-active" : ""}`}
          style={{ color: material.color }}
        >
          {material.name}
        </h3>

        <div className={`snap-animate snap-animate-delay-3 mt-3 md:mt-4 ${active ? "is-active" : ""}`}>
          <MassCounter logVolume={material.logVolume} density={material.density} color={material.color} act={material.act} derivation={material.derivation} scaleNote={getScaleNote(material)} />
        </div>

        <p
          className={`snap-animate snap-animate-delay-4 font-editorial text-base md:text-xl italic mt-1 md:mt-3 leading-relaxed ${active ? "is-active" : ""}`}
          style={{ color: `rgba(${tintBase}, 1)` }}
        >
          {material.tagline}
        </p>

        {/* Zone 3: Description + product + share — separated from identity */}
        <p
          className={`snap-animate snap-animate-delay-5 text-sm md:text-lg leading-[1.6] md:leading-[1.8] mt-2 md:mt-6 max-w-md mx-auto ${active ? "is-active" : ""}`}
          style={{ color: `rgba(${tintBase}, 1)` }}
        >
          {material.description}
        </p>

        {hasProducts && (
          <div className={`snap-animate snap-animate-delay-6 mt-3 md:mt-8 hover:opacity-100 transition-opacity ${active ? "is-active" : ""}`}>
            <AffiliateRow
              products={inlineProducts[material.id]}
              glowColor={material.glowColor}
              materialColor={material.color}
            />
          </div>
        )}

      </div>

      {/* Share button */}
      <button
        type="button"
        className={`snap-animate snap-animate-delay-7 mt-3 md:mt-8 flex items-center gap-1.5 text-xs md:text-sm tracking-wider uppercase transition-opacity cursor-pointer ${active ? "is-active" : ""}`}
        style={{ color: `rgba(${tintBase}, 0.75)`, background: "none", border: "none", padding: "4px 8px" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        onClick={() => {
          const url = typeof window !== "undefined"
            ? window.location.origin + (process.env.NEXT_PUBLIC_BASE_PATH || "")
            : "";
          if (navigator.share) {
            navigator.share({ title: "Imagine You Are an Intergalactic Gem Hunter", url });
          } else {
            navigator.clipboard.writeText(url);
          }
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        Share
      </button>
    </div>
  );
}
