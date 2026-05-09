// ══════════════════════════════════════════════════════════════════
// Puck Converter (Theme-Aware)
// ══════════════════════════════════════════════════════════════════
// Converts Edge Marketplace Hub template system → Puck editor format.
// NOW WITH THEME TOKENS: components receive (props, theme) for styling.
//
// Architecture:
//   Template Registry → getTemplate() → TemplateBlueprint
//                                    ↓
//   composer.composePage() → CompositionResult (sections resolved)
//                                    ↓
//   converter.getPuckConfig() → Puck components (with theme injection)
//   converter.getPuckData() → Puck data (content array)
//                                    ↓
//   Puck Editor (visual editing with theme-aware rendering)
// ══════════════════════════════════════════════════════════════════

import type { Config, Data } from "@puckeditor/core"
import { getTemplate, type TemplateBlueprint } from "@/templates/registry"
import { composePage, type CompositionResult } from "@/composer"
import { sectionRegistry, type RegistryEntry } from "@/sections"
import { themes, type ThemeTokens, type ThemeName } from "@/themes/tokens"
import React from "react"

// ══════════════════════════════════════════════════════════════════
// THEME CONTEXT (injected into Puck components)
// ══════════════════════════════════════════════════════════════════

// Default theme for initial render
const defaultTheme: ThemeTokens = themes["luxury-fashion"]

// ═════════════════════════════════════════════════════════════════
// CATEGORY DEFINITIONS (for Puck sidebar organization)
// ═════════════════════════════════════════════════════════════════

const CATEGORY_LABELS: Record<string, string> = {
  hero: "🎬 Hero Sections",
  header: "📌 Headers & Navigation",
  navigation: "📌 Headers & Navigation",
  footer: "🦶 Footers",
  commerce: "🛒 Commerce",
  social: "💬 Social Proof",
  trust: "💬 Social Proof",
  content: "📝 Content & Info",
  promotional: "🎯 Promotional",
  booking: "📅 Booking & Services",
}

// ═════════════════════════════════════════════════════════════════
// Convert section registry to Puck components config
// NOW: Each component receives (props, theme) for theme-aware rendering
// ═════════════════════════════════════════════════════════════════

export function getPuckConfig(
  themeName: ThemeName = "luxury-fashion"
): Config {
  const theme = themes[themeName] || defaultTheme
  const components: Config["components"] = {}

  // Group components by category
  const categoryMap: Record<string, string[]> = {}

  console.log(`[Puck Converter] Processing ${Object.keys(sectionRegistry).length} sections with theme: ${themeName}`)

  for (const [sectionId, entry] of Object.entries(sectionRegistry)) {
    const registryEntry = entry as RegistryEntry
    const schema = registryEntry.schema as Record<string, any>
    const category = registryEntry.category || "uncategorized"

    if (!schema) {
      console.warn(`[Puck Converter] No schema found for ${sectionId}, skipping`)
      continue
    }

    // Convert schema fields to Puck fields
    const fields: Record<string, any> = {}

    for (const [key, fieldConfig] of Object.entries(schema)) {
      const config = fieldConfig as { type: string; options?: any[] }
      if (fieldConfig.type === "text") {
        fields[key] = { type: "text" }
      } else if (fieldConfig.type === "textarea") {
        fields[key] = { type: "textarea" }
      } else if (fieldConfig.type === "image") {
        fields[key] = { type: "image" }
      } else if (fieldConfig.type === "select") {
        fields[key] = {
          type: "select",
          options: fieldConfig.options || [],
        }
      } else if (fieldConfig.type === "number") {
        fields[key] = { type: "number" }
      } else if (fieldConfig.type === "boolean") {
        fields[key] = { type: "radio", options: [
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
      } else {
        // Default to text
        fields[key] = { type: "text" }
      }
    }

    // Create render function that injects theme
    const Component = registryEntry.component

    components[sectionId] = {
      fields,
      render: (props: any) => {
        return React.createElement(Component, { ...props, theme })
      },
      // Use label from registry or sectionId
      label: registryEntry.label || sectionId,
    }

    // Track components by category for categories object
    const categoryLabel = CATEGORY_LABELS[category] || "📦 Other"
    if (!categoryMap[categoryLabel]) {
      categoryMap[categoryLabel] = []
    }
    categoryMap[categoryLabel].push(sectionId)

    console.log(`[Puck Converter] Mapped ${sectionId} (${category}) with fields:`, Object.keys(fields))
  }

  // Build categories object for Puck sidebar (Record<string, Category>)
  const categories: Config["categories"] = {}
  for (const [label, componentIds] of Object.entries(categoryMap)) {
    categories[label] = {
      components: componentIds,
    }
  }

  console.log(`[Puck Converter] Generated Puck config with ${Object.keys(components).length} components in ${Object.keys(categories).length} categories`)

  return {
    components,
    categories,
  }
}

// ══════════════════════════════════════════════════════════════════
// Convert template to Puck data format
// ══════════════════════════════════════════════════════════════════

export function getPuckData(templateId: string): Data | null {
  const template = getTemplate(templateId)
  if (!template) {
    console.warn(`[Puck Converter] Template "${templateId}" not found`)
    return null
  }

  console.log(`[Puck Converter] Loading template: ${templateId}`, template)

  // Compose the page (resolves sections to React components)
  const composition: CompositionResult = composePage(template)

  console.log("[Puck Converter] Composition result:", composition)

  // Convert sections to Puck content format
  // IMPORTANT: Puck expects 'type' to match a key in config.components
  const content = composition.sections.map((section) => {
    console.log(`[Puck Converter] Mapping section: ${section.sectionId} (instance: ${section.sectionInstanceId})`)
    return {
      type: section.sectionId, // This MUST match a key in config.components
      props: {
        id: section.sectionInstanceId,
        ...section.props,
      },
    }
  })

  // Build Puck data - ensure it matches Puck's expected format
  const data: Data = {
    root: { props: {} },
    content,
    zones: {},
  }

  console.log("[Puck Converter] Puck data:", JSON.stringify(data, null, 2))
  return data
}

// ══════════════════════════════════════════════════════════════════
// Theme helpers for Puck editor
// ══════════════════════════════════════════════════════════════════

export function getThemeNames(): ThemeName[] {
  return Object.keys(themes) as ThemeName[]
}

export function getTheme(themeName: ThemeName): ThemeTokens {
  return themes[themeName] || defaultTheme
}
