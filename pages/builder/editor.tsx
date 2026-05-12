import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Puck } from "@measured/puck";
import { createEdgePuckConfig } from "../../packages/edge-templates/src/createEdgePuckConfig";
import { savePage, loadPage } from "../../packages/edge-templates/src/pagePersistence";
import { publishPage } from "../../packages/edge-templates/src/publishStub";
import type { EdgeRootProps, NormalizedPage } from "../../packages/edge-templates/src/types";

export default function BuilderEditorPage() {
  const router = useRouter();
  const { siteId, pageId } = router.query;

  const [pageData, setPageData] = useState<NormalizedPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // Load page data on mount
  useEffect(() => {
    if (!siteId || !pageId) return;

    // In production, load from Supabase. For now, load from localStorage
    const savedPage = loadPage(pageId as string);
    if (savedPage) {
      setPageData({
        root: savedPage.puckData.root,
        content: savedPage.puckData.content as any,
      });
    }
    setLoading(false);
  }, [siteId, pageId]);

  // Handle Puck data changes
  const handleChange = (data: { root: EdgeRootProps; content: any[] }) => {
    setPageData({
      root: data.root,
      content: data.content,
    });
  };

  // Save draft
  const handleSaveDraft = async () => {
    if (!pageData || !pageId) return;
    setSaving(true);

    try {
      savePage({
        id: pageId as string,
        siteId: siteId as string,
        slug: "home",
        puckData: {
          root: pageData.root,
          content: pageData.content,
        },
      });
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save draft");
    } finally {
      setSaving(false);
    }
  };

  // Publish page
  const handlePublish = async () => {
    if (!pageData || !siteId) return;
    setPublishing(true);

    try {
      const result = await publishPage(
        siteId as string,
        pageData.root,
        pageData.content
      );

      if (result.success) {
        alert("Page published successfully!");
        // Redirect to storefront preview
        router.push(`/storefront/${siteId}`);
      } else {
        alert(`Publish failed: ${result.errors?.join(", ")}`);
      }
    } catch (error) {
      console.error("Publish error:", error);
      alert("Failed to publish page");
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return <div>Loading editor...</div>;
  }

  if (!pageData) {
    return <div>No page data found. Please complete onboarding first.</div>;
  }

  // Create Puck config based on the page data
  const puckConfig = createEdgePuckConfig({
    templateFamily: pageData.root.templateFamily,
    businessType: pageData.root.businessType,
  });

  return (
    <>
      <Head>
        <title>Editor - {pageData.root.siteName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Toolbar */}
        <div style={{ 
          padding: "12px 16px", 
          borderBottom: "1px solid #e5e7eb", 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center",
          background: "#ffffff"
        }}>
          <div>
            <strong>{pageData.root.siteName}</strong>
            <span style={{ marginLeft: 8, color: "#6b7280", fontSize: 14 }}>
              {pageData.root.templateFamily}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleSaveDraft}
              disabled={saving}
              style={{
                padding: "8px 16px",
                border: "1px solid #d1d5db",
                borderRadius: 6,
                background: "#ffffff",
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: 6,
                background: "#2563eb",
                color: "#ffffff",
                cursor: publishing ? "not-allowed" : "pointer",
              }}
            >
              {publishing ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        {/* Puck Editor */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Puck
            config={puckConfig}
            data={{
              root: pageData.root,
              content: pageData.content,
            }}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}
