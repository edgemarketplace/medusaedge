import { Palette, Cpu, Rocket } from "lucide-react"

const steps = [
  {
    name: "Launch Your Identity",
    description: "Pick a foundation, upload your logo, and choose your brand colors in seconds.",
    icon: <Palette className="h-6 w-6 text-blue-600" />,
  },
  {
    name: "Our AI Builds Your Store",
    description: "We automatically spin up a secure database and deploy your instance to global edge nodes.",
    icon: <Cpu className="h-6 w-6 text-purple-600" />,
  },
  {
    name: "Sell Instantly",
    description: "List your products or services and start taking orders. All in under 15 minutes.",
    icon: <Rocket className="h-6 w-6 text-cyan-600" />,
  },
]

export default function HowItWorks() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              From Idea to Global Storefront in Minutes
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We&apos;ve stripped away the complexity of e-commerce. You don&apos;t need to know about hosting, databases, or SSL certificates. We handle the &quot;Edge&quot; so you can focus on your &quot;Market&quot;.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-600 lg:max-w-none">
              {steps.map((step) => (
                <div key={step.name} className="relative pl-12 transition-all hover:translate-x-2">
                  <dt className="inline font-bold text-slate-900">
                    <div className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 border border-slate-100">
                      {step.icon}
                    </div>
                    {step.name}
                  </dt>
                  <dd className="inline block mt-1">{step.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl bg-slate-900/5 p-4 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-[2.5rem] lg:p-6 transition-all hover:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop"
                alt="Marketplace dashboard"
                className="w-full rounded-2xl shadow-2xl ring-1 ring-slate-900/10"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-32 w-32 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-purple-600/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
