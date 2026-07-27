"use client";

import { useRef, useEffect, useState } from "react";
import type { Material } from "@/data/materials";
import { inlineProducts } from "@/data/products";
import ParticlePile from "./ParticlePile";
import type { MaterialFeel, ParticleShape } from "./ParticlePile";
import MassCounter from "./MassCounter";
import ScaleReference, { getRefType, REFERENCES } from "./ScaleReference";
import AffiliateRow from "./AffiliateRow";

/** Map logVolume to a 0.35-1.0 normalized abundance for particle count/width. */
function abundanceToNormalized(logVolume: number): number {
  const raw = (logVolume - 1.5) / 42;
  return Math.max(0.35, Math.min(1, raw));
}

interface ParticleStyle {
  particleShape: ParticleShape;
  colorJitter: number;
  sizeRange: [number, number];
  countMultiplier?: number;
}

function getParticleStyle(material: Material): ParticleStyle {
  switch (material.id) {
    // Logs / elongated pieces
    case "wood":
    case "petrified-wood":
      return { particleShape: "log", colorJitter: 0.25, sizeRange: [0.3, 0.8], countMultiplier: 2 };
    case "jet":
      return { particleShape: "log", colorJitter: 0.25, sizeRange: [0.6, 1.8] };

    // Flat shards / shell fragments
    case "shell":
      return { particleShape: "shard", colorJitter: 0.2, sizeRange: [0.15, 0.4], countMultiplier: 4 };
    case "ammolite":
      return { particleShape: "shard", colorJitter: 0.2, sizeRange: [0.3, 0.8], countMultiplier: 2 };

    // Branching / irregular organic
    case "coral":
      return { particleShape: "log", colorJitter: 0.15, sizeRange: [0.3, 0.8], countMultiplier: 2 };

    // Faceted crystals / angular chunks
    case "diamond":
    case "quartz":
    case "emerald":
    case "red-beryl":
    case "alexandrite":
    case "benitoite":
    case "taaffeite":
    case "garnet":
    case "zircon":
    case "corundum":
    case "jadeite":
    case "moldavite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.5, 1.4] };

    // Opal — extra colour variation
    case "opal":
      return { particleShape: "chunk", colorJitter: 0.35, sizeRange: [0.5, 1.5] };

    // Smooth round things
    case "pearl":
      return { particleShape: "circle", colorJitter: 0.08, sizeRange: [0.2, 0.4], countMultiplier: 4 };

    // Rounded lumps
    case "amber":
    case "amber-inclusion":
      return { particleShape: "circle", colorJitter: 0.2, sizeRange: [0.3, 0.8], countMultiplier: 2 };

    // Fossils — rounded irregular
    case "ammonite":
      return { particleShape: "circle", colorJitter: 0.2, sizeRange: [0.7, 1.5] };

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
      "benitoite",
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
  heliosphere: 50, "solar-system": 50, sun: 50,
  earth: 50, everest: 50, statue: 40, human: 35,
};

/**
 * All acts now use real proportional sizing.
 * Pile height in px = reference px size * (real pile height / real reference size).
 * Clamped to 0.25x-9x to stay readable. Opal is special-cased (true ratio 0.065x,
 * clamped to 0.3x for readability).
 */
function getPileHeight(material: Material, isMobile: boolean): number {
  const mobileCap = 200;

  const realH = conePileHeight(material.logVolume);
  const refType = getRefType(material.logVolume, material.act);
  const refRealSize = REFERENCES[refType].realSize;
  const realRatio = realH / refRealSize;

  // Opal: true ratio is 0.065x solar system, clamp to 0.3x for readability
  const minRatio = material.id === "opal" ? 0.3 : 0.25;
  const clampedRatio = Math.max(minRatio, Math.min(9, realRatio));
  const refPx = REF_DISPLAY_SIZES[refType];
  const h = Math.round(refPx * clampedRatio);
  return isMobile ? Math.min(h, mobileCap) : h;
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
  const minCanvasHeight = 80;
  const canvasHeight = Math.max(minCanvasHeight, pileHeight);
  const pileScale = pileHeight / canvasHeight;
  const abundance = abundanceToNormalized(material.logVolume);
  const isWarm = material.act === 3;
  const tint = isWarm
    ? "rgba(255, 200, 150,"
    : "rgba(150, 180, 220,";

  const hasProducts = !!inlineProducts[material.id];

  return (
    <div className="material-card w-full h-full flex flex-col items-center justify-center px-4 md:px-6 py-6 md:py-0 overflow-hidden">
      {/* Visual: pile + reference */}
      <div
        className={`snap-animate snap-animate-delay-1 flex items-end justify-center gap-2 md:gap-3 mb-3 md:mb-6 overflow-visible ${active ? "is-active" : ""}`}
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
            maxWidth: Math.max(120, Math.min(360 + abundance * 120, canvasHeight * 2)),
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

      {/* Text block */}
      <div className="text-center max-w-lg mx-auto">
        <h3
          className={`snap-animate snap-animate-delay-2 font-editorial text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] ${active ? "is-active" : ""}`}
          style={{ color: material.color }}
        >
          {material.name}
        </h3>

        <div className={`snap-animate snap-animate-delay-3 ${active ? "is-active" : ""}`}>
          <MassCounter logVolume={material.logVolume} density={material.density} color={material.color} act={material.act} derivation={material.derivation} />
        </div>

        <p
          className={`snap-animate snap-animate-delay-4 font-editorial text-sm md:text-lg italic mt-1 md:mt-2 mb-2 md:mb-3 leading-relaxed ${active ? "is-active" : ""}`}
          style={{ color: `${tint} 0.7)` }}
        >
          {material.tagline}
        </p>

        <p
          className={`snap-animate snap-animate-delay-5 text-[11px] md:text-sm leading-[1.7] md:leading-[1.8] mt-1 md:mt-3 max-w-md mx-auto ${active ? "is-active" : ""}`}
          style={{ color: `${tint} 0.5)` }}
        >
          {material.description}
        </p>

        {hasProducts && (
          <div className={`snap-animate snap-animate-delay-6 mt-3 md:mt-4 opacity-70 hover:opacity-100 transition-opacity ${active ? "is-active" : ""}`}>
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
