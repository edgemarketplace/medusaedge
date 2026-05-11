/**
 * Builder v3 - Preset Selector Page
 * 
 * "Storefront Design System Platform" entry point
 * Users select vertical presets (Luxury Fashion, Streetwear, etc.)
 */

import Link from "next/link";
import { getThemeNames } from "@/lib/builder-v3/config";
import { LUXURY_FASHION_PRESET, STREETWEAR_PRESET } from "@/lib/builder-v3/config";

export default function BuilderV3Page() {
  const presets = [
    {
      name: "Luxury Fashion",
      preset: LUXURY_FASHION_PRESET,
      description: "Editorial-style luxury fashion storefront with cinematic heroes and curated layouts",
      theme: "luxury-fashion",
      image: "✨",
    },
    {
      name: "Streetwear",
      preset: STREETWEAR_PRESET,
      description: "Bold, high-contrast streetwear storefront with dynamic product grids",
      theme: "streetwear-dark",
      image: "🔥",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Builder v3</h1>
              <p className="text-slate-600 mt-1">
                Storefront Design System Platform — Milano-inspired commerce components
              </p>
            </div>
            <Link
              href="/builder-v2"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              ← Back to v2
            </Link>
          </div>
        </div>
      </div>

      {/* NEW: Vertical Builder Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center text-white text-xl">
                🚀
              </div>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base">
                  NEW: Vertical Template OS
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm mt-0.5">
                  Retail Core • 8 pre-configured sections • 15-min setup
                </p>
              </div>
            </div>
            <Link
              href="/builder/new"
              className="shrink-0 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition flex items-center gap-2"
            >
              Try Vertical Builder
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Architecture Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-violet-900 mb-2">
            🎯 The Inflection Point
          </h2>
          <p className="text-violet-700 text-sm mb-4">
            Builder v3 moves from "page builder" to "Storefront Design System Platform". 
            Professional quality comes from constraints, not infinite customization.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-white rounded-lg p-3">
              <div className="font-bold text-violet-900">Layer 1</div>
              <div className="text-violet-700">Design Tokens</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="font-bold text-violet-900">Layer 2</div>
              <div className="text-violet-700">Component Registry</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="font-bold text-violet-900">Layer 3</div>
              <div className="text-violet-700">Variant System</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="font-bold text-violet-900">Layer 4</div>
              <div className="text-violet-700">Medusa Bindings</div>
            </div>
          </div>
        </div>

        {/* Preset Grid */}
        <h2 className="text-xl font-bold text-slate-900 mb-6">Select a Vertical Preset</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presets.map((preset) => (
            <Link
              key={preset.name}
              href={`/builder-v3/puck/${preset.name.toLowerCase().replace(" ", "-")}`}
              className="group block bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-violet-300 hover:shadow-lg transition"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{preset.image}</div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition">
                  {preset.name}
                </h3>
                <p className="text-slate-600 text-sm mt-2 mb-4">
                  {preset.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Theme: {preset.theme}
                  </span>
                  <span className="text-xs font-medium text-violet-600 group-hover:text-violet-700">
                    Open Editor →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Component Registry Preview */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Component Registry (Milano Mappings)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "HeroEditorial",
              "HeroSplit", 
              "HeroMinimal",
              "ProductGridLuxury",
              "FeaturedProduct",
              "CollectionTabs",
              "LookbookHotspots",
              "NewsletterInline",
              "CountdownFeatured",
              "TestimonialsCarousel",
              "AnnouncementBar",
              "NavigationHeader",
              "StandardFooter",
            ].map((name) => (
              <div
                key={name}
                className="px-3 py-2 bg-slate-50 rounded-lg text-sm text-slate-700 border border-slate-200"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
