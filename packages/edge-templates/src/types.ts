// Root contract for Edge Marketplace Hub Puck editor
export type EdgeRootProps = {
  siteName: string;
  siteTagline?: string;
  businessType: "retail" | "service" | "food" | "artisan" | "event";
  templateFamily:
    | "retail-core"
    | "service-pro"
    | "food-catering"
    | "artisan-market"
    | "event-floral";
  stylePreset: string;
  colorScheme: string;
  typographyPreset: string;
  logoUrl?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  supportPhone?: string;
  supportEmail?: string;
  checkoutMode: "native" | "stripe-link" | "payment-link" | "quote-only";
  currency: string;
  locale: string;
  seoTitle?: string;
  seoDescription?: string;
};

// Section metadata for edge-sections
export type SectionMeta = {
  category: string;
  variation: string;
  verticals: EdgeRootProps["businessType"][];
  required?: boolean;
  singleton?: boolean;
  recommendedOrder?: number;
  maxInstances?: number;
};

// Template manifest type (Phase 5)
export type TemplateManifest = {
  id: EdgeRootProps["templateFamily"];
  label: string;
  businessType: EdgeRootProps["businessType"];
  allowedSections: string[];
  requiredSections: string[];
  recommendedStack: string[];
  defaultRootProps: Partial<EdgeRootProps>;
  starterContent: unknown[];
  validationRules: {
    minHeroes: number;
    maxHeaders: number;
    maxFooters: number;
    requiresPayment: boolean;
    requiresContactMethod: boolean;
  };
};

// Persistence record types (Phase 4)
export type SitePageRecord = {
  id: string;
  siteId: string;
  slug: string;
  puckData: {
    root: EdgeRootProps;
    content: unknown[];
  };
};

export type SectionManifestRecord = {
  pageId: string;
  sections: {
    id: string;
    type: string;
    order: number;
    required?: boolean;
    externalBindings?: Record<string, string>;
  }[];
};

export type DeploymentRecord = {
  siteId: string;
  domain?: string;
  status: "draft" | "validating" | "published" | "failed";
  checkoutMode: EdgeRootProps["checkoutMode"];
  lastPublishedAt?: string;
};

// Normalized page contract (standardizes content items for builder/storefront)
export type NormalizedContentItem = {
  id: string;
  type: string;
  props: Record<string, unknown>;
  order: number;
  required?: boolean;
};

// Normalized page type that both builder and storefront agree on
export type NormalizedPage = {
  root: EdgeRootProps;
  content: NormalizedContentItem[];
};

// Helper to normalize raw Puck content (unknown[]) to NormalizedContentItem[]
export function normalizeContent(rawContent: unknown[]): NormalizedContentItem[] {
  return rawContent.map((item: any, index) => ({
    id: item.id || `content-${index}-${Date.now()}`,
    type: item.type,
    props: item.props || {},
    order: item.order || index,
    required: item.required,
  }));
}
