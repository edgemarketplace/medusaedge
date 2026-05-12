// Page persistence utility with localStorage (swappable to Supabase)
import type { NormalizedPage } from "./types";

const STORAGE_PREFIX = "edge-page-";

export async function savePage(siteId: string, page: NormalizedPage): Promise<void> {
  if (typeof window === "undefined") return;
  
  try {
    const key = `${STORAGE_PREFIX}${siteId}`;
    localStorage.setItem(key, JSON.stringify(page));
    console.log(`[pagePersistence] Saved page for site ${siteId}`);
  } catch (error) {
    console.error("[pagePersistence] Failed to save page:", error);
    throw error;
  }
}

export async function loadPage(siteId: string): Promise<NormalizedPage | null> {
  if (typeof window === "undefined") return null;
  
  try {
    const key = `${STORAGE_PREFIX}${siteId}`;
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    
    const page: NormalizedPage = JSON.parse(stored);
    console.log(`[pagePersistence] Loaded page for site ${siteId}`);
    return page;
  } catch (error) {
    console.error("[pagePersistence] Failed to load page:", error);
    return null;
  }
}

export async function listPages(): Promise<string[]> {
  if (typeof window === "undefined") return [];
  
  const pages: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      pages.push(key.replace(STORAGE_PREFIX, ""));
    }
  }
  return pages;
}

// Export/import for JSON files
export function exportPageData(page: NormalizedPage): string {
  return JSON.stringify(page, null, 2);
}

export function importPageData(jsonString: string): NormalizedPage {
  return JSON.parse(jsonString) as NormalizedPage;
}
