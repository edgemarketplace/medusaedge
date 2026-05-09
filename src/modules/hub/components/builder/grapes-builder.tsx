"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import dynamic from 'next/dynamic'
import { registerBlocks } from "@/lib/grapes/register-blocks"
import { getTemplate } from "@/templates/registry"
import { Save, Eye, Rocket, ArrowLeft, Loader2, Plus, Trash2, MoveUp, MoveDown, Monitor, Smartphone } from "lucide-react"
import Link from "next/link"
import clsx from "clsx"

// Dynamic import GrapesJS to avoid SSR issues
const GrapesJS = dynamic(
  () => import("grapesjs").then(mod => {
    console.log('GrapesJS module loaded')
    return { default: mod.default }
  }),
  { 
    ssr: false,
    loading: () => <div className="h-full flex items-center justify-center bg-gray-100"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
  }
)

export interface GrapesBuilderProps {
  projectId?: string
  templateId?: string
  initialProject?: object
  onSaveDraft?: (projectJson: object) => Promise<void>
  onDeploy?: (projectJson: object) => Promise<void>
}

export default function GrapesBuilder({ projectId, templateId, initialProject, onSaveDraft, onDeploy }: GrapesBuilderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<any>(null)

  const [isReady, setIsReady] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deploying, setDeploying] = useState(false)
  const [validation, setValidation] = useState({ hasHeader: false, hasHero: false, hasFooter: false })
  const [device, setDevice] = useState<"Desktop" | "Mobile">("Desktop")
  const [openCat, setOpenCat] = useState<string | null>("Header")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let destroyed = false

    async function init() {
      try {
        console.log('[GrapesBuilder] Starting initialization...')
        
        if (!containerRef.current) {
          throw new Error('Container ref is not available')
        }

        const grapesjs = (await import("grapesjs")).default
        if (destroyed) return

        console.log('[GrapesBuilder] GrapesJS loaded, creating editor...')

        const editor = grapesjs.init({
          container: containerRef.current,
          fromElement: false,
          height: '100%',
          width: '100%',
          storageManager: false,
          assetManager: false,
          panels: { defaults: [] },
          layerManager: { showWrapper: false, showDevices: false },
          selectorManager: { componentFirst: true },
          deviceManager: {
            devices: [
              { name: 'Desktop', width: '100%' },
              { name: 'Mobile', width: '375px' },
            ],
          },
          canvas: {
            styles: [
              'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
            ],
          },
          blockManager: { custom: true },
        })

        console.log('[GrapesBuilder] Editor created successfully')

        editor.Panels.removePanel('options')
        editor.Panels.removePanel('views')

        registerBlocks(editor)

        // Track selection
        editor.on('component:selected', (c: any) => {
          setSelectedId(c?.getId?.() || null)
        })
        editor.on('component:deselected', () => setSelectedId(null))

        // Validation
        const validate = () => {
          const html = editor.getHtml() || ''
          setValidation({
            hasHeader: html.includes('<header') || html.includes('data-gjs-type="header"'),
            hasHero: html.includes('data-gjs-type="hero"'),
            hasFooter: html.includes('<footer') || html.includes('data-gjs-type="footer"'),
          })
        }
        editor.on('component:add component:remove component:update', validate)
        validate()

        // Load template if provided
        if (templateId) {
          try {
            const tpl = getTemplate(templateId)
            if (tpl) {
              console.log('[GrapesBuilder] Loading template:', tpl.name)
              const html = tpl.composition.sections.map((s: any) => {
                const props = s.props || {}
                return `
                  <div data-gjs-type="section" class="my-4 p-6 border border-gray-200 rounded-lg bg-white">
                    <div class="text-sm font-bold text-gray-400 mb-2">${s.sectionId}</div>
                    ${props.headline ? `<h2 class="text-3xl font-bold mb-3">${props.headline}</h2>` : ''}
                    ${props.subheadline ? `<p class="text-gray-600 mb-4">${props.subheadline}</p>` : ''}
                    ${props.brand ? `<div class="text-2xl font-bold mb-3">${props.brand}</div>` : ''}
                    ${props.text ? `<p class="text-gray-700">${props.text}</p>` : ''}
                    ${props.cta ? `<button class="mt-4 px-6 py-2 bg-black text-white rounded">${props.cta}</button>` : ''}
                  </div>
                `
              }).join('\n')
              editor.setComponents(html)
              console.log('[GrapesBuilder] Template loaded successfully')
            }
          } catch (e: any) {
            console.error('[GrapesBuilder] Failed to load template:', e)
          }
        }

        editorRef.current = editor
        setIsReady(true)
        setError(null)

        // Keyboard shortcuts
        const onKey = (e: KeyboardEvent) => {
          if ((e.key === 'Delete' || e.key === 'Backspace') && editor.getSelected()) {
            if (!editor.getEditing()) {
              editor.runCommand('core:component-delete')
            }
          }
        }
        window.addEventListener('keydown', onKey)

        return () => {
          window.removeEventListener('keydown', onKey)
        }

      } catch (err: any) {
        console.error('[GrapesBuilder] Initialization failed:', err)
        setError(err.message || 'Failed to initialize editor')
        setIsReady(false)
      }
    }

    init()

    return () => {
      destroyed = true
      if (editorRef.current) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [templateId])

  // Device toggle
  useEffect(() => {
    if (!editorRef.current) return
    editorRef.current.setDevice(device)
  }, [device])

  // Actions
  const handleAddBlock = useCallback((block: any) => {
    const editor = editorRef.current
    if (!editor) return
    const added = editor.addComponents(block.content)
    if (added && added[0]) {
      editor.select(added[0])
    }
  }, [])

  const handleDeleteSelected = useCallback(() => {
    const editor = editorRef.current
    if (!editor) return
    const sel = editor.getSelected()
    if (sel) editor.runCommand('core:component-delete')
  }, [])

  const handleMoveUp = useCallback(() => {
    const editor = editorRef.current
    if (!editor) return
    const sel = editor.getSelected()
    if (!sel) return
    const prev = (sel as any).prevSibling()
    if (!prev) return
    (sel as any).move(prev, { at: -1 })
  }, [])

  const handleMoveDown = useCallback(() => {
    const editor = editorRef.current
    if (!editor) return
    const sel = editor.getSelected()
    if (!sel) return
    const next = (sel as any).nextSibling()
    if (!next) return
    (sel as any).move(next, { at: 0 })
  }, [])

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
      {/* Left Sidebar */}
      <aside className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 select-none">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 text-slate-400 hover:text-white transition" />
            </Link>
            <h2 className="font-bold text-white text-sm tracking-tight">Section Builder</h2>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            {projectId?.slice(0, 12) || templateId?.slice(0, 12)}…
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-xs text-slate-400 mb-4">30 Blocks Available</p>
          {/* Simplified for now - just show that blocks exist */}
          <div className="space-y-2">
            {['Header', 'Hero', 'Products', 'Text', 'Image/Video', 'Footer'].map((cat) => (
              <div key={cat} className="border border-slate-800 rounded-lg p-3">
                <p className="text-xs font-bold text-slate-300">{cat}</p>
                <p className="text-[10px] text-slate-500">5 variations each</p>
              </div>
            ))}
          </div>
        </div>

        {selectedId && (
          <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/50">
            <p className="text-[10px] text-slate-500 mb-2">Selected Section</p>
            <div className="flex items-center gap-2">
              <button onClick={handleMoveUp} className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white">
                <MoveUp className="w-3.5 h-3.5" />
              </button>
              <button onClick={handleMoveDown} className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white">
                <MoveDown className="w-3.5 h-3.5" />
              </button>
              <div className="flex-1" />
              <button onClick={handleDeleteSelected} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-red-900/20 text-red-400 text-xs font-medium hover:bg-red-900/40">
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <header className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setDevice("Desktop")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition ${
                  device === "Desktop" ? "bg-slate-700 text-white" : "text-slate-400"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button
                onClick={() => setDevice("Mobile")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition ${
                  device === "Mobile" ? "bg-slate-700 text-white" : "text-slate-400"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={async () => {
                if (!editorRef.current || !onSaveDraft) return
                setSaving(true)
                try {
                  const json = editorRef.current.getProjectData()
                  await onSaveDraft(json)
                } finally {
                  setSaving(false)
                }
              }}
              disabled={saving || !isReady}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-medium hover:bg-slate-700 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
              Save Draft
            </button>
            <button
              onClick={() => {
                if (!editorRef.current) return
                const html = editorRef.current.getHtml()
                const css = editorRef.current.getCss()
                const blob = new Blob([`<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`], { type: 'text/html' })
                const url = URL.createObjectURL(blob)
                window.open(url, '_blank')
              }}
              disabled={!isReady}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-medium hover:bg-slate-700 disabled:opacity-50"
            >
              <Eye className="h-3 w-3" />
              Preview
            </button>
            <button
              onClick={async () => {
                if (!editorRef.current || !onDeploy) return
                if (!validation.hasHeader || !validation.hasHero || !validation.hasFooter) {
                  alert("Please add at least one Header, one Hero, and one Footer before deploying.")
                  return
                }
                setDeploying(true)
                try {
                  const json = editorRef.current.getProjectData()
                  await onDeploy(json)
                } finally {
                  setDeploying(false)
                }
              }}
              disabled={deploying || !isReady}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
                validation.hasHeader && validation.hasHero && validation.hasFooter
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
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
