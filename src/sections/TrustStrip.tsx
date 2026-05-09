"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn, staggerContainer } from '@/motion/presets';
     4|
     5|interface TrustItem {
     6|  icon: string;
     7|  headline: string;
     8|  description: string;
     9|}
    10|
    11|interface TrustStripProps {
    12|  items?: TrustItem[];
    13|}
    14|
    15|const defaultItems: TrustItem[] = [
    16|  {
    17|    icon: '🔒',
    18|    headline: 'Secure Checkout',
    19|    description: '256-bit SSL encryption on every transaction.',
    20|  },
    21|  {
    22|    icon: '🚚',
    23|    headline: 'Free Shipping',
    24|    description: 'On all orders over $50, worldwide.',
    25|  },
    26|  {
    27|    icon: '↩️',
    28|    headline: 'Easy Returns',
    29|    description: '30-day hassle-free return policy.',
    30|  },
    31|  {
    32|    icon: '💬',
    33|    headline: '24/7 Support',
    34|    description: 'Real humans, real answers, any time.',
    35|  },
    36|];
    37|
    38|const TrustStrip: React.FC<TrustStripProps> = ({ items = defaultItems }) => {
    39|  return (
    40|    <section
    41|      data-ai-section="trust-strip"
    42|      data-ai-category="commerce"
    43|      data-ai-label="Trust Strip"
    44|      data-ai-editable-fields="items"
    45|      className="py-12 px-4 md:px-8 bg-gray-50 border-y border-gray-100"
    46|    >
    47|      <motion.div
    48|        variants={staggerContainer}
    49|        initial="initial"
    50|        whileInView="animate"
    51|        viewport={{ once: true, amount: 0.3 }}
    52|        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
    53|      >
    54|        {items.map((item, i) => (
    55|          <motion.div
    56|            key={i}
    57|            variants={slideUp}
    58|            data-ai-trust-item={i}
    59|            className="flex flex-col items-center text-center gap-2"
    60|          >
    61|            <span className="text-3xl" role="img" aria-hidden="true">
    62|              {item.icon}
    63|            </span>
    64|            <h4 className="font-bold text-sm uppercase tracking-wide text-gray-900">
    65|              {item.headline}
    66|            </h4>
    67|            <p className="text-xs text-gray-500 leading-relaxed max-w-[180px]">
    68|              {item.description}
    69|            </p>
    70|          </motion.div>
    71|        ))}
    72|      </motion.div>
    73|    </section>
    74|  );
    75|};
    76|
    77|export default TrustStrip;
    78|