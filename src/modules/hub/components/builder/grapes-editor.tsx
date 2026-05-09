"use client"

import { useEffect, useRef } from "react"
import grapesjs from "grapesjs"
import "grapesjs/dist/css/grapes.min.css"
import { composePage } from "@/composer"
import { getTemplate } from "@/templates/registry"

interface GrapesEditorProps {
  templateId: string
}

export function GrapesEditor({ templateId }: GrapesEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const editorInstance = useRef<grapesjs.Editor | null>(null)

  useEffect(() => {
    const initEditor = async () => {
      if (!editorRef.current) return

      // Get template from updated 20-template registry
      const template = getTemplate(templateId)
      if (!template) {
        console.error(`Template ${templateId} not found in registry`)
        return
      }

      // Generate template HTML using composer (pass template object)
      const html = await composePage(template)

      // Clean up existing editor instance
      if (editorInstance.current) {
        editorInstance.current.destroy()
      }

      // Initialize GrapesJS with template HTML
      editorInstance.current = grapesjs.init({
        container: editorRef.current,
        components: html,
        style: "",
        fromElement: true,
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
