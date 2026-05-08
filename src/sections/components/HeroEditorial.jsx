import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '../../motion/presets';

const HeroEditorial = ({ 
  headline = "The Fall Edit", 
  subheadline = "Oversized silhouettes and tactile fabrics for the modern wardrobe.",
  cta = "Shop The Lookbook",
  backgroundImage = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000",
  variant = "luxury"
}) => {
  return (
    <section
      data-section="hero-editorial"
      data-ai-context="luxury-fashion-hero"
      className="relative h-[80vh] bg-stone-200 flex items-center justify-center overflow-hidden"
    >
      <motion.img 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 1.5 }}
        src={backgroundImage} 
        alt="Fashion Editorial" 
        className="absolute inset-0 w-full h-full object-cover object-center mix-blend-multiply" 
      />
      
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1 
          variants={slideUp}
          initial="initial"
          animate="animate"
          className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 mix-blend-overlay"
        >
          {headline}
        </motion.h1>
        
        <motion.p 
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl font-light tracking-wide mb-8 max-w-lg mx-auto"
        >
          {subheadline}
        </motion.p>
        
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <a href="#" className="inline-block bg-white text-zinc-900 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors">
            {cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroEditorial;
