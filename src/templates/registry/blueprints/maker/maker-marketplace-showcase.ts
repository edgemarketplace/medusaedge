import type { TemplateBlueprint } from "../../types"

export const makerMarketplaceShowcase: TemplateBlueprint = {
  id: "maker-marketplace-showcase",
  name: "Maker Marketplace Showcase",
  category: "maker-craft",
  secondaryCategories: ["creator-commerce"],
  theme: "editorial",
  themeVariants: ["editorial", "organic", "warm"],
  thumbnail: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=2000",
  description: "A human-centered marketplace homepage designed for multi-maker stories, featured products, and in-person event continuity.",
  tagline: "Handmade by real people",
  bestFor: "Artisan collectives, handmade marketplaces, curated maker communities",
  aestheticTags: ["warm", "editorial", "earthy"],
  complexity: "standard",
  aiReady: true,
  accent: "from-amber-600 to-stone-100",
  stylingDirection: "Warm marketplace editorial styling with tactile surfaces, community storytelling, and maker-first visual hierarchy.",
  source: "Community-centered artisan marketplace template",
  industry: "maker",
  businessSize: "both",
  salesModel: ["catalog", "booking"],
  composition: {
    theme: "editorial",
    sections: [
      { id: "header", sectionId: "header-navigation", variant: "editorial", props: { brand: "Maker's Row", links: ["Shop","Makers","Events","About"] }, order: 0 },
      { id: "hero", sectionId: "hero-editorial", variant: "editorial", props: { headline: "Meet Your Makers", subheadline: "Unique handcrafted goods from the finest artisans in your community and beyond.", cta: "Explore the Market", backgroundImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=2000" }, order: 1 },
      { id: "makers", sectionId: "maker-profiles", variant: "editorial", props: { title: "Featured Makers" }, order: 2 },
      { id: "products", sectionId: "featured-products", variant: "editorial", props: { title: "Handpicked Favorites" }, order: 3 },
      { id: "events", sectionId: "event-calendar", variant: "editorial", props: { headline: "Upcoming Markets" }, order: 4 },
      { id: "testimonials", sectionId: "testimonial-slider", variant: "editorial", props: { headline: "Community Love" }, order: 5 },
      { id: "newsletter", sectionId: "newsletter-cta", variant: "editorial", props: { headline: "New Makers, Every Week" }, order: 6 },
      { id: "footer", sectionId: "footer-standard", variant: "editorial", props: { brand: "Maker's Row", description: "Where real craftsmanship meets community." }, order: 7 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
