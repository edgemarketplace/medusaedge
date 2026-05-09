"use client"

     1|import React, { useState, useEffect } from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface CountdownBannerProps {
     6|  headline?: string;
     7|  endDate?: string; // ISO date string
     8|}
     9|
    10|interface TimeLeft {
    11|  days: number;
    12|  hours: number;
    13|  minutes: number;
    14|  seconds: number;
    15|}
    16|
    17|const calcTimeLeft = (endDate: string): TimeLeft => {
    18|  const diff = new Date(endDate).getTime() - Date.now();
    19|  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    20|  return {
    21|    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    22|    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    23|    minutes: Math.floor((diff / (1000 * 60)) % 60),
    24|    seconds: Math.floor((diff / 1000) % 60),
    25|  };
    26|};
    27|
    28|const pad = (n: number): string => String(n).padStart(2, '0');
    29|
    30|const CountdownBanner: React.FC<CountdownBannerProps> = ({
    31|  headline = 'Flash Sale Ends In',
    32|  endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    33|}) => {
    34|  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(endDate));
    35|
    36|  useEffect(() => {
    37|    const timer = setInterval(() => {
    38|      setTimeLeft(calcTimeLeft(endDate));
    39|    }, 1000);
    40|    return () => clearInterval(timer);
    41|  }, [endDate]);
    42|
    43|  const expired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
    44|
    45|  return (
    46|    <section
    47|      data-ai-section="countdown-banner"
    48|      data-ai-category="promotional"
    49|      data-ai-label="Countdown Banner"
    50|      data-ai-editable-fields="headline,endDate"
    51|      className="py-16 px-4 md:px-8 bg-gradient-to-r from-red-600 to-orange-500 text-white"
    52|    >
    53|      <motion.div
    54|        variants={slideUp}
    55|        initial="initial"
    56|        whileInView="animate"
    57|        viewport={{ once: true, amount: 0.5 }}
    58|        className="max-w-3xl mx-auto text-center"
    59|      >
    60|        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">
    61|          {headline}
    62|        </h2>
    63|
    64|        {expired ? (
    65|          <motion.p
    66|            variants={fadeIn}
    67|            className="text-2xl font-bold"
    68|          >
    69|            Sale Ended
    70|          </motion.p>
    71|        ) : (
    72|          <motion.div
    73|            variants={fadeIn}
    74|            className="flex justify-center gap-4 md:gap-6"
    75|          >
    76|            {([
    77|              { label: 'Days', value: timeLeft.days },
    78|              { label: 'Hours', value: timeLeft.hours },
    79|              { label: 'Mins', value: timeLeft.minutes },
    80|              { label: 'Secs', value: timeLeft.seconds },
    81|            ] as const).map((unit) => (
    82|              <div
    83|                key={unit.label}
    84|                data-ai-countdown-unit={unit.label.toLowerCase()}
    85|                className="flex flex-col items-center"
    86|              >
    87|                <span className="text-4xl md:text-6xl font-black tabular-nums bg-white/20 rounded-lg px-4 py-3 min-w-[80px] md:min-w-[100px]">
    88|                  {pad(unit.value)}
    89|                </span>
    90|                <span className="text-xs md:text-sm uppercase tracking-widest mt-2 font-medium">
    91|                  {unit.label}
    92|                </span>
    93|              </div>
    94|            ))}
    95|          </motion.div>
    96|        )}
    97|
    98|        <motion.a
    99|          variants={slideUp}
   100|          href="#"
   101|          className="inline-block mt-10 bg-white text-red-600 px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-gray-100 transition-colors"
   102|        >
   103|          Shop the Sale
   104|        </motion.a>
   105|      </motion.div>
   106|    </section>
   107|  );
   108|};
   109|
   110|export default CountdownBanner;
   111|