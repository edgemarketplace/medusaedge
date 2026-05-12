import React from "react";
import { SectionMeta } from "../../../edge-templates/src/types";

export const FAQ: React.FC<{
  title: string;
  faqs: { question: string; answer: string }[];
}> = ({ title, faqs = [] }) => {
  return (
    <section className="faq py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border border-border rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">{faq.question}</summary>
              <p className="mt-2 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export const faqMeta: SectionMeta = {
  category: "conversion",
  variation: "faq",
  verticals: ["retail"],
  recommendedOrder: 7,
};

export const FAQConfig = {
  fields: {
    title: { type: "text" as const, label: "Section Title" },
    faqs: {
      type: "array" as const,
      label: "FAQs",
      subFields: {
        question: { type: "text" as const, label: "Question" },
        answer: { type: "text" as const, label: "Answer" },
      }
    },
  },
  render: FAQ,
  meta: faqMeta,
};
