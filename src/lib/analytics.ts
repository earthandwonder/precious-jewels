/**
 * Cookieless, anonymous analytics.
 * Fire-and-forget POSTs to the shell site's analytics endpoint.
 * No cookies, no localStorage, no fingerprinting, no session tracking.
 */

type EventType =
  | "pageview"
  | "email_capture"
  | "scroll_depth"
  | "outbound_click"
  | "footer_reveal"
  | "footer_expand";

interface EventMetadata {
  referrer?: string;
  depth?: string;
  material?: string;
  url?: string;
  [key: string]: string | undefined;
}

export function trackEvent(eventType: EventType, metadata?: EventMetadata) {
  try {
    const payload = {
      project_slug: "rarest-gemstones",
      event_type: eventType,
      referrer: metadata?.referrer || document.referrer || undefined,
      metadata: metadata || {},
    };

    // Use sendBeacon for reliability (survives page unload), fall back to fetch
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", body);
    } else {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        // silent — analytics should never break the experience
      });
    }
  } catch {
    // silent
  }
}
