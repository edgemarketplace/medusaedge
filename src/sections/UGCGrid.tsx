"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, scaleHover, fadeIn, staggerContainer } from '@/motion/presets';
     4|
     5|interface UGCImage {
     6|  src: string;
     7|  handle: string;
     8|}
     9|
    10|interface UGCGridProps {
    11|  headline?: string;
    12|  images?: UGCImage[];
    13|}
    14|
    15|const defaultImages: UGCImage[] = [
    16|  {
    17|    src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
    18|    handle: '@sarah.styles',
    19|  },
    20|  {
    21|    src: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=600',
    22|    handle: '@mike.threads',
    23|  },
    24|  {
    25|    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600',
    26|    handle: '@lisa.looks',
    27|  },
    28|  {
    29|    src: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=600',
    30|    handle: '@james.wardrobe',
    31|  },
    32|];
    33|
    34|const UGCGrid: React.FC<UGCGridProps> = ({
    35|  headline = 'Styled by You',
    36|  images = defaultImages,
    37|}) => {
    38|  return (
    39|    <section
    40|      data-ai-section="ugc-grid"
    41|      data-ai-category="social"
    42|      data-ai-label="UGC Grid"
    43|      data-ai-editable-fields="headline,images"
    44|      className="py-20 px-4 md:px-8"
    45|    >
    46|      <div className="max-w-6xl mx-auto">
    47|        <motion.h2
    48|          variants={slideUp}
    49|          initial="initial"
    50|          whileInView="animate"
    51|          viewport={{ once: true, amount: 0.5 }}
    52|          className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-12"
    53|        >
    54|          {headline}
    55|        </motion.h2>
    56|
    57|        <motion.div
    58|          variants={staggerContainer}
    59|          initial="initial"
    60|          whileInView="animate"
    61|          viewport={{ once: true, amount: 0.2 }}
    62|          className="grid grid-cols-2 md:grid-cols-4 gap-4"
    63|        >
    64|          {images.map((img, i) => (
    65|            <motion.div
    66|              key={i}
    67|              variants={slideUp}
    68|              whileHover="whileHover"
    69|              data-ai-ugc-image={i}
    70|              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
    71|            >
    72|              <motion.img
    73|                variants={scaleHover}
    74|                src={img.src}
    75|                alt={`UGC photo by ${img.handle}`}
    76|                className="w-full h-full object-cover transition-transform duration-500"
    77|              />
    78|              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
    79|                <motion.span
    80|                  variants={fadeIn}
    81|                  className="text-white text-sm font-medium"
    82|                >
    83|                  {img.handle}
    84|                </motion.span>
    85|              </div>
    86|            </motion.div>
    87|          ))}
    88|        </motion.div>
    89|      </div>
    90|    </section>
    91|  );
    92|};
    93|
    94|export default UGCGrid;
    95|