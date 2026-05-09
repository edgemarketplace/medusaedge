"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn, staggerContainer } from '@/motion/presets';

interface TrustItem {
  icon: string;
  headline: string;
  description: string;
}

interface TrustStripProps {
  items?: TrustItem[];
}

const defaultItems: TrustItem[] = [
  {
    icon: '🔒',
    headline: 'Secure Checkout',
    description: '256-bit SSL encryption on every transaction.',
  },
  {
    icon: '🚚',
    headline: 'Free Shipping',
    description: 'On all orders over $50, worldwide.',
  },
  {
    icon: '↩️',
    headline: 'Easy Returns',
    description: '30-day hassle-free return policy.',
  },
  {
    icon: '💬',
    headline: '24/7 Support',
    description: 'Real humans, real answers, any time.',
  },
];

const TrustStrip: React.FC<TrustStripProps> = ({ items = defaultItems }) => {
  return (
    <section
      data-ai-section="trust-strip"
      data-ai-category="commerce"
      data-ai-label="Trust Strip"
      data-ai-editable-fields="items"
      className="py-12 px-4 md:px-8 bg-gray-50 border-y border-gray-100"
    >
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={slideUp}
            data-ai-trust-item={i}
            className="flex flex-col items-center text-center gap-2"
          >
            <span className="text-3xl" role="img" aria-hidden="true">
              {item.icon}
            </span>
            <h4 className="font-bold text-sm uppercase tracking-wide text-gray-900">
              {item.headline}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[180px]">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TrustStrip;
