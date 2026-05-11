import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function POST() {
  try {
    // Get all site_pages with non-"home" slugs
    const getResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/site_pages?slug=neq.home`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!getResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch records" }, { status: 500 });
    }

    const records = await getResponse.json();
    
    // Update each record to slug="home"
    const updates = records.map((record: any) => 
      fetch(`${SUPABASE_URL}/rest/v1/site_pages?id=eq.${record.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({ slug: "home" }),
      })
    );

    await Promise.all(updates);

    return NextResponse.json({ 
      success: true, 
      updated: records.length,
      message: "All records updated to slug='home'" 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
