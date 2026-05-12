type DraftRecord = {
  site_id?: string;
  slug?: string;
  puck_data?: unknown;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

declare global {
  var __edgeBuilderDraftStore: Map<string, DraftRecord> | undefined;
}

const store = globalThis.__edgeBuilderDraftStore ?? new Map<string, DraftRecord>();

if (!globalThis.__edgeBuilderDraftStore) {
  globalThis.__edgeBuilderDraftStore = store;
}

function getDraftKey(siteId: string, slug: string = "home") {
  return `${siteId}:${slug}`;
}

export function saveDraftRecord(record: DraftRecord) {
  if (!record.site_id) {
    throw new Error("site_id is required to save a draft record");
  }

  const slug = record.slug || "home";
  const existing = store.get(getDraftKey(record.site_id, slug));

  const nextRecord: DraftRecord = {
    ...existing,
    ...record,
    slug,
    updated_at: record.updated_at || new Date().toISOString(),
    created_at: existing?.created_at || record.created_at || new Date().toISOString(),
  };

  store.set(getDraftKey(record.site_id, slug), nextRecord);
  return nextRecord;
}

export function loadDraftRecord(siteId?: string | null, slug: string = "home") {
  if (!siteId) return null;
  return store.get(getDraftKey(siteId, slug)) || null;
}