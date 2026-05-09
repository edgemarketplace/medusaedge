"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import type grapesjs from "grapesjs"
import { registerBlocks } from "@/lib/grapes/register-blocks"
import { allBlocks, CATEGORIES } from "@/lib/grapes/blocks"
import type { BlockDef } from "@/lib/grapes/blocks"
import { getTemplate } from "@/templates/registry"
import { Save, Eye, Rocket, ArrowLeft, Loader2, Plus, Trash2, MoveUp, MoveDown, Monitor, Smartphone } from "lucide-react"
import Link from "next/link"
import clsx from "clsx"

export interface GrapesBuilderProps {
  projectId?: string
  templateId?: string
  initialProject?: object
  onSaveDraft?: (projectJson: object) => Promise<void>
  onDeploy?: (projectJson: object) => Promise<void>
}

const catMeta: Record<string, { icon: string; color: string }> = {
  Header: { icon: "⊤", color: "text-indigo-400" },
  Hero: { icon: "H", color: "text-rose-400" },
  Products: { icon: "Π", color: "text-emerald-400" },
  Text: { icon: "T", color: "text-amber-400" },
  "Image/Video": { icon: "▣", color: "text-sky-400" },
  Footer: { icon: "⊥", color: "text-slate-400" },
}

export default function GrapesBuilder({ projectId, templateId, initialProject, onSaveDraft, onDeploy }: GrapesBuilderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gjsRef = useRef<grapesjs.Editor | null>(null)

  const [isReady, setIsReady] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deploying, setDeploying] = useState(false)
  const [validation, setValidation] = useState({ hasHeader: false, hasHero: false, hasFooter: false })
  const [device, setDevice] = useState<"Desktop" | "Mobile">("Desktop")
  const [openCat, setOpenCat] = useState<string | null>("Header")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  /* ── init GrapesJS ── */
  useEffect(() => {
    let destroyed = false

    async function init() {
      try {
        console.log('Initializing GrapesJS...')
        const grapesjs = (await import("grapesjs")).default
        if (destroyed) return

        console.log('GrapesJS loaded, initializing editor...')
        const editor = grapesjs.init({
          container: containerRef.current!,
          fromElement: false,
          height: "100%",
          width: "100%",
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
              { name: "Desktop", width: "100%" },
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

        console.log('GrapesJS editor initialized successfully')
        editor.Panels.removePanel("options")
        editor.Panels.removePanel("views")

        // Wire up our blocks (they still register so traits/defaults are defined)
        registerBlocks(editor)

        // Track selected component
        editor.on("component:selected", (c: any) => {
          setSelectedId(c?.getId?.() || null)
        })
        editor.on("component:deselected", () => setSelectedId(null))

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
        if (templateId) {
          try {
            const tpl = getTemplate(templateId)
            if (tpl) {
              // Build HTML from template sections with actual content
              const html = tpl.composition.sections.map(s => {
                const props = s.props || {}
                const sectionHTML = `
                  <div data-gjs-type="section" class="my-4 p-6 border border-gray-200 rounded-lg bg-white">
                    <div class="text-sm font-bold text-gray-400 mb-2">${s.sectionId}</div>
                    ${props.headline ? `<h2 class="text-3xl font-bold mb-3">${props.headline}</h2>` : ''}
                    ${props.subheadline ? `<p class="text-gray-600 mb-4">${props.subheadline}</p>` : ''}
                    ${props.brand ? `<div class="text-2xl font-bold mb-3">${props.brand}</div>` : ''}
                    ${props.text ? `<p class="text-gray-700">${props.text}</p>` : ''}
                    ${props.cta ? `<button class="mt-4 px-6 py-2 bg-black text-white rounded">${props.cta}</button>` : ''}
                  </div>
                `
                return sectionHTML
              }).join('\n')
              editor.setComponents(html)
            }
          } catch (e: any) { 
            console.error('Failed to load template:', e)
          }
        } else if (initialProject) {
          editor.loadProjectData(initialProject as any)
        }

        gjsRef.current = editor
        setIsReady(true)
        setError(null)

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

      } catch (err: any) {
        console.error('Failed to initialize GrapesJS:', err)
        setError(err.message || 'Failed to load editor')
        setIsReady(false)
      }
    }

    init()

    return () => {
      destroyed = true
      if (gjsRef.current) {
        gjsRef.current.destroy()
        gjsRef.current = null
      }
    }
  }, [projectId, templateId])

  /* ── device toggle ── */
  useEffect(() => {
    if (!gjsRef.current) return
    gjsRef.current.setDevice(device)
  }, [device])

  /* ── actions ── */
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
    const blob = new Blob(
      [`<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`],
      { type: "text/html" }
    )
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

  // Show error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center max-w-md px-4">
          <h2 className="text-xl font-bold text-red-400 mb-4">Editor Failed to Load</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

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
          <span className="text-[10px] text-slate-500 font-mono">{projectId?.slice(0, 12) || templateId?.slice(0, 12)}…</span>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto">
          {grouped.map(({ cat, blocks }) => {
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
          })}
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
          </div>
        )}

        {/* Validation Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2.5">
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Required sections</p>
          {[
            { key: "hasHeader", label: "Header" },
            { key: "hasHero", label: "Hero" },
            { key: "hasFooter", label: "Footer" },
          ].map((req) => (
            <div key={req.key} className="flex items-center gap-2">
              <div
                className={clsx(
                  "w-2 h-2 rounded-full",
                  validation[req.key as keyof typeof validation] ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" : "bg-red-400"
                )}
              />
              <span
                className={clsx(
                  "text-xs",
                  validation[req.key as keyof typeof validation] ? "text-emerald-400" : "text-red-400"
                )}
              >
                {req.label}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main Editor Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Toolbar */}
        <header className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-5">
          <div className="flex items-center gap-4">
            {/* Device Toggle */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setDevice("Desktop")}
                className={clsx(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition",
                  device === "Desktop" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Monitor className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button
                onClick={() => setDevice("Mobile")}
                className={clsx(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition",
                  device === "Mobile" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSaveDraft}
              disabled={saving || !isReady}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-medium hover:bg-slate-700 disabled:opacity-50 transition"
            >
              {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
              Save Draft
            </button>
            <button
              onClick={handlePreview}
              disabled={!isReady}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-medium hover:bg-slate-700 disabled:opacity-50 transition"
            >
              <Eye className="h-3 w-3" />
              Preview
            </button>
            <button
              onClick={handleDeploy}
              disabled={deploying || !isReady}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition",
                validation.hasHeader && validation.hasHero && validation.hasFooter
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              )}
            >
              {deploying ? <Loader2 className="h-3 w-3 animate-spin" /> : <Rocket className="h-3 w-3" />}
              Submit for Deployment
            </button>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1 relative bg-gray-100 min-h-0">
          {!isReady && !error && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100">
              <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
            </div>
          )}
          <div ref={containerRef} className="absolute inset-0" />
        </div>
      </div>
    </div>
  )
}
