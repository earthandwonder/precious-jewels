"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function PageviewTracker() {
  useEffect(() => {
    trackEvent("pageview", { referrer: document.referrer || undefined });
  }, []);

  return null;
}
