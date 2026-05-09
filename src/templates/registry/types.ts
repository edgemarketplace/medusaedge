// ═══════════════════════════════════════════════════════════════════
// Antigravity Template Blueprint Types
// Canonical type system for the section-based composition model.
// ═══════════════════════════════════════════════════════════════════

/* ── Section Identity ── */
export type SectionCategory =
  | "hero"
  | "header"
  | "footer"
  | "commerce"
  | "social"
  | "promotional"
  | "content"
  | "booking"
  | "trust"
  | "navigation"

export type SectionId =
  | "hero-editorial"
  | "hero-split"
  | "hero-centered"
  | "hero-booking"
  | "header-navigation"
  | "announcement-bar"
  | "footer-standard"
  | "product-grid"
  | "product-carousel"
  | "category-grid"
  | "trust-strip"
  | "proof-strip"
  | "ugc-grid"
  | "countdown-banner"
  | "bundle-builder"
  | "comparison-table"
  | "subscription-plans"
  | "loyalty-cta"
  | "recently-viewed"
  | "service-menu"
  | "booking-cta"
  | "testimonial-grid"
  | "testimonial-slider"
  | "faq"
  | "newsletter-cta"
  | "contact-strip"
  | "featured-products"
  | "lookbook"
  | "ingredient-spotlight"
  | "origin-story"
  | "founder-story"
  | "process-timeline"
  | "materials-finishes"
  | "collection-grid"
  | "shop-by-room"
  | "shop-by-goal"
  | "shop-by-age"
  | "shop-by-pet"
  | "shop-by-occasion"
  | "shop-by-use-case"
  | "gift-guide"
  | "maker-profiles"
  | "event-calendar"
  | "before-after-gallery"
  | "pickup-delivery-strip"
  | "service-area-strip"
  | "wholesale-inquiry"
  | "membership-plans"

/* ── Theme Variant ── */
export type ThemeVariant =
  | "luxury"
  | "editorial"
  | "minimal"
  | "athletic"
  | "premium-dark"
  | "soft-boutique"
  | "industrial"
  | "organic"
  | "romantic"
  | "warm"
  | "playful"
  | "vibrant"

/* ── Category ── */
export type MarketplaceCategory =
  | "fashion"
  | "beauty"
  | "activewear"
  | "creator-commerce"
  | "services"
  | "food-beverage"
  | "local-marketplace"
  | "luxury-retail"
  | "boutique"
  | "event-commerce"
  | "home-decor"
  | "pet-care"
  | "baby-kids"
  | "toys-education"
  | "wholesale-b2b"
  | "maker-craft"
  | "floral-gifting"

/* ── Aesthetic Tag ── */
export type AestheticTag =
  | "monochrome"
  | "editorial"
  | "minimal"
  | "bold"
  | "soft"
  | "warm"
  | "cool"
  | "luxurious"
  | "playful"
  | "industrial"
  | "organic"
  | "tech-forward"
  | "romantic"
  | "earthy"
  | "vibrant"
  | "athletic"

/* ── Complexity ── */
export type CompositionComplexity = "starter" | "standard" | "advanced" | "enterprise"

/* ── Section Schema Field ── */
export interface SchemaField {
  type: "text" | "textarea" | "image" | "select" | "number" | "color" | "boolean" | "medusa-collection" | "medusa-product"
  label: string
  default?: string | number | boolean
  options?: string[]
  aiEditable?: boolean
  group?: string
}

export interface SectionSchema {
  [field: string]: SchemaField
}

/* ── Section Blueprint ── */
export interface SectionBlueprint {
  id: SectionId
  category: SectionCategory
  label: string
  description: string
  variants: ThemeVariant[]
  schema: SectionSchema
  thumbnail?: string
  minInstances?: number
  maxInstances?: number
  aiTags?: string[]
}

/* ── Section Instance (within a composition) ── */
export interface SectionInstance {
  id: string
  sectionId: SectionId
  variant?: ThemeVariant
  props: Record<string, unknown>
  order: number
  /** Override the section's schema for this specific instance */
  schemaOverrides?: Partial<SectionSchema>
}

/* ── Template Composition ── */
export interface TemplateComposition {
  theme: ThemeVariant
  sections: SectionInstance[]
  metadata: {
    version: string
    createdAt: string
    generatedBy: "antigravity" | "ai" | "merchant"
  }
}

/* ── Full Template Blueprint ── */
export interface TemplateBlueprint {
  /** Unique template id, kebab-case */
  id: string
  /** Human-readable name */
  name: string
  /** Primary marketplace category */
  category: MarketplaceCategory
  /** Categories this template also fits */
  secondaryCategories?: MarketplaceCategory[]
  /** Primary theme */
  theme: ThemeVariant
  /** Available theme variants */
  themeVariants: ThemeVariant[]
  /** Thumbnail image URL */
  thumbnail: string
  /** Detailed description */
  description: string
  /** Short tagline */
  tagline: string
  /** "Best for" use cases */
  bestFor: string
  /** Aesthetic tags */
  aestheticTags: AestheticTag[]
  /** Composition complexity level */
  complexity: CompositionComplexity
  /** Whether AI-ready editing is enabled */
  aiReady: boolean
  /** CSS gradient accent for card display */
  accent: string
  /** Styling direction guidance */
  stylingDirection: string
  /** The section composition */
  composition: TemplateComposition
  /** Source attribution */
  source: string
  /** Industry */
  industry: string
  /** Business sizes this fits */
  businessSize: "solo" | "small" | "medium" | "enterprise" | "both"
  /** Sales models */
  salesModel: ("catalog" | "subscription" | "booking" | "wholesale" | "gifting")[]
  /** Hero section image */
  heroImage?: string
}
