import React from "react";
import { SectionMeta } from "../../../edge-templates/src/types";

export const PromoHeader: React.FC<{ message: string; ctaLabel?: string; ctaHref?: string }> = ({ 
  message, 
  ctaLabel, 
  ctaHref 
}) => {
  return (
    <div className="promo-header bg-primary text-primaryContrast text-center py-2 px-4">
      <p className="text-sm font-medium">
        {message}
        {ctaLabel && ctaHref && (
          <a href={ctaHref} className="ml-2 underline font-semibold">
            {ctaLabel}
          </a>
        )}
      </p>
    </div>
  );
};

export const promoHeaderMeta: SectionMeta = {
  category: "headers",
  variation: "promo",
  verticals: ["retail"],
  singleton: false,
  recommendedOrder: 1,
};

export const PromoHeaderConfig = {
  fields: {
    message: { type: "text" as const, label: "Promo Message" },
    ctaLabel: { type: "text" as const, label: "CTA Label" },
    ctaHref: { type: "text" as const, label: "CTA Link" },
  },
  render: PromoHeader,
  meta: promoHeaderMeta,
};
