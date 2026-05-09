"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, staggerContainer, scaleHover } from '@/motion/presets';
     4|
     5|interface Category {
     6|  name: string;
     7|  image: string;
     8|}
     9|
    10|interface CategoryGridProps {
    11|  title?: string;
    12|  categories?: Category[];
    13|}
    14|
    15|const defaultCategories: Category[] = [
    16|  {
    17|    name: 'Outerwear',
    18|    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    19|  },
    20|  {
    21|    name: 'Dresses',
    22|    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    23|  },
    24|  {
    25|    name: 'Denim',
    26|    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
    27|  },
    28|  {
    29|    name: 'Accessories',
    30|    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800',
    31|  },
    32|  {
    33|    name: 'Footwear',
    34|    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    35|  },
    36|  {
    37|    name: 'Activewear',
    38|    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    39|  },
    40|];
    41|
    42|const CategoryGrid: React.FC<CategoryGridProps> = ({
    43|  title = 'Shop by Category',
    44|  categories = defaultCategories,
    45|}) => {
    46|  return (
    47|    <section
    48|      data-section="category-grid"
    49|      data-ai-section="category-grid"
    50|      data-ai-category="navigation"
    51|      data-ai-label="Category Grid"
    52|      data-ai-editable-fields="title,categories"
    53|      className="py-20 md:py-28 px-4 md:px-8 bg-white"
    54|    >
    55|      <div className="max-w-7xl mx-auto">
    56|        <motion.h2
    57|          variants={slideUp}
    58|          initial="initial"
    59|          whileInView="animate"
    60|          viewport={{ once: true, amount: 0.5 }}
    61|          className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-14 text-zinc-900"
    62|        >
    63|          {title}
    64|        </motion.h2>
    65|
    66|        <motion.div
    67|          variants={staggerContainer}
    68|          initial="initial"
    69|          whileInView="animate"
    70|          viewport={{ once: true, amount: 0.1 }}
    71|          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
    72|        >
    73|          {categories.map((category, i) => (
    74|            <motion.a
    75|              key={category.name}
    76|              href="#"
    77|              variants={slideUp}
    78|              whileHover="whileHover"
    79|              data-ai-category-item={i}
    80|              className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-stone-200 cursor-pointer"
    81|            >
    82|              {/* Image */}
    83|              <motion.img
    84|                variants={scaleHover}
    85|                src={category.image}
    86|                alt={category.name}
    87|                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
    88|              />
    89|
    90|              {/* Gradient Overlay */}
    91|              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-colors duration-300" />
    92|
    93|              {/* Category Name */}
    94|              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
    95|                <span className="text-lg md:text-xl font-bold uppercase tracking-wide text-white">
    96|                  {category.name}
    97|                </span>
    98|                <span className="block mt-1 text-xs text-white/70 font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    99|                  Shop Now →
   100|                </span>
   101|              </div>
   102|            </motion.a>
   103|          ))}
   104|        </motion.div>
   105|      </div>
   106|    </section>
   107|  );
   108|};
   109|
   110|export default CategoryGrid;
   111|