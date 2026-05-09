"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import GrapesBuilder from "@/modules/hub/components/builder/grapes-builder"
import { ArrowLeft } from "lucide-react"

export default function EditorPage() {
  const params = useParams<{ templateId: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.templateId) {
      setLoading(false)
    }
  }, [params.templateId])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-slate-400 text-sm">
        Loading editor...
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top bar */}
      <div className="h-12 border-b border-slate-200 flex items-center px-4 justify-between shrink-0">
        <button
          onClick={() => router.push(`/builder-v2`)}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Builder
        </button>
        <div className="text-sm font-semibold text-slate-900">
          Editing: {params.templateId}
        </div>
        <div className="w-24" /> {/* spacer */}
      </div>

      {/* GrapesJS Block-Based Editor */}
      <div className="flex-1">
        <GrapesBuilder
          templateId={params.templateId}
          onSaveDraft={async (projectJson) => {
            // TODO: Save to Supabase or API
            console.log("Save draft", projectJson)
          }}
          onDeploy={async (projectJson) => {
            // TODO: Deploy to subdomain
            console.log("Deploy", projectJson)
          }}
        />
      </div>
    </div>
  )
}
