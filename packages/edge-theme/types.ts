export type ThemeTokens = {
  colors: {
    bg: string;
    surface: string;
    text: string;
    muted: string;
    primary: string;
    primaryContrast: string;
    accent: string;
    border: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    scale: "compact" | "balanced" | "luxury";
  };
  radius: "none" | "soft" | "rounded";
  shadow: "none" | "subtle" | "elevated";
  spacing: "tight" | "normal" | "airy";
};

export type EdgeRootProps = {
  siteName: string;
  siteTagline?: string;
  businessType: "retail" | "service" | "food" | "artisan" | "event";
  templateFamily:
    | "retail-core"
    | "service-pro"
    | "food-catering"
    | "artisan-market"
    | "event-floral";
  stylePreset: string;
  colorScheme: string;
  typographyPreset: string;
  logoUrl?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  supportPhone?: string;
  supportEmail?: string;
  checkoutMode: "native" | "stripe-link" | "payment-link" | "quote-only";
  currency: string;
  locale: string;
  seoTitle?: string;
  seoDescription?: string;
};

// Re-export business type for convenience
export type BusinessType = EdgeRootProps["businessType"];
export type TemplateFamily = EdgeRootProps["templateFamily"];
