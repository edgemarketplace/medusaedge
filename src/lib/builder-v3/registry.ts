/**
 * Commerce Component Registry - Builder v3
 * 
 * Milano-to-Puck mappings for Storefront Design System Platform
 * Each component is React-native, schema-driven, and commerce-aware
 */

import type { Config } from "@puckeditor/core";

// ============================================================================
// COMPONENT CATEGORIES (Milano-inspired)
// ============================================================================

export const CATEGORIES = {
  GLOBAL: "🎬 Global",
  HERO: "🎬 Hero Sections", 
  COMMERCE: "🛒 Commerce",
  VISUAL: "📸 Visual Storytelling",
  CONVERSION: "🎯 Conversion",
  SOCIAL: "💬 Social Proof",
  CONTENT: "📝 Content & Info",
  BOOKING: "📅 Booking & Services",
} as const;

// ============================================================================
// COMPONENT REGISTRY INTERFACE
// ============================================================================

export interface ComponentRegistryEntry {
  type: string;
  category: keyof typeof CATEGORIES;
  label: string;
  description: string;
  schema: Record<string, any>;
  variants: string[];
  component?: React.ComponentType<any>; // Optional - loaded separately
  defaultProps: Record<string, any>;
}

// ============================================================================
// HERO VARIANTS (Milano "Slideshow" → Puck mappings)
// ============================================================================

export const HeroEditorial = { 
  type: "HeroEditorial",
  category: "HERO" as const,
  label: "Editorial Hero",
  description: "Large headline, minimal text, luxury feel (Milano Slideshow style)",
  variants: ["editorial", "cinematic", "split-image", "centered-minimal"],
  schema: {
    headline: { type: "text" },
    subheadline: { type: "textarea" },
    ctaText: { type: "text" },
    ctaLink: { type: "text" },
    backgroundImage: { type: "image" },
    theme: { type: "text" }, // injected automatically
  },
  defaultProps: {
    headline: "THE FALL EDIT",
    subheadline: "Oversized silhouettes and tactile fabrics",
    ctaText: "SHOP NOW",
    ctaLink: "#",
    backgroundImage: "",
  },
};

export const HeroSplit = {
  type: "HeroSplit", 
  category: "HERO" as const,
  label: "Split Hero",
  description: "Image + text side by side (Milano Split Hero)",
  variants: ["left-image", "right-image", "diagonal", "overlap"],
  schema: {
    headline: { type: "text" },
    subheadline: { type: "textarea" },
    ctaText: { type: "text" },
    imagePosition: { 
      type: "select", 
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ] 
    },
    backgroundImage: { type: "image" },
    theme: { type: "text" },
  },
  defaultProps: {
    headline: "PUSH LIMITS.",
    subheadline: "Engineered for maximum output",
    ctaText: "SHOP NEW ARRIVALS",
    imagePosition: "right",
  },
};

export const HeroMinimal = {
  type: "HeroMinimal",
  category: "HERO" as const,
  label: "Centered Minimal",
  description: "Clean, centered content (Milano Minimal Hero)",
  variants: ["centered", "top-aligned", "bottom-overlay"],
  schema: {
    headline: { type: "text" },
    subheadline: { type: "textarea" },
    ctaText: { type: "text" },
    backgroundColor: { type: "text" },
    theme: { type: "text" },
  },
  defaultProps: {
    headline: "SPRING COLLECTION",
    subheadline: "Light fabrics, fresh colors",
    ctaText: "EXPLORE",
  },
};

// ============================================================================
// COMMERCE COMPONENTS (Milano Collection → Puck)
// ============================================================================

export const ProductGridLuxury = {
  type: "ProductGridLuxury",
  category: "COMMERCE" as const,
  label: "Product Grid (Luxury)",
  description: "Curated product grid with large imagery (Milano Collection Packery)",
  variants: ["masonry", "uniform", "featured-first", "lookbook-style"],
  schema: {
    title: { type: "text" },
    collectionId: { type: "text" }, // Medusa binding
    productCount: { type: "number" },
    columns: { 
      type: "select",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ]
    },
    theme: { type: "text" },
  },
  defaultProps: {
    title: "HIGH PERFORMANCE GEAR",
    collectionId: "new-arrivals",
    productCount: 6,
    columns: "3",
  },
};

export const FeaturedProduct = {
  type: "FeaturedProduct",
  category: "COMMERCE" as const,
  label: "Featured Product",
  description: "Single product spotlight (Milano Product Deal)",
  variants: ["large-image", "side-by-side", "sticky-details", "video-background"],
  schema: {
    productId: { type: "text" }, // Medusa binding
    showPrice: { type: "select", options: [{ label: "Yes", value: "true" }, { label: "No", value: "false" }] },
    showAddToCart: { type: "select", options: [{ label: "Yes", value: "true" }, { label: "No", value: "false" }] },
    theme: { type: "text" },
  },
  defaultProps: {
    productId: "",
    showPrice: "true",
    showAddToCart: "true",
  },
};

export const CollectionTabs = {
  type: "CollectionTabs",
  category: "COMMERCE" as const,
  label: "Collection Tabs",
  description: "Tabbed collection browser (Milano Shop by Category)",
  variants: ["horizontal", "vertical", "pill-style", "underline"],
  schema: {
    collections: { 
      type: "array",
      arrayFields: {
        id: { type: "text" },
        label: { type: "text" },
        image: { type: "image" },
      }
    },
    theme: { type: "text" },
  },
  defaultProps: {
    collections: [
      { id: "men", label: "MEN", image: "" },
      { id: "women", label: "WOMEN", image: "" },
      { id: "equipment", label: "EQUIPMENT", image: "" },
    ],
  },
};

// ============================================================================
// VISUAL STORYTELLING (Milano Lookbook → Puck)
// ============================================================================

export const LookbookHotspots = {
  type: "LookbookHotspots",
  category: "VISUAL" as const,
  label: "Shoppable Lookbook",
  description: "Image with clickable product hotspots (Milano Lookbook Product)",
  variants: ["overlay", "side-panel", "bottom-drawer", "zoom-on-hover"],
  schema: {
    image: { type: "image" },
    hotspots: {
      type: "array",
      arrayFields: {
        x: { type: "number" },
        y: { type: "number" },
        productId: { type: "text" },
      }
    },
    theme: { type: "text" },
  },
  defaultProps: {
    image: "",
    hotspots: [],
  },
};

// ============================================================================
// CONVERSION COMPONENTS
// ============================================================================

export const NewsletterInline = {
  type: "NewsletterInline",
  category: "CONVERSION" as const,
  label: "Newsletter CTA",
  description: "Inline email capture (Milano Newsletter)",
  variants: ["minimal", "boxed", "full-width", "with-image"],
  schema: {
    headline: { type: "text" },
    description: { type: "textarea" },
    placeholder: { type: "text" },
    buttonText: { type: "text" },
    theme: { type: "text" },
  },
  defaultProps: {
    headline: "JOIN THE CLUB",
    description: "Get early access to new drops and exclusive perks",
    placeholder: "Enter your email",
    buttonText: "SUBSCRIBE",
  },
};

export const CountdownFeatured = {
  type: "CountdownFeatured",
  category: "CONVERSION" as const,
  label: "Countdown + Product",
  description: "Urgency + product combo (Milano Product Deal + Countdown)",
  variants: ["top-banner", "inline", "overlay", "sticky-bottom"],
  schema: {
    productId: { type: "text" },
    endDate: { type: "text" },
    headline: { type: "text" },
    theme: { type: "text" },
  },
  defaultProps: {
    productId: "",
    endDate: "",
    headline: "LIMITED TIME OFFER",
  },
};

// ============================================================================
// SOCIAL PROOF
// ============================================================================

export const TestimonialsCarousel = {
  type: "TestimonialsCarousel",
  category: "SOCIAL" as const,
  label: "Testimonials Carousel",
  description: "Sliding testimonials (Milano Testimonials)",
  variants: ["cards", "quotes", "video-testimonials", "minimal"],
  schema: {
    testimonials: {
      type: "array",
      arrayFields: {
        name: { type: "text" },
        text: { type: "textarea" },
        avatar: { type: "image" },
        rating: { type: "number" },
      }
    },
    theme: { type: "text" },
  },
  defaultProps: {
    testimonials: [
      { name: "Sarah M.", text: "Best activewear I've ever worn.", avatar: "", rating: 5 },
    ],
  },
};

// ============================================================================
// GLOBAL COMPONENTS
// ============================================================================

export const AnnouncementBar = {
  type: "AnnouncementBar",
  category: "GLOBAL" as const,
  label: "Announcement Bar",
  description: "Top bar for promotions (Milano Announcement)",
  variants: ["minimal", "with-dismiss", "with-countdown", "full-width"],
  schema: {
    text: { type: "text" },
    link: { type: "text" },
    backgroundColor: { type: "text" },
    textColor: { type: "text" },
    theme: { type: "text" },
  },
  defaultProps: {
    text: "Free Shipping on Orders $100+ | 30-Day Returns",
    link: "#",
  },
};

export const NavigationHeader = {
  type: "NavigationHeader",
  category: "GLOBAL" as const,
  label: "Navigation Header",
  description: "Main site navigation (Milano Header)",
  variants: ["minimal", "with-search", "with-cart", "centered-logo"],
  schema: {
    logo: { type: "text" },
    navItems: {
      type: "array",
      arrayFields: {
        label: { type: "text" },
        href: { type: "text" },
      }
    },
    theme: { type: "text" },
  },
  defaultProps: {
    logo: "VELOCITY",
    navItems: [
      { label: "MEN", href: "#" },
      { label: "WOMEN", href: "#" },
      { label: "EQUIPMENT", href: "#" },
    ],
  },
};

export const StandardFooter = {
  type: "StandardFooter",
  category: "GLOBAL" as const,
  label: "Standard Footer",
  description: "Site footer (Milano Footer)",
  variants: ["minimal", "with-newsletter", "multi-column", "centered"],
  schema: {
    columns: {
      type: "array",
      arrayFields: {
        title: { type: "text" },
        links: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            href: { type: "text" },
          }
        }
      }
    },
    theme: { type: "text" },
  },
  defaultProps: {
    columns: [
      { title: "SHOP", links: [{ label: "New Arrivals", href: "#" }] },
      { title: "COMPANY", links: [{ label: "About Us", href: "#" }] },
      { title: "SUPPORT", links: [{ label: "FAQs", href: "#" }] },
    ],
  },
};

// ============================================================================
// REGISTRY EXPORT
// ============================================================================

export const componentRegistry: ComponentRegistryEntry[] = [
  // Global
  AnnouncementBar,
  NavigationHeader,
  StandardFooter,
  
  // Hero
  HeroEditorial,
  HeroSplit,
  HeroMinimal,
  
  // Commerce
  ProductGridLuxury,
  FeaturedProduct,
  CollectionTabs,
  
  // Visual
  LookbookHotspots,
  
  // Conversion
  NewsletterInline,
  CountdownFeatured,
  
  // Social
  TestimonialsCarousel,
];

// Group by category
export function getComponentsByCategory() {
  const grouped: Record<string, ComponentRegistryEntry[]> = {};
  
  for (const component of componentRegistry) {
    const categoryKey = component.category;
    const categoryLabel = CATEGORIES[categoryKey];
    
    if (!grouped[categoryLabel]) {
      grouped[categoryLabel] = [];
    }
    grouped[categoryLabel].push(component);
  }
  
  return grouped;
}

export function getComponentByType(type: string) {
  return componentRegistry.find(c => c.type === type);
}
