import type { TemplateBlueprint } from "../../types"

export const salonRetailBookingHybrid: TemplateBlueprint = {
  id: "salon-retail-booking-hybrid",
  name: "Salon Retail + Booking Hybrid",
  category: "beauty",
  secondaryCategories: ["services"],
  theme: "luxury",
  themeVariants: ["luxury", "editorial", "soft-boutique"],
  thumbnail: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2000",
  description: "A hybrid template combining service booking, stylist credibility, and retail upsells for salons and studios.",
  tagline: "Your hair, elevated",
  bestFor: "Hair salons, barber studios, color specialists, beauty studios",
  aestheticTags: ["luxurious", "editorial", "warm"],
  complexity: "advanced",
  aiReady: true,
  accent: "from-fuchsia-500 to-stone-950",
  stylingDirection: "Beauty editorial meets service conversion, with polished spacing, rich surfaces, and premium team-forward presentation.",
  source: "Beauty services and retail storefront in one landing experience",
  industry: "beauty",
  businessSize: "small",
  salesModel: ["booking", "catalog", "subscription"],
  composition: {
    theme: "luxury",
    sections: [
      { id: "header", sectionId: "header-navigation", variant: "luxury", props: { brand: "Lumina Studio", links: ["Services","Stylists","Products"], ctaButton: "Book Appointment" }, order: 0 },
      { id: "hero", sectionId: "hero-booking", variant: "luxury", props: { headline: "Your hair, elevated.", subheadline: "Experience bespoke color and precision cutting in a modern, luxurious studio environment.", primaryCta: "Book Service", secondaryCta: "Shop Haircare", backgroundImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2000" }, order: 1 },
      { id: "services", sectionId: "service-menu", variant: "luxury", props: { title: "Our Services" }, order: 2 },
      { id: "products", sectionId: "featured-products", variant: "luxury", props: { title: "Studio Approved Haircare", subtitle: "Maintain your look at home" }, order: 3 },
      { id: "testimonials", sectionId: "testimonial-grid", variant: "luxury", props: { headline: "Client Love" }, order: 4 },
      { id: "membership", sectionId: "membership-plans", variant: "luxury", props: { headline: "Membership Plans" }, order: 5 },
      { id: "booking", sectionId: "booking-cta", variant: "luxury", props: { headline: "Ready to Transform?" }, order: 6 },
      { id: "faq", sectionId: "faq", variant: "luxury", props: { headline: "Common Questions" }, order: 7 },
      { id: "footer", sectionId: "footer-standard", variant: "luxury", props: { brand: "Lumina Studio", description: "123 Salon Avenue, Design District" }, order: 8 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
