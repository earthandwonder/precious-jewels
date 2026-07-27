"use client";

import { useRef, useEffect, useState } from "react";
import type { Material } from "@/data/materials";
import ParticlePile from "./ParticlePile";
import MassCounter from "./MassCounter";
import ScaleReference from "./ScaleReference";

function abundanceToNormalized(logMass: number): number {
  return Math.max(0, Math.min(1, (logMass - 5) / 44));
}

/** Map abundance to a dramatic canvas height range */
function abundanceToHeight(abundance: number): number {
  // Rare materials: 100px (small but visible mound)
  // Abundant materials: 320px (a towering mountain)
  return Math.round(100 + abundance * abundance * 220);
}

export default function MaterialCard({ material }: { material: Material }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const abundance = abundanceToNormalized(material.logMass);
  const pileHeight = abundanceToHeight(abundance);
  const isWarm = material.act === 3;

  return (
    <div
      ref={ref}
      className="material-card"
      data-visible={isVisible}
    >
      {/* Pile + scale reference side by side */}
      <div className="flex items-end justify-center gap-4 mb-6">
        {/* Reference object on the left */}
        <ScaleReference
          logMass={material.logMass}
          density={material.density}
          act={material.act}
          pileHeight={pileHeight}
        />

        {/* Centered hero pile */}
        <div className="flex-1" style={{ maxWidth: Math.min(480 + abundance * 160, pileHeight * 2) }}>
          <ParticlePile
            color={material.color}
            glowColor={material.glowColor}
            abundance={abundance}
            height={pileHeight}
            isVisible={isVisible}
          />
        </div>

        {/* Spacer to keep pile visually centered */}
        <div style={{ minWidth: pileHeight * 0.1 }} />
      </div>

      {/* Text below */}
      <div className="text-center max-w-xl mx-auto">
        <div className="flex items-baseline justify-center gap-3 mb-1">
          <h3
            className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: material.color }}
          >
            {material.name}
          </h3>
          {material.formula && (
            <span className="text-sm text-muted font-mono">
              {material.formula}
            </span>
          )}
        </div>

        <p
          className="text-base md:text-lg mb-3 font-medium"
          style={{
            color: isWarm
              ? "rgba(255, 236, 210, 0.85)"
              : "rgba(200, 210, 230, 0.85)",
          }}
        >
          {material.tagline}
        </p>

        <MassCounter logMass={material.logMass} color={material.color} />

        <p className="text-sm leading-relaxed text-muted max-w-lg mx-auto mt-4">
          {material.description}
        </p>

        {material.scaleComparison && (
          <p
            className="text-xs mt-3 italic max-w-md mx-auto"
            style={{
              color: isWarm
                ? "rgba(255, 200, 150, 0.5)"
                : "rgba(150, 180, 220, 0.5)",
            }}
          >
            {material.scaleComparison}
          </p>
        )}
      </div>
    </div>
  );
}
