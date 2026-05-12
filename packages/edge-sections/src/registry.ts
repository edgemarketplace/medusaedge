import React from "react";
import { NormalizedContentItem } from "../../edge-templates/src/types";

// Import all section configs to get their render functions
import { CommerceHeaderConfig } from "./headers/CommerceHeader";
import { PromoHeaderConfig } from "./headers/CommerceHeader"; // Wait, PromoHeader is in PromoHeader.tsx, let's fix that. Wait earlier we created PromoHeader.tsx and CommerceHeader.tsx in headers. Let's correct the import.
// Wait, earlier we had PromoHeader.tsx in headers, which exports PromoHeaderConfig. Let's adjust the imports properly.
// Let's re-import correctly:
import { PromoHeaderConfig } from "./headers/PromoHeader";
import { CommerceHeaderConfig } from "./headers/CommerceHeader";
import { ProductHeroConfig } from "./heroes/ProductHero";
import { FeaturedCollectionConfig } from "./commerce/FeaturedCollection";
import { ProductGridConfig } from "./commerce/ProductGrid";
import { ReviewStripConfig } from "./proof/ReviewStrip";
import { FAQConfig } from "./conversion/FAQ";
import { CommerceFooterConfig } from "./footers/CommerceFooter";

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
