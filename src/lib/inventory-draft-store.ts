import type { InventoryRow } from "packages/edge-commerce/catalog";

type InventoryDraftRecord = InventoryRow & {
  id: string;
  site_id: string;
  name: string;
  price: string | number;
};

declare global {
  var __edgeInventoryDraftStore: Map<string, InventoryDraftRecord[]> | undefined;
}

const store = globalThis.__edgeInventoryDraftStore ?? new Map<string, InventoryDraftRecord[]>();

if (!globalThis.__edgeInventoryDraftStore) {
  globalThis.__edgeInventoryDraftStore = store;
}

function createId() {
  return globalThis.crypto?.randomUUID?.() || `inv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeRecord(siteId: string, record: InventoryRow): InventoryDraftRecord {
  return {
    id: String(record.id || createId()),
    site_id: siteId,
    name: String(record.name || record.title || "Untitled product"),
    price: record.price || "$0.00",
    description: record.description || null,
    image: record.image || null,
    category: record.category || null,
    sku: record.sku || null,
    in_stock: record.in_stock !== false,
    inventory_quantity: Number.isFinite(Number(record.inventory_quantity)) ? Number(record.inventory_quantity) : 1,
    created_at: record.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function listInventoryDraftRecords(siteId?: string | null) {
  if (!siteId) return [];
  return store.get(siteId) || [];
}

export function saveInventoryDraftRecord(siteId: string, record: InventoryRow) {
  const next = normalizeRecord(siteId, record);
  const existing = listInventoryDraftRecords(siteId).filter((item) => item.id !== next.id);
  const records = [next, ...existing];
  store.set(siteId, records);
  return next;
}

export function bulkSaveInventoryDraftRecords(siteId: string, records: InventoryRow[]) {
  const normalized = records.map((record) => normalizeRecord(siteId, record));
  store.set(siteId, normalized);
  return normalized;
}

export function deleteInventoryDraftRecord(siteId: string, id: string) {
  const next = listInventoryDraftRecords(siteId).filter((record) => record.id !== id);
  store.set(siteId, next);
}
