import { TemplateManifest } from "./types";

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
    "ProductGrid",
    "ReviewStrip",
    "FAQ",
    "CommerceFooter",
  ],
  defaultRootProps: {
    checkoutMode: "native",
    currency: "USD",
    locale: "en-US",
    primaryCtaLabel: "Shop now",
  },
  starterContent: [],
  validationRules: {
    minHeroes: 1,
    maxHeaders: 1,
    maxFooters: 1,
    requiresPayment: true,
    requiresContactMethod: false,
  },
};

export default retailCoreManifest;
