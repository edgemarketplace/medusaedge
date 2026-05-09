import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface CountdownBannerProps {
  headline?: string;
  endDate?: string; // ISO date string
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calcTimeLeft = (endDate: string): TimeLeft => {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n: number): string => String(n).padStart(2, '0');

const CountdownBanner: React.FC<CountdownBannerProps> = ({
  headline = 'Flash Sale Ends In',
  endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  const expired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <section
      data-ai-section="countdown-banner"
      data-ai-category="promotional"
      data-ai-label="Countdown Banner"
      data-ai-editable-fields="headline,endDate"
      className="py-16 px-4 md:px-8 bg-gradient-to-r from-red-600 to-orange-500 text-white"
    >
      <motion.div
        variants={slideUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">
          {headline}
        </h2>

        {expired ? (
          <motion.p
            variants={fadeIn}
            className="text-2xl font-bold"
          >
            Sale Ended
          </motion.p>
        ) : (
          <motion.div
            variants={fadeIn}
            className="flex justify-center gap-4 md:gap-6"
          >
            {([
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ] as const).map((unit) => (
              <div
                key={unit.label}
                data-ai-countdown-unit={unit.label.toLowerCase()}
                className="flex flex-col items-center"
              >
                <span className="text-4xl md:text-6xl font-black tabular-nums bg-white/20 rounded-lg px-4 py-3 min-w-[80px] md:min-w-[100px]">
                  {pad(unit.value)}
                </span>
                <span className="text-xs md:text-sm uppercase tracking-widest mt-2 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        <motion.a
          variants={slideUp}
          href="#"
          className="inline-block mt-10 bg-white text-red-600 px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-gray-100 transition-colors"
        >
          Shop the Sale
        </motion.a>
      </motion.div>
    </section>
  );
};

export default CountdownBanner;
