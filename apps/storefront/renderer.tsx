import React from "react";
import { loadDraftRecord } from "@/lib/builder-draft-store";
import { getPreset } from "packages/edge-theme";
import { getStorefrontComponent } from "packages/edge-sections/storefront-registry";
import { loadPageRecord } from "packages/edge-templates/supabase-service";

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

function getResolvedRootProps(rootProps: Record<string, any> = {}) {
  const stylePreset = rootProps.stylePreset || "modern-commerce";

  return {
    ...rootProps,
    stylePreset,
    theme: rootProps.theme || getPreset(stylePreset),
    locale: rootProps.locale || "en-US",
    currency: rootProps.currency || "USD",
  };
}

export async function StorefrontRenderer({ siteId, slug }: StorefrontRendererProps) {
  const page = (await loadPageRecord(siteId, slug)) || loadDraftRecord(siteId, slug);

  if (!page?.puck_data) {
    return <div className="min-h-screen flex items-center justify-center">Page not found</div>;
  }

  const puckData = page.puck_data as PuckData;
  const content = puckData?.content || [];
  const rootProps = getResolvedRootProps(puckData?.root?.props || {});

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

        const mergedProps = {
          ...block.props,
          theme: rootProps.theme,
          locale: rootProps.locale,
          currency: rootProps.currency,
          siteName: rootProps.siteName,
          checkoutUrl: `/checkout/${siteId}`,
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
