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

export function getPresetByName(name: string): TemplatePreset | undefined {
  return undefined;
}

export function presetToPuckData(preset: TemplatePreset): any {
  return {
    root: { props: { theme: preset.theme } },
    content: preset.composition.map((item, idx) => ({
      type: item.type,
      props: { id: item.type.toLowerCase() + "-" + idx, variant: item.variant, ...item.props }
    })),
    zones: {},
  };
}
