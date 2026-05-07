import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 })

  const stripe = new Stripe(key, { apiVersion: "2024-06-20" as any })

  try {
    const { plan, email, name, intakeId } = await req.json()

    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[]
    let mode: "payment" | "subscription"

    if (plan === "pro") {
      mode = "subscription"
      line_items = [{
        price_data: {
          currency: "usd",
          product_data: { name: "Edge Marketplace Pro Plan", description: "1% fee, custom domain, no platform branding" },
          unit_amount: 9900,
          recurring: { interval: "month" },
        },
        quantity: 1,
      }]
    } else {
      mode = "payment"
      line_items = [{
        price_data: {
          currency: "usd",
          product_data: { name: "Edge Marketplace Launch Activation", description: "5% fee + $5 activation (refunded after first sale)" },
          unit_amount: 500,
        },
        quantity: 1,
      }]
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.edgemarketplacehub.com"

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items,
      mode,
      customer_email: email || undefined,
      return_url: `${baseUrl}/launch-your-marketplace?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        plan: String(plan || "launch"),
        customer_name: String(name || ""),
        intake_id: String(intakeId || ""),
      },
    })

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error: any) {
    console.error("STRIPE ERROR:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
