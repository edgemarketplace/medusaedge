"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import type grapesjs from "grapesjs"
import GrapesJSEditor from "@/GrapesJSEditor"
import { registerBlocks } from "@/lib/grapes/register-blocks"
import { allBlocks, CATEGORIES } from "@/lib/grapes/blocks"
import { ecommerceTemplates } from "@/lib/grapes/ecommerce-templates"
import type { BlockDef } from "@/lib/grapes/blocks"
import { Save, Eye, Rocket, ArrowLeft, Loader2, Plus, Trash2, MoveUp, MoveDown, Monitor, Smartphone, Image as ImageIcon, Code2 } from "lucide-react"
import Link from "next/link"
import clsx from "clsx"

export interface GrapesBuilderProps {
  projectId: string
  initialProject?: object
  onSaveDraft?: (projectJson: object) => Promise<void>
  onDeploy?: (projectJson: object) => Promise<void>
}

type SelectedMedia = {
  id: string
  kind: "image" | "video" | "iframe" | "embed"
  label: string
  value: string
  placeholder: string
} | null

const catMeta: Record<string, { icon: string; color: string }> = {
  Header: { icon: "⊤", color: "text-indigo-400" },
  Hero: { icon: "H", color: "text-rose-400" },
  Products: { icon: "Π", color: "text-emerald-400" },
  Text: { icon: "T", color: "text-amber-400" },
  "Image/Video": { icon: "▣", color: "text-sky-400" },
  Footer: { icon: "⊥", color: "text-slate-400" },
}

export default function GrapesBuilder({ projectId, initialProject, onSaveDraft, onDeploy }: GrapesBuilderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gjsRef = useRef<grapesjs.Editor | null>(null)

  const [isReady, setIsReady] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deploying, setDeploying] = useState(false)
  const [validation, setValidation] = useState({ hasHeader: false, hasHero: false, hasFooter: false })
  const [device, setDevice] = useState<"Desktop" | "Mobile">("Desktop")
  const [sidebarMode, setSidebarMode] = useState<"templates" | "blocks">("templates")
  const [openCat, setOpenCat] = useState<string | null>("Header")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia>(null)

  const readSelectedMedia = useCallback((component: any): SelectedMedia => {
    if (!component) return null
    const attrs = component.getAttributes?.() || {}
    const tagName = String(component.get?.("tagName") || "").toLowerCase()
    const kindAttr = attrs["data-builder-kind"]
    const kind = kindAttr || (tagName === "img" ? "image" : tagName === "iframe" ? "iframe" : tagName === "video" ? "video" : null)

    if (!kind) return null

    if (kind === "embed") {
      const html = component.components?.().map((child: any) => child.toHTML?.() || "").join("") || component.get?.("content") || ""
      return {
        id: component.getId?.() || component.cid,
        kind: "embed",
        label: "Embed HTML",
        value: html,
        placeholder: '<iframe src="https://calendly.com/your-link" class="w-full h-[640px]"></iframe>',
      }
    }

    const mediaKind = kind === "image" ? "image" : kind === "video" ? "video" : "iframe"
    return {
      id: component.getId?.() || component.cid,
      kind: mediaKind,
      label: mediaKind === "image" ? "Image URL" : "Video / iframe URL",
      value: attrs.src || "",
      placeholder: mediaKind === "image" ? "https://example.com/photo.jpg" : "https://www.youtube.com/embed/...",
    }
  }, [])

  const applySelectedMediaValue = useCallback(() => {
    const editor = gjsRef.current
    const selected = editor?.getSelected() as any
    if (!editor || !selected || !selectedMedia) return

    if (selectedMedia.kind === "embed") {
      selected.components(selectedMedia.value || '<p class="text-gray-500">Embed HTML goes here</p>')
    } else {
      selected.addAttributes({ src: selectedMedia.value })
    }

    selected.view?.render?.()
    editor.trigger("component:update", selected)
    editor.refresh()
  }, [selectedMedia])

  /* ── init GrapesJS ── */
  const [useV2, setUseV2] = useState(true)

  useEffect(() => {
    if (useV2) return; // Skip v1 init if v2 is active

    let destroyed = false

    async function init() {
      const grapesjs = (await import("grapesjs")).default
      if (destroyed) return

      const editor = grapesjs.init({
        container: containerRef.current!,
        fromElement: false,
        height: "100%",
        width: "auto",
        storageManager: false,
        assetManager: false,
        panels: { defaults: [] },
        layerManager: { showWrapper: false, showDevices: false },
        selectorManager: { componentFirst: true },
        styleManager: {
          sectors: [
            {
              name: "Typography",
              properties: [
                "font-size",
                "font-family",
                "color",
                "text-align",
                "line-height",
              ],
            },
            {
              name: "Spacing",
              properties: ["padding", "margin"],
            },
            {
              name: "Decorations",
              properties: ["background-color", "border-radius", "border"],
            },
          ],
        },
        traitManager: { disabled: true },
        deviceManager: {
          devices: [
            { name: "Desktop", width: "" },
            { name: "Mobile", width: "375px" },
          ],
        },
        canvas: {
          styles: [
            "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
          ],
        },
        blockManager: { custom: true },
      })

      editor.Panels.removePanel("options")
      editor.Panels.removePanel("views")

      // Wire up our blocks (they still register so traits/defaults are defined)
      registerBlocks(editor)

      // Track selected component
      editor.on("component:selected", (c: any) => {
        setSelectedId(c?.getId?.() || null)
        setSelectedMedia(readSelectedMedia(c))
      })
      editor.on("component:deselected", () => {
        setSelectedId(null)
        setSelectedMedia(null)
      })
      editor.on("component:update", (c: any) => {
        if (editor.getSelected() === c) setSelectedMedia(readSelectedMedia(c))
      })

      // Validation
      const validate = () => {
        const html = editor.getHtml() || ""
        setValidation({
          hasHeader: html.includes("<header") || html.includes("data-gjs-type=\"header\""),
          hasHero: html.includes("data-gjs-type=\"hero\""),
          hasFooter: html.includes("<footer") || html.includes("data-gjs-type=\"footer\""),
        })
      }
      editor.on("component:add component:remove component:update", validate)
      validate()

      // Load data
      if (initialProject) {
        editor.loadProjectData(initialProject as any)
      }

      gjsRef.current = editor
      setIsReady(true)

      // Keyboard delete shortcut
      const onKey = (e: KeyboardEvent) => {
        if ((e.key === "Delete" || e.key === "Backspace") && editor.getSelected()) {
          // Only delete if not actively editing text
          if (!editor.getEditing()) {
            editor.runCommand("core:component-delete")
          }
        }
      }
      window.addEventListener("keydown", onKey)

      return () => window.removeEventListener("keydown", onKey)
    }

    init()

    return () => {
      destroyed = true
      if (gjsRef.current) {
        gjsRef.current.destroy()
        gjsRef.current = null
      }
    }
  }, [projectId, readSelectedMedia, useV2, initialProject])

  if (useV2) {
    return (
      <GrapesJSEditor 
        templateHtml={initialProject ? "" : ""} // Map project data here
        onBack={() => setUseV2(false)}
        onSave={async (html, css) => {
           console.log("Saving V2 Blueprint", { html, css })
           setSaving(true)
           try {
             // Use existing draft handler
             if (onSaveDraft) await onSaveDraft({ html, css, type: 'v2-blueprint' })
           } finally {
             setSaving(false)
           }
        }}
      />
    )
  }

  /* ── device toggle ── */
  useEffect(() => {
    if (!gjsRef.current) return
    gjsRef.current.setDevice(device)
  }, [device])

  /* ── actions ── */

  const handleApplyTemplate = useCallback((templateId: string) => {
    const editor = gjsRef.current
    if (!editor) return
    const template = ecommerceTemplates.find((item) => item.id === templateId)
    if (!template) return

    const ok = window.confirm(
      `Start with ${template.name}? This replaces the current canvas. Save your draft first if you want to keep it.`
    )
    if (!ok) return

    editor.setComponents(template.content)
    editor.setStyle("")
    editor.select(null as any)
    setSelectedId(null)
    setSelectedMedia(null)
    editor.trigger("component:update")
    editor.refresh()
  }, [])

  const handleAddBlock = useCallback((block: BlockDef) => {
    const editor = gjsRef.current
    if (!editor) return

    const added = editor.addComponents(block.content as string)
    if (added && added[0]) {
      editor.select(added[0] as any)
      // Scroll canvas to bottom
      const canvasDoc = editor.Canvas.getDocument()
      if (canvasDoc) {
        canvasDoc.body.scrollTop = canvasDoc.body.scrollHeight
      }
    }
  }, [])

  const handleDeleteSelected = useCallback(() => {
    const editor = gjsRef.current
    if (!editor) return
    const sel = editor.getSelected()
    if (sel) editor.runCommand("core:component-delete")
  }, [])

  const handleMoveUp = useCallback(() => {
    const editor = gjsRef.current
    if (!editor) return
    const sel = editor.getSelected()
    if (!sel) return
    const prev = (sel as any).prevSibling()
    if (!prev) return
    (sel as any).move(prev, { at: -1 })
  }, [])

  const handleMoveDown = useCallback(() => {
    const editor = gjsRef.current
    if (!editor) return
    const sel = editor.getSelected()
    if (!sel) return
    const next = (sel as any).nextSibling()
    if (!next) return
    (sel as any).move(next, { at: 0 })
  }, [])

  const handleSaveDraft = useCallback(async () => {
    if (!gjsRef.current || !onSaveDraft) return
    setSaving(true)
    try {
      const json = gjsRef.current.getProjectData()
      await onSaveDraft(json)
    } finally {
      setSaving(false)
    }
  }, [onSaveDraft])

  const handlePreview = useCallback(() => {
    if (!gjsRef.current) return
    const html = gjsRef.current.getHtml()
    const css = gjsRef.current.getCss()
    const previewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Marketplace Preview</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
  <style>body{margin:0;background:#fff;} iframe{max-width:100%;} ${css}</style>
</head>
<body>${html}</body>
</html>`
    const blob = new Blob([previewHtml], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
  }, [])

  const handleDeploy = useCallback(async () => {
    if (!gjsRef.current || !onDeploy) return
    if (!validation.hasHeader || !validation.hasHero || !validation.hasFooter) {
      alert("Please add at least one Header, one Hero, and one Footer before deploying.")
      return
    }
    setDeploying(true)
    try {
      const json = gjsRef.current.getProjectData()
      await onDeploy(json)
    } finally {
      setDeploying(false)
    }
  }, [onDeploy, validation])

  const grouped = CATEGORIES.map((cat) => ({
    cat,
    blocks: allBlocks.filter((b) => b.category === cat.name),
  }))

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* ── Left Sidebar ── */}
      <aside className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 select-none">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 text-slate-400 hover:text-white transition" />
            </Link>
            <h2 className="font-bold text-white text-sm tracking-tight">Section Builder</h2>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">{projectId.slice(0, 12)}…</span>
        </div>

        {/* Templates / Blocks */}
        <div className="border-b border-slate-800 p-3">
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-900 p-1">
            <button
              data-testid="template-tab"
              onClick={() => setSidebarMode("templates")}
              className={clsx("rounded-lg px-3 py-2 text-xs font-bold transition", sidebarMode === "templates" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}
            >
              Templates
            </button>
            <button
              data-testid="blocks-tab"
              onClick={() => setSidebarMode("blocks")}
              className={clsx("rounded-lg px-3 py-2 text-xs font-bold transition", sidebarMode === "blocks" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}
            >
              Blocks
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sidebarMode === "templates" ? (
            <div className="space-y-3 p-3">
              <div className="rounded-xl border border-blue-500/30 bg-blue-950/30 p-3">
                <p className="text-xs font-black text-white">Start with Template</p>
                <p className="mt-1 text-[10px] leading-4 text-slate-400">Pick a starter layout below. Cards are compact and side-by-side for faster selection.</p>
              </div>

              <div className="grid grid-cols-2 gap-2" data-testid="template-grid-2col">
                {ecommerceTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleApplyTemplate(template.id)}
                    className="group h-[120px] rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-2 text-left transition hover:border-blue-500 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    title={`Use ${template.name}`}
                  >
                    <div className={clsx("mb-2 h-1.5 rounded-full bg-gradient-to-r", template.accent)} />
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-2 text-[11px] font-black leading-4 text-slate-100">{template.name}</p>
                      <Plus className="h-3.5 w-3.5 shrink-0 text-slate-500 group-hover:text-blue-300" />
                    </div>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-400">{template.description}</p>
                    <p className="mt-1 line-clamp-1 rounded-md bg-slate-950 px-1.5 py-1 text-[9px] leading-3 text-slate-500">Best for: {template.bestFor}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            grouped.map(({ cat, blocks }) => {
              const isOpen = openCat === cat.name
              const meta = catMeta[cat.name] || { icon: "■", color: "text-slate-400" }
              return (
                <div key={cat.name} className="border-b border-slate-800 last:border-b-0">
                  <button
                    onClick={() => setOpenCat(isOpen ? null : cat.name)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className={clsx("text-sm font-bold", meta.color)}>{meta.icon}</span>
                      <span className="text-xs font-medium text-slate-300">{cat.name}</span>
                      <span className="text-[10px] text-slate-600 bg-slate-900 px-1.5 py-0.5 rounded">
                        {blocks.length}
                      </span>
                    </div>
                    <span className={clsx("text-slate-500 text-xs transition-transform", isOpen ? "rotate-90" : "")}>
                      ▶
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-3 pb-3 grid grid-cols-1 gap-2">
                      {blocks.map((block) => (
                        <button
                          key={block.id}
                          onClick={() => handleAddBlock(block)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 hover:bg-slate-800 transition group text-left"
                        >
                          <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-slate-500 transition">
                            <Plus className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-200 truncate">{block.label}</p>
                            <p className="text-[10px] text-slate-500 truncate">{cat.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Selected controls */}
        {selectedId && (
          <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/50">
            <p className="text-[10px] text-slate-500 mb-2">Selected Section</p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleMoveUp}
                disabled={!selectedId}
                className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 transition"
                title="Move up"
              >
                <MoveUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleMoveDown}
                disabled={!selectedId}
                className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 transition"
                title="Move down"
              >
                <MoveDown className="w-3.5 h-3.5" />
              </button>
              <div className="flex-1" />
              <button
                onClick={handleDeleteSelected}
                disabled={!selectedId}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-red-900/20 text-red-400 text-xs font-medium hover:bg-red-900/40 transition"
                title="Delete section"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>

            {selectedMedia && (
              <div data-testid="media-editor-panel" className="mt-3 space-y-2 rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-slate-500">
                  {selectedMedia.kind === "image" ? <ImageIcon className="h-3 w-3" /> : <Code2 className="h-3 w-3" />}
                  {selectedMedia.label}
                </div>
                {selectedMedia.kind === "embed" ? (
                  <textarea
                    value={selectedMedia.value}
                    onChange={(event) => setSelectedMedia({ ...selectedMedia, value: event.target.value })}
                    placeholder={selectedMedia.placeholder}
                    className="h-24 w-full rounded border border-slate-700 bg-slate-900 px-2 py-2 font-mono text-[11px] text-slate-100 outline-none focus:border-blue-500"
                  />
                ) : (
                  <input
                    value={selectedMedia.value}
                    onChange={(event) => setSelectedMedia({ ...selectedMedia, value: event.target.value })}
                    placeholder={selectedMedia.placeholder}
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-2 text-[11px] text-slate-100 outline-none focus:border-blue-500"
                  />
                )}
                <button
                  onClick={applySelectedMediaValue}
                  className="w-full rounded bg-blue-600 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-blue-500 transition"
                >
                  Apply Changes
                </button>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* ── Canvas ── */}
      <main className="flex-1 relative bg-slate-100 flex flex-col">
        {/* Toolbar */}
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setDevice("Desktop")}
                className={clsx("p-1.5 rounded-md transition", device === "Desktop" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice("Mobile")}
                className={clsx("p-1.5 rounded-md transition", device === "Mobile" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <span className={clsx("flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider", validation.hasHeader ? "text-emerald-600" : "text-slate-400")}>
                <div className={clsx("w-1.5 h-1.5 rounded-full", validation.hasHeader ? "bg-emerald-500" : "bg-slate-300")} />
                Header
              </span>
              <span className={clsx("flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider", validation.hasHero ? "text-emerald-600" : "text-slate-400")}>
                <div className={clsx("w-1.5 h-1.5 rounded-full", validation.hasHero ? "bg-emerald-500" : "bg-slate-300")} />
                Hero
              </span>
              <span className={clsx("flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider", validation.hasFooter ? "text-emerald-600" : "text-slate-400")}>
                <div className={clsx("w-1.5 h-1.5 rounded-full", validation.hasFooter ? "bg-emerald-500" : "bg-slate-300")} />
                Footer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDraft}
              disabled={saving || !isReady}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Draft
            </button>
            <button
              onClick={handlePreview}
              disabled={!isReady}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition disabled:opacity-50"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              onClick={handleDeploy}
              disabled={deploying || !isReady}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {deploying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Rocket className="w-3.5 h-3.5" />}
              Submit for Deployment
            </button>
          </div>
        </div>

        {/* GrapesJS Canvas Container */}
        <div className="flex-1 relative overflow-hidden">
          <div ref={containerRef} className="h-full w-full" />
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Initializing Engine...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
