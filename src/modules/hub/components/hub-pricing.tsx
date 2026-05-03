import { Check } from "lucide-react"
import { Button } from "@medusajs/ui"
import Link from "next/link"

const plans = [
  {
    name: "Growth Engine",
    price: "$0",
    description: "Perfect for starting out with zero upfront risk.",
    fee: "5% transaction fee",
    features: [
      "15-minute setup",
      "Core template selection",
      "Unlimited products",
      "Edge-hosted marketplace",
      "Community support",
    ],
    cta: "Start for free",
    popular: false,
  },
  {
    name: "Scale",
    price: "$99",
    description: "For established businesses looking to optimize margins.",
    fee: "0.5% transaction fee",
    features: [
      "Everything in Growth",
      "Priority edge deployment",
      "Custom domain support",
      "Advanced AI inventory intake",
      "24/7 dedicated support",
    ],
    cta: "Go Pro now",
    popular: true,
  },
]

export default function HubPricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Simple, Transparent Growth
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Pay only for what you need. Zero hidden fees.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:max-w-none sm:grid-cols-2 sm:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-3xl p-8 ring-1 transition-all duration-300 ${
                plan.popular
                  ? "bg-slate-900 text-white ring-slate-900 scale-105 shadow-2xl z-10"
                  : "bg-white text-slate-900 ring-slate-200 hover:ring-blue-500"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                  <span className={`text-sm font-semibold ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>/month</span>
                </div>
                <p className={`mt-2 text-sm font-medium ${plan.popular ? "text-blue-400" : "text-blue-600"}`}>
                  {plan.fee}
                </p>
                <p className={`mt-6 text-base leading-7 ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>
                  {plan.description}
                </p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 text-sm">
                      <Check className={`h-5 w-5 flex-none ${plan.popular ? "text-blue-400" : "text-blue-600"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/start" className="mt-10">
                <Button
                  variant={plan.popular ? "primary" : "secondary"}
                  className={`w-full rounded-full h-12 text-md font-semibold ${plan.popular ? "bg-blue-600 border-none" : ""}`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
