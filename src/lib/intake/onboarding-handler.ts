import { NextResponse } from "next/server"
import { registerTenant } from "@/lib/tenants/registry"
import { getTemplateById, slugifyBusinessName } from "@/lib/intake/schema"

function safeSubdomain(value: string) {
  return slugifyBusinessName(value).replace(/-/g, "").slice(0, 20)
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
    })

    return NextResponse.json({
      success: true,
      intakeId: tenant.id,
      tenantId: tenant.id,
      selectedTemplate: selectedTemplateRecord.id,
      selectedTemplateRepo: selectedTemplateRepo,
      preferredSubdomain: tenant.subdomain,
      subdomain: tenant.subdomain,
      previewUrl: `https://${tenant.subdomain}.edgemarketplacehub.com`,
      dashboardUrl: `/dashboard?businessName=${encodeURIComponent(
        tenant.businessName
      )}&brandColor=${encodeURIComponent(tenant.brandColor)}`,
      status: "intake_received",
    })
  } catch (error) {
    console.error("Onboarding API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
