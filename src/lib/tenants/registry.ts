// Tenant Registry for MVP.
// Uses Supabase when configured, with an in-memory fallback for local demos.

import { findMarketplaceIntakeByIdempotencyKey, insertMarketplaceIntake } from "@/lib/intake/supabase"

export interface Tenant {
  id: string
  businessName: string
  ownerEmail: string
  subdomain: string
  templateId: string
  brandColor: string
  tagline: string
  productsText: string
  planType: "launch" | "pro"
  status: "draft" | "preview" | "live"
  stripeSessionId?: string
  paymentStatus?: "pending" | "paid" | "failed"
  createdAt: string
}

// Memory-based registry (for demo/dev)
// In a real build, we'd use a serverless database or Redis
const tenants: Tenant[] = [
  {
    id: "tenant_123",
    businessName: "Jason's Store",
    ownerEmail: "jason@example.com",
    subdomain: "jasonsstore",
    templateId: "modern-commerce",
    brandColor: "#2563eb",
    tagline: "Premium goods for locals",
    productsText: "Luxury watches, Leather bands",
    planType: "pro",
    status: "preview",
    createdAt: new Date().toISOString()
  }
]

export async function getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
  // Simulate DB latency
  return tenants.find(t => t.subdomain === subdomain) || null
}

export async function getTenantById(id: string): Promise<Tenant | null> {
  return tenants.find(t => t.id === id) || null
}

export async function registerTenant(
  data: Omit<Tenant, "id" | "status" | "createdAt"> & {
    idempotencyKey: string
    provisioningStatus?: "queued" | "provisioning" | "deployed" | "failed" | "retrying"
  }
): Promise<Tenant> {
  const fallbackId = `tenant_${Math.random().toString(36).substring(2, 11)}`
  const createdAt = new Date().toISOString()

  const { idempotencyKey, provisioningStatus, ...tenantData } = data

  const tenant: Tenant = {
    ...tenantData,
    id: fallbackId,
    status: "preview",
    createdAt,
  }

  try {
    const existing = await findMarketplaceIntakeByIdempotencyKey(idempotencyKey)
    if (existing?.id) {
      const existingTenant = tenants.find((t) => t.id === existing.id)
      if (existingTenant) {
        return existingTenant
      }

      tenant.id = existing.id
      tenants.push(tenant)
      return tenant
    }

    const supabaseResult = await insertMarketplaceIntake({
      businessName: tenant.businessName,
      ownerEmail: tenant.ownerEmail,
      subdomain: tenant.subdomain,
      templateId: tenant.templateId,
      brandColor: tenant.brandColor,
      tagline: tenant.tagline,
      productsText: tenant.productsText,
      planType: tenant.planType,
      status: tenant.status,
      provisioningStatus: provisioningStatus || "queued",
      idempotencyKey,
      stripeSessionId: tenant.stripeSessionId,
      paymentStatus: tenant.paymentStatus,
    })

    if (supabaseResult?.id) {
      tenant.id = supabaseResult.id
    }
  } catch (error) {
    console.error("Supabase intake persistence failed; using memory fallback", error)
  }
  
  // Always keep a local in-process copy so preview/demo reads work immediately.
  // Supabase is the durable source of truth when configured.
  tenants.push(tenant)
  return tenant
}
