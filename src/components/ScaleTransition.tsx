"use client";

import { useRef, useEffect, useState } from "react";
import { REFERENCES, type RefType } from "./ScaleReference";

interface ScaleTransitionProps {
  fromRef: RefType;
  toRef: RefType;
}

/**
 * A scroll-driven zoom transition between two reference objects.
 *
 * For extreme ratios (e.g. Earth → Everest), uses a cinematic zoom:
 * Phase 1: "from" object grows to fill the view and fades out
 * Phase 2: "to" object fades in at full size
 *
 * For moderate ratios, shows both objects with a Powers-of-Ten zoom.
 */
export default function ScaleTransition({ fromRef, toRef }: ScaleTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = vh / 2;
      const scrolled = center - rect.top;
      const total = rect.height;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const from = REFERENCES[fromRef];
  const to = REFERENCES[toRef];
  const realRatio = from.realSize / to.realSize;

  // For extreme ratios (>100), use a cinematic crossfade zoom
  if (realRatio > 100) {
    return (
      <CinematicZoom
        containerRef={ref}
        progress={progress}
        from={from}
        to={to}
        fromRef={fromRef}
        toRef={toRef}
      />
    );
  }

  // For moderate ratios, use side-by-side zoom
  const visualRatio = Math.min(6, Math.max(2, realRatio));
  const fromBaseSize = 80;
  const toBaseSize = Math.round(80 / visualRatio);
  const gapBase = Math.round(fromBaseSize * 0.15);

  const fadeIn = Math.min(1, progress / 0.1);
  const fadeOut = Math.min(1, Math.max(0, (1 - progress) / 0.1));
  const opacity = fadeIn * fadeOut;
  const zoomProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.8));
  const easedZoom = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);
  const zoom = 1 + easedZoom * (visualRatio - 1);

  const fromSize = fromBaseSize * zoom;
  const toSize = toBaseSize * zoom;
  const gapSize = gapBase * zoom;

  const fromOpacity = zoomProgress > 0.3
    ? Math.max(0, 1 - (zoomProgress - 0.3) / 0.4)
    : 1;
  const toLabelOpacity = Math.min(0.5, (toSize - 10) / 40) * fadeIn;

  return (
    <div
      ref={ref}
      className="relative z-10 overflow-hidden"
      style={{ height: "60vh" }}
    >
      <div
        className="sticky top-0 pointer-events-none overflow-hidden"
        style={{
          opacity,
          height: "60vh",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
        }}
      >
        <div className="absolute" style={{ left: "50%", top: "50%" }}>
          {fromOpacity > 0 && (
            <div
              className="absolute"
              style={{
                right: toSize / 2 + gapSize,
                top: -fromSize / 2,
                opacity: fromOpacity,
              }}
            >
              {from.render(Math.round(fromSize))}
            </div>
          )}
          <div
            className="absolute"
            style={{ left: -toSize / 2, top: -toSize / 2 }}
          >
            {to.render(Math.round(toSize))}
          </div>
        </div>

        {fromOpacity > 0.3 && zoomProgress < 0.4 && (
          <span
            className="absolute text-[9px] tracking-wider uppercase whitespace-nowrap"
            style={{
              color: from.color,
              opacity: 0.5 * fromOpacity * fadeIn,
              top: `calc(50% + ${fromSize / 2 + 8}px)`,
              left: `calc(50% - ${toSize / 2 + gapSize + fromSize / 2}px)`,
              transform: "translateX(-50%)",
            }}
          >
            {from.label}
          </span>
        )}
        {toSize > 10 && (
          <span
            className="absolute text-[9px] tracking-wider uppercase whitespace-nowrap"
            style={{
              color: to.color,
              opacity: toLabelOpacity,
              top: `calc(50% + ${toSize / 2 + 8}px)`,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {to.label}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Cinematic zoom for extreme ratios.
 * Phase 1 (0–0.5): "from" object grows to fill the view, then fades out
 * Phase 2 (0.5–1): "to" object fades in at display size
 */
function CinematicZoom({
  containerRef,
  progress,
  from,
  to,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  from: { label: string; color: string; render: (s: number) => React.ReactNode };
  to: { label: string; color: string; render: (s: number) => React.ReactNode };
  fromRef: RefType;
  toRef: RefType;
}) {
  // Phase 1: from object grows and fades (0–0.5)
  const phase1 = Math.min(1, progress / 0.5);
  const fromScale = 60 + phase1 * phase1 * 500; // 60px → 560px
  const fromOpacity = phase1 < 0.7 ? 1 : Math.max(0, 1 - (phase1 - 0.7) / 0.3);

  // Phase 2: to object fades in (0.5–1)
  const phase2 = Math.max(0, (progress - 0.45) / 0.5);
  const toOpacity = Math.min(1, phase2 * 2);
  const toSize = 70;

  // Overall fade in/out
  const fadeIn = Math.min(1, progress / 0.08);
  const fadeOut = Math.min(1, Math.max(0, (1 - progress) / 0.08));

  return (
    <div
      ref={containerRef}
      className="relative z-10 overflow-hidden"
      style={{ height: "70vh" }}
    >
      <div
        className="sticky top-0 pointer-events-none overflow-hidden flex items-center justify-center"
        style={{
          height: "70vh",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          opacity: fadeIn * fadeOut,
        }}
      >
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
    </div>
  );
}
