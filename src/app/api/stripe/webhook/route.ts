import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const SUPABASE_URL = "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(req: NextRequest) {
  if (!STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" as any });

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature || !STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Missing webhook signature or secret" }, { status: 400 });
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);

    console.log(`[Stripe Webhook] Received event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook error" },
      { status: 400 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const intakeId = session.metadata?.intake_id;
  const plan = session.metadata?.plan || "launch";

  if (!intakeId) {
    console.error("[Stripe Webhook] No intake_id in session metadata");
    return;
  }

  console.log(`[Stripe Webhook] Checkout completed for intake ${intakeId}, plan: ${plan}`);

  try {
    // Update marketplace_intakes with payment info
    const updateData: Record<string, any> = {
      payment_status: "paid",
      stripe_session_id: session.id,
      stripe_customer_id: session.customer as string,
      updated_at: new Date().toISOString(),
    };

    if (plan === "pro") {
      updateData.plan_type = "pro";
    }

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/marketplace_intakes?id=eq.${intakeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update intake: ${await response.text()}`);
    }

    console.log(`[Stripe Webhook] Updated intake ${intakeId} payment status to paid`);

    // Trigger provisioning
    await triggerProvisioning(intakeId);
  } catch (error) {
    console.error("[Stripe Webhook] Error handling checkout completed:", error);
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log(`[Stripe Webhook] Payment succeeded for invoice ${invoice.id}`);
  // Handle recurring payment success (for Pro subscriptions)
  // Could update last_payment_date, extend subscription, etc.
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log(`[Stripe Webhook] Subscription deleted: ${subscription.id}`);
  // Handle cancellation - downgrade user, revoke access, etc.
}

async function triggerProvisioning(intakeId: string) {
  try {
    // Fetch intake data
    const response = await fetch(`${SUPABASE_URL}/rest/v1/marketplace_intakes?id=eq.${intakeId}&select=*`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch intake data");
    }

    const intakes = await response.json();
    if (!intakes || intakes.length === 0) {
      throw new Error(`Intake ${intakeId} not found`);
    }

    const intake = intakes[0];

    // Update provisioning status to 'building'
    await fetch(`${SUPABASE_URL}/rest/v1/marketplace_intakes?id=eq.${intakeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        provisioning_status: "building",
        started_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    });

    console.log(`[Stripe Webhook] Provisioning status updated to 'building' for intake ${intakeId}`);

    // TODO: In production, trigger actual provisioning via:
    // 1. Vercel Cron job that polls for 'building' status
    // 2. Redis/Upstash queue (QStash, BullMQ)
    // 3. Supabase Edge Function on database webhook
    // For now, you can manually run: node scripts/provision-test.js
    // OR set up a cron endpoint that calls runProvisioning()

  } catch (error) {
    console.error("[Stripe Webhook] Error triggering provisioning:", error);

    // Update status to 'failed' on error
    await fetch(`${SUPABASE_URL}/rest/v1/marketplace_intakes?id=eq.${intakeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        provisioning_status: "failed",
        last_error: error instanceof Error ? error.message : String(error),
        updated_at: new Date().toISOString(),
      }),
    });
  }
}
