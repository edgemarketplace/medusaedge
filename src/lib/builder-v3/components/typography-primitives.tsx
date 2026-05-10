import React from 'react';
import { TYPOGRAPHY } from '../milano-v3-design-tokens';

// Puck schema type definition
type PuckSchema = {
  fields: Record<string, {
    type: string;
    label: string;
    options?: { label: string; value: string }[];
    min?: number;
    max?: number;
  }>;
};

// DisplayHeading: Largest display text, Canela serif, up to 7xl (4.5rem)
interface DisplayHeadingProps {
  children: React.ReactNode;
  size?: keyof typeof TYPOGRAPHY.sizes;
  letterSpacing?: keyof typeof TYPOGRAPHY.letterSpacing;
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
      className={`${TYPOGRAPHY.fonts.display} ${TYPOGRAPHY.sizes[size]} ${TYPOGRAPHY.letterSpacing[letterSpacing]} ${TYPOGRAPHY.lineHeight.tight} ${className}`}
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
      className={`${TYPOGRAPHY.fonts.display} ${TYPOGRAPHY.sizes[size]} ${TYPOGRAPHY.letterSpacing[letterSpacing]} ${TYPOGRAPHY.lineHeight.tight} ${className}`}
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
      className={`${TYPOGRAPHY.fonts.grotesk} ${TYPOGRAPHY.sizes.sm} ${TYPOGRAPHY.letterSpacing.wide} ${TYPOGRAPHY.weights.medium} uppercase ${TYPOGRAPHY.spacing.marginBottom[2]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// MetricText: Numeric stats, Inter/grotesk sans, bold
interface MetricTextProps {
  children: React.ReactNode;
  size?: keyof typeof TYPOGRAPHY.sizes;
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
      className={`${TYPOGRAPHY.fonts.grotesk} ${TYPOGRAPHY.sizes[size]} ${TYPOGRAPHY.weights.bold} ${TYPOGRAPHY.letterSpacing.tight} tabular-nums ${TYPOGRAPHY.spacing.marginBottom[4]} ${className}`}
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
      className={`${TYPOGRAPHY.fonts.grotesk} ${TYPOGRAPHY.sizes.base} ${TYPOGRAPHY.lineHeight.relaxed} ${TYPOGRAPHY.spacing.marginY[4]} ${TYPOGRAPHY.spacing.paddingX[2]} ${className}`}
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
      className={`${TYPOGRAPHY.fonts.display} ${TYPOGRAPHY.sizes.xl} ${TYPOGRAPHY.lineHeight.relaxed} ${TYPOGRAPHY.letterSpacing.tight} italic ${TYPOGRAPHY.spacing.marginY[6]} ${TYPOGRAPHY.spacing.paddingLeft[4]} border-l-4 border-gray-200 ${className}`}
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
        options: Object.keys(TYPOGRAPHY.sizes).map(k => ({ label: k, value: k }))
      },
      letterSpacing: {
        type: 'select',
        label: 'Letter Spacing',
        options: Object.keys(TYPOGRAPHY.letterSpacing).map(k => ({ label: k, value: k }))
      },
    },
  } as PuckSchema,
  EditorialHeading: {
    fields: {
      content: { type: 'text', label: 'Editorial Heading' },
      size: {
        type: 'select',
        label: 'Font Size',
        options: Object.keys(TYPOGRAPHY.sizes).map(k => ({ label: k, value: k }))
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
        options: Object.keys(TYPOGRAPHY.sizes).map(k => ({ label: k, value: k }))
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
