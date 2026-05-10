"use client";

import { useState, useEffect } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPuckConfig, getPuckData, getThemeNames, getTheme } from "@/lib/puck/converter";
import type { ThemeName, ThemeTokens } from "@/themes/tokens";
import { emitCSSVariables } from "@/themes/tokens";

export const dynamic = 'force-dynamic';

export default function PuckEditorPage() {
  const params = useParams<{ templateId: string }>();
  const router = useRouter();
  const templateId = params.templateId as string;

  const [themeName, setThemeName] = useState<ThemeName>("luxury-fashion");
  const [theme, setTheme] = useState<ThemeTokens>(getTheme(themeName));
  const [themeNames] = useState<ThemeName[]>(getThemeNames());

  // Update theme when themeName changes
  useEffect(() => {
    const newTheme = getTheme(themeName);
    setTheme(newTheme);

    // Emit CSS variables for runtime theme switching
    const css = emitCSSVariables(newTheme);
    const styleId = "theme-variables";
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;

    console.log(`[Puck Editor] Switched to theme: ${themeName}`);
  }, [themeName]);

  // Get Puck config with theme-aware components (includes categories)
  const config = getPuckConfig(themeName);

  // Get Puck data from template system
  const data = getPuckData(templateId);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading template...</p>
      </div>
    );
  }

  const handlePublish = async (publishedData: any) => {
    try {
      console.log("[Puck Editor v2] Publishing:", publishedData);

      // Try to get intakeId and subdomain from URL or localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const intakeId = urlParams.get("intakeId") || localStorage.getItem("currentIntakeId");
      const subdomain = urlParams.get("subdomain") || templateId;

      // If we have intakeId, publish to Supabase
      if (intakeId) {
        const publishResponse = await fetch("/api/sites/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            intakeId,
            subdomain,
            puckData: publishedData,
            themeName,
            templateId,
          }),
        });

        const result = await publishResponse.json().catch(() => null);

        if (!publishResponse.ok || !result?.success) {
          throw new Error(result?.error || "Publish API failed");
        }

        alert("Published successfully! Your site is live at: " + result.liveUrl);
        window.location.href = result.liveUrl || `https://${subdomain}.edgemarketplacehub.com`;
        return;
      }

      // Fallback: save to localStorage (old behavior)
      const saveKey = `puck-publish-${templateId}`;
      localStorage.setItem(saveKey, JSON.stringify(publishedData));
      
      alert("Published locally. For live site, start from the launch flow at /launch-your-marketplace");
      router.push(`/builder-v2/${templateId}?published=true`);
    } catch (error) {
      console.error("[Puck Editor] Publish failed:", error);
      alert("Publish failed: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Deprecation Notice */}
      <div style={{
        backgroundColor: "#fef3c7",
        borderBottom: "1px solid #f59e0b",
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        fontSize: "0.875rem",
      }}>
        <span style={{ color: "#92400e" }}>
          <strong>Notice:</strong> This editor (v2) is deprecated. 
        </span>
        <Link 
          href={`/builder-v3/puck/${templateId}`}
          style={{
            color: "#1d4ed8",
            textDecoration: "underline",
            fontWeight: 500,
          }}
        >
          Switch to Puck Editor v3 →
        </Link>
      </div>

      {/* Theme Switcher Header */}
      <div style={{
        padding: "0.5rem 1rem",
        borderBottom: "1px solid #e5e5e5",
        backgroundColor: "#fafafa",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}>
        {/* Back Button */}
        <Link
          href={`/builder-v2/${templateId}`}
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
          Theme:
        </span>
        <select
          value={themeName}
          onChange={(e) => setThemeName(e.target.value as ThemeName)}
          style={{
            padding: "0.375rem 0.75rem",
            borderRadius: "0.25rem",
            border: "1px solid #ccc",
            fontSize: "0.875rem",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          {themeNames.map((name) => (
            <option key={name} value={name}>
              {name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
        <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "auto" }}>
          Template: {templateId}
        </span>
      </div>

      {/* Puck Editor */}
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
