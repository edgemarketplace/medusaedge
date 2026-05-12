"use client";

import { useState, useEffect } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useRouter } from "next/router";
import { createEdgePuckConfig } from "packages/edge-templates/src/createEdgePuckConfig";
import { loadPage, savePage } from "packages/edge-templates/src/pagePersistence";
import { publishPage } from "packages/edge-templates/src/publishStub";
import type { NormalizedPage } from "packages/edge-templates/src/types";

export default function SiteEditor() {
  const router = useRouter();
  const { siteId } = router.query;
  
  const [pageData, setPageData] = useState<NormalizedPage | null>(null);
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [configLoading, setConfigLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (!siteId || typeof siteId !== "string") return;
    
    async function loadPageData() {
      try {
        const data = await loadPage(siteId);
        if (data) {
          setPageData(data);
        } else {
          router.push("/builder/new");
        }
      } catch (error) {
        console.error("Failed to load page:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPageData();
  }, [siteId]);

  useEffect(() => {
    async function loadConfig() {
      if (!pageData) return;
      
      try {
        const cfg = await createEdgePuckConfig({
          templateFamily: pageData.root.templateFamily || "retail-core",
          businessType: pageData.root.businessType || "retail",
        });
        setConfig(cfg);
      } catch (error) {
        console.error("Failed to load Puck config:", error);
      } finally {
        setConfigLoading(false);
      }
    }
    loadConfig();
  }, [pageData]);

  const handleSave = async (data: any) => {
    if (!pageData || !siteId || typeof siteId !== "string") return;
    
    setSaving(true);
    try {
      const updatedPage: NormalizedPage = {
        root: data.root.props,
        content: data.content.map((item: any) => ({
          id: item.props.id,
          type: item.type,
          props: item.props,
          order: item.props.order || 0,
        })),
      };
      
      await savePage(siteId, updatedPage);
      setPageData(updatedPage);
    } catch (error) {
      console.error("Save failed:", error);
      alert("Draft save failed. Check console.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (data: any) => {
    if (!pageData || !siteId || typeof siteId !== "string") return;
    
    setPublishing(true);
    try {
      const pageToPublish: NormalizedPage = {
        root: data.root.props,
        content: data.content.map((item: any) => ({
          id: item.props.id,
          type: item.type,
          props: item.props,
          order: item.props.order || 0,
        })),
      };
      
      const result = await publishPage(
        siteId,
        pageToPublish.root,
        pageToPublish.content
      );
      
      if (result.success) {
        // Redirect to inventory page (per user funnel: editor → inventory → checkout → launch)
        router.push(`/inventory/${siteId}`);
      } else {
        alert(`Publish failed: ${result.errors?.join(", ")}`);
      }
    } catch (error) {
      console.error("Publish failed:", error);
      alert("Publish failed. Check console.");
    } finally {
      setPublishing(false);
    }
  };

  if (loading || configLoading) {
    return <div className="p-8 text-center">Loading editor...</div>;
  }

  if (!pageData || !config || !siteId) {
    return <div className="p-8 text-center">Editor not available. <a href="/builder/new">Create a store</a></div>;
  }

  const puckData = {
    root: { props: pageData.root },
    content: pageData.content.map((item) => ({
      type: item.type,
      props: { ...item.props, id: item.id },
    })),
  };

  return (
    <div style={{ height: "100vh" }} className="relative">
      <div className="absolute top-4 right-4 z-10 flex gap-3">
        <button
          onClick={() => handleSave(puckData)}
          disabled={saving}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>
        <button
          onClick={() => handlePublish(puckData)}
          disabled={publishing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {publishing ? "Publishing..." : "Publish"}
        </button>
        <a
          href={`/storefront/${siteId}?preview=1`}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Preview
        </a>
      </div>

      <Puck
        config={config}
        data={puckData}
        onPublish={(data) => handlePublish(data)}
      />
    </div>
  );
}
