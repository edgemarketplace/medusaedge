"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, staggerContainer } from '@/motion/presets';
     4|
     5|interface Testimonial {
     6|  quote: string;
     7|  name: string;
     8|  role: string;
     9|}
    10|
    11|interface TestimonialGridProps {
    12|  headline?: string;
    13|  testimonials?: Testimonial[];
    14|}
    15|
    16|const defaultTestimonials: Testimonial[] = [
    17|  {
    18|    quote: 'Absolutely love the quality and fit. My new go-to brand for everyday essentials.',
    19|    name: 'Sarah Chen',
    20|    role: 'Verified Buyer',
    21|  },
    22|  {
    23|    quote: 'The attention to detail is unmatched. Every piece feels like it was made just for me.',
    24|    name: 'Marcus Rivera',
    25|    role: 'Fashion Editor',
    26|  },
    27|  {
    28|    quote: 'Finally, a brand that understands sustainable fashion without compromising on style.',
    29|    name: 'Emma Williams',
    30|    role: 'Loyal Customer',
    31|  },
    32|  {
    33|    quote: 'From the packaging to the product, everything exceeded my expectations.',
    34|    name: 'James Park',
    35|    role: 'Verified Buyer',
    36|  },
    37|  {
    38|    quote: 'Their customer service is incredible. Had an issue and they resolved it in hours.',
    39|    name: 'Olivia Taylor',
    40|    role: 'First-Time Buyer',
    41|  },
    42|  {
    43|    quote: 'I get compliments every time I wear their pieces. Timeless and elegant design.',
    44|    name: 'David Kim',
    45|    role: 'Style Influencer',
    46|  },
    47|];
    48|
    49|const TestimonialGrid: React.FC<TestimonialGridProps> = ({
    50|  headline = 'What Our Customers Say',
    51|  testimonials = defaultTestimonials,
    52|}) => {
    53|  return (
    54|    <section
    55|      data-section="testimonial-grid"
    56|      data-ai-section="testimonial-grid"
    57|      data-ai-category="social"
    58|      data-ai-label="Testimonial Grid"
    59|      data-ai-editable-fields="headline,testimonials"
    60|      className="py-20 md:py-28 px-4 md:px-8 bg-stone-50"
    61|    >
    62|      <div className="max-w-6xl mx-auto">
    63|        <motion.h2
    64|          variants={slideUp}
    65|          initial="initial"
    66|          whileInView="animate"
    67|          viewport={{ once: true, amount: 0.5 }}
    68|          className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-14 text-zinc-900"
    69|        >
    70|          {headline}
    71|        </motion.h2>
    72|
    73|        <motion.div
    74|          variants={staggerContainer}
    75|          initial="initial"
    76|          whileInView="animate"
    77|          viewport={{ once: true, amount: 0.1 }}
    78|          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    79|        >
    80|          {testimonials.map((t, i) => (
    81|            <motion.blockquote
    82|              key={i}
    83|              variants={slideUp}
    84|              data-ai-testimonial-item={i}
    85|              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
    86|            >
    87|              {/* Stars */}
    88|              <div className="flex gap-1 mb-4 text-amber-400">
    89|                {[...Array(5)].map((_, s) => (
    90|                  <svg
    91|                    key={s}
    92|                    xmlns="http://www.w3.org/2000/svg"
    93|                    className="h-4 w-4 fill-current"
    94|                    viewBox="0 0 20 20"
    95|                  >
    96|                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    97|                  </svg>
    98|                ))}
    99|              </div>
   100|
   101|              <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-6 flex-1">
   102|                &ldquo;{t.quote}&rdquo;
   103|              </p>
   104|
   105|              <footer>
   106|                <div className="h-px w-8 bg-zinc-300 mb-3" />
   107|                <cite className="not-italic">
   108|                  <span className="block text-sm font-bold text-zinc-900">
   109|                    {t.name}
   110|                  </span>
   111|                  <span className="block text-xs text-zinc-400 mt-0.5">
   112|                    {t.role}
   113|                  </span>
   114|                </cite>
   115|              </footer>
   116|            </motion.blockquote>
   117|          ))}
   118|        </motion.div>
   119|      </div>
   120|    </section>
   121|  );
   122|};
   123|
   124|export default TestimonialGrid;
   125|