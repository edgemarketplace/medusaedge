"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Paintbrush, Wand2, LayoutTemplate, Sparkles, Loader2 } from "lucide-react"

function generateProjectId() {
  return "prj-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
}

export default function BuilderEntryPage() {
  const router = useRouter()
  const [starting, setStarting] = useState(false)

  function startNew() {
    setStarting(true)
    const id = generateProjectId()
    router.push(`/builder/${id}`)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8">
        <Link href="/" className="text-sm font-semibold text-blue-200 hover:text-white">
          ← Back to Edge Marketplace Hub
        </Link>

        <div className="mt-16 text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-300">Website Builder</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Build your marketplace<br />without writing code.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Choose from 30 pre-designed sections across Headers, Heroes, Products, Text, Media, and Footers. Drag, edit, and launch in minutes.
          </p>

          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={startNew}
              disabled={starting}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-black text-white shadow-lg transition hover:bg-blue-700 disabled:opacity-60"
            >
              {starting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Paintbrush className="h-5 w-5" />}
              Start New Project
            </button>
            <Link
              href="/launch-your-marketplace"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-bold text-white transition hover:bg-white/5"
            >
              <Wand2 className="h-5 w-5" />
              Submit Intake First
            </Link>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <LayoutTemplate className="h-6 w-6 text-blue-300" />,
              title: "30 Pre-Built Sections",
              desc: "Headers, heroes, product grids, image galleries, text blocks, and footers — all professionally designed.",
            },
            {
              icon: <Sparkles className="h-6 w-6 text-emerald-300" />,
              title: "Guided Editing",
              desc: "No freeform chaos. Add sections, edit content inline, move them up and down — nothing breaks.",
            },
            {
              icon: <Paintbrush className="h-6 w-6 text-rose-300" />,
              title: "Live Preview",
              desc: "Toggle between Desktop and Mobile views instantly. Preview the full page before you deploy.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
