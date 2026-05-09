"use client"

     1|import React, { useRef, useState, useEffect } from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp } from '@/motion/presets';
     4|
     5|interface Testimonial {
     6|  quote: string;
     7|  name: string;
     8|  role: string;
     9|}
    10|
    11|interface TestimonialSliderProps {
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
    49|const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
    50|  headline = 'Loved by Thousands',
    51|  testimonials = defaultTestimonials,
    52|}) => {
    53|  const scrollRef = useRef<HTMLDivElement>(null);
    54|  const [canScrollLeft, setCanScrollLeft] = useState(false);
    55|  const [canScrollRight, setCanScrollRight] = useState(true);
    56|
    57|  const checkScroll = () => {
    58|    const el = scrollRef.current;
    59|    if (!el) return;
    60|    setCanScrollLeft(el.scrollLeft > 10);
    61|    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    62|  };
    63|
    64|  useEffect(() => {
    65|    const el = scrollRef.current;
    66|    if (!el) return;
    67|    checkScroll();
    68|    el.addEventListener('scroll', checkScroll, { passive: true });
    69|    return () => el.removeEventListener('scroll', checkScroll);
    70|  }, []);
    71|
    72|  const scroll = (direction: 'left' | 'right') => {
    73|    const el = scrollRef.current;
    74|    if (!el) return;
    75|    const scrollAmount = 340;
    76|    el.scrollBy({
    77|      left: direction === 'left' ? -scrollAmount : scrollAmount,
    78|      behavior: 'smooth',
    79|    });
    80|  };
    81|
    82|  return (
    83|    <section
    84|      data-section="testimonial-slider"
    85|      data-ai-section="testimonial-slider"
    86|      data-ai-category="social"
    87|      data-ai-label="Testimonial Slider"
    88|      data-ai-editable-fields="headline,testimonials"
    89|      className="py-20 md:py-28 px-4 md:px-8 bg-white overflow-hidden"
    90|    >
    91|      <div className="max-w-7xl mx-auto">
    92|        <motion.h2
    93|          variants={slideUp}
    94|          initial="initial"
    95|          whileInView="animate"
    96|          viewport={{ once: true, amount: 0.5 }}
    97|          className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-14 text-zinc-900"
    98|        >
    99|          {headline}
   100|        </motion.h2>
   101|
   102|        {/* Carousel Container */}
   103|        <div className="relative">
   104|          {/* Left Arrow */}
   105|          <button
   106|            onClick={() => scroll('left')}
   107|            disabled={!canScrollLeft}
   108|            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all ${
   109|              canScrollLeft
   110|                ? 'opacity-100 hover:bg-gray-50 cursor-pointer'
   111|                : 'opacity-0 cursor-default pointer-events-none'
   112|            }`}
   113|            aria-label="Scroll left"
   114|          >
   115|            <svg
   116|              xmlns="http://www.w3.org/2000/svg"
   117|              className="h-5 w-5 text-zinc-700"
   118|              fill="none"
   119|              viewBox="0 0 24 24"
   120|              stroke="currentColor"
   121|              strokeWidth={2}
   122|            >
   123|              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
   124|            </svg>
   125|          </button>
   126|
   127|          {/* Scrollable Track */}
   128|          <div
   129|            ref={scrollRef}
   130|            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
   131|            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
   132|          >
   133|            {testimonials.map((t, i) => (
   134|              <motion.blockquote
   135|                key={i}
   136|                initial={{ opacity: 0, y: 20 }}
   137|                whileInView={{ opacity: 1, y: 0 }}
   138|                viewport={{ once: true, amount: 0.3 }}
   139|                transition={{ delay: i * 0.05, duration: 0.4 }}
   140|                data-ai-testimonial-item={i}
   141|                className="flex-shrink-0 w-[300px] md:w-[340px] snap-start bg-stone-50 rounded-2xl p-6 md:p-8 border border-gray-100 flex flex-col justify-between"
   142|              >
   143|                {/* Stars */}
   144|                <div className="flex gap-1 mb-4 text-amber-400">
   145|                  {[...Array(5)].map((_, s) => (
   146|                    <svg
   147|                      key={s}
   148|                      xmlns="http://www.w3.org/2000/svg"
   149|                      className="h-4 w-4 fill-current"
   150|                      viewBox="0 0 20 20"
   151|                    >
   152|                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
   153|                    </svg>
   154|                  ))}
   155|                </div>
   156|
   157|                <p className="text-sm text-zinc-600 leading-relaxed mb-6 flex-1">
   158|                  &ldquo;{t.quote}&rdquo;
   159|                </p>
   160|
   161|                <footer>
   162|                  <div className="h-px w-8 bg-zinc-300 mb-3" />
   163|                  <cite className="not-italic">
   164|                    <span className="block text-sm font-bold text-zinc-900">
   165|                      {t.name}
   166|                    </span>
   167|                    <span className="block text-xs text-zinc-400 mt-0.5">
   168|                      {t.role}
   169|                    </span>
   170|                  </cite>
   171|                </footer>
   172|              </motion.blockquote>
   173|            ))}
   174|          </div>
   175|
   176|          {/* Right Arrow */}
   177|          <button
   178|            onClick={() => scroll('right')}
   179|            disabled={!canScrollRight}
   180|            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all ${
   181|              canScrollRight
   182|                ? 'opacity-100 hover:bg-gray-50 cursor-pointer'
   183|                : 'opacity-0 cursor-default pointer-events-none'
   184|            }`}
   185|            aria-label="Scroll right"
   186|          >
   187|            <svg
   188|              xmlns="http://www.w3.org/2000/svg"
   189|              className="h-5 w-5 text-zinc-700"
   190|              fill="none"
   191|              viewBox="0 0 24 24"
   192|              stroke="currentColor"
   193|              strokeWidth={2}
   194|            >
   195|              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
   196|            </svg>
   197|          </button>
   198|        </div>
   199|
   200|        {/* Dots indicator */}
   201|        <div className="flex justify-center gap-2 mt-8">
   202|          {testimonials.map((_, i) => (
   203|            <button
   204|              key={i}
   205|              onClick={() => {
   206|                const el = scrollRef.current;
   207|                if (el) {
   208|                  const card = el.children[i] as HTMLElement;
   209|                  card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
   210|                }
   211|              }}
   212|              className="w-2 h-2 rounded-full bg-zinc-300 hover:bg-zinc-500 transition-colors"
   213|              aria-label={`Go to testimonial ${i + 1}`}
   214|            />
   215|          ))}
   216|        </div>
   217|      </div>
   218|    </section>
   219|  );
   220|};
   221|
   222|export default TestimonialSlider;
   223|