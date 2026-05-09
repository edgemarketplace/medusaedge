"use client"

     1|import React, { useState } from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface BeforeAfterPair {
     6|  before: string;
     7|  after: string;
     8|}
     9|
    10|interface BeforeAfterGalleryProps {
    11|  headline?: string;
    12|  pairs?: BeforeAfterPair[];
    13|}
    14|
    15|const defaultPairs: BeforeAfterPair[] = [
    16|  {
    17|    before: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800',
    18|    after: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    19|  },
    20|  {
    21|    before: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    22|    after: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&q=80&w=800',
    23|  },
    24|];
    25|
    26|const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({
    27|  headline = 'Real Results',
    28|  pairs = defaultPairs,
    29|}) => {
    30|  const [activeIndex, setActiveIndex] = useState<number | null>(null);
    31|
    32|  return (
    33|    <section
    34|      data-section="before-after-gallery"
    35|      data-ai-category="content"
    36|      data-ai-context="before-after-comparison"
    37|      className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
    38|    >
    39|      <motion.h2
    40|        variants={fadeIn}
    41|        initial="initial"
    42|        whileInView="animate"
    43|        viewport={{ once: true, amount: 0.5 }}
    44|        className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16"
    45|      >
    46|        {headline}
    47|      </motion.h2>
    48|
    49|      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    50|        {pairs.map((pair, i) => (
    51|          <motion.div
    52|            key={i}
    53|            variants={slideUp}
    54|            initial="initial"
    55|            whileInView="animate"
    56|            viewport={{ once: true, amount: 0.2 }}
    57|            transition={{ delay: i * 0.2 }}
    58|            className="group"
    59|          >
    60|            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
    61|              {/* Before image */}
    62|              <motion.img
    63|                src={pair.before}
    64|                alt="Before"
    65|                className="absolute inset-0 w-full h-full object-cover"
    66|                animate={{
    67|                  clipPath:
    68|                    activeIndex === i
    69|                      ? 'inset(0 50% 0 0)'
    70|                      : 'inset(0 0 0 0)',
    71|                }}
    72|                transition={{ duration: 0.4, ease: 'easeInOut' }}
    73|              />
    74|
    75|              {/* After image */}
    76|              <motion.img
    77|                src={pair.after}
    78|                alt="After"
    79|                className="absolute inset-0 w-full h-full object-cover"
    80|                animate={{
    81|                  clipPath:
    82|                    activeIndex === i
    83|                      ? 'inset(0 0 0 50%)'
    84|                      : 'inset(0 0 0 100%)',
    85|                }}
    86|                transition={{ duration: 0.4, ease: 'easeInOut' }}
    87|              />
    88|
    89|              {/* Divider line */}
    90|              {activeIndex === i && (
    91|                <motion.div
    92|                  initial={{ opacity: 0 }}
    93|                  animate={{ opacity: 1 }}
    94|                  className="absolute inset-y-0 left-1/2 w-0.5 bg-white shadow-lg z-10"
    95|                />
    96|              )}
    97|
    98|              {/* Labels */}
    99|              <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
   100|                Before
   101|              </div>
   102|              <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
   103|                After
   104|              </div>
   105|            </div>
   106|
   107|            {/* Toggle button */}
   108|            <div className="flex justify-center mt-4">
   109|              <button
   110|                onMouseEnter={() => setActiveIndex(i)}
   111|                onMouseLeave={() => setActiveIndex(null)}
   112|                onTouchStart={() => setActiveIndex(i)}
   113|                onTouchEnd={() => setActiveIndex(null)}
   114|                className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 border border-gray-300 px-6 py-2 rounded-full transition-colors"
   115|              >
   116|                {activeIndex === i ? 'Comparing' : 'Hover to Compare'}
   117|              </button>
   118|            </div>
   119|          </motion.div>
   120|        ))}
   121|      </div>
   122|    </section>
   123|  );
   124|};
   125|
   126|export default BeforeAfterGallery;
   127|