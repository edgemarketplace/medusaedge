import React from "react";
import { EdgeRootProps, NormalizedContentItem, normalizeContent } from "packages/edge-templates/src/types";
import { sectionRegistry, renderContentItem } from "packages/edge-sections/src/registry";

export type StorefrontPageProps = {
  root: EdgeRootProps;
  content: unknown[]; // Raw content from persisted page
};

/**
 * Storefront renderer: renders live pages using direct React components (no Puck)
 */
export const StorefrontPage: React.FC<StorefrontPageProps> = ({ root, content }) => {
  // Normalize content to standard contract
  const normalizedContent = normalizeContent(content);

  // Apply theme tokens (simplified for now - in production, load from edge-theme)
  const themeStyles: React.CSSProperties = {
    backgroundColor: "#ffffff", // Default from modern-commerce preset
    color: "#212529",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div className="storefront-page" style={themeStyles}>
      {/* SEO meta tags (in production, use next/head or similar) */}
      <title>{root.seoTitle || root.siteName}</title>
      <meta name="description" content={root.seoDescription || ""} />

      {/* Render all content sections in order */}
      {normalizedContent
        .sort((a, b) => a.order - b.order)
        .map((item) => renderContentItem(item))}
    </div>
  );
};
