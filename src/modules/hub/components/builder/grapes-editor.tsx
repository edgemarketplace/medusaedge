"use client"

import { useEffect, useRef } from "react"
import grapesjs from "grapesjs"
import "grapesjs/dist/css/grapes.min.css"
import { getTemplate } from "@/templates/registry"
import type { TemplateBlueprint } from "@/templates/registry"

interface GrapesEditorProps {
  templateId: string
}

// Helper to render section content from props - dynamic based on props, not section ID
function renderSectionContent(section: { sectionId: string; props: Record<string, any> }): string {
  const props = section.props
  
  // Build content based on available props (not section ID)
  let content = ''
  
  // Headline/title (most sections have this)
  if (props.headline || props.title) {
    const text = props.headline || props.title
    content += `<div class="section-headline">${text}</div>`
  }
  
  // Subheadline
  if (props.subheadline) {
    content += `<div class="section-subheadline">${props.subheadline}</div>`
  }
  
  // Brand name
  if (props.brand) {
    content += `<div class="section-brand">${props.brand}</div>`
  }
  
  // Description
  if (props.description) {
    content += `<div class="section-description">${props.description}</div>`
  }
  
  // Announcement text
  if (props.text) {
    content += `<div class="announcement-text">${props.text}</div>`
  }
  
  // CTA button
  if (props.cta) {
    content += `<button class="section-cta">${props.cta}</button>`
  }
  
  // Items list (proof-strip, trust-strip, etc.)
  if (props.items && Array.isArray(props.items)) {
    content += `<div class="section-items">${props.items.map((item: string) => `<span class="item">${item}</span>`).join(' | ')}</div>`
  }
  
  // Links (header navigation)
  if (props.links && Array.isArray(props.links)) {
    content += `<div class="section-links">${props.links.join(' | ')}</div>`
  }
  
  // Categories (shop by use case)
  if (props.categories && Array.isArray(props.categories)) {
    content += `<div class="section-categories">${props.categories.map((cat: string) => `<span class="category">${cat}</span>`).join(' ')}</div>`
  }
  
  // Product limit
  if (props.limit) {
    content += `<div class="product-limit">Showing ${props.limit} products</div>`
  }
  
  // Background image hint
  if (props.backgroundImage) {
    content += `<div class="section-bg-hint" style="font-size:11px;color:#999;">[Background: ${props.backgroundImage.substring(0, 50)}...]</div>`
  }
  
  // Fallback if no recognized props
  if (!content) {
    content = `<div>Content for ${section.sectionId}</div>`
  }
  
  return content
}

// Generate HTML structure from template sections with actual content
function generateTemplateHTML(template: TemplateBlueprint): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: sans-serif; margin: 0; padding: 20px; }
        .section { border: 1px dashed #ccc; padding: 20px; margin: 10px 0; }
        .section-title { color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 8px; }
        .section-headline { font-size: 28px; font-weight: bold; margin-bottom: 8px; }
        .section-subheadline { color: #666; margin-bottom: 16px; font-size: 16px; }
        .section-brand { font-weight: bold; font-size: 24px; margin-bottom: 8px; }
        .section-description { color: #666; margin-bottom: 12px; }
        .announcement-text { background: #f0f0f0; padding: 8px 16px; border-radius: 4px; display: inline-block; }
        .section-cta { background: #000; color: #fff; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; margin-top: 8px; }
        .section-items { color: #666; font-size: 14px; margin-top: 8px; }
        .item { margin-right: 16px; }
        .section-links { color: #666; margin-top: 8px; }
        .section-categories { display: flex; gap: 16px; margin-top: 12px; }
        .category { background: #f0f0f0; padding: 8px 16px; border-radius: 4px; }
        .product-limit { color: #666; margin-top: 8px; }
        .section-bg-hint { margin-top: 8px; }
      </style>
    </head>
    <body>
      <div class="template-container">
        <h1>${template.name}</h1>
        <p class="template-description">${template.description}</p>
        ${template.composition.sections
          .map(
            (s) =>
              `<div class="section" data-section-id="${s.sectionId}" data-section-props='${JSON.stringify(s.props)}'>
            <div class="section-title">${s.sectionId}</div>
            <div class="section-content">${renderSectionContent({ sectionId: s.sectionId, props: s.props })}</div>
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
