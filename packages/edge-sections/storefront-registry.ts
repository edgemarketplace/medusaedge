/**
 * Storefront Registry - Synchronous, zero Puck dependencies
 * 
 * This registry is for STOREFRONT RENDERING ONLY.
 * It contains pure React components without editor config, validation, or Puck dependencies.
 * 
 * DO NOT import this in editor code.
 * DO NOT add dynamic imports here.
 * DO NOT add Puck editor fields/metadata here.
 */

import React from "react";

// Direct imports - no barrel exports, no dynamic imports
import { PromoHeader } from "./headers/PromoHeader";
import { CommerceHeader } from "./headers/CommerceHeader";
import { ProductHero } from "./heroes/ProductHero";
import { ProductGrid } from "./commerce/ProductGrid";
import { FeaturedCollection } from "./commerce/FeaturedCollection";
import { ReviewStrip } from "./proof/ReviewStrip";
import { FAQ } from "./conversion/FAQ";
import { CommerceFooter } from "./footers/CommerceFooter";

export interface StorefrontSectionProps {
  [key: string]: any;
}

export type StorefrontComponent = React.FC<StorefrontSectionProps>;

export const storefrontRegistry: Record<string, StorefrontComponent> = {
  PromoHeader,
  CommerceHeader,
  ProductHero,
  ProductGrid,
  FeaturedCollection,
  ReviewStrip,
  FAQ,
  CommerceFooter,
};

export function getStorefrontComponent(type: string): StorefrontComponent | null {
  return storefrontRegistry[type] || null;
}

export default storefrontRegistry;
