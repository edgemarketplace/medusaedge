import { Layout, Palette, Store, Sparkles } from "lucide-react"
import Link from "next/link"

const productTemplates = [
  {
    id: "modern-commerce",
    name: "Modern Commerce",
    description: "High-performance storefront for physical goods and retail.",
    image: "https://images.unsplash.com/photo-1503380781088-fa00c8ad46c1?w=800&q=80&fit=crop",
    icon: <Layout className="h-6 w-6 text-white" />,
  },
  {
    id: "industrial-supply",
    name: "Industrial Supply",
    description: "Rugged layout for parts, tools, and B2B supplies.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&fit=crop",
    icon: <Store className="h-6 w-6 text-white" />,
  },
  {
    id: "boutique-luxury",
    name: "Boutique Luxury",
    description: "Elegant, visual-heavy design for premium brands.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fit=crop",
    icon: <Palette className="h-6 w-6 text-white" />,
  },
]

const serviceTemplates = [
  {
    id: "professional-agency",
    name: "Professional Agency",
    description: "Clean, trust-focused layout for consulting and B2B services.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop",
    icon: <Layout className="h-6 w-6 text-white" />,
  },
  {
    id: "tech-consultant",
    name: "Tech Consultant",
    description: "Modern, dark-themed layout for software and digital services.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80&fit=crop",
    icon: <Sparkles className="h-6 w-6 text-white" />,
  },
  {
    id: "creative-studio",
    name: "Creative Studio",
    description: "Dynamic, animation-rich portfolio for design and creative work.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80&fit=crop",
    icon: <Palette className="h-6 w-6 text-white" />,
  },
]

export default function TemplateShowcase() {
  return (
    <section id="templates" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Templates</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choose Your Business Identity
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Pick a foundation that matches your brand. You can customize everything later, or let us handle it.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {/* Products Section */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-blue-600 pl-4">Product Templates</h3>
            <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {productTemplates.map((template) => (
                <div key={template.id} className="group relative flex flex-col items-start transition-all">
                  <div className="w-full bg-slate-200 rounded-t-xl px-4 py-2 flex items-center gap-1.5 border border-slate-200 border-b-0">
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                  </div>
                  <div className="aspect-[16/10] w-full rounded-b-2xl overflow-hidden relative border border-slate-200 shadow-sm transition-all group-hover:shadow-xl group-hover:border-blue-400">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                       <Link 
                         href={`/demo/${template.id}`}
                         className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                       >
                         Live Preview
                         <Sparkles className="h-4 w-4 text-blue-600" />
                       </Link>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-bold text-slate-900">{template.name}</h4>
                    <p className="mt-1 text-sm text-slate-500">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-purple-600 pl-4">Service Templates</h3>
            <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {serviceTemplates.map((template) => (
                <div key={template.id} className="group relative flex flex-col items-start transition-all">
                  <div className="w-full bg-slate-200 rounded-t-xl px-4 py-2 flex items-center gap-1.5 border border-slate-200 border-b-0">
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                  </div>
                  <div className="aspect-[16/10] w-full rounded-b-2xl overflow-hidden relative border border-slate-200 shadow-sm transition-all group-hover:shadow-xl group-hover:border-purple-400">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                       <Link 
                         href={`/demo/${template.id}`}
                         className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                       >
                         Live Preview
                         <Sparkles className="h-4 w-4 text-purple-600" />
                       </Link>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-bold text-slate-900">{template.name}</h4>
                    <p className="mt-1 text-sm text-slate-500">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
