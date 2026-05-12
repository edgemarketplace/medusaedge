import React from "react";
import { getPreset } from "../edge-theme";
import type { TemplateFamily, BusinessType, EdgeRootProps } from "../edge-theme/types";
import retailCoreManifest from "./retailCoreManifest";

// Lazy component registry — components are loaded only when createEdgePuckConfig is called
// This prevents webpack from pulling in ALL sections at import time
async function buildComponentRegistry() {
  const [
    { CommerceHeader, commerceHeaderMeta },
    { PromoHeader, promoHeaderMeta },
    { ProductHero, productHeroMeta },
    { FeaturedCollection, featuredCollectionMeta },
    { ProductGrid, productGridMeta },
    { ReviewStrip, reviewStripMeta },
    { FAQ, faqMeta },
    { CommerceFooter, commerceFooterMeta },
  ] = await Promise.all([
    import("../edge-sections/headers/CommerceHeader"),
    import("../edge-sections/headers/PromoHeader"),
    import("../edge-sections/heroes/ProductHero"),
    import("../edge-sections/commerce/FeaturedCollection"),
    import("../edge-sections/commerce/ProductGrid"),
    import("../edge-sections/proof/ReviewStrip"),
    import("../edge-sections/conversion/FAQ"),
    import("../edge-sections/footers/CommerceFooter"),
  ]);

  return {
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
}

export async function createEdgePuckConfig(ctx: {
  templateFamily: TemplateFamily;
  businessType: BusinessType;
  adminMode?: boolean;
  stylePreset?: string;
}) {
  // Get manifest for template family (start with retail-core)
  const manifest = retailCoreManifest; // Expand later for other families
  const allowedSections = new Set(manifest.allowedSections);
  const theme = getPreset(ctx.stylePreset || manifest.defaultRootProps.stylePreset || "modern-commerce");

  // Build component registry lazily (only when this function is called)
  const componentRegistry = await buildComponentRegistry();

  // Filter components to allowed sections
  const components: Record<string, any> = {};
  const categories: Record<string, string[]> = {};

  Object.entries(componentRegistry).forEach(([name, entry]) => {
    if (!allowedSections.has(name)) return;

    // Build Puck component config
    components[name] = {
      fields: entry.schema,
      render: (props: any) => React.createElement(entry.Component, { ...props, theme }),
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
          { label: "Payment Link", value: "payment-link" },
          { label: "Quote Only", value: "quote-only" },
        ],
      },
      currency: { type: "text", label: "Currency" },
      locale: { type: "text", label: "Locale" },
      supportEmail: { type: "text", label: "Support Email" },
      supportPhone: { type: "text", label: "Support Phone" },
      seoTitle: { type: "text", label: "SEO Title" },
      seoDescription: { type: "textarea", label: "SEO Description" },
    },
  };

  return {
    root: rootConfig,
    categories,
    components,
  };
}
