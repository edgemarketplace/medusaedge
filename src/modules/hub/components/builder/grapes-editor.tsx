"use client"

import { useEffect, useRef } from "react"
import grapesjs from "grapesjs"
import "grapesjs/dist/css/grapes.min.css"
import { getTemplate } from "@/templates/registry"
import type { TemplateBlueprint } from "@/templates/registry"

interface GrapesEditorProps {
  templateId: string
}

// Helper to render section content from props
function renderSectionContent(section: { sectionId: string; props: Record<string, any> }): string {
  const props = section.props
  switch (section.sectionId) {
    case 'announcement-bar':
      return `<div class="announcement-text">${props.text || 'Announcement text here'}</div>`
    case 'header-navigation':
      return `<div class="header-brand">${props.brand || 'Brand'}</div><div class="header-links">${props.links?.join(' | ') || ''}</div>`
    case 'hero-split':
      return `<div class="hero-headline">${props.headline || 'Headline'}</div><div class="hero-subheadline">${props.subheadline || 'Subheadline'}</div><button class="hero-cta">${props.cta || 'CTA'}</button>`
    case 'proof-strip':
      return `<div class="proof-items">${(props.items || []).map((item: string) => `<span class="proof-item">${item}</span>`).join(' | ')}</div>`
    case 'shop-by-use-case':
      return `<div class="shop-title">${props.title || 'Shop by Category'}</div><div class="shop-categories">${(props.categories || []).map((cat: string) => `<span class="category">${cat}</span>`).join(' ')}</div>`
    case 'comparison-table':
      return `<div class="comparison-headline">${props.headline || 'Comparison'}</div>`
    case 'product-grid':
      return `<div class="product-title">${props.title || 'Products'}</div><div class="product-limit">Showing ${props.limit || 4} products</div>`
    case 'loyalty-cta':
      return `<div class="loyalty-headline">${props.headline || 'Loyalty Program'}</div>`
    case 'footer-standard':
      return `<div class="footer-brand">${props.brand || 'Brand'}</div><div class="footer-description">${props.description || 'Description'}</div>`
    default:
      return `<div>Content for ${section.sectionId}</div>`
  }
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
        .announcement-text { background: #f0f0f0; padding: 8px; border-radius: 4px; }
        .header-brand { font-weight: bold; font-size: 24px; margin-bottom: 8px; }
        .header-links { color: #666; }
        .hero-headline { font-size: 32px; font-weight: bold; margin-bottom: 8px; }
        .hero-subheadline { color: #666; margin-bottom: 16px; }
        .hero-cta { background: #000; color: #fff; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; }
        .proof-items { color: #666; font-size: 14px; }
        .proof-item { margin-right: 16px; }
        .shop-title { font-size: 24px; font-weight: bold; margin-bottom: 16px; }
        .shop-categories { display: flex; gap: 16px; }
        .category { background: #f0f0f0; padding: 8px 16px; border-radius: 4px; }
        .product-title { font-size: 24px; font-weight: bold; margin-bottom: 16px; }
        .product-limit { color: #666; }
        .loyalty-headline { font-size: 24px; font-weight: bold; margin-bottom: 16px; }
        .footer-brand { font-weight: bold; margin-bottom: 8px; }
        .footer-description { color: #666; }
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
