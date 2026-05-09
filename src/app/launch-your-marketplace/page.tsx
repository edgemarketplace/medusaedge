"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { InventoryForm, type Product } from "@/components/inventory-form"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

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
  const [result, setResult] = useState<{
    intakeId: string
    previewUrl: string
    preferredSubdomain?: string
    reservedSubdomain?: string
    selectedTemplateRepo?: string
  } | null>(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [approved, setApproved] = useState(false)
  const [embeddedClientSecret, setEmbeddedClientSecret] = useState<string | null>(null)
  const [checkoutInitRequested, setCheckoutInitRequested] = useState(false)

  const stripePromise = useMemo(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_STRIPE_KEY
    return key ? loadStripe(key) : null
  }, [])

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
    if (params.get("paid") === "1") setStep(5)
    setPaidFlagChecked(true)
  }, [paidFlagChecked])

  useEffect(() => {
    if (step !== 5) return
    if (countdown <= 0) return setStep(6)
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [step, countdown])

  useEffect(() => {
    if (step !== 4) return
    if (!agreeTerms || !approved) return
    if (embeddedClientSecret || submitting || checkoutInitRequested) return
    setCheckoutInitRequested(true)
    void startStripeCheckout()
  }, [step, agreeTerms, approved, embeddedClientSecret, submitting, checkoutInitRequested])

  const validProducts = products.filter((p) => p.name.trim())
  const planPriceLabel = form.plan === "pro" ? "$99/mo" : "$5 activation"
  const previewUrl = useMemo(() => `https://${(form.desiredSubdomain || "mybusiness").toLowerCase()}.edgemarketplacehub.com`, [form.desiredSubdomain])

  function update(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function startStripeCheckout() {
    if (!agreeTerms || !approved) {
      setError("Please accept terms and confirm you reviewed your selections.")
      return
    }

    if (!stripePromise) {
      setError("Stripe publishable key is missing. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY or NEXT_PUBLIC_STRIPE_KEY.")
      return
    }

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
      if (!intakeResponse.ok || !intakeData.success) throw new Error(intakeData.error || "Unable to save onboarding details")

      setResult({
        intakeId: intakeData.intakeId,
        previewUrl: `https://${intakeData.reservedSubdomain || intakeData.preferredSubdomain}.edgemarketplacehub.com`,
        preferredSubdomain: intakeData.preferredSubdomain,
        reservedSubdomain: intakeData.reservedSubdomain,
        selectedTemplateRepo: intakeData.selectedTemplateRepo,
      })

      const stripeResponse = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: form.plan,
          email: form.email || "owner@example.com",
          name: form.ownerName || "Owner",
          phone: form.phone || "",
          intakeId: intakeData.intakeId,
          embedded: true,
        }),
      })
      const stripeData = await stripeResponse.json()
      if (!stripeResponse.ok || !stripeData.clientSecret) {
        throw new Error(stripeData.error || "Unable to create embedded Stripe checkout session")
      }

      setEmbeddedClientSecret(stripeData.clientSecret)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to process checkout")
    } finally {
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
        <iframe title="Builder" src={`/builder-v2/editor/template-clothing-marketplace`} className="h-[calc(100vh-56px)] w-full" />
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
                <label className="grid gap-2 text-sm font-bold text-slate-800">
                  Desired Subdomain *
                  <div className="flex items-center gap-2">
                    <input value={form.desiredSubdomain} onChange={(e) => update("desiredSubdomain", e.target.value)} placeholder="acme" className="w-full rounded-lg border border-slate-300 px-4 py-2" />
                    <span className="text-sm font-semibold text-slate-600">.edgemarketplacehub.com</span>
                  </div>
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4"><input type="checkbox" checked={form.customDomain} onChange={(e) => update("customDomain", e.target.checked)} className="h-5 w-5" /><span className="text-sm font-semibold">I already own a domain</span></label>
                <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4"><input type="checkbox" checked={form.needsToPurchaseDomain} onChange={(e) => update("needsToPurchaseDomain", e.target.checked)} className="h-5 w-5" /><span className="text-sm font-semibold">Need to purchase a domain (included in confirmation email)</span></label>
              </div>
              {form.customDomain && <Field label="Custom Domain" value={form.customDomainName} onChange={(v) => update("customDomainName", v)} placeholder="mybusiness.com" />}
              <div className="flex justify-end"><button onClick={() => setStep(2)} className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">Continue to Builder →</button></div>
            </div>
          )}

          {step === 3 && <InventoryForm initialProducts={products} onSave={(nextProducts) => { setProducts(nextProducts); setStep(4) }} onSkip={() => setStep(4)} />}

          {step === 4 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid lg:grid-cols-[0.95fr_1.05fr]">
              <aside className="border-b border-slate-200 bg-slate-50 p-6 lg:border-b-0 lg:border-r lg:p-8">
                <p className="text-sm font-semibold text-slate-500">EDGE MARKETPLACE HUB</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">Amount due today</h2>
                <p className="mt-1 text-4xl font-semibold tracking-tight text-slate-900">{form.plan === "pro" ? "$99.00" : "$5.00"}</p>
                <p className="mt-2 text-sm text-slate-600">{form.plan === "pro" ? "Monthly subscription" : "One-time activation payment"}</p>

                <div className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-sm">
                  <Row label={form.plan === "pro" ? "Pro plan" : "Launch activation"} value={planPriceLabel} />
                  <Row label="Products configured" value={String(validProducts.length)} />
                  <Row label="Preview URL" value={(form.desiredSubdomain || "mybusiness") + ".edgemarketplacehub.com"} />
                  <div className="border-t border-slate-200 pt-3">
                    <Row label="Total due" value={form.plan === "pro" ? "$99.00" : "$5.00"} />
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Store and owner details</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <Row label="Business" value={form.businessName || "— Empty"} />
                    <Row label="Owner" value={form.ownerName || "— Empty"} />
                    <Row label="Email" value={form.email || "— Empty"} />
                    <Row label="Phone" value={form.phone || "— Empty"} />
                    <Row label="Website" value={form.currentWebsite || "— Empty"} />
                    <Row label="Subdomain" value={(form.desiredSubdomain || "mybusiness") + ".edgemarketplacehub.com"} />
                    <Row label="Custom domain" value={form.customDomain ? (form.customDomainName || "— Empty") : "No"} />
                  </div>
                </div>

                <div className="mt-4 text-xs text-slate-500">
                  Powered by Stripe • SSL encrypted • PCI compliant
                </div>
              </aside>

              <section className="p-6 lg:p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Checkout</h3>
                  <p className="mt-1 text-sm text-slate-600">Medusa-inspired flow: review details, confirm policy, then continue to Stripe secure payment.</p>
                </div>

                <div className="rounded-xl border border-slate-300 bg-white">
                  <div className="border-b border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-900">Contact information</p>
                    <p className="text-sm text-slate-600">{form.email || "— Empty"}</p>
                  </div>
                  <div className="border-b border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-900">Business profile</p>
                    <p className="text-sm text-slate-600">{form.businessName || "— Empty"} • {form.ownerName || "— Empty"}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-slate-900">Delivery target</p>
                    <p className="text-sm text-slate-600">{previewUrl}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-700">
                    <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-0.5 h-4 w-4" />
                    <span>I agree to Terms & Conditions and Privacy Policy.</span>
                  </label>
                  <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-700">
                    <input type="checkbox" checked={approved} onChange={(e) => setApproved(e.target.checked)} className="mt-0.5 h-4 w-4" />
                    <span>I have reviewed and approved my onboarding selections.</span>
                  </label>
                </div>

                {error && <p className="mt-4 text-sm font-semibold text-red-700">{error}</p>}

                {!embeddedClientSecret && (
                  <>
                    <button onClick={startStripeCheckout} disabled={submitting} className="mt-6 w-full rounded-md bg-blue-600 py-3 text-base font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                      {submitting ? "Loading secure checkout..." : "Load secure checkout"}
                    </button>
                    <p className="mt-3 text-center text-xs text-slate-500">Your payment form will load below on this page.</p>
                  </>
                )}

                {embeddedClientSecret && stripePromise && (
                  <div className="mt-6 rounded-xl border border-slate-200 bg-white p-3">
                    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret: embeddedClientSecret }}>
                      <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                  </div>
                )}

                <p className="mt-3 text-center text-xs text-slate-500">No charge is made until you confirm payment in Stripe.</p>
              </section>
            </div>
          )}

          {step === 5 && <div className="py-16 text-center"><div className="text-6xl">⚙️</div><h2 className="mt-4 text-3xl font-black">Running launch automations...</h2><p className="mt-2 text-slate-600">Please wait {countdown} seconds while we prepare your store.</p></div>}

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
  return <label className="grid gap-2 text-sm font-bold text-slate-800">{label}<input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="rounded-lg border border-slate-300 px-4 py-2" /></label>
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  )
}
