"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface LoyaltyCTAProps {
     6|  headline?: string;
     7|  subheadline?: string;
     8|  primaryCta?: string;
     9|  secondaryCta?: string;
    10|}
    11|
    12|const LoyaltyCTA: React.FC<LoyaltyCTAProps> = ({
    13|  headline = 'Join the Inner Circle',
    14|  subheadline = 'Earn points on every purchase, unlock exclusive perks, and get early access to new drops.',
    15|  primaryCta = 'Join Free',
    16|  secondaryCta = 'Learn More',
    17|}) => {
    18|  return (
    19|    <section
    20|      data-ai-section="loyalty-cta"
    21|      data-ai-category="promotional"
    22|      data-ai-label="Loyalty CTA"
    23|      data-ai-editable-fields="headline,subheadline,primaryCta,secondaryCta"
    24|      className="relative py-24 px-4 md:px-8 bg-gray-950 text-white overflow-hidden"
    25|    >
    26|      {/* Decorative blobs */}
    27|      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
    28|        <motion.div
    29|          animate={{
    30|            scale: [1, 1.2, 1],
    31|            opacity: [0.3, 0.15, 0.3],
    32|            rotate: [0, 45, 0],
    33|          }}
    34|          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    35|          className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600 rounded-full blur-[120px]"
    36|        />
    37|        <motion.div
    38|          animate={{
    39|            scale: [1, 1.3, 1],
    40|            opacity: [0.2, 0.1, 0.2],
    41|            rotate: [0, -30, 0],
    42|          }}
    43|          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    44|          className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500 rounded-full blur-[100px]"
    45|        />
    46|        <motion.div
    47|          animate={{
    48|            scale: [1, 1.15, 1],
    49|            opacity: [0.15, 0.08, 0.15],
    50|          }}
    51|          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    52|          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[150px]"
    53|        />
    54|      </div>
    55|
    56|      <div className="relative z-10 max-w-3xl mx-auto text-center">
    57|        <motion.h2
    58|          variants={slideUp}
    59|          initial="initial"
    60|          whileInView="animate"
    61|          viewport={{ once: true, amount: 0.5 }}
    62|          className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6"
    63|        >
    64|          {headline}
    65|        </motion.h2>
    66|
    67|        <motion.p
    68|          variants={fadeIn}
    69|          initial="initial"
    70|          whileInView="animate"
    71|          viewport={{ once: true, amount: 0.5 }}
    72|          transition={{ delay: 0.15 }}
    73|          className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
    74|        >
    75|          {subheadline}
    76|        </motion.p>
    77|
    78|        <motion.div
    79|          variants={slideUp}
    80|          initial="initial"
    81|          whileInView="animate"
    82|          viewport={{ once: true, amount: 0.5 }}
    83|          transition={{ delay: 0.3 }}
    84|          className="flex flex-col sm:flex-row gap-4 justify-center"
    85|        >
    86|          <a
    87|            href="#"
    88|            data-ai-loyalty-primary-cta
    89|            className="inline-block bg-amber-400 text-gray-900 px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-amber-300 transition-colors"
    90|          >
    91|            {primaryCta}
    92|          </a>
    93|          <a
    94|            href="#"
    95|            data-ai-loyalty-secondary-cta
    96|            className="inline-block border border-gray-600 text-white px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-white/10 transition-colors"
    97|          >
    98|            {secondaryCta}
    99|          </a>
   100|        </motion.div>
   101|      </div>
   102|    </section>
   103|  );
   104|};
   105|
   106|export default LoyaltyCTA;
   107|