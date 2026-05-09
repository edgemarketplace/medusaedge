// ═══════════════════════════════════════════════════════════════════
// Section Registry — Canonical Index
//
// Maps every section ID to its React component + schema definition.
// Used by the composer engine to resolve template compositions into
// rendered storefront pages.
// ═══════════════════════════════════════════════════════════════════

import React from "react"
import type { SectionBlueprint, SchemaField, SectionSchema } from "@/templates/registry/types"

// ── Core Sections ──
import HeroEditorial from "./HeroEditorial.jsx"
import ProductGrid from "./ProductGrid.jsx"

// ── Hero Variants ──
import HeroSplit from "./HeroSplit"
import HeroCentered from "./HeroCentered"
import HeroBooking from "./HeroBooking"

// ── Navigation ──
import HeaderNavigation from "./HeaderNavigation"
import AnnouncementBar from "./AnnouncementBar"
import FooterStandard from "./FooterStandard"

// ── Commerce ──
import TrustStrip from "./TrustStrip"
import BundleBuilder from "./BundleBuilder"
import SubscriptionPlans from "./SubscriptionPlans"
import RecentlyViewed from "./RecentlyViewed"
import CountdownBanner from "./CountdownBanner"
import MembershipPlans from "./MembershipPlans"
import GiftGuide from "./GiftGuide"
import PickupDeliveryStrip from "./PickupDeliveryStrip"
import WholesaleInquiry from "./WholesaleInquiry"

// ── Social ──
import UGCGrid from "./UGCGrid"
import TestimonialGrid from "./TestimonialGrid"
import TestimonialSlider from "./TestimonialSlider"

// ── Content ──
import ComparisonTable from "./ComparisonTable"
import FAQ from "./FAQ"
import ContactStrip from "./ContactStrip"
import ProcessTimeline from "./ProcessTimeline"
import EventCalendar from "./EventCalendar"
import BeforeAfterGallery from "./BeforeAfterGallery"

// ── Promotional ──
import LoyaltyCTA from "./LoyaltyCTA"
import NewsletterCTA from "./NewsletterCTA"

// ── Booking ──
import ServiceMenu from "./ServiceMenu"
import BookingCTA from "./BookingCTA"

// ── Navigation Helpers ──
import CategoryGrid from "./CategoryGrid"

// ═══════════════════════════════════════════════════════════════════
// Registry Entry Type
// ═══════════════════════════════════════════════════════════════════

export interface RegistryEntry extends SectionBlueprint {
  component: React.FC<any>
  getHTML?: () => string
}

// ═══════════════════════════════════════════════════════════════════
// Canonical Section Registry
// ═══════════════════════════════════════════════════════════════════

export const sectionRegistry: Record<string, RegistryEntry> = {
  // ── Heroes ──
  "hero-editorial": {
    id: "hero-editorial",
    component: HeroEditorial,
    category: "hero",
    label: "Editorial Hero",
    description: "Full-height hero with dramatic image overlay, headline, subheadline, and CTA.",
    variants: ["luxury", "minimal", "athletic"],
    schema: {
      headline: { type: "text", label: "Headline", default: "The Fall Edit" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Oversized silhouettes and tactile fabrics for the modern wardrobe." },
      cta: { type: "text", label: "Button Text", default: "Shop The Lookbook" },
      backgroundImage: { type: "image", label: "Background Image" },
      variant: { type: "select", options: ["luxury", "minimal", "athletic"], default: "luxury" },
    },
  },
  "hero-split": {
    id: "hero-split",
    component: HeroSplit,
    category: "hero",
    label: "Split Hero",
    description: "Two-column hero with text on one side and featured image on the other.",
    variants: ["luxury", "minimal", "athletic", "editorial"],
    schema: {
      headline: { type: "text", label: "Headline", default: "The Modern Standard" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Clean, fast, and designed for growth." },
      cta: { type: "text", label: "CTA Text", default: "Shop Now" },
      backgroundImage: { type: "image", label: "Hero Image" },
      variant: { type: "select", options: ["luxury", "minimal", "athletic", "editorial"], default: "minimal" },
    },
  },
  "hero-centered": {
    id: "hero-centered",
    component: HeroCentered,
    category: "hero",
    label: "Centered Hero",
    description: "Centered text and CTAs over a full-width background image.",
    variants: ["luxury", "organic", "soft-boutique", "romantic"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Welcome to Our Store" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Discover products made with care." },
      cta: { type: "text", label: "Primary CTA", default: "Shop Now" },
      secondaryCta: { type: "text", label: "Secondary CTA", default: "" },
      backgroundImage: { type: "image", label: "Background Image" },
    },
  },
  "hero-booking": {
    id: "hero-booking",
    component: HeroBooking,
    category: "hero",
    label: "Booking Hero",
    description: "Dual-action hero pattern with primary booking CTA and secondary shopping CTA.",
    variants: ["luxury", "editorial", "soft-boutique", "industrial"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Book Your Appointment" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Experience our premium services." },
      primaryCta: { type: "text", label: "Primary CTA", default: "Book Now" },
      secondaryCta: { type: "text", label: "Secondary CTA", default: "Browse Products" },
      backgroundImage: { type: "image", label: "Background Image" },
    },
  },

  // ── Navigation ──
  "header-navigation": {
    id: "header-navigation",
    component: HeaderNavigation,
    category: "header",
    label: "Navigation Header",
    description: "Sticky navigation bar with brand name, nav links, and optional CTA button.",
    variants: ["luxury", "minimal", "athletic", "editorial", "industrial", "organic", "soft-boutique", "romantic", "warm", "playful", "vibrant"],
    schema: {
      brand: { type: "text", label: "Brand Name", default: "Marketplace" },
    },
  },
  "announcement-bar": {
    id: "announcement-bar",
    component: AnnouncementBar,
    category: "header",
    label: "Announcement Bar",
    description: "Thin dismissible announcement bar at the top of the page.",
    variants: ["luxury", "minimal", "athletic", "editorial"],
    schema: {
      text: { type: "text", label: "Announcement Text", default: "Free shipping on orders over $50" },
    },
  },
  "footer-standard": {
    id: "footer-standard",
    component: FooterStandard,
    category: "footer",
    label: "Standard Footer",
    description: "Four-column footer with brand info, link groups, social links, and copyright.",
    variants: ["luxury", "minimal", "athletic", "editorial", "industrial", "organic", "soft-boutique", "romantic", "warm", "playful"],
    schema: {
      brand: { type: "text", label: "Brand Name", default: "Marketplace" },
      description: { type: "textarea", label: "Brand Description", default: "Everything your customers need in one storefront." },
    },
  },

  // ── Commerce ──
  "product-grid": {
    id: "product-grid",
    component: ProductGrid,
    category: "commerce",
    label: "Product Grid",
    description: "Responsive grid of product cards with Medusa data attributes.",
    variants: ["grid", "carousel"],
    schema: {
      title: { type: "text", label: "Grid Title", default: "Latest Arrivals" },
      collectionId: { type: "medusa-collection", label: "Collection" },
      limit: { type: "number", label: "Limit", default: 3 },
    },
  },
  "trust-strip": {
    id: "trust-strip",
    component: TrustStrip,
    category: "commerce",
    label: "Trust Strip",
    description: "Row of trust badges with icons, headlines, and descriptions.",
    variants: ["default"],
    schema: {},
  },
  "bundle-builder": {
    id: "bundle-builder",
    component: BundleBuilder,
    category: "commerce",
    label: "Bundle Builder",
    description: "Interactive bundle builder with 3 slots, discount badge, and CTA.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Build Your Routine" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Select 3 or more items and unlock bundle pricing." },
      discountText: { type: "text", label: "Discount Text", default: "Save 20%" },
    },
  },
  "subscription-plans": {
    id: "subscription-plans",
    component: SubscriptionPlans,
    category: "commerce",
    label: "Subscription Plans",
    description: "3-tier subscription plan cards with features and pricing.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Choose Your Plan" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Subscribe and save on every order." },
    },
  },
  "recently-viewed": {
    id: "recently-viewed",
    component: RecentlyViewed,
    category: "commerce",
    label: "Recently Viewed",
    description: "Horizontal scrollable row of recently viewed product cards.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Recently Viewed" },
    },
  },
  "membership-plans": {
    id: "membership-plans",
    component: MembershipPlans,
    category: "commerce",
    label: "Membership Plans",
    description: "Tiered membership plan cards with 'Most Popular' badge.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Join the Club" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Choose the plan that fits your needs." },
    },
  },
  "gift-guide": {
    id: "gift-guide",
    component: GiftGuide,
    category: "commerce",
    label: "Gift Guide",
    description: "Grid of gift category cards with images and hover effects.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "The Perfect Gift" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Find something special for everyone." },
    },
  },
  "pickup-delivery-strip": {
    id: "pickup-delivery-strip",
    component: PickupDeliveryStrip,
    category: "commerce",
    label: "Pickup & Delivery Strip",
    description: "Cards showing available fulfillment options (pickup, delivery, curbside, shipping).",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "How to Get It" },
    },
  },
  "wholesale-inquiry": {
    id: "wholesale-inquiry",
    component: WholesaleInquiry,
    category: "commerce",
    label: "Wholesale Inquiry",
    description: "B2B inquiry form for wholesale partnership requests.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Become a Partner" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Apply for wholesale pricing and dedicated support." },
      cta: { type: "text", label: "CTA Text", default: "Submit Inquiry" },
    },
  },

  // ── Social ──
  "ugc-grid": {
    id: "ugc-grid",
    component: UGCGrid,
    category: "social",
    label: "UGC Grid",
    description: "Grid of user-generated content images with hover overlay showing handles.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Spotted in the Wild" },
    },
  },
  "testimonial-grid": {
    id: "testimonial-grid",
    component: TestimonialGrid,
    category: "social",
    label: "Testimonial Grid",
    description: "Responsive grid of customer testimonial cards with star ratings.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "What Our Customers Say" },
    },
  },
  "testimonial-slider": {
    id: "testimonial-slider",
    component: TestimonialSlider,
    category: "social",
    label: "Testimonial Slider",
    description: "Horizontal carousel of customer testimonials with navigation arrows.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Customer Love" },
    },
  },

  // ── Content ──
  "comparison-table": {
    id: "comparison-table",
    component: ComparisonTable,
    category: "content",
    label: "Comparison Table",
    description: "Feature comparison table with checkmarks showing competitive advantage.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Why Choose Us?" },
    },
  },
  "faq": {
    id: "faq",
    component: FAQ,
    category: "content",
    label: "FAQ",
    description: "Animated accordion FAQ section with expandable questions.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Frequently Asked Questions" },
    },
  },
  "contact-strip": {
    id: "contact-strip",
    component: ContactStrip,
    category: "content",
    label: "Contact Strip",
    description: "Contact information section with address, phone, email, and hours.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Get in Touch" },
    },
  },
  "process-timeline": {
    id: "process-timeline",
    component: ProcessTimeline,
    category: "content",
    label: "Process Timeline",
    description: "Horizontal step-by-step process timeline with numbered steps.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "How It Works" },
    },
  },
  "event-calendar": {
    id: "event-calendar",
    component: EventCalendar,
    category: "content",
    label: "Event Calendar",
    description: "List of upcoming events with dates, locations, and RSVP buttons.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Upcoming Events" },
    },
  },
  "before-after-gallery": {
    id: "before-after-gallery",
    component: BeforeAfterGallery,
    category: "content",
    label: "Before & After Gallery",
    description: "Hover-driven before/after image comparison gallery.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "See the Difference" },
    },
  },

  // ── Promotional ──
  "countdown-banner": {
    id: "countdown-banner",
    component: CountdownBanner,
    category: "promotional",
    label: "Countdown Banner",
    description: "Urgency-driven countdown timer banner for sales and launches.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Flash Sale: 40% Off" },
    },
  },
  "loyalty-cta": {
    id: "loyalty-cta",
    component: LoyaltyCTA,
    category: "promotional",
    label: "Loyalty CTA",
    description: "Dark-themed loyalty program call-to-action with decorative blobs.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Join the Inner Circle" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Earn points on every purchase." },
      primaryCta: { type: "text", label: "Primary CTA", default: "Join For Free" },
      secondaryCta: { type: "text", label: "Secondary CTA", default: "Sign In" },
    },
  },
  "newsletter-cta": {
    id: "newsletter-cta",
    component: NewsletterCTA,
    category: "promotional",
    label: "Newsletter CTA",
    description: "Email signup call-to-action with headline and subscribe button.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Stay in the Loop" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Get exclusive offers and new arrivals." },
      placeholder: { type: "text", label: "Input Placeholder", default: "Enter your email" },
      buttonText: { type: "text", label: "Button Text", default: "Subscribe" },
    },
  },

  // ── Booking ──
  "service-menu": {
    id: "service-menu",
    component: ServiceMenu,
    category: "booking",
    label: "Service Menu",
    description: "Cards displaying services with name, description, price, duration, and booking CTA.",
    variants: ["default"],
    schema: {
      title: { type: "text", label: "Title", default: "Our Services" },
    },
  },
  "booking-cta": {
    id: "booking-cta",
    component: BookingCTA,
    category: "booking",
    label: "Booking CTA",
    description: "Full-width dark booking call-to-action section with form field hints.",
    variants: ["default"],
    schema: {
      headline: { type: "text", label: "Headline", default: "Ready to Book?" },
      subheadline: { type: "textarea", label: "Subheadline", default: "Schedule your appointment in seconds." },
      cta: { type: "text", label: "CTA Text", default: "Book Now" },
    },
  },

  // ── Navigation ──
  "category-grid": {
    id: "category-grid",
    component: CategoryGrid,
    category: "navigation",
    label: "Category Grid",
    description: "Grid of clickable category cards with images and hover effects.",
    variants: ["default"],
    schema: {
      title: { type: "text", label: "Title", default: "Shop by Category" },
    },
  },

  // ── Trust ──
  "proof-strip": {
    id: "proof-strip",
    component: ProofStrip,
    category: "trust",
    label: "Proof Strip",
    description: "Grid of trust badges with icons and short statements.",
    variants: ["default"],
    schema: {},
  },
}

// ═══════════════════════════════════════════════════════════════════
// Aliases — many template blueprints reference section IDs that
// map to the canonical section IDs above.
// ═══════════════════════════════════════════════════════════════════

export const sectionAliases: Record<string, string> = {
  "featured-products": "product-grid",
  "product-carousel": "product-grid",
  "collection-grid": "product-grid",
  "lookbook": "ugc-grid",
  "ingredient-spotlight": "trust-strip",
  "origin-story": "process-timeline",
  "founder-story": "process-timeline",
  "materials-finishes": "category-grid",
  "shop-by-room": "category-grid",
  "shop-by-goal": "category-grid",
  "shop-by-age": "category-grid",
  "shop-by-pet": "category-grid",
  "shop-by-occasion": "category-grid",
  "shop-by-use-case": "category-grid",
  "maker-profiles": "testimonial-grid",
  "service-area-strip": "pickup-delivery-strip",
}

// ═══════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════

export function resolveSection(sectionId: string): RegistryEntry | undefined {
  // Check direct match first
  if (sectionRegistry[sectionId]) return sectionRegistry[sectionId]
  // Check aliases
  const alias = sectionAliases[sectionId]
  if (alias) return sectionRegistry[alias]
  return undefined
}

export function getSectionsByCategory(category: string): RegistryEntry[] {
  return Object.values(sectionRegistry).filter((s) => s.category === category)
}

export function getAllSections(): RegistryEntry[] {
  return Object.values(sectionRegistry)
}
