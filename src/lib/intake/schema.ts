export const marketplaceTemplates = [
  { id: "template-medusa-b2b-marketplace", label: "B2B Marketplace", repo: "edgemarketplace/template-medusa-b2b-marketplace" },
  { id: "template-clothing-marketplace", label: "Clothing / Fashion", repo: "edgemarketplace/template-clothing-marketplace" },
  { id: "template-home-goods-furniture-marketplace", label: "Home Goods / Furniture", repo: "edgemarketplace/template-home-goods-furniture-marketplace" },
  { id: "template-creator-digital-products-marketplace", label: "Creator / Digital Products", repo: "edgemarketplace/template-creator-digital-products-marketplace" },
  { id: "template-home-services-marketplace", label: "Home Services", repo: "edgemarketplace/template-home-services-marketplace" },
  { id: "template-fitness-coaching-marketplace", label: "Fitness / Coaching", repo: "edgemarketplace/template-fitness-coaching-marketplace" },
  { id: "template-beauty-wellness-marketplace", label: "Beauty / Wellness", repo: "edgemarketplace/template-beauty-wellness-marketplace" },
  { id: "template-course-education-marketplace", label: "Course / Education", repo: "edgemarketplace/template-course-education-marketplace" },
  { id: "template-diy-maker-marketplace", label: "DIY / Maker Marketplace", repo: "edgemarketplace/template-diy-maker-marketplace" },
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

export function slugifyBusinessName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
}
