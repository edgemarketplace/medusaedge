import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn, scaleHover, staggerContainer } from '@/motion/presets';

interface BundleSlot {
  label: string;
  placeholder: string;
}

interface BundleBuilderProps {
  headline?: string;
  subheadline?: string;
  discountText?: string;
}

const slots: BundleSlot[] = [
  { label: 'Top', placeholder: 'Choose a top' },
  { label: 'Bottom', placeholder: 'Choose bottoms' },
  { label: 'Accessory', placeholder: 'Add an accessory' },
];

const BundleBuilder: React.FC<BundleBuilderProps> = ({
  headline = 'Build Your Bundle',
  subheadline = 'Mix and match any 3 items and save 15%',
  discountText = 'Save 15%',
}) => {
  return (
    <section
      data-ai-section="bundle-builder"
      data-ai-category="commerce"
      data-ai-label="Bundle Builder"
      data-ai-editable-fields="headline,subheadline,discountText"
      className="py-20 px-4 md:px-8 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4"
        >
          {headline}
        </motion.h2>
        <motion.p
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-gray-500 text-lg mb-12"
        >
          {subheadline}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12"
        >
          {slots.map((slot, i) => (
            <React.Fragment key={slot.label}>
              <motion.div
                variants={slideUp}
                whileHover="whileHover"
                data-ai-bundle-slot={i}
                className="flex-1 w-full"
              >
                <motion.div
                  variants={scaleHover}
                  className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-gray-900 transition-colors cursor-pointer group"
                >
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-3">
                    {slot.label}
                  </span>
                  <span className="text-gray-300 text-4xl group-hover:text-gray-900 transition-colors">
                    +
                  </span>
                  <p className="text-sm text-gray-400 mt-3">{slot.placeholder}</p>
                </motion.div>
              </motion.div>
              {i < slots.length - 1 && (
                <motion.span
                  variants={fadeIn}
                  className="text-3xl text-gray-300 font-light hidden md:block"
                >
                  +
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span
            data-ai-bundle-discount
            className="inline-block bg-green-100 text-green-800 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            {discountText}
          </span>
          <br />
          <a
            href="#"
            className="inline-block bg-gray-900 text-white px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-colors"
          >
            Build My Bundle
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BundleBuilder;
