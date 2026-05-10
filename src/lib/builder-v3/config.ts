/**
 * Builder v3 - Puck Config Generator
 * 
 * FIXED: Properly exposes fields for right-side editing panel
 * All components now have correct schema → fields mapping
 */

import React from "react";
import { type ThemeName } from "./milano-v3-design-tokens";
import { componentRegistry, getComponentsByCategory } from "./registry";
import {
  builderV3ComponentImplementations,
  createBuilderV3Placeholder,
  getRuntimeThemeTokens,
} from "./runtime-renderer";

export type { ThemeName } from "./milano-v3-design-tokens";

export function getBuilderV3Config(themeName: ThemeName = "luxury-fashion") {
  const theme = getRuntimeThemeTokens(themeName);
  const grouped = getComponentsByCategory();
  
  const components: Record<string, any> = {};
  
  componentRegistry.forEach((entry: any) => {
    // Get the component implementation, or use placeholder
    const Component = builderV3ComponentImplementations[entry.type] || createBuilderV3Placeholder(entry);
    
    // CRITICAL: Map entry.schema to fields for Puck's right-side panel
    // This is what enables editing text, subtext, colors, etc.
    components[entry.type] = {
      fields: { ...entry.schema }, // Explicitly spread to ensure it's copied correctly
      render: (props: any) => React.createElement(Component, { ...props, theme }),
      label: entry.label,
      category: entry.category, // Puck uses this for grouping
    };
    
    // Debug: Log the fields for this component
    console.log(`[Puck Config] ${entry.type}:`, { 
      label: entry.label, 
      fields: Object.keys(entry.schema || {}),
      hasImplementation: !!builderV3ComponentImplementations[entry.type] 
    });
  });
  
  return { 
    components, 
    categories: grouped, 
    theme,
    // Enable the fields panel (right side)
    enableFields: true,
  };
}

function createPlaceholder(entry: any) {
  return (props: any) => {
    const theme = props.theme || {};
    const bg = theme?.colors?.background || "#f9fafb";
    return React.createElement(
      "div",
      {
        className: "p-8 border-2 border-dashed border-gray-300 rounded-lg text-center",
        style: { backgroundColor: bg }
      },
      [
        React.createElement("p", { className: "text-gray-500 font-medium" }, entry.label),
        React.createElement("p", { className: "text-gray-400 text-sm mt-1" }, entry.description),
        React.createElement("p", { className: "text-gray-400 text-xs mt-2" }, "Implementation pending"),
      ]
    );
  };
}

export interface TemplatePreset {
  name: string;
  theme: ThemeName;
  description: string;
  composition: Array<{ type: string; variant?: string; props: Record<string, any> }>;
}

// Preset Definitions
export const LUXURY_FASHION_PRESET: TemplatePreset = {
  name: "Luxury Fashion",
  theme: "luxury-fashion",
  description: "Editorial-style luxury fashion storefront",
  composition: [
    { type: "AnnouncementBar", props: { text: "Free Shipping on Orders $500+" } },
    { type: "NavigationHeader", props: { logo: "MAISON" } },
    { type: "HeroEditorial", variant: "cinematic", props: { 
      headline: "FALL WINTER 2024", 
      subheadline: "The art of minimal luxury" 
    }},
    { type: "ProductGridLuxury", variant: "lookbook-style", props: { 
      title: "EDITED COLLECTION",
      collectionId: "luxury-essentials",
      columns: "3" 
    }},
    { type: "StandardFooter", props: {} },
  ],
};

export const STREETWEAR_PRESET: TemplatePreset = {
  name: "Streetwear",
  theme: "streetwear-dark",
  description: "Bold, high-contrast streetwear storefront",
  composition: [
    { type: "AnnouncementBar", props: { text: "NEW DROP: FRIDAY 3PM" } },
    { type: "NavigationHeader", props: { logo: "VELOCITY" } },
    { type: "HeroSplit", variant: "left-image", props: { 
      headline: "PUSH LIMITS.",
      subheadline: "Engineered for maximum output" 
    }},
    { type: "ProductGridLuxury", variant: "uniform", props: { 
      title: "HIGH PERFORMANCE GEAR",
      collectionId: "new-arrivals",
      columns: "3" 
    }},
    { type: "StandardFooter", props: {} },
  ],
};

// Preset lookup
const presetMap: Record<string, TemplatePreset> = {
  "luxury-fashion": LUXURY_FASHION_PRESET,
  "streetwear": STREETWEAR_PRESET,
};

export function getPresetByName(name: string): TemplatePreset | undefined {
  return presetMap[name.toLowerCase().trim()];
}

export function getThemeNames(): ThemeName[] {
  return ["luxury-fashion", "editorial-minimal", "streetwear-dark", "saas-light", "enterprise-dark"];
}

export function presetToPuckData(preset: TemplatePreset): any {
  return {
    root: { props: { theme: preset.theme } },
    content: preset.composition.map((item, idx) => ({
      type: item.type,
      props: { 
        id: `${item.type.toLowerCase()}-${idx}`, 
        variant: item.variant, 
        ...item.props 
      },
    })),
    zones: {},
  };
}
