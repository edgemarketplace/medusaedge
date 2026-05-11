import { Metadata } from "next"
import HubHero from "@/modules/hub/components/hub-hero"
import TemplateShowcase from "@/modules/hub/components/template-showcase"
import HubPricing from "@/modules/hub/components/hub-pricing"
import HubNavbar from "@/modules/hub/components/hub-navbar"
import HubFooter from "@/modules/hub/components/hub-footer"
import HowItWorks from "@/modules/hub/components/how-it-works"

export const metadata: Metadata = {
  title: "Edge Marketplace Hub | Launch Your Business in 15 Minutes",
  description: "The stress-free solution for small to medium businesses to get online and start selling instantly.",
}

export default function HubPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* NEW: Vertical Builder Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-white">
            <span className="text-xl">🚀</span>
            <div>
              <p className="font-bold text-sm">NEW: Vertical Template OS</p>
              <p className="text-blue-100 text-xs">Retail Core • 15-min setup • 8 pre-configured sections</p>
            </div>
          </div>
          <a
            href="/builder/new"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition"
          >
            Start Building →
          </a>
        </div>
      </div>

      <HubNavbar />
      <main>
        <HubHero />
        <HowItWorks />
        <TemplateShowcase />
        <HubPricing />
      </main>
      <HubFooter />
    </div>
  )
}
