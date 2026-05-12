import * as React from "react";
import { EdgeSectionProps } from "../types";

const STARTER_PRODUCTS = [
  { name: "Core Product", price: "$24.00", image: "", rating: 5 },
  { name: "Seasonal Favorite", price: "$42.00", image: "", rating: 4 },
  { name: "Bundle Offer", price: "$68.00", image: "", rating: 5 },
  { name: "New Arrival", price: "$33.00", image: "", rating: 4 },
];

function getGridClass(columns: number) {
  if (columns === 2) return "grid grid-cols-1 sm:grid-cols-2 gap-6";
  if (columns === 3) return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
  return "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6";
}

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
  const displayProducts = products?.length ? products : STARTER_PRODUCTS;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {title && (
        <h2 style={{ fontFamily: headingFont, color: textColor }} className="text-3xl font-bold text-center mb-12">
          {title}
        </h2>
      )}
      <div className={getGridClass(Number(columns) || 4)}>
        {displayProducts.map((product: any, i: number) => (
          <div key={i} className="border rounded-md overflow-hidden bg-white" style={{ borderColor }}>
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">Product Image</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium" style={{ color: textColor }}>{product.name}</h3>
              <p style={{ color: mutedColor }} className="text-sm mt-1">{product.price}</p>
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
