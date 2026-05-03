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
