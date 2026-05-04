// Mock Tenant Registry for MVP
// In production, this would be a database call to Medusa/Postgres

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

export async function registerTenant(data: Omit<Tenant, "id" | "status" | "createdAt">): Promise<Tenant> {
  const newTenant: Tenant = {
    ...data,
    id: `tenant_${Math.random().toString(36).substr(2, 9)}`,
    status: "preview",
    createdAt: new Date().toISOString()
  }
  
  // For MVP simulation, we push to the local array
  // This won't persist across restarts in serverless, but works for the current session flow
  tenants.push(newTenant)
  return newTenant
}
