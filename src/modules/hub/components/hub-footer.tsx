export default function HubFooter() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900">
              Edge Marketplace <span className="text-blue-600">Hub</span>
            </span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Edge Marketplace Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
