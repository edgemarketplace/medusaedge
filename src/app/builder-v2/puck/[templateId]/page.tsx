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

  const handlePublish = async (data: any) => {
    try {
      console.log("[Puck Editor] Publishing data:", data);
      
      // Save to localStorage for now (replace with Supabase API call later)
      const saveKey = `puck-publish-${templateId}`;
      localStorage.setItem(saveKey, JSON.stringify(data));
      
      // Show success message
      alert("Published successfully! Data saved. Note: Provisioning runner is not active, so site won't go live yet.");
      
      // Redirect back to template detail page
      router.push(`/builder-v2/${templateId}?published=true`);
    } catch (error) {
      console.error("[Puck Editor] Publish failed:", error);
      alert("Publish failed. Check console for details.");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
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
