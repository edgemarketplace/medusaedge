import { buildSectionManifest, normalizePageData, type PuckPageData } from "./page-contract";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!SUPABASE_KEY) {
  console.warn("SUPABASE_SERVICE_ROLE_KEY not set in environment");
}

export type SitePageRecord = {
  id?: string;
  site_id?: string;
  slug?: string;
  puck_data: PuckPageData;
  normalized_manifest?: ReturnType<typeof buildSectionManifest>;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export type DeploymentRecord = {
  id?: string;
  site_id?: string;
  page_id?: string;
  status?: string;
  domain?: string;
  subdomain?: string;
  checkout_mode?: string;
  last_published_at?: string;
  deployment_metadata?: any;
  created_at?: string;
  updated_at?: string;
};

async function restFetch(path: string, init: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      ...(init.headers || {}),
    },
  });
}

function toPersistedPageRecord(page: SitePageRecord) {
  const normalizedPage = normalizePageData(page.puck_data || {});
  const normalizedManifest = page.normalized_manifest || buildSectionManifest(normalizedPage);

  return {
    site_id: page.site_id,
    slug: page.slug || "home",
    puck_data: normalizedPage,
    normalized_manifest: normalizedManifest,
    status: page.status || "draft",
  };
}

export async function savePageRecord(page: SitePageRecord): Promise<SitePageRecord | null> {
  if (!SUPABASE_KEY) {
    console.error("Cannot save to Supabase: SUPABASE_SERVICE_ROLE_KEY not set");
    return null;
  }

  try {
    const response = await restFetch(`/site_pages?on_conflict=site_id,slug`, {
      method: "POST",
      headers: {
        Prefer: "return=representation,resolution=merge-duplicates",
      },
      body: JSON.stringify(toPersistedPageRecord(page)),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to save page to Supabase:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error("Supabase save error:", error);
    return null;
  }
}

export async function loadPageRecord(siteId: string, slug: string = "home"): Promise<SitePageRecord | null> {
  if (!SUPABASE_KEY) {
    console.error("Cannot load from Supabase: SUPABASE_SERVICE_ROLE_KEY not set");
    return null;
  }

  try {
    const response = await restFetch(
      `/site_pages?site_id=eq.${encodeURIComponent(siteId)}&slug=eq.${encodeURIComponent(slug)}&limit=1`,
      { method: "GET", headers: { Prefer: "return=representation" } }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to load page from Supabase:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Supabase load error:", error);
    return null;
  }
}

export async function updatePageStatus(siteId: string, status: string): Promise<void> {
  if (!SUPABASE_KEY) return;

  try {
    await restFetch(`/site_pages?site_id=eq.${encodeURIComponent(siteId)}`, {
      method: "PATCH",
      body: JSON.stringify({
        status,
        updated_at: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Failed to update page status:", error);
  }
}

export async function createDeployment(siteId: string, checkoutMode: string): Promise<DeploymentRecord | null> {
  if (!SUPABASE_KEY) return null;

  try {
    const response = await restFetch(`/deployments?on_conflict=site_id`, {
      method: "POST",
      headers: {
        Prefer: "return=representation,resolution=merge-duplicates",
      },
      body: JSON.stringify({
        site_id: siteId,
        status: "draft",
        checkout_mode: checkoutMode,
        updated_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error("Failed to create deployment:", await response.text());
      return null;
    }

    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error("Deployment creation error:", error);
    return null;
  }
}

export async function updateDeploymentStatus(siteId: string, status: string, deploymentMetadata?: any): Promise<void> {
  if (!SUPABASE_KEY) return;

  try {
    await restFetch(`/deployments?site_id=eq.${encodeURIComponent(siteId)}`, {
      method: "PATCH",
      body: JSON.stringify({
        status,
        deployment_metadata: deploymentMetadata,
        last_published_at: status === "published" ? new Date().toISOString() : undefined,
        updated_at: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Failed to update deployment status:", error);
  }
}
