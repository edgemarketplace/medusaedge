"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface HeroBookingProps {
     6|  headline?: string;
     7|  subheadline?: string;
     8|  primaryCta?: string;
     9|  secondaryCta?: string;
    10|  backgroundImage?: string;
    11|}
    12|
    13|const HeroBooking: React.FC<HeroBookingProps> = ({
    14|  headline = 'Your Transformation Starts Here',
    15|  subheadline = 'Book a complimentary consultation or browse our curated collection.',
    16|  primaryCta = 'Book Appointment',
    17|  secondaryCta = 'Shop Products',
    18|  backgroundImage = 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80&w=2000',
    19|}) => {
    20|  return (
    21|    <section
    22|      data-section="hero-booking"
    23|      data-ai-section="hero-booking"
    24|      data-ai-category="hero"
    25|      data-ai-label="Hero Booking"
    26|      data-ai-editable-fields="headline,subheadline,primaryCta,secondaryCta,backgroundImage"
    27|      className="relative h-[90vh] min-h-[650px] flex items-center overflow-hidden bg-stone-800"
    28|    >
    29|      {/* Background Image */}
    30|      <motion.img
    31|        initial={{ scale: 1.05, opacity: 0 }}
    32|        animate={{ scale: 1, opacity: 0.55 }}
    33|        transition={{ duration: 1.2 }}
    34|        src={backgroundImage}
    35|        alt="Booking Hero"
    36|        className="absolute inset-0 w-full h-full object-cover object-center"
    37|      />
    38|
    39|      {/* Gradient Overlay */}
    40|      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
    41|
    42|      {/* Content */}
    43|      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
    44|        <div className="max-w-xl">
    45|          <motion.h1
    46|            variants={slideUp}
    47|            initial="initial"
    48|            animate="animate"
    49|            className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-white mb-6"
    50|          >
    51|            {headline}
    52|          </motion.h1>
    53|
    54|          <motion.p
    55|            variants={fadeIn}
    56|            initial="initial"
    57|            animate="animate"
    58|            transition={{ delay: 0.3 }}
    59|            className="text-lg md:text-xl font-light text-white/80 tracking-wide mb-10 leading-relaxed"
    60|          >
    61|            {subheadline}
    62|          </motion.p>
    63|
    64|          <motion.div
    65|            variants={slideUp}
    66|            initial="initial"
    67|            animate="animate"
    68|            transition={{ delay: 0.5 }}
    69|            className="flex flex-col sm:flex-row gap-4"
    70|          >
    71|            {/* Primary CTA — booking */}
    72|            <a
    73|              href="#"
    74|              className="inline-flex items-center gap-2 bg-white text-zinc-900 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors group"
    75|            >
    76|              <svg
    77|                xmlns="http://www.w3.org/2000/svg"
    78|                className="h-4 w-4 group-hover:scale-110 transition-transform"
    79|                fill="none"
    80|                viewBox="0 0 24 24"
    81|                stroke="currentColor"
    82|                strokeWidth={2}
    83|              >
    84|                <path
    85|                  strokeLinecap="round"
    86|                  strokeLinejoin="round"
    87|                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    88|                />
    89|              </svg>
    90|              {primaryCta}
    91|            </a>
    92|
    93|            {/* Secondary CTA — shopping */}
    94|            <a
    95|              href="#"
    96|              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-colors group"
    97|            >
    98|              <svg
    99|                xmlns="http://www.w3.org/2000/svg"
   100|                className="h-4 w-4 group-hover:scale-110 transition-transform"
   101|                fill="none"
   102|                viewBox="0 0 24 24"
   103|                stroke="currentColor"
   104|                strokeWidth={2}
   105|              >
   106|                <path
   107|                  strokeLinecap="round"
   108|                  strokeLinejoin="round"
   109|                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
   110|                />
   111|              </svg>
   112|              {secondaryCta}
   113|            </a>
   114|          </motion.div>
   115|        </div>
   116|      </div>
   117|    </section>
   118|  );
   119|};
   120|
   121|export default HeroBooking;
   122|