import type { TemplateBlueprint } from "../../types"

export const supplementScience: TemplateBlueprint = {
  id: "supplement-science-store",
  name: "Supplement Science Store",
  category: "beauty",
  secondaryCategories: ["services"],
  theme: "industrial",
  themeVariants: ["industrial", "minimal", "premium-dark"],
  thumbnail: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&q=80&w=2000",
  description: "A structured health product template with goal-based shopping, transparent ingredient framing, and subscription support.",
  tagline: "Science you can trust",
  bestFor: "Supplements, protein, wellness products, sports nutrition",
  aestheticTags: ["tech-forward", "minimal", "bold"],
  complexity: "standard",
  aiReady: true,
  accent: "from-sky-500 to-slate-950",
  stylingDirection: "Clean, technical, and trustworthy with structured grids, bold data framing, and restrained clinical color usage.",
  source: "Science-forward wellness commerce template",
  industry: "beauty",
  businessSize: "small",
  salesModel: ["catalog", "subscription"],
  composition: {
    theme: "industrial",
    sections: [
      { id: "announcement", sectionId: "announcement-bar", variant: "industrial", props: { text: "Free shipping on orders $75+ | Subscribe & save 20%" }, order: 0 },
      { id: "header", sectionId: "header-navigation", variant: "industrial", props: { brand: "Clinical Grade", links: ["Shop All","Goals","Ingredients","Science"] }, order: 1 },
      { id: "hero", sectionId: "hero-split", variant: "industrial", props: { headline: "Evidence-Based Nutrition", subheadline: "Clinically studied ingredients. Transparent sourcing. Real results you can measure.", cta: "Shop Supplements", backgroundImage: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&q=80&w=2000" }, order: 2 },
      { id: "shop-by-goal", sectionId: "shop-by-goal", variant: "industrial", props: { title: "Shop by Goal", goals: ["Energy","Focus","Recovery","Sleep","Immunity"] }, order: 3 },
      { id: "products", sectionId: "featured-products", variant: "industrial", props: { title: "Bestsellers" }, order: 4 },
      { id: "ingredients", sectionId: "ingredient-spotlight", variant: "industrial", props: { headline: "Backed by Science" }, order: 5 },
      { id: "comparison", sectionId: "comparison-table", variant: "industrial", props: { headline: "Why Choose Us?" }, order: 6 },
      { id: "subscription", sectionId: "subscription-plans", variant: "industrial", props: { headline: "Subscribe & Save" }, order: 7 },
      { id: "proof", sectionId: "proof-strip", variant: "industrial", props: { items: ["Third-Party Tested","cGMP Certified","No Fillers","60-Day Guarantee"] }, order: 8 },
      { id: "faq", sectionId: "faq", variant: "industrial", props: { headline: "Supplement FAQ" }, order: 9 },
      { id: "footer", sectionId: "footer-standard", variant: "industrial", props: { brand: "Clinical Grade", description: "Evidence-based nutrition for peak performance." }, order: 10 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
