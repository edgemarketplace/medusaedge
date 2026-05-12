export type BusinessType = "retail" | "service" | "food" | "artisan" | "event";

export type TemplateFamily =
  | "retail-core"
  | "service-pro"
  | "food-catering"
  | "artisan-market"
  | "event-floral";

export type StylePreset =
  | "modern-commerce"
  | "boutique-luxury"
  | "professional-agency"
  | "industrial-supply"
  | "creative-studio"
  | "tech-consultant";

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

export type CheckoutMode = "native" | "stripe-link" | "payment-link" | "quote-only";

export type EdgeRootProps = {
  siteName: string;
  siteTagline?: string;
  businessType: BusinessType;
  templateFamily: TemplateFamily;
  stylePreset: StylePreset | string;
  colorScheme: string;
  typographyPreset: string;
  logoUrl?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  supportPhone?: string;
  supportEmail?: string;
  checkoutMode: CheckoutMode;
  currency: string;
  locale: string;
  seoTitle?: string;
  seoDescription?: string;
  mobilePreviewChecked?: boolean;
  theme?: ThemeTokens;
};
