import type { TemplateBlueprint } from "../../types"

export const boutiqueSeasonalEdit: TemplateBlueprint = {
  id: "boutique-seasonal-edit",
  name: "Boutique Seasonal Edit",
  category: "boutique",
  secondaryCategories: ["fashion", "luxury-retail"],
  theme: "soft-boutique",
  themeVariants: ["soft-boutique", "editorial", "romantic", "warm"],
  thumbnail: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?auto=format&fit=crop&q=80&w=2000",
  description: "A warm boutique homepage centered on seasonal edits, outfit ideas, and curated shopping moments.",
  tagline: "Curated boutique storefront with soft promo storytelling",
  bestFor: "Women's boutiques, giftable fashion, local apparel stores",
  aestheticTags: ["soft", "warm", "playful", "romantic"],
  complexity: "standard",
  aiReady: true,
  accent: "from-rose-500 to-amber-100",
  stylingDirection: "Soft boutique styling with warm neutrals, rounded cards, gentle shadows, and magazine-inspired merchandising.",
  source: "Curated boutique storefront with soft promo storytelling",
  industry: "fashion",
  businessSize: "small",
  salesModel: ["catalog"],
  composition: {
    theme: "soft-boutique",
    sections: [
      { id: "announcement", sectionId: "announcement-bar", variant: "soft-boutique", props: { text: "New Spring Collection Now Available" }, order: 0 },
      { id: "header", sectionId: "header-navigation", variant: "soft-boutique", props: { brand: "Boutique Edit", links: ["Shop", "Collections", "Lookbook", "About"] }, order: 1 },
      { id: "hero", sectionId: "hero-split", variant: "soft-boutique", props: { headline: "Spring Edit", subheadline: "Curated pieces for the season ahead.", cta: "Shop The Collection", backgroundImage: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?auto=format&fit=crop&q=80&w=2000" }, order: 2 },
      { id: "categories", sectionId: "category-grid", variant: "soft-boutique", props: { title: "Shop By Occasion", categories: ["Work", "Weekend", "Evening", "Casual"] }, order: 3 },
      { id: "products", sectionId: "product-grid", variant: "soft-boutique", props: { title: "Staff Picks", limit: 4 }, order: 4 },
      { id: "bundles", sectionId: "bundle-builder", variant: "soft-boutique", props: { title: "Outfit Bundles" }, order: 5 },
      { id: "testimonials", sectionId: "testimonial-slider", variant: "soft-boutique", props: { headline: "What Our Customers Say" }, order: 6 },
      { id: "pickup", sectionId: "pickup-delivery-strip", variant: "soft-boutique", props: { message: "Free local pickup available" }, order: 7 },
      { id: "loyalty", sectionId: "loyalty-cta", variant: "soft-boutique", props: { headline: "Join Our Loyalty Program" }, order: 8 },
      { id: "footer", sectionId: "footer-standard", variant: "soft-boutique", props: { brand: "Boutique Edit", description: "Your local destination for curated fashion finds." }, order: 9 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
