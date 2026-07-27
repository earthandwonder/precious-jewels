"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { materials, interstitials } from "@/data/materials";
import type { Material } from "@/data/materials";
import MaterialCard from "./MaterialCard";
import Interstitial from "./Interstitial";
import ScrollProgress from "./ScrollProgress";
import ScaleTransition from "./ScaleTransition";
import ScrollAtmosphere from "./ScrollAtmosphere";
import { getRefType } from "./ScaleReference";
import Finale from "./Finale";
import EarthIntro from "./EarthIntro";

/**
 * Build the ordered list of all snap pages (segments).
 * Each segment is either a material card, interstitial, scale transition,
 * or special section (hero, earth-intro, finale).
 */
type Segment =
  | { type: "hero" }
  | { type: "earth-intro" }
  | { type: "material"; material: Material }
  | { type: "interstitial"; key: "1-2" | "2-3" }
  | { type: "scale-transition"; fromRef: string; toRef: string; fromId: string; toId: string }
  | { type: "finale" };

function buildSegments(): Segment[] {
  const act1 = materials.filter((m) => m.act === 1);
  const act2 = materials.filter((m) => m.act === 2);
  const act3 = materials.filter((m) => m.act === 3);

  const segments: Segment[] = [];

  segments.push({ type: "hero" });
  segments.push({ type: "earth-intro" });

  // Act 1 materials
  addMaterialsWithTransitions(segments, act1);

  // Interstitial 1->2
  segments.push({ type: "interstitial", key: "1-2" });

  // Act 2 materials (pass last act1 material so solar-system → sun transition fires)
  const act1Last = act1[act1.length - 1];
  addMaterialsWithTransitions(segments, act2, act1Last);

  // Interstitial 2->3
  segments.push({ type: "interstitial", key: "2-3" });

  // Act 3 materials (with prev from act 2 for transition check)
  const act2Last = act2[act2.length - 1];
  addMaterialsWithTransitions(segments, act3, act2Last);

  segments.push({ type: "finale" });

  return segments;
}

function addMaterialsWithTransitions(
  segments: Segment[],
  items: Material[],
  prevMaterial?: Material
) {
  for (let i = 0; i < items.length; i++) {
    const m = items[i];
    const prev = i === 0 ? prevMaterial : items[i - 1];
    const currentRef = getRefType(m.logVolume, m.act);
    const prevRef = prev ? getRefType(prev.logVolume, prev.act) : null;

    if (prevRef && prevRef !== currentRef) {
      segments.push({
        type: "scale-transition",
        fromRef: prevRef,
        toRef: currentRef,
        fromId: prev!.id,
        toId: m.id,
      });
    }

    segments.push({ type: "material", material: m });
  }
}

const allSegments = buildSegments();

export default function Essay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const pageHeight = el.clientHeight;
    const index = Math.round(scrollTop / pageHeight);
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const totalPages = allSegments.length;
  const progress = totalPages > 1 ? (activeIndex / (totalPages - 1)) * 100 : 0;

  return (
    <>
      <ScrollProgress progress={progress} />
      <ScrollAtmosphere progress={activeIndex / Math.max(1, totalPages - 1)} />
      <div className="starfield" />

      <div ref={containerRef} className="snap-container">
        {allSegments.map((segment, i) => {
          const isActive = i === activeIndex;

          switch (segment.type) {
            case "hero":
              return (
                <div key="hero" className="snap-page">
                  <HeroPage isActive={isActive} />
                </div>
              );

            case "earth-intro":
              return (
                <div key="earth-intro" className="snap-page">
                  <EarthIntro isActive={isActive} />
                </div>
              );

            case "material":
              return (
                <div key={segment.material.id} className="snap-page">
                  <MaterialCard material={segment.material} isActive={isActive} />
                </div>
              );

            case "interstitial":
              return (
                <div key={`interstitial-${segment.key}`} className="snap-page">
                  <Interstitial
                    {...interstitials[segment.key]}
                    partLabel={segment.key === "1-2" ? "Part II" : "Part III"}
                    isActive={isActive}
                  />
                </div>
              );

            case "scale-transition":
              return (
                <div
                  key={`transition-${segment.fromId}-${segment.toId}`}
                  className="snap-page"
                >
                  <ScaleTransition
                    fromRef={segment.fromRef as any}
                    toRef={segment.toRef as any}
                    isActive={isActive}
                  />
                </div>
              );

            case "finale":
              return (
                <div key="finale" className="snap-page">
                  <Finale isActive={isActive} />
                </div>
              );

          }
        })}
      </div>
    </>
  );
}

function HeroPage({ isActive }: { isActive: boolean }) {
  return (
    <header className="hero-gradient relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 45%, rgba(80, 120, 180, 0.06) 0%, transparent 70%)",
        }}
      />

      <h1 className="hero-title font-editorial text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 text-foreground relative z-10 leading-[0.95]">
        Imagine you are
        <br />
        an intergalactic
        <br />
        <span className="italic hero-gemstones">gem hunter</span>...
      </h1>

      <div className="hero-subtitle relative z-10 mb-6">
        <p
          className="font-editorial text-xl md:text-2xl lg:text-3xl italic max-w-xl leading-relaxed"
          style={{ color: "rgba(232, 230, 227, 0.85)" }}
        >
          Which gemstones are common across the universe?
          <br />
          Which are vanishingly rare?
        </p>
      </div>

      <div className="hero-arrow relative z-10 text-muted mt-16">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </header>
  );
}
