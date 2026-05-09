import type { TemplateBlueprint } from "../../types"

export const petGroomingRetail: TemplateBlueprint = {
  id: "pet-grooming-retail",
  name: "Pet Grooming + Retail Hub",
  category: "pet-care",
  secondaryCategories: ["services"],
  theme: "soft-boutique",
  themeVariants: ["soft-boutique", "warm", "playful"],
  thumbnail: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2000",
  description: "A grooming-first template with retail add-ons, memberships, and service-area-aware conversion flows.",
  tagline: "Look good, feel good, stay healthy",
  bestFor: "Pet groomers, grooming salons, pet spas, service + product hybrids",
  aestheticTags: ["soft", "playful", "warm"],
  complexity: "standard",
  aiReady: true,
  accent: "from-sky-500 to-violet-200",
  stylingDirection: "Bright, reassuring, and clean with service-first hierarchy, rounded cards, and visible trust signals.",
  source: "Service-commerce pet template for grooming businesses",
  industry: "pet",
  businessSize: "solo",
  salesModel: ["booking", "catalog", "subscription"],
  composition: {
    theme: "soft-boutique",
    sections: [
      { id: "header", sectionId: "header-navigation", variant: "soft-boutique", props: { brand: "Fluffy Spa", links: ["Services","Products","Membership","About"] }, order: 0 },
      { id: "hero", sectionId: "hero-booking", variant: "soft-boutique", props: { headline: "Spa Day, Every Day", subheadline: "Premium grooming, retail products, and membership plans for the pets you love.", primaryCta: "Book Grooming", secondaryCta: "Shop Products", backgroundImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2000" }, order: 1 },
      { id: "services", sectionId: "service-menu", variant: "soft-boutique", props: { title: "Grooming Services" }, order: 2 },
      { id: "products", sectionId: "featured-products", variant: "soft-boutique", props: { title: "Take-Home Care" }, order: 3 },
      { id: "membership", sectionId: "membership-plans", variant: "soft-boutique", props: { headline: "Care Club" }, order: 4 },
      { id: "testimonials", sectionId: "testimonial-grid", variant: "soft-boutique", props: { headline: "Happy Tails" }, order: 5 },
      { id: "service-area", sectionId: "service-area-strip", variant: "soft-boutique", props: { headline: "Serving Your Neighborhood" }, order: 6 },
      { id: "faq", sectionId: "faq", variant: "soft-boutique", props: { headline: "Grooming FAQ" }, order: 7 },
      { id: "footer", sectionId: "footer-standard", variant: "soft-boutique", props: { brand: "Fluffy Spa", description: "Where pets come to shine." }, order: 8 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
