import { saveDraftRecord } from "@/lib/builder-draft-store";
import { generatePageFromOnboarding } from "packages/edge-templates/onboarding-generator";

function normalizePayload(body: Record<string, FormDataEntryValue | undefined>) {
  return {
    siteName: typeof body.siteName === "string" ? body.siteName : "",
    siteTagline: typeof body.siteTagline === "string" ? body.siteTagline : "",
    logoUrl: typeof body.logoUrl === "string" ? body.logoUrl : "",
    currency: typeof body.currency === "string" ? body.currency : "USD",
    checkoutMode:
      typeof body.checkoutMode === "string" ? body.checkoutMode : "native",
    supportEmail: typeof body.supportEmail === "string" ? body.supportEmail : "",
  };
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const wantsHtmlRedirect =
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data");

    const body = wantsHtmlRedirect
      ? normalizePayload(Object.fromEntries(await request.formData()))
      : normalizePayload(await request.json());

    const { siteName } = body;

    if (!siteName) {
      return Response.json({ error: "Site name is required" }, { status: 400 });
    }

    const siteId = `site-${Date.now()}`;
    const slug = "home";
    const generatedPage = generatePageFromOnboarding(body);

    const draft = {
      site_id: siteId,
      slug,
      puck_data: generatedPage,
      status: "draft",
      created_at: new Date().toISOString(),
    };

    saveDraftRecord(draft);

    const supabaseUrl = process.env.SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    let persisted = false;
    let persistenceMessage: string | undefined;

    if (supabaseKey) {
      const saveResponse = await fetch(`${supabaseUrl}/rest/v1/site_pages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify({
          site_id: siteId,
          slug,
          puck_data: generatedPage,
          status: "draft",
        }),
      });

      if (!saveResponse.ok) {
        persistenceMessage = await saveResponse.text();
        console.error("Onboarding persistence error:", persistenceMessage);
      } else {
        persisted = true;
      }
    } else {
      persistenceMessage = "SUPABASE_SERVICE_ROLE_KEY not configured; returning local draft only.";
      console.warn(persistenceMessage);
    }

    if (wantsHtmlRedirect) {
      return Response.redirect(new URL(`/builder/${siteId}/edit`, request.url), 303);
    }

    return Response.json({
      siteId,
      slug,
      draft,
      persisted,
      persistenceMessage,
    });
  } catch (error) {
    console.error("Onboarding API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
