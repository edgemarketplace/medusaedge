import React from "react";
import { EdgeSectionProps } from "../types";

export const PromoHeader: React.FC<EdgeSectionProps> = ({
  message = "Free shipping on orders over $50",
  ctaLabel = "Shop Now",
  ctaHref = "/shop",
  checkoutUrl,
  theme,
}) => {
  // Use checkoutUrl if provided (from storefront), otherwise fall back to ctaHref
  const finalCtaHref = checkoutUrl || ctaHref;

  return (
    <div style={{ backgroundColor: theme?.colors?.primary, color: theme?.colors?.primaryContrast }} className="py-2 px-4 text-center text-sm">
      <span>{message}</span>
      {ctaLabel && (
        <a href={finalCtaHref} className="ml-3 font-medium underline underline-offset-2 hover:opacity-80">
          {ctaLabel} →
        </a>
      )}
    </div>
  );
};

export const promoHeaderMeta = {
  category: "headers",
  variation: "promo",
  verticals: ["retail"],
  recommendedOrder: 0,
};

export default PromoHeader;
