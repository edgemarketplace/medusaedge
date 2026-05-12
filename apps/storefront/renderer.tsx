import React from "react";
import { Render } from "@puckeditor/core";
import { createEdgePuckConfig } from "packages/edge-templates/config-factory";
import { loadPageRecord } from "packages/edge-templates/supabase-service";

export async function StorefrontRenderer({ siteId, slug }: { siteId: string; slug: string }) {
  const page = await loadPageRecord(siteId, slug);
  if (!page?.puck_data) return <div>Page not found</div>;

  const rootProps = page.puck_data.root?.props || {};
  const config = createEdgePuckConfig({
    templateFamily: rootProps.templateFamily || "retail-core",
    businessType: rootProps.businessType || "retail",
    adminMode: false,
    stylePreset: rootProps.stylePreset || "modern-commerce",
  });

  return (
    <div>
      <Render config={config} data={page.puck_data as any} />
    </div>
  );
}

export default StorefrontRenderer;
