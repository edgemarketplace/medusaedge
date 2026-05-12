import React from "react";
import { EdgeSectionProps } from "../types";

const STARTER_REVIEWS = [
  { author: "Sarah M.", text: "Amazing products and fast shipping! Highly recommend.", rating: 5, date: "2024" },
  { author: "James L.", text: "Quality exceeded my expectations. Will buy again.", rating: 5, date: "2024" },
  { author: "Emily R.", text: "Great customer service and beautiful packaging.", rating: 5, date: "2024" },
];

export const ReviewStrip: React.FC<EdgeSectionProps> = ({
  reviews = [],
  theme,
}) => {
  const bgColor = theme?.colors?.surface || "#f8f9fa";
  const textColor = theme?.colors?.text || "#1a1a1a";
  const mutedColor = theme?.colors?.muted || "#6c757d";  
  // Use starter reviews if none provided (live storefront fallback)
  const displayReviews = (reviews && reviews.length > 0) ? reviews : STARTER_REVIEWS;

  return (
    <section style={{ backgroundColor: bgColor }} className="py-12 px-6">
      <div className="max-w-7xl mx-auto flex overflow-x-auto gap-8 pb-4">
        {displayReviews.map((review: any, i: number) => (
          <div key={i} className="min-w-[300px] p-6 border rounded-lg bg-white shadow-sm" style={{ borderColor: theme?.colors?.border || "#dee2e6" }}>
            <div className="flex items-center mb-3 text-yellow-400">
              {"★".repeat(review.rating || 5)}
            </div>
            <p style={{ color: textColor }} className="mb-4">"{review.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                {review.author?.[0] || "U"}
              </div>
              <div>
                <p style={{ color: textColor }} className="font-medium text-sm">{review.author}</p>
                <p style={{ color: mutedColor }} className="text-xs">{review.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const reviewStripMeta = {
  category: "proof",
  variation: "strip",
  verticals: ["retail"],
  recommendedOrder: 5,
};

export default ReviewStrip;
