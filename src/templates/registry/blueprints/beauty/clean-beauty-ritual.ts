import type { TemplateBlueprint } from "../../types"

export const cleanBeautyRitual: TemplateBlueprint = {
  id: "clean-beauty-ritual",
  name: "Clean Beauty Ritual",
  category: "beauty",
  theme: "organic",
  themeVariants: ["organic", "minimal", "soft-boutique"],
  thumbnail: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=2000",
  description: "A premium skincare template built around routines, ingredient education, and subscribe-and-save behavior.",
  tagline: "Rituals for radiant skin",
  bestFor: "Skincare, clean beauty, self-care brands, treatment systems",
  aestheticTags: ["organic", "soft", "minimal", "earthy"],
  complexity: "standard",
  aiReady: true,
  accent: "from-emerald-200 to-stone-50",
  stylingDirection: "Airy skincare aesthetic with muted creams, soft sage tones, elevated typography, and premium clinical balance.",
  source: "Routine-based beauty storefront with ingredient storytelling",
  industry: "beauty",
  businessSize: "small",
  salesModel: ["catalog", "subscription"],
  composition: {
    theme: "organic",
    sections: [
      { id: "header", sectionId: "header-navigation", variant: "organic", props: { brand: "Aura Botanical", links: ["Skincare","Body","Sets"] }, order: 0 },
      { id: "hero", sectionId: "hero-centered", variant: "organic", props: { headline: "Rituals for Radiant Skin", subheadline: "Clinically proven, plant-based formulas designed to restore your skin's natural barrier and luminosity.", cta: "Shop Best Sellers", secondaryCta: "Take The Quiz" }, order: 1 },
      { id: "featured-image", sectionId: "featured-products", variant: "organic", props: { title: "The Daily Essentials", limit: 4 }, order: 2 },
      { id: "ingredients", sectionId: "ingredient-spotlight", variant: "organic", props: { headline: "Powered by Nature" }, order: 3 },
      { id: "shop-by-goal", sectionId: "shop-by-goal", variant: "organic", props: { title: "Shop by Skin Goal", goals: ["Hydrate","Brighten","Firm","Calm"] }, order: 4 },
      { id: "testimonials", sectionId: "testimonial-slider", variant: "organic", props: { headline: "Real Results" }, order: 5 },
      { id: "subscription", sectionId: "subscription-plans", variant: "organic", props: { headline: "Never Run Out" }, order: 6 },
      { id: "faq", sectionId: "faq", variant: "organic", props: { headline: "Frequently Asked" }, order: 7 },
      { id: "footer", sectionId: "footer-standard", variant: "organic", props: { brand: "Aura Botanical", description: "Plant-based formulas for radiant skin." }, order: 8 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
