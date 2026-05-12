import { createClient } from "@supabase/supabase-js";
import { createCatalogFromInventoryRows, type Catalog, type InventoryRow } from "packages/edge-commerce/catalog";
import { listInventoryDraftRecords } from "@/lib/inventory-draft-store";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

export async function loadInventoryRows(siteId: string): Promise<InventoryRow[]> {
  if (!supabase) {
    return listInventoryDraftRecords(siteId);
  }

  try {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("site_id", siteId)
      .order("created_at", { ascending: false });

    if (error) {
      if (error.code === "42P01") {
        return listInventoryDraftRecords(siteId);
      }
      throw error;
    }

    return Array.isArray(data) && data.length > 0 ? data : listInventoryDraftRecords(siteId);
  } catch (error) {
    console.error("Failed to load inventory rows:", error);
    return listInventoryDraftRecords(siteId);
  }
}

export async function loadSiteCatalog(siteId: string, currency: string = "USD"): Promise<Catalog> {
  const rows = await loadInventoryRows(siteId);
  return createCatalogFromInventoryRows(siteId, rows, currency);
}
