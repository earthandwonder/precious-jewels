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
  earth: 60, everest: 60, statue: 50, human: 40,
};

function abundanceToHeight(abundance: number): number {
  return Math.round(100 + abundance * abundance * 220);
}

/**
 * For Act 3: compute pile height in px so the pile-to-reference ratio
 * on screen matches the real-world ratio, clamped to [0.5x, 20x].
 * For Acts 1-2: use the old abundance-based height (Earth is narrative).
 */
function getPileHeight(material: Material): number {
  if (material.act <= 2) {
    return abundanceToHeight(abundanceToNormalized(material.logMass));
  }

  const realH = conePileHeight(material.logMass, material.density);
  const refType = getRefType(material.logMass, material.density, material.act);
  const refRealSize = REFERENCES[refType].realSize;
  const realRatio = realH / refRealSize;
  const clampedRatio = Math.max(0.5, Math.min(8, realRatio));
  const refPx = REF_DISPLAY_SIZES[refType];
  return Math.round(refPx * clampedRatio);
}

export default function MaterialCard({
  material,
}: {
  material: Material;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "100px 0px 100px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pileHeight = getPileHeight(material);
  // For Act 3, scale abundance with pile height so bigger piles get more particles
  const abundance = material.act === 3
    ? Math.max(0.35, Math.min(1, pileHeight / 400))
    : abundanceToNormalized(material.logMass);
  const isWarm = material.act === 3;
  const tint = isWarm
    ? "rgba(255, 200, 150,"
    : "rgba(150, 180, 220,";

  return (
    <div ref={ref} className="material-card" data-visible={isVisible}>
      {/* ── Visual: pile + reference at scale ── */}
      <div className="flex items-end justify-center gap-3 mb-10 overflow-visible">
        {/* Reference object — pulled tight against the pile base */}
        <div className="flex-shrink-0">
          <ScaleReference
            logMass={material.logMass}
            density={material.density}
            act={material.act}
            pileHeight={pileHeight}
          />
        </div>

        {/* Pile — the hero */}
        <div
          className="flex-1"
          style={{
            maxWidth: Math.min(480 + abundance * 160, pileHeight * 2),
          }}
        >
          <ParticlePile
            color={material.color}
            glowColor={material.glowColor}
            abundance={abundance}
            height={pileHeight}
            isVisible={isVisible}
            feel={getMaterialFeel(material)}
            density={material.density}
          />
        </div>
      </div>

      {/* ── Text block — one cohesive unit ── */}
      <div className="text-center max-w-lg mx-auto">
        <h3
          className="font-editorial text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1]"
          style={{ color: material.color }}
        >
          {material.name}
        </h3>

        {/* Counter — data annotation paired with the name */}
        <MassCounter logMass={material.logMass} color={material.color} act={material.act} />

        {/* Tagline — begins the prose */}
        <p
          className="font-editorial text-lg md:text-xl italic mt-3 mb-5 leading-relaxed"
          style={{ color: `${tint} 0.7)` }}
        >
          {material.tagline}
        </p>

        {/* Description — the reading block */}
        <p
          className="text-sm md:text-[15px] leading-[1.8] mt-5 max-w-md mx-auto"
          style={{ color: `${tint} 0.5)` }}
        >
          {material.description}
          {material.formula && (
            <span
              className="font-mono text-xs ml-1"
              style={{ color: `${tint} 0.25)` }}
            >
              ({material.formula})
            </span>
          )}
        </p>

        {/* Product — small, quiet, at the end */}
        {affiliateProducts[material.id] && (
          <div className="mt-6 opacity-70 hover:opacity-100 transition-opacity">
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
