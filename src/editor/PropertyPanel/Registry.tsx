// ═══════════════════════════════════════════════════════════════════
// Property Panel — Section Registry
//
// Maps every editable section ID to its React component (lazy-loaded
// for the editor panel) and its schema definition for dynamic form
// rendering.  Also provides a static HTML getter for GrapesJS block
// definitions via renderToStaticMarkup.
// ═══════════════════════════════════════════════════════════════════

import React, { lazy, type FC } from "react"
import { renderToStaticMarkup } from "react-dom/server"

// ── Direct imports (needed for synchronous html getter) ──
import HeroEditorialComponent from "../../sections/HeroEditorial.jsx"
import ProductGridComponent from "../../sections/ProductGrid.jsx"

import TrustStripComponent from "../../sections/TrustStrip"
import UGCGridComponent from "../../sections/UGCGrid"
import CountdownBannerComponent from "../../sections/CountdownBanner"
import BundleBuilderComponent from "../../sections/BundleBuilder"
import ComparisonTableComponent from "../../sections/ComparisonTable"
import SubscriptionPlansComponent from "../../sections/SubscriptionPlans"
import LoyaltyCTAComponent from "../../sections/LoyaltyCTA"
import FAQComponent from "../../sections/FAQ"
import NewsletterCTAComponent from "../../sections/NewsletterCTA"
import HeroSplitComponent from "../../sections/HeroSplit"
import HeroCenteredComponent from "../../sections/HeroCentered"
import HeroBookingComponent from "../../sections/HeroBooking"
import ServiceMenuComponent from "../../sections/ServiceMenu"
import BookingCTAComponent from "../../sections/BookingCTA"
import TestimonialGridComponent from "../../sections/TestimonialGrid"
import CategoryGridComponent from "../../sections/CategoryGrid"
import AnnouncementBarComponent from "../../sections/AnnouncementBar"
import HeaderNavigationComponent from "../../sections/HeaderNavigation"
import FooterStandardComponent from "../../sections/FooterStandard"

// ── Lazy imports (client-side code splitting for editor panel) ──
const HeroEditorial = lazy(() => import("../../sections/HeroEditorial.jsx"))
const ProductGrid = lazy(() => import("../../sections/ProductGrid.jsx"))

const TrustStrip = lazy(() => import("../../sections/TrustStrip"))
const UGCGrid = lazy(() => import("../../sections/UGCGrid"))
const CountdownBanner = lazy(() => import("../../sections/CountdownBanner"))
const BundleBuilder = lazy(() => import("../../sections/BundleBuilder"))
const ComparisonTable = lazy(() => import("../../sections/ComparisonTable"))
const SubscriptionPlans = lazy(() => import("../../sections/SubscriptionPlans"))
const LoyaltyCTA = lazy(() => import("../../sections/LoyaltyCTA"))
const FAQ = lazy(() => import("../../sections/FAQ"))
const NewsletterCTA = lazy(() => import("../../sections/NewsletterCTA"))
const HeroSplit = lazy(() => import("../../sections/HeroSplit"))
const HeroCentered = lazy(() => import("../../sections/HeroCentered"))
const HeroBooking = lazy(() => import("../../sections/HeroBooking"))
const ServiceMenu = lazy(() => import("../../sections/ServiceMenu"))
const BookingCTA = lazy(() => import("../../sections/BookingCTA"))
const TestimonialGrid = lazy(() => import("../../sections/TestimonialGrid"))
const CategoryGrid = lazy(() => import("../../sections/CategoryGrid"))
const AnnouncementBar = lazy(() => import("../../sections/AnnouncementBar"))
const HeaderNavigation = lazy(() => import("../../sections/HeaderNavigation"))
const FooterStandard = lazy(() => import("../../sections/FooterStandard"))

// ═══════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════

export interface SchemaField {
  type: "text" | "textarea" | "image" | "select" | "number" | "color" | "boolean" | "medusa-collection" | "medusa-product"
  label: string
  default?: string | number | boolean
  options?: string[]
  aiEditable?: boolean
  group?: string
}

export interface SectionSchema {
  [field: string]: SchemaField
}

export interface RegistryEntry {
  id: string
  component: React.LazyExoticComponent<FC<any>>
  category: string
  label: string
  schema: SectionSchema
  get html(): string
}

// ═══════════════════════════════════════════════════════════════════
// Section Registry
// ═══════════════════════════════════════════════════════════════════

export const sectionRegistry: Record<string, RegistryEntry> = {
  // ── Heroes ─────────────────────────────────────────────────────────
  "hero-editorial": {
    id: "hero-editorial",
    component: HeroEditorial,
    category: "hero",
    label: "Editorial Hero",
    schema: {
      headline: { type: "text", label: "Headline", default: "The Fall Edit" },
      subheadline: {
        type: "textarea",
        label: "Subheadline",
        default: "Oversized silhouettes and tactile fabrics for the modern wardrobe.",
      },
      cta: { type: "text", label: "Button Text", default: "Shop The Lookbook" },
      backgroundImage: { type: "image", label: "Background Image" },
      variant: {
        type: "select",
        label: "Variant",
        options: ["luxury", "minimal", "athletic"],
        default: "luxury",
      },
    },
    get html() {
      return renderToStaticMarkup(<HeroEditorialComponent />)
    },
  },

  "hero-split": {
    id: "hero-split",
    component: HeroSplit,
    category: "hero",
    label: "Split Hero",
    schema: {
      headline: { type: "text", label: "Headline", default: "The Modern Standard" },
      subheadline: {
        type: "textarea",
        label: "Subheadline",
        default: "Clean, fast, and designed for growth.",
      },
      cta: { type: "text", label: "CTA Text", default: "Shop Now" },
      backgroundImage: { type: "image", label: "Hero Image" },
      variant: {
        type: "select",
        label: "Variant",
        options: ["luxury", "minimal", "athletic", "editorial"],
        default: "minimal",
      },
    },
    get html() {
      return renderToStaticMarkup(<HeroSplitComponent />)
    },
  },

  "hero-centered": {
    id: "hero-centered",
    component: HeroCentered,
    category: "hero",
    label: "Centered Hero",
    schema: {
      headline: { type: "text", label: "Headline", default: "Welcome to Our Store" },
      subheadline: {
        type: "textarea",
        label: "Subheadline",
        default: "Discover products made with care.",
      },
      cta: { type: "text", label: "Primary CTA", default: "Shop Now" },
      secondaryCta: { type: "text", label: "Secondary CTA", default: "" },
      backgroundImage: { type: "image", label: "Background Image" },
    },
    get html() {
      return renderToStaticMarkup(<HeroCenteredComponent />)
    },
  },

  "hero-booking": {
    id: "hero-booking",
    component: HeroBooking,
    category: "hero",
    label: "Booking Hero",
    schema: {
      headline: { type: "text", label: "Headline", default: "Book Your Appointment" },
      subheadline: {
        type: "textarea",
        label: "Subheadline",
        default: "Experience our premium services.",
      },
      primaryCta: { type: "text", label: "Primary CTA", default: "Book Now" },
      secondaryCta: { type: "text", label: "Secondary CTA", default: "Browse Products" },
      backgroundImage: { type: "image", label: "Background Image" },
    },
    get html() {
      return renderToStaticMarkup(<HeroBookingComponent />)
    },
  },

  // ── Navigation ─────────────────────────────────────────────────────
  "header-navigation": {
    id: "header-navigation",
    component: HeaderNavigation,
    category: "header",
    label: "Navigation Header",
    schema: {
      brand: { type: "text", label: "Brand Name", default: "Marketplace" },
    },
    get html() {
      return renderToStaticMarkup(<HeaderNavigationComponent />)
    },
  },

  "announcement-bar": {
    id: "announcement-bar",
    component: AnnouncementBar,
    category: "header",
    label: "Announcement Bar",
    schema: {
      text: { type: "text", label: "Announcement Text", default: "Free shipping on orders over $50" },
    },
    get html() {
      return renderToStaticMarkup(<AnnouncementBarComponent />)
    },
  },

  "footer-standard": {
    id: "footer-standard",
    component: FooterStandard,
    category: "footer",
    label: "Standard Footer",
    schema: {
      brand: { type: "text", label: "Brand Name", default: "Marketplace" },
      description: {
        type: "textarea",
        label: "Brand Description",
        default: "Everything your customers need in one storefront.",
      },
    },
    get html() {
      return renderToStaticMarkup(<FooterStandardComponent />)
    },
  },

  "category-grid": {
    id: "category-grid",
    component: CategoryGrid,
    category: "navigation",
    label: "Category Grid",
    schema: {
      title: { type: "text", label: "Title", default: "Shop by Category" },
    },
    get html() {
      return renderToStaticMarkup(<CategoryGridComponent />)
    },
  },

  // ── Commerce ───────────────────────────────────────────────────────
  "product-grid": {
    id: "product-grid",
    component: ProductGrid,
    category: "commerce",
    label: "Product Grid",
    schema: {
      title: { type: "text", label: "Grid Title", default: "Latest Arrivals" },
      collectionId: { type: "medusa-collection", label: "Collection" },
      limit: { type: "number", label: "Limit", default: 3 },
    },
    get html() {
      return renderToStaticMarkup(<ProductGridComponent />)
    },
  },

  "trust-strip": {
    id: "trust-strip",
    component: TrustStrip,
    category: "commerce",
    label: "Trust Strip",
    schema: {
      headline: { type: "text", label: "Headline", default: "Why Shop With Us" },
    },
    get html() {
      return renderToStaticMarkup(<TrustStripComponent />)
    },
  },

  "bundle-builder": {
    id: "bundle-builder",
    component: BundleBuilder,
    category: "commerce",
    label: "Bundle Builder",
    schema: {
      headline: { type: "text", label: "Headline", default: "Build Your Routine" },
      subheadline: {
        type: "textarea",
        label: "Subheadline",
        default: "Select 3 or more items and unlock bundle pricing.",
      },
      discountText: { type: "text", label: "Discount Text", default: "Save 20%" },
    },
    get html() {
      return renderToStaticMarkup(<BundleBuilderComponent />)
    },
  },

  "subscription-plans": {
    id: "subscription-plans",
    component: SubscriptionPlans,
    category: "commerce",
    label: "Subscription Plans",
    schema: {
      headline: { type: "text", label: "Headline", default: "Choose Your Plan" },
      subheadline: {
        type: "textarea",
        label: "Subheadline",
        default: "Subscribe and save on every order.",
      },
    },
    get html() {
      return renderToStaticMarkup(<SubscriptionPlansComponent />)
    },
  },

  "comparison-table": {
    id: "comparison-table",
    component: ComparisonTable,
    category: "content",
    label: "Comparison Table",
    schema: {
      headline: { type: "text", label: "Headline", default: "Why Choose Us?" },
    },
    get html() {
      return renderToStaticMarkup(<ComparisonTableComponent />)
    },
  },

  // ── Social ─────────────────────────────────────────────────────────
  "ugc-grid": {
    id: "ugc-grid",
    component: UGCGrid,
    category: "social",
    label: "UGC Grid",
    schema: {
      headline: { type: "text", label: "Headline", default: "Spotted in the Wild" },
    },
    get html() {
      return renderToStaticMarkup(<UGCGridComponent />)
    },
  },

  "testimonial-grid": {
    id: "testimonial-grid",
    component: TestimonialGrid,
    category: "social",
    label: "Testimonial Grid",
    schema: {
      headline: { type: "text", label: "Headline", default: "What Our Customers Say" },
    },
    get html() {
      return renderToStaticMarkup(<TestimonialGridComponent />)
    },
  },

  // ── Content ────────────────────────────────────────────────────────
  "faq": {
    id: "faq",
    component: FAQ,
    category: "content",
    label: "FAQ",
    schema: {
      headline: { type: "text", label: "Headline", default: "Frequently Asked Questions" },
    },
    get html() {
      return renderToStaticMarkup(<FAQComponent />)
    },
  },

  // ── Promotional ────────────────────────────────────────────────────
  "countdown-banner": {
    id: "countdown-banner",
    component: CountdownBanner,
    category: "promotional",
    label: "Countdown Banner",
    schema: {
      headline: { type: "text", label: "Headline", default: "Flash Sale: 40% Off" },
    },
    get html() {
      return renderToStaticMarkup(<CountdownBannerComponent />)
    },
  },

  "loyalty-cta": {
    id: "loyalty-cta",
    component: LoyaltyCTA,
    category: "promotional",
    label: "Loyalty CTA",
    schema: {
      headline: { type: "text", label: "Headline", default: "Join the Inner Circle" },
      subheadline: {
        type: "textarea",
        label: "Subheadline",
        default: "Earn points on every purchase.",
      },
      primaryCta: { type: "text", label: "Primary CTA", default: "Join For Free" },
      secondaryCta: { type: "text", label: "Secondary CTA", default: "Sign In" },
    },
    get html() {
      return renderToStaticMarkup(<LoyaltyCTAComponent />)
    },
  },

  "newsletter-cta": {
    id: "newsletter-cta",
    component: NewsletterCTA,
    category: "promotional",
    label: "Newsletter CTA",
    schema: {
      headline: { type: "text", label: "Headline", default: "Stay in the Loop" },
      subheadline: {
        type: "textarea",
        label: "Subheadline",
        default: "Get exclusive offers and new arrivals.",
      },
      placeholder: { type: "text", label: "Input Placeholder", default: "Enter your email" },
      buttonText: { type: "text", label: "Button Text", default: "Subscribe" },
    },
    get html() {
      return renderToStaticMarkup(<NewsletterCTAComponent />)
    },
  },

  // ── Booking ────────────────────────────────────────────────────────
  "service-menu": {
    id: "service-menu",
    component: ServiceMenu,
    category: "booking",
    label: "Service Menu",
    schema: {
      title: { type: "text", label: "Title", default: "Our Services" },
    },
    get html() {
      return renderToStaticMarkup(<ServiceMenuComponent />)
    },
  },

  "booking-cta": {
    id: "booking-cta",
    component: BookingCTA,
    category: "booking",
    label: "Booking CTA",
    schema: {
      headline: { type: "text", label: "Headline", default: "Ready to Book?" },
      subheadline: {
        type: "textarea",
        label: "Subheadline",
        default: "Schedule your appointment in seconds.",
      },
      cta: { type: "text", label: "CTA Text", default: "Book Now" },
    },
    get html() {
      return renderToStaticMarkup(<BookingCTAComponent />)
    },
  },
}

// ═══════════════════════════════════════════════════════════════════
// Backward-compatible aliases (camelCase exports from original
// Registry.jsx kept for any existing consumers)
// ═══════════════════════════════════════════════════════════════════

export const heroEditorial = sectionRegistry["hero-editorial"]
export const productGrid = sectionRegistry["product-grid"]

export default sectionRegistry