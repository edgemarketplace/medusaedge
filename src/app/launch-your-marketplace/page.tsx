"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { InventoryForm, type Product } from "@/components/inventory-form"

type Step = 1 | 2 | 3 | 4 | 5 | 6

const initialForm = {
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  currentWebsite: "",
  desiredSubdomain: "",
  customDomain: false,
  customDomainName: "",
  needsToPurchaseDomain: false,
  offerSummary: "",
  plan: "launch",
}

type FormState = typeof initialForm

function generateProjectId() {
  return "prj-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
}

export default function LaunchMarketplacePage() {
  const router = useRouter()
  const [paidFlagChecked, setPaidFlagChecked] = useState(false)
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormState>(initialForm)
  const [products, setProducts] = useState<Product[]>([])
  const [projectId, setProjectId] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(10)
  const [result, setResult] = useState<{ intakeId: string; previewUrl: string } | null>(null)

  useEffect(() => {
    const selectedPlan = sessionStorage.getItem("selectedPlan")
    if (selectedPlan) {
      setForm((prev) => ({ ...prev, plan: selectedPlan }))
      sessionStorage.removeItem("selectedPlan")
    }
    setProjectId(generateProjectId())
  }, [])

  useEffect(() => {
    if (paidFlagChecked || typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    if (params.get("paid") === "1") {
      setStep(5)
    }
    setPaidFlagChecked(true)
  }, [paidFlagChecked])

  useEffect(() => {
    if (step !== 5) return
    if (countdown <= 0) {
      setStep(6)
      return
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [step, countdown])

  const validProducts = products.filter((p) => p.name.trim())
  const planPriceLabel = form.plan === "pro" ? "$99/mo" : "$5 activation"

  function update(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleCheckout() {
    setSubmitting(true)
    setError(null)
    try {
      const intakePayload = {
        ...form,
        businessName: form.businessName || "New Marketplace",
        ownerName: form.ownerName || "Owner",
        email: form.email || "owner@example.com",
        preferredSubdomain: form.desiredSubdomain || (form.businessName || "newmarket").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20),
        offerSummary: form.offerSummary || validProducts.map((p) => p.name).join(", ") || "Product launch",
        products: validProducts,
      }

      const intakeResponse = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intakePayload),
      })
      const intakeData = await intakeResponse.json()
      if (!intakeResponse.ok || !intakeData.success) {
        throw new Error(intakeData.error || "Unable to save onboarding details")
      }

      setResult({
        intakeId: intakeData.intakeId,
        previewUrl: `https://${intakeData.preferredSubdomain}.edgemarketplacehub.com`,
      })

      const stripeResponse = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: form.plan,
          email: form.email || "owner@example.com",
          name: form.ownerName || "Owner",
          intakeId: intakeData.intakeId,
        }),
      })
      const stripeData = await stripeResponse.json()
      if (!stripeResponse.ok || !stripeData.url) {
        throw new Error(stripeData.error || "Unable to initialize Stripe checkout")
      }

      window.location.href = stripeData.url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to process checkout")
      setSubmitting(false)
    }
  }

  if (step === 2) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <button onClick={() => setStep(1)} className="text-sm font-semibold text-blue-300">← Back</button>
          <p className="text-sm font-bold">Web Builder (Full Page)</p>
          <button onClick={() => setStep(3)} className="rounded bg-blue-600 px-3 py-1.5 text-sm font-bold">Continue →</button>
        </div>
        <iframe title="Builder" src={`/builder/${projectId}`} className="h-[calc(100vh-56px)] w-full" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <Link href="/start/decision" className="text-sm font-semibold text-blue-600 hover:text-blue-700">← Back</Link>

        {step <= 4 && (
          <div className="mt-8 mb-8 grid grid-cols-4 gap-2 text-xs font-bold">
            {["Launch Setup", "Web Builder", "Products", "Checkout"].map((label, idx) => (
              <div key={label} className={`rounded-full px-3 py-2 text-center ${step >= idx + 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"}`}>{label}</div>
            ))}
          </div>
        )}

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          {step === 1 && (
            <div className="space-y-6">
              <h1 className="text-3xl font-black">Step 2: Launch Setup</h1>
              <p className="text-slate-600">Quick details now — nothing is required so you can move fast.</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Business Name" value={form.businessName} onChange={(v) => update("businessName", v)} />
                <Field label="Owner / Primary Contact Name" value={form.ownerName} onChange={(v) => update("ownerName", v)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} />
                <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Current Website (optional)" value={form.currentWebsite} onChange={(v) => update("currentWebsite", v)} placeholder="https://example.com" />
                <div>
                  <label className="grid gap-2 text-sm font-bold text-slate-800">
                    Desired Subdomain *
                    <div className="flex items-center gap-2">
                      <input value={form.desiredSubdomain} onChange={(e) => update("desiredSubdomain", e.target.value)} placeholder="acme" className="w-full rounded-lg border border-slate-300 px-4 py-2" />
                      <span className="text-sm font-semibold text-slate-600">.edgemarketplacehub.com</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
                  <input type="checkbox" checked={form.customDomain} onChange={(e) => update("customDomain", e.target.checked)} className="h-5 w-5" />
                  <span className="text-sm font-semibold">I already own a domain</span>
                </label>
                <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
                  <input type="checkbox" checked={form.needsToPurchaseDomain} onChange={(e) => update("needsToPurchaseDomain", e.target.checked)} className="h-5 w-5" />
                  <span className="text-sm font-semibold">Need to purchase a domain (included in confirmation email)</span>
                </label>
              </div>

              {form.customDomain && <Field label="Custom Domain" value={form.customDomainName} onChange={(v) => update("customDomainName", v)} placeholder="mybusiness.com" />}

              <div className="flex justify-end">
                <button onClick={() => setStep(2)} className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">Continue to Builder →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <InventoryForm
              initialProducts={products}
              onSave={(nextProducts) => {
                setProducts(nextProducts)
                setStep(4)
              }}
              onSkip={() => setStep(4)}
            />
          )}

          {step === 4 && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-black">Review before checkout</h2>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="font-bold">Plan</p>
                  <p className="text-slate-700">{form.plan.toUpperCase()} - {planPriceLabel}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4 text-sm space-y-1">
                  <p><span className="font-bold">Business:</span> {form.businessName || "Not provided"}</p>
                  <p><span className="font-bold">Email:</span> {form.email || "owner@example.com"}</p>
                  <p><span className="font-bold">Subdomain:</span> {(form.desiredSubdomain || "mybusiness") + ".edgemarketplacehub.com"}</p>
                  <p><span className="font-bold">Current website:</span> {form.currentWebsite || "Not provided"}</p>
                  <p><span className="font-bold">Custom domain:</span> {form.customDomainName || "No"}</p>
                  <p><span className="font-bold">Need to purchase domain:</span> {form.needsToPurchaseDomain ? "Yes" : "No"}</p>
                  <p><span className="font-bold">Products:</span> {validProducts.length}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4 space-y-3">
                  <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" /> I agree to Terms and Conditions</label>
                  <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" /> I agree to the onboarding and provisioning policy</label>
                  <label className="flex items-start gap-2 text-sm font-semibold"><input type="checkbox" className="mt-1" /> I have reviewed and approved my selections</label>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-6 bg-slate-50">
                <h3 className="text-xl font-black mb-3">Stripe Checkout</h3>
                <p className="text-sm text-slate-600 mb-4">This launches a real Stripe Checkout session on the right-side step.</p>
                <div className="rounded-lg bg-white border border-slate-200 p-4 text-sm space-y-2 mb-6">
                  <p><span className="font-bold">Email:</span> {form.email || "owner@example.com"}</p>
                  <p><span className="font-bold">Name:</span> {form.ownerName || "Owner"}</p>
                  <p><span className="font-bold">Charge:</span> {planPriceLabel}</p>
                </div>
                {error && <p className="mb-3 text-sm font-semibold text-red-700">{error}</p>}
                <button onClick={handleCheckout} disabled={submitting} className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50">
                  {submitting ? "Redirecting to Stripe..." : "Proceed to secure Stripe checkout"}
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="py-16 text-center">
              <div className="text-6xl">⚙️</div>
              <h2 className="mt-4 text-3xl font-black">Running launch automations...</h2>
              <p className="mt-2 text-slate-600">Please wait {countdown} seconds while we prepare your store.</p>
            </div>
          )}

          {step === 6 && (
            <div className="py-12 text-center">
              <div className="text-6xl">🎉</div>
              <h2 className="mt-4 text-3xl font-black">Your store is ready</h2>
              <p className="mt-4 text-slate-700">Thank you for choosing Edge Marketplace to launch your business website.</p>
              <p className="mt-2 text-slate-700">Continue to your store and check your email for your temporary admin password and Stripe Connect signup.</p>
              <p className="mt-2 font-bold text-blue-700">You are awesome!</p>
              <a href={result?.previewUrl || "https://mybusiness.edgemarketplacehub.com"} className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700">Continue to your store</a>
              <div className="mt-4 text-sm text-slate-500">Intake ID: {result?.intakeId || "pending"}</div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-800">
      {label}
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="rounded-lg border border-slate-300 px-4 py-2" />
    </label>
  )
}
