import React, { useState } from "react";
import { EdgeSectionProps } from "../types";

export const FAQ: React.FC<EdgeSectionProps> = ({
  title = "Frequently Asked Questions",
  faqs = [],
  theme,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headingFont = theme?.typography?.headingFont || "system-ui";
  const textColor = theme?.colors?.text || "#1a1a1a";
  const mutedColor = theme?.colors?.muted || "#6c757d";
  const borderColor = theme?.colors?.border || "#dee2e6";

  return (
    <section className="py-16 px-6 max-w-3xl mx-auto">
      <h2 style={{ fontFamily: headingFont, color: textColor }} className="text-3xl font-bold text-center mb-12">
        {title}
      </h2>
      <div className="space-y-4">
        {(faqs || []).map((faq: any, i: number) => (
          <div key={i} className="border rounded-md overflow-hidden" style={{ borderColor }}>
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span style={{ color: textColor }} className="font-medium">{faq.question}</span>
              <span style={{ color: mutedColor }}>{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4" style={{ color: mutedColor }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export const faqMeta = {
  category: "conversion",
  variation: "accordion",
  verticals: ["retail"],
  recommendedOrder: 6,
};

export default FAQ;
