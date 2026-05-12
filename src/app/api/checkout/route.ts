/**
 * Checkout API - Persist checkout intents to Supabase
 * 
 * POST /api/checkout
 * Body: { siteId, customerName, email, phone, productInterest, notes }
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
      customerName,
      email,
      phone,
      productInterest,
      notes,
    } = body;

    // Validate required fields
    if (!siteId || !customerName || !email) {
      return NextResponse.json(
        { error: "Missing required fields: siteId, customerName, email" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Insert checkout intent into Supabase
    const { data, error } = await supabase
      .from("checkout_intents")
      .insert([
        {
          site_id: siteId,
          customer_name: customerName,
          email: email.toLowerCase(),
          phone: phone || null,
          product_interest: productInterest || null,
          notes: notes || null,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      
      // If table doesn't exist, return helpful error
      if (error.code === "42P01") {
        return NextResponse.json(
          { error: "Checkout table not found. Please run database migration." },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to save order request" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order request received",
      id: data.id,
    });
  } catch (error: any) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
