"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getTenantBySubdomain, Tenant } from "@/lib/tenants/registry"
import { getTemplate, type TemplateBlueprint } from "@/templates/registry"
import { composePage, renderPage } from "@/composer"
import { Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@medusajs/ui"

export default function TenantStorefront() {
  const params = useParams()
  const tenantId = params.tenant as string
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [template, setTemplate] = useState<TemplateBlueprint | null>(null)
  const [renderedPage, setRenderedPage] = useState<React.ReactNode>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTenantAndRender() {
      try {
        // Load tenant from registry (now queries Supabase!)
        const data = await getTenantBySubdomain(tenantId)
        if (!data) {
          setError("Tenant not found")
          setIsLoading(false)
          return
        }
        setTenant(data)

        // Load the template
        const tpl = getTemplate(data.templateId)
        if (!tpl) {
          setError(`Template ${data.templateId} not found`)
          setIsLoading(false)
          return
        }
        setTemplate(tpl)

        // Compose and render the page with tenant's config
        const composition = composePage(tpl, {
          // Override with tenant's branding
          brandColor: data.brandColor,
          businessName: data.businessName,
          tagline: data.tagline,
        })
        
        // Render the page
        const elements = renderPage(composition)
        setRenderedPage(elements)

        // Apply brand color to CSS
        if (data.brandColor) {
          document.documentElement.style.setProperty('--brand-primary', data.brandColor)
        }

        setIsLoading(false)
      } catch (err: any) {
        console.error('Storefront load error:', err)
        setError(err.message || 'Failed to load storefront')
        setIsLoading(false)
      }
    }

    loadTenantAndRender()
  }, [tenantId])

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-500 font-medium">Loading your storefront...</p>
      </div>
    )
  }

  if (error || !tenant) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-6" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Storefront Not Found</h1>
        <p className="text-slate-500 max-w-md mb-8">
          {error || "We couldn't find a store at this address. It might be under construction or the subdomain is incorrect."}
        </p>
        <Button onClick={() => window.location.href = "https://edgemarketplacehub.com"}>
          Back to Edge Hub
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Apply brand color */}
      <style jsx global>{`
        :root {
          --brand-primary: ${tenant.brandColor || '#2563eb'};
        }
        .bg-brand { background-color: var(--brand-primary); }
        .text-brand { color: var(--brand-primary); }
        .border-brand { border-color: var(--brand-primary); }
      `}</style>

      {/* Render the actual template */}
      <main className="flex flex-col">
        {renderedPage}
      </main>

      {/* Small Admin Bar for the merchant (only visible in preview) */}
      <div className="fixed bottom-6 right-6 z-50">
         <div className="bg-slate-900 text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 border border-slate-700">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Preview Mode</span>
            <div className="h-4 w-[1px] bg-slate-700 mx-1" />
            <Button 
              className="h-6 px-2 text-[9px] bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = "https://edgemarketplacehub.com"}
            >
              Back to Edge Hub
            </Button>
         </div>
      </div>
    </div>
  )
}
