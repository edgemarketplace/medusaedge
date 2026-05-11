import { Plugin } from "@puckeditor/core";

export const publishValidationPlugin: Plugin = {
  name: "publish-validation",
  apply: (params) => {
    const { config, data, addToast } = params;

    return {
      onPublish: (publishData) => {
        const { root, content } = publishData;
        const errors: string[] = [];

        // Count section types
        const sectionCounts: Record<string, number> = {};
        (content || []).forEach((item: any) => {
          sectionCounts[item.type] = (sectionCounts[item.type] || 0) + 1;
        });

        // Rule: exactly one header (CommerceHeader or PromoHeader)
        const headerCount = (sectionCounts["CommerceHeader"] || 0) + (sectionCounts["PromoHeader"] || 0);
        if (headerCount !== 1) {
          errors.push("Exactly one header is required");
        }

        // Rule: at least one hero (ProductHero)
        if (!sectionCounts["ProductHero"] || sectionCounts["ProductHero"] < 1) {
          errors.push("At least one hero section is required");
        }

        // Rule: exactly one footer (CommerceFooter)
        if (!sectionCounts["CommerceFooter"] || sectionCounts["CommerceFooter"] !== 1) {
          errors.push("Exactly one footer is required");
        }

        // Rule: payment configured for retail
        if (root?.props?.checkoutMode === "native" && !root?.props?.currency) {
          errors.push("Payment currency must be configured for retail templates");
        }

        // Rule: SEO title and description
        if (!root?.props?.seoTitle) errors.push("SEO title is required");
        if (!root?.props?.seoDescription) errors.push("SEO description is required");

        // If errors, block publish
        if (errors.length > 0) {
          addToast({
            message: `Publish blocked:\n${errors.join("\n")}`,
            type: "error",
          });
          return false; // Block publish
        }

        return true; // Allow publish
      },
    };
  },
};

export default publishValidationPlugin;
