import { Check, ShieldCheck, Zap, Globe, Sparkles, ShoppingBag, Terminal, ArrowRight, MousePointer2, CreditCard, Package, Layout } from "lucide-react"
import { Button } from "@medusajs/ui"
import Link from "next/link"

export default function HubPricing() {
  return (
    <section id="pricing" className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-blue-600 mb-4">The Comparison</h2>
          <p className="text-4xl font-extrabold tracking-tight text-slate-900">🚀 Choose how you grow</p>
        </div>

        {/* 1. Integrated Comparison Matrix & CTAs */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="bg-slate-50 rounded-[2.5rem] p-1 border border-slate-100 shadow-sm overflow-hidden">
             {/* Header Row (Plan Names + CTAs) */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white rounded-t-[2.2rem]">
                <div className="p-8 hidden md:flex items-end text-sm font-bold text-slate-400 uppercase tracking-widest">
                   Plan Features
                </div>
                
                {/* Launch Header */}
                <div className="p-8 border-l border-slate-50 text-center flex flex-col items-center">
                   <h3 className="text-xl font-black text-slate-900 mb-2">🚀 Launch</h3>
                   <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-black text-slate-900">$0</span>
                      <span className="text-slate-400 font-medium">/mo</span>
                   </div>
                   <Link href="/start" className="w-full">
                      <Button variant="secondary" className="w-full h-12 rounded-xl font-bold">
                         Start selling
                      </Button>
                   </Link>
                </div>

                {/* Pro Header */}
                <div className="p-8 border-l border-slate-50 text-center flex flex-col items-center bg-slate-900 rounded-tr-[2.2rem]">
                   <h3 className="text-xl font-black text-white mb-2">⚡ Pro</h3>
                   <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-black text-white">$99</span>
                      <span className="text-slate-500 font-medium">/mo</span>
                   </div>
                   <Link href="/start" className="w-full">
                      <Button className="w-full h-12 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-500 border-none shadow-lg shadow-blue-900/20">
                         Upgrade to Pro
                      </Button>
                   </Link>
                </div>
             </div>

             {/* Matrix Rows */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-slate-100">
                <div className="p-6 md:p-8 flex items-center gap-2 font-bold text-slate-900 bg-white md:bg-transparent">
                   <CreditCard className="h-4 w-4 text-blue-600" />
                   💰 Keep more of every sale
                </div>
                <div className="p-6 md:p-8 text-sm text-slate-600 md:border-l border-slate-100 flex flex-col items-center justify-center text-center">
                   <div>
                      <span className="md:hidden font-bold mr-2 text-slate-900">Launch:</span>
                      5% per sale
                   </div>
                   <p className="mt-2 text-[10px] text-slate-400 font-medium italic leading-tight max-w-[150px]">
                      Most sellers upgrade once they start seeing consistent sales
                   </p>
                </div>
                <div className="p-6 md:p-8 text-sm text-slate-900 font-bold md:border-l border-slate-100 flex flex-col items-center justify-center bg-slate-900/5 md:bg-slate-900 text-white md:text-blue-400">
                   <div>
                      <span className="md:hidden font-normal mr-2 text-slate-400">Pro:</span>
                      1% per sale
                   </div>
                   <p className="text-[10px] text-slate-500 font-medium mt-1 italic">
                      Pro pays for itself at ~$2,500/mo in sales
                   </p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-slate-100">
                <div className="p-6 md:p-8 flex items-center gap-2 font-bold text-slate-900 bg-white md:bg-transparent">
                   <Globe className="h-4 w-4 text-blue-600" />
                   🌐 Own your brand
                </div>
                <div className="p-6 md:p-8 text-sm text-slate-600 md:border-l border-slate-100 flex flex-col items-center justify-center text-center">
                   <div>
                      <span className="md:hidden font-bold mr-2 text-slate-900">Launch:</span>
                      Edge subdomain
                   </div>
                   <p className="mt-1 text-[10px] text-slate-400 font-medium italic truncate max-w-[180px]">
                      yourcompany.edgemarketplacehub.com
                   </p>
                </div>
                <div className="p-6 md:p-8 text-sm text-slate-900 font-bold md:border-l border-slate-100 flex items-center justify-center bg-slate-900/5 md:bg-slate-900 text-white md:text-slate-300">
                   <span className="md:hidden font-normal mr-2 text-slate-400">Pro:</span>
                   <div className="text-center">
                      Custom domain + your brand only
                      <p className="text-[10px] text-blue-400 font-bold mt-1 uppercase tracking-tighter">
                         (no platform branding)
                      </p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-slate-100">
                <div className="p-6 md:p-8 flex items-center gap-2 font-bold text-slate-900 bg-white md:bg-transparent">
                   <MousePointer2 className="h-4 w-4 text-blue-600" />
                   ⚡ Go live
                </div>
                <div className="p-6 md:p-8 text-sm text-slate-600 md:border-l border-slate-100 flex flex-col items-center justify-center text-center">
                   <div>
                      <span className="md:hidden font-bold mr-2 text-slate-900">Launch:</span>
                      $5 to go live
                   </div>
                   <p className="text-[10px] text-slate-400 italic mt-1">(refunded after your first sale)</p>
                </div>
                <div className="p-6 md:p-8 text-sm text-slate-900 font-bold md:border-l border-slate-100 flex items-center justify-center bg-slate-900/5 md:bg-slate-900 text-white md:text-slate-300">
                   <span className="md:hidden font-normal mr-2 text-slate-400">Pro:</span>
                   Go live instantly — no activation
                </div>
             </div>

             {/* Shared Features Section (Spanning Launch & Pro) */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-slate-100 bg-white">
                <div className="p-1 hidden md:flex">
                   <div className="w-full bg-slate-50 rounded-bl-[2.2rem] flex flex-col items-center justify-center text-center p-8 border-r border-slate-100">
                      <ShieldCheck className="h-8 w-8 text-blue-600 mb-4" />
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Core Platform</h4>
                      <p className="text-[10px] text-slate-400 mt-2 italic font-medium">Included in both tiers</p>
                   </div>
                </div>
                
                <div className="md:col-span-2 p-8 md:p-12 border-l border-slate-100 flex items-center">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 w-full">
                      {[
                        { icon: <Zap className="h-5 w-5" />, text: "15-minute guided setup flow" },
                        { icon: <Layout className="h-5 w-5" />, text: "Core marketplace design templates" },
                        { icon: <ShoppingBag className="h-5 w-5" />, text: "Unlimited products & active listings" },
                        { icon: <Globe className="h-5 w-5" />, text: "Global edge-hosted infrastructure" },
                        { icon: <CreditCard className="h-5 w-5" />, text: "Built-in checkout & merchant payouts" },
                        { icon: <Terminal className="h-5 w-5" />, text: "Basic sales dashboard & analytics" },
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-5 group">
                           <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shrink-0 border border-blue-100 shadow-sm shadow-blue-900/5">
                              {feature.icon}
                           </div>
                           <span className="text-md font-extrabold text-slate-800 leading-tight">
                              {feature.text}
                           </span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  )
}
