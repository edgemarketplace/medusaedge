import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = request.headers.get("host") || "";

  // Handle builder routes - add CSP for Puck editor
  if (
    pathname.startsWith("/builder/") ||
    pathname.startsWith("/builder-v2/") ||
    pathname.startsWith("/builder-v3/") ||
    pathname.startsWith("/storefront/")
  ) {
    const response = NextResponse.next();
    
    // CSP header for Puck editor (allows unsafe-eval and styles from any source for iframes)
    response.headers.set(
      "Content-Security-Policy",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https: data:; connect-src 'self' https:;"
    );
    
    return response;
  }

  // Handle subdomain routing for storefronts
  const subdomainMatch = hostname.match(/^([^.]+)\.edgemarketplacehub\.com(:\d+)?$/);
  if (subdomainMatch && subdomainMatch[1]) {
    const subdomain = subdomainMatch[1];
    const reserved = ["www", "api", "admin", "mail"];
    
    if (!reserved.includes(subdomain)) {
      const url = request.nextUrl.clone();
      url.pathname = `/storefront/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
