"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { createEdgePuckConfig } from "../../../../packages/edge-templates/config-factory";
import { publishValidationPlugin } from "../../../../packages/edge-templates/plugins/publishValidationPlugin";
import { loadPageRecord, updatePageStatus, updateDeploymentStatus } from "../../../../packages/edge-templates/supabase-service";

export const dynamic = "force-dynamic";

export default function BuilderEditorPage() {
  const params = useParams<{ siteId: string }>();
  const router = useRouter();
  const [puckData, setPuckData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load draft on mount (Supabase first, then localStorage fallback)
  useEffect(() => {
    const siteId = params.siteId;
    if (!siteId) return;

    const loadDraft = async () => {
      let draft = null;

      // 1. Try Supabase first (primary)
      try {
        draft = await loadPageRecord(siteId);
        if (draft) {
          console.log("Loaded from Supabase");
          setPuckData(draft.puck_data);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.warn("Supabase load failed, trying localStorage:", error);
      }

      // 2. Fallback to localStorage
      try {
        const stored = localStorage.getItem(`draft-${siteId}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log("Loaded from localStorage fallback");
          setPuckData(parsed.puck_data || parsed);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.warn("localStorage load failed:", error);
      }

      // 3. Nothing found
      alert("Draft not found. Redirecting to onboarding.");
      router.push("/builder/new");
    };

    loadDraft();
  }, [params.siteId]);

  // Handle publish (updates Supabase + deployment status)
  const handlePublish = async (data: any) => {
    setSaving(true);
    try {
      const siteId = params.siteId;

      // 1. Update page status to published in Supabase
      await updatePageStatus(siteId, "published");

      // 2. Update deployment status
      await updateDeploymentStatus(siteId, "published");

      // 3. Save published data to Supabase
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nzxedlagqtzadyrmgkhq.supabase.co"}/rest/v1/site_pages?site_id=eq.${siteId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY || "",
            "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || ""}`,
          },
          body: JSON.stringify({
            puck_data: data,
            updated_at: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save published data");
        }
      } catch (error) {
        console.warn("Supabase save failed, using localStorage fallback:", error);
        // Fallback to localStorage
        const existing = localStorage.getItem(`draft-${siteId}`);
        const draft = existing ? JSON.parse(existing) : {};
        draft.puck_data = data;
        draft.status = "published";
        draft.updated_at = new Date().toISOString();
        localStorage.setItem(`draft-${siteId}`, JSON.stringify(draft));
      }

      // 4. Show success
      alert("Published successfully!");
      console.log("Publish data:", data);

      // 5. Redirect to live site (when deployed)
      // const slug = siteId.replace("site-", "").toLowerCase();
      // router.push(`https://${slug}.edgemarketplacehub.com`);
    } catch (error) {
      console.error("Publish failed:", error);
      alert("Publish failed. Check console.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg">Loading editor...</div>
      </div>
    );
  }

  if (!puckData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">No draft found</p>
          <button
            onClick={() => router.push("/builder/new")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Start New Store
          </button>
        </div>
      </div>
    );
  }

  // Create Puck config with Retail Core template
  const config = createEdgePuckConfig({
    templateFamily: "retail-core",
    businessType: "retail",
    adminMode: false,
  });

  // Add validation plugin
  const plugins = [publishValidationPlugin];

  return (
    <div style={{ height: "100vh" }}>
      {/* Back button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => router.push("/builder/new")}
          className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50"
        >
          ← Back to Onboarding
        </button>
      </div>

      {/* Puck Editor */}
      <Puck
        config={config}
        data={puckData}
        onPublish={handlePublish}
        plugins={plugins}
      />
    </div>
  );
}
