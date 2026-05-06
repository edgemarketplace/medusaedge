import type grapesjs from "grapesjs"

/* ──────────────────────────────────────────────────────────────
 * Text / Content section blocks — 5 variations
 * ────────────────────────────────────────────────────────────── */

export interface BlockDef {
  id: string
  label: string
  category: string
  content: string | { type: string; [key: string]: any }
  attributes?: Record<string, string>
}

export const blocks: BlockDef[] = [
  /* 1 ─ Left-aligned large text */
  {
    id: "text-1",
    label: "Large Statement",
    category: "Text",
    attributes: { class: "gjs-block-section", "data-category": "text", "data-variation": "1" },
    content: `<section class="w-full bg-white py-20 px-6" data-gjs-type="text">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-8" data-gjs-editable="true">We build tools that help independent businesses thrive.</h2>
        <p class="text-xl text-gray-500 max-w-2xl" data-gjs-editable="true">No setup fees, no hidden costs. Just a platform designed for people who want to sell more.</p>
      </div>
    </section>`,
  },

  /* 2 ─ Three-column features / values */
  {
    id: "text-2",
    label: "3-Column Features",
    category: "Text",
    attributes: { class: "gjs-block-section", "data-category": "text", "data-variation": "2" },
    content: `<section class="w-full bg-gray-50 py-16 px-6" data-gjs-type="text">
      <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        ${[
          {title:"Fast Shipping", desc:"Free 2-day delivery on all orders over $50."},
          {title:"Secure Checkout", desc:"256-bit encryption keeps your data safe."},
          {title:"24/7 Support", desc:"Talk to a real human, any time of day."}
        ].map(f => `
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-3" data-gjs-editable="true">${f.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed" data-gjs-editable="true">${f.desc}</p>
        </div>`).join("")}
      </div>
    </section>`,
  },

  /* 3 ─ Quote / testimonial */
  {
    id: "text-3",
    label: "Quote Block",
    category: "Text",
    attributes: { class: "gjs-block-section", "data-category": "text", "data-variation": "3" },
    content: `<section class="w-full bg-white py-20 px-6 text-center" data-gjs-type="text">
      <div class="max-w-3xl mx-auto">
        <svg class="w-10 h-10 text-gray-200 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
        <blockquote class="text-2xl md:text-3xl font-medium text-gray-900 leading-snug mb-8" data-gjs-editable="true">This platform completely changed how we approach online sales. Our revenue doubled in the first quarter.</blockquote>
        <div class="flex items-center justify-center gap-4">
          <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"><span class="text-xs text-gray-400">Photo</span></div>
          <div class="text-left">
            <p class="font-bold text-gray-900 text-sm" data-gjs-editable="true">Sarah Chen</p>
            <p class="text-gray-500 text-xs" data-gjs-editable="true">Founder, Blank Studio</p>
          </div>
        </div>
      </div>
    </section>`,
  },

  /* 4 ─ Two-column text + image */
  {
    id: "text-4",
    label: "Text + Image",
    category: "Text",
    attributes: { class: "gjs-block-section", "data-category": "text", "data-variation": "4" },
    content: `<section class="w-full bg-white py-16 px-6" data-gjs-type="text">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6" data-gjs-editable="true">Our Story</h2>
          <p class="text-gray-600 mb-4 leading-relaxed" data-gjs-editable="true">We started with a simple idea: make commerce beautiful and accessible. Every feature we build is designed to reduce friction and increase sales.</p>
          <p class="text-gray-600 leading-relaxed" data-gjs-editable="true">Today, thousands of creators trust us to power their online presence.</p>
        </div>
        <div class="bg-gray-100 rounded-2xl aspect-[4/3] flex items-center justify-center">
          <span class="text-gray-400 text-sm">Image</span>
        </div>
      </div>
    </section>`,
  },

  /* 5 ─ Numbered stats */
  {
    id: "text-5",
    label: "Stats Row",
    category: "Text",
    attributes: { class: "gjs-block-section", "data-category": "text", "data-variation": "5" },
    content: `<section class="w-full bg-gray-900 text-white py-16 px-6" data-gjs-type="text">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        ${[
          {num:"10K+", label:"Merchants"},
          {num:"$2M+", label:"GMV Processed"},
          {num:"99.9%", label:"Uptime"},
          {num:"4.9", label:"App Store Rating"}
        ].map(s => `
        <div>
          <p class="text-3xl md:text-4xl font-black text-white mb-2" data-gjs-editable="true">${s.num}</p>
          <p class="text-white/60 text-sm" data-gjs-editable="true">${s.label}</p>
        </div>`).join("")}
      </div>
    </section>`,
  },
]

export default function register(editor: grapesjs.Editor) {
  blocks.forEach((b) => editor.BlockManager.add(b.id, b))
}
