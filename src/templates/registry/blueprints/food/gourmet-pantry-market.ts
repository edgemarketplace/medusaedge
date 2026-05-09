import type { TemplateBlueprint } from "../../types"

export const gourmetPantryMarket: TemplateBlueprint = {
  id: "gourmet-pantry-market",
  name: "Gourmet Pantry Market",
  category: "food-beverage",
  theme: "editorial",
  themeVariants: ["editorial", "organic", "warm"],
  thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000",
  description: "A premium pantry goods template designed to merchandize bundles, recipes, pairings, and wholesale opportunities.",
  tagline: "Artisan ingredients for the home kitchen",
  bestFor: "Sauces, oils, spices, gift boxes, artisan food brands",
  aestheticTags: ["warm", "editorial", "earthy"],
  complexity: "standard",
  aiReady: true,
  accent: "from-orange-600 to-amber-100",
  stylingDirection: "Culinary editorial styling with rich food accents, textured surfaces, and a balance of gifting and pantry utility.",
  source: "Recipe-driven specialty food storefront",
  industry: "food",
  businessSize: "small",
  salesModel: ["catalog", "gifting", "wholesale"],
  composition: {
    theme: "editorial",
    sections: [
      { id: "header", sectionId: "header-navigation", variant: "editorial", props: { brand: "Pantry & Plate", links: ["Shop All","Gifts","Recipes","Wholesale"] }, order: 0 },
      { id: "hero", sectionId: "hero-split", variant: "editorial", props: { headline: "Stock Your Pantry", subheadline: "Small-batch sauces, oils, and spices from artisan producers around the world.", cta: "Shop Pantry", backgroundImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000" }, order: 1 },
      { id: "categories", sectionId: "category-grid", variant: "editorial", props: { title: "Shop by Category", categories: ["Olive Oils","Hot Sauces","Spice Blends","Gift Boxes"] }, order: 2 },
      { id: "products", sectionId: "featured-products", variant: "editorial", props: { title: "Bestsellers" }, order: 3 },
      { id: "bundle", sectionId: "bundle-builder", variant: "editorial", props: { headline: "Build Your Pantry Box" }, order: 4 },
      { id: "founder", sectionId: "founder-story", variant: "editorial", props: { headline: "Our Story" }, order: 5 },
      { id: "wholesale", sectionId: "wholesale-inquiry", variant: "editorial", props: { headline: "Wholesale Partnerships" }, order: 6 },
      { id: "testimonials", sectionId: "testimonial-grid", variant: "editorial", props: { headline: "Chef Approved" }, order: 7 },
      { id: "newsletter", sectionId: "newsletter-cta", variant: "editorial", props: { headline: "Recipes & New Arrivals" }, order: 8 },
      { id: "footer", sectionId: "footer-standard", variant: "editorial", props: { brand: "Pantry & Plate", description: "Artisan ingredients, curated for your kitchen." }, order: 9 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
