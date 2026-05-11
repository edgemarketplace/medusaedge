import { EdgeRootProps } from "../../packages/edge-theme/types";
import retailCoreManifest from "./retailCoreManifest";

export type OnboardingAnswers = {
  siteName: string;
  siteTagline?: string;
  logoUrl?: string;
  currency?: string;
  checkoutMode?: EdgeRootProps["checkoutMode"];
  supportEmail?: string;
};

export function generatePageFromOnboarding(answers: OnboardingAnswers) {
  // Generate root props from answers + manifest defaults
  const rootProps: Partial<EdgeRootProps> = {
    siteName: answers.siteName,
    siteTagline: answers.siteTagline,
    businessType: "retail",
    templateFamily: "retail-core",
    stylePreset: "modern-commerce",
    colorScheme: "blue",
    typographyPreset: "balanced",
    logoUrl: answers.logoUrl,
    primaryCtaLabel: "Shop now",
    primaryCtaHref: "/shop",
    checkoutMode: answers.checkoutMode || retailCoreManifest.defaultRootProps.checkoutMode,
    currency: answers.currency || retailCoreManifest.defaultRootProps.currency,
    locale: retailCoreManifest.defaultRootProps.locale,
    supportEmail: answers.supportEmail,
    seoTitle: `${answers.siteName} - Online Store`,
    seoDescription: answers.siteTagline || `Shop at ${answers.siteName} for the best products.`,
  };

  // Generate starter content from recommended stack
  const starterContent = retailCoreManifest.recommendedStack.map((sectionType, i) => ({
    type: sectionType,
    props: {
      id: `${sectionType.toLowerCase()}-${i}`,
      // Default props per section type
      ...(sectionType === "ProductHero" && {
        headline: `Welcome to ${answers.siteName}`,
        subheadline: answers.siteTagline || "Discover our latest collection",
      }),
    },
  }));

  return {
    root: { props: rootProps },
    content: starterContent,
  };
}
