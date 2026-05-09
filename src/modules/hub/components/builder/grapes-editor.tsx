"use client"

import { useEffect, useRef } from "react"
import grapesjs from "grapesjs"
import "grapesjs/dist/css/grapes.min.css"
import { getTemplate } from "@/templates/registry"
import type { TemplateBlueprint } from "@/templates/registry"

interface GrapesEditorProps {
  templateId: string
}

// Generate basic HTML structure from template sections
function generateTemplateHTML(template: TemplateBlueprint): string {
  const sectionNames = template.composition.sections
    .map((s) => s.sectionId.replace(/-/g, " "))
    .join(", ")

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: sans-serif; margin: 0; padding: 20px; }
        .section { border: 1px dashed #ccc; padding: 20px; margin: 10px 0; }
        .section-title { color: #666; font-size: 12px; text-transform: uppercase; }
      </style>
    </head>
    <body>
      <div class="template-container">
        <h1>${template.name}</h1>
        <p class="template-description">${template.description}</p>
        <p class="template-sections">Sections: ${sectionNames}</p>
        ${template.composition.sections
          .map(
            (s) =>
              `<div class="section" data-section-id="${s.sectionId}">
            <div class="section-title">${s.sectionId}</div>
            <div class="section-content">Content for ${s.sectionId}</div>
          </div>`
          )
          .join("\n")}
      </div>
    </body>
    </html>
  `
}

export function GrapesEditor({ templateId }: GrapesEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const editorInstance = useRef<grapesjs.Editor | null>(null)

  useEffect(() => {
    const initEditor = () => {
      if (!editorRef.current) return

      // Get template from updated 20-template registry
      const template = getTemplate(templateId)
      if (!template) {
        console.error(`Template ${templateId} not found in registry`)
        return
      }

      // Generate HTML from template structure
      const html = generateTemplateHTML(template)

      // Clean up existing editor instance
      if (editorInstance.current) {
        editorInstance.current.destroy()
      }

      // Initialize GrapesJS with template HTML
      editorInstance.current = grapesjs.init({
        container: editorRef.current,
        components: html,
        style: "",
        fromElement: false,
        storageManager: false,
        plugins: [],
      })
    }

    initEditor()

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy()
      }
    }
  }, [templateId])

  return <div ref={editorRef} className="h-full w-full" />
}
