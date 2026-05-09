 "use client"

import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn, scaleHover } from '@/motion/presets';

interface Service {
  name: string;
  description: string;
  price: string;
  duration: string;
}

interface ServiceMenuProps {
  title?: string;
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    name: 'Signature Facial',
    description: 'Deep-cleansing facial with customized mask and steam treatment.',
    price: '$120',
    duration: '60 min',
  },
  {
    name: 'Deep Tissue Massage',
    description: 'Targeted pressure to release chronic muscle tension.',
    price: '$150',
    duration: '90 min',
  },
  {
    name: 'Manicure & Pedicure',
    description: 'Luxury nail care with paraffin wax treatment.',
    price: '$95',
    duration: '75 min',
  },
];

const ServiceMenu: React.FC<ServiceMenuProps> = ({
  title = 'Our Services',
  services = defaultServices,
}) => {
  return (
    <section
      data-section="service-menu"
      data-ai-category="booking"
      data-ai-context="service-menu-listing"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <motion.h2
        variants={slideUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16"
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            variants={slideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1 }}
            whileHover="whileHover"
            className="group bg-white border border-gray-100 rounded-lg p-8 flex flex-col hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2 text-gray-900">{service.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
              {service.description}
            </p>
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-lg font-bold text-gray-900">{service.price}</span>
              <span className="text-xs uppercase tracking-widest text-gray-400">
                {service.duration}
              </span>
            </div>
            <motion.button
              variants={scaleHover}
              whileHover="whileHover"
              className="mt-6 w-full py-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-gray-800 transition-colors"
            >
              Book Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceMenu;
