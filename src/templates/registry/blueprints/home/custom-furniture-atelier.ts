import type { TemplateBlueprint } from "../../types"

export const customFurnitureAtelier: TemplateBlueprint = {
  id: "custom-furniture-atelier",
  name: "Custom Furniture Atelier",
  category: "luxury-retail",
  secondaryCategories: ["home-decor"],
  theme: "luxury",
  themeVariants: ["luxury", "premium-dark", "editorial"],
  thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000",
  description: "A luxury made-to-order furniture template centered on craftsmanship, finishes, delivery expectations, and consultations.",
  tagline: "Heirloom furniture, made for you",
  bestFor: "Custom furniture, woodworkers, premium home makers",
  aestheticTags: ["luxurious", "earthy", "editorial"],
  complexity: "advanced",
  aiReady: true,
  accent: "from-amber-950 to-stone-300",
  stylingDirection: "Dark wood luxury, serif-led headings, understated elegance, and consultation-oriented pacing.",
  source: "Bespoke furniture showcase with consultation-first flow",
  industry: "home",
  businessSize: "solo",
  salesModel: ["catalog", "booking"],
  composition: {
    theme: "luxury",
    sections: [
      { id: "header", sectionId: "header-navigation", variant: "luxury", props: { brand: "Atelier Noir", links: ["Collection","Materials","Process","Consult"] }, order: 0 },
      { id: "hero", sectionId: "hero-editorial", variant: "luxury", props: { headline: "Furniture as Art", subheadline: "Each piece handcrafted to your space, your materials, your vision.", cta: "Book a Consultation", backgroundImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000" }, order: 1 },
      { id: "collection", sectionId: "collection-grid", variant: "luxury", props: { title: "The Collection" }, order: 2 },
      { id: "materials", sectionId: "materials-finishes", variant: "luxury", props: { headline: "Materials & Finishes" }, order: 3 },
      { id: "process", sectionId: "process-timeline", variant: "luxury", props: { headline: "From Design to Delivery", steps: ["Consultation","Design","Craft","Deliver"] }, order: 4 },
      { id: "testimonials", sectionId: "testimonial-grid", variant: "luxury", props: { headline: "Client Spaces" }, order: 5 },
      { id: "booking", sectionId: "booking-cta", variant: "luxury", props: { headline: "Begin Your Project" }, order: 6 },
      { id: "faq", sectionId: "faq", variant: "luxury", props: { headline: "Commission Process" }, order: 7 },
      { id: "footer", sectionId: "footer-standard", variant: "luxury", props: { brand: "Atelier Noir", description: "Heirloom furniture, handcrafted for generations." }, order: 8 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
