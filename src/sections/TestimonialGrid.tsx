import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '@/motion/presets';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialGridProps {
  headline?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: 'Absolutely love the quality and fit. My new go-to brand for everyday essentials.',
    name: 'Sarah Chen',
    role: 'Verified Buyer',
  },
  {
    quote: 'The attention to detail is unmatched. Every piece feels like it was made just for me.',
    name: 'Marcus Rivera',
    role: 'Fashion Editor',
  },
  {
    quote: 'Finally, a brand that understands sustainable fashion without compromising on style.',
    name: 'Emma Williams',
    role: 'Loyal Customer',
  },
  {
    quote: 'From the packaging to the product, everything exceeded my expectations.',
    name: 'James Park',
    role: 'Verified Buyer',
  },
  {
    quote: 'Their customer service is incredible. Had an issue and they resolved it in hours.',
    name: 'Olivia Taylor',
    role: 'First-Time Buyer',
  },
  {
    quote: 'I get compliments every time I wear their pieces. Timeless and elegant design.',
    name: 'David Kim',
    role: 'Style Influencer',
  },
];

const TestimonialGrid: React.FC<TestimonialGridProps> = ({
  headline = 'What Our Customers Say',
  testimonials = defaultTestimonials,
}) => {
  return (
    <section
      data-section="testimonial-grid"
      data-ai-section="testimonial-grid"
      data-ai-category="social"
      data-ai-label="Testimonial Grid"
      data-ai-editable-fields="headline,testimonials"
      className="py-20 md:py-28 px-4 md:px-8 bg-stone-50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-14 text-zinc-900"
        >
          {headline}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              variants={slideUp}
              data-ai-testimonial-item={i}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, s) => (
                  <svg
                    key={s}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <footer>
                <div className="h-px w-8 bg-zinc-300 mb-3" />
                <cite className="not-italic">
                  <span className="block text-sm font-bold text-zinc-900">
                    {t.name}
                  </span>
                  <span className="block text-xs text-zinc-400 mt-0.5">
                    {t.role}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialGrid;
