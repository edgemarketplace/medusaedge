import React from "react";
import { EdgeSectionProps } from "../types";

export const PromoHeader: React.FC<EdgeSectionProps> = ({
  message = "Free shipping on orders over $50",
  ctaLabel = "Shop Now",
  ctaHref = "/shop",
  theme,
}) => {
  return (
    <div style={{ backgroundColor: theme?.colors?.primary, color: theme?.colors?.primaryContrast }} className="py-2 px-4 text-center text-sm">
      <span>{message}</span>
      {ctaLabel && (
        <a href={ctaHref} className="ml-3 font-medium underline underline-offset-2">
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
