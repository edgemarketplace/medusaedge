import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface Step {
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  headline?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    title: 'Discover',
    description: 'Browse our services and choose what fits your needs.',
  },
  {
    title: 'Book',
    description: 'Select a time slot and secure your appointment instantly.',
  },
  {
    title: 'Experience',
    description: 'Arrive and enjoy a personalized, premium treatment.',
  },
  {
    title: 'Glow',
    description: 'Walk out refreshed with a personalized aftercare plan.',
  },
];

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  headline = 'How It Works',
  steps = defaultSteps,
}) => {
  return (
    <section
      data-section="process-timeline"
      data-ai-category="content"
      data-ai-context="step-by-step-process"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <motion.h2
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-20"
      >
        {headline}
      </motion.h2>

      <div className="relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={slideUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Step number circle */}
              <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 text-white text-xl font-black mb-6">
                {i + 1}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[220px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
