import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return NextResponse.json(
      {
        error: "Stripe is not configured yet. Missing STRIPE_SECRET_KEY in environment.",
        code: "missing_stripe_secret",
      },
      { status: 500 }
    )
  }

  const stripe = new Stripe(key, { apiVersion: "2024-06-20" as any })

  try {
    const { plan, email, name, intakeId } = await req.json()

    const mode: "payment" | "subscription" = plan === "pro" ? "subscription" : "payment"
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      plan === "pro"
        ? [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Edge Marketplace Pro Plan",
                  description: "1% fee, custom domain, no platform branding",
                },
                unit_amount: 9900,
                recurring: { interval: "month" },
              },
              quantity: 1,
            },
          ]
        : [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Edge Marketplace Launch Activation",
                  description: "5% fee + $5 activation (refunded after first sale)",
                },
                unit_amount: 500,
              },
              quantity: 1,
            },
          ]

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.edgemarketplacehub.com"

    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ["card"],
      line_items,
      customer_email: email || undefined,
      billing_address_collection: "auto",
      success_url: `${baseUrl}/launch-your-marketplace?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/launch-your-marketplace?checkout=cancelled`,
      metadata: {
        plan: String(plan || "launch"),
        customer_name: String(name || ""),
        intake_id: String(intakeId || ""),
      },
      custom_text: {
        submit: {
          message: name ? `Purchasing for ${name}` : undefined,
        },
      },
    })

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (error: any) {
    console.error("STRIPE ERROR:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
