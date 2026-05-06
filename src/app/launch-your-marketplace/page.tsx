"use client"

import { FormEvent, useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { marketplaceTemplates } from "@/lib/intake/schema"
import { Check, ChevronDown } from "lucide-react"

const plans = [
  { id: "launch", label: "Launch", description: "Starter implementation with guided setup." },
  { id: "pro", label: "Pro", description: "Custom domain, deeper setup, and launch support." },
  { id: "custom", label: "Custom", description: "Larger marketplace, migration, or special workflow." },
]

const initialForm = {
  // Step 1: Business Information
  businessName: "",
  legalBusinessName: "",
  ownerName: "",
  email: "",
  phone: "",
  businessAddress: "",
  city: "",
  state: "",
  zip: "",
  country: "US",
  timeZone: "America/New_York",

  // Step 2: Website & Branding
  currentWebsite: "",
  desiredSubdomain: "",
  customDomain: false,
  customDomainName: "",
  selectedTemplate: "",
  tagline: "",
  brandColors: "",
  socialLinks: "",

  // Step 3: Business Details
  offerSummary: "",
  catalogSize: "",
  fulfillmentNeeds: "",
  launchTimeline: "",
  budgetRange: "",
  plan: "launch",
  notes: "",
}

type FormState = typeof initialForm
type Step = 1 | 2 | 3 | "summary" | "payment"

export default function ProfessionalIntakePage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<null | { intakeId: string; selectedTemplateRepo: string; preferredSubdomain: string }>(null)
  const [error, setError] = useState<string | null>(null)
  const [inventory, setInventory] = useState<Array<{ name: string; description: string; price: string }>>([])

  // Load selected template from sessionStorage if available
  useEffect(() => {
    const selected = sessionStorage.getItem("selectedTemplate")
    if (selected) {
      setForm(prev => ({ ...prev, selectedTemplate: selected }))
      sessionStorage.removeItem("selectedTemplate")
    }
  }, [])

  const selectedTemplate = useMemo(
    () => marketplaceTemplates.find((t) => t.id === form.selectedTemplate),
    [form.selectedTemplate]
  )

  function update(field: keyof FormState, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function canAdvance(step: Step): boolean {
    switch (step) {
      case 1:
        return !!(form.businessName && form.ownerName && form.email && form.businessAddress && form.city && form.state && form.zip)
      case 2:
        return !!(form.selectedTemplate && form.desiredSubdomain && (!form.customDomain || form.customDomainName))
      case 3:
        return !!(form.offerSummary && form.launchTimeline)
      default:
        return true
    }
  }

  function nextStep() {
    if (!canAdvance(currentStep)) {
      setError(`Please fill in all required fields for Step ${currentStep}`)
      return
    }
    setError(null)
    if (currentStep === 3) {
      setCurrentStep("summary")
    } else if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    }
  }

  async function submitIntake() {
    setSubmitting(true)
    setError(null)
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit intake")
      }

      setResult({
        intakeId: data.intakeId,
        selectedTemplateRepo: data.selectedTemplateRepo,
        preferredSubdomain: data.preferredSubdomain,
      })
      setCurrentStep("payment")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit intake")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          ← Back to Hub
        </Link>

        {/* Progress indicator */}
        {currentStep !== "payment" && currentStep !== "summary" && (
          <div className="mt-12 mb-12">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <button
                    onClick={() => step < currentStep && setCurrentStep(step as Step)}
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition mb-2 ${
                      step === currentStep
                        ? "bg-blue-600 text-white"
                        : step < currentStep
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {step < currentStep ? <Check className="h-6 w-6" /> : step}
                  </button>
                  <span className="text-xs font-bold text-slate-600">
                    {step === 1 && "Business Info"} {step === 2 && "Website & Branding"} {step === 3 && "Business Details"}
                  </span>
                  {step < 3 && <div className="hidden md:block absolute w-12 h-1 bg-slate-200 ml-16" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form content */}
        <div className="rounded-2xl bg-white shadow-lg p-8">
          {currentStep === 1 && (
            <Step1Business form={form} update={update} />
          )}

          {currentStep === 2 && (
            <Step2Website form={form} update={update} selectedTemplate={selectedTemplate} />
          )}

          {currentStep === 3 && (
            <Step3Details form={form} update={update} />
          )}

          {currentStep === "summary" && result && (
            <StepSummary result={result} form={form} onContinue={() => setCurrentStep("payment")} />
          )}

          {currentStep === "payment" && result && (
            <StepPayment result={result} form={form} />
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 mb-6">
              {error}
            </div>
          )}

          {/* Navigation buttons */}
          {currentStep !== "payment" && currentStep !== "summary" && (
            <div className="mt-8 flex gap-4 justify-between">
              <button
                onClick={() => {
                  if (currentStep === 1) {
                    setCurrentStep(1)
                  } else if (currentStep === 2) {
                    setCurrentStep(1)
                  } else if (currentStep === 3) {
                    setCurrentStep(2)
                  }
                }}
                className={`px-6 py-3 rounded-lg font-bold transition ${
                  currentStep === 1
                    ? "text-slate-400 cursor-not-allowed"
                    : "bg-slate-200 text-slate-900 hover:bg-slate-300"
                }`}
                disabled={currentStep === 1}
              >
                ← Back
              </button>
              <button
                onClick={currentStep === 3 ? submitIntake : nextStep}
                disabled={submitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Processing..." : currentStep === 3 ? "Review & Proceed" : "Continue"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function Step1Business({ form, update }: { form: FormState; update: (field: keyof FormState, value: string | boolean) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Business Information</h2>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Business Name" required value={form.businessName} onChange={(v) => update("businessName", v)} />
          <Field label="Legal Business Name (optional)" value={form.legalBusinessName} onChange={(v) => update("legalBusinessName", v)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Owner / Primary Contact Name" required value={form.ownerName} onChange={(v) => update("ownerName", v)} />
          <Field label="Email" required type="email" value={form.email} onChange={(v) => update("email", v)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
          <div />
        </div>
        <div>
          <Field label="Business Address" required value={form.businessAddress} onChange={(v) => update("businessAddress", v)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="City" required value={form.city} onChange={(v) => update("city", v)} />
          <Field label="State" required value={form.state} onChange={(v) => update("state", v)} placeholder="CA" />
          <Field label="ZIP" required value={form.zip} onChange={(v) => update("zip", v)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Country" value={form.country} onChange={(v) => update("country", v)} options={[{ value: "US", label: "United States" }]} />
          <SelectField label="Time Zone" value={form.timeZone} onChange={(v) => update("timeZone", v)} options={[{ value: "America/New_York", label: "Eastern" }, { value: "America/Chicago", label: "Central" }, { value: "America/Denver", label: "Mountain" }, { value: "America/Los_Angeles", label: "Pacific" }]} />
        </div>
      </div>
    </div>
  )
}

function Step2Website({ form, update, selectedTemplate }: { form: FormState; update: (field: keyof FormState, value: string | boolean) => void; selectedTemplate: any }) {
  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Website & Branding</h2>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold text-slate-800 mb-3">Choose Marketplace Type *</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {marketplaceTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => update("selectedTemplate", template.id)}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  form.selectedTemplate === template.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"
                }`}
              >
                <div className="text-xl mb-2">{template.emoji}</div>
                <p className="font-bold text-sm">{template.label}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
          <p className="text-xs font-bold text-blue-900 uppercase mb-1">Selected</p>
          <p className="font-bold text-blue-900">{selectedTemplate?.label}</p>
        </div>

        <div>
          <Field label="Current Website (optional)" value={form.currentWebsite} onChange={(v) => update("currentWebsite", v)} placeholder="https://example.com" />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800 mb-3">Desired Subdomain *</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={form.desiredSubdomain}
              onChange={(e) => update("desiredSubdomain", e.target.value)}
              placeholder="acme"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-medium outline-none ring-blue-200 transition focus:border-blue-500 focus:ring-4"
            />
            <span className="text-sm font-bold text-slate-600">.edgemarketplacehub.com</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.customDomain}
            onChange={(e) => update("customDomain", e.target.checked)}
            className="h-5 w-5 rounded border-slate-300"
          />
          <label className="text-sm font-bold text-slate-800">Do you already own a custom domain?</label>
        </div>

        {form.customDomain && (
          <Field label="Domain Name" value={form.customDomainName} onChange={(v) => update("customDomainName", v)} placeholder="yourdomain.com" />
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tagline (optional)" value={form.tagline} onChange={(v) => update("tagline", v)} />
          <Field label="Brand Colors (optional)" value={form.brandColors} onChange={(v) => update("brandColors", v)} placeholder="Blue, black..." />
        </div>
      </div>
    </div>
  )
}

function Step3Details({ form, update }: { form: FormState; update: (field: keyof FormState, value: string | boolean) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Business Details</h2>
      <div className="space-y-6">
        <TextField label="What will you sell? (products, services, etc.)" required value={form.offerSummary} onChange={(v) => update("offerSummary", v)} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Catalog size / # of items" value={form.catalogSize} onChange={(v) => update("catalogSize", v)} placeholder="50, 200, 1000+..." />
          <SelectField
            label="Launch Timeline"
            required
            value={form.launchTimeline}
            onChange={(v) => update("launchTimeline", v)}
            options={[
              { value: "ASAP", label: "ASAP - This week" },
              { value: "2weeks", label: "2 weeks" },
              { value: "1month", label: "1 month" },
              { value: "later", label: "Flexible" },
            ]}
          />
        </div>

        <TextField label="Any special fulfillment or booking needs?" value={form.fulfillmentNeeds} onChange={(v) => update("fulfillmentNeeds", v)} />

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Pricing Plan"
            value={form.plan}
            onChange={(v) => update("plan", v)}
            options={plans.map((p) => ({ value: p.id, label: p.label }))}
          />
          <Field label="Budget Range (optional)" value={form.budgetRange} onChange={(v) => update("budgetRange", v)} placeholder="$1000, $5000+..." />
        </div>

        <TextField label="Additional notes (optional)" value={form.notes} onChange={(v) => update("notes", v)} />
      </div>
    </div>
  )
}

function StepSummary({ result, form, onContinue }: { result: any; form: FormState; onContinue: () => void }) {
  const selectedTemplate = marketplaceTemplates.find((t) => t.id === form.selectedTemplate)
  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Review Your Information</h2>
      <div className="space-y-4 mb-8">
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
          <p className="text-xs font-bold text-blue-900 mb-1">Intake ID</p>
          <p className="font-mono text-sm text-blue-700">{result.intakeId}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-xs font-bold text-slate-600 mb-1">Business</p>
            <p className="font-bold">{form.businessName}</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-xs font-bold text-slate-600 mb-1">Marketplace Type</p>
            <p className="font-bold">{selectedTemplate?.label}</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-xs font-bold text-slate-600 mb-1">Subdomain</p>
            <p className="font-bold">{form.desiredSubdomain}.edgemarketplacehub.com</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-xs font-bold text-slate-600 mb-1">Plan</p>
            <p className="font-bold">{form.plan.charAt(0).toUpperCase() + form.plan.slice(1)}</p>
          </div>
        </div>
      </div>
      <button onClick={onContinue} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
        Continue to Inventory → Payment
      </button>
    </div>
  )
}

function StepPayment({ result, form }: { result: any; form: FormState }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">✨</div>
      <h2 className="text-2xl font-black mb-2">Almost there!</h2>
      <p className="text-slate-600 mb-8">Add your products and proceed to payment.</p>
      <div className="rounded-xl bg-blue-50 border border-blue-200 p-6 mb-8">
        <p className="text-sm text-blue-700 mb-2">Intake ID: {result.intakeId}</p>
        <p className="text-sm text-blue-700">Subdomain: {form.desiredSubdomain}.edgemarketplacehub.com</p>
      </div>
      <Link href={`/builder/${result.intakeId}`} className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
        Go to Inventory & Payment →
      </Link>
    </div>
  )
}

function Field({ label, value, onChange, required = false, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-800">
      {label}
      {required && " *"}
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-4 py-2 outline-none ring-blue-200 transition focus:border-blue-500 focus:ring-4"
      />
    </label>
  )
}

function TextField({ label, value, onChange, required = false }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-800">
      {label}
      {required && " *"}
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="rounded-lg border border-slate-300 px-4 py-2 outline-none ring-blue-200 transition focus:border-blue-500 focus:ring-4"
      />
    </label>
  )
}

function SelectField({ label, value, onChange, options, required = false }: { label: string; value: string; onChange: (v: string) => void; options: Array<{ value: string; label: string }>; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-800">
      {label}
      {required && " *"}
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-4 py-2 outline-none ring-blue-200 transition focus:border-blue-500 focus:ring-4"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
