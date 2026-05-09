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
import type { TemplateBlueprint } from "@/templates/registry/types"
import { getTemplate } from "@/templates/registry"
import { composePage } from "@/composer"
import { sectionRegistry } from "@/sections"

// Map section schema field types to Puck field types
function mapFieldType(type: string): string {
  const typeMap: Record<string, string> = {
    text: "text",
    textarea: "textarea",
    number: "number",
    select: "select",
    image: "text", // Puck doesn't have native image picker yet
    boolean: "select", // Use select with true/false
  }
  return typeMap[type] || "text"
}

// Convert section registry to Puck components config
export function getPuckConfig(): Config["components"] {
  const components: Config["components"] = {}

  for (const [sectionId, entry] of Object.entries(sectionRegistry)) {
    // Skip if no schema defined
    if (!entry.schema) continue

    // Convert schema to Puck fields
    const fields: Record<string, any> = {}
    for (const [fieldName, fieldDef] of Object.entries(entry.schema)) {
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

  return components
}

// Convert template to Puck data format
export function getPuckData(templateId: string): Data | null {
  const template = getTemplate(templateId)
  if (!template) {
    console.warn(`[Puck Converter] Template "${templateId}" not found`)
    return null
  }

  // Compose the page (resolves sections to React components)
  const composition = composePage(template)

  // Convert sections to Puck content format
  const content = composition.sections.map((section) => ({
    type: section.sectionId,
    props: {
      id: section.sectionInstanceId,
      ...section.props,
    },
  }))

  // Build Puck data
  const data: Data = {
    root: { props: {} },
    content,
    zones: {},
  }

  return data
}
