import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function GET() {
  const results: any = {
    env: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrl: SUPABASE_URL,
    },
    tests: [],
  };

  // Test 1: Check site_pages table
  try {
    // Check access
    const accessResp = await fetch(`${SUPABASE_URL}/rest/v1/site_pages?limit=1`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    
    // Count rows
    const countResp = await fetch(`${SUPABASE_URL}/rest/v1/site_pages?select=count`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "count=exact",
      },
    });
    
    const rowCount = countResp.headers.get("content-range")?.split("/")[1] || "0";
    
    results.tests.push({
      name: "site_pages table access",
      status: accessResp.ok ? "OK" : "FAIL",
      httpStatus: accessResp.status,
      rowCount: parseInt(rowCount),
      error: accessResp.ok ? null : await accessResp.text(),
    });
  } catch (error: any) {
    results.tests.push({
      name: "site_pages table access",
      status: "ERROR",
      error: error.message,
    });
  }

  // Test 2: Check if deployments table exists
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/deployments?limit=1`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    results.tests.push({
      name: "deployments table access",
      status: response.ok ? "OK" : "FAIL",
      httpStatus: response.status,
      error: response.ok ? null : await response.text(),
    });
  } catch (error: any) {
    results.tests.push({
      name: "deployments table access",
      status: "ERROR",
      error: error.message,
    });
  }

  return NextResponse.json(results);
}
