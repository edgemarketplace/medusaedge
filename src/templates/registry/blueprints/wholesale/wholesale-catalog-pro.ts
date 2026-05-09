import type { TemplateBlueprint } from "../../types"

export const wholesaleCatalogPro: TemplateBlueprint = {
  id: "wholesale-catalog-pro",
  name: "Wholesale Catalog Pro",
  category: "wholesale-b2b",
  theme: "industrial",
  themeVariants: ["industrial", "minimal", "premium-dark"],
  thumbnail: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=2000",
  description: "A clean and structured wholesale template built to communicate product range, MOQ logic, and retailer onboarding clearly.",
  tagline: "Supply at scale",
  bestFor: "Suppliers, packaged goods, boutique wholesalers, maker brands with trade accounts",
  aestheticTags: ["industrial", "minimal", "bold"],
  complexity: "advanced",
  aiReady: true,
  accent: "from-slate-800 to-slate-200",
  stylingDirection: "Polished B2B commerce styling with strong grid logic, reduced ornament, clear data framing, and trust-first presentation.",
  source: "B2B-focused catalog template for wholesale-ready brands",
  industry: "wholesale",
  businessSize: "medium",
  salesModel: ["wholesale", "catalog"],
  composition: {
    theme: "industrial",
    sections: [
      { id: "header", sectionId: "header-navigation", variant: "industrial", props: { brand: "SupplyChain Pro", links: ["Products","Industries","Trade Program","Contact"] }, order: 0 },
      { id: "hero", sectionId: "hero-split", variant: "industrial", props: { headline: "Wholesale, Simplified", subheadline: "Browse our full catalog, request quotes, and set up your trade account in minutes.", cta: "Apply for Trade Account", backgroundImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=2000" }, order: 1 },
      { id: "categories", sectionId: "category-grid", variant: "industrial", props: { title: "Product Categories" }, order: 2 },
      { id: "products", sectionId: "featured-products", variant: "industrial", props: { title: "Bestselling Lines" }, order: 3 },
      { id: "proof", sectionId: "proof-strip", variant: "industrial", props: { items: ["MOQ Flexibility","Bulk Discounts","Global Shipping","Dedicated Rep"] }, order: 4 },
      { id: "wholesale", sectionId: "wholesale-inquiry", variant: "industrial", props: { headline: "Become a Partner" }, order: 5 },
      { id: "faq", sectionId: "faq", variant: "industrial", props: { headline: "Wholesale FAQ" }, order: 6 },
      { id: "contact", sectionId: "contact-strip", variant: "industrial", props: { headline: "Talk to Our Team" }, order: 7 },
      { id: "footer", sectionId: "footer-standard", variant: "industrial", props: { brand: "SupplyChain Pro", description: "Trusted by 500+ retailers worldwide." }, order: 8 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
