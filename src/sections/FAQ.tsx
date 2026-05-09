"use client"

     1|import React, { useState } from 'react';
     2|import { motion, AnimatePresence } from 'framer-motion';
     3|import { slideUp, staggerContainer } from '@/motion/presets';
     4|
     5|interface QAItem {
     6|  question: string;
     7|  answer: string;
     8|}
     9|
    10|interface FAQProps {
    11|  headline?: string;
    12|  questions?: QAItem[];
    13|}
    14|
    15|const defaultQuestions: QAItem[] = [
    16|  {
    17|    question: 'What is your return policy?',
    18|    answer:
    19|      'You can return any unused item within 30 days of delivery for a full refund. Simply initiate the return from your account dashboard and we will provide a prepaid return label.',
    20|  },
    21|  {
    22|    question: 'How long does shipping take?',
    23|    answer:
    24|      'Standard shipping takes 5-7 business days within the continental US. Express shipping (2-3 days) and overnight options are available at checkout.',
    25|  },
    26|  {
    27|    question: 'Do you offer international shipping?',
    28|    answer:
    29|      'Yes, we ship to over 50 countries worldwide. International shipping rates are calculated at checkout based on destination and package weight.',
    30|  },
    31|  {
    32|    question: 'Can I change or cancel my order?',
    33|    answer:
    34|      'Orders can be modified or cancelled within 1 hour of placement. After that window, you can still return items once they arrive using our standard return process.',
    35|  },
    36|  {
    37|    question: 'Are your products ethically sourced?',
    38|    answer:
    39|      'Absolutely. We partner exclusively with suppliers who meet our rigorous standards for fair labor practices, environmental sustainability, and animal welfare.',
    40|  },
    41|];
    42|
    43|const FAQ: React.FC<FAQProps> = ({
    44|  headline = 'Frequently Asked Questions',
    45|  questions = defaultQuestions,
    46|}) => {
    47|  const [openIndex, setOpenIndex] = useState<number | null>(null);
    48|
    49|  const toggle = (i: number) => {
    50|    setOpenIndex((prev) => (prev === i ? null : i));
    51|  };
    52|
    53|  return (
    54|    <section
    55|      data-ai-section="faq"
    56|      data-ai-category="content"
    57|      data-ai-label="FAQ"
    58|      data-ai-editable-fields="headline,questions"
    59|      className="py-20 px-4 md:px-8"
    60|    >
    61|      <div className="max-w-2xl mx-auto">
    62|        <motion.h2
    63|          variants={slideUp}
    64|          initial="initial"
    65|          whileInView="animate"
    66|          viewport={{ once: true, amount: 0.5 }}
    67|          className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-14"
    68|        >
    69|          {headline}
    70|        </motion.h2>
    71|
    72|        <motion.div
    73|          variants={staggerContainer}
    74|          initial="initial"
    75|          whileInView="animate"
    76|          viewport={{ once: true, amount: 0.1 }}
    77|          className="space-y-3"
    78|        >
    79|          {questions.map((qa, i) => {
    80|            const isOpen = openIndex === i;
    81|            return (
    82|              <motion.div
    83|                key={i}
    84|                variants={slideUp}
    85|                data-ai-faq-item={i}
    86|                className="border border-gray-200 rounded-xl overflow-hidden"
    87|              >
    88|                <button
    89|                  onClick={() => toggle(i)}
    90|                  className="w-full flex justify-between items-center px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
    91|                >
    92|                  <span className="font-bold text-sm pr-4 text-gray-900">
    93|                    {qa.question}
    94|                  </span>
    95|                  <motion.span
    96|                    animate={{ rotate: isOpen ? 45 : 0 }}
    97|                    transition={{ duration: 0.25 }}
    98|                    className="text-xl text-gray-400 flex-shrink-0"
    99|                  >
   100|                    +
   101|                  </motion.span>
   102|                </button>
   103|
   104|                <AnimatePresence initial={false}>
   105|                  {isOpen && (
   106|                    <motion.div
   107|                      key="content"
   108|                      initial={{ height: 0, opacity: 0 }}
   109|                      animate={{ height: 'auto', opacity: 1 }}
   110|                      exit={{ height: 0, opacity: 0 }}
   111|                      transition={{ duration: 0.3, ease: 'easeInOut' }}
   112|                      className="overflow-hidden"
   113|                    >
   114|                      <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
   115|                        {qa.answer}
   116|                      </p>
   117|                    </motion.div>
   118|                  )}
   119|                </AnimatePresence>
   120|              </motion.div>
   121|            );
   122|          })}
   123|        </motion.div>
   124|      </div>
   125|    </section>
   126|  );
   127|};
   128|
   129|export default FAQ;
   130|