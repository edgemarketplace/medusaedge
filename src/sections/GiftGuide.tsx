"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn, scaleHover } from '@/motion/presets';

interface GiftCategory {
  name: string;
  image: string;
}

interface GiftGuideProps {
  headline?: string;
  subheadline?: string;
  giftCategories?: GiftCategory[];
}

const defaultCategories: GiftCategory[] = [
  {
    name: 'For Her',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'For Him',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6e?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Luxury Sets',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Under $50',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Gift Cards',
    image: 'https://images.unsplash.com/photo-1557682224-5b8590cd17ec?auto=format&fit=crop&q=80&w=800',
  },
];

const GiftGuide: React.FC<GiftGuideProps> = ({
  headline = 'The Gift Guide',
  subheadline = 'Thoughtfully curated collections for everyone on your list.',
  giftCategories = defaultCategories,
}) => {
  return (
    <section
      data-section="gift-guide"
      data-ai-category="commerce"
      data-ai-context="gift-category-grid"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <motion.div
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
          {headline}
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">{subheadline}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {giftCategories.map((category, i) => (
          <motion.div
            key={i}
            variants={slideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1 }}
            whileHover="whileHover"
            className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
          >
            <motion.img
              variants={scaleHover}
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xl md:text-2xl font-bold uppercase tracking-wider">
                {category.name}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/0 group-hover:bg-white/60 transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GiftGuide;
