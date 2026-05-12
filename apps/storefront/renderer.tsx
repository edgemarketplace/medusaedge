import React from "react";
import { loadPageRecord } from "packages/edge-templates/supabase-service";
import { storefrontRegistry, getStorefrontComponent } from "packages/edge-sections/storefront-registry";

interface PuckData {
  root?: {
    props?: Record<string, any>;
  };
  content?: Array<{
    type: string;
    props: Record<string, any>;
  }>;
  zones?: Record<string, any>;
}

interface StorefrontRendererProps {
  siteId: string;
  slug: string;
}

/**
 * Simple storefront renderer - NO Puck dependency
 * Renders sections directly from the storefront registry
 */
export async function StorefrontRenderer({ siteId, slug }: StorefrontRendererProps) {
  const page = await loadPageRecord(siteId, slug);
  
  // Defensive checks
  if (!page?.puck_data) {
    return <div className="min-h-screen flex items-center justify-center">Page not found</div>;
  }

  const puckData = page.puck_data as PuckData;
  const content = puckData?.content || [];
  const rootProps = puckData?.root?.props || {};

  if (!Array.isArray(content) || content.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">No content available</div>;
  }

  return (
    <div className="storefront" data-template={rootProps.templateFamily || "retail-core"}>
      {content.map((block, index) => {
        const Component = getStorefrontComponent(block.type);
        
        if (!Component) {
          console.warn(`Storefront: Unknown section type "${block.type}" — skipping`);
          return null;
        }

        // Merge root props (theme, etc.) with block props
        const mergedProps = {
          ...block.props,
          theme: rootProps.theme,
          locale: rootProps.locale,
          currency: rootProps.currency,
        };

        return (
          <div key={block.props?.id || `block-${index}`} className="storefront-section">
            <Component {...mergedProps} />
          </div>
        );
      })}
    </div>
  );
}

export default StorefrontRenderer;
