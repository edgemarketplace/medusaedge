import { updateDeploymentStatus } from "./supabase-service";

export async function triggerDeployment(siteId: string, puckData: any): Promise<boolean> {
  try {
    await updateDeploymentStatus(siteId, "validating", {
      sectionCount: Array.isArray(puckData?.content) ? puckData.content.length : 0,
      templateFamily: puckData?.root?.props?.templateFamily || "retail-core",
    });

    await updateDeploymentStatus(siteId, "published", {
      previewUrl: `/storefront/${siteId}?preview=1`,
      liveUrl: `/storefront/${siteId}`,
      publishedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("Deployment failed:", error);
    await updateDeploymentStatus(siteId, "failed", {
      error: error instanceof Error ? error.message : "Unknown deployment error",
    });
    return false;
  }
}
