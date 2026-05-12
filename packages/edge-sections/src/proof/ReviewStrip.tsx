import React from "react";
import { SectionMeta } from "../../../edge-templates/src/types";

export const ReviewStrip: React.FC<{
  reviews: { author: string; rating: number; content: string }[];
}> = ({ reviews = [] }) => {
  return (
    <section className="review-strip py-8 bg-surface">
      <div className="container mx-auto px-4 overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {reviews.map((review, i) => (
            <div key={i} className="w-64 p-4 border border-border rounded-lg">
              <div className="flex text-accent mb-2">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="text-sm text-muted mb-2">"{review.content}"</p>
              <p className="text-sm font-semibold">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const reviewStripMeta: SectionMeta = {
  category: "proof",
  variation: "review-strip",
  verticals: ["retail"],
  recommendedOrder: 6,
};

export const ReviewStripConfig = {
  fields: {
    reviews: {
      type: "array" as const,
      label: "Reviews",
      subFields: {
        author: { type: "text" as const, label: "Author" },
        rating: { type: "number" as const, label: "Rating (1-5)" },
        content: { type: "text" as const, label: "Review Content" },
      }
    },
  },
  render: ReviewStrip,
  meta: reviewStripMeta,
};
