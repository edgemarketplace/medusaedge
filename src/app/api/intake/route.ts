<<<<<<< HEAD
import { mkdir, appendFile } from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { getTemplateById, slugifyBusinessName, type IntakePayload, type MarketplaceIntake } from "@/lib/intake/schema"

export const runtime = "nodejs"

type ValidationResult =
  | { ok: true; payload: IntakePayload }
  | { ok: false; errors: Record<string, string> }

const requiredFields: Array<keyof IntakePayload> = [
  "businessName",
  "ownerName",
  "email",
  "selectedTemplate",
  "plan",
  "offerSummary",
]

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function validatePayload(body: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {}
  const payload = {
    businessName: cleanString(body.businessName),
    ownerName: cleanString(body.ownerName),
    email: cleanString(body.email),
    phone: cleanString(body.phone),
    currentWebsite: cleanString(body.currentWebsite),
    desiredDomain: cleanString(body.desiredDomain),
    preferredSubdomain: cleanString(body.preferredSubdomain),
    selectedTemplate: cleanString(body.selectedTemplate),
    plan: cleanString(body.plan) || "launch",
    tagline: cleanString(body.tagline),
    brandColors: cleanString(body.brandColors),
    socialLinks: cleanString(body.socialLinks),
    offerSummary: cleanString(body.offerSummary),
    catalogSize: cleanString(body.catalogSize),
    fulfillmentNeeds: cleanString(body.fulfillmentNeeds),
    launchTimeline: cleanString(body.launchTimeline),
    budgetRange: cleanString(body.budgetRange),
    notes: cleanString(body.notes),
  } as IntakePayload

  for (const field of requiredFields) {
    if (!payload[field]) {
      errors[field] = "Required"
    }
  }

  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "Enter a valid email"
  }

  if (!["launch", "pro", "custom"].includes(payload.plan)) {
    errors.plan = "Choose a valid plan"
  }

  const template = getTemplateById(payload.selectedTemplate)
  payload.selectedTemplate = template.id

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, payload }
}

async function writeLocalIntake(intake: MarketplaceIntake) {
  const dir = process.env.INTAKE_LOCAL_DIR || path.join(process.cwd(), ".intakes")
  await mkdir(dir, { recursive: true })
  await appendFile(path.join(dir, "marketplace-intakes.jsonl"), `${JSON.stringify(intake)}\n`, "utf8")
}

async function forwardWebhook(intake: MarketplaceIntake) {
  const webhookUrl = process.env.INTAKE_WEBHOOK_URL
  if (!webhookUrl) {
    return { forwarded: false }
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.INTAKE_WEBHOOK_SECRET
        ? { Authorization: `Bearer ${process.env.INTAKE_WEBHOOK_SECRET}` }
        : {}),
    },
    body: JSON.stringify(intake),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    throw new Error(`Intake webhook failed with ${response.status}: ${text.slice(0, 300)}`)
  }

  return { forwarded: true }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validation = validatePayload(body)

    if (!validation.ok) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 })
    }

    const template = getTemplateById(validation.payload.selectedTemplate)
    const preferredSubdomain =
      validation.payload.preferredSubdomain || slugifyBusinessName(validation.payload.businessName)

    const intake: MarketplaceIntake = {
      ...validation.payload,
      preferredSubdomain,
      id: `intake_${randomUUID()}`,
      createdAt: new Date().toISOString(),
      status: "new_intake",
      selectedTemplate: template.id,
      selectedTemplateRepo: template.repo,
      source: "website",
    }

    await writeLocalIntake(intake)
    const webhook = await forwardWebhook(intake)

    return NextResponse.json({
      success: true,
      intakeId: intake.id,
      status: intake.status,
      selectedTemplate: intake.selectedTemplate,
      selectedTemplateRepo: intake.selectedTemplateRepo,
      preferredSubdomain: intake.preferredSubdomain,
      bridge: webhook.forwarded ? "webhook_forwarded" : "local_jsonl_recorded",
      nextStep: "Operator review, approval, repo generation, Vercel preview, then Cloudflare DNS.",
    })
  } catch (error) {
    console.error("Marketplace intake error:", error)
    return NextResponse.json(
      { success: false, error: "Unable to submit intake right now" },
      { status: 500 }
    )
  }
=======
import { handleTenantOnboarding } from "@/lib/intake/onboarding-handler"

export async function POST(req: Request) {
  return handleTenantOnboarding(req)
>>>>>>> 2fce45a (Add Supabase SSR integration, intake API, and tenant onboarding persistence)
}
