"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Zap, Sparkles, Clock, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"

export default function StartLaunchPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <Link href="/" className="text-sm font-semibold text-blue-200 hover:text-white">
          ← Back to Edge Marketplace Hub
        </Link>

        <div className="mt-20 text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-300">Start Your Launch</p>
          <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Your 15-minute marketplace launch starts here
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Tell us about your business, choose your growth style, design your site, add your products, and go live — all without writing code.
          </p>

          {/* Timeline visual */}
          <div className="mt-16 mx-auto max-w-4xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-12">
              {[
                { label: "Business Info", icon: "📋", step: 1 },
                { label: "Growth Style", icon: "🚀", step: 2 },
                { label: "Design & Products", icon: "🎨", step: 3 },
                { label: "Go Live", icon: "✨", step: 4 },
              ].map((item, idx) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-blue-600/20 border-2 border-blue-400 flex items-center justify-center text-2xl mb-3">
                    {item.icon}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider">{item.label}</p>
                  {idx < 3 && <div className="hidden sm:block absolute ml-[calc(50%+2rem)] h-1 w-12 bg-slate-700 mt-8" />}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => router.push("/start/decision")}
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-blue-500/50"
            >
              🚀 Choose How You Grow
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-8 py-4 text-base font-bold text-white transition hover:bg-white/5"
            >
              Skip to Builder <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Benefits Grid */}
          <div className="mt-24 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Clock,
                title: "15 Minutes to Launch",
                desc: "Real. Structured intake → design → products → payment → live.",
              },
              {
                icon: Sparkles,
                title: "No Code Required",
                desc: "AI-powered catalog builder and drag-and-drop website designer.",
              },
              {
                icon: DollarSign,
                title: "Start Selling Today",
                desc: "Your marketplace is globally distributed, secure, and ready to scale.",
              },
            ].map((benefit, idx) => {
              const IconComponent = benefit.icon
              return (
                <div key={benefit.title} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                  <IconComponent className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-bold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{benefit.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
