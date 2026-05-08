export type TemplateVertical = "retail" | "services" | "creator"

export type TemplatePrimitiveKind =
  | "header"
  | "hero"
  | "trust-bar"
  | "category-rail"
  | "product-grid"
  | "service-cards"
  | "story-cards"
  | "cta"
  | "footer"

export interface PrimitiveContract {
  kind: TemplatePrimitiveKind
  required: boolean
  minInstances: number
  maxInstances: number
  description: string
}

export interface ThemeTokenSet {
  id: string
  vertical: TemplateVertical
  label: string
  tokens: {
    brandPrimary: string
    brandAccent: string
    surfaceBase: string
    surfaceMuted: string
    textPrimary: string
    textMuted: string
    buttonPrimary: string
    buttonPrimaryText: string
  }
}

export interface TemplateFoundationDescriptor {
  version: "v1"
  vertical: TemplateVertical
  flagship: boolean
  tokenSetId: string
  primitives: TemplatePrimitiveKind[]
}

export const primitiveContracts: Record<TemplatePrimitiveKind, PrimitiveContract> = {
  header: {
    kind: "header",
    required: true,
    minInstances: 1,
    maxInstances: 1,
    description: "Primary nav, logo/brand lockup, and top-level conversion CTA.",
  },
  hero: {
    kind: "hero",
    required: true,
    minInstances: 1,
    maxInstances: 1,
    description: "Above-the-fold headline, value proposition, and primary conversion CTA.",
  },
  "trust-bar": {
    kind: "trust-bar",
    required: true,
    minInstances: 1,
    maxInstances: 2,
    description: "Short trust proof strip for guarantees, fulfillment, social proof, or ratings.",
  },
  "category-rail": {
    kind: "category-rail",
    required: false,
    minInstances: 0,
    maxInstances: 2,
    description: "Compact taxonomy rail for browse-first navigation patterns.",
  },
  "product-grid": {
    kind: "product-grid",
    required: false,
    minInstances: 0,
    maxInstances: 3,
    description: "Merchandising/product card grid for retail and creator inventory.",
  },
  "service-cards": {
    kind: "service-cards",
    required: false,
    minInstances: 0,
    maxInstances: 3,
    description: "Package/plan cards with scope, pricing anchor, and booking intent.",
  },
  "story-cards": {
    kind: "story-cards",
    required: false,
    minInstances: 0,
    maxInstances: 3,
    description: "Narrative modules for founder story, artisan spotlight, and differentiators.",
  },
  cta: {
    kind: "cta",
    required: true,
    minInstances: 1,
    maxInstances: 2,
    description: "High-intent conversion section for quote, waitlist, or purchase push.",
  },
  footer: {
    kind: "footer",
    required: true,
    minInstances: 1,
    maxInstances: 1,
    description: "Global footer with support, policy, and secondary navigation links.",
  },
}

export const themeTokenSets: ThemeTokenSet[] = [
  {
    id: "retail-core",
    vertical: "retail",
    label: "Retail Core",
    tokens: {
      brandPrimary: "bg-blue-700",
      brandAccent: "bg-amber-400",
      surfaceBase: "bg-white",
      surfaceMuted: "bg-slate-100",
      textPrimary: "text-slate-950",
      textMuted: "text-slate-600",
      buttonPrimary: "bg-blue-700",
      buttonPrimaryText: "text-white",
    },
  },
  {
    id: "services-growth",
    vertical: "services",
    label: "Services Growth",
    tokens: {
      brandPrimary: "bg-emerald-800",
      brandAccent: "bg-cyan-400",
      surfaceBase: "bg-white",
      surfaceMuted: "bg-emerald-50",
      textPrimary: "text-slate-950",
      textMuted: "text-slate-600",
      buttonPrimary: "bg-emerald-700",
      buttonPrimaryText: "text-white",
    },
  },
  {
    id: "creator-editorial",
    vertical: "creator",
    label: "Creator Editorial",
    tokens: {
      brandPrimary: "bg-orange-700",
      brandAccent: "bg-amber-300",
      surfaceBase: "bg-white",
      surfaceMuted: "bg-stone-100",
      textPrimary: "text-stone-900",
      textMuted: "text-stone-600",
      buttonPrimary: "bg-orange-700",
      buttonPrimaryText: "text-white",
    },
  },
]

export const flagshipFoundationMap: Record<string, TemplateFoundationDescriptor> = {
  "amazon-inspired-marketplace": {
    version: "v1",
    vertical: "retail",
    flagship: true,
    tokenSetId: "retail-core",
    primitives: ["header", "hero", "trust-bar", "category-rail", "product-grid", "cta", "footer"],
  },
  "service-pro-operations": {
    version: "v1",
    vertical: "services",
    flagship: true,
    tokenSetId: "services-growth",
    primitives: ["header", "hero", "trust-bar", "service-cards", "cta", "footer"],
  },
  "etsy-inspired-maker-boutique": {
    version: "v1",
    vertical: "creator",
    flagship: true,
    tokenSetId: "creator-editorial",
    primitives: ["header", "hero", "story-cards", "product-grid", "cta", "footer"],
  },
}
