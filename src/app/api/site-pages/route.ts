import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get("site_id");
  const slug = searchParams.get("slug") || "home";

  if (!siteId) {
    return NextResponse.json({ error: "site_id required" }, { status: 400 });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
    const response = await fetch(
      `${supabaseUrl}/rest/v1/site_pages?site_id=eq.${siteId}&slug=eq.${slug}&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase load error:", response.status, errorText);
      return NextResponse.json({ error: "Failed to load page", details: errorText }, { status: response.status });
    }

    const data = await response.json();
    if (data.length === 0) {
      return NextResponse.json({ error: "Not found", site_id: siteId, slug }, { status: 404 });
    }
    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${SUPABASE_URL}/rest/v1/site_pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase save error:", response.status, errorText);
      return NextResponse.json({ error: "Failed to save page" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { site_id, slug, ...updateData } = body;

    if (!site_id) {
      return NextResponse.json({ error: "site_id required" }, { status: 400 });
    }

    const filter = slug ? `site_id=eq.${site_id}&slug=eq.${slug}` : `site_id=eq.${site_id}`;
    const response = await fetch(`${SUPABASE_URL}/rest/v1/site_pages?${filter}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase update error:", response.status, errorText);
      return NextResponse.json({ error: "Failed to update page" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data[0] || { success: true });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
