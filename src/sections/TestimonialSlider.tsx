"use client"

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '@/motion/presets';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialSliderProps {
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

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  headline = 'Loved by Thousands',
  testimonials = defaultTestimonials,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 340;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      data-section="testimonial-slider"
      data-ai-section="testimonial-slider"
      data-ai-category="social"
      data-ai-label="Testimonial Slider"
      data-ai-editable-fields="headline,testimonials"
      className="py-20 md:py-28 px-4 md:px-8 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-14 text-zinc-900"
        >
          {headline}
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'opacity-100 hover:bg-gray-50 cursor-pointer'
                : 'opacity-0 cursor-default pointer-events-none'
            }`}
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-zinc-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                data-ai-testimonial-item={i}
                className="flex-shrink-0 w-[300px] md:w-[340px] snap-start bg-stone-50 rounded-2xl p-6 md:p-8 border border-gray-100 flex flex-col justify-between"
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

                <p className="text-sm text-zinc-600 leading-relaxed mb-6 flex-1">
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
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all ${
              canScrollRight
                ? 'opacity-100 hover:bg-gray-50 cursor-pointer'
                : 'opacity-0 cursor-default pointer-events-none'
            }`}
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-zinc-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (el) {
                  const card = el.children[i] as HTMLElement;
                  card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
              }}
              className="w-2 h-2 rounded-full bg-zinc-300 hover:bg-zinc-500 transition-colors"
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
