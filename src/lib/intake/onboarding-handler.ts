import { createHash } from "crypto"
import { NextResponse } from "next/server"
import { registerTenant } from "@/lib/tenants/registry"
import { findMarketplaceIntakeByIdempotencyKey } from "@/lib/intake/supabase"
import { getTemplateById, slugifyBusinessName } from "@/lib/intake/schema"

function safeSubdomain(value: string) {
  return slugifyBusinessName(value).replace(/-/g, "").slice(0, 20)
}

function normalizePayloadValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizePayloadValue)
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => [k, normalizePayloadValue(v)])
    return Object.fromEntries(entries)
  }

  if (typeof value === "string") {
    return value.trim()
  }

  return value ?? null
}

function buildIdempotencyKey(body: Record<string, any>, templateId: string, preferredSubdomain: string) {
  const normalizedPayload = normalizePayloadValue(body)
  const payloadHash = createHash("sha256").update(JSON.stringify(normalizedPayload)).digest("hex")

  const canonical = {
    businessName: String(body.businessName || "").trim().toLowerCase(),
    email: String(body.email || "").trim().toLowerCase(),
    vertical: templateId,
    preferredSubdomain,
    payloadHash,
  }

  const hash = createHash("sha256").update(JSON.stringify(canonical)).digest("hex")
  return `intake_${hash}`
}

export async function handleTenantOnboarding(req: Request) {
  try {
    const body = await req.json()

    if (!body.businessName || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const selectedTemplate = String(body.selectedTemplate || body.template || "template-clothing-marketplace")
    const selectedTemplateRecord = getTemplateById(selectedTemplate)
    const selectedTemplateRepo = selectedTemplateRecord.repo

    const preferredSubdomain = body.preferredSubdomain || body.subdomain
      ? safeSubdomain(String(body.preferredSubdomain || body.subdomain))
      : safeSubdomain(String(body.businessName))

    const idempotencyKey = buildIdempotencyKey(body, selectedTemplateRecord.id, preferredSubdomain)
    const existing = await findMarketplaceIntakeByIdempotencyKey(idempotencyKey)

    const tenant = await registerTenant({
      businessName: String(body.businessName),
      ownerEmail: String(body.email),
      subdomain: preferredSubdomain,
      templateId: selectedTemplateRecord.id,
      brandColor: body.brandColor || body.brandColors || "#2563eb",
      tagline: body.tagline || "",
      productsText: body.offerSummary || body.products || body.productsText || "",
      planType: body.plan === "pro" ? "pro" : "launch",
      stripeSessionId: body.stripeSessionId,
      paymentStatus: body.stripeSessionId ? "paid" : "pending",
      provisioningStatus: "queued",
      idempotencyKey,
    })

    const provisioningStatus = existing?.provisioning_status || "queued"

    return NextResponse.json({
      success: true,
      idempotentReplay: Boolean(existing?.id),
      intakeId: tenant.id,
      tenantId: tenant.id,
      idempotencyKey,
      selectedTemplate: selectedTemplateRecord.id,
      selectedTemplateRepo: selectedTemplateRepo,
      preferredSubdomain: tenant.subdomain,
      subdomain: tenant.subdomain,
      previewUrl: `https://${tenant.subdomain}.edgemarketplacehub.com`,
      dashboardUrl: `/dashboard?businessName=${encodeURIComponent(
        tenant.businessName
      )}&brandColor=${encodeURIComponent(tenant.brandColor)}`,
      status: "intake_received",
      provisioningStatus,
    })
  } catch (error) {
    console.error("Onboarding API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
