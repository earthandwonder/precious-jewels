"use client";

import { useRef, useEffect, useState } from "react";
import type { Material } from "@/data/materials";
import { affiliateProducts } from "@/data/products";
import ParticlePile from "./ParticlePile";
import type { MaterialFeel } from "./ParticlePile";
import MassCounter from "./MassCounter";
import ScaleReference, { getRefType, REFERENCES } from "./ScaleReference";
import AffiliateRow from "./AffiliateRow";

function abundanceToNormalized(logMass: number): number {
  const raw = (logMass - 5) / 44;
  return Math.max(0.35, Math.min(1, raw));
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
function conePileHeight(logMass: number, density: number): number {
  const logVolume = logMass - Math.log10(density);
  const logR = (logVolume - Math.log10(0.68)) / 3;
  const logH = logR + Math.log10(0.65);
  return Math.pow(10, logH);
}

const REF_DISPLAY_SIZES: Record<string, number> = {
  earth: 50, everest: 50, statue: 40, human: 35,
};

function abundanceToHeight(abundance: number): number {
  return Math.round(80 + abundance * abundance * 160);
}

function getPileHeight(material: Material): number {
  if (material.act <= 2) {
    return abundanceToHeight(abundanceToNormalized(material.logMass));
  }

  const realH = conePileHeight(material.logMass, material.density);
  const refType = getRefType(material.logMass, material.density, material.act);
  const refRealSize = REFERENCES[refType].realSize;
  const realRatio = realH / refRealSize;
  const clampedRatio = Math.max(0.5, Math.min(6, realRatio));
  const refPx = REF_DISPLAY_SIZES[refType];
  return Math.round(refPx * clampedRatio);
}

export default function MaterialCard({
  material,
  isActive,
}: {
  material: Material;
  isActive: boolean;
}) {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  const active = hasAnimated;

  const pileHeight = getPileHeight(material);
  const abundance = material.act === 3
    ? Math.max(0.35, Math.min(1, pileHeight / 300))
    : abundanceToNormalized(material.logMass);
  const isWarm = material.act === 3;
  const tint = isWarm
    ? "rgba(255, 200, 150,"
    : "rgba(150, 180, 220,";

  const hasProducts = !!affiliateProducts[material.id];

  return (
    <div className="material-card w-full h-full flex flex-col items-center justify-center px-6">
      {/* Visual: pile + reference */}
      <div
        className={`snap-animate snap-animate-delay-1 flex items-end justify-center gap-3 mb-6 overflow-visible ${active ? "is-active" : ""}`}
      >
        <div className="flex-shrink-0">
          <ScaleReference
            logMass={material.logMass}
            density={material.density}
            act={material.act}
            pileHeight={pileHeight}
          />
        </div>

        <div
          className="flex-1"
          style={{
            maxWidth: Math.min(360 + abundance * 120, pileHeight * 2),
          }}
        >
          <ParticlePile
            color={material.color}
            glowColor={material.glowColor}
            abundance={abundance}
            height={pileHeight}
            isVisible={active}
            feel={getMaterialFeel(material)}
            density={material.density}
          />
        </div>
      </div>

      {/* Text block */}
      <div className="text-center max-w-lg mx-auto">
        <h3
          className={`snap-animate snap-animate-delay-2 font-editorial text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] ${active ? "is-active" : ""}`}
          style={{ color: material.color }}
        >
          {material.name}
        </h3>

        <div className={`snap-animate snap-animate-delay-3 ${active ? "is-active" : ""}`}>
          <MassCounter logMass={material.logMass} color={material.color} act={material.act} />
        </div>

        <p
          className={`snap-animate snap-animate-delay-4 font-editorial text-base md:text-lg italic mt-2 mb-3 leading-relaxed ${active ? "is-active" : ""}`}
          style={{ color: `${tint} 0.7)` }}
        >
          {material.tagline}
        </p>

        <p
          className={`snap-animate snap-animate-delay-5 text-xs md:text-sm leading-[1.8] mt-3 max-w-md mx-auto ${active ? "is-active" : ""}`}
          style={{ color: `${tint} 0.5)` }}
        >
          {material.description}
        </p>

        {hasProducts && (
          <div className={`snap-animate snap-animate-delay-6 mt-4 opacity-70 hover:opacity-100 transition-opacity ${active ? "is-active" : ""}`}>
            <p
              className="text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{ color: `${tint} 0.35)` }}
            >
              What it looks like
            </p>
            <AffiliateRow
              products={affiliateProducts[material.id]}
              glowColor={material.glowColor}
              materialColor={material.color}
            />
          </div>
        )}
      </div>
    </div>
  );
}
