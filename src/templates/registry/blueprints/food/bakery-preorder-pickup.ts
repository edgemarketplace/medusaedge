import type { TemplateBlueprint } from "../../types"

export const bakeryPreorderPickup: TemplateBlueprint = {
  id: "bakery-preorder-pickup",
  name: "Bakery Preorder & Pickup",
  category: "food-beverage",
  secondaryCategories: ["local-marketplace"],
  theme: "soft-boutique",
  themeVariants: ["soft-boutique", "warm", "organic"],
  thumbnail: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=2000",
  description: "A bakery commerce template focused on preorder flow, pickup logistics, celebration products, and local trust.",
  tagline: "Fresh from the oven to your table",
  bestFor: "Bakeries, dessert shops, custom cakes, pastry stores",
  aestheticTags: ["warm", "soft", "romantic"],
  complexity: "starter",
  aiReady: true,
  accent: "from-pink-400 to-amber-50",
  stylingDirection: "Warm and inviting with premium bakery softness, pastel accents, rounded forms, and clear preorder emphasis.",
  source: "Local-first bakery template for daily menus and custom cakes",
  industry: "food",
  businessSize: "solo",
  salesModel: ["catalog", "gifting"],
  composition: {
    theme: "soft-boutique",
    sections: [
      { id: "announcement", sectionId: "announcement-bar", variant: "soft-boutique", props: { text: "Order by 2pm for next-day pickup" }, order: 0 },
      { id: "header", sectionId: "header-navigation", variant: "soft-boutique", props: { brand: "Sugar & Grain", links: ["Menu","Custom Cakes","Order","About"] }, order: 1 },
      { id: "hero", sectionId: "hero-split", variant: "soft-boutique", props: { headline: "Baked Fresh Daily", subheadline: "Artisan breads, pastries, and custom celebration cakes made from scratch.", cta: "Order Online", backgroundImage: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=2000" }, order: 2 },
      { id: "products", sectionId: "featured-products", variant: "soft-boutique", props: { title: "Today's Menu" }, order: 3 },
      { id: "shop-by-occasion", sectionId: "shop-by-occasion", variant: "soft-boutique", props: { title: "Shop by Occasion", occasions: ["Birthday","Wedding","Celebration","Everyday"] }, order: 4 },
      { id: "pickup", sectionId: "pickup-delivery-strip", variant: "soft-boutique", props: { headline: "How It Works" }, order: 5 },
      { id: "testimonials", sectionId: "testimonial-slider", variant: "soft-boutique", props: { headline: "Customer Favorites" }, order: 6 },
      { id: "faq", sectionId: "faq", variant: "soft-boutique", props: { headline: "Ordering FAQ" }, order: 7 },
      { id: "contact", sectionId: "contact-strip", variant: "soft-boutique", props: { headline: "Visit Us" }, order: 8 },
      { id: "footer", sectionId: "footer-standard", variant: "soft-boutique", props: { brand: "Sugar & Grain", description: "Fresh from the oven, every morning." }, order: 9 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
