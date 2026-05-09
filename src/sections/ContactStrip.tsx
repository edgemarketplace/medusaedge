"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface ContactStripProps {
     6|  headline?: string;
     7|  address?: string;
     8|  phone?: string;
     9|  email?: string;
    10|  hours?: string;
    11|}
    12|
    13|const ContactStrip: React.FC<ContactStripProps> = ({
    14|  headline = 'Get In Touch',
    15|  address = '123 Serenity Lane, Suite 200, New York, NY 10001',
    16|  phone = '(212) 555-0187',
    17|  email = 'hello@example.com',
    18|  hours = 'Mon–Fri 9am–7pm · Sat 10am–5pm · Sun Closed',
    19|}) => {
    20|  const items = [
    21|    {
    22|      icon: (
    23|        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    24|          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    25|          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    26|        </svg>
    27|      ),
    28|      label: 'Address',
    29|      value: address,
    30|    },
    31|    {
    32|      icon: (
    33|        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    34|          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    35|        </svg>
    36|      ),
    37|      label: 'Phone',
    38|      value: phone,
    39|    },
    40|    {
    41|      icon: (
    42|        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    43|          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    44|        </svg>
    45|      ),
    46|      label: 'Email',
    47|      value: email,
    48|    },
    49|    {
    50|      icon: (
    51|        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    52|          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    53|        </svg>
    54|      ),
    55|      label: 'Hours',
    56|      value: hours,
    57|    },
    58|  ];
    59|
    60|  return (
    61|    <section
    62|      data-section="contact-strip"
    63|      data-ai-category="content"
    64|      data-ai-context="contact-information"
    65|      className="bg-gray-50 py-20 px-4 md:px-8"
    66|    >
    67|      <div className="max-w-7xl mx-auto">
    68|        <motion.h2
    69|          variants={fadeIn}
    70|          initial="initial"
    71|          whileInView="animate"
    72|          viewport={{ once: true, amount: 0.5 }}
    73|          className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-center mb-14"
    74|        >
    75|          {headline}
    76|        </motion.h2>
    77|
    78|        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    79|          {items.map((item, i) => (
    80|            <motion.div
    81|              key={i}
    82|              variants={slideUp}
    83|              initial="initial"
    84|              whileInView="animate"
    85|              viewport={{ once: true, amount: 0.3 }}
    86|              transition={{ delay: i * 0.1 }}
    87|              className="text-center"
    88|            >
    89|              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-700 mb-4">
    90|                {item.icon}
    91|              </div>
    92|              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
    93|                {item.label}
    94|              </h4>
    95|              <p className="text-sm text-gray-700 leading-relaxed">{item.value}</p>
    96|            </motion.div>
    97|          ))}
    98|        </div>
    99|      </div>
   100|    </section>
   101|  );
   102|};
   103|
   104|export default ContactStrip;
   105|