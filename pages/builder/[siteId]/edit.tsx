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
  const [saveMessage, setSaveMessage] = useState("");

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
    setSaveMessage("");
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
      setSaveMessage("Draft saved!");
      setTimeout(() => setSaveMessage(""), 3000);
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
        // REDIRECT TO INVENTORY (not storefront) - per user funnel
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (!pageData || !config || !siteId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Editor Not Available</h1>
          <p className="text-gray-600 mb-6">No draft found. Create a store to get started.</p>
          <a
            href="/builder/new"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Create New Store
          </a>
        </div>
      </div>
    );
  }

  const puckData = {
    root: { props: pageData.root },
    content: pageData.content.map((item) => ({
      type: item.type,
      props: { ...item.props, id: item.id },
    })),
  };

  return (
    <div style={{ height: "100vh" }} className="relative bg-gray-50">
      {/* Top toolbar - professional gradient */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Brand + Site Name */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">
                EM
              </div>
              <span className="font-semibold">{pageData.root.siteName || "Untitled Store"}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-300">
              {pageData.root.businessType || "retail"} • {pageData.root.templateFamily || "retail-core"}
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {saveMessage && (
              <span className="text-sm text-green-400 animate-fade-in">{saveMessage}</span>
            )}
            
            <button
              onClick={() => handleSave(puckData)}
              disabled={saving}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50 text-sm font-medium transition-colors"
            >
              {saving ? "Saving..." : "Save Draft"}
            </button>
            
            <button
              onClick={() => handlePublish(puckData)}
              disabled={publishing}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 text-sm font-bold transition-colors shadow-lg shadow-blue-500/25"
            >
              {publishing ? "Publishing..." : "🚀 Publish & Continue"}
            </button>
            
            <a
              href={`/storefront/${siteId}?preview=1`}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
            >
              👁 Preview
            </a>
            
            <button
              onClick={() => router.push("/builder/new")}
              className="px-4 py-2 border border-gray-600 hover:border-gray-500 rounded-lg text-sm font-medium transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      {/* Puck Editor - with top padding for toolbar */}
      <div style={{ paddingTop: "60px", height: "100%" }}>
        <Puck
          config={config}
          data={puckData}
          onPublish={(data) => handlePublish(data)}
          onChange={(data) => {
            // Optional: debounced autosave
          }}
        />
      </div>
    </div>
  );
}
