/**
 * Milano V3 Commerce Primitives
 * 
 * ProductCardV3, MarketplaceCard, CollectionCard, AgentCard, VendorCard
 * Commerce-native editing, Medusa bindings ready
 * Elevated cards, image-led, typography-first
 */

import React from 'react'
import { motion } from 'framer-motion'
import { TYPOGRAPHY, RADIUS, SHADOWS, MOTION } from '../milano-v3-design-tokens'

// Types
export type ProductCardV3Props = {
  title: string
  price: string
  compareAtPrice?: string
  image: string
  hoverImage?: string
  badge?: string
  onSale?: boolean
  inStock?: boolean
  medusaHandle?: string
}

export type MarketplaceCardProps = {
  title: string
  description: string
  image: string
  vendor: string
  rating: number
  productCount: number
  category: string
}

export type CollectionCardProps = {
  title: string
  image: string
  productCount: number
  description?: string
  href?: string
}

export type AgentCardProps = {
  name: string
  description: string
  icon: string
  category: string
  rating: number
  usageCount: number
  isNew?: boolean
}

export type VendorCardProps = {
  name: string
  logo: string
  description: string
  productCount: number
  rating: number
  location: string
  verified?: boolean
}

// ProductCardV3 - Luxury PDP style, elevated card
export function ProductCardV3({
  title = "Premium Product",
  price = "$99.00",
  compareAtPrice,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  hoverImage,
  badge,
  onSale = false,
  inStock = true,
  medusaHandle
}: ProductCardV3Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      style={{ borderRadius: RADIUS.xl }}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {hoverImage && (
          <img
            src={hoverImage}
            alt={`${title} hover`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        
        {/* Badges */}
        {badge && (
          <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
            {badge}
          </div>
        )}
        {onSale && !badge && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            SALE
          </div>
        )}
        
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <button className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
            Quick Add
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-gray-900 line-clamp-2" style={{ fontFamily: TYPOGRAPHY.fonts.ui }}>
          {title}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900" style={{ fontFamily: TYPOGRAPHY.fonts.grotesk }}>
            {price}
          </span>
          {compareAtPrice && (
            <span className="text-sm text-gray-500 line-through">{compareAtPrice}</span>
          )}
        </div>

        {!inStock && (
          <p className="text-sm text-red-600 font-medium">Out of Stock</p>
        )}
      </div>
    </motion.div>
  )
}

// MarketplaceCard - Grid items for marketplace discovery
export function MarketplaceCard({
  title = "Marketplace Store",
  description = "Premium products and curated collections",
  image = "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  vendor = "Verified Vendor",
  rating = 4.8,
  productCount = 120,
  category = "Fashion"
}: MarketplaceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      style={{ borderRadius: RADIUS.lg }}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
          {category}
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-gray-900" style={{ fontFamily: TYPOGRAPHY.fonts.ui }}>{title}</h3>
          <p className="text-sm text-gray-600" style={{ fontFamily: TYPOGRAPHY.fonts.grotesk }}>{vendor}</p>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-semibold">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">{productCount} products</span>
        </div>
      </div>
    </motion.div>
  )
}

// CollectionCard - Category discovery
export function CollectionCard({
  title = "New Collection",
  image = "https://images.unsplash.com/photo-1523381210434-7f2830dec547",
  productCount = 48,
  description,
  href = "#"
}: CollectionCardProps) {
  return (
    <a href={href} className="group block relative overflow-hidden rounded-2xl" style={{ borderRadius: RADIUS.xl }}>
      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: TYPOGRAPHY.fonts.display }}>
          {title}
        </h3>
        {description && (
          <p className="text-white/80 text-sm mb-2">{description}</p>
        )}
        <p className="text-white/70 text-sm">{productCount} products</p>
      </div>
    </a>
  )
}

// AgentCard - AI marketplace
export function AgentCard({
  name = "AI Assistant",
  description = "Intelligent automation for your workflow",
  icon = "🤖",
  category = "Productivity",
  rating = 4.9,
  usageCount = 1200,
  isNew = false
}: AgentCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
      style={{ borderRadius: RADIUS.lg }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        {isNew && (
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
        )}
      </div>
      
      <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: TYPOGRAPHY.fonts.ui }}>
        {name}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-semibold">{rating}</span>
        </div>
        <span className="text-sm text-gray-500">{usageCount.toLocaleString()} uses</span>
      </div>
      
      <div className="mt-3">
        <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
    </motion.div>
  )
}

// VendorCard - Marketplace vendors
export function VendorCard({
  name = "Premium Vendor",
  logo = "https://images.unsplash.com/photo-1560472354-b33ff0c00887",
  description = "Quality products and exceptional service",
  productCount = 200,
  rating = 4.7,
  location = "New York, NY",
  verified = true
}: VendorCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      style={{ borderRadius: RADIUS.lg }}
    >
      <img src={logo} alt={name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-gray-900 truncate" style={{ fontFamily: TYPOGRAPHY.fonts.ui }}>
            {name}
          </h3>
          {verified && (
            <span className="text-blue-600 flex-shrink-0" title="Verified">✓</span>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">{description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{productCount} products</span>
          <span>★ {rating}</span>
          <span>{location}</span>
        </div>
      </div>
    </motion.div>
  )
}

// Puck Schemas for commerce components
export const CommerceSchemas = {
  ProductCardV3: {
    fields: {
      title: { type: 'text' },
      price: { type: 'text' },
      compareAtPrice: { type: 'text' },
      image: { type: 'text' },
      hoverImage: { type: 'text' },
      badge: { type: 'text' },
      onSale: { type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      inStock: { type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] }
    },
    defaultProps: {
      title: "Premium Product",
      price: "$99.00",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    }
  },
  MarketplaceCard: {
    fields: {
      title: { type: 'text' },
      description: { type: 'textarea' },
      image: { type: 'text' },
      vendor: { type: 'text' },
      rating: { type: 'number' },
      productCount: { type: 'number' },
      category: { type: 'text' }
    }
  },
  CollectionCard: {
    fields: {
      title: { type: 'text' },
      image: { type: 'text' },
      productCount: { type: 'number' },
      description: { type: 'textarea' },
      href: { type: 'text' }
    }
  },
  AgentCard: {
    fields: {
      name: { type: 'text' },
      description: { type: 'textarea' },
      icon: { type: 'text' },
      category: { type: 'text' },
      rating: { type: 'number' },
      usageCount: { type: 'number' },
      isNew: { type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] }
    }
  },
  VendorCard: {
    fields: {
      name: { type: 'text' },
      logo: { type: 'text' },
      description: { type: 'textarea' },
      productCount: { type: 'number' },
      rating: { type: 'number' },
      location: { type: 'text' },
      verified: { type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] }
    }
  }
}
