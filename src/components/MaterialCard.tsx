"use client";

import { useRef, useEffect, useState } from "react";
import type { Material } from "@/data/materials";
import { inlineProducts } from "@/data/products";
import ParticlePile from "./ParticlePile";
import type { MaterialFeel, ParticleShape } from "./ParticlePile";
import MassCounter from "./MassCounter";
import ScaleReference, { getRefType, REFERENCES } from "./ScaleReference";
import AffiliateRow from "./AffiliateRow";


interface ParticleStyle {
  particleShape: ParticleShape;
  colorJitter: number;
  sizeRange: [number, number];
  countMultiplier?: number;
}

function getParticleStyle(material: Material): ParticleStyle {
  switch (material.id) {
    case "corundum":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.8, 1.8], countMultiplier: 1.5 };
    case "diamond":
    case "quartz":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.8, 1.8] };
    case "emerald":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.8, 1.8], countMultiplier: 1.5 };
    case "red-beryl":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.5, 1.4], countMultiplier: 2.0 };
    case "alexandrite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.8, 1.8], countMultiplier: 1.5 };
    case "taaffeite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.8, 1.8], countMultiplier: 1.5 };
    case "jadeite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.8, 1.8], countMultiplier: 2.0 };
    case "moldavite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.5, 1.4], countMultiplier: 2.5 };
    case "opal":
      return { particleShape: "chunk", colorJitter: 0.35, sizeRange: [0.4, 0.9], countMultiplier: 0.8 };
    case "wood":
      return { particleShape: "log", colorJitter: 0.25, sizeRange: [0.3, 0.8], countMultiplier: 3.0 };
    case "ammolite":
      return { particleShape: "shard", colorJitter: 0.2, sizeRange: [0.6, 1.4], countMultiplier: 4 };
    case "coral":
      return { particleShape: "log", colorJitter: 0.15, sizeRange: [0.3, 0.8], countMultiplier: 2.5 };
    case "amber":
      return { particleShape: "circle", colorJitter: 0.2, sizeRange: [0.3, 0.8], countMultiplier: 3.0 };
    case "amber-inclusion":
      return { particleShape: "circle", colorJitter: 0.2, sizeRange: [0.6, 1.4], countMultiplier: 5 };
    case "ammonite":
      return { particleShape: "circle", colorJitter: 0.2, sizeRange: [0.4, 0.8], countMultiplier: 1.5 };
    case "pearl":
      return { particleShape: "circle", colorJitter: 0.08, sizeRange: [0.3, 0.6], countMultiplier: 1.5 };
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
function getPileHeight(material: Material, isMobile: boolean, desktopCap: number): number {
  const mobileCap = 400;

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

// Cap desktop piles so the card (pile + text) fits the viewport.
// ~45% of viewport leaves room for title, description, and affiliate row.
// Starts at 400 (matches server render) then updates after hydration.
function useDesktopCap() {
  const [cap, setCap] = useState(400);
  useEffect(() => {
    const update = () => setCap(Math.round(window.innerHeight * 0.45));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cap;
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
  const desktopCap = useDesktopCap();

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  const active = hasAnimated;

  const pileHeight = getPileHeight(material, isMobile, desktopCap);
  const minCanvasHeight = 160;
  const canvasHeight = Math.max(minCanvasHeight, pileHeight);
  const pileScale = pileHeight / canvasHeight;

  // Two-colour system: accent + tint
  // Accent = material.color (title + counter value)
  // Tint = warm or cool neutral (tagline, description — varied by opacity)
  const isWarm = material.act === 3;
  const tintBase = isWarm ? "245, 238, 225" : "230, 238, 248";

  const hasProducts = !!inlineProducts[material.id];

  return (
    <div className="material-card relative w-full max-w-[100vw] h-full flex flex-col items-center justify-center gap-6 md:gap-10 px-4 md:px-6 pt-10 pb-4 md:py-0 overflow-hidden">
      {/* Zone 1: Visual — pile + reference, scaled to fit on mobile */}
      <div
        className={`snap-animate snap-animate-delay-1 flex items-end justify-center gap-2 md:gap-3 overflow-visible ${active ? "is-active" : ""}`}
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
            maxWidth: Math.max(240, pileHeight * 3),
          }}
        >
          <ParticlePile
            color={material.color}
            glowColor={material.glowColor}
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
      </div>

      {/* Zone 3: Description + product — separated from identity */}
      <div className="text-center max-w-lg mx-auto">
        <p
          className={`snap-animate snap-animate-delay-5 text-sm md:text-lg leading-[1.6] md:leading-[1.8] max-w-md mx-auto ${active ? "is-active" : ""}`}
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

    </div>
  );
}
