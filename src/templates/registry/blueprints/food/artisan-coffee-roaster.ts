import type { TemplateBlueprint } from "../../types"

export const artisanCoffeeRoaster: TemplateBlueprint = {
  id: "artisan-coffee-roaster",
  name: "Artisan Coffee Roaster",
  category: "food-beverage",
  theme: "organic",
  themeVariants: ["organic", "editorial", "minimal"],
  thumbnail: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2000",
  description: "A specialty coffee homepage that balances product discovery, roast education, and recurring subscription conversion.",
  tagline: "Single-origin, small-batch roasted",
  bestFor: "Coffee roasters, subscription coffee brands, local cafes with ecommerce",
  aestheticTags: ["earthy", "warm", "editorial"],
  complexity: "standard",
  aiReady: true,
  accent: "from-amber-900 to-stone-200",
  stylingDirection: "Rich cafe-inspired tones, tactile editorial imagery, story-first pacing, and premium yet approachable product framing.",
  source: "Subscription-friendly coffee storefront with origin storytelling",
  industry: "food",
  businessSize: "small",
  salesModel: ["catalog", "subscription"],
  composition: {
    theme: "organic",
    sections: [
      { id: "header", sectionId: "header-navigation", variant: "organic", props: { brand: "Roast & Origin", links: ["Shop","Subscribe","Learn","Wholesale"] }, order: 0 },
      { id: "hero", sectionId: "hero-editorial", variant: "organic", props: { headline: "Direct Trade. Small Batch.", subheadline: "Single-origin coffee roasted to perfection and delivered fresh to your door.", cta: "Shop Coffee", backgroundImage: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2000" }, order: 1 },
      { id: "shop-by-goal", sectionId: "shop-by-goal", variant: "organic", props: { title: "Find Your Roast", goals: ["Light & Bright","Balanced","Bold & Dark","Decaf"] }, order: 2 },
      { id: "products", sectionId: "featured-products", variant: "organic", props: { title: "Current Offerings" }, order: 3 },
      { id: "origin", sectionId: "origin-story", variant: "organic", props: { headline: "From Farm to Cup" }, order: 4 },
      { id: "subscription", sectionId: "subscription-plans", variant: "organic", props: { headline: "Subscribe & Save" }, order: 5 },
      { id: "proof", sectionId: "proof-strip", variant: "organic", props: { items: ["Ethically Sourced","Roasted to Order","Free Shipping","Satisfaction Guaranteed"] }, order: 6 },
      { id: "testimonials", sectionId: "testimonial-slider", variant: "organic", props: { headline: "What Coffee Lovers Say" }, order: 7 },
      { id: "newsletter", sectionId: "newsletter-cta", variant: "organic", props: { headline: "Get First Dibs on New Origins" }, order: 8 },
      { id: "footer", sectionId: "footer-standard", variant: "organic", props: { brand: "Roast & Origin", description: "Small-batch coffee, direct from farmers." }, order: 9 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
