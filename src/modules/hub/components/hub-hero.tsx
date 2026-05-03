import Link from "next/link"
import { Button } from "@medusajs/ui"
import { ArrowRight, Clock, Zap, ShieldCheck } from "lucide-react"

export default function HubHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-80">
        <svg viewBox="0 0 1108 632" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-1/2 -ml-[500px] w-[1108px] opacity-20">
          <circle cx="554" cy="10" r="554" fill="url(#paint0_linear)" />
          <defs>
            <linearGradient id="paint0_linear" x1="554" y1="-544" x2="554" y2="564" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
              The fastest way to sell online
            </span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
            Do you have <span className="text-blue-600">15 minutes</span> to launch your business?
          </h1>
          <p className="mt-8 text-lg leading-8 text-slate-600">
            If you have a product or service to sell, Edge Marketplace Hub is the solution you&apos;ve been looking for. No tech skills required. No stress. Just sales.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/start">
              <Button size="large" className="rounded-full px-8 h-14 text-lg">
                Start My 15-Minute Launch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#templates" className="text-sm font-semibold leading-6 text-slate-900">
              View Templates <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-20 relative animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="relative mx-auto max-w-5xl rounded-3xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:rounded-[2.5rem] lg:p-4 transition-all hover:scale-[1.02] duration-500 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1551288049-bbda3865c170?w=1600&q=80&fit=crop"
              alt="Edge Marketplace Dashboard"
              className="w-full rounded-2xl shadow-2xl ring-1 ring-slate-900/10 bg-white"
            />
            {/* Floating badges for 'Magic' feel */}
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Store Live</p>
                  <p className="text-[10px] text-slate-500">Global edge nodes active</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Secure Database</p>
                  <p className="text-[10px] text-slate-500">Automated cluster setup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature quick bits */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Zero Technical Effort</h3>
            <p className="mt-2 text-sm text-slate-600 text-center">We handle the servers, databases, and deployment. You just bring the product.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">AI-Powered Catalog</h3>
            <p className="mt-2 text-sm text-slate-600 text-center">Send us a list of your products, and our AI builds your store magically.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="h-12 w-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Enterprise Ready</h3>
            <p className="mt-2 text-sm text-slate-600 text-center">Built on high-performance edge nodes for global speed and reliability.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
