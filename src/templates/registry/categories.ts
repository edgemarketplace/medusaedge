// ═══════════════════════════════════════════════════════════════════
// Template Registry — Category Definitions
// Defines the category taxonomy used in the left-rail marketplace UX.
// ═══════════════════════════════════════════════════════════════════

import type { MarketplaceCategory } from "./types"

export interface CategoryDefinition {
  id: MarketplaceCategory
  label: string
  icon: string
  description: string
  sortOrder: number
  accent: string  // Tailwind gradient
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: "fashion",
    label: "Fashion",
    icon: "👗",
    description: "Apparel, accessories, and style-driven storefronts",
    sortOrder: 1,
    accent: "from-zinc-900 to-stone-300",
  },
  {
    id: "beauty",
    label: "Beauty",
    icon: "✨",
    description: "Skincare, cosmetics, and self-care brands",
    sortOrder: 2,
    accent: "from-emerald-200 to-stone-50",
  },
  {
    id: "activewear",
    label: "Activewear",
    icon: "🏃",
    description: "Fitness apparel, athleisure, and performance gear",
    sortOrder: 3,
    accent: "from-lime-400 to-zinc-950",
  },
  {
    id: "creator-commerce",
    label: "Creator Commerce",
    icon: "🎨",
    description: "Independent creators, digital products, and personal brands",
    sortOrder: 4,
    accent: "from-orange-500 to-stone-200",
  },
  {
    id: "services",
    label: "Services",
    icon: "🛠️",
    description: "Service businesses with booking, quotes, and scheduling",
    sortOrder: 5,
    accent: "from-emerald-500 to-cyan-500",
  },
  {
    id: "food-beverage",
    label: "Food & Beverage",
    icon: "🍽️",
    description: "Restaurants, food brands, bakeries, and specialty foods",
    sortOrder: 6,
    accent: "from-amber-900 to-stone-200",
  },
  {
    id: "local-marketplace",
    label: "Local Marketplace",
    icon: "📍",
    description: "Local-first businesses with pickup, delivery, and community focus",
    sortOrder: 7,
    accent: "from-blue-500 to-cyan-300",
  },
  {
    id: "luxury-retail",
    label: "Luxury Retail",
    icon: "💎",
    description: "Premium and luxury brand storefronts",
    sortOrder: 8,
    accent: "from-amber-950 to-stone-300",
  },
  {
    id: "boutique",
    label: "Boutique",
    icon: "🛍️",
    description: "Curated boutiques, gift shops, and seasonal edits",
    sortOrder: 9,
    accent: "from-rose-500 to-amber-100",
  },
  {
    id: "event-commerce",
    label: "Event Commerce",
    icon: "🎪",
    description: "Event services, rentals, florals, and occasion-based businesses",
    sortOrder: 10,
    accent: "from-violet-500 to-rose-300",
  },
  {
    id: "home-decor",
    label: "Home & Decor",
    icon: "🏠",
    description: "Home goods, furniture, and interior accessories",
    sortOrder: 11,
    accent: "from-stone-400 to-slate-100",
  },
  {
    id: "pet-care",
    label: "Pet Care",
    icon: "🐾",
    description: "Pet products, grooming, and pet services",
    sortOrder: 12,
    accent: "from-amber-400 to-emerald-100",
  },
  {
    id: "baby-kids",
    label: "Baby & Kids",
    icon: "🍼",
    description: "Baby essentials, nursery, and children's products",
    sortOrder: 13,
    accent: "from-rose-200 to-sky-50",
  },
  {
    id: "toys-education",
    label: "Toys & Education",
    icon: "🧩",
    description: "Educational toys, learning kits, and STEM products",
    sortOrder: 14,
    accent: "from-yellow-300 to-blue-500",
  },
  {
    id: "wholesale-b2b",
    label: "Wholesale & B2B",
    icon: "📦",
    description: "B2B catalogs, wholesale suppliers, and trade accounts",
    sortOrder: 15,
    accent: "from-slate-800 to-slate-200",
  },
  {
    id: "maker-craft",
    label: "Maker & Craft",
    icon: "🪡",
    description: "Handmade goods, artisan collectives, and craft marketplaces",
    sortOrder: 16,
    accent: "from-amber-600 to-stone-100",
  },
  {
    id: "floral-gifting",
    label: "Floral & Gifting",
    icon: "💐",
    description: "Florists, gift shops, and occasion-based delivery",
    sortOrder: 17,
    accent: "from-rose-500 to-violet-200",
  },
]

export function getCategory(id: MarketplaceCategory): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.id === id)
}

export function getCategoriesByIds(ids: MarketplaceCategory[]): CategoryDefinition[] {
  return CATEGORIES.filter((c) => ids.includes(c.id))
}
