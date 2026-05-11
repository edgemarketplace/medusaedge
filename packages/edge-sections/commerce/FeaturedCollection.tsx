import React from "react";
import { EdgeSectionProps } from "../types";

export const FeaturedCollection: React.FC<EdgeSectionProps> = ({
  title = "Featured Collection",
  products = [],
  theme,
}) => {
  const headingFont = theme?.typography?.headingFont || "system-ui";
  const textColor = theme?.colors?.text || "#1a1a1a";
  const mutedColor = theme?.colors?.muted || "#6c757d";

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 style={{ fontFamily: headingFont, color: textColor }} className="text-3xl font-bold text-center mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(products || []).map((product: any, i: number) => (
          <div key={i} className="border rounded-md overflow-hidden" style={{ borderColor: theme?.colors?.border || "#dee2e6" }}>
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-medium" style={{ color: textColor }}>{product.name}</h3>
              <p style={{ color: mutedColor }} className="text-sm">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const featuredCollectionMeta = {
  category: "commerce",
  variation: "featured",
  verticals: ["retail"],
  recommendedOrder: 3,
};

export default FeaturedCollection;
