import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

const SUPABASE_URL = "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = "sb_publishable_mAG0Ncil8LY4Ls-LcBUCUw_k_br_aI6";

interface InventoryItem {
  id?: string;
  site_id?: number;
  title: string;
  description?: string;
  price: number;
  compare_at_price?: number;
  sku?: string;
  inventory_quantity?: number;
  images?: string[];
  medusa_product_id?: string;
  status?: string;
  metadata?: Record<string, any>;
}

/**
 * GET /api/inventory?site_id=123
 * List inventory items for a site
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get('site_id');
    const intakeId = searchParams.get('intake_id');

    let url = `${SUPABASE_URL}/rest/v1/marketplace_inventory?select=*`;
    if (siteId) {
      url += `&site_id=eq.${siteId}`;
    }
    if (intakeId) {
      // Join with marketplace_sites to get site by intake_id
      url = `${SUPABASE_URL}/rest/v1/marketplace_inventory?select=*,marketplace_sites!inner(*)&marketplace_sites.intake_id=eq.${intakeId}`;
    }

    const response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.statusText}`);
    }

    const items = await response.json();
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Inventory GET error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/inventory
 * Create new inventory item(s)
 * Body: single item or array of items
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: InventoryItem[] = Array.isArray(body) ? body : [body];

    // Validate required fields
    for (const item of items) {
      if (!item.title || item.price === undefined) {
        return NextResponse.json(
          { error: "Title and price are required" },
          { status: 400 }
        );
      }
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/marketplace_inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(items.map(item => ({
        site_id: item.site_id,
        title: item.title,
        description: item.description || null,
        price: item.price,
        compare_at_price: item.compare_at_price || null,
        sku: item.sku || `SKU-${createHash('md5').update(item.title).digest('hex').slice(0, 8)}`,
        inventory_quantity: item.inventory_quantity || 0,
        images: item.images || [],
        medusa_product_id: item.medusa_product_id || null,
        status: item.status || 'active',
        metadata: item.metadata || {}
      })))
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Supabase error: ${errorText}`);
    }

    const newItems = await response.json();
    return NextResponse.json({ success: true, items: newItems });
  } catch (error) {
    console.error("Inventory POST error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create inventory items" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/inventory?id=123
 * Update inventory item
 */
export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const updateData: Record<string, any> = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.compare_at_price !== undefined) updateData.compare_at_price = body.compare_at_price;
    if (body.inventory_quantity !== undefined) updateData.inventory_quantity = body.inventory_quantity;
    if (body.images !== undefined) updateData.images = body.images;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.metadata !== undefined) updateData.metadata = body.metadata;

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/marketplace_inventory?id=eq.${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(updateData)
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.statusText}`);
    }

    const updatedItems = await response.json();
    return NextResponse.json({ success: true, item: updatedItems[0] });
  } catch (error) {
    console.error("Inventory PATCH error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update inventory item" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/inventory?id=123
 * Delete inventory item
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/marketplace_inventory?id=eq.${id}`,
      {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.statusText}`);
    }

    return NextResponse.json({ success: true, message: "Item deleted" });
  } catch (error) {
    console.error("Inventory DELETE error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete inventory item" },
      { status: 500 }
    );
  }
}
