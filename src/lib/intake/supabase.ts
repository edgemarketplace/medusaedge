export const PROVISIONING_STATUSES = [
  "queued",
  "provisioning",
  "deployed",
  "failed",
  "retrying",
] as const

export type ProvisioningStatus = (typeof PROVISIONING_STATUSES)[number]

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
  provisioningStatus: ProvisioningStatus
  idempotencyKey: string
  stripeSessionId?: string
  paymentStatus?: "pending" | "paid" | "failed"
}

export type IntakeInsertResult = {
  id: string
  persisted: boolean
  source: "supabase" | "memory"
  provisioningStatus: ProvisioningStatus
  idempotencyKey?: string
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
    provisioning_status: input.provisioningStatus,
    idempotency_key: input.idempotencyKey,
    attempts: 0,
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
    provisioningStatus: input.provisioningStatus,
    idempotencyKey: input.idempotencyKey,
  }
}

type IntakeRow = {
  id: string
  subdomain?: string
  provisioning_status?: ProvisioningStatus
  idempotency_key?: string
  attempts?: number
  last_error?: string | null
  started_at?: string | null
  finished_at?: string | null
  preview_url?: string | null
  production_url?: string | null
  updated_at?: string | null
}

export async function findMarketplaceIntakeByIdempotencyKey(idempotencyKey: string): Promise<IntakeRow | null> {
  const config = getSupabaseIntakeConfig()
  if (!config) return null

  const response = await fetch(
    `${config.restUrl}/${config.table}?idempotency_key=eq.${encodeURIComponent(idempotencyKey)}&select=*`,
    {
      headers: {
        apikey: config.apiKey,
        Authorization: `Bearer ${config.apiKey}`,
      },
    }
  )

  if (!response.ok) {
    return null
  }

  const rows = (await response.json()) as IntakeRow[]
  return rows?.[0] ?? null
}

export async function getMarketplaceIntakeById(intakeId: string): Promise<IntakeRow | null> {
  const config = getSupabaseIntakeConfig()
  if (!config) return null

  const response = await fetch(
    `${config.restUrl}/${config.table}?id=eq.${encodeURIComponent(intakeId)}&select=*`,
    {
      headers: {
        apikey: config.apiKey,
        Authorization: `Bearer ${config.apiKey}`,
      },
    }
  )

  if (!response.ok) return null
  const rows = (await response.json()) as IntakeRow[]
  return rows?.[0] ?? null
}

export async function findMarketplaceIntakeBySubdomain(subdomain: string): Promise<IntakeRow | null> {
  const config = getSupabaseIntakeConfig()
  if (!config) return null

  const response = await fetch(
    `${config.restUrl}/${config.table}?subdomain=eq.${encodeURIComponent(subdomain)}&select=*`,
    {
      headers: {
        apikey: config.apiKey,
        Authorization: `Bearer ${config.apiKey}`,
      },
    }
  )

  if (!response.ok) return null
  const rows = (await response.json()) as IntakeRow[]
  return rows?.[0] ?? null
}

export async function updateMarketplaceIntakeProvisioningStatus(
  intakeId: string,
  status: ProvisioningStatus,
  options: {
    lastError?: string | null
    incrementAttempts?: boolean
    startedAt?: string | null
    finishedAt?: string | null
    previewUrl?: string | null
    productionUrl?: string | null
  } = {}
): Promise<void> {
  const config = getSupabaseIntakeConfig()
  if (!config) return

  const existing = await getMarketplaceIntakeById(intakeId)
  const attempts = (existing?.attempts ?? 0) + (options.incrementAttempts ? 1 : 0)

  const payload = {
    provisioning_status: status,
    attempts,
    last_error: options.lastError ?? existing?.last_error ?? null,
    started_at: options.startedAt ?? existing?.started_at ?? null,
    finished_at: options.finishedAt ?? existing?.finished_at ?? null,
    preview_url: options.previewUrl ?? existing?.preview_url ?? null,
    production_url: options.productionUrl ?? existing?.production_url ?? null,
    updated_at: new Date().toISOString(),
  }

  const response = await fetch(`${config.restUrl}/${config.table}?id=eq.${encodeURIComponent(intakeId)}`, {
    method: "PATCH",
    headers: {
      apikey: config.apiKey,
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Supabase provisioning status update failed (${response.status}): ${errorText}`)
  }
}
