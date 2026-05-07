"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { marketplaceTemplates } from "@/lib/intake/schema"
import { InventoryForm, type Product } from "@/components/inventory-form"

type Step = 1 | 2 | 3 | 4 | 5 | 6

const initialForm = {
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  currentWebsite: "",
  desiredSubdomain: "",
  selectedTemplate: marketplaceTemplates[0].id,
  customDomain: false,
  customDomainName: "",
  needsToPurchaseDomain: false,
  offerSummary: "",
  plan: "launch",
}

type FormState = typeof initialForm

export default function LaunchMarketplacePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormState>(initialForm)
  const [products, setProducts] = useState<Product[]>([])
  const [includeSharedMarketplace, setIncludeSharedMarketplace] = useState(false)
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
  }, [])

  useEffect(() => {
    if (step !== 5) return
    if (countdown <= 0) {
      setStep(6)
      return
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [step, countdown])

  const selectedTemplate = useMemo(() => marketplaceTemplates.find((t) => t.id === form.selectedTemplate), [form.selectedTemplate])
  const validProducts = products.filter((p) => p.name.trim())
  const planPrice = form.plan === "pro" ? 699 : form.plan === "custom" ? 0 : 299

  function update(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleCheckout() {
    setSubmitting(true)
    setError(null)
    try {
      const payload = {
        ...form,
        businessName: form.businessName || "New Marketplace",
        ownerName: form.ownerName || "Owner",
        email: form.email || "owner@example.com",
        preferredSubdomain: form.desiredSubdomain || (form.businessName || "newmarket").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20),
        offerSummary: form.offerSummary || validProducts.map((p) => p.name).join(", ") || "Product launch",
        products: validProducts,
        includeSharedMarketplace,
      }

      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to process checkout")
      }

      setResult({
        intakeId: data.intakeId,
        previewUrl: `https://${data.preferredSubdomain}.edgemarketplacehub.com`,
      })
      setStep(5)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to process checkout")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <Link href="/start/decision" className="text-sm font-semibold text-blue-600 hover:text-blue-700">← Back</Link>

        {step <= 4 && (
          <div className="mt-8 mb-8 grid grid-cols-4 gap-2 text-xs font-bold">
            {[
              "Launch Setup",
              "Web Builder",
              "Products",
              "Checkout",
            ].map((label, idx) => (
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
                      <input
                        value={form.desiredSubdomain}
                        onChange={(e) => update("desiredSubdomain", e.target.value)}
                        placeholder="acme"
                        className="w-full rounded-lg border border-slate-300 px-4 py-2"
                      />
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

              {form.customDomain && (
                <Field label="Custom Domain" value={form.customDomainName} onChange={(v) => update("customDomainName", v)} placeholder="mybusiness.com" />
              )}

              <div>
                <p className="text-sm font-bold mb-3">Marketplace type</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {marketplaceTemplates.map((template) => (
                    <button key={template.id} onClick={() => update("selectedTemplate", template.id)} className={`rounded-xl border-2 p-3 text-left ${form.selectedTemplate === template.id ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}>
                      <div className="text-lg">{template.emoji}</div>
                      <div className="text-xs font-bold">{template.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={() => setStep(2)} className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">Continue to Builder →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black">Web Builder</h2>
              <p className="text-slate-600">This is your next step after intake. Continue into the full builder experience.</p>
              <div className="h-[420px] overflow-hidden rounded-xl border border-slate-200">
                <iframe title="Builder preview" src="https://www.edgemarketplacehub.com/builder/prj-vobbihscvbul" className="h-full w-full" />
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="rounded-lg bg-slate-200 px-6 py-3 font-bold text-slate-800">← Back</button>
                <button onClick={() => setStep(3)} className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white">Continue to Products →</button>
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
              includeSharedMarketplace={includeSharedMarketplace}
              onIncludeSharedMarketplaceChange={setIncludeSharedMarketplace}
            />
          )}

          {step === 4 && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-black">Review before checkout</h2>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="font-bold">Plan</p>
                  <p className="text-slate-700">{form.plan.toUpperCase()} {planPrice > 0 ? `- $${planPrice}` : "- Custom Quote"}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4 text-sm space-y-1">
                  <p><span className="font-bold">Business:</span> {form.businessName || "Not provided"}</p>
                  <p><span className="font-bold">Email:</span> {form.email || "owner@example.com"}</p>
                  <p><span className="font-bold">Subdomain:</span> {(form.desiredSubdomain || "mybusiness") + ".edgemarketplacehub.com"}</p>
                  <p><span className="font-bold">Current website:</span> {form.currentWebsite || "Not provided"}</p>
                  <p><span className="font-bold">Custom domain:</span> {form.customDomainName || "No"}</p>
                  <p><span className="font-bold">Need to purchase domain:</span> {form.needsToPurchaseDomain ? "Yes" : "No"}</p>
                  <p><span className="font-bold">Products:</span> {validProducts.length}</p>
                  <p><span className="font-bold">Include in shared marketplace:</span> {includeSharedMarketplace ? "Yes" : "No"}</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4 space-y-3">
                  <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" /> I agree to Terms and Conditions</label>
                  <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" /> I agree to the onboarding and provisioning policy</label>
                  <label className="flex items-start gap-2 text-sm font-semibold"><input type="checkbox" className="mt-1" /> I have reviewed and approved my selections</label>
                </div>
                <a href="https://www.edgemarketplacehub.com/builder/prj-vobbihscvbul" target="_blank" className="inline-block text-sm font-bold text-blue-600">Preview built webpage ↗</a>
              </div>

              <div className="rounded-xl border border-slate-200 p-6 bg-slate-50">
                <h3 className="text-xl font-black mb-3">Stripe Checkout</h3>
                <p className="text-sm text-slate-600 mb-4">Client details are prefilled for checkout.</p>
                <div className="rounded-lg bg-white border border-slate-200 p-4 text-sm space-y-2 mb-6">
                  <p><span className="font-bold">Email:</span> {form.email || "owner@example.com"}</p>
                  <p><span className="font-bold">Name:</span> {form.ownerName || "Owner"}</p>
                  <p><span className="font-bold">Total:</span> {planPrice > 0 ? `$${planPrice}` : "Custom quote"}</p>
                </div>
                {error && <p className="mb-3 text-sm font-semibold text-red-700">{error}</p>}
                <button onClick={handleCheckout} disabled={submitting} className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50">
                  {submitting ? "Processing..." : planPrice > 0 ? `Pay $${planPrice}` : "Request Custom Quote"}
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
              <p className="mt-4 text-slate-700">
                Thank you for choosing Edge Marketplace to launch your business website.
              </p>
              <p className="mt-2 text-slate-700">
                Continue to your store and check your email for your temporary admin password and Stripe Connect signup.
              </p>
              <p className="mt-2 font-bold text-blue-700">You are awesome!</p>
              <a href={result?.previewUrl || "https://mybusiness.edgemarketplacehub.com"} className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700">
                Continue to your store
              </a>
              <div className="mt-4 text-sm text-slate-500">Intake ID: {result?.intakeId}</div>
              <div className="mt-3">
                <button onClick={() => router.push(`/builder/${result?.intakeId || "prj-vobbihscvbul"}`)} className="text-sm font-semibold text-blue-600 hover:text-blue-700">Open builder</button>
              </div>
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
