import { NextRequest, NextResponse } from "next/server";
import { getDesignTokens } from "@/lib/builder-v3/milano-v3-design-tokens";

const SUPABASE_URL = "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = "sb_publishable_mAG0Ncil8LY4Ls-LcBUCUw_k_br_aI6";

/**
 * This route handles rendering published templates on subdomains.
 * 
 * Flow:
 * 1. User visits mystore.edgemarketplacehub.com
 * 2. Middleware rewrites to /site/[subdomain]
 * 3. This page fetches site data from Supabase
 * 4. Renders the Puck template with design tokens
 */

export default async function SubdomainSitePage({
  params,
}: {
  params: { subdomain: string };
}) {
  const subdomain = params.subdomain;

  // Fetch site data from Supabase
  const siteData = await fetchSiteData(subdomain);

  if (!siteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Site Not Found</h1>
          <p className="text-slate-400">
            The marketplace "{subdomain}" has not been deployed yet.
          </p>
        </div>
      </div>
    );
  }

  // Get theme tokens
  const themeName = siteData.theme_name || "luxury-fashion";
  const theme = getDesignTokens(themeName as any);

  // Parse Puck data
  const puckData = siteData.puck_data || {};

  return (
    <html lang="en">
      <head>
        <title>{siteData.business_name || "Marketplace"}</title>
        <meta name="description" content={siteData.meta_description || "Powered by Edge Marketplace Hub"} />
        <style>{`
          :root {
            --color-primary: ${theme.colors.primary};
            --color-secondary: ${theme.colors.secondary};
            --color-accent: ${theme.colors.accent};
            --font-heading: ${theme.typography.fontFamily.heading};
            --font-body: ${theme.typography.fontFamily.body};
            --spacing-section: ${theme.spacing.section};
            --spacing-component: ${theme.spacing.component};
            --radius-lg: ${theme.radii.lg};
            --radius-md: ${theme.radii.md};
          }
          
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: var(--font-body); background: ${theme.colors.background}; color: ${theme.colors.text}; }
          h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); }
        `}</style>
      </head>
      <body>
        <main>
          {/* Render Puck Data */}
          {puckData.root?.props?.title && (
            <header className="p-8 bg-slate-900 text-white">
              <h1 className="text-3xl font-bold">{puckData.root.props.title}</h1>
              {puckData.root.props.subtitle && (
                <p className="mt-2 text-slate-300">{puckData.root.props.subtitle}</p>
              )}
            </header>
          )}

          {/* Render Puck Components */}
          <div className="puck-renderer">
            {puckData.content?.map((component: any, index: number) => (
              <div key={index} className="puck-component">
                <ComponentRenderer component={component} theme={theme} />
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="p-8 bg-slate-950 text-slate-400 text-center text-sm">
            <p>Powered by <a href="https://www.edgemarketplacehub.com" className="text-blue-400">Edge Marketplace Hub</a></p>
          </footer>
        </main>
      </body>
    </html>
  );
}

function ComponentRenderer({ component, theme }: { component: any; theme: any }) {
  if (!component || !component.type) return null;

  const { type, props } = component;

  switch (type) {
    case "HeroSection":
      return (
        <section className="py-20 px-8 text-center" style={{ backgroundColor: theme.colors.primary }}>
          <h2 className="text-5xl font-bold text-white mb-4">{props?.title || "Hero Title"}</h2>
          <p className="text-xl text-white/80 mb-8">{props?.subtitle || "Hero subtitle"}</p>
          {props?.ctaText && (
            <button className="px-8 py-3 bg-white text-slate-900 rounded-lg font-bold">
              {props.ctaText}
            </button>
          )}
        </section>
      );

    case "TextBlock":
      return (
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">{props?.title || "Text Block"}</h3>
          <p className="text-lg leading-relaxed">{props?.content || "Content here..."}</p>
        </section>
      );

    case "ProductGrid":
      return (
        <section className="py-12 px-8">
          <h3 className="text-3xl font-bold mb-8 text-center">{props?.title || "Our Products"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Fetch and render products from marketplace_inventory */}
            <p className="text-slate-500 col-span-full text-center">Products loading...</p>
          </div>
        </section>
      );

    default:
      return (
        <div className="p-4 border border-slate-200 rounded-lg m-4">
          <p className="text-sm text-slate-500">Unknown component: {type}</p>
        </div>
      );
  }
}

async function fetchSiteData(subdomain: string) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/marketplace_sites?subdomain=eq.${subdomain}&select=*`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        // Use Next.js cache for 60 seconds
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      console.error(`[Subdomain] Failed to fetch site: ${response.statusText}`);
      return null;
    }

    const sites = await response.json();
    return sites?.[0] || null;
  } catch (error) {
    console.error("[Subdomain] Error fetching site data:", error);
    return null;
  }
}
