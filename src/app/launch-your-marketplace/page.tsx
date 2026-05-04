"use client"

import { FormEvent, useMemo, useState } from "react"
import Link from "next/link"
import { marketplaceTemplates } from "@/lib/intake/schema"

const plans = [
  { id: "launch", label: "Launch", description: "Starter implementation with guided setup." },
  { id: "pro", label: "Pro", description: "Custom domain, deeper setup, and launch support." },
  { id: "custom", label: "Custom", description: "Larger marketplace, migration, or special workflow." },
]

const initialForm = {
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  currentWebsite: "",
  desiredDomain: "",
  preferredSubdomain: "",
  selectedTemplate: "template-clothing-marketplace",
  plan: "launch",
  tagline: "",
  brandColors: "",
  socialLinks: "",
  offerSummary: "",
  catalogSize: "",
  fulfillmentNeeds: "",
  launchTimeline: "",
  budgetRange: "",
  notes: "",
}

type FormState = typeof initialForm

export default function MarketplaceIntakePage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<null | { intakeId: string; selectedTemplateRepo: string; preferredSubdomain: string }>(null)
  const [error, setError] = useState<string | null>(null)

  const selectedTemplate = useMemo(
    () => marketplaceTemplates.find((template) => template.id === form.selectedTemplate) || marketplaceTemplates[0],
    [form.selectedTemplate]
  )

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Please check the required fields and try again.")
      }

      setResult({
        intakeId: data.intakeId,
        selectedTemplateRepo: data.selectedTemplateRepo,
        preferredSubdomain: data.preferredSubdomain,
      })
      setForm(initialForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit intake right now.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <Link href="/" className="text-sm font-semibold text-blue-200 hover:text-white">
          ← Back to Edge Marketplace Hub
        </Link>

        <div className="grid gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
          <section className="space-y-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-300">Intake to implementation bridge</p>
              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Tell us what you want to launch. We turn it into a build plan.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                This form creates the structured intake record that connects the website to template selection, GitHub repo creation, Vercel preview deployment, and Cloudflare DNS launch.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Selected template</p>
              <h2 className="mt-3 text-2xl font-black">{selectedTemplate.label}</h2>
              <p className="mt-2 break-all text-sm text-blue-200">{selectedTemplate.repo}</p>
              <div className="mt-6 grid gap-3 text-sm text-slate-300">
                <div className="rounded-2xl bg-slate-900/80 p-4">1. Intake saved as structured data</div>
                <div className="rounded-2xl bg-slate-900/80 p-4">2. Operator review and approval</div>
                <div className="rounded-2xl bg-slate-900/80 p-4">3. GitHub template repo generated</div>
                <div className="rounded-2xl bg-slate-900/80 p-4">4. Vercel preview and Cloudflare DNS launch</div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl lg:p-8">
            {result ? (
              <div className="rounded-3xl border border-green-200 bg-green-50 p-6">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-green-700">Intake received</p>
                <h2 className="mt-3 text-3xl font-black">Bridge record created.</h2>
                <dl className="mt-6 space-y-3 text-sm">
                  <div><dt className="font-bold">Intake ID</dt><dd className="break-all text-slate-700">{result.intakeId}</dd></div>
                  <div><dt className="font-bold">Template repo</dt><dd className="break-all text-slate-700">{result.selectedTemplateRepo}</dd></div>
                  <div><dt className="font-bold">Suggested subdomain</dt><dd className="text-slate-700">{result.preferredSubdomain}.edgemarketplacehub.com</dd></div>
                </dl>
                <button onClick={() => setResult(null)} className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">
                  Submit another intake
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-600">Marketplace type</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {marketplaceTemplates.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => update("selectedTemplate", template.id)}
                        className={`rounded-2xl border p-4 text-left text-sm font-bold transition ${form.selectedTemplate === template.id ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 hover:border-blue-300"}`}
                      >
                        {template.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Business name" required value={form.businessName} onChange={(value) => update("businessName", value)} />
                  <Field label="Owner name" required value={form.ownerName} onChange={(value) => update("ownerName", value)} />
                  <Field label="Email" required type="email" value={form.email} onChange={(value) => update("email", value)} />
                  <Field label="Phone" value={form.phone} onChange={(value) => update("phone", value)} />
                  <Field label="Current website" value={form.currentWebsite} onChange={(value) => update("currentWebsite", value)} />
                  <Field label="Desired domain" value={form.desiredDomain} onChange={(value) => update("desiredDomain", value)} />
                  <Field label="Preferred subdomain" value={form.preferredSubdomain} onChange={(value) => update("preferredSubdomain", value)} placeholder="yourbrand" />
                  <Field label="Launch timeline" value={form.launchTimeline} onChange={(value) => update("launchTimeline", value)} placeholder="ASAP, 2 weeks, next month..." />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">Package</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {plans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => update("plan", plan.id)}
                        className={`rounded-2xl border p-4 text-left transition ${form.plan === plan.id ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}
                      >
                        <span className="block font-black">{plan.label}</span>
                        <span className="mt-2 block text-xs leading-5 text-slate-500">{plan.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Tagline" value={form.tagline} onChange={(value) => update("tagline", value)} />
                  <Field label="Brand colors" value={form.brandColors} onChange={(value) => update("brandColors", value)} placeholder="Blue, black, #2563eb..." />
                  <Field label="Social links" value={form.socialLinks} onChange={(value) => update("socialLinks", value)} />
                  <Field label="Budget range" value={form.budgetRange} onChange={(value) => update("budgetRange", value)} />
                </div>

                <TextField label="Products, services, or offers" required value={form.offerSummary} onChange={(value) => update("offerSummary", value)} />
                <TextField label="Catalog size / service count" value={form.catalogSize} onChange={(value) => update("catalogSize", value)} />
                <TextField label="Fulfillment, booking, course, or download needs" value={form.fulfillmentNeeds} onChange={(value) => update("fulfillmentNeeds", value)} />
                <TextField label="Extra notes" value={form.notes} onChange={(value) => update("notes", value)} />

                {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

                <button disabled={submitting} className="w-full rounded-full bg-blue-600 px-6 py-4 text-base font-black text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                  {submitting ? "Creating intake record..." : "Submit marketplace intake"}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

function Field({ label, value, onChange, required, type = "text", placeholder }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string; placeholder?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-800">
      {label}{required ? " *" : ""}
      <input required={required} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 font-medium outline-none ring-blue-200 transition focus:border-blue-500 focus:ring-4" />
    </label>
  )
}

function TextField({ label, value, onChange, required }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-800">
      {label}{required ? " *" : ""}
      <textarea required={required} value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="rounded-xl border border-slate-200 px-4 py-3 font-medium outline-none ring-blue-200 transition focus:border-blue-500 focus:ring-4" />
    </label>
  )
}
