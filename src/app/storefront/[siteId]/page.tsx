import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Render } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { createEdgePuckConfig } from "packages/edge-templates/config-factory";

export const dynamic = "force-dynamic";

async function getSiteData(siteId: string) {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "https://www.edgemarketplacehub.com";
  
  const res = await fetch(`${baseUrl}/api/site-pages?site_id=${siteId}&slug=home`, {
    cache: "no-store",
  });
  
  if (!res.ok) return null;
  return res.json();
}

export default async function StorefrontPage({ 
  params 
}: { 
  params: { siteId: string } 
}) {
  const siteData = await getSiteData(params.siteId);
  
  if (!siteData || !siteData.puck_data) {
    notFound();
  }

  const { root, content } = siteData.puck_data;

  const config = createEdgePuckConfig({
    templateFamily: root?.props?.templateFamily || "retail-core",
    businessType: root?.props?.businessType || "retail",
    adminMode: false,
  });

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <a
          href={`/builder/${params.siteId}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          ← Edit Store
        </a>
      </div>

      <Render
        config={config}
        data={{ root, content }}
      />
    </div>
  );
}
