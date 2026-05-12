import React from "react";
import { SectionMeta } from "../../../edge-templates/src/types";

export const ProductHero: React.FC<{
  heading: string;
  subheading?: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage?: string;
  productImage?: string;
}> = ({ heading, subheading, ctaLabel, ctaHref, backgroundImage, productImage }) => {
  return (
    <section className="product-hero relative py-20" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto flex items-center px-4 gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{heading}</h1>
          {subheading && <p className="text-xl text-muted mb-8">{subheading}</p>}
          <a href={ctaHref} className="bg-primary text-primaryContrast px-6 py-3 rounded-lg font-semibold">
            {ctaLabel}
          </a>
        </div>
        {productImage && (
          <div className="flex-1">
            <img src={productImage} alt={heading} className="rounded-xl shadow-elevated" />
          </div>
        )}
      </div>
    </section>
  );
};

export const productHeroMeta: SectionMeta = {
  category: "heroes",
  variation: "product",
  verticals: ["retail"],
  required: true,
  singleton: false,
  recommendedOrder: 3,
  maxInstances: 2,
};

export const ProductHeroConfig = {
  fields: {
    heading: { type: "text" as const, label: "Heading" },
    subheading: { type: "text" as const, label: "Subheading" },
    ctaLabel: { type: "text" as const, label: "CTA Label" },
    ctaHref: { type: "text" as const, label: "CTA Link" },
    backgroundImage: { type: "text" as const, label: "Background Image URL" },
    productImage: { type: "text" as const, label: "Product Image URL" },
  },
  render: ProductHero,
  meta: productHeroMeta,
};
