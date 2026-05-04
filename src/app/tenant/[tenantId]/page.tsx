"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getTenantBySubdomain, Tenant } from "@/lib/tenants/registry"
import DynamicRenderer, { StoreLayout } from "@/modules/hub/components/builder/dynamic-renderer"
import { Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@medusajs/ui"

export default function TenantStorefront() {
  const params = useParams()
  const tenantId = params.tenantId as string // This is the subdomain slug from the middleware rewrite
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTenant() {
      // In a real app, this might be an API call
      // For MVP, we use our local registry
      const data = await getTenantBySubdomain(tenantId)
      setTenant(data)
      setIsLoading(false)
    }
    loadTenant()
  }, [tenantId])

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-500 font-medium">Loading your storefront...</p>
      </div>
    )
  }

  if (!tenant) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-6" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Storefront Not Found</h1>
        <p className="text-slate-500 max-w-md mb-8">
          We couldn&apos;t find a store at this address. It might be under construction or the subdomain is incorrect.
        </p>
        <Button onClick={() => window.location.href = "https://edgemarketplacehub.com"}>
          Back to Edge Hub
        </Button>
      </div>
    )
  }

  // Construct layout based on tenant template choice
  const layout: StoreLayout = {
    sections: [
      { 
        type: "hero", 
        headline: tenant.businessName, 
        subtext: tenant.tagline || "Welcome to our professional storefront.", 
        ctaText: "Shop Collection",
        variant: tenant.templateId === "boutique-luxury" || tenant.templateId === "tech-consultant" ? "dark" : "light"
      },
      { 
        type: "features", 
        items: ["Premium Quality", "Fast Delivery", "Global Support"] 
      },
      { 
        type: "products", 
        headline: "Featured Collections", 
        limit: 4 
      },
      { 
        type: "cta", 
        headline: "Join Our Community", 
        subtext: "Sign up for exclusive updates and seasonal offers.", 
        ctaText: "Subscribe",
        variant: "accent"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Apply brand color to the page if needed */}
      <style jsx global>{`
        :root {
          --brand-primary: ${tenant.brandColor};
        }
        .bg-brand { background-color: var(--brand-primary); }
        .text-brand { color: var(--brand-primary); }
        .border-brand { border-color: var(--brand-primary); }
      `}</style>
      
      <DynamicRenderer layout={layout} />
      
      {/* Small Admin Bar for the merchant (only visible in preview) */}
      <div className="fixed bottom-6 right-6 z-50">
         <div className="bg-slate-900 text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 border border-slate-700">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Preview Mode</span>
            <div className="h-4 w-[1px] bg-slate-700 mx-1" />
            <Button 
              className="h-6 px-2 text-[9px] bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = "/dashboard"}
            >
              Back to Dashboard
            </Button>
         </div>
      </div>
    </div>
  )
}
