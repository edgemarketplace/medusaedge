import React from "react";
import { SectionMeta } from "../../../edge-templates/src/types";

export const FeaturedCollection: React.FC<{
  title: string;
  description?: string;
  products: { id: string; name: string; price: number; imageUrl: string }[];
}> = ({ title, description, products = [] }) => {
  return (
    <section className="featured-collection py-16 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        {description && <p className="text-muted mb-8">{description}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border border-border rounded-lg overflow-hidden">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-primary font-bold mt-2">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const featuredCollectionMeta: SectionMeta = {
  category: "commerce",
  variation: "featured-collection",
  verticals: ["retail"],
  recommendedOrder: 4,
};

export const FeaturedCollectionConfig = {
  fields: {
    title: { type: "text" as const, label: "Section Title" },
    description: { type: "text" as const, label: "Description" },
    products: {
      type: "array" as const,
      label: "Products",
      subFields: {
        name: { type: "text" as const, label: "Product Name" },
        price: { type: "number" as const, label: "Price" },
        imageUrl: { type: "text" as const, label: "Image URL" },
      }
    },
  },
  render: FeaturedCollection,
  meta: featuredCollectionMeta,
};
