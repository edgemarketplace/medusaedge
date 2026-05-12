import { getPreset } from "../edge-theme/index";
import type { EdgeRootProps } from "../edge-theme/types";
import retailCoreManifest from "./retailCoreManifest";

export type OnboardingAnswers = {
  siteName: string;
  siteTagline?: string;
  logoUrl?: string;
  currency?: string;
  checkoutMode?: EdgeRootProps["checkoutMode"];
  supportEmail?: string;
};

function createStarterReviews(siteName: string) {
  return [
    { author: "Avery", text: `${siteName} shipped fast and the quality felt premium right away.`, rating: 5, date: "2026" },
    { author: "Jordan", text: `The buying experience with ${siteName} was smooth from landing page to checkout.`, rating: 5, date: "2026" },
    { author: "Taylor", text: `Exactly what I expected from ${siteName}. I would absolutely buy again.`, rating: 5, date: "2026" },
  ];
}

function createStarterFaqs(siteName: string) {
  return [
    {
      question: `What makes ${siteName} different?`,
      answer: `${siteName} focuses on a curated retail experience with clear merchandising, modern checkout, and fast support.`,
    },
    {
      question: "How quickly do orders ship?",
      answer: "Most orders ship within 1-2 business days unless a custom lead time is noted on the product page.",
    },
    {
      question: "Can customers get support before ordering?",
      answer: "Yes. Contact details are built into the storefront so customers can reach support before purchase.",
    },
  ];
}

export function generatePageFromOnboarding(answers: OnboardingAnswers) {
  const siteName = answers.siteName.trim();
  const siteTagline = answers.siteTagline?.trim() || "Discover your next favorite product.";
  const stylePreset = "modern-commerce";

  const rootProps: EdgeRootProps = {
    siteName,
    siteTagline,
    businessType: "retail",
    templateFamily: "retail-core",
    stylePreset,
    colorScheme: stylePreset,
    typographyPreset: "balanced",
    logoUrl: answers.logoUrl || "",
    primaryCtaLabel: "Shop now",
    primaryCtaHref: "/checkout",
    supportPhone: "",
    supportEmail: answers.supportEmail || "",
    checkoutMode: answers.checkoutMode || retailCoreManifest.defaultRootProps.checkoutMode || "native",
    currency: answers.currency || retailCoreManifest.defaultRootProps.currency || "USD",
    locale: retailCoreManifest.defaultRootProps.locale || "en-US",
    seoTitle: `${siteName} | ${siteTagline}`,
    seoDescription: `Shop ${siteName}. ${siteTagline}`,
    mobilePreviewChecked: false,
    theme: getPreset(stylePreset),
  };

  const starterContent = retailCoreManifest.recommendedStack.map((sectionType, i) => {
    const id = `${sectionType.toLowerCase()}-${i + 1}`;

    switch (sectionType) {
      case "PromoHeader":
        return {
          type: sectionType,
          props: {
            id,
            text: `Free shipping on new orders from ${siteName}`,
            href: "/checkout",
          },
        };
      case "CommerceHeader":
        return {
          type: sectionType,
          props: {
            id,
            siteName,
            logoUrl: rootProps.logoUrl,
            navItems: [
              { label: "Shop", href: "#featured-collection" },
              { label: "Products", href: "#product-grid" },
              { label: "Reviews", href: "#review-strip" },
              { label: "FAQ", href: "#faq" },
            ],
            primaryCtaLabel: rootProps.primaryCtaLabel,
            primaryCtaHref: rootProps.primaryCtaHref,
          },
        };
      case "ProductHero":
        return {
          type: sectionType,
          props: {
            id,
            headline: `Welcome to ${siteName}`,
            subheadline: siteTagline,
            ctaLabel: "Shop now",
            ctaHref: "/checkout",
            backgroundImage: "",
          },
        };
      case "FeaturedCollection":
        return {
          type: sectionType,
          props: {
            id: "featured-collection",
            title: "Featured collection",
            dataSource: "catalog",
            collectionId: "featured",
          },
        };
      case "ProductGrid":
        return {
          type: sectionType,
          props: {
            id: "product-grid",
            title: "Shop the full collection",
            columns: 3,
            dataSource: "catalog",
            collectionId: "all-products",
          },
        };
      case "ReviewStrip":
        return {
          type: sectionType,
          props: {
            id: "review-strip",
            reviews: createStarterReviews(siteName),
          },
        };
      case "FAQ":
        return {
          type: sectionType,
          props: {
            id: "faq",
            title: "Frequently asked questions",
            faqs: createStarterFaqs(siteName),
          },
        };
      case "CommerceFooter":
        return {
          type: sectionType,
          props: {
            id,
            siteName,
            description: siteTagline,
            links: [
              {
                title: "Shop",
                items: [
                  { label: "Featured", href: "#featured-collection" },
                  { label: "All products", href: "#product-grid" },
                  { label: "Checkout", href: "/checkout" },
                ],
              },
              {
                title: "Support",
                items: [
                  { label: "Email us", href: answers.supportEmail ? `mailto:${answers.supportEmail}` : "#faq" },
                ],
              },
            ],
            socialLinks: [
              { platform: "Instagram", href: "#" },
              { platform: "TikTok", href: "#" },
            ],
          },
        };
      default:
        return {
          type: sectionType,
          props: { id },
        };
    }
  });

  return {
    root: { props: rootProps },
    content: starterContent,
    zones: {},
  };
}
