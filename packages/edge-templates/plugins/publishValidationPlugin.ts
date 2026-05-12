import { retailCoreManifest } from "../retailCoreManifest";

export type PublishValidationTarget = {
  root?: { props?: Record<string, any> };
  content?: Array<{ type?: string; props?: Record<string, any> }>;
};

const OFFER_SECTIONS = new Set(["FeaturedCollection", "ProductGrid", "CollectionTabs", "PackageGrid"]);
const CONVERSION_SECTIONS = new Set(["FAQ", "Newsletter", "StickyPromo", "LimitedOffer", "QuoteCTA", "BookingCTA"]);
const STRUCTURAL_HEADERS = new Set(["SimpleHeader", "CommerceHeader", "ServiceHeader"]);
const STRUCTURAL_FOOTERS = new Set(["BasicFooter", "CommerceFooter", "ServiceFooter"]);
const HERO_SECTIONS = new Set(["SplitHero", "VisualHero", "ProductHero", "ServiceHero"]);

export function getPublishValidationErrors(data: PublishValidationTarget) {
  const rootProps = data.root?.props || {};
  const content = data.content || [];
  const counts: Record<string, number> = {};

  for (const item of content) {
    if (!item?.type) continue;
    counts[item.type] = (counts[item.type] || 0) + 1;
  }

  const countIn = (set: Set<string>) => Object.entries(counts).reduce((total, [type, count]) => total + (set.has(type) ? count : 0), 0);
  const hasAny = (set: Set<string>) => countIn(set) > 0;
  const errors: string[] = [];

  if (countIn(STRUCTURAL_HEADERS) !== retailCoreManifest.validationRules.maxHeaders) {
    errors.push("Exactly one header is required");
  }

  if (countIn(HERO_SECTIONS) < retailCoreManifest.validationRules.minHeroes) {
    errors.push("At least one hero section is required");
  }

  if (!hasAny(OFFER_SECTIONS)) {
    errors.push("At least one product or offer section is required");
  }

  if (!hasAny(CONVERSION_SECTIONS)) {
    errors.push("At least one conversion section is required");
  }

  if (countIn(STRUCTURAL_FOOTERS) !== retailCoreManifest.validationRules.maxFooters) {
    errors.push("Exactly one footer is required");
  }

  if (retailCoreManifest.validationRules.requiresPayment && rootProps.checkoutMode === "native" && !rootProps.currency) {
    errors.push("Payment currency must be configured for retail templates");
  }

  if (retailCoreManifest.validationRules.requiresContactMethod && !rootProps.supportEmail && !rootProps.supportPhone) {
    errors.push("A contact method is required for this template");
  }

  if (!rootProps.seoTitle) {
    errors.push("SEO title is required");
  }

  if (!rootProps.seoDescription) {
    errors.push("SEO description is required");
  }

  if (!rootProps.mobilePreviewChecked) {
    errors.push("Review the mobile preview before publishing");
  }

  return errors;
}

export const publishValidationPlugin = {
  name: "publish-validation",
  validate: getPublishValidationErrors,
};

export default publishValidationPlugin;
