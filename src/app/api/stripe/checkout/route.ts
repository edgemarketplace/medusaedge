import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-06-20" as any,
  })

  try {
    const { plan } = await req.json()

    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    let mode: "payment" | "subscription" = "payment"

    if (plan === "pro") {
      mode = "subscription"
      line_items = [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "Edge Marketplace Pro Plan",
            description: "1% fee, Custom Domain, No platform branding",
          },
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
          product_data: {
            name: "Edge Marketplace Launch Activation",
            description: "5% fee, $5 activation fee (refunded after first sale)",
          },
          unit_amount: 500,
        },
        quantity: 1,
      }]
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items,
      mode,
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: "business_name",
          label: { type: "custom", custom: "Business Name" },
          type: "text",
        },
      ],
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/start?session_id={CHECKOUT_SESSION_ID}`,
      metadata: { plan },
    })

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error: any) {
    console.error("STRIPE ERROR:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
