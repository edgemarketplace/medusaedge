"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Render, Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { createEdgePuckConfig } from "packages/edge-templates/config-factory";

export const dynamic = "force-dynamic";

export default function SiteEditorPage() {
  const params = useParams<{ siteId: string }>();
  const [searchParams] = useSearchParams();
  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Try API first
        const res = await fetch(`/api/site-pages?site_id=${params.siteId}&slug=home`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setSiteData(data);
            setLoading(false);
            return;
          }
        }

        // Fallback to localStorage
        const stored = localStorage.getItem(`draft-${params.siteId}`);
        if (stored) {
          setSiteData(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load site data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.siteId]);

  if (loading) return <div className="p-8 text-center">Loading editor...</div>;
  if (!siteData) return <div className="p-8 text-center">Site not found. <a href="/builder/new">Create a new store</a></div>;

  const puckData = siteData.puck_data;
  const config = createEdgePuckConfig({
    templateFamily: puckData.root?.props?.templateFamily || "retail-core",
    businessType: puckData.root?.props?.businessType || "retail",
  });

  const handlePublish = async (data: any) => {
    try {
      // Save to API
      await fetch("/api/site-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_id: params.siteId,
          slug: "home",
          puck_data: data,
          status: "published",
        }),
      });
      alert("Published successfully!");
      window.location.href = `/site/${params.siteId}`;
    } catch (error) {
      console.error("Publish failed:", error);
      alert("Publish failed. Check console.");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Puck config={config} data={puckData} onPublish={handlePublish} />
    </div>
  );
}
