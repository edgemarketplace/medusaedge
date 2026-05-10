import React from 'react';
import { 
  fontFamily, 
  fontSize, 
  letterSpacing, 
  spacing, 
  lineHeight, 
  fontWeight 
} from '../milano-v3-design-tokens';

// Puck schema type definition for compatibility
type PuckSchema = {
  fields: Record<string, {
    type: string;
    label: string;
    options?: { label: string; value: string }[];
    min?: number;
    max?: number;
  }>;
};

// DisplayHeading: Largest display text, Canela serif, up to 7xl (4.5rem) max
interface DisplayHeadingProps {
  children: React.ReactNode;
  size?: keyof typeof fontSize;
  letterSpacing?: keyof typeof letterSpacing;
  className?: string;
}

export const DisplayHeading: React.FC<DisplayHeadingProps> = ({ 
  children, 
  size = '7xl', 
  letterSpacing = 'tighter', 
  className = '', 
  ...props 
}) => {
  return (
    <h1 
      className={`
        ${fontFamily.serif} 
        ${fontSize[size]} 
        ${letterSpacing[letterSpacing]} 
        ${lineHeight.tight} 
        ${spacing.marginBottom[6]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </h1>
  );
};

// EditorialHeading: Oversized editorial typography, serif, asymmetric grid support
interface EditorialHeadingProps extends DisplayHeadingProps {
  gridSpan?: number;
}

export const EditorialHeading: React.FC<EditorialHeadingProps> = ({ 
  children, 
  size = '7xl', 
  letterSpacing = 'tight', 
  gridSpan = 12, 
  className = '', 
  ...props 
}) => {
  return (
    <h2 
      className={`
        ${fontFamily.serif} 
        ${fontSize[size]} 
        ${letterSpacing[letterSpacing]} 
        ${lineHeight.snug} 
        ${spacing.marginBottom[8]} 
        ${spacing.paddingX[4]} 
        ${className}
      `}
      style={{ gridColumn: `span ${gridSpan}` }}
      {...props}
    >
      {children}
    </h2>
  );
};

// Eyebrow: Small UI label, Inter/grotesk sans, uppercase
interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({ children, className = '', ...props }) => {
  return (
    <span 
      className={`
        ${fontFamily.sans} 
        ${fontSize.sm} 
        ${letterSpacing.wide} 
        ${fontWeight.medium} 
        uppercase 
        ${spacing.marginBottom[2]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

// MetricText: Numeric stats, Inter/grotesk sans, bold
interface MetricTextProps {
  children: React.ReactNode;
  size?: keyof typeof fontSize;
  className?: string;
}

export const MetricText: React.FC<MetricTextProps> = ({ 
  children, 
  size = '3xl', 
  className = '', 
  ...props 
}) => {
  return (
    <div 
      className={`
        ${fontFamily.sans} 
        ${fontSize[size]} 
        ${fontWeight.bold} 
        ${letterSpacing.tight} 
        ${spacing.marginBottom[4]} 
        tabular-nums 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// RichText: Body content, Inter/grotesk sans, intelligent whitespace
interface RichTextProps {
  children: React.ReactNode;
  className?: string;
}

export const RichText: React.FC<RichTextProps> = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`
        ${fontFamily.sans} 
        ${fontSize.base} 
        ${lineHeight.relaxed} 
        ${spacing.marginY[4]} 
        ${spacing.paddingX[2]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Quote: Editorial quotes, Canela serif, italic with intelligent whitespace
interface QuoteProps {
  children: React.ReactNode;
  className?: string;
}

export const Quote: React.FC<QuoteProps> = ({ children, className = '', ...props }) => {
  return (
    <blockquote 
      className={`
        ${fontFamily.serif} 
        ${fontSize.xl} 
        ${lineHeight.relaxed} 
        ${letterSpacing.tight} 
        italic 
        ${spacing.marginY[6]} 
        ${spacing.paddingLeft[4]} 
        border-l-4 
        border-gray-200 
        ${className}
      `}
      {...props}
    >
      {children}
    </blockquote>
  );
};

// Puck-compatible schemas for all components
export const puckSchemas = {
  DisplayHeading: {
    fields: {
      content: { type: 'text', label: 'Heading Content' },
      size: { 
        type: 'select', 
        label: 'Font Size', 
        options: Object.keys(fontSize).map(k => ({ label: k, value: k })) 
      },
      letterSpacing: { 
        type: 'select', 
        label: 'Letter Spacing', 
        options: Object.keys(letterSpacing).map(k => ({ label: k, value: k })) 
      },
    },
  } as PuckSchema,
  EditorialHeading: {
    fields: {
      content: { type: 'text', label: 'Editorial Heading' },
      size: { 
        type: 'select', 
        label: 'Font Size', 
        options: Object.keys(fontSize).map(k => ({ label: k, value: k })) 
      },
      gridSpan: { type: 'number', label: 'Grid Span', min: 1, max: 12 },
    },
  } as PuckSchema,
  Eyebrow: {
    fields: {
      content: { type: 'text', label: 'Eyebrow Text' },
    },
  } as PuckSchema,
  MetricText: {
    fields: {
      content: { type: 'text', label: 'Metric Value' },
      size: { 
        type: 'select', 
        label: 'Size', 
        options: Object.keys(fontSize).map(k => ({ label: k, value: k })) 
      },
    },
  } as PuckSchema,
  RichText: {
    fields: {
      content: { type: 'rich-text', label: 'Rich Text Content' },
    },
  } as PuckSchema,
  Quote: {
    fields: {
      content: { type: 'text', label: 'Quote Text' },
    },
  } as PuckSchema,
};
