import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface Event {
  name: string;
  date: string;
  location: string;
  description: string;
}

interface EventCalendarProps {
  headline?: string;
  events?: Event[];
}

const defaultEvents: Event[] = [
  {
    name: 'Summer Solstice Wellness Retreat',
    date: 'June 21, 2026',
    location: 'Serenity Gardens, New York',
    description: 'A full-day immersive experience with yoga, meditation, and organic cuisine.',
  },
  {
    name: 'Skincare Masterclass',
    date: 'July 12, 2026',
    location: 'Flagship Studio, New York',
    description: 'Learn professional techniques from our lead estheticians. All products provided.',
  },
  {
    name: 'Members-Only Open House',
    date: 'August 5, 2026',
    location: 'Private Lounge, New York',
    description: 'Exclusive preview of our fall collection with complimentary treatments.',
  },
  {
    name: 'Fall Beauty Market',
    date: 'September 18, 2026',
    location: 'Rooftop Terrace, New York',
    description: 'Pop-up market featuring indie beauty brands, live demos, and giveaways.',
  },
];

const EventCalendar: React.FC<EventCalendarProps> = ({
  headline = 'Upcoming Events',
  events = defaultEvents,
}) => {
  return (
    <section
      data-section="event-calendar"
      data-ai-category="content"
      data-ai-context="event-listing-calendar"
      className="py-24 px-4 md:px-8 max-w-4xl mx-auto"
    >
      <motion.h2
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16"
      >
        {headline}
      </motion.h2>

      <div className="space-y-6">
        {events.map((event, i) => (
          <motion.div
            key={i}
            variants={slideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col sm:flex-row gap-6 bg-white border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            {/* Date badge */}
            <div className="flex-shrink-0 sm:w-24 text-center sm:text-left">
              <div className="inline-block sm:block bg-gray-900 text-white rounded-lg px-4 py-3">
                <span className="block text-xs uppercase tracking-widest font-bold opacity-70">
                  {event.date.split(' ')[0]}
                </span>
                <span className="block text-2xl font-black">
                  {event.date.split(' ')[1].replace(',', '')}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{event.name}</h3>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                {event.date} · {event.location}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            <div className="flex-shrink-0 flex items-end sm:items-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="text-sm font-bold uppercase tracking-widest text-gray-900 border border-gray-900 px-4 py-2 rounded hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap"
              >
                RSVP
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventCalendar;
