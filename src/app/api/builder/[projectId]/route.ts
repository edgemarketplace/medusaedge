import { NextResponse } from "next/server"
import { getSupabaseIntakeConfig } from "@/lib/intake/supabase"
import { promises as fs } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data/builder")

async function ensureDir() {
  try { await fs.mkdir(DATA_DIR, { recursive: true }) } catch {}
}

function getFilePath(projectId: string) {
  return path.join(DATA_DIR, `${projectId}.json`)
}

/* ── GET /api/builder/:projectId ── */
export async function GET(_req: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  await ensureDir()

  // 1. Try Supabase first
  const config = getSupabaseIntakeConfig()
  if (config) {
    try {
      const res = await fetch(`${config.restUrl}/builder_projects?id=eq.${encodeURIComponent(projectId)}`, {
        headers: { apikey: config.apiKey, Authorization: `Bearer ${config.apiKey}` },
      })
      if (res.ok) {
        const rows = await res.json()
        if (rows.length > 0) {
          return NextResponse.json({ projectData: rows[0].project_data, source: "supabase" })
        }
      }
    } catch (_) {}
  }

  // 2. Fallback: local JSON
  try {
    const raw = await fs.readFile(getFilePath(projectId), "utf-8")
    const data = JSON.parse(raw)
    return NextResponse.json({ projectData: data, source: "local" })
  } catch (_) {
    return NextResponse.json({ projectData: null, source: null })
  }
}

/* ── POST /api/builder/:projectId ── */
export async function POST(req: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  const body = await req.json().catch(() => ({}))
  await ensureDir()

  // 1. Try Supabase
  const config = getSupabaseIntakeConfig()
  if (config) {
    try {
      const upsert = await fetch(`${config.restUrl}/builder_projects`, {
        method: "POST",
        headers: {
          apikey: config.apiKey,
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify({
          id: projectId,
          project_data: body.projectData ?? {},
          status: body.status ?? "draft",
          updated_at: new Date().toISOString(),
        }),
      })
      if (upsert.ok) {
        return NextResponse.json({ success: true, source: "supabase" })
      }
    } catch (_) {}
  }

  // 2. Fallback: local JSON
  try {
    await fs.writeFile(getFilePath(projectId), JSON.stringify(body.projectData ?? {}, null, 2))
    return NextResponse.json({ success: true, source: "local" })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
