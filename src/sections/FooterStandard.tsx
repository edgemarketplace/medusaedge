"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { fadeIn, staggerContainer, slideUp } from '@/motion/presets';
     4|
     5|interface FooterLink {
     6|  label: string;
     7|  href: string;
     8|}
     9|
    10|interface FooterLinkGroup {
    11|  title: string;
    12|  links: FooterLink[];
    13|}
    14|
    15|interface FooterStandardProps {
    16|  brand?: string;
    17|  description?: string;
    18|  links?: FooterLinkGroup[];
    19|}
    20|
    21|const defaultLinks: FooterLinkGroup[] = [
    22|  {
    23|    title: 'Shop',
    24|    links: [
    25|      { label: 'New Arrivals', href: '#' },
    26|      { label: 'Best Sellers', href: '#' },
    27|      { label: 'Collections', href: '#' },
    28|      { label: 'Sale', href: '#' },
    29|    ],
    30|  },
    31|  {
    32|    title: 'Company',
    33|    links: [
    34|      { label: 'About Us', href: '#' },
    35|      { label: 'Careers', href: '#' },
    36|      { label: 'Press', href: '#' },
    37|      { label: 'Contact', href: '#' },
    38|    ],
    39|  },
    40|  {
    41|    title: 'Support',
    42|    links: [
    43|      { label: 'FAQs', href: '#' },
    44|      { label: 'Shipping', href: '#' },
    45|      { label: 'Returns', href: '#' },
    46|      { label: 'Size Guide', href: '#' },
    47|    ],
    48|  },
    49|];
    50|
    51|const socialLinks = [
    52|  { label: 'Instagram', href: '#', icon: 'IG' },
    53|  { label: 'Twitter', href: '#', icon: 'TW' },
    54|  { label: 'Pinterest', href: '#', icon: 'PI' },
    55|  { label: 'YouTube', href: '#', icon: 'YT' },
    56|];
    57|
    58|const FooterStandard: React.FC<FooterStandardProps> = ({
    59|  brand = 'MEDUSA',
    60|  description = 'Premium fashion and lifestyle brand. Designed for the bold.',
    61|  links = defaultLinks,
    62|}) => {
    63|  return (
    64|    <footer
    65|      data-section="footer-standard"
    66|      data-ai-section="footer-standard"
    67|      data-ai-category="footer"
    68|      data-ai-label="Footer Standard"
    69|      data-ai-editable-fields="brand,description,links"
    70|      className="bg-zinc-900 text-white py-16 md:py-20 px-4 md:px-8"
    71|    >
    72|      <motion.div
    73|        variants={staggerContainer}
    74|        initial="initial"
    75|        whileInView="animate"
    76|        viewport={{ once: true, amount: 0.1 }}
    77|        className="max-w-7xl mx-auto"
    78|      >
    79|        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
    80|          {/* Brand Column */}
    81|          <motion.div variants={slideUp} className="lg:col-span-1">
    82|            <a
    83|              href="#"
    84|              className="text-2xl font-black uppercase tracking-tighter text-white hover:text-zinc-300 transition-colors"
    85|            >
    86|              {brand}
    87|            </a>
    88|            <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-xs">
    89|              {description}
    90|            </p>
    91|          </motion.div>
    92|
    93|          {/* Link Groups */}
    94|          {links.map((group) => (
    95|            <motion.div key={group.title} variants={slideUp}>
    96|              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
    97|                {group.title}
    98|              </h4>
    99|              <ul className="space-y-2">
   100|                {group.links.map((link) => (
   101|                  <li key={link.label}>
   102|                    <a
   103|                      href={link.href}
   104|                      className="text-sm text-zinc-400 hover:text-white transition-colors"
   105|                    >
   106|                      {link.label}
   107|                    </a>
   108|                  </li>
   109|                ))}
   110|              </ul>
   111|            </motion.div>
   112|          ))}
   113|        </div>
   114|
   115|        {/* Bottom Bar — Social + Copyright */}
   116|        <motion.div
   117|          variants={fadeIn}
   118|          className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6"
   119|        >
   120|          {/* Social Links */}
   121|          <div className="flex gap-6">
   122|            {socialLinks.map((social) => (
   123|              <a
   124|                key={social.label}
   125|                href={social.href}
   126|                aria-label={social.label}
   127|                className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
   128|              >
   129|                {social.icon}
   130|              </a>
   131|            ))}
   132|          </div>
   133|
   134|          {/* Copyright */}
   135|          <p className="text-xs text-zinc-500">
   136|            &copy; {new Date().getFullYear()} {brand}. All rights reserved.
   137|          </p>
   138|        </motion.div>
   139|      </motion.div>
   140|    </footer>
   141|  );
   142|};
   143|
   144|export default FooterStandard;
   145|