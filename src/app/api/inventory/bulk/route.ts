/**
 * Bulk Inventory Import API
 * 
 * POST /api/inventory/bulk
 * Body: { siteId, products: Array<{name, price, description, image}> }
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { siteId, products } = body;

    if (!siteId || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "Missing siteId or products array" },
        { status: 400 }
      );
    }

    // Validate each product
    const validatedProducts = products.map((p: any) => ({
      site_id: siteId,
      name: p.name || "Unnamed Product",
      price: p.price || "$0.00",
      description: p.description || null,
      image: p.image || null,
      created_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from("inventory")
      .insert(validatedProducts)
      .select();

    if (error) {
      if (error.code === "42P01") {
        return NextResponse.json(
          { error: "Inventory table not found. Please run migration." },
          { status: 500 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, count: data?.length || 0 });
  } catch (error: any) {
    console.error("Bulk import error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
