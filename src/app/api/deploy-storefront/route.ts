/**
 * Deploy Storefront API
 * 
 * POST /api/deploy-storefront
 * Initiates storefront deployment
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      siteId,
      checkoutIntentId,
      status = "deploy_requested",
    } = body;

    if (!siteId) {
      return NextResponse.json(
        { error: "Missing required field: siteId" },
        { status: 400 }
      );
    }

    // Create or update deployment record
    const { data, error } = await supabase
      .from("deployments")
      .upsert([
        {
          site_id: siteId,
          checkout_intent_id: checkoutIntentId || null,
          status: status,
          last_published_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ], {
        onConflict: "site_id",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      
      // If table doesn't exist, return helpful error
      if (error.code === "42P01") {
        return NextResponse.json(
          { error: "Deployments table not found. Please run database migration." },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to initiate deployment" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deployment initiated",
      deployment: data,
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
