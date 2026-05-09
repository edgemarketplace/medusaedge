"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn } from '@/motion/presets';
     4|
     5|interface Event {
     6|  name: string;
     7|  date: string;
     8|  location: string;
     9|  description: string;
    10|}
    11|
    12|interface EventCalendarProps {
    13|  headline?: string;
    14|  events?: Event[];
    15|}
    16|
    17|const defaultEvents: Event[] = [
    18|  {
    19|    name: 'Summer Solstice Wellness Retreat',
    20|    date: 'June 21, 2026',
    21|    location: 'Serenity Gardens, New York',
    22|    description: 'A full-day immersive experience with yoga, meditation, and organic cuisine.',
    23|  },
    24|  {
    25|    name: 'Skincare Masterclass',
    26|    date: 'July 12, 2026',
    27|    location: 'Flagship Studio, New York',
    28|    description: 'Learn professional techniques from our lead estheticians. All products provided.',
    29|  },
    30|  {
    31|    name: 'Members-Only Open House',
    32|    date: 'August 5, 2026',
    33|    location: 'Private Lounge, New York',
    34|    description: 'Exclusive preview of our fall collection with complimentary treatments.',
    35|  },
    36|  {
    37|    name: 'Fall Beauty Market',
    38|    date: 'September 18, 2026',
    39|    location: 'Rooftop Terrace, New York',
    40|    description: 'Pop-up market featuring indie beauty brands, live demos, and giveaways.',
    41|  },
    42|];
    43|
    44|const EventCalendar: React.FC<EventCalendarProps> = ({
    45|  headline = 'Upcoming Events',
    46|  events = defaultEvents,
    47|}) => {
    48|  return (
    49|    <section
    50|      data-section="event-calendar"
    51|      data-ai-category="content"
    52|      data-ai-context="event-listing-calendar"
    53|      className="py-24 px-4 md:px-8 max-w-4xl mx-auto"
    54|    >
    55|      <motion.h2
    56|        variants={fadeIn}
    57|        initial="initial"
    58|        whileInView="animate"
    59|        viewport={{ once: true, amount: 0.5 }}
    60|        className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16"
    61|      >
    62|        {headline}
    63|      </motion.h2>
    64|
    65|      <div className="space-y-6">
    66|        {events.map((event, i) => (
    67|          <motion.div
    68|            key={i}
    69|            variants={slideUp}
    70|            initial="initial"
    71|            whileInView="animate"
    72|            viewport={{ once: true, amount: 0.2 }}
    73|            transition={{ delay: i * 0.1 }}
    74|            className="group flex flex-col sm:flex-row gap-6 bg-white border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow"
    75|          >
    76|            {/* Date badge */}
    77|            <div className="flex-shrink-0 sm:w-24 text-center sm:text-left">
    78|              <div className="inline-block sm:block bg-gray-900 text-white rounded-lg px-4 py-3">
    79|                <span className="block text-xs uppercase tracking-widest font-bold opacity-70">
    80|                  {event.date.split(' ')[0]}
    81|                </span>
    82|                <span className="block text-2xl font-black">
    83|                  {event.date.split(' ')[1].replace(',', '')}
    84|                </span>
    85|              </div>
    86|            </div>
    87|
    88|            <div className="flex-1">
    89|              <h3 className="text-lg font-bold text-gray-900 mb-1">{event.name}</h3>
    90|              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
    91|                {event.date} · {event.location}
    92|              </p>
    93|              <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
    94|            </div>
    95|
    96|            <div className="flex-shrink-0 flex items-end sm:items-center">
    97|              <motion.button
    98|                whileHover={{ scale: 1.03 }}
    99|                className="text-sm font-bold uppercase tracking-widest text-gray-900 border border-gray-900 px-4 py-2 rounded hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap"
   100|              >
   101|                RSVP
   102|              </motion.button>
   103|            </div>
   104|          </motion.div>
   105|        ))}
   106|      </div>
   107|    </section>
   108|  );
   109|};
   110|
   111|export default EventCalendar;
   112|