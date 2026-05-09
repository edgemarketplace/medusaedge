import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '@/motion/presets';

interface ProofStripProps {
  items?: string[];
}

const defaultItems: string[] = [
  'Trusted by 50,000+ customers worldwide',
  'Rated 4.9 ★ on Trustpilot',
  'Carbon-neutral shipping on every order',
  '100% satisfaction guarantee',
];

const iconMap: Record<number, string> = {
  0: '🌍',
  1: '⭐',
  2: '🌱',
  3: '🛡️',
};

const ProofStrip: React.FC<ProofStripProps> = ({ items = defaultItems }) => {
  return (
    <section
      data-section="proof-strip"
      data-ai-section="proof-strip"
      data-ai-category="trust"
      data-ai-label="Proof Strip"
      data-ai-editable-fields="items"
      className="py-10 md:py-14 px-4 md:px-8 bg-white border-b border-gray-100"
    >
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
      >
        {items.slice(0, 4).map((item, i) => (
          <motion.div
            key={i}
            variants={slideUp}
            data-ai-proof-item={i}
            className="flex flex-col items-center text-center gap-3 p-4"
          >
            <span className="text-3xl md:text-4xl" role="img" aria-hidden="true">
              {iconMap[i] || '✓'}
            </span>
            <p className="text-sm md:text-base font-medium text-zinc-700 leading-snug">
              {item}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProofStrip;
