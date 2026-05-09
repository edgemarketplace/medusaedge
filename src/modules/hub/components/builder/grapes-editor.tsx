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

// Generate HTML structure from template sections with actual content and full styling
function generateTemplateHTML(template: TemplateBlueprint): string {
  // Build CSS based on template theme
  const themeColors: Record<string, { primary: string; bg: string; text: string }> = {
    athletic: { primary: '#000', bg: '#fff', text: '#333' },
    premium: { primary: '#1a1a2e', bg: '#f5f5f5', text: '#333' },
    boutique: { primary: '#8b5cf6', bg: '#faf5ff', text: '#333' },
    minimal: { primary: '#000', bg: '#fff', text: '#666' },
    editorial: { primary: '#1a1a2e', bg: '#fff', text: '#333' },
  }
  const theme = themeColors[template.theme] || themeColors.minimal
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; margin: 0; }
        .section { margin: 0; padding: 40px 20px; }
        .section-title { display: none; } /* Hide technical labels in preview */
        .section-content { max-width: 1280px; margin: 0 auto; }
        
        /* Announcement bar */
        .announcement-text { background: ${theme.primary}; color: #fff; padding: 8px 16px; text-align: center; font-size: 14px; }
        
        /* Header */
        .section-brand { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 16px; }
        .section-links { display: flex; gap: 24px; font-size: 14px; color: ${theme.text}; }
        
        /* Hero */
        .section-headline { font-size: 56px; font-weight: 800; line-height: 1.1; margin-bottom: 16px; letter-spacing: -1px; }
        .section-subheadline { font-size: 20px; color: #666; margin-bottom: 24px; max-width: 600px; }
        .section-cta { background: ${theme.primary}; color: #fff; padding: 16px 32px; font-size: 16px; font-weight: 600; border: none; cursor: pointer; border-radius: 4px; }
        
        /* Items strip */
        .section-items { display: flex; gap: 32px; justify-content: center; padding: 20px 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; }
        .item { font-size: 14px; color: ${theme.text}; font-weight: 500; }
        
        /* Categories */
        .section-categories { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 20px; }
        .category { background: #f5f5f5; padding: 24px; text-align: center; font-weight: 600; border-radius: 8px; }
        
        /* Product grid */
        .product-limit { font-size: 14px; color: #666; margin-top: 12px; }
        
        /* Background image hint */
        .section-bg-hint { margin-top: 16px; padding: 12px; background: #f0f0f0; border-radius: 4px; font-size: 12px; color: #999; }
        
        /* Responsive */
        @media (max-width: 768px) {
          .section-headline { font-size: 36px; }
          .section-links { flex-direction: column; gap: 12px; }
          .section-items { flex-wrap: wrap; }
        }
      </style>
    </head>
    <body>
      <div class="template-container">
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
