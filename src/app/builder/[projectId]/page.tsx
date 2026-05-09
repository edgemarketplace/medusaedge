"use client"

import { useEffect, useState, useCallback } from "react"
import GrapesBuilder from "@/modules/hub/components/builder/grapes-builder"
import { useParams } from "next/navigation"

export default function BuilderPage() {
  const params = useParams()
  const projectId = String(params.projectId || "")

  const [initialProject, setInitialProject] = useState<object | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  // Load existing project on mount
  useEffect(() => {
    if (!projectId) return
    fetch(`/api/builder/${projectId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.projectData) {
          setInitialProject(data.projectData)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [projectId])

  const handleSaveDraft = useCallback(async (projectJson: object) => {
    await fetch(`/api/builder/${projectId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectData: projectJson, status: "draft" }),
    })
  }, [projectId])

  const handleDeploy = useCallback(async (projectJson: object) => {
    const res = await fetch(`/api/builder/${projectId}/deploy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectData: projectJson }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || "Deployment failed")
    }
    const data = await res.json()
    if (data.previewUrl) {
      window.open(data.previewUrl, "_blank")
    }
  }, [projectId])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-slate-400 text-sm">
        Loading project...
      </div>
    )
  }

  return (
    <GrapesBuilder
      projectId={projectId}
      initialProject={initialProject}
      onSaveDraft={handleSaveDraft}
      onDeploy={handleDeploy}
    />
  )
}
