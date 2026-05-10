/**
 * Milano V3 Layout Primitives
 * 
 * Core layout components following Milano V3 style:
 * - 12-column adaptive grid
 * - Asymmetric layouts preferred
 * - 20-32px radius (xl: 24px, 2xl: 32px)
 * - Soft elevated shadows
 * 
 * Visual DNA: Milan luxury + Linear density + Stripe layout + Vercel typography
 */

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RADIUS, SHADOWS, MOTION, GRID } from '../milano-v3-design-tokens'

// Puck field types
export interface PuckField {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'richText' | 'image' | 'select'
  label: string
  options?: { label: string; value: string }[]
  defaultValue?: any
}

export interface PuckSchema {
  fields: Record<string, PuckField>
  componentName: string
  icon?: string
}

// Motion variants for consistent animations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

/**
 * SectionWrapper - Main section container with optional background and padding
 */
export interface SectionWrapperProps {
  children: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'surface' | 'elevated' | 'glass' | 'brand'
  fullWidth?: boolean
  className?: string
  animate?: boolean
}

export const SectionWrapperSchema: PuckSchema = {
  componentName: 'SectionWrapper',
  icon: 'Layout',
  fields: {
    padding: {
      type: 'select',
      label: 'Padding',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' }
      ],
      defaultValue: 'lg'
    },
    background: {
      type: 'select',
      label: 'Background',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Surface', value: 'surface' },
        { label: 'Elevated', value: 'elevated' },
        { label: 'Glass', value: 'glass' },
        { label: 'Brand', value: 'brand' }
      ],
      defaultValue: 'default'
    },
    fullWidth: {
      type: 'boolean',
      label: 'Full Width',
      defaultValue: false
    },
    animate: {
      type: 'boolean',
      label: 'Animate',
      defaultValue: true
    }
  }
}

const paddingMap = {
  none: 'py-0',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24'
}

const backgroundMap = {
  default: 'bg-background',
  surface: 'bg-surface',
  elevated: 'bg-surfaceElevated',
  glass: 'bg-surfaceGlass backdrop-blur-md',
  brand: 'bg-brand'
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  padding = 'lg',
  background = 'default',
  fullWidth = false,
  className = '',
  animate = true
}) => {
  const Component = animate ? motion.section : 'section'
  
  return (
    <Component
      {...(animate ? fadeInUp : {})}
      className={`${paddingMap[padding]} ${backgroundMap[background]} ${className}`}
    >
      <div className={fullWidth ? 'w-full' : 'max-w-[1440px] mx-auto px-4 md:px-8'}>
        {children}
      </div>
    </Component>
  )
}

/**
 * Grid - 12-column adaptive grid with asymmetric support
 */
export interface GridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  asymmetric?: boolean
  className?: string
  animate?: boolean
}

export const GridSchema: PuckSchema = {
  componentName: 'Grid',
  icon: 'Grid',
  fields: {
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
        { label: '6 Columns', value: '6' },
        { label: '12 Columns', value: '12' }
      ],
      defaultValue: '12'
    },
    gap: {
      type: 'select',
      label: 'Gap',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' }
      ],
      defaultValue: 'md'
    },
    asymmetric: {
      type: 'boolean',
      label: 'Asymmetric Layout',
      defaultValue: false
    },
    animate: {
      type: 'boolean',
      label: 'Animate Children',
      defaultValue: true
    }
  }
}

const gapMap = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12'
}

const columnsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12'
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 12,
  gap = 'md',
  asymmetric = false,
  className = '',
  animate = true
}) => {
  const Component = animate ? motion.div : 'div'
  
  return (
    <Component
      {...(animate ? { ...staggerChildren, variants: staggerChildren } : {})}
      className={`grid ${columnsMap[columns]} ${gapMap[gap]} ${asymmetric ? 'auto-rows-min' : ''} ${className}`}
      style={{ gridTemplateColumns: asymmetric ? 'repeat(12, 1fr)' : undefined }}
    >
      {animate ? (
        <AnimatePresence>
          {React.Children.map(children, (child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              {child}
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        children
      )}
    </Component>
  )
}

/**
 * Stack - Vertical layout with consistent spacing
 */
export interface StackProps {
  children: React.ReactNode
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  className?: string
}

export const StackSchema: PuckSchema = {
  componentName: 'Stack',
  icon: 'Stack',
  fields: {
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' }
      ],
      defaultValue: 'md'
    },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Start', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'end' },
        { label: 'Stretch', value: 'stretch' }
      ],
      defaultValue: 'stretch'
    }
  }
}

const stackSpacingMap = {
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8'
}

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch'
}

export const Stack: React.FC<StackProps> = ({
  children,
  spacing = 'md',
  align = 'stretch',
  className = ''
}) => {
  return (
    <div className={`flex flex-col ${stackSpacingMap[spacing]} ${alignMap[align]} ${className}`}>
      {children}
    </div>
  )
}

/**
 * BentoGrid - Asymmetric grid layout inspired by Bento UI
 */
export interface BentoGridProps {
  children: React.ReactNode
  columns?: 3 | 4 | 6
  gap?: 'sm' | 'md' | 'lg'
  className?: string
  animate?: boolean
}

export const BentoGridSchema: PuckSchema = {
  componentName: 'BentoGrid',
  icon: 'Grid3x3',
  fields: {
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
        { label: '6 Columns', value: '6' }
      ],
      defaultValue: '4'
    },
    gap: {
      type: 'select',
      label: 'Gap',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ],
      defaultValue: 'md'
    },
    animate: {
      type: 'boolean',
      label: 'Animate',
      defaultValue: true
    }
  }
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  columns = 4,
  gap = 'md',
  className = '',
  animate = true
}) => {
  const Component = animate ? motion.div : 'div'
  
  const columnsMap = {
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  }
  
  const gapMap = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  }
  
  return (
    <Component
      {...(animate ? staggerChildren : {})}
      className={`grid ${columnsMap[columns]} ${gapMap[gap]} ${className}`}
    >
      {animate ? (
        React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </Component>
  )
}

/**
 * Masonry - Pinterest-style masonry layout
 */
export interface MasonryProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export const MasonrySchema: PuckSchema = {
  componentName: 'Masonry',
  icon: 'Columns',
  fields: {
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' }
      ],
      defaultValue: '3'
    },
    gap: {
      type: 'select',
      label: 'Gap',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ],
      defaultValue: 'md'
    }
  }
}

export const Masonry: React.FC<MasonryProps> = ({
  children,
  columns = 3,
  gap = 'md',
  className = ''
}) => {
  const columnsMap = {
    2: 'columns-1 md:columns-2',
    3: 'columns-1 md:columns-2 lg:columns-3',
    4: 'columns-1 md:columns-2 lg:columns-4'
  }
  
  const gapMap = {
    sm: 'gap-4 space-y-4',
    md: 'gap-6 space-y-6',
    lg: 'gap-8 space-y-8'
  }
  
  return (
    <div className={`${columnsMap[columns]} ${gapMap[gap]} ${className}`}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="break-inside-avoid mb-6">
          {child}
        </div>
      ))}
    </div>
  )
}

/**
 * Container - Content width container with max-width
 */
export interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: boolean
  className?: string
}

export const ContainerSchema: PuckSchema = {
  componentName: 'Container',
  icon: 'Container',
  fields: {
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small (640px)', value: 'sm' },
        { label: 'Medium (768px)', value: 'md' },
        { label: 'Large (1024px)', value: 'lg' },
        { label: 'Extra Large (1280px)', value: 'xl' },
        { label: 'Full Width', value: 'full' }
      ],
      defaultValue: 'lg'
    },
    padding: {
      type: 'boolean',
      label: 'Horizontal Padding',
      defaultValue: true
    }
  }
}

const containerSizeMap = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full'
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  padding = true,
  className = ''
}) => {
  return (
    <div className={`mx-auto ${containerSizeMap[size]} ${padding ? 'px-4 md:px-8' : ''} ${className}`}>
      {children}
    </div>
  )
}

/**
 * Surface - Elevated surface with shadow and border radius
 */
export interface SurfaceProps {
  children: React.ReactNode
  elevation?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'glass'
  radius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  background?: 'surface' | 'elevated' | 'glass'
  className?: string
  animate?: boolean
  onClick?: () => void
}

export const SurfaceSchema: PuckSchema = {
  componentName: 'Surface',
  icon: 'Square',
  fields: {
    elevation: {
      type: 'select',
      label: 'Elevation',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
        { label: '2XL', value: '2xl' },
        { label: 'Glass', value: 'glass' }
      ],
      defaultValue: 'md'
    },
    radius: {
      type: 'select',
      label: 'Border Radius',
      options: [
        { label: 'Small (8px)', value: 'sm' },
        { label: 'Medium (12px)', value: 'md' },
        { label: 'Large (16px)', value: 'lg' },
        { label: 'XL (24px)', value: 'xl' },
        { label: '2XL (32px)', value: '2xl' }
      ],
      defaultValue: 'xl'
    },
    padding: {
      type: 'select',
      label: 'Padding',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ],
      defaultValue: 'md'
    },
    background: {
      type: 'select',
      label: 'Background',
      options: [
        { label: 'Surface', value: 'surface' },
        { label: 'Elevated', value: 'elevated' },
        { label: 'Glass', value: 'glass' }
      ],
      defaultValue: 'surface'
    },
    animate: {
      type: 'boolean',
      label: 'Animate on Hover',
      defaultValue: true
    }
  }
}

const surfacePaddingMap = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}

export const Surface: React.FC<SurfaceProps> = ({
  children,
  elevation = 'md',
  radius = 'xl',
  padding = 'md',
  background = 'surface',
  className = '',
  animate = true,
  onClick
}) => {
  const Component = animate ? motion.div : 'div'
  
  const bgMap = {
    surface: 'bg-surface',
    elevated: 'bg-surfaceElevated',
    glass: 'bg-surfaceGlass backdrop-blur-md'
  }
  
  return (
    <Component
      {...(animate ? {
        whileHover: { y: -4, boxShadow: SHADOWS.lg },
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      } : {})}
      onClick={onClick}
      className={`${bgMap[background]} rounded-${radius} ${surfacePaddingMap[padding]} shadow-${elevation} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        borderRadius: RADIUS[radius],
        boxShadow: SHADOWS[elevation]
      }}
    >
      {children}
    </Component>
  )
}

/**
 * Sidebar - Sidebar navigation/layout component
 */
export interface SidebarProps {
  children: React.ReactNode
  position?: 'left' | 'right'
  width?: 'sm' | 'md' | 'lg'
  collapsed?: boolean
  collapsible?: boolean
  className?: string
}

export const SidebarSchema: PuckSchema = {
  componentName: 'Sidebar',
  icon: 'Sidebar',
  fields: {
    position: {
      type: 'select',
      label: 'Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' }
      ],
      defaultValue: 'left'
    },
    width: {
      type: 'select',
      label: 'Width',
      options: [
        { label: 'Small (240px)', value: 'sm' },
        { label: 'Medium (300px)', value: 'md' },
        { label: 'Large (360px)', value: 'lg' }
      ],
      defaultValue: 'md'
    },
    collapsible: {
      type: 'boolean',
      label: 'Collapsible',
      defaultValue: false
    }
  }
}

const sidebarWidthMap = {
  sm: 'w-[240px]',
  md: 'w-[300px]',
  lg: 'w-[360px]'
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  position = 'left',
  width = 'md',
  collapsed = false,
  collapsible = false,
  className = ''
}) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 0 : undefined }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`${sidebarWidthMap[width]} ${position === 'left' ? 'border-r' : 'border-l'} border-border min-h-screen overflow-y-auto ${collapsed ? 'overflow-hidden' : ''} ${className}`}
    >
      <div className={`${collapsed ? 'invisible' : 'visible'} p-6`}>
        {children}
      </div>
    </motion.aside>
  )
}

/**
 * AspectRatio - Maintain aspect ratio container
 */
export interface AspectRatioProps {
  children: React.ReactNode
  ratio?: '1:1' | '4:3' | '16:9' | '21:9'
  className?: string
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  children,
  ratio = '16:9',
  className = ''
}) => {
  const paddingTopMap = {
    '1:1': '100%',
    '4:3': '75%',
    '16:9': '56.25%',
    '21:9': '42.85%'
  }
  
  return (
    <div className={`relative ${className}`} style={{ paddingTop: paddingTopMap[ratio] }}>
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
}

// Export all components and schemas
export const LayoutPrimitives = {
  SectionWrapper,
  Grid,
  Stack,
  BentoGrid,
  Masonry,
  Container,
  Surface,
  Sidebar,
  AspectRatio
}

export const LayoutSchemas = {
  SectionWrapperSchema,
  GridSchema,
  StackSchema,
  BentoGridSchema,
  MasonrySchema,
  ContainerSchema,
  SurfaceSchema,
  SidebarSchema
}
