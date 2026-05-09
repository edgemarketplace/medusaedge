export const marketplaceTemplates = [
  {
    id: "template-medusa-b2b-marketplace",
    label: "B2B Marketplace",
    emoji: "🏢",
    repo: "edgemarketplace/template-medusa-b2b-marketplace",
    description: "B2B wholesale, bulk ordering, and vendor management",
    features: ["Wholesale pricing", "Vendor accounts", "Bulk orders"],
  },
  {
    id: "template-clothing-marketplace",
    label: "Clothing / Fashion",
    emoji: "👗",
    repo: "edgemarketplace/template-clothing-marketplace",
    description: "Fashion, apparel, and accessories",
    features: ["Size variants", "Color options", "Fashion collections"],
  },
  {
    id: "template-home-goods-furniture-marketplace",
    label: "Home Goods / Furniture",
    emoji: "🛋️",
    repo: "edgemarketplace/template-home-goods-furniture-marketplace",
    description: "Furniture, home decor, and interior design",
    features: ["Room configurator", "3D preview", "Interior styling"],
  },
  {
    id: "template-creator-digital-products-marketplace",
    label: "Creator / Digital Products",
    emoji: "💾",
    repo: "edgemarketplace/template-creator-digital-products-marketplace",
    description: "Digital downloads, content, and creator economy",
    features: ["Instant delivery", "License management", "Content DRM"],
  },
  {
    id: "template-home-services-marketplace",
    label: "Home Services",
    emoji: "🏠",
    repo: "edgemarketplace/template-home-services-marketplace",
    description: "Home repairs, cleaning, and local services",
    features: ["Service booking", "Technician routing", "Reviews"],
  },
  {
    id: "template-fitness-coaching-marketplace",
    label: "Fitness / Coaching",
    emoji: "💪",
    repo: "edgemarketplace/template-fitness-coaching-marketplace",
    description: "Personal training, coaching, and fitness classes",
    features: ["Class scheduling", "Video lessons", "Client tracking"],
  },
  {
    id: "template-beauty-wellness-marketplace",
    label: "Beauty / Wellness",
    emoji: "💄",
    repo: "edgemarketplace/template-beauty-wellness-marketplace",
    description: "Beauty services, wellness, and cosmetics",
    features: ["Appointment booking", "Service bundles", "Product sales"],
  },
  {
    id: "template-course-education-marketplace",
    label: "Course / Education",
    emoji: "📚",
    repo: "edgemarketplace/template-course-education-marketplace",
    description: "Online courses, training, and learning platforms",
    features: ["Video courses", "Certifications", "Student progress"],
  },
  {
    id: "template-diy-maker-marketplace",
    label: "DIY / Maker Marketplace",
    emoji: "🛠️",
    repo: "edgemarketplace/template-diy-maker-marketplace",
    description: "Handmade goods, artisan products, and crafts",
    features: ["Artisan portfolios", "Custom orders", "Process sharing"],
  },
] as const

export const intakeStatuses = [
  "new_intake",
  "needs_review",
  "approved",
  "repo_created",
  "configured",
  "deployed_preview",
  "dns_connected",
  "live",
  "handoff_complete",
] as const

export type MarketplaceTemplateId = (typeof marketplaceTemplates)[number]["id"]
export type IntakeStatus = (typeof intakeStatuses)[number]

export type MarketplaceIntake = {
  id: string
  createdAt: string
  status: IntakeStatus
  selectedTemplate: MarketplaceTemplateId
  selectedTemplateRepo: string
  plan: "launch" | "pro" | "custom"
  businessName: string
  ownerName: string
  email: string
  phone?: string
  currentWebsite?: string
  desiredDomain?: string
  preferredSubdomain?: string
  tagline?: string
  brandColors?: string
  socialLinks?: string
  offerSummary: string
  catalogSize?: string
  fulfillmentNeeds?: string
  launchTimeline?: string
  budgetRange?: string
  notes?: string
  source: "website"
}

export type IntakePayload = Omit<MarketplaceIntake, "id" | "createdAt" | "status" | "selectedTemplateRepo" | "source">

export function getTemplateById(id: string) {
  return marketplaceTemplates.find((template) => template.id === id) || marketplaceTemplates[0]
}

/** Map old marketplace template IDs → Antigravity blueprint IDs */
export const TEMPLATE_TO_ANTIGRAVITY_MAP: Record<string, string> = {
  "template-clothing-marketplace": "studio-mode-apparel",
  "template-beauty-wellness-marketplace": "clean-beauty-ritual",
  "template-fitness-coaching-marketplace": "performance-activewear",
  "template-home-goods-furniture-marketplace": "modern-home-essentials",
  "template-creator-digital-products-marketplace": "maker-marketplace-showcase",
  "template-home-services-marketplace": "local-repair-parts",
  "template-diy-maker-marketplace": "maker-marketplace-showcase",
  "template-course-education-marketplace": "educational-toys-learning",
  "template-medusa-b2b-marketplace": "wholesale-catalog-pro",
}

export function getAntigravityTemplateId(marketplaceTemplateId: string): string {
  return TEMPLATE_TO_ANTIGRAVITY_MAP[marketplaceTemplateId] || "studio-mode-apparel"
}

export function slugifyBusinessName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
}
