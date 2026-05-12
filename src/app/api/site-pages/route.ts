import { loadDraftRecord, saveDraftRecord } from "@/lib/builder-draft-store";
import { normalizePageData } from "packages/edge-templates/page-contract";
import { loadPageRecord, savePageRecord } from "packages/edge-templates/supabase-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { site_id, slug, puck_data, status } = body;
    const normalizedPage = normalizePageData(puck_data || {});

    const fallbackRecord = saveDraftRecord({
      site_id,
      slug: slug || "home",
      puck_data: normalizedPage,
      status: status || "draft",
    });

    const persistedRecord = await savePageRecord({
      site_id,
      slug: slug || "home",
      puck_data: normalizedPage,
      status: status || "draft",
    });

    return new Response(
      JSON.stringify(persistedRecord || { ...fallbackRecord, persisted: false }),
      { status: 200 }
    );
  } catch (error) {
    console.error("site-pages POST error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const site_id = url.searchParams.get("site_id");
    const slug = url.searchParams.get("slug") || "home";
    const fallbackRecord = loadDraftRecord(site_id, slug);

    if (!site_id) {
      return new Response(JSON.stringify(fallbackRecord), { status: 200 });
    }

    const page = await loadPageRecord(site_id, slug);
    return new Response(JSON.stringify(page || fallbackRecord || null), { status: 200 });
  } catch (error) {
    console.error("site-pages GET error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
