import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, slideUp } from '@/motion/presets';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

interface FooterStandardProps {
  brand?: string;
  description?: string;
  links?: FooterLinkGroup[];
}

const defaultLinks: FooterLinkGroup[] = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: '#' },
      { label: 'Best Sellers', href: '#' },
      { label: 'Collections', href: '#' },
      { label: 'Sale', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQs', href: '#' },
      { label: 'Shipping', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Size Guide', href: '#' },
    ],
  },
];

const socialLinks = [
  { label: 'Instagram', href: '#', icon: 'IG' },
  { label: 'Twitter', href: '#', icon: 'TW' },
  { label: 'Pinterest', href: '#', icon: 'PI' },
  { label: 'YouTube', href: '#', icon: 'YT' },
];

const FooterStandard: React.FC<FooterStandardProps> = ({
  brand = 'MEDUSA',
  description = 'Premium fashion and lifestyle brand. Designed for the bold.',
  links = defaultLinks,
}) => {
  return (
    <footer
      data-section="footer-standard"
      data-ai-section="footer-standard"
      data-ai-category="footer"
      data-ai-label="Footer Standard"
      data-ai-editable-fields="brand,description,links"
      className="bg-zinc-900 text-white py-16 md:py-20 px-4 md:px-8"
    >
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand Column */}
          <motion.div variants={slideUp} className="lg:col-span-1">
            <a
              href="#"
              className="text-2xl font-black uppercase tracking-tighter text-white hover:text-zinc-300 transition-colors"
            >
              {brand}
            </a>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-xs">
              {description}
            </p>
          </motion.div>

          {/* Link Groups */}
          {links.map((group) => (
            <motion.div key={group.title} variants={slideUp}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar — Social + Copyright */}
        <motion.div
          variants={fadeIn}
          className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} {brand}. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default FooterStandard;
