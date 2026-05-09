"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface HeroCenteredProps {
     6|  headline?: string;
     7|  subheadline?: string;
     8|  cta?: string;
     9|  secondaryCta?: string;
    10|  backgroundImage?: string;
    11|}
    12|
    13|const HeroCentered: React.FC<HeroCenteredProps> = ({
    14|  headline = 'Style Meets Substance',
    15|  subheadline = 'Timeless pieces crafted for the modern individual.',
    16|  cta = 'Explore Collection',
    17|  secondaryCta,
    18|  backgroundImage = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000',
    19|}) => {
    20|  return (
    21|    <section
    22|      data-section="hero-centered"
    23|      data-ai-section="hero-centered"
    24|      data-ai-category="hero"
    25|      data-ai-label="Hero Centered"
    26|      data-ai-editable-fields="headline,subheadline,cta,secondaryCta,backgroundImage"
    27|      className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-zinc-900"
    28|    >
    29|      {/* Background Image */}
    30|      <motion.img
    31|        initial={{ scale: 1.1, opacity: 0 }}
    32|        animate={{ scale: 1, opacity: 0.6 }}
    33|        transition={{ duration: 1.5, ease: 'easeOut' }}
    34|        src={backgroundImage}
    35|        alt="Hero Background"
    36|        className="absolute inset-0 w-full h-full object-cover object-center"
    37|      />
    38|
    39|      {/* Dark Overlay */}
    40|      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
    41|
    42|      {/* Content */}
    43|      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
    44|        <motion.h1
    45|          variants={slideUp}
    46|          initial="initial"
    47|          animate="animate"
    48|          className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6"
    49|        >
    50|          {headline}
    51|        </motion.h1>
    52|
    53|        <motion.p
    54|          variants={fadeIn}
    55|          initial="initial"
    56|          animate="animate"
    57|          transition={{ delay: 0.3 }}
    58|          className="text-lg md:text-2xl font-light tracking-wide mb-10 max-w-2xl mx-auto opacity-90"
    59|        >
    60|          {subheadline}
    61|        </motion.p>
    62|
    63|        <motion.div
    64|          variants={slideUp}
    65|          initial="initial"
    66|          animate="animate"
    67|          transition={{ delay: 0.5 }}
    68|          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
    69|        >
    70|          <a
    71|            href="#"
    72|            className="inline-block bg-white text-zinc-900 px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors"
    73|          >
    74|            {cta}
    75|          </a>
    76|
    77|          {secondaryCta && (
    78|            <a
    79|              href="#"
    80|              className="inline-block border-2 border-white text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-colors"
    81|            >
    82|              {secondaryCta}
    83|            </a>
    84|          )}
    85|        </motion.div>
    86|      </div>
    87|    </section>
    88|  );
    89|};
    90|
    91|export default HeroCentered;
    92|