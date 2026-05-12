/**
 * Storefront Page - Server Component
 * 
 * Renders a site's storefront using direct React components.
 * NO Puck editor dependencies. NO createEdgePuckConfig().
 */

import { loadPageRecord } from "packages/edge-templates/supabase-service";
import { storefrontRegistry, getStorefrontComponent } from "packages/edge-sections/storefront-registry";
import Link from "next/link";

interface PuckData {
  root?: {
    props?: Record<string, any>;
  };
  content?: Array<{
    type: string;
    props: Record<string, any>;
  }>;
}

interface StorefrontPageProps {
  params: {
    subdomain: string;
  };
}

export default async function StorefrontPage({ params }: StorefrontPageProps) {
  const { subdomain } = params;
  
  // Load page data server-side
  const page = await loadPageRecord(subdomain, "home");
  
  // Defensive checks
  if (!page?.puck_data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Store not found</h1>
          <Link href="/builder/new" className="text-blue-600 hover:underline">
            Create a store
          </Link>
        </div>
      </div>
    );
  }

  const puckData = page.puck_data as PuckData;
  const content = puckData?.content || [];
  const rootProps = puckData?.root?.props || {};

  if (!Array.isArray(content) || content.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No content available</h1>
          <Link href={`/builder/${subdomain}/edit`} className="text-blue-600 hover:underline">
            ← Edit Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="storefront" data-template={rootProps.templateFamily || "retail-core"}>
      {/* Edit button - only visible in development or with admin flag */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          href={`/builder/${subdomain}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          ← Edit Store
        </Link>
      </div>

      {/* Render sections directly using storefront registry */}
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
          locale: rootProps.locale || "en-US",
          currency: rootProps.currency || "USD",
          siteName: rootProps.siteName,
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
