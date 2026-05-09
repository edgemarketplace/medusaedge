import type { TemplateBlueprint } from "../../types"

export const localRepairParts: TemplateBlueprint = {
  id: "local-repair-parts",
  name: "Local Repair & Parts Shop",
  category: "services",
  secondaryCategories: ["local-marketplace"],
  theme: "industrial",
  themeVariants: ["industrial", "minimal", "premium-dark"],
  thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
  heroImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000",
  description: "A practical, trustworthy storefront that combines repair booking with product or parts discovery.",
  tagline: "Fix it right, fix it fast",
  bestFor: "Electronics repair, bike repair, parts sales, appliance servicing",
  aestheticTags: ["industrial", "bold", "tech-forward"],
  complexity: "standard",
  aiReady: true,
  accent: "from-slate-900 to-cyan-500",
  stylingDirection: "Modern industrial look with crisp contrast, service clarity, and high-trust utility-first layouts.",
  source: "Functional service-commerce template for repairs and parts sales",
  industry: "service-commerce",
  businessSize: "solo",
  salesModel: ["booking", "catalog"],
  composition: {
    theme: "industrial",
    sections: [
      { id: "announcement", sectionId: "announcement-bar", variant: "industrial", props: { text: "Same-day diagnostics available — call or book online" }, order: 0 },
      { id: "header", sectionId: "header-navigation", variant: "industrial", props: { brand: "FixLab Pro", links: ["Services","Parts","Book","Contact"] }, order: 1 },
      { id: "hero", sectionId: "hero-booking", variant: "industrial", props: { headline: "Repair. Restore. Reuse.", subheadline: "Expert diagnostics, genuine parts, and fast turnaround for all your devices.", primaryCta: "Book Repair", secondaryCta: "Shop Parts", backgroundImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000" }, order: 2 },
      { id: "services", sectionId: "service-menu", variant: "industrial", props: { title: "Repair Services" }, order: 3 },
      { id: "categories", sectionId: "category-grid", variant: "industrial", props: { title: "Parts & Accessories" }, order: 4 },
      { id: "process", sectionId: "process-timeline", variant: "industrial", props: { headline: "How It Works", steps: ["Diagnose","Quote","Repair","Return"] }, order: 5 },
      { id: "testimonials", sectionId: "testimonial-grid", variant: "industrial", props: { headline: "Fixed & Satisfied" }, order: 6 },
      { id: "service-area", sectionId: "service-area-strip", variant: "industrial", props: { headline: "Service Area" }, order: 7 },
      { id: "faq", sectionId: "faq", variant: "industrial", props: { headline: "Common Questions" }, order: 8 },
      { id: "footer", sectionId: "footer-standard", variant: "industrial", props: { brand: "FixLab Pro", description: "Professional repair with genuine parts. Since 2015." }, order: 9 },
    ],
    metadata: { version: "2.0", createdAt: "2026-05-09", generatedBy: "antigravity" }
  }
}
