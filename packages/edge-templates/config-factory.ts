import React from "react";
import { TemplateFamily, BusinessType } from "../edge-theme/types";
import { EdgeRootProps } from "../edge-theme/types";
import retailCoreManifest from "./retailCoreManifest";
import { CommerceHeader, commerceHeaderMeta } from "../edge-sections/headers/CommerceHeader";
import { PromoHeader, promoHeaderMeta } from "../edge-sections/headers/PromoHeader";
import { ProductHero, productHeroMeta } from "../edge-sections/heroes/ProductHero";
import { FeaturedCollection, featuredCollectionMeta } from "../edge-sections/commerce/FeaturedCollection";
import { ProductGrid, productGridMeta } from "../edge-sections/commerce/ProductGrid";
import { ReviewStrip, reviewStripMeta } from "../edge-sections/proof/ReviewStrip";
import { FAQ, faqMeta } from "../edge-sections/conversion/FAQ";
import { CommerceFooter, commerceFooterMeta } from "../edge-sections/footers/CommerceFooter";

// Map component names to their implementations and metadata
const componentRegistry: Record<string, {
  Component: React.FC<any>;
  meta: any;
  schema: Record<string, { type: string; label?: string }>;
}> = {
  CommerceHeader: {
    Component: CommerceHeader,
    meta: commerceHeaderMeta,
    schema: {
      siteName: { type: "text", label: "Site Name" },
      logoUrl: { type: "text", label: "Logo URL" },
      primaryCtaLabel: { type: "text", label: "Primary CTA Label" },
      primaryCtaHref: { type: "text", label: "Primary CTA Link" },
    },
  },
  PromoHeader: {
    Component: PromoHeader,
    meta: promoHeaderMeta,
    schema: {
      message: { type: "text", label: "Promo Message" },
      ctaLabel: { type: "text", label: "CTA Label" },
      ctaHref: { type: "text", label: "CTA Link" },
    },
  },
  ProductHero: {
    Component: ProductHero,
    meta: productHeroMeta,
    schema: {
      headline: { type: "text", label: "Headline" },
      subheadline: { type: "text", label: "Subheadline" },
      ctaLabel: { type: "text", label: "CTA Label" },
      ctaHref: { type: "text", label: "CTA Link" },
      backgroundImage: { type: "text", label: "Background Image URL" },
    },
  },
  FeaturedCollection: {
    Component: FeaturedCollection,
    meta: featuredCollectionMeta,
    schema: {
      title: { type: "text", label: "Section Title" },
    },
  },
  ProductGrid: {
    Component: ProductGrid,
    meta: productGridMeta,
    schema: {
      title: { type: "text", label: "Section Title" },
      columns: { type: "number", label: "Columns" },
    },
  },
  ReviewStrip: {
    Component: ReviewStrip,
    meta: reviewStripMeta,
    schema: {}, // Reviews passed as prop
  },
  FAQ: {
    Component: FAQ,
    meta: faqMeta,
    schema: {
      title: { type: "text", label: "Section Title" },
    },
  },
  CommerceFooter: {
    Component: CommerceFooter,
    meta: commerceFooterMeta,
    schema: {
      siteName: { type: "text", label: "Site Name" },
      description: { type: "text", label: "Footer Description" },
    },
  },
};

export function createEdgePuckConfig(ctx: {
  templateFamily: TemplateFamily;
  businessType: BusinessType;
  adminMode?: boolean;
}) {
  // Get manifest for template family (start with retail-core)
  const manifest = retailCoreManifest; // Expand later for other families
  const allowedSections = new Set(manifest.allowedSections);

  // Filter components to allowed sections
  const components: Record<string, any> = {};
  const categories: Record<string, string[]> = {};

  Object.entries(componentRegistry).forEach(([name, entry]) => {
    if (!allowedSections.has(name)) return;

    // Build Puck component config
    components[name] = {
      fields: entry.schema,
      render: (props: any) => {
        const theme = props.theme; // Injected by renderer
        return React.createElement(entry.Component, { ...props, theme });
      },
      label: name,
      category: entry.meta.category,
    };

    // Group by category
    const cat = entry.meta.category;
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(name);
  });

  // Root config for Puck (EdgeRootProps)
  const rootConfig = {
    fields: {
      siteName: { type: "text", label: "Site Name" },
      siteTagline: { type: "text", label: "Tagline" },
      businessType: {
        type: "select",
        label: "Business Type",
        options: [
          { label: "Retail", value: "retail" },
          { label: "Service", value: "service" },
        ],
      },
      checkoutMode: {
        type: "select",
        label: "Checkout Mode",
        options: [
          { label: "Native", value: "native" },
          { label: "Stripe Link", value: "stripe-link" },
        ],
      },
    },
  };

  return {
    root: rootConfig,
    categories,
    components,
  };
}
