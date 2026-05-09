import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface FeatureRow {
  feature: string;
  ours: boolean;
  competitor: boolean;
}

interface ComparisonTableProps {
  headline?: string;
}

const defaultFeatures: FeatureRow[] = [
  { feature: 'Free shipping over $50', ours: true, competitor: false },
  { feature: '30-day returns', ours: true, competitor: true },
  { feature: 'Lifetime warranty', ours: true, competitor: false },
  { feature: 'Carbon-neutral shipping', ours: true, competitor: false },
  { feature: '24/7 customer support', ours: true, competitor: true },
  { feature: 'Free returns', ours: true, competitor: false },
  { feature: 'Same-day dispatch', ours: true, competitor: true },
  { feature: 'Price match guarantee', ours: true, competitor: false },
];

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  headline = 'Why Choose Us',
}) => {
  return (
    <section
      data-ai-section="comparison-table"
      data-ai-category="content"
      data-ai-label="Comparison Table"
      data-ai-editable-fields="headline"
      className="py-20 px-4 md:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-12"
        >
          {headline}
        </motion.h2>

        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="overflow-hidden rounded-xl border border-gray-200"
        >
          {/* Header */}
          <div className="grid grid-cols-[1fr_auto_auto] bg-gray-900 text-white text-sm uppercase tracking-widest font-bold">
            <div className="px-6 py-4">Feature</div>
            <div className="px-6 py-4 text-center">Us</div>
            <div className="px-6 py-4 text-center">Others</div>
          </div>

          {/* Rows */}
          {defaultFeatures.map((row, i) => (
            <motion.div
              key={i}
              variants={slideUp}
              data-ai-feature-row={i}
              className={`grid grid-cols-[1fr_auto_auto] border-b border-gray-100 ${
                i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="px-6 py-4 text-sm text-gray-700 font-medium">
                {row.feature}
              </div>
              <div className="px-6 py-4 flex justify-center items-center">
                {row.ours ? (
                  <span className="text-green-500 text-lg font-bold">✓</span>
                ) : (
                  <span className="text-red-400 text-lg">✕</span>
                )}
              </div>
              <div className="px-6 py-4 flex justify-center items-center">
                {row.competitor ? (
                  <span className="text-green-500 text-lg font-bold">✓</span>
                ) : (
                  <span className="text-red-400 text-lg">✕</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
