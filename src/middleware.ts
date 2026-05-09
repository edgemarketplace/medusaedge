import { NextRequest, NextResponse } from "next/server"

/**
 * Middleware for Edge Marketplace Hub
 * Handles subdomain routing to tenant storefronts
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
  
  if (isSubdomain) {
    const subdomain = host.replace(`.${baseDomain}`, "")
    
    // Rewrite to the storefront route
    const response = NextResponse.rewrite(
      new URL(`/storefront/${subdomain}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
    )
    
    // Set tenant header for downstream use
    response.headers.set("x-tenant", subdomain)
    
    return response
  }

  // For all other requests, just continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/:path*",
  ],
}
