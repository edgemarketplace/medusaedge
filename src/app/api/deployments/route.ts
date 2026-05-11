import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${SUPABASE_URL}/rest/v1/deployments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase deployment create error:", response.status, errorText);
      return NextResponse.json({ error: "Failed to create deployment" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { site_id, ...updateData } = body;

    if (!site_id) {
      return NextResponse.json({ error: "site_id required" }, { status: 400 });
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/deployments?site_id=eq.${site_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase deployment update error:", response.status, errorText);
      return NextResponse.json({ error: "Failed to update deployment" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data[0] || { success: true });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
