"use client"

     1|import React, { useState } from 'react';
     2|import { motion, AnimatePresence } from 'framer-motion';
     3|import { fadeIn } from '@/motion/presets';
     4|
     5|interface AnnouncementBarProps {
     6|  text?: string;
     7|}
     8|
     9|const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
    10|  text = 'Free shipping on all orders over $50 · Easy 30-day returns',
    11|}) => {
    12|  const [dismissed, setDismissed] = useState(false);
    13|
    14|  return (
    15|    <AnimatePresence>
    16|      {!dismissed && (
    17|        <motion.div
    18|          data-section="announcement-bar"
    19|          data-ai-section="announcement-bar"
    20|          data-ai-category="header"
    21|          data-ai-label="Announcement Bar"
    22|          data-ai-editable-fields="text"
    23|          initial={{ height: 0, opacity: 0 }}
    24|          animate={{ height: 'auto', opacity: 1 }}
    25|          exit={{ height: 0, opacity: 0 }}
    26|          transition={{ duration: 0.3 }}
    27|          className="bg-zinc-900 text-white overflow-hidden"
    28|        >
    29|          <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex items-center justify-center relative">
    30|            <motion.p
    31|              variants={fadeIn}
    32|              initial="initial"
    33|              animate="animate"
    34|              className="text-xs md:text-sm font-medium tracking-wide text-center pr-8"
    35|            >
    36|              {text}
    37|            </motion.p>
    38|
    39|            {/* Dismiss Button */}
    40|            <button
    41|              onClick={() => setDismissed(true)}
    42|              className="absolute right-4 md:right-8 p-1 text-white/60 hover:text-white transition-colors"
    43|              aria-label="Dismiss announcement"
    44|            >
    45|              <svg
    46|                xmlns="http://www.w3.org/2000/svg"
    47|                className="h-4 w-4"
    48|                fill="none"
    49|                viewBox="0 0 24 24"
    50|                stroke="currentColor"
    51|                strokeWidth={2}
    52|              >
    53|                <path
    54|                  strokeLinecap="round"
    55|                  strokeLinejoin="round"
    56|                  d="M6 18L18 6M6 6l12 12"
    57|                />
    58|              </svg>
    59|            </button>
    60|          </div>
    61|        </motion.div>
    62|      )}
    63|    </AnimatePresence>
    64|  );
    65|};
    66|
    67|export default AnnouncementBar;
    68|