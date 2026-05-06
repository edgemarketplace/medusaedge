import { NextResponse } from "next/server"
import { registerTenant } from "@/lib/tenants/registry"

/* ── POST /api/builder/:projectId/deploy ──
 * Trigger deployment from builder state.
 * Builds a tenant from stored project data. */
export async function POST(req: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params

  try {
    const body = await req.json().catch(() => ({}))
    const projectData = body.projectData ?? {}

    // Derive a subdomain from projectId
    const subdomain = `site-${projectId}`.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20)

    // Register / provision the tenant through the existing intake/onboarding flow
    const tenant = await registerTenant({
      businessName: String(body.businessName || "My Marketplace"),
      ownerEmail: String(body.ownerEmail || "owner@example.com"),
      subdomain,
      templateId: body.templateId || "modern-commerce",
      brandColor: body.brandColor || "#2563eb",
      tagline: body.tagline || "",
      productsText: body.productsText || "",
      planType: body.plan === "pro" ? "pro" : "launch",
      stripeSessionId: body.stripeSessionId,
      paymentStatus: body.stripeSessionId ? "paid" : "pending",
    })

    return NextResponse.json({
      success: true,
      tenantId: tenant.id,
      subdomain: tenant.subdomain,
      previewUrl: `https://${tenant.subdomain}.edgemarketplacehub.com`,
    })
  } catch (error: any) {
    console.error("Builder deploy error:", error)
    return NextResponse.json({ error: error.message || "Deployment failed" }, { status: 500 })
  }
}
