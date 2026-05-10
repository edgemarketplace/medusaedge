import { BuilderV3RuntimeRenderer } from "@/lib/builder-v3/runtime-renderer";
import type { ThemeName } from "@/lib/builder-v3/milano-v3-design-tokens";

const SUPABASE_URL = "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = "sb_publishable_mAG0Ncil8LY4Ls-LcBUCUw_k_br_aI6";

type MarketplaceSite = {
  id?: string | number;
  subdomain?: string;
  business_name?: string;
  meta_description?: string;
  theme_name?: ThemeName;
  template_id?: string;
  status?: string;
  puck_data?: any;
};

/**
 * Published tenant storefront renderer.
 *
 * Runtime contract:
 * subdomain.edgemarketplacehub.com -> middleware -> /site/[subdomain]
 * /site/[subdomain] fetches marketplace_sites.puck_data
 * BuilderV3RuntimeRenderer renders the same builder-v3 registry components used by Puck.
 */
export default async function SubdomainSitePage({
  params,
}: {
  params: Promise<{ subdomain: string }> | { subdomain: string };
}) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain;
  const siteData = await fetchSiteData(subdomain);

  if (!siteData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
        <div className="text-center max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 mb-4">
            Edge Marketplace Hub
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Site Not Found</h1>
          <p className="text-slate-400 mb-8">
            The marketplace "{subdomain}" has not been deployed yet, or the published record is missing from Supabase.
          </p>
          <a
            href="https://www.edgemarketplacehub.com"
            className="inline-flex items-center justify-center rounded-full bg-white text-slate-950 px-6 py-3 text-sm font-bold uppercase tracking-wide"
          >
            Back to Edge Marketplace Hub
          </a>
        </div>
      </main>
    );
  }

  return (
    <BuilderV3RuntimeRenderer
      data={siteData.puck_data}
      themeName={(siteData.theme_name || "luxury-fashion") as ThemeName}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }> | { subdomain: string };
}) {
  const resolvedParams = await params;
  const siteData = await fetchSiteData(resolvedParams.subdomain);

  return {
    title: siteData?.business_name || `${resolvedParams.subdomain} Marketplace`,
    description: siteData?.meta_description || "Powered by Edge Marketplace Hub",
  };
}

async function fetchSiteData(subdomain: string): Promise<MarketplaceSite | null> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/marketplace_sites?subdomain=eq.${encodeURIComponent(subdomain)}&select=*`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      console.error(`[Subdomain] Failed to fetch site: ${response.status} ${response.statusText}`);
      return null;
    }

    const sites = await response.json();
    return sites?.[0] || null;
  } catch (error) {
    console.error("[Subdomain] Error fetching site data:", error);
    return null;
  }
}
