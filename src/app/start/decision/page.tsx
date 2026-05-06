"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { useState } from "react"
import { marketplaceTemplates } from "@/lib/intake/schema"

export default function DecisionPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleContinue() {
    if (!selected) return

    setSubmitting(true)
    try {
      // Store the selected template temporarily and redirect to intake
      // The intake form will use this selection as the default
      sessionStorage.setItem("selectedTemplate", selected)
      router.push("/launch-your-marketplace")
    } catch (err) {
      console.error("Error:", err)
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <Link href="/start" className="text-sm font-semibold text-blue-200 hover:text-white flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mt-16 text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-300">Step 1: Choose Your Path</p>
          <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
            🚀 Choose how you grow
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Select your marketplace type. Don&apos;t worry — you can customize everything after this.
          </p>
        </div>

        {/* Template Selection Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {marketplaceTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelected(template.id)}
              className={`relative rounded-2xl border-2 p-8 text-left transition-all duration-200 ${
                selected === template.id
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                  : "border-slate-700 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-900/70"
              }`}
            >
              {/* Checkmark badge */}
              {selected === template.id && (
                <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}

              <div className="mb-4 text-4xl">{template.emoji}</div>
              <h3 className="text-xl font-black">{template.label}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{template.description}</p>

              {/* Template features */}
              <ul className="mt-6 space-y-2 text-xs text-slate-500">
                {template.features?.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 pb-12">
          <button
            onClick={handleContinue}
            disabled={!selected || submitting}
            className="rounded-full bg-blue-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Loading..." : `Continue → Complete Your Profile`}
          </button>
          <Link
            href="/builder"
            className="text-sm font-semibold text-slate-400 hover:text-white"
          >
            Skip to builder
          </Link>
        </div>
      </div>
    </main>
  )
}
