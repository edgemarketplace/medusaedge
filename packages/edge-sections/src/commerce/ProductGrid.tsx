import React from "react";
import { SectionMeta } from "../../../edge-templates/src/types";

export const ProductGrid: React.FC<{
  title?: string;
  products: { id: string; name: string; price: number; imageUrl: string; badge?: string }[];
}> = ({ title, products = [] }) => {
  return (
    <section className="product-grid py-16">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border border-border rounded-lg overflow-hidden relative">
              {product.badge && (
                <span className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded">
                  {product.badge}
                </span>
              )}
              <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-medium text-sm">{product.name}</h3>
                <p className="text-primary font-bold mt-1">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const productGridMeta: SectionMeta = {
  category: "commerce",
  variation: "product-grid",
  verticals: ["retail"],
  recommendedOrder: 5,
};

export const ProductGridConfig = {
  fields: {
    title: { type: "text" as const, label: "Section Title" },
    products: {
      type: "array" as const,
      label: "Products",
      subFields: {
        name: { type: "text" as const, label: "Product Name" },
        price: { type: "number" as const, label: "Price" },
        imageUrl: { type: "text" as const, label: "Image URL" },
        badge: { type: "text" as const, label: "Badge (optional)" },
      }
    },
  },
  render: ProductGrid,
  meta: productGridMeta,
};
