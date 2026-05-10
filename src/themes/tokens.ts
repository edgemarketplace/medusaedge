// ══════════════════════════════════════════════════════════════════
// Theme Token System
// ══════════════════════════════════════════════════════════════════
// Foundation layer for Edge Marketplace Hub.
// Enables: cohesive presets, vertical theming, rapid deployment, AI generation.
//
// Based on Milano architecture analysis: premium themes are CURATED SYSTEMS,
// not arbitrary designs. Tokens create "professional by default" storefronts.
// ══════════════════════════════════════════════════════════════════

// ─── Theme Token Types ───────────────────────────────────────────────

export type ButtonStyle = {
  background: string
  color: string
  border: string
  borderRadius: string
  padding: string
  fontSize: string
  fontWeight: string
  hoverBackground: string
  hoverColor: string
}

export type ThemeTokens = {
  // Color palette
  colors: {
    primary: string        // Primary brand color
    secondary: string      // Secondary brand color
    accent: string         // Accent/highlight color
    background: string     // Page background
    foreground: string    // Primary text color
    muted: string         // Muted text/secondary elements
    border: string        // Borders, dividers
    card: string          // Card/section backgrounds
    destructive: string   // Errors, warnings
  }

  // Typography system
  typography: {
    headingFont: string   // Font family for headings (h1-h6)
    bodyFont: string      // Font family for body text
    monoFont?: string     // Optional monospace font

    // Predefined type scales (Tailwind-like)
    h1: string            // text-5xl font-bold tracking-tight
    h2: string            // text-4xl font-semibold
    h3: string            // text-3xl font-semibold
    h4: string            // text-2xl font-semibold
    body: string          // text-base leading-relaxed
    bodySm: string        // text-sm leading-relaxed
    caption: string      // text-xs uppercase tracking-wide
    button: string        // text-sm font-medium
  }

  // Spacing system
  spacing: {
    sectionY: string      // Padding top/bottom for sections (py-16 = 4rem)
    sectionX: string      // Padding left/right for sections (px-4)
    containerMax: string   // Max width for content (max-w-7xl = 80rem)
    gridGap: string       // Gap between grid items (gap-6 = 1.5rem)
    elementGap: string    // Gap between elements in section (gap-4 = 1rem)
  }

  // Border radius
  radius: {
    buttons: string       // rounded-md = 0.375rem
    cards: string         // rounded-lg = 0.5rem
    images: string        // rounded-2xl = 1rem
    inputs: string        // rounded-md
  }

  // Shadows
  shadows: {
    card: string          // shadow-md
    elevated: string      // shadow-xl
    button: string        // shadow-sm
  }

  // Button variants
  buttons: {
    primary: ButtonStyle
    secondary: ButtonStyle
    ghost: ButtonStyle
  }
}

// ─── CSS Variable Emitter ───────────────────────────────────────────
// Emits CSS custom properties for runtime theme switching, dark mode,
// editor previews, and future marketplace theming.

export function emitCSSVariables(theme: ThemeTokens): string {
  const css: string[] = []

  // Colors
  css.push(`--color-primary: ${theme.colors.primary};`)
  css.push(`--color-secondary: ${theme.colors.secondary};`)
  css.push(`--color-accent: ${theme.colors.accent};`)
  css.push(`--color-background: ${theme.colors.background};`)
  css.push(`--color-foreground: ${theme.colors.foreground};`)
  css.push(`--color-muted: ${theme.colors.muted};`)
  css.push(`--color-border: ${theme.colors.border};`)
  css.push(`--color-card: ${theme.colors.card};`)
  css.push(`--color-destructive: ${theme.colors.destructive};`)

  // Typography
  css.push(`--font-heading: ${theme.typography.headingFont};`)
  css.push(`--font-body: ${theme.typography.bodyFont};`)
  if (theme.typography.monoFont) {
    css.push(`--font-mono: ${theme.typography.monoFont};`)
  }

  // Spacing
  css.push(`--spacing-section-y: ${theme.spacing.sectionY};`)
  css.push(`--spacing-section-x: ${theme.spacing.sectionX};`)
  css.push(`--spacing-container-max: ${theme.spacing.containerMax};`)
  css.push(`--spacing-grid-gap: ${theme.spacing.gridGap};`)
  css.push(`--spacing-element-gap: ${theme.spacing.elementGap};`)

  // Radius
  css.push(`--radius-buttons: ${theme.radius.buttons};`)
  css.push(`--radius-cards: ${theme.radius.cards};`)
  css.push(`--radius-images: ${theme.radius.images};`)
  css.push(`--radius-inputs: ${theme.radius.inputs};`)

  // Shadows
  css.push(`--shadow-card: ${theme.shadows.card};`)
  css.push(`--shadow-elevated: ${theme.shadows.elevated};`)
  css.push(`--shadow-button: ${theme.shadows.button};`)

  return `:root {\n  ${css.join('\n  ')}\n}`
}

// ─── Theme Registry ────────────────────────────────────────────────
// Vertical-specific presets that create "people actually want to deploy these."

// ── Luxury Fashion (Milano-inspired) ──────────────────────────────
export const luxuryFashion: ThemeTokens = {
  colors: {
    primary: '#1a1a1a',        // Deep black
    secondary: '#8a7a5c',      // Gold/brown accent
    accent: '#c9b896',          // Light gold
    background: '#fefefe',      // Near white
    foreground: '#1a1a1a',     // Deep black text
    muted: '#6b6b6b',          // Medium gray
    border: '#e5e5e5',         // Light gray border
    card: '#ffffff',            // Pure white cards
    destructive: '#dc2626',    // Red
  },
  typography: {
    headingFont: "'Playfair Display', Georgia, serif",
    bodyFont: "'Inter', system-ui, sans-serif",
    h1: 'text-5xl md:text-7xl font-bold tracking-tight',
    h2: 'text-4xl md:text-5xl font-semibold tracking-tight',
    h3: 'text-3xl font-semibold',
    h4: 'text-2xl font-semibold',
    body: 'text-base leading-relaxed',
    bodySm: 'text-sm leading-relaxed',
    caption: 'text-xs uppercase tracking-widest font-medium',
    button: 'text-sm font-medium tracking-wide',
  },
  spacing: {
    sectionY: '4rem',
    sectionX: '1rem',
    containerMax: '80rem',
    gridGap: '1.5rem',
    elementGap: '1rem',
  },
  radius: {
    buttons: '0.125rem',      // Square luxury feel
    cards: '0.25rem',
    images: '0.5rem',
    inputs: '0.125rem',
  },
  shadows: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    elevated: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    button: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  buttons: {
    primary: {
      background: '#1a1a1a',
      color: '#fefefe',
      border: '1px solid #1a1a1a',
      borderRadius: '0.125rem',
      padding: '0.75rem 2rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      hoverBackground: '#333333',
      hoverColor: '#fefefe',
    },
    secondary: {
      background: 'transparent',
      color: '#1a1a1a',
      border: '1px solid #1a1a1a',
      borderRadius: '0.125rem',
      padding: '0.75rem 2rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      hoverBackground: '#1a1a1a',
      hoverColor: '#fefefe',
    },
    ghost: {
      background: 'transparent',
      color: '#1a1a1a',
      border: 'none',
      borderRadius: '0.125rem',
      padding: '0.75rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      hoverBackground: 'rgba(26, 26, 26, 0.05)',
      hoverColor: '#1a1a1a',
    },
  },
}

// ── Editorial Minimal (Clean, whitespace-heavy) ───────────────────
export const editorialMinimal: ThemeTokens = {
  colors: {
    primary: '#111111',
    secondary: '#555555',
    accent: '#888888',
    background: '#ffffff',
    foreground: '#111111',
    muted: '#888888',
    border: '#e5e5e5',
    card: '#fafafa',
    destructive: '#ef4444',
  },
  typography: {
    headingFont: "'DM Serif Display', Georgia, serif",
    bodyFont: "'System-ui', -apple-system, sans-serif",
    h1: 'text-6xl md:text-8xl font-normal tracking-[-0.02em]',
    h2: 'text-4xl md:text-5xl font-normal',
    h3: 'text-3xl font-normal',
    h4: 'text-2xl font-normal',
    body: 'text-lg leading-relaxed',
    bodySm: 'text-base leading-relaxed',
    caption: 'text-sm uppercase tracking-[0.15em]',
    button: 'text-sm font-normal tracking-[0.1em]',
  },
  spacing: {
    sectionY: '6rem',
    sectionX: '1.5rem',
    containerMax: '72rem',
    gridGap: '2rem',
    elementGap: '1.5rem',
  },
  radius: {
    buttons: '0',             // Sharp edges
    cards: '0',
    images: '0',
    inputs: '0',
  },
  shadows: {
    card: 'none',
    elevated: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    button: 'none',
  },
  buttons: {
    primary: {
      background: '#111111',
      color: '#ffffff',
      border: '1px solid #111111',
      borderRadius: '0',
      padding: '1rem 3rem',
      fontSize: '0.875rem',
      fontWeight: '400',
      hoverBackground: '#333333',
      hoverColor: '#ffffff',
    },
    secondary: {
      background: 'transparent',
      color: '#111111',
      border: '1px solid #111111',
      borderRadius: '0',
      padding: '1rem 3rem',
      fontSize: '0.875rem',
      fontWeight: '400',
      hoverBackground: '#111111',
      hoverColor: '#ffffff',
    },
    ghost: {
      background: 'transparent',
      color: '#111111',
      border: 'none',
      borderRadius: '0',
      padding: '1rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: '400',
      hoverBackground: 'rgba(17, 17, 17, 0.05)',
      hoverColor: '#111111',
    },
  },
}

// ── Streetwear Dark (Bold, urban, high-contrast) ─────────────────
export const streetwearDark: ThemeTokens = {
  colors: {
    primary: '#ff3d00',        // Neon orange-red
    secondary: '#00e5ff',      // Cyan accent
    accent: '#ff6d00',         // Orange
    background: '#0a0a0a',     // Near black
    foreground: '#ffffff',      // White text
    muted: '#888888',          // Gray
    border: '#333333',         // Dark gray border
    card: '#1a1a1a',          // Dark gray cards
    destructive: '#ff1744',    // Bright red
  },
  typography: {
    headingFont: "'Space Grotesk', Impact, sans-serif",
    bodyFont: "'Inter', system-ui, sans-serif",
    h1: 'text-6xl md:text-8xl font-black uppercase tracking-tight',
    h2: 'text-4xl md:text-6xl font-bold uppercase',
    h3: 'text-3xl font-bold uppercase',
    h4: 'text-2xl font-bold uppercase',
    body: 'text-base leading-relaxed',
    bodySm: 'text-sm leading-relaxed',
    caption: 'text-xs uppercase tracking-widest font-bold',
    button: 'text-sm font-bold uppercase tracking-wider',
  },
  spacing: {
    sectionY: '5rem',
    sectionX: '1rem',
    containerMax: '88rem',
    gridGap: '1rem',
    elementGap: '0.75rem',
  },
  radius: {
    buttons: '0.5rem',
    cards: '0.75rem',
    images: '1rem',
    inputs: '0.5rem',
  },
  shadows: {
    card: '0 8px 16px rgba(255, 61, 0, 0.1)',
    elevated: '0 25px 50px rgba(0, 0, 0, 0.5)',
    button: '0 4px 8px rgba(255, 61, 0, 0.3)',
  },
  buttons: {
    primary: {
      background: '#ff3d00',
      color: '#ffffff',
      border: '2px solid #ff3d00',
      borderRadius: '0.5rem',
      padding: '0.875rem 2.5rem',
      fontSize: '0.875rem',
      fontWeight: '700',
      hoverBackground: '#ff6d00',
      hoverColor: '#ffffff',
    },
    secondary: {
      background: 'transparent',
      color: '#ff3d00',
      border: '2px solid #ff3d00',
      borderRadius: '0.5rem',
      padding: '0.875rem 2.5rem',
      fontSize: '0.875rem',
      fontWeight: '700',
      hoverBackground: 'rgba(255, 61, 0, 0.1)',
      hoverColor: '#ff3d00',
    },
    ghost: {
      background: 'transparent',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0.875rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: '700',
      hoverBackground: 'rgba(255, 255, 255, 0.1)',
      hoverColor: '#ffffff',
    },
  },
}

// ── SaaS Light (Linear/Vercel inspired, glassmorphism accents) ────
export const saasLight: ThemeTokens = {
  colors: {
    primary: '#6d28d9',        // Violet-600 (Linear purple)
    secondary: '#8b5cf6',      // Violet-500
    accent: '#a78bfa',         // Violet-400
    background: '#fafafa',      // Near white (Linear/SaaS background)
    foreground: '#18181b',     // Zinc-900 (dark text)
    muted: '#71717a',          // Zinc-500
    border: '#e4e4e7',         // Zinc-200
    card: '#ffffff',            // Pure white cards
    destructive: '#ef4444',    // Red-500
  },
  typography: {
    headingFont: "'Inter', system-ui, -apple-system, sans-serif",
    bodyFont: "'Inter', system-ui, -apple-system, sans-serif",
    monoFont: "'JetBrains Mono', 'Fira Code', monospace",
    h1: 'text-4xl md:text-5xl font-bold tracking-tight',
    h2: 'text-3xl md:text-4xl font-semibold tracking-tight',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    body: 'text-base leading-relaxed',
    bodySm: 'text-sm leading-relaxed',
    caption: 'text-xs font-medium uppercase tracking-wider',
    button: 'text-sm font-medium',
  },
  spacing: {
    sectionY: '3rem',
    sectionX: '1.25rem',
    containerMax: '80rem',
    gridGap: '1.25rem',
    elementGap: '1rem',
  },
  radius: {
    buttons: '0.375rem',      // rounded-md (Linear style)
    cards: '0.5rem',          // rounded-lg
    images: '0.75rem',        // rounded-xl
    inputs: '0.375rem',       // rounded-md
  },
  shadows: {
    card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    button: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  buttons: {
    primary: {
      background: '#6d28d9',
      color: '#ffffff',
      border: '1px solid #6d28d9',
      borderRadius: '0.375rem',
      padding: '0.625rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      hoverBackground: '#5b21b6',
      hoverColor: '#ffffff',
    },
    secondary: {
      background: 'transparent',
      color: '#6d28d9',
      border: '1px solid #6d28d9',
      borderRadius: '0.375rem',
      padding: '0.625rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      hoverBackground: 'rgba(109, 40, 217, 0.05)',
      hoverColor: '#6d28d9',
    },
    ghost: {
      background: 'transparent',
      color: '#18181b',
      border: 'none',
      borderRadius: '0.375rem',
      padding: '0.625rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      hoverBackground: 'rgba(24, 24, 27, 0.05)',
      hoverColor: '#18181b',
    },
  },
}

// ─── Theme Registry (for Puck editor) ──────────────────────────────

export const themes: Record<string, ThemeTokens> = {
  'luxury-fashion': luxuryFashion,
  'editorial-minimal': editorialMinimal,
  'streetwear-dark': streetwearDark,
  'saas-light': saasLight,
}

export type ThemeName = keyof typeof themes

export function getTheme(name: ThemeName): ThemeTokens {
  return themes[name] || themes[defaultTheme];
}

export const defaultTheme: ThemeName = 'luxury-fashion'
