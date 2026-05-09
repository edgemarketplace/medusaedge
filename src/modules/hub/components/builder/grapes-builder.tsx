"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getTemplate } from "@/templates/registry"
import { composePage, renderPage } from "@/composer"
import { registerBlocks } from "@/lib/grapes/register-blocks"
import { createRoot } from "react-dom/client"

export default function GrapesBuilder({ templateId }: { templateId?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<any>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [message, setMessage] = useState('Loading GrapesJS...')
  const [iframeInfo, setIframeInfo] = useState<{
    found: boolean,
    visible: boolean,
    dimensions: string
  }>({
    found: false,
    visible: false,
    dimensions: ''
  })

  useEffect(() => {
    let destroyed = false
    let root: any = null

    async function init() {
      try {
        setStatus('loading')
        setMessage('Importing GrapesJS...')
        
        const grapesjs = (await import("grapesjs")).default
        
        if (destroyed) return
        
        setMessage('Creating editor...')
        
        const editor = grapesjs.init({
          container: containerRef.current!,
          height: '100%',
          width: '100%',
          storageManager: false,
          fromElement: false,
          blockManager: {
            appendTo: '.block-panel',
          },
          canvas: {
            head: `<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;">`,
            styles: [
              'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
              'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
            ],
          },
        })

        // Register all 30 pre-approved blocks
        setMessage('Registering blocks...')
        registerBlocks(editor)

        await new Promise(r => setTimeout(r, 500))

        // Load template if provided
        setMessage('Loading template...')
        let initialHtml = ''
        
        if (templateId) {
          try {
            const template = getTemplate(templateId)
            if (template) {
              const composition = composePage(template)
              
              // Render React elements to HTML using ReactDOM
              const elements = renderPage(composition)
              
              // Create a temporary div to render React elements
              const tempDiv = document.createElement('div')
              
              // Use ReactDOM to render
              const reactRoot = createRoot(tempDiv)
              reactRoot.render(
                <div className="template-composition">
                  {elements.map((el, idx) => (
                    <div key={idx} className="section-wrapper mb-4">
                      {el}
                    </div>
                  ))}
                </div>
              )
              
              // Wait a bit for rendering to complete
              await new Promise(r => setTimeout(r, 100))
              
              // Extract HTML from the temp div
              initialHtml = tempDiv.innerHTML
              
              // Cleanup
              reactRoot.unmount()
              
              setMessage(`Loaded: ${template.name} (${composition.sections?.length || 0} sections)`)
            }
          } catch (e: any) {
            console.warn('[GrapesBuilder] Template load failed:', e)
            setMessage('Template load failed, using empty canvas')
          }
        }

        if (!initialHtml) {
          initialHtml = `
            <div style="padding: 40px; font-family: sans-serif;">
              <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 16px; color: black;">Start Editing</h1>
              <p style="color: #666; margin-bottom: 24px;">Drag blocks from the left panel to start building.</p>
            </div>
          `
        }

        setMessage('Adding content to editor...')
        
        // Set the HTML content without CSP meta tag (CSP should be in iframe head, not body)
        editor.setComponents(initialHtml)
        
        // Check iframe visibility
        await new Promise(r => setTimeout(r, 1000))
        
        const iframe = containerRef.current?.querySelector('iframe') as HTMLIFrameElement
        if (iframe) {
          const rect = iframe.getBoundingClientRect()
          const style = window.getComputedStyle(iframe)
          const info = {
            found: true,
            visible: style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0,
            dimensions: `${rect.width}x${rect.height} (display: ${style.display}, visibility: ${style.visibility})`
          }
          setIframeInfo(info)
          
          // Force iframe visibility and size
          iframe.style.width = '100%'
          iframe.style.height = '100%'
          iframe.style.display = 'block'
          iframe.style.visibility = 'visible'
          iframe.style.position = 'absolute'
          iframe.style.top = '0'
          iframe.style.left = '0'
        }
        
        editorRef.current = editor
        setStatus('ready')
        setMessage('Editor ready!')

      } catch (err: any) {
        console.error('[GrapesBuilder] Error:', err)
        setStatus('error')
        setMessage(err.message || 'Failed to load')
      }
    }

    init()

    return () => {
      destroyed = true
      if (editorRef.current) {
        try {
          editorRef.current.destroy()
        } catch (e) {}
      }
    }
  }, [templateId])

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar with blocks */}
      <aside className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <Link href="/builder-v2">
            <ArrowLeft className="h-4 w-4 text-slate-400 hover:text-white cursor-pointer" />
          </Link>
        </div>
        <div className="p-4 space-y-2">
          <p className="text-xs text-slate-400">Status: {status}</p>
          <p className="text-xs text-slate-500">{message}</p>
          {templateId && (
            <p className="text-xs text-slate-400">Template: {templateId}</p>
          )}
          
          <div className="mt-4 p-2 bg-slate-900 rounded">
            <p className="text-[10px] text-slate-500 font-bold mb-1">IFRAME DEBUG</p>
            <p className="text-[10px] text-slate-400">Found: {iframeInfo.found ? 'YES' : 'NO'}</p>
            <p className="text-[10px] text-slate-400">Visible: {iframeInfo.visible ? 'YES' : 'NO'}</p>
            <p className="text-[10px] text-slate-400 break-all">{iframeInfo.dimensions}</p>
          </div>
        </div>
        
        {/* Block panel */}
        <div className="block-panel flex-1 overflow-y-auto p-4 border-t border-slate-800">
          {/* Blocks will be injected here by GrapesJS block manager */}
        </div>
      </aside>

      {/* Canvas area */}
      <div className="flex-1 relative bg-gray-100" style={{ minHeight: '500px' }}>
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-100">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600">{message}</p>
            </div>
          </div>
        )}
        
        {status === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {message}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-slate-800 text-white rounded text-sm"
              >
                Reload
              </button>
            </div>
          </div>
        )}
        
        {/* GrapesJS mounts here */}
        <div ref={containerRef} className="absolute inset-0" style={{ zIndex: 10 }} />
      </div>
    </div>
  )
}
