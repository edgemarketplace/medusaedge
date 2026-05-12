import { EdgeRootProps, TemplateManifest } from "./types";
import { CommerceHeaderConfig } from "../../edge-sections/src/headers/CommerceHeader";
import { PromoHeaderConfig } from "../../edge-sections/src/headers/PromoHeader";
import { ProductHeroConfig } from "../../edge-sections/src/heroes/ProductHero";
import { FeaturedCollectionConfig } from "../../edge-sections/src/commerce/FeaturedCollection";
import { ProductGridConfig } from "../../edge-sections/src/commerce/ProductGrid";
import { ReviewStripConfig } from "../../edge-sections/src/proof/ReviewStrip";
import { FAQConfig } from "../../edge-sections/src/conversion/FAQ";
import { CommerceFooterConfig } from "../../edge-sections/src/footers/CommerceFooter";

// All edge components mapped by name
const edgeComponents = {
  PromoHeader: PromoHeaderConfig,
  CommerceHeader: CommerceHeaderConfig,
  ProductHero: ProductHeroConfig,
  FeaturedCollection: FeaturedCollectionConfig,
  ProductGrid: ProductGridConfig,
  ReviewStrip: ReviewStripConfig,
  FAQ: FAQConfig,
  CommerceFooter: CommerceFooterConfig,
};

// Get allowed sections for a template family
const getAllowedSections = (templateFamily: EdgeRootProps["templateFamily"]): string[] => {
  // For now, only retail-core is implemented
  if (templateFamily === "retail-core") {
    return [
      "PromoHeader",
      "CommerceHeader",
      "ProductHero",
      "FeaturedCollection",
      "ProductGrid",
      "ReviewStrip",
      "FAQ",
      "CommerceFooter",
    ];
  }
  return [];
};

// Get section categories for a business type
const getSectionCategories = (businessType: EdgeRootProps["businessType"]) => {
  return [
    { label: "Headers", components: ["PromoHeader", "CommerceHeader"] },
    { label: "Heroes", components: ["ProductHero"] },
    { label: "Commerce", components: ["FeaturedCollection", "ProductGrid"] },
    { label: "Proof", components: ["ReviewStrip"] },
    { label: "Conversion", components: ["FAQ"] },
    { label: "Footers", components: ["CommerceFooter"] },
  ];
};

// Filter components to only allowed ones
const filterComponents = (components: typeof edgeComponents, allowed: string[]) => {
  return Object.fromEntries(
    Object.entries(components).filter(([name]) => allowed.includes(name))
  );
};

export function createEdgePuckConfig(ctx: {
  templateFamily: EdgeRootProps["templateFamily"];
  businessType: EdgeRootProps["businessType"];
  adminMode?: boolean;
}) {
  const allowed = getAllowedSections(ctx.templateFamily);

  return {
    root: {
      fields: {
        siteName: { type: "text" as const, label: "Site Name" },
        siteTagline: { type: "text" as const, label: "Tagline" },
        businessType: { 
          type: "select" as const, 
          label: "Business Type",
          options: ["retail", "service", "food", "artisan", "event"].map(v => ({ label: v, value: v }))
        },
        templateFamily: {
          type: "select" as const,
          label: "Template",
          options: ["retail-core"].map(v => ({ label: v, value: v }))
        },
        stylePreset: { type: "text" as const, label: "Style Preset" },
        primaryCtaLabel: { type: "text" as const, label: "Primary CTA Label" },
        primaryCtaHref: { type: "text" as const, label: "Primary CTA Link" },
        checkoutMode: {
          type: "select" as const,
          label: "Checkout Mode",
          options: ["native", "stripe-link", "payment-link", "quote-only"].map(v => ({ label: v, value: v }))
        },
        currency: { type: "text" as const, label: "Currency" },
        locale: { type: "text" as const, label: "Locale" },
        seoTitle: { type: "text" as const, label: "SEO Title" },
        seoDescription: { type: "text" as const, label: "SEO Description" },
      },
    },
    categories: getSectionCategories(ctx.businessType),
    components: filterComponents(edgeComponents, allowed),
  };
}
