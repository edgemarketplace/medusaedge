"use client"

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { getTemplate } from '@/templates/registry'
import Link from 'next/link'

export default function TemplateDetailPage() {
  const params = useParams<{ templateId: string }>()
  const [template, setTemplate] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const t = getTemplate(params.templateId)
      if (!t) {
        setError('Template not found')
        return
      }
      setTemplate(t)
    } catch (e: any) {
      setError(e.message || 'Unknown error')
    }
  }, [params.templateId])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-slate-600">{error}</p>
          <Link href="/builder-v2" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Templates
          </Link>
        </div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b">
        <div className="flex justify-between items-center">
          <Link href="/builder-v2" className="text-sm text-slate-600 hover:text-slate-900">
            ← Back to Templates
          </Link>
          <Link
            href={`/builder-v2/editor/${params.templateId}`}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
          >
            Use This Template
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-900">{template.name}</h1>
        <p className="text-slate-600 mt-2">{template.description}</p>
        <p className="text-sm text-slate-500 mt-4">
          Sections: {template.sections ? template.sections.length : 'undefined'}
        </p>
      </div>
    </div>
  )
}
