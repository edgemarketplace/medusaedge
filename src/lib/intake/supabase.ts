export type IntakeInsertInput = {
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
}

export type IntakeInsertResult = {
  id: string
  persisted: boolean
  source: "supabase" | "memory"
}

function normalizeSupabaseRestUrl(rawUrl?: string) {
  const url = rawUrl?.trim().replace(/\/+$/, "")

  if (!url) {
    return null
  }

  if (url.endsWith("/rest/v1")) {
    return url
  }

  return `${url}/rest/v1`
}

export function getSupabaseIntakeConfig() {
  const restUrl = normalizeSupabaseRestUrl(
    process.env.SUPABASE_REST_URL ||
      process.env.SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL
  )
  const apiKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const table = process.env.SUPABASE_INTAKES_TABLE || "marketplace_intakes"

  if (!restUrl || !apiKey) {
    return null
  }

  return { restUrl, apiKey, table }
}

export async function insertMarketplaceIntake(
  input: IntakeInsertInput
): Promise<IntakeInsertResult | null> {
  const config = getSupabaseIntakeConfig()

  if (!config) {
    return null
  }

  const now = new Date().toISOString()
  const payload = {
    business_name: input.businessName,
    owner_email: input.ownerEmail,
    subdomain: input.subdomain,
    template_id: input.templateId,
    brand_color: input.brandColor,
    tagline: input.tagline,
    products_text: input.productsText,
    plan_type: input.planType,
    status: input.status,
    stripe_session_id: input.stripeSessionId || null,
    payment_status: input.paymentStatus || "pending",
    raw_payload: input,
    created_at: now,
    updated_at: now,
  }

  const response = await fetch(`${config.restUrl}/${config.table}`, {
    method: "POST",
    headers: {
      apikey: config.apiKey,
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Supabase intake insert failed (${response.status}): ${errorText}`
    )
  }

  const rows = (await response.json()) as Array<{ id?: string }>
  const id = rows[0]?.id

  return {
    id: id || `intake_${Date.now()}`,
    persisted: true,
    source: "supabase",
  }
}
