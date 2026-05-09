"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface DeliveryOption {
     6|  method: string;
     7|  description: string;
     8|  icon: 'truck' | 'store' | 'clock' | 'package';
     9|}
    10|
    11|interface PickupDeliveryStripProps {
    12|  headline?: string;
    13|  options?: DeliveryOption[];
    14|}
    15|
    16|const defaultOptions: DeliveryOption[] = [
    17|  {
    18|    method: 'In-Store Pickup',
    19|    description: 'Order online and pick up at our flagship location. Ready in 2 hours.',
    20|    icon: 'store',
    21|  },
    22|  {
    23|    method: 'Local Delivery',
    24|    description: 'Same-day delivery within 10 miles. Orders placed before 2pm qualify.',
    25|    icon: 'truck',
    26|  },
    27|  {
    28|    method: 'Curbside',
    29|    description: 'Pull up and we will bring your order out. No need to leave your car.',
    30|    icon: 'clock',
    31|  },
    32|  {
    33|    method: 'Nationwide Shipping',
    34|    description: 'Free shipping on orders over $75. Delivered in 2–5 business days.',
    35|    icon: 'package',
    36|  },
    37|];
    38|
    39|const iconMap: Record<string, React.ReactNode> = {
    40|  store: (
    41|    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    42|      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    43|    </svg>
    44|  ),
    45|  truck: (
    46|    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    47|      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    48|      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    49|    </svg>
    50|  ),
    51|  clock: (
    52|    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    53|      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    54|    </svg>
    55|  ),
    56|  package: (
    57|    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    58|      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    59|    </svg>
    60|  ),
    61|};
    62|
    63|const PickupDeliveryStrip: React.FC<PickupDeliveryStripProps> = ({
    64|  headline = 'Pickup & Delivery',
    65|  options = defaultOptions,
    66|}) => {
    67|  return (
    68|    <section
    69|      data-section="pickup-delivery-strip"
    70|      data-ai-category="commerce"
    71|      data-ai-context="pickup-delivery-options"
    72|      className="py-20 px-4 md:px-8 bg-gray-900"
    73|    >
    74|      <div className="max-w-7xl mx-auto">
    75|        <motion.h2
    76|          variants={fadeIn}
    77|          initial="initial"
    78|          whileInView="animate"
    79|          viewport={{ once: true, amount: 0.5 }}
    80|          className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-center text-white mb-14"
    81|        >
    82|          {headline}
    83|        </motion.h2>
    84|
    85|        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    86|          {options.map((option, i) => (
    87|            <motion.div
    88|              key={i}
    89|              variants={slideUp}
    90|              initial="initial"
    91|              whileInView="animate"
    92|              viewport={{ once: true, amount: 0.3 }}
    93|              transition={{ delay: i * 0.1 }}
    94|              className="text-center"
    95|            >
    96|              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-white mb-5">
    97|                {iconMap[option.icon]}
    98|              </div>
    99|              <h3 className="text-white font-bold text-lg mb-2">{option.method}</h3>
   100|              <p className="text-gray-400 text-sm leading-relaxed max-w-[240px] mx-auto">
   101|                {option.description}
   102|              </p>
   103|            </motion.div>
   104|          ))}
   105|        </div>
   106|      </div>
   107|    </section>
   108|  );
   109|};
   110|
   111|export default PickupDeliveryStrip;
   112|