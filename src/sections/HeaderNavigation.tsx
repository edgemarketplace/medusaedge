import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/motion/presets';

interface HeaderNavigationProps {
  brand?: string;
  links?: string[];
  ctaButton?: string;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  brand = 'MEDUSA',
  links = ['Shop', 'Collections', 'About', 'Journal'],
  ctaButton,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      data-section="header-navigation"
      data-ai-section="header-navigation"
      data-ai-category="header"
      data-ai-label="Header Navigation"
      data-ai-editable-fields="brand,links,ctaButton"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand */}
          <motion.a
            variants={fadeIn}
            initial="initial"
            animate="animate"
            href="#"
            className="text-xl md:text-2xl font-black uppercase tracking-tighter text-zinc-900 hover:text-zinc-600 transition-colors"
          >
            {brand}
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium uppercase tracking-wide text-zinc-600 hover:text-zinc-900 transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zinc-900 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {ctaButton && (
              <a
                href="#"
                className="ml-4 inline-block bg-zinc-900 text-white px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors"
              >
                {ctaButton}
              </a>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-zinc-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={mobileOpen ? 'open' : 'closed'}
              className="w-6 h-5 relative flex flex-col justify-between"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 },
                }}
                className="block w-full h-0.5 bg-zinc-900 origin-center"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="block w-full h-0.5 bg-zinc-900"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 },
                }}
                className="block w-full h-0.5 bg-zinc-900 origin-center"
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="py-4 space-y-3">
                {links.map((link, i) => (
                  <motion.a
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    href="#"
                    className="block px-2 py-2 text-sm font-medium uppercase tracking-wide text-zinc-600 hover:text-zinc-900 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link}
                  </motion.a>
                ))}

                {ctaButton && (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: links.length * 0.05 }}
                    href="#"
                    className="inline-block mt-2 bg-zinc-900 text-white px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {ctaButton}
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default HeaderNavigation;
