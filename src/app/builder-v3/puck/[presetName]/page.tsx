/**
 * Builder v3 - Puck Editor Page
 * 
 * Uses the new "Storefront Design System Platform" architecture:
 * - Milano-mapped components
 * - Theme token injection
 * - Variant system
 * - Preset-driven composition
 */

"use client";

import { useState, useEffect } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { 
  getBuilderV3Config, 
  getPresetByName, 
  presetToPuckData,
  type TemplatePreset,
  type ThemeName 
} from "@/lib/builder-v3/config";

export const dynamic = 'force-dynamic';

export default function BuilderV3PuckPage() {
  const params = useParams<{ presetName: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetName = params.presetName as string;
  
  // NEW: Get intakeId and subdomain from URL params
  const intakeId = searchParams.get('intakeId');
  const subdomain = searchParams.get('subdomain');
  
  const [preset, setPreset] = useState<TemplatePreset | undefined>();
  const [themeName, setThemeName] = useState<ThemeName>("luxury-fashion");
  const [config, setConfig] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log("[Builder v3] Loading preset:", presetName);
      const p = getPresetByName(presetName);
      
      if (!p) {
        const errMsg = `Preset "${presetName}" not found`;
        console.error("[Builder v3]", errMsg);
        setError(errMsg);
        return;
      }
      
      console.log("[Builder v3] Preset loaded:", p.name);
      setPreset(p);
      setThemeName(p.theme);
      
      // Generate Puck config with theme-aware components
      const puckConfig = getBuilderV3Config(p.theme);
      console.log("[Builder v3] Config generated for theme:", p.theme);
      setConfig(puckConfig);
      
      // Convert preset to Puck data format
      const puckData = presetToPuckData(p);
      console.log("[Builder v3] Data converted, content items:", puckData.content.length);
      setData(puckData);
    } catch (e: any) {
      console.error("[Builder v3] Error loading preset:", e);
      setError(e.message || "Unknown error");
    }
  }, [presetName]);

  const handlePublish = async (publishedData: any) => {
    try {
      console.log("[Builder v3] Publishing:", publishedData);

      if (!intakeId && !subdomain) {
        const saveKey = `builder-v3-publish-${presetName}`;
        localStorage.setItem(saveKey, JSON.stringify(publishedData));
        alert("Published locally! To go live with a subdomain, start from the launch flow.");
        // Redirect to launch flow instead of broken template page
        router.push(`/launch-your-marketplace`);
        return;
      }

      const publishResponse = await fetch("/api/sites/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intakeId,
          subdomain,
          puckData: publishedData,
          themeName: preset?.theme || themeName,
          templateId: presetName,
        }),
      });

      const result = await publishResponse.json().catch(() => null);

      if (!publishResponse.ok || !result?.success) {
        throw new Error(result?.details || result?.error || "Publish API failed");
      }

      alert("Published successfully! Your marketplace is live.");
      window.location.href = result.liveUrl || `https://${subdomain}.edgemarketplacehub.com`;
    } catch (error) {
      console.error("[Builder v3] Publish failed:", error);
      alert(error instanceof Error ? error.message : "Publish failed. Check console.");
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-slate-600 mb-4">{error}</p>
          <Link href="/builder-v3" className="text-violet-600 hover:underline">
            ← Back to Presets
          </Link>
        </div>
      </div>
    );
  }

  if (!preset || !config || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">Loading preset...</p>
          <Link href="/builder-v3" className="text-violet-600 hover:underline">
            ← Back to Presets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Warning Banner - No Launch Flow Context */}
      {!intakeId && !subdomain && (
        <div style={{
          padding: "0.75rem 1rem",
          backgroundColor: "#fef3c7",
          borderBottom: "2px solid #f59e0b",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.875rem",
        }}>
          <span style={{ color: "#92400e" }}>
            <strong>Preview Mode:</strong> Publishing will save locally only. 
            To go live with a subdomain, <a href="/launch-your-marketplace" style={{ color: "#1d4ed8", textDecoration: "underline" }}>start the launch flow</a>.
          </span>
        </div>
      )}
      
      {/* Header with Back Button + Theme Switcher */}
      <div style={{
        padding: "0.5rem 1rem",
        borderBottom: "1px solid #e5e5e5",
        backgroundColor: "#fafafa",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}>
        {/* Back Button - Goes to template preview page */}
        <Link
          href={`/builder-v3/templates/${presetName}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#555",
            textDecoration: "none",
            padding: "0.375rem 0.75rem",
            borderRadius: "0.25rem",
            border: "1px solid #ccc",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <ArrowLeft style={{ width: "1rem", height: "1rem" }} />
          Back to Template
        </Link>

        <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#555" }}>
          Preset:
        </span>
        <span style={{ fontSize: "0.875rem", color: "#333" }}>
          {preset.name}
        </span>

        <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#555", marginLeft: "auto" }}>
          Theme:
        </span>
        <select
          value={themeName}
          onChange={(e) => {
            const newTheme = e.target.value as ThemeName;
            setThemeName(newTheme);
            const newConfig = getBuilderV3Config(newTheme);
            setConfig(newConfig);
          }}
          style={{
            padding: "0.375rem 0.75rem",
            borderRadius: "0.25rem",
            border: "1px solid #ccc",
            fontSize: "0.875rem",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <option value="luxury-fashion">Luxury Fashion</option>
          <option value="editorial-minimal">Editorial Minimal</option>
          <option value="streetwear-dark">Streetwear Dark</option>
        </select>
      </div>

      {/* Puck Editor with Milano-mapped Components */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Puck
          config={config}
          data={data}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
}
