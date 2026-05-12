/**
 * Deploy Storefront API
 *
 * POST /api/deploy-storefront
 * Initiates storefront deployment
 */

import { NextRequest, NextResponse } from "next/server";
import { loadDraftRecord } from "@/lib/builder-draft-store";
import { triggerDeployment } from "packages/edge-templates/publish-stub";
import { loadPageRecord } from "packages/edge-templates/supabase-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { siteId } = body;

    if (!siteId) {
      return NextResponse.json(
        { error: "Missing required field: siteId" },
        { status: 400 }
      );
    }

    const page = (await loadPageRecord(siteId, "home")) || loadDraftRecord(siteId, "home");
    const puckData = page?.puck_data;

    if (!puckData) {
      return NextResponse.json(
        { error: "No saved storefront page found for this site" },
        { status: 404 }
      );
    }

    const success = await triggerDeployment(siteId, puckData);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to initiate deployment" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deployment initiated",
      previewUrl: `/storefront/${siteId}?preview=1`,
      liveUrl: `/storefront/${siteId}`,
    });
  } catch (error: any) {
    console.error("Deploy API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
