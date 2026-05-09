"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GrapesBuilder({ templateId }: { templateId?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<any>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [message, setMessage] = useState('Loading GrapesJS...')

  useEffect(() => {
    let destroyed = false

    async function init() {
      try {
        setStatus('loading')
        setMessage('Importing GrapesJS...')
        
        // Dynamic import
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

        // Wait a tick for iframe to mount
        await new Promise(r => setTimeout(r, 500))

        setMessage('Adding content...')
        
        // SUPER SIMPLE: Just set plain HTML, no tricks
        const html = `
          <div style="padding: 40px; font-family: sans-serif;">
            <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 16px;">Test Header</h1>
            <p style="color: #666; margin-bottom: 24px;">This is a test paragraph.</p>
            <button style="background: black; color: white; padding: 12px 24px; border: none; border-radius: 6px;">
              Test Button
            </button>
          </div>
        `
        
        editor.setComponents(html)
        
        console.log('[GrapesBuilder] Components set. Checking canvas...')
        
        // Check if iframe exists
        const iframe = containerRef.current?.querySelector('iframe')
        console.log('[GrapesBuilder] Iframe found:', iframe)
        console.log('[GrapesBuilder] Iframe srcdoc length:', iframe?.contentDocument?.documentElement?.innerHTML?.length)
        
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
          console.log('[GrapesBuilder] Editor destroyed')
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
        <div className="p-4">
          <p className="text-xs text-slate-400">Status: {status}</p>
          <p className="text-xs text-slate-500 mt-2">{message}</p>
          {templateId && (
            <p className="text-xs text-slate-400 mt-4">Template: {templateId}</p>
          )}
        </div>
      </aside>

      {/* Canvas area */}
      <div className="flex-1 relative bg-gray-100">
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center">
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
        <div ref={containerRef} className="absolute inset-0" />
        
        {/* Debug: Show what's in the container */}
        {status === 'ready' && (
          <div className="absolute bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded max-w-md">
            <p>Container children: {containerRef.current?.children.length || 0}</p>
            <p>Has iframe: {containerRef.current?.querySelector('iframe') ? 'YES' : 'NO'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
