/**
 * Storefront Page - Server Component
 *
 * Renders a site's storefront using direct React components.
 * NO Puck editor dependencies. NO createEdgePuckConfig().
 *
 * Public storefront = customer-facing live page
 * Preview mode = ?preview=1 query param (for store owners)
 */

import Link from "next/link";
import type { Metadata } from "next";
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
}

interface StorefrontPageProps {
  params: {
    subdomain: string;
  };
  searchParams: {
    preview?: string;
  };
}

async function loadStorefrontPage(siteId: string) {
  return (await loadPageRecord(siteId, "home")) || loadDraftRecord(siteId, "home");
}

function getResolvedRootProps(rootProps: Record<string, any> = {}) {
  const stylePreset = rootProps.stylePreset || "modern-commerce";

  return {
    ...rootProps,
    stylePreset,
    theme: rootProps.theme || getPreset(stylePreset),
    currency: rootProps.currency || "USD",
    locale: rootProps.locale || "en-US",
  };
}

export async function generateMetadata({ params }: StorefrontPageProps): Promise<Metadata> {
  const page = await loadStorefrontPage(params.subdomain);
  const rootProps = getResolvedRootProps((page?.puck_data as PuckData)?.root?.props || {});

  return {
    title: rootProps.seoTitle || `${rootProps.siteName || "Store"} - Online Store`,
    description: rootProps.seoDescription || `Shop at ${rootProps.siteName || "our store"} for the best products.`,
  };
}

export default async function StorefrontPage({ params, searchParams }: StorefrontPageProps) {
  const { subdomain } = params;
  const isPreviewMode = searchParams.preview === "1";
  const page = await loadStorefrontPage(subdomain);

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
  const rootProps = getResolvedRootProps(puckData?.root?.props || {});

  if (!Array.isArray(content) || content.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No content available</h1>
          {isPreviewMode && (
            <div className="space-y-2">
              <Link href={`/builder/${subdomain}/edit`} className="block text-blue-600 hover:underline">
                ← Edit Store
              </Link>
              <Link href={`/inventory/${subdomain}`} className="block text-blue-600 hover:underline">
                → Add Inventory
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="storefront" data-template={rootProps.templateFamily || "retail-core"}>
      {isPreviewMode && (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <Link
            href={`/inventory/${subdomain}`}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
          >
            + Inventory
          </Link>
          <Link
            href={`/builder/${subdomain}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            ← Edit Store
          </Link>
        </div>
      )}

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
          checkoutUrl: `/checkout/${subdomain}`,
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
