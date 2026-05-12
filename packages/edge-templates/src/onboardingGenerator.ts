import { EdgeRootProps, TemplateManifest } from "./types";
import { retailCoreManifest } from "./manifests/retail-core";

type OnboardingAnswers = {
  businessType: EdgeRootProps["businessType"];
  siteName: string;
  tagline?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  checkoutMode?: EdgeRootProps["checkoutMode"];
  currency?: string;
  locale?: string;
};

export function generatePageFromOnboarding(answers: OnboardingAnswers): {
  root: EdgeRootProps;
  content: unknown[];
} {
  // For now, only retail-core is supported
  const manifest = retailCoreManifest;
  
  const root: EdgeRootProps = {
    siteName: answers.siteName,
    siteTagline: answers.tagline,
    businessType: answers.businessType,
    templateFamily: manifest.id,
    stylePreset: "modern-commerce", // default preset
    colorScheme: "light",
    typographyPreset: "balanced",
    primaryCtaLabel: answers.primaryCtaLabel || manifest.defaultRootProps.primaryCtaLabel!,
    primaryCtaHref: answers.primaryCtaHref || "/shop",
    checkoutMode: answers.checkoutMode || manifest.defaultRootProps.checkoutMode!,
    currency: answers.currency || manifest.defaultRootProps.currency!,
    locale: answers.locale || manifest.defaultRootProps.locale!,
    seoTitle: `${answers.siteName} - ${answers.tagline || "Online Store"}`,
    seoDescription: `Shop at ${answers.siteName} for premium retail products.`,
  };

  // Use manifest starter content as base
  const content = manifest.starterContent.map((item: any) => ({
    ...item,
    // Override site name in header/footer
    props: {
      ...item.props,
      ...(item.type === "CommerceHeader" || item.type === "CommerceFooter"
        ? { siteName: answers.siteName }
        : {}),
    },
  }));

  return { root, content };
}
