import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

const HeroEditorial = ({
  headline = "The Fall Edit",
  subheadline = "Oversized silhouettes and tactile fabrics for the modern wardrobe.",
  cta = "Shop The Lookbook",
  backgroundImage = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000",
  variant = "luxury",
  theme, // ← Theme tokens injected by Puck converter
}) => {
  // Use theme tokens or fallback to defaults
  const colors = theme?.colors || {
    primary: '#1a1a1a',
    background: '#fefefe',
    foreground: '#ffffff',
  };
  
  const typography = theme?.typography || {
    headingFont: 'system-ui, sans-serif',
    h1: 'text-7xl md:text-9xl font-black uppercase tracking-tighter',
    body: 'text-lg md:text-xl font-light tracking-wide',
    button: 'text-sm font-bold uppercase tracking-widest',
  };
  
  const buttons = theme?.buttons?.primary || {
    background: '#ffffff',
    color: '#1a1a1a',
    borderRadius: '0.25rem',
    padding: '1rem 2rem',
    fontWeight: '700',
    hoverBackground: '#f0f0f0',
  };

  return (
    <section
      data-section="hero-editorial"
      data-ai-context="luxury-fashion-hero"
      style={{
        position: 'relative',
        height: '80vh',
        backgroundColor: colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 1.5 }}
        src={backgroundImage}
        alt="Fashion Editorial"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          mixBlendMode: 'multiply',
        }}
      />

      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        color: colors.foreground,
        padding: '0 1rem',
      }}>
        <motion.h1
          variants={slideUp}
          initial="initial"
          animate="animate"
          style={{
            fontFamily: typography.headingFont,
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            marginBottom: '1rem',
            mixBlendMode: 'overlay',
          }}
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            marginBottom: '2rem',
            maxWidth: '32rem',
            margin: '0 auto 2rem auto',
          }}
        >
          {subheadline}
        </motion.p>

        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <a
            href="#"
            style={{
              display: 'inline-block',
              background: buttons.background,
              color: buttons.color,
              padding: buttons.padding,
              fontSize: '0.875rem',
              fontWeight: buttons.fontWeight,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              borderRadius: buttons.borderRadius,
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = buttons.hoverBackground || buttons.background;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = buttons.background;
            }}
          >
            {cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroEditorial;
