"use client"

import { Button } from "@medusajs/ui"
import { ShoppingBag, ArrowRight, Star, CheckCircle2 } from "lucide-react"

export type SectionType = "hero" | "categories" | "products" | "cta" | "testimonials" | "features"

export interface SectionConfig {
  type: SectionType
  headline?: string
  subtext?: string
  ctaText?: string
  items?: string[]
  layout?: "grid" | "list" | "carousel"
  variant?: "light" | "dark" | "accent"
}

export interface StoreLayout {
  sections: SectionConfig[]
}

const Hero = ({ headline, subtext, ctaText, variant }: SectionConfig) => (
  <section className={`py-20 px-8 text-center rounded-2xl mb-8 ${variant === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">{headline || "Your Store Heading"}</h2>
    <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto">{subtext || "Enter a prompt to generate your store content with AI."}</p>
    <Button className="h-12 px-8 rounded-full font-bold">{ctaText || "Shop Now"}</Button>
  </section>
)

const ProductGrid = ({ headline, limit = 4 }: SectionConfig & { limit?: number }) => (
  <section className="py-12 mb-8">
    <div className="flex justify-between items-end mb-8">
      <h3 className="text-2xl font-bold">{headline || "Featured Products"}</h3>
      <a href="#" className="text-sm font-bold text-blue-600">View All</a>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: limit }).map((_, i) => (
        <div key={i} className="group">
          <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="h-4 w-3/4 bg-slate-100 rounded mb-2" />
          <div className="h-4 w-1/4 bg-slate-100 rounded" />
        </div>
      ))}
    </div>
  </section>
)

const CTA = ({ headline, subtext, ctaText, variant }: SectionConfig) => (
  <section className={`p-12 rounded-3xl text-center flex flex-col items-center mb-8 ${variant === 'accent' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
    <h3 className="text-3xl font-bold mb-4">{headline || "Ready to grow?"}</h3>
    <p className="opacity-80 mb-8 max-w-lg">{subtext || "Join thousands of businesses selling on the Edge."}</p>
    <Button className={variant === 'accent' ? 'bg-white text-blue-600 hover:bg-blue-50' : ''}>{ctaText || "Get Started"}</Button>
  </section>
)

const Features = ({ items }: SectionConfig) => (
  <section className="py-12 grid md:grid-cols-3 gap-8 mb-8">
    {(items || ["Fast Shipping", "Global Reach", "Secure Payments"]).map((item, i) => (
      <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900">{item}</h4>
          <p className="text-sm text-slate-500 mt-1">High-performance service guaranteed by Edge technology.</p>
        </div>
      </div>
    ))}
  </section>
)

export default function DynamicRenderer({ layout }: { layout: StoreLayout }) {
  if (!layout?.sections) return (
    <div className="h-full flex flex-col items-center justify-center text-slate-400 p-12 text-center border-2 border-dashed border-slate-200 rounded-3xl">
      <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <ShoppingBag className="h-6 w-6" />
      </div>
      <p className="font-medium">No layout generated yet.</p>
      <p className="text-xs mt-1 max-w-xs">Use the AI Assistant to describe your ideal storefront and see it come to life here.</p>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-4">
      {layout.sections.map((section, i) => {
        switch (section.type) {
          case "hero": return <Hero key={i} {...section} />
          case "products": return <ProductGrid key={i} {...section} />
          case "cta": return <CTA key={i} {...section} />
          case "features": return <Features key={i} {...section} />
          default: return <div key={i} className="p-4 bg-slate-50 rounded text-xs text-slate-400">Component: {section.type}</div>
        }
      })}
    </div>
  )
}
