import { NextResponse } from "next/server"
import {
  getMarketplaceIntakeById,
  PROVISIONING_STATUSES,
} from "@/lib/intake/supabase"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const intake = await getMarketplaceIntakeById(id)

  if (!intake) {
    return NextResponse.json(
      { error: "Provisioning record not found" },
      { status: 404 }
    )
  }

  const status = intake.provisioning_status || "queued"

  if (!PROVISIONING_STATUSES.includes(status as any)) {
    return NextResponse.json(
      {
        error: "Invalid provisioning status value",
        intakeId: intake.id,
        status,
      },
      { status: 500 }
    )
  }

  return NextResponse.json({
    intakeId: intake.id,
    status,
    attempts: intake.attempts ?? 0,
    lastError: intake.last_error ?? null,
    startedAt: intake.started_at ?? null,
    finishedAt: intake.finished_at ?? null,
    previewUrl: intake.preview_url ?? null,
    productionUrl: intake.production_url ?? null,
    updatedAt: intake.updated_at ?? null,
  })
}
