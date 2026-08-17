import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware rewrites the root path to /en so the [locale] route handles it.
 * English stays at the clean URL (no /en prefix visible to users).
 *
 * With basePath /p/rarest-gemstones, Next.js strips it before middleware sees the path.
 * So /p/rarest-gemstones arrives here as /.
 */
const LOCALE_PREFIXES = new Set(["es", "pt", "fr", "de", "ja", "hi", "zh", "ko"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already has a locale prefix — pass through
  const firstSegment = pathname.split("/")[1];
  if (firstSegment === "en" || LOCALE_PREFIXES.has(firstSegment)) {
    return NextResponse.next();
  }

  // Root or non-locale path — rewrite to /en (internal, URL doesn't change)
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Only match paths that aren't static assets
  matcher: ["/((?!_next|.*\\..*).*)"],
};
