import React from "react";
import { EdgeSectionProps } from "../types";

export const ProductHero: React.FC<EdgeSectionProps> = ({
  headline = "New Collection",
  subheadline = "Discover our latest products",
  ctaLabel = "Shop Now",
  ctaHref = "/shop",
  checkoutUrl,
  backgroundImage,
  theme,
}) => {
  const textColor = theme?.colors?.text || "#1a1a1a";
  const primaryColor = theme?.colors?.primary || "#0d6efd";
  const primaryContrast = theme?.colors?.primaryContrast || "#ffffff";
  
  // Use checkoutUrl if provided (from storefront), otherwise fall back to ctaHref
  const finalCtaHref = checkoutUrl || ctaHref;

  return (
    <section className="relative h-96 flex items-center justify-center" style={{ backgroundColor: theme?.colors?.surface || "#f8f9fa" }}>
      {backgroundImage && (
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${backgroundImage})` }} />
      )}
      <div className="relative text-center px-4 max-w-3xl mx-auto">
        <h1
          style={{ color: textColor, fontFamily: theme?.typography?.headingFont }}
          className="text-5xl font-bold mb-4"
        >
          {headline}
        </h1>
        <p style={{ color: theme?.colors?.muted || "#6c757d" }} className="text-xl mb-8">
          {subheadline}
        </p>
        <a
          href={finalCtaHref}
          style={{ backgroundColor: primaryColor, color: primaryContrast }}
          className="px-6 py-3 rounded-md text-lg font-medium inline-block hover:opacity-90 transition-opacity"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
};

export const productHeroMeta = {
  category: "heroes",
  variation: "product-focused",
  verticals: ["retail", "services"],
  recommendedOrder: 1,
};

export default ProductHero;
