"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

export default function ScrollDepthTracker() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const container = document.querySelector(".snap-container");
    if (!container) return;

    function onScroll() {
      const el = container as HTMLElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight <= 0) return;

      const pct = (scrollTop / scrollHeight) * 100;

      for (const t of THRESHOLDS) {
        if (pct >= t && !firedRef.current.has(t)) {
          firedRef.current.add(t);
          trackEvent("scroll_depth", { depth: `${t}` });
        }
      }
    }

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
