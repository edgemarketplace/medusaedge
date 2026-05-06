import Link from "next/link"
import { Button } from "@medusajs/ui"

export default function HubNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Edge Marketplace <span className="text-blue-600">Hub</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/builder" className="hover:text-blue-600 transition-colors">Builder</Link>
          <Link href="#templates" className="hover:text-blue-600 transition-colors">Templates</Link>
          <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
          <Link href="#about" className="hover:text-blue-600 transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/launch-your-marketplace">
            <Button variant="primary" className="rounded-full px-6">
              Start Intake
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
