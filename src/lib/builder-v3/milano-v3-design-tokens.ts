/**
 * Milano V3 Design Tokens
 * 
 * Visual DNA: Milan luxury + Linear density + Stripe layout + Vercel typography
 * + Shopify Hydrogen spacing + Arc browser motion + Apple modularity
 */

export type ThemeName = 'luxury-fashion' | 'editorial-minimal' | 'streetwear-dark' | 'saas-light' | 'enterprise-dark'

export interface DesignTokens {
  colors: {
    // Core surfaces
    background: string
    surface: string
    surfaceElevated: string
    surfaceGlass: string
    
    // Text
    textPrimary: string
    textSecondary: string
    textMuted: string
    
    // Brand
    brand: string
    brandLight: string
    brandDark: string
    
    // Commerce
    price: string
    salePrice: string
    inStock: string
    outOfStock: string
    
    // Borders
    border: string
    borderLight: string
    
    // Status
    success: string
    warning: string
    error: string
  }
  
  typography: {
    // Display fonts (serif for luxury)
    displayFont: string
    // UI/Grotesk fonts
    uiFont: string
    monoFont: string
    
    // Size scale
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      '4xl': string
      '5xl': string
      '6xl': string
      '7xl': string
    }
    
    // Line heights
    lineHeight: {
      tight: string
      normal: string
      relaxed: string
    }
    
    // Letter spacing
    letterSpacing: {
      tighter: string
      tight: string
      normal: string
      wide: string
      wider: string
    }
  }
  
  spacing: {
    gridGap: string
    sectionPadding: string
    componentPadding: string
    gutter: string
  }
  
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    full: string
  }
  
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    glass: string
  }
  
  motion: {
    duration: {
      fast: string    // 200ms
      normal: string  // 300ms
      slow: string    // 400ms
    }
    easing: {
      default: string
      spring: string
      heavy: string
    }
  }
  
  grid: {
    columns: number
    breakpoints: {
      mobile: string
      tablet: string
      desktop: string
      wide: string
    }
  }
}

// Typography tokens
export const TYPOGRAPHY = {
  fonts: {
    // Canela-style serif for luxury display
    display: '"Canela", "Didot", "Playfair Display", Georgia, serif',
    // Geist-style grotesk for UI
    ui: '"Inter", "Geist", "SF Pro Display", -apple-system, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
    // Söhne-style grotesk alternative
    grotesk: '"Inter", "Helvetica Neue", Arial, sans-serif'
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem'
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  }
}

// Radius system (20-32px preferred)
export const RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px'
}

// Shadow system (soft elevated surfaces only)
export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
}

// Motion system (200-400ms, easing-heavy, spring transitions)
export const MOTION = {
  duration: {
    fast: '200ms',
    normal: '300ms',
    slow: '400ms'
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    heavy: 'cubic-bezier(0.16, 1, 0.3, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
}

// Grid system (12-column adaptive, asymmetry preferred)
export const GRID = {
  columns: 12,
  gutter: '2rem',
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px'
  }
}

// Luxury Fashion Theme (light, editorial)
export const LUXURY_FASHION_TOKENS: DesignTokens = {
  colors: {
    background: '#FAFAF9',
    surface: '#FFFFFF',
    surfaceElevated: '#F8F8F7',
    surfaceGlass: 'rgba(255, 255, 255, 0.8)',
    
    textPrimary: '#1A1A1A',
    textSecondary: '#525252',
    textMuted: '#A3A3A3',
    
    brand: '#1A1A1A',
    brandLight: '#525252',
    brandDark: '#000000',
    
    price: '#1A1A1A',
    salePrice: '#DC2626',
    inStock: '#16A34A',
    outOfStock: '#DC2626',
    
    border: '#E5E5E5',
    borderLight: '#F5F5F5',
    
    success: '#16A34A',
    warning: '#CA8A04',
    error: '#DC2626'
  },
  typography: {
    displayFont: TYPOGRAPHY.fonts.display,
    uiFont: TYPOGRAPHY.fonts.ui,
    monoFont: TYPOGRAPHY.fonts.mono,
    fontSize: TYPOGRAPHY.sizes,
    lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
    letterSpacing: { tighter: '-0.05em', tight: '-0.025em', normal: '0', wide: '0.025em', wider: '0.05em' }
  },
  spacing: { gridGap: '2rem', sectionPadding: '6rem 2rem', componentPadding: '2rem', gutter: '2rem' },
  borderRadius: RADIUS,
  shadows: SHADOWS,
  motion: MOTION,
  grid: GRID
}

// Streetwear Dark Theme
export const STREETWEAR_DARK_TOKENS: DesignTokens = {
  colors: {
    background: '#0A0A0A',
    surface: '#141414',
    surfaceElevated: '#1A1A1A',
    surfaceGlass: 'rgba(20, 20, 20, 0.8)',
    
    textPrimary: '#F5F5F5',
    textSecondary: '#A3A3A3',
    textMuted: '#525252',
    
    brand: '#F5F5F5',
    brandLight: '#A3A3A3',
    brandDark: '#FFFFFF',
    
    price: '#F5F5F5',
    salePrice: '#EF4444',
    inStock: '#22C55E',
    outOfStock: '#EF4444',
    
    border: '#262626',
    borderLight: '#1A1A1A',
    
    success: '#22C55E',
    warning: '#EAB308',
    error: '#EF4444'
  },
  typography: {
    displayFont: TYPOGRAPHY.fonts.grotesk,
    uiFont: TYPOGRAPHY.fonts.grotesk,
    monoFont: TYPOGRAPHY.fonts.mono,
    fontSize: TYPOGRAPHY.sizes,
    lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
    letterSpacing: { tighter: '-0.05em', tight: '-0.025em', normal: '0', wide: '0.05em', wider: '0.05em' }
  },
  spacing: { gridGap: '2rem', sectionPadding: '6rem 2rem', componentPadding: '2rem', gutter: '2rem' },
  borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px', full: '9999px' },
  shadows: SHADOWS,
  motion: MOTION,
  grid: GRID
}

// SaaS Light Theme (Stripe/Vercel inspired)
export const SAAS_LIGHT_TOKENS: DesignTokens = {
  colors: {
    background: '#FFFFFF',
    surface: '#F9FAFB',
    surfaceElevated: '#FFFFFF',
    surfaceGlass: 'rgba(255, 255, 255, 0.9)',
    
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    
    brand: '#635BFF', // Stripe purple
    brandLight: '#8B85FF',
    brandDark: '#4A42D4',
    
    price: '#111827',
    salePrice: '#EF4444',
    inStock: '#10B981',
    outOfStock: '#EF4444',
    
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  },
  typography: {
    displayFont: TYPOGRAPHY.fonts.ui,
    uiFont: TYPOGRAPHY.fonts.ui,
    monoFont: TYPOGRAPHY.fonts.mono,
    fontSize: TYPOGRAPHY.sizes,
    lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
    letterSpacing: { tighter: '-0.025em', tight: '0', normal: '0', wide: '0.025em', wider: '0.025em' }
  },
  spacing: { gridGap: '1.5rem', sectionPadding: '4rem 2rem', componentPadding: '1.5rem', gutter: '1.5rem' },
  borderRadius: RADIUS,
  shadows: SHADOWS,
  motion: MOTION,
  grid: GRID
}

export function getDesignTokens(theme: ThemeName): DesignTokens {
  switch (theme) {
    case 'luxury-fashion': return LUXURY_FASHION_TOKENS
    case 'streetwear-dark': return STREETWEAR_DARK_TOKENS
    case 'editorial-minimal': return LUXURY_FASHION_TOKENS // fallback
    case 'saas-light': return SAAS_LIGHT_TOKENS
    case 'enterprise-dark': return STREETWEAR_DARK_TOKENS // fallback
    default: return LUXURY_FASHION_TOKENS
  }
}
