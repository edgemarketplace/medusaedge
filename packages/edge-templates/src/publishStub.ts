import { EdgeRootProps, DeploymentRecord } from "./types";
import { validatePage } from "./plugins/publishValidationPlugin";
import { savePage } from "./pagePersistence";

/**
 * Publish stub: validates page, triggers deployment (simulated for now)
 * In production, this would call Vercel API, update Supabase, etc.
 */
export async function publishPage(
  siteId: string,
  root: EdgeRootProps,
  content: unknown[]
): Promise<{ success: boolean; deployment?: DeploymentRecord; errors?: string[] }> {
  // 1. Validate page
  const validation = validatePage(root, content);
  if (!validation.valid) {
    return { success: false, errors: validation.errors };
  }

  // 2. Normalize content
  const normalizedContent = content.map((item: any, index) => ({
    id: item.id || `content-${index}`,
    type: item.type,
    props: item.props || {},
    order: item.order || index,
  }));

  // 3. Create deployment record (simulated)
  const deployment: DeploymentRecord = {
    siteId,
    status: "validating",
    checkoutMode: root.checkoutMode,
    lastPublishedAt: new Date().toISOString(),
  };

  // Simulate deployment delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Update status to published (simulated success)
  deployment.status = "published";

  // 4. Save published page (for storefront to load)
  const pageRecord = {
    id: `page-${Date.now()}`,
    siteId,
    slug: "home", // Default to home page for now
    puckData: { root, content },
  };
  savePage(pageRecord);

  return { success: true, deployment };
}
