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
 * Cinematic zoom — from object grows and fades, to object fades in.
 * Heliosphere → solar-system includes context text about the 4x size difference.
 */
export default function ScaleTransition({ fromRef, toRef, isActive }: ScaleTransitionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  // Reveal the email capture pill when the solar-system → sun transition is active
  useEffect(() => {
    if (isActive && fromRef === "solar-system" && toRef === "sun") {
      window.dispatchEvent(new Event("captureReveal"));
    }
  }, [isActive, fromRef, toRef]);

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

  return <ZoomTransition fromRef={fromRef} toRef={toRef} progress={progress} />;
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

  const contextText =
    fromRef === "heliosphere" && toRef === "solar-system"
      ? "The entire solar system fits inside Voyager's sphere four times over. We zoom in."
      : null;

  // Phase 1: from object grows and fades (0-0.5)
  const phase1 = Math.min(1, progress / 0.5);
  const fromScale = 60 + phase1 * phase1 * 500;
  const fromOpacity = phase1 < 0.7 ? 1 : Math.max(0, 1 - (phase1 - 0.7) / 0.3);

  // Phase 2: to object fades in (0.5-1) — match heliosphere intro size (280px)
  const phase2 = Math.max(0, (progress - 0.45) / 0.5);
  const toOpacity = Math.min(1, phase2 * 2);
  const toSize = 200;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* From object — grows and fades */}
      {fromOpacity > 0 && (
        <div className="absolute flex flex-col items-center" style={{ opacity: fromOpacity }}>
          {from.render(Math.round(fromScale))}
          {phase1 < 0.4 && (
            <span
              className="mt-2 text-xs font-medium tracking-wider uppercase"
              style={{ color: from.color, opacity: 0.95 }}
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
            className="mt-2 text-xs tracking-wider uppercase"
            style={{ color: to.color, opacity: 0.95 * toOpacity }}
          >
            {to.label}
          </span>
          {contextText && (
            <p
              className="font-editorial text-lg md:text-xl italic mt-6 max-w-sm text-center leading-relaxed"
              style={{
                opacity: Math.max(0, toOpacity - 0.3),
                color: "rgba(235, 240, 248, 1)",
              }}
            >
              {contextText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
