"use client"

import { useSearchParams } from "next/navigation"
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings, 
  Globe, 
  ExternalLink, 
  Plus, 
  Bell, 
  Search,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Rocket
} from "lucide-react"
import { Button, Input } from "@medusajs/ui"
import Link from "next/link"
import { Suspense } from "react"

function DashboardContent() {
  const searchParams = useSearchParams()
  const businessName = searchParams.get("businessName") || "Your Store"
  const brandColor = searchParams.get("brandColor") || "#2563eb"
  const tagline = searchParams.get("tagline") || "Edge Marketplace"

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 flex flex-col shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: brandColor }}>
              {businessName.charAt(0)}
            </div>
            <div className="overflow-hidden">
               <h1 className="text-white font-bold text-sm truncate">{businessName}</h1>
               <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { name: "Overview", icon: <LayoutDashboard className="h-4 w-4" />, active: true },
              { name: "Orders", icon: <ShoppingBag className="h-4 w-4" /> },
              { name: "Customers", icon: <Users className="h-4 w-4" /> },
              { name: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
              { name: "Global Edge", icon: <Globe className="h-4 w-4" /> },
              { name: "Settings", icon: <Settings className="h-4 w-4" /> },
            ].map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  item.active ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6">
           <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Plan</p>
              <p className="text-white text-xs font-bold mb-3">Growth Engine</p>
              <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden mb-2">
                 <div className="h-full bg-blue-600 w-1/3" />
              </div>
              <p className="text-[10px] text-slate-400">12 / 50 Products used</p>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
           <div className="flex items-center gap-4 flex-1">
              <div className="relative w-96">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <Input className="pl-10 h-10 bg-slate-50 border-none rounded-full text-sm" placeholder="Search orders, products, or docs..." />
              </div>
           </div>
           <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                 <Bell className="h-5 w-5" />
                 <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-300">
                 DP
              </div>
           </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
           {/* Welcome Banner */}
           <div className="mb-10 flex items-center justify-between">
              <div>
                 <h2 className="text-2xl font-bold text-slate-900">Welcome to your dashboard, {businessName.split(' ')[0]}!</h2>
                 <p className="text-slate-500 mt-1">Your marketplace is live and ready for traffic.</p>
              </div>
              <div className="flex gap-3">
                 <Link href={`/us/store`} target="_blank">
                    <Button variant="secondary" className="rounded-xl flex items-center gap-2">
                       View Store
                       <ExternalLink className="h-4 w-4" />
                    </Button>
                 </Link>
                 <Button className="rounded-xl flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800">
                    <Plus className="h-4 w-4" />
                    New Product
                 </Button>
              </div>
           </div>

           {/* Setup Progress */}
           <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 bg-blue-600 w-[65%]" />
              <div className="flex items-start justify-between mb-8">
                 <div>
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                       <Rocket className="h-5 w-5 text-blue-600" />
                       Launch Checklist
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">65% complete — You&apos;re almost there!</p>
                 </div>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                 {[
                   { name: "Instance Deployed", done: true },
                   { name: "Brand Applied", done: true },
                   { name: "Stripe Connected", done: true },
                   { name: "Custom Domain", done: false },
                 ].map((step) => (
                   <div key={step.name} className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${step.done ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                      {step.done ? <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" /> : <AlertCircle className="h-5 w-5 text-slate-400 shrink-0" />}
                      <span className={`text-xs font-bold ${step.done ? 'text-blue-900' : 'text-slate-600'}`}>{step.name}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Stats Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {[
                { name: "Total Sales", value: "$0.00", trend: "+0%", icon: <CreditCard className="h-5 w-5 text-green-600" /> },
                { name: "Total Orders", value: "0", trend: "+0%", icon: <ShoppingBag className="h-5 w-5 text-blue-600" /> },
                { name: "Edge Latency", value: "14ms", trend: "Optimal", icon: <Globe className="h-5 w-5 text-purple-600" /> },
              ].map((stat) => (
                <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">{stat.icon}</div>
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
                   </div>
                   <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                   <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
              ))}
           </div>

           {/* AI Intake Notice */}
           <div className="bg-blue-600 rounded-2xl p-8 text-white flex items-center justify-between relative overflow-hidden group mb-10">
              <div className="relative z-10 max-w-xl">
                 <h3 className="text-xl font-bold mb-2">AI Product Engine is processing...</h3>
                 <p className="text-blue-100 text-sm leading-relaxed">
                    We&apos;re currently parsing the products you shared. They will appear in your catalog within the next few minutes. Feel free to explore the dashboard while we work!
                 </p>
              </div>
              <div className="relative z-10 shrink-0">
                 <Button className="bg-white text-blue-600 font-bold hover:bg-blue-50 rounded-xl px-6 shadow-xl shadow-blue-900/20">
                    View Catalog Status
                 </Button>
              </div>
              {/* Decorative background circle */}
              <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-blue-500 rounded-full blur-3xl opacity-50 transition-transform group-hover:scale-110" />
           </div>

           {/* Bottom Grid: Activity & Insights */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                 <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4 text-slate-400" />
                    Performance Over Time
                 </h3>
                 <div className="h-64 flex items-end gap-2 px-4">
                    {[40, 70, 45, 90, 65, 80, 50, 85, 95, 75, 60, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-50 rounded-t-sm relative group">
                         <div 
                           className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-sm transition-all duration-1000" 
                           style={{ height: `${h}%`, opacity: 0.3 + (h/100) * 0.7 }}
                         />
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {h}% capacity
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>12:00 AM</span>
                    <span>6:00 AM</span>
                    <span>12:00 PM</span>
                    <span>6:00 PM</span>
                 </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                 <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Bell className="h-4 w-4 text-slate-400" />
                    Live Activity
                 </h3>
                 <div className="space-y-6">
                    {[
                      { time: "Just now", msg: "AI Product Engine extracted 12 items", icon: <Sparkles className="h-4 w-4 text-yellow-500" /> },
                      { time: "2 mins ago", msg: "Edge Node deployed in London", icon: <Globe className="h-4 w-4 text-blue-500" /> },
                      { time: "5 mins ago", msg: "Stripe Connect identity verified", icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> },
                      { time: "10 mins ago", msg: "Business instance provisioned", icon: <Zap className="h-4 w-4 text-purple-500" /> },
                    ].map((activity, i) => (
                      <div key={i} className="flex gap-4">
                         <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                            {activity.icon}
                         </div>
                         <div>
                            <p className="text-xs font-medium text-slate-900">{activity.msg}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{activity.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <Button variant="secondary" className="w-full mt-8 rounded-xl text-xs font-bold border-slate-100">
                    View Full Audit Log
                 </Button>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}

export default function MerchantDashboard() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-slate-50">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
