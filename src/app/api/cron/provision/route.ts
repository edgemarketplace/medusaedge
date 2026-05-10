import { NextRequest, NextResponse } from "next/server";
import { runProvisioning } from "../../../src/lib/provision/provision-runner.js";

const SUPABASE_URL = "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Cron job endpoint - polls for intakes with provisioning_status='building'
 * and runs the provisioning runner.
 *
 * Triggered by Vercel Cron (every minute in production).
 * Can also be called manually for testing.
 */

export async function GET(req: NextRequest) {
  // Verify cron secret if present (Vercel injects CRON_SECRET)
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!SUPABASE_KEY) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY not configured" },
      { status: 500 }
    );
  }

  console.log("[Cron] Checking for intakes to provision...");

  try {
    // Fetch intakes with status 'building'
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/marketplace_intakes?` +
        "provisioning_status=eq.building&" +
        "order=created_at.asc&" +
        "limit=5&" +
        "select=*",
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase query failed: ${await response.text()}`);
    }

    const intakes = await response.json();

    if (!intakes || intakes.length === 0) {
      console.log("[Cron] No intakes pending provisioning");
      return NextResponse.json({
        success: true,
        message: "No intakes to provision",
        processed: 0,
      });
    }

    console.log(`[Cron] Found ${intakes.length} intake(s) to provision`);

    const results = [];

    for (const intake of intakes) {
      try {
        console.log(`[Cron] Processing intake ${intake.id}...`);

        // Update status to 'provisioning' to prevent double-processing
        await fetch(
          `${SUPABASE_URL}/rest/v1/marketplace_intakes?id=eq.${intake.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
            body: JSON.stringify({
              provisioning_status: "provisioning",
              started_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }),
          }
        );

        // Transform to expected format
        const provisioningData = {
          id: intake.id,
          businessName: intake.business_name,
          subdomain: intake.subdomain,
          templateRepo: getFullRepoPath(intake.template_id),
        };

        // Run provisioning
        const result = await runProvisioning(provisioningData);

        // Update status to 'deployed'
        await fetch(
          `${SUPABASE_URL}/rest/v1/marketplace_intakes?id=eq.${intake.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
            body: JSON.stringify({
              provisioning_status: "deployed",
              finished_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              preview_url: result.previewUrl,
            }),
          }
        );

        console.log(
          `[Cron] ✅ Provisioned ${intake.subdomain}: ${result.previewUrl}`
        );

        results.push({
          intakeId: intake.id,
          subdomain: intake.subdomain,
          status: "success",
          previewUrl: result.previewUrl,
        });
      } catch (error) {
        console.error(
          `[Cron] ❌ Failed to provision ${intake.id}:`,
          error
        );

        // Update status to 'failed'
        await fetch(
          `${SUPABASE_URL}/rest/v1/marketplace_intakes?id=eq.${intake.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
            body: JSON.stringify({
              provisioning_status: "failed",
              last_error:
                error instanceof Error ? error.message : String(error),
              finished_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }),
          }
        );

        results.push({
          intakeId: intake.id,
          subdomain: intake.subdomain,
          status: "failed",
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("[Cron] Fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

function getFullRepoPath(templateId: string): string {
  const templateRepos: Record<string, string> = {
    "template-clothing-marketplace":
      "edgemarketplace/template-clothing-marketplace",
    "template-medusa-b2b-marketplace":
      "edgemarketplace/template-medusa-b2b-marketplace",
    "template-home-goods-furniture-marketplace":
      "edgemarketplace/template-home-goods-furniture-marketplace",
    "template-creator-digital-products-marketplace":
      "edgemarketplace/template-creator-digital-products-marketplace",
    "template-home-services-marketplace":
      "edgemarketplace/template-home-services-marketplace",
    "template-fitness-coaching-marketplace":
      "edgemarketplace/template-fitness-coaching-marketplace",
    "template-beauty-wellness-marketplace":
      "edgemarketplace/template-beauty-wellness-marketplace",
    "template-course-education-marketplace":
      "edgemarketplace/template-course-education-marketplace",
    "template-diy-maker-marketplace":
      "edgemarketplace/template-diy-maker-marketplace",
  };

  return templateRepos[templateId] || `edgemarketplace/${templateId}`;
}
