import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface HeroCenteredProps {
  headline?: string;
  subheadline?: string;
  cta?: string;
  secondaryCta?: string;
  backgroundImage?: string;
}

const HeroCentered: React.FC<HeroCenteredProps> = ({
  headline = 'Style Meets Substance',
  subheadline = 'Timeless pieces crafted for the modern individual.',
  cta = 'Explore Collection',
  secondaryCta,
  backgroundImage = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000',
}) => {
  return (
    <section
      data-section="hero-centered"
      data-ai-section="hero-centered"
      data-ai-category="hero"
      data-ai-label="Hero Centered"
      data-ai-editable-fields="headline,subheadline,cta,secondaryCta,backgroundImage"
      className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-zinc-900"
    >
      {/* Background Image */}
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        src={backgroundImage}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h1
          variants={slideUp}
          initial="initial"
          animate="animate"
          className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="text-lg md:text-2xl font-light tracking-wide mb-10 max-w-2xl mx-auto opacity-90"
        >
          {subheadline}
        </motion.p>

        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#"
            className="inline-block bg-white text-zinc-900 px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors"
          >
            {cta}
          </a>

          {secondaryCta && (
            <a
              href="#"
              className="inline-block border-2 border-white text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-colors"
            >
              {secondaryCta}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCentered;
