"use client"

export const dynamic = 'force-dynamic'

import { getDesignTokens } from '@/lib/builder-v3/milano-v3-design-tokens'
import { AI_MARKETPLACE_DASHBOARD } from '@/lib/builder-v3/template-registry'

export default function TemplatePage() {
  const theme = getDesignTokens('saas-light')
  
  return (
    <main className="min-h-screen" style={{ backgroundColor: theme?.colors?.background || '#ffffff' }}>
      {/* Header with back button and actions */}
      <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: theme?.colors?.border || '#e5e7eb' }}>
        <button 
          onClick={() => window.location.href = '/builder-v3'} 
          className="text-sm font-semibold hover:opacity-70 transition"
          style={{ color: theme?.colors?.text || '#000000' }}
        >
          ← Back to Templates
        </button>
        <div className="text-center">
          <span className="text-sm font-bold" style={{ color: theme?.colors?.text || '#000000' }}>
            {AI_MARKETPLACE_DASHBOARD.name}
          </span>
          <span className="text-sm ml-2" style={{ color: theme?.colors?.textMuted || '#6b7280' }}>
            {AI_MARKETPLACE_DASHBOARD.theme}
          </span>
        </div>
        <button 
          onClick={() => window.location.href = `/builder-v3/puck/ai-marketplace-dashboard`}
          className="px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition"
          style={{ 
            backgroundColor: theme?.colors?.brand || '#635BFF',
            color: '#ffffff'
          }}
        >
          Edit Template
        </button>
      </div>

      {/* Template Preview Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section Preview */}
        <div className="mb-16">
          <h1 
            className="text-6xl font-bold mb-4 leading-tight"
            style={{ 
              fontFamily: theme?.typography?.displayFont || 'serif',
              color: theme?.colors?.textPrimary || '#111827',
              letterSpacing: theme?.typography?.letterSpacing?.tight || '0'
            }}
          >
            {AI_MARKETPLACE_DASHBOARD.defaultData?.title || 'AI Agent Marketplace'}
          </h1>
          <p 
            className="text-xl mb-8 max-w-2xl"
            style={{ 
              fontFamily: theme?.typography?.uiFont || 'sans-serif',
              color: theme?.colors?.textSecondary || '#6b7280',
              letterSpacing: theme?.typography?.letterSpacing?.normal || '0'
            }}
          >
            {AI_MARKETPLACE_DASHBOARD.defaultData?.subtitle || 'Discover intelligent automation for your workflow'}
          </p>
          
          {/* Mock Agent Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="rounded-2xl p-6 hover:scale-105 transition"
                style={{ 
                  backgroundColor: theme?.colors?.surface || '#f9fafb',
                  border: `1px solid ${theme?.colors?.border || '#e5e7eb'}`
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl mb-4"
                  style={{ backgroundColor: theme?.colors?.brand || '#635BFF' }}
                />
                <h3 
                  className="font-bold mb-2"
                  style={{ 
                    fontFamily: theme?.typography?.uiFont || 'sans-serif',
                    color: theme?.colors?.textPrimary || '#111827'
                  }}
                >
                  AI Agent {i}
                </h3>
                <p 
                  className="text-sm"
                  style={{ 
                    fontFamily: theme?.typography?.uiFont || 'sans-serif',
                    color: theme?.colors?.textSecondary || '#6b7280'
                  }}
                >
                  Automate your workflow with intelligent agents
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Component List */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: theme?.colors?.border || '#e5e7eb' }}>
          <h2 
            className="text-sm font-semibold mb-4"
            style={{ 
              fontFamily: theme?.typography?.uiFont || 'sans-serif',
              color: theme?.colors?.textMuted || '#6b7280'
            }}
          >
            INCLUDED COMPONENTS
          </h2>
          <div className="flex flex-wrap gap-2">
            {AI_MARKETPLACE_DASHBOARD.components.map((comp) => (
              <span 
                key={comp}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${theme?.colors?.brand || '#635BFF'}15`,
                  color: theme?.colors?.brand || '#635BFF',
                  fontFamily: theme?.typography?.uiFont || 'sans-serif'
                }}
              >
                {comp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
