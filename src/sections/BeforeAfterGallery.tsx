import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface BeforeAfterPair {
  before: string;
  after: string;
}

interface BeforeAfterGalleryProps {
  headline?: string;
  pairs?: BeforeAfterPair[];
}

const defaultPairs: BeforeAfterPair[] = [
  {
    before: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800',
    after: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
  },
  {
    before: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    after: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&q=80&w=800',
  },
];

const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({
  headline = 'Real Results',
  pairs = defaultPairs,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      data-section="before-after-gallery"
      data-ai-category="content"
      data-ai-context="before-after-comparison"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <motion.h2
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16"
      >
        {headline}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {pairs.map((pair, i) => (
          <motion.div
            key={i}
            variants={slideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.2 }}
            className="group"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
              {/* Before image */}
              <motion.img
                src={pair.before}
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover"
                animate={{
                  clipPath:
                    activeIndex === i
                      ? 'inset(0 50% 0 0)'
                      : 'inset(0 0 0 0)',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />

              {/* After image */}
              <motion.img
                src={pair.after}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
                animate={{
                  clipPath:
                    activeIndex === i
                      ? 'inset(0 0 0 50%)'
                      : 'inset(0 0 0 100%)',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />

              {/* Divider line */}
              {activeIndex === i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-y-0 left-1/2 w-0.5 bg-white shadow-lg z-10"
                />
              )}

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                Before
              </div>
              <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                After
              </div>
            </div>

            {/* Toggle button */}
            <div className="flex justify-center mt-4">
              <button
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onTouchStart={() => setActiveIndex(i)}
                onTouchEnd={() => setActiveIndex(null)}
                className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 border border-gray-300 px-6 py-2 rounded-full transition-colors"
              >
                {activeIndex === i ? 'Comparing' : 'Hover to Compare'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
