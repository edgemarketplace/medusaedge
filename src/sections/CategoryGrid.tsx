import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer, scaleHover } from '@/motion/presets';

interface Category {
  name: string;
  image: string;
}

interface CategoryGridProps {
  title?: string;
  categories?: Category[];
}

const defaultCategories: Category[] = [
  {
    name: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Denim',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Activewear',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
  },
];

const CategoryGrid: React.FC<CategoryGridProps> = ({
  title = 'Shop by Category',
  categories = defaultCategories,
}) => {
  return (
    <section
      data-section="category-grid"
      data-ai-section="category-grid"
      data-ai-category="navigation"
      data-ai-label="Category Grid"
      data-ai-editable-fields="title,categories"
      className="py-20 md:py-28 px-4 md:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-14 text-zinc-900"
        >
          {title}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {categories.map((category, i) => (
            <motion.a
              key={category.name}
              href="#"
              variants={slideUp}
              whileHover="whileHover"
              data-ai-category-item={i}
              className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-stone-200 cursor-pointer"
            >
              {/* Image */}
              <motion.img
                variants={scaleHover}
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-colors duration-300" />

              {/* Category Name */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <span className="text-lg md:text-xl font-bold uppercase tracking-wide text-white">
                  {category.name}
                </span>
                <span className="block mt-1 text-xs text-white/70 font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now →
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;
