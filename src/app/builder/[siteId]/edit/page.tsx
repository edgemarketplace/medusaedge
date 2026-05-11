"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { createEdgePuckConfig } from "packages/edge-templates/config-factory";
import { publishValidationPlugin } from "packages/edge-templates/plugins/publishValidationPlugin";

export const dynamic = "force-dynamic";

export default function BuilderEditorPage() {
  const params = useParams<{ siteId: string }>();
  const router = useRouter();
  const [puckData, setPuckData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load draft on mount (API route first, then localStorage fallback)
  useEffect(() => {
    const siteId = params.siteId;
    if (!siteId) return;

    const loadDraft = async () => {
      let draft = null;

      // 1. Try API route first (loads from Supabase server-side)
      try {
        console.log("Loading from API:", `/api/site-pages?site_id=${siteId}&slug=home`);
        const response = await fetch(`/api/site-pages?site_id=${siteId}&slug=home`);
        console.log("API response status:", response.status);
        const result = await response.json();
        console.log("API response:", result);

        if (response.ok && result && result.puck_data) {
          console.log("Loaded from Supabase via API");
          setPuckData(result.puck_data);
          setLoading(false);
          return;
        } else {
          console.warn("API load failed or no data:", result?.error || "Unknown error");
        }
      } catch (error) {
        console.warn("API load failed, trying localStorage:", error);
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
      console.error("No draft found for siteId:", siteId);
      alert("Draft not found. Redirecting to onboarding.");
      router.push("/builder/new");
    };

    loadDraft();
  }, [params.siteId]);

  // Handle publish (updates via API routes)
  const handlePublish = async (data: any) => {
    setSaving(true);
    try {
      const siteId = params.siteId;

      // 1. Update page status to published via API
      await fetch("/api/site-pages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_id: siteId,
          status: "published",
          puck_data: data,
        }),
      });

      // 2. Update deployment status via API
      await fetch("/api/deployments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_id: siteId,
          status: "published",
          last_published_at: new Date().toISOString(),
        }),
      });

      // 3. Also save to localStorage as backup
      try {
        const existing = localStorage.getItem(`draft-${siteId}`);
        const draft = existing ? JSON.parse(existing) : {};
        draft.puck_data = data;
        draft.status = "published";
        draft.updated_at = new Date().toISOString();
        localStorage.setItem(`draft-${siteId}`, JSON.stringify(draft));
      } catch (e) {
        // Ignore localStorage errors
      }

      // 4. Show success
      alert("Published successfully!");
      console.log("Publish data:", data);
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
