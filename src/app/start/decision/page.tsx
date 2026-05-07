"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function DecisionPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<"launch" | "pro">("launch")

  function continueFlow() {
    sessionStorage.setItem("selectedPlan", selected)
    router.push("/launch-your-marketplace")
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="text-center mt-12 mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Choose how you grow</h1>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-slate-50 rounded-[2rem] p-1 border border-slate-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-t-[1.8rem]">
              <div className="p-8 hidden md:flex items-end text-sm font-bold text-slate-400 uppercase tracking-widest">Plan Features</div>
              <button onClick={() => setSelected("launch")} className={`p-8 border-l border-slate-50 text-center ${selected === "launch" ? "bg-blue-50" : ""}`}>
                <h3 className="text-xl font-black">🚀 Launch</h3>
                <div className="flex justify-center items-baseline gap-1 my-3"><span className="text-4xl font-black">$0</span><span className="text-slate-400">/mo</span></div>
                <div className="inline-flex rounded-xl border px-4 py-2 font-bold">Start selling</div>
              </button>
              <button onClick={() => setSelected("pro")} className={`p-8 border-l border-slate-50 text-center ${selected === "pro" ? "bg-slate-900 text-white" : ""}`}>
                <h3 className="text-xl font-black">⚡ Pro</h3>
                <div className="flex justify-center items-baseline gap-1 my-3"><span className="text-4xl font-black">$99</span><span className="text-slate-400">/mo</span></div>
                <div className="inline-flex rounded-xl bg-blue-600 text-white px-4 py-2 font-bold">Upgrade to Pro</div>
              </button>
            </div>

            <Row feature="💰 Keep more of every sale" launch="5% per sale\nMost sellers upgrade once they start seeing consistent sales" pro="1% per sale\nPro pays for itself at ~$2,500/mo in sales" />
            <Row feature="🌐 Own your brand" launch="Edge subdomain\nyourcompany.edgemarketplacehub.com" pro="Custom domain + your brand only\n(no platform branding)" />
            <Row feature="⚡ Go live" launch="$5 to go live\n(refunded after your first sale)" pro="Go live instantly — no activation" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-slate-100 bg-white rounded-b-[1.8rem]">
              <div className="p-8 hidden md:flex flex-col justify-center border-r border-slate-100">
                <p className="text-sm font-black uppercase tracking-widest">Core Platform</p>
                <p className="text-xs text-slate-500 mt-2">Included in both tiers</p>
              </div>
              <div className="md:col-span-2 p-8 grid sm:grid-cols-2 gap-4 font-semibold">
                <p>15-minute guided setup flow</p>
                <p>Core marketplace design templates</p>
                <p>Unlimited products & active listings</p>
                <p>Global edge-hosted infrastructure</p>
                <p>Built-in checkout & merchant payouts</p>
                <p>Basic sales dashboard & analytics</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-8">
          <button onClick={continueFlow} className="rounded-full bg-blue-600 px-10 py-4 text-lg font-bold text-white hover:bg-blue-700">
            Continue →
          </button>
        </div>
      </div>
    </main>
  )
}

function Row({ feature, launch, pro }: { feature: string; launch: string; pro: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-slate-100 bg-white">
      <div className="p-6 md:p-8 font-bold">{feature}</div>
      <div className="p-6 md:p-8 md:border-l border-slate-100 text-sm whitespace-pre-line">{launch}</div>
      <div className="p-6 md:p-8 md:border-l border-slate-100 text-sm whitespace-pre-line">{pro}</div>
    </div>
  )
}
