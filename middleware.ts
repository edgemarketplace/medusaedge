import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to handle subdomain routing
 * 
 * Flow:
 * 1. User visits mystore.edgemarketplacehub.com
 * 2. Middleware detects subdomain (mystore)
 * 3. Rewrites to /site/mystore (internal rewrite, URL stays the same)
 * 4. The page.tsx at /site/[subdomain] renders the Puck template
 */

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Skip middleware for:
  // - Main domain (www.edgemarketplacehub.com, edgemarketplacehub.com)
  // - Admin routes
  // - API routes
  // - Static assets
  const isMainDomain = hostname.match(/^(www\.)?edgemarketplacehub\.com(:\d+)?$/);
  const isAdminRoute = url.pathname.startsWith("/admin");
  const isApiRoute = url.pathname.startsWith("/api");
  const isStaticAsset = url.pathname.match(
    /\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/
  );

  if (isMainDomain || isAdminRoute || isApiRoute || isStaticAsset) {
    return NextResponse.next();
  }

  // Extract subdomain
  const subdomainMatch = hostname.match(
    /^([^.]+)\.edgemarketplacehub\.com(:\d+)?$/
  );

  if (!subdomainMatch || !subdomainMatch[1]) {
    // Not a subdomain, proceed normally
    return NextResponse.next();
  }

  const subdomain = subdomainMatch[1];

  // Skip if subdomain is 'www' or other reserved names
  const reservedSubdomains = ["www", "api", "admin", "mail", "ftp"];
  if (reservedSubdomains.includes(subdomain)) {
    return NextResponse.next();
  }

  console.log(`[Middleware] Rewriting subdomain: ${subdomain}.edgemarketplacehub.com → /site/${subdomain}`);

  // Rewrite to /site/[subdomain]
  url.pathname = `/site/${subdomain}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
