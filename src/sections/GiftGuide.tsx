"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn, scaleHover } from '@/motion/presets';
     4|
     5|interface GiftCategory {
     6|  name: string;
     7|  image: string;
     8|}
     9|
    10|interface GiftGuideProps {
    11|  headline?: string;
    12|  subheadline?: string;
    13|  giftCategories?: GiftCategory[];
    14|}
    15|
    16|const defaultCategories: GiftCategory[] = [
    17|  {
    18|    name: 'For Her',
    19|    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800',
    20|  },
    21|  {
    22|    name: 'For Him',
    23|    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=800',
    24|  },
    25|  {
    26|    name: 'Wellness',
    27|    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6e?auto=format&fit=crop&q=80&w=800',
    28|  },
    29|  {
    30|    name: 'Luxury Sets',
    31|    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800',
    32|  },
    33|  {
    34|    name: 'Under $50',
    35|    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    36|  },
    37|  {
    38|    name: 'Gift Cards',
    39|    image: 'https://images.unsplash.com/photo-1557682224-5b8590cd17ec?auto=format&fit=crop&q=80&w=800',
    40|  },
    41|];
    42|
    43|const GiftGuide: React.FC<GiftGuideProps> = ({
    44|  headline = 'The Gift Guide',
    45|  subheadline = 'Thoughtfully curated collections for everyone on your list.',
    46|  giftCategories = defaultCategories,
    47|}) => {
    48|  return (
    49|    <section
    50|      data-section="gift-guide"
    51|      data-ai-category="commerce"
    52|      data-ai-context="gift-category-grid"
    53|      className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
    54|    >
    55|      <motion.div
    56|        variants={fadeIn}
    57|        initial="initial"
    58|        whileInView="animate"
    59|        viewport={{ once: true, amount: 0.3 }}
    60|        className="text-center mb-16"
    61|      >
    62|        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
    63|          {headline}
    64|        </h2>
    65|        <p className="text-gray-500 text-lg max-w-xl mx-auto">{subheadline}</p>
    66|      </motion.div>
    67|
    68|      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    69|        {giftCategories.map((category, i) => (
    70|          <motion.div
    71|            key={i}
    72|            variants={slideUp}
    73|            initial="initial"
    74|            whileInView="animate"
    75|            viewport={{ once: true, amount: 0.2 }}
    76|            transition={{ delay: i * 0.1 }}
    77|            whileHover="whileHover"
    78|            className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
    79|          >
    80|            <motion.img
    81|              variants={scaleHover}
    82|              src={category.image}
    83|              alt={category.name}
    84|              className="absolute inset-0 w-full h-full object-cover"
    85|            />
    86|            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
    87|            <div className="absolute inset-0 flex items-center justify-center">
    88|              <span className="text-white text-xl md:text-2xl font-bold uppercase tracking-wider">
    89|                {category.name}
    90|              </span>
    91|            </div>
    92|            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/0 group-hover:bg-white/60 transition-colors" />
    93|          </motion.div>
    94|        ))}
    95|      </div>
    96|    </section>
    97|  );
    98|};
    99|
   100|export default GiftGuide;
   101|