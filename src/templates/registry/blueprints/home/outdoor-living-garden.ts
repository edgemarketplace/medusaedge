import type { TemplateBlueprint } from "../../types"

export const outdoorLivingGarden: TemplateBlueprint = {
  id: "outdoor-living-garden",
  name: "Outdoor Living & Garden",
  category: "home-decor",
  theme: "organic",
  themeVariants: ["organic", "warm", "minimal"],
  thumbnail: "https://images.unsplash.com/photo-1599685315640-9ceab2f77f3b?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1599685315640-9ceab2f77f3b?auto=format&fit=crop&q=80&w=2000",
  description: "A fresh outdoor ecommerce template built for seasonal promos, care education, and visually merchandised categories.",
  tagline: "Bring the outdoors home",
  bestFor: "Patio decor, planters, outdoor accessories, gardening retail",
  aestheticTags: ["organic", "earthy", "vibrant"],
  complexity: "starter",
  aiReady: true,
  accent: "from-green-700 to-amber-200",
  stylingDirection: "Natural and seasonal with terracotta and green accents, airy lifestyle photography, and promotional rhythm.",
  source: "Seasonal garden and patio storefront",
  industry: "home",
  businessSize: "small",
  salesModel: ["catalog"],
  composition: {
    theme: "organic",
    sections: [
      { id: "announcement", sectionId: "announcement-bar", variant: "organic", props: { text: "Spring Collection Now Live — Free Shipping on Orders $75+" }, order: 0 },
      { id: "header", sectionId: "header-navigation", variant: "organic", props: { brand: "Verdant Living", links: ["Outdoor","Garden","Planters","Decor"] }, order: 1 },
      { id: "hero", sectionId: "hero-split", variant: "organic", props: { headline: "Your Outdoor Oasis", subheadline: "Premium planters, patio decor, and garden essentials for every season.", cta: "Shop Spring", backgroundImage: "https://images.unsplash.com/photo-1599685315640-9ceab2f77f3b?auto=format&fit=crop&q=80&w=2000" }, order: 2 },
      { id: "categories", sectionId: "category-grid", variant: "organic", props: { title: "Shop by Category" }, order: 3 },
      { id: "products", sectionId: "featured-products", variant: "organic", props: { title: "Seasonal Picks" }, order: 4 },
      { id: "gallery", sectionId: "before-after-gallery", variant: "organic", props: { headline: "Transformations" }, order: 5 },
      { id: "bundle", sectionId: "bundle-builder", variant: "organic", props: { headline: "Garden Starter Kits" }, order: 6 },
      { id: "testimonials", sectionId: "testimonial-grid", variant: "organic", props: { headline: "Happy Gardeners" }, order: 7 },
      { id: "faq", sectionId: "faq", variant: "organic", props: { headline: "Plant Care" }, order: 8 },
      { id: "footer", sectionId: "footer-standard", variant: "organic", props: { brand: "Verdant Living", description: "Bringing the outdoors home since 2018." }, order: 9 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
