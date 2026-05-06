import type grapesjs from "grapesjs"

/* ──────────────────────────────────────────────────────────────
 * Hero blocks — 5 variations
 * ────────────────────────────────────────────────────────────── */

export interface BlockDef {
  id: string
  label: string
  category: string
  content: string | { type: string; [key: string]: any }
  attributes?: Record<string, string>
}

export const blocks: BlockDef[] = [
  /* 1 ─ Split text / image */
  {
    id: "hero-1",
    label: "Split Hero",
    category: "Hero",
    attributes: { class: "gjs-block-section", "data-category": "hero", "data-variation": "1" },
    content: `<section class="w-full bg-gray-50" data-gjs-type="hero">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-0 min-h-[500px]">
        <div class="flex flex-col justify-center px-8 py-16 md:px-16">
          <h1 class="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6" data-gjs-editable="true">The Modern Standard</h1>
          <p class="text-lg text-gray-600 mb-8" data-gjs-editable="true">Clean, fast, and designed for growth. Launch your marketplace in minutes.</p>
          <a href="#" class="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium text-center hover:bg-gray-800" data-gjs-editable="true" data-gjs-removable="false">Shop Now</a>
        </div>
        <div class="bg-gray-200 min-h-[300px] flex items-center justify-center">
          <span class="text-gray-400 text-sm" data-gjs-editable="true">Hero Image</span>
        </div>
      </div>
    </section>`,
  },

  /* 2 ─ Full-width centered text */
  {
    id: "hero-2",
    label: "Centered Hero",
    category: "Hero",
    attributes: { class: "gjs-block-section", "data-category": "hero", "data-variation": "2" },
    content: `<section class="w-full bg-white text-center py-24 px-6" data-gjs-type="hero">
      <h1 class="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6" data-gjs-editable="true">Built for Scale</h1>
      <p class="text-xl text-gray-500 max-w-2xl mx-auto mb-10" data-gjs-editable="true">A curated platform for modern merchants. Find what moves you.</p>
      <div class="flex justify-center gap-4">
        <a href="#" class="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800" data-gjs-editable="true">Get Started</a>
        <a href="#" class="border border-gray-300 text-gray-900 px-8 py-3 rounded-lg font-medium hover:border-gray-900" data-gjs-editable="true">Learn More</a>
      </div>
    </section>`,
  },

  /* 3 ─ Minimal with background image placeholder */
  {
    id: "hero-3",
    label: "Background Image",
    category: "Hero",
    attributes: { class: "gjs-block-section", "data-category": "hero", "data-variation": "3" },
    content: `<section class="w-full relative bg-gray-900 text-white py-32 px-6 text-center overflow-hidden" data-gjs-type="hero">
      <div class="absolute inset-0 bg-black/50 z-0"></div>
      <div class="relative z-10 max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-black mb-6" data-gjs-editable="true">Experience Luxury</h1>
        <p class="text-lg text-white/80 mb-10" data-gjs-editable="true">Handpicked essentials for the elevated life.</p>
        <a href="#" class="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100" data-gjs-editable="true">Explore</a>
      </div>
      <div class="absolute inset-0 flex items-center justify-center z-0">
        <span class="text-gray-500 text-sm">Background Image</span>
      </div>
    </section>`,
  },

  /* 4 ─ Two-column feature hero */
  {
    id: "hero-4",
    label: "Feature Columns",
    category: "Hero",
    attributes: { class: "gjs-block-section", "data-category": "hero", "data-variation": "4" },
    content: `<section class="w-full bg-gray-50 py-20 px-6" data-gjs-type="hero">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span class="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 block" data-gjs-editable="true">New Arrivals</span>
          <h1 class="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6" data-gjs-editable="true">Redefine Your Workspace</h1>
          <p class="text-gray-600 mb-8" data-gjs-editable="true">Premium tools and furniture designed to inspire productivity.</p>
          <a href="#" class="bg-black text-white px-8 py-3 rounded-lg font-medium inline-block hover:bg-gray-800" data-gjs-editable="true">Shop Collection</a>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-200 rounded-2xl h-40 flex items-center justify-center"><span class="text-gray-400 text-xs">Img 1</span></div>
          <div class="bg-gray-200 rounded-2xl h-40 flex items-center justify-center mt-8"><span class="text-gray-400 text-xs">Img 2</span></div>
        </div>
      </div>
    </section>`,
  },

  /* 5 ─ Video placeholder hero */
  {
    id: "hero-5",
    label: "Video Hero",
    category: "Hero",
    attributes: { class: "gjs-block-section", "data-category": "hero", "data-variation": "5" },
    content: `<section class="w-full relative bg-gray-900 text-white overflow-hidden" data-gjs-type="hero">
      <div class="aspect-video w-full bg-gray-800 flex items-center justify-center">
        <span class="text-gray-500 text-sm" data-gjs-editable="true">Video Background</span>
      </div>
      <div class="absolute inset-0 flex items-center justify-center bg-black/40">
        <div class="text-center px-6">
          <h1 class="text-4xl md:text-6xl font-black mb-6" data-gjs-editable="true">Motion. Design. Life.</h1>
          <a href="#" class="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100" data-gjs-editable="true">Shop Now</a>
        </div>
      </div>
    </section>`,
  },
]

export default function register(editor: grapesjs.Editor) {
  blocks.forEach((b) => editor.BlockManager.add(b.id, b))
}
