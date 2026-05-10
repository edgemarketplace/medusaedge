/**
 * Hero Sections - Milano V3
 * 
 * Cinematic hero, Split hero, Editorial hero variants
 * Oversized typography, asymmetric grids, immersive systems
 */

import React from 'react'
import { motion } from 'framer-motion'
import { TYPOGRAPHY, RADIUS, SHADOWS, MOTION } from '../milano-v3-design-tokens'

export type CinematicHeroProps = {
  heading: string
  subheading: string
  ctaText: string
  ctaLink: string
  backgroundImage: string
  overlayOpacity?: number
  textAlign?: 'left' | 'center' | 'right'
  height?: 'full' | 'large' | 'medium'
}

export type SplitHeroProps = {
  heading: string
  subheading: string
  ctaText: string
  ctaLink: string
  leftImage: string
  rightContent?: 'text' | 'image' | 'video'
  rightImage?: string
  layout?: 'left' | 'right'
}

export type EditorialHeroProps = {
  eyebrow: string
  heading: string
  subheading: string
  ctaText: string
  ctaLink: string
  backgroundImage: string
  author?: string
  date?: string
  readTime?: string
}

// Cinematic Hero - Full-bleed with oversized typography
export function CinematicHero({
  heading = "Push Limits.",
  subheading = "Engineered for maximum output. Discover the new collection.",
  ctaText = "Shop New Arrivals",
  ctaLink = "/collections/new",
  backgroundImage = "https://images.unsplash.com/photo-1556906781-9a2e7cb0b1d2",
  overlayOpacity = 0.4,
  textAlign = "center",
  height = "large"
}: CinematicHeroProps) {
  const heightClasses = {
    full: 'h-screen',
    large: 'h-[80vh]',
    medium: 'h-[60vh]'
  }

  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full ${heightClasses[height]} overflow-hidden`}
    >
      {/* Background image */}
      <img
        src={backgroundImage}
        alt={heading}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className={`relative h-full flex ${alignClasses[textAlign]} justify-center px-6 md:px-12`}>
        <div className="max-w-4xl space-y-6">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none"
            style={{ fontFamily: TYPOGRAPHY.fonts.display }}
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl"
            style={{ fontFamily: TYPOGRAPHY.fonts.grotesk }}
          >
            {subheading}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href={ctaLink}
              className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
              style={{ borderRadius: RADIUS.full, fontFamily: TYPOGRAPHY.fonts.ui }}
            >
              {ctaText}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// Split Hero - Asymmetric layout
export function SplitHero({
  heading = "Engineered for Performance",
  subheading = "Advanced materials. Precision craftsmanship. Unmatched quality.",
  ctaText = "Explore Collection",
  ctaLink = "/collections/performance",
  leftImage = "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7",
  rightContent = "text",
  rightImage,
  layout = "left"
}: SplitHeroProps) {
  const isImageRight = layout === "right"

  return (
    <section className="w-full min-h-[80vh] flex flex-col md:flex-row">
      {/* Left/Image side */}
      <motion.div
        initial={{ x: isImageRight ? 0 : -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-1/2 relative ${isImageRight ? 'md:order-2' : ''}`}
      >
        <img
          src={isImageRight ? (rightImage || leftImage) : leftImage}
          alt={heading}
          className="w-full h-full object-cover min-h-[50vh] md:min-h-full"
        />
      </motion.div>

      {/* Right/Content side */}
      <motion.div
        initial={{ x: isImageRight ? -50 : 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-1/2 flex items-center justify-center p-12 md:p-20 ${isImageRight ? 'md:order-1' : ''}`}
      >
        <div className="max-w-lg space-y-8">
          <h2
            className="text-5xl md:text-6xl font-bold leading-tight"
            style={{ fontFamily: TYPOGRAPHY.fonts.display }}
          >
            {heading}
          </h2>

          <p
            className="text-xl text-gray-600 leading-relaxed"
            style={{ fontFamily: TYPOGRAPHY.fonts.grotesk }}
          >
            {subheading}
          </p>

          <a
            href={ctaLink}
            className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
            style={{ borderRadius: RADIUS.full, fontFamily: TYPOGRAPHY.fonts.ui }}
          >
            {ctaText}
          </a>
        </div>
      </motion.div>
    </section>
  )
}

// Editorial Hero - Magazine-style with metadata
export function EditorialHero({
  eyebrow = "New Collection",
  heading = "The Art of Minimalism",
  subheading = "Exploring the beauty in simplicity through our latest editorial collection.",
  ctaText = "Read Story",
  ctaLink = "/editorial/minimalism",
  backgroundImage = "https://images.unsplash.com/photo-1509631179647-0177331693ae",
  author = "By Editorial Team",
  date = "May 10, 2026",
  readTime = "5 min read"
}: EditorialHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full min-h-[90vh] flex items-end"
    >
      {/* Background */}
      <img
        src={backgroundImage}
        alt={heading}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 space-y-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span
            className="inline-block text-sm font-semibold text-white/80 uppercase tracking-wider border-b-2 border-white/40 pb-2"
            style={{ fontFamily: TYPOGRAPHY.fonts.grotesk }}
          >
            {eyebrow}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none max-w-4xl"
          style={{ fontFamily: TYPOGRAPHY.fonts.display }}
        >
          {heading}
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed"
          style={{ fontFamily: TYPOGRAPHY.fonts.grotesk }}
        >
          {subheading}
        </motion.p>

        {/* Meta + CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <div className="flex items-center gap-4 text-white/70 text-sm">
            <span>{author}</span>
            <span>•</span>
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>

          <a
            href={ctaLink}
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            style={{ borderRadius: RADIUS.full, fontFamily: TYPOGRAPHY.fonts.ui }}
          >
            {ctaText}
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}

// Puck Schemas for Hero sections
export const HeroSchemas = {
  CinematicHero: {
    fields: {
      heading: { type: 'text' },
      subheading: { type: 'textarea' },
      ctaText: { type: 'text' },
      ctaLink: { type: 'text' },
      backgroundImage: { type: 'text' },
      overlayOpacity: { type: 'number' },
      textAlign: { type: 'select', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }] },
      height: { type: 'select', options: [{ label: 'Full Screen', value: 'full' }, { label: 'Large', value: 'large' }, { label: 'Medium', value: 'medium' }] }
    },
    defaultProps: {
      heading: "Push Limits.",
      subheading: "Engineered for maximum output.",
      ctaText: "Shop Now",
      backgroundImage: "https://images.unsplash.com/photo-1556906781-9a2e7cb0b1d2"
    }
  },
  SplitHero: {
    fields: {
      heading: { type: 'text' },
      subheading: { type: 'textarea' },
      ctaText: { type: 'text' },
      ctaLink: { type: 'text' },
      leftImage: { type: 'text' },
      rightImage: { type: 'text' },
      layout: { type: 'select', options: [{ label: 'Image Left', value: 'left' }, { label: 'Image Right', value: 'right' }] }
    }
  },
  EditorialHero: {
    fields: {
      eyebrow: { type: 'text' },
      heading: { type: 'text' },
      subheading: { type: 'textarea' },
      ctaText: { type: 'text' },
      ctaLink: { type: 'text' },
      backgroundImage: { type: 'text' },
      author: { type: 'text' },
      date: { type: 'text' },
      readTime: { type: 'text' }
    }
  }
}
