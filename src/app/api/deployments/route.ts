import { NextRequest, NextResponse } from "next/server";
import { createDeployment, updateDeploymentStatus } from "packages/edge-templates/supabase-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const siteId = body.site_id || body.siteId;

    if (!siteId) {
      return NextResponse.json({ error: "site_id required" }, { status: 400 });
    }

    const deployment = await createDeployment(siteId, body.checkout_mode || body.checkoutMode || "native");
    return NextResponse.json(deployment || { site_id: siteId, persisted: false });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const siteId = body.site_id || body.siteId;

    if (!siteId) {
      return NextResponse.json({ error: "site_id required" }, { status: 400 });
    }

    await updateDeploymentStatus(siteId, body.status || "draft", body.deployment_metadata || body.deploymentMetadata);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
