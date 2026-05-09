import type { TemplateBlueprint } from "../../types"

export const performanceActivewear: TemplateBlueprint = {
  id: "performance-activewear",
  name: "Performance Activewear",
  category: "activewear",
  secondaryCategories: ["fashion"],
  theme: "athletic",
  themeVariants: ["athletic", "premium-dark", "industrial"],
  thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2000",
  description: "A conversion-focused activewear homepage with activity-based navigation, product comparisons, and bold CTA placement.",
  tagline: "Engineered for maximum output",
  bestFor: "Athleisure, fitness apparel, gymwear, performance brands",
  aestheticTags: ["bold", "athletic", "vibrant"],
  complexity: "standard",
  aiReady: true,
  accent: "from-lime-400 to-zinc-950",
  stylingDirection: "Bold athletic styling with sharp contrast, punchy accents, performance iconography, and high-momentum layout pacing.",
  source: "High-energy catalog template for sports and active brands",
  industry: "fashion",
  businessSize: "both",
  salesModel: ["catalog", "subscription"],
  composition: {
    theme: "athletic",
    sections: [
      { id: "announcement", sectionId: "announcement-bar", variant: "athletic", props: { text: "Free Shipping on Orders $100+ | 30-Day Returns" }, order: 0 },
      { id: "header", sectionId: "header-navigation", variant: "athletic", props: { brand: "VELOCITY", links: ["Men","Women","Equipment"] }, order: 1 },
      { id: "hero", sectionId: "hero-split", variant: "athletic", props: { headline: "PUSH LIMITS.", subheadline: "Engineered for maximum output. The new seamless collection is here.", cta: "Shop New Arrivals", backgroundImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2000" }, order: 2 },
      { id: "benefits", sectionId: "proof-strip", variant: "athletic", props: { items: ["Free Returns","Sustainable Materials","Performance Tested","Secure Checkout"] }, order: 3 },
      { id: "shop-by-use", sectionId: "shop-by-use-case", variant: "athletic", props: { title: "Shop by Activity", categories: ["Running","Training","Yoga","Outdoor"] }, order: 4 },
      { id: "comparison", sectionId: "comparison-table", variant: "athletic", props: { headline: "Why VELOCITY?" }, order: 5 },
      { id: "products", sectionId: "product-grid", variant: "athletic", props: { title: "High Performance Gear", limit: 4 }, order: 6 },
      { id: "loyalty", sectionId: "loyalty-cta", variant: "athletic", props: { headline: "Join VELOCITY Club" }, order: 7 },
      { id: "footer", sectionId: "footer-standard", variant: "athletic", props: { brand: "VELOCITY", description: "Engineered for athletes." }, order: 8 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
