import React from 'react';
import { motion } from 'framer-motion';
import { scaleHover, slideUp } from '@/motion/presets';

const ProductCard = ({ product }) => (
  <motion.div 
    variants={slideUp}
    whileHover="whileHover"
    className="product-card group relative border border-gray-100 rounded-md overflow-hidden bg-white transition-shadow hover:shadow-xl"
  >
    <div className="product-image-wrapper relative aspect-[3/4] overflow-hidden bg-gray-50">
      <motion.img 
        data-medusa="product-image" 
        className="primary-image w-full h-full object-cover" 
        src={product?.thumbnail || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"} 
      />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <button className="wishlist-button absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">♡</button>
      <button className="quick-view-button absolute bottom-3 left-3 right-3 bg-white/90 py-2 text-xs font-bold uppercase tracking-wider translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Quick View</button>
    </div>

    <div className="product-content p-4">
      <h3 className="font-medium text-sm text-gray-900 mb-1">{product?.title || "Product Name"}</h3>
      <div className="price-row flex justify-between items-center mb-4">
        <span className="font-medium text-sm">
          {product?.price || "$0.00"}
        </span>
      </div>
      <button className="add-to-cart w-full py-2 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">Add To Cart</button>
    </div>
  </motion.div>
);

const ProductGrid = ({ title = "Latest Arrivals", products = [null, null, null] }) => {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl font-black uppercase tracking-tighter">{title}</h2>
        <a href="#" className="text-sm font-bold uppercase tracking-widest border-b border-zinc-900 pb-1">View All</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p, i) => <ProductCard key={i} product={p} />)}
      </div>
    </section>
  );
};

export default ProductGrid;
