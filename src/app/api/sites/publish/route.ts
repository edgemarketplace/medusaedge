import { NextRequest, NextResponse } from "next/server";

const DEFAULT_SUPABASE_URL = "https://nzxedlagqtzadyrmgkhq.supabase.co";

type PublishPayload = {
  intakeId?: string | number | null;
  subdomain?: string | null;
  puckData?: any;
  themeName?: string | null;
  templateId?: string | null;
  businessName?: string | null;
  metaDescription?: string | null;
};

function getSupabaseConfig() {
  const baseUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL).replace(/\/+$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey) {
    return null;
  }

  return {
    restUrl: `${baseUrl}/rest/v1`,
    apiKey: serviceKey,
  };
}

function sanitizeSubdomain(value?: string | null) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "")
    .slice(0, 63);
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured for server-side publishing");
  }

  return fetch(`${config.restUrl}${path}`, {
    ...init,
    headers: {
      apikey: config.apiKey,
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PublishPayload;
    const subdomain = sanitizeSubdomain(body.subdomain || (body.intakeId ? `site-${body.intakeId}` : null));

    if (!subdomain) {
      return NextResponse.json({ error: "subdomain is required" }, { status: 400 });
    }

    if (!body.puckData || !Array.isArray(body.puckData.content)) {
      return NextResponse.json({ error: "valid puckData.content is required" }, { status: 400 });
    }

    const intakeId = body.intakeId == null || body.intakeId === "" ? null : String(body.intakeId);
    const now = new Date().toISOString();
    const sitePayload = {
      intake_id: intakeId,
      subdomain,
      business_name: body.businessName || null,
      meta_description: body.metaDescription || null,
      puck_data: body.puckData,
      theme_name: body.themeName || body.puckData?.root?.props?.theme || "luxury-fashion",
      template_id: body.templateId || null,
      status: "active",
      updated_at: now,
    };

    const existingResponse = await supabaseFetch(
      `/marketplace_sites?subdomain=eq.${encodeURIComponent(subdomain)}&select=id&limit=1`,
      { method: "GET" }
    );

    if (!existingResponse.ok) {
      const errorText = await existingResponse.text();
      return NextResponse.json(
        { error: "Failed to check existing site", details: errorText },
        { status: existingResponse.status }
      );
    }

    const existingRows = (await existingResponse.json()) as Array<{ id: string }>;
    const existingId = existingRows[0]?.id;

    const writeResponse = existingId
      ? await supabaseFetch(`/marketplace_sites?id=eq.${encodeURIComponent(existingId)}`, {
          method: "PATCH",
          headers: { Prefer: "return=representation" },
          body: JSON.stringify(sitePayload),
        })
      : await supabaseFetch("/marketplace_sites", {
          method: "POST",
          headers: { Prefer: "return=representation" },
          body: JSON.stringify({ ...sitePayload, created_at: now }),
        });

    if (!writeResponse.ok) {
      const errorText = await writeResponse.text();
      return NextResponse.json(
        { error: "Failed to publish site", details: errorText },
        { status: writeResponse.status }
      );
    }

    const rows = await writeResponse.json();
    const site = rows[0] || null;

    return NextResponse.json({
      success: true,
      site,
      subdomain,
      liveUrl: `https://${subdomain}.edgemarketplacehub.com`,
    });
  } catch (error) {
    console.error("[Sites Publish] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to publish site" },
      { status: 500 }
    );
  }
}
