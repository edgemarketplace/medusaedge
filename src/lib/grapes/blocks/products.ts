import type grapesjs from "grapesjs"

/* ──────────────────────────────────────────────────────────────
 * Product section blocks — 5 variations
 * ────────────────────────────────────────────────────────────── */

export interface BlockDef {
  id: string
  label: string
  category: string
  content: string | { type: string; [key: string]: any }
  attributes?: Record<string, string>
}

export const blocks: BlockDef[] = [
  /* 1 ─ 4-column product grid */
  {
    id: "products-1",
    label: "Product Grid",
    category: "Products",
    attributes: { class: "gjs-block-section", "data-category": "products", "data-variation": "1" },
    content: `<section class="w-full bg-white py-16 px-6" data-gjs-type="products">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-end mb-10">
          <h2 class="text-3xl font-bold text-gray-900" data-gjs-editable="true">Featured Products</h2>
          <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-900" data-gjs-editable="true">View all</a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          ${[1,2,3,4].map(i => `
          <div class="group cursor-pointer" data-gjs-editable="false">
            <div class="aspect-square bg-gray-100 rounded-2xl mb-4 flex items-center justify-center">
              <span class="text-gray-300 text-xs">Product ${i}</span>
            </div>
            <h3 class="font-medium text-gray-900 mb-1" data-gjs-editable="true">Product Name</h3>
            <p class="text-sm text-gray-500" data-gjs-editable="true">$0.00</p>
          </div>`).join("")}
        </div>
      </div>
    </section>`,
  },

  /* 2 ─ 2-column featured + description */
  {
    id: "products-2",
    label: "Featured + Text",
    category: "Products",
    attributes: { class: "gjs-block-section", "data-category": "products", "data-variation": "2" },
    content: `<section class="w-full bg-gray-50 py-16 px-6" data-gjs-type="products">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div class="bg-gray-200 rounded-3xl aspect-square flex items-center justify-center">
          <span class="text-gray-400 text-sm">Featured Image</span>
        </div>
        <div>
          <span class="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 block" data-gjs-editable="true">Editor's Pick</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-gjs-editable="true">The Essential</h2>
          <p class="text-gray-600 mb-8" data-gjs-editable="true">A timeless piece crafted with precision and care. Designed to last generations.</p>
          <a href="#" class="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800" data-gjs-editable="true">Shop Now</a>
        </div>
      </div>
    </section>`,
  },

  /* 3 ─ Product carousel row (horizontal scroll) */
  {
    id: "products-3",
    label: "Carousel Row",
    category: "Products",
    attributes: { class: "gjs-block-section", "data-category": "products", "data-variation": "3" },
    content: `<section class="w-full bg-white py-16 px-6" data-gjs-type="products">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-10" data-gjs-editable="true">Trending Now</h2>
        <div class="flex gap-6 overflow-x-auto pb-4">
          ${[1,2,3,4,5].map(i => `
          <div class="min-w-[220px] group cursor-pointer" data-gjs-editable="false">
            <div class="w-[220px] aspect-[3/4] bg-gray-100 rounded-2xl mb-4 flex items-center justify-center">
              <span class="text-gray-300 text-xs">Product ${i}</span>
            </div>
            <h3 class="font-medium text-gray-900 mb-1" data-gjs-editable="true">Product Name</h3>
            <p class="text-sm text-gray-500" data-gjs-editable="true">$0.00</p>
          </div>`).join("")}
        </div>
      </div>
    </section>`,
  },

  /* 4 ─ Category cards grid */
  {
    id: "products-4",
    label: "Category Grid",
    category: "Products",
    attributes: { class: "gjs-block-section", "data-category": "products", "data-variation": "4" },
    content: `<section class="w-full bg-white py-16 px-6" data-gjs-type="products">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-10" data-gjs-editable="true">Shop by Category</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          ${["Electronics","Home","Fashion","Sports","Beauty","Food"].map((cat,i) => `
          <a href="#" class="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200 flex items-center justify-center group" data-gjs-editable="true">
            <span class="text-gray-400 text-xs">Image</span>
            <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span class="text-white font-bold text-lg">${cat}</span>
            </div>
          </a>`).join("")}
        </div>
      </div>
    </section>`,
  },

  /* 5 ─ Product highlight with CTA */
  {
    id: "products-5",
    label: "Highlight CTA",
    category: "Products",
    attributes: { class: "gjs-block-section", "data-category": "products", "data-variation": "5" },
    content: `<section class="w-full bg-black text-white py-20 px-6" data-gjs-type="products">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1">
          <h2 class="text-4xl md:text-5xl font-black mb-6" data-gjs-editable="true">The Limited Edition</h2>
          <p class="text-white/70 text-lg mb-8" data-gjs-editable="true">Only 100 units. Signed and numbered by the designer.</p>
          <a href="#" class="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100" data-gjs-editable="true">Reserve Yours</a>
        </div>
        <div class="flex-1 bg-gray-800 rounded-3xl aspect-square w-full max-w-md flex items-center justify-center">
          <span class="text-gray-500 text-sm">Product Image</span>
        </div>
      </div>
    </section>`,
  },
]

export default function register(editor: grapesjs.Editor) {
  blocks.forEach((b) => editor.BlockManager.add(b.id, b))
}
