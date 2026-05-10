export const dynamic = 'force-dynamic'

import { getDesignTokens } from '@/lib/builder-v3/milano-v3-design-tokens'

export default function TemplatePage() {
  const theme = getDesignTokens('saas-light')
  
  return (
    <main className="min-h-screen" style={{ backgroundColor: theme?.colors?.background || '#ffffff' }}>
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <button onClick={() => window.location.href = '/builder-v3'} className="text-sm font-semibold text-blue-600">
          ← Back to Templates
        </button>
        <span className="text-sm font-bold">Template: Knowledge Hub</span>
        <span className="text-sm text-gray-500">Saas Light</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: theme?.fonts?.display || 'serif' }}>
          Documentation & Guides
        </h1>
        <p className="text-xl mb-8 max-w-2xl" style={{ fontFamily: theme?.fonts?.grotesk || 'sans-serif' }}>
          Everything you need to get started and succeed.
        </p>
        <button 
          onClick={() => window.location.href = '/builder-v3/editor?template=knowledge-hub'}
          className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition"
        >
          Edit Template
        </button>
      </div>
    </main>
  )
}
