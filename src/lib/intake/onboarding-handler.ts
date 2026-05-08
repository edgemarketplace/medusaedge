import { createHash } from "crypto"
import { NextResponse } from "next/server"
import { registerTenant, isTenantSubdomainTaken } from "@/lib/tenants/registry"
import { findMarketplaceIntakeByIdempotencyKey, findMarketplaceIntakeBySubdomain } from "@/lib/intake/supabase"
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

async function isSubdomainTaken(subdomain: string) {
  const [inMemoryTaken, existingSupabase] = await Promise.all([
    isTenantSubdomainTaken(subdomain),
    findMarketplaceIntakeBySubdomain(subdomain),
  ])

  return inMemoryTaken || Boolean(existingSupabase?.id)
}

async function reserveAvailableSubdomain(baseSubdomain: string) {
  const normalizedBase = safeSubdomain(baseSubdomain || "marketplace") || "marketplace"
  const maxLen = 20

  for (let suffix = 0; suffix < 200; suffix += 1) {
    const suffixText = suffix === 0 ? "" : String(suffix + 1)
    const baseLimit = Math.max(1, maxLen - suffixText.length)
    const boundedBase = normalizedBase.slice(0, baseLimit)
    const candidate = `${boundedBase}${suffixText}`

    if (!(await isSubdomainTaken(candidate))) {
      return candidate
    }
  }

  throw new Error("Unable to reserve an available subdomain")
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

    const requestedSubdomain = body.preferredSubdomain || body.subdomain
      ? safeSubdomain(String(body.preferredSubdomain || body.subdomain))
      : safeSubdomain(String(body.businessName))

    const idempotencyKey = buildIdempotencyKey(body, selectedTemplateRecord.id, requestedSubdomain)
    const existing = await findMarketplaceIntakeByIdempotencyKey(idempotencyKey)

    if (existing?.id) {
      const existingSubdomain = existing.subdomain || requestedSubdomain
      const provisioningStatus = existing.provisioning_status || "queued"
      return NextResponse.json({
        success: true,
        idempotentReplay: true,
        intakeId: existing.id,
        tenantId: existing.id,
        idempotencyKey,
        selectedTemplate: selectedTemplateRecord.id,
        selectedTemplateRepo: selectedTemplateRepo,
        preferredSubdomain: existingSubdomain,
        reservedSubdomain: existingSubdomain,
        subdomain: existingSubdomain,
        previewUrl: `https://${existingSubdomain}.edgemarketplacehub.com`,
        dashboardUrl: `/dashboard?businessName=${encodeURIComponent(String(body.businessName))}&brandColor=${encodeURIComponent(String(body.brandColor || body.brandColors || "#2563eb"))}`,
        status: "intake_received",
        provisioningStatus,
      })
    }

    const reservedSubdomain = await reserveAvailableSubdomain(requestedSubdomain)

    const tenant = await registerTenant({
      businessName: String(body.businessName),
      ownerEmail: String(body.email),
      subdomain: reservedSubdomain,
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

    const provisioningStatus = "queued"

    return NextResponse.json({
      success: true,
      idempotentReplay: false,
      intakeId: tenant.id,
      tenantId: tenant.id,
      idempotencyKey,
      selectedTemplate: selectedTemplateRecord.id,
      selectedTemplateRepo: selectedTemplateRepo,
      preferredSubdomain: tenant.subdomain,
      reservedSubdomain: tenant.subdomain,
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
