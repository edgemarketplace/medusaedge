// ecommerce-template-manifest.ts
// Professional template catalog for 15-minute launch flow
// Generated from specification - 20 industry-specific templates

export type TemplateIndustry =
  | "fashion"
  | "beauty"
  | "health"
  | "food"
  | "home"
  | "pet"
  | "baby"
  | "toys"
  | "wholesale"
  | "maker"
  | "service-commerce"
  | "floral"

export type BusinessSize = "small" | "mid-market" | "both"

export type SalesModel =
  | "catalog"
  | "subscription"
  | "booking"
  | "wholesale"
  | "local-delivery"
  | "custom-order"
  | "membership"
  | "hybrid-service-retail"

export type StyleFamily =
  | "minimal"
  | "luxury"
  | "editorial"
  | "playful"
  | "performance"
  | "organic"
  | "bold-promo"
  | "service-first"
  | "catalog-first"
  | "boutique"

export type ConversionGoal =
  | "drive-first-purchase"
  | "grow-aov"
  | "grow-subscriptions"
  | "book-appointments"
  | "showcase-catalog"
  | "support-local-pickup"
  | "capture-wholesale-leads"
  | "promote-seasonal-offers"
  | "encourage-repeat-orders"
  | "generate-custom-order-inquiries"

export type SectionId =
  | "announcement-bar"
  | "header"
  | "hero-split"
  | "hero-centered"
  | "hero-editorial"
  | "hero-booking"
  | "logo-strip"
  | "category-grid"
  | "collection-grid"
  | "featured-products"
  | "bestsellers"
  | "shop-by-use-case"
  | "shop-by-goal"
  | "shop-by-room"
  | "shop-by-pet"
  | "shop-by-age"
  | "shop-by-occasion"
  | "benefit-strip"
  | "proof-strip"
  | "comparison-table"
  | "testimonial-grid"
  | "testimonial-slider"
  | "ugc-gallery"
  | "lookbook"
  | "bundle-builder"
  | "bundle-offers"
  | "subscription-plans"
  | "membership-plans"
  | "service-menu"
  | "booking-cta"
  | "pickup-delivery-strip"
  | "service-area-strip"
  | "before-after-gallery"
  | "ingredient-spotlight"
  | "materials-finishes"
  | "process-timeline"
  | "origin-story"
  | "founder-story"
  | "maker-profiles"
  | "event-calendar"
  | "gift-guide"
  | "faq"
  | "newsletter-cta"
  | "loyalty-cta"
  | "wholesale-inquiry"
  | "contact-strip"
  | "footer"

export interface EcommerceTemplateBlueprint {
  id: string
  name: string
  source: string
  description: string
  bestFor: string
  accent: string

  industry: TemplateIndustry
  businessSize: BusinessSize
  salesModel: SalesModel[]
  styleFamily: StyleFamily[]
  conversionGoals: ConversionGoal[]

  previewImageKey: string
  layoutPreset: string

  sectionSet: SectionId[]
  stylingDirection: string
  reusableComponents: string[]
  merchandisingFeatures: string[]
  customizationTokens: string[]
  builderNotes: string[]

  contentSeed: {
    heroVariant: "split" | "centered" | "editorial" | "booking"
    cardStyle: "flat" | "bordered" | "elevated" | "luxury"
    ctaStyle: "pill" | "rounded-rect" | "ghost" | "high-contrast"
    density: "airy" | "balanced" | "compact"
    emphasis: "catalog" | "story" | "offer" | "service" | "subscription"
  }
}

export const ecommerceTemplateBlueprints: EcommerceTemplateBlueprint[] = [
  // Fashion templates
  {
    id: "studio-mode-apparel",
    name: "Studio Mode Apparel",
    source: "Editorial fashion storefront for modern apparel brands",
    description: "A clean, premium apparel homepage with strong imagery, featured collections, and lookbook-driven merchandising.",
    bestFor: "Streetwear, basics, capsule collections, modern fashion labels",
    accent: "from-zinc-900 to-stone-300",
    industry: "fashion",
    businessSize: "both",
    salesModel: ["catalog"],
    styleFamily: ["minimal", "editorial", "luxury"],
    conversionGoals: ["drive-first-purchase", "showcase-catalog", "grow-aov"],
    previewImageKey: "fashion",
    layoutPreset: "editorial-commerce",
    sectionSet: ["announcement-bar", "header", "hero-editorial", "collection-grid", "featured-products", "lookbook", "proof-strip", "ugc-gallery", "newsletter-cta", "footer"],
    stylingDirection: "Monochrome luxury with editorial spacing, oversized typography, strong image framing, and high-contrast CTA moments.",
    reusableComponents: ["lookbook mosaic", "shop-the-look module", "new arrival badges", "collection spotlight cards", "UGC quote slider"],
    merchandisingFeatures: ["new arrivals", "featured collections", "shop the look", "editorial campaign sections", "cross-sell styling suggestions"],
    customizationTokens: ["brand-primary", "headline-font", "body-font", "card-radius", "section-spacing", "hero-overlay-strength"],
    builderNotes: ["Supports dark or light brand modes", "Works well with 3-5 collection categories", "Best when imagery is high quality and portrait-oriented"],
    contentSeed: { heroVariant: "editorial", cardStyle: "luxury", ctaStyle: "pill", density: "airy", emphasis: "story" }
  },
  {
    id: "boutique-seasonal-edit",
    name: "Boutique Seasonal Edit",
    source: "Curated boutique storefront with soft promo storytelling",
    description: "A warm boutique homepage centered on seasonal edits, outfit ideas, and curated shopping moments.",
    bestFor: "Women's boutiques, giftable fashion, local apparel stores",
    accent: "from-rose-500 to-amber-100",
    industry: "fashion",
    businessSize: "small",
    salesModel: ["catalog"],
    styleFamily: ["boutique", "editorial", "luxury"],
    conversionGoals: ["drive-first-purchase", "promote-seasonal-offers", "grow-aov"],
    previewImageKey: "fashion",
    layoutPreset: "boutique-grid",
    sectionSet: ["announcement-bar", "header", "hero-split", "category-grid", "featured-products", "bundle-offers", "testimonial-slider", "pickup-delivery-strip", "loyalty-cta", "footer"],
    stylingDirection: "Soft boutique styling with warm neutrals, rounded cards, gentle shadows, and magazine-inspired merchandising.",
    reusableComponents: ["occasion category chips", "staff picks row", "outfit bundle cards", "gift card promo panel", "boutique note section"],
    merchandisingFeatures: ["seasonal edits", "curated collections", "bundle offers", "local pickup messaging", "loyalty invitation"],
    customizationTokens: ["accent-color", "surface-muted", "card-radius", "shadow-style", "button-shape", "promo-badge-style"],
    builderNotes: ["Great template for frequent seasonal homepage refreshes", "Can swap bundle row for gift guide row", "Useful for local pickup + online hybrid stores"],
    contentSeed: { heroVariant: "split", cardStyle: "elevated", ctaStyle: "pill", density: "balanced", emphasis: "offer" }
  },
  // Beauty templates
  {
    id: "clean-beauty-ritual-shop",
    name: "Clean Beauty Ritual Shop",
    source: "Routine-based beauty storefront with ingredient storytelling",
    description: "A premium skincare template built around routines, ingredient education, and subscribe-and-save behavior.",
    bestFor: "Skincare, clean beauty, self-care brands, treatment systems",
    accent: "from-emerald-200 to-stone-50",
    industry: "beauty",
    businessSize: "both",
    salesModel: ["catalog", "subscription"],
    styleFamily: ["minimal", "organic", "luxury"],
    conversionGoals: ["drive-first-purchase", "grow-subscriptions", "encourage-repeat-orders"],
    previewImageKey: "product",
    layoutPreset: "subscription-first",
    sectionSet: ["header", "hero-centered", "shop-by-goal", "featured-products", "ingredient-spotlight", "testimonial-slider", "subscription-plans", "faq", "footer"],
    stylingDirection: "Airy skincare aesthetic with muted creams, soft sage tones, elevated typography, and premium clinical balance.",
    reusableComponents: ["routine step cards", "ingredient spotlight cards", "skin concern tags", "subscribe and save block", "expert quote panel"],
    merchandisingFeatures: ["routine merchandising", "ingredient education", "concern-based product discovery", "subscription prompts", "review-led conversion"],
    customizationTokens: ["surface-base", "surface-muted", "headline-font", "card-radius", "section-spacing", "button-tone"],
    builderNotes: ["Ideal for 3-step or 4-step routines", "Swap ingredient section for clinical results if needed", "Subscription module can be shown higher on page for replenishable products"],
    contentSeed: { heroVariant: "centered", cardStyle: "elevated", ctaStyle: "rounded-rect", density: "airy", emphasis: "subscription" }
  },
  // Food templates
  {
    id: "artisan-coffee-roaster",
    name: "Artisan Coffee Roaster",
    source: "Subscription-friendly coffee storefront with origin storytelling",
    description: "A specialty coffee homepage that balances product discovery, roast education, and recurring subscription conversion.",
    bestFor: "Coffee roasters, subscription coffee brands, local cafés with ecommerce",
    accent: "from-amber-900 to-stone-200",
    industry: "food",
    businessSize: "both",
    salesModel: ["catalog", "subscription"],
    styleFamily: ["organic", "editorial", "boutique"],
    conversionGoals: ["grow-subscriptions", "drive-first-purchase", "encourage-repeat-orders"],
    previewImageKey: "foodtruck",
    layoutPreset: "subscription-first",
    sectionSet: ["header", "hero-editorial", "shop-by-goal", "featured-products", "origin-story", "subscription-plans", "proof-strip", "testimonial-slider", "newsletter-cta", "footer"],
    stylingDirection: "Rich café-inspired tones, tactile editorial imagery, story-first pacing, and premium yet approachable product framing.",
    reusableComponents: ["roast profile selector", "brew method cards", "origin story block", "subscription explainer", "limited roast promo band"],
    merchandisingFeatures: ["roast-based discovery", "subscription merchandising", "origin storytelling", "brewing education", "seasonal small-batch promos"],
    customizationTokens: ["headline-font", "surface-base", "accent-color", "section-spacing", "card-radius", "button-tone"],
    builderNotes: ["Great for story-rich brands with origin content", "Subscription block can appear immediately under hero", "Origin section works well with one strong featured product"],
    contentSeed: { heroVariant: "editorial", cardStyle: "elevated", ctaStyle: "rounded-rect", density: "airy", emphasis: "subscription" }
  },
  // Wholesale template
  {
    id: "wholesale-catalog-pro",
    name: "Wholesale Catalog Pro",
    source: "B2B-focused catalog template for wholesale-ready brands",
    description: "A clean and structured wholesale template built to communicate product range, MOQ logic, and retailer onboarding clearly.",
    bestFor: "Suppliers, packaged goods, boutique wholesalers, maker brands with trade accounts",
    accent: "from-slate-800 to-slate-200",
    industry: "wholesale",
    businessSize: "both",
    salesModel: ["wholesale", "catalog"],
    styleFamily: ["minimal", "catalog-first", "service-first"],
    conversionGoals: ["capture-wholesale-leads", "showcase-catalog", "grow-aov"],
    previewImageKey: "product",
    layoutPreset: "wholesale-b2b",
    sectionSet: ["header", "hero-split", "category-grid", "featured-products", "proof-strip", "wholesale-inquiry", "faq", "contact-strip", "footer"],
    stylingDirection: "Polished B2B commerce styling with strong grid logic, reduced ornament, clear data framing, and trust-first presentation.",
    reusableComponents: ["MOQ cards", "trade benefits row", "retailer logo strip", "sample pack CTA", "onboarding steps section"],
    merchandisingFeatures: ["category-led product discovery", "trade lead generation", "MOQ communication", "retailer proof", "sample requests"],
    customizationTokens: ["brand-primary", "card-border-weight", "surface-base", "button-shape", "section-spacing", "icon-style"],
    builderNotes: ["Can support dual retail + wholesale mode with toggleable sections", "Best when product categories are broad but clear", "Keep forms short and decisive for B2B leads"],
    contentSeed: { heroVariant: "split", cardStyle: "bordered", ctaStyle: "rounded-rect", density: "compact", emphasis: "catalog" }
  },
  // Floral template
  {
    id: "floral-delivery-occasion-shop",
    name: "Floral Delivery & Occasion Shop",
    source: "Elegant gifting and local delivery florist template",
    description: "An occasion-led florist template with same-day delivery messaging, recurring flowers, and event upsells.",
    bestFor: "Florists, gifting businesses, local flower delivery, event florals",
    accent: "from-rose-500 to-violet-200",
    industry: "floral",
    businessSize: "small",
    salesModel: ["catalog", "local-delivery", "subscription", "custom-order"],
    styleFamily: ["luxury", "editorial", "boutique"],
    conversionGoals: ["drive-first-purchase", "support-local-pickup", "generate-custom-order-inquiries"],
    previewImageKey: "floral",
    layoutPreset: "local-delivery",
    sectionSet: ["announcement-bar", "header", "hero-editorial", "shop-by-occasion", "featured-products", "pickup-delivery-strip", "subscription-plans", "testimonial-slider", "faq", "footer"],
    stylingDirection: "Elegant romantic styling with soft gradients, lush imagery, premium gifting cues, and refined CTA hierarchy.",
    reusableComponents: ["occasion chips", "delivery promise strip", "arrangement cards", "flower subscription panel", "event inquiry CTA"],
    merchandisingFeatures: ["occasion-led discovery", "same-day delivery trust", "subscription flowers", "event floral upsells", "giftable arrangements"],
    customizationTokens: ["accent-color", "headline-font", "card-radius", "surface-base", "button-shape", "promo-badge-style"],
    builderNotes: ["Very effective for local delivery zones", "Can switch subscription block to wedding inquiry block", "Occasion chips should be prominent near the top"],
    contentSeed: { heroVariant: "editorial", cardStyle: "luxury", ctaStyle: "pill", density: "airy", emphasis: "offer" }
  }
]

export const ecommerceTemplateGroups = {
  fashion: ecommerceTemplateBlueprints.filter((t) => t.industry === "fashion"),
  beauty: ecommerceTemplateBlueprints.filter((t) => t.industry === "beauty"),
  health: ecommerceTemplateBlueprints.filter((t) => t.industry === "health"),
  food: ecommerceTemplateBlueprints.filter((t) => t.industry === "food"),
  home: ecommerceTemplateBlueprints.filter((t) => t.industry === "home"),
  pet: ecommerceTemplateBlueprints.filter((t) => t.industry === "pet"),
  baby: ecommerceTemplateBlueprints.filter((t) => t.industry === "baby"),
  toys: ecommerceTemplateBlueprints.filter((t) => t.industry === "toys"),
  wholesale: ecommerceTemplateBlueprints.filter((t) => t.industry === "wholesale"),
  maker: ecommerceTemplateBlueprints.filter((t) => t.industry === "maker"),
  serviceCommerce: ecommerceTemplateBlueprints.filter((t) => t.industry === "service-commerce"),
  floral: ecommerceTemplateBlueprints.filter((t) => t.industry === "floral"),
}

export function getSuggestedTemplates(input: {
  industry?: TemplateIndustry
  salesModel?: SalesModel
  styleFamily?: StyleFamily
  conversionGoal?: ConversionGoal
  businessSize?: BusinessSize
}) {
  return ecommerceTemplateBlueprints
    .filter((template) => !input.industry || template.industry === input.industry)
    .filter((template) => !input.salesModel || template.salesModel.includes(input.salesModel))
    .filter((template) => !input.styleFamily || template.styleFamily.includes(input.styleFamily))
    .filter((template) => !input.conversionGoal || template.conversionGoals.includes(input.conversionGoal))
    .filter((template) => !input.businessSize || template.businessSize === "both" || template.businessSize === input.businessSize)
}

export const templateSectionLibrary: SectionId[] = [
  "announcement-bar", "header", "hero-split", "hero-centered", "hero-editorial", "hero-booking",
  "logo-strip", "category-grid", "collection-grid", "featured-products", "bestsellers",
  "shop-by-use-case", "shop-by-goal", "shop-by-room", "shop-by-pet", "shop-by-age", "shop-by-occasion",
  "benefit-strip", "proof-strip", "comparison-table", "testimonial-grid", "testimonial-slider",
  "ugc-gallery", "lookbook", "bundle-builder", "bundle-offers", "subscription-plans", "membership-plans",
  "service-menu", "booking-cta", "pickup-delivery-strip", "service-area-strip", "before-after-gallery",
  "ingredient-spotlight", "materials-finishes", "process-timeline", "origin-story", "founder-story",
  "maker-profiles", "event-calendar", "gift-guide", "faq", "newsletter-cta", "loyalty-cta",
  "wholesale-inquiry", "contact-strip", "footer"
]
