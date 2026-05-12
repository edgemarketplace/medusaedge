import { EdgeRootProps } from "../types";

type ValidationRule = {
  id: string;
  message: string;
  check: (root: EdgeRootProps, content: unknown[]) => boolean;
};

const validationRules: ValidationRule[] = [
  {
    id: "one-header",
    message: "Exactly one header is required",
    check: (_, content) => {
      const headers = content.filter((item: any) => 
        item.type === "PromoHeader" || item.type === "CommerceHeader"
      );
      return headers.length === 1;
    },
  },
  {
    id: "at-least-one-hero",
    message: "At least one hero section is required",
    check: (_, content) => {
      const heroes = content.filter((item: any) => item.type.includes("Hero"));
      return heroes.length >= 1;
    },
  },
  {
    id: "at-least-one-product-service",
    message: "At least one product/service offer section is required",
    check: (_, content) => {
      const offers = content.filter((item: any) => 
        item.type === "FeaturedCollection" || item.type === "ProductGrid" || item.type === "ServiceCards"
      );
      return offers.length >= 1;
    },
  },
  {
    id: "at-least-one-conversion",
    message: "At least one conversion section is required",
    check: (_, content) => {
      const conversions = content.filter((item: any) => 
        item.type === "FAQ" || item.type === "Newsletter" || item.type === "StickyPromo"
      );
      return conversions.length >= 1;
    },
  },
  {
    id: "one-footer",
    message: "Exactly one footer is required",
    check: (_, content) => {
      const footers = content.filter((item: any) => item.type.includes("Footer"));
      return footers.length === 1;
    },
  },
  {
    id: "payment-configured",
    message: "Payment must be configured for ecommerce templates",
    check: (root) => {
      if (root.businessType === "retail" && root.checkoutMode === "quote-only") {
        return false;
      }
      return true;
    },
  },
  {
    id: "contact-configured",
    message: "Contact method must be configured for service templates",
    check: (root) => {
      if (root.businessType === "service") {
        return !!(root.supportEmail || root.supportPhone);
      }
      return true;
    },
  },
  {
    id: "seo-title",
    message: "SEO title is required",
    check: (root) => !!root.seoTitle,
  },
  {
    id: "seo-description",
    message: "SEO description is required",
    check: (root) => !!root.seoDescription,
  },
];

export function validatePage(root: EdgeRootProps, content: unknown[]): { valid: boolean; errors: string[] } {
  const errors = validationRules
    .filter(rule => !rule.check(root, content))
    .map(rule => rule.message);
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// Puck plugin wrapper (simplified)
export const publishValidationPlugin = {
  id: "publish-validation",
  validate: (root: any, content: any) => {
    const result = validatePage(root as EdgeRootProps, content);
    return result;
  },
};
