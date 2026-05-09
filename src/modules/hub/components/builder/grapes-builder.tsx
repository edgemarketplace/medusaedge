"use client"

import { useEffect, useRef, useState, useCallback } from "react"
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
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  const addDebug = (msg: string) => {
    console.log(`[GrapesBuilder] ${msg}`)
    setDebugInfo(prev => [...prev.slice(-10), msg])
  }

  useEffect(() => {
    let destroyed = false

    async function init() {
      try {
        addDebug('Starting initialization...')
        
        if (!containerRef.current) {
          throw new Error('Container ref is null!')
        }
        addDebug(`Container ref found: ${containerRef.current.tagName} #${containerRef.current.id || '(no id)'}`)
        addDebug(`Container dimensions: ${containerRef.current.offsetWidth}x${containerRef.current.offsetHeight}`)

        addDebug('Importing grapesjs module...')
        let grapesjs
        try {
          const module = await import("grapesjs")
          grapesjs = module.default || module
          addDebug(`GrapesJS module loaded: ${typeof grapesjs}`)
        } catch (importErr: any) {
          throw new Error(`Failed to import GrapesJS: ${importErr.message}`)
        }

        if (destroyed) {
          addDebug('Component destroyed, aborting')
          return
        }

        addDebug('Creating GrapesJS editor...')
        
        const editor = grapesjs.init({
          container: containerRef.current,
          fromElement: false,
          height: '100%',
          width: '100%',
          storageManager: false,
          assetManager: false,
          panels: { defaults: [] },
          layerManager: { showWrapper: false, showDevices: false },
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

        addDebug('GrapesJS editor created successfully')

        try {
          editor.Panels.removePanel('options')
          editor.Panels.removePanel('views')
          addDebug('Panels removed')
        } catch (e: any) {
          addDebug(`Warning: Failed to remove panels: ${e.message}`)
        }

        // Basic blocks (simplified for testing)
        try {
          const blockManager = editor.BlockManager
          blockManager.add('test-block', {
            label: 'Test Block',
            content: '<div class="p-4 bg-blue-100">Test Block Content</div>',
            category: 'Test',
          })
          addDebug('Test block added')
        } catch (e: any) {
          addDebug(`Warning: Failed to add blocks: ${e.message}`)
        }

        // Track selection
        editor.on('component:selected', (c: any) => {
          setSelectedId(c?.getId?.() || null)
        })
        editor.on('component:deselected', () => setSelectedId(null))
        addDebug('Selection tracking set up')

        // Validation
        const validate = () => {
          try {
            const html = editor.getHtml() || ''
            setValidation({
              hasHeader: html.includes('<header') || html.includes('data-gjs-type="header"'),
              hasHero: html.includes('data-gjs-type="hero"'),
              hasFooter: html.includes('<footer') || html.includes('data-gjs-type="footer"'),
            })
          } catch (e: any) {
            addDebug(`Validation error: ${e.message}`)
          }
        }
        editor.on('component:add component:remove component:update', validate)
        validate()

        // Load template if provided
        if (templateId) {
          try {
            addDebug(`Loading template: ${templateId}`)
            const tpl = getTemplate(templateId)
            if (tpl) {
              addDebug(`Template found: ${tpl.name}`)
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
              addDebug(`Setting ${tpl.composition.sections.length} sections as HTML`)
              editor.setComponents(html)
              addDebug('Template loaded into editor')
            } else {
              addDebug(`Template not found: ${templateId}`)
            }
          } catch (e: any) {
            addDebug(`Failed to load template: ${e.message}`)
          }
        }

        editorRef.current = editor
        setIsReady(true)
        setError(null)
        addDebug('Initialization complete!')

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
        const msg = `Initialization failed: ${err.message}`
        addDebug(msg)
        console.error('[GrapesBuilder] Full error:', err)
        setError(err.message || 'Failed to initialize editor')
        setIsReady(false)
      }
    }

    init()

    return () => {
      destroyed = true
      if (editorRef.current) {
        try {
          editorRef.current.destroy()
          addDebug('Editor destroyed')
        } catch (e: any) {
          addDebug(`Error destroying editor: ${e.message}`)
        }
        editorRef.current = null
      }
    }
  }, [templateId])

  // Device toggle
  useEffect(() => {
    if (!editorRef.current) return
    try {
      editorRef.current.setDevice(device)
    } catch (e: any) {
      console.error('Failed to set device:', e)
    }
  }, [device])

  if (error) {
    return (
      <div className="h-screen flex bg-slate-950">
        <div className="w-80 bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto">
          <h2 className="text-lg font-bold text-red-400 mb-4">Editor Failed to Load</h2>
          <p className="text-sm text-slate-400 mb-6">{error}</p>
          
          <h3 className="text-sm font-bold text-slate-300 mb-2">Debug Log:</h3>
          <div className="space-y-1">
            {debugInfo.map((msg, idx) => (
              <p key={idx} className="text-xs text-slate-500 font-mono">{msg}</p>
            ))}
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
          >
            Reload Page
          </button>
        </div>
        
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <p className="text-gray-400">Editor not loaded</p>
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
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!isReady ? (
            <div className="flex items-center gap-2 text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-xs">Loading editor...</span>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-300 mb-2">Blocks Available</p>
              <div className="border border-slate-800 rounded-lg p-3">
                <p className="text-xs text-slate-400">Test Block</p>
                <p className="text-[10px] text-slate-500">Click to add</p>
              </div>
            </div>
          )}
        </div>

        {selectedId && (
          <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/50">
            <p className="text-[10px] text-slate-500 mb-2">Selected: {selectedId}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => {
                const editor = editorRef.current
                if (!editor) return
                const sel = editor.getSelected()
                if (!sel) return
                const prev = sel.prevSibling()
                if (!prev) return
                sel.move(prev, { at: -1 })
              }} className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white">
                <MoveUp className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => {
                const editor = editorRef.current
                if (!editor) return
                const sel = editor.getSelected()
                if (!sel) return
                const next = sel.nextSibling()
                if (!next) return
                sel.move(next, { at: 0 })
              }} className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white">
                <MoveDown className="w-3.5 h-3.5" />
              </button>
              <div className="flex-1" />
              <button onClick={() => {
                const editor = editorRef.current
                if (!editor) return
                const sel = editor.getSelected()
                if (sel) editor.runCommand('core:component-delete')
              }} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-red-900/20 text-red-400 text-xs font-medium hover:bg-red-900/40">
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-slate-800 space-y-2">
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Required sections</p>
          {[
            { key: 'hasHeader', label: 'Header' },
            { key: 'hasHero', label: 'Hero' },
            { key: 'hasFooter', label: 'Footer' },
          ].map((req) => (
            <div key={req.key} className="flex items-center gap-2">
              <div className={clsx(
                "w-2 h-2 rounded-full",
                validation[req.key as keyof typeof validation] ? "bg-emerald-500" : "bg-red-400"
              )} />
              <span className={clsx(
                "text-xs",
                validation[req.key as keyof typeof validation] ? "text-emerald-400" : "text-red-400"
              )}>
                {req.label}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Toolbar */}
        <header className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-5">
          <div className="flex items-center gap-4">
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
              <div className="text-center">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
                <p className="text-sm text-gray-600">Initializing GrapesJS Editor...</p>
                <div className="mt-4 text-left max-w-md">
                  {debugInfo.map((msg, idx) => (
                    <p key={idx} className="text-xs text-gray-500 font-mono">{msg}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={containerRef} className="absolute inset-0" />
        </div>
      </div>
    </div>
  )
}
