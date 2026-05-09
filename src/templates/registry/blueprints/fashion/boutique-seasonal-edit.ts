import type { TemplateBlueprint } from "../../types"

export const boutiqueSeasonalEdit: TemplateBlueprint = {
  id: "boutique-seasonal-edit",
  name: "Boutique Seasonal Edit",
  category: "boutique",
  secondaryCategories: ["fashion"],
  theme: "soft-boutique",
  themeVariants: ["soft-boutique", "romantic", "minimal", "editorial"],
  thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000",
  description: "A warm boutique homepage centered on seasonal edits, outfit ideas, and curated shopping moments.",
  tagline: "Curated elegance for the everyday",
  bestFor: "Women's boutiques, giftable fashion, local apparel stores",
  aestheticTags: ["soft", "warm", "romantic"],
  complexity: "starter",
  aiReady: true,
  accent: "from-rose-500 to-amber-100",
  stylingDirection: "Soft boutique styling with warm neutrals, rounded cards, gentle shadows, and magazine-inspired merchandising.",
  source: "Curated boutique storefront with soft promo storytelling",
  industry: "fashion",
  businessSize: "small",
  salesModel: ["catalog", "gifting"],
  composition: {
    theme: "soft-boutique",
    sections: [
      { id: "announcement", sectionId: "announcement-bar", variant: "soft-boutique", props: { text: "New Season — Free Shipping on Orders $75+" }, order: 0 },
      { id: "header", sectionId: "header-navigation", variant: "soft-boutique", props: { brand: "Maison Rose", links: ["New Arrivals","Dresses","Accessories"] }, order: 1 },
      { id: "hero", sectionId: "hero-centered", variant: "soft-boutique", props: { headline: "The Spring Edit", subheadline: "Soft linens, gentle pastels, and effortless silhouettes.", cta: "Shop The Collection", backgroundImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000" }, order: 2 },
      { id: "products", sectionId: "product-carousel", variant: "soft-boutique", props: { title: "Curated For You", subtitle: "Handpicked seasonal favorites" }, order: 3 },
      { id: "categories", sectionId: "category-grid", variant: "soft-boutique", props: { title: "Shop by Category" }, order: 4 },
      { id: "bundle", sectionId: "bundle-builder", variant: "soft-boutique", props: { headline: "Complete the Look" }, order: 5 },
      { id: "testimonials", sectionId: "testimonial-slider", variant: "soft-boutique", props: { headline: "What Our Customers Say" }, order: 6 },
      { id: "loyalty", sectionId: "loyalty-cta", variant: "soft-boutique", props: { headline: "Join the Inner Circle" }, order: 7 },
      { id: "footer", sectionId: "footer-standard", variant: "soft-boutique", props: { brand: "Maison Rose", description: "Curated elegance for the everyday." }, order: 8 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
