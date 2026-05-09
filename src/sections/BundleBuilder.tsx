"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn, scaleHover, staggerContainer } from '@/motion/presets';
     4|
     5|interface BundleSlot {
     6|  label: string;
     7|  placeholder: string;
     8|}
     9|
    10|interface BundleBuilderProps {
    11|  headline?: string;
    12|  subheadline?: string;
    13|  discountText?: string;
    14|}
    15|
    16|const slots: BundleSlot[] = [
    17|  { label: 'Top', placeholder: 'Choose a top' },
    18|  { label: 'Bottom', placeholder: 'Choose bottoms' },
    19|  { label: 'Accessory', placeholder: 'Add an accessory' },
    20|];
    21|
    22|const BundleBuilder: React.FC<BundleBuilderProps> = ({
    23|  headline = 'Build Your Bundle',
    24|  subheadline = 'Mix and match any 3 items and save 15%',
    25|  discountText = 'Save 15%',
    26|}) => {
    27|  return (
    28|    <section
    29|      data-ai-section="bundle-builder"
    30|      data-ai-category="commerce"
    31|      data-ai-label="Bundle Builder"
    32|      data-ai-editable-fields="headline,subheadline,discountText"
    33|      className="py-20 px-4 md:px-8 bg-gray-50"
    34|    >
    35|      <div className="max-w-4xl mx-auto text-center">
    36|        <motion.h2
    37|          variants={slideUp}
    38|          initial="initial"
    39|          whileInView="animate"
    40|          viewport={{ once: true, amount: 0.5 }}
    41|          className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4"
    42|        >
    43|          {headline}
    44|        </motion.h2>
    45|        <motion.p
    46|          variants={fadeIn}
    47|          initial="initial"
    48|          whileInView="animate"
    49|          viewport={{ once: true, amount: 0.5 }}
    50|          className="text-gray-500 text-lg mb-12"
    51|        >
    52|          {subheadline}
    53|        </motion.p>
    54|
    55|        <motion.div
    56|          variants={staggerContainer}
    57|          initial="initial"
    58|          whileInView="animate"
    59|          viewport={{ once: true, amount: 0.3 }}
    60|          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12"
    61|        >
    62|          {slots.map((slot, i) => (
    63|            <React.Fragment key={slot.label}>
    64|              <motion.div
    65|                variants={slideUp}
    66|                whileHover="whileHover"
    67|                data-ai-bundle-slot={i}
    68|                className="flex-1 w-full"
    69|              >
    70|                <motion.div
    71|                  variants={scaleHover}
    72|                  className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-gray-900 transition-colors cursor-pointer group"
    73|                >
    74|                  <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-3">
    75|                    {slot.label}
    76|                  </span>
    77|                  <span className="text-gray-300 text-4xl group-hover:text-gray-900 transition-colors">
    78|                    +
    79|                  </span>
    80|                  <p className="text-sm text-gray-400 mt-3">{slot.placeholder}</p>
    81|                </motion.div>
    82|              </motion.div>
    83|              {i < slots.length - 1 && (
    84|                <motion.span
    85|                  variants={fadeIn}
    86|                  className="text-3xl text-gray-300 font-light hidden md:block"
    87|                >
    88|                  +
    89|                </motion.span>
    90|              )}
    91|            </React.Fragment>
    92|          ))}
    93|        </motion.div>
    94|
    95|        <motion.div
    96|          variants={slideUp}
    97|          initial="initial"
    98|          whileInView="animate"
    99|          viewport={{ once: true, amount: 0.5 }}
   100|        >
   101|          <span
   102|            data-ai-bundle-discount
   103|            className="inline-block bg-green-100 text-green-800 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
   104|          >
   105|            {discountText}
   106|          </span>
   107|          <br />
   108|          <a
   109|            href="#"
   110|            className="inline-block bg-gray-900 text-white px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-colors"
   111|          >
   112|            Build My Bundle
   113|          </a>
   114|        </motion.div>
   115|      </div>
   116|    </section>
   117|  );
   118|};
   119|
   120|export default BundleBuilder;
   121|