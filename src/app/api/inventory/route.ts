/**
 * Inventory API - Manage products for a site
 * 
 * GET /api/inventory?siteId=xxx - List products
 * POST /api/inventory - Add product
 * DELETE /api/inventory?id=xxx&siteId=xxx - Delete product
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get("siteId");

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("site_id", siteId)
      .order("created_at", { ascending: false });

    if (error) {
      if (error.code === "42P01") {
        return NextResponse.json({ products: [] });
      }
      throw error;
    }

    return NextResponse.json({ products: data || [] });
  } catch (error: any) {
    console.error("Inventory GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { siteId, name, price, description, image } = body;

    if (!siteId || !name || !price) {
      return NextResponse.json(
        { error: "Missing required fields: siteId, name, price" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("inventory")
      .insert([
        {
          site_id: siteId,
          name,
          price,
          description: description || null,
          image: image || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      if (error.code === "42P01") {
        return NextResponse.json(
          { error: "Inventory table not found. Please run migration." },
          { status: 500 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, product: data });
  } catch (error: any) {
    console.error("Inventory POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const siteId = searchParams.get("siteId");

    if (!id || !siteId) {
      return NextResponse.json({ error: "Missing id or siteId" }, { status: 400 });
    }

    const { error } = await supabase
      .from("inventory")
      .delete()
      .eq("id", id)
      .eq("site_id", siteId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Inventory DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
