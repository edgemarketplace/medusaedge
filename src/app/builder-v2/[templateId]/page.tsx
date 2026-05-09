"use client"

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { getTemplate } from '@/templates/registry'
import { composePage, renderPage } from '@/composer'
import Link from 'next/link'

export default function TemplateDetailPage() {
  const params = useParams<{ templateId: string }>()
  const [template, setTemplate] = useState<ReturnType<typeof getTemplate>>(undefined)
  const [previewElements, setPreviewElements] = useState<React.ReactNode>(null)

  useEffect(() => {
    const t = getTemplate(params.templateId)
    if (!t) {
      notFound()
      return
    }
    setTemplate(t)
    
    const composition = composePage(t)
    const elements = renderPage(composition)
    setPreviewElements(elements)
  }, [params.templateId])

  if (!template) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar with back + Use This Template (moved to top) */}
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

      {/* Template Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900">{template.name}</h1>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">
              {template.category}
            </span>
          </div>
          <p className="text-slate-600 mb-4">{template.description}</p>
          <div className="flex flex-wrap gap-2">
            {template.tags?.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pre-Customized Page Preview (shows actual page) */}
        <div className="border rounded-lg overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 px-4 py-2 border-b">
            <h2 className="text-sm font-medium text-slate-600">Pre-Customized Page Preview</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-col">{previewElements}</div>
          </div>
        </div>

        {/* Rest of metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Section Architecture ({template.sections.length} sections)</h2>
            <div className="space-y-3">
              {template.sections.map((section, index) => (
                <div key={index} className="p-4 border rounded-lg flex items-center gap-4">
                  <span className="text-2xl">{section.icon}</span>
                  <div>
                    <h3 className="font-medium">{section.name}</h3>
                    <p className="text-sm text-slate-600">Variant: {section.variant}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Best For</h3>
              <p className="text-slate-600">{template.bestFor}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Styling Direction</h3>
              <p className="text-slate-600">{template.stylingDirection}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
