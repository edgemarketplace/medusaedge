import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import {
  getSupabaseIntakeConfig,
  updateMarketplaceIntakeProvisioningStatus,
} from "@/lib/intake/supabase"
import { getTemplateById, slugifyBusinessName } from "@/lib/intake/schema"
import { runProvisioning } from "@/lib/provision/provision-runner.js"

const DATA_DIR = path.join(process.cwd(), "data/builder")

const REQUIRED_PROVISIONING_ENV = [
  "GITHUB_TOKEN",
  "GITHUB_OWNER",
  "VERCEL_TOKEN",
]

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {}
}

function getFilePath(projectId: string) {
  return path.join(DATA_DIR, `${projectId}.json`)
}

function serializeProject(projectData: unknown) {
  return JSON.stringify(projectData ?? {})
}

function validateRequiredSections(projectData: unknown) {
  const serialized = serializeProject(projectData).replace(/\\/g, "")
  const hasHeader = serialized.includes("data-gjs-type=\"header\"") || serialized.includes("data-gjs-type='header'") || serialized.includes("<header")
  const hasHero = serialized.includes("data-gjs-type=\"hero\"") || serialized.includes("data-gjs-type='hero'")
  const hasFooter = serialized.includes("data-gjs-type=\"footer\"") || serialized.includes("data-gjs-type='footer'") || serialized.includes("<footer")

  return { hasHeader, hasHero, hasFooter }
}

function missingProvisioningEnv() {
  return REQUIRED_PROVISIONING_ENV.filter((name) => !process.env[name])
}

async function upsertBuilderProject(projectId: string, projectData: unknown, status: string, extra: Record<string, unknown> = {}) {
  await ensureDir()

  const config = getSupabaseIntakeConfig()
  if (config) {
    try {
      const response = await fetch(`${config.restUrl}/builder_projects`, {
        method: "POST",
        headers: {
          apikey: config.apiKey,
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify({
          id: projectId,
          project_data: projectData ?? {},
          status,
          deployment: extra,
          updated_at: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        return "supabase"
      }
    } catch (_) {}
  }

  const localPayload = {
    projectData: projectData ?? {},
    status,
    deployment: extra,
    updatedAt: new Date().toISOString(),
  }
  await fs.writeFile(getFilePath(projectId), JSON.stringify(localPayload, null, 2))
  return "local"
}

async function loadBuilderProject(projectId: string) {
  const config = getSupabaseIntakeConfig()
  if (config) {
    try {
      const response = await fetch(`${config.restUrl}/builder_projects?id=eq.${encodeURIComponent(projectId)}&select=*`, {
        headers: {
          apikey: config.apiKey,
          Authorization: `Bearer ${config.apiKey}`,
        },
      })

      if (response.ok) {
        const rows = await response.json()
        if (rows?.[0]) {
          return rows[0]
        }
      }
    } catch (_) {}
  }

  try {
    const raw = await fs.readFile(getFilePath(projectId), "utf-8")
    return JSON.parse(raw)
  } catch (_) {
    return null
  }
}

async function loadIntake(projectId: string) {
  const config = getSupabaseIntakeConfig()
  if (!config) return null

  try {
    const response = await fetch(`${config.restUrl}/${config.table}?id=eq.${encodeURIComponent(projectId)}&select=*`, {
      headers: {
        apikey: config.apiKey,
        Authorization: `Bearer ${config.apiKey}`,
      },
    })

    if (!response.ok) return null
    const rows = await response.json()
    return rows?.[0] ?? null
  } catch (_) {
    return null
  }
}

function valueFrom(body: Record<string, any>, intake: Record<string, any> | null, ...keys: string[]) {
  for (const key of keys) {
    if (body[key] !== undefined && body[key] !== null && body[key] !== "") return body[key]
    if (intake?.[key] !== undefined && intake?.[key] !== null && intake?.[key] !== "") return intake[key]
  }
  return undefined
}

function buildProvisioningIntake(projectId: string, body: Record<string, any>, intake: Record<string, any> | null) {
  const businessName = String(valueFrom(body, intake, "businessName", "business_name") || `Marketplace ${projectId.slice(0, 8)}`)
  const ownerEmail = String(valueFrom(body, intake, "ownerEmail", "owner_email", "email") || "")
  const templateId = String(valueFrom(body, intake, "templateId", "template_id", "selectedTemplate") || "template-clothing-marketplace")
  const templateRecord = getTemplateById(templateId)
  const rawSubdomain = String(valueFrom(body, intake, "preferredSubdomain", "subdomain") || businessName)
  const subdomain = slugifyBusinessName(rawSubdomain).replace(/-/g, "").slice(0, 20)

  if (!ownerEmail) {
    throw new Error("Owner email is required before deployment. Submit the intake first or provide ownerEmail.")
  }

  return {
    projectId,
    businessName,
    ownerEmail,
    subdomain,
    templateId: templateRecord.id,
    templateRepo: templateRecord.repo,
    brandColor: String(valueFrom(body, intake, "brandColor", "brand_color") || "#2563eb"),
    tagline: String(valueFrom(body, intake, "tagline") || ""),
    productsText: String(valueFrom(body, intake, "productsText", "products_text", "offerSummary") || ""),
    planType: valueFrom(body, intake, "plan", "planType", "plan_type") === "pro" ? "pro" : "launch",
  }
}

/* ── POST /api/builder/:projectId/deploy ──
 * Save the latest builder project, resolve the matching intake/template, then
 * trigger the real GitHub/Vercel provisioning runner when credentials exist. */
export async function POST(req: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params

  try {
    const body = await req.json().catch(() => ({}))
    const savedProject = await loadBuilderProject(projectId)
    const projectData = body.projectData ?? savedProject?.project_data ?? savedProject?.projectData ?? {}
    const required = validateRequiredSections(projectData)

    if (!required.hasHeader || !required.hasHero || !required.hasFooter) {
      return NextResponse.json(
        {
          error: "Add at least one Header, one Hero, and one Footer before deployment.",
          required,
        },
        { status: 400 }
      )
    }

    const intake = await loadIntake(projectId)
    const provisioningIntake = buildProvisioningIntake(projectId, body, intake)
    const now = new Date().toISOString()

    if (intake?.provisioning_status === "failed") {
      await updateMarketplaceIntakeProvisioningStatus(projectId, "retrying", {
        lastError: intake?.last_error || null,
      })
    }

    await updateMarketplaceIntakeProvisioningStatus(projectId, "provisioning", {
      incrementAttempts: true,
      startedAt: now,
      finishedAt: null,
      lastError: null,
    })

    const source = await upsertBuilderProject(projectId, projectData, "deployment_requested", {
      templateRepo: provisioningIntake.templateRepo,
      subdomain: provisioningIntake.subdomain,
    })

    const missingEnv = missingProvisioningEnv()
    if (missingEnv.length > 0) {
      await updateMarketplaceIntakeProvisioningStatus(projectId, "failed", {
        finishedAt: new Date().toISOString(),
        lastError: `Missing provisioning credentials: ${missingEnv.join(", ")}`,
      })

      await upsertBuilderProject(projectId, projectData, "deployment_blocked_missing_credentials", {
        templateRepo: provisioningIntake.templateRepo,
        subdomain: provisioningIntake.subdomain,
        missingEnv,
      })

      return NextResponse.json(
        {
          success: false,
          status: "deployment_blocked_missing_credentials",
          error: "Provisioning credentials are not configured on this server.",
          missingEnv,
          source,
        },
        { status: 503 }
      )
    }

    const deployment = await runProvisioning(provisioningIntake)
    await updateMarketplaceIntakeProvisioningStatus(projectId, "deployed", {
      finishedAt: new Date().toISOString(),
      lastError: null,
      previewUrl: deployment.previewUrl || null,
      productionUrl: deployment.productionUrl || null,
    })

    await upsertBuilderProject(projectId, projectData, "preview_live", {
      templateRepo: provisioningIntake.templateRepo,
      subdomain: provisioningIntake.subdomain,
      previewUrl: deployment.previewUrl,
      deployment,
    })

    return NextResponse.json({
      success: true,
      status: deployment.status || "preview_live",
      projectId,
      templateRepo: provisioningIntake.templateRepo,
      subdomain: provisioningIntake.subdomain,
      previewUrl: deployment.previewUrl,
      deployment,
      source,
    })
  } catch (error: any) {
    console.error("Builder deploy error:", error)
    await updateMarketplaceIntakeProvisioningStatus(projectId, "failed", {
      finishedAt: new Date().toISOString(),
      lastError: error.message || "Deployment failed",
    }).catch(() => {})

    await upsertBuilderProject(projectId, {}, "deployment_failed", {
      error: error.message || "Deployment failed",
    }).catch(() => {})
    return NextResponse.json({ error: error.message || "Deployment failed" }, { status: 500 })
  }
}
