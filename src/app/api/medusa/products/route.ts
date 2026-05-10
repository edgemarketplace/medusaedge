import { NextRequest, NextResponse } from "next/server";

const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "https://medusa.example.com";
const MEDUSA_ADMIN_KEY = process.env.MEDUSA_ADMIN_KEY;

/**
 * GET /api/medusa/products?site_id=123
 * Fetch products from Medusa and sync to marketplace_inventory
 */
export async function GET(req: NextRequest) {
  if (!MEDUSA_ADMIN_KEY) {
    return NextResponse.json(
      { error: "Medusa not configured. Missing MEDUSA_ADMIN_KEY" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("site_id");

    // Fetch products from Medusa
    const medusaResponse = await fetch(
      `${MEDUSA_BACKEND_URL}/store/products`,
      {
        headers: {
          "x-publishable-api-key": MEDUSA_ADMIN_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (!medusaResponse.ok) {
      throw new Error(`Medusa API error: ${medusaResponse.statusText}`);
    }

    const medusaData = await medusaResponse.json();
    const medusaProducts = medusaData.products || [];

    // If site_id provided, sync to marketplace_inventory
    if (siteId) {
      const SUPABASE_URL = "https://nzxedlagqtzadyrmgkhq.supabase.co";
      const SUPABASE_KEY = "sb_publishable_mAG0Ncil8LY4Ls-LcBUCUw_k_br_aI6";

      // Transform Medusa products to marketplace_inventory format
      const inventoryItems = medusaProducts.map((product: any) => ({
        site_id: parseInt(siteId),
        title: product.title,
        description: product.description || "",
        price: product.variants?.[0]?.calculated_price?.calculated_amount 
          ? product.variants[0].calculated_price.calculated_amount / 100 
          : 0,
        sku: product.variants?.[0]?.sku || product.id,
        inventory_quantity: product.variants?.[0]?.inventory_quantity || 0,
        images: product.images?.map((img: any) => img.url) || [],
        medusa_product_id: product.id,
        status: "active",
        metadata: {
          medusa_handle: product.handle,
          medusa_variants: product.variants?.length || 0,
        },
      }));

      // Upsert to Supabase (update if medusa_product_id exists)
      for (const item of inventoryItems) {
        const existingResponse = await fetch(
          `${SUPABASE_URL}/rest/v1/marketplace_inventory?medusa_product_id=eq.${item.medusa_product_id}`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        );

        const existing = await existingResponse.json();

        if (existing && existing.length > 0) {
          // Update existing
          await fetch(
            `${SUPABASE_URL}/rest/v1/marketplace_inventory?medusa_product_id=eq.${item.medusa_product_id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
              },
              body: JSON.stringify(item),
            }
          );
        } else {
          // Create new
          await fetch(`${SUPABASE_URL}/rest/v1/marketplace_inventory`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
            body: JSON.stringify(item),
          });
        }
      }

      return NextResponse.json({
        success: true,
        synced: inventoryItems.length,
        products: inventoryItems,
      });
    }

    return NextResponse.json({
      success: true,
      products: medusaProducts,
    });
  } catch (error) {
    console.error("[Medusa API] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch Medusa products" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/medusa/sync
 * Manual sync trigger for a site
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { site_id } = body;

    if (!site_id) {
      return NextResponse.json({ error: "site_id is required" }, { status: 400 });
    }

    // Reuse GET logic
    const url = new URL(`http://localhost/api/medusa/products?site_id=${site_id}`);
    const request = new NextRequest(url);
    return await GET(request);
  } catch (error) {
    console.error("[Medusa Sync] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed" },
      { status: 500 }
    );
  }
}
