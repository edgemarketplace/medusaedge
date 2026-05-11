export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { siteName, siteTagline, logoUrl, currency, checkoutMode, supportEmail } = body;

    if (!siteName) {
      return new Response(JSON.stringify({ error: "Site name is required" }), { status: 400 });
    }

    // Generate site ID and page data
    const siteId = `site-${Date.now()}`;
    const slug = "home";

    // Generate Puck page data (inline for now)
    const generatedPage = {
      root: {
        props: {
          siteName,
          siteTagline,
          businessType: "retail",
          templateFamily: "retail-core",
          stylePreset: "modern-commerce",
          checkoutMode: checkoutMode || "native",
          currency: currency || "USD",
          supportEmail,
          seoTitle: `${siteName} - Online Store`,
          seoDescription: siteTagline || `Shop at ${siteName} for the best products.`,
        },
      },
      content: [
        { type: "PromoHeader", props: { id: "promoheader-0" } },
        { type: "CommerceHeader", props: { id: "commerceheader-1" } },
        { type: "ProductHero", props: { id: "producthero-2", headline: `Welcome to ${siteName}`, subheadline: siteTagline || "Discover our latest collection" } },
        { type: "FeaturedCollection", props: { id: "featuredcollection-3" } },
        { type: "ReviewStrip", props: { id: "reviewstrip-4" } },
        { type: "FAQ", props: { id: "faq-5" } },
        { type: "CommerceFooter", props: { id: "commercefooter-6" } },
      ],
    };

    // Save to Supabase
    const SUPABASE_URL = process.env.SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co";
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    const saveResponse = await fetch(`${SUPABASE_URL}/rest/v1/site_pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        site_id: siteId,
        slug,
        puck_data: generatedPage,
        status: "draft",
      }),
    });

    if (!saveResponse.ok) {
      const errorText = await saveResponse.text();
      console.error("Supabase error:", errorText);
      // Continue anyway - we'll redirect to editor with localStorage fallback
    }

    // Return the siteId so the client can redirect
    return new Response(JSON.stringify({ siteId, slug }), { status: 200 });
  } catch (error) {
    console.error("Onboarding API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
