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
 * Plays a cinematic zoom when the snap page is entered.
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
      // Smoothstep
      const eased = t * t * (3 - 2 * t);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasAnimated]);

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
