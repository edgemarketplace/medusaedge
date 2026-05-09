import type { TemplateBlueprint } from "../../types"

export const modernHomeEssentials: TemplateBlueprint = {
  id: "modern-home-essentials",
  name: "Modern Home Essentials",
  category: "home-decor",
  theme: "minimal",
  themeVariants: ["minimal", "editorial", "organic"],
  thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000",
  description: "A clean home goods template with room merchandising, bundle-friendly layouts, and inspiration-led visual flow.",
  tagline: "Design your space, your way",
  bestFor: "Home decor, organizers, small furniture, interior accessories",
  aestheticTags: ["minimal", "organic", "warm"],
  complexity: "starter",
  aiReady: true,
  accent: "from-stone-400 to-slate-100",
  stylingDirection: "Scandinavian-inspired minimalism with generous whitespace, warm neutrals, and crisp product framing.",
  source: "Lifestyle-led decor storefront with room-based navigation",
  industry: "home",
  businessSize: "small",
  salesModel: ["catalog"],
  composition: {
    theme: "minimal",
    sections: [
      { id: "header", sectionId: "header-navigation", variant: "minimal", props: { brand: "Form & Space", links: ["Shop","Rooms","Inspiration","About"] }, order: 0 },
      { id: "hero", sectionId: "hero-split", variant: "minimal", props: { headline: "Live Beautifully", subheadline: "Thoughtfully designed home essentials that transform everyday spaces.", cta: "Shop All", backgroundImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000" }, order: 1 },
      { id: "rooms", sectionId: "shop-by-room", variant: "minimal", props: { title: "Shop by Room", rooms: ["Living Room","Bedroom","Kitchen","Office"] }, order: 2 },
      { id: "products", sectionId: "featured-products", variant: "minimal", props: { title: "New Arrivals" }, order: 3 },
      { id: "proof", sectionId: "proof-strip", variant: "minimal", props: { items: ["Free Shipping","30-Day Returns","Sustainably Made","Design Guarantee"] }, order: 4 },
      { id: "bundle", sectionId: "bundle-builder", variant: "minimal", props: { headline: "Complete the Room" }, order: 5 },
      { id: "testimonials", sectionId: "testimonial-grid", variant: "minimal", props: { headline: "Homes We've Transformed" }, order: 6 },
      { id: "newsletter", sectionId: "newsletter-cta", variant: "minimal", props: { headline: "Design Inspiration, Weekly" }, order: 7 },
      { id: "footer", sectionId: "footer-standard", variant: "minimal", props: { brand: "Form & Space", description: "Thoughtfully designed for everyday living." }, order: 8 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
