import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, scaleHover, fadeIn, staggerContainer } from '@/motion/presets';

interface UGCImage {
  src: string;
  handle: string;
}

interface UGCGridProps {
  headline?: string;
  images?: UGCImage[];
}

const defaultImages: UGCImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
    handle: '@sarah.styles',
  },
  {
    src: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=600',
    handle: '@mike.threads',
  },
  {
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600',
    handle: '@lisa.looks',
  },
  {
    src: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=600',
    handle: '@james.wardrobe',
  },
];

const UGCGrid: React.FC<UGCGridProps> = ({
  headline = 'Styled by You',
  images = defaultImages,
}) => {
  return (
    <section
      data-ai-section="ugc-grid"
      data-ai-category="social"
      data-ai-label="UGC Grid"
      data-ai-editable-fields="headline,images"
      className="py-20 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-12"
        >
          {headline}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              variants={slideUp}
              whileHover="whileHover"
              data-ai-ugc-image={i}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
            >
              <motion.img
                variants={scaleHover}
                src={img.src}
                alt={`UGC photo by ${img.handle}`}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <motion.span
                  variants={fadeIn}
                  className="text-white text-sm font-medium"
                >
                  {img.handle}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UGCGrid;
