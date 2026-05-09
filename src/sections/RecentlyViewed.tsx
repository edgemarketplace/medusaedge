"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, scaleHover, staggerContainer } from '@/motion/presets';

interface ProductCardData {
  title: string;
  price: string;
  image: string;
}

interface RecentlyViewedProps {
  headline?: string;
  products?: ProductCardData[];
}

const defaultProducts: ProductCardData[] = [
  {
    title: 'Wool Blend Coat',
    price: '$249.00',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'Cashmere Sweater',
    price: '$189.00',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'Leather Ankle Boots',
    price: '$320.00',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600',
  },
];

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  headline = 'Recently Viewed',
  products = defaultProducts,
}) => {
  return (
    <section
      data-ai-section="recently-viewed"
      data-ai-category="commerce"
      data-ai-label="Recently Viewed"
      data-ai-editable-fields="headline,products"
      className="py-20 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <motion.h2
            variants={slideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl md:text-4xl font-black uppercase tracking-tighter"
          >
            {headline}
          </motion.h2>
          <a
            href="#"
            className="text-sm font-bold uppercase tracking-widest border-b border-gray-900 pb-1 hidden md:block"
          >
            View All
          </a>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin"
        >
          {products.map((product, i) => (
            <motion.div
              key={i}
              variants={slideUp}
              whileHover="whileHover"
              data-ai-product-card={i}
              className="flex-shrink-0 w-64 snap-start group cursor-pointer"
            >
              <motion.div
                variants={scaleHover}
                className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-4"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h3 className="font-medium text-sm text-gray-900 mb-1">
                {product.title}
              </h3>
              <span className="text-sm text-gray-500">{product.price}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
