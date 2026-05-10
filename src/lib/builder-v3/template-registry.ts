/**
 * Template Registry - Milano V3
 * 
 * All 10 Professional Puck-Ready Templates
 * Each template defines: id, name, category, preset data, components
 */

// Template categories
export type TemplateCategory = 
  | 'editorial'
  | 'marketplace'
  | 'saas'
  | 'enterprise'
  | 'creator'
  | 'documentation'
  | 'universal'

// Template interface (simplified for Puck compatibility)
export interface TemplateDefinition {
  id: string
  name: string
  category: TemplateCategory
  description: string
  previewImage: string
  theme: string
  components: string[]
  defaultData?: Record<string, any>
}

// ============================================
// TEMPLATE 1: Milano Editorial Commerce
// ============================================
export const MILANO_EDITORIAL_COMMERCE: TemplateDefinition = {
  id: 'milano-editorial-commerce',
  name: 'Editorial Commerce',
  category: 'editorial',
  description: 'Luxury fashion/editorial storefront with cinematic hero, lookbook, and story grids',
  previewImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae',
  theme: 'luxury-fashion',
  components: ['CinematicHero', 'FloatingProductCard', 'StoryGrid', 'ImmersiveLookbook', 'QuoteRail', 'NewsletterForm'],
  defaultData: {
    hero: {
      heading: "Push Limits.",
      subheading: "Engineered for maximum output. Discover the new collection.",
      ctaText: "Shop New Arrivals",
      backgroundImage: "https://images.unsplash.com/photo-1556906781-9a2e7cb0b1d2"
    }
  }
}

// ============================================
// TEMPLATE 2: AI Marketplace Dashboard
// ============================================
export const AI_MARKETPLACE_DASHBOARD: TemplateDefinition = {
  id: 'ai-marketplace-dashboard',
  name: 'AI Marketplace Dashboard',
  category: 'marketplace',
  description: 'Edge AI marketplace homepage with metrics, agent grid, and activity feeds',
  previewImage: 'https://images.unsplash.com/photo-1677442136019-2185b36b8e54',
  theme: 'saas-light',
  components: ['MarketplaceHero', 'AgentGrid', 'MetricsRibbon', 'DeploymentPanel', 'ActivityFeed'],
  defaultData: {
    title: "AI Agent Marketplace",
    subtitle: "Discover intelligent automation for your workflow"
  }
}

// ============================================
// TEMPLATE 3: SaaS Product Showcase
// ============================================
export const SAAS_PRODUCT_SHOWCASE: TemplateDefinition = {
  id: 'saas-product-showcase',
  name: 'SaaS Product Showcase',
  category: 'saas',
  description: 'Product launches + infrastructure tools with sticky nav, architecture diagrams, pricing',
  previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  theme: 'saas-light',
  components: ['SplitHero', 'FeatureRail', 'ArchitectureDiagram', 'PricingTable', 'Testimonials', 'CTASection'],
  defaultData: {
    heading: "Build Faster. Scale Smarter.",
    subheading: "The modern infrastructure platform for high-growth teams."
  }
}

// ============================================
// TEMPLATE 4: Interactive AI Studio
// ============================================
export const INTERACTIVE_AI_STUDIO: TemplateDefinition = {
  id: 'interactive-ai-studio',
  name: 'Interactive AI Studio',
  category: 'marketplace',
  description: 'AI workflow marketplace with node diagrams, drag workflow previews, prompt gallery',
  previewImage: 'https://images.unsplash.com/photo-1677442136903-cfa4681f8e5f',
  theme: 'saas-light',
  components: ['StudioHero', 'WorkflowBuilder', 'IntegrationsGrid', 'AgentRecipes', 'VideoExplainers'],
  defaultData: {
    title: "AI Studio",
    subtitle: "Build, test, and deploy AI workflows"
  }
}

// ============================================
// TEMPLATE 5: Luxury Product PDP
// ============================================
export const LUXURY_PRODUCT_PDP: TemplateDefinition = {
  id: 'luxury-product-pdp',
  name: 'Luxury Product PDP',
  category: 'editorial',
  description: 'Premium marketplace product detail with sticky gallery, cinematic zoom, floating purchase rail',
  previewImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  theme: 'luxury-fashion',
  components: ['StickyGallery', 'ProductStory', 'VariantStudio', 'SocialProof', 'RelatedProducts'],
  defaultData: {
    productName: "Premium Leather Jacket",
    price: "$899.00",
    description: "Handcrafted from premium full-grain leather"
  }
}

// ============================================
// TEMPLATE 6: Marketplace Collections
// ============================================
export const MARKETPLACE_COLLECTIONS: TemplateDefinition = {
  id: 'marketplace-collections',
  name: 'Marketplace Collections',
  category: 'marketplace',
  description: 'Category discovery with collection hero, dynamic filters, bento grid, AI recommendations',
  previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
  theme: 'luxury-fashion',
  components: ['CollectionHero', 'DynamicFilters', 'BentoGrid', 'FeaturedVendors', 'AIRecommendations'],
  defaultData: {
    title: "Collections",
    subtitle: "Discover curated product collections"
  }
}

// ============================================
// TEMPLATE 7: Enterprise Landing
// ============================================
export const ENTERPRISE_LANDING: TemplateDefinition = {
  id: 'enterprise-landing',
  name: 'Enterprise Landing',
  category: 'enterprise',
  description: 'Enterprise conversion with executive hero, compliance, integrations, ROI metrics, customer stories',
  previewImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
  theme: 'enterprise-dark',
  components: ['ExecutiveHero', 'ComplianceMatrix', 'IntegrationsGrid', 'ROIMetrics', 'CustomerStories'],
  defaultData: {
    title: "Enterprise Grade Solutions",
    subtitle: "Secure, scalable, and compliant"
  }
}

// ============================================
// TEMPLATE 8: Creator / Influencer Commerce
// ============================================
export const CREATOR_INFLUENCER_COMMERCE: TemplateDefinition = {
  id: 'creator-influencer-commerce',
  name: 'Creator Commerce',
  category: 'creator',
  description: 'UGC commerce with creator hero, TikTok rail, shop-the-look, live products, social feed',
  previewImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653a1',
  theme: 'streetwear-dark',
  components: ['CreatorHero', 'TikTokRail', 'ShopTheLook', 'LiveProducts', 'SocialFeed'],
  defaultData: {
    creatorName: "Jane Doe",
    tagline: "Style influencer & content creator"
  }
}

// ============================================
// TEMPLATE 9: Knowledge / Documentation
// ============================================
export const KNOWLEDGE_DOCUMENTATION: TemplateDefinition = {
  id: 'knowledge-documentation',
  name: 'Knowledge Hub',
  category: 'documentation',
  description: 'Developer + docs marketplace with search hero, quick start, API modules, tutorials, templates',
  previewImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  theme: 'saas-light',
  components: ['SearchHero', 'QuickStart', 'APIModules', 'Tutorials', 'Templates'],
  defaultData: {
    title: "Documentation",
    subtitle: "Everything you need to get started"
  }
}

// ============================================
// TEMPLATE 10: Hyper Modular Universal Homepage
// ============================================
export const HYPER_MODULAR_UNIVERSAL: TemplateDefinition = {
  id: 'hyper-modular-universal',
  name: 'Universal Homepage',
  category: 'universal',
  description: 'Default marketplace shell with fully slot-based adaptive composition',
  previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  theme: 'luxury-fashion',
  components: ['HeroZone', 'CommerceZone', 'ContentZone', 'SocialZone', 'AIZone', 'ConversionZone'],
  defaultData: {
    title: "Welcome to Edge Marketplace",
    subtitle: "Your premier destination for premium products"
  }
}

// ============================================
// TEMPLATE REGISTRY EXPORT
// ============================================
export const TEMPLATE_REGISTRY: TemplateDefinition[] = [
  MILANO_EDITORIAL_COMMERCE,
  AI_MARKETPLACE_DASHBOARD,
  SAAS_PRODUCT_SHOWCASE,
  INTERACTIVE_AI_STUDIO,
  LUXURY_PRODUCT_PDP,
  MARKETPLACE_COLLECTIONS,
  ENTERPRISE_LANDING,
  CREATOR_INFLUENCER_COMMERCE,
  KNOWLEDGE_DOCUMENTATION,
  HYPER_MODULAR_UNIVERSAL
]

// Helper functions
export function getTemplateById(id: string): TemplateDefinition | undefined {
  return TEMPLATE_REGISTRY.find(t => t.id === id)
}

export function getTemplatesByCategory(category: TemplateCategory): TemplateDefinition[] {
  return TEMPLATE_REGISTRY.filter(t => t.category === category)
}

export function getAllTemplates(): TemplateDefinition[] {
  return TEMPLATE_REGISTRY
}
