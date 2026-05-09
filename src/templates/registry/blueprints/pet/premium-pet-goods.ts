import type { TemplateBlueprint } from "../../types"

export const premiumPetGoods: TemplateBlueprint = {
  id: "premium-pet-goods",
  name: "Premium Pet Goods Club",
  category: "pet-care",
  theme: "warm",
  themeVariants: ["warm", "playful", "organic"],
  thumbnail: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=2000",
  description: "A friendly premium pet storefront designed for treats, accessories, and recurring order behavior.",
  tagline: "Spoil them, naturally",
  bestFor: "Pet accessories, treats, pet DTC, curated pet boxes",
  aestheticTags: ["playful", "warm", "soft"],
  complexity: "starter",
  aiReady: true,
  accent: "from-amber-400 to-emerald-100",
  stylingDirection: "Friendly but premium, with soft rounded shapes, smart use of playful accents, and polished product merchandising.",
  source: "Subscription-ready pet goods template",
  industry: "pet",
  businessSize: "small",
  salesModel: ["catalog", "subscription"],
  composition: {
    theme: "warm",
    sections: [
      { id: "header", sectionId: "header-navigation", variant: "warm", props: { brand: "Paw & Co.", links: ["Dogs","Cats","Toys","Treats","Subscribe"] }, order: 0 },
      { id: "hero", sectionId: "hero-centered", variant: "warm", props: { headline: "Premium Goods for Premium Pals", subheadline: "Curated treats, toys, and accessories your pet will love.", cta: "Shop All", backgroundImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=2000" }, order: 1 },
      { id: "shop-by-pet", sectionId: "shop-by-pet", variant: "warm", props: { title: "Shop by Pet", pets: ["Dogs","Cats","Small Pets"] }, order: 2 },
      { id: "products", sectionId: "featured-products", variant: "warm", props: { title: "Most Loved" }, order: 3 },
      { id: "subscription", sectionId: "subscription-plans", variant: "warm", props: { headline: "Monthly Paw Box" }, order: 4 },
      { id: "proof", sectionId: "proof-strip", variant: "warm", props: { items: ["Vet Approved","Natural Ingredients","Free Shipping","Happy Guarantee"] }, order: 5 },
      { id: "testimonials", sectionId: "testimonial-slider", variant: "warm", props: { headline: "Happy Pets, Happy Parents" }, order: 6 },
      { id: "loyalty", sectionId: "loyalty-cta", variant: "warm", props: { headline: "Join Paw Club" }, order: 7 },
      { id: "footer", sectionId: "footer-standard", variant: "warm", props: { brand: "Paw & Co.", description: "Premium goods for premium pals." }, order: 8 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
