import type { TemplateBlueprint } from "../../types"

export const educationalToysLearning: TemplateBlueprint = {
  id: "educational-toys-learning",
  name: "Educational Toys & Learning",
  category: "toys-education",
  theme: "playful",
  themeVariants: ["playful", "vibrant", "minimal"],
  thumbnail: "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?auto=format&fit=crop&q=80&w=2000",
  description: "A category-rich storefront for learning kits and toys, organized by age, skill, and giftability.",
  tagline: "Play with purpose",
  bestFor: "Educational toys, Montessori brands, learning kits, STEM products",
  aestheticTags: ["vibrant", "playful", "tech-forward"],
  complexity: "standard",
  aiReady: true,
  accent: "from-yellow-300 to-blue-500",
  stylingDirection: "Bright and structured with disciplined color blocks, clean educational hierarchy, and family-friendly clarity.",
  source: "Structured educational commerce template",
  industry: "toys",
  businessSize: "small",
  salesModel: ["catalog", "gifting"],
  composition: {
    theme: "playful",
    sections: [
      { id: "announcement", sectionId: "announcement-bar", variant: "playful", props: { text: "Free Shipping on Orders $50+" }, order: 0 },
      { id: "header", sectionId: "header-navigation", variant: "playful", props: { brand: "Curious Kids", links: ["Shop by Age","Shop by Skill","STEM","Gifts"] }, order: 1 },
      { id: "hero", sectionId: "hero-split", variant: "playful", props: { headline: "Learning Through Play", subheadline: "Award-winning educational toys that spark curiosity and build real skills.", cta: "Shop All", backgroundImage: "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?auto=format&fit=crop&q=80&w=2000" }, order: 2 },
      { id: "shop-by-goal", sectionId: "shop-by-goal", variant: "playful", props: { title: "Shop by Skill", goals: ["STEM","Creativity","Language","Motor Skills"] }, order: 3 },
      { id: "shop-by-age", sectionId: "shop-by-age", variant: "playful", props: { title: "Shop by Age", ages: ["0-2","3-5","6-8","9-12"] }, order: 4 },
      { id: "products", sectionId: "featured-products", variant: "playful", props: { title: "Award Winners" }, order: 5 },
      { id: "gift-guide", sectionId: "gift-guide", variant: "playful", props: { headline: "Gift Finder" }, order: 6 },
      { id: "testimonials", sectionId: "testimonial-grid", variant: "playful", props: { headline: "Teacher Approved" }, order: 7 },
      { id: "newsletter", sectionId: "newsletter-cta", variant: "playful", props: { headline: "Activity Ideas & Deals" }, order: 8 },
      { id: "footer", sectionId: "footer-standard", variant: "playful", props: { brand: "Curious Kids", description: "Inspiring the next generation of thinkers and makers." }, order: 9 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
