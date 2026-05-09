"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface LoyaltyCTAProps {
  headline?: string;
  subheadline?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

const LoyaltyCTA: React.FC<LoyaltyCTAProps> = ({
  headline = 'Join the Inner Circle',
  subheadline = 'Earn points on every purchase, unlock exclusive perks, and get early access to new drops.',
  primaryCta = 'Join Free',
  secondaryCta = 'Learn More',
}) => {
  return (
    <section
      data-ai-section="loyalty-cta"
      data-ai-category="promotional"
      data-ai-label="Loyalty CTA"
      data-ai-editable-fields="headline,subheadline,primaryCta,secondaryCta"
      className="relative py-24 px-4 md:px-8 bg-gray-950 text-white overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.15, 0.3],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.1, 0.2],
            rotate: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.08, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6"
        >
          {headline}
        </motion.h2>

        <motion.p
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.15 }}
          className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {subheadline}
        </motion.p>

        <motion.div
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#"
            data-ai-loyalty-primary-cta
            className="inline-block bg-amber-400 text-gray-900 px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-amber-300 transition-colors"
          >
            {primaryCta}
          </a>
          <a
            href="#"
            data-ai-loyalty-secondary-cta
            className="inline-block border border-gray-600 text-white px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-white/10 transition-colors"
          >
            {secondaryCta}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LoyaltyCTA;
