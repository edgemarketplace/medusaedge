"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GrapesBuilder({ templateId }: { templateId?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<any>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [message, setMessage] = useState('Loading GrapesJS...')
  const [iframeInfo, setIframeInfo] = useState<{found: boolean, visible: boolean, dimensions: string}>({
    found: false,
    visible: false,
    dimensions: ''
  })

  useEffect(() => {
    let destroyed = false

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
          blockManager: false,
          canvas: {
            styles: [
              'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
            ],
          },
        })

        await new Promise(r => setTimeout(r, 1000))

        setMessage('Adding content...')
        
        const html = `
          <div style="padding: 40px; font-family: sans-serif;">
            <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 16px; color: black;">Test Header</h1>
            <p style="color: #666; margin-bottom: 24px;">This is a test paragraph.</p>
            <button style="background: black; color: white; padding: 12px 24px; border: none; border-radius: 6px;">
              Test Button
            </button>
          </div>
        `
        
        editor.setComponents(html)
        
        // Check iframe after setting content
        await new Promise(r => setTimeout(r, 500))
        
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
          console.log('[GrapesBuilder] Iframe visibility check:', info)
          
          // Force iframe to be visible
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
  }, [])

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
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
