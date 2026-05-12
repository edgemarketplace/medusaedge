"use client";

import React, { useState } from "react";
import { EdgeSectionProps } from "../types";

const STARTER_FAQS = [
  { question: "What is your return policy?", answer: "We offer a 30-day return policy on all items. Contact us to initiate a return." },
  { question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days. Express shipping is available at checkout." },
  { question: "Do you ship internationally?", answer: "Yes! We ship to most countries worldwide. Shipping costs are calculated at checkout." },
];

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
  // Use starter FAQs if none provided (live storefront fallback)
  const displayFaqs = (faqs && faqs.length > 0) ? faqs : STARTER_FAQS;

  return (
    <section className="py-16 px-6 max-w-3xl mx-auto">
      <h2 style={{ fontFamily: headingFont, color: textColor }} className="text-3xl font-bold text-center mb-12">
        {title}
      </h2>
      <div className="space-y-4">
        {displayFaqs.map((faq: any, i: number) => (
          <div key={i} className="border rounded-md overflow-hidden" style={{ borderColor }}>
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span style={{ color: textColor }} className="font-medium">{faq.question}</span>
              <span style={{ color: mutedColor }} className="text-xl">
                {openIndex === i ? "−" : "+"}
              </span>
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
  variation: "faq",
  verticals: ["retail", "services"],
  recommendedOrder: 6,
};

export default FAQ;
