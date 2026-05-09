"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface WholesaleInquiryProps {
     6|  headline?: string;
     7|  subheadline?: string;
     8|  cta?: string;
     9|}
    10|
    11|const WholesaleInquiry: React.FC<WholesaleInquiryProps> = ({
    12|  headline = 'Wholesale Partnerships',
    13|  subheadline = 'Interested in carrying our products in your store? Fill out the form below and our B2B team will get back to you within 48 hours.',
    14|  cta = 'Submit Inquiry',
    15|}) => {
    16|  return (
    17|    <section
    18|      data-section="wholesale-inquiry"
    19|      data-ai-category="commerce"
    20|      data-ai-context="b2b-wholesale-inquiry"
    21|      className="py-24 px-4 md:px-8 bg-gray-50"
    22|    >
    23|      <div className="max-w-3xl mx-auto">
    24|        <motion.div
    25|          variants={fadeIn}
    26|          initial="initial"
    27|          whileInView="animate"
    28|          viewport={{ once: true, amount: 0.3 }}
    29|          className="text-center mb-12"
    30|        >
    31|          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
    32|            {headline}
    33|          </h2>
    34|          <p className="text-gray-500 text-lg leading-relaxed">{subheadline}</p>
    35|        </motion.div>
    36|
    37|        <motion.div
    38|          variants={slideUp}
    39|          initial="initial"
    40|          whileInView="animate"
    41|          viewport={{ once: true, amount: 0.2 }}
    42|          className="bg-white border border-gray-100 rounded-lg p-8 md:p-10 shadow-sm"
    43|        >
    44|          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
    45|            <div>
    46|              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
    47|                Company Name
    48|              </label>
    49|              <input
    50|                type="text"
    51|                placeholder="Your Business Inc."
    52|                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400 transition-colors"
    53|              />
    54|            </div>
    55|            <div>
    56|              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
    57|                Contact Name
    58|              </label>
    59|              <input
    60|                type="text"
    61|                placeholder="Jane Smith"
    62|                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400 transition-colors"
    63|              />
    64|            </div>
    65|          </div>
    66|
    67|          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
    68|            <div>
    69|              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
    70|                Email
    71|              </label>
    72|              <input
    73|                type="email"
    74|                placeholder="jane@yourbusiness.com"
    75|                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400 transition-colors"
    76|              />
    77|            </div>
    78|            <div>
    79|              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
    80|                Phone
    81|              </label>
    82|              <input
    83|                type="tel"
    84|                placeholder="(555) 000-0000"
    85|                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400 transition-colors"
    86|              />
    87|            </div>
    88|          </div>
    89|
    90|          <div className="mb-6">
    91|            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
    92|              Order Volume
    93|            </label>
    94|            <select className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-gray-500 focus:outline-none focus:border-gray-400 transition-colors">
    95|              <option>Select estimated monthly volume</option>
    96|              <option>Under $1,000</option>
    97|              <option>$1,000 – $5,000</option>
    98|              <option>$5,000 – $25,000</option>
    99|              <option>$25,000+</option>
   100|            </select>
   101|          </div>
   102|
   103|          <div className="mb-8">
   104|            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
   105|              Message
   106|            </label>
   107|            <textarea
   108|              rows={4}
   109|              placeholder="Tell us about your store and which products you're interested in..."
   110|              className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
   111|            />
   112|          </div>
   113|
   114|          <motion.button
   115|            whileHover={{ scale: 1.02 }}
   116|            whileTap={{ scale: 0.98 }}
   117|            className="w-full py-4 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest rounded hover:bg-gray-800 transition-colors"
   118|          >
   119|            {cta}
   120|          </motion.button>
   121|        </motion.div>
   122|      </div>
   123|    </section>
   124|  );
   125|};
   126|
   127|export default WholesaleInquiry;
   128|