"use client"

import { useEffect, useState, useMemo } from 'react'
import { useParams, notFound } from 'next/navigation'
import { getTemplate, getAllTemplates } from '@/templates/registry'
import { composePage, renderPage, applyCompositionTheme } from '@/composer'
import type { CompositionResult, TemplateBlueprint, ThemeVariant } from '@/templates/registry/types'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Monitor, Smartphone, Palette } from 'lucide-react'

export default function TemplateDetailPage() {
  const params = useParams<{ templateId: string }>()
  const [template, setTemplate] = useState<TemplateBlueprint | null>(null)
  const [composition, setComposition] = useState<CompositionResult | null>(null)
  const [previewElements, setPreviewElements] = useState<React.ReactNode>(null)
  const [error, setError] = useState<string | null>(null)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [activeThemeVariant, setActiveThemeVariant] = useState<string>('')

  useEffect(() => {
    try {
      const t = getTemplate(params.templateId)
      if (!t) {
        notFound()
        return
      }
      setTemplate(t)
      
      // Compose the page with actual template content
      const result = composePage(t)
      setComposition(result)
      setActiveThemeVariant(result.theme)
      
      // Apply theme
      applyCompositionTheme(result)
    } catch (e: any) {
      console.error('Failed to load template:', e)
      setError(e.message || 'Unknown error')
    }
  }, [params.templateId])

  // Render preview elements when composition changes
  useEffect(() => {
    if (composition) {
      try {
        const elements = renderPage(composition)
        setPreviewElements(elements)
      } catch (e: any) {
        console.error('Failed to render preview:', e)
      }
    }
  }, [composition])

  const handleThemeVariantChange = (variant: ThemeVariant) => {
    setActiveThemeVariant(variant)
    // Apply variant theme - you can expand this later
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--color-accent-primary', variant === 'luxury' ? '#18181b' : '#6366f1')
    }
  }

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

  if (!template || !composition) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Bar - Use This Template at TOP as requested */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back + Template Name */}
            <div className="flex items-center gap-4 min-w-0">
              <Link 
                href="/builder-v2" 
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Templates</span>
              </Link>
              <span className="text-slate-300">|</span>
              <span className="text-sm font-bold text-slate-900 truncate">{template.name}</span>
            </div>

            {/* Right: Use This Template Button (at TOP as requested) */}
            <Link
              href={`/builder-v2/editor/${params.templateId}`}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold text-sm shadow-sm shadow-emerald-200"
            >
              <ExternalLink className="h-4 w-4" />
              Use This Template
            </Link>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Device Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Preview</h2>
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-slate-200">
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                device === 'desktop'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="h-4 w-4" />
              Desktop
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                device === 'mobile'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="h-4 w-4" />
              Mobile
            </button>
          </div>
        </div>

        {/* Preview Window - Actual Site Demo */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div 
            className="mx-auto transition-all duration-300"
            style={{
              width: device === 'mobile' ? 375 : '100%',
              maxWidth: device === 'mobile' ? 375 : 1280,
              minHeight: device === 'mobile' ? 812 : 600,
            }}
          >
            {previewElements ? (
              <div className="flex flex-col">{previewElements}</div>
            ) : (
              <div className="flex items-center justify-center h-96 text-slate-400">
                <p>Loading preview...</p>
              </div>
            )}
          </div>
        </div>

        {/* Template Metadata Below Preview */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Description */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{template.name}</h3>
              <p className="text-slate-600 mb-4">{template.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                  Best for: {template.bestFor || 'General'}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                  Theme: {composition.theme}
                </span>
              </div>

              {/* Sections List */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3">Sections ({Array.isArray(template.composition.sections) ? template.composition.sections.length : 0})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Array.isArray(template.composition.sections) && template.composition.sections.map((section, idx) => (
                    <div 
                      key={section.sectionInstanceId || idx}
                      className="px-3 py-2 bg-slate-50 rounded-lg text-sm text-slate-600 border border-slate-100"
                    >
                      {section.sectionId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Theme Variants */}
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Theme Variants
              </h4>
              <div className="space-y-2">
                {Array.isArray(template.themeVariants) && template.themeVariants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => handleThemeVariantChange(variant)}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium capitalize transition ${
                      activeThemeVariant === variant
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {variant.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
