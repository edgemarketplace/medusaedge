import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface BookingCTAProps {
  headline?: string;
  subheadline?: string;
  cta?: string;
}

const BookingCTA: React.FC<BookingCTAProps> = ({
  headline = 'Ready to Book Your Appointment?',
  subheadline = 'Select your preferred service, date, and time. We will confirm within minutes.',
  cta = 'Schedule Now',
}) => {
  return (
    <section
      data-section="booking-cta"
      data-ai-category="booking"
      data-ai-context="booking-call-to-action"
      className="relative bg-gray-900 py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* Background decorative element */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 border border-white/20 rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] border border-white/10 rounded-full" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6"
        >
          {headline}
        </motion.h2>

        <motion.p
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-lg leading-relaxed mb-10"
        >
          {subheadline}
        </motion.p>

        {/* Form fields hint */}
        <motion.div
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <div className="flex-1 max-w-xs mx-auto sm:mx-0">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>
          <div className="flex-1 max-w-xs mx-auto sm:mx-0">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>
        </motion.div>

        <motion.button
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
          className="inline-block bg-white text-gray-900 px-10 py-4 text-sm font-bold uppercase tracking-widest rounded hover:bg-gray-100 transition-colors"
        >
          {cta}
        </motion.button>
      </div>
    </section>
  );
};

export default BookingCTA;
