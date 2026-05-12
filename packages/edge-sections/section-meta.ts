/**
 * Section Metadata - defines which verticals each section supports
 */

export type SectionMeta = {
  category: string;
  variation: string;
  verticals: ("retail" | "service" | "food" | "artisan" | "event")[];
  required?: boolean;
  singleton?: boolean;
  recommendedOrder?: number;
  maxInstances?: number;
};

// Header Sections
export const SimpleHeaderMeta: SectionMeta = {
  category: "headers",
  variation: "SimpleHeader",
  verticals: ["retail", "service", "food", "artisan", "event"],
  required: true,
  singleton: true,
  recommendedOrder: 1,
};

export const PromoHeaderMeta: SectionMeta = {
  category: "headers",
  variation: "PromoHeader",
  verticals: ["retail", "food", "artisan"],
  singleton: false,
  recommendedOrder: 2,
};

export const CommerceHeaderMeta: SectionMeta = {
  category: "headers",
  variation: "CommerceHeader",
  verticals: ["retail", "food"],
  required: true,
  singleton: true,
  recommendedOrder: 1,
};

// Hero Sections
export const ProductHeroMeta: SectionMeta = {
  category: "heroes",
  variation: "ProductHero",
  verticals: ["retail", "food", "artisan"],
  required: true,
  singleton: true,
  recommendedOrder: 3,
};

export const ServiceHeroMeta: SectionMeta = {
  category: "heroes",
  variation: "ServiceHero",
  verticals: ["service"],
  required: true,
  singleton: true,
  recommendedOrder: 3,
};

export const SplitHeroMeta: SectionMeta = {
  category: "heroes",
  variation: "SplitHero",
  verticals: ["retail", "service", "artisan"],
  singleton: false,
  recommendedOrder: 3,
};

export const VisualHeroMeta: SectionMeta = {
  category: "heroes",
  variation: "VisualHero",
  verticals: ["artisan", "event", "food"],
  singleton: false,
  recommendedOrder: 3,
};

// Commerce Sections
export const FeaturedCollectionMeta: SectionMeta = {
  category: "commerce",
  variation: "FeaturedCollection",
  verticals: ["retail", "food", "artisan"],
  singleton: false,
  recommendedOrder: 4,
  maxInstances: 3,
};

export const ProductGridMeta: SectionMeta = {
  category: "commerce",
  variation: "ProductGrid",
  verticals: ["retail", "artisan"],
  singleton: false,
  recommendedOrder: 5,
};

// Service Sections
export const ServiceCardsMeta: SectionMeta = {
  category: "services",
  variation: "ServiceCards",
  verticals: ["service"],
  singleton: false,
  recommendedOrder: 4,
  maxInstances: 2,
};

export const PricingTiersMeta: SectionMeta = {
  category: "services",
  variation: "PricingTiers",
  verticals: ["service"],
  singleton: false,
  recommendedOrder: 5,
};

export const QuoteCTAMeta: SectionMeta = {
  category: "services",
  variation: "QuoteCTA",
  verticals: ["service"],
  singleton: false,
  recommendedOrder: 6,
  maxInstances: 2,
};

// Proof Sections
export const TestimonialsMeta: SectionMeta = {
  category: "proof",
  variation: "Testimonials",
  verticals: ["retail", "service", "food", "artisan", "event"],
  singleton: false,
  recommendedOrder: 7,
};

export const ReviewStripMeta: SectionMeta = {
  category: "proof",
  variation: "ReviewStrip",
  verticals: ["retail", "service", "food"],
  singleton: false,
  recommendedOrder: 7,
};

// Conversion Sections
export const FAQMeta: SectionMeta = {
  category: "conversion",
  variation: "FAQ",
  verticals: ["retail", "service", "food", "artisan", "event"],
  singleton: false,
  recommendedOrder: 8,
};

// Footer Sections
export const BasicFooterMeta: SectionMeta = {
  category: "footers",
  variation: "BasicFooter",
  verticals: ["retail", "service", "food", "artisan", "event"],
  required: true,
  singleton: true,
  recommendedOrder: 10,
};

export const CommerceFooterMeta: SectionMeta = {
  category: "footers",
  variation: "CommerceFooter",
  verticals: ["retail", "food"],
  required: true,
  singleton: true,
  recommendedOrder: 10,
};

export const ServiceFooterMeta: SectionMeta = {
  category: "footers",
  variation: "ServiceFooter",
  verticals: ["service"],
  required: true,
  singleton: true,
  recommendedOrder: 10,
};

// All section metadatas
export const allSectionMetas: SectionMeta[] = [
  SimpleHeaderMeta,
  PromoHeaderMeta,
  CommerceHeaderMeta,
  ProductHeroMeta,
  ServiceHeroMeta,
  SplitHeroMeta,
  VisualHeroMeta,
  FeaturedCollectionMeta,
  ProductGridMeta,
  ServiceCardsMeta,
  PricingTiersMeta,
  QuoteCTAMeta,
  TestimonialsMeta,
  ReviewStripMeta,
  FAQMeta,
  BasicFooterMeta,
  CommerceFooterMeta,
  ServiceFooterMeta,
];
