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
      // NEW: Puck Editor URL for immediate editing
      puckEditorUrl: `/builder-v3/puck/${selectedTemplateRecord.id}?intakeId=${existing.id}&subdomain=${existingSubdomain}`,
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

    // Create a draft marketplace_sites row and optional inventory when the server-side
    // Supabase key is configured. Do not use the browser publishable key for writes.
    try {
      const supabaseUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co").replace(/\/+$/, "")
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

      if (!supabaseKey) {
        console.warn("[Onboarding] SUPABASE_SERVICE_ROLE_KEY missing; skipping durable site/inventory draft")
      } else {
        const siteResponse = await fetch(`${supabaseUrl}/rest/v1/marketplace_sites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            intake_id: String(tenant.id),
            subdomain: reservedSubdomain,
            business_name: String(body.businessName),
            template_id: selectedTemplateRecord.id,
            theme_name: selectedTemplateRecord.id === "template-fitness-coaching-marketplace" ? 'streetwear-dark' : 'luxury-fashion',
            status: 'active'
          })
        })

        if (siteResponse.ok) {
          const siteData = await siteResponse.json()
          const siteId = siteData?.[0]?.id

          const products = Array.isArray(body.products) ? body.products : []
          if (products.length > 0 && siteId) {
            const inventoryItems = products.map((p: any) => ({
              site_id: siteId,
              title: p.name || p.title || "Untitled Product",
              description: p.description || "",
              price: parseFloat(p.price) || 0,
              sku: p.sku || `SKU-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              inventory_quantity: p.quantity || p.inventory_quantity || 0,
              images: p.images || [],
              status: 'active',
              metadata: {
                category: p.category || "",
                sizeColor: p.sizeColor || "",
                includeInSharedMarketplace: p.includeInSharedMarketplace || false
              }
            }))

            await fetch(`${supabaseUrl}/rest/v1/marketplace_inventory`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
              },
              body: JSON.stringify(inventoryItems)
            })

            console.log(`[Onboarding] Saved ${inventoryItems.length} products to inventory for site ${siteId}`)
          }
        } else {
          console.warn("[Onboarding] Failed to create marketplace site draft", await siteResponse.text())
        }
      }
    } catch (inventoryError) {
      console.error("[Onboarding] Failed to save site/inventory draft:", inventoryError)
      // Don't fail the onboarding if inventory save fails
    }

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
      // NEW: Puck Editor URL for immediate editing
      puckEditorUrl: `/builder-v3/puck/${selectedTemplateRecord.id}?intakeId=${tenant.id}&subdomain=${tenant.subdomain}`,
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
