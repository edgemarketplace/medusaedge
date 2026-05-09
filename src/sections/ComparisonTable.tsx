"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface FeatureRow {
     6|  feature: string;
     7|  ours: boolean;
     8|  competitor: boolean;
     9|}
    10|
    11|interface ComparisonTableProps {
    12|  headline?: string;
    13|}
    14|
    15|const defaultFeatures: FeatureRow[] = [
    16|  { feature: 'Free shipping over $50', ours: true, competitor: false },
    17|  { feature: '30-day returns', ours: true, competitor: true },
    18|  { feature: 'Lifetime warranty', ours: true, competitor: false },
    19|  { feature: 'Carbon-neutral shipping', ours: true, competitor: false },
    20|  { feature: '24/7 customer support', ours: true, competitor: true },
    21|  { feature: 'Free returns', ours: true, competitor: false },
    22|  { feature: 'Same-day dispatch', ours: true, competitor: true },
    23|  { feature: 'Price match guarantee', ours: true, competitor: false },
    24|];
    25|
    26|const ComparisonTable: React.FC<ComparisonTableProps> = ({
    27|  headline = 'Why Choose Us',
    28|}) => {
    29|  return (
    30|    <section
    31|      data-ai-section="comparison-table"
    32|      data-ai-category="content"
    33|      data-ai-label="Comparison Table"
    34|      data-ai-editable-fields="headline"
    35|      className="py-20 px-4 md:px-8"
    36|    >
    37|      <div className="max-w-3xl mx-auto">
    38|        <motion.h2
    39|          variants={slideUp}
    40|          initial="initial"
    41|          whileInView="animate"
    42|          viewport={{ once: true, amount: 0.5 }}
    43|          className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-12"
    44|        >
    45|          {headline}
    46|        </motion.h2>
    47|
    48|        <motion.div
    49|          variants={fadeIn}
    50|          initial="initial"
    51|          whileInView="animate"
    52|          viewport={{ once: true, amount: 0.3 }}
    53|          className="overflow-hidden rounded-xl border border-gray-200"
    54|        >
    55|          {/* Header */}
    56|          <div className="grid grid-cols-[1fr_auto_auto] bg-gray-900 text-white text-sm uppercase tracking-widest font-bold">
    57|            <div className="px-6 py-4">Feature</div>
    58|            <div className="px-6 py-4 text-center">Us</div>
    59|            <div className="px-6 py-4 text-center">Others</div>
    60|          </div>
    61|
    62|          {/* Rows */}
    63|          {defaultFeatures.map((row, i) => (
    64|            <motion.div
    65|              key={i}
    66|              variants={slideUp}
    67|              data-ai-feature-row={i}
    68|              className={`grid grid-cols-[1fr_auto_auto] border-b border-gray-100 ${
    69|                i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
    70|              }`}
    71|            >
    72|              <div className="px-6 py-4 text-sm text-gray-700 font-medium">
    73|                {row.feature}
    74|              </div>
    75|              <div className="px-6 py-4 flex justify-center items-center">
    76|                {row.ours ? (
    77|                  <span className="text-green-500 text-lg font-bold">✓</span>
    78|                ) : (
    79|                  <span className="text-red-400 text-lg">✕</span>
    80|                )}
    81|              </div>
    82|              <div className="px-6 py-4 flex justify-center items-center">
    83|                {row.competitor ? (
    84|                  <span className="text-green-500 text-lg font-bold">✓</span>
    85|                ) : (
    86|                  <span className="text-red-400 text-lg">✕</span>
    87|                )}
    88|              </div>
    89|            </motion.div>
    90|          ))}
    91|        </motion.div>
    92|      </div>
    93|    </section>
    94|  );
    95|};
    96|
    97|export default ComparisonTable;
    98|