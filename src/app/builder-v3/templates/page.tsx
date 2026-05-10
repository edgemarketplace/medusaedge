import Link from "next/link"

const templates = [
  {
    slug: "editorial-commerce",
    name: "Editorial Commerce",
    description: "Clean editorial layout for fashion and lifestyle brands",
  },
  {
    slug: "ai-marketplace-dashboard",
    name: "AI Marketplace Dashboard",
    description: "AI-powered marketplace with dashboard interface",
  },
  {
    slug: "luxury-pdp",
    name: "Luxury PDP",
    description: "Premium product detail page for luxury items",
  },
  {
    slug: "marketplace-collections",
    name: "Marketplace Collections",
    description: "Collection-focused marketplace layout",
  },
  {
    slug: "creator-commerce",
    name: "Creator Commerce",
    description: "Monetization-focused layout for content creators",
  },
  {
    slug: "enterprise-landing",
    name: "Enterprise Landing",
    description: "Professional enterprise landing page",
  },
  {
    slug: "interactive-ai-studio",
    name: "Interactive AI Studio",
    description: "AI-powered interactive studio interface",
  },
  {
    slug: "knowledge-hub",
    name: "Knowledge Hub",
    description: "Content-rich knowledge base and learning hub",
  },
  {
    slug: "saas-showcase",
    name: "SaaS Showcase",
    description: "Modern SaaS product showcase layout",
  },
  {
    slug: "universal-homepage",
    name: "Universal Homepage",
    description: "Flexible homepage for any industry",
  },
]

export default function TemplatesIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <Link href="/builder-v2" className="text-sm font-semibold text-blue-300 hover:text-blue-200">
            ← Back to Template Gallery
          </Link>
        </div>

        <h1 className="mb-4 text-4xl font-black">Puck Editor Templates</h1>
        <p className="mb-8 text-lg text-slate-400">
          Choose a template to preview. Each template is fully customizable in the Puck Editor.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Link
              key={template.slug}
              href={`/builder-v3/templates/${template.slug}`}
              className="group rounded-xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-blue-600 hover:bg-slate-800"
            >
              <h2 className="mb-2 text-xl font-bold group-hover:text-blue-300">{template.name}</h2>
              <p className="text-sm text-slate-400">{template.description}</p>
              <div className="mt-4 text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                Preview →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-2 text-xl font-bold">Want to start editing immediately?</h2>
          <p className="mb-4 text-slate-400">Skip the preview and go straight to the Puck Editor with a preset template.</p>
          <Link
            href="/builder-v3/puck/luxury-fashion"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
          >
            Open Puck Editor →
          </Link>
        </div>
      </div>
    </main>
  )
}
