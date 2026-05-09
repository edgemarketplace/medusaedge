import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface HeroSplitProps {
  headline?: string;
  subheadline?: string;
  cta?: string;
  backgroundImage?: string;
  variant?: 'luxury' | 'minimal' | 'athletic';
}

const variantClasses: Record<string, string> = {
  luxury: 'bg-zinc-900 text-white',
  minimal: 'bg-white text-zinc-900',
  athletic: 'bg-orange-500 text-white',
};

const HeroSplit: React.FC<HeroSplitProps> = ({
  headline = 'Elevate Your Style',
  subheadline = 'Discover the collection that redefines modern elegance.',
  cta = 'Shop Now',
  backgroundImage = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000',
  variant = 'luxury',
}) => {
  return (
    <section
      data-section="hero-split"
      data-ai-section="hero-split"
      data-ai-category="hero"
      data-ai-label="Hero Split"
      data-ai-editable-fields="headline,subheadline,cta,backgroundImage,variant"
      className={`grid grid-cols-1 md:grid-cols-2 min-h-[90vh] ${variantClasses[variant]}`}
    >
      {/* Text Column */}
      <motion.div
        initial="initial"
        animate="animate"
        className="flex flex-col justify-center px-8 md:px-16 py-20 order-2 md:order-1"
      >
        <motion.h1
          variants={slideUp}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={fadeIn}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl font-light tracking-wide mb-8 max-w-lg opacity-80"
        >
          {subheadline}
        </motion.p>

        <motion.div variants={slideUp} transition={{ delay: 0.4 }}>
          <a
            href="#"
            className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest border-2 border-current hover:bg-white hover:text-zinc-900 transition-colors"
          >
            {cta}
          </a>
        </motion.div>
      </motion.div>

      {/* Image Column */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative order-1 md:order-2 min-h-[50vh] md:min-h-0"
      >
        <img
          src={backgroundImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/60 md:bg-gradient-to-r md:from-black/40 md:to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSplit;
