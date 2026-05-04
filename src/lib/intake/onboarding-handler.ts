import { NextResponse } from "next/server"
import { registerTenant } from "@/lib/tenants/registry"

function safeSubdomain(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 20)
}

export async function handleTenantOnboarding(req: Request) {
  try {
    const body = await req.json()

    if (!body.businessName || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const subdomain = body.subdomain
      ? safeSubdomain(String(body.subdomain))
      : safeSubdomain(String(body.businessName))

    const tenant = await registerTenant({
      businessName: String(body.businessName),
      ownerEmail: String(body.email),
      subdomain,
      templateId: body.template || "modern-commerce",
      brandColor: body.brandColor || "#2563eb",
      tagline: body.tagline || "",
      productsText: body.products || body.productsText || "",
      planType: body.plan === "pro" ? "pro" : "launch",
      stripeSessionId: body.stripeSessionId,
      paymentStatus: body.stripeSessionId ? "paid" : "pending",
    })

    return NextResponse.json({
      success: true,
      tenantId: tenant.id,
      subdomain: tenant.subdomain,
      previewUrl: `https://${tenant.subdomain}.edgemarketplacehub.com`,
      dashboardUrl: `/dashboard?businessName=${encodeURIComponent(
        tenant.businessName
      )}&brandColor=${encodeURIComponent(tenant.brandColor)}`,
    })
  } catch (error) {
    console.error("Onboarding API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
