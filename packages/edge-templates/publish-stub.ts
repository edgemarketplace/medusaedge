import { updateDeploymentStatus } from "./supabase-service";

export async function triggerDeployment(siteId: string, puckData: any): Promise<boolean> {
  try {
    // 1. Update deployment status to validating
    await updateDeploymentStatus(siteId, "validating");

    // 2. Trigger provisioning (reuse existing flow)
    // In production, this would call your provisioning API or script
    const provisionUrl = `${process.env.VERCEL_URL || "https://www.edgemarketplacehub.com"}/api/provision`;
    const response = await fetch(provisionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteId, puckData }),
    });

    if (!response.ok) throw new Error("Provisioning failed");

    // 3. Update status to published
    await updateDeploymentStatus(siteId, "published");
    return true;
  } catch (error) {
    console.error("Deployment failed:", error);
    await updateDeploymentStatus(siteId, "failed");
    return false;
  }
}
