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
  // First check in-memory
  const memTenant = tenants.find(t => t.subdomain === subdomain)
  if (memTenant) return memTenant
  
  // Fall back to Supabase
  try {
    const config = getSupabaseIntakeConfig()
    if (!config) return null
    
    const url = `${config.restUrl}/marketplace_intakes?subdomain=eq.${encodeURIComponent(subdomain)}&limit=1`
    const response = await fetch(url, {
      headers: {
        'apikey': config.apiKey,
        'Authorization': `Bearer ${config.apiKey}`,
      },
    })
    
    if (!response.ok) return null
    
    const results = await response.json()
    if (!results || results.length === 0) return null
    
    const intake = results[0]
    const tenant: Tenant = {
      id: intake.id,
      businessName: intake.business_name,
      ownerEmail: intake.owner_email,
      subdomain: intake.subdomain,
      templateId: intake.template_id,
      brandColor: intake.brand_color || '#2563eb',
      tagline: intake.tagline || '',
      productsText: intake.products_text || '',
      planType: intake.plan_type || 'launch',
      status: intake.status || 'preview',
      stripeSessionId: intake.stripe_session_id,
      paymentStatus: intake.payment_status,
      createdAt: intake.created_at,
    }
    
    // Cache in memory
    tenants.push(tenant)
    return tenant
  } catch (error) {
    console.error('Failed to fetch tenant from Supabase:', error)
    return null
  }
}

export async function getTenantById(id: string): Promise<Tenant | null> {
  return tenants.find(t => t.id === id) || null
}

export async function isTenantSubdomainTaken(subdomain: string): Promise<boolean> {
  const normalized = String(subdomain || "").trim().toLowerCase()
  if (!normalized) return false

  return tenants.some((tenant) => tenant.subdomain.toLowerCase() === normalized)
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
