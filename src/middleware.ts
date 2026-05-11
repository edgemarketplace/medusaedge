import { NextRequest, NextResponse } from "next/server"

/**
 * Middleware for Edge Marketplace Hub.
 *
 * Canonical tenant runtime:
 *   tenant.edgemarketplacehub.com -> /site/[subdomain]
 *
 * Keep this file in sync with the root middleware.ts while the repo still
 * contains both locations. Next.js projects may use either root-level or
 * src-level middleware depending on layout; matching behavior prevents route
 * drift during consolidation.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || ""
  const pathname = request.nextUrl.pathname

  // Skip API routes, Next internals, and static assets.
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  const isLocalhost = host.includes("localhost")
  const baseDomain = isLocalhost ? "localhost:3000" : "edgemarketplacehub.com"
  const reservedSubdomains = new Set(["www", "api", "admin", "mail", "ftp"])

  let response: NextResponse

  const isTenantSubdomain =
    host.endsWith(`.${baseDomain}`) &&
    host !== baseDomain &&
    !host.startsWith("www.")

  if (isTenantSubdomain) {
    const subdomain = host.replace(`.${baseDomain}`, "").split(":")[0]

    if (!reservedSubdomains.has(subdomain)) {
      url.pathname = `/site/${subdomain}`
      response = NextResponse.rewrite(url)
      response.headers.set("x-tenant", subdomain)
    } else {
      response = NextResponse.next()
    }
  } else {
    response = NextResponse.next()
  }

  // Redirect old builder-v2 routes to builder-v3
  if (pathname.startsWith("/builder-v2")) {
    const newPath = pathname.replace("/builder-v2", "/builder-v3/puck");
    // Handle /builder-v2 -> /builder-v3/puck/luxury-fashion
    const redirectUrl = newPath === "/builder-v3/puck" ? "/builder-v3/puck/luxury-fashion" : newPath;
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // Redirect old template slugs to new ones
  if (pathname === "/builder-v3/templates/luxury-pdp") {
    return NextResponse.redirect(new URL("/builder-v3/templates/luxury-fashion", request.url))
  }

  // Puck editor routes need eval/inline style allowances for the editor UI.
  // Cover ALL builder routes: /builder/new, /builder/[siteId]/edit, /builder-v3/, /builder-v2/puck/
  if (
    pathname.startsWith("/builder/") ||
    pathname.startsWith("/builder-v2/puck/") ||
    pathname.startsWith("/builder-v3/")
  ) {
    response.headers.set(
      "Content-Security-Policy",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.vercel-insights.com https://*.vercel.com https://js.stripe.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://rsms.me; " +
      "font-src 'self' data: https://fonts.gstatic.com https://rsms.me; " +
      "img-src 'self' data: https:; " +
      "frame-src 'self' https://js.stripe.com https://*.edgemarketplacehub.com;"
    )
  }

  return response
}

export const config = {
  matcher: ["/:path*"],
}
