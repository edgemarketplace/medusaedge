import React from "react";
import { EdgeSectionProps } from "../types";

export const ProductGrid: React.FC<EdgeSectionProps> = ({
  title = "All Products",
  products = [],
  columns = 4,
  theme,
}) => {
  const headingFont = theme?.typography?.headingFont || "system-ui";
  const textColor = theme?.colors?.text || "#1a1a1a";
  const mutedColor = theme?.colors?.muted || "#6c757d";
  const borderColor = theme?.colors?.border || "#dee2e6";

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {title && (
        <h2 style={{ fontFamily: headingFont, color: textColor }} className="text-3xl font-bold text-center mb-12">
          {title}
        </h2>
      )}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-6`}>
        {(products || []).map((product: any, i: number) => (
          <div key={i} className="border rounded-md overflow-hidden" style={{ borderColor }}>
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-medium" style={{ color: textColor }}>{product.name}</h3>
              <p style={{ color: mutedColor }} className="text-sm mt-1">${product.price}</p>
              {product.rating && (
                <div className="flex items-center mt-2 text-yellow-400 text-sm">
                  {"★".repeat(Math.floor(product.rating))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const productGridMeta = {
  category: "commerce",
  variation: "grid",
  verticals: ["retail"],
  recommendedOrder: 4,
};

export default ProductGrid;
