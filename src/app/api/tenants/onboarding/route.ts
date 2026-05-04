import { NextResponse } from "next/server"
import { registerTenant } from "@/lib/tenants/registry"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate required fields
    if (!body.businessName || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate safe subdomain from business name
    const subdomain = body.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 20)

    const tenant = await registerTenant({
      businessName: body.businessName,
      ownerEmail: body.email,
      subdomain: subdomain,
      templateId: body.template || "modern-commerce",
      brandColor: body.brandColor || "#2563eb",
      tagline: body.tagline || "",
      productsText: body.products || "",
      planType: body.plan || "launch"
    })

    return NextResponse.json({
      success: true,
      tenantId: tenant.id,
      subdomain: tenant.subdomain,
      previewUrl: `https://${tenant.subdomain}.edgemarketplacehub.com`,
      dashboardUrl: `/dashboard?businessName=${encodeURIComponent(tenant.businessName)}&brandColor=${encodeURIComponent(tenant.brandColor)}`
    })
  } catch (error) {
    console.error("Onboarding API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
