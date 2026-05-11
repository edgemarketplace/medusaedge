import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const siteName = formData.get("siteName") as string;
    
    if (!siteName) {
      return new NextResponse("Site name is required", { status: 400 });
    }

    const siteId = `site-${Date.now()}`;
    
    // Generate basic page data
    const pageData = {
      root: { 
        props: { 
          siteName,
          businessType: "retail",
          templateFamily: "retail-core"
        } 
      },
      content: []
    };

    // Save to Supabase (server-side, can use service role key)
    const SUPABASE_URL = process.env.SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co";
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/site_pages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Prefer": "return=representation",
        },
        body: JSON.stringify({
          site_id: siteId,
          slug: "home",
          puck_data: pageData,
          status: "draft",
        }),
      });
    } catch (dbError) {
      console.error("DB save failed:", dbError);
      // Continue anyway - we'll use localStorage fallback
    }

    // Redirect to editor
    return NextResponse.redirect(new URL(`/builder/${siteId}/edit`, request.url));
  } catch (error) {
    console.error("Form submission error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
