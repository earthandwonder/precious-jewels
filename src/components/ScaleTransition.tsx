"use client";

import { useEffect, useState } from "react";
import { REFERENCES, type RefType } from "./ScaleReference";

interface ScaleTransitionProps {
  fromRef: RefType;
  toRef: RefType;
  isActive: boolean;
}

/**
 * Auto-animated scale transition between two reference objects.
 *
 * For heliosphere → solar-system: shows both side by side at true relative
 * scale (heliosphere 4x larger) so the reader can see the size relationship.
 *
 * For all other transitions: cinematic zoom — from object grows and fades,
 * to object fades in.
 */
export default function ScaleTransition({ fromRef, toRef, isActive }: ScaleTransitionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const start = performance.now();
    const duration = 1800;
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = t * t * (3 - 2 * t);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasAnimated]);

  // Side-by-side comparison for heliosphere → solar system
  if (fromRef === "heliosphere" && toRef === "solar-system") {
    return <SideBySideTransition fromRef={fromRef} toRef={toRef} progress={progress} />;
  }

  // Default: cinematic zoom transition
  return <ZoomTransition fromRef={fromRef} toRef={toRef} progress={progress} />;
}

function SideBySideTransition({
  fromRef,
  toRef,
  progress,
}: {
  fromRef: RefType;
  toRef: RefType;
  progress: number;
}) {
  const from = REFERENCES[fromRef];
  const to = REFERENCES[toRef];

  // True scale ratio: heliosphere (240 AU) vs solar system (60 AU) = 4:1
  const ratio = from.realSize / to.realSize;
  const toSize = 50;
  const fromSize = Math.round(toSize * ratio); // 200px

  // Phase 1: heliosphere fades in on the left (0-0.4)
  const fromOpacity = Math.min(1, progress / 0.4);
  // Phase 2: solar system fades in on the right (0.3-0.7)
  const toOpacity = Math.min(1, Math.max(0, (progress - 0.3) / 0.4));
  // Phase 3: label fades in (0.6-1)
  const labelOpacity = Math.min(1, Math.max(0, (progress - 0.6) / 0.3));

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="flex items-center justify-center gap-6 md:gap-10">
        {/* Heliosphere — larger */}
        <div
          className="flex flex-col items-center"
          style={{ opacity: fromOpacity }}
        >
          {from.render(fromSize)}
          <span
            className="mt-2 text-[9px] tracking-wider uppercase whitespace-nowrap"
            style={{ color: from.color, opacity: 0.6 * fromOpacity }}
          >
            {from.label}
          </span>
        </div>

        {/* Solar system — smaller, at true relative scale */}
        <div
          className="flex flex-col items-center"
          style={{ opacity: toOpacity }}
        >
          {to.render(toSize)}
          <span
            className="mt-2 text-[9px] tracking-wider uppercase whitespace-nowrap"
            style={{ color: to.color, opacity: 0.6 * toOpacity }}
          >
            {to.label}
          </span>
        </div>
      </div>

      {/* Context label */}
      <p
        className="font-editorial text-sm md:text-base italic mt-8 max-w-sm text-center leading-relaxed"
        style={{
          opacity: labelOpacity * 0.55,
          color: "rgba(200, 214, 230, 0.7)",
        }}
      >
        The entire solar system fits inside the heliosphere four times over. We zoom in.
      </p>
    </div>
  );
}

function ZoomTransition({
  fromRef,
  toRef,
  progress,
}: {
  fromRef: RefType;
  toRef: RefType;
  progress: number;
}) {
  const from = REFERENCES[fromRef];
  const to = REFERENCES[toRef];

  // Phase 1: from object grows and fades (0-0.5)
  const phase1 = Math.min(1, progress / 0.5);
  const fromScale = 60 + phase1 * phase1 * 500;
  const fromOpacity = phase1 < 0.7 ? 1 : Math.max(0, 1 - (phase1 - 0.7) / 0.3);

  // Phase 2: to object fades in (0.5-1)
  const phase2 = Math.max(0, (progress - 0.45) / 0.5);
  const toOpacity = Math.min(1, phase2 * 2);
  const toSize = 70;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* From object — grows and fades */}
      {fromOpacity > 0 && (
        <div className="absolute flex flex-col items-center" style={{ opacity: fromOpacity }}>
          {from.render(Math.round(fromScale))}
          {phase1 < 0.4 && (
            <span
              className="mt-2 text-[9px] tracking-wider uppercase"
              style={{ color: from.color, opacity: 0.5 }}
            >
              {from.label}
            </span>
          )}
        </div>
      )}

      {/* To object — fades in */}
      {toOpacity > 0 && (
        <div className="absolute flex flex-col items-center" style={{ opacity: toOpacity }}>
          {to.render(toSize)}
          <span
            className="mt-2 text-[9px] tracking-wider uppercase"
            style={{ color: to.color, opacity: 0.5 * toOpacity }}
          >
            {to.label}
          </span>
        </div>
      )}
    </div>
  );
}
