"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Label, Textarea } from "@medusajs/ui"
import { Check, Loader2, Sparkles, Layout, Store, Palette, Zap, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js"

// Lazy-load Stripe to avoid SSR issues
let stripePromise: ReturnType<typeof loadStripe> | null = null
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")
  }
  return stripePromise
}

const productTemplates = [
  { id: "modern-commerce", name: "Modern", color: "bg-slate-900", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800" },
  { id: "industrial-supply", name: "Industrial", color: "bg-zinc-700", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800" },
  { id: "boutique-luxury", name: "Boutique", color: "bg-stone-200", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=800" },
  { id: "tech-minimal", name: "Tech", color: "bg-blue-900", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800" },
  { id: "market-vendor", name: "Market", color: "bg-orange-600", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800" },
  { id: "precision-tools", name: "Precision", color: "bg-red-800", img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=800" },
]

function StripeCheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const [isProvisioning, setIsProvisioning] = useState(false)
  const [provisioningStatus, setProvisioningStatus] = useState("Initializing...")

  const [formData, setFormData] = useState({
    template: "modern-commerce",
    plan: "launch",
  })

  // Handle successful return from Stripe
  useEffect(() => {
    const sid = searchParams.get("session_id")
    if (sid) {
      setIsProvisioning(true)
      setTimeout(() => setProvisioningStatus("Confirming payment..."), 1000)
      setTimeout(() => setProvisioningStatus("Allocating edge nodes..."), 2500)
      setTimeout(() => setProvisioningStatus("Deploying Medusa..."), 4000)
      setTimeout(() => {
        router.push(`/dashboard?status=success&plan=${formData.plan}`)
      }, 6000)
    }
  }, [searchParams])

  const fetchCheckout = useCallback(async (plan: string) => {
    setLoading(true)
    setClientSecret(null)
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = await response.json()
      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
      }
    } catch (err) {
      console.error("Failed to load checkout")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!searchParams.get("session_id")) {
      fetchCheckout(formData.plan)
    }
  }, [formData.plan, fetchCheckout, searchParams])

  if (isProvisioning) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="h-10 w-10 text-[#635bff] animate-spin mb-4" />
        <h2 className="text-xl font-bold text-[#1a1f36]">{provisioningStatus}</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans text-[#1a1f36] overflow-x-hidden">

      {/* LEFT SIDE: Order Manifest */}
      <div className="lg:w-[45%] bg-[#f7f8f9] lg:min-h-screen p-8 lg:pt-12 lg:pb-20 lg:px-20 lg:pr-12 border-r border-[#e3e8ee]">
        <div className="max-w-md ml-auto space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#4f566b] hover:text-[#1a1f36] transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Edge Hub</span>
          </Link>

          {/* Plan selector + price */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: "launch", label: "Start selling", icon: "🚀", sub: "$0/mo" },
                { id: "pro", label: "Upgrade to Pro", icon: "⚡", sub: "$99/mo" },
              ].map(p => (
                <button
                  key={p.id}
                  disabled={loading}
                  onClick={() => setFormData(prev => ({ ...prev, plan: p.id }))}
                  className={`py-3 px-4 rounded-lg text-xs font-black transition-all border-2 text-center flex flex-col items-center justify-center gap-1 ${formData.plan === p.id
                      ? "bg-white border-[#635bff] shadow-sm text-[#635bff] scale-[1.01]"
                      : "bg-white border-[#e3e8ee] text-[#4f566b] hover:border-[#cfd7df]"
                    } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{p.icon}</span>
                    <span className="uppercase tracking-widest">{p.id}</span>
                  </div>
                  <div className="text-[10px] opacity-70 font-bold uppercase">{p.label}</div>
                  <div className="text-[9px] opacity-50">{p.sub}</div>
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-[#4f566b]">Total due today</p>
              <h1 className="text-6xl font-bold tracking-tight">
                ${formData.plan === "pro" ? "99.00" : "5.00"}
              </h1>
            </div>
          </div>

          {/* Detailed manifest */}
          <div className="space-y-8 pt-8 border-t border-[#e3e8ee]">
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                    <span className="text-base">💰</span>
                  </div>
                  <p className="text-[10px] font-black text-[#a3acb9] uppercase tracking-widest">Keep more of every sale</p>
                </div>
                <div className="pl-10">
                  <p className="text-lg font-black text-[#1a1f36]">
                    {formData.plan === "pro" ? "1% per sale" : "5% per sale"}
                  </p>
                  <p className="text-xs text-[#4f566b] leading-relaxed font-medium">
                    {formData.plan === "pro"
                      ? "Pro pays for itself at ~$2,500/mo in sales"
                      : "Most sellers upgrade once they start seeing consistent sales"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="text-base">🌐</span>
                  </div>
                  <p className="text-[10px] font-black text-[#a3acb9] uppercase tracking-widest">Own your brand</p>
                </div>
                <div className="pl-10">
                  <p className="text-lg font-black text-[#1a1f36]">
                    {formData.plan === "pro" ? "Custom domain + your brand only" : "Edge subdomain"}
                  </p>
                  <p className="text-xs text-[#4f566b] font-mono opacity-60">
                    {formData.plan === "pro"
                      ? "(no platform branding)"
                      : "yourcompany.edgemarketplacehub.com"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                    <span className="text-base">⚡</span>
                  </div>
                  <p className="text-[10px] font-black text-[#a3acb9] uppercase tracking-widest">Go live</p>
                </div>
                <div className="pl-10">
                  <p className="text-lg font-black text-[#1a1f36]">
                    {formData.plan === "pro" ? "Go live instantly — no activation" : "$5 to go live"}
                  </p>
                  {formData.plan === "launch" && (
                    <p className="text-xs text-[#4f566b] font-medium">(refunded after your first sale)</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#e3e8ee]">
              <p className="text-[10px] font-black text-[#a3acb9] uppercase tracking-widest mb-4">Core Platform Included</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  "15-minute guided setup",
                  "Unlimited product listings",
                  "Built-in merchant payouts",
                  "Sales dashboard & analytics",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] font-bold text-[#1a1f36]">
                    <Check className="h-3 w-3 text-green-500 mt-0.5 shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Template grid */}
          <div className="pt-8 border-t border-[#e3e8ee]">
            <p className="text-xs font-black text-[#1a1f36] uppercase tracking-widest mb-6">Select your template</p>
            <div className="grid grid-cols-3 gap-3">
              {productTemplates.map(t => (
                <div key={t.id} className="flex flex-col gap-2 group">
                  <button
                    disabled={loading}
                    onClick={() => setFormData(prev => ({ ...prev, template: t.id }))}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all relative ${formData.template === t.id
                        ? "border-[#635bff] shadow-lg scale-[1.02]"
                        : "border-[#e3e8ee] opacity-70 group-hover:opacity-100"
                      } ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <img
                      src={`${t.img}&auto=format&fit=crop&w=300`}
                      alt={t.name}
                      className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                    />
                    {formData.template === t.id && (
                      <div className="absolute inset-0 bg-[#635bff]/10 flex items-center justify-center">
                        <div className="bg-white rounded-full p-2 shadow-xl">
                          <Check className="h-4 w-4 text-[#635bff]" />
                        </div>
                      </div>
                    )}
                  </button>
                  <p className="text-[10px] font-bold text-center uppercase tracking-widest text-[#4f566b]">{t.name}</p>
                </div>
              ))}
            </div>
          )}

            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-slate-900">Choose your foundation</h1>
                  <p className="mt-2 text-slate-500">Select the plan that matches your business goals.</p>
                </div>

                <div className="grid gap-6">
                  <button
                    onClick={() => setFormData({ ...formData, plan: 'launch' })}
                    className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${formData.plan === 'launch' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">🚀 Launch</h3>
                        <p className="text-blue-600 font-bold text-lg mt-1">$0 <span className="text-sm font-normal text-slate-400">/ month</span></p>
                      </div>
                      {formData.plan === 'launch' && <CheckCircle2 className="h-6 w-6 text-blue-600" />}
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="h-4 w-4 text-blue-500" />
                        5% transaction fee
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Check className="h-4 w-4 text-blue-500" />
                        $5 one-time activation fee
                      </li>
                    </ul>
                    <p className="text-xs text-slate-500 bg-slate-100 p-3 rounded-lg">
                      "Start selling today with zero upfront risk." <br />
                      <span className="italic text-slate-400 mt-1 block">Note: Activation required to go live.</span>
                    </p>
                  </button>

                  <button
                    onClick={() => setFormData({ ...formData, plan: 'pro' })}
                    className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${formData.plan === 'pro' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">⚡ Pro</h3>
                        <p className="text-blue-600 font-bold text-lg mt-1">$99 <span className="text-sm font-normal text-slate-400">/ month</span></p>
                      </div>
                      {formData.plan === 'pro' && <CheckCircle2 className="h-6 w-6 text-blue-600" />}
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="h-4 w-4 text-blue-500" />
                        1% transaction fee
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Check className="h-4 w-4 text-blue-500" />
                        No activation fee
                      </li>
                    </ul>
                    <p className="text-xs text-blue-700 bg-blue-50 p-3 rounded-lg">
                      "Built for serious sellers scaling volume."
                    </p>
                  </button>
                </div>

                {/* RIGHT SIDE: Stripe Embedded Checkout */}
                <div className="lg:w-[55%] p-8 lg:p-20 lg:pl-12 flex flex-col items-center bg-white min-h-screen">
                  <div className="w-full max-w-md space-y-6">

                    {/* Test Mode Helper (slim) */}
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <Info className="h-3 w-3 text-blue-600" />
                          <p className="text-[9px] font-black text-blue-800 uppercase tracking-widest">Test Mode</p>
                        </div>
                        <div className="px-1.5 py-0.5 bg-blue-600 text-white text-[8px] font-black uppercase rounded tracking-wider">Sandbox</div>
                      </div>
                      <div
                        onClick={() => { navigator.clipboard.writeText("4242424242424242"); alert("Test card copied!") }}
                        className="bg-white border border-blue-200 rounded-lg py-1.5 px-3 flex justify-between items-center cursor-pointer hover:border-blue-400 active:scale-[0.98] transition-all group shadow-sm"
                      >
                        <div className="flex flex-col">
                          <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest leading-none mb-0.5">Test Card</p>
                          <code className="text-sm font-mono font-bold text-blue-900 tracking-tight">4242 4242 4242 4242</code>
                        </div>
                        <span className="text-[9px] font-black uppercase text-blue-500 group-hover:text-blue-700">Copy</span>
                      </div>
                    </div>

                    {/* Checkout area */}
                    <div>
                      {loading ? (
                        <div className="flex flex-col items-center gap-4 py-20">
                          <Loader2 className="h-10 w-10 text-[#635bff] animate-spin" />
                          <p className="text-xs font-bold text-[#4f566b] uppercase tracking-widest animate-pulse">
                            Syncing Plan Details...
                          </p>
                        </div>
                      ) : clientSecret ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                          <EmbeddedCheckoutProvider
                            key={clientSecret}
                            stripe={getStripe()}
                            options={{ clientSecret }}
                          >
                            <EmbeddedCheckout />
                          </EmbeddedCheckoutProvider>
                        </div>
                      ) : (
                        <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
                          <p className="text-red-500 font-bold mb-2">Failed to load secure checkout</p>
                          <button
                            onClick={() => fetchCheckout(formData.plan)}
                            className="text-xs font-black uppercase text-red-600 underline"
                          >
                            Try again
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
            }

            export default function OnboardingPage() {
  return (
            <Suspense
              fallback={
                <div className="h-screen w-screen flex items-center justify-center bg-[#f7f8f9]">
                  Loading Checkout...
                </div>
              }
            >
              <StripeCheckoutContent />
            </Suspense>
            )
}
