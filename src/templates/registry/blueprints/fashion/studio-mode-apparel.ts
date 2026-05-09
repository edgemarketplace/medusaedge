import type { TemplateBlueprint } from "../../types"

export const studioModeApparel: TemplateBlueprint = {
  id: "studio-mode-apparel",
  name: "Studio Mode Apparel",
  category: "fashion",
  secondaryCategories: ["luxury-retail"],
  theme: "luxury",
  themeVariants: ["luxury", "editorial", "minimal", "premium-dark"],
  thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000",
  description: "A clean, premium apparel homepage with strong imagery, featured collections, and lookbook-driven merchandising.",
  tagline: "Editorial fashion for modern apparel brands",
  bestFor: "Streetwear, basics, capsule collections, modern fashion labels",
  aestheticTags: ["monochrome", "editorial", "luxurious", "minimal"],
  complexity: "standard",
  aiReady: true,
  accent: "from-zinc-900 to-stone-300",
  stylingDirection: "Monochrome luxury with editorial spacing, oversized typography, strong image framing, and high-contrast CTA moments.",
  source: "Editorial fashion storefront for modern apparel brands",
  industry: "fashion",
  businessSize: "both",
  salesModel: ["catalog", "subscription"],
  composition: {
    theme: "luxury",
    sections: [
      { id: "announcement", sectionId: "announcement-bar", variant: "luxury", props: { text: "Free global shipping on orders over $200" }, order: 0 },
      { id: "header", sectionId: "header-navigation", variant: "luxury", props: { brand: "Studio Mode", links: ["Shop","Collections","Editorial","About"] }, order: 1 },
      { id: "hero", sectionId: "hero-editorial", variant: "luxury", props: { headline: "The Fall Edit", subheadline: "Oversized silhouettes and tactile fabrics for the modern wardrobe.", cta: "Shop The Lookbook", backgroundImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000" }, order: 2 },
      { id: "products", sectionId: "product-grid", variant: "luxury", props: { title: "Latest Arrivals", limit: 3 }, order: 3 },
      { id: "lookbook", sectionId: "lookbook", variant: "editorial", props: { title: "The Collection" }, order: 4 },
      { id: "trust", sectionId: "trust-strip", variant: "luxury", props: { items: ["Free Shipping","Free Returns","Sustainable","Secure Checkout"] }, order: 5 },
      { id: "ugc", sectionId: "ugc-grid", variant: "luxury", props: { headline: "Spotted in the Wild" }, order: 6 },
      { id: "newsletter", sectionId: "newsletter-cta", variant: "luxury", props: { headline: "Join the Studio" }, order: 7 },
      { id: "footer", sectionId: "footer-standard", variant: "luxury", props: { brand: "Studio Mode", description: "Redefining modern basics with architectural silhouettes." }, order: 8 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
