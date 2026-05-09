import type { TemplateBlueprint } from "../../types"

export const babyEssentialsBoutique: TemplateBlueprint = {
  id: "baby-essentials-boutique",
  name: "Baby Essentials Boutique",
  category: "baby-kids",
  theme: "soft-boutique",
  themeVariants: ["soft-boutique", "minimal", "organic"],
  thumbnail: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=2000",
  description: "A trust-forward baby retail template focused on gifting, age-stage navigation, and premium reassurance.",
  tagline: "Everything baby, beautifully curated",
  bestFor: "Baby clothing, nursery decor, baby gifts, essentials boutiques",
  aestheticTags: ["soft", "romantic", "warm"],
  complexity: "starter",
  aiReady: true,
  accent: "from-rose-200 to-sky-50",
  stylingDirection: "Soft premium baby aesthetic with calming tones, rounded composition, and strong trust-oriented messaging.",
  source: "Soft premium storefront for nursery and baby essentials",
  industry: "baby",
  businessSize: "small",
  salesModel: ["catalog", "gifting"],
  composition: {
    theme: "soft-boutique",
    sections: [
      { id: "header", sectionId: "header-navigation", variant: "soft-boutique", props: { brand: "Little Nest", links: ["Newborn","Baby","Toddler","Gifts"] }, order: 0 },
      { id: "hero", sectionId: "hero-centered", variant: "soft-boutique", props: { headline: "Welcome to the Nest", subheadline: "Carefully selected baby essentials that parents trust and little ones love.", cta: "Shop Essentials", backgroundImage: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=2000" }, order: 1 },
      { id: "shop-by-age", sectionId: "shop-by-age", variant: "soft-boutique", props: { title: "Shop by Age", ages: ["0-3 months","3-6 months","6-12 months","12+ months"] }, order: 2 },
      { id: "products", sectionId: "featured-products", variant: "soft-boutique", props: { title: "Most Loved" }, order: 3 },
      { id: "proof", sectionId: "proof-strip", variant: "soft-boutique", props: { items: ["Organic Materials","Safety Tested","Pediatrician Reviewed","Free Returns"] }, order: 4 },
      { id: "gift-guide", sectionId: "gift-guide", variant: "soft-boutique", props: { headline: "The Perfect Gift" }, order: 5 },
      { id: "testimonials", sectionId: "testimonial-slider", variant: "soft-boutique", props: { headline: "Parent Approved" }, order: 6 },
      { id: "newsletter", sectionId: "newsletter-cta", variant: "soft-boutique", props: { headline: "Parenting Tips & New Arrivals" }, order: 7 },
      { id: "footer", sectionId: "footer-standard", variant: "soft-boutique", props: { brand: "Little Nest", description: "Curated essentials for your little one." }, order: 8 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
