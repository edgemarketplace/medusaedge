/**
 * Builder v3 - Puck Config Generator
 */

import React from "react";
import { getTheme, type ThemeName } from "@/themes/tokens";
import { componentRegistry, getComponentsByCategory } from "./registry";
import { HeroEditorial } from "./components/hero-variants";
import { HeroSplit } from "./components/hero-variants";
import { HeroMinimal } from "./components/hero-variants";

const implementations: Record<string, React.ComponentType<any>> = {
  HeroEditorial,
  HeroSplit,
  HeroMinimal,
};

export function getBuilderV3Config(themeName: ThemeName = "luxury-fashion") {
  const theme = getTheme(themeName);
  const grouped = getComponentsByCategory();
  const components: Record<string, any> = {};
  
  componentRegistry.forEach((entry: any) => {
    const Component = implementations[entry.type] || createPlaceholder(entry);
    components[entry.type] = {
      fields: entry.schema,
      render: (props: any) => React.createElement(Component, { ...props, theme }),
      label: entry.label,
    };
  });
  
  return { components, categories: grouped, theme };
}

function createPlaceholder(entry: any) {
  return (props: any) => {
    const theme = props.theme || {};
    const bg = theme?.colors?.background || "#f9fafb";
    return React.createElement("div", {
      className: "p-8 border-2 border-dashed border-gray-300 rounded-lg text-center",
      style: { backgroundColor: bg }
    }, [
      React.createElement("p", { className: "text-gray-500 font-medium" }, entry.label),
      React.createElement("p", { className: "text-gray-400 text-sm mt-1" }, entry.description),
    ]);
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

export function presetToPuckData(preset: TemplatePreset): any {
  return {
    root: { props: { theme: preset.theme } },
    content: preset.composition.map((item, idx) => ({
      type: item.type,
      props: { 
        id: item.type.toLowerCase() + "-" + idx, 
        variant: item.variant, 
        ...item.props 
      },
    })),
    zones: {},
  };
}
