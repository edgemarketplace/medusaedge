// ══════════════════════════════════════════════════════════════════
// Template → Puck Converter
// ══════════════════════════════════════════════════════════════════
// Converts Edge Marketplace Hub template system to Puck editor format
//
// Usage:
//   import { getPuckConfig, getPuckData } from '@/lib/puck/converter'
//   const config = getPuckConfig()
//   const data = getPuckData(templateId)
// ══════════════════════════════════════════════════════════════════

import type { Config, Data } from "@puckeditor/core"
import type { TemplateBlueprint, SectionBlueprint } from "../../templates/registry/types"
import { getTemplate } from "../../templates/registry"
import { composePage, CompositionResult } from "../../composer"
import { sectionRegistry, RegistryEntry } from "../../sections"

// Map section schema field types to Puck field types
function mapFieldType(type: string): string {
  const typeMap: Record<string, string> = {
    text: "text",
    textarea: "textarea",
    number: "number",
    select: "select",
    image: "text", // Puck doesn't have native image picker yet
    boolean: "select",
  }
  return typeMap[type] || "text"
}

// Convert section registry to Puck components config
export function getPuckConfig(): Config["components"] {
  const components: Config["components"] = {}

  console.log("[Puck Converter] Section registry keys:", Object.keys(sectionRegistry))

  for (const [sectionId, entry] of Object.entries(sectionRegistry) as [string, RegistryEntry][]) {
    // Skip if no schema defined
    if (!entry.schema) {
      console.log(`[Puck Converter] Skipping ${sectionId} - no schema`)
      continue
    }

    console.log(`[Puck Converter] Processing ${sectionId}:`, entry.schema)

    // Convert schema to Puck fields
    const fields: Record<string, any> = {}
    for (const [fieldName, fieldDef] of Object.entries(entry.schema) as [string, any][]) {
      fields[fieldName] = {
        type: mapFieldType(fieldDef.type),
        label: fieldDef.label || fieldName,
        ...(fieldDef.options ? { options: fieldDef.options } : {}),
        ...(fieldDef.default ? { defaultValue: fieldDef.default } : {}),
      }
    }

    // Create Puck render function that wraps the React component
    components[sectionId] = {
      fields,
      render: (props: any) => {
        const Component = entry.component
        return Component(props)
      },
    }
  }

  console.log("[Puck Converter] Generated Puck config:", Object.keys(components))
  return components
}

// Convert template to Puck data format
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
