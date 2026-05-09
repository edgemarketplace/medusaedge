"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/motion/presets';

interface AnnouncementBarProps {
  text?: string;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text = 'Free shipping on all orders over $50 · Easy 30-day returns',
}) => {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          data-section="announcement-bar"
          data-ai-section="announcement-bar"
          data-ai-category="header"
          data-ai-label="Announcement Bar"
          data-ai-editable-fields="text"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-zinc-900 text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex items-center justify-center relative">
            <motion.p
              variants={fadeIn}
              initial="initial"
              animate="animate"
              className="text-xs md:text-sm font-medium tracking-wide text-center pr-8"
            >
              {text}
            </motion.p>

            {/* Dismiss Button */}
            <button
              onClick={() => setDismissed(true)}
              className="absolute right-4 md:right-8 p-1 text-white/60 hover:text-white transition-colors"
              aria-label="Dismiss announcement"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
