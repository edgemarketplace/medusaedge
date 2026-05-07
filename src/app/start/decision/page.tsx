"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { useState } from "react"

const plans = [
  {
    id: "launch",
    name: "🚀 Launch",
    price: "$299",
    subtitle: "Best way to get started fast",
    points: ["Edge subdomain", "Guided onboarding", "Builder + product setup"],
  },
  {
    id: "pro",
    name: "⚡ Pro",
    price: "$699",
    subtitle: "For faster growth and custom setup",
    points: ["Priority setup", "Custom domain support", "Higher-touch launch support"],
  },
  {
    id: "custom",
    name: "🧩 Custom",
    price: "Custom",
    subtitle: "Complex workflows and advanced needs",
    points: ["Migration/scaling support", "Custom automation", "Tailored implementation"],
  },
]

export default function DecisionPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  function handleContinue() {
    if (!selected) return
    sessionStorage.setItem("selectedPlan", selected)
    router.push("/launch-your-marketplace")
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <Link href="/" className="text-sm font-semibold text-blue-200 hover:text-white flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mt-16 text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-300">Step 1</p>
          <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
            🚀 Choose how you grow
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Pick your plan first. Next step is your business details and launch setup.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`relative rounded-2xl border-2 p-8 text-left transition-all duration-200 ${
                selected === plan.id
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                  : "border-slate-700 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-900/70"
              }`}
            >
              {selected === plan.id && (
                <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}

              <h3 className="text-2xl font-black">{plan.name}</h3>
              <p className="mt-1 text-3xl font-black text-blue-300">{plan.price}</p>
              <p className="mt-3 text-sm text-slate-300">{plan.subtitle}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-400">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>{point}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center pb-12">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className="rounded-full bg-blue-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to launch setup →
          </button>
        </div>
      </div>
    </main>
  )
}
