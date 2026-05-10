import { NextRequest, NextResponse } from "next/server"

/**
 * Middleware for Edge Marketplace Hub
 * Handles subdomain routing + CSP headers for Puck editor
 */
export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || ""  
  const url = request.nextUrl.pathname
  
  // Skip middleware for API routes, static files, and Next.js internals
  if (
    url.startsWith("/api/") ||
    url.startsWith("/_next/") ||
    url.includes(".")
  ) {
    return NextResponse.next()
  }

  const isLocalhost = host.includes("localhost")
  const baseDomain = isLocalhost ? "localhost:3000" : "edgemarketplacehub.com"
  
  // Check if we are on a subdomain (e.g. jasonsstore.edgemarketplacehub.com)
  const isSubdomain = host.endsWith(`.${baseDomain}`) && !host.startsWith("www.") && host !== baseDomain
  
  let response: NextResponse
  
  if (isSubdomain) {
    const subdomain = host.replace(`.${baseDomain}`, "")
    
    // Rewrite to the storefront route
    response = NextResponse.rewrite(
      new URL(`/storefront/${subdomain}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
    )
    
    // Set tenant header for downstream use
    response.headers.set("x-tenant", subdomain)
  } else {
    response = NextResponse.next()
  }
  
  // CSP HEADERS FOR PUCK EDITOR ROUTES
  // Puck uses eval() internally for drag/drop — must allow unsafe-eval
  if (
    url.startsWith("/builder-v2/puck/") ||
    url.startsWith("/builder-v3/")
  ) {
    response.headers.set(
      "Content-Security-Policy",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.vercel-insights.com https://*.vercel.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
    )
  }
  
  return response
}

export const config = {
  matcher: [
    "/:path*",
  ],
}
