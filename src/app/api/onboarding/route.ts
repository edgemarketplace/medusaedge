import { saveDraftRecord } from "@/lib/builder-draft-store";
import { generatePageFromOnboarding } from "packages/edge-templates/onboarding-generator";
import { createDeployment, savePageRecord } from "packages/edge-templates/supabase-service";

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

    const draft = saveDraftRecord({
      site_id: siteId,
      slug,
      puck_data: generatedPage,
      status: "draft",
      created_at: new Date().toISOString(),
    });

    const persistedPage = await savePageRecord({
      site_id: siteId,
      slug,
      puck_data: generatedPage,
      status: "draft",
    });

    const deployment = await createDeployment(
      siteId,
      generatedPage?.root?.props?.checkoutMode || "native"
    );

    const persisted = Boolean(persistedPage);
    const persistenceMessage = persisted
      ? undefined
      : "Supabase persistence unavailable; returning local draft only.";

    if (wantsHtmlRedirect) {
      return Response.redirect(new URL(`/builder/${siteId}/edit`, request.url), 303);
    }

    return Response.json({
      siteId,
      slug,
      draft,
      persisted,
      persistenceMessage,
      deployment,
    });
  } catch (error) {
    console.error("Onboarding API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
