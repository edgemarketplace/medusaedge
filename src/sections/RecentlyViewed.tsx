"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, scaleHover, staggerContainer } from '@/motion/presets';
     4|
     5|interface ProductCardData {
     6|  title: string;
     7|  price: string;
     8|  image: string;
     9|}
    10|
    11|interface RecentlyViewedProps {
    12|  headline?: string;
    13|  products?: ProductCardData[];
    14|}
    15|
    16|const defaultProducts: ProductCardData[] = [
    17|  {
    18|    title: 'Wool Blend Coat',
    19|    price: '$249.00',
    20|    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=600',
    21|  },
    22|  {
    23|    title: 'Cashmere Sweater',
    24|    price: '$189.00',
    25|    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600',
    26|  },
    27|  {
    28|    title: 'Leather Ankle Boots',
    29|    price: '$320.00',
    30|    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600',
    31|  },
    32|];
    33|
    34|const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
    35|  headline = 'Recently Viewed',
    36|  products = defaultProducts,
    37|}) => {
    38|  return (
    39|    <section
    40|      data-ai-section="recently-viewed"
    41|      data-ai-category="commerce"
    42|      data-ai-label="Recently Viewed"
    43|      data-ai-editable-fields="headline,products"
    44|      className="py-20 px-4 md:px-8"
    45|    >
    46|      <div className="max-w-6xl mx-auto">
    47|        <div className="flex justify-between items-end mb-10">
    48|          <motion.h2
    49|            variants={slideUp}
    50|            initial="initial"
    51|            whileInView="animate"
    52|            viewport={{ once: true, amount: 0.5 }}
    53|            className="text-3xl md:text-4xl font-black uppercase tracking-tighter"
    54|          >
    55|            {headline}
    56|          </motion.h2>
    57|          <a
    58|            href="#"
    59|            className="text-sm font-bold uppercase tracking-widest border-b border-gray-900 pb-1 hidden md:block"
    60|          >
    61|            View All
    62|          </a>
    63|        </div>
    64|
    65|        <motion.div
    66|          variants={staggerContainer}
    67|          initial="initial"
    68|          whileInView="animate"
    69|          viewport={{ once: true, amount: 0.2 }}
    70|          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin"
    71|        >
    72|          {products.map((product, i) => (
    73|            <motion.div
    74|              key={i}
    75|              variants={slideUp}
    76|              whileHover="whileHover"
    77|              data-ai-product-card={i}
    78|              className="flex-shrink-0 w-64 snap-start group cursor-pointer"
    79|            >
    80|              <motion.div
    81|                variants={scaleHover}
    82|                className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-4"
    83|              >
    84|                <img
    85|                  src={product.image}
    86|                  alt={product.title}
    87|                  className="w-full h-full object-cover"
    88|                />
    89|              </motion.div>
    90|              <h3 className="font-medium text-sm text-gray-900 mb-1">
    91|                {product.title}
    92|              </h3>
    93|              <span className="text-sm text-gray-500">{product.price}</span>
    94|            </motion.div>
    95|          ))}
    96|        </motion.div>
    97|      </div>
    98|    </section>
    99|  );
   100|};
   101|
   102|export default RecentlyViewed;
   103|