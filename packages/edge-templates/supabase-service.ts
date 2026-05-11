const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!SUPABASE_KEY) {
  console.warn("SUPABASE_SERVICE_ROLE_KEY not set in environment");
}

export type SitePageRecord = {
  id?: string;
  site_id?: string;
  slug?: string;
  puck_data: {
    root: Record<string, any>;
    content: unknown[];
  };
  normalized_manifest?: any;
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

export async function savePageRecord(page: SitePageRecord): Promise<SitePageRecord | null> {
  if (!SUPABASE_KEY) {
    console.error("Cannot save to Supabase: SUPABASE_SERVICE_ROLE_KEY not set");
    return null;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/site_pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        site_id: page.site_id,
        slug: page.slug || "home",
        puck_data: page.puck_data,
        status: page.status || "draft",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to save page to Supabase:", response.status, errorText);
      return null;
    }
    const data = await response.json();
    return data[0];
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
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/site_pages?site_id=eq.${siteId}&slug=eq.${slug}&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
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
    await fetch(`${SUPABASE_URL}/rest/v1/site_pages?site_id=eq.${siteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
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
    const response = await fetch(`${SUPABASE_URL}/rest/v1/deployments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        site_id: siteId,
        status: "draft",
        checkout_mode: checkoutMode,
      }),
    });

    if (!response.ok) {
      console.error("Failed to create deployment:", await response.text());
      return null;
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Deployment creation error:", error);
    return null;
  }
}

export async function updateDeploymentStatus(
  siteId: string,
  status: string
): Promise<void> {
  if (!SUPABASE_KEY) return;

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/deployments?site_id=eq.${siteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        status,
        last_published_at: status === "published" ? new Date().toISOString() : undefined,
        updated_at: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Failed to update deployment status:", error);
  }
}
