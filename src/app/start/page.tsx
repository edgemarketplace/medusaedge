"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Label, Textarea } from "@medusajs/ui"
import { Check, CheckCircle2, Loader2, Sparkles, Layout, Store, Palette, Zap, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"

const productTemplates = [
  { id: "modern-commerce", name: "Modern Commerce", icon: <Layout className="h-5 w-5" />, color: "bg-slate-900" },
  { id: "industrial-supply", name: "Industrial Supply", icon: <Store className="h-5 w-5" />, color: "bg-zinc-700" },
  { id: "boutique-luxury", name: "Boutique Luxury", icon: <Palette className="h-5 w-5" />, color: "bg-stone-200" },
]

const serviceTemplates = [
  { id: "professional-agency", name: "Professional Agency", icon: <Layout className="h-5 w-5" />, color: "bg-blue-600" },
  { id: "tech-consultant", name: "Tech Consultant", icon: <Sparkles className="h-5 w-5" />, color: "bg-slate-800" },
  { id: "creative-studio", name: "Creative Studio", icon: <Palette className="h-5 w-5" />, color: "bg-purple-600" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    template: "modern-commerce",
    tagline: "",
    brandColor: "#2563eb",
    logo: null,
    products: "",
    businessType: "individual",
    taxIdLast4: "",
    accountNumber: "",
    routingNumber: "",
    plan: "launch", // launch | pro
  })
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingStatus, setLoadingStatus] = useState("Initializing...")

  useEffect(() => {
    if (step === 6) {
      const statuses = [
        { progress: 10, msg: "Allocating edge nodes..." },
        { progress: 25, msg: "Initializing secure database cluster..." },
        { progress: 40, msg: "Configuring multi-tenant routing..." },
        { progress: 55, msg: "Deploying Medusa backend instance..." },
        { progress: 70, msg: "Applying brand identity tokens..." },
        { progress: 85, msg: "Syncing Stripe Connect account..." },
        { progress: 95, msg: "Injecting AI product engine..." },
        { progress: 100, msg: "Your marketplace is ready!" },
      ]

      let currentIdx = 0
      const interval = setInterval(() => {
        if (currentIdx < statuses.length) {
          setLoadingProgress(statuses[currentIdx].progress)
          setLoadingStatus(statuses[currentIdx].msg)
          currentIdx++
        } else {
          clearInterval(interval)
          setTimeout(() => setStep(7), 1000)
        }
      }, 1500)

      return () => clearInterval(interval)
    }
  }, [step])

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  const handleComplete = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/tenants/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to dashboard with the real tenant data
        const params = new URLSearchParams({
          tenantId: data.tenantId,
          businessName: formData.businessName,
          brandColor: formData.brandColor,
          tagline: formData.tagline,
          subdomain: data.subdomain,
          previewUrl: data.previewUrl,
          planType: formData.plan
        })
        router.push(`/dashboard?${params.toString()}`)
      } else {
        console.error("Onboarding failed:", data.error)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Onboarding API error:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100">
          <div 
            className="h-full bg-blue-600 transition-all duration-500" 
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>

        <div className="p-8 sm:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">Let&apos;s get started</h1>
                <p className="mt-2 text-slate-500">We just need a few basics to spin up your instance.</p>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input 
                    id="businessName" 
                    placeholder="Acme Co." 
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>
              </div>
              <Button 
                className="w-full h-12 text-lg rounded-xl" 
                onClick={nextStep}
                disabled={!formData.name || !formData.email || !formData.businessName}
              >
                Next Step
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">Choose your vibe</h1>
                <p className="mt-2 text-slate-500">Select a template that matches your business model.</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Product Templates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {productTemplates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setFormData({ ...formData, template: t.id })}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                          formData.template === t.id 
                            ? "border-blue-600 bg-blue-50" 
                            : "border-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <div className={`h-8 w-8 rounded-lg ${t.color} flex items-center justify-center mb-2 shadow-sm text-white`}>
                          {t.icon}
                        </div>
                        <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
                        <Link 
                          href={`/demo/${t.id}`} 
                          target="_blank"
                          className="mt-2 block text-[10px] text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Preview Demo
                        </Link>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Service Templates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {serviceTemplates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setFormData({ ...formData, template: t.id })}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                          formData.template === t.id 
                            ? "border-blue-600 bg-blue-50" 
                            : "border-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <div className={`h-8 w-8 rounded-lg ${t.color} flex items-center justify-center mb-2 shadow-sm text-white`}>
                          {t.icon}
                        </div>
                        <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
                        <Link 
                          href={`/demo/${t.id}`} 
                          target="_blank"
                          className="mt-2 block text-[10px] text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Preview Demo
                        </Link>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="secondary" className="flex-1 h-12 rounded-xl" onClick={prevStep}>Back</Button>
                <Button className="flex-[2] h-12 rounded-xl" onClick={nextStep}>Next: Branding</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">Make it yours</h1>
                <p className="mt-2 text-slate-500">Add your logo and choose your brand colors.</p>
              </div>
              
              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="tagline">Store Tagline</Label>
                  <Input 
                    id="tagline" 
                    placeholder="e.g. The best widgets in town" 
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Primary Brand Color</Label>
                  <div className="flex gap-3">
                    {["#2563eb", "#7c3aed", "#db2777", "#16a34a", "#ea580c", "#1e293b"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setFormData({ ...formData, brandColor: color })}
                        className={`h-10 w-10 rounded-full border-2 transition-all ${
                          formData.brandColor === color ? "border-slate-900 scale-110 shadow-md" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <div className="relative">
                       <input 
                         type="color" 
                         value={formData.brandColor}
                         onChange={(e) => setFormData({ ...formData, brandColor: e.target.value })}
                         className="h-10 w-10 rounded-full border-2 border-transparent bg-slate-100 cursor-pointer"
                       />
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Store Logo</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer group">
                    <div className="mx-auto h-12 w-12 text-slate-400 group-hover:text-blue-500 mb-2">
                      <Layout className="h-full w-full" />
                    </div>
                    <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-400 mt-1">SVG, PNG, or JPG (max 2MB)</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="secondary" className="flex-1 h-12 rounded-xl" onClick={prevStep}>Back</Button>
                <Button className="flex-[2] h-12 rounded-xl" onClick={nextStep}>Next: Financial Setup</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">Get Paid Instantly</h1>
                <p className="mt-2 text-slate-500">We use Stripe to ensure secure, rapid payouts directly to your bank account.</p>
              </div>
              
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="grid gap-2">
                  <Label>Business Type</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setFormData({...formData, businessType: 'individual'})}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${formData.businessType === 'individual' ? 'border-blue-600 bg-white shadow-sm' : 'border-transparent text-slate-500'}`}
                    >
                      Individual / Sole Prop
                    </button>
                    <button 
                      onClick={() => setFormData({...formData, businessType: 'company'})}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${formData.businessType === 'company' ? 'border-blue-600 bg-white shadow-sm' : 'border-transparent text-slate-500'}`}
                    >
                      Company / LLC
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="taxId">Tax ID (Last 4)</Label>
                    <Input 
                      id="taxId" 
                      placeholder="SSN or EIN" 
                      maxLength={4}
                      value={formData.taxIdLast4}
                      onChange={(e) => setFormData({...formData, taxIdLast4: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="routing">Routing Number</Label>
                    <Input 
                      id="routing" 
                      placeholder="9 digits" 
                      value={formData.routingNumber}
                      onChange={(e) => setFormData({...formData, routingNumber: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="account">Bank Account Number</Label>
                  <Input 
                    id="account" 
                    placeholder="Enter account number" 
                    type="password"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  />
                </div>
                <p className="text-[10px] text-slate-400 text-center italic">
                  Data is encrypted and sent directly to Stripe. Edge Marketplace Hub does not store full financial details.
                </p>
              </div>

              <div className="flex gap-4">
                <Button variant="secondary" className="flex-1 h-12 rounded-xl" onClick={prevStep}>Back</Button>
                <Button className="flex-[2] h-12 rounded-xl" onClick={nextStep}>Choose Your Plan</Button>
              </div>
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
                   onClick={() => setFormData({...formData, plan: 'launch'})}
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
                       &quot;Start selling today with zero upfront risk.&quot; <br/>
                       <span className="italic text-slate-400 mt-1 block">Note: Activation required to go live.</span>
                    </p>
                 </button>

                 <button 
                   onClick={() => setFormData({...formData, plan: 'pro'})}
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
                       &quot;Built for serious sellers scaling volume.&quot;
                    </p>
                 </button>
              </div>

              <div className="flex gap-4">
                <Button variant="secondary" className="flex-1 h-12 rounded-xl" onClick={prevStep}>Back</Button>
                <Button className="flex-[2] h-12 rounded-xl shadow-lg shadow-blue-200" onClick={nextStep}>
                   {formData.plan === 'pro' ? 'Start Pro Subscription' : 'Continue to Activation'}
                </Button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-8 text-center animate-in fade-in duration-500 py-12">
              <div className="relative mx-auto h-32 w-32">
                <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"
                  style={{ animationDuration: '2s' }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-12 w-12 text-blue-600 fill-blue-600 animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Creating Your Space</h1>
                <p className="mt-4 text-lg font-mono text-blue-600 h-8">{loadingStatus}</p>
              </div>
              <div className="max-w-xs mx-auto bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500" 
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
                  <Sparkles className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                  The Magic Touch
                </h1>
                <p className="mt-2 text-slate-500">List your products or services. Our AI will parse and categorize them for you.</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="products">Product/Service List</Label>
                <Textarea 
                  id="products" 
                  placeholder="e.g. 
- Blue Widget ($19.99): High quality plastic
- Service Call ($50): Local area only
- Bulk Package: 50 items for $500" 
                  className="h-48 rounded-xl resize-none"
                  value={formData.products}
                  onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                />
                <p className="text-xs text-slate-400">Just type it out naturally. We&apos;ll handle the rest.</p>
              </div>
              <Button 
                className="w-full h-12 text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                onClick={handleComplete}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Finalizing Your Space...
                  </>
                ) : (
                  <>
                    Go To My Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
