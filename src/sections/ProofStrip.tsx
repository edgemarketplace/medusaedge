"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, staggerContainer } from '@/motion/presets';
     4|
     5|interface ProofStripProps {
     6|  items?: string[];
     7|}
     8|
     9|const defaultItems: string[] = [
    10|  'Trusted by 50,000+ customers worldwide',
    11|  'Rated 4.9 ★ on Trustpilot',
    12|  'Carbon-neutral shipping on every order',
    13|  '100% satisfaction guarantee',
    14|];
    15|
    16|const iconMap: Record<number, string> = {
    17|  0: '🌍',
    18|  1: '⭐',
    19|  2: '🌱',
    20|  3: '🛡️',
    21|};
    22|
    23|const ProofStrip: React.FC<ProofStripProps> = ({ items = defaultItems }) => {
    24|  return (
    25|    <section
    26|      data-section="proof-strip"
    27|      data-ai-section="proof-strip"
    28|      data-ai-category="trust"
    29|      data-ai-label="Proof Strip"
    30|      data-ai-editable-fields="items"
    31|      className="py-10 md:py-14 px-4 md:px-8 bg-white border-b border-gray-100"
    32|    >
    33|      <motion.div
    34|        variants={staggerContainer}
    35|        initial="initial"
    36|        whileInView="animate"
    37|        viewport={{ once: true, amount: 0.3 }}
    38|        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
    39|      >
    40|        {items.slice(0, 4).map((item, i) => (
    41|          <motion.div
    42|            key={i}
    43|            variants={slideUp}
    44|            data-ai-proof-item={i}
    45|            className="flex flex-col items-center text-center gap-3 p-4"
    46|          >
    47|            <span className="text-3xl md:text-4xl" role="img" aria-hidden="true">
    48|              {iconMap[i] || '✓'}
    49|            </span>
    50|            <p className="text-sm md:text-base font-medium text-zinc-700 leading-snug">
    51|              {item}
    52|            </p>
    53|          </motion.div>
    54|        ))}
    55|      </motion.div>
    56|    </section>
    57|  );
    58|};
    59|
    60|export default ProofStrip;
    61|