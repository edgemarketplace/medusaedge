"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@medusajs/ui"
import { ArrowLeft, Monitor, Smartphone, Tablet, ShoppingBag, Search, Menu, User, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

const templateDetails: Record<string, { 
  name: string, 
  color: string, 
  textColor: string,
  description: string,
  heroImage: string,
  items: string[] 
}> = {
  "modern-commerce": { 
    name: "Modern Commerce", 
    color: "bg-white", 
    textColor: "text-slate-900",
    description: "The minimalist standard for modern retail.",
    heroImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80",
    items: ["Essentials Collection", "New Arrivals", "Best Sellers"]
  },
  "industrial-supply": { 
    name: "Industrial Supply", 
    color: "bg-slate-100", 
    textColor: "text-zinc-900",
    description: "Built for performance and reliability.",
    heroImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80",
    items: ["Heavy Machinery", "Safety Gear", "Precision Tools"]
  },
  "boutique-luxury": { 
    name: "Boutique Luxury", 
    color: "bg-stone-50", 
    textColor: "text-stone-900",
    description: "Curated elegance for premium brands.",
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
    items: ["The Summer Edit", "Signature Fragrance", "Handcrafted Jewelry"]
  },
  "professional-agency": { 
    name: "Professional Agency", 
    color: "bg-blue-600", 
    textColor: "text-white",
    description: "Your strategic partner in digital growth.",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    items: ["Consulting", "Strategy", "Implementation"]
  },
  "tech-consultant": { 
    name: "Tech Consultant", 
    color: "bg-slate-950", 
    textColor: "text-white",
    description: "Architecting the future of software.",
    heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80",
    items: ["Cloud Architecture", "Cybersecurity", "AI Integration"]
  },
  "creative-studio": { 
    name: "Creative Studio", 
    color: "bg-purple-600", 
    textColor: "text-white",
    description: "Where imagination meets digital reality.",
    heroImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&q=80",
    items: ["Visual Identity", "Digital Experience", "Motion Design"]
  },
}

export default function TemplateDemoPage() {
  const params = useParams()
  const router = useRouter()
  const templateId = params.templateId as string
  const details = templateDetails[templateId] || templateDetails["modern-commerce"]

  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Platform Header */}
      <div className="h-14 bg-slate-900 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-[10px]">EM</div>
            <span className="text-white text-xs font-bold tracking-tight uppercase">Edge Hub Preview</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button className="p-1.5 bg-slate-700 shadow-sm rounded text-white"><Monitor className="h-3.5 w-3.5" /></button>
          <button className="p-1.5 text-slate-500 hover:text-slate-300"><Tablet className="h-3.5 w-3.5" /></button>
          <button className="p-1.5 text-slate-500 hover:text-slate-300"><Smartphone className="h-3.5 w-3.5" /></button>
        </div>

        <Link href="/start">
          <Button className="h-8 text-[11px] px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all hover:scale-105 active:scale-95">
            Use This Template
          </Button>
        </Link>
      </div>

      {/* Demo Browser Viewport */}
      <div className="flex-1 overflow-auto bg-slate-200 p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-slate-300">
          
          {/* Browser Navigation Bar */}
          <header className={`h-20 border-b border-slate-100 px-8 flex items-center justify-between ${details.color} ${details.textColor} sticky top-0 z-40 transition-colors duration-500`}>
             <div className="flex items-center gap-10">
                <div className="font-black text-xl tracking-tighter uppercase italic">
                  {details.name.split(' ')[0]}<span className="opacity-50 tracking-normal">{details.name.split(' ')[1]}</span>
                </div>
                <nav className="hidden lg:flex items-center gap-6 text-sm font-medium opacity-70">
                   <a href="#" className="hover:opacity-100 transition-opacity">Shop</a>
                   <a href="#" className="hover:opacity-100 transition-opacity">Categories</a>
                   <a href="#" className="hover:opacity-100 transition-opacity">Collections</a>
                   <a href="#" className="hover:opacity-100 transition-opacity">About</a>
                </nav>
             </div>
             <div className="flex items-center gap-5">
                <Search className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer" />
                <User className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer" />
                <div className="relative">
                   <ShoppingBag className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer" />
                   <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-blue-600 text-white text-[8px] flex items-center justify-center rounded-full font-bold">0</span>
                </div>
                <Menu className="h-5 w-5 lg:hidden opacity-60" />
             </div>
          </header>

          {/* Template Content */}
          <main className="flex-1 overflow-y-auto scroll-smooth">
            
            {/* Hero Section */}
            <section className="relative h-[600px] overflow-hidden flex items-center">
               <img 
                 src={details.heroImage} 
                 alt="Hero"
                 className="absolute inset-0 h-full w-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
               <div className="relative z-10 px-12 md:px-20 max-w-2xl text-white">
                  <div className="h-1 w-20 bg-blue-600 mb-8" />
                  <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight mb-6">
                    {details.description}
                  </h1>
                  <p className="text-lg opacity-80 mb-10 max-w-lg">
                    Experience the next generation of digital commerce. Fully optimized, insanely fast, and built for your business identity.
                  </p>
                  <div className="flex gap-4">
                     <Button className="h-14 px-8 rounded-none bg-white text-black font-bold hover:bg-slate-200 uppercase tracking-widest text-xs">
                        Shop Collection
                     </Button>
                     <Button variant="secondary" className="h-14 px-8 rounded-none border-2 border-white/20 bg-white/5 backdrop-blur-md text-white font-bold hover:bg-white/10 uppercase tracking-widest text-xs">
                        Learn More
                     </Button>
                  </div>
               </div>
            </section>

            {/* Featured Grid */}
            <section className="py-24 px-8 md:px-20 bg-white">
               <div className="flex items-end justify-between mb-16">
                  <div>
                     <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">Featured Selection</h2>
                     <h3 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Current Originals</h3>
                  </div>
                  <a href="#" className="text-sm font-bold border-b-2 border-blue-600 pb-1">View All Originals</a>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {details.items.map((item, i) => (
                    <div key={i} className="group cursor-pointer">
                       <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden mb-6">
                          <img 
                            src={`https://images.unsplash.com/photo-${1500000000000 + (i * 1000000)}?w=800&q=80`}
                            alt={item}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">New</div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                             <Button className="w-full bg-white text-black font-bold rounded-none uppercase text-[10px] tracking-widest">Quick Add</Button>
                          </div>
                       </div>
                       <h4 className="font-bold text-slate-900 mb-1">{item}</h4>
                       <div className="flex items-center gap-4 text-sm">
                          <span className="font-bold text-slate-900">$129.00</span>
                          <span className="text-slate-400 line-through">$189.00</span>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Testimonial / Brand Bar */}
            <section className={`py-20 ${details.color} ${details.textColor} text-center transition-colors duration-500`}>
               <div className="max-w-4xl mx-auto px-8">
                  <div className="flex justify-center gap-1 mb-8">
                     {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-current text-blue-500" />)}
                  </div>
                  <blockquote className="text-2xl md:text-4xl font-serif italic mb-10 leading-tight">
                    &quot;Edge Hub has transformed how we present our brand. The speed and aesthetic control are unmatched in the industry today.&quot;
                  </blockquote>
                  <div className="font-bold uppercase tracking-widest text-xs opacity-60">— Alex Rivera, Creative Director</div>
               </div>
            </section>

            {/* Footer Mock */}
            <footer className="bg-slate-950 text-white py-24 px-8 md:px-20">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 border-b border-white/10 pb-20">
                  <div className="col-span-2">
                     <div className="font-black text-2xl tracking-tighter uppercase mb-6 italic">
                       {details.name.split(' ')[0]}<span className="opacity-50 tracking-normal">{details.name.split(' ')[1]}</span>
                     </div>
                     <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
                        Redefining the standards of digital interaction through high-fidelity design and performant engineering.
                     </p>
                  </div>
                  <div>
                     <h5 className="font-bold uppercase text-xs tracking-widest mb-6">Explore</h5>
                     <ul className="space-y-4 text-sm text-slate-400">
                        <li><a href="#" className="hover:text-white transition-colors">Catalog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Stories</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Archives</a></li>
                     </ul>
                  </div>
                  <div>
                     <h5 className="font-bold uppercase text-xs tracking-widest mb-6">Support</h5>
                     <ul className="space-y-4 text-sm text-slate-400">
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                     </ul>
                  </div>
               </div>
               <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <p>© 2026 {details.name}. All Rights Reserved.</p>
                  <div className="flex gap-8">
                     <a href="#">Instagram</a>
                     <a href="#">Twitter</a>
                     <a href="#">LinkedIn</a>
                  </div>
               </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
