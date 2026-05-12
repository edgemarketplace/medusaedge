import React from "react";
import { EdgeSectionProps } from "../types";

interface Product {
  name: string;
  price: string;
  image?: string;
}

const STARTER_PRODUCTS: Product[] = [
  { name: "Featured Product", price: "$49.99", image: "" },
  { name: "Best Seller", price: "$79.99", image: "" },
  { name: "New Arrival", price: "$59.99", image: "" },
];

export const FeaturedCollection: React.FC<EdgeSectionProps> = ({
  title = "Featured Collection",
  products = [],
  theme,
}) => {
  const headingFont = theme?.typography?.headingFont || "system-ui";
  const textColor = theme?.colors?.text || "#1a1a1a";
  const mutedColor = theme?.colors?.muted || "#6c757d";
  
  // Use starter products if none provided (live storefront fallback)
  const displayProducts = (products && products.length > 0) ? products : STARTER_PRODUCTS;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 style={{ fontFamily: headingFont, color: textColor }} className="text-3xl font-bold text-center mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayProducts.map((product: any, i: number) => (
          <div key={i} className="border rounded-md overflow-hidden hover:shadow-lg transition-shadow" style={{ borderColor: theme?.colors?.border || "#dee2e6" }}>
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">Product Image</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium" style={{ color: textColor }}>{product.name}</h3>
              <p style={{ color: mutedColor }} className="text-sm">{product.price}</p>
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
