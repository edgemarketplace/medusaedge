"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface NewsletterCTAProps {
  headline?: string;
  subheadline?: string;
  placeholder?: string;
  buttonText?: string;
}

const NewsletterCTA: React.FC<NewsletterCTAProps> = ({
  headline = 'Stay in the Loop',
  subheadline = 'Sign up for exclusive drops, early access, and 10% off your first order.',
  placeholder = 'you@email.com',
  buttonText = 'Subscribe',
}) => {
  return (
    <section
      data-ai-section="newsletter-cta"
      data-ai-category="promotional"
      data-ai-label="Newsletter CTA"
      data-ai-editable-fields="headline,subheadline,placeholder,buttonText"
      className="py-20 px-4 md:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      <div className="max-w-xl mx-auto text-center">
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
          transition={{ delay: 0.1 }}
          className="text-gray-300 text-lg mb-10 leading-relaxed"
        >
          {subheadline}
        </motion.p>

        <motion.form
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2 }}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            placeholder={placeholder}
            data-ai-newsletter-input
            className="flex-1 px-5 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors text-sm"
          />
          <button
            type="submit"
            data-ai-newsletter-button
            className="px-8 py-4 bg-white text-gray-900 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            {buttonText}
          </button>
        </motion.form>

        <motion.p
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.35 }}
          className="text-xs text-gray-500 mt-6"
        >
          No spam, ever. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
};

export default NewsletterCTA;
