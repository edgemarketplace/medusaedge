/**
 * Hero Variants - Builder v3
 * Milano "Slideshow" → Puck component implementations
 */

import React from "react";
import type { ThemeTokens } from "@/themes/tokens";

// ============================================================================
// HERO EDITORIAL (Milano Slideshow style)
// ============================================================================

interface HeroEditorialProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  theme?: ThemeTokens;
  variant?: string;
}

export function HeroEditorial({ 
  headline = "THE FALL EDIT", 
  subheadline = "Oversized silhouettes and tactile fabrics",
  ctaText = "SHOP NOW",
  ctaLink = "#",
  backgroundImage,
  theme,
  variant = "editorial"
}: HeroEditorialProps) {
  const colors = theme?.colors || {};
  const typography = theme?.typography || {};
  
  const isCinematic = variant === "cinematic";
  const isCentered = variant === "centered-minimal";
  
  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: colors.primary || "#1a1a1a",
        fontFamily: typography.headingFont,
      }}
    >
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: isCinematic ? 0.4 : 0.7,
          }}
        />
      )}
      
      <div className={`relative z-10 text-center px-6 ${isCentered ? 'max-w-2xl' : 'max-w-4xl'}`}>
        <h1 
          className={`font-bold mb-4 ${isCinematic ? 'text-8xl' : 'text-6xl'}`}
          style={{ 
            color: colors.background || "#ffffff",
            fontFamily: typography.headingFont,
            letterSpacing: isCinematic ? "-0.02em" : "normal",
          }}
        >
          {headline}
        </h1>
        
        {subheadline && (
          <p 
            className={`mb-8 ${isCinematic ? 'text-2xl' : 'text-xl'}`}
            style={{ 
              color: colors.background || "#ffffff",
              fontFamily: typography.bodyFont,
              opacity: 0.9,
            }}
          >
            {subheadline}
          </p>
        )}
        
        {ctaText && (
          <a
            href={ctaLink}
            className="inline-block px-8 py-3 font-semibold text-sm tracking-wide uppercase transition hover:opacity-90"
            style={{
              backgroundColor: colors.accent || "#ffffff",
              color: colors.primary || "#000000",
              borderRadius: theme?.radius?.buttons || "0.375rem",
            }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// HERO SPLIT (Milano Split Hero)
// ============================================================================

interface HeroSplitProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  imagePosition?: string;
  theme?: ThemeTokens;
  variant?: string;
}

export function HeroSplit({ 
  headline = "PUSH LIMITS.", 
  subheadline = "Engineered for maximum output",
  ctaText = "SHOP NEW ARRIVALS",
  ctaLink = "#",
  backgroundImage,
  imagePosition = "right",
  theme,
  variant = "left-image"
}: HeroSplitProps) {
  const colors = theme?.colors || {};
  const typography = theme?.typography || {};
  const isReversed = imagePosition === "right" || variant === "right-image";
  
  return (
    <section 
      className="relative min-h-[70vh] flex items-center"
      style={{ backgroundColor: colors.background || "#ffffff" }}
    >
      <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} w-full`}>
        {/* Image Side */}
        <div className="md:w-1/2 min-h-[40vh] md:min-h-[70vh] relative">
          {backgroundImage ? (
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Image</span>
            </div>
          )}
        </div>
        
        {/* Content Side */}
        <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="max-w-lg">
            <h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              style={{ 
                color: colors.primary || "#1a1a1a",
                fontFamily: typography.headingFont,
              }}
            >
              {headline}
            </h1>
            
            {subheadline && (
              <p 
                className="text-xl mb-8"
                style={{ 
                  color: colors.foreground || "#666666",
                  fontFamily: typography.bodyFont,
                }}
              >
                {subheadline}
              </p>
            )}
            
            {ctaText && (
              <a
                href={ctaLink}
                className="inline-block px-8 py-3 font-semibold text-sm tracking-wide uppercase transition hover:opacity-90"
                style={{
                  backgroundColor: colors.primary || "#1a1a1a",
                  color: colors.background || "#ffffff",
                  borderRadius: theme?.radius?.buttons || "0.375rem",
                }}
              >
                {ctaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// HERO MINIMAL (Milano Minimal Hero)
// ============================================================================

interface HeroMinimalProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  theme?: ThemeTokens;
  variant?: string;
}

export function HeroMinimal({ 
  headline = "SPRING COLLECTION", 
  subheadline = "Light fabrics, fresh colors",
  ctaText = "EXPLORE",
  ctaLink = "#",
  backgroundColor,
  theme,
  variant = "centered"
}: HeroMinimalProps) {
  const colors = theme?.colors || {};
  const typography = theme?.typography || {};
  const bgColor = backgroundColor || colors.background || "#ffffff";
  
  return (
    <section 
      className="py-24 md:py-32 flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="text-center px-6 max-w-3xl mx-auto">
        <h1 
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{ 
            color: colors.primary || "#1a1a1a",
            fontFamily: typography.headingFont,
            letterSpacing: "-0.02em",
          }}
        >
          {headline}
        </h1>
        
        {subheadline && (
          <p 
            className="text-lg md:text-xl mb-10"
            style={{ 
              color: colors.foreground || "#666666",
              fontFamily: typography.bodyFont,
            }}
          >
            {subheadline}
          </p>
        )}
        
        {ctaText && (
          <a
            href={ctaLink}
            className="inline-block px-10 py-4 font-semibold text-sm tracking-widest uppercase transition hover:opacity-90"
            style={{
              backgroundColor: "transparent",
              color: colors.primary || "#1a1a1a",
              border: `2px solid ${colors.primary || "#1a1a1a"}`,
              borderRadius: theme?.radius?.buttons || "0.375rem",
            }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
