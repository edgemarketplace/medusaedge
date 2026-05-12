import { TemplateManifest } from "../types";

export const retailCoreManifest: TemplateManifest = {
  id: "retail-core",
  label: "Retail Core",
  businessType: "retail",
  allowedSections: [
    "PromoHeader",
    "CommerceHeader",
    "ProductHero",
    "FeaturedCollection",
    "ProductGrid",
    "ReviewStrip",
    "FAQ",
    "CommerceFooter",
  ],
  requiredSections: ["CommerceHeader", "ProductHero", "CommerceFooter"],
  recommendedStack: [
    "PromoHeader",
    "CommerceHeader",
    "ProductHero",
    "FeaturedCollection",
    "ReviewStrip",
    "FAQ",
    "CommerceFooter",
  ],
  defaultRootProps: {
    checkoutMode: "native",
    currency: "USD",
    locale: "en-US",
    primaryCtaLabel: "Shop now",
    businessType: "retail",
    templateFamily: "retail-core",
  },
  starterContent: [
    {
      type: "CommerceHeader",
      props: {
        siteName: "My Retail Store",
        navLinks: [
          { label: "Shop", href: "/shop" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
    },
    {
      type: "ProductHero",
      props: {
        heading: "New Season Arrivals",
        subheading: "Discover our latest collection of premium products",
        ctaLabel: "Shop Now",
        ctaHref: "/shop",
      },
    },
    {
      type: "FeaturedCollection",
      props: {
        title: "Featured Products",
        description: "Handpicked favorites for this season",
        products: [
          { id: "1", name: "Classic T-Shirt", price: 29.99, imageUrl: "/images/tshirt.jpg" },
          { id: "2", name: "Denim Jeans", price: 79.99, imageUrl: "/images/jeans.jpg" },
          { id: "3", name: "Leather Jacket", price: 199.99, imageUrl: "/images/jacket.jpg" },
        ],
      },
    },
    {
      type: "ReviewStrip",
      props: {
        reviews: [
          { author: "Sarah M.", rating: 5, content: "Great quality products!" },
          { author: "John D.", rating: 4, content: "Fast shipping, will buy again." },
        ],
      },
    },
    {
      type: "FAQ",
      props: {
        title: "Frequently Asked Questions",
        faqs: [
          { question: "What is your return policy?", answer: "30-day hassle-free returns." },
          { question: "Do you ship internationally?", answer: "Yes, we ship worldwide." },
        ],
      },
    },
    {
      type: "CommerceFooter",
      props: {
        siteName: "My Retail Store",
        description: "Your one-stop shop for premium retail products.",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
        ],
        socialLinks: [
          { platform: "Instagram", href: "https://instagram.com/store" },
          { platform: "Facebook", href: "https://facebook.com/store" },
        ],
      },
    },
  ],
  validationRules: {
    minHeroes: 1,
    maxHeaders: 1,
    maxFooters: 1,
    requiresPayment: true,
    requiresContactMethod: false,
  },
};
