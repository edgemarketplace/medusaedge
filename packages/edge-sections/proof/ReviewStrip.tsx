import React from "react";
import { EdgeSectionProps } from "../types";

export const ReviewStrip: React.FC<EdgeSectionProps> = ({
  reviews = [],
  theme,
}) => {
  const bgColor = theme?.colors?.surface || "#f8f9fa";
  const textColor = theme?.colors?.text || "#1a1a1a";
  const mutedColor = theme?.colors?.muted || "#6c757d";

  return (
    <section style={{ backgroundColor: bgColor }} className="py-12 px-6">
      <div className="max-w-7xl mx-auto flex overflow-x-auto gap-8 pb-4">
        {(reviews || []).map((review: any, i: number) => (
          <div key={i} className="min-w-[300px] p-6 border rounded-lg" style={{ borderColor: theme?.colors?.border || "#dee2e6" }}>
            <div className="flex items-center mb-3 text-yellow-400">
              {"★".repeat(review.rating || 5)}
            </div>
            <p style={{ color: textColor }} className="mb-4">"{review.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
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
