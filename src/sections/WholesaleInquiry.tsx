import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface WholesaleInquiryProps {
  headline?: string;
  subheadline?: string;
  cta?: string;
}

const WholesaleInquiry: React.FC<WholesaleInquiryProps> = ({
  headline = 'Wholesale Partnerships',
  subheadline = 'Interested in carrying our products in your store? Fill out the form below and our B2B team will get back to you within 48 hours.',
  cta = 'Submit Inquiry',
}) => {
  return (
    <section
      data-section="wholesale-inquiry"
      data-ai-category="commerce"
      data-ai-context="b2b-wholesale-inquiry"
      className="py-24 px-4 md:px-8 bg-gray-50"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            {headline}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">{subheadline}</p>
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-white border border-gray-100 rounded-lg p-8 md:p-10 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Your Business Inc."
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                placeholder="Jane Smith"
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="jane@yourbusiness.com"
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Phone
              </label>
              <input
                type="tel"
                placeholder="(555) 000-0000"
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Order Volume
            </label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-gray-500 focus:outline-none focus:border-gray-400 transition-colors">
              <option>Select estimated monthly volume</option>
              <option>Under $1,000</option>
              <option>$1,000 – $5,000</option>
              <option>$5,000 – $25,000</option>
              <option>$25,000+</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your store and which products you're interested in..."
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest rounded hover:bg-gray-800 transition-colors"
          >
            {cta}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WholesaleInquiry;
