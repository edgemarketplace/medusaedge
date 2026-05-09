"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface Step {
     6|  title: string;
     7|  description: string;
     8|}
     9|
    10|interface ProcessTimelineProps {
    11|  headline?: string;
    12|  steps?: Step[];
    13|}
    14|
    15|const defaultSteps: Step[] = [
    16|  {
    17|    title: 'Discover',
    18|    description: 'Browse our services and choose what fits your needs.',
    19|  },
    20|  {
    21|    title: 'Book',
    22|    description: 'Select a time slot and secure your appointment instantly.',
    23|  },
    24|  {
    25|    title: 'Experience',
    26|    description: 'Arrive and enjoy a personalized, premium treatment.',
    27|  },
    28|  {
    29|    title: 'Glow',
    30|    description: 'Walk out refreshed with a personalized aftercare plan.',
    31|  },
    32|];
    33|
    34|const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
    35|  headline = 'How It Works',
    36|  steps = defaultSteps,
    37|}) => {
    38|  return (
    39|    <section
    40|      data-section="process-timeline"
    41|      data-ai-category="content"
    42|      data-ai-context="step-by-step-process"
    43|      className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
    44|    >
    45|      <motion.h2
    46|        variants={fadeIn}
    47|        initial="initial"
    48|        whileInView="animate"
    49|        viewport={{ once: true, amount: 0.5 }}
    50|        className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-20"
    51|      >
    52|        {headline}
    53|      </motion.h2>
    54|
    55|      <div className="relative">
    56|        {/* Connecting line */}
    57|        <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gray-200" />
    58|
    59|        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    60|          {steps.map((step, i) => (
    61|            <motion.div
    62|              key={i}
    63|              variants={slideUp}
    64|              initial="initial"
    65|              whileInView="animate"
    66|              viewport={{ once: true, amount: 0.3 }}
    67|              transition={{ delay: i * 0.15 }}
    68|              className="relative text-center"
    69|            >
    70|              {/* Step number circle */}
    71|              <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 text-white text-xl font-black mb-6">
    72|                {i + 1}
    73|              </div>
    74|
    75|              <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
    76|              <p className="text-sm text-gray-500 leading-relaxed max-w-[220px] mx-auto">
    77|                {step.description}
    78|              </p>
    79|            </motion.div>
    80|          ))}
    81|        </div>
    82|      </div>
    83|    </section>
    84|  );
    85|};
    86|
    87|export default ProcessTimeline;
    88|