"use client"

import { useState } from "react"
import { 
  Sparkles, 
  Layout, 
  Send, 
  Monitor, 
  Smartphone, 
  RotateCcw, 
  Download, 
  History,
  MessageSquare,
  ArrowLeft,
  Loader2
} from "lucide-react"
import { Button, Input, Textarea } from "@medusajs/ui"
import Link from "next/link"
import DynamicRenderer, { StoreLayout } from "@/modules/hub/components/builder/dynamic-renderer"

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [layout, setLayout] = useState<StoreLayout | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")

  const generateLayout = async () => {
    if (!prompt) return
    setIsGenerating(true)
    
    // Simulate AI Latency
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simple Mock Logic to show variety
    let newLayout: StoreLayout;
    
    if (prompt.toLowerCase().includes("luxury") || prompt.toLowerCase().includes("premium")) {
      newLayout = {
        sections: [
          { type: "hero", headline: "Exquisite Elegance", subtext: "Curated for the most discerning collectors.", ctaText: "Discover the Collection", variant: "dark" },
          { type: "features", items: ["Handcrafted Quality", "Exclusive Access", "Global White-Glove Shipping"] },
          { type: "products", headline: "The Signature Edit", limit: 3 },
          { type: "cta", headline: "Join the Inner Circle", subtext: "Gain priority access to our most limited releases.", ctaText: "Apply for Membership", variant: "light" }
        ]
      }
    } else if (prompt.toLowerCase().includes("tech") || prompt.toLowerCase().includes("industrial")) {
      newLayout = {
        sections: [
          { type: "hero", headline: "Precision Engineered Solutions", subtext: "Powering the next generation of industrial innovation.", ctaText: "View Specifications", variant: "dark" },
          { type: "products", headline: "Core Components", limit: 4 },
          { type: "features", items: ["ISO Certified", "Edge Performance", "Bulk API Support"] },
          { type: "cta", headline: "Scale Your Infrastructure", subtext: "Custom quotes for high-volume enterprise operations.", ctaText: "Request Quote", variant: "accent" }
        ]
      }
    } else {
      newLayout = {
        sections: [
          { type: "hero", headline: "The Modern Standard", subtext: "Clean, fast, and designed for growth.", ctaText: "Shop Now", variant: "light" },
          { type: "products", headline: "Trending Now", limit: 4 },
          { type: "features", items: ["Fast Delivery", "24/7 Support", "Secure Check-out"] },
          { type: "cta", headline: "Ready to Start?", subtext: "Join our community of independent merchants.", ctaText: "Join Now", variant: "accent" }
        ]
      }
    }

    setLayout(newLayout)
    setHistory([prompt, ...history])
    setPrompt("")
    setIsGenerating(false)
  }

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden font-sans">
      {/* AI Assistant Sidebar */}
      <aside className="w-96 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                 <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-white font-bold tracking-tight">AI Studio</h1>
           </div>
           <Link href="/dashboard">
              <Button variant="secondary" className="h-8 px-2 bg-slate-800 border-none text-slate-400 hover:text-white">
                 <ArrowLeft className="h-4 w-4" />
              </Button>
           </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
           <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Assistant Prompt</label>
              <div className="relative group">
                 <Textarea 
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                   placeholder="Describe your ideal storefront (e.g. 'A minimalist luxury watch store with a dark theme')..."
                   className="min-h-[160px] bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-blue-600 rounded-2xl resize-none p-4"
                 />
                 <Button 
                   onClick={generateLayout}
                   disabled={!prompt || isGenerating}
                   className="absolute bottom-3 right-3 h-10 w-10 p-0 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 group-hover:scale-105 transition-all"
                 >
                   {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                 </Button>
              </div>
           </div>

           {history.length > 0 && (
             <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">History</label>
                <div className="space-y-3">
                   {history.map((item, i) => (
                     <div key={i} className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-xs text-slate-400 line-clamp-2 hover:border-slate-700 cursor-pointer transition-colors">
                        {item}
                     </div>
                   ))}
                </div>
             </div>
           )}

           <div className="bg-blue-600/10 border border-blue-600/20 rounded-2xl p-5">
              <h4 className="text-blue-400 text-xs font-bold mb-2 flex items-center gap-2">
                 <MessageSquare className="h-3 w-3" />
                 Pro Tip
              </h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                 You can ask the AI to "Change the hero to be more aggressive" or "Add a 3-column feature list about security."
              </p>
           </div>
        </div>

        <div className="p-6 border-t border-slate-800 flex gap-3">
           <Button variant="secondary" className="flex-1 bg-slate-900 border-slate-800 text-slate-400 font-bold text-xs rounded-xl h-12">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
           </Button>
           <Button className="flex-1 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded-xl h-12">
              <Download className="h-4 w-4 mr-2" />
              Publish
           </Button>
        </div>
      </aside>

      {/* Canvas Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950">
        {/* Canvas Toolbar */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8">
           <div className="flex items-center gap-6">
              <div className="flex bg-slate-900 p-1 rounded-xl">
                 <button 
                   onClick={() => setViewMode("desktop")}
                   className={`p-1.5 rounded-lg transition-all ${viewMode === 'desktop' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                 >
                   <Monitor className="h-4 w-4" />
                 </button>
                 <button 
                   onClick={() => setViewMode("mobile")}
                   className={`p-1.5 rounded-lg transition-all ${viewMode === 'mobile' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                 >
                   <Smartphone className="h-4 w-4" />
                 </button>
              </div>
              <div className="h-4 w-[1px] bg-slate-800" />
              <div className="flex items-center gap-2">
                 <Layout className="h-4 w-4 text-slate-500" />
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Storefront Canvas</span>
              </div>
           </div>
           
           <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span>Auto-saving...</span>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
           </div>
        </header>

        {/* Live Canvas */}
        <div className="flex-1 overflow-auto p-12 flex justify-center bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]">
           <div className={`bg-white shadow-2xl transition-all duration-700 ease-in-out origin-top ${viewMode === 'desktop' ? 'w-full max-w-5xl rounded-3xl' : 'w-96 rounded-[3rem] border-[12px] border-slate-900 h-[800px]'}`}>
              <div className="h-full overflow-y-auto hide-scrollbar rounded-[2rem]">
                 <DynamicRenderer layout={layout!} />
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}
