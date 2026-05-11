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

    // Save to Supabase marketplace_intakes table (server-side, uses service role key)
    const SUPABASE_URL = process.env.SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co";
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    
    if (SUPABASE_KEY) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/marketplace_intakes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Prefer": "return=representation",
          },
          body: JSON.stringify({
            site_id: siteId,
            store_name: siteName,
            selected_template: "retail-core",
            template_data: pageData,
            published: false,
          }),
        });
        console.log("Saved to marketplace_intakes:", siteId);
      } catch (dbError) {
        console.error("DB save failed:", dbError);
      }
    } else {
      console.warn("SUPABASE_SERVICE_ROLE_KEY not set, skipping DB save");
    }

    // Redirect to editor
    return NextResponse.redirect(new URL(`/builder/${siteId}/edit`, request.url));
  } catch (error) {
    console.error("Form submission error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
