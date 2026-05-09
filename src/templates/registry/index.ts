// ═══════════════════════════════════════════════════════════════════
// Template Registry — Canonical Index
// 
// This is the single source of truth for all Antigravity storefront
// templates. Every template is a composable blueprint that resolves
// through sectionRegistry + composePage(), NOT static HTML.
//
// Usage:
//   import { templateRegistry, getTemplate, getTemplatesByCategory } 
//   from '@/templates/registry'
// ═══════════════════════════════════════════════════════════════════

import type { TemplateBlueprint, MarketplaceCategory } from "./types"
import type { CategoryDefinition } from "./categories"
import { CATEGORIES, getCategory, getCategoriesByIds } from "./categories"

// ── Fashion ──
import { studioModeApparel } from "./blueprints/fashion/studio-mode-apparel"
import { boutiqueSeasonalEdit } from "./blueprints/fashion/boutique-seasonal-edit"

// ── Activewear ──
import { performanceActivewear } from "./blueprints/activewear/performance-activewear"

// ── Beauty ──
import { cleanBeautyRitual } from "./blueprints/beauty/clean-beauty-ritual"
import { salonRetailBookingHybrid } from "./blueprints/beauty/salon-retail-booking-hybrid"
import { supplementScience } from "./blueprints/beauty/supplement-science"

// ── Food & Beverage ──
import { artisanCoffeeRoaster } from "./blueprints/food/artisan-coffee-roaster"
import { gourmetPantryMarket } from "./blueprints/food/gourmet-pantry-market"
import { bakeryPreorderPickup } from "./blueprints/food/bakery-preorder-pickup"

// ── Home & Decor ──
import { modernHomeEssentials } from "./blueprints/home/modern-home-essentials"
import { customFurnitureAtelier } from "./blueprints/home/custom-furniture-atelier"
import { outdoorLivingGarden } from "./blueprints/home/outdoor-living-garden"

// ── Pet Care ──
import { premiumPetGoods } from "./blueprints/pet/premium-pet-goods"
import { petGroomingRetail } from "./blueprints/pet/pet-grooming-retail"

// ── Baby & Kids ──
import { babyEssentialsBoutique } from "./blueprints/baby/baby-essentials-boutique"

// ── Toys & Education ──
import { educationalToysLearning } from "./blueprints/toys/educational-toys-learning"

// ── Wholesale & B2B ──
import { wholesaleCatalogPro } from "./blueprints/wholesale/wholesale-catalog-pro"

// ── Maker & Craft ──
import { makerMarketplaceShowcase } from "./blueprints/maker/maker-marketplace-showcase"

// ── Services ──
import { localRepairParts } from "./blueprints/service-commerce/local-repair-parts"

// ── Floral & Gifting ──
import { floralDeliveryOccasion } from "./blueprints/floral/floral-delivery-occasion"

// ═══════════════════════════════════════════════════════════════════
// Canonical Template Registry (all 20)
// ═══════════════════════════════════════════════════════════════════

export const templateRegistry: Record<string, TemplateBlueprint> = {
  [studioModeApparel.id]: studioModeApparel,
  [boutiqueSeasonalEdit.id]: boutiqueSeasonalEdit,
  [performanceActivewear.id]: performanceActivewear,
  [cleanBeautyRitual.id]: cleanBeautyRitual,
  [salonRetailBookingHybrid.id]: salonRetailBookingHybrid,
  [supplementScience.id]: supplementScience,
  [artisanCoffeeRoaster.id]: artisanCoffeeRoaster,
  [gourmetPantryMarket.id]: gourmetPantryMarket,
  [bakeryPreorderPickup.id]: bakeryPreorderPickup,
  [modernHomeEssentials.id]: modernHomeEssentials,
  [customFurnitureAtelier.id]: customFurnitureAtelier,
  [outdoorLivingGarden.id]: outdoorLivingGarden,
  [premiumPetGoods.id]: premiumPetGoods,
  [petGroomingRetail.id]: petGroomingRetail,
  [babyEssentialsBoutique.id]: babyEssentialsBoutique,
  [educationalToysLearning.id]: educationalToysLearning,
  [wholesaleCatalogPro.id]: wholesaleCatalogPro,
  [makerMarketplaceShowcase.id]: makerMarketplaceShowcase,
  [localRepairParts.id]: localRepairParts,
  [floralDeliveryOccasion.id]: floralDeliveryOccasion,
}

// ═══════════════════════════════════════════════════════════════════
// Query helpers
// ═══════════════════════════════════════════════════════════════════

export function getTemplate(id: string): TemplateBlueprint | undefined {
  return templateRegistry[id]
}

export function getAllTemplates(): TemplateBlueprint[] {
  return Object.values(templateRegistry)
}

export function getTemplatesByCategory(category: MarketplaceCategory): TemplateBlueprint[] {
  return Object.values(templateRegistry).filter(
    (t) => t.category === category || t.secondaryCategories?.includes(category)
  )
}

export function getCategoriesWithTemplates(): CategoryDefinition[] {
  const usedCategories = new Set<MarketplaceCategory>()
  Object.values(templateRegistry).forEach((t) => {
    usedCategories.add(t.category)
    t.secondaryCategories?.forEach((c) => usedCategories.add(c))
  })
  return CATEGORIES.filter((c) => usedCategories.has(c.id)).sort(
    (a, b) => a.sortOrder - b.sortOrder
  )
}

export function getTemplatesByComplexity(complexity: string): TemplateBlueprint[] {
  return Object.values(templateRegistry).filter((t) => t.complexity === complexity)
}

export function getAiReadyTemplates(): TemplateBlueprint[] {
  return Object.values(templateRegistry).filter((t) => t.aiReady)
}

export function getTemplatesBySalesModel(model: string): TemplateBlueprint[] {
  return Object.values(templateRegistry).filter((t) => t.salesModel.includes(model as any))
}

export function searchTemplates(query: string): TemplateBlueprint[] {
  const q = query.toLowerCase()
  return Object.values(templateRegistry).filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.bestFor.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.aestheticTags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.industry.toLowerCase().includes(q)
  )
}

// Re-export types for convenience
export type { TemplateBlueprint, MarketplaceCategory, ThemeVariant, AestheticTag, CompositionComplexity } from "./types"
export { CATEGORIES, getCategory, getCategoriesByIds } from "./categories"
