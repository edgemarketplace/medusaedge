/**
 * Puck Config Factory - Simplified Version
 * 
 * Generates Puck editor config based on template family.
 */

import type { EdgeRootProps } from "./types";
import { allSectionMetas } from "../edge-sections/section-meta";

// Import section components
import { SimpleHeader } from "../edge-sections/headers/SimpleHeader";
import { PromoHeader } from "../edge-sections/headers/PromoHeader";
import { CommerceHeader } from "../edge-sections/headers/CommerceHeader";
import { ProductHero } from "../edge-sections/heroes/ProductHero";
import { ServiceHero } from "../edge-sections/heroes/ServiceHero";
import { SplitHero } from "../edge-sections/heroes/SplitHero";
import { VisualHero } from "../edge-sections/heroes/VisualHero";
import { FeaturedCollection } from "../edge-sections/commerce/FeaturedCollection";
import { ProductGrid } from "../edge-sections/commerce/ProductGrid";
import { ServiceCards } from "../edge-sections/services/ServiceCards";
import { PricingTiers } from "../edge-sections/services/PricingTiers";
import { QuoteCTA } from "../edge-sections/services/QuoteCTA";
import { Testimonials } from "../edge-sections/proof/Testimonials";
import { ReviewStrip } from "../edge-sections/proof/ReviewStrip";
import { FAQ } from "../edge-sections/conversion/FAQ";
import { BasicFooter } from "../edge-sections/footers/BasicFooter";
import { CommerceFooter } from "../edge-sections/footers/CommerceFooter";
import { ServiceFooter } from "../edge-sections/footers/ServiceFooter";

const componentMap: Record<string, any> = {
  SimpleHeader,
  PromoHeader,
  CommerceHeader,
  ProductHero,
  ServiceHero,
  SplitHero,
  VisualHero,
  FeaturedCollection,
  ProductGrid,
  ServiceCards,
  PricingTiers,
  QuoteCTA,
  Testimonials,
  ReviewStrip,
  FAQ,
  BasicFooter,
  CommerceFooter,
  ServiceFooter,
};

// Root config fields (no JSX render function for now)
const edgeRootConfig = {
  fields: {
    siteName: { type: "text", label: "Site Name" },
    siteTagline: { type: "text", label: "Tagline" },
    businessType: {
      type: "select",
      label: "Business Type",
      options: [
        { label: "Retail", value: "retail" },
        { label: "Service", value: "service" },
        { label: "Food & Beverage", value: "food" },
        { label: "Artisan/Creative", value: "artisan" },
        { label: "Event/Floral", value: "event" },
      ],
    },
    templateFamily: {
      type: "select",
      label: "Template",
      options: [
        { label: "Retail Core", value: "retail-core" },
        { label: "Service Pro", value: "service-pro" },
        { label: "Food & Catering", value: "food-catering" },
        { label: "Artisan Market", value: "artisan-market" },
        { label: "Event & Floral", value: "event-floral" },
      ],
    },
    stylePreset: {
      type: "select",
      label: "Style Preset",
      options: [
        { label: "Modern Commerce", value: "modern-commerce" },
        { label: "Boutique Luxury", value: "boutique-luxury" },
        { label: "Professional Agency", value: "professional-agency" },
        { label: "Industrial Supply", value: "industrial-supply" },
        { label: "Creative Studio", value: "creative-studio" },
        { label: "Tech Consultant", value: "tech-consultant" },
      ],
    },
    logoUrl: { type: "text", label: "Logo URL" },
    primaryCtaLabel: { type: "text", label: "Primary CTA Label" },
    supportPhone: { type: "text", label: "Support Phone" },
    supportEmail: { type: "text", label: "Support Email" },
    checkoutMode: {
      type: "select",
      label: "Checkout Mode",
      options: [
        { label: "Native Checkout", value: "native" },
        { label: "Stripe Link", value: "stripe-link" },
        { label: "Payment Link", value: "payment-link" },
        { label: "Quote Only", value: "quote-only" },
      ],
    },
    currency: { type: "text", label: "Currency" },
    locale: { type: "text", label: "Locale" },
    seoTitle: { type: "text", label: "SEO Title" },
    seoDescription: { type: "textarea", label: "SEO Description" },
  },
};

function getAllowedSections(templateFamily: EdgeRootProps["templateFamily"]): string[] {
  const businessTypeMap: Record<string, string> = {
    "retail-core": "retail",
    "service-pro": "service",
    "food-catering": "food",
    "artisan-market": "artisan",
    "event-floral": "event",
  };

  const businessType = businessTypeMap[templateFamily] as EdgeRootProps["businessType"];
  
  return allSectionMetas
    .filter(meta => meta.verticals.includes(businessType))
    .map(meta => meta.variation);
}

function getSectionCategories(businessType: EdgeRootProps["businessType"]) {
  const categories: Record<string, { components: string[]; title: string }> = {
    headers: { title: "Headers", components: [] },
    heroes: { title: "Hero Sections", components: [] },
    commerce: { title: "Commerce", components: [] },
    services: { title: "Services", components: [] },
    story: { title: "Story & About", components: [] },
    proof: { title: "Social Proof", components: [] },
    media: { title: "Media & Gallery", components: [] },
    conversion: { title: "Conversion", components: [] },
    footers: { title: "Footers", components: [] },
  };

  allSectionMetas
    .filter(meta => meta.verticals.includes(businessType))
    .forEach(meta => {
      if (categories[meta.category]) {
        categories[meta.category].components.push(meta.variation);
      }
    });

  return Object.values(categories).filter(cat => cat.components.length > 0);
}

function filterComponents(allowed: string[]): Record<string, any> {
  const filtered: Record<string, any> = {};
  allowed.forEach(name => {
    if (componentMap[name]) {
      filtered[name] = componentMap[name];
    }
  });
  return filtered;
}

export async function createEdgePuckConfig(ctx: {
  templateFamily: EdgeRootProps["templateFamily"];
  businessType: EdgeRootProps["businessType"];
  adminMode?: boolean;
}): Promise<any> {
  const allowed = getAllowedSections(ctx.templateFamily);
  
  return {
    root: edgeRootConfig,
    categories: getSectionCategories(ctx.businessType),
    components: filterComponents(allowed),
  };
}
