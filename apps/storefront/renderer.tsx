import React from "react";
import { Render } from "@puckeditor/core";
import { createEdgePuckConfig } from "../../packages/edge-templates/config-factory";
import { loadPageRecord } from "../../packages/edge-templates/supabase-service";

export async function StorefrontRenderer({ siteId, slug }: { siteId: string; slug: string }) {
  // Load page data from Supabase
  const page = await loadPageRecord(siteId, slug);
  if (!page) return <div>Page not found</div>;

  // Get Puck config (non-admin mode)
  const config = createEdgePuckConfig({
    templateFamily: "retail-core", // Default for now
    businessType: "retail",
    adminMode: false,
  });

  return (
    <div>
      {/* Inject theme CSS variables from root props */}
      <style>{`
        :root {
          --color-bg: ${page.puckData.root?.bg || "#ffffff"};
          --color-primary: ${page.puckData.root?.primary || "#0d6efd"};
        }
      `}</style>
      {/* Render Puck content */}
      <Render config={config} data={page.puckData} />
    </div>
  );
}

export default StorefrontRenderer;
