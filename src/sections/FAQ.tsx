import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideUp, staggerContainer } from '@/motion/presets';

interface QAItem {
  question: string;
  answer: string;
}

interface FAQProps {
  headline?: string;
  questions?: QAItem[];
}

const defaultQuestions: QAItem[] = [
  {
    question: 'What is your return policy?',
    answer:
      'You can return any unused item within 30 days of delivery for a full refund. Simply initiate the return from your account dashboard and we will provide a prepaid return label.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 5-7 business days within the continental US. Express shipping (2-3 days) and overnight options are available at checkout.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship to over 50 countries worldwide. International shipping rates are calculated at checkout based on destination and package weight.',
  },
  {
    question: 'Can I change or cancel my order?',
    answer:
      'Orders can be modified or cancelled within 1 hour of placement. After that window, you can still return items once they arrive using our standard return process.',
  },
  {
    question: 'Are your products ethically sourced?',
    answer:
      'Absolutely. We partner exclusively with suppliers who meet our rigorous standards for fair labor practices, environmental sustainability, and animal welfare.',
  },
];

const FAQ: React.FC<FAQProps> = ({
  headline = 'Frequently Asked Questions',
  questions = defaultQuestions,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      data-ai-section="faq"
      data-ai-category="content"
      data-ai-label="FAQ"
      data-ai-editable-fields="headline,questions"
      className="py-20 px-4 md:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.h2
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-14"
        >
          {headline}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-3"
        >
          {questions.map((qa, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                variants={slideUp}
                data-ai-faq-item={i}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-sm pr-4 text-gray-900">
                    {qa.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-xl text-gray-400 flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                        {qa.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
