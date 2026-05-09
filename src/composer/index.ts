// ═══════════════════════════════════════════════════════════════════
// Composer Engine — Template → Renderable Page
//
// The bridge between the templateRegistry (blueprint definitions) and
// the React rendering pipeline. Takes a TemplateBlueprint and produces
// a fully populated page composition ready for the renderer.
//
// Usage:
//   import { composePage } from '@/composer'
//   const page = composePage(templateBlueprint, hydrationData)
// ═══════════════════════════════════════════════════════════════════

import React from "react"
import type { TemplateBlueprint, SectionInstance } from "@/templates/registry/types"
import { resolveSection } from "@/sections/index"
import { applyTheme } from "@/themes/index"

/* ── Hydration Data ── */
export interface HydrationData {
  [sectionInstanceId: string]: Record<string, unknown>
}

/* ── Composition Result ── */
export interface CompositionResult {
  /** Unique page identifier */
  pageId: string
  /** The template that generated this composition */
  templateId: string
  /** Resolved theme */
  theme: string
  /** Rendered React elements per section */
  sections: Array<{
    sectionInstanceId: string
    sectionId: string
    component: React.FC<any>
    props: Record<string, unknown>
    order: number
  }>
  /** Metadata from the template composition */
  metadata: {
    version: string
    generatedBy: string
    composedAt: string
  }
}

/* ── Compose a template into a renderable page ── */
export function composePage(
  blueprint: TemplateBlueprint,
  hydrationData: HydrationData = {}
): CompositionResult {
  const composition = blueprint.composition
  const resolvedSections: CompositionResult["sections"] = []

  for (const instance of composition.sections) {
    const resolvedSection = resolveSection(instance.sectionId)
    if (!resolvedSection) {
      console.warn(
        `[Composer] Section "${instance.sectionId}" not found in registry. Skipping.`
      )
      continue
    }

    // Merge: base props from blueprint < hydration overrides < instance props
    const props = {
      ...(hydrationData[instance.id] || {}),
      ...instance.props,
    }

    resolvedSections.push({
      sectionInstanceId: instance.id,
      sectionId: instance.sectionId,
      component: resolvedSection.component,
      props,
      order: instance.order,
    })
  }

  // Sort by order
  resolvedSections.sort((a, b) => a.order - b.order)

  return {
    pageId: `page-${blueprint.id}`,
    templateId: blueprint.id,
    theme: composition.theme,
    sections: resolvedSections,
    metadata: {
      version: composition.metadata.version,
      generatedBy: composition.metadata.generatedBy,
      composedAt: new Date().toISOString(),
    },
  }
}

/* ── Render a composed page into React elements ── */
export function renderPage(
  composition: CompositionResult,
  additionalProps?: Record<string, unknown>
): React.ReactElement[] {
  return composition.sections.map((section) => {
    const Component = section.component
    const props = { ...section.props, ...additionalProps }
    return React.createElement(Component, {
      key: section.sectionInstanceId,
      ...props,
    })
  })
}

/* ── Apply theme from a composition ── */
export function applyCompositionTheme(composition: CompositionResult): void {
  if (typeof window === "undefined") return
  applyTheme(composition.theme)
}

/* ── Serialize a page to JSON (for persistence) ── */
export function serializePage(composition: CompositionResult): string {
  return JSON.stringify(
    {
      pageId: composition.pageId,
      templateId: composition.templateId,
      theme: composition.theme,
      sections: composition.sections.map((s) => ({
        instanceId: s.sectionInstanceId,
        sectionId: s.sectionId,
        props: s.props,
        order: s.order,
      })),
      metadata: composition.metadata,
    },
    null,
    2
  )
}

/* ── Create a blank starter composition ── */
export function createStarterComposition(sections: SectionInstance[] = []): Omit<
  CompositionResult,
  "theme"
> & { theme: string } {
  return {
    pageId: `starter-${Date.now()}`,
    templateId: "blank",
    theme: "minimal",
    sections: [],
    metadata: {
      version: "2.0",
      generatedBy: "starter",
      composedAt: new Date().toISOString(),
    },
  }
}

/* ── Validate a composition ── */
export function validateComposition(
  composition: CompositionResult
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!composition.sections || composition.sections.length === 0) {
    errors.push("Composition has no sections")
  }

  const hasHeader = composition.sections.some((s) =>
    s.sectionId.startsWith("header")
  )
  if (!hasHeader) {
    errors.push("Missing header section")
  }

  const hasHero = composition.sections.some((s) =>
    s.sectionId.startsWith("hero")
  )
  if (!hasHero) {
    errors.push("Missing hero section")
  }

  return { valid: errors.length === 0, errors }
}
