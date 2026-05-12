import { loadDraftRecord, saveDraftRecord } from "@/lib/builder-draft-store";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { site_id, slug, puck_data, status } = body;

    const fallbackRecord = saveDraftRecord({
      site_id,
      slug: slug || "home",
      puck_data,
      status: status || "draft",
    });

    if (!SUPABASE_KEY) {
      return new Response(JSON.stringify({ ...fallbackRecord, persisted: false }), { status: 200 });
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/site_pages?on_conflict=site_id,slug`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation,resolution=merge-duplicates",
      },
      body: JSON.stringify({
        site_id,
        slug: slug || "home",
        puck_data,
        status: status || "draft",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Supabase site_pages POST error:", error);
      return new Response(JSON.stringify({ error: "Failed to save site page" }), {
        status: 500,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
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

    if (!SUPABASE_KEY) {
      return new Response(JSON.stringify(fallbackRecord), { status: 200 });
    }

    let fetchUrl = `${SUPABASE_URL}/rest/v1/site_pages?slug=eq.${slug}&order=updated_at.desc&limit=1`;
    if (site_id) fetchUrl += `&site_id=eq.${site_id}`;

    const response = await fetch(fetchUrl, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch site page" }), {
        status: 500,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data[0] || fallbackRecord || null), { status: 200 });
  } catch (error) {
    console.error("site-pages GET error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
