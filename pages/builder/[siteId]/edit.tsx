"use client";

import { useState, useEffect } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useRouter } from "next/router";
import { createEdgePuckConfig } from "packages/edge-templates/src/createEdgePuckConfig";
import { loadPage, savePage } from "packages/edge-templates/src/pagePersistence";
import { publishPage } from "packages/edge-templates/src/publishStub";
import { generatePageFromOnboarding } from "packages/edge-templates/src/onboardingGenerator";
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
        let data = await loadPage(siteId);

        // Auto-generate Retail Core template if page doesn't exist
        if (!data) {
          data = generatePageFromOnboarding({
            storeName: siteId.replace(/-/g, " "),
            businessType: "retail",
            designStyle: "modern-commerce",
          });
          await savePage(siteId, data);
        }

        setPageData(data);
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
    return <div style={{ padding: "32px", textAlign: "center" }}>Loading editor...</div>;
  }

  if (!pageData || !config || !siteId) {
    return <div style={{ padding: "32px", textAlign: "center" }}>Editor not available.</div>;
  }

  const puckData = {
    root: { props: pageData.root },
    content: pageData.content.map((item) => ({
      type: item.type,
      props: { ...item.props, id: item.id },
    })),
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 10, display: "flex", gap: "12px" }}>
        <button
          onClick={() => handleSave(puckData)}
          disabled={saving}
          style={{
            padding: "8px 16px",
            background: "#f3f4f6",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.5 : 1,
          }}
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>
        <button
          onClick={() => handlePublish(puckData)}
          disabled={publishing}
          style={{
            padding: "8px 16px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: publishing ? "not-allowed" : "pointer",
            opacity: publishing ? 0.5 : 1,
          }}
        >
          {publishing ? "Publishing..." : "Publish"}
        </button>
        <a
          href={`/storefront/${siteId}?preview=1`}
          style={{
            padding: "8px 16px",
            background: "#16a34a",
            color: "white",
            borderRadius: "4px",
            textDecoration: "none",
          }}
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
