import React from "react";
import { NormalizedContentItem } from "packages/edge-templates/src/types";

// Import all section configs to get their render functions
import { PromoHeaderConfig } from "packages/edge-sections/src/headers/PromoHeader";
import { CommerceHeaderConfig } from "packages/edge-sections/src/headers/CommerceHeader";
import { ProductHeroConfig } from "packages/edge-sections/src/heroes/ProductHero";
import { FeaturedCollectionConfig } from "packages/edge-sections/src/commerce/FeaturedCollection";
import { ProductGridConfig } from "packages/edge-sections/src/commerce/ProductGrid";
import { ReviewStripConfig } from "packages/edge-sections/src/proof/ReviewStrip";
import { FAQConfig } from "packages/edge-sections/src/conversion/FAQ";
import { CommerceFooterConfig } from "packages/edge-sections/src/footers/CommerceFooter";

// Map section type names to their React render components
export const sectionRegistry: Record<string, React.FC<Record<string, unknown>>> = {
  PromoHeader: PromoHeaderConfig.render,
  CommerceHeader: CommerceHeaderConfig.render,
  ProductHero: ProductHeroConfig.render,
  FeaturedCollection: FeaturedCollectionConfig.render,
  ProductGrid: ProductGridConfig.render,
  ReviewStrip: ReviewStripConfig.render,
  FAQ: FAQConfig.render,
  CommerceFooter: CommerceFooterConfig.render,
};

// Helper to render a single content item
export function renderContentItem(item: NormalizedContentItem): React.ReactNode {
  const Component = sectionRegistry[item.type];
  if (!Component) {
    console.warn(`No component found for section type: ${item.type}`);
    return null;
  }
  return <Component key={item.id} {...item.props} />;
}
