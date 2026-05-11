import { NextResponse } from "next/server";

const SUPABASE_URL = "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function GET() {
  try {
    // Check if tables exist by trying to query them
    const response = await fetch(`${SUPABASE_URL}/rest/v1/site_pages?limit=1`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (response.ok) {
      return NextResponse.json({
        status: "ready",
        message: "Tables exist and are accessible",
        tables: ["site_pages", "deployments"],
      });
    } else {
      const error = await response.text();
      return NextResponse.json({
        status: "missing",
        message: "Tables not found. Run the SQL migration.",
        error,
        sql_file: "/root/medusaedge/supabase/migrations/20260511_create_site_tables.sql",
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}

export async function POST() {
  return NextResponse.json({
    status: "manual_required",
    message: "Please run the SQL file manually in Supabase dashboard SQL Editor",
    sql_file: "/root/medusaedge/supabase/migrations/20260511_create_site_tables.sql",
    instructions: [
      "1. Go to https://supabase.com/dashboard/project/nzxedlagqtzadyrmgkhq/sql",
      "2. Create a new query",
      "3. Copy the SQL from the migration file",
      "4. Run the query",
      "5. Come back and test the flow",
    ],
  });
}
