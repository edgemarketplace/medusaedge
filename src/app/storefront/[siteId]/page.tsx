"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Render } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { createEdgePuckConfig } from "packages/edge-templates/config-factory";

export default function StorefrontPage({ 
  params 
}: { 
  params: { siteId: string } 
}) {
  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        const baseUrl = window.location.origin;
        const res = await fetch(`${baseUrl}/api/site-pages?site_id=${params.siteId}&slug=home`);
        
        if (!res.ok) {
          router.push("/404");
          return;
        }
        
        const data = await res.json();
        setSiteData(data);
      } catch (error) {
        console.error("Failed to load site:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [params.siteId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg">Loading store...</div>
      </div>
    );
  }

  if (!siteData || !siteData.puck_data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Store not found</h1>
          <a href="/builder/new" className="text-blue-600 hover:underline">
            Create a store
          </a>
        </div>
      </div>
    );
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
