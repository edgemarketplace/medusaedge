import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface HeroBookingProps {
  headline?: string;
  subheadline?: string;
  primaryCta?: string;
  secondaryCta?: string;
  backgroundImage?: string;
}

const HeroBooking: React.FC<HeroBookingProps> = ({
  headline = 'Your Transformation Starts Here',
  subheadline = 'Book a complimentary consultation or browse our curated collection.',
  primaryCta = 'Book Appointment',
  secondaryCta = 'Shop Products',
  backgroundImage = 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80&w=2000',
}) => {
  return (
    <section
      data-section="hero-booking"
      data-ai-section="hero-booking"
      data-ai-category="hero"
      data-ai-label="Hero Booking"
      data-ai-editable-fields="headline,subheadline,primaryCta,secondaryCta,backgroundImage"
      className="relative h-[90vh] min-h-[650px] flex items-center overflow-hidden bg-stone-800"
    >
      {/* Background Image */}
      <motion.img
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.55 }}
        transition={{ duration: 1.2 }}
        src={backgroundImage}
        alt="Booking Hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-xl">
          <motion.h1
            variants={slideUp}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-white mb-6"
          >
            {headline}
          </motion.h1>

          <motion.p
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl font-light text-white/80 tracking-wide mb-10 leading-relaxed"
          >
            {subheadline}
          </motion.p>

          <motion.div
            variants={slideUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Primary CTA — booking */}
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-zinc-900 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 group-hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {primaryCta}
            </a>

            {/* Secondary CTA — shopping */}
            <a
              href="#"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 group-hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {secondaryCta}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBooking;
