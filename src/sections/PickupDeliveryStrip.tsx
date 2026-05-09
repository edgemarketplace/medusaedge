"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface DeliveryOption {
  method: string;
  description: string;
  icon: 'truck' | 'store' | 'clock' | 'package';
}

interface PickupDeliveryStripProps {
  headline?: string;
  options?: DeliveryOption[];
}

const defaultOptions: DeliveryOption[] = [
  {
    method: 'In-Store Pickup',
    description: 'Order online and pick up at our flagship location. Ready in 2 hours.',
    icon: 'store',
  },
  {
    method: 'Local Delivery',
    description: 'Same-day delivery within 10 miles. Orders placed before 2pm qualify.',
    icon: 'truck',
  },
  {
    method: 'Curbside',
    description: 'Pull up and we will bring your order out. No need to leave your car.',
    icon: 'clock',
  },
  {
    method: 'Nationwide Shipping',
    description: 'Free shipping on orders over $75. Delivered in 2–5 business days.',
    icon: 'package',
  },
];

const iconMap: Record<string, React.ReactNode> = {
  store: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  truck: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  clock: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  package: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
};

const PickupDeliveryStrip: React.FC<PickupDeliveryStripProps> = ({
  headline = 'Pickup & Delivery',
  options = defaultOptions,
}) => {
  return (
    <section
      data-section="pickup-delivery-strip"
      data-ai-category="commerce"
      data-ai-context="pickup-delivery-options"
      className="py-20 px-4 md:px-8 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-center text-white mb-14"
        >
          {headline}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {options.map((option, i) => (
            <motion.div
              key={i}
              variants={slideUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-white mb-5">
                {iconMap[option.icon]}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{option.method}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[240px] mx-auto">
                {option.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PickupDeliveryStrip;
