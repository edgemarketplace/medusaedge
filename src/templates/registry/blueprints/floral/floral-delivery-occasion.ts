import type { TemplateBlueprint } from "../../types"

export const floralDeliveryOccasion: TemplateBlueprint = {
  id: "floral-delivery-occasion",
  name: "Floral Delivery & Occasion Shop",
  category: "floral-gifting",
  secondaryCategories: ["event-commerce"],
  theme: "romantic",
  themeVariants: ["romantic", "soft-boutique", "editorial"],
  thumbnail: "https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?auto=format&fit=crop&q=80&w=2000",
  description: "An occasion-led florist template with same-day delivery messaging, recurring flowers, and event upsells.",
  tagline: "Flowers for every moment",
  bestFor: "Florists, gifting businesses, local flower delivery, event florals",
  aestheticTags: ["romantic", "soft", "vibrant"],
  complexity: "standard",
  aiReady: true,
  accent: "from-rose-500 to-violet-200",
  stylingDirection: "Elegant romantic styling with soft gradients, lush imagery, premium gifting cues, and refined CTA hierarchy.",
  source: "Elegant gifting and local delivery florist template",
  industry: "floral",
  businessSize: "solo",
  salesModel: ["catalog", "subscription", "gifting", "booking"],
  composition: {
    theme: "romantic",
    sections: [
      { id: "announcement", sectionId: "announcement-bar", variant: "romantic", props: { text: "Same-day delivery available — order by 2pm" }, order: 0 },
      { id: "header", sectionId: "header-navigation", variant: "romantic", props: { brand: "Bloom & Petal", links: ["Shop","Occasions","Subscribe","Events"] }, order: 1 },
      { id: "hero", sectionId: "hero-editorial", variant: "romantic", props: { headline: "Say It With Flowers", subheadline: "Hand-tied bouquets, same-day delivery, and floral subscriptions for every occasion.", cta: "Shop Bouquets", backgroundImage: "https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?auto=format&fit=crop&q=80&w=2000" }, order: 2 },
      { id: "shop-by-occasion", sectionId: "shop-by-occasion", variant: "romantic", props: { title: "Shop by Occasion", occasions: ["Birthday","Anniversary","Sympathy","Just Because"] }, order: 3 },
      { id: "products", sectionId: "featured-products", variant: "romantic", props: { title: "Bestsellers" }, order: 4 },
      { id: "pickup", sectionId: "pickup-delivery-strip", variant: "romantic", props: { headline: "Delivery & Pickup" }, order: 5 },
      { id: "subscription", sectionId: "subscription-plans", variant: "romantic", props: { headline: "Flower Subscription" }, order: 6 },
      { id: "testimonials", sectionId: "testimonial-slider", variant: "romantic", props: { headline: "Customer Love" }, order: 7 },
      { id: "faq", sectionId: "faq", variant: "romantic", props: { headline: "Ordering & Delivery" }, order: 8 },
      { id: "footer", sectionId: "footer-standard", variant: "romantic", props: { brand: "Bloom & Petal", description: "Fresh flowers, delivered with love." }, order: 9 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
