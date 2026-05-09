"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface NewsletterCTAProps {
     6|  headline?: string;
     7|  subheadline?: string;
     8|  placeholder?: string;
     9|  buttonText?: string;
    10|}
    11|
    12|const NewsletterCTA: React.FC<NewsletterCTAProps> = ({
    13|  headline = 'Stay in the Loop',
    14|  subheadline = 'Sign up for exclusive drops, early access, and 10% off your first order.',
    15|  placeholder = 'you@email.com',
    16|  buttonText = 'Subscribe',
    17|}) => {
    18|  return (
    19|    <section
    20|      data-ai-section="newsletter-cta"
    21|      data-ai-category="promotional"
    22|      data-ai-label="Newsletter CTA"
    23|      data-ai-editable-fields="headline,subheadline,placeholder,buttonText"
    24|      className="py-20 px-4 md:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
    25|    >
    26|      <div className="max-w-xl mx-auto text-center">
    27|        <motion.h2
    28|          variants={slideUp}
    29|          initial="initial"
    30|          whileInView="animate"
    31|          viewport={{ once: true, amount: 0.5 }}
    32|          className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4"
    33|        >
    34|          {headline}
    35|        </motion.h2>
    36|
    37|        <motion.p
    38|          variants={fadeIn}
    39|          initial="initial"
    40|          whileInView="animate"
    41|          viewport={{ once: true, amount: 0.5 }}
    42|          transition={{ delay: 0.1 }}
    43|          className="text-gray-300 text-lg mb-10 leading-relaxed"
    44|        >
    45|          {subheadline}
    46|        </motion.p>
    47|
    48|        <motion.form
    49|          variants={slideUp}
    50|          initial="initial"
    51|          whileInView="animate"
    52|          viewport={{ once: true, amount: 0.5 }}
    53|          transition={{ delay: 0.2 }}
    54|          onSubmit={(e) => e.preventDefault()}
    55|          className="flex flex-col sm:flex-row gap-3"
    56|        >
    57|          <input
    58|            type="email"
    59|            placeholder={placeholder}
    60|            data-ai-newsletter-input
    61|            className="flex-1 px-5 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors text-sm"
    62|          />
    63|          <button
    64|            type="submit"
    65|            data-ai-newsletter-button
    66|            className="px-8 py-4 bg-white text-gray-900 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
    67|          >
    68|            {buttonText}
    69|          </button>
    70|        </motion.form>
    71|
    72|        <motion.p
    73|          variants={fadeIn}
    74|          initial="initial"
    75|          whileInView="animate"
    76|          viewport={{ once: true, amount: 0.5 }}
    77|          transition={{ delay: 0.35 }}
    78|          className="text-xs text-gray-500 mt-6"
    79|        >
    80|          No spam, ever. Unsubscribe anytime.
    81|        </motion.p>
    82|      </div>
    83|    </section>
    84|  );
    85|};
    86|
    87|export default NewsletterCTA;
    88|